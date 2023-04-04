export default {
    all() {
        let update = () => {

            const ws = new Worker("storage/wsTotal.js", { type: "module" });

            let presupuesto = parseInt(localStorage.getItem('presupuesto')) || 0;
            let ingresos = parseInt(localStorage.getItem('ingresos')) || 0;
            let egresos = parseInt(localStorage.getItem('egresos')) || 0;
            let type = document.querySelector("#type").value
            let amount = parseInt(document.querySelector("#amount").value);

            if (isNaN(amount)) {
                alert("Ingrese un valor válido >:(");
                return;
            }

            if (amount <= 0) {
                alert("Ingrese un valor válido >:(");
                return;
            }

            console.log("enviando: " + presupuesto, ingresos, egresos, type, amount);
            ws.postMessage({ presupuesto, ingresos, egresos, type, amount });

            ws.addEventListener("message", (e) => {
                const { presupuesto, ingresos, egresos, porcentajeE } = e.data

                document.querySelector("#presupuesto").innerHTML = presupuesto.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
                document.querySelector("#montoIngresos").innerHTML = ingresos.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
                document.querySelector("#montoEgresos").innerHTML = egresos.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
                document.querySelector("#porcentajeE").innerHTML = porcentajeE.toFixed(2) + "%";

                localStorage.setItem('presupuesto', presupuesto);
                localStorage.setItem('ingresos', ingresos);
                localStorage.setItem('egresos', egresos);

            });

        };

        let button = document.querySelector("#button");

        button.addEventListener("click", (e) => {
            e.preventDefault();
            update();
            document.querySelector("#formEnvio").reset();
        });

        window.addEventListener("unload", () => {
            const { presupuesto, ingresos, egresos, porcentajeE } = localStorage;

            const ws = new Worker("storage/wsTotal.js", { type: "module" });

            ws.addEventListener("message", () => {
                ws.terminate();
            });

            ws.postMessage({ presupuesto, ingresos, egresos, porcentajeE });
        });

        // Cargar los datos guardados en localStorage al inicio de la página
        window.addEventListener("load", () => {
            const presupuesto = parseInt(localStorage.getItem('presupuesto')) || 0;
            const ingresos = parseInt(localStorage.getItem('ingresos')) || 0;
            const egresos = parseInt(localStorage.getItem('egresos')) || 0;
            const porcentajeE = parseFloat(localStorage.getItem('porcentajeE')) || 0;

            document.querySelector("#presupuesto").innerHTML = presupuesto.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
            document.querySelector("#montoIngresos").innerHTML = ingresos.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
            document.querySelector("#montoEgresos").innerHTML = egresos.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
            document.querySelector("#porcentajeE").innerHTML = porcentajeE.toFixed(2) + "%";

        });
    },


}