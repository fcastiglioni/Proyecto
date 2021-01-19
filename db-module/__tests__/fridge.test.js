'use strict'

const dbInitAndRelate = require('../index')
const MockFridge = require('../__mocks__/fridgeService')
const MockMetric = require('../__mocks__/metricsService')
const MockFixture = require('../__mocks__/fridgeFixture')


// seejecuta al tope de ejecucion
jest.mock('../models/fridge', () => jest.fn(() => MockFridge))
jest.mock('../models/metrics', () => jest.fn(() => MockMetric))

const config = {
  loggin: function () {}
}

let db = null
let idExample = 1
let uuid = '4bf322ab-d9f7-4166-a99b-f004203fb7de'
const fridgeExample = MockFixture.newFridge
const uuidArgs = {
  where: {
    uuid
  }
}

beforeEach(async () => {
  db = await dbInitAndRelate(config)
})

afterEach(() => {
  // After each test clear all mocks because one implementation
  // can be used in many test cases so it doesn't accumulate
  // the times had been called
  jest.clearAllMocks()
})

test('Pruebaaa', async () => {
  await expect(db.Fridge).toBeTruthy()
})

test('MockFridge.hasMany should be called, and calledWith', () => {
  expect(MockFridge.hasMany).toHaveBeenCalled();
  expect(MockFridge.hasMany).toHaveBeenCalledWith(MockMetric)
})

test('MockMetric.belongsTo should be called, and calledWith', () => {
  expect(MockMetric.belongsTo).toHaveBeenCalled();
  expect(MockMetric.belongsTo).toHaveBeenCalledWith(MockFridge)
})

test('Fridge find by id', async () => {
  const fridgeFound = await db.Fridge.findById(idExample)

  expect(MockFridge.findById).toHaveBeenCalledTimes(1)
  expect(MockFridge.findById).toHaveBeenCalledWith(idExample)
  expect(fridgeFound).toBe(MockFixture.findById(idExample))
})

test('Fridge find by uuid', async () => {
  const fridgeFound = await db.Fridge.findByUuid(uuid)

  expect(MockFridge.findOne).toHaveBeenCalledTimes(1)
  expect(MockFridge.findOne).toHaveBeenCalledWith(uuidArgs)
  expect(fridgeFound).toBe(MockFixture.findByUuid(uuid))

})

test('Fridge Create or Update, with exists Fridge', async () => {

  const fridgeFound = await db.Fridge.createOrUpdate(fridgeExample)

  expect(mockAgentService.newFridge).toHaveBeenCalledTimes(1)
 /* expect(mockAgentService.findOne).toHaveBeenCalledWith(uuidCondition)
  expect(mockAgentService.update).toHaveBeenCalledTimes(1)
  expect(mockAgentService.update).toHaveBeenCalledWith(
    oneAgent,
    uuidCondition
  )*/

  expect(fridgeFound).toBe(fridgeExample)

})
