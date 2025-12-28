import logger from '../lib/logger';
import { logger } from '../lib/logger/winston';

/**
 * Mock Property Owner Authentication Data
 * Test kullanıcıları ve şifreleri
 */

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

// Test için hazır kullanıcılar
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
  const owner = MOCK_OWNERS.find(
    (o) => o.email.toLowerCase() === email.toLowerCase() && o.password === password
  );

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

// Test kullanıcı bilgilerini konsola yazdırma
export function printTestCredentials() {
  logger.debug('\n=== MÜLK SAHİBİ TEST KULLANICI BİLGİLERİ ===\n', { component: 'Mockownerauth' });

  MOCK_OWNERS.forEach((owner, index) => {
    logger.debug(`${index + 1}. Kullanıcı:`, { component: 'Mockownerauth' });
    logger.debug(`   E-posta: ${owner.email}`, { component: 'Mockownerauth' });
    logger.debug(`   Şifre: ${owner.password}`, { component: 'Mockownerauth' });
    logger.debug(`   Ad Soyad: ${owner.fullName}`, { component: 'Mockownerauth' });
    logger.debug(`   Telefon: ${owner.phone}`, { component: 'Mockownerauth' });
    logger.debug(`   Mülk Tipi: ${owner.propertyType}`, { component: 'Mockownerauth' });
    logger.debug(`   Mülk Sayısı: ${owner.propertyCount}`, { component: 'Mockownerauth' });
    logger.info('');
  });

  logger.debug('==========================================\n', { component: 'Mockownerauth' });
}
