let ingresos = [];
let egresos = [];

class Ingreso {
  constructor(description, amount) {
    this['description'] = description;
    this['amount'] = amount;
  }

}

class Egreso {
  constructor(description, amount) {
    this.description = description;
    this.amount = amount;
  }
}

// Listener de eventos para el mensaje que recibe el worker
self.onmessage = (e) => {
  let type = e.data.type;
  let description = e.data.description;
  let amount = e.data.amount;

  amount = amount.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

  if (type === "load") {

    ingresos = e.data.data.ingresos.map((ingreso) => new Ingreso(ingreso.description, ingreso.amount));
    egresos = e.data.data.egresos.map((egreso) => new Egreso(egreso.description, egreso.amount));

    // Creamos la plantilla
    const plantillaI = ingresos
      .map(
        (val) => `
            <tr>
              <th>${val.description}</th>
              <td>${val.amount}</td>
            </tr>
          `
      )
      .join("");

    const plantillaE = egresos
      .map(
        (val) => `
            <tr>
              <th>${val.description}</th>
              <td>${val.amount}</td>
            </tr>
          `
      )
      .join("");

    // Enviamos las plantillas al hilo principal
    self.postMessage({ type: "load", data: { plantillaI: plantillaI, plantillaE: plantillaE } });

  } else if (type === "1") {
    let newIngreso = new Ingreso(description, amount);
    ingresos.unshift(newIngreso);

    // Creamos la plantilla
    const plantillaI = ingresos
      .map(
        (val) => `
            <tr>
              <th>${val.description}</th>
              <td>${val.amount}</td>
            </tr>
          `
      )
      .join("");

    // Enviamos la plantilla al hilo principal
    self.postMessage({ type: "ingreso", data: ingresos, plantilla: plantillaI });
  } else if (type === "2") {
    let newEgreso = new Egreso(description, amount);
    egresos.unshift(newEgreso);

    // Creamos la plantilla
    const plantillaE = egresos
      .map(
        (val) => `
            <tr>
              <th>${val.description}</th>
              <td>${val.amount}</td>
            </tr>
          `
      )
      .join("");

    // Enviamos la plantilla al hilo principal
    self.postMessage({ type: "egreso", data: egresos, plantilla: plantillaE });
  }

};

