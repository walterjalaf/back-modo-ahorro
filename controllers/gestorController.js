

const { where, Sequelize } = require('sequelize');
var jwt =require('../helpers/jwt'); // instancia para crear tokens
const Empresa = require('../src/models/empresa.model');

const Gestor = require("../src/models/gestor.model"); // instancia del modelo de la tabla Gestor.

const bycrypt = require("bcrypt-nodejs"); // Instancia para encriptar datos.


/**
 * 
 * Lógica de negocio
 * 
 */
const registro_gestor = async function (req, res) {

    if ( !req.user) {
        // Obtengo los datos enviados desde el formulario
    const data = req.body;
        
    // Intento crear un nuevo Gestor y chequeo si la contraseña se puede encriptar y si el email ya existe.
    try {
        // Si la tabla Gestor no existe se crea.
        await Gestor.sync()
        
        // Realizo una consulta sobre si un email se encuentra en la tabla gestor.
        const gestor_email = await Gestor.findAll({where: {email:data.email}})

        // Encripto la contraseña 
        bycrypt.hash(data.password, null, null, async function (err, hash) {
            if (err){
                res.status(200).send(
                    {data:undefined,
                    message: "No se pudo generar la contraseña."})
            }else{
                if(gestor_email.length >= 1){
                    res.status(200).send(
                        {data:undefined,
                        message: "El correo electrónico ya existe."})
                }else{
                    console.log("Creando gestor");
                    let gestor = await Gestor.create({
                        gestor_nombre: data.gestor_nombre,
                        gestor_apellido: data.gestor_apellido,
                        cuit: data.cuit,
                        provincia: data.provincia,
                        password: hash,
                        email: data.email
                    })
                    res.status(200).send({
                        data: gestor 
                    });
                }
            }
        });
    } catch (err) {
        res.status(200).send({data: undefined, message:"Verifique los campos del formulario." + err})
    }
    } else {
        res.status(403).send({data: undefined, message:"No token."})

    }
}

const login_gestor = async function (req, res) {
    // Obtengo los datos enviados desde el formulario
    let data = req.body;
    console.log({data});
    //Realizo una consulta sobre si un email se encuentra en la tabla gestor.
    const gestor_email = await Gestor.findAll({where: {email:data.email}})
    //Verifico que el email se encuentra en la mi base de datos
    if (gestor_email.length >=1){
        // si el estado es true es porque tiene acceso a la plataforma
        bycrypt.compare(
            data.password,
            gestor_email[0].password,
            async function (err, check) {
            if (check){
                // Si el email y la contraseña son correctos se crea el token.
                res.status(200).send({
                    data: gestor_email[0],
                    token: jwt.createToken(gestor_email[0])})
            }else{
                res.status(200).send({
                    data:undefined,
                    message: "La contraseña no existe."})
            }
        })    
    } else {
        res.status(200).send({
            data:undefined,
            message: "El correo electrónico no existe."})
    }
}

const listar_gestores = async function (req, res) {
    if ( req.user) {
        let gestores = await Gestor.findAll({
            include: [{ all: true}]
        });
        console.log(gestores);
        res.status(200).send({
            data: gestores
        })
        
    }else {
        res.status(403).send({data: undefined, message:"No token."})

    }
}

const obtener_datos_gestor = async function (req, res) {
    if ( req.user) {
        let id = req.params['id'];
        try {
            let gestor = await Gestor.findByPk(id)
        res.status(200).send({
            data: gestor
        })
        } catch (error) {
            res.status(200).send({
                data: undefined
            })
        }
    }else {
        res.status(403).send({data: undefined, message:"No se pudo encontrar el gestor."})

    }
}

const actualizar_gestor = async function (req, res) {

    if ( req.user) {

        // Obtengo el id del gestor a actualizar.
        let id = req.params['id'];
        // Obtengo los datos enviados desde el formulario
        let data = req.body;

        let gestor = await Gestor.update({
            gestor_nombre: data.gestor_nombre,
            gestor_apellido: data.gestor_apellido,
            cuit: data.cuit,
            provincia: data.provincia,
            email: data.email,
            departamento: data.departamento,
            domicilio: data.domicilio,
            cod_postal: data.cod_postal,
            telefono: data.telefono,
            pagina_web: data.pagina_web
        },{
            where: {
                gestor_id: id
            }
        });

        res.status(200).send({
            data: gestor
        }) 
    } else {
        res.status(403).send({data: undefined, message:"No token."})

    }
}

module.exports = {
    registro_gestor,
    login_gestor,
    listar_gestores,
    obtener_datos_gestor,
    actualizar_gestor
 
} 