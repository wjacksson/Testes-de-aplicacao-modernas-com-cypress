
describe('work with alerts', ()=>{
    beforeEach(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')

    })
    it('alert', ()=>{
        cy.get('#alert[value="Alert"]').click()
        cy.on('window:alert', (texto) => {
            expect(texto).to.equal('Alert Simples');
          })
    })

    it('alert com mock', ()=>{
        const stub = cy.stub().as('alerta')
        cy.on('window:alert',stub)
        cy.get('#alert[value="Alert"]').click().then(()=>{
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
       
    })

    it('confirm',()=>{
        cy.get('#confirm[value="Confirm"]').click()
        cy.on('window:confirm', (texto) => {
            expect(texto).to.equal('Confirm Simples')
            return true;
          })
    })
})