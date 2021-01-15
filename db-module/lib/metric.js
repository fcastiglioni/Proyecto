'use strict'

module.exports = function setupMetric (MetricModel, FridgeModel) {
  async function findByFridgeUuid (uuid) {
    return MetricModel.findAll({
      attributes: ['type'],
      group: ['type'],
      include: [{
        attributes: [],
        model: FridgeModel,
        where: {
          uuid
        }
      }],
      raw: true
    })
  }

  async function findByTypeFridgeUuid (type, uuid) {
    return MetricModel.findAll({
      attributes: ['id', 'type', 'value', 'createdAt'],
      where: {
        type
      },
      limit: 20,
      order: [['createdAt', 'DESC']], // me los ordena por fecha (createdat) descendiente
      include: [{ // el join table con el agente y su uuid
        attributes: [],
        model: FridgeModel,
        where: {
          uuid
        }
      }],
      raw: true
    })
  }

  async function create (uuid, metric) {
    const fridge = await FridgeModel.findOne({
      where: { uuid }
    })

    if (fridge) {
      Object.assign(metric, { fridgeId: fridge.id })
      const result = await MetricModel.create(metric)
      return result.toJSON()
    }
  }

  return {
    create,
    findByFridgeUuid,
    findByTypeFridgeUuid
  }
}
