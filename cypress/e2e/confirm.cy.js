
describe('work with alerts', ()=>{
    beforeEach(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')

    })
    it('confirm with ok',()=>{
        cy.get('#confirm[value="Confirm"]').click()
        cy.on('window:confirm', (texto) => {
            expect(texto).to.equal('Confirm Simples')
            return true;
          })
        cy.on('window:alert', (texto) => {
            expect(texto).to.equal('Confirmado');
          })
    })

    it('confirm with cancelar',()=>{
        cy.get('#confirm[value="Confirm"]').click()
        cy.on('window:confirm', (texto) => {
            expect(texto).to.equal('Confirm Simples')
            return false;
          })
        cy.on('window:alert', (texto) => {
            expect(texto).to.equal('Negado');
          })
    })
})