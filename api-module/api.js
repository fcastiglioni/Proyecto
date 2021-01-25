'use strict'

const debug = require('debug')('proyecto:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const db = require('db-module')
const config = require('../setup/config')

const api = asyncify(express.Router())

let services, Fridge, Metric
// con el * digo que para todas las rutas ejecuto el middelwere, al mfinal siempre se usa next, para que siga
api.use('*', async (req, res, next) => {
  if (!services) {
    debug('Connecting to database')
    try {
      services = await db(config.db)
    } catch (e) {
      return next(e)
    }

    Fridge = services.Fridge
    Metric = services.Metric
  }
  next()
})

api.get('/fridges', async (req, res, next) => {
  debug('A request has come to /fridges')

  let fridges = []
  try {
    fridges = await Fridge.findConnected()
  } catch (e) {
    return next(e)
  }

  res.send(fridges)
})

api.get('/fridg/:uuid', async (req, res, next) => {
  const { uuid } = req.params

  debug(`request to /agent/${uuid}`)

  let fridge
  try {
    fridge = await Fridge.findByUuid(uuid)
  } catch (e) {
    return next(e)
  }

  if (!fridge) {
    return next(new Error(`Fridge not found with uuid ${uuid}`))
  }

  res.send(fridge)
})

api.get('/metrics/:uuid', async (req, res, next) => {
  const { uuid } = req.params

  debug(`request to /metrics/${uuid}`)

  let metrics = []
  try {
    metrics = await Metric.findByAgentUuid(uuid)
  } catch (e) {
    return next(e)
  }

  if (!metrics || metrics.length === 0) {
    return next(new Error(`Metrics not found for agent with uuid ${uuid}`))
  }

  res.send(metrics)
})

api.get('/metrics/:uuid/:type', async (req, res, next) => {
  const { uuid, type } = req.params

  debug(`request to /metrics/${uuid}/${type}`)

  let metrics = []
  try {
    metrics = await Metric.findByTypeAgentUuid(type, uuid)
  } catch (e) {
    return next(e)
  }

  if (!metrics || metrics.length === 0) {
    return next(new Error(`Metrics (${type}) not found for agent with uuid ${uuid}`))
  }

  res.send(metrics)
})

module.exports = api
