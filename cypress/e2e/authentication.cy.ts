/**
 * E2E Tests for Authentication Flow
 * Tests user registration, login, logout, and session management
 */

describe('Authentication Flow', () => {
  beforeEach(() => {
    // Clear cookies and local storage
    cy.clearCookies();
    cy.clearLocalStorage();

    // Reset database state
    cy.task('db:seed');
  });

  describe('User Registration', () => {
    it('should register a new user successfully', () => {
      cy.visit('/auth/signup');

      // Fill registration form
      cy.get('[data-testid="name-input"]').type('John Doe');
      cy.get('[data-testid="email-input"]').type('john.doe@example.com');
      cy.get('[data-testid="password-input"]').type('SecurePassword123!');
      cy.get('[data-testid="confirm-password-input"]').type('SecurePassword123!');
      cy.get('[data-testid="terms-checkbox"]').check();

      // Submit registration
      cy.get('[data-testid="signup-button"]').click();

      // Should redirect to verification or home page
      cy.url({ timeout: 10000 }).should('not.include', '/auth/signup');

      // Should show success message
      cy.get('[data-testid="success-message"]')
        .should('be.visible')
        .and('contain', 'registered');
    });

    it('should validate email format', () => {
      cy.visit('/auth/signup');

      cy.get('[data-testid="name-input"]').type('John Doe');
      cy.get('[data-testid="email-input"]').type('invalid-email');
      cy.get('[data-testid="password-input"]').type('SecurePassword123!');
      cy.get('[data-testid="signup-button"]').click();

      // Should show validation error
      cy.get('[data-testid="email-error"]')
        .should('be.visible')
        .and('contain', 'valid email');
    });

    it('should require password confirmation match', () => {
      cy.visit('/auth/signup');

      cy.get('[data-testid="name-input"]').type('John Doe');
      cy.get('[data-testid="email-input"]').type('john.doe@example.com');
      cy.get('[data-testid="password-input"]').type('SecurePassword123!');
      cy.get('[data-testid="confirm-password-input"]').type('DifferentPassword123!');
      cy.get('[data-testid="signup-button"]').click();

      cy.get('[data-testid="password-error"]')
        .should('be.visible')
        .and('contain', 'match');
    });

    it('should enforce password strength requirements', () => {
      cy.visit('/auth/signup');

      cy.get('[data-testid="email-input"]').type('john.doe@example.com');

      // Test weak password
      cy.get('[data-testid="password-input"]').type('weak');
      cy.get('[data-testid="password-strength"]')
        .should('be.visible')
        .and('contain', 'weak');

      // Test strong password
      cy.get('[data-testid="password-input"]').clear().type('SecurePassword123!');
      cy.get('[data-testid="password-strength"]')
        .should('be.visible')
        .and('contain', 'strong');
    });

    it('should prevent duplicate email registration', () => {
      cy.visit('/auth/signup');

      // Try to register with existing email
      cy.get('[data-testid="name-input"]').type('Jane Doe');
      cy.get('[data-testid="email-input"]').type('test@example.com'); // Existing user
      cy.get('[data-testid="password-input"]').type('SecurePassword123!');
      cy.get('[data-testid="confirm-password-input"]').type('SecurePassword123!');
      cy.get('[data-testid="terms-checkbox"]').check();
      cy.get('[data-testid="signup-button"]').click();

      // Should show error
      cy.get('[data-testid="error-message"]')
        .should('be.visible')
        .and('contain', 'already exists');
    });

    it('should require terms acceptance', () => {
      cy.visit('/auth/signup');

      cy.get('[data-testid="name-input"]').type('John Doe');
      cy.get('[data-testid="email-input"]').type('john.doe@example.com');
      cy.get('[data-testid="password-input"]').type('SecurePassword123!');
      cy.get('[data-testid="confirm-password-input"]').type('SecurePassword123!');
      // Don't check terms checkbox
      cy.get('[data-testid="signup-button"]').click();

      cy.get('[data-testid="terms-error"]')
        .should('be.visible')
        .and('contain', 'terms');
    });
  });

  describe('User Login', () => {
    it('should login with valid credentials', () => {
      cy.visit('/auth/signin');

      cy.get('[data-testid="email-input"]').type('test@example.com');
      cy.get('[data-testid="password-input"]').type('testpassword123');
      cy.get('[data-testid="signin-button"]').click();

      // Should redirect to home or dashboard
      cy.url({ timeout: 10000 }).should('not.include', '/auth/signin');

      // Should show user menu
      cy.get('[data-testid="user-menu"]').should('be.visible');
    });

    it('should reject invalid credentials', () => {
      cy.visit('/auth/signin');

      cy.get('[data-testid="email-input"]').type('test@example.com');
      cy.get('[data-testid="password-input"]').type('wrongpassword');
      cy.get('[data-testid="signin-button"]').click();

      // Should show error
      cy.get('[data-testid="error-message"]')
        .should('be.visible')
        .and('contain', 'Invalid');
    });

    it('should reject non-existent user', () => {
      cy.visit('/auth/signin');

      cy.get('[data-testid="email-input"]').type('nonexistent@example.com');
      cy.get('[data-testid="password-input"]').type('password123');
      cy.get('[data-testid="signin-button"]').click();

      cy.get('[data-testid="error-message"]')
        .should('be.visible')
        .and('contain', 'not found');
    });

    it('should persist session after page reload', () => {
      cy.visit('/auth/signin');

      cy.get('[data-testid="email-input"]').type('test@example.com');
      cy.get('[data-testid="password-input"]').type('testpassword123');
      cy.get('[data-testid="signin-button"]').click();

      cy.url().should('not.include', '/auth/signin');

      // Reload page
      cy.reload();

      // Should still be logged in
      cy.get('[data-testid="user-menu"]').should('be.visible');
    });

    it('should remember me functionality', () => {
      cy.visit('/auth/signin');

      cy.get('[data-testid="email-input"]').type('test@example.com');
      cy.get('[data-testid="password-input"]').type('testpassword123');
      cy.get('[data-testid="remember-me-checkbox"]').check();
      cy.get('[data-testid="signin-button"]').click();

      cy.url().should('not.include', '/auth/signin');

      // Check if remember cookie is set
      cy.getCookie('remember-me').should('exist');
    });

    it('should show loading state during login', () => {
      cy.visit('/auth/signin');

      cy.get('[data-testid="email-input"]').type('test@example.com');
      cy.get('[data-testid="password-input"]').type('testpassword123');
      cy.get('[data-testid="signin-button"]').click();

      // Button should be disabled and show loading
      cy.get('[data-testid="signin-button"]')
        .should('be.disabled')
        .and('contain', 'Signing in');
    });
  });

  describe('Social Authentication', () => {
    it('should display social login options', () => {
      cy.visit('/auth/signin');

      cy.get('[data-testid="google-signin-button"]').should('be.visible');
      cy.get('[data-testid="facebook-signin-button"]').should('be.visible');
    });

    it('should initiate Google OAuth flow', () => {
      cy.visit('/auth/signin');

      // Mock OAuth redirect
      cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen');
      });

      cy.get('[data-testid="google-signin-button"]').click();

      cy.get('@windowOpen').should('be.called');
    });
  });

  describe('User Logout', () => {
    beforeEach(() => {
      // Login first
      cy.login('test@example.com', 'testpassword123');
    });

    it('should logout user successfully', () => {
      cy.visit('/');

      // Open user menu and logout
      cy.get('[data-testid="user-menu"]').click();
      cy.get('[data-testid="logout-button"]').click();

      // Should redirect to home page
      cy.url().should('not.include', '/user');

      // User menu should not be visible
      cy.get('[data-testid="user-menu"]').should('not.exist');

      // Login button should be visible
      cy.get('[data-testid="signin-link"]').should('be.visible');
    });

    it('should clear session data on logout', () => {
      cy.visit('/');

      cy.get('[data-testid="user-menu"]').click();
      cy.get('[data-testid="logout-button"]').click();

      // Check that session cookies are cleared
      cy.getCookie('next-auth.session-token').should('not.exist');
    });

    it('should prevent access to protected routes after logout', () => {
      cy.get('[data-testid="user-menu"]').click();
      cy.get('[data-testid="logout-button"]').click();

      // Try to access protected route
      cy.visit('/user/bookings');

      // Should redirect to login
      cy.url().should('include', '/auth/signin');
    });
  });

  describe('Password Reset', () => {
    it('should send password reset email', () => {
      cy.visit('/auth/forgot-password');

      cy.get('[data-testid="email-input"]').type('test@example.com');
      cy.get('[data-testid="reset-button"]').click();

      // Should show success message
      cy.get('[data-testid="success-message"]')
        .should('be.visible')
        .and('contain', 'reset link');

      // Check email was sent
      cy.task('getLastEmail').then((email: any) => {
        expect(email.to).to.equal('test@example.com');
        expect(email.subject).to.contain('Password Reset');
      });
    });

    it('should reset password with valid token', () => {
      // Get reset token
      cy.task('generateResetToken', 'test@example.com').then((token) => {
        cy.visit(`/auth/reset-password?token=${token}`);

        cy.get('[data-testid="new-password-input"]').type('NewSecurePassword123!');
        cy.get('[data-testid="confirm-password-input"]').type('NewSecurePassword123!');
        cy.get('[data-testid="reset-password-button"]').click();

        // Should show success and redirect to login
        cy.get('[data-testid="success-message"]').should('be.visible');
        cy.url({ timeout: 10000 }).should('include', '/auth/signin');
      });
    });

    it('should reject expired reset token', () => {
      const expiredToken = 'expired-token-123';

      cy.visit(`/auth/reset-password?token=${expiredToken}`);

      cy.get('[data-testid="new-password-input"]').type('NewPassword123!');
      cy.get('[data-testid="confirm-password-input"]').type('NewPassword123!');
      cy.get('[data-testid="reset-password-button"]').click();

      cy.get('[data-testid="error-message"]')
        .should('be.visible')
        .and('contain', 'expired');
    });

    it('should validate password strength on reset', () => {
      cy.task('generateResetToken', 'test@example.com').then((token) => {
        cy.visit(`/auth/reset-password?token=${token}`);

        // Try weak password
        cy.get('[data-testid="new-password-input"]').type('weak');
        cy.get('[data-testid="reset-password-button"]').click();

        cy.get('[data-testid="password-error"]')
          .should('be.visible')
          .and('contain', 'strong');
      });
    });
  });

  describe('Protected Routes', () => {
    it('should redirect to login when accessing protected route', () => {
      cy.visit('/user/profile');

      // Should redirect to signin
      cy.url().should('include', '/auth/signin');

      // Should preserve redirect URL
      cy.url().should('include', 'callbackUrl=%2Fuser%2Fprofile');
    });

    it('should redirect to original page after login', () => {
      cy.visit('/user/bookings');

      // Should be redirected to login
      cy.url().should('include', '/auth/signin');

      // Login
      cy.get('[data-testid="email-input"]').type('test@example.com');
      cy.get('[data-testid="password-input"]').type('testpassword123');
      cy.get('[data-testid="signin-button"]').click();

      // Should redirect back to bookings
      cy.url({ timeout: 10000 }).should('include', '/user/bookings');
    });

    it('should allow access to protected routes when authenticated', () => {
      cy.login('test@example.com', 'testpassword123');

      cy.visit('/user/profile');

      // Should not redirect
      cy.url().should('include', '/user/profile');
      cy.get('[data-testid="profile-page"]').should('be.visible');
    });
  });

  describe('Session Management', () => {
    it('should maintain session across tabs', () => {
      cy.login('test@example.com', 'testpassword123');
      cy.visit('/');

      // Open new tab (simulated by visiting in same window)
      cy.visit('/user/profile');

      // Should still be logged in
      cy.get('[data-testid="user-menu"]').should('be.visible');
    });

    it('should handle session expiration', () => {
      cy.login('test@example.com', 'testpassword123');

      // Clear session cookie to simulate expiration
      cy.clearCookie('next-auth.session-token');

      // Try to access protected route
      cy.visit('/user/bookings');

      // Should redirect to login
      cy.url().should('include', '/auth/signin');
    });

    it('should refresh session token before expiration', () => {
      cy.login('test@example.com', 'testpassword123');

      cy.intercept('GET', '/api/auth/session').as('sessionRefresh');

      // Wait and navigate
      cy.wait(1000);
      cy.visit('/user/profile');

      // Session should be refreshed
      cy.wait('@sessionRefresh');
      cy.get('[data-testid="user-menu"]').should('be.visible');
    });
  });

  describe('Email Verification', () => {
    it('should prompt for email verification after signup', () => {
      cy.visit('/auth/signup');

      cy.get('[data-testid="name-input"]').type('New User');
      cy.get('[data-testid="email-input"]').type('newuser@example.com');
      cy.get('[data-testid="password-input"]').type('SecurePassword123!');
      cy.get('[data-testid="confirm-password-input"]').type('SecurePassword123!');
      cy.get('[data-testid="terms-checkbox"]').check();
      cy.get('[data-testid="signup-button"]').click();

      // Should show verification notice
      cy.get('[data-testid="verification-notice"]')
        .should('be.visible')
        .and('contain', 'verify your email');
    });

    it('should verify email with valid token', () => {
      cy.task('generateVerificationToken', 'newuser@example.com').then((token) => {
        cy.visit(`/auth/verify-email?token=${token}`);

        // Should show success message
        cy.get('[data-testid="success-message"]')
          .should('be.visible')
          .and('contain', 'verified');

        // Should be able to login
        cy.visit('/auth/signin');
        cy.get('[data-testid="email-input"]').type('newuser@example.com');
        cy.get('[data-testid="password-input"]').type('SecurePassword123!');
        cy.get('[data-testid="signin-button"]').click();

        cy.url().should('not.include', '/auth/signin');
      });
    });

    it('should resend verification email', () => {
      cy.visit('/auth/verify-email');

      cy.get('[data-testid="email-input"]').type('newuser@example.com');
      cy.get('[data-testid="resend-button"]').click();

      cy.get('[data-testid="success-message"]')
        .should('be.visible')
        .and('contain', 'resent');
    });
  });

  describe('Error Handling', () => {
    it('should handle network errors gracefully', () => {
      cy.visit('/auth/signin');

      // Simulate network error
      cy.intercept('POST', '/api/auth/callback/credentials', {
        forceNetworkError: true,
      }).as('login');

      cy.get('[data-testid="email-input"]').type('test@example.com');
      cy.get('[data-testid="password-input"]').type('testpassword123');
      cy.get('[data-testid="signin-button"]').click();

      cy.wait('@login');

      cy.get('[data-testid="error-message"]')
        .should('be.visible')
        .and('contain', 'error');
    });

    it('should handle server errors', () => {
      cy.visit('/auth/signin');

      cy.intercept('POST', '/api/auth/callback/credentials', {
        statusCode: 500,
        body: { error: 'Internal server error' },
      }).as('login');

      cy.get('[data-testid="email-input"]').type('test@example.com');
      cy.get('[data-testid="password-input"]').type('testpassword123');
      cy.get('[data-testid="signin-button"]').click();

      cy.wait('@login');

      cy.get('[data-testid="error-message"]').should('be.visible');
    });
  });
});
