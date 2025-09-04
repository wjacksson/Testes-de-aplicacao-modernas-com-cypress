

describe('work with iframes', ()=>{
    beforeEach(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')

    })
    it('iframe...',()=>{
        cy.get('#frame1').then(iframe =>{
            const body = iframe.contents().find('body')
            cy.wrap(body).find('#tfield')
            .type('funciona')
            .should('have.value','funciona')
        })  
    })
    it.only('Must to test frame directly', ()=>{
        cy.visit('https://wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()
        cy.on('window:alert', msg =>{
            expect(msg).to.eq('Click OK!')
        })
    })
})