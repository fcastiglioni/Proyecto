'use strict'
var nodemailer = require('nodemailer');

function emailAlert(email, subject, text) {

    var transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
        user: 'fefoct@hotmail.com',
        pass: 'Federico3271'
    }
    });

    var mailOptions = {
    from: 'fefoct@hotmail.com',
    to: email,
    subject: subject,
    text: text
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