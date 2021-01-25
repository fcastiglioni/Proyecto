'use strict'

const http = require('http')
const chalk = require('chalk')
const express = require('express')
const api = require('./api')
const debug = require('debug')('proyecto:api')
const asycify = require('express-asyncify')

const port = process.env.PORT || 3000
const app = asycify(express())
const server = http.createServer(app)

// midelwere, fun que se ejecutean antes de que la peticion llegue a la ruta final, con use
app.use('/api', api)

// Express Error Handler
// middelware, usa next si todo esta bien, sino manda error
app.use((err, req, res, next) => {
  debug(`Error: ${err.message}`)

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
})

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

if (!module.parent) {
  process.on('uncaughtException', handleFatalError)
  process.on('unhandledRejection', handleFatalError)

  server.listen(port, () => {
    console.log(`${chalk.green('[platziverse-api]')} server listening on port ${port}`)
  })
}

module.exports = server
