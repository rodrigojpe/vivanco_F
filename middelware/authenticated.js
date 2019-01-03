'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var clave = 'clave_secreta_del_curso_angular';

exports.ensureAuth = function(req, res , next){
  if (!req.headers.authorization) {
    return res.status(403).send({message: 'no tiene la cabezera de autenticazion'});
  }

  var token = req.headers.authorization.replace(/['"]+/g, '');

  try {
    var payload = jwt.decode(token, clave);
    if (payload.exp <= moment().unix()) {
        return res.status(401).send({message: 'el token ha expirado'});
    }
  } catch (e) {
    return res.status(404).send({message: 'el token no es válido'});
  }
  req.user = payload;
  next();
}
