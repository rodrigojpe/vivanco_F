 'use strict'

var express = require('express');
var bodyParser =  require('body-parser');
var app = express();
var path = require('path');

// rutas
var user_router = require('./routes/user');
var album_router = require('./routes/album');
var song_router = require('./routes/song');
var artist_route = require('./routes/artist');
var contact = require('./routes/contact');
// app.use(express.static('./public/img'));
// app.use('/static', express.static(__dirname + './public/img'));


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// configurar cabeceras y cors
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
    next();

});

// rutas
// app.use('/', contactRouter);
app.use('/', express.static('client',{redirect:false}));
app.use('/', user_router);
app.use('/', album_router);
app.use('/', song_router);
app.use('/', artist_route);
app.use('/', contact);

app.get('*', function(req,res,next){
  res.sendFile(path.resolve('client/index.html'));
})









module.exports = app;
