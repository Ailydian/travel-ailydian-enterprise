/**
 * 🌱 Travel Ailydian Enterprise - Production Seed Data
 *
 * This seed file creates initial data for all major features:
 * - Admin & Test Users
 * - Ailydian Miles Loyalty Accounts
 * - Hotels, Cars, Tours
 * - Reviews & Ratings
 * - Partner Profiles
 * - SEO Landing Pages
 * - Miles Transactions
 * - Virtual Tours
 *
 * Run with: npx prisma db seed
 */

import {
  PrismaClient,
  LoyaltyTier,
  PartnerType,
  SEOPageType,
  PanoramaType,
  HotspotType,
  HotelType,
  CarCategory,
  TransmissionType,
  FuelType,
  TourCategory,
  DifficultyLevel,
  MilesTransactionType
} from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('\n' + '='.repeat(60));
  console.log('🌱  TRAVEL AILYDIAN ENTERPRISE - DATABASE SEED');
  console.log('='.repeat(60) + '\n');

  // ============================================
  // 1. CREATE TEST USERS
  // ============================================
  console.log('👥 Creating test users...');

  const testUsers = await Promise.all([
    prisma.user.upsert({
      where: { email: 'admin@ailydian.com' },
      update: {},
      create: {
        name: 'Admin User',
        email: 'admin@ailydian.com',
        password: await bcrypt.hash('Admin123!', 12),
        emailVerified: new Date(),
        phone: '+905551234567',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
        isEmailVerified: true,
      },
    }),
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
        isEmailVerified: true,
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
        isEmailVerified: true,
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
        isEmailVerified: true,
      },
    }),
  ]);

  console.log(`   ✅ Created ${testUsers.length} test users`);

  // ============================================
  // 2. CREATE AILYDIAN MILES ACCOUNTS
  // ============================================
  console.log('\n💎 Creating Ailydian Miles loyalty accounts...');

  const milesAccounts = await Promise.all([
    prisma.ailydianMilesAccount.upsert({
      where: { userId: testUsers[1].id },
      update: {},
      create: {
        userId: testUsers[1].id,
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
      where: { userId: testUsers[2].id },
      update: {},
      create: {
        userId: testUsers[2].id,
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
      where: { userId: testUsers[3].id },
      update: {},
      create: {
        userId: testUsers[3].id,
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
  console.log(`      • GOLD tier: ${testUsers[1].name} (4,000 miles)`);
  console.log(`      • BRONZE tier: ${testUsers[2].name} (600 miles)`);
  console.log(`      • GOLD tier: ${testUsers[3].name} (9,000 miles)`);

  // ============================================
  // 3. CREATE HOTELS
  // ============================================
  console.log('\n🏨 Creating hotels...');

  const hotels = [
    {
      name: 'Grand Hilton Istanbul',
      slug: 'grand-hilton-istanbul',
      description: 'Lüks 5 yıldızlı otel Taksim\'de, muhteşem Boğaz manzarası ile.',
      city: 'Istanbul',
      region: 'Taksim',
      country: 'Turkey',
      address: 'Harbiye, Cumhuriyet Cd., 34367 Şişli/İstanbul',
      coordinates: { lat: 41.0376, lng: 28.9869 },
      rating: 4.8,
      stars: 5,
      hotelType: HotelType.CITY_HOTEL,
      roomCount: 200,
      priceMin: 2500,
      priceMax: 8000,
      currency: 'TRY',
      mainImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      ],
      amenities: ['wifi', 'pool', 'spa', 'gym', 'restaurant', 'bar', 'parking', 'room-service'],
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'Rixos Premium Belek',
      slug: 'rixos-premium-belek',
      description: 'Her şey dahil lüks resort, Antalya Belek\'te harika plaj ile.',
      city: 'Antalya',
      region: 'Belek',
      country: 'Turkey',
      address: 'Belek Turizm Merkezi, 07506 Belek/Antalya',
      coordinates: { lat: 36.8629, lng: 31.0546 },
      rating: 4.9,
      stars: 5,
      hotelType: HotelType.RESORT,
      roomCount: 500,
      priceMin: 4500,
      priceMax: 15000,
      currency: 'TRY',
      mainImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
      images: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
        'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800',
      ],
      amenities: ['wifi', 'pool', 'beach', 'spa', 'gym', 'restaurant', 'bar', 'kids-club', 'water-park'],
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'Maxx Royal Kemer Resort',
      slug: 'maxx-royal-kemer-resort',
      description: 'Ultra lüks her şey dahil resort, muhteşem hizmet ve yemekler.',
      city: 'Antalya',
      region: 'Kemer',
      country: 'Turkey',
      address: 'Beldibi Mah. Başkomutan Atatürk Cad. No:104, 07985 Kemer/Antalya',
      coordinates: { lat: 36.5940, lng: 30.5606 },
      rating: 5.0,
      stars: 5,
      hotelType: HotelType.RESORT,
      roomCount: 350,
      priceMin: 8500,
      priceMax: 25000,
      currency: 'TRY',
      mainImage: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800',
      images: [
        'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
      ],
      amenities: ['wifi', 'pool', 'beach', 'spa', 'gym', 'restaurant', 'bar', 'kids-club', 'concierge', 'butler'],
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
  // 4. CREATE RENTAL CARS
  // ============================================
  console.log('\n🚗 Creating rental cars...');

  const cars = [
    {
      name: 'Mercedes-Benz E-Class',
      slug: 'mercedes-benz-e-class-istanbul',
      description: 'Lüks sedan araç, konforlu ve prestijli seyahat için ideal.',
      brand: 'Mercedes-Benz',
      model: 'E-Class',
      year: 2023,
      category: CarCategory.PREMIUM_SEDAN,
      transmission: TransmissionType.AUTOMATIC,
      fuelType: FuelType.DIESEL,
      seats: 5,
      doors: 4,
      luggage: 3,
      pricePerDay: 850,
      currency: 'TRY',
      mainImage: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
      images: ['https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800'],
      features: ['GPS', 'Leather Seats', 'Bluetooth', 'Cruise Control'],
      airConditioning: true,
      pickupLocations: ['Istanbul Airport', 'Taksim', 'Sultanahmet'],
      rating: 4.8,
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'BMW 5 Series',
      slug: 'bmw-5-series-istanbul',
      description: 'Güçlü ve zarif BMW sedan, işletme seyahatleri için mükemmel.',
      brand: 'BMW',
      model: '5 Series',
      year: 2024,
      category: CarCategory.PREMIUM_SEDAN,
      transmission: TransmissionType.AUTOMATIC,
      fuelType: FuelType.HYBRID,
      seats: 5,
      doors: 4,
      luggage: 3,
      pricePerDay: 900,
      currency: 'TRY',
      mainImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
      images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800'],
      features: ['GPS', 'Leather Seats', 'Bluetooth', 'Parking Sensors'],
      airConditioning: true,
      pickupLocations: ['Istanbul Airport', 'Kadıköy'],
      rating: 4.9,
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'Renault Clio',
      slug: 'renault-clio-izmir',
      description: 'Ekonomik ve pratik şehir arabası, günlük kullanım için ideal.',
      brand: 'Renault',
      model: 'Clio',
      year: 2023,
      category: CarCategory.COMPACT,
      transmission: TransmissionType.MANUAL,
      fuelType: FuelType.GASOLINE,
      seats: 5,
      doors: 4,
      luggage: 2,
      pricePerDay: 250,
      currency: 'TRY',
      mainImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
      images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'],
      features: ['Bluetooth', 'USB'],
      airConditioning: true,
      pickupLocations: ['Izmir Airport', 'Konak'],
      rating: 4.3,
      isActive: true,
      isFeatured: false,
    },
  ];

  const createdCars = await Promise.all(
    cars.map((car) =>
      prisma.carRental.upsert({
        where: { slug: car.slug },
        update: {},
        create: car,
      })
    )
  );

  console.log(`   ✅ Created ${createdCars.length} rental cars`);

  // ============================================
  // 5. CREATE TOUR PACKAGES
  // ============================================
  console.log('\n🎫 Creating tour packages...');

  const tours = [
    {
      name: 'Istanbul Historical Tour',
      slug: 'istanbul-historical-tour',
      description: 'Tarihi yarımadada Sultanahmet, Ayasofya, Topkapı Sarayı ve Kapalıçarşı turu. Rehberli tam gün turu.',
      shortDescription: 'Tarihi yarımada tam gün turu',
      destination: 'Istanbul',
      destinations: ['Sultanahmet', 'Topkapı', 'Kapalıçarşı'],
      region: 'Istanbul',
      category: TourCategory.HISTORICAL,
      duration: 1,
      nights: 0,
      maxGroupSize: 20,
      priceAdult: 450,
      priceChild: 250,
      priceInfant: 0,
      currency: 'TRY',
      mainImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800',
      images: ['https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800'],
      includes: ['Professional guide', 'Lunch', 'Museum tickets', 'Transportation'],
      excludes: ['Drinks', 'Personal expenses'],
      itinerary: [
        { day: 1, title: 'Historical Peninsula', activities: ['Sultanahmet Mosque', 'Hagia Sophia', 'Topkapi Palace', 'Grand Bazaar'] }
      ],
      difficultyLevel: DifficultyLevel.EASY,
      guideLanguages: ['Turkish', 'English'],
      rating: 4.8,
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'Cappadocia Hot Air Balloon',
      slug: 'cappadocia-hot-air-balloon',
      description: 'Kapadokya\'da gün doğumunda sıcak hava balonu turu, eşsiz bir deneyim. Profesyonel pilotlar eşliğinde unutulmaz bir macera.',
      shortDescription: 'Sıcak hava balonu deneyimi',
      destination: 'Cappadocia',
      destinations: ['Göreme', 'Ürgüp'],
      region: 'Nevşehir',
      category: TourCategory.ADVENTURE,
      duration: 1,
      nights: 0,
      maxGroupSize: 16,
      priceAdult: 1200,
      priceChild: 1000,
      priceInfant: 0,
      currency: 'TRY',
      mainImage: 'https://images.unsplash.com/photo-1525088553704-2a1579f8f88f?w=800',
      images: ['https://images.unsplash.com/photo-1525088553704-2a1579f8f88f?w=800'],
      includes: ['Hot air balloon flight', 'Hotel pick-up', 'Champagne', 'Flight certificate'],
      excludes: ['Hotel accommodation', 'Meals'],
      itinerary: [
        { day: 1, title: 'Balloon Flight', activities: ['Early morning pick-up', '1 hour flight', 'Champagne celebration', 'Certificate ceremony'] }
      ],
      difficultyLevel: DifficultyLevel.EASY,
      guideLanguages: ['Turkish', 'English', 'Russian'],
      rating: 5.0,
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'Pamukkale & Hierapolis Tour',
      slug: 'pamukkale-hierapolis-tour',
      description: 'Pamukkale travertenleri ve antik Hierapolis şehri tam gün turu. UNESCO Dünya Mirası listesindeki bu eşsiz doğa harikasını keşfedin.',
      shortDescription: 'Pamukkale tam gün turu',
      destination: 'Pamukkale',
      destinations: ['Pamukkale', 'Hierapolis'],
      region: 'Denizli',
      category: TourCategory.NATURE,
      duration: 1,
      nights: 0,
      maxGroupSize: 25,
      priceAdult: 380,
      priceChild: 200,
      priceInfant: 0,
      currency: 'TRY',
      mainImage: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800',
      images: ['https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800'],
      includes: ['Professional guide', 'Lunch', 'Museum tickets', 'Transportation'],
      excludes: ['Drinks', 'Swimming gear'],
      itinerary: [
        { day: 1, title: 'Pamukkale Tour', activities: ['Cotton Castle travertines', 'Hierapolis ancient city', 'Cleopatra pool', 'Ancient theater'] }
      ],
      difficultyLevel: DifficultyLevel.MODERATE,
      guideLanguages: ['Turkish', 'English'],
      rating: 4.7,
      isActive: true,
      isFeatured: true,
    },
  ];

  const createdTours = await Promise.all(
    tours.map((tour) =>
      prisma.tourPackage.upsert({
        where: { slug: tour.slug },
        update: {},
        create: tour,
      })
    )
  );

  console.log(`   ✅ Created ${createdTours.length} tour packages`);

  // ============================================
  // 6. CREATE REVIEWS
  // ============================================
  console.log('\n⭐ Creating reviews...');

  const reviews = [
    {
      userId: testUsers[1].id,
      entityType: 'hotel',
      entityId: createdHotels[0].id,
      rating: 5,
      title: 'Muhteşem konaklama!',
      content: 'Otel çok temizdi, personel son derece ilgiliydi. Boğaz manzarası harika. Kesinlikle tekrar geleceğim.',
    },
    {
      userId: testUsers[2].id,
      entityType: 'hotel',
      entityId: createdHotels[0].id,
      rating: 4,
      title: 'Çok güzeldi',
      content: 'Konum mükemmel, kahvaltı çeşitleri çok iyi. Tek eksi spa biraz küçüktü.',
    },
    {
      userId: testUsers[3].id,
      entityType: 'car',
      entityId: createdCars[0].id,
      rating: 5,
      title: 'Harika araç',
      content: 'Mercedes çok konforlu ve temizdi. Teslimat ve iade işlemleri çok hızlıydı.',
    },
    {
      userId: testUsers[1].id,
      entityType: 'tour',
      entityId: createdTours[0].id,
      rating: 5,
      title: 'Unutulmaz bir gün',
      content: 'Rehberimiz çok bilgiliydi, tarihi yerler hakkında harika bilgiler verdi. Öğle yemeği de çok lezzetliydi.',
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
  // 7. CREATE PARTNER PROFILE
  // ============================================
  console.log('\n🤝 Creating partner profile...');

  const partnerUser = await prisma.user.upsert({
    where: { email: 'partner@example.com' },
    update: {},
    create: {
      name: 'Hotel Partner',
      email: 'partner@example.com',
      password: await bcrypt.hash('Partner123!', 12),
      emailVerified: new Date(),
      phone: '+905551234571',
      isEmailVerified: true,
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
  // 8. CREATE SEO LANDING PAGES
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
      filters: { city: 'Istanbul' },
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
      filters: { city: 'Antalya' },
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
      filters: { city: 'Istanbul' },
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
  // 9. CREATE MILES TRANSACTIONS
  // ============================================
  console.log('\n💰 Creating miles transactions...');

  const milesTransactions = [
    {
      accountId: milesAccounts[0].id,
      userId: testUsers[1].id,
      type: MilesTransactionType.EARNED_BOOKING,
      amount: 2500,
      balanceBefore: 1500,
      balanceAfter: 4000,
      description: 'Otel rezervasyonundan kazanılan mil',
    },
    {
      accountId: milesAccounts[0].id,
      userId: testUsers[1].id,
      type: MilesTransactionType.SPENT_REDEMPTION,
      amount: 1000,
      balanceBefore: 5000,
      balanceAfter: 4000,
      description: 'Rezervasyonda mil kullanımı',
    },
    {
      accountId: milesAccounts[1].id,
      userId: testUsers[2].id,
      type: MilesTransactionType.EARNED_BOOKING,
      amount: 600,
      balanceBefore: 0,
      balanceAfter: 600,
      description: 'İlk rezervasyondan kazanılan mil',
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
  // 10. CREATE VIRTUAL TOUR
  // ============================================
  console.log('\n🏛️ Creating virtual tour...');

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
                  pitch: -20,
                  yaw: 0,
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
                  pitch: 0,
                  yaw: -90,
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
  console.log(`   • ${testUsers.length} Test users (including 1 admin)`);
  console.log(`   • ${milesAccounts.length} Ailydian Miles accounts`);
  console.log(`   • ${createdHotels.length} Hotels`);
  console.log(`   • ${createdCars.length} Rental cars`);
  console.log(`   • ${createdTours.length} Tour packages`);
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
