/// <reference types="cypress" />

describe('Profile Tests ', () => {
    let product
    let existingCustomer

    before(() => {
        cy.fixture('existingCustomer').then((customerData) => {
            existingCustomer = customerData
        })
    })

    it('view profile and change customer details', () => {
        cy.intercept({
            method: 'POST',
            url: 'profile_change'
        }).as('postProfileChange')

        cy.login(existingCustomer.email.default, existingCustomer.password)
        cy.contains('Profil')
        cy.visit('/profile')
        cy.get('#change-profile').click()
        cy.get('#firstName').clear().type(existingCustomer.first_name.updated)
        cy.get('#lastName').clear().type(existingCustomer.last_name.updated)
        cy.get('#email').clear().type(existingCustomer.email.updated)
        cy.get('#save-changes').click()
        cy.wait('@postProfileChange')
    })

    it('login with new email and delete account', () => {
        cy.login(existingCustomer.email.updated, existingCustomer.password)
        cy.contains('Profil')
        cy.visit('/profile')
        cy.get('#delete-account').click()
    })

    it('checks if login is no longer possible after deletion with old and new details', () => {
        cy.login(existingCustomer.email.default, existingCustomer.password)
        cy.contains('Invalid username and password.')
        cy.visit('/login')
        cy.login(existingCustomer.email.updated, existingCustomer.password)
        cy.contains('Invalid username and password.')
    })

})
