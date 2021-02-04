describe('Tests for Sign-In Page', function() {
    it('Checks if there are available inputs', function() {
        cy.visit('https://immense-mountain-53260.herokuapp.com')
        cy.get('#root').within(() => {
            cy.get('div').within(() => {
                cy.get('div').first()
                    .should('have.class', 'particles')
            })
        })
        cy.get('nav').within(() => {
            cy.get('p')
                .contains('Sign In')
                .should('have.class', 'f3 link dim black underline pa3 pointer')
                .and('be.visible')
                .and('have.text', 'Sign In')
            cy.get('p')
                .contains('Register')
                .should('have.class', 'f3 link dim black underline pa3 pointer')
                .and('be.visible')
        })
        cy.get('label')
            .contains('email', {matchCase : false})
            .should('have.class', "db")
            .and('be.visible')
        cy.get('input[name = "email-address"]')
            .should('have.id', 'email-address')
            .and('be.visible')
        cy.get('label')
            .contains('password', {matchCase : false})
            .should('have.class', "db")
            .and('be.visible')
        cy.get('input[name = "password"]')
            .should('have.id', 'password')
            .and('be.visible')
    })
    it('checks functionality of input', function() {
        cy.get('input[type = "submit"]').click()
        cy.url().should('eq', 'https://immense-mountain-53260.herokuapp.com/')
        cy.get('input[name="email-address"]')
            .type("mrinal112397@gmail.com")
        cy.get('input[name="password"]')
            .type("123456789")
        cy.get('input[type = "submit"]').click()
        cy.wait(3000)
    })
    it('checks Register Button', function() {
        cy.visit('https://immense-mountain-53260.herokuapp.com')
        cy.get('div').contains('Register', {matchCase : false}).click()
        cy.get('#sign_up').within(() => {
            cy.get('legend')
                .should('have.text', 'Register')   
        })
    })
    it('checks functionality of Register Inputs', function() {
        cy.get('#root').within(() => {
            cy.get('div').within(() => {
                cy.get('div')
                    .first()
                    .should('have.class', 'particles')
            })
        })
        cy.get('nav').within(() => {
            cy.get('p')
                .contains('Sign In')
                .should('have.class', 'f3 link dim black underline pa3 pointer')
                .and('be.visible')
            cy.get('p')
                .contains('Register')
                .should('have.class', 'f3 link dim black underline pa3 pointer')
                .and('be.visible')
        })
        cy.get('input[name = "name"]')
            .should('have.id', 'name')
            .and('be.visible')
        cy.get('input[name = "email-address"]')
            .should('have.id', 'email-address')
            .and('be.visible')
        cy.get('input[name = "password"]')
            .should('have.id', 'password')
            .and('be.visible')
        cy.get('input[type = "submit"]')
            .should('have.value', 'Register')
            .and('be.visible')
            .click()
        cy.url().should('eq', 'https://immense-mountain-53260.herokuapp.com/')
        cy.get('input[name = "name"]')
            .type('Hero')
        cy.get('input[name = "email-address"]')
            .type('Hero@gmail.com')
        cy.get('input[name = "password"]')
            .type("123456")
        cy.get('input[type = "submit"]')
            .should('have.value', 'Register')
            .and('be.visible')
            .click()
        // cy.request('POST', 'http://example.com/widgets')
        // cy.intercept('POST', 'http://example.com/widgets', {
        //     statusCode: 200,
        //     body: 'it worked!'
        // })
    })
})






















