/// <reference types="cypress" />

describe('Browsing through products ', () => {
//    let product
//    let existingCustomer

//    before(() => {
//        cy.fixture('existingCustomer').then((customerData) => {
//            existingCustomer = customerData
//        })
//    })

//generates a random number between 1 and 4 
//for selecting random article from the index page 
//https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
let rdmNumber = Math.floor(Math.random() * (4 - 1 + 1) + 1);

    it('Click on product in the homepage', () => {
        cy.visit('/')        
        cy.get('body > div > div > div > div > div > ul > li > a').eq(rdmNumber).click()  
    })


})
