const express = require('express');

// Instancia del controlador -> puedo acceder a la lógica de la petición.
const empresaController = require('../controllers/empresaController');
const app = express.Router();

// llamó al token de autentificación
const auth =require('../middlewares/authenticate')

// Protocolo Http + path + lógica a realizar

/*
 *  POST
 */
app.post('/crear_empresa', auth.auth, empresaController.crear_empresa );



/*
 *  GET
 */

app.get('/listar_empresas',  empresaController.listar_empresas);


/**
 * 
 * DELETE
 * 
 */

app.delete('/eliminar_empresa', empresaController.eliminar_empresa);

module.exports = app;