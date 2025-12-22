import { vehicleCategories } from '../../src/data/vehicleCategories'

describe('Vehicle Categories', () => {
  test('should have 14 vehicle categories', () => {
    expect(vehicleCategories).toHaveLength(14)
  })

  test('all categories should have required fields', () => {
    vehicleCategories.forEach(category => {
      expect(category).toHaveProperty('id')
      expect(category).toHaveProperty('name')
      expect(category).toHaveProperty('description')
      expect(category).toHaveProperty('icon')
      expect(category).toHaveProperty('priceMultiplier')
      expect(category).toHaveProperty('features')
      expect(category.features).toBeInstanceOf(Array)
    })
  })

  test('price multipliers should be positive numbers', () => {
    vehicleCategories.forEach(category => {
      expect(category.priceMultiplier).toBeGreaterThan(0)
      expect(typeof category.priceMultiplier).toBe('number')
    })
  })

  test('categories should have unique IDs', () => {
    const ids = vehicleCategories.map(cat => cat.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(vehicleCategories.length)
  })

  test('should contain expected category types', () => {
    const categoryNames = vehicleCategories.map(cat => cat.name)
    expect(categoryNames).toContain('Ekonomik Sedan')
    expect(categoryNames).toContain('Premium SUV')
    expect(categoryNames).toContain('Elektrikli Araç')
  })
})
