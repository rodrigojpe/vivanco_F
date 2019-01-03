'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var clave = 'clave_secreta_curso_angular';

// var diffDuration = moment.duration(diff);


exports.createToken  = function(user) {


   // console.log(date);
   // console.log(exp);
  var payload = {
    sub:user.id,
    name:user.name,
    surname:user.surname,
    email:user.email,
    role:user.role,
    image:user.image,
    iat: moment().unix(),
    exp: moment().add(1,'days').unix()
  };

  return jwt.encode(payload, clave);
}
