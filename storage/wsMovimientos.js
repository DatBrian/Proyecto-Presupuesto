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
              <td>
                  <button class="btnd" data-index="${index}" data-type="eliminarIngreso">
                    <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" class="icon">
                      <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill">
                      </path>
                    </svg>
                </button>
              </td>
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
                <button class="btnd" data-index="${index}" data-type="eliminarEgreso">
                    <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" class="icon">
                      <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill">
                      </path>
                    </svg>
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
              <td>
                  <button class="btnd" data-index="${index}" data-type="eliminarIngreso">
                    <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" class="icon">
                      <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill">
                      </path>
                    </svg>
                </button>
              </td>
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
                  <button class="btnd" data-index="${index}" data-type="eliminarEgreso">
                    <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" class="icon">
                      <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill">
                      </path>
                    </svg>
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

  if (type === "actualizarI") {
    let amount = parseInt(e.data.data.amount);
    let presupuesto = parseInt(e.data.data.presupuesto);
    let ingresos = parseInt(e.data.data.ingresos)

    presupuesto -= amount;
    ingresos -= amount;

    self.postMessage({
      type: "actualizarI",
      data: {
        "presupuesto": presupuesto,
        "ingresos": ingresos,
      }
    })
  }

};

