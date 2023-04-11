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
                description = "Sin descripción"
            };

            (!isNaN(parseInt(amount)) && amount > 0) ? ws.postMessage({ type: type, description: description, amount: parseInt(amount) })
                : ("nada");
            // Enviando datos al worker
        });


        // Recibiendo datos del worker
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

        //Botones indivuduales egresos

        document.addEventListener("click", (e) => {
            if (e.target.getAttribute("data-type") === "eliminarEgreso") {

                Swal.fire({
                    title: 'Estas seguro?',
                    text: "Al eliminar este movimiento no podrás recuperarlo",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, eliminalo'
                }).then((result) => {
                    if (result.isConfirmed) {

                        let amount = 0;
                        let index = parseInt(e.target.getAttribute("data-index"));
                        egresos = JSON.parse(localStorage.getItem("Lista Egresos"));
                        amount = parseInt(egresos[index]["amount"]);
                        egresos.splice(index, 1);
                        localStorage.setItem("Lista Egresos", JSON.stringify(egresos));
                        actualizarE(amount);

                        Swal.fire(
                            'Hecho!',
                            'Movimiento Eliminado',
                            'success'
                        );
                        setTimeout(function () {
                            location.reload();
                        }, 1000);
                    }
                })


            }
        });

        //Botones individuales Ingresos

        document.addEventListener("click", (e) => {
            if (e.target.getAttribute("data-type") === "eliminarIngreso") {

                Swal.fire({
                    title: 'Estas seguro?',
                    text: "Al eliminar este movimiento no podrás recuperarlo",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, eliminalo'
                }).then((result) => {
                    if (result.isConfirmed) {

                        let amount = 0;
                        let index = parseInt(e.target.getAttribute("data-index"));
                        ingresos = JSON.parse(localStorage.getItem("Lista Ingresos"));
                        amount = parseInt(ingresos[index]["amount"]);
                        ingresos.splice(index, 1);
                        localStorage.setItem("Lista Ingresos", JSON.stringify(ingresos));
                        actualizarI(amount);

                        Swal.fire(
                            'Hecho!',
                            'Movimiento Eliminado',
                            'success'
                        );
                        setTimeout(function () {
                            location.reload();
                        }, 2000);
                    }
                })


            }
        });


        //Botón para borrar los datos

        let deleteButton = document.querySelector("#deleteButton");

        deleteButton.addEventListener("click", (e) => {
            deleteLocalStorage();
        })

        //Funciones

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

        function deleteLocalStorage() {
            Swal.fire({
                title: 'Estas seguro?',
                text: "Al eliminar todos los datos no podrás recuperar tus movimientos",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminalos'
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.clear();
                    Swal.fire(
                        'Hecho!',
                        'Tus datos han sido eliminados.',
                        'success'
                    );
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                }
            })
        }

        function actualizarE(amount) {
            let presupuesto = localStorage.getItem("presupuesto");
            let egresos = localStorage.getItem("egresos");
            let porcentajeE = localStorage.getItem("porcentaje Egresos");

            ws.postMessage({
                type: "actualizarE",
                data: {
                    "amount": amount,
                    "presupuesto": presupuesto,
                    "egresos": egresos,
                    "porcentajeE": porcentajeE
                }
            })

            ws.onmessage = (e) => {
                let type = e.data.type;

                if (type === "actualizarE") {
                    let presupuesto = e.data.data.presupuesto;
                    let egresos = e.data.data.egresos;
                    let porcentajeE = e.data.data.porcentajeE;

                    localStorage.setItem("presupuesto", presupuesto)
                    localStorage.setItem("egresos", egresos)
                    localStorage.setItem("porcentaje Egresos", porcentajeE)
                }
            }
        }

        function actualizarI(amount) {
            let presupuesto = localStorage.getItem("presupuesto");
            let ingresos = localStorage.getItem("ingresos");

            ws.postMessage({
                type: "actualizarI",
                data: {
                    "amount": amount,
                    "presupuesto": presupuesto,
                    "ingresos": ingresos,
                }
            })

            ws.onmessage = (e) => {
                let type = e.data.type;

                if (type === "actualizarI") {
                    let presupuesto = e.data.data.presupuesto;
                    let ingresos = e.data.data.ingresos;

                    localStorage.setItem("presupuesto", presupuesto)
                    localStorage.setItem("ingresos", ingresos)
                }
            }
        }
    }
};

