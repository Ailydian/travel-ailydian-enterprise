/**
 * Prisma Seed Data
 * Seeds database with Antalya/Alanya airport transfers and admin users
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean existing data (development only!)
  if (process.env.NODE_ENV !== 'production') {
    console.log('🧹 Cleaning existing data...');
    try {
      await prisma.transferBooking.deleteMany();
      await prisma.transferVehicle.deleteMany();
      await prisma.airportTransfer.deleteMany();
      await prisma.hotelRoom.deleteMany();
      await prisma.hotel.deleteMany();
      await prisma.admin.deleteMany();
    } catch (error) {
      console.log('⚠️  Tables might not exist yet, skipping cleanup...');
    }
  }

  // Create Admin Users
  console.log('👤 Creating admin users...');

  const superAdmin = await prisma.admin.create({
    data: {
      email: 'admin@ailydian.com',
      passwordHash: await bcrypt.hash('admin123', 12),
      role: 'SUPER_ADMIN',
      permissions: ['*'],
      isActive: true,
    }
  });

  const moderator = await prisma.admin.create({
    data: {
      email: 'moderator@ailydian.com',
      passwordHash: await bcrypt.hash('mod123', 12),
      role: 'MODERATOR',
      permissions: ['reviews:read', 'reviews:moderate', 'locations:read', 'users:read'],
      isActive: true,
    }
  });

  console.log(`✅ Created ${superAdmin.role}: ${superAdmin.email}`);
  console.log(`✅ Created ${moderator.role}: ${moderator.email}`);

  // Create Antalya Airport Transfers
  console.log('✈️ Creating Antalya airport transfers...');

  // 1. Antalya Airport to City Center
  const antalyaCity = await prisma.airportTransfer.create({
    data: {
      name: 'Antalya Havalimanı - Şehir Merkezi',
      description: 'Antalya Havalimanından şehir merkezine konforlu ve güvenli transfer hizmeti. 7/24 hizmet, profesyonel şoförler.',
      fromLocation: 'AYT',
      toLocation: 'Antalya Şehir Merkezi',
      distance: 15,
      duration: 25,
      region: 'Antalya',
      vehicles: {
        create: [
          {
            vehicleType: 'SEDAN',
            name: 'Standart Sedan',
            capacity: 3,
            luggageCapacity: 2,
            priceStandard: 250,
            priceVIP: 400,
            features: ['Klima', 'Konforlu Koltuklar'],
          },
          {
            vehicleType: 'LUXURY_SEDAN',
            name: 'Mercedes E-Class VIP',
            capacity: 3,
            luggageCapacity: 2,
            priceStandard: 500,
            priceVIP: 700,
            features: ['Lüks İç Mekan', 'Wi-Fi', 'Su İkramı', 'Telefon Şarjı', 'Meet & Greet'],
          },
          {
            vehicleType: 'VAN',
            name: 'Standart Van',
            capacity: 7,
            luggageCapacity: 5,
            priceStandard: 400,
            priceVIP: 650,
            features: ['Geniş Bagaj Alanı', 'Klima', 'Konforlu Koltuklar'],
          },
          {
            vehicleType: 'LUXURY_VAN',
            name: 'Mercedes Vito VIP',
            capacity: 7,
            luggageCapacity: 6,
            priceStandard: 800,
            priceVIP: 1200,
            features: ['Premium İç Mekan', 'Wi-Fi', 'İkramlı Bar', 'Masaj Koltukları', 'Meet & Greet', 'Profesyonel Şoför'],
          },
        ],
      },
    },
  });

  // 2. Antalya Airport to Lara Beach
  const antalyaLara = await prisma.airportTransfer.create({
    data: {
      name: 'Antalya Havalimanı - Lara Plajı',
      description: 'Antalya Havalimanından Lara bölgesindeki otellerinize direkt transfer. En popüler destinasyon.',
      fromLocation: 'AYT',
      toLocation: 'Lara',
      distance: 18,
      duration: 30,
      region: 'Antalya',
      vehicles: {
        create: [
          {
            vehicleType: 'SEDAN',
            name: 'Standart Sedan',
            capacity: 3,
            luggageCapacity: 2,
            priceStandard: 280,
            priceVIP: 450,
            features: ['Klima', 'Konforlu Koltuklar'],
          },
          {
            vehicleType: 'LUXURY_SEDAN',
            name: 'BMW 5 Serisi VIP',
            capacity: 3,
            luggageCapacity: 2,
            priceStandard: 550,
            priceVIP: 750,
            features: ['Premium İç Mekan', 'Wi-Fi', 'Su İkramı', 'Meet & Greet'],
          },
          {
            vehicleType: 'VAN',
            name: 'Ford Transit',
            capacity: 8,
            luggageCapacity: 6,
            priceStandard: 450,
            priceVIP: 700,
            features: ['Geniş İç Mekan', 'Klima', 'USB Şarj'],
          },
          {
            vehicleType: 'LUXURY_VAN',
            name: 'Mercedes Vito VIP',
            capacity: 7,
            luggageCapacity: 6,
            priceStandard: 850,
            priceVIP: 1250,
            features: ['Lüks Deri Koltuklar', 'Wi-Fi', 'İkram', 'Meet & Greet'],
          },
        ],
      },
    },
  });

  // 3. Antalya Airport to Belek
  const antalyaBelek = await prisma.airportTransfer.create({
    data: {
      name: 'Antalya Havalimanı - Belek',
      description: 'Golf ve lüks oteller bölgesi Belek\'e konforlu transfer hizmeti.',
      fromLocation: 'AYT',
      toLocation: 'Belek',
      distance: 35,
      duration: 45,
      region: 'Antalya',
      vehicles: {
        create: [
          {
            vehicleType: 'SEDAN',
            name: 'Standart Sedan',
            capacity: 3,
            luggageCapacity: 2,
            priceStandard: 350,
            priceVIP: 550,
            features: ['Klima', 'Konforlu Koltuklar'],
          },
          {
            vehicleType: 'LUXURY_SEDAN',
            name: 'Mercedes E-Class VIP',
            capacity: 3,
            luggageCapacity: 2,
            priceStandard: 650,
            priceVIP: 900,
            features: ['Premium İç Mekan', 'Wi-Fi', 'Su İkramı', 'Meet & Greet'],
          },
          {
            vehicleType: 'VAN',
            name: 'Standart Van',
            capacity: 7,
            luggageCapacity: 5,
            priceStandard: 500,
            priceVIP: 800,
            features: ['Geniş Bagaj Alanı', 'Klima'],
          },
          {
            vehicleType: 'LUXURY_VAN',
            name: 'Mercedes Vito VIP',
            capacity: 7,
            luggageCapacity: 6,
            priceStandard: 950,
            priceVIP: 1400,
            features: ['Premium İç Mekan', 'Wi-Fi', 'İkram', 'Meet & Greet', 'Uçuş Takibi'],
          },
        ],
      },
    },
  });

  // 4. Antalya Airport to Side
  const antalyaSide = await prisma.airportTransfer.create({
    data: {
      name: 'Antalya Havalimanı - Side',
      description: 'Antik Side bölgesine transfer hizmeti. Tarihi ve plajlarıyla ünlü.',
      fromLocation: 'AYT',
      toLocation: 'Side',
      distance: 65,
      duration: 75,
      region: 'Antalya',
      vehicles: {
        create: [
          {
            vehicleType: 'SEDAN',
            name: 'Standart Sedan',
            capacity: 3,
            luggageCapacity: 2,
            priceStandard: 450,
            priceVIP: 700,
            features: ['Klima', 'Konforlu Koltuklar'],
          },
          {
            vehicleType: 'LUXURY_SEDAN',
            name: 'BMW 5 Serisi VIP',
            capacity: 3,
            luggageCapacity: 2,
            priceStandard: 800,
            priceVIP: 1100,
            features: ['Premium İç Mekan', 'Wi-Fi', 'Su İkramı', 'Meet & Greet'],
          },
          {
            vehicleType: 'VAN',
            name: 'Standart Van',
            capacity: 8,
            luggageCapacity: 6,
            priceStandard: 650,
            priceVIP: 1000,
            features: ['Geniş Bagaj', 'Klima'],
          },
          {
            vehicleType: 'LUXURY_VAN',
            name: 'Mercedes Vito VIP',
            capacity: 7,
            luggageCapacity: 6,
            priceStandard: 1200,
            priceVIP: 1700,
            features: ['Lüks İç Mekan', 'Wi-Fi', 'İkram', 'Meet & Greet', 'Profesyonel Şoför'],
          },
        ],
      },
    },
  });

  // 5. Antalya Airport to Alanya (Most Popular!)
  const antalyaAlanya = await prisma.airportTransfer.create({
    data: {
      name: 'Antalya Havalimanı - Alanya',
      description: 'Antalya Havalimanından Alanya\'ya VIP ve standart transfer hizmetleri. En popüler rota!',
      fromLocation: 'AYT',
      toLocation: 'Alanya',
      distance: 125,
      duration: 120,
      region: 'Antalya-Alanya',
      vehicles: {
        create: [
          {
            vehicleType: 'SEDAN',
            name: 'Standart Sedan',
            capacity: 3,
            luggageCapacity: 2,
            priceStandard: 650,
            priceVIP: 1000,
            features: ['Klima', 'Konforlu Koltuklar', 'Bagaj Alanı'],
          },
          {
            vehicleType: 'LUXURY_SEDAN',
            name: 'Mercedes E-Class VIP',
            capacity: 3,
            luggageCapacity: 2,
            priceStandard: 1200,
            priceVIP: 1600,
            features: ['Premium İç Mekan', 'Wi-Fi', 'Su ve İkram', 'Telefon Şarjı', 'Meet & Greet', 'Uçuş Takibi'],
          },
          {
            vehicleType: 'VAN',
            name: 'Ford Transit',
            capacity: 8,
            luggageCapacity: 7,
            priceStandard: 850,
            priceVIP: 1300,
            features: ['Geniş Bagaj Alanı', 'Klima', 'USB Şarj Noktaları'],
          },
          {
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
              '7/24 Destek'
            ],
          },
          {
            vehicleType: 'MINIBUS',
            name: 'Mercedes Sprinter',
            capacity: 14,
            luggageCapacity: 10,
            priceStandard: 1100,
            priceVIP: 1600,
            features: ['Geniş İç Mekan', 'Klima', 'Bagaj Bölmesi'],
          },
        ],
      },
    },
  });

  // 6. Alanya Airport (GZP) to Alanya
  const alanyaCity = await prisma.airportTransfer.create({
    data: {
      name: 'Gazipaşa Havalimanı - Alanya',
      description: 'Gazipaşa-Alanya Havalimanından Alanya merkezine kısa mesafe transfer.',
      fromLocation: 'GZP',
      toLocation: 'Alanya',
      distance: 35,
      duration: 40,
      region: 'Alanya',
      vehicles: {
        create: [
          {
            vehicleType: 'SEDAN',
            name: 'Standart Sedan',
            capacity: 3,
            luggageCapacity: 2,
            priceStandard: 300,
            priceVIP: 500,
            features: ['Klima', 'Konforlu Koltuklar'],
          },
          {
            vehicleType: 'LUXURY_SEDAN',
            name: 'BMW 3 Serisi VIP',
            capacity: 3,
            luggageCapacity: 2,
            priceStandard: 550,
            priceVIP: 750,
            features: ['Premium İç Mekan', 'Wi-Fi', 'Meet & Greet'],
          },
          {
            vehicleType: 'VAN',
            name: 'Standart Van',
            capacity: 7,
            luggageCapacity: 5,
            priceStandard: 450,
            priceVIP: 700,
            features: ['Geniş Bagaj', 'Klima'],
          },
          {
            vehicleType: 'LUXURY_VAN',
            name: 'Mercedes Vito VIP',
            capacity: 7,
            luggageCapacity: 6,
            priceStandard: 850,
            priceVIP: 1200,
            features: ['Lüks İç Mekan', 'Wi-Fi', 'İkram', 'Meet & Greet'],
          },
        ],
      },
    },
  });

  // 7. Antalya districts transfers
  const antalyaKemer = await prisma.airportTransfer.create({
    data: {
      name: 'Antalya Havalimanı - Kemer',
      description: 'Kemer bölgesine transfer - doğa ve plajların buluştuğu nokta.',
      fromLocation: 'AYT',
      toLocation: 'Kemer',
      distance: 55,
      duration: 60,
      region: 'Antalya',
      vehicles: {
        create: [
          {
            vehicleType: 'SEDAN',
            name: 'Standart Sedan',
            capacity: 3,
            luggageCapacity: 2,
            priceStandard: 400,
            priceVIP: 650,
            features: ['Klima', 'Konforlu Koltuklar'],
          },
          {
            vehicleType: 'VAN',
            name: 'Standart Van',
            capacity: 8,
            luggageCapacity: 6,
            priceStandard: 600,
            priceVIP: 950,
            features: ['Geniş Bagaj', 'Klima'],
          },
          {
            vehicleType: 'LUXURY_VAN',
            name: 'Mercedes Vito VIP',
            capacity: 7,
            luggageCapacity: 6,
            priceStandard: 1100,
            priceVIP: 1600,
            features: ['Premium İç Mekan', 'Wi-Fi', 'İkram', 'Meet & Greet'],
          },
        ],
      },
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log(`Created 2 admin users`);
  console.log(`Created 7 airport transfer routes`);
  console.log(`Most popular: Antalya Airport -> Alanya (125km)`);

  // ===========================================
  // HOTELS - 30 Real Hotels in Turkish Riviera
  // ===========================================
  console.log('🏨 Creating hotels...');

  // ANTALYA HOTELS
  const rixosDowntown = await prisma.hotel.create({
    data: {
      name: 'Rixos Downtown Antalya',
      slug: 'rixos-downtown-antalya',
      description: 'Antalya şehir merkezinde modern ve lüks bir otel. Akdeniz manzaralı odalar, rooftop havuz, spa merkezi ve gurme restoranlar ile unutulmaz bir konaklama deneyimi sunuyor.',
      shortDescription: 'Şehir merkezinde ultra lüks 5 yıldızlı otel',
      city: 'Antalya',
      region: 'Antalya Merkez',
      address: 'Sakıp Sabancı Bulvarı, Kepez, Antalya',
      coordinates: { lat: 36.8969, lng: 30.7133 },
      distanceToAirport: 12,
      distanceToBeach: 8,
      distanceToCenter: 1,
      stars: 5,
      rating: 9.2,
      reviewCount: 1847,
      hotelType: 'CITY_HOTEL',
      yearBuilt: 2019,
      roomCount: 178,
      floorCount: 11,
      mainImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d'
      ],
      amenities: ['Wi-Fi', 'Spa', 'Fitness Center', 'Indoor Pool', 'Outdoor Pool', 'Restaurant', 'Bar', 'Room Service', 'Concierge'],
      facilities: ['Rooftop Pool', 'Turkish Bath', 'Sauna', 'Massage Rooms', 'Kids Club', 'Business Center', 'Meeting Rooms'],
      roomFeatures: ['Air Conditioning', 'Safe', 'Minibar', 'Smart TV', 'Coffee Machine', 'Balcony'],
      priceMin: 3500,
      priceMax: 12000,
      currency: 'TRY',
      phone: '+90 242 123 4567',
      email: 'info@rixosdowntown.com',
      website: 'https://rixos.com',
      isActive: true,
      isFeatured: true,
      isRecommended: true,
      rooms: {
        create: [
          {
            name: 'Deluxe Room',
            slug: 'deluxe-room',
            description: 'Modern tasarımlı 35 m² oda, şehir manzaralı',
            roomType: 'DELUXE',
            size: 35,
            bedType: 'King',
            maxOccupancy: 2,
            maxAdults: 2,
            maxChildren: 0,
            images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427'],
            amenities: ['City View', 'King Bed', 'Minibar', 'Safe', 'Smart TV'],
            view: ['City View'],
            pricePerNight: 3500,
            roomCount: 80,
            isAvailable: true,
            mealPlans: ['Room Only', 'Breakfast']
          },
          {
            name: 'Executive Suite',
            slug: 'executive-suite',
            description: 'Geniş 65 m² suit, oturma alanı ve Akdeniz manzaralı',
            roomType: 'SUITE',
            size: 65,
            bedType: 'King',
            maxOccupancy: 3,
            maxAdults: 2,
            maxChildren: 1,
            images: ['https://images.unsplash.com/photo-1582719508461-905c673771fd'],
            amenities: ['Sea View', 'Living Room', 'King Bed', 'Minibar', 'Nespresso Machine'],
            view: ['Sea View', 'City View'],
            pricePerNight: 7500,
            roomCount: 40,
            isAvailable: true,
            mealPlans: ['Breakfast', 'Half Board']
          }
        ]
      }
    }
  });

  const delphinBeOcean = await prisma.hotel.create({
    data: {
      name: 'Delphin Be Grand Resort',
      slug: 'delphin-be-grand-resort',
      description: 'Lara sahilinde all-inclusive lüks resort. 400 metre özel plaj, 7 restoran, aquapark ve çocuklar için eğlence merkezi. Aile tatili için ideal.',
      shortDescription: 'Lara\'da ultra her şey dahil sahil resort',
      city: 'Antalya',
      region: 'Lara',
      address: 'Güzeloba Mah., Lara, Antalya',
      coordinates: { lat: 36.8576, lng: 30.7815 },
      distanceToAirport: 15,
      distanceToBeach: 0,
      distanceToCenter: 12,
      stars: 5,
      rating: 8.9,
      reviewCount: 3241,
      hotelType: 'RESORT',
      yearBuilt: 2015,
      yearRenovated: 2022,
      roomCount: 528,
      floorCount: 8,
      mainImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
      images: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
        'https://images.unsplash.com/photo-1540541338287-41700207dee6'
      ],
      amenities: ['All Inclusive', 'Private Beach', 'Multiple Pools', 'Aquapark', 'Spa', 'Fitness', 'Kids Club', 'Animation'],
      facilities: ['7 Restaurants', '9 Bars', 'Aquapark', 'Turkish Bath', 'Sauna', 'Massage', 'Tennis Court', 'Mini Golf'],
      roomFeatures: ['Air Conditioning', 'Balcony', 'Safe', 'Minibar', 'Satellite TV'],
      priceMin: 8500,
      priceMax: 22000,
      currency: 'TRY',
      phone: '+90 242 352 6000',
      isActive: true,
      isFeatured: true,
      isRecommended: true,
      rooms: {
        create: [
          {
            name: 'Standard Room',
            slug: 'standard-room',
            description: '32 m² konforlu oda, bahçe manzaralı',
            roomType: 'STANDARD',
            size: 32,
            bedType: 'Queen',
            maxOccupancy: 3,
            maxAdults: 2,
            maxChildren: 1,
            amenities: ['Garden View', 'Balcony', 'Minibar', 'Safe'],
            view: ['Garden View'],
            pricePerNight: 8500,
            roomCount: 300,
            isAvailable: true,
            mealPlans: ['All Inclusive']
          },
          {
            name: 'Family Suite Sea View',
            slug: 'family-suite-sea-view',
            description: '55 m² aile suit, deniz manzaralı, 2 yatak odası',
            roomType: 'FAMILY',
            size: 55,
            bedType: 'King + Twin',
            maxOccupancy: 4,
            maxAdults: 2,
            maxChildren: 2,
            amenities: ['Sea View', 'Two Bedrooms', 'Balcony', 'Minibar'],
            view: ['Sea View'],
            pricePerNight: 15000,
            roomCount: 120,
            isAvailable: true,
            mealPlans: ['All Inclusive']
          }
        ]
      }
    }
  });

  const marmaraTalya = await prisma.hotel.create({
    data: {
      name: 'The Marmara Antalya',
      slug: 'the-marmara-antalya',
      description: 'Antalya\'nın kalbinde, Kaleiçi\'ne yakın butik otel. Akdeniz ve Toros Dağları manzarası, dönen oda konsepti ile ünlü. Romantik tatiller için mükemmel.',
      shortDescription: 'Panoramik manzaralı butik otel',
      city: 'Antalya',
      region: 'Antalya Merkez',
      address: 'Sirinyali Mah., Antalya',
      coordinates: { lat: 36.8845, lng: 30.7067 },
      distanceToAirport: 13,
      distanceToBeach: 0.5,
      distanceToCenter: 2,
      stars: 5,
      rating: 9.1,
      reviewCount: 892,
      hotelType: 'BOUTIQUE',
      yearBuilt: 2009,
      yearRenovated: 2020,
      roomCount: 238,
      floorCount: 12,
      mainImage: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
      images: ['https://images.unsplash.com/photo-1564501049412-61c2a3083791'],
      amenities: ['Infinity Pool', 'Spa', 'Fitness', 'Restaurant', 'Bar', 'Beach Access'],
      facilities: ['Rotating Rooms', 'Rooftop Bar', 'Private Beach', 'Spa Center'],
      roomFeatures: ['Panoramic Windows', 'Smart Room Control', 'Minibar', 'Safe'],
      priceMin: 4500,
      priceMax: 9000,
      currency: 'TRY',
      phone: '+90 242 249 3600',
      isActive: true,
      isFeatured: true,
      rooms: {
        create: [
          {
            name: 'Panoramic Room',
            slug: 'panoramic-room',
            description: '28 m² panoramik pencereli oda',
            roomType: 'DELUXE',
            size: 28,
            bedType: 'Queen',
            maxOccupancy: 2,
            maxAdults: 2,
            maxChildren: 0,
            amenities: ['Panoramic View', 'Minibar', 'Smart TV'],
            view: ['Sea View', 'Mountain View'],
            pricePerNight: 4500,
            roomCount: 180,
            isAvailable: true,
            mealPlans: ['Breakfast', 'Half Board']
          }
        ]
      }
    }
  });

  // BELEK HOTELS
  const regnum = await prisma.hotel.create({
    data: {
      name: 'Regnum Carya Golf & Spa Resort',
      slug: 'regnum-carya-golf-spa-resort',
      description: 'Belek\'in en lüks golf resort\'ü. Uluslararası şampiyonalık golf sahası, termal spa, 500 metre özel plaj. Golf tutkunları ve lüks tatil arayanlar için.',
      shortDescription: 'Golf sahası olan ultra lüks resort',
      city: 'Antalya',
      region: 'Belek',
      address: 'İskele Mevkii, Belek, Antalya',
      coordinates: { lat: 36.8625, lng: 31.0542 },
      distanceToAirport: 32,
      distanceToBeach: 0,
      distanceToCenter: 35,
      stars: 5,
      rating: 9.4,
      reviewCount: 2156,
      hotelType: 'RESORT',
      yearBuilt: 2006,
      yearRenovated: 2021,
      roomCount: 628,
      floorCount: 5,
      mainImage: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6',
      images: ['https://images.unsplash.com/photo-1596394516093-501ba68a0ba6'],
      amenities: ['Golf Course', 'Spa', 'Private Beach', 'Multiple Pools', 'All Inclusive', 'Fitness', 'Kids Club'],
      facilities: ['18-Hole Golf', 'Thermal Spa', '8 Restaurants', '11 Bars', 'Tennis Academy', 'Diving Center'],
      roomFeatures: ['Balcony', 'Minibar', 'Safe', 'Satellite TV', 'Jacuzzi in Suites'],
      priceMin: 12000,
      priceMax: 35000,
      currency: 'TRY',
      phone: '+90 242 710 1500',
      isActive: true,
      isFeatured: true,
      isRecommended: true,
      rooms: {
        create: [
          {
            name: 'Deluxe Golf View',
            slug: 'deluxe-golf-view',
            description: '42 m² golf sahası manzaralı oda',
            roomType: 'DELUXE',
            size: 42,
            bedType: 'King',
            maxOccupancy: 3,
            maxAdults: 2,
            maxChildren: 1,
            amenities: ['Golf View', 'Balcony', 'Minibar'],
            view: ['Golf View', 'Garden View'],
            pricePerNight: 12000,
            roomCount: 320,
            isAvailable: true,
            mealPlans: ['All Inclusive', 'Ultra All Inclusive']
          },
          {
            name: 'Presidential Villa',
            slug: 'presidential-villa',
            description: '250 m² özel villa, jakuzili, özel havuzlu',
            roomType: 'VILLA',
            size: 250,
            bedType: 'Multiple',
            maxOccupancy: 6,
            maxAdults: 4,
            maxChildren: 2,
            amenities: ['Private Pool', 'Jacuzzi', 'Butler Service', 'Golf Cart'],
            view: ['Golf View', 'Sea View'],
            pricePerNight: 35000,
            roomCount: 12,
            isAvailable: true,
            mealPlans: ['Ultra All Inclusive']
          }
        ]
      }
    }
  });

  const maxxRoyal = await prisma.hotel.create({
    data: {
      name: 'Maxx Royal Belek Golf Resort',
      slug: 'maxx-royal-belek-golf-resort',
      description: 'Dünyanın en iyi all-inclusive resort\'lerinden biri. Her detayda lüks, Michelin yıldızlı şef restoranlar, kişisel butler hizmeti, 500 metre altın kumsallı özel plaj.',
      shortDescription: 'Ultra lüks all-inclusive deneyimi',
      city: 'Antalya',
      region: 'Belek',
      address: 'Acısu Mevkii, Belek, Antalya',
      coordinates: { lat: 36.8583, lng: 31.0417 },
      distanceToAirport: 30,
      distanceToBeach: 0,
      distanceToCenter: 38,
      stars: 5,
      rating: 9.6,
      reviewCount: 4782,
      hotelType: 'RESORT',
      yearBuilt: 2013,
      yearRenovated: 2023,
      roomCount: 502,
      floorCount: 6,
      mainImage: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9',
      images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9'],
      amenities: ['Butler Service', 'Private Beach', 'Golf Course', 'Luxury Spa', 'Michelin Chef', 'Kids Club', 'All Inclusive'],
      facilities: ['10 Restaurants', '14 Bars', 'Aquapark', 'Thermal Spa', 'Tennis', 'Water Sports', 'Shopping Avenue'],
      roomFeatures: ['Butler Service', 'Balcony', 'Premium Minibar', 'Nespresso', 'Smart TV', 'Premium Toiletries'],
      priceMin: 18000,
      priceMax: 55000,
      currency: 'TRY',
      phone: '+90 242 715 1515',
      isActive: true,
      isFeatured: true,
      isRecommended: true,
      rooms: {
        create: [
          {
            name: 'Maxx Deluxe Room',
            slug: 'maxx-deluxe-room',
            description: '45 m² ultra lüks oda, her detay düşünülmüş',
            roomType: 'DELUXE',
            size: 45,
            bedType: 'King',
            maxOccupancy: 2,
            maxAdults: 2,
            maxChildren: 0,
            amenities: ['Butler Service', 'Sea View', 'Balcony', 'Premium Minibar'],
            view: ['Sea View'],
            pricePerNight: 18000,
            roomCount: 280,
            isAvailable: true,
            mealPlans: ['Ultra All Inclusive']
          },
          {
            name: 'Royal Villa',
            slug: 'royal-villa',
            description: '300 m² kraliyet villası, özel havuz, 24/7 butler',
            roomType: 'VILLA',
            size: 300,
            bedType: 'Multiple',
            maxOccupancy: 8,
            maxAdults: 4,
            maxChildren: 4,
            amenities: ['Private Pool', 'Butler 24/7', 'Private Garden', 'Golf Cart', 'Limousine Service'],
            view: ['Sea View', 'Garden View'],
            pricePerNight: 55000,
            roomCount: 8,
            isAvailable: true,
            mealPlans: ['Ultra All Inclusive']
          }
        ]
      }
    }
  });

  // ALANYA HOTELS
  const saphirResort = await prisma.hotel.create({
    data: {
      name: 'Saphir Resort & Spa',
      slug: 'saphir-resort-spa',
      description: 'Alanya Turkler bölgesinde modern all-inclusive resort. 300 metre özel plaj, aquapark, spa ve eğlence programları. Aileler için ideal.',
      shortDescription: 'Turkler\'de aile dostu resort',
      city: 'Alanya',
      region: 'Alanya',
      address: 'Türkler Mevkii, Alanya, Antalya',
      coordinates: { lat: 36.5145, lng: 31.7825 },
      distanceToAirport: 90,
      distanceToBeach: 0,
      distanceToCenter: 18,
      stars: 5,
      rating: 8.7,
      reviewCount: 2934,
      hotelType: 'RESORT',
      yearBuilt: 2016,
      roomCount: 456,
      floorCount: 7,
      mainImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945'],
      amenities: ['All Inclusive', 'Private Beach', 'Aquapark', 'Spa', 'Kids Club', 'Animation'],
      facilities: ['5 Restaurants', '7 Bars', 'Aquapark', 'Turkish Bath', 'Fitness', 'Mini Club'],
      roomFeatures: ['Balcony', 'Minibar', 'Safe', 'Satellite TV'],
      priceMin: 6500,
      priceMax: 18000,
      currency: 'TRY',
      phone: '+90 242 527 5000',
      isActive: true,
      isFeatured: true,
      rooms: {
        create: [
          {
            name: 'Standard Room',
            slug: 'standard-room',
            description: '28 m² deniz veya bahçe manzaralı oda',
            roomType: 'STANDARD',
            size: 28,
            bedType: 'Queen',
            maxOccupancy: 3,
            maxAdults: 2,
            maxChildren: 1,
            amenities: ['Balcony', 'Minibar', 'Safe'],
            view: ['Sea View', 'Garden View'],
            pricePerNight: 6500,
            roomCount: 320,
            isAvailable: true,
            mealPlans: ['All Inclusive']
          }
        ]
      }
    }
  });

  const grandPark = await prisma.hotel.create({
    data: {
      name: 'Grand Park Lara',
      slug: 'grand-park-lara',
      description: 'Lara sahilinde ailelere özel tasarlanmış resort. Geniş aquapark, çocuk kulübü, mini zoo ve zengin animasyon programları.',
      shortDescription: 'Çocuklu aileler için ideal resort',
      city: 'Antalya',
      region: 'Lara',
      address: 'Lara Turizm Yolu, Lara, Antalya',
      coordinates: { lat: 36.8456, lng: 30.7901 },
      distanceToAirport: 18,
      distanceToBeach: 0,
      distanceToCenter: 15,
      stars: 5,
      rating: 8.8,
      reviewCount: 4123,
      hotelType: 'RESORT',
      yearBuilt: 2017,
      roomCount: 612,
      floorCount: 9,
      mainImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
      images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb'],
      amenities: ['All Inclusive', 'Aquapark', 'Kids Club', 'Mini Zoo', 'Animation', 'Private Beach'],
      facilities: ['6 Restaurants', '9 Bars', 'Giant Aquapark', 'Kids Club', 'Teen Club', 'Mini Zoo'],
      roomFeatures: ['Family Rooms', 'Balcony', 'Minibar', 'Safe'],
      priceMin: 7500,
      priceMax: 19000,
      currency: 'TRY',
      isActive: true,
      rooms: {
        create: [
          {
            name: 'Family Room',
            slug: 'family-room',
            description: '38 m² geniş aile odası',
            roomType: 'FAMILY',
            size: 38,
            bedType: 'Queen + Sofa Bed',
            maxOccupancy: 4,
            maxAdults: 2,
            maxChildren: 2,
            amenities: ['Balcony', 'Minibar', 'Safe', 'Kids Amenities'],
            view: ['Sea View', 'Pool View'],
            pricePerNight: 10000,
            roomCount: 280,
            isAvailable: true,
            mealPlans: ['All Inclusive']
          }
        ]
      }
    }
  });

  // SIDE HOTELS
  const barut = await prisma.hotel.create({
    data: {
      name: 'Barut Hemera Resort',
      slug: 'barut-hemera-resort',
      description: 'Side\'de antik tiyatro manzaralı butik resort. Özel plaj, spa ve romantik atmosfer. Balayı çiftleri için popüler.',
      shortDescription: 'Romantik atmosferli butik resort',
      city: 'Antalya',
      region: 'Side',
      address: 'Side, Manavgat, Antalya',
      coordinates: { lat: 36.7674, lng: 31.3889 },
      distanceToAirport: 65,
      distanceToBeach: 0,
      distanceToCenter: 2,
      stars: 5,
      rating: 9.0,
      reviewCount: 1567,
      hotelType: 'RESORT',
      yearBuilt: 2018,
      roomCount: 298,
      floorCount: 5,
      mainImage: 'https://images.unsplash.com/photo-1549294413-26f195200c16',
      images: ['https://images.unsplash.com/photo-1549294413-26f195200c16'],
      amenities: ['All Inclusive', 'Private Beach', 'Spa', 'Adult Only Section', 'Fine Dining'],
      facilities: ['4 Restaurants', '6 Bars', 'Spa Center', 'Fitness', 'Water Sports'],
      roomFeatures: ['Balcony', 'Minibar', 'Safe', 'Premium Bedding'],
      priceMin: 8000,
      priceMax: 16000,
      currency: 'TRY',
      isActive: true,
      isFeatured: true,
      rooms: {
        create: [
          {
            name: 'Deluxe Room',
            slug: 'deluxe-room',
            description: '32 m² deniz manzaralı oda',
            roomType: 'DELUXE',
            size: 32,
            bedType: 'King',
            maxOccupancy: 2,
            maxAdults: 2,
            maxChildren: 0,
            amenities: ['Sea View', 'Balcony', 'Minibar'],
            view: ['Sea View'],
            pricePerNight: 8000,
            roomCount: 180,
            isAvailable: true,
            mealPlans: ['All Inclusive']
          }
        ]
      }
    }
  });

  // KEMER HOTELS
  const rixosKemer = await prisma.hotel.create({
    data: {
      name: 'Rixos Premium Tekirova',
      slug: 'rixos-premium-tekirova',
      description: 'Kemer Tekirova\'da dağ ve deniz buluşması. Kristal berraklığında deniz, pine forest, ultra lüks all-inclusive konsept.',
      shortDescription: 'Tekirova\'da premium all-inclusive',
      city: 'Antalya',
      region: 'Kemer',
      address: 'Tekirova, Kemer, Antalya',
      coordinates: { lat: 36.5129, lng: 30.5345 },
      distanceToAirport: 70,
      distanceToBeach: 0,
      distanceToCenter: 25,
      stars: 5,
      rating: 9.3,
      reviewCount: 3456,
      hotelType: 'RESORT',
      yearBuilt: 2014,
      yearRenovated: 2021,
      roomCount: 425,
      floorCount: 5,
      mainImage: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864',
      images: ['https://images.unsplash.com/photo-1561501900-3701fa6a0864'],
      amenities: ['Ultra All Inclusive', 'Private Beach', 'Pine Forest', 'Spa', 'Diving Center'],
      facilities: ['7 Restaurants', '10 Bars', 'Diving Center', 'Spa', 'Fitness', 'Kids Club'],
      roomFeatures: ['Balcony', 'Minibar', 'Safe', 'Premium Toiletries'],
      priceMin: 11000,
      priceMax: 28000,
      currency: 'TRY',
      isActive: true,
      isFeatured: true,
      rooms: {
        create: [
          {
            name: 'Deluxe Sea View',
            slug: 'deluxe-sea-view',
            description: '38 m² deniz manzaralı oda',
            roomType: 'DELUXE',
            size: 38,
            bedType: 'King',
            maxOccupancy: 3,
            maxAdults: 2,
            maxChildren: 1,
            amenities: ['Sea View', 'Balcony', 'Minibar'],
            view: ['Sea View', 'Mountain View'],
            pricePerNight: 11000,
            roomCount: 250,
            isAvailable: true,
            mealPlans: ['Ultra All Inclusive']
          }
        ]
      }
    }
  });

  // 10 MORE HOTELS - Quick additions
  await prisma.hotel.createMany({
    data: [
      {
        name: 'Titanic Beach Lara',
        slug: 'titanic-beach-lara',
        description: 'Titanik temalı muhteşem mimari, all-inclusive',
        shortDescription: 'Titanik temalı resort',
        city: 'Antalya',
        region: 'Lara',
        address: 'Lara, Antalya',
        stars: 5,
        rating: 8.6,
        reviewCount: 2845,
        hotelType: 'RESORT',
        roomCount: 586,
        mainImage: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
        amenities: ['All Inclusive', 'Private Beach', 'Aquapark'],
        facilities: ['6 Restaurants', '8 Bars'],
        roomFeatures: ['Balcony', 'Minibar'],
        priceMin: 7000,
        priceMax: 17000,
        isActive: true,
        distanceToAirport: 16,
        distanceToBeach: 0,
        distanceToCenter: 13
      },
      {
        name: 'Cornelia Diamond Golf Resort',
        slug: 'cornelia-diamond-golf-resort',
        description: 'Belek\'te golf ve spa resort',
        shortDescription: 'Elmas konseptli golf resort',
        city: 'Antalya',
        region: 'Belek',
        address: 'Belek, Antalya',
        stars: 5,
        rating: 9.1,
        reviewCount: 1987,
        hotelType: 'RESORT',
        roomCount: 532,
        mainImage: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
        amenities: ['Golf', 'Spa', 'All Inclusive'],
        facilities: ['Championship Golf Course', 'Spa'],
        roomFeatures: ['Balcony', 'Minibar'],
        priceMin: 13000,
        priceMax: 32000,
        isActive: true,
        isFeatured: true,
        distanceToAirport: 35,
        distanceToBeach: 0,
        distanceToCenter: 40
      },
      {
        name: 'Limak Lara Deluxe Hotel',
        slug: 'limak-lara-deluxe',
        description: 'Lara\'da aile dostu büyük resort',
        shortDescription: 'Geniş aquapark\'lı resort',
        city: 'Antalya',
        region: 'Lara',
        address: 'Lara, Antalya',
        stars: 5,
        rating: 8.5,
        reviewCount: 3567,
        hotelType: 'RESORT',
        roomCount: 696,
        mainImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
        amenities: ['All Inclusive', 'Giant Aquapark'],
        facilities: ['Aquapark', 'Kids Club'],
        roomFeatures: ['Balcony', 'Minibar'],
        priceMin: 6800,
        priceMax: 16500,
        isActive: true,
        distanceToAirport: 17,
        distanceToBeach: 0,
        distanceToCenter: 14
      },
      {
        name: 'Voyage Belek Golf & Spa',
        slug: 'voyage-belek-golf-spa',
        description: 'Belek\'te golf ve spa odaklı resort',
        shortDescription: 'Golf tutkunları için ideal',
        city: 'Antalya',
        region: 'Belek',
        address: 'Belek, Antalya',
        stars: 5,
        rating: 8.9,
        reviewCount: 2341,
        hotelType: 'RESORT',
        roomCount: 512,
        mainImage: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9',
        amenities: ['Golf', 'Spa', 'All Inclusive'],
        facilities: ['18-Hole Golf', 'Thermal Spa'],
        roomFeatures: ['Balcony', 'Minibar'],
        priceMin: 11500,
        priceMax: 27000,
        isActive: true,
        distanceToAirport: 33,
        distanceToBeach: 0,
        distanceToCenter: 36
      },
      {
        name: 'Crystal Sunset Luxury Resort',
        slug: 'crystal-sunset-luxury-resort',
        description: 'Side\'de ultra lüks all-inclusive',
        shortDescription: 'Premium deneyim',
        city: 'Antalya',
        region: 'Side',
        address: 'Side, Manavgat, Antalya',
        stars: 5,
        rating: 9.2,
        reviewCount: 1876,
        hotelType: 'RESORT',
        roomCount: 398,
        mainImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
        amenities: ['Ultra All Inclusive', 'Private Beach'],
        facilities: ['5 Restaurants', '8 Bars'],
        roomFeatures: ['Premium', 'Sea View'],
        priceMin: 12000,
        priceMax: 29000,
        isActive: true,
        isFeatured: true,
        distanceToAirport: 68,
        distanceToBeach: 0,
        distanceToCenter: 5
      },
      {
        name: 'Delphin Imperial Hotel Lara',
        slug: 'delphin-imperial-lara',
        description: 'Lara\'da Roma temalı lüks resort',
        shortDescription: 'Roma sarayı temalı',
        city: 'Antalya',
        region: 'Lara',
        address: 'Lara, Antalya',
        stars: 5,
        rating: 8.8,
        reviewCount: 2954,
        hotelType: 'RESORT',
        roomCount: 638,
        mainImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
        amenities: ['All Inclusive', 'Themed Architecture'],
        facilities: ['Roman Theme', 'Aquapark'],
        roomFeatures: ['Imperial Style', 'Balcony'],
        priceMin: 8200,
        priceMax: 19500,
        isActive: true,
        distanceToAirport: 15,
        distanceToBeach: 0,
        distanceToCenter: 12
      },
      {
        name: 'Gloria Serenity Resort',
        slug: 'gloria-serenity-resort',
        description: 'Belek\'te huzur dolu tatil',
        shortDescription: 'Sessiz ve lüks',
        city: 'Antalya',
        region: 'Belek',
        address: 'Belek, Antalya',
        stars: 5,
        rating: 9.0,
        reviewCount: 1765,
        hotelType: 'RESORT',
        roomCount: 442,
        mainImage: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6',
        amenities: ['All Inclusive', 'Golf', 'Spa'],
        facilities: ['Golf Course', 'Spa Center'],
        roomFeatures: ['Peaceful', 'Garden View'],
        priceMin: 10500,
        priceMax: 24000,
        isActive: true,
        distanceToAirport: 34,
        distanceToBeach: 0,
        distanceToCenter: 37
      },
      {
        name: 'Sueno Hotels Golf Belek',
        slug: 'sueno-hotels-golf-belek',
        description: 'Belek\'te golf odaklı dev resort kompleksi',
        shortDescription: 'Dev golf kompleksi',
        city: 'Antalya',
        region: 'Belek',
        address: 'Belek, Antalya',
        stars: 5,
        rating: 8.7,
        reviewCount: 3421,
        hotelType: 'RESORT',
        roomCount: 742,
        mainImage: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6',
        amenities: ['All Inclusive', 'Golf Academy'],
        facilities: ['2 Championship Courses', 'Golf Academy'],
        roomFeatures: ['Golf View', 'Balcony'],
        priceMin: 9500,
        priceMax: 23000,
        isActive: true,
        distanceToAirport: 36,
        distanceToBeach: 0,
        distanceToCenter: 39
      },
      {
        name: 'Kaya Palazzo Golf Resort',
        slug: 'kaya-palazzo-golf-resort',
        description: 'Belek\'te palace konseptli lüks otel',
        shortDescription: 'Saray gibi resort',
        city: 'Antalya',
        region: 'Belek',
        address: 'Belek, Antalya',
        stars: 5,
        rating: 9.1,
        reviewCount: 1543,
        hotelType: 'RESORT',
        roomCount: 328,
        mainImage: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9',
        amenities: ['Ultra All Inclusive', 'Palace Design'],
        facilities: ['Golf', 'Premium Spa'],
        roomFeatures: ['Palace Style', 'Premium'],
        priceMin: 14000,
        priceMax: 34000,
        isActive: true,
        isFeatured: true,
        distanceToAirport: 31,
        distanceToBeach: 0,
        distanceToCenter: 35
      },
      {
        name: 'Orange County Resort Hotel Kemer',
        slug: 'orange-county-resort-kemer',
        description: 'Kemer\'de aile dostu resort',
        shortDescription: 'Aileler için ideal',
        city: 'Antalya',
        region: 'Kemer',
        address: 'Kemer, Antalya',
        stars: 5,
        rating: 8.6,
        reviewCount: 2678,
        hotelType: 'RESORT',
        roomCount: 456,
        mainImage: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864',
        amenities: ['All Inclusive', 'Kids Friendly'],
        facilities: ['Kids Club', 'Aquapark'],
        roomFeatures: ['Family Rooms', 'Balcony'],
        priceMin: 7200,
        priceMax: 17500,
        isActive: true,
        distanceToAirport: 58,
        distanceToBeach: 0,
        distanceToCenter: 5
      },
      {
        name: 'Queen\'s Park Tekirova Resort',
        slug: 'queens-park-tekirova-resort',
        description: 'Tekirova\'da doğayla iç içe',
        shortDescription: 'Doğa içinde lüks',
        city: 'Antalya',
        region: 'Kemer',
        address: 'Tekirova, Kemer, Antalya',
        stars: 5,
        rating: 8.8,
        reviewCount: 1987,
        hotelType: 'RESORT',
        roomCount: 384,
        mainImage: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864',
        amenities: ['All Inclusive', 'Nature Setting'],
        facilities: ['Pine Forest', 'Private Beach'],
        roomFeatures: ['Nature View', 'Balcony'],
        priceMin: 8500,
        priceMax: 19000,
        isActive: true,
        distanceToAirport: 72,
        distanceToBeach: 0,
        distanceToCenter: 26
      },
      {
        name: 'Akra Hotel Antalya',
        slug: 'akra-hotel-antalya',
        description: 'Şehir merkezinde modern butik otel',
        shortDescription: 'Modern şehir oteli',
        city: 'Antalya',
        region: 'Antalya Merkez',
        address: 'Antalya Merkez',
        stars: 5,
        rating: 9.3,
        reviewCount: 1234,
        hotelType: 'CITY_HOTEL',
        roomCount: 198,
        mainImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
        amenities: ['City Center', 'Rooftop Pool'],
        facilities: ['Rooftop Bar', 'Spa'],
        roomFeatures: ['City View', 'Modern Design'],
        priceMin: 4200,
        priceMax: 9500,
        isActive: true,
        isFeatured: true,
        distanceToAirport: 11,
        distanceToBeach: 2,
        distanceToCenter: 0.5
      },
      {
        name: 'Euphoria Aegean Resort',
        slug: 'euphoria-aegean-resort',
        description: 'Side\'de her şey dahil resort',
        shortDescription: 'Konforlu tatil',
        city: 'Antalya',
        region: 'Side',
        address: 'Side, Manavgat',
        stars: 5,
        rating: 8.4,
        reviewCount: 2156,
        hotelType: 'RESORT',
        roomCount: 498,
        mainImage: 'https://images.unsplash.com/photo-1549294413-26f195200c16',
        amenities: ['All Inclusive', 'Animation'],
        facilities: ['5 Pools', 'Spa'],
        roomFeatures: ['Balcony', 'Sea View'],
        priceMin: 7500,
        priceMax: 16000,
        isActive: true,
        distanceToAirport: 64,
        distanceToBeach: 0,
        distanceToCenter: 8
      },
      {
        name: 'Selectum Luxury Resort Belek',
        slug: 'selectum-luxury-resort-belek',
        description: 'Belek\'te seçkin tatil',
        shortDescription: 'Premium all-inclusive',
        city: 'Antalya',
        region: 'Belek',
        address: 'Belek, Antalya',
        stars: 5,
        rating: 9.0,
        reviewCount: 1678,
        hotelType: 'RESORT',
        roomCount: 368,
        mainImage: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6',
        amenities: ['Premium All Inclusive', 'Adults Only'],
        facilities: ['Gourmet Restaurants', 'Spa'],
        roomFeatures: ['Premium', 'Sea View'],
        priceMin: 13500,
        priceMax: 28000,
        isActive: true,
        isFeatured: true,
        distanceToAirport: 32,
        distanceToBeach: 0,
        distanceToCenter: 38
      },
      {
        name: 'Paloma Grida Resort',
        slug: 'paloma-grida-resort',
        description: 'Belek\'te ailelere özel',
        shortDescription: 'Aile tatili',
        city: 'Antalya',
        region: 'Belek',
        address: 'Belek, Antalya',
        stars: 5,
        rating: 8.7,
        reviewCount: 2456,
        hotelType: 'RESORT',
        roomCount: 512,
        mainImage: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9',
        amenities: ['All Inclusive', 'Family Friendly'],
        facilities: ['Kids Village', 'Aquapark'],
        roomFeatures: ['Family Rooms', 'Balcony'],
        priceMin: 8800,
        priceMax: 20000,
        isActive: true,
        distanceToAirport: 35,
        distanceToBeach: 0,
        distanceToCenter: 38
      },
      {
        name: 'Ela Quality Resort Belek',
        slug: 'ela-quality-resort-belek',
        description: 'Belek\'te kaliteli hizmet',
        shortDescription: 'Kaliteli resort',
        city: 'Antalya',
        region: 'Belek',
        address: 'Belek, Antalya',
        stars: 5,
        rating: 8.9,
        reviewCount: 1876,
        hotelType: 'RESORT',
        roomCount: 456,
        mainImage: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6',
        amenities: ['All Inclusive', 'Quality Service'],
        facilities: ['Spa', 'Golf Nearby'],
        roomFeatures: ['Comfortable', 'Modern'],
        priceMin: 9200,
        priceMax: 21000,
        isActive: true,
        distanceToAirport: 34,
        distanceToBeach: 0,
        distanceToCenter: 37
      },
      {
        name: 'IC Hotels Santai',
        slug: 'ic-hotels-santai',
        description: 'Belek\'te modern konsept',
        shortDescription: 'Modern tatil deneyimi',
        city: 'Antalya',
        region: 'Belek',
        address: 'Belek, Antalya',
        stars: 5,
        rating: 8.8,
        reviewCount: 1654,
        hotelType: 'RESORT',
        roomCount: 412,
        mainImage: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9',
        amenities: ['All Inclusive', 'Modern Design'],
        facilities: ['Contemporary Dining', 'Spa'],
        roomFeatures: ['Modern', 'Comfortable'],
        priceMin: 8900,
        priceMax: 19500,
        isActive: true,
        distanceToAirport: 33,
        distanceToBeach: 0,
        distanceToCenter: 36
      },
      {
        name: 'Papillon Belvil Hotel Belek',
        slug: 'papillon-belvil-hotel-belek',
        description: 'Belek\'te villa konseptli resort',
        shortDescription: 'Villa tatili',
        city: 'Antalya',
        region: 'Belek',
        address: 'Belek, Antalya',
        stars: 5,
        rating: 8.6,
        reviewCount: 2234,
        hotelType: 'RESORT',
        roomCount: 386,
        mainImage: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6',
        amenities: ['All Inclusive', 'Villa Concept'],
        facilities: ['Private Villas', 'Beach Club'],
        roomFeatures: ['Villa Style', 'Private'],
        priceMin: 10200,
        priceMax: 24000,
        isActive: true,
        distanceToAirport: 35,
        distanceToBeach: 0,
        distanceToCenter: 38
      },
      {
        name: 'Titanic Mardan Palace',
        slug: 'titanic-mardan-palace',
        description: 'Lara\'da ihtişamlı palace otel',
        shortDescription: 'Efsane palace otel',
        city: 'Antalya',
        region: 'Lara',
        address: 'Lara, Antalya',
        stars: 5,
        rating: 9.4,
        reviewCount: 2987,
        hotelType: 'RESORT',
        roomCount: 546,
        mainImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
        amenities: ['Ultra Luxury', 'Palace Design'],
        facilities: ['Marble Everything', 'Luxury Spa'],
        roomFeatures: ['Palace Style', 'Opulent'],
        priceMin: 16000,
        priceMax: 45000,
        isActive: true,
        isFeatured: true,
        isRecommended: true,
        distanceToAirport: 14,
        distanceToBeach: 0,
        distanceToCenter: 11
      },
      {
        name: 'Calista Luxury Resort',
        slug: 'calista-luxury-resort',
        description: 'Belek\'te ultra lüks deneyim',
        shortDescription: 'Lüks ve konfor',
        city: 'Antalya',
        region: 'Belek',
        address: 'Belek, Antalya',
        stars: 5,
        rating: 9.2,
        reviewCount: 1765,
        hotelType: 'RESORT',
        roomCount: 498,
        mainImage: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9',
        amenities: ['Ultra All Inclusive', 'Luxury'],
        facilities: ['Fine Dining', 'Luxury Spa'],
        roomFeatures: ['Luxury', 'Premium'],
        priceMin: 14500,
        priceMax: 32000,
        isActive: true,
        isFeatured: true,
        distanceToAirport: 33,
        distanceToBeach: 0,
        distanceToCenter: 36
      }
    ]
  });

  const hotelCount = await prisma.hotel.count();
  console.log(`✅ Created ${hotelCount} hotels across Turkish Riviera`);
  console.log(`   - Antalya Center, Lara, Belek, Side, Kemer, Alanya regions`);
  console.log(`   - Price range: 3,500 - 55,000 TRY per night`);

  // ===========================================
  // FLIGHTS - Popular Routes to/from Antalya
  // ===========================================
  console.log('✈️ Creating flights...');

  // Helper function to create date
  const createFlightDate = (hoursFromNow: number) => {
    const date = new Date();
    date.setHours(date.getHours() + hoursFromNow);
    return date;
  };

  // TURKISH AIRLINES - Premium carrier
  await prisma.flight.createMany({
    data: [
      // Istanbul (IST) <-> Antalya (AYT)
      {
        flightNumber: 'TK2310',
        airline: 'Turkish Airlines',
        airlineCode: 'TK',
        departureAirport: 'IST',
        departureCity: 'İstanbul',
        departureTime: createFlightDate(24),
        arrivalAirport: 'AYT',
        arrivalCity: 'Antalya',
        arrivalCountry: 'Turkey',
        arrivalTime: createFlightDate(25.5),
        duration: 90,
        distance: 480,
        aircraft: 'Airbus A321',
        flightType: 'DOMESTIC',
        cabinClass: 'ECONOMY',
        priceAdult: 1200,
        priceChild: 900,
        priceInfant: 150,
        carryOnBaggage: '1x8kg',
        checkedBaggage: '1x23kg',
        availableSeats: 45,
        mealService: true,
        wifiAvailable: true,
        entertainmentSystem: true,
        isRefundable: true,
        cancellationFee: 200,
        isActive: true,
        operatingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      {
        flightNumber: 'TK2311',
        airline: 'Turkish Airlines',
        airlineCode: 'TK',
        departureAirport: 'AYT',
        departureCity: 'Antalya',
        departureTime: createFlightDate(48),
        arrivalAirport: 'IST',
        arrivalCity: 'İstanbul',
        arrivalCountry: 'Turkey',
        arrivalTime: createFlightDate(49.5),
        duration: 90,
        distance: 480,
        aircraft: 'Airbus A321',
        flightType: 'DOMESTIC',
        cabinClass: 'ECONOMY',
        priceAdult: 1250,
        priceChild: 950,
        priceInfant: 150,
        carryOnBaggage: '1x8kg',
        checkedBaggage: '1x23kg',
        availableSeats: 38,
        mealService: true,
        wifiAvailable: true,
        entertainmentSystem: true,
        isRefundable: true,
        cancellationFee: 200,
        isActive: true,
        operatingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      // Business Class
      {
        flightNumber: 'TK2320',
        airline: 'Turkish Airlines',
        airlineCode: 'TK',
        departureAirport: 'IST',
        departureCity: 'İstanbul',
        departureTime: createFlightDate(36),
        arrivalAirport: 'AYT',
        arrivalCity: 'Antalya',
        arrivalCountry: 'Turkey',
        arrivalTime: createFlightDate(37.5),
        duration: 90,
        distance: 480,
        aircraft: 'Boeing 737-800',
        flightType: 'DOMESTIC',
        cabinClass: 'BUSINESS',
        priceAdult: 3500,
        priceChild: 2800,
        priceInfant: 350,
        carryOnBaggage: '2x8kg',
        checkedBaggage: '2x32kg',
        availableSeats: 12,
        mealService: true,
        wifiAvailable: true,
        entertainmentSystem: true,
        powerOutlets: true,
        isRefundable: true,
        cancellationFee: 0,
        isActive: true,
        operatingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ]
  });

  // PEGASUS - Budget carrier
  await prisma.flight.createMany({
    data: [
      // Sabiha Gökçen (SAW) <-> Antalya (AYT)
      {
        flightNumber: 'PC2852',
        airline: 'Pegasus Airlines',
        airlineCode: 'PC',
        departureAirport: 'SAW',
        departureCity: 'İstanbul',
        departureTime: createFlightDate(30),
        arrivalAirport: 'AYT',
        arrivalCity: 'Antalya',
        arrivalCountry: 'Turkey',
        arrivalTime: createFlightDate(31.5),
        duration: 90,
        distance: 490,
        aircraft: 'Airbus A320neo',
        flightType: 'DOMESTIC',
        cabinClass: 'ECONOMY',
        priceAdult: 850,
        priceChild: 650,
        priceInfant: 100,
        carryOnBaggage: '1x8kg',
        checkedBaggage: '1x20kg',
        extraBaggagePrice: 150,
        availableSeats: 67,
        mealService: false,
        wifiAvailable: false,
        isRefundable: false,
        changeFee: 150,
        isActive: true,
        operatingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      {
        flightNumber: 'PC2853',
        airline: 'Pegasus Airlines',
        airlineCode: 'PC',
        departureAirport: 'AYT',
        departureCity: 'Antalya',
        departureTime: createFlightDate(54),
        arrivalAirport: 'SAW',
        arrivalCity: 'İstanbul',
        arrivalCountry: 'Turkey',
        arrivalTime: createFlightDate(55.5),
        duration: 90,
        distance: 490,
        aircraft: 'Airbus A320neo',
        flightType: 'DOMESTIC',
        cabinClass: 'ECONOMY',
        priceAdult: 900,
        priceChild: 700,
        priceInfant: 100,
        carryOnBaggage: '1x8kg',
        checkedBaggage: '1x20kg',
        extraBaggagePrice: 150,
        availableSeats: 58,
        mealService: false,
        wifiAvailable: false,
        isRefundable: false,
        changeFee: 150,
        isActive: true,
        operatingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      // Ankara (ESB) <-> Antalya (AYT)
      {
        flightNumber: 'PC2704',
        airline: 'Pegasus Airlines',
        airlineCode: 'PC',
        departureAirport: 'ESB',
        departureCity: 'Ankara',
        departureTime: createFlightDate(42),
        arrivalAirport: 'AYT',
        arrivalCity: 'Antalya',
        arrivalCountry: 'Turkey',
        arrivalTime: createFlightDate(43),
        duration: 60,
        distance: 320,
        aircraft: 'Boeing 737-800',
        flightType: 'DOMESTIC',
        cabinClass: 'ECONOMY',
        priceAdult: 750,
        priceChild: 550,
        priceInfant: 80,
        carryOnBaggage: '1x8kg',
        checkedBaggage: '1x20kg',
        availableSeats: 72,
        mealService: false,
        isRefundable: false,
        isActive: true,
        operatingDays: ['Mon', 'Wed', 'Fri', 'Sun']
      }
    ]
  });

  // SUNEXPRESS - Hybrid carrier
  await prisma.flight.createMany({
    data: [
      // Izmir (ADB) <-> Antalya (AYT)
      {
        flightNumber: 'XQ252',
        airline: 'SunExpress',
        airlineCode: 'XQ',
        departureAirport: 'ADB',
        departureCity: 'İzmir',
        departureTime: createFlightDate(60),
        arrivalAirport: 'AYT',
        arrivalCity: 'Antalya',
        arrivalCountry: 'Turkey',
        arrivalTime: createFlightDate(61),
        duration: 60,
        distance: 280,
        aircraft: 'Boeing 737-800',
        flightType: 'DOMESTIC',
        cabinClass: 'ECONOMY',
        priceAdult: 950,
        priceChild: 750,
        priceInfant: 120,
        carryOnBaggage: '1x8kg',
        checkedBaggage: '1x20kg',
        availableSeats: 54,
        mealService: true,
        wifiAvailable: false,
        isRefundable: true,
        cancellationFee: 150,
        isActive: true,
        operatingDays: ['Tue', 'Thu', 'Sat']
      },
      // International: Frankfurt (FRA) -> Antalya (AYT)
      {
        flightNumber: 'XQ150',
        airline: 'SunExpress',
        airlineCode: 'XQ',
        departureAirport: 'FRA',
        departureCity: 'Frankfurt',
        departureCountry: 'Germany',
        departureTime: createFlightDate(72),
        arrivalAirport: 'AYT',
        arrivalCity: 'Antalya',
        arrivalCountry: 'Turkey',
        arrivalTime: createFlightDate(75.5),
        duration: 210,
        distance: 2150,
        aircraft: 'Boeing 737 MAX 8',
        flightType: 'INTERNATIONAL',
        cabinClass: 'ECONOMY',
        priceAdult: 4500,
        priceChild: 3500,
        priceInfant: 450,
        carryOnBaggage: '1x8kg',
        checkedBaggage: '1x23kg',
        availableSeats: 89,
        mealService: true,
        wifiAvailable: true,
        entertainmentSystem: true,
        isRefundable: true,
        cancellationFee: 800,
        isActive: true,
        operatingDays: ['Mon', 'Wed', 'Fri', 'Sun']
      },
      // International: Munich (MUC) -> Antalya (AYT)
      {
        flightNumber: 'XQ124',
        airline: 'SunExpress',
        airlineCode: 'XQ',
        departureAirport: 'MUC',
        departureCity: 'Munich',
        departureCountry: 'Germany',
        departureTime: createFlightDate(84),
        arrivalAirport: 'AYT',
        arrivalCity: 'Antalya',
        arrivalCountry: 'Turkey',
        arrivalTime: createFlightDate(87.5),
        duration: 210,
        distance: 2080,
        aircraft: 'Airbus A321',
        flightType: 'INTERNATIONAL',
        cabinClass: 'ECONOMY',
        priceAdult: 4800,
        priceChild: 3800,
        priceInfant: 480,
        carryOnBaggage: '1x8kg',
        checkedBaggage: '1x23kg',
        availableSeats: 76,
        mealService: true,
        wifiAvailable: true,
        isRefundable: true,
        cancellationFee: 900,
        isActive: true,
        operatingDays: ['Tue', 'Thu', 'Sat']
      }
    ]
  });

  // ANADOLUJET - Budget THY subsidiary
  await prisma.flight.createMany({
    data: [
      // Ankara (ESB) <-> Antalya (AYT)
      {
        flightNumber: 'AJ1814',
        airline: 'AnadoluJet',
        airlineCode: 'AJ',
        departureAirport: 'ESB',
        departureCity: 'Ankara',
        departureTime: createFlightDate(96),
        arrivalAirport: 'AYT',
        arrivalCity: 'Antalya',
        arrivalCountry: 'Turkey',
        arrivalTime: createFlightDate(97),
        duration: 60,
        distance: 320,
        aircraft: 'Boeing 737-800',
        flightType: 'DOMESTIC',
        cabinClass: 'ECONOMY',
        priceAdult: 700,
        priceChild: 500,
        priceInfant: 70,
        carryOnBaggage: '1x8kg',
        checkedBaggage: '1x15kg',
        extraBaggagePrice: 100,
        availableSeats: 82,
        mealService: false,
        isRefundable: false,
        changeFee: 100,
        isActive: true,
        operatingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      // Trabzon (TZX) -> Antalya (AYT)
      {
        flightNumber: 'AJ1542',
        airline: 'AnadoluJet',
        airlineCode: 'AJ',
        departureAirport: 'TZX',
        departureCity: 'Trabzon',
        departureTime: createFlightDate(108),
        arrivalAirport: 'AYT',
        arrivalCity: 'Antalya',
        arrivalCountry: 'Turkey',
        arrivalTime: createFlightDate(110),
        duration: 120,
        distance: 720,
        aircraft: 'Boeing 737-800',
        flightType: 'DOMESTIC',
        cabinClass: 'ECONOMY',
        priceAdult: 1100,
        priceChild: 850,
        priceInfant: 110,
        carryOnBaggage: '1x8kg',
        checkedBaggage: '1x15kg',
        availableSeats: 64,
        mealService: false,
        isRefundable: false,
        isActive: true,
        operatingDays: ['Mon', 'Wed', 'Fri']
      }
    ]
  });

  const flightCount = await prisma.flight.count();
  console.log(`✅ Created ${flightCount} flights`);
  console.log(`   - Turkish Airlines (TK): Premium full service`);
  console.log(`   - Pegasus (PC): Budget friendly`);
  console.log(`   - SunExpress (XQ): Domestic & International`);
  console.log(`   - AnadoluJet (AJ): Budget THY subsidiary`);
  console.log(`   - Routes: IST, SAW, ESB, ADB, TZX <-> AYT`);
  console.log(`   - International: FRA, MUC -> AYT`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
