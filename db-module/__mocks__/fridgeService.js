'use strict'
const fridgeMock = require('./fridgeFixture')

// jest.fn copn esto digo quees una funcion mock para poder usarla en los test, tambine puedo suar spy
const FridgeFunctions =  {
    hasMany: jest.fn(),
    findById: jest.fn((id) => Promise.resolve(fridgeMock.findById(id))),
    findOne: jest.fn((condition) => Promise.resolve(fridgeMock.findOne)),
    create: jest.fn(() => Promise.resolve(fridgeMock.findOne)),
    update : jest.fn(() => Promise.resolve({
        toJSON () { return fridgeMock.newFrdige }
      })),
    findAll: jest.fn((condition) => {
        if(typeof condition !== "undefined"){
            return Promise.resolve(fridgeMock.findConnected)    
        }
        return Promise.resolve(fridgeMock.findAll)         
    })  
}

module.exports = FridgeFunctions
