
import loc from '../../support/locators'

describe('Your balley', () => {

    beforeEach(() => {
        cy.login('jack@jack.com', '1234')
        cy.get(loc.MENU.SETTING).click()
        cy.get(loc.MENU.CONTAS).click()
    })
    
    it('Insert an acount', () => {
        
        cy.get(loc.CONTAS.NOME).type('jackCount')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE)
            .should('contain', 'Conta inserida com sucesso!')

    })
    it('Edit an acount', () => {

        cy.contains('td', 'jackCount') // Localiza o <td> que contém "jackCount"
            .siblings('td') // Seleciona os irmãos <td>
            .find('i.far.fa-edit') // Busca o <i> dentro do <td> irmão
            .click() // Opcional, caso queira clicar no ícone

        cy.get(loc.CONTAS.NOME).clear().type('jackDoProjack')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE)
            .should('contain', 'atualizada com sucesso!')
    })

    after(()=>{
        cy.resetApp()
    })
    // it('Reset acount datas', ()=>{
    //     cy.get('[data-test="menu-settings"]').click()
    //     cy.get('[href="/contas"]').click()
    //     cy.get('[data-test="nome"]').type('jackCount')
    //     cy.get('button[class="btn btn-primary btn-block"]').click()
    //     cy.get('.toast')
    //         .should('contain', 'Conta inserida com sucesso!')
    // })

})

