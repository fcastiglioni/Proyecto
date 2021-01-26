'use strict'
const db = require('db-module')
const config = require('../setup/config')
const chalk = require('chalk')
const emailAlert = require('./email')

async function minAndMax(metricToExaminate) {
    try {
        console.log(`${chalk.yellow(metricToExaminate.type)}`)
        if(metricToExaminate.type == 'temperature'){
            const services = await db(config)
            const Rule = services.Rule
            const Temperaturerules = await Rule.findByAtribute('temperature')
            await console.log(`${chalk.blueBright(Temperaturerules[0])}`)
            const maxDeclared = await parseFloat(Temperaturerules[0].max)
            const maxGiven = await parseFloat(metricToExaminate.value)
            await ifMax(maxDeclared,maxGiven)
            await console.log(`${maxDeclared} y ${maxGiven}`)
            
        }
    }catch(execption){
        console.log(execption)
        console.error(execption)
    }
}
async function ifMax(maxDeclared, maxGiven){
    if(maxDeclared< maxGiven){
        //mensaje wpp
        //email
        console.log(`${chalk.yellow("Ta kenchi la heladera, you must be kidding")}`)
        emailAlert()
    }
}    

module.exports = {minAndMax}