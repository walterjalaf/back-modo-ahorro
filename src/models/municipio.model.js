
const {Sequelize, Model, DataTypes} = require("sequelize")
require('dotenv').config();

const Provincia = require("./provincia.model");
var env = process.env.NODE_ENV || 'development';
const dbconfig = require('../../config/database.json')[env];

const sequelize = new Sequelize(
    dbconfig.database, dbconfig.username, dbconfig.password, {
    host: dbconfig.host,
    dialect: dbconfig.dialect
  });


class Municipio extends Model{}

Municipio.init({
    municipio_id: {
        type: DataTypes.STRING,
        primaryKey: true
    } ,
    municipio_nombre: {
        type: DataTypes.STRING,
        allowNull: false           // no se permite que sean datos nulos
    }
}, {
    sequelize,
    modelName: "municipio"
})

Provincia.hasMany(Municipio, {
    foreignKey: 'provincia_id',
  });
Municipio.belongsTo(Provincia, {
    foreignKey: 'provincia_id',
  });

//Municipio.sync();
module.exports = Municipio