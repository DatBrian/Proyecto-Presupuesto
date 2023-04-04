export default {
    all() {
        const select = document.querySelector("#type");

        select.addEventListener("change", (e) => {
            let button = document.querySelector("#button");

            if (select.value === "1") {
                button.style.background = `linear-gradient(90deg, #00d2ff 0%, #bdc3ff 100%)`;
            } else if (select.value === "2") {
                button.style.background = `linear-gradient(90deg, #FF6767 0%, #daae51 100%)`;
            } else {
                button.style.background = "";
            }

        })
    }
}