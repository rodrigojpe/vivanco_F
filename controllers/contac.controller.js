'use strict';
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var Contact = require('../models/contact');
const contactCtrl = {};

// mover esto a capa servicio
// configurar cuenta
var express = require('express');
var app = express();
// var express = require('express');
var router = express.Router();


contactCtrl.sendMail = async (req, res) => {
// Generate test SMTP service account from ethereal.email


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
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: acount.user,
        pass: acount.pass
    }
  }

 let transporter = nodemailer.createTransport(smtpTransport({
   service: 'Gmail',
   auth:{
     user: acount.user,
     pass: acount.pass
   }
 }));


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

    });

};

module.exports = contactCtrl;
