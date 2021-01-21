'use strict'
const FridgeAgent = require('../')

const fridge = new FridgeAgent({
  name: 'myapp',
  username: 'admin',
  interval: 2000
})

fridge.addMetric('rss', function getRss () {
  return process.memoryUsage().rss
})

fridge.addMetric('promiseMetric', function getRandomPromise () {
  return Promise.resolve(Math.random())
})

fridge.addMetric('callbackMetric', function getRandomCallback (callback) {
  setTimeout(() => {
    callback(null, Math.random())
  }, 1000)
})

fridge.connect()

// This fridge only , son eventos del fridge que esta conectado
fridge.on('connected', handler)
fridge.on('disconnected', handler)
fridge.on('message', handler)

// representan los eventos q vienen del servidor mqtt (other fridge)
fridge.on('fridge/connected', handler)
fridge.on('fridge/disconnected', handler)
fridge.on('fridge/message', handler)

function handler (payload) {
  console.log(payload)
}

//setTimeout(() => fridge.disconnect(), 10000)

// This fridge only , son eventos del fridge que esta conectado
// representan los eventos q vienen del servidor mqtt (distintos aag)
