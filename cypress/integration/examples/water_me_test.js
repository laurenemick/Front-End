const { cyan } = require("color-name")

describe('Registration Test', ()=>{
    it('it goes to pages', ()=>{
        cy
        .visit('http://localhost:3000/')
        .url()
        .should('include', 'localhost')
    })
    it('can navigate to registration page',() => {
        cy
        .get('#signUpButton')
        .click()
        .url()
        .should('include', 'registration')
    })
    it('check if disabled', ()=>{
        cy
        .get('#submitBtn')
        .should('be.disabled')
    })
    it('can enter first name', ()=>{
        cy
        .get('input[name = "fName"]')
        .type('Ava')
        .should('have.value', 'Ava')
    })
    it('check if disabled', ()=>{
        cy
        .get('#submitBtn')
        .should('be.disabled')
    })
    it('can enter last name', ()=>{
        cy
        .get('input[name = "lName"]')
        .type('Wingfield')
        .should('have.value', 'Wingfield')
    })
    it('check if disabled', ()=>{
        cy
        .get('#submitBtn')
        .should('be.disabled')
    })
    it('can enter email', ()=>{
        cy
        .get('input[name = "email"]')
        .type('ava@ava.com')
        .should('have.value', 'ava@ava.com')
    })
    it('check if disabled', ()=>{
        cy
        .get('#submitBtn')
        .should('be.disabled')
    })
    it('can enter phone number', ()=>{
        cy
        .get('input[name = "phone"]')
        .type('555-555-5555')
        .should('have.value', '555-555-5555')
    })
    it('check if disabled', ()=>{
        cy
        .get('#submitBtn')
        .should('be.disabled')
    })
    it('can enter password', ()=>{
        cy
        .get('input[name = "password"]')
        .type('12ABcd!@')
        .should('have.value', '12ABcd!@')
    })
    it('check if disabled', ()=>{
        cy
        .get('#submitBtn')
        .should('be.disabled')
    })
    it('can enter password', ()=>{
        cy
        .get('input[name = "vPassword"]')
        .type('12ABcd33')
        .should('have.value', '12ABcd33')
    })
    it('check if disabled', ()=>{
        cy
        .get('#submitBtn')
        .should('be.disabled')
    })
    it('can enter password', ()=>{
        cy
        .get('input[name = "vPassword"]')
        .clear()
        .type('12ABcd!@')
        .should('have.value', '12ABcd!@')
    })
    it('check if enabled and click', ()=>{
        cy
        .get('#submitBtn')
        .should('not.be.disabled')
        .click()
    })
})
describe('Login Test', ()=>{
    it('it goes to pages', ()=>{
        cy
        .visit('http://localhost:3000/')
        .url()
        .should('include', 'localhost')
    })
    it('can nav to login page', ()=>{
        cy
        .get('#loginBtn')
        .click()
        .url()
        .should('include', 'login')
    })
    it('check if disabled', ()=>{
        cy
        .get('#submitBtn')
        .should('be.disabled')
    })
    it('can enter email', ()=>{
        cy
        .get('input[name = "email"]')
        .type('ava@ava.com')
        .should('have.value', 'ava@ava.com')
    })
    it('check if disabled', ()=>{
        cy
        .get('#submitBtn')
        .should('be.disabled')
    })
    it('can enter password', ()=>{
        cy
        .get('input[name = "password"]')
        .type('12ABcd!@')
        .should('have.value', '12ABcd!@')
    })
    it('check if disabled', ()=>{
        cy
        .get('#submitBtn')
        .should('not.be.disabled')
    })
})