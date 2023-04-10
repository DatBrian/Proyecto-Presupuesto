let ingresos = [];
let egresos = [];

class Ingreso {
  constructor(date, description, amount) {
    this['date'] = date;
    this['description'] = description;
    this['amount'] = amount;
  }

}

class Egreso {
  constructor(date, description, amount) {
    this.date = date;
    this.description = description;
    this.amount = amount;
  }
}

// Recibiendo mensajes del archivo principal
self.onmessage = (e) => {
  let type = e.data.type;
  let description = e.data.description;

  if (type === "load") {
    let date = new Date().toLocaleDateString("es-CO");

    ingresos = e.data.data.ingresos.map((ingreso) => new Ingreso(date, ingreso.description, ingreso.amount));
    egresos = e.data.data.egresos.map((egreso) => new Egreso(date, egreso.description, egreso.amount));

    // Creando plantilla
    const plantillaI = ingresos
      .map(
        (val, index) => `
            <tr>
              <td scope="row">${val.date}</td>
              <td>${val.description}</td>
              <td>${val.amount.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
            </tr>
          `
      )
      .join("");

    const plantillaE = egresos
      .map(
        (val, index) => `
            <tr>
              <td scope="row">${val.date}</td>
              <td>${val.description}</td>
              <td>${val.amount.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
              <td>
                <button class="btn btn-danger" data-index="${index}" data-type="eliminarEgreso">
                  Eliminar
                </button>
              </td>
            </tr>
          `
      )
      .join("");

    // Enviando plantillas al archivo principal
    self.postMessage({ type: "load", data: { plantillaI: plantillaI, plantillaE: plantillaE } });

  }

  if (type === "1") {
    let amount = (e.data.amount);
    let date = new Date().toLocaleDateString("es-CO");
    let newIngreso = new Ingreso(date, description, amount);
    ingresos.unshift(newIngreso);

    // Creando la plantilla
    const plantillaI = ingresos
      .map(
        (val, index) => `
            <tr>
              <td scope="row">${val.date}</td>
              <td>${val.description}</td>
              <td>${val.amount.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
            </tr>
          `
      )
      .join("");

    // Enviando plantilla al archivo principal
    self.postMessage({ type: "ingreso", data: ingresos, plantilla: plantillaI });
  } else if (type === "2") {
    let amount = (e.data.amount);
    let date = new Date().toLocaleDateString("es-CO");
    let newEgreso = new Egreso(date, description, amount);
    egresos.unshift(newEgreso);

    // Creando la plantilla
    const plantillaE = egresos
      .map(
        (val, index) => `
            <tr>
              <td scope="row">${val.date}</td>
              <td>${val.description}</td>
              <td>${val.amount.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
              <td>
                <button class="btn btn-danger" data-index="${index}" data-type="eliminarEgreso">
                  Eliminar
                </button>
              </td>
            </tr>
          `
      )
      .join("");

    // Enviando la plantilla al archivo principal
    self.postMessage({ type: "egreso", data: egresos, plantilla: plantillaE });
  }

  if (type === "actualizarE") {
    let amount = parseInt(e.data.data.amount);
    let presupuesto = parseInt(e.data.data.presupuesto);
    let egresos = parseInt(e.data.data.egresos);
    let porcentajeE = e.data.data.porcentajeE;
    let ingresos = (presupuesto + egresos)

    presupuesto += amount;
    egresos -= amount;
    porcentajeE = (egresos * 100) / ingresos

    self.postMessage({
      type: "actualizarE",
      data: {
        "presupuesto": presupuesto,
        "egresos": egresos,
        "porcentajeE": porcentajeE
      }
    })
  }

};

