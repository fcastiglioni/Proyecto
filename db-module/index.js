'use strict'
const setupDatabase = require('./lib/db')
const setupFridgeModel = require('./models/fridge')
const setupRuleModel = require('./models/rules')
const setupMetricModel = require('./models/metrics')
const setupFridge = require('./lib/fridge') 
const setupMetric = require('./lib/metric')
const setupRule = require('./lib/rules')
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
  const RuleModel = setupRuleModel(config)

  FridgeModel.hasMany(MetricModel)
  MetricModel.belongsTo(FridgeModel)

  await sequelize.authenticate // para validar que la base de datos este bien configurada, se conecta a ella.

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Metric = setupMetric(MetricModel, FridgeModel)
  const Fridge = setupFridge(FridgeModel)
  const Rule = setupRule(RuleModel)

  return {
    Fridge,
    Metric,
    Rule
  }
}
module.exports = dbInitAndRelate
