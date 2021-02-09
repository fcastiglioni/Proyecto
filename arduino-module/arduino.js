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

/* 
Formula para pasar de mm/ms a mm/hr
1 cup = 0.254 mm 
3600000 ms /hr
0.254 mm x 3600000 ms/hr = 914400 mm x ms /hr
*/

board.on("ready", function() {

    console.log('Conectado al arduino')
    
    let totalFlow = 0
    let timeStart = new Date()
    let totalTime = 0
    let rainRate = 0
    let flowMnHr = 914400.0 
    let flow = 0.254
    let valueRainRateChange = false //chequeo si el valor de rainRate cambio, asi no devuelve el mismo que antes

    const rainWise = new five.Sensor({
        pin: 'A0'
    })
   
    fridge.connect()

    rainWise.on("change", function(data){       
        if(data == 0){
            let timeEnd =  new Date()
            totalTime = timeEnd - timeStart // me queda en ms
            timeStart = new Date()//reseteo el tiempo
            totalFlow += flow
            rainRate  = flowMnHr / totalTime// mm/hr
            valueRainRateChange = true
        }
    })

    fridge.addMetric('Total-mm', function (){
        return totalFlow
    })

    fridge.addMetric("Rain-Rate-mm-hr", function(){
        if(valueRainRateChange){
            valueRainRateChange = false
            return rainRate
        }
        else {
            return 0
        }   
    })  
})