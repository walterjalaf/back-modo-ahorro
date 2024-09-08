var jwt = require('jwt-simple')
var moment =require('moment')
var secret = "modo-ahorro-13.08"

exports.auth = function (req, res, next){
    if (!req.headers.authorization){
        return res.status(403).send({
            message: "No headers errors."
        })
    }
    const token = req.headers.authorization.replace(/['"]+/g,'')

    const segment = token.split('.')
    if (segment.length != 3){
        return res.status(403).send({
            message: "Invalid token."
        })
    } else {
        try {
            var payload = jwt.decode(token, secret)
            if (payload.exp <= moment().unix()) {
                return res.status(403).send({
                    message: "Token expirado."
                })
            } 
            
            
        } catch (error) {
            return res.status(403).send({
                message: "Error token."
            })
        }

    }
    req.user = payload
    next();
    
}