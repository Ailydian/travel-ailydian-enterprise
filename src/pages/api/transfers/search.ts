/**
 * Airport Transfer Search API
import { withRateLimit, publicRateLimiter } from '@/lib/middleware/rate-limiter';
 * Returns available transfer routes based on search criteria
 * NOW WITH REAL DATABASE INTEGRATION
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';;
import logger from '../../../lib/logger';

// Using singleton prisma from @/lib/prisma

// Keep mock data as fallback
const mockTransfers = [
  {
    id: '1',
    name: 'Antalya Havalimanı - Şehir Merkezi',
    description: 'Antalya Havalimanından şehir merkezine konforlu ve güvenli transfer hizmeti. 7/24 hizmet, profesyonel şoförler.',
    fromLocation: 'AYT',
    fromLocationFull: 'Antalya Havalimanı',
    toLocation: 'Antalya Şehir Merkezi',
    distance: 15,
    duration: 25,
    region: 'Antalya',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
    vehicles: [
      {
        id: 'v1',
        vehicleType: 'SEDAN',
        name: 'Standart Sedan',
        capacity: 3,
        luggageCapacity: 2,
        priceStandard: 250,
        priceVIP: 400,
        features: ['Klima', 'Konforlu Koltuklar'],
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400',
      },
      {
        id: 'v2',
        vehicleType: 'LUXURY_VAN',
        name: 'Mercedes Vito VIP',
        capacity: 7,
        luggageCapacity: 6,
        priceStandard: 800,
        priceVIP: 1200,
        features: ['Premium İç Mekan', 'Wi-Fi', 'İkramlı Bar', 'Masaj Koltukları', 'Meet & Greet', 'Profesyonel Şoför'],
        image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400',
      },
    ],
  },
  {
    id: '2',
    name: 'Antalya Havalimanı - Lara Plajı',
    description: 'Antalya Havalimanından Lara bölgesindeki otellerinize direkt transfer. En popüler destinasyon.',
    fromLocation: 'AYT',
    fromLocationFull: 'Antalya Havalimanı',
    toLocation: 'Lara',
    distance: 18,
    duration: 30,
    region: 'Antalya',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    vehicles: [
      {
        id: 'v3',
        vehicleType: 'SEDAN',
        name: 'Standart Sedan',
        capacity: 3,
        luggageCapacity: 2,
        priceStandard: 280,
        priceVIP: 450,
        features: ['Klima', 'Konforlu Koltuklar'],
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400',
      },
      {
        id: 'v4',
        vehicleType: 'LUXURY_VAN',
        name: 'Mercedes Vito VIP',
        capacity: 7,
        luggageCapacity: 6,
        priceStandard: 850,
        priceVIP: 1250,
        features: ['Lüks Deri Koltuklar', 'Wi-Fi', 'İkram', 'Meet & Greet'],
        image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400',
      },
    ],
  },
  {
    id: '3',
    name: 'Antalya Havalimanı - Belek',
    description: 'Golf ve lüks oteller bölgesi Belek\'e konforlu transfer hizmeti.',
    fromLocation: 'AYT',
    fromLocationFull: 'Antalya Havalimanı',
    toLocation: 'Belek',
    distance: 35,
    duration: 45,
    region: 'Antalya',
    image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800',
    vehicles: [
      {
        id: 'v5',
        vehicleType: 'SEDAN',
        name: 'Standart Sedan',
        capacity: 3,
        luggageCapacity: 2,
        priceStandard: 350,
        priceVIP: 550,
        features: ['Klima', 'Konforlu Koltuklar'],
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400',
      },
      {
        id: 'v6',
        vehicleType: 'LUXURY_VAN',
        name: 'Mercedes Vito VIP',
        capacity: 7,
        luggageCapacity: 6,
        priceStandard: 950,
        priceVIP: 1400,
        features: ['Premium İç Mekan', 'Wi-Fi', 'İkram', 'Meet & Greet', 'Uçuş Takibi'],
        image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400',
      },
    ],
  },
  {
    id: '4',
    name: 'Antalya Havalimanı - Side',
    description: 'Antik Side bölgesine transfer hizmeti. Tarihi ve plajlarıyla ünlü.',
    fromLocation: 'AYT',
    fromLocationFull: 'Antalya Havalimanı',
    toLocation: 'Side',
    distance: 65,
    duration: 75,
    region: 'Antalya',
    image: 'https://images.unsplash.com/photo-1605519582177-2e4ef8d28eef?w=800',
    vehicles: [
      {
        id: 'v7',
        vehicleType: 'SEDAN',
        name: 'Standart Sedan',
        capacity: 3,
        luggageCapacity: 2,
        priceStandard: 450,
        priceVIP: 700,
        features: ['Klima', 'Konforlu Koltuklar'],
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400',
      },
      {
        id: 'v8',
        vehicleType: 'LUXURY_VAN',
        name: 'Mercedes Vito VIP',
        capacity: 7,
        luggageCapacity: 6,
        priceStandard: 1200,
        priceVIP: 1700,
        features: ['Lüks İç Mekan', 'Wi-Fi', 'İkram', 'Meet & Greet', 'Profesyonel Şoför'],
        image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400',
      },
    ],
  },
  {
    id: '5',
    name: 'Antalya Havalimanı - Alanya',
    description: 'Antalya Havalimanından Alanya\'ya VIP ve standart transfer hizmetleri. En popüler rota! ⭐',
    fromLocation: 'AYT',
    fromLocationFull: 'Antalya Havalimanı',
    toLocation: 'Alanya',
    distance: 125,
    duration: 120,
    region: 'Antalya-Alanya',
    popular: true,
    image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800',
    vehicles: [
      {
        id: 'v9',
        vehicleType: 'SEDAN',
        name: 'Standart Sedan',
        capacity: 3,
        luggageCapacity: 2,
        priceStandard: 650,
        priceVIP: 1000,
        features: ['Klima', 'Konforlu Koltuklar', 'Bagaj Alanı'],
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400',
      },
      {
        id: 'v10',
        vehicleType: 'LUXURY_VAN',
        name: 'Mercedes Vito VIP',
        capacity: 7,
        luggageCapacity: 6,
        priceStandard: 1500,
        priceVIP: 2200,
        features: [
          'Premium Deri Koltuklar',
          'Wi-Fi',
          'İkramlı Minibar',
          'Masaj Koltukları',
          'Tablet Eğlence Sistemi',
          'Meet & Greet',
          'Profesyonel Şoför',
          'Uçuş Takibi',
          '7/24 Destek',
        ],
        image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400',
      },
      {
        id: 'v11',
        vehicleType: 'MINIBUS',
        name: 'Mercedes Sprinter',
        capacity: 14,
        luggageCapacity: 10,
        priceStandard: 1100,
        priceVIP: 1600,
        features: ['Geniş İç Mekan', 'Klima', 'Bagaj Bölmesi'],
        image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400',
      },
    ],
  },
  {
    id: '6',
    name: 'Gazipaşa Havalimanı - Alanya',
    description: 'Gazipaşa-Alanya Havalimanından Alanya merkezine kısa mesafe transfer.',
    fromLocation: 'GZP',
    fromLocationFull: 'Gazipaşa-Alanya Havalimanı',
    toLocation: 'Alanya',
    distance: 35,
    duration: 40,
    region: 'Alanya',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
    vehicles: [
      {
        id: 'v12',
        vehicleType: 'SEDAN',
        name: 'Standart Sedan',
        capacity: 3,
        luggageCapacity: 2,
        priceStandard: 300,
        priceVIP: 500,
        features: ['Klima', 'Konforlu Koltuklar'],
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400',
      },
      {
        id: 'v13',
        vehicleType: 'LUXURY_VAN',
        name: 'Mercedes Vito VIP',
        capacity: 7,
        luggageCapacity: 6,
        priceStandard: 850,
        priceVIP: 1200,
        features: ['Lüks İç Mekan', 'Wi-Fi', 'İkram', 'Meet & Greet'],
        image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400',
      },
    ],
  },
  {
    id: '7',
    name: 'Antalya Havalimanı - Kemer',
    description: 'Kemer bölgesine transfer - doğa ve plajların buluştuğu nokta.',
    fromLocation: 'AYT',
    fromLocationFull: 'Antalya Havalimanı',
    toLocation: 'Kemer',
    distance: 55,
    duration: 60,
    region: 'Antalya',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    vehicles: [
      {
        id: 'v14',
        vehicleType: 'SEDAN',
        name: 'Standart Sedan',
        capacity: 3,
        luggageCapacity: 2,
        priceStandard: 400,
        priceVIP: 650,
        features: ['Klima', 'Konforlu Koltuklar'],
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400',
      },
      {
        id: 'v15',
        vehicleType: 'LUXURY_VAN',
        name: 'Mercedes Vito VIP',
        capacity: 7,
        luggageCapacity: 6,
        priceStandard: 1100,
        priceVIP: 1600,
        features: ['Premium İç Mekan', 'Wi-Fi', 'İkram', 'Meet & Greet'],
        image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400',
      },
    ],
  },
];

interface SearchQuery {
  from?: string;
  to?: string;
  passengers?: number;
  isVIP?: boolean;
  region?: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { from, to, passengers, isVIP, region } = req.query as any;

    logger.info('Transfer search request', { from, to, passengers, isVIP, region });

    // Try to fetch from database first
    let results = [];

    try {
      const where: any = { isActive: true };

      // Location filters
      if (from) {
        where.fromLocation = { contains: from, mode: 'insensitive' };
      }
      if (to) {
        where.toLocation = { contains: to, mode: 'insensitive' };
      }
      if (region) {
        where.region = { contains: region, mode: 'insensitive' };
      }

      // Fetch transfers from database
      const transfers = await prisma.airportTransfer.findMany({
        where,
        include: {
          vehicles: {
            where: passengers
              ? { capacity: { gte: parseInt(passengers as string) } }
              : {},
            orderBy: { priceStandard: 'asc' },
          },
        },
        orderBy: { distance: 'asc' },
      });

      // Transform database results to API format
      results = transfers
        .filter(t => t.vehicles.length > 0)
        .map(transfer => ({
          id: transfer.id,
          name: `${transfer.fromLocation} - ${transfer.toLocation}`,
          description: transfer.description || `Transfer from ${transfer.fromLocation} to ${transfer.toLocation}`,
          fromLocation: transfer.fromLocation.split(' ')[0], // Get airport code
          fromLocationFull: transfer.fromLocation,
          toLocation: transfer.toLocation,
          distance: transfer.distance,
          duration: transfer.duration,
          region: transfer.region,
          image: transfer.image || 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
          popular: transfer.bookingCount > 100,
          vehicles: transfer.vehicles.map(v => ({
            id: v.id,
            vehicleType: v.vehicleType,
            name: v.name,
            capacity: v.capacity,
            luggageCapacity: v.luggageCapacity,
            priceStandard: Number(v.priceStandard),
            priceVIP: Number(v.priceVIP),
            features: v.features,
            image: v.image || 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400',
          })),
        }));

    } catch (dbError) {
      logger.error('Database query failed, using mock data:', dbError as Error, {component:'Search'});
      // Fall back to mock data
      results = [...mockTransfers];

      // Apply mock data filters only if using fallback
      if (from) {
        results = results.filter(
          (t) =>
            t.fromLocation.toLowerCase().includes(from.toLowerCase()) ||
            t.fromLocationFull.toLowerCase().includes(from.toLowerCase())
        );
      }

      if (to) {
        results = results.filter((t) =>
          t.toLocation.toLowerCase().includes(to.toLowerCase())
        );
      }

      if (region) {
        results = results.filter((t) =>
          t.region.toLowerCase().includes(region.toLowerCase())
        );
      }

      // Filter vehicles based on passenger count
      if (passengers) {
        results = results.map((transfer) => {
          let filteredVehicles = [...transfer.vehicles];
          const passengerCount = parseInt(passengers as string);
          filteredVehicles = filteredVehicles.filter(
            (v) => v.capacity >= passengerCount
          );

          return {
            ...transfer,
            vehicles: filteredVehicles,
          };
        });

        results = results.filter((t) => t.vehicles.length > 0);
      }
    }

    // Sort: popular first, then by distance
    results.sort((a, b) => {
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return a.distance - b.distance;
    });

    logger.info('Transfer search completed', {
      resultsCount: results.length,
      query: { from, to, passengers, isVIP, region },
    });

    // Set cache headers for better performance
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=600');
    return res.status(200).json({
      success: true,
      count: results.length,
      transfers: results,
    });
  } catch (error) {
    logger.error('Transfer search error', error);
    return res.status(500).json({
      error: 'Transfer search failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

export default withRateLimit(handler, publicRateLimiter);
