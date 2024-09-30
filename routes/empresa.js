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
app.get('/listar_empresas', auth.auth,  empresaController.listar_empresas);
app.get('/obtener_datos_emrpesa/:id', auth.auth, empresaController.obtener_datos_empresa);

/**
 * 
 * DELETE
 * 
 */
app.delete('/eliminar_empresa', auth.auth, empresaController.eliminar_empresa);

/**
 * UPDATE
 * 
 */
app.put('/actualizar_empresa/:id', auth.auth, empresaController.actualizar_empresa);

module.exports = app;