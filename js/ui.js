// ==========================================
// UI.JS - FINAL COMPLETO
// ==========================================

const listaLugares = document.getElementById("listaLugares");
const favoritosDiv = document.getElementById("favoritos");
const detalleDiv = document.getElementById("contenidoDetalle");
const btnEliminarFavoritos = document.getElementById("btnEliminarFavoritos");

// ==========================================
// MOSTRAR LUGARES
// ==========================================
function mostrarLugares(lugares) {

    listaLugares.innerHTML = "";

    if (!lugares || lugares.length === 0) {
        listaLugares.innerHTML = "<p>No se encontraron resultados</p>";
        return;
    }

    lugares.forEach(lugar => {

        let div = document.createElement("div");
        div.classList.add("tarjeta");

        div.innerHTML = `
            <h3>${lugar.name}</h3>
            <p><strong>Dirección:</strong> ${lugar.address || "No disponible"}</p>
            <p><strong>Categoría:</strong> ${lugar.category || "No disponible"}</p>

            <button class="btnDetalles">Ver detalles</button>
            <button class="btnGuardar">Guardar</button>
        `;

        div.querySelector(".btnDetalles").addEventListener("click", function () {
            verDetalles(lugar.id);
        });

       div.querySelector(".btnGuardar").onclick = function () {
    guardarEnFavoritos(lugar);
};

        listaLugares.appendChild(div);
    });
}

// ==========================================
// MOSTRAR FAVORITOS
// ==========================================
function mostrarFavoritos() {

    let favoritos = obtenerFavoritos();

    favoritosDiv.innerHTML = "";

    if (favoritos.length === 0) {
        favoritosDiv.innerHTML = "<p>No hay favoritos</p>";
        return;
    }

    favoritos.forEach(fav => {

        let div = document.createElement("div");
        div.classList.add("favorito");

        div.innerHTML = `
            <p>${fav.name}</p>
            <button class="btnEliminar">Eliminar</button>
        `;

        div.querySelector(".btnEliminar").addEventListener("click", function () {
            eliminarFav(fav.id);
        });

        favoritosDiv.appendChild(div);
    });
}

// ==========================================
// VER DETALLES
// ==========================================
function verDetalles(id) {

    detalleDiv.innerHTML = "<p>Cargando detalles...</p>";

    obtenerDetalles(id, function (err, data) {

        if (err || !data) {
            detalleDiv.innerHTML = "<p>No se pudieron cargar los detalles</p>";
            return;
        }

        detalleDiv.innerHTML = `
            <h3>${data.name || "Sin nombre"}</h3>
            <p><strong>Descripción:</strong> ${data.description || "No disponible"}</p>
            <p><strong>Dirección:</strong> ${data.address || "No disponible"}</p>
            <p><strong>Teléfono:</strong> ${data.telephone || "No disponible"}</p>
            <p>
                <strong>Web:</strong>
                ${data.url ? `<a href="${data.url}" target="_blank">Abrir sitio</a>` : "No disponible"}
            </p>
        `;
    });
}

// ==========================================
// FAVORITOS
// ==========================================
function guardarEnFavoritos(lugar) {
    agregarFavorito(lugar);
    mostrarFavoritos();
}

function eliminarFav(id) {
    eliminarFavorito(id);
    mostrarFavoritos();
}

// ==========================================
// ELIMINAR TODOS
// ==========================================
btnEliminarFavoritos.onclick = function () {
    eliminarTodosFavoritos();
    mostrarFavoritos();
};