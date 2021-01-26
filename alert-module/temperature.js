'use strict'
const dbInitAndRelate = require('db-module')
const config = require('../setup/config')
const chalk = require('chalk')

async function minAndMax(metricToExaminate) {
    try {
        console.log(`${chalk.yellow(metricToExaminate.type)}`)
        if(metricToExaminate.type == 'temperature'){
            const db = await dbInitAndRelate(config)
            await console.log(`${chalk.blueBright(db.Rule.findByAtribute('temperature'))}`)
            const maxDeclared = await parseFloat(db.Rule.findByAtribute('temperature').max)
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
    }
    return
}

module.exports = {minAndMax}