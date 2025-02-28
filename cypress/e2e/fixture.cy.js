
describe('work with fixture folder', () => {

    beforeEach(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')

    })
it('Get data from fixture file',()=>{

    cy.fixture("userData").then((userData) =>{
        cy.get('#formNome').type(userData.nome)
        cy.get('#formSobrenome').type(userData.sobrenome)
        cy.get(`[name=formSexo][value=${userData.sexo}]`).check()
        cy.get(`#formComidaPizza[value="${userData.comida}"]`).check()
        cy.get('#formEscolaridade').select(userData.escolaridade)
        cy.get('#formEsportes').select(userData.esporte)
        cy.get('#formCadastrar[value="Cadastrar"]').click()
        cy.get('#resultado span ')
            .contains('Cadastrado!')
            .should('be.visible')

    })
    
})
})