var jwt = require('jwt-simple');
var moment = require("moment")
var secret = "modo-ahorro-13.08"

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