'use strict'
const Sequelize = require('sequelize')
const config = require('../../setup/config')
const SetUpDatabase = require('../lib/db')

function setUpFridgeModel (config) {
  const sequelize = SetUpDatabase(config)

  return sequelize.define('fridge', {
    uuid: { // esta es la clave, el id
      type: Sequelize.STRING,
      allowNull: false
    },
    username: { // sería Farmashop
      type: Sequelize.STRING,
      allowNull: false
    },
    name: { // Ej: Fridge1, Fridge2,...
      type: Sequelize.STRING,
      allowNull: false
    },
    hostname: { // desde qué computador se esta conectando el agente
      type: Sequelize.STRING,
      allowNull: false
    },
    pid: { // si tenemos la misma aplicacion corriendo multiples procesos
      type: Sequelize.INTEGER,
      allowNull: false
    },
    connected: { // si esta conectado o no
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  })
}
module.exports = setUpFridgeModel
