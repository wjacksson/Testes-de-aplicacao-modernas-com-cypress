describe('Dinamic tests', () => {

    beforeEach(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')

    })
it('Must to fill all fields...',()=>{
    cy.get('#formNome').type('Usuario')
    cy.get('#formSobrenome[name="formSobrenome"]').type('Qualquer')
    cy.get(`[name=formSexo][value=F]`).click()
    cy.get('[name=formComidaFavorita]').each($el =>{
        if($el.val()!= 'vegetariano'){
            cy.wrap($el).click()
        }    
    })
    cy.get('#formCadastrar[value="Cadastrar"]').click()
        cy.get('#resultado span ')
        .contains('Cadastrado!').should('be.visible')

})
})

