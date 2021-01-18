'use strict'

module.exports = function setupFridge (FridgeModel) {
  async function createOrUpdate (fridge) {
    const cond = {
      where: {
        uuid: fridge.uuid
      }
    }
    const existingFridge = await FridgeModel.findOne(cond) // encuntra el pimero que cumple esa cond

    if (existingFridge) {
      const updated = await FridgeModel.update(fridge, cond)
      return updated ? FridgeModel.findOne(cond) : existingFridge
    }

    const result = await FridgeModel.create(fridge)
    return result.toJSON()
  }

  function findById (id) {
    return FridgeModel.findById(id)
  }

  function findByUuid (uuid) {
    return FridgeModel.findOne({
      where: {
        uuid
      }
    })
  }

  function findAll () {
    return FridgeModel.findAll()
  }

  function findConnected () {
    return FridgeModel.findAll({
      where: {
        connected: true
      }
    })
  }

  function findByUsername (username) {
    return FridgeModel.findAll({
      where: {
        username,
        connected: true
      }
    })
  }

  return {
    createOrUpdate,
    findById,
    findByUuid,
    findAll,
    findConnected,
    findByUsername
  }
}
