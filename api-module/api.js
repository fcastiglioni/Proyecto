'use strict'

const debug = require('debug')('proyecto:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const db = require('db-module')
const auth = require('express-jwt')
const guard = require('express-jwt-permissions')()
const config = require('../setup/config')
const configAuth = require('./config-auth')
config.setup = false

const api = asyncify(express.Router())

let services, Fridge, Metric, Rule
// con el * digo que para todas las rutas ejecuto el middelwere, al mfinal siempre se usa next, para que siga
api.use('*', async (req, res, next) => {
  if (!services) {
    debug('Connecting to database')
    try {
      services = await db(config)
    } catch (e) {
      return next(e)
    }

    Fridge = services.Fridge
    Metric = services.Metric
    Rule = services.Rule
  }
  next()
})

api.get('/rules', auth(configAuth.auth), async (req, res, next) => {
  debug('A request has come to /rules')

  let rules = []
  try {
    rules = await Rule.findAll()
  } catch (e) {
    return next(e)
  }

  res.send(rules)
})

api.get('/fridges', auth(configAuth.auth), async (req, res, next) => {
  debug('A request has come to /fridges')

  const { user } = req
  if (!user || !user.username) {
    return next(new Error('not authorized'))
  }

  let fridges = []
  try {
    if (user.admin) {
      fridges = await Fridge.findConnected()
    } else {
      fridges = await Fridge.findByUsername(user.username)
    }
  } catch (e) {
    return next(e)
  }

  res.send(fridges)
})

api.get('/fridge/:uuid', async (req, res, next) => {
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

api.get('/metrics/:uuid', auth(configAuth.auth), guard.check(['metrics:read']), async (req, res, next) => {
  const { uuid } = req.params

  debug(`request to /metrics/${uuid}`)

  let metrics = []
  try {
    metrics = await Metric.findByFridgeUuid(uuid)
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
    metrics = await Metric.findByTypeFridgeUuid(type, uuid)
  } catch (e) {
    return next(e)
  }

  if (!metrics || metrics.length === 0) {
    return next(new Error(`Metrics (${type}) not found for agent with uuid ${uuid}`))
  }

  res.send(metrics)
})

module.exports = api
