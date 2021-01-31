import { posts } from '../fixtures/staticPostIndexData'

describe('User can', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/posts',
      response: { posts: posts },
    }),
      cy.route({
        method: 'POST',
        url: 'http://localhost:3000/api/posts/*/likes',
        //response: { posts: posts },
      })
    cy.visit('/')
  })

  describe('successfully', () => {
    it('like another post', () => {
      cy.get('[data-testid="likeButton-1"]').click()
      cy.get('[data-testid="likecount-1"]').should('eq', '3')
    })
  })
})