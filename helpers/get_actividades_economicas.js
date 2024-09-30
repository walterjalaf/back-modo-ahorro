const axios = require('axios');

exports.get_actividades_economicas = function() {
    result = axios.get("https://datasets.datos.mincyt.gob.ar/dataset/ce17edf2-25ea-488d-9839-db1d3a7774f9/resource/330d4e27-406b-4175-8c33-7dbfadf33b5c/download/ref_actividad_economica.json")
    .then(function(data_actividades) {
        // Separación de los niveles
        let nivel0 = data_actividades.data.data.filter(item => item.nivel == 0);
        let nivel1 = data_actividades.data.data.filter(item => item.nivel == 1);
        let nivel2 = data_actividades.data.data.filter(item => item.nivel == 2);
        let nivel3 = data_actividades.data.data.filter(item => item.nivel == 3);
        // Anidamiento de niveles
        for (let item of nivel3) {
            let padre = nivel2.find(padre => padre.actividad_economica_id == item.padre_id)
            if (padre.hasOwnProperty("hijos")) {
                padre.hijos.push(item);
            } else {
                padre["hijos"] = [item];
            };
        }
        for (let item of nivel2) {
            let padre = nivel1.find(padre => padre.actividad_economica_id == item.padre_id)
            if (padre.hasOwnProperty("hijos")) {
                padre.hijos.push(item);
            } else {
                padre["hijos"] = [item];
            };
        }
        for (let item of nivel1) {
            let padre = nivel0.find(padre => padre.actividad_economica_id == item.padre_id)
            if (padre.hasOwnProperty("hijos")) {
                padre.hijos.push(item);
            } else {
                padre["hijos"] = [item];
            };
        }
        // Retorna el nivel 0
        return nivel0;
    })
    .catch(function(err) {
        console.error(err);
    });
    return result;
};