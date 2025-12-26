/**
 * Mock Transfer Service Owner Authentication Data
 * For development and testing purposes
 */

export interface MockTransferOwner {
  id: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  avatar?: string;
  companyName: string;
  tourismLicense: string; // D2 Belgesi
  fleetSize: number;
  activeTransfers: number;
  monthlyRevenue: number;
  rating: number;
  emailVerified: boolean;
  phoneVerified: boolean;
  documentsVerified: boolean;
  licenseVerified: boolean;
  createdAt: Date;
}

export const MOCK_TRANSFER_OWNERS: MockTransferOwner[] = [
  {
    id: 'transfer-owner-001',
    email: 'demo@transfer.lydian.com',
    password: 'Demo123!',
    fullName: 'Mustafa Özdemir',
    phone: '+90 532 777 8899',
    avatar: 'https://i.pravatar.cc/150?img=14',
    companyName: 'Özdemir VIP Transfer',
    tourismLicense: 'D2-IST-2023-1234',
    fleetSize: 12,
    activeTransfers: 8,
    monthlyRevenue: 125000,
    rating: 4.9,
    emailVerified: true,
    phoneVerified: true,
    documentsVerified: true,
    licenseVerified: true,
    createdAt: new Date('2023-06-15'),
  },
  {
    id: 'transfer-owner-002',
    email: 'fatma@transfer.lydian.com',
    password: 'Fatma123!',
    fullName: 'Fatma Şahin',
    phone: '+90 533 888 9900',
    avatar: 'https://i.pravatar.cc/150?img=9',
    companyName: 'Şahin Turizm Transfer',
    tourismLicense: 'D2-ANT-2023-5678',
    fleetSize: 20,
    activeTransfers: 15,
    monthlyRevenue: 210000,
    rating: 4.8,
    emailVerified: true,
    phoneVerified: true,
    documentsVerified: true,
    licenseVerified: true,
    createdAt: new Date('2023-03-20'),
  },
  {
    id: 'transfer-owner-003',
    email: 'can@transfer.lydian.com',
    password: 'Can123!',
    fullName: 'Can Arslan',
    phone: '+90 534 999 0011',
    avatar: 'https://i.pravatar.cc/150?img=15',
    companyName: 'Arslan Airport Transfer',
    tourismLicense: 'D2-IZM-2024-9012',
    fleetSize: 8,
    activeTransfers: 6,
    monthlyRevenue: 78000,
    rating: 4.7,
    emailVerified: true,
    phoneVerified: true,
    documentsVerified: true,
    licenseVerified: true,
    createdAt: new Date('2024-01-10'),
  },
  {
    id: 'transfer-owner-004',
    email: 'test@transfer.lydian.com',
    password: 'Test123!',
    fullName: 'Test Transfer',
    phone: '+90 535 000 1122',
    companyName: 'Test Transfer Hizmetleri',
    tourismLicense: 'D2-TEST-2024-0000',
    fleetSize: 2,
    activeTransfers: 0,
    monthlyRevenue: 0,
    rating: 5.0,
    emailVerified: true,
    phoneVerified: false,
    documentsVerified: false,
    licenseVerified: false,
    createdAt: new Date('2024-12-01'),
  },
];

/**
 * Validate transfer owner credentials
 */
export function validateTransferOwnerCredentials(
  email: string,
  password: string
): MockTransferOwner | null {
  const owner = MOCK_TRANSFER_OWNERS.find(
    (o) => o.email.toLowerCase() === email.toLowerCase() && o.password === password
  );
  return owner || null;
}

/**
 * Get transfer owner by ID
 */
export function getTransferOwnerById(id: string): MockTransferOwner | null {
  return MOCK_TRANSFER_OWNERS.find((o) => o.id === id) || null;
}

/**
 * Get transfer owner by email
 */
export function getTransferOwnerByEmail(email: string): MockTransferOwner | null {
  return MOCK_TRANSFER_OWNERS.find((o) => o.email.toLowerCase() === email.toLowerCase()) || null;
}

/**
 * Check if email is already registered
 */
export function isTransferOwnerEmailTaken(email: string): boolean {
  return MOCK_TRANSFER_OWNERS.some((o) => o.email.toLowerCase() === email.toLowerCase());
}
