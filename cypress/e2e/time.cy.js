describe('Using time', () => {

    beforeEach(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')

    })
it('Going back to the past',()=>{

    const dt = new Date(2025, 2, 4)
    cy.clock(dt.getTime())
    cy.get('#ButtonNow[value="Hora certa"]').click()
    cy.get('#resultado > span').should('contain', '04/03/2025')
})
})

