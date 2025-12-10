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
    await prisma.transferBooking.deleteMany();
    await prisma.transferVehicle.deleteMany();
    await prisma.airportTransfer.deleteMany();
    await prisma.admin.deleteMany();
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
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
