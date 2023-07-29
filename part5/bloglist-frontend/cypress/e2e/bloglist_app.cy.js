describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Alaa',
      username: 'alaa',
      password: 'alaa'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('blogs')
  })

  it('Login form is shown', function() {
    // check if login form has 2 inputs for username and password
    cy.get('.login-form').find('input').should('have.length', 2)
  })

  it('login form can be opened', function() {
    cy.contains('Login')
  })
  // describe('when logged in', function() {
  //   beforeEach(function() {
  //     cy.contains('Login').click()
  //     cy.get('#username').type('alaa')
  //     cy.get('#password').type('alaa')
  //     cy.get('#login-button').click()
  //     cy.contains('Alaa logged in')
  //   })

  //   it('a new blog can be created', function() {
  //     cy.contains('new blog').click()
  //     cy.get('#new-blog-title').type('a blog created by cypress')
  //     cy.get('#new-blog-author').type('Cypress')
  //     cy.get('#new-blog-url').type('cypress-url')
  //     cy.get('#submit-new-blog').click()
  //     cy.contains('a note created by cypress')
  //   })
  // })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('alaa')
      cy.get('#password').type('alaa')
      cy.get('#login-button').click()
      cy.get('.success').should('contain', 'logged in')
      // make sure it prints in green color
      cy.get('.success').should('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('heisenberg')
      cy.get('#password').type('heisenberg')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'wrong')
      // make sure it prints in red color
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

})
