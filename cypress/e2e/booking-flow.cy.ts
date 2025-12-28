/**
 * E2E Tests for Complete Booking Flow
 * Tests the end-to-end booking process from property search to payment
 */

describe('Complete Booking Flow', () => {
  beforeEach(() => {
    // Reset database state
    cy.task('db:seed');

    // Visit home page
    cy.visit('/');
  });

  describe('Property Search and Selection', () => {
    it('should search for properties and view details', () => {
      // Search for properties
      cy.get('[data-testid="search-input"]').type('Istanbul');
      cy.get('[data-testid="check-in-date"]').type('2025-03-01');
      cy.get('[data-testid="check-out-date"]').type('2025-03-05');
      cy.get('[data-testid="guest-count"]').select('2');
      cy.get('[data-testid="search-button"]').click();

      // Verify search results
      cy.url().should('include', '/search');
      cy.get('[data-testid="property-card"]').should('have.length.greaterThan', 0);

      // Click on first property
      cy.get('[data-testid="property-card"]').first().click();

      // Verify property details page
      cy.url().should('include', '/properties/');
      cy.get('[data-testid="property-title"]').should('be.visible');
      cy.get('[data-testid="property-price"]').should('be.visible');
    });

    it('should filter properties by price range', () => {
      cy.visit('/search?city=Istanbul');

      // Wait for results to load
      cy.get('[data-testid="property-card"]').should('have.length.greaterThan', 0);

      // Apply price filter
      cy.get('[data-testid="price-min-input"]').type('100');
      cy.get('[data-testid="price-max-input"]').type('500');
      cy.get('[data-testid="apply-filters-button"]').click();

      // Verify filtered results
      cy.get('[data-testid="property-card"]').each(($card) => {
        cy.wrap($card)
          .find('[data-testid="property-price"]')
          .invoke('text')
          .then((text) => {
            const price = parseFloat(text.replace(/[^0-9.]/g, ''));
            expect(price).to.be.gte(100);
            expect(price).to.be.lte(500);
          });
      });
    });
  });

  describe('User Authentication for Booking', () => {
    it('should redirect to login if not authenticated', () => {
      cy.visit('/properties/test-property-id');
      cy.get('[data-testid="book-now-button"]').click();

      // Should redirect to login
      cy.url().should('include', '/auth/signin');
    });

    it('should allow booking after login', () => {
      // Login first
      cy.visit('/auth/signin');
      cy.get('[data-testid="email-input"]').type('test@example.com');
      cy.get('[data-testid="password-input"]').type('testpassword123');
      cy.get('[data-testid="signin-button"]').click();

      // Wait for redirect
      cy.url().should('not.include', '/auth/signin');

      // Navigate to property
      cy.visit('/properties/test-property-id');
      cy.get('[data-testid="book-now-button"]').should('be.visible');
    });
  });

  describe('Booking Form Submission', () => {
    beforeEach(() => {
      // Login
      cy.login('test@example.com', 'testpassword123');

      // Navigate to property
      cy.visit('/properties/test-property-id');
    });

    it('should fill and submit booking form', () => {
      // Click book now
      cy.get('[data-testid="book-now-button"]').click();

      // Fill booking form
      cy.get('[data-testid="check-in-input"]').type('2025-03-01');
      cy.get('[data-testid="check-out-input"]').type('2025-03-05');
      cy.get('[data-testid="guest-count-input"]').select('2');
      cy.get('[data-testid="special-requests"]').type('Early check-in please');

      // Verify price calculation
      cy.get('[data-testid="total-price"]').should('be.visible');
      cy.get('[data-testid="nights-count"]').should('contain', '4');

      // Submit booking
      cy.get('[data-testid="continue-to-payment-button"]').click();

      // Should navigate to payment page
      cy.url().should('include', '/payment');
    });

    it('should validate booking form inputs', () => {
      cy.get('[data-testid="book-now-button"]').click();

      // Try to submit without required fields
      cy.get('[data-testid="continue-to-payment-button"]').click();

      // Should show validation errors
      cy.get('[data-testid="error-message"]').should('be.visible');
      cy.get('[data-testid="check-in-input"]').should('have.class', 'error');
    });

    it('should prevent booking with past dates', () => {
      cy.get('[data-testid="book-now-button"]').click();

      // Try to book with past date
      cy.get('[data-testid="check-in-input"]').type('2024-01-01');
      cy.get('[data-testid="check-out-input"]').type('2024-01-05');
      cy.get('[data-testid="continue-to-payment-button"]').click();

      // Should show error
      cy.get('[data-testid="error-message"]')
        .should('be.visible')
        .and('contain', 'past');
    });

    it('should prevent check-out before check-in', () => {
      cy.get('[data-testid="book-now-button"]').click();

      cy.get('[data-testid="check-in-input"]').type('2025-03-05');
      cy.get('[data-testid="check-out-input"]').type('2025-03-01');
      cy.get('[data-testid="continue-to-payment-button"]').click();

      cy.get('[data-testid="error-message"]')
        .should('be.visible')
        .and('contain', 'after');
    });
  });

  describe('Payment Flow', () => {
    beforeEach(() => {
      cy.login('test@example.com', 'testpassword123');
      cy.createTestBooking().then((bookingId) => {
        cy.visit(`/payment?bookingId=${bookingId}`);
      });
    });

    it('should display payment form with correct amount', () => {
      cy.get('[data-testid="stripe-payment-element"]').should('be.visible');
      cy.get('[data-testid="payment-amount"]').should('be.visible');
      cy.get('[data-testid="payment-submit-button"]').should('be.visible');
    });

    it('should complete payment with test card', () => {
      // Wait for Stripe to load
      cy.get('[data-testid="stripe-payment-element"]').should('be.visible');

      // Fill in test card details (Stripe test mode)
      cy.fillStripeCard({
        cardNumber: '4242424242424242',
        expiry: '12/30',
        cvc: '123',
      });

      // Submit payment
      cy.get('[data-testid="payment-submit-button"]').click();

      // Wait for success redirect
      cy.url({ timeout: 10000 }).should('include', '/payment/success');
      cy.get('[data-testid="success-message"]').should('be.visible');
      cy.get('[data-testid="booking-reference"]').should('be.visible');
    });

    it('should handle declined card', () => {
      cy.get('[data-testid="stripe-payment-element"]').should('be.visible');

      // Use declined test card
      cy.fillStripeCard({
        cardNumber: '4000000000000002',
        expiry: '12/30',
        cvc: '123',
      });

      cy.get('[data-testid="payment-submit-button"]').click();

      // Should show error
      cy.get('[data-testid="payment-error"]', { timeout: 10000 })
        .should('be.visible')
        .and('contain', 'declined');
    });

    it('should display loading state during payment processing', () => {
      cy.get('[data-testid="stripe-payment-element"]').should('be.visible');

      cy.fillStripeCard({
        cardNumber: '4242424242424242',
        expiry: '12/30',
        cvc: '123',
      });

      cy.get('[data-testid="payment-submit-button"]').click();

      // Should show loading state
      cy.get('[data-testid="payment-submit-button"]')
        .should('be.disabled')
        .and('contain', 'Processing');
    });
  });

  describe('Booking Confirmation', () => {
    it('should display booking confirmation after successful payment', () => {
      cy.login('test@example.com', 'testpassword123');

      // Complete booking flow
      cy.completeBookingFlow({
        propertyId: 'test-property-id',
        checkIn: '2025-03-01',
        checkOut: '2025-03-05',
        guests: 2,
      });

      // Should show confirmation
      cy.url().should('include', '/payment/success');
      cy.get('[data-testid="booking-reference"]').should('be.visible');
      cy.get('[data-testid="booking-details"]').should('be.visible');
      cy.get('[data-testid="download-receipt-button"]').should('be.visible');
    });

    it('should send confirmation email', () => {
      cy.login('test@example.com', 'testpassword123');

      cy.completeBookingFlow({
        propertyId: 'test-property-id',
        checkIn: '2025-03-01',
        checkOut: '2025-03-05',
        guests: 2,
      });

      // Check email was sent
      cy.task('getLastEmail').then((email: any) => {
        expect(email.to).to.equal('test@example.com');
        expect(email.subject).to.contain('Booking Confirmation');
      });
    });
  });

  describe('Booking Cancellation', () => {
    it('should allow cancellation of pending booking', () => {
      cy.login('test@example.com', 'testpassword123');

      cy.createTestBooking().then((bookingId) => {
        // Navigate to booking details
        cy.visit(`/bookings/${bookingId}`);

        // Cancel booking
        cy.get('[data-testid="cancel-booking-button"]').click();
        cy.get('[data-testid="confirm-cancel-button"]').click();

        // Should show success message
        cy.get('[data-testid="cancellation-success"]').should('be.visible');
        cy.get('[data-testid="booking-status"]').should('contain', 'Cancelled');
      });
    });

    it('should show refund amount based on cancellation policy', () => {
      cy.login('test@example.com', 'testpassword123');

      cy.createTestBooking({ totalAmount: 1000 }).then((bookingId) => {
        cy.visit(`/bookings/${bookingId}`);

        cy.get('[data-testid="cancel-booking-button"]').click();

        // Should display refund information
        cy.get('[data-testid="refund-amount"]').should('be.visible');
        cy.get('[data-testid="cancellation-policy"]').should('be.visible');
      });
    });

    it('should prevent cancellation after deadline', () => {
      cy.login('test@example.com', 'testpassword123');

      // Create booking with check-in tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      cy.createTestBooking({
        checkIn: tomorrow.toISOString().split('T')[0],
      }).then((bookingId) => {
        cy.visit(`/bookings/${bookingId}`);

        // Cancel button should be disabled or not visible
        cy.get('[data-testid="cancel-booking-button"]').should('be.disabled');
        cy.get('[data-testid="cancellation-deadline-message"]').should('be.visible');
      });
    });
  });

  describe('Booking History', () => {
    it('should display user booking history', () => {
      cy.login('test@example.com', 'testpassword123');

      // Create multiple bookings
      cy.createTestBooking();
      cy.createTestBooking();

      // Navigate to bookings page
      cy.visit('/user/bookings');

      // Should show booking list
      cy.get('[data-testid="booking-item"]').should('have.length.gte', 2);
    });

    it('should filter bookings by status', () => {
      cy.login('test@example.com', 'testpassword123');

      cy.visit('/user/bookings');

      // Filter by confirmed
      cy.get('[data-testid="status-filter"]').select('CONFIRMED');

      // All visible bookings should be confirmed
      cy.get('[data-testid="booking-item"]').each(($item) => {
        cy.wrap($item)
          .find('[data-testid="booking-status"]')
          .should('contain', 'Confirmed');
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle network errors gracefully', () => {
      cy.login('test@example.com', 'testpassword123');

      // Simulate network error
      cy.intercept('POST', '/api/bookings/property/create', {
        forceNetworkError: true,
      }).as('createBooking');

      cy.visit('/properties/test-property-id');
      cy.get('[data-testid="book-now-button"]').click();

      // Fill form
      cy.get('[data-testid="check-in-input"]').type('2025-03-01');
      cy.get('[data-testid="check-out-input"]').type('2025-03-05');
      cy.get('[data-testid="continue-to-payment-button"]').click();

      cy.wait('@createBooking');

      // Should show error message
      cy.get('[data-testid="error-message"]')
        .should('be.visible')
        .and('contain', 'error');
    });

    it('should handle property not available error', () => {
      cy.login('test@example.com', 'testpassword123');

      cy.intercept('POST', '/api/bookings/property/create', {
        statusCode: 409,
        body: {
          error: 'Property is not available for selected dates',
        },
      }).as('createBooking');

      cy.visit('/properties/test-property-id');
      cy.get('[data-testid="book-now-button"]').click();

      cy.get('[data-testid="check-in-input"]').type('2025-03-01');
      cy.get('[data-testid="check-out-input"]').type('2025-03-05');
      cy.get('[data-testid="continue-to-payment-button"]').click();

      cy.wait('@createBooking');

      cy.get('[data-testid="error-message"]')
        .should('be.visible')
        .and('contain', 'not available');
    });
  });
});
