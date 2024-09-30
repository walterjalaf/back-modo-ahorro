
const {Sequelize, Model, DataTypes} = require("sequelize")
require('dotenv').config();

const Gestor = require("./gestor.model");
var env = process.env.NODE_ENV || 'development';
const dbconfig = require('../../config/database.json')[env];

const sequelize = new Sequelize(
    dbconfig.database, dbconfig.username, dbconfig.password, {
    host: dbconfig.host,
    dialect: dbconfig.dialect
  });


class Empresa extends Model{}

Empresa.init({
    empresa_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    } ,
    empresa_nombre: {
        type: DataTypes.STRING,
        allowNull: false           // no se permite que sean datos nulos
    },
    tamaño: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rubro: {
        type: DataTypes.STRING,
        allowNull: true
    }
    ,
    codigo: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    cuit: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    cantidad_empleados: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sede: {
        type: DataTypes.STRING,
        allowNull: true
    },
    provincia_fiscal: {
        type: DataTypes.STRING,
        allowNull: true
    },
    departamento_municipio_fiscal: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ciudad_fiscal: {
        type: DataTypes.STRING,
        allowNull:true
    },
    cod_postal_fiscal: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    domicilio_fiscal: {
        type: DataTypes.STRING,
        allowNull: true
    },
    superficie: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    tipo_nivel_superficie: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tipo_config_superficie: {
        type: DataTypes.STRING,
        allowNull: true
    },
    facturacion_anual_sin_iva: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    estado: {
        type: DataTypes.STRING,
        allowNull:true
    }

}, {
    sequelize,
    modelName: "empresa"
})

Gestor.hasMany(Empresa, {
    foreignKey: 'gestor_id',
  });
Empresa.belongsTo(Gestor, {
    foreignKey: 'gestor_id',
  });

//Empresa.sync();
module.exports = Empresa