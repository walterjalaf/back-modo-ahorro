## Antes de utilizar este proyecto
### 1 - Se debe tener una base de datos Mysql creada en local: 
En src/models/gestor.model.js o cualquier modelo se deben colocar los datos referentes a la base de datos instalada en local. Dado el caso de no existir se deberá crear una.
const sequelize = new Sequelize(
    "mibase", "admin", "12345678", {
    host: 'localhost',
    dialect: 'mysql' 
  });

  En el ejemplo presente se usa "mibase" que es el nombre de la base de datos, "admin" es el nombre del usuario y "12345678" es la contraseña del usuario. Todos estos valores deben guardarse en variables de entorno y acceder desde ahí en próximos commits.
### 2 - Se deben instalar las dependencias:

Instalar las dependencias con npm i:
"dependencies": {
    "@faker-js/faker": "^8.4.1",
    "bcrypt-nodejs": "^0.0.3",
    "body-parser": "^1.20.2",
    "connect-multiparty": "^2.2.0",
    "express": "^4.19.2",
    "jwt-simple": "^0.5.6",
    "moment": "^2.30.1",
    "morgan": "^1.10.0",
    "mysql": "^2.18.1",
    "mysql2": "^3.11.0",
    "sequelize": "^6.37.3"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
### 3 - La clave secreta debe pasarse a variables de entorno antes de subir próximos commits.
En helpers/jwt.js y middlewares/authenticate.js se tiene una 'var secret = "modo-ahorro-13.08" ' ese dato es el que debe cambiarse a una variable de entorno.

## Alcance del primer commit.
Se tiene como crear un usuario/gestor y su CRUD básico. La tabla empresa no está terminada y es se tiene solo un ejemplo de idea de cómo se puede trabajar pero está al criterio del equipo de back el personalizarla. 



