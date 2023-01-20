describe('home page', () => {
  it('renders hero', () => {
    cy.visit('/')
    cy.contains("Katalog niemieckich grobów w Polsce")
    cy.contains('Verzeichnis deutscher Gräber in Polen').should('not.exist')
    cy.get('.main-header__lang').get('select').select('de')
    cy.contains('Verzeichnis deutscher Gräber in Polen').should('exist')
  })
})