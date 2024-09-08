

// Inicializa express.
const express = require("express");
const app = express();

/**
 * Morgan sirve para ver las peticiones del http.
*/
const morgan = require("morgan");
app.use(morgan("dev"))




// Instancia de la ruta donde tengo mi http.

const empresa_routes = require('../../routes/empresa')

const gestor_routes = require('../../routes/gestor')

/**
 * 
 *  Inicio de configuraciones del body y los headers... TODO: Investigar más a fondo cada linea.
 */

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({limit: '50mb', extended:true}));
app.use(bodyParser.json({limit: '50mb', extended:true}));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use(express.json())
app.use('/api', empresa_routes);
app.use('/api', gestor_routes);


module.exports = app;