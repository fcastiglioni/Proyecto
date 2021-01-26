'use strict'
var nodemailer = require('nodemailer');

function emailAlert() {

    var transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
        user: 'fefoct@hotmail.com',
        pass: ''
    }
    });

    var mailOptions = {
    from: 'fefoct@hotmail.com',
    to: 'alesuarezaliano@gmail.com',
    subject: 'Alerta!!!!',
    text: 'Esta caliente'
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });

}

module.exports = emailAlert