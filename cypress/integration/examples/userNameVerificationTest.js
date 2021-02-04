/// <reference types="Cypress" />

describe('testingUserNames',function(){

    it('CheckingTheInternalUserName',function(){
       
        //Data Driven Testing of login
        cy.visit("https://immense-mountain-53260.herokuapp.com/")

        //Case: 1
        cy.login('a@gmail.com','123')
        cy.get('#root > div > div:nth-child(3) > div:nth-child(2) > div.white.f3')
        .contains('a , your current rank is...')
        cy.reload()

        //Case: 2
        cy.login('b@gmail.com','123')
        cy.get('#root > div > div:nth-child(3) > div:nth-child(2) > div.white.f3')
        .contains('b , your current rank is...')
        cy.reload()

    })
})