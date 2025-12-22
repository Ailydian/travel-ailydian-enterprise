/// <reference types="cypress" />

// ***********************************************
// Custom commands for Cypress tests
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login as vehicle owner
       * @example cy.loginAsVehicleOwner('demo@carowner.ailydian.com', 'Demo123!')
       */
      loginAsVehicleOwner(email: string, password: string): Chainable<void>

      /**
       * Custom command to login as transfer owner
       * @example cy.loginAsTransferOwner('demo@transfer.ailydian.com', 'Demo123!')
       */
      loginAsTransferOwner(email: string, password: string): Chainable<void>

      /**
       * Custom command to login as property owner
       * @example cy.loginAsPropertyOwner('demo@ailydian.com', 'Demo123!')
       */
      loginAsPropertyOwner(email: string, password: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('loginAsVehicleOwner', (email: string, password: string) => {
  cy.visit('/vehicle-owner/auth/login')
  cy.get('input[type="email"]').type(email)
  cy.get('input[type="password"]').type(password)
  cy.get('button[type="submit"]').click()
  cy.url().should('include', '/vehicle-owner')
})

Cypress.Commands.add('loginAsTransferOwner', (email: string, password: string) => {
  cy.visit('/transfer-owner/auth/login')
  cy.get('input[type="email"]').type(email)
  cy.get('input[type="password"]').type(password)
  cy.get('button[type="submit"]').click()
  cy.url().should('include', '/transfer-owner')
})

Cypress.Commands.add('loginAsPropertyOwner', (email: string, password: string) => {
  cy.visit('/owner/auth/login')
  cy.get('input[type="email"]').type(email)
  cy.get('input[type="password"]').type(password)
  cy.get('button[type="submit"]').click()
  cy.url().should('include', '/owner')
})

export {}
