/// <reference types="cypress" />

describe('Security Tests ', () => {
    let customer

    beforeEach(() => {
        cy.fixture('customer').then((customerData) => {
            customer = customerData
        })
    })

    it('register as customer', () => {
        cy.intercept({
            method: 'POST',
            url: 'process_register'
        }).as('postCustomer')

        cy.visit('/register')
        cy.get('#firstName').type(customer.first_name)
        cy.get('#lastName').type(customer.last_name)
        cy.get('#email').type(customer.email)
        cy.get('#password').type(customer.password)
        cy.get('#repetitionPassword').type(customer.password)
        cy.get('body > div > div > form > div:nth-child(8) > div > button').click()
        cy.wait('@postCustomer')
    })

    it('login as customer', () => {
        cy.visit('/login')
        cy.get('#inputEmail').type(customer.email)
        cy.get('#inputPassword').type(customer.password)
        cy.get('body > div > form > button').click()
        cy.get('#navcol-1 > ul > div:nth-child(2) > li > a').should('be.visible')
    })    
  })