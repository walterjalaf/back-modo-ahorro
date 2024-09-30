
const axios = require('axios');

const Provincia = require("../src/models/provincia.model");
const Municipio = require("../src/models/municipio.model");
const Ciudad = require("../src/models/ciudad.model");
const { get_actividades_economicas } = require('../helpers/get_actividades_economicas');

/**
 * 
 * Lógica de negocio
 * 
 */
const data_activ_economica = async function (req, res) {
    let actividades_economicas = await get_actividades_economicas();
    res.status(200).send({
        data: actividades_economicas
    });
}

const data_provincias = async function (req, res) {
    await Provincia.sync();
    var provincias = await Provincia.findAll();
    if (provincias.length == 0) {
        console.log("Sin datos de provincias");
        //En caso de estar vacía la tabla se busca la información
        let data_provincias = await axios.get("https://apis.datos.gob.ar/georef/api/provincias?campos=estandar&max=25")
            .then(function(data) {
                return data;
            })
            .catch(function(err) {
                console.error(err);
            });
        for (let provincia of data_provincias.data.provincias) {
            await Provincia.create({
                provincia_id: provincia.id,
                provincia_nombre: provincia.nombre,
            })
        }
        provincias = await Provincia.findAll();
    };
    res.status(200).send({
        data: provincias
    });
}

const data_municipios = async function (req, res) {
    await Municipio.sync();
    var municipios = await Municipio.findAll({
        where: {
            provincia_id: req.params.provincia_id
        }
    });
    if (municipios.length == 0) {
        console.log("Sin datos de municipios");
        //En caso de estar vacía la tabla se busca la información
        let data_municipios = await axios.get("https://apis.datos.gob.ar/georef/api/municipios?campos=estandar&max=2100")
            .then(function(data) {
                return data;
            })
            .catch(function(err) {
                console.error(err);
            });
        for (let municipio of data_municipios.data.municipios) {
            await Municipio.create({
                municipio_id: municipio.id,
                municipio_nombre: municipio.nombre,
                provincia_id: municipio.provincia.id
            })
        }
        municipios = await Municipio.findAll({
            where: {
                provincia_id: req.params.provincia_id
            }
        });
    };
    res.status(200).send({
        data: municipios
    });
}

const data_ciudades = async function (req, res) {
    await Ciudad.sync();
    var ciudades = await Ciudad.findAll({
        where: {
            municipio_id: req.params.municipio_id
        }
    });
    if (ciudades.length == 0) {
        console.log("Sin datos de ciudades");
        //En caso de estar vacía la tabla se busca la información
        let data_ciudades = await axios.get("https://apis.datos.gob.ar/georef/api/localidades?campos=estandar&max=4100")
            .then(function(data) {
                return data;
            })
            .catch(function(err) {
                console.error(err);
            });
        for (let ciudad of data_ciudades.data.localidades) {
            await Ciudad.create({
                ciudad_id: ciudad.id,
                ciudad_nombre: ciudad.nombre,
                municipio_id: ciudad.municipio.id
            })
        }
        ciudades = await Ciudad.findAll({
            where: {
                municipio_id: req.params.municipio_id
            }
        });
    };
    res.status(200).send({
        data: ciudades
    }); 
}

module.exports = {
    data_activ_economica,
    data_provincias,
    data_municipios,
    data_ciudades
} 