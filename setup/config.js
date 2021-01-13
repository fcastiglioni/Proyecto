'use strict'
const debug = require ('debug')('setup:config')

const config= {
  database: process.env.DB_NAME || 'Proyecto',
  username: process.env.DB_USER || 'alexis',
  password: process.env.DB_PASS || 'contra',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  loggin: s => debug(s), //para ver que mensajes esta devolviendo la base de date
  setup: true  //crea la base de datos en servidor y con el force true (en index.js) si existe la borra y crea una nueva
}
module.exports =  config