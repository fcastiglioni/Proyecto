'use strict'
const Sequelize = require('sequelize')
const SetUpDatabase = require('../lib/db')

function setUpMetricModel (config) {
  const sequelize = SetUpDatabase(config)

  return sequelize.define('metric', {
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    value: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  })
}
module.exports = setUpMetricModel
