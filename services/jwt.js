'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var clave = 'clave_secreta_del_curso_angular';

exports.createToken  = function(user) {
  var pyload = {
    sub:user.id,
    name:user.name,
    surname:user.surname,
    email:user.email,
    role:user.role,
    image:user.image,
    iat: moment().unix,
    exp: moment().add(1,'minutes').unix
  };

  return jwt.encode(pyload, clave);
}
