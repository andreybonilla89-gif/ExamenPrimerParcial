// ==========================================
// APP.JS - FINAL COMPLETO
// ==========================================

window.onload = function () {

    mostrarFavoritos();

    document.getElementById("btnBuscar").addEventListener("click", function () {
        buscarLugares();
    });

};

function buscarLugares() {

    let location = document.getElementById("location").value;
    let category = document.getElementById("category").value;
    let keyword = document.getElementById("keyword").value;

    // 🔥 UX: mostrar carga inmediata
    document.getElementById("listaLugares").innerHTML =
        "<p>Buscando lugares... ⏳</p>";

    obtenerLugares(location, category, keyword, function (err, data) {

        if (err) {
            alert(err);
            return;
        }

        mostrarLugares(data);

    });
}