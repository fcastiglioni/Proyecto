'use strict'
const fridgeMock = require('./fridgeFixture')

// jest.fn copn esto digo quees una funcion mock para poder usarla en los test, tambine puedo suar spy
const findId =  {
    hasMany: jest.fn(),
    findById: jest.fn((id) => Promise.resolve(fridgeMock.findById(id))),
    findByUuid: jest.fn((uuid) => Promise.resolve(fridgeMock.findByUuid(uuid))),
    findOne: jest.fn((uuid) => Promise.resolve(fridgeMock.findByUuid(uuid)))
    /*CreateOrUpdate: jest.fn((fridgeToFind) =>{ 
            const fridgeExisting = await fridgeMock.findById(fridgeToFind.id)

            if(fridgeExisting){
                
            }
            
    })*/
}

module.exports = findId
