'use strict'

var express = require('express');
var artistController = require('../controllers/artist.controller');
var api = express.Router();
// middelware
var md_auth = require('../middelware/authenticated');

 var multipart = require('connect-multiparty');
// var md_admin = require('../middelware/is_admin');
 let  md_upload = multipart({uploadDir: './uploads/artist'});

 api.get('/artist/:id', md_auth.ensureAuth, artistController.getArtis);
 api.get('/artists/:page?', md_auth.ensureAuth, artistController.getArtists);
 api.post('/artist',md_auth.ensureAuth, artistController.saveArtist);
 api.put('/artist/:id', md_auth.ensureAuth, artistController.updateArtist);
 api.delete('/artist/:id', md_auth.ensureAuth, artistController.deleteArtist);
 api.post('/upload-img-artist/:id', [md_auth.ensureAuth, md_upload], artistController.uploadImage);
 api.get('/upload-img-artist/:imageFile', artistController.getImagen);

module.exports = api;
