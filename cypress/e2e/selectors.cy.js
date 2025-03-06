
describe('work with differents selectors', () => {

    beforeEach(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')

    })
it('Using Jquery selector',()=>{
    cy.get('table#tabelaUsuarios tbody > tr td:contains("Doutorado"):eq(0) ~td:eq(3) > inputaaaaaaa')

})
})