'use strict'
const db = require(db-module)

async function minAndMax(metricToExaminate) {
    try {
        if(metricToExaminate.type.type == 'temperature'){
            const maxDeclared = await parseInt(db.Rule.findByAtribute('temperature').max)
            const maxGiven = await pareseInt(metricToExaminate.value)

            if(maxDeclared< maxGiven){
                //mensaje wpp
                //email
                console.log("Ta kenchi la heladera, you must be kidding")
            }
        }
    }catch(execption){
        console.log(execption)
        console.error(execption)
    }
}
module.exports = minAndMax