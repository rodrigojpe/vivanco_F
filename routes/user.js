'use strict'

var express = require('express');
var UserController = require('../controllers/user.controller');

var api = express.Router();
// api.get('/pruebas-del-controlador', UserController.pruebas);

// middelware
var md_auth = require('../middelware/authenticated');

var multipart = require('connect-multiparty');
let  md_upload = multipart({uploadDir: './uploads/users'});

api.get('/pruebas', UserController.pruebas);
api.post('/create', UserController.createUser);
api.post('/login', UserController.login);
api.put('/update-user/:id', [md_auth.ensureAuth, md_upload], UserController.updateUser);
api.post('/upload-img/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-image-file/:imageFile', UserController.getImagen);


module.exports = api;
