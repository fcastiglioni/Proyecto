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
const fridgeExample = MockFixture.findOne
const uuidArgs = {
  where: {
    uuid
  }
}
const connectedCondition = { where: { connected: true } }
const argNewFridge = {
  where : {
    uuid : MockFixture.newFridge.uuid
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

  expect(MockFridge.findOne).toHaveBeenCalledWith(uuidArgs)
  expect(MockFridge.update).toHaveBeenCalledTimes(1)
  expect(MockFridge.update).toHaveBeenCalledWith(
    fridgeExample,
    uuidArgs
  )

  expect(fridgeFound).toBe(fridgeExample)
})

test('Fridge Create or Update, create new Fridge', async () => {
  const fridgeFound = await db.Fridge.createOrUpdate(MockFixture.newFridge)

  expect(MockFridge.findOne).toHaveBeenCalledWith(argNewFridge)
  //expect(MockFridge.create).toHaveBeenCalledTimes(1)
  //expect(MockFridge.create).toHaveBeenCalledWith(MockFixture.newFridge)

  //expect(fridgeFound).toBe(MockFixture.newFridge)
})

test('Agent.findAll should be called and return all the agents', async () => {
  const fridgesFound = await db.Fridge.findAll()
  expect(fridgesFound).toBe(MockFixture.findAll)
})

test('Agent.findConnected should return the connected agents', async () => {
  const connectedFridges = await db.Fridge.findConnected()
  expect(MockFridge.findAll).toHaveBeenCalledTimes(1)
  expect(MockFridge.findAll).toHaveBeenCalledWith(connectedCondition)
  expect(connectedFridges).toBe(MockFixture.findConnected)
})