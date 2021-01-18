'use strict'
const proxyquire = require('proxyquire')
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
  const fridgeFound = await db.Fridge.findById(0)
  expect(fridgeFound).toBe(MockFixture.findById(0))
})

