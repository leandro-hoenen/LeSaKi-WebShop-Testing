// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="cypress" />

Cypress.Commands.add('register', (customer) => { 
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

Cypress.Commands.add('login', (email, password) => { 
    cy.visit('/login')
    cy.get('#inputEmail').type(email)
    cy.get('#inputPassword').type(password)
    cy.get('body > div > form > button').click()
 })


