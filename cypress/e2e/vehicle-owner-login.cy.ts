describe('Vehicle Owner Login Flow', () => {
  beforeEach(() => {
    cy.visit('/vehicle-owner/auth/login')
  })

  it('should display login form', () => {
    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
    cy.contains('button', /giriş yap|login/i).should('be.visible')
  })

  it('should show validation errors for empty fields', () => {
    cy.contains('button', /giriş yap|login/i).click()
    // Form should not submit without credentials
    cy.url().should('include', '/auth/login')
  })

  it('should successfully login with valid credentials', () => {
    cy.loginAsVehicleOwner('demo@carowner.ailydian.com', 'Demo123!')

    // Should redirect to dashboard
    cy.url().should('include', '/vehicle-owner')
    cy.url().should('not.include', '/auth/login')

    // Dashboard should load
    cy.contains(/toplam araç|total vehicles/i).should('be.visible')
  })

  it('should have remember me checkbox', () => {
    cy.get('input[type="checkbox"]').should('exist')
  })

  it('should have forgot password link', () => {
    cy.contains(/şifremi unuttum|forgot password/i).should('be.visible')
  })

  it('should have register link', () => {
    cy.contains(/kayıt ol|register|sign up/i).should('be.visible')
  })
})
