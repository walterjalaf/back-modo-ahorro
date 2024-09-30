
//const {faker} = require("@faker-js/faker") --> solo se usa en las pruebas.

const { col } = require('sequelize');

var jwt =require('../helpers/jwt'); 
const Empresa = require("../src/models/empresa.model"); // instancia del modelo de la tabla Colaborador.
const UbicacionEmpresa = require('../src/models/ubicacion_empresa.model');

/**
 * Crea una nueva empresa
 */
const crear_empresa = async function (req, res) {
    if (req.user) {
        // Obtengo los datos enviados desde el formulario
        const data = req.body;
        const user_id = jwt.decodeToken(req);
        // Si la tabla empresa y ubicacion_Empresa no existen se crean.
        await Empresa.sync();
        await UbicacionEmpresa.sync();
        let empresa = await Empresa.create({
                empresa_nombre: data.empresa_nombre,
                tamaño: data.tamanño,
                rubro: data.rubro,
                codigo: data.codigo,
                cuit: data.cuit,
                cantidad_empleados: data.cantidad_empleados,
                telefono: data.telefono,
                correo: data.correo,
                sede: data.sede,
                provincia_fiscal: data.provincia_fiscal,
                departamento_municipio_fiscal: data.departamento_municipio_fiscal,
                ciudad_fiscal: data.ciudad_fiscal,
                cod_postal_fiscal: data.cod_postal_fiscal,
                domicilio_fiscal: data.domicilio_fiscal,
                facturacion_anual_sin_iva: data.facturacion_anual_sin_iva,
                estado: data.estado,
                gestor_id: user_id,
                superficie: data.superficie,
                tipo_nivel_superficie: data.tipo_nivel_superficie,
                tipo_config_superficie: data.tipo_config_superficie,
                ubicacion_empresas: data.ubicacion_empresas
            },
            {
                include: [UbicacionEmpresa]
            }
        )
        res.status(200).send({
            data: empresa 
        });
}}

/**
* Lista todas las empresas en la base de datos
*/
const listar_empresas = async function (req, res) {
    let empresas = await Empresa.findAll({
        include: [{ all: true}]
    });
    res.status(200).send({
        data: empresas
    })
}


/**
* Retorna los datos de una empresa asociada a un gestor
*/
const obtener_datos_empresa = async function (req, res) {
    if (req.user) {
        // Obtengo el id de la empresa desde el parámetro de la petición
        let id = req.params['id'];
        // Obtengo el id del gestor que realiza la petición
        const user_id = jwt.decodeToken(req);
        try {
            let empresa = await Empresa.findByPk(id)
            // Verifico que la empresa solicitada está asociada al gestor
            if (empresa.gestor_id  === user_id) {
                res.status(200).send({
                    data: empresa
                })
            } else {
                res.status(403).send({
                    data: undefined,
                    message: "Acceso no autorizado"
                })
            }
        } catch (error) {
            res.status(500).send({
                data: undefined,
                message: "Error en el servidor"
            })
        }
    }else {
        res.status(403).send({
            data: undefined, 
            message:"No se pudo encontrar el gestor."
        })

    }
}

/**
* Elimina una empresa dado su id
*/
const eliminar_empresa = async function (req, res) {
    console.log("Delete empresa");
    if (req.user) {
        // Obtengo el id de la empresa desde el parámetro de la petición
        let id = req.params['id'];
        // Obtengo el id del gestor que realiza la petición
        const user_id = jwt.decodeToken(req);
        try {
            let empresa = await Empresa.findByPk(id)
            // Verifico que la empresa solicitada está asociada al gestor
            if (empresa.gestor_id  === user_id) {
                // Busca y elimina las ubicaciones asociadas a la empresa
                let ubicaciones = await UbicacionEmpresa.findAll({
                    where: {
                        empresa_id: empresa.empresa_id
                    }
                });
                for (let ubicacion of ubicaciones) {
                    ubicacion.destroy();
                }
                // Elimina la empresa
                empresa.destroy();
                res.status(200).send({
                    data: "Deleted"
                })
            } else {
                res.status(403).send({
                    data: undefined,
                    message: "Acceso no autorizado"
                })
            }
        } catch (error) {
            res.status(500).send({
                data: undefined,
                message: "Error en el servidor"
            })
        }
    }else {
        res.status(403).send({
            data: undefined, 
            message:"No se pudo encontrar el gestor."
        })

    }
}

/**
* Actualiza la información de una empresa
*/
const actualizar_empresa = async function (req, res) {
    if ( req.user) {
        // Obtengo el id de la empresa a actualizar.
        let id = req.params['id'];
        // Obtengo los datos enviados desde el formulario
        let data = req.body;
        const user_id = jwt.decodeToken(req);
        try {
            let empresa = await Empresa.findByPk(id, {include: [{ all: true}]})
            if (empresa.gestor_id  === user_id) {
                empresa.set({
                    empresa_nombre: data.empresa_nombre,
                    tamaño: data.tamanño,
                    rubro: data.rubro,
                    codigo: data.codigo,
                    cuit: data.cuit,
                    cantidad_empleados: data.cantidad_empleados,
                    telefono: data.telefono,
                    correo: data.correo,
                    sede: data.sede,
                    provincia_fiscal: data.provincia_fiscal,
                    departamento_municipio_fiscal: data.departamento_municipio_fiscal,
                    ciudad_fiscal: data.ciudad_fiscal,
                    cod_postal_fiscal: data.cod_postal_fiscal,
                    domicilio_fiscal: data.domicilio_fiscal,
                    superficie: data.superficie,
                    tipo_nivel_superficie: data.tipo_nivel_superficie,
                    tipo_config_superficie: data.tipo_config_superficie,
                    facturacion_anual_sin_iva: data.facturacion_anual_sin_iva,
                    estado: data.estado,
                    gestor_id: user_id
                });
                // Actualiza los datos asociados a las ubicaciones
                empresa.set({
                    ubicacion_empresas: data.ubicacion_empresas
                });
                empresa.save();
                res.status(200).send({
                    data: empresa
                });
            } else {
                res.status(403).send({
                    data: undefined,
                    message: "Acceso no autorizado"
                })
            }
        } catch (error) {
            res.status(500).send({
                data: undefined,
                message: "Error en el servidor"
            })
        }
    } else {
        res.status(403).send({data: undefined, message:"No token."})
    }
}

module.exports = {
    crear_empresa,
    listar_empresas,
    obtener_datos_empresa,
    eliminar_empresa,
    actualizar_empresa
} 