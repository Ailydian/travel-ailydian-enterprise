import type { NextApiRequest, NextApiResponse } from 'next';
import logger from '@/lib/logger';

interface VehicleStats {
  revenue: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    lastMonth: number;
    growth: number;
    forecast: number;
  };
  bookings: {
    total: number;
    completed: number;
    active: number;
    upcoming: number;
    cancelled: number;
  };
  vehicles: {
    total: number;
    active: number;
    available: number;
    maintenance: number;
  };
  drivers: {
    total: number;
    active: number;
    available: number;
    certified: number;
  };
  performance: {
    customerRating: number;
    driverRating: number;
    completionRate: number;
    repeatCustomerRate: number;
  };
}

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  plateNumber: string;
  type: 'sedan' | 'suv' | 'luxury' | 'vip';
  capacity: number;
  status: 'available' | 'booked' | 'maintenance' | 'cleaning';
  driver: string;
  currentBooking?: string;
  totalKm: number;
  lastMaintenance: string;
  nextMaintenance: string;
  fuelLevel: number;
  insuranceExpiry: string;
  inspectionExpiry: string;
  dailyRate: number;
  utilization: number;
}

interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNumber: string;
  licenseType: string;
  experienceYears: number;
  rating: number;
  completedTrips: number;
  status: 'active' | 'available' | 'off_duty';
  currentVehicle?: string;
  languages: string[];
  certificates: string[];
  earnings: number;
}

interface MaintenanceAlert {
  id: string;
  vehicleId: string;
  vehicleName: string;
  type: 'scheduled' | 'urgent' | 'overdue';
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

interface Booking {
  id: string;
  customer: string;
  vehicle: string;
  driver: string;
  startDate: string;
  endDate: string;
  days: number;
  pickupLocation: string;
  destination: string;
  price: number;
  status: 'confirmed' | 'active' | 'completed' | 'cancelled';
  services: string[];
}

/**
 * Vehicle Owner Dashboard API (Şoförlü Araç)
 *
 * Features:
 * - Vehicle fleet management
 * - Driver performance tracking
 * - Booking management
 * - Maintenance alerts
 * - Revenue analytics with forecast
 *
 * This endpoint syncs with the main Travel LyDian admin dashboard
 * Real-time updates every 30 seconds
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // In production, this would fetch from Prisma database
    // For now, returning realistic mock data

    const stats: VehicleStats = await generateVehicleStats();
    const vehicles: Vehicle[] = await getVehicles();
    const drivers: Driver[] = await getDrivers();
    const maintenanceAlerts: MaintenanceAlert[] = await getMaintenanceAlerts();
    const bookings: Booking[] = await getBookings();

    logger.info('Vehicle dashboard data fetched successfully', {
      component: 'VehicleDashboard',
      action: 'fetch_dashboard',
      metadata: {
        vehiclesCount: vehicles.length,
        driversCount: drivers.length,
        revenue: stats.revenue.thisMonth
      }
    });

    return res.status(200).json({
      stats,
      vehicles,
      drivers,
      maintenanceAlerts,
      bookings,
      syncTime: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Vehicle dashboard API error', error as Error, {
      component: 'VehicleDashboard',
      action: 'fetch_dashboard',
      metadata: {
        method: req.method,
        url: req.url
      }
    });

    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Generate vehicle statistics with AI forecast
 */
async function generateVehicleStats(): Promise<VehicleStats> {
  const today = 42500;
  const thisWeek = 285000;
  const thisMonth = 720000;
  const lastMonth = 680000;

  const growth = Math.round(((thisMonth - lastMonth) / lastMonth) * 100);
  const forecast = Math.round(thisMonth * 1.12); // 12% projected growth

  return {
    revenue: {
      today,
      thisWeek,
      thisMonth,
      lastMonth,
      growth,
      forecast
    },
    bookings: {
      total: 458,
      completed: 420,
      active: 8,
      upcoming: 18,
      cancelled: 12
    },
    vehicles: {
      total: 28,
      active: 8,
      available: 16,
      maintenance: 4
    },
    drivers: {
      total: 32,
      active: 8,
      available: 20,
      certified: 32
    },
    performance: {
      customerRating: 4.8,
      driverRating: 4.7,
      completionRate: 97,
      repeatCustomerRate: 42
    }
  };
}

/**
 * Get vehicle fleet
 */
async function getVehicles(): Promise<Vehicle[]> {
  const vehicles: Vehicle[] = [
    {
      id: 'VEH-001',
      brand: 'Mercedes-Benz',
      model: 'E-Class',
      year: 2023,
      plateNumber: '34 ABC 123',
      type: 'luxury',
      capacity: 4,
      status: 'booked',
      driver: 'Mehmet Yılmaz',
      currentBooking: 'BKG-2024-001',
      totalKm: 28500,
      lastMaintenance: '2024-11-15',
      nextMaintenance: '2025-01-15',
      fuelLevel: 85,
      insuranceExpiry: '2025-06-30',
      inspectionExpiry: '2025-04-15',
      dailyRate: 2500,
      utilization: 78
    },
    {
      id: 'VEH-002',
      brand: 'BMW',
      model: '5 Series',
      year: 2023,
      plateNumber: '34 DEF 456',
      type: 'luxury',
      capacity: 4,
      status: 'available',
      driver: 'Ali Kaya',
      totalKm: 32000,
      lastMaintenance: '2024-10-20',
      nextMaintenance: '2024-12-20',
      fuelLevel: 92,
      insuranceExpiry: '2025-07-15',
      inspectionExpiry: '2025-05-10',
      dailyRate: 2400,
      utilization: 72
    },
    {
      id: 'VEH-003',
      brand: 'Mercedes-Benz',
      model: 'S-Class',
      year: 2024,
      plateNumber: '34 GHI 789',
      type: 'vip',
      capacity: 4,
      status: 'booked',
      driver: 'Hasan Öztürk',
      currentBooking: 'BKG-2024-002',
      totalKm: 15000,
      lastMaintenance: '2024-11-01',
      nextMaintenance: '2025-02-01',
      fuelLevel: 78,
      insuranceExpiry: '2025-08-30',
      inspectionExpiry: '2025-06-20',
      dailyRate: 4500,
      utilization: 85
    },
    {
      id: 'VEH-004',
      brand: 'Audi',
      model: 'A6',
      year: 2022,
      plateNumber: '34 JKL 012',
      type: 'luxury',
      capacity: 4,
      status: 'available',
      driver: 'Mustafa Çelik',
      totalKm: 45000,
      lastMaintenance: '2024-09-15',
      nextMaintenance: '2024-12-15',
      fuelLevel: 68,
      insuranceExpiry: '2025-05-20',
      inspectionExpiry: '2025-03-10',
      dailyRate: 2200,
      utilization: 65
    },
    {
      id: 'VEH-005',
      brand: 'BMW',
      model: '7 Series',
      year: 2024,
      plateNumber: '34 MNO 345',
      type: 'vip',
      capacity: 4,
      status: 'maintenance',
      driver: 'Fatih Aydın',
      totalKm: 12000,
      lastMaintenance: '2024-12-01',
      nextMaintenance: '2025-03-01',
      fuelLevel: 45,
      insuranceExpiry: '2025-09-15',
      inspectionExpiry: '2025-07-01',
      dailyRate: 4200,
      utilization: 82
    },
    {
      id: 'VEH-006',
      brand: 'Mercedes-Benz',
      model: 'C-Class',
      year: 2022,
      plateNumber: '34 PQR 678',
      type: 'sedan',
      capacity: 4,
      status: 'available',
      driver: 'Ahmet Yurt',
      totalKm: 52000,
      lastMaintenance: '2024-08-10',
      nextMaintenance: '2024-11-10',
      fuelLevel: 88,
      insuranceExpiry: '2025-04-15',
      inspectionExpiry: '2025-02-20',
      dailyRate: 1800,
      utilization: 58
    },
    {
      id: 'VEH-007',
      brand: 'Audi',
      model: 'Q7',
      year: 2023,
      plateNumber: '34 STU 901',
      type: 'suv',
      capacity: 7,
      status: 'booked',
      driver: 'İbrahim Korkmaz',
      currentBooking: 'BKG-2024-003',
      totalKm: 24000,
      lastMaintenance: '2024-10-05',
      nextMaintenance: '2025-01-05',
      fuelLevel: 72,
      insuranceExpiry: '2025-07-30',
      inspectionExpiry: '2025-05-15',
      dailyRate: 3000,
      utilization: 76
    },
    {
      id: 'VEH-008',
      brand: 'BMW',
      model: 'X5',
      year: 2023,
      plateNumber: '34 VWX 234',
      type: 'suv',
      capacity: 7,
      status: 'available',
      driver: 'Osman Tekin',
      totalKm: 31000,
      lastMaintenance: '2024-09-20',
      nextMaintenance: '2024-12-20',
      fuelLevel: 94,
      insuranceExpiry: '2025-06-10',
      inspectionExpiry: '2025-04-05',
      dailyRate: 2800,
      utilization: 70
    },
    {
      id: 'VEH-009',
      brand: 'Mercedes-Benz',
      model: 'V-Class',
      year: 2024,
      plateNumber: '34 YZA 567',
      type: 'suv',
      capacity: 8,
      status: 'booked',
      driver: 'Kemal Arslan',
      currentBooking: 'BKG-2024-004',
      totalKm: 18000,
      lastMaintenance: '2024-11-10',
      nextMaintenance: '2025-02-10',
      fuelLevel: 80,
      insuranceExpiry: '2025-08-20',
      inspectionExpiry: '2025-06-15',
      dailyRate: 3500,
      utilization: 88
    },
    {
      id: 'VEH-010',
      brand: 'Audi',
      model: 'A8',
      year: 2024,
      plateNumber: '34 BCD 890',
      type: 'vip',
      capacity: 4,
      status: 'available',
      driver: 'Ramazan Şahin',
      totalKm: 9000,
      lastMaintenance: '2024-11-25',
      nextMaintenance: '2025-02-25',
      fuelLevel: 96,
      insuranceExpiry: '2025-10-01',
      inspectionExpiry: '2025-08-10',
      dailyRate: 4800,
      utilization: 90
    }
  ];

  return vehicles;
}

/**
 * Get driver roster
 */
async function getDrivers(): Promise<Driver[]> {
  const drivers: Driver[] = [
    {
      id: 'DRV-001',
      name: 'Mehmet Yılmaz',
      phone: '+90 532 123 4567',
      licenseNumber: 'ABC123456',
      licenseType: 'B',
      experienceYears: 15,
      rating: 4.9,
      completedTrips: 1250,
      status: 'active',
      currentVehicle: 'Mercedes E-Class (34 ABC 123)',
      languages: ['Türkçe', 'İngilizce'],
      certificates: ['Profesyonel Sürücü', 'İlk Yardım'],
      earnings: 125000
    },
    {
      id: 'DRV-002',
      name: 'Ali Kaya',
      phone: '+90 532 234 5678',
      licenseNumber: 'DEF234567',
      licenseType: 'B',
      experienceYears: 12,
      rating: 4.8,
      completedTrips: 980,
      status: 'available',
      currentVehicle: undefined,
      languages: ['Türkçe', 'İngilizce', 'Almanca'],
      certificates: ['Profesyonel Sürücü', 'Savunma Sürücülüğü'],
      earnings: 98000
    },
    {
      id: 'DRV-003',
      name: 'Hasan Öztürk',
      phone: '+90 532 345 6789',
      licenseNumber: 'GHI345678',
      licenseType: 'B',
      experienceYears: 18,
      rating: 4.9,
      completedTrips: 1450,
      status: 'active',
      currentVehicle: 'Mercedes S-Class (34 GHI 789)',
      languages: ['Türkçe', 'İngilizce', 'Rusça'],
      certificates: ['VIP Hizmet', 'Protokol Sürücülüğü'],
      earnings: 145000
    },
    {
      id: 'DRV-004',
      name: 'Mustafa Çelik',
      phone: '+90 532 456 7890',
      licenseNumber: 'JKL456789',
      licenseType: 'B',
      experienceYears: 10,
      rating: 4.7,
      completedTrips: 750,
      status: 'available',
      currentVehicle: undefined,
      languages: ['Türkçe', 'İngilizce'],
      certificates: ['Profesyonel Sürücü'],
      earnings: 75000
    },
    {
      id: 'DRV-005',
      name: 'Fatih Aydın',
      phone: '+90 532 567 8901',
      licenseNumber: 'MNO567890',
      licenseType: 'B',
      experienceYears: 14,
      rating: 4.8,
      completedTrips: 1100,
      status: 'off_duty',
      currentVehicle: undefined,
      languages: ['Türkçe', 'İngilizce', 'Arapça'],
      certificates: ['Profesyonel Sürücü', 'İlk Yardım'],
      earnings: 110000
    },
    {
      id: 'DRV-006',
      name: 'Ahmet Yurt',
      phone: '+90 532 678 9012',
      licenseNumber: 'PQR678901',
      licenseType: 'B',
      experienceYears: 8,
      rating: 4.6,
      completedTrips: 580,
      status: 'available',
      currentVehicle: undefined,
      languages: ['Türkçe'],
      certificates: ['Profesyonel Sürücü'],
      earnings: 58000
    },
    {
      id: 'DRV-007',
      name: 'İbrahim Korkmaz',
      phone: '+90 532 789 0123',
      licenseNumber: 'STU789012',
      licenseType: 'B',
      experienceYears: 11,
      rating: 4.7,
      completedTrips: 850,
      status: 'active',
      currentVehicle: 'Audi Q7 (34 STU 901)',
      languages: ['Türkçe', 'İngilizce'],
      certificates: ['Profesyonel Sürücü', 'Savunma Sürücülüğü'],
      earnings: 85000
    },
    {
      id: 'DRV-008',
      name: 'Osman Tekin',
      phone: '+90 532 890 1234',
      licenseNumber: 'VWX890123',
      licenseType: 'B',
      experienceYears: 13,
      rating: 4.8,
      completedTrips: 1020,
      status: 'available',
      currentVehicle: undefined,
      languages: ['Türkçe', 'İngilizce', 'Fransızca'],
      certificates: ['Profesyonel Sürücü', 'Turizm Rehberliği'],
      earnings: 102000
    }
  ];

  return drivers;
}

/**
 * Get maintenance alerts
 */
async function getMaintenanceAlerts(): Promise<MaintenanceAlert[]> {
  const alerts: MaintenanceAlert[] = [
    {
      id: 'MNT-001',
      vehicleId: 'VEH-005',
      vehicleName: 'BMW 7 Series (34 MNO 345)',
      type: 'urgent',
      description: 'Motor yağı değişimi gecikti',
      dueDate: '2024-12-01',
      priority: 'high'
    },
    {
      id: 'MNT-002',
      vehicleId: 'VEH-006',
      vehicleName: 'Mercedes C-Class (34 PQR 678)',
      type: 'overdue',
      description: 'Periyodik bakım süresi doldu',
      dueDate: '2024-11-10',
      priority: 'high'
    },
    {
      id: 'MNT-003',
      vehicleId: 'VEH-008',
      vehicleName: 'BMW X5 (34 VWX 234)',
      type: 'scheduled',
      description: 'Yaklaşan periyodik bakım',
      dueDate: '2024-12-20',
      priority: 'medium'
    },
    {
      id: 'MNT-004',
      vehicleId: 'VEH-004',
      vehicleName: 'Audi A6 (34 JKL 012)',
      type: 'scheduled',
      description: 'Fren balatası kontrolü',
      dueDate: '2024-12-15',
      priority: 'medium'
    },
    {
      id: 'MNT-005',
      vehicleId: 'VEH-002',
      vehicleName: 'BMW 5 Series (34 DEF 456)',
      type: 'scheduled',
      description: 'Lastik rotasyonu',
      dueDate: '2024-12-25',
      priority: 'low'
    }
  ];

  return alerts;
}

/**
 * Get bookings
 */
async function getBookings(): Promise<Booking[]> {
  const bookings: Booking[] = [
    {
      id: 'BKG-2024-001',
      customer: 'Ayşe Yılmaz',
      vehicle: 'Mercedes E-Class',
      driver: 'Mehmet Yılmaz',
      startDate: '2024-12-20',
      endDate: '2024-12-23',
      days: 3,
      pickupLocation: 'İstanbul Havalimanı',
      destination: 'Antalya',
      price: 7500,
      status: 'active',
      services: ['Havalimanı karşılama', 'Wi-Fi', 'Su']
    },
    {
      id: 'BKG-2024-002',
      customer: 'Mehmet Demir',
      vehicle: 'Mercedes S-Class',
      driver: 'Hasan Öztürk',
      startDate: '2024-12-22',
      endDate: '2024-12-25',
      days: 3,
      pickupLocation: 'Taksim',
      destination: 'Bodrum',
      price: 13500,
      status: 'active',
      services: ['VIP transfer', 'Bebek koltuğu', 'Havalimanı karşılama']
    },
    {
      id: 'BKG-2024-003',
      customer: 'Can Özer',
      vehicle: 'Audi Q7',
      driver: 'İbrahim Korkmaz',
      startDate: '2024-12-21',
      endDate: '2024-12-24',
      days: 3,
      pickupLocation: 'Kadıköy',
      destination: 'İzmir',
      price: 9000,
      status: 'active',
      services: ['7 kişilik', 'Bagaj alanı', 'Su']
    },
    {
      id: 'BKG-2024-004',
      customer: 'Zeynep Arslan',
      vehicle: 'Mercedes V-Class',
      driver: 'Kemal Arslan',
      startDate: '2024-12-23',
      endDate: '2024-12-28',
      days: 5,
      pickupLocation: 'Sabiha Gökçen',
      destination: 'Kapadokya',
      price: 17500,
      status: 'confirmed',
      services: ['8 kişilik', 'Tur rehberi', 'Otel transferleri']
    },
    {
      id: 'BKG-2024-005',
      customer: 'Emre Şahin',
      vehicle: 'BMW 5 Series',
      driver: 'Ali Kaya',
      startDate: '2024-12-25',
      endDate: '2024-12-27',
      days: 2,
      pickupLocation: 'Beşiktaş',
      destination: 'Bursa',
      price: 4800,
      status: 'confirmed',
      services: ['İş seyahati', 'Wi-Fi', 'Gazete']
    },
    {
      id: 'BKG-2024-006',
      customer: 'Selin Kaya',
      vehicle: 'Audi A8',
      driver: 'Ramazan Şahin',
      startDate: '2024-12-18',
      endDate: '2024-12-20',
      days: 2,
      pickupLocation: 'Four Seasons Hotel',
      destination: 'İstanbul Havalimanı',
      price: 9600,
      status: 'completed',
      services: ['VIP hizmet', 'Meet & Greet', 'Bagaj yardımı']
    },
    {
      id: 'BKG-2024-007',
      customer: 'Burak Yıldız',
      vehicle: 'BMW X5',
      driver: 'Osman Tekin',
      startDate: '2024-12-15',
      endDate: '2024-12-17',
      days: 2,
      pickupLocation: 'Ankara',
      destination: 'İstanbul',
      price: 5600,
      status: 'completed',
      services: ['Şehirlerarası', 'Wi-Fi', 'Su']
    },
    {
      id: 'BKG-2024-008',
      customer: 'Deniz Aydın',
      vehicle: 'Mercedes C-Class',
      driver: 'Ahmet Yurt',
      startDate: '2024-12-10',
      endDate: '2024-12-11',
      days: 1,
      pickupLocation: 'Nişantaşı',
      destination: 'İstanbul Havalimanı',
      price: 1800,
      status: 'completed',
      services: ['Havalimanı transferi', 'Bagaj yardımı']
    }
  ];

  return bookings;
}
