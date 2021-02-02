import { posts } from '../fixtures/staticPostIndexData'

describe('In comment section', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/posts',
      response: { posts: posts },
    })
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/auth/sign_in',
      response: 'fx:user_login_with_devise_credentials.json',
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/auth/validate_token**',
      response: 'fx:user_login_with_devise_credentials.json',
    })
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/api/posts/1/comments',
      response: {},
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/posts/1/comments',
      response: {
        comments: [
          {
            id: 1,
            content: 'this is a comment',
            user: 'spotifyuser@spotify.com',
          },
        ],
      },
    })
    
    cy.visit('/')
    cy.get('[data-testid=login-screen]').within(() => {
      cy.get('[data-testid=login-email]').type('spotifyuser@spotify.com')
      cy.get('[data-testid=login-password]').type('password')
      cy.get('[data-testid=login-submit]').click()
      cy.get('[data-testid=login-screen]').should('not.be.visible')
    })
  })

  it('user can see all comments', () => {
    cy.get('[data-testid=post-card-1]').within(() => {
      cy.get('[data-testid=comment-button]').click()
    })
    cy.get('[data-testid=comment-section]').should(
      'contain',
      'this is a comment'
    )
  })

  it('user can make a comment', () => {
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/posts/1/comments',
      response: {
        comments: [
          {
            id: 1,
            content: 'this is a comment',
            user: 'spotifyuser@spotify.com'
          },
          {
            id: 2,
            content: 'this is a second comment',
            user: 'spotifyuser@spotify.com',
          },
        ],
      },
    })
    cy.get('[data-testid=post-card-1]').within(() => {
      cy.get('[data-testid=comment-button]').click()
    })
    cy.get('[data-testid=comment-section]').within(() => {
      cy.get('[data-testid=comment-input]').type('this is a second comment')
      cy.get('[data-testid=comment-submit]').click()
    })
    cy.get('[data-testid=comment-section]').should(
      'contain',
      'this is a second comment'
    )
  })
})
