'use strict'
const Sequelize = require('sequelize')
const SetUpDatabase = require('../lib/db')

function setUpFridgeModel (config) {
  const sequelize = SetUpDatabase(config)

  return sequelize.define('Rules', {
    uuid: { // esta es la clave, el id
      type: Sequelize.STRING,
      allowNull: false
    },
    fridge: { // sería Farmashop
      type: Sequelize.STRING,
      allowNull: false
    },
    atribute: { // Ej: Rule1, Rule2,...
      type: Sequelize.STRING,
      allowNull: false
    },
    max: { // desde qué computador se esta conectando el agente
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    min: { // si tenemos la misma aplicacion corriendo multiples procesos
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    state: { // si esta conectado o no
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  })
}
module.exports = setUpFridgeModel