describe('Transfer Owner Dashboard', () => {
  beforeEach(() => {
    cy.loginAsTransferOwner('demo@transfer.ailydian.com', 'Demo123!')
  })

  it('should display dashboard statistics', () => {
    cy.contains(/toplam filo|total fleet/i).should('be.visible')
    cy.contains(/aktif transfer|active transfer/i).should('be.visible')
    cy.contains(/aylık gelir|monthly revenue/i).should('be.visible')
    cy.contains(/zamanında teslim|on-time delivery/i).should('be.visible')
  })

  it('should show upcoming transfers section', () => {
    cy.contains(/yaklaşan transferler|upcoming transfers/i).should('be.visible')
  })

  it('should show revenue chart', () => {
    cy.contains(/haftalık gelir|weekly revenue/i).should('be.visible')
  })

  it('should have quick action buttons', () => {
    cy.contains(/yeni araç ekle|add new vehicle/i).should('be.visible')
    cy.contains(/filo yönetimi|fleet management/i).should('be.visible')
  })

  it('should navigate to vehicles page', () => {
    cy.contains(/araçlarım|my vehicles/i).click()
    cy.url().should('include', '/transfer-owner/vehicles')
  })

  it('should navigate to new vehicle wizard', () => {
    cy.contains(/yeni araç ekle|add new vehicle/i).click()
    cy.url().should('include', '/transfer-owner/vehicles/new')
  })
})
