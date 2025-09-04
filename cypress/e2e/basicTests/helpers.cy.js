describe('helpers',()=>{
    it('wrap',()=>{
        const obj = {nome:'user', idade:29}
        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property','nome')

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#formNome').then($el=>{
            cy.wrap($el).type('it is working by Cypress')
        })
    })
    it('its...',()=>{
        const obj = {nome:'user', idade:29}
        cy.wrap(obj).its('nome').should('be.equal','user')
    })
    it('Invoke...',()=>{
        const getvalue =()=>1;

        cy.wrap({fn:getvalue}).invoke('fn').should('be.equal', 1)
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#formNome').invoke('val', 'Texto via Invoke')
    })
})