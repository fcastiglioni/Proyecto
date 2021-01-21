'use strict'

const debug = require('debug')('Proyecto:fridge-agent')
const os = require('os')
const util = require('util')
const mqtt = require('mqtt')
const defaults = require('defaults')
const uuid = require('uuid')
const EventEmitter = require('events')

const { parsePayload } =  require('../parsePayload/utils')

const options = {
  name: 'untitled',
  username: 'proyect',
  interval: 5000,
  mqtt: {
    host: 'mqtt://localhost'
  }
}

class FridgeAgent extends EventEmitter {
  constructor(opts) {
    super()
    this._options = defaults(opts, options)
    this._started = false
    this._timer = null
    this._client = null
    this._fridgeId = null
    this._metrics = new Map()
  }

  addMetric(type, fn) {
    this._metrics.set(type, fn)
  }

  removeMetric(type) {
    this._metrics.delete(type)
  }

  connect() {
    if (!this._started) {
      const opts = this._options
      this._client = mqtt.connect(opts.mqtt.host)
      this._started = true

      this._client.subscribe('fridge/message')
      this._client.subscribe('fridge/connected')
      this._client.subscribe('fridge/disconnected')

      this._client.on('connect', () => {
        this._fridgeId = uuid.v4()

        this.emit('connected', this._fridgeId)

        this._timer = setInterval(async () => {
          if (this._metrics.size > 0) {
            let message = {
                fridge: {
                uuid: this._fridgeId,
                username: opts.username,
                name: opts.name,
                hostname: os.hostname() || 'localhost',
                pid: process.pid
              },
              metrics: [],
              timestamp: new Date().getTime()
            }


            for (let [metric, fn] of this._metrics) {
              if (fn.length === 1) { // si la funcion tiene un argumento es porque es callback
                fn = util.promisify(fn) // transformo la funcion de callback a promesas
              }

              message.metrics.push({
                type: metric,
                value: await Promise.resolve(fn())
              })
            }

            debug('Sending', message)

            this._client.publish('fridge/message', JSON.stringify(message))
            this.emit('message', message)
          }
        }, opts.interval)
      })

      this._client.on('message', (topic, payload) => {
        payload = parsePayload(payload)

        let broadcast = false
        switch (topic) {
          case 'fridge/connected':
          case 'fridge/disconnected':
          case 'fridge/message':
            broadcast = payload && payload.fridge && payload.fridge.uuid != this._fridgeId
            break
        }

        if (broadcast) {
          this.emit(topic, payload)
        }
      })

      this._client.on('error', () => this.disconnect())
    }
  }

  disconnect() {
    if (this._started) {
      clearInterval(this._timer)
      this._started = false
      this.emit('disconnected', this._fridgeId)
      this._client.end()
    }
  }
}

module.exports = FridgeAgent
