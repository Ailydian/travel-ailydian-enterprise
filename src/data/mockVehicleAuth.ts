/**
 * Mock Vehicle Owner Authentication Data
 * For development and testing purposes
 */

export interface MockVehicleOwner {
  id: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  avatar?: string;
  businessName?: string;
  businessType: 'individual' | 'company';
  totalVehicles: number;
  activeRentals: number;
  monthlyRevenue: number;
  rating: number;
  emailVerified: boolean;
  phoneVerified: boolean;
  documentsVerified: boolean;
  createdAt: Date;
}

export const MOCK_VEHICLE_OWNERS: MockVehicleOwner[] = [
  {
    id: 'vehicle-owner-001',
    email: 'demo@carowner.ailydian.com',
    password: 'Demo123!',
    fullName: 'Ahmet Yılmaz',
    phone: '+90 532 111 2233',
    avatar: 'https://i.pravatar.cc/150?img=12',
    businessName: 'Yılmaz Rent A Car',
    businessType: 'company',
    totalVehicles: 8,
    activeRentals: 5,
    monthlyRevenue: 45000,
    rating: 4.8,
    emailVerified: true,
    phoneVerified: true,
    documentsVerified: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'vehicle-owner-002',
    email: 'mehmet@carowner.ailydian.com',
    password: 'Mehmet123!',
    fullName: 'Mehmet Demir',
    phone: '+90 533 222 3344',
    avatar: 'https://i.pravatar.cc/150?img=13',
    businessName: 'Demir Araç Kiralama',
    businessType: 'company',
    totalVehicles: 15,
    activeRentals: 12,
    monthlyRevenue: 89000,
    rating: 4.9,
    emailVerified: true,
    phoneVerified: true,
    documentsVerified: true,
    createdAt: new Date('2023-11-20'),
  },
  {
    id: 'vehicle-owner-003',
    email: 'ayse@carowner.ailydian.com',
    password: 'Ayse123!',
    fullName: 'Ayşe Kaya',
    phone: '+90 534 333 4455',
    avatar: 'https://i.pravatar.cc/150?img=5',
    businessType: 'individual',
    totalVehicles: 3,
    activeRentals: 2,
    monthlyRevenue: 18000,
    rating: 4.7,
    emailVerified: true,
    phoneVerified: true,
    documentsVerified: true,
    createdAt: new Date('2024-03-10'),
  },
  {
    id: 'vehicle-owner-004',
    email: 'test@carowner.ailydian.com',
    password: 'Test123!',
    fullName: 'Test Kullanıcı',
    phone: '+90 535 444 5566',
    businessType: 'individual',
    totalVehicles: 1,
    activeRentals: 0,
    monthlyRevenue: 0,
    rating: 5.0,
    emailVerified: true,
    phoneVerified: false,
    documentsVerified: false,
    createdAt: new Date('2024-12-01'),
  },
];

/**
 * Validate vehicle owner credentials
 */
export function validateVehicleOwnerCredentials(
  email: string,
  password: string
): MockVehicleOwner | null {
  const owner = MOCK_VEHICLE_OWNERS.find(
    (o) => o.email.toLowerCase() === email.toLowerCase() && o.password === password
  );
  return owner || null;
}

/**
 * Get vehicle owner by ID
 */
export function getVehicleOwnerById(id: string): MockVehicleOwner | null {
  return MOCK_VEHICLE_OWNERS.find((o) => o.id === id) || null;
}

/**
 * Get vehicle owner by email
 */
export function getVehicleOwnerByEmail(email: string): MockVehicleOwner | null {
  return MOCK_VEHICLE_OWNERS.find((o) => o.email.toLowerCase() === email.toLowerCase()) || null;
}

/**
 * Check if email is already registered
 */
export function isVehicleOwnerEmailTaken(email: string): boolean {
  return MOCK_VEHICLE_OWNERS.some((o) => o.email.toLowerCase() === email.toLowerCase());
}
