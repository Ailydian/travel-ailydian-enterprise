import logger from '../lib/logger';
import { logger } from '../lib/logger/winston';

/**
 * SECURITY WARNING - V2 Critical Fix (CVSS 9.8)
 * Mock Property Owner Authentication Data
 *
 * This file contains hardcoded authentication credentials for testing purposes.
 * MUST BE DISABLED IN PRODUCTION ENVIRONMENTS.
 *
 * Production deployments should:
 * 1. Set NODE_ENV=production
 * 2. Use real database authentication
 * 3. Never rely on this mock data
 */

// Fail-fast in production to prevent security breach
if (process.env.NODE_ENV === 'production') {
  throw new Error(
    'SECURITY ERROR: Mock authentication is disabled in production. ' +
    'This file (mockOwnerAuth.ts) contains hardcoded credentials and must not be used in production. ' +
    'Please implement proper database-backed authentication.'
  );
}

export interface MockOwner {
  id: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  propertyType: string;
  propertyCount: number;
  registeredAt: string;
  status: 'active' | 'pending' | 'suspended';
}

// Test için hazır kullanıcılar (ONLY for development/testing - NODE_ENV !== 'production')
export const MOCK_OWNERS: MockOwner[] = [
  {
    id: 'owner-001',
    email: 'ahmet.yilmaz@example.com',
    password: 'Ahmet123!',
    fullName: 'Ahmet Yılmaz',
    phone: '+90 532 123 4567',
    propertyType: 'Villa',
    propertyCount: 3,
    registeredAt: '2024-01-15',
    status: 'active'
  },
  {
    id: 'owner-002',
    email: 'ayse.demir@example.com',
    password: 'Ayse456!',
    fullName: 'Ayşe Demir',
    phone: '+90 533 234 5678',
    propertyType: 'Apartment',
    propertyCount: 5,
    registeredAt: '2024-02-20',
    status: 'active'
  },
  {
    id: 'owner-003',
    email: 'mehmet.kaya@example.com',
    password: 'Mehmet789!',
    fullName: 'Mehmet Kaya',
    phone: '+90 534 345 6789',
    propertyType: 'Hotel',
    propertyCount: 2,
    registeredAt: '2024-03-10',
    status: 'active'
  },
  {
    id: 'owner-004',
    email: 'demo@lydian.com',
    password: 'Demo123!',
    fullName: 'Demo Kullanıcı',
    phone: '+90 555 123 4567',
    propertyType: 'Villa',
    propertyCount: 1,
    registeredAt: '2024-12-21',
    status: 'active'
  },
  {
    id: 'owner-005',
    email: 'test@lydian.com',
    password: 'Test123!',
    fullName: 'Test Kullanıcı',
    phone: '+90 555 987 6543',
    propertyType: 'Apartment',
    propertyCount: 4,
    registeredAt: '2024-12-21',
    status: 'active'
  }
];

// Giriş doğrulama fonksiyonu
export function authenticateOwner(email: string, password: string): MockOwner | null {
  // SECURITY: Additional production check - V2 Critical Fix
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Mock authentication is not available in production');
  }

  const owner = MOCK_OWNERS.find(
    (o) => o.email.toLowerCase() === email.toLowerCase() && o.password === password
  );

  // SECURITY: Log authentication attempts without exposing credentials - V10 Fix (CVSS 8.3)
  if (owner) {
    logger.info('Mock owner authentication successful', {
      component: 'MockOwnerAuth',
      ownerId: owner.id,
      // Do NOT log email or password - PII protection
    });
  } else {
    logger.warn('Mock owner authentication failed', {
      component: 'MockOwnerAuth',
      // Do NOT log email or password - PII protection
    });
  }

  return owner || null;
}

// Kayıt fonksiyonu (mock)
export function registerOwner(data: {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  propertyType: string;
  propertyCount: number;
}): { success: boolean; owner?: MockOwner; error?: string } {
  // E-posta kontrolü
  const existingOwner = MOCK_OWNERS.find(
    (o) => o.email.toLowerCase() === data.email.toLowerCase()
  );

  if (existingOwner) {
    return {
      success: false,
      error: 'Bu e-posta adresi zaten kayıtlı.'
    };
  }

  // Yeni kullanıcı oluştur
  const newOwner: MockOwner = {
    id: `owner-${Date.now()}`,
    email: data.email,
    password: data.password,
    fullName: data.fullName,
    phone: data.phone,
    propertyType: data.propertyType,
    propertyCount: data.propertyCount,
    registeredAt: new Date().toISOString().split('T')[0],
    status: 'active'
  };

  // Mock array'e ekle (gerçek uygulamada veritabanına kaydedilir)
  MOCK_OWNERS.push(newOwner);

  return {
    success: true,
    owner: newOwner
  };
}

// SECURITY: Test credential printing removed - V10 Critical Fix (CVSS 8.3)
// Logging PII (Personally Identifiable Information) including emails and passwords
// is a critical security vulnerability that can lead to credential exposure.
export function printTestCredentials() {
  // SECURITY: Do NOT log passwords, emails, or other PII
  // This prevents credential leakage through log files, monitoring systems, etc.

  if (process.env.NODE_ENV === 'production') {
    logger.error('SECURITY ERROR: printTestCredentials called in production', {
      component: 'MockOwnerAuth'
    });
    return;
  }

  logger.debug('=== MOCK OWNER TEST DATA AVAILABLE ===', { component: 'MockOwnerAuth' });
  logger.debug(`Total mock owners: ${MOCK_OWNERS.length}`, { component: 'MockOwnerAuth' });
  logger.debug('Credentials available in development mode only', { component: 'MockOwnerAuth' });
  logger.debug('For credential details, check the source code directly', { component: 'MockOwnerAuth' });
  logger.debug('NEVER log actual passwords or emails to prevent PII exposure', { component: 'MockOwnerAuth' });
  logger.debug('==========================================', { component: 'MockOwnerAuth' });
}
