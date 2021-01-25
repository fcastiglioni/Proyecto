'use strict'

const config = require('../setup/config')
const debug = require('debug')('Proyecto:mqtt-module')
const mosca = require('mosca')
const redis = require('redis')
const chalk = require('chalk')
const db = require('db-module')
const rules = require('alert-module')

config.setup = false

const { parsePayload } = require('./utils')

const backend = {
  type: 'redis',
  redis,
  return_buffers: true
}

const settings = {
  port: 1883,
  backend
}

const server = new mosca.Server(settings)

const clients = new Map()

let Fridge, Metric

server.on('clientConnected', client => {
  debug(`Client Connected: ${client.id}`)
  clients.set(client.id, null)
})

server.on('clientDisconnected', async (client) => {
  debug(`Client Disconnected: ${client.id}`)
  const fridge = clients.get(client.id)

  if (fridge) {
    // Mark Agent as Disconnected
    fridge.connected = false

    try {
      await Fridge.createOrUpdate(fridge)
    } catch (e) {
      return handleError(e)
    }

    // Delete Agent from Clients list
    clients.delete(client.id)

    server.publish({
      topic: 'fridge/disconnected',
      payload: JSON.stringify({
        fridge: {
          uuid: fridge.uuid
        }
      })
    })
    debug(`Client (${client.id}) associated to Fridge (${fridge.uuid}) marked as disconnected`)
  }
})

server.on('published', async (packet, client) => {
  debug(`Received: ${packet.topic}`)

  switch (packet.topic) {
    case 'fridge/connected':
    case 'fridge/disconnected':
      debug(`Payload: ${packet.payload}`)
      break
    case 'fridge/message':
      debug(`Payload: ${packet.payload}`)

      const payload = parsePayload(packet.payload)

      if (payload) {
        payload.fridge.connected = true

        let fridge
        try {
          fridge = await Fridge.createOrUpdate(payload.fridge)
        } catch (e) {
          return handleError(e)
        }

        debug(`Fridge ${fridge.uuid} saved`)

        // Notify fridge is Connected
        if (!clients.get(client.id)) {
          clients.set(client.id, fridge)
          server.publish({
            topic: 'fridge/connected',
            payload: JSON.stringify({
              fridge: {
                uuid: fridge.uuid,
                name: fridge.name,
                hostname: fridge.hostname,
                pid: fridge.pid,
                connected: fridge.connected
              }
            })
          })
        }

        // Store Metrics
        for (const metric of payload.metrics) {
          let m

          try {
            m = await Metric.create(fridge.uuid, metric)
            rules.minAndMax(metric)
          } catch (e) {
            return handleError(e)
          }

          debug(`Metric ${m.id} saved on fridge ${fridge.uuid}`)
        }
      }
      break
  }

  debug(`Payload: ${packet.payload}`)
})

server.on('ready', async () => {
  const services = await db(config).catch(handleFatalError)

  Fridge = services.Fridge
  Metric = services.Metric

  console.log(`${chalk.green('[mqtt]')} server is running`)
})

server.on('error', handleFatalError)

function handleFatalError(err) {
  console.error(`${chalk.red('[fatal error!! :( ]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

function handleError(err) {
  console.error(`${chalk.red('[ error!! :( ]')} ${err.message}`)
  console.error(err.stack)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)
