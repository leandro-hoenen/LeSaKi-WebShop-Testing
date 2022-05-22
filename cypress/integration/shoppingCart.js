/// <reference types="cypress" />

describe('Shopping Cart Tests ', () => {
    let product
    let coupon
    let customer
    let totalPrice

    before(() => {
        cy.fixture('product').then((productData) => {
            product = productData
        })
        cy.fixture('customer').then((customerData) => {
            customer = customerData
        })
        cy.fixture('coupon').then((couponData) => {
            coupon = couponData
        })
    })

    before(() => {
        totalPrice = parseInt(product.order_quantity) * parseFloat(product.price)
    })

    beforeEach(() => {
        cy.login(customer.email, customer.password)
    })

    it('Add Product to shopping cart', () => {
        cy.visit(product.url)
        cy.get('#quantity')
            .clear()
            .type('3')
        cy.get('button[type="submit"]').click()
        cy.visit('shopping-cart')
        cy.get('#shopping-cart').should('contain', product.name)
        cy.get('#shopping-cart > div > div.col-sm-8.col-xxl-7 > div > div:nth-child(2) > p').should('have.text', 'CHF ' + product.price)
        cy.get('#quantity-shopping-cart').should('have.text', product.order_quantity + ' Stück')
        cy.get('#subtotal > p:nth-child(2)').should('have.text', 'CHF ' + totalPrice.toFixed(2))
    })

    it('Add Coupon', () => {
        const discountPrice = (totalPrice - (totalPrice * parseFloat(coupon.value) / 100)).toFixed(2)
        cy.visit('shopping-cart')
        cy.get('#coupon')
            .should('be.empty')
            .type(coupon.code)
        cy.get('#coupon-code > button').click()
        cy.get('#subtotal > p:nth-child(2)').should('have.text', 'CHF ' + discountPrice)
    })

    it('Remove Product from shopping cart', () => {
        cy.visit('shopping-cart')
        cy.get('#shopping-cart > div > div.col-sm-8.col-xxl-7 > div > div.col.m-auto.align-items-lg-center > form > button').click()
        cy.get('#shopping-cart').should('not.contain', product.name)
    })

})