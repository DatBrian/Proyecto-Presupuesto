export default {
    all() {

        let ingresos = [];
        let egresos = [];

        const ws = new Worker("storage/wsMovimientos.js", { type: "module" });

        loadFromLocalStorage();

        let button = document.querySelector("#button");

        button.addEventListener("click", (e) => {
            let type = document.querySelector("#type").value;
            let description = document.querySelector("#description").value;
            let amount = document.querySelector("#amount").value;

            if (description === "") {
                description = "Sin descripción:"
            };

            console.log(description);

            (!isNaN(parseInt(amount)) && amount > 0) ? ws.postMessage({ type: type, description: description, amount: parseInt(amount) })
                : ("nada");
            // Enviamos los datos al worker
        });

        // Listener de eventos para el mensaje que recibe el worker
        ws.onmessage = ((e) => {
            let type = e.data.type;
            let data = e.data.data;
            let plantilla = e.data.plantilla;

            if (type === "load") {
                let plantillaI = e.data.data.plantillaI;
                let plantillaE = e.data.data.plantillaE;

                updateTable("tablaIngresos", plantillaI);
                updateTable("tablaEgresos", plantillaE);
            }

            if (type === "ingreso") {
                ingresos = data;
                updateTable("tablaIngresos", plantilla);
            } else if (type === "egreso") {
                egresos = data;
                updateTable("tablaEgresos", plantilla);
            }
        });



        function updateTable(tableId, plantilla) {
            document.querySelector(`#${tableId} tbody`).innerHTML = plantilla;
            saveLocalStorage();
        }

        function saveLocalStorage() {
            localStorage.setItem("Lista Ingresos", JSON.stringify(ingresos));
            localStorage.setItem("Lista Egresos", JSON.stringify(egresos))
        }

        function loadFromLocalStorage() {
            ingresos = JSON.parse(localStorage.getItem("Lista Ingresos")) || [];
            egresos = JSON.parse(localStorage.getItem("Lista Egresos")) || [];

            ws.postMessage({ type: "load", data: { ingresos: ingresos, egresos: egresos } });
        }
    }
};

