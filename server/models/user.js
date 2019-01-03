'use strict'
var mongoose = require('mongoose');
const { Schema } = mongoose;

var UserSchema = Schema({
  name: { type: String , required: true},
  surname: { type: String , required: true},
  email: { type: String , required: false},
  password: { type: String , required: true},
  image: {type:String, required: false},
  role: { type: String , required: true}

});

module.exports = mongoose.model('User', UserSchema);
