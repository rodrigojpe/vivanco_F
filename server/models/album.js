'use strict'
var mongoose = require('mongoose');
const { Schema } = mongoose;

var AlbumSchema = Schema({
  name: String ,
  year: String ,
  description: String ,
  image: String,
  artist: {type: Schema.ObjectId, ref: 'Artist'}
});

module.exports = mongoose.model('Album', AlbumSchema);
