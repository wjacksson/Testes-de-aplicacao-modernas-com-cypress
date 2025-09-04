
describe('work with basic elements', ()=>{

    beforeEach(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')

    })
    it('text', ()=>{
        cy.get('.facilAchar').should('have.text','Cuidado onde clica, muitas armadilhas...')

    })
    it('links', ()=>{
        cy.get('a[href="#"]').contains('Voltar').click();
        cy.get('#resultado')
            .should('be.visible')
            .and('have.text', 'Voltou!')

    })

    it('TextFields', ()=>{
        cy.get('#formNome')
            .type('Jack')
            .should('have.value', 'Jack')

        cy.get('#formSobrenome')
            .type('do Projack')
            .should('have.value', 'do Projack')

        cy.get('#formSexoMasc')
            .check()
            .should('be.checked')

        cy.get('#formComidaFavorita input[type="checkbox"][value="vegetariano"]')
            .check()
            .should('be.checked')

        cy.get('#formEscolaridade')
            .select('superior')
            .should('have.value','superior')

        cy.get('#formEsportes option[value="nada"]').click().should('have.value', 'nada')
            

        cy.get('#elementosForm\\:sugestoes')
            .type('Manda a boa...')
            .should('have.value', 'Manda a boa...')
    })
    it('verifying the quantity of elements inside a array', ()=>{
        cy.get('#formEscolaridade option')
            .its('length')
            .should('eq', 8)
    })
})