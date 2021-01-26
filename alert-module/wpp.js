'use strict'
const WhatsAppWeb = require('baileys')

const client = new WhatsAppWeb() 
client.connect() 
    .then (([user, chats, contacts, unread]) => {
        console.log ("oh hello " + user.name + " (" + user.id + ")")
        console.log ("you have " + unread.length + " unread messages")
        console.log ("you have " + chats.length + " chats")
    })
    .catch (err => console.log("unexpected error: " + err) )
    
function sendWpp(number, message) {
    client.sendTextMessage(`${number}@s.whatsapp.net`, message) 
}
module.exports = {
            client,
            sendWpp
}
