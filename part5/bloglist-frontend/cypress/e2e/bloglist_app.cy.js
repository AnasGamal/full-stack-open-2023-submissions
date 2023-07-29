describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('blogs')
  })

  it('login form can be opened', function() {
    cy.contains('Login').click()
  })
  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('Login').click()
      cy.get('#username').type('alaa')
      cy.get('#password').type('alaa')
      cy.get('#login-button').click()
      cy.contains('Alaa logged in')
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#new-blog-title').type('a note created by cypress')
      cy.get('#new-blog-author').type('Cypress')
      cy.get('#new-blog-url').type('cypress-url')
      cy.get('#submit-new-blog').click()
      cy.contains('a note created by cypress')
    })
  })
})