'use strict'

const express = require('express')
const asyncify = require('express-asyncify')
const request = require('request-promise-native')

const { endpoint, apiToken } = require('./config')

const api = asyncify(express.Router())

api.get('/fridges', async (req, res, next) => {
  const options = {
    method: 'GET',
    url: `${endpoint}/api/fridges`,
    headers: {
      'Authorization': `Bearer ${apiToken}`
    },
    json: true
  }

  let result
  try {
    result = await request(options)
  } catch (e) {
    return next(new Error(e.error.error))
  }

  res.send(result)
})

api.get('/fridge/:uuid', async (req, res, next) => {
  const { uuid } = req.params
  const options = {
    method: 'GET',
    url: `${endpoint}/api/fridge/${uuid}`,
    headers: {
      'Authorization': `Bearer ${apiToken}`
    },
    json: true
  }

  let result
  try {
    result = await request(options)
  } catch (e) {
    return next(new Error(e.error.error))
  }

  res.send(result)
})

api.get('/metrics/:uuid', async (req, res, next) => {
  const { uuid } = req.params
  const options = {
    method: 'GET',
    url: `${endpoint}/api/metrics/${uuid}`,
    headers: {
      'Authorization': `Bearer ${apiToken}`
    },
    json: true
  }

  let result
  try {
    result = await request(options)
  } catch (e) {
    return next(new Error(e.error.error))
  }

  res.send(result)
})

api.get('/metrics/:uuid/:type', async (req, res, next) => {
  const { uuid, type } = req.params
  const options = {
    method: 'GET',
    url: `${endpoint}/api/metrics/${uuid}/${type}`,
    headers: {
      'Authorization': `Bearer ${apiToken}`
    },
    json: true
  }

  let result
  try {
    result = await request(options)
  } catch (e) {
    return next(new Error(e.error.error))
  }

  res.send(result)
})

module.exports = api