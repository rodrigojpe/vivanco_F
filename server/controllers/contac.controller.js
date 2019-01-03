'use strict';
var Contact = require('../models/contact');
const contactCtrl = {};

// mover esto a capa servicio
// configurar cuenta
var express = require('express');
var app = express();
// var express = require('express');
var router = express.Router();
// var mailer = require('express-mailer');
 // app.use('/static', express.static(__dirname + '/public/img'));

//
// mailer.extend(app, {
//   from: 'no-reply@example.com',
//   host: 'smtp.gmail.com', // hostname
//   secureConnection: true, // use SSL
//   port: 465, // port for secure SMTP
//   transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
//   auth: {
//     user: 'academiacp@gmail.com',
//     pass: 'martinrodrigo1'
//   }
// });
//
// app.set('views',  'views');
// app.set('view engine', 'jade');
//
//
//
// contactCtrl.sendMail = async (req, res) => {
//
// var dir = require('path').join(__dirname,'./public/img/logo_mv_or4.jpg');
//
//  var direc =  app.use(express.static(__dirname + './public/img'));
//
//    // console.log(app.use('/static', express.static(__dirname + '/public')));
//    // console.log(dir);
//   console.log(dir);
//

//
//   // console.log(contact);
//   await app.mailer.send('email', {
//     to: 'academiacp@gmail.com', // REQUIRED. This can be a comma delimited string just like a normal email to field.
//     subject: 'Solicitud Información Banda Vivanco', // REQUIRED.
//     otherProperty: contact, // All additional properties are also passed to the template as local variables.
//     name: req.body.name,
//     email: req.body.email,
//     mensaje: req.body.message,
//     phono: req.body.phone,
//     image: dir
//   }, function (err, message) {
//     if (err) {
//
//       res.send(err);
//       return;
//     }
//
//      res.status(200).send({ contact: JSON.stringify(contact) });
//     // res.json({ user: 'tobi' });
//      // res.render('../views/email.jade', {param: JSON.stringify(contact)});
//      // console.log(param);
//   });
// };
const nodemailer = require('nodemailer');

contactCtrl.sendMail = async (req, res) => {
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
  //

  var contact = new Contact({
    name : req.body.name,
    last_name :req.body.last_name,
    email:req.body.email,
    phone: req.body.phone,
    message:req.body.message,
    image: null
  });

  var acount = {
    user : 'academiacp@gmail.com',
    pass: 'martinrodrigo1'
  }
  let option = {
    pool: true,
    host: 'smtp-relay.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: acount.user,
        pass: acount.pass
    }
  }

 let transporter = nodemailer.createTransport({

   service: 'Gmail',
   auth:{
     user: acount.user,
     pass: acount.pass
   }
 });


console.log('sen email');
    var img = __dirname+"/logo_mv_or4.jpg";
    var mailOptions = {
        from: acount.user, // sender address
        to: "academiacp@gmail.com", // list of receivers
        subject: 'Vivanco Band ✔', // Subject line
        text: contact.name, // plain text body
        html: '<p><b>Estimados soy '+contact.name +' 👻"?</b></p>'+ '<p></p>'+
            '<style>img { width:10; height:7;}</style><img width="478px" height="460px" src="cid:logo"/>'+ '<p></p>'+
            '<div><p><h1> Mensaje :'+ contact.message + '</h1></p></div></br> '+
            '<p>Mi correo es :' +contact.email+' </p></br>'+// html body
            '<p>Mi telefono es :' +contact.phone+' </p>',// html body

            attachments:[
              {
                filename:'logo_mv_or4.jpg',
                path: __dirname + '/logo_mv_or4.jpg',
                cid:"logo"
              },
            ]

    };
        // var attachments = [{
        //   filename : 'logo_mv_or4.jpg',
        //   contents:IMAGE_CONTENTS,
        //   cid:img
        // }]


    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      console.log('sen email 2');

        if (error) {
            console.log(error);
            return console.log(error);
          }

          res.status(200).send({ contact: JSON.stringify(contact) });


        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });

};

module.exports = contactCtrl;
