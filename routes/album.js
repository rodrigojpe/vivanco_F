'use strict'

var express = require('express');
var albumController = require('../controllers/album.controller');

var api = express.Router();
// api.get('/pruebas-del-controlador', UserController.pruebas);

// middelware
var md_auth = require('../middelware/authenticated');

var multipart = require('connect-multiparty');
// var md_admin = require('../middelware/is_admin');
let  md_upload = multipart({uploadDir: './uploads/albums'});

api.get('/album/:id', albumController.getAlbum);
api.post('/create-album',md_auth.ensureAuth, albumController.saveAlbum);
api.get('/albums/:artist?', albumController.getAlbums);
api.put('/album/:id', albumController.updateAlbum);
api.delete('/album/:id',md_auth.ensureAuth, albumController.deleteAlbum);
api.post('/upload-img-album/:id', [md_auth.ensureAuth, md_upload], albumController.uploadImage);
api.get('/upload-img-album/:imageFile', albumController.getImagen);


 // api.post('/create-song', albumController.saveSong);
// api.post('/login', UserController.login);
 // api.put('/update-album/:id',  albumController.updateAlbum);
// api.post('/upload-img/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
// api.get('/get-image-file/:imageFile',UserController.getImagen);


module.exports = api;
