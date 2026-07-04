// ==========================================
// API.JS - FINAL COMPLETO
// ==========================================

function obtenerLugares(location, category, keyword, callback) {

    let xhr = new XMLHttpRequest();

    let url = `http://wafi.iit.cnr.it/openervm/api/getPlaces?location=${location}&category=${category}&keyword=${keyword}`;

    xhr.open("GET", url, true);

    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {

            if (xhr.status === 200) {

                try {

                    // 🔥 PROTECCIÓN EXTRA
                    let response = xhr.responseText;

                    if (!response || response.trim() === "") {
                        callback("Respuesta vacía del servidor", null);
                        return;
                    }

                    let data = JSON.parse(response);
                    callback(null, data);

                } catch (e) {
                    console.log("RESPUESTA ROTA:", xhr.responseText);
                    callback("Error JSON (API inestable)", null);
                }

            } else {
                callback("Error HTTP API", null);
            }
        }
    };

    xhr.send();
}

function obtenerDetalles(id, callback) {

    let xhr = new XMLHttpRequest();

    let url = `http://wafi.iit.cnr.it/openervm/api/getPlaceDetails?id=${id}`;

    xhr.open("GET", url, true);

    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {

            if (xhr.status === 200) {

                try {
                    let data = JSON.parse(xhr.responseText);
                    callback(null, data);
                } catch (e) {
                    callback("Error JSON", null);
                }

            } else {
                callback("Error API detalles", null);
            }
        }
    };

    xhr.send();
}