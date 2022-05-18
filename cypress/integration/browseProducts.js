/// <reference types="cypress" />

describe('Browsing through products ', () => {
    let existingCustomer
    let baseURL = Cypress.config().baseUrl

    before(() => {
        cy.fixture('existingCustomer').then((customerData) => {
            existingCustomer = customerData
        })
    })

    beforeEach(() => {
        cy.login(existingCustomer.email.default, existingCustomer.password)
    })


    //generates a random number between 1 and 4 for selecting random article from the index page 
    //https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    let rdmNumber = Math.floor(Math.random() * (4 - 1 + 1) + 1)
    
    it('Click on random product in the homepage', () => {
        cy.visit('/')        
        cy.get('body > div > div > div > div > div > ul > li > a').eq(rdmNumber).click() 
        cy.contains('CHF')
        cy.get('#quantity').invoke('val').should('be.empty')
        
    })


    it('Test button \"Entdecke alle Kategorien\"', () => {
        cy.visit('/')        
        cy.get('#category-button').contains('Entdecke alle Kategorien').click()
        cy.url().should('eq', baseURL + 'products')

    })
    
    it('Test button \"Alle Artikel ansehen\"', () => {
        cy.visit('/')        
        cy.get('.btn-primary').contains('Alle').click()
        cy.url().should('eq', baseURL + 'products/all')

    })

})
