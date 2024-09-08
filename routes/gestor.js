const express = require('express');

// Instancia del controlador -> puedo acceder a la lógica de la petición.
const gestorController = require('../controllers/gestorController');
const app = express.Router();

// llamó al token de autentificación
const auth =require('../middlewares/authenticate')

// Protocolo Http + path + lógica a realizar

/*
 *  POST
 */
app.post('/registro_gestor', auth.auth, gestorController.registro_gestor );
app.post('/login_gestor', gestorController.login_gestor)


/*
 *  GET
 */

app.get('/listar_gestores', auth.auth, gestorController.listar_gestores);
app.get('/obtener_datos_gestor/:id', auth.auth, gestorController.obtener_datos_gestor)

/**
 * UPDATE
 * 
 */

app.put('/actualizar_gestor/:id', auth.auth, gestorController.actualizar_gestor);

module.exports = app;