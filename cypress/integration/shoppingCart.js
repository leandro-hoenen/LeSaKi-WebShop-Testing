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
        const totalPrice = (parseInt(product.order_quantity) * parseFloat(product.price)).toFixed(2)
        cy.visit(product.url)
        cy.get('#quantity')
            .clear()
            .type('3')
        cy.get('button[type="submit"]').click()
        cy.visit('shopping-cart')
        // Assertations
        cy.get('#shopping-cart').should('contain', product.name)
        cy.get('#shopping-cart > div > div.col-sm-8.col-xxl-7 > div > div:nth-child(2) > p').should('have.text', 'CHF ' + product.price)
        cy.get('#quantity-shopping-cart').should('have.text', product.order_quantity + ' Stück')
        cy.get('#subtotal > p:nth-child(2)').should('have.text', 'CHF ' + totalPrice)
    })

})