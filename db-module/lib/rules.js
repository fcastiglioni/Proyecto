'use strict'

module.exports = function setupFridge (RuleModel) {
  async function createOrUpdate (rule) {
    const cond = {
      where: {
        uuid: rule.uuid
      }
    }
    const existingRule = await RuleModel.findOne(cond) // encuntra el pimero que cumple esa cond

    if (existingRule) {
      const updated = await RuleModel.update(rule, cond)
      return updated ? RuleModel.findOne(cond) : existingRule
    }

    const result = await RuleModel.create(rule)
    return result.toJSON()
  }

  function findById (id) {
    return RuleModel.findById(id)
  }

  function findByUuid (uuid) {
    return RuleModel.findOne({
      where: {
        uuid
      }
    })
  }

  function findAll () {
    return RuleModel.findAll()
  }

  function findByAtribute (atribute) {
    return RuleModel.findAll({
      where: {
        atribute: atribute
      }
    })
  }

  function findByUsername (username) {
    return RuleModel.findAll({
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
    findByAtribute,
    findByUsername
  }
}