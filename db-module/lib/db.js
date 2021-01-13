'use strict'

const Sequelize = require('sequelize')

let sequelize = null
function dbCreate (config) {
  if (!sequelize) {
    sequelize = new Sequelize(config)
  }
  return sequelize
}
module.exports = dbCreate
