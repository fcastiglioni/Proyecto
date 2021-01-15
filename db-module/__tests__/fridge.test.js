'use strict'
const proxyquire = require('proxyquire')

const config = {
  loggin: function () {}
}

let db = null
let MetricStub = {
    belongsTo: function(){}
}
let FridgeStub = null

beforeEach(async () => {
  FridgeStub = {
      hasMany: function() {}
  }
  //de esta manera cuando solicitamos el fridge y las metricas (requeridas) en el index lo cambio con el proxyquire a los stubs creados . 
  const dbInitAndRelate = proxyquire('../', {   // poniendo '../ ' requiero automaticamente el archivo main.
    './models/fridge': () => FridgeStub,        
    './models/metrics': () => MetricStub
  })
  db = await dbInitAndRelate(config)
})

test('Pruebaaa', async () => {
  await expect(db.Fridge).toBeTruthy()
})
