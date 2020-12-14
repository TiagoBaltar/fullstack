const { func } = require('prop-types')

describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
    cy.request('POST', '/api/testing/reset')
    const user = {
      name: 'Me',
      username: 'testUser',
      password: 'password',
    }

    cy.request('POST', '/api/users/', user)
  })

  it('front page can be opened', function () {
    cy.contains('blogs')
  })

  it('login form is shown', function () {
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()

      cy.get('#username').type('testUser')
      cy.get('#password').type('password')
      cy.get('#loginForm').submit()

      cy.contains('logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()

      cy.get('#username').type('testUser')
      cy.get('#password').type('wrong')
      cy.get('#loginForm').submit()

      cy.get('.error')
        .should('contain', 'wrong')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and(
          'have.css',
          'background',
          'rgb(211, 211, 211) none repeat scroll 0% 0% / auto padding-box border-box'
        )
        .and('have.css', 'font-size', '20px')
        .and('have.css', 'border-style', 'solid')
        .and('have.css', 'border-radius', '5px')
        .and('have.css', 'padding', '10px')
        .and('have.css', 'margin', '10px')

      cy.get('html').should('not.contain', 'testUser')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testUser', password: 'password' })
    })

    it('A blog can be created', function () {
      cy.contains('create').click()

      cy.get('#title').type('test')
      cy.get('#author').type('me')
      cy.get('#url').type('URL')

      cy.contains('add blog').click()

      cy.contains('test')
      cy.contains('me')
      cy.contains('URL')
    })

    it('A blog can be deleted', function () {
      cy.createBlog({ title: 'test1', author: 'me1', url: 'URL1' })

      cy.contains('test1') //
        .contains('view')
        .click()

      cy.contains('test1') //
        .contains('remove')
        .click()

      cy.get('.remove')
        .should('contain', 'Removed')
        .and('have.css', 'color', 'rgb(255, 69, 0)')
        .and(
          'have.css',
          'background',
          'rgb(211, 211, 211) none repeat scroll 0% 0% / auto padding-box border-box'
        )
        .and('have.css', 'font-size', '20px')
        .and('have.css', 'border-style', 'solid')
        .and('have.css', 'border-radius', '5px')
        .and('have.css', 'padding', '10px')
        .and('have.css', 'margin', '10px')
    })

    describe('when multiple blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'test1', author: 'me1', url: 'URL1' })
        cy.createBlog({ title: 'test2', author: 'me2', url: 'URL2' })
        cy.createBlog({ title: 'test3', author: 'me3', url: 'URL3' })
      })

      it('they are ordered by the amount of likes', function () {
        cy.contains('test1') //
          .contains('view')
          .click()

        cy.contains('test1') //
          .contains('like')
          .click()

        cy.contains('test1') //
          .contains('likes 1')

        cy.contains('test2') //
          .contains('view')
          .click()

        cy.contains('test2') //
          .contains('like')
          .click()
          .click()

        cy.contains('test2') //
          .contains('likes 2')

        // check that the blogs are ordered by likes
        cy.get('#blogDiv').then((blogs) => {
          expect(blogs.length === 3)
          expect(cy.wrap(blogs[0]).contains('test2'))
          expect(cy.wrap(blogs[1]).contains('test1'))
        })
      })
    })
  })
})
