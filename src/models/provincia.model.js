
const {Sequelize, Model, DataTypes} = require("sequelize")
require('dotenv').config();

var env = process.env.NODE_ENV || 'development';
const dbconfig = require('../../config/database.json')[env];

const sequelize = new Sequelize(
    dbconfig.database, dbconfig.username, dbconfig.password, {
    host: dbconfig.host,
    dialect: dbconfig.dialect
  });


class Provincia extends Model{}

Provincia.init({
    provincia_id: {
        type: DataTypes.STRING,
        primaryKey: true

    } ,
    provincia_nombre: {
        type: DataTypes.STRING,
        allowNull: false 
    }
}, {
    sequelize,
    modelName: "provincia"
})

//Municipio.sync();
module.exports = Provincia