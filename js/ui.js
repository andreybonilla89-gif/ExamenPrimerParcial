// ==========================================
// UI.JS
// ==========================================

const listaLugares = document.getElementById("listaLugares");
const favoritosDiv = document.getElementById("favoritos");
const detalleDiv = document.getElementById("contenidoDetalle");
const btnEliminarFavoritos = document.getElementById("btnEliminarFavoritos");

// ==========================================
// MOSTRAR RESULTADOS
// ==========================================
function mostrarLugares(lugares) {

    listaLugares.innerHTML = "";

    if (!lugares || lugares.length === 0) {
        listaLugares.innerHTML = "<p>No se encontraron lugares.</p>";
        return;
    }

    lugares.forEach(function(lugar){

        let tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta";

        tarjeta.innerHTML = `
            <h3>${lugar.name || "Sin nombre"}</h3>

            <p><strong>Dirección:</strong>
            ${lugar.address || "No disponible"}</p>

            <p><strong>Categoría:</strong>
            ${lugar.category || "No disponible"}</p>

            <button class="btnDetalle">Ver detalles</button>
            <button class="btnGuardar">Guardar</button>
        `;

        tarjeta.querySelector(".btnDetalle").onclick = function(){

            verDetalles(lugar);

        };

        tarjeta.querySelector(".btnGuardar").onclick = function(){

            guardarEnFavoritos(lugar);

        };

        listaLugares.appendChild(tarjeta);

    });

}

// ==========================================
// VER DETALLES DEL LUGAR
// ==========================================
function verDetalles(lugar){

    detalleDiv.innerHTML = `
        <div class="tarjeta">

            <h2>${lugar.name || "Sin nombre"}</h2>

            <hr>

            <p><strong>📍 Dirección:</strong><br>
            ${lugar.address || "No disponible"}</p>

            <p><strong>🏷 Categoría:</strong><br>
            ${lugar.category || "No disponible"}</p>

            <p><strong>📝 Descripción:</strong><br>
            ${lugar.description || "Este lugar turístico fue obtenido mediante la API REST. No existe una descripción disponible para este sitio."}</p>

            <p><strong>🌎 Ciudad:</strong><br>
            ${document.getElementById("location").value}</p>

            <p><strong>🔎 Palabra buscada:</strong><br>
            ${document.getElementById("keyword").value || "Sin palabra clave"}</p>

            <p><strong>🕒 Horario:</strong><br>
            ${lugar.openingHours || "No disponible"}</p>

            <p><strong>☎ Teléfono:</strong><br>
            ${lugar.telephone || "No disponible"}</p>

            <p><strong>✉ Correo:</strong><br>
            ${lugar.email || "No disponible"}</p>

            <p><strong>🌐 Sitio Web:</strong><br>
            ${
                lugar.url
                ? `<a href="${lugar.url}" target="_blank">Visitar sitio web</a>`
                : "No disponible"
            }</p>

        </div>
    `;

}

// ==========================================
// FAVORITOS
// ==========================================

function mostrarFavoritos(){

    let favoritos = obtenerFavoritos();

    favoritosDiv.innerHTML = "";

    if(favoritos.length===0){

        favoritosDiv.innerHTML="<p>No hay favoritos</p>";
        return;

    }

    favoritos.forEach(function(favorito){

        let div=document.createElement("div");

        div.className="favorito";

        div.innerHTML=`

            <span>${favorito.name}</span>

            <button>Eliminar</button>

        `;

        div.querySelector("button").onclick=function(){

            eliminarFavorito(favorito.id);

            mostrarFavoritos();

        };

        favoritosDiv.appendChild(div);

    });

}

// ==========================================
// GUARDAR
// ==========================================

function guardarEnFavoritos(lugar){

    agregarFavorito(lugar);

    mostrarFavoritos();

}

// ==========================================
// ELIMINAR TODOS
// ==========================================

btnEliminarFavoritos.onclick=function(){

    eliminarTodosFavoritos();

    mostrarFavoritos();

};