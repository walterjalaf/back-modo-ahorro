var jwt = require('jwt-simple');
var moment = require("moment");
require('dotenv').config();

const secret = process.env.SECRET;

exports.createToken = function (user) {
    const payload = {
        sub: user.gestor_id,
        gestor_nombre: user.gestor_nombre,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(1, 'day').unix(),
    }
    return jwt.encode(payload, secret);
}

// Decodifica el token y retorna el id del usuario gestor
exports.decodeToken = function (req) {
    const token = jwt.decode(req.headers.authorization.replace(/['"]+/g,''), secret);
    return token.sub;
}