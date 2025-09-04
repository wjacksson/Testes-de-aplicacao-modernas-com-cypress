
describe('working with popups', () => {

    it('Popups...', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.window().then(win =>{
            cy.stub(win, 'open').as('winOpen')
        })
       cy.get('#buttonPopup[value="Abrir Popup"]').click()
       cy.get('@winOpen').should('be.called')
    })

   it('Popups by links...', ()=>{
    cy.visit('https://wcaquino.me/cypress/componentes.html')
    cy.contains('Popup2')
        .should('have.prop','href')
        .and('equal','https://wcaquino.me/cypress/frame.html')
   })
   it('Should acess Popup dinamically', ()=>{

    cy.visit('https://wcaquino.me/cypress/componentes.html')
    cy.contains('Popup2').then($a =>{
        const href = $a.prop('href')
    cy.visit(href)
    cy.get('#tfield')
        .type('Jack do Projack')
        .should('have.value', 'Jack do Projack')
    cy.on('window:alert', (texto) => {
    expect(texto).to.equal('Click OK!')
    })
    cy.get('#otherButton[value="Elemento Externo"]').click()
    })
   })
   it.only('Should force link on same page', ()=>{

    cy.visit('https://wcaquino.me/cypress/componentes.html')
    cy.contains('Popup2')
        .invoke('removeAttr','target')
        .click()
   })
})