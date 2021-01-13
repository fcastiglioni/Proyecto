'use strict'

const db = require('./')
const config = require('../setup/config')
const chalk = require('chalk')

async function setUp () {
  await db(config).catch(handleFatalError)
  console.log(`${chalk.green('success!!!!!')}`)
  process.exit(0)// creo que es terminar el proceso bien
}

function handleFatalError (error) {
  console.error(`${chalk.red('[fatal error]')} ${error.message}`)
  console.error(error.message)
  console.error(error.stack)
  process.exit(1) // creo que es terminar el proceso mal
}

setUp()
