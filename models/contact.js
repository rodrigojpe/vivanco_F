'use strict'
var mongoose = require('mongoose');
const { Schema } = mongoose;

var ContactSchema = Schema({
  name: { type: String , required: true},
  surname: { type: String , required: true},
  email: { type: String , required: true},
  message: { type: String , required: true},
  phone: {type:String, required: false},
});

module.exports = mongoose.model('Contact', ContactSchema);
