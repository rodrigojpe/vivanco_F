'use strict'

const express = require('express');
var api = express.Router();
var contactCtrl = require('../controllers/contac.controller');
// let  md_upload = multipart({uploadDir: './public/img'});

api.post('/send', contactCtrl.sendMail);

module.exports = api;
