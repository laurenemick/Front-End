const { cyan } = require("color-name")

describe('Main Page Test', ()=>{
    it('it goes to pages', ()=>{
        cy
        .visit('http://localhost:3000/')
        .url().should('include', 'localhost')
    })
})