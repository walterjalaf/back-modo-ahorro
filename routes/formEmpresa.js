const express = require('express');

// Instancia del controlador para acceder a la lógica de la petición.
const formEmpresaController = require('../controllers/formEmpresaController');
const app = express.Router();

// llamada al token de autenticación
const auth =require('../middlewares/authenticate')

// Protocolo Http + path + lógica a realizar

/*
 *  GET
 */

// Actividades Económicas, retorna un json con las categorías, rubro, subrubro y actividad anidados
app.get('/data_actividades_economicas', formEmpresaController.data_activ_economica);

// Retorna datos de provincias, municipios-departamentos y ciudades
app.get('/data_provincias', formEmpresaController.data_provincias);
app.get('/data_municipios/:provincia_id', formEmpresaController.data_municipios);
app.get('/data_ciudades/:municipio_id', formEmpresaController.data_ciudades);

module.exports = app;