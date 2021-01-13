'use strict'
const setupDatabase = require('./lib/db')
const setupFridgeModel = require('./models/fridge')
const setupMetricModel = require('./models/metrics')

async function dbInitAndRelate (config) {
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
