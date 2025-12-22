import { PrismaClient, PropertyType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🏠 Starting Rental Properties Seeding...\n');

  // Sample rental properties data
  const properties = [
    {
      title: 'Lüks Villa - Deniz Manzaralı Bodrum',
      slug: 'luxury-villa-bodrum-sea-view',
      description: 'Bodrum Yalıkavak\'ta bulunan lüks villada unutulmaz bir tatil deneyimi sizi bekliyor. 4 geniş yatak odası, özel havuz, muhteşem deniz manzarası ve plaja özel erişim imkanı ile mükemmel bir tatil geçirin. Villa tam donanımlı modern mutfak, geniş oturma alanları ve her odada klima ile donatılmıştır.',
      type: 'VILLA' as PropertyType,
      city: 'Bodrum',
      district: 'Yalıkavak',
      address: 'Tilkicik Caddesi No:45, Yalıkavak',
      coordinates: { lat: 37.0903, lng: 27.2639 },
      guests: 8,
      bedrooms: 4,
      bathrooms: 3,
      beds: 6,
      squareMeters: 250,
      basePrice: 3500,
      weeklyDiscount: 10,
      monthlyDiscount: 20,
      currency: 'TRY',
      cleaningFee: 500,
      securityDeposit: 2000,
      // Amenities
      wifi: true,
      kitchen: true,
      parking: true,
      pool: true,
      airConditioning: true,
      heating: true,
      tv: true,
      washer: true,
      beachfront: true,
      seaview: true,
      balcony: true,
      // House Rules
      smokingAllowed: false,
      petsAllowed: false,
      partiesAllowed: false,
      childrenAllowed: true,
      // Booking
      instantBook: true,
      minimumStay: 3,
      maximumStay: 30,
      checkInTime: '15:00',
      checkOutTime: '11:00',
      // Media
      mainImage: '/images/properties/villa-bodrum-1.jpg',
      images: [
        '/images/properties/villa-bodrum-1.jpg',
        '/images/properties/villa-bodrum-2.jpg',
        '/images/properties/villa-bodrum-3.jpg',
      ],
      virtualTourUrl: 'https://example.com/tour/villa-bodrum',
      // Host
      hostName: 'Ahmet Yılmaz',
      hostSuperhost: true,
      hostResponseTime: 'Birkaç saat içinde',
      hostLanguages: ['Türkçe', 'English', 'Deutsch'],
      // Status
      isActive: true,
      isFeatured: true,
      // Ratings
      overall: 4.9,
      cleanliness: 5.0,
      accuracy: 4.9,
      checkIn: 4.8,
      communication: 5.0,
      location: 4.9,
      value: 4.8,
      reviewCount: 48,
      // Price Comparison
      airbnbPrice: 4200,
      bookingPrice: 4500,
      // SEO
      metaTitle: 'Lüks Villa Bodrum - Deniz Manzaralı Özel Havuzlu',
      metaDescription: 'Bodrum Yalıkavak\'ta deniz manzaralı lüks villa. 4 yatak odası, özel havuz, plaj erişimi.',
      keywords: ['bodrum villa', 'yalıkavak', 'deniz manzaralı', 'özel havuz', 'lüks konaklama'],
    },
    {
      title: 'Modern Dubleks Daire - İstanbul Beşiktaş',
      slug: 'modern-duplex-istanbul-besiktas',
      description: 'İstanbul\'un kalbi Beşiktaş\'ta modern ve şık bir dubleks daire. Metro, tramvay ve sahil hattına yürüme mesafesinde. 2 yatak odası, 2 banyo, tam donanımlı mutfak ve geniş balkon ile hem iş hem tatil için ideal. Evcil hayvan dostu konaklama.',
      type: 'APARTMENT' as PropertyType,
      city: 'İstanbul',
      district: 'Beşiktaş',
      address: 'Sinanpaşa Mahallesi, Beşiktaş',
      coordinates: { lat: 41.0433, lng: 29.0087 },
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      beds: 3,
      squareMeters: 120,
      basePrice: 1200,
      weeklyDiscount: 15,
      monthlyDiscount: 25,
      currency: 'TRY',
      cleaningFee: 300,
      securityDeposit: 1000,
      // Amenities
      wifi: true,
      kitchen: true,
      parking: true,
      pool: false,
      airConditioning: true,
      heating: true,
      tv: true,
      washer: true,
      beachfront: false,
      seaview: false,
      balcony: true,
      // House Rules
      smokingAllowed: false,
      petsAllowed: true,
      partiesAllowed: false,
      childrenAllowed: true,
      // Booking
      instantBook: true,
      minimumStay: 2,
      maximumStay: 90,
      checkInTime: '14:00',
      checkOutTime: '12:00',
      // Media
      mainImage: '/images/properties/apartment-istanbul-1.jpg',
      images: [
        '/images/properties/apartment-istanbul-1.jpg',
        '/images/properties/apartment-istanbul-2.jpg',
      ],
      // Host
      hostName: 'Zeynep Kaya',
      hostSuperhost: true,
      hostResponseTime: 'Birkaç dakika içinde',
      hostLanguages: ['Türkçe', 'English'],
      // Status
      isActive: true,
      isFeatured: true,
      // Ratings
      overall: 4.8,
      cleanliness: 4.9,
      accuracy: 4.8,
      checkIn: 4.7,
      communication: 4.9,
      location: 5.0,
      value: 4.7,
      reviewCount: 92,
      // SEO
      metaTitle: 'Modern Dubleks Daire İstanbul Beşiktaş - Merkezi Konum',
      metaDescription: 'İstanbul Beşiktaş\'ta modern dubleks daire. 2 yatak odası, tam donanımlı mutfak, merkezi konum.',
      keywords: ['istanbul kiralık', 'beşiktaş', 'dubleks daire', 'günlük kiralık'],
    },
    {
      title: 'Sahil Kenarı Pansiyon - Çeşme Alaçatı',
      slug: 'beachfront-cottage-cesme-alacati',
      description: 'Alaçatı\'nın ünlü rüzgar sörfü plajlarına yürüme mesafesinde sahil kenarı pansiyon. 3 yatak odası, geniş bahçe ve deniz manzaralı balkonları ile aileler için ideal. Alaçatı pazarına ve taş sokaklarına 5 dakika mesafede.',
      type: 'COTTAGE' as PropertyType,
      city: 'Çeşme',
      district: 'Alaçatı',
      address: 'Alaçatı Sahil Yolu No:12',
      coordinates: { lat: 38.2667, lng: 26.3667 },
      guests: 6,
      bedrooms: 3,
      bathrooms: 2,
      beds: 4,
      squareMeters: 150,
      basePrice: 2200,
      weeklyDiscount: 12,
      monthlyDiscount: 18,
      currency: 'TRY',
      cleaningFee: 400,
      securityDeposit: 1500,
      // Amenities
      wifi: true,
      kitchen: true,
      parking: true,
      pool: false,
      airConditioning: true,
      heating: true,
      tv: true,
      washer: true,
      beachfront: true,
      seaview: true,
      balcony: true,
      // House Rules
      smokingAllowed: false,
      petsAllowed: false,
      partiesAllowed: false,
      childrenAllowed: true,
      // Booking
      instantBook: false,
      minimumStay: 2,
      maximumStay: 14,
      checkInTime: '15:00',
      checkOutTime: '11:00',
      // Media
      mainImage: '/images/properties/cottage-alacati-1.jpg',
      images: [
        '/images/properties/cottage-alacati-1.jpg',
        '/images/properties/cottage-alacati-2.jpg',
      ],
      // Host
      hostName: 'Mehmet Demir',
      hostSuperhost: false,
      hostResponseTime: 'Bir gün içinde',
      hostLanguages: ['Türkçe'],
      // Status
      isActive: true,
      isFeatured: false,
      // Ratings
      overall: 4.6,
      cleanliness: 4.7,
      accuracy: 4.6,
      checkIn: 4.5,
      communication: 4.6,
      location: 4.9,
      value: 4.5,
      reviewCount: 35,
      // SEO
      metaTitle: 'Sahil Kenarı Pansiyon Çeşme Alaçatı - Rüzgar Sörfü',
      metaDescription: 'Çeşme Alaçatı\'da sahil kenarı pansiyon. 3 yatak odası, plaj erişimi, rüzgar sörfü imkanı.',
      keywords: ['çeşme', 'alaçatı', 'sahil kenarı', 'pansiyon', 'rüzgar sörfü'],
    },
    {
      title: 'Şık Studio Daire - Antalya Lara',
      slug: 'chic-studio-antalya-lara',
      description: 'Antalya Lara plajına 2 dakika yürüme mesafesinde şık studio daire. Açık havuz, fitness center ve 24 saat güvenlik hizmeti. Çiftler ve solo gezginler için mükemmel. Klimalı, deniz manzaralı balkon ve akıllı TV ile donatılmış.',
      type: 'STUDIO' as PropertyType,
      city: 'Antalya',
      district: 'Lara',
      address: 'Lara Plajı Yanı, Güzeloba',
      coordinates: { lat: 36.8667, lng: 30.7833 },
      guests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      squareMeters: 45,
      basePrice: 650,
      weeklyDiscount: 10,
      monthlyDiscount: 20,
      currency: 'TRY',
      cleaningFee: 200,
      securityDeposit: 500,
      // Amenities
      wifi: true,
      kitchen: true,
      parking: true,
      pool: true,
      airConditioning: true,
      heating: true,
      tv: true,
      washer: false,
      beachfront: true,
      seaview: true,
      balcony: true,
      // House Rules
      smokingAllowed: false,
      petsAllowed: false,
      partiesAllowed: false,
      childrenAllowed: true,
      // Booking
      instantBook: true,
      minimumStay: 1,
      maximumStay: 30,
      checkInTime: '14:00',
      checkOutTime: '11:00',
      // Media
      mainImage: '/images/properties/studio-antalya-1.jpg',
      images: [
        '/images/properties/studio-antalya-1.jpg',
      ],
      // Host
      hostName: 'Ayşe Şahin',
      hostSuperhost: true,
      hostResponseTime: 'Birkaç saat içinde',
      hostLanguages: ['Türkçe', 'English', 'Русский'],
      // Status
      isActive: true,
      isFeatured: false,
      // Ratings
      overall: 4.7,
      cleanliness: 4.8,
      accuracy: 4.7,
      checkIn: 4.6,
      communication: 4.8,
      location: 4.8,
      value: 4.6,
      reviewCount: 64,
      // Price Comparison
      airbnbPrice: 750,
      bookingPrice: 800,
      // SEO
      metaTitle: 'Şık Studio Daire Antalya Lara - Plaj Kenarı',
      metaDescription: 'Antalya Lara\'da plaj kenarı studio daire. Tam donanımlı, havuz kullanımı, deniz manzarası.',
      keywords: ['antalya', 'lara', 'studio', 'günlük kiralık', 'plaj'],
    },
    {
      title: 'Penthouse Suite - İzmir Alsancak',
      slug: 'penthouse-suite-izmir-alsancak',
      description: 'İzmir Alsancak\'ın kalbinde lüks penthouse suite. 180 m² geniş yaşam alanı, panoramik deniz manzarası, geniş teras ve modern dekorasyon. Kordon, alışveriş merkezleri ve restoranlarına yürüme mesafesinde. İş seyahatleri ve uzun süreli konaklamalar için ideal.',
      type: 'PENTHOUSE' as PropertyType,
      city: 'İzmir',
      district: 'Alsancak',
      address: 'Kıbrıs Şehitleri Caddesi, Alsancak',
      coordinates: { lat: 38.4383, lng: 27.1461 },
      guests: 5,
      bedrooms: 3,
      bathrooms: 2,
      beds: 4,
      squareMeters: 180,
      basePrice: 1800,
      weeklyDiscount: 15,
      monthlyDiscount: 25,
      currency: 'TRY',
      cleaningFee: 350,
      securityDeposit: 1200,
      // Amenities
      wifi: true,
      kitchen: true,
      parking: true,
      pool: false,
      airConditioning: true,
      heating: true,
      tv: true,
      washer: true,
      beachfront: false,
      seaview: true,
      balcony: true,
      // House Rules
      smokingAllowed: false,
      petsAllowed: false,
      partiesAllowed: true,
      childrenAllowed: true,
      // Booking
      instantBook: true,
      minimumStay: 2,
      maximumStay: 60,
      checkInTime: '15:00',
      checkOutTime: '12:00',
      // Media
      mainImage: '/images/properties/penthouse-izmir-1.jpg',
      images: [
        '/images/properties/penthouse-izmir-1.jpg',
        '/images/properties/penthouse-izmir-2.jpg',
        '/images/properties/penthouse-izmir-3.jpg',
      ],
      // Host
      hostName: 'Can Yıldız',
      hostSuperhost: true,
      hostResponseTime: 'Birkaç saat içinde',
      hostLanguages: ['Türkçe', 'English'],
      // Status
      isActive: true,
      isFeatured: true,
      // Ratings
      overall: 4.9,
      cleanliness: 5.0,
      accuracy: 4.9,
      checkIn: 4.8,
      communication: 4.9,
      location: 5.0,
      value: 4.8,
      reviewCount: 72,
      // Price Comparison
      airbnbPrice: 2100,
      bookingPrice: 2300,
      agodaPrice: 2200,
      // SEO
      metaTitle: 'Penthouse Suite İzmir Alsancak - Şehir Merkezi',
      metaDescription: 'İzmir Alsancak\'ta penthouse suite. 3 yatak odası, geniş teras, deniz manzarası, lüks yaşam.',
      keywords: ['izmir', 'alsancak', 'penthouse', 'lüks', 'deniz manzaralı'],
    },
    {
      title: 'Dağ Evi - Uludağ Kayak Merkezi',
      slug: 'mountain-house-uludag-ski-resort',
      description: 'Uludağ kayak merkezine 10 dakika mesafede büyük aile evi. 5 yatak odası, şömineli geniş salon, tam donanımlı mutfak ve dağ manzarası. Kayak ekipmanları saklama alanı, kapalı otopark ve ısıtmalı zemin ile kış aylarında konforlu bir tatil.',
      type: 'HOUSE' as PropertyType,
      city: 'Bursa',
      district: 'Uludağ',
      address: 'Uludağ Oteller Bölgesi No:25',
      coordinates: { lat: 40.1028, lng: 29.2694 },
      guests: 10,
      bedrooms: 5,
      bathrooms: 3,
      beds: 7,
      squareMeters: 300,
      basePrice: 2800,
      weeklyDiscount: 10,
      monthlyDiscount: 15,
      currency: 'TRY',
      cleaningFee: 600,
      securityDeposit: 2500,
      // Amenities
      wifi: true,
      kitchen: true,
      parking: true,
      pool: false,
      airConditioning: false,
      heating: true,
      tv: true,
      washer: true,
      beachfront: false,
      seaview: false,
      balcony: true,
      // House Rules
      smokingAllowed: false,
      petsAllowed: true,
      partiesAllowed: false,
      childrenAllowed: true,
      // Booking
      instantBook: false,
      minimumStay: 3,
      maximumStay: 21,
      checkInTime: '16:00',
      checkOutTime: '10:00',
      // Media
      mainImage: '/images/properties/house-uludag-1.jpg',
      images: [
        '/images/properties/house-uludag-1.jpg',
        '/images/properties/house-uludag-2.jpg',
      ],
      // Host
      hostName: 'Elif Özkan',
      hostSuperhost: false,
      hostResponseTime: 'Bir gün içinde',
      hostLanguages: ['Türkçe', 'English'],
      // Status
      isActive: true,
      isFeatured: false,
      // Ratings
      overall: 4.5,
      cleanliness: 4.6,
      accuracy: 4.5,
      checkIn: 4.4,
      communication: 4.5,
      location: 4.7,
      value: 4.4,
      reviewCount: 28,
      // SEO
      metaTitle: 'Dağ Evi Uludağ - Kayak Merkezi Yakını',
      metaDescription: 'Bursa Uludağ\'da dağ evi. 5 yatak odası, kayak merkezi yakını, şömine, kış tatili.',
      keywords: ['uludağ', 'dağ evi', 'kayak', 'kış tatili', 'bursa'],
    },
  ];

  // Create properties
  for (const propertyData of properties) {
    try {
      const property = await prisma.rentalProperty.create({
        data: propertyData,
      });
      console.log(`✅ Created property: ${property.title}`);
    } catch (error: any) {
      console.error(`❌ Error creating property: ${propertyData.title}`, error.message);
    }
  }

  console.log('\n✅ Rental Properties Seeding Completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
