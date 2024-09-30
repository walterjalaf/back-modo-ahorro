
const {Sequelize, Model, DataTypes} = require("sequelize")
require('dotenv').config();

const Empresa = require("./empresa.model");
var env = process.env.NODE_ENV || 'development';
const dbconfig = require('../../config/database.json')[env];

const sequelize = new Sequelize(
    dbconfig.database, dbconfig.username, dbconfig.password, {
    host: dbconfig.host,
    dialect: dbconfig.dialect
  });


class UbicacionEmpresa extends Model{}

UbicacionEmpresa.init({
    ubicacion_empresa_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    provincia: {
        type: DataTypes.STRING,
        allowNull: true
    },
    departamento_municipio: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ciudad: {
        type: DataTypes.STRING,
        allowNull:true
    },
    cod_postal: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    domicilio: {
        type: DataTypes.STRING,
        allowNull: true
    }

}, {
    sequelize,
    modelName: "ubicacion_empresa"
})

Empresa.hasMany(UbicacionEmpresa, {
    foreignKey: 'empresa_id',
  });
UbicacionEmpresa.belongsTo(Empresa, {
    foreignKey: 'empresa_id',
  });

//Empresa.sync();
module.exports = UbicacionEmpresa