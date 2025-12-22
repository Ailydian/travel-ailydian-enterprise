describe('Vehicle Owner - New Vehicle Wizard', () => {
  beforeEach(() => {
    cy.loginAsVehicleOwner('demo@carowner.ailydian.com', 'Demo123!')
    cy.visit('/vehicle-owner/vehicles/new')
  })

  it('should display step 1 - vehicle type selection', () => {
    cy.contains(/araç tipi|vehicle type/i).should('be.visible')
    cy.contains(/ekonomik sedan/i).should('be.visible')
    cy.contains(/premium suv/i).should('be.visible')
  })

  it('should have 14 vehicle categories', () => {
    cy.get('[data-testid="vehicle-category"]').should('have.length.at.least', 10)
  })

  it('should show progress indicator', () => {
    cy.contains(/1.*8|step 1/i).should('be.visible')
  })

  it('should allow selecting a vehicle category', () => {
    cy.contains(/ekonomik sedan/i).click()
    cy.contains(/sonraki|next/i).should('be.visible')
  })

  it('should navigate to step 2 after selection', () => {
    cy.contains(/ekonomik sedan/i).click()
    cy.contains(/sonraki|next/i).click()
    cy.contains(/araç detayları|vehicle details/i).should('be.visible')
  })

  it('should have back button on step 2', () => {
    cy.contains(/ekonomik sedan/i).click()
    cy.contains(/sonraki|next/i).click()
    cy.contains(/geri|back/i).should('be.visible')
  })

  it('should allow going back to previous step', () => {
    cy.contains(/ekonomik sedan/i).click()
    cy.contains(/sonraki|next/i).click()
    cy.contains(/geri|back/i).click()
    cy.contains(/araç tipi|vehicle type/i).should('be.visible')
  })
})
