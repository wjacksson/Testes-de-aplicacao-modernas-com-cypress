
describe('register...', ()=>{
    beforeEach(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')

    })
    it('soluction made by author',()=>{

        const alertMessages = [
            'Nome eh obrigatorio',
            'Sobrenome eh obrigatorio',
            'Sexo eh obrigatorio'
          ];
          
          let alertIndex = 0; 
          
          cy.on('window:alert', (texto) => {
            expect(texto).to.equal(alertMessages[alertIndex])
            alertIndex++;
          })
        cy.get('#formCadastrar[value="Cadastrar"]').click()
        cy.get('#formNome[name="formNome"]').type('Jack')
        cy.get('#formCadastrar[value="Cadastrar"]').click()
        cy.get('#formSobrenome[name="formSobrenome"]').type('do Projack')
        cy.get('#formCadastrar[value="Cadastrar"]').click()
        cy.get('#formSexoMasc[value="M"]').check()
        cy.get('#formCadastrar[value="Cadastrar"]').click()
        cy.get('#resultado span ')
        .contains('Cadastrado!').should('be.visible')
    })
    it.only('soluction made by teacher', ()=>{
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#formCadastrar[value="Cadastrar"]')
            .click().then(()=>{
                expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio')
            })

        cy.get('#formNome[name="formNome"]').type('Jack')
        cy.get('#formCadastrar[value="Cadastrar"]')
            .click().then(()=>{
                expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio')
            })

        cy.get('#formSobrenome[name="formSobrenome"]').type('do Projack')
        cy.get('#formCadastrar[value="Cadastrar"]')
            .click().then(()=>{
                expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio')
            })

        cy.get('#formSexoMasc[value="M"]').check()
        cy.get('#formCadastrar[value="Cadastrar"]').click()
        cy.get('#resultado span ')
            .contains('Cadastrado!')
            .should('be.visible')

    })

})