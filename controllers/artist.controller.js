'use strict'

const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song')

const bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');
// servicio jwt
var path = require('path');
const jwt = require('../services/jwt');
var fs = require('fs');
const artistCtrl = {};


artistCtrl.getArtists = async (req, res)=>{
  if (req.params.page) {
    var page = req.params.page;

  }else{
    var page = 1;

  }
  var itemsPaginate = 4;

await Artist.find().sort('name').paginate(page, itemsPaginate, function(err, artists, total){
  if (err) {
    res.status(500).send({message : 'error en la peticion'})
  }else{
      if (!artists) {
        res.status(404).send({message : 'No hay Artistas'})
      }else{
         res.status(200).send({ artists : artists, page : total})
      }
    }
  });
}


artistCtrl.getArtis = async(req, res) =>{
  var artistID = req.params.id;
 await  Artist.findById(artistID, (err, artist) => {
    if ( err) {
      res.status(500).send({message : 'error en la peticion'})
    }else{
        if (!artist) {
          res.status(404).send({message : 'Artista no existe'})

        }else{
          res.status(200).send({artist : artist})
        }
    }
  });
}

artistCtrl.deleteArtist = async(req, res, next) =>{
      var artistID = req.params.id;
  Artist.findByIdAndRemove(artistID, (err, artistRemove) =>{
      if (err) {
        res.status(500).send({message : 'error en la peticion'})
      }else{
          if (!artistRemove) {
            res.status(404).send({message : 'Artista no ha sido eliminado'})
          }else{
            // res.status(200).send({artist : artistRemove});
            //buscar relaciones
            Album.find({artist : artistRemove._id}).remove((err, albumRemove) =>{
                if (err) {
                  res.status(500).send({message : 'error en la peticion'})
                }else{
                    if (!albumRemove) {
                      res.status(404).send({message : 'album no ha sido eliminado'})
                    }else{
                      // res.status(200).send({ artistRemove});
                          Song.find({album : albumRemove._id}).remove((err, songRemove) =>{
                              if (err) {
                                res.status(500).send({message : 'error en la peticion'})
                              }else{
                                  if (!albumRemove) {
                                    res.status(404).send({message : 'Song no ha sido eliminado'})
                                  }else{
                                    res.status(200).send({song : songRemove})
                                  }
                              }
                          });
                    }
                }
            });
          }
      }
  });
}

artistCtrl.saveArtist = async(req , res) =>{
  var artist = new Artist;

  var params = req.body;
   artist.name = params.name;
   artist.description = params.description;
   artist.image = 'null';

  await artist.save((err, artistStore) =>{
     if (err) {
        res.status(500).send({message : 'error al guardar el artista'})
     }else{
       if (!artistStore) {
         res.status(404).send({message : 'el artista no fue guardado'})

       }else{
         res.status(200).send({artist : artistStore})
       }
     }
   });
}

artistCtrl.updateArtist = async(req, res) =>{
var artistID = req.params.id;
var update = req.body;

await Artist.findByIdAndUpdate(artistID,update, (err,artistUpdate ) => {
  if (err) {
    res.status(500).send({message : 'error al guardar el artista'})
  }else{
      if (!artistUpdate) {
        res.status(404).send({message : 'el artista no fue Actualizado'})
      }else{
        res.status(200).send({artist : artistUpdate})
      }
  }
});

}
artistCtrl.getImagen = async(req,res) =>{
  var imageFile= req.params.imageFile;
  var path_file = './uploads/artist/'+imageFile;
  fs.exists(path_file, (exists)=>{
    if (path_file) {
      res.sendFile(path.resolve(path_file));
    }else{
      res.status(404).send({message: 'La imagen no existe'});
    }
  });

}


artistCtrl.uploadImage = async(req, res ) =>{
// await  res.status(200).send({message: 'upload image'})
var artistID = req.params.id;
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

  await Artist.findByIdAndUpdate(artistID, {image: file_name}, {new :true}, (err, artistUpdate) => {
    if (err) {
      res.status(500).send({ message: 'Error al actualizar el usuario'});
    }else{
      if (!artistUpdate) {
        res.status(500).send({ message: 'No se pudo actualizar el usuario'});
      }else{
        res.status(200).send({ artist: artistUpdate, image: file_name });
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

module.exports =   artistCtrl;
