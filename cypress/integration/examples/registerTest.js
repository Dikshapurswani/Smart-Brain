/// <reference types="Cypress" />

describe('registerTests',function(){
    let data;
    
    // loading all the json from fixtures
    before(function(){
       cy.fixture('example').then(function(data1){
           data=data1;
       })
    })
    
    //checking the presence of background particles
    it('checkTheParticles',function(){
        cy.visit("https://immense-mountain-53260.herokuapp.com/");
        cy.get('#root').within(function(){
            cy.get('div').within(() => {
                cy.get('div').first()
                    .should('have.class', 'particles')
            })
        })
    })
   
    //check the presence of signin and register buttons on the homepage
    it('checkVisibilityOfSigninAndRegsiterBtns',function(){
        cy.visit("https://immense-mountain-53260.herokuapp.com/");
        cy.get('#root > div > nav > p:nth-child(1)').should('be.visible')
        cy.get('#root > div > nav > p:nth-child(2)').should('be.visible')

    })

    //checking the register application
    it('register',function(){
        cy.visit("https://immense-mountain-53260.herokuapp.com/");
        cy.get('#sign_up > legend').should('be.visible')
        cy.get('#sign_up > div:nth-child(2) > label').should('be.visible')
        cy.get('#sign_up > div:nth-child(3) > label').should('be.visible')
        cy.get('#sign_up > div.mv3 > label').should('be.visible')
        cy.get('#root > div > nav > p:nth-child(2)').should('be.visible').click()
        cy.get('#root > div > article > main').should('be.visible')
        cy.get('#name').should('be.visible').type(data.user_name)
        cy.get('#email-address').should('be.visible').type(data.email)
        cy.get('#password').should('be.visible').type(data.password)
        cy.get('input[type="submit"]').should('be.visible').click()
        cy.wait(5000)
        cy.get('#root > div > div:nth-child(3) > div.ma4.ma0 > div > div > img').should('be.visible')
        
    })
})