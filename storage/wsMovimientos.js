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

  if (type === "load") {

    ingresos = e.data.data.ingresos.map((ingreso) => new Ingreso(ingreso.description, ingreso.amount));
    egresos = e.data.data.egresos.map((egreso) => new Egreso(egreso.description, egreso.amount));

    // Creamos la plantilla
    const plantillaI = ingresos
      .map(
        (val, index) => `
            <tr>
              <td scope="row">${new Date().toLocaleDateString("es-CO")}</td>
              <td>${val.description}</td>
              <td>${val.amount}</td>
            </tr>
          `
      )
      .join("");

    const plantillaE = egresos
      .map(
        (val, index) => `
            <tr>
              <td scope="row">${new Date().toLocaleDateString("es-CO")}</td>
              <td>${val.description}</td>
              <td>${val.amount}</td>
            </tr>
          `
      )
      .join("");

    // Enviamos las plantillas al hilo principal
    self.postMessage({ type: "load", data: { plantillaI: plantillaI, plantillaE: plantillaE } });

  }

  if (type === "1") {
    let amount = (e.data.amount).toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
    let newIngreso = new Ingreso(description, amount);
    ingresos.unshift(newIngreso);

    // Creamos la plantilla
    const plantillaI = ingresos
      .map(
        (val, index) => `
            <tr>
              <td scope="row">${new Date().toLocaleDateString("es-CO")}</td>
              <td>${val.description}</td>
              <td>${val.amount}</td>
            </tr>
          `
      )
      .join("");

    // Enviamos la plantilla al hilo principal
    self.postMessage({ type: "ingreso", data: ingresos, plantilla: plantillaI });
  } else if (type === "2") {
    let amount = (e.data.amount).toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

    let newEgreso = new Egreso(description, amount);
    egresos.unshift(newEgreso);

    // Creamos la plantilla
    const plantillaE = egresos
      .map(
        (val, index) => `
            <tr>
              <td scope="row">${new Date().toLocaleDateString("es-CO")}</td>
              <td>${val.description}</td>
              <td>${val.amount}</td>
            </tr>
          `
      )
      .join("");

    // Enviamos la plantilla al hilo principal
    self.postMessage({ type: "egreso", data: egresos, plantilla: plantillaE });
  }

};

