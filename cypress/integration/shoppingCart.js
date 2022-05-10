/// <reference types="cypress" />

describe('Shopping Cart Tests ', () => {
    let product
    let customer

    before(() => {
        cy.fixture('product').then((productData) => {
            product = productData
        })
        cy.fixture('customer').then((customerData) => {
            customer = customerData
        })
    })

    beforeEach(() => {
        cy.login(customer.email, customer.password)
    })

    it('Add Product to shopping cart', () => {
        cy.visit(product.url)
        cy.get('#product-id')
            .should('have.value', product.order_quantity)
            .clear()
            .type('3')
        cy.get('#addToShoppingCard').click()
        cy.visit('shopping-cart')
        cy.get('#shopping-cart').should('contain', product.name)
    })

})