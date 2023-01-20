describe('contact page', () => {
  it('renders contact page', () => {
    cy.visit('/#/contact')
    cy.contains("kontakt")
    cy.screenshot()
  })

})