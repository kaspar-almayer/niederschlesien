describe('home page', () => {
  it('renders hero', () => {
    cy.visit('/')
    cy.contains("Niemieckie groby w Polsce")
    cy.contains('Deutsche Gräber in Polen').should('not.exist')
    cy.get('.main-header__lang').get('select').select('de')
    cy.contains('Deutsche Gräber in Polen').should('exist')
  })
})