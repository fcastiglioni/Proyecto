'use strict'

const config = require('.../setup/config')

let db = null

beforeEach(async () => {
    const SetUpDatabase = require('../') //poniendo así requiero automaticamente el archivo main.
    db = await SetUpDatabase(config)
})

test('Pruebaaa', t => {
    t.truthy(db.Fridge, 'FUncionooo')
})

