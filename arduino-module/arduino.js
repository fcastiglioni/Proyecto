'use strict'

const five = require('johnny-five')
const fridgeAgent = require('fridge-agent')

const board = new five.Board()


const fridge = new fridgeAgent({
    name: 'ArduinoUno',
    username: 'Alexis',
    ineterval : 1000,
    mqtt :{
        host: 'http://localhost:1883'
    }
})

board.on("ready", function() {

    console.log('Conectado al arduino')
    
    let audio = 0

    const sensor = new five.Sensor({
        pin: 'A0'
    })

    fridge.addMetric('audio', function(){
        return audio
    })

    sensor.on('change', function(data){
        audio = data
    })
    fridge.connect()
})