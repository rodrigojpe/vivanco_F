'use strict'
var mongoose = require('mongoose');
const { Schema } = mongoose;

var ArtistSchema = Schema({
  name: { type: String , required: true},
  description: { type: String , required: true},
  image: {type:String, required: false},
});

module.exports = mongoose.model('Artist', ArtistSchema);
