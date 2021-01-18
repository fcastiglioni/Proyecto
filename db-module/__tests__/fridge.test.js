'use strict'
const proxyquire = require('proxyquire')
const dbInitAndRelate = require('../index')
const MockFridge = require('../__mocks__/fridge')
const MockMetric = require('../__mocks__/metrics')



const config = {
  loggin: function () {}
}

let db = null

beforeEach(async () => {
  jest.mock('../models/fridge', () => jest.fn(() => '../__mocks__/fridge'))
  jest.mock('../models/metrics', () => jest.fn(() => '../__mocks__/metrics'))

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

test('AgentModel.hasMany should be called', () => {
  expect(MockFridge.hasMany).toHaveBeenCalled()
})
