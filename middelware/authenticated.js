'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var clave = 'clave_secreta_curso_angular';


exports.ensureAuth = function(req, res , next){
  if (!req.headers.authorization) {
    return res.status(403).send({message: 'no tiene la cabezera de autenticazion'});
  }
  console.log('mostrando el expirate');

  var token = req.headers.authorization.replace(/['"]+/g, '');

  try {
    var payload = jwt.decode(token, clave);
        // console.log(payload);
        // console.log(moment().format('LT'));

    // if (payload.exp <= momnet().unix()) {
    //
    //     return res.status(401).send({message: 'el token ha expirado'});
    //     console.log('session caducada');
    //     // localStorage.clear();
    // }
  } catch (e) {
    return res.status(404).send({message: 'el token no es válido'});
  }
  req.user = payload;
  next();
}
