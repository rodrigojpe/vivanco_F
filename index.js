'use strict'
var mongoose = require('mongoose');
var app = require('./server');
var port = process.env.PORT || 3789;
mongoose.Promise = global.Promise;

// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://104.248.235.159:27017/vivanco', { useNewUrlParser: true  })
  .then(() =>{
    console.log('la conexion con vivancoBand se establecio correctamente...');
    app.listen(port , () =>{
      console.log('el servidor se a conectado correctamente...');
    })
  })
  .catch(err => console.log(err))
