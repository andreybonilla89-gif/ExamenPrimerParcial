// ==========================================
// STORAGE.JS - FINAL COMPLETO
// ==========================================

const STORAGE_KEY = "favoritos_turisticos";

function obtenerFavoritos() {
    let datos = localStorage.getItem(STORAGE_KEY);
    return datos ? JSON.parse(datos) : [];
}

function guardarFavoritos(lista) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

function agregarFavorito(lugar) {

    let favoritos = obtenerFavoritos();

    let existe = favoritos.find(f => String(f.id) === String(lugar.id));

    if (existe) {
        alert("Ya está en favoritos");
        return;
    }

    if (favoritos.length >= 5) {
        alert("Máximo 5 favoritos");
        return;
    }

    favoritos.push(lugar);

    guardarFavoritos(favoritos);

    // 🔥 FORZAR sincronización inmediata
    setTimeout(() => {
        console.log("Favorito guardado correctamente");
    }, 50);
}
function eliminarFavorito(id) {

    let favoritos = obtenerFavoritos();

    console.log("ID a eliminar:", id);
    console.log("Favoritos actuales:", favoritos);

    favoritos = favoritos.filter(f => String(f.id) !== String(id));

    guardarFavoritos(favoritos);
}
function eliminarTodosFavoritos() {
    localStorage.removeItem("favoritos_turisticos");
}