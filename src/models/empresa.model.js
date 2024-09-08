
const {Sequelize, Model, DataTypes, UUIDV4} = require("sequelize")

const sequelize = new Sequelize(
    "mibase", "admin", "12345678", {
    host: 'localhost',
    dialect: 'mysql' 
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
        allowNull: false // no se permite que sean datos nulos
    },
    tamaño: {
        type: DataTypes.INTEGER,
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
    ciudad: {
        type: DataTypes.STRING,
        allowNull:false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull:false
    }

}, {
    sequelize,
    modelName: "empresa"
})

module.exports = Empresa