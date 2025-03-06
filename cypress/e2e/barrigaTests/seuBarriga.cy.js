
import loc from '../../support/locators'

describe('Your balley', () => {

    beforeEach(() => {
        cy.login('jack@jack.com', '1234')
    })
    
    it('Insert an acount', () => {
        
        cy.get(loc.MENU.SETTING).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.get(loc.CONTAS.NOME).type('jackCount')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE)
            .should('contain', 'Conta inserida com sucesso!')

    })
    it('Edit an acount', () => {

        cy.get(loc.MENU.SETTING).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.contains('td', 'jackCount') // Localiza o <td> que contém "jackCount"
            .siblings('td') // Seleciona os irmãos <td>
            .find('i.far.fa-edit') // Busca o <i> dentro do <td> irmão
            .click() // Opcional, caso queira clicar no ícone
        cy.get(loc.CONTAS.NOME).clear().type('jackDoProjack')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE)
            .should('contain', 'atualizada com sucesso!')
    })
    it('Should not create an acount with same name', ()=>{

        cy.get(loc.MENU.SETTING).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.get(loc.CONTAS.NOME).type('jackDoProjack')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE)
            .should('contain', 'code 400')
    })
    it('Create a new movement', ()=>{
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DERSCRICAO).type('teste')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Jack')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para alterar')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE)
            .should('contain', 'Movimentação inserida com sucesso!')
        cy.get('small.d-none.d-md-block')
            .contains('Jack')
            .should('exist')
    })
    it('Get balance', ()=>{
        cy.get(loc.MENU.HOME).click()
        cy.get('td')
            .contains('Conta para alterar')
            .siblings('td')
            .should('contain', '123,00')
    })
    it('Remove movement',()=>{

        
    })

    after(()=>{
        cy.resetApp()
    })
   
})

