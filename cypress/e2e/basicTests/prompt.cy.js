
describe('work with prompts', ()=>{
    beforeEach(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')

    })
    it('prompt...',()=>{

        cy.window().then((win) => {
        cy.stub(win, 'prompt').returns('Jack')
          })

        cy.on('window:confirm', (texto) => {
            expect(texto).to.equal('Era Jack?')
            return true
          })

        cy.on('window:alert', (texto) => {
            expect(texto).to.equal(':D')
          })
        cy.get('#prompt[value="Prompt"]').click()
    })

})