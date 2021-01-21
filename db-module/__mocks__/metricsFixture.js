'use strict'

// Fake data to be used in test cases

const mockFridge = require('./fridgeFixture')

const metrics = [
  {
    id: 1,
    type: 'memory',
    value: 100,
    createdAt: '2019-11-13',
    updatedAt: '2019-07-16',
    fridgeId: 1
  },
  {
    id: 2,
    type: 'disk',
    value: 50,
    createdAt: '2019-09-29',
    updatedAt: '2019-10-11',
    fridgeId: 4
  },
  {
    id: 3,
    type: 'memory',
    value: 60,
    createdAt: '2019-11-13',
    updatedAt: '2019-09-30',
    fridgeId: 3
  },
  {
    id: 4,
    type: 'tasks',
    value: 10,
    createdAt: '2019-04-24',
    updatedAt: '2019-07-19',
    fridgeId: 5
  },
  {
    id: 5,
    type: 'memory',
    value: 100,
    createdAt: '2019-10-30',
    updatedAt: '2019-05-05',
    fridgeId: 2
  }
]

module.exports = {
  findOne: metrics[0],
  findByAgentUuid: (fridgeUuid) => {
    return metrics.filter(
      (metric) => metric.fridgeId === mockFridge.findByUuid(fridgeUuid)
    )
  },
  findByTypeAgentUuid: (type, fridgeUuid) => {
    return metrics.filter((metric) => {
      return (
        metric.type === type &&
        metric.fridgeId === mockFridge.findByUuid(fridgeUuid)
      )
    })
  }
}