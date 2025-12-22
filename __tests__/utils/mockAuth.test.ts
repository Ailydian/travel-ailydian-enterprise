import { vehicleOwnerUsers } from '../../src/data/mockVehicleAuth'
import { transferOwnerUsers } from '../../src/data/mockTransferAuth'

describe('Mock Authentication Data', () => {
  describe('Vehicle Owner Users', () => {
    test('should have at least 4 test users', () => {
      expect(vehicleOwnerUsers.length).toBeGreaterThanOrEqual(4)
    })

    test('all users should have required fields', () => {
      vehicleOwnerUsers.forEach(user => {
        expect(user).toHaveProperty('id')
        expect(user).toHaveProperty('email')
        expect(user).toHaveProperty('password')
        expect(user).toHaveProperty('name')
        expect(user).toHaveProperty('role')
        expect(user.role).toBe('vehicle_owner')
      })
    })

    test('demo user should exist', () => {
      const demoUser = vehicleOwnerUsers.find(u => u.email === 'demo@carowner.ailydian.com')
      expect(demoUser).toBeDefined()
      expect(demoUser?.password).toBe('Demo123!')
    })

    test('emails should be unique', () => {
      const emails = vehicleOwnerUsers.map(u => u.email)
      const uniqueEmails = new Set(emails)
      expect(uniqueEmails.size).toBe(vehicleOwnerUsers.length)
    })
  })

  describe('Transfer Owner Users', () => {
    test('should have at least 4 test users', () => {
      expect(transferOwnerUsers.length).toBeGreaterThanOrEqual(4)
    })

    test('all users should have required fields', () => {
      transferOwnerUsers.forEach(user => {
        expect(user).toHaveProperty('id')
        expect(user).toHaveProperty('email')
        expect(user).toHaveProperty('password')
        expect(user).toHaveProperty('name')
        expect(user).toHaveProperty('role')
        expect(user.role).toBe('transfer_owner')
      })
    })

    test('demo user should exist', () => {
      const demoUser = transferOwnerUsers.find(u => u.email === 'demo@transfer.ailydian.com')
      expect(demoUser).toBeDefined()
      expect(demoUser?.password).toBe('Demo123!')
    })
  })
})
