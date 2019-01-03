  'use strict'

const Album = require('../models/album');
const Song = require('../models/song');

// const bcrypt = require('bcrypt-nodejs');
// servicio jwt
var path = require('path');
// const jwt = require('../services/jwt');
var fs = require('fs');
const albumCtrl = {};

albumCtrl.saveAlbum = async(req, res) => {
  let album = new Album;
  let params = req.body;
if (req.body.name) {
    album.name = params.name;
    album.year = params.year;
    album.description = params.description;
    album.image= 'null';
    album.artist = params.artist;

// console.log(req);
   await  album.save((err, albumStored) =>{
      if (err) {
        res.status(500).send({ message:'Error en el servidor' });
      }else{
        if (!albumStored) {
          res.status(404).send({ message:'Error al guardar el animal' });
        }else{
          res.status(200).send({ album: albumStored });
          console.log(albumStored);
        }
      }
    })
  }else{
    res.status(200).send({ message:'Nombre del album es Obligatorio' });
  }
}

albumCtrl.saveSong = async(req, res) => {
if (req.body.name) {
  let song = new Song({
    name:  req.body.name,
    year:req.body.year,
    description: req.body.description,
    image:req.body.image,
    album:req.body.album
  });
// console.log(req);
   await  song.save((err, songStored) =>{
      if (err) {
        res.status(500).send({ message:'Error en el servidor' });
        console.log(err);

      }else{
        if (!songStored) {
          res.status(404).send({ message:'Error al guardar el animal' });
        }else{
          res.status(200).send({ song: songStored });
        }
      }
    })
  }else{
    res.status(200).send({ message:'Nombre del animal es obligatorio' });
  }
}


albumCtrl.getAlbum = async(req, res) =>{
  var albumID = req.params.id;
await  Album.findById(albumID).populate({path: 'artist'}).exec((err, album) => {

    if (err) {
      res.status(500).send({ message:'error en el servidor' });
    }else{
      if (!album) {
        res.status(404).send({ message:'No hay albunes' });
      }else{
        res.status(200).send({ album: album });
      }
    }
  });
}

albumCtrl.getAlbums = async (req, res) =>{
  var artistID = req.params.artist;

  if (!artistID) {
    var find = Album.find({}).sort('name');
  }else{
    var find = Album.find({ artist : artistID}).sort('year');
  }
await  find.populate({path : 'artist'}).exec((err, albums) =>{
      if (err) {
        res.status(500).send({ message:'error en el servidor' });
      }else{
          if (!albums) {
            res.status(404).send({ message:'No hay albunes' });
          }else{
            res.status(200).send({ albums: albums });
          }
      }
  });
}

albumCtrl.updateAlbum = async (req, res)=>{
    var albumId = req.params.id;
    var update = req.body;
    console.log(albumId);
     delete update._id;
    console.log(update);

    try {
    await  Album.findOneAndUpdate({_id:albumId}, update , {new :true}, (err, albumUpdate) =>{
        if (err) {
          // console.log(err);
           res.status(500).send({ message:'error en el servidor' });
        }else{
            if (!albumUpdate) {
              res.status(404).send({ message:'No se actualizo el Album' });

            }else{
              res.status(200).send({ album: albumUpdate });
              console.log('Actualizado');
              console.log(albumUpdate);
              return;
            }
        }
      });
    } catch (e) {
      console.log(e);
}

}

albumCtrl.deleteAlbum = async(req, res)=>{
  var albumId = req.params.id;

await  Album.findByIdAndRemove(albumId, (err, albumRemove) =>{
      if (err) {
        res.status(500).send({message : 'error en la peticion'})
      }else{
          if (!albumRemove) {
            res.status(404).send({message : 'album no ha sido eliminado'})
          }else{
              Song.find({album : albumRemove._id}).remove((err, songRemove) =>{
                if (err) {
                  res.status(500).send({message : 'error en la peticion'})
                }else{
                    if (!albumRemove) {
                      res.status(404).send({message : 'Song no ha sido eliminado'})
                    }else{
                      res.status(200).send({song : albumRemove})
                    }
                 }
             });
          }
      }
  });
}

albumCtrl.getImagen = async(req,res) =>{
  var imageFile= req.params.imageFile;
  var path_file = './uploads/albums/'+imageFile;
  fs.exists(path_file, (exists)=>{
    if (path_file) {
      res.sendFile(path.resolve(path_file));
    }else{
      res.status(404).send({message: 'La imagen no existe'});
    }
  });

}


albumCtrl.uploadImage = async(req, res ) =>{
// await  res.status(200).send({message: 'upload image'})
var albumID = req.params.id;
var file_name = "no subido..";

// console.log(userID);
// return;

 if  (req.files) {
    var file_path =  req.files.image.path;
    var nombre = path.basename(file_path);
    var dir = path.dirname(file_path);
    var file_split = file_path.split('/');
    // var file_name1 = file_split[2];
 //
    var file_name = nombre;

    // var ext_split = file_name1.split('\.');
     var file_ext = path.extname(file_name);

if (file_ext == '.png' || file_ext == '.jpg' || file_ext == '.jpeg' || file_ext == '.gif' ) {
    // return  res.status(500).send({ message: 'no tiens permiso para actualizar el usuario'  });

  await Album.findByIdAndUpdate(albumID, {image: file_name}, {new :true}, (err, albumUpdate) => {
    if (err) {
      res.status(500).send({ message: 'Error al actualizar el usuario'});
    }else{
      if (!albumUpdate) {
        res.status(500).send({ message: 'No se pudo actualizar el usuario'});
      }else{
        res.status(200).send({ album: albumUpdate, image: file_name });
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
   return  res.status(200).send({message: 'no has cargdo una imagen..'});
   }
};

module.exports =   albumCtrl;
