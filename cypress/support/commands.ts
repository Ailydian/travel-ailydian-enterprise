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

      /**
       * Custom command to login programmatically
       * @example cy.login('test@example.com', 'password123')
       */
      login(email: string, password: string): Chainable<void>

      /**
       * Custom command to create a test booking
       * @example cy.createTestBooking({ propertyId: 'prop-123' })
       */
      createTestBooking(options?: {
        propertyId?: string
        checkIn?: string
        checkOut?: string
        guests?: number
        totalAmount?: number
      }): Chainable<string>

      /**
       * Custom command to complete full booking flow
       * @example cy.completeBookingFlow({ propertyId: 'prop-123', checkIn: '2025-03-01' })
       */
      completeBookingFlow(options: {
        propertyId: string
        checkIn: string
        checkOut: string
        guests: number
      }): Chainable<void>

      /**
       * Custom command to fill Stripe card details
       * @example cy.fillStripeCard({ cardNumber: '4242424242424242', expiry: '12/30', cvc: '123' })
       */
      fillStripeCard(details: {
        cardNumber: string
        expiry: string
        cvc: string
      }): Chainable<void>
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

// General user login command
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.session(
    [email, password],
    () => {
      cy.request({
        method: 'POST',
        url: '/api/auth/callback/credentials',
        body: {
          email,
          password,
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
    },
    {
      validate() {
        cy.getCookie('next-auth.session-token').should('exist')
      },
    }
  )
})

// Create test booking command
Cypress.Commands.add(
  'createTestBooking',
  (options: {
    propertyId?: string
    checkIn?: string
    checkOut?: string
    guests?: number
    totalAmount?: number
  } = {}) => {
    const defaultCheckIn = new Date()
    defaultCheckIn.setDate(defaultCheckIn.getDate() + 7)

    const defaultCheckOut = new Date()
    defaultCheckOut.setDate(defaultCheckOut.getDate() + 11)

    const bookingData = {
      propertyId: options.propertyId || 'test-property-id',
      checkIn: options.checkIn || defaultCheckIn.toISOString().split('T')[0],
      checkOut: options.checkOut || defaultCheckOut.toISOString().split('T')[0],
      numberOfGuests: options.guests || 2,
      guestName: 'Test User',
      guestEmail: 'test@example.com',
      guestPhone: '+905551234567',
    }

    return cy
      .request({
        method: 'POST',
        url: '/api/bookings/property/create',
        body: bookingData,
      })
      .then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body.success).to.be.true
        return response.body.booking.id
      })
  }
)

// Complete booking flow command
Cypress.Commands.add(
  'completeBookingFlow',
  (options: { propertyId: string; checkIn: string; checkOut: string; guests: number }) => {
    cy.visit(`/properties/${options.propertyId}`)
    cy.get('[data-testid="book-now-button"]').click()
    cy.get('[data-testid="check-in-input"]').type(options.checkIn)
    cy.get('[data-testid="check-out-input"]').type(options.checkOut)
    cy.get('[data-testid="guest-count-input"]').select(options.guests.toString())
    cy.get('[data-testid="continue-to-payment-button"]').click()
    cy.url().should('include', '/payment')
    cy.get('[data-testid="stripe-payment-element"]').should('be.visible')
    cy.fillStripeCard({
      cardNumber: '4242424242424242',
      expiry: '12/30',
      cvc: '123',
    })
    cy.get('[data-testid="payment-submit-button"]').click()
    cy.url({ timeout: 15000 }).should('include', '/payment/success')
  }
)

// Fill Stripe card command
Cypress.Commands.add(
  'fillStripeCard',
  (details: { cardNumber: string; expiry: string; cvc: string }) => {
    cy.get('[data-testid="stripe-payment-element"]', { timeout: 10000 }).should('be.visible')
    cy.get('iframe[name^="__privateStripeFrame"]').then(($iframe) => {
      const $body = $iframe.contents().find('body')
      cy.wrap($body).find('input[name="cardnumber"]').type(details.cardNumber, { force: true })
      cy.wrap($body).find('input[name="exp-date"]').type(details.expiry, { force: true })
      cy.wrap($body).find('input[name="cvc"]').type(details.cvc, { force: true })
    })
  }
)

export {}
