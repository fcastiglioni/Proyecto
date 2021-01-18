'use strict'
const fridgeMock = require('./fridgeFixture')

// jest.fn copn esto digo quees una funcion mock para poder usarla en los test, tambine puedo suar spy
const findId =  {
    hasMany: jest.fn(),
    findById: jest.fn((id) => Promise.resolve(fridgeMock.findById(id)) )
}
module.exports = findId
