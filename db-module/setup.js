'use strict'

const db = require('./')
const config = require('../setup/config')
const chalk = require('chalk')
const inquirer = require('inquirer')
const minimist = require('minimist')

const args = minimist(process.argv)
const prompt = inquirer.createPromptModule()

async function setUp () {
  if (!args.yes) {
    const answer = await prompt([
      {
        type: 'confirm',
        name: 'setup',
        message: 'This will destroy the database, are you sure?'
      }
    ])

    if (!answer.setup) {
      return console.log(`${chalk.yellow('no')}` +
        `${chalk.red('thi')}` + `${chalk.green('ng')}` +
          `${chalk.blueBright(' happ')}` +
            `${chalk.redBright('ened ')}` +
              `${chalk.magentaBright(' :)')}`)
    }
  }

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
