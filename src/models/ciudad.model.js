
const {Sequelize, Model, DataTypes} = require("sequelize")
require('dotenv').config();

const Municipio = require("./municipio.model");
var env = process.env.NODE_ENV || 'development';
const dbconfig = require('../../config/database.json')[env];

const sequelize = new Sequelize(
    dbconfig.database, dbconfig.username, dbconfig.password, {
    host: dbconfig.host,
    dialect: dbconfig.dialect
  });


class Ciudad extends Model{}

Ciudad.init({
    ciudad_id: {
        type: DataTypes.STRING,
        primaryKey: true
    } ,
    ciudad_nombre: {
        type: DataTypes.STRING,
        allowNull: false           // no se permite que sean datos nulos
    }
}, {
    sequelize,
    modelName: "ciudad"
})

Municipio.hasMany(Ciudad, {
    foreignKey: 'municipio_id',
  });
Ciudad.belongsTo(Municipio, {
    foreignKey: 'municipio_id',
  });

//Ciudad.sync();
module.exports = Ciudad