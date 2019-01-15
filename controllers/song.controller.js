'use strict'

// const User = require('../models/user');
const Song = require('../models/song');
const Album = require('../models/album');
const Artist = require('../models/artist');


// const bcrypt = require('bcrypt-nodejs');
// servicio jwt
var path = require('path');
// const jwt = require('../services/jwt');
var fs = require('fs');
const cancionCtrl = {};


cancionCtrl.saveCancion = async(req, res) => {
if (req.body.name) {
  let song = new Song({
    number:req.body.number,
    name:  req.body.name,
    duration: req.body.duration,
    file:'null',
    album:req.body.album
  });
   await  song.save((err, songStored) =>{
      if (err) {
        res.status(500).send({ message:'Error en el servidor' });
      }else{
        if (!songStored) {
          res.status(404).send({ message:'Error al guardar la cancion' });
        }else{
          res.status(200).send({ song: songStored });
        }
      }
    })
  }else{
    res.status(200).send({ message:'Nombre de la cancion es obligatorio' });
  }
}

cancionCtrl.getSong = async(req, res) =>{
  var songId = req.params.id;
  // console.log(songId);
await  Song.findById(songId).populate({path: 'album'}).exec((err, song) => {
    if (err) {
      res.status(500).send({ message:'error en la peticion' });
    }else{
      if (!song) {
        res.status(404).send({ message:'Error al buscar la cancion' });
      }else{
        res.status(200).send({ song: song });
      }
    }
  });
}

cancionCtrl.getSongs = async(req, res) =>{
  var albumId = req.params.album;

if (albumId) {
    var find = Song.find({}).sort('number');
}else{
  var find = Song.find({albums : albumId}).sort('number');
}

await find.populate({
  path: 'album',
  populate : {
      path: 'artist',
      model: 'Artist'
  }
}).exec((err , songs ) =>{
  if (err) {
    res.status(500).send({ message:'error en la peticion' });
  }else{
    if (!songs) {
      res.status(404).send({ message:'Error al guardar la cancion' });
    }else{
      res.status(200).send({ songs });
    }
  }
});
}

cancionCtrl.updateSong = async(req, res) =>{
  var songId = req.params.id;
  var update = req.body;

  Song.findByIdAndUpdate(songId,update, (err,songUpdate ) => {
      if (err) {
        res.status(500).send({ message:'error en la peticion' });
      }else{
        if (!songUpdate) {
          res.status(404).send({ message:'Error al actualizar la cancion' });
        }else{
          res.status(200).send({ song:songUpdate});
        }
      }
  });
}

cancionCtrl.deleteSong = async(req, res) =>{
  var songId = req.params.id;

  await  Song.findByIdAndDelete({_id:songId}, (err, sondRemoved) =>{
        if (err) {
          res.status(500).send({ message:'error en la peticion' });
        }else{
          if (!sondRemoved) {
            res.status(404).send({ message:'Error al Eliminar la cancion' });
          }else{
            res.status(200).send({ song:sondRemoved});
          }
        }
    })
}

cancionCtrl.getSongFile = async(req,res) =>{
  var imageFile= req.params.songFile;
  var path_file = './uploads/songs/'+imageFile;
  fs.exists(path_file, (exists)=>{
    if (path_file) {
      res.sendFile(path.resolve(path_file));
    }else{
      res.status(404).send({message: 'La imagen no existe'});
    }
  });

}


cancionCtrl.uploadSongFile = async(req, res ) =>{
// await  res.status(200).send({message: 'upload image'})
var songID = req.params.id;
var file_name = "no subido..";
 //
  console.log(req.params);
  console.log(songID);

 if  (req.files) {
    var file_path =  req.files.file.path;
    var nombre = path.basename(file_path);
    var dir = path.dirname(file_path);
    var file_split = file_path.split('.');
    console.log(file_split);
     var file_name1 = file_split[1];
     console.log(nombre);
     console.log(file_name1);

    // var file_name = nombre;
    // console.log(file_name);
    // return;

    // var ext_split = file_name1.split('\.');
     // var file_ext = path.extname(nombre);
     // console.log(file_name);
     // return;

if (file_name1 == 'mp3' || file_name1 == 'ogg' || file_name1 == 'wav' || file_name1 == 'mpeg'  ) {
    // return  res.status(500).send({ message: 'no tiens permiso para actualizar el usuario'  });

  await Song.findByIdAndUpdate({_id:songID}, {file: nombre},  (err, songUpdate) => {
    if (err) {
      res.status(500).send({ message: err});
    }else{
      if (!songUpdate) {
        res.status(500).send({ message: 'No se pudo actualizar el usuario'});
      }else{
        res.status(200).send({ song: songUpdate  });
      }
    }
  });


}else{

  fs.unlink(file_path, (err)=>{
    if (err) {
     return   res.status(200).send({message: 'EXTENCION NO VALIDA Y FICHERO NO BORRADO'});
    }else{
    return  res.status(200).send({message: 'EXTENCION NO VALIDA AL BORRAR FICHERO'});
    }
  })
  res.status(200).send({message: 'EXTENCION NO VALIDA'});

}

   }else{
   return  res.status(200).send({message: 'no has cargdo el fichero de audio'});
   }
};

module.exports =   cancionCtrl;
