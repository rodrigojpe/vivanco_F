'use strict'

const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
// servicio jwt
var path = require('path');
const jwt = require('../services/jwt');
var fs = require('fs');
const userCtrl = {};

userCtrl.pruebas = async(req , res) =>{
await  res.status(200).send({
    message:'probando  el controller user',
    user: req.user
  });
}

userCtrl.createUser = function (req , res){
  console.log('entrendo al create user');
    let user =   new User({
        name: req.body.name,
        surname: req.body.name,
        email: req.body.email,
        password: req.body.password,
        image: req.body.image,
        role:req.body.role
    });  //new Employee(req.body);
    console.log(req.body.email);
    // return;
    user.role ='ROLE_USER';
    user.image = null;
if (user.password) {
      bcrypt.hash(req.body.password, null,null, function(err, hash){
        user.password = hash;
          });
          console.log('1');
           // console.log(err);
          // return;
        if(user.name != null  && user.email != null ){
          console.log(req.body.email);

            User.findOne({email: req.body.email}, (err, issetuser) =>{
            if(issetuser){
              console.log('2');
              res.status(500).send({message: 'Este Correo ya esta registrado!'});
              console.log(issetuser);
              return;
            }
             // return;
              if (err) {
                res.status(500).send({message: 'algo no salio bien !'});
                console.log(message);
                console.log('3');

              }else{
                  try{
                    if(issetuser == null){
                      user.save();
                      // res.status(200).send({message: 'User is save in db'});
                      res.status(200).send({user: user});
                      console.log('4');
                    }

                    // console.log(user);
                  }catch(err){
                      if (err.name === 'MongoError' && err.code === 11000) {
                        res.status(409).send({message: 'error al grabar key'});
                        console.log('5');

                      }else if (err){
                        res.status(500).send({message: 'algo no salio bien '});
                        console.log('6');
                        console.log(err);
                      }
                  }
              }
            });
        }else{
          res.status(200).send({message: 'Completa Todos los campos Pollo'});
          console.log('7');
        }

      }else{
        res.status(200).send({message: 'Introduce Contraseña Pollo'});
        console.log('8');

        return;
      }
      // res.json('receved');
  }

  userCtrl.login = async (req, res) =>{
  var params = req.body;
  var email = params.email;
  var tok;

  await  User.findOne({email :  req.body.email.toLowerCase()  }, (err, user) =>{
    try{
      if (!req.body.email.toLowerCase()) {
        res.status(500).send({message: 'error al comprobar el  usuario'});
      }else{
          if (user) {
            bcrypt.compare(req.body.password, user.password ,(err, check) =>{
              if (check) {
                if (params.gettoken) {
                  // devuelve el token
                  res.status(200).send({
                    token: jwt.createToken(user)
                  });
                }else{
                  user.password = "";
                  res.status(200).send({user});
                  console.log( JSON.stringify( this.tok));
                }
              }else{
                res.status(404).send({
                  message: 'contraseña incorrecta'
                });
              }
            });
          }else{
            res.status(404).send({
              message: 'Email no existe'
            });
          }
      }
    }catch(error){
      res.status(500).send({message: error + ''});
    }
    });
}


userCtrl.uploadImage = async(req, res ) =>{
// await  res.status(200).send({message: 'upload image'})
var userID = req.params.id;
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
  if (userID != req.user.sub) {
    return  res.status(500).send({ message: 'no tiens permiso para actualizar el usuario'  });
  }

  await User.findByIdAndUpdate(userID, {image: file_name}, {new :true}, (err, userUpdate) => {
    if (err) {
      res.status(500).send({ message: 'Error al actualizar el usuario'});
    }else{
      if (!userUpdate) {
        res.status(500).send({ message: 'No se pudo actualizar el usuario'});
      }else{
        res.status(200).send({ user: userUpdate, image: file_name });
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


console.log(dir);
console.log(file_ext);
console.log(file_split);
  // await  res.status(200).send({
  //      file_path: file_path,
  //      file_split:file_split,
  //      file_name: nombre,
  //      file_dir : dir
  //    })
   }else{
   return  res.status(200).send({message: 'no has cargdo una imagen..'});
   }
};




userCtrl.getImagen = async(req,res) =>{
  var imageFile= req.params.imageFile;
  var path_file = './uploads/users/'+imageFile;
  fs.exists(path_file, (exists)=>{
    if (path_file) {
      res.sendFile(path.resolve(path_file));
    }else{
      res.status(404).send({message: 'La imagen no existe'});
    }
  });

}


userCtrl.updateUser = async(req, res) =>{
  var userId = req.params.id;
  var update = req.body;
  delete update.password;

  if (userId != req.user.sub) {
    return  res.status(500).send({ message: 'no tiens permiso para actualizar el usuario'  });

  }

 await User.findByIdAndUpdate(userId, update, {new :true}, (err, userUpdate) => {
   if (err) {
     res.status(500).send({ message: 'Error al actualizar el usuario'});
   }else{
     if (!userUpdate) {
       res.status(500).send({ message: 'No se pudo actualizar el usuario'});
     }else{
       res.status(200).send({ user: userUpdate});
     }
   }

 });

   res.status(200).send({ message: 'Usuario actualizado'  });
}
module.exports =   userCtrl;
