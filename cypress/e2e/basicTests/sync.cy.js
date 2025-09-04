describe('Using sync with cypress',()=>{
    beforeEach(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')

    })
    it('It must wait the element be avaliable',()=>{
        cy.get('#buttonDelay[value="Resposta Demorada"]').click()
        cy.wait(5000);
        cy.get('#novoCampo').should('exist')
    })
    it('It must verify item1 and then iten2', ()=>{
        cy.get('#buttonList[value="Listar"]').click()
        cy.get('#lista li')
            .find('span')
            .should('contain','Item 1')
        cy.get('#lista li span')
            .should('contain','Item 2')
    })
    it('click retry', ()=>{
        cy.get('#buttonCount')
        .click().should('have.value','1')

    })

})