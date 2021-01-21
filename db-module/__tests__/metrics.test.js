'use strict'

const dbInitAndRelate = require('../index')
const MockFridge = require('../__mocks__/fridgeService')
const MockMetric = require('../__mocks__/metricsService')
const FridgeFixture = require('../__mocks__/fridgeFixture')
const MetricsFixture = require('../__mocks__/metricsFixture')


// seejecuta al tope de ejecucion
jest.mock('../models/fridge', () => jest.fn(() => MockFridge))
jest.mock('../models/metrics', () => jest.fn(() => MockMetric))

let db = null

const config = {
    loggin: function () {}
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

test('Metric should be returned', () => {
    expect(db.Metric).toBeTruthy()
})

test('MetricModel.belongsTo should be called', () => {
    expect(mockMetricService.belongsTo).toHaveBeenCalled()
})

test('MetricModel.belongsTo should be called with AgentModel', () => {
    expect(mockMetricService.belongsTo).toHaveBeenCalledWith(mockAgentService)
})

test('Metric.create should create a new metric', async () => {
    const createdMetric = await db.Metric.create(agentUuid, oneMetric)
    expect(createdMetric).toBe(oneMetric)
})

test('Metric.findByAgentUuid should returns metrics from the same agent', async () => {
    const metricsGroupedByAgentUuid = await db.Metric.findByAgentUuid(agentUuid)
    expect(mockMetricService.findAll).toHaveBeenCalledTimes(1)
    expect(metricsGroupedByAgentUuid).toStrictEqual(metricsByAgentUuid)
})

test('Metric.findByTypeAgentUuid should returns metrics with the same type and owned by the same agent', async () => {
    const metricsGroupedByTypeAgentUuid = await db.Metric.findByTypeAgentUuid(
      metricType,
      agentUuid
    )
    expect(mockMetricService.findAll).toHaveBeenCalledTimes(1)
    expect(metricsGroupedByTypeAgentUuid).toStrictEqual(metricsByTypeAgentUuid)
})
