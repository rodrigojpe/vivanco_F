'use strict'

var express = require('express');
var songController = require('../controllers/song.controller');

var api = express.Router();
// api.get('/pruebas-del-controlador', UserController.pruebas);

// middelware
var md_auth = require('../middelware/authenticated');

var multipart = require('connect-multiparty');
// var md_admin = require('../middelware/is_admin');
let  md_upload = multipart({uploadDir: './uploads/songs'});

api.get('/song/:id',md_auth.ensureAuth, songController.getSong);
api.post('/song',md_auth.ensureAuth, songController.saveCancion);
api.get('/songs/:album?', songController.getSongs);

// api.post('/login', UserController.login);
api.put('/update/:id',md_auth.ensureAuth,  songController.updateSong);
api.delete('/song/:id', md_auth.ensureAuth, songController.deleteSong);
api.post('/upload-song-file/:id', [md_auth.ensureAuth, md_upload], songController.uploadSongFile);
api.get('/get-song-file/:songFile',songController.getSongFile);


module.exports = api;
