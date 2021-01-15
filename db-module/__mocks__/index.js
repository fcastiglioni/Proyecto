'use strict'
const setupDatabase = require('./lib/db')
const setupFridgeModel = {
    hasMany: function() {}
}
const setupMetricModel =  {
    belongsTo: function(){}
}
const defaults = require('defaults')

function defaultConfig (config) {
  config = defaults(config, {
    dialect: 'sqlite',
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    query: {
      raw: true
    }
  })
}
async function dbInitAndRelate (config) {
  defaultConfig(config)

  const sequelize = setupDatabase(config)
  const FridgeModel = setupFridgeModel(config)
  const MetricModel = setupMetricModel(config)

  FridgeModel.hasMany(MetricModel)
  MetricModel.belongsTo(FridgeModel)

  await sequelize.authenticate // para validar que la base de datos este bien configurada, se conecta a ella.

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  sequelize.sync() // hace toda la definicion de los modelos, si no esta

  const Metric = {}
  const Fridge = {}

  return {
    Fridge,
    Metric
  }
}
module.exports = dbInitAndRelate
