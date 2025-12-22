/**
 * 🌱 Travel Ailydian Enterprise - Production Seed Data
 *
 * This seed file creates initial data for all 15+ features:
 * - Admin & Test Users
 * - Ailydian Miles Loyalty Accounts
 * - Hotels, Cars, Tours
 * - Reviews & Ratings
 * - Partner Profiles
 * - SEO Landing Pages
 * - Miles Transactions
 * - Virtual Tours
 * - WhatsApp Conversations (sample)
 *
 * Run with: npx prisma db seed
 */

import { PrismaClient, LoyaltyTier, PartnerType, SEOPageType, PanoramaType, HotspotType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('\n' + '='.repeat(60));
  console.log('🌱  TRAVEL AILYDIAN ENTERPRISE - DATABASE SEED');
  console.log('='.repeat(60) + '\n');

  // ============================================
  // 1. CREATE ADMIN USER
  // ============================================
  console.log('👤 Creating admin user...');

  const adminPassword = await bcrypt.hash('Admin123!', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ailydian.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@ailydian.com',
      password: adminPassword,
      role: 'ADMIN',
      emailVerified: new Date(),
      phone: '+905551234567',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    },
  });

  console.log(`   ✅ Admin user: ${admin.email} (password: Admin123!)`);

  // ============================================
  // 2. CREATE TEST USERS
  // ============================================
  console.log('\n👥 Creating test users...');

  const testUsers = await Promise.all([
    prisma.user.upsert({
      where: { email: 'ayse@example.com' },
      update: {},
      create: {
        name: 'Ayşe Yılmaz',
        email: 'ayse@example.com',
        password: await bcrypt.hash('User123!', 12),
        emailVerified: new Date(),
        phone: '+905551234568',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ayse',
        role: 'USER',
      },
    }),
    prisma.user.upsert({
      where: { email: 'mehmet@example.com' },
      update: {},
      create: {
        name: 'Mehmet Demir',
        email: 'mehmet@example.com',
        password: await bcrypt.hash('User123!', 12),
        emailVerified: new Date(),
        phone: '+905551234569',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mehmet',
        role: 'USER',
      },
    }),
    prisma.user.upsert({
      where: { email: 'zeynep@example.com' },
      update: {},
      create: {
        name: 'Zeynep Kaya',
        email: 'zeynep@example.com',
        password: await bcrypt.hash('User123!', 12),
        emailVerified: new Date(),
        phone: '+905551234570',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zeynep',
        role: 'USER',
      },
    }),
  ]);

  console.log(`   ✅ Created ${testUsers.length} test users`);

  // ============================================
  // 3. CREATE AILYDIAN MILES ACCOUNTS
  // ============================================
  console.log('\n💎 Creating Ailydian Miles loyalty accounts...');

  const milesAccounts = await Promise.all([
    prisma.ailydianMilesAccount.upsert({
      where: { userId: testUsers[0].id },
      update: {},
      create: {
        userId: testUsers[0].id,
        totalEarned: 5000,
        totalSpent: 1000,
        currentBalance: 4000,
        tier: LoyaltyTier.GOLD,
        tierProgress: 4000,
        lifetimeBookings: 5,
        lifetimeValue: 25000,
      },
    }),
    prisma.ailydianMilesAccount.upsert({
      where: { userId: testUsers[1].id },
      update: {},
      create: {
        userId: testUsers[1].id,
        totalEarned: 800,
        totalSpent: 200,
        currentBalance: 600,
        tier: LoyaltyTier.BRONZE,
        tierProgress: 600,
        lifetimeBookings: 2,
        lifetimeValue: 8000,
      },
    }),
    prisma.ailydianMilesAccount.upsert({
      where: { userId: testUsers[2].id },
      update: {},
      create: {
        userId: testUsers[2].id,
        totalEarned: 12000,
        totalSpent: 3000,
        currentBalance: 9000,
        tier: LoyaltyTier.GOLD,
        tierProgress: 9000,
        lifetimeBookings: 10,
        lifetimeValue: 60000,
      },
    }),
  ]);

  console.log(`   ✅ Created ${milesAccounts.length} miles accounts`);
  console.log(`      • GOLD tier: ${testUsers[0].name} (4,000 miles)`);
  console.log(`      • BRONZE tier: ${testUsers[1].name} (600 miles)`);
  console.log(`      • GOLD tier: ${testUsers[2].name} (9,000 miles)`);

  // ============================================
  // 4. CREATE HOTELS
  // ============================================
  console.log('\n🏨 Creating hotels...');

  const hotels = [
    {
      name: 'Grand Hilton Istanbul',
      slug: 'grand-hilton-istanbul',
      description: 'Lüks 5 yıldızlı otel Taksim\'de, muhteşem Boğaz manzarası ile.',
      city: 'Istanbul',
      country: 'Turkey',
      address: 'Harbiye, Cumhuriyet Cd., 34367 Şişli/İstanbul',
      rating: 4.8,
      stars: 5,
      pricePerNight: 2500,
      currency: 'TRY',
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      ],
      amenities: ['wifi', 'pool', 'spa', 'gym', 'restaurant', 'bar', 'parking', 'room-service'],
      latitude: 41.0376,
      longitude: 28.9869,
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'Swissotel The Bosphorus',
      slug: 'swissotel-bosphorus-istanbul',
      description: 'Beşiktaş\'ta Boğaz kıyısında, zarif ve modern 5 yıldızlı otel.',
      city: 'Istanbul',
      country: 'Turkey',
      address: 'Visnezade Mah. Acisu Sok. No:19, Macka, Besiktas',
      rating: 4.7,
      stars: 5,
      pricePerNight: 3200,
      currency: 'TRY',
      images: [
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
      ],
      amenities: ['wifi', 'pool', 'spa', 'gym', 'restaurant', 'bar', 'concierge'],
      latitude: 41.0486,
      longitude: 29.0031,
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'Rixos Premium Belek',
      slug: 'rixos-premium-belek',
      description: 'Her şey dahil lüks resort, Antalya Belek\'te harika plaj ile.',
      city: 'Antalya',
      country: 'Turkey',
      address: 'Belek Turizm Merkezi, 07506 Belek/Antalya',
      rating: 4.9,
      stars: 5,
      pricePerNight: 4500,
      currency: 'TRY',
      images: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
        'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800',
      ],
      amenities: ['wifi', 'pool', 'beach', 'spa', 'gym', 'restaurant', 'bar', 'kids-club', 'water-park'],
      latitude: 36.8629,
      longitude: 31.0546,
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'Maxx Royal Kemer Resort',
      slug: 'maxx-royal-kemer-resort',
      description: 'Ultra lüks her şey dahil resort, muhteşem hizmet ve yemekler.',
      city: 'Antalya',
      country: 'Turkey',
      address: 'Beldibi Mah. Başkomutan Atatürk Cad. No:104, 07985 Kemer/Antalya',
      rating: 5.0,
      stars: 5,
      pricePerNight: 8500,
      currency: 'TRY',
      images: [
        'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
      ],
      amenities: ['wifi', 'pool', 'beach', 'spa', 'gym', 'restaurant', 'bar', 'kids-club', 'concierge', 'butler'],
      latitude: 36.5940,
      longitude: 30.5606,
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'Çırağan Palace Kempinski',
      slug: 'ciragan-palace-kempinski-istanbul',
      description: 'Tarihi Osmanlı sarayı, ultra lüks 5 yıldızlı otel.',
      city: 'Istanbul',
      country: 'Turkey',
      address: 'Çırağan Cd. No:32, 34349 Beşiktaş/İstanbul',
      rating: 4.9,
      stars: 5,
      pricePerNight: 12000,
      currency: 'TRY',
      images: [
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
        'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800',
      ],
      amenities: ['wifi', 'pool', 'spa', 'gym', 'restaurant', 'bar', 'concierge', 'butler', 'yacht'],
      latitude: 41.0476,
      longitude: 29.0335,
      isActive: true,
      isFeatured: true,
    },
  ];

  const createdHotels = await Promise.all(
    hotels.map((hotel) =>
      prisma.hotel.upsert({
        where: { slug: hotel.slug },
        update: {},
        create: hotel,
      })
    )
  );

  console.log(`   ✅ Created ${createdHotels.length} hotels`);

  // ============================================
  // 5. CREATE CARS
  // ============================================
  console.log('\n🚗 Creating rental cars...');

  const cars = [
    {
      name: 'Mercedes-Benz E-Class',
      slug: 'mercedes-benz-e-class-istanbul',
      brand: 'Mercedes-Benz',
      model: 'E-Class',
      year: 2023,
      category: 'Luxury',
      pricePerDay: 850,
      currency: 'TRY',
      location: 'Istanbul',
      transmission: 'Automatic',
      fuelType: 'Diesel',
      seats: 5,
      doors: 4,
      airConditioning: true,
      features: ['GPS', 'Leather Seats', 'Bluetooth', 'Cruise Control'],
      images: [
        'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
      ],
      rating: 4.8,
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'BMW 5 Series',
      slug: 'bmw-5-series-istanbul',
      brand: 'BMW',
      model: '5 Series',
      year: 2024,
      category: 'Luxury',
      pricePerDay: 900,
      currency: 'TRY',
      location: 'Istanbul',
      transmission: 'Automatic',
      fuelType: 'Hybrid',
      seats: 5,
      doors: 4,
      airConditioning: true,
      features: ['GPS', 'Leather Seats', 'Bluetooth', 'Parking Sensors'],
      images: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
      ],
      rating: 4.9,
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'Volkswagen Passat',
      slug: 'vw-passat-ankara',
      brand: 'Volkswagen',
      model: 'Passat',
      year: 2023,
      category: 'Standard',
      pricePerDay: 450,
      currency: 'TRY',
      location: 'Ankara',
      transmission: 'Automatic',
      fuelType: 'Diesel',
      seats: 5,
      doors: 4,
      airConditioning: true,
      features: ['GPS', 'Bluetooth', 'USB'],
      images: [
        'https://images.unsplash.com/photo-1493238792000-8113da705763?w=800',
      ],
      rating: 4.5,
      isActive: true,
      isFeatured: false,
    },
    {
      name: 'Renault Clio',
      slug: 'renault-clio-izmir',
      brand: 'Renault',
      model: 'Clio',
      year: 2023,
      category: 'Economy',
      pricePerDay: 250,
      currency: 'TRY',
      location: 'Izmir',
      transmission: 'Manual',
      fuelType: 'Petrol',
      seats: 5,
      doors: 4,
      airConditioning: true,
      features: ['Bluetooth', 'USB'],
      images: [
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
      ],
      rating: 4.3,
      isActive: true,
      isFeatured: false,
    },
  ];

  const createdCars = await Promise.all(
    cars.map((car) =>
      prisma.car.upsert({
        where: { slug: car.slug },
        update: {},
        create: car,
      })
    )
  );

  console.log(`   ✅ Created ${createdCars.length} rental cars`);

  // ============================================
  // 6. CREATE TOURS
  // ============================================
  console.log('\n🎫 Creating tours...');

  const tours = [
    {
      name: 'Istanbul Historical Tour',
      slug: 'istanbul-historical-tour',
      description: 'Tarihi yarımadada Sultanahmet, Ayasofya, Topkapı Sarayı ve Kapalıçarşı turu.',
      city: 'Istanbul',
      country: 'Turkey',
      duration: 480,
      price: 450,
      currency: 'TRY',
      category: 'Cultural',
      images: [
        'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800',
      ],
      highlights: [
        'Sultanahmet Camii',
        'Ayasofya',
        'Topkapı Sarayı',
        'Kapalıçarşı',
        'Yerebatan Sarnıcı',
      ],
      included: ['Professional guide', 'Lunch', 'Museum tickets', 'Transportation'],
      rating: 4.8,
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'Cappadocia Hot Air Balloon',
      slug: 'cappadocia-hot-air-balloon',
      description: 'Kapadokya\'da gün doğumunda sıcak hava balonu turu, eşsiz bir deneyim.',
      city: 'Nevsehir',
      country: 'Turkey',
      duration: 180,
      price: 1200,
      currency: 'TRY',
      category: 'Adventure',
      images: [
        'https://images.unsplash.com/photo-1525088553704-2a1579f8f88f?w=800',
      ],
      highlights: [
        '1 saat balon uçuşu',
        'Gün doğumu manzarası',
        'Şampanya servisi',
        'Uçuş sertifikası',
      ],
      included: ['Hot air balloon flight', 'Hotel pick-up', 'Champagne', 'Flight certificate'],
      rating: 5.0,
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'Pamukkale & Hierapolis Tour',
      slug: 'pamukkale-hierapolis-tour',
      description: 'Pamukkale travertenleri ve antik Hierapolis şehri tam gün turu.',
      city: 'Denizli',
      country: 'Turkey',
      duration: 600,
      price: 380,
      currency: 'TRY',
      category: 'Nature',
      images: [
        'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800',
      ],
      highlights: [
        'Pamukkale travertenleri',
        'Hierapolis antik kenti',
        'Kleopatra havuzu',
        'Antik tiyatro',
      ],
      included: ['Professional guide', 'Lunch', 'Museum tickets', 'Transportation'],
      rating: 4.7,
      isActive: true,
      isFeatured: true,
    },
  ];

  const createdTours = await Promise.all(
    tours.map((tour) =>
      prisma.tour.upsert({
        where: { slug: tour.slug },
        update: {},
        create: tour,
      })
    )
  );

  console.log(`   ✅ Created ${createdTours.length} tours`);

  // ============================================
  // 7. CREATE REVIEWS
  // ============================================
  console.log('\n⭐ Creating reviews...');

  const reviews = [
    {
      userId: testUsers[0].id,
      listingType: 'hotel',
      listingId: createdHotels[0].id,
      rating: 5,
      title: 'Muhteşem konaklama!',
      comment: 'Otel çok temizdi, personel son derece ilgiliydi. Boğaz manzarası harika. Kesinlikle tekrar geleceğim.',
      isVerified: true,
    },
    {
      userId: testUsers[1].id,
      listingType: 'hotel',
      listingId: createdHotels[0].id,
      rating: 4,
      title: 'Çok güzeldi',
      comment: 'Konum mükemmel, kahvaltı çeşitleri çok iyi. Tek eksi spa biraz küçüktü.',
      isVerified: true,
    },
    {
      userId: testUsers[2].id,
      listingType: 'car',
      listingId: createdCars[0].id,
      rating: 5,
      title: 'Harika araç',
      comment: 'Mercedes çok konforlu ve temizdi. Teslimat ve iade işlemleri çok hızlıydı.',
      isVerified: true,
    },
    {
      userId: testUsers[0].id,
      listingType: 'tour',
      listingId: createdTours[0].id,
      rating: 5,
      title: 'Unutulmaz bir gün',
      comment: 'Rehberimiz çok bilgiliydi, tarihi yerler hakkında harika bilgiler verdi. Öğle yemeği de çok lezzetliydi.',
      isVerified: true,
    },
  ];

  const createdReviews = await Promise.all(
    reviews.map((review) =>
      prisma.review.create({
        data: review,
      })
    )
  );

  console.log(`   ✅ Created ${createdReviews.length} reviews`);

  // ============================================
  // 8. CREATE PARTNER PROFILES
  // ============================================
  console.log('\n🤝 Creating partner profiles...');

  const partnerUser = await prisma.user.upsert({
    where: { email: 'partner@example.com' },
    update: {},
    create: {
      name: 'Hotel Partner',
      email: 'partner@example.com',
      password: await bcrypt.hash('Partner123!', 12),
      emailVerified: new Date(),
      phone: '+905551234571',
      role: 'PARTNER',
    },
  });

  const partnerProfile = await prisma.partnerProfile.upsert({
    where: { userId: partnerUser.id },
    update: {},
    create: {
      userId: partnerUser.id,
      businessName: 'Grand Hotels Group',
      businessType: PartnerType.HOTEL_MANAGER,
      taxId: '1234567890',
      licenseNumber: 'HTL-2024-001',
      contactPerson: 'Ahmet Yılmaz',
      phone: '+905551234571',
      email: 'partner@example.com',
      address: 'Taksim, Istanbul',
      isVerified: true,
      verifiedAt: new Date(),
      bankName: 'İş Bankası',
      accountNumber: '1234567890',
      iban: 'TR330006100519786457841326',
      totalListings: 2,
      totalBookings: 50,
      totalRevenue: 125000,
      rating: 4.8,
      isActive: true,
    },
  });

  console.log(`   ✅ Partner profile: ${partnerProfile.businessName}`);

  // ============================================
  // 9. CREATE SEO LANDING PAGES
  // ============================================
  console.log('\n🔍 Creating SEO landing pages...');

  const seoPages = [
    {
      slug: 'istanbul-otelleri',
      title: 'Istanbul Otelleri - En İyi Fiyatlarla Otel Rezervasyonu',
      description: 'Istanbul\'da otel mi arıyorsunuz? 500+ otel arasından size en uygun oteli bulun. Ücretsiz iptal, en iyi fiyat garantisi.',
      metaTitle: 'Istanbul Otelleri - Uygun Fiyatlı Otel Rezervasyonu | Ailydian',
      metaDescription: 'Istanbul\'da 500+ otelden en uygununu seçin. Taksim, Sultanahmet, Kadıköy ve tüm semtlerde oteller. Hemen rezervasyon yapın!',
      keywords: ['istanbul otelleri', 'istanbul otel rezervasyonu', 'uygun otel istanbul'],
      pageType: SEOPageType.CITY_HOTELS,
      category: 'hotels',
      filters: JSON.stringify({ city: 'Istanbul' }),
      h1: 'Istanbul Otelleri',
      content: 'Istanbul\'da konaklama için en iyi otelleri keşfedin. Boğaz manzaralı oteller, butik oteller, lüks 5 yıldızlı oteller ve bütçe dostu seçenekler...',
      isActive: true,
    },
    {
      slug: 'antalya-otelleri',
      title: 'Antalya Otelleri - Her Şey Dahil Tatil Otelleri',
      description: 'Antalya\'da her şey dahil tatil otelleri. Belek, Kemer, Side, Alanya\'da 300+ otel seçeneği. En iyi fiyat garantisi.',
      metaTitle: 'Antalya Otelleri - Her Şey Dahil Tatil | Ailydian',
      metaDescription: 'Antalya\'da denize sıfır oteller, her şey dahil tatil köyleri. Belek, Kemer, Side otelleri en uygun fiyatlarla!',
      keywords: ['antalya otelleri', 'her şey dahil antalya', 'antalya tatil'],
      pageType: SEOPageType.CITY_HOTELS,
      category: 'hotels',
      filters: JSON.stringify({ city: 'Antalya' }),
      h1: 'Antalya Otelleri',
      content: 'Antalya\'da unutulmaz bir tatil için en iyi otelleri keşfedin. Her şey dahil sistemde lüks resort oteller, butik oteller ve aile otelleri...',
      isActive: true,
    },
    {
      slug: 'istanbul-arac-kiralama',
      title: 'Istanbul Araç Kiralama - Uygun Fiyatlarla Rent A Car',
      description: 'Istanbul\'da araç kiralama. Havalimanı, Taksim, Kadıköy\'de araç kiralama. Ekonomik ve lüks araçlar.',
      metaTitle: 'Istanbul Araç Kiralama - Rent A Car Istanbul | Ailydian',
      metaDescription: 'Istanbul\'da günlük araç kiralama. 100+ araç seçeneği, havalimanı teslimat, en uygun fiyatlar!',
      keywords: ['istanbul araç kiralama', 'rent a car istanbul', 'araba kiralama istanbul'],
      pageType: SEOPageType.CITY_CARS,
      category: 'cars',
      filters: JSON.stringify({ city: 'Istanbul' }),
      h1: 'Istanbul Araç Kiralama',
      content: 'Istanbul\'da araç kiralama ihtiyacınız için en uygun seçenekler. Ekonomik araçlardan lüks SUV\'lara kadar geniş araç filosu...',
      isActive: true,
    },
  ];

  const createdSEOPages = await Promise.all(
    seoPages.map((page) =>
      prisma.sEOLandingPage.upsert({
        where: { slug: page.slug },
        update: {},
        create: page,
      })
    )
  );

  console.log(`   ✅ Created ${createdSEOPages.length} SEO landing pages`);

  // ============================================
  // 10. CREATE MILES TRANSACTIONS
  // ============================================
  console.log('\n💰 Creating miles transactions...');

  const milesTransactions = [
    {
      accountId: milesAccounts[0].id,
      type: 'EARNED',
      amount: 2500,
      balanceBefore: 1500,
      balanceAfter: 4000,
      description: 'Otel rezervasyonundan kazanılan mil',
      referenceType: 'BOOKING',
      referenceId: 'BOOK-001',
    },
    {
      accountId: milesAccounts[0].id,
      type: 'REDEEMED',
      amount: 1000,
      balanceBefore: 5000,
      balanceAfter: 4000,
      description: 'Rezervasyonda mil kullanımı',
      referenceType: 'BOOKING',
      referenceId: 'BOOK-002',
    },
    {
      accountId: milesAccounts[1].id,
      type: 'EARNED',
      amount: 600,
      balanceBefore: 0,
      balanceAfter: 600,
      description: 'İlk rezervasyondan kazanılan mil',
      referenceType: 'BOOKING',
      referenceId: 'BOOK-003',
    },
  ];

  const createdTransactions = await Promise.all(
    milesTransactions.map((tx) =>
      prisma.milesTransaction.create({
        data: tx,
      })
    )
  );

  console.log(`   ✅ Created ${createdTransactions.length} miles transactions`);

  // ============================================
  // 11. CREATE VIRTUAL TOURS
  // ============================================
  console.log('\n🏛️ Creating virtual tours...');

  const virtualTour = await prisma.virtualTour.create({
    data: {
      listingType: 'hotel',
      listingId: createdHotels[0].id,
      title: 'Grand Hilton Istanbul - 360° Sanal Tur',
      description: 'Otelimizin tüm alanlarını 360° panoramik görüntülerle keşfedin',
      coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      views: 5420,
      featured: true,
      isActive: true,
      scenes: {
        create: [
          {
            title: 'Lobby',
            panoramaUrl: 'https://cdn.ailydian.com/360/lobby.jpg',
            type: PanoramaType.EQUIRECTANGULAR,
            order: 0,
            initialPitch: 0,
            initialYaw: 0,
            initialFov: 90,
            hotspots: {
              create: [
                {
                  type: HotspotType.INFO,
                  positionPitch: -20,
                  positionYaw: 0,
                  title: 'Lüks Lobby',
                  content: '24/7 resepsiyon hizmeti, ücretsiz Wi-Fi',
                  icon: 'info',
                },
              ],
            },
          },
          {
            title: 'Deluxe Room',
            panoramaUrl: 'https://cdn.ailydian.com/360/deluxe-room.jpg',
            type: PanoramaType.EQUIRECTANGULAR,
            order: 1,
            initialPitch: 0,
            initialYaw: 180,
            initialFov: 90,
            hotspots: {
              create: [
                {
                  type: HotspotType.INFO,
                  positionPitch: 0,
                  positionYaw: -90,
                  title: 'Boğaz Manzarası',
                  content: 'Odalarımızdan eşsiz Boğaz manzarası',
                  icon: 'info',
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log(`   ✅ Virtual tour: ${virtualTour.title}`);

  // ============================================
  // SUMMARY
  // ============================================
  console.log('\n' + '='.repeat(60));
  console.log('🎉  DATABASE SEED COMPLETED SUCCESSFULLY!');
  console.log('='.repeat(60) + '\n');
  console.log('Created:');
  console.log(`   • 1 Admin user`);
  console.log(`   • ${testUsers.length} Test users`);
  console.log(`   • ${milesAccounts.length} Ailydian Miles accounts`);
  console.log(`   • ${createdHotels.length} Hotels`);
  console.log(`   • ${createdCars.length} Rental cars`);
  console.log(`   • ${createdTours.length} Tours`);
  console.log(`   • ${createdReviews.length} Reviews`);
  console.log(`   • 1 Partner profile`);
  console.log(`   • ${createdSEOPages.length} SEO landing pages`);
  console.log(`   • ${createdTransactions.length} Miles transactions`);
  console.log(`   • 1 Virtual tour with 2 scenes`);
  console.log('\n' + '='.repeat(60));
  console.log('\n✅ You can now login with these accounts:\n');
  console.log('   🔐 ADMIN:');
  console.log('      Email: admin@ailydian.com');
  console.log('      Password: Admin123!\n');
  console.log('   👤 TEST USERS:');
  console.log('      Email: ayse@example.com | mehmet@example.com | zeynep@example.com');
  console.log('      Password: User123!\n');
  console.log('   🤝 PARTNER:');
  console.log('      Email: partner@example.com');
  console.log('      Password: Partner123!\n');
  console.log('='.repeat(60) + '\n');
}

main()
  .catch((e) => {
    console.error('\n❌ ERROR DURING SEED:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
