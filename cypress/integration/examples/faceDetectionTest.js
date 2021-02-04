/// <reference types="Cypress" />

const { wait } = require("@testing-library/react");

describe('FaceDetection',function(){
     
    // Login before each test checks
    beforeEach(function(){
        cy.login('a@gmail.com','123')
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
    
    //checking the presence of signout inside the logged in page and its logged out function
    it('signout',function(){
        cy.wait(5000)
        cy.get("#root > div > nav > p").should('be.visible').click()
        cy.get('input[type="submit"]').should('be.visible')
    })
    
    
    //checking the rank of the individual
    it('rank',function(){
        let count;
       cy.wait(5000)
       
       cy.get('#root > div > div:nth-child(3) > div:nth-child(2) > div.white.f1').then(function($e){
           count=$e.text();
       })
      
       for(let i=0;i<3;i++){
        cy.get('#root > div > div:nth-child(3) > div:nth-child(3) > div > div > input')
        .type('https://upload.wikimedia.org/wikipedia/commons/9/9d/Barack_Obama.jpg')
        cy.get('#root > div > div:nth-child(3) > div:nth-child(3) > div > div > button').click()
        cy.reload();
        cy.login('a@gmail.com','123')
        wait(5000);
       }
    
       let finalCount;
       cy.get('#root > div > div:nth-child(3) > div:nth-child(2) > div.white.f1').then(function($e){
        finalCount=$e.text();
    })
     expect(count+3).to.equal(finalCount);
       
    })

    //checking the brain icon and label
    it('BrainBtnAndLabel',function(){
        cy.get('#root > div > div:nth-child(3) > div.ma4.ma0 > div').should('be.visible')
        cy.get('#root > div > div:nth-child(3) > div:nth-child(3) > p').should('be.visible')
    })
    //checking the detection of the url tab and detect btn
    it('CheckDetectAndUrlBox',function(){
        cy.get('#root > div > div:nth-child(3) > div:nth-child(3) > div > div > input').should('be.visible').type('https://upload.wikimedia.org/wikipedia/commons/9/9d/Barack_Obama.jpg')
        cy.get('#inputimage').should('not.be.visible')
        cy.get('#root > div > div:nth-child(3) > div:nth-child(3) > div > div > button').should('be.visible').click()
        cy.get('#inputimage').should('be.visible')

    })

})