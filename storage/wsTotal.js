self.addEventListener("message", (e) => {
    console.log("Datos recibidos en el worker: ", e.data);

    let presupuesto = parseInt(e.data.presupuesto) || 0;
    let ingresos = parseInt(e.data.ingresos) || 0;
    let egresos = parseInt(e.data.egresos) || 0;
    let porcentajeE = e.data.porcentajeE || 0;

    let type = e.data.type;
    let amount = parseInt(e.data.amount);

    if (isNaN(amount) || amount <= 0) {
        alert("Ingrese una cantidad válida >:(");
        return;
    }

    type === "1" ? (presupuesto = parseInt(presupuesto) + amount, ingresos += amount) : (presupuesto = parseInt(presupuesto) - amount, egresos += amount);

    if (ingresos > 0) {
        porcentajeE = (egresos * 100) / ingresos;
    }

    console.log("Datos enviados desde el worker: ", { presupuesto, ingresos, egresos, porcentajeE });
    self.postMessage({ presupuesto, ingresos, egresos, porcentajeE });
})