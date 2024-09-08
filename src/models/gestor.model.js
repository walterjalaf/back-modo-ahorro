
const {Sequelize, Model, DataTypes, UUIDV4} = require("sequelize")

const sequelize = new Sequelize(
    "mibase", "admin", "12345678", {
    host: 'localhost',
    dialect: 'mysql' 
  });



class Gestor extends Model{}

Gestor.init({
    gestor_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true

    } ,
    gestor_nombre: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    gestor_apellido: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    cuit: {
        type: DataTypes.STRING,
        allowNull: false
    }
    ,
    provincia: {
        type: DataTypes.STRING,
        allowNull:false
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Datos que pueden ser nulos
    
    departamento: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    domicilio: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    cod_postal: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    pagina_web: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: "gestor"
})

module.exports = Gestor