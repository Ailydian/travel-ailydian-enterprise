/**
 * TURKEY TOURISM DATA - COMPREHENSIVE DATABASE
 * Complete tourism data for all Turkish cities with focus on Antalya
 * Real-world data for hotels, flights, tours, car rentals, activities
 */

// ==================== TURKEY TOURISM CITIES ====================
export const TURKEY_CITIES = [
  // Mediterranean Region (Akdeniz Bölgesi)
  {
    id: 'antalya',
    name: 'Antalya',
    region: 'Akdeniz',
    province: 'Antalya',
    coordinates: { lat: 36.8969, lng: 30.7133 },
    airport: 'AYT',
    airportName: 'Antalya Havalimanı',
    population: 2_619_832,
    touristCapacity: 15_000_000,
    seasonPeak: 'Haziran-Eylül',
    description: 'Türkiye\'nin turizm başkenti, Akdeniz\'in incisi',
    highlights: ['Kaleiçi', 'Düden Şelalesi', 'Olimpos', 'Konyaaltı Plajı', 'Aspendos Antik Tiyatrosu'],
    districts: [
      { id: 'kaleici', name: 'Kaleiçi', type: 'Tarihi Merkez', hotels: 150, avgPrice: 800 },
      { id: 'lara', name: 'Lara', type: 'Plaj/Lüks', hotels: 250, avgPrice: 1500 },
      { id: 'belek', name: 'Belek', type: 'Golf/All-Inclusive', hotels: 180, avgPrice: 2500 },
      { id: 'kemer', name: 'Kemer', type: 'Doğa/Plaj', hotels: 320, avgPrice: 1200 },
      { id: 'side', name: 'Side', type: 'Tarihi/Plaj', hotels: 280, avgPrice: 1300 },
      { id: 'alanya', name: 'Alanya', type: 'Plaj/Gece Hayatı', hotels: 450, avgPrice: 900 },
      { id: 'konyaalti', name: 'Konyaaltı', type: 'Şehir Plajı', hotels: 120, avgPrice: 700 },
      { id: 'manavgat', name: 'Manavgat', type: 'Şelale/Doğa', hotels: 200, avgPrice: 850 },
      { id: 'kas', name: 'Kaş', type: 'Dalış/Butik', hotels: 90, avgPrice: 1100 },
      { id: 'olympos', name: 'Olimpos', type: 'Doğa/Macera', hotels: 60, avgPrice: 600 },
      { id: 'cirali', name: 'Çıralı', type: 'Sakin/Doğa', hotels: 45, avgPrice: 750 },
      { id: 'finike', name: 'Finike', type: 'Sakin Plaj', hotels: 35, avgPrice: 550 },
      { id: 'demre', name: 'Demre', type: 'Tarihi/Kültür', hotels: 25, avgPrice: 500 },
      { id: 'kumluca', name: 'Kumluca', type: 'Sera Turizmi', hotels: 30, avgPrice: 450 },
      { id: 'serik', name: 'Serik', type: 'Golf/Spa', hotels: 85, avgPrice: 1800 }
    ],
    tags: ['deniz', 'güneş', 'kültür', 'golf', 'all-inclusive', 'aile', 'balayı', 'lüks']
  },
  {
    id: 'istanbul',
    name: 'İstanbul',
    region: 'Marmara',
    province: 'İstanbul',
    coordinates: { lat: 41.0082, lng: 28.9784 },
    airport: 'IST',
    airportName: 'İstanbul Havalimanı',
    population: 15_840_900,
    touristCapacity: 20_000_000,
    seasonPeak: 'Nisan-Ekim',
    description: 'İki kıtayı birleştiren tarihi ve kültürel başkent',
    highlights: ['Ayasofya', 'Topkapı Sarayı', 'Kapalı Çarşı', 'Boğaz Turu', 'Sultanahmet'],
    districts: [
      { id: 'sultanahmet', name: 'Sultanahmet', type: 'Tarihi Merkez', hotels: 200, avgPrice: 1200 },
      { id: 'taksim', name: 'Taksim', type: 'Modern Merkez', hotels: 180, avgPrice: 1000 },
      { id: 'besiktas', name: 'Beşiktaş', type: 'Boğaz', hotels: 95, avgPrice: 1400 },
      { id: 'kadikoy', name: 'Kadıköy', type: 'Anadolu Yakası', hotels: 110, avgPrice: 800 },
      { id: 'sisli', name: 'Şişli', type: 'İş Merkezi', hotels: 150, avgPrice: 900 },
      { id: 'ortakoy', name: 'Ortaköy', type: 'Boğaz/Gece', hotels: 45, avgPrice: 1600 },
      { id: 'bebek', name: 'Bebek', type: 'Lüks Boğaz', hotels: 25, avgPrice: 2500 }
    ],
    tags: ['kültür', 'tarih', 'boğaz', 'müze', 'alışveriş', 'gece hayatı', 'iş']
  },
  {
    id: 'izmir',
    name: 'İzmir',
    region: 'Ege',
    province: 'İzmir',
    coordinates: { lat: 38.4192, lng: 27.1287 },
    airport: 'ADB',
    airportName: 'Adnan Menderes Havalimanı',
    population: 4_394_694,
    touristCapacity: 8_000_000,
    seasonPeak: 'Mayıs-Ekim',
    description: 'Ege\'nin incisi, modern ve tarihi dokusuyla büyüleyen şehir',
    highlights: ['Kordon', 'Kemeraltı', 'Efes', 'Alaçatı', 'Çeşme'],
    districts: [
      { id: 'alsancak', name: 'Alsancak', type: 'Modern Merkez', hotels: 85, avgPrice: 850 },
      { id: 'cesme', name: 'Çeşme', type: 'Plaj/Rüzgar Sörfü', hotels: 180, avgPrice: 1400 },
      { id: 'alacati', name: 'Alaçatı', type: 'Butik/Şık', hotels: 120, avgPrice: 1800 },
      { id: 'kusadasi', name: 'Kuşadası', type: 'Kruvaziyer/Plaj', hotels: 200, avgPrice: 1100 },
      { id: 'foca', name: 'Foça', type: 'Sakin/Doğa', hotels: 60, avgPrice: 700 },
      { id: 'urla', name: 'Urla', type: 'Butik/Şarap', hotels: 45, avgPrice: 1200 }
    ],
    tags: ['deniz', 'rüzgar sörfü', 'şarap', 'butik', 'efes', 'kültür']
  },
  {
    id: 'bodrum',
    name: 'Bodrum',
    region: 'Ege',
    province: 'Muğla',
    coordinates: { lat: 37.0344, lng: 27.4305 },
    airport: 'BJV',
    airportName: 'Bodrum-Milas Havalimanı',
    population: 179_097,
    touristCapacity: 3_500_000,
    seasonPeak: 'Haziran-Eylül',
    description: 'Ege\'nin parlayan yıldızı, marina ve gece hayatıyla ünlü',
    highlights: ['Bodrum Kalesi', 'Marina', 'Gümbet', 'Bitez', 'Türkbükü'],
    districts: [
      { id: 'merkez', name: 'Bodrum Merkez', type: 'Marina/Gece', hotels: 150, avgPrice: 1600 },
      { id: 'turkbuku', name: 'Türkbükü', type: 'Lüks/VIP', hotels: 35, avgPrice: 4500 },
      { id: 'yalikavak', name: 'Yalıkavak', type: 'Marina/Lüks', hotels: 80, avgPrice: 2800 },
      { id: 'bitez', name: 'Bitez', type: 'Sakin Plaj', hotels: 90, avgPrice: 1200 },
      { id: 'gumbet', name: 'Gümbet', type: 'Gençlik/Parti', hotels: 120, avgPrice: 1000 },
      { id: 'gumusluk', name: 'Gümüşlük', type: 'Sakin/Balık', hotels: 40, avgPrice: 1400 }
    ],
    tags: ['marina', 'gece hayatı', 'lüks', 'yat', 'plaj', 'butik']
  },
  {
    id: 'fethiye',
    name: 'Fethiye',
    region: 'Ege',
    province: 'Muğla',
    coordinates: { lat: 36.6441, lng: 29.1167 },
    airport: 'DLM',
    airportName: 'Dalaman Havalimanı',
    population: 162_686,
    touristCapacity: 2_800_000,
    seasonPeak: 'Mayıs-Ekim',
    description: 'Turkuaz sularıyla ünlü, yamaç paraşütü cenneti',
    highlights: ['Ölüdeniz', 'Kelebekler Vadisi', 'Saklıkent', 'Likya Yolu', '12 Adalar'],
    districts: [
      { id: 'oludeniz', name: 'Ölüdeniz', type: 'Plaj/Yamaç Paraşütü', hotels: 85, avgPrice: 1300 },
      { id: 'calis', name: 'Çalış', type: 'Uzun Plaj', hotels: 110, avgPrice: 900 },
      { id: 'hisaronu', name: 'Hisarönü', type: 'Gece Hayatı', hotels: 95, avgPrice: 800 },
      { id: 'kayakoy', name: 'Kayaköy', type: 'Tarihi Köy', hotels: 25, avgPrice: 650 }
    ],
    tags: ['yamaç paraşütü', 'turkuaz deniz', 'doğa', 'tekne turları', 'likya']
  },
  {
    id: 'marmaris',
    name: 'Marmaris',
    region: 'Ege',
    province: 'Muğla',
    coordinates: { lat: 36.8553, lng: 28.2744 },
    airport: 'DLM',
    airportName: 'Dalaman Havalimanı',
    population: 98_000,
    touristCapacity: 2_200_000,
    seasonPeak: 'Haziran-Eylül',
    description: 'Yat turizmi ve gece hayatının merkezi',
    highlights: ['Marmaris Marina', 'İçmeler', 'Turunc', 'Dalyan', 'Kleopatra Adası'],
    districts: [
      { id: 'merkez', name: 'Marmaris Merkez', type: 'Marina/Gece', hotels: 180, avgPrice: 1100 },
      { id: 'icmeler', name: 'İçmeler', type: 'Plaj/Aile', hotels: 120, avgPrice: 1000 },
      { id: 'turunc', name: 'Turunç', type: 'Sakin Koy', hotels: 45, avgPrice: 1200 },
      { id: 'armutalan', name: 'Armutalan', type: 'Merkezi', hotels: 85, avgPrice: 850 }
    ],
    tags: ['marina', 'yat', 'gece hayatı', 'tekne turları', 'plaj']
  },
  {
    id: 'ankara',
    name: 'Ankara',
    region: 'İç Anadolu',
    province: 'Ankara',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    airport: 'ESB',
    airportName: 'Esenboğa Havalimanı',
    population: 5_747_325,
    touristCapacity: 3_000_000,
    seasonPeak: 'Mart-Kasım',
    description: 'Türkiye\'nin başkenti, tarih ve modern mimari',
    highlights: ['Anıtkabir', 'Kocatepe Camii', 'Atakule', 'Anadolu Medeniyetleri Müzesi'],
    districts: [
      { id: 'kizilay', name: 'Kızılay', type: 'Merkez', hotels: 120, avgPrice: 700 },
      { id: 'cankaya', name: 'Çankaya', type: 'Modern', hotels: 80, avgPrice: 800 },
      { id: 'ulus', name: 'Ulus', type: 'Tarihi', hotels: 45, avgPrice: 550 }
    ],
    tags: ['başkent', 'tarih', 'müze', 'iş', 'kültür']
  },
  {
    id: 'cappadocia',
    name: 'Kapadokya',
    region: 'İç Anadolu',
    province: 'Nevşehir',
    coordinates: { lat: 38.6431, lng: 34.8286 },
    airport: 'NAV',
    airportName: 'Nevşehir Kapadokya Havalimanı',
    population: 320_000,
    touristCapacity: 4_000_000,
    seasonPeak: 'Nisan-Kasım',
    description: 'Peribacaları ve sıcak hava balonu ile dünyaca ünlü',
    highlights: ['Göreme', 'Uçhisar', 'Paşabağ', 'Derinkuyu', 'Sıcak Hava Balonu'],
    districts: [
      { id: 'goreme', name: 'Göreme', type: 'Mağara Otel', hotels: 180, avgPrice: 1400 },
      { id: 'urgup', name: 'Ürgüp', type: 'Tarihi Merkez', hotels: 120, avgPrice: 1100 },
      { id: 'uchisar', name: 'Uçhisar', type: 'Kale Manzara', hotels: 85, avgPrice: 1300 },
      { id: 'avanos', name: 'Avanos', type: 'Çömlekçilik', hotels: 60, avgPrice: 800 }
    ],
    tags: ['balon', 'mağara otel', 'peribacaları', 'unesco', 'doğa harikası']
  },
  {
    id: 'trabzon',
    name: 'Trabzon',
    region: 'Karadeniz',
    province: 'Trabzon',
    coordinates: { lat: 41.0015, lng: 39.7178 },
    airport: 'TZX',
    airportName: 'Trabzon Havalimanı',
    population: 811_901,
    touristCapacity: 2_500_000,
    seasonPeak: 'Mayıs-Eylül',
    description: 'Karadeniz\'in incisi, Sümela Manastırı',
    highlights: ['Sümela Manastırı', 'Uzungöl', 'Atatürk Köşkü', 'Ayder Yaylası'],
    districts: [
      { id: 'merkez', name: 'Trabzon Merkez', type: 'Şehir', hotels: 90, avgPrice: 650 },
      { id: 'uzungol', name: 'Uzungöl', type: 'Doğa/Göl', hotels: 65, avgPrice: 800 },
      { id: 'ayder', name: 'Ayder Yaylası', type: 'Yayla/Spa', hotels: 45, avgPrice: 900 }
    ],
    tags: ['doğa', 'yayla', 'manastır', 'karadeniz', 'kültür']
  },
  {
    id: 'bursa',
    name: 'Bursa',
    region: 'Marmara',
    province: 'Bursa',
    coordinates: { lat: 40.1826, lng: 29.0665 },
    airport: 'YEI',
    airportName: 'Yenişehir Havalimanı',
    population: 3_147_818,
    touristCapacity: 3_500_000,
    seasonPeak: 'Kış (Kayak), Bahar',
    description: 'Osmanlı\'nın ilk başkenti, Uludağ kayak merkezi',
    highlights: ['Uludağ', 'Yeşil Türbe', 'Ulu Camii', 'Cumalıkızık', 'Termal'],
    districts: [
      { id: 'osmangazi', name: 'Osmangazi', type: 'Merkez', hotels: 110, avgPrice: 700 },
      { id: 'uludag', name: 'Uludağ', type: 'Kayak', hotels: 85, avgPrice: 1800 },
      { id: 'mudanya', name: 'Mudanya', type: 'Sahil', hotels: 45, avgPrice: 600 }
    ],
    tags: ['kayak', 'termal', 'osmanlı', 'tarihi', 'dağ']
  },
  {
    id: 'pamukkale',
    name: 'Pamukkale',
    region: 'Ege',
    province: 'Denizli',
    coordinates: { lat: 37.9205, lng: 29.1216 },
    airport: 'DNZ',
    airportName: 'Denizli Çardak Havalimanı',
    population: 650_000,
    touristCapacity: 2_800_000,
    seasonPeak: 'Mart-Kasım',
    description: 'Beyaz kireç taraçaları ve termal havuzlar',
    highlights: ['Travertenler', 'Hierapolis', 'Kleopatra Havuzu', 'Kaklık Mağarası'],
    districts: [
      { id: 'pamukkale', name: 'Pamukkale Merkez', type: 'Termal/Tarihi', hotels: 120, avgPrice: 900 },
      { id: 'karahayit', name: 'Karahayıt', type: 'Termal', hotels: 65, avgPrice: 700 }
    ],
    tags: ['termal', 'traverten', 'unesco', 'spa', 'antik kent']
  }
];

// ==================== HOTELS DATABASE ====================
export const HOTELS_DATA = {
  // ANTALYA - BELEK
  belek: [
    {
      name: 'Regnum Carya Golf & Spa Resort',
      slug: 'regnum-carya-golf-spa-resort',
      city: 'Antalya',
      district: 'Belek',
      stars: 5,
      rating: 9.4,
      reviewCount: 4850,
      pricePerNight: { min: 3500, max: 8500, currency: 'TRY' },
      images: ['/hotels/regnum-carya-1.jpg', '/hotels/regnum-carya-2.jpg'],
      amenities: ['All Inclusive', 'Golf', 'Spa', 'Aquapark', 'Kids Club', 'Private Beach', 'WiFi'],
      roomTypes: ['Standard Room', 'Suite', 'Villa', 'Presidential Suite'],
      coordinates: { lat: 36.8618, lng: 31.0558 },
      description: 'G7 zirvesine ev sahipliği yapmış lüks resort. 18 delikli golf sahası, özel plaj.',
      highlights: ['G7 Zirvesi Oteli', 'Championship Golf', 'Altın Palmiye Ödüllü'],
      nearbyAttractions: ['Aspendos (15km)', 'Antalya Merkez (30km)'],
      checkIn: '14:00',
      checkOut: '12:00',
      cancellationPolicy: '48 saat öncesine kadar ücretsiz iptal',
      tags: ['lüks', 'golf', 'spa', 'aile', 'all-inclusive'],
      seo: {
        title: 'Regnum Carya Golf & Spa Resort Belek - 5 Yıldızlı Lüks Otel',
        description: 'G7 zirvesine ev sahipliği yapmış Regnum Carya, Belek\'in en lüks oteli. Golf, spa ve all-inclusive konsept.',
        keywords: 'belek otel, golf resort, lüks otel belek, regnum carya, g7 oteli'
      }
    },
    {
      name: 'Rixos Premium Belek',
      slug: 'rixos-premium-belek',
      city: 'Antalya',
      district: 'Belek',
      stars: 5,
      rating: 9.2,
      reviewCount: 5120,
      pricePerNight: { min: 4200, max: 12000, currency: 'TRY' },
      images: ['/hotels/rixos-belek-1.jpg'],
      amenities: ['Ultra All Inclusive', 'Aquapark', 'Spa', 'Kids Club', 'Private Beach'],
      roomTypes: ['Deluxe Room', 'Suite', 'Villa'],
      coordinates: { lat: 36.8595, lng: 31.0542 },
      description: 'Ultra lüks Rixos zincirinin Belek\'teki en prestijli oteli.',
      tags: ['ultra-lüks', 'aile', 'all-inclusive', 'aquapark'],
      seo: {
        title: 'Rixos Premium Belek - Ultra All Inclusive Lüks Resort',
        description: 'Rixos Premium Belek ultra all inclusive konseptiyle aileniz için unutulmaz tatil deneyimi sunuyor.',
        keywords: 'rixos belek, ultra all inclusive, belek lüks otel, aile oteli belek'
      }
    }
  ],

  // ANTALYA - LARA
  lara: [
    {
      name: 'Delphin Diva Premiere',
      slug: 'delphin-diva-premiere',
      city: 'Antalya',
      district: 'Lara',
      stars: 5,
      rating: 9.0,
      reviewCount: 3680,
      pricePerNight: { min: 2800, max: 7500, currency: 'TRY' },
      images: ['/hotels/delphin-diva-1.jpg'],
      amenities: ['All Inclusive', 'Spa', 'Aquapark', 'Kids Club', 'Private Beach'],
      roomTypes: ['Standard', 'Family Room', 'Suite'],
      coordinates: { lat: 36.8342, lng: 30.7896 },
      description: 'Lara\'nın ünlü kumsal plajında konumlanmış aile dostu resort.',
      tags: ['aile', 'all-inclusive', 'plaj', 'aquapark'],
      seo: {
        title: 'Delphin Diva Premiere Lara - All Inclusive Aile Oteli',
        description: 'Lara plajında all inclusive konseptle hizmet veren Delphin Diva, aileniz için mükemmel seçim.',
        keywords: 'lara otel, delphin diva, antalya aile oteli, lara plajı otel'
      }
    },
    {
      name: 'Titanic Beach Lara',
      slug: 'titanic-beach-lara',
      city: 'Antalya',
      district: 'Lara',
      stars: 5,
      rating: 8.9,
      reviewCount: 4200,
      pricePerNight: { min: 3200, max: 9000, currency: 'TRY' },
      images: ['/hotels/titanic-lara-1.jpg'],
      amenities: ['Ultra All Inclusive', 'Aquapark', 'Spa', 'Private Beach'],
      roomTypes: ['Standard Room', 'Family Suite', 'Presidential Suite'],
      coordinates: { lat: 36.8355, lng: 30.7925 },
      description: 'Titanic gemisini andıran mimarisiyle ünlü ultra lüks resort.',
      tags: ['ultra-lüks', 'aquapark', 'all-inclusive', 'aile'],
      seo: {
        title: 'Titanic Beach Lara - Ultra All Inclusive Resort Hotel',
        description: 'Titanic gemisi konseptli Lara\'nın en görkemli oteli. Ultra all inclusive ile sınırsız tatil.',
        keywords: 'titanic otel lara, ultra all inclusive lara, antalya titanic beach'
      }
    }
  ],

  // ANTALYA - KEMER
  kemer: [
    {
      name: 'Rixos Sungate',
      slug: 'rixos-sungate-kemer',
      city: 'Antalya',
      district: 'Kemer',
      stars: 5,
      rating: 9.1,
      reviewCount: 3920,
      pricePerNight: { min: 3800, max: 11000, currency: 'TRY' },
      images: ['/hotels/rixos-sungate-1.jpg'],
      amenities: ['Ultra All Inclusive', 'Aquapark', 'Spa', 'Kids Club', 'Private Beach'],
      roomTypes: ['Deluxe Room', 'Family Suite', 'Villa'],
      coordinates: { lat: 36.6012, lng: 30.5589 },
      description: 'Kemer\'in muhteşem doğasında Rixos konforu.',
      tags: ['ultra-lüks', 'doğa', 'all-inclusive', 'aile'],
      seo: {
        title: 'Rixos Sungate Kemer - Ultra All Inclusive Tatil Köyü',
        description: 'Kemer\'de Akdeniz ve Toros Dağları arasında Rixos Sungate ile lüks tatil.',
        keywords: 'rixos kemer, kemer otel, ultra all inclusive kemer, rixos sungate'
      }
    },
    {
      name: 'Orange County Resort Hotel Kemer',
      slug: 'orange-county-kemer',
      city: 'Antalya',
      district: 'Kemer',
      stars: 5,
      rating: 8.7,
      reviewCount: 2850,
      pricePerNight: { min: 2200, max: 6500, currency: 'TRY' },
      images: ['/hotels/orange-county-1.jpg'],
      amenities: ['All Inclusive', 'Aquapark', 'Spa', 'Animation', 'Private Beach'],
      roomTypes: ['Standard Room', 'Family Room', 'Bungalow'],
      coordinates: { lat: 36.5988, lng: 30.5567 },
      description: 'Geniş aquapark ve animasyon programlarıyla aile dostu otel.',
      tags: ['aile', 'aquapark', 'all-inclusive', 'animasyon'],
      seo: {
        title: 'Orange County Resort Kemer - Aile Dostu All Inclusive Otel',
        description: 'Kemer\'de aquapark ve animasyon programlarıyla aile tatili için ideal Orange County Resort.',
        keywords: 'orange county kemer, kemer aile oteli, aquapark oteli kemer'
      }
    }
  ],

  // ANTALYA - ALANYA
  alanya: [
    {
      name: 'Delphin Deluxe Resort',
      slug: 'delphin-deluxe-alanya',
      city: 'Antalya',
      district: 'Alanya',
      stars: 5,
      rating: 8.8,
      reviewCount: 4100,
      pricePerNight: { min: 2500, max: 7000, currency: 'TRY' },
      images: ['/hotels/delphin-alanya-1.jpg'],
      amenities: ['All Inclusive', 'Aquapark', 'Spa', 'Kids Club', 'Private Beach'],
      roomTypes: ['Standard Room', 'Family Room', 'Suite'],
      coordinates: { lat: 36.5444, lng: 31.9929 },
      description: 'Alanya\'nın en büyük aquapark\'ına sahip all inclusive resort.',
      tags: ['aquapark', 'aile', 'all-inclusive', 'eğlence'],
      seo: {
        title: 'Delphin Deluxe Alanya - Aquapark ve All Inclusive Otel',
        description: 'Alanya\'nın en büyük aquapark\'ı ile Delphin Deluxe Resort\'te sınırsız eğlence.',
        keywords: 'delphin alanya, alanya aquapark oteli, all inclusive alanya'
      }
    }
  ],

  // İSTANBUL - SULTANAHMET
  sultanahmet: [
    {
      name: 'Four Seasons Sultanahmet',
      slug: 'four-seasons-sultanahmet',
      city: 'İstanbul',
      district: 'Sultanahmet',
      stars: 5,
      rating: 9.3,
      reviewCount: 2890,
      pricePerNight: { min: 8000, max: 25000, currency: 'TRY' },
      images: ['/hotels/four-seasons-sultanahmet-1.jpg'],
      amenities: ['Spa', 'Restaurant', 'Bar', 'Concierge', 'Room Service', 'WiFi'],
      roomTypes: ['Deluxe Room', 'Executive Suite', 'Presidential Suite'],
      coordinates: { lat: 41.0054, lng: 28.9768 },
      description: 'Osmanlı hapishanesinden dönüştürülmüş tarihi lüks otel. Ayasofya manzarası.',
      highlights: ['Tarihi Bina', 'Ayasofya Manzarası', 'World\'s Best Hotels'],
      tags: ['lüks', 'tarihi', 'boutique', 'merkezi'],
      seo: {
        title: 'Four Seasons Sultanahmet - Tarihi Lüks Butik Otel İstanbul',
        description: 'Sultanahmet\'te Ayasofya manzaralı Four Seasons ile tarihi dokuyla lüks konfor.',
        keywords: 'four seasons istanbul, sultanahmet lüks otel, ayasofya otel'
      }
    }
  ],

  // BODRUM - MERKEZ
  bodrum_merkez: [
    {
      name: 'The Marmara Bodrum',
      slug: 'marmara-bodrum',
      city: 'Bodrum',
      district: 'Bodrum Merkez',
      stars: 5,
      rating: 9.0,
      reviewCount: 1850,
      pricePerNight: { min: 4500, max: 15000, currency: 'TRY' },
      images: ['/hotels/marmara-bodrum-1.jpg'],
      amenities: ['Spa', 'Restaurant', 'Bar', 'Pool', 'Marina View', 'WiFi'],
      roomTypes: ['Deluxe Room', 'Sea View Suite', 'Duplex Suite'],
      coordinates: { lat: 37.0332, lng: 27.4287 },
      description: 'Bodrum marina manzaralı şık ve modern otel.',
      tags: ['boutique', 'marina', 'lüks', 'modern'],
      seo: {
        title: 'The Marmara Bodrum - Marina Manzaralı Lüks Otel',
        description: 'Bodrum marina\'da The Marmara ile modern lüks ve Ege güzelliği.',
        keywords: 'marmara bodrum, bodrum marina otel, lüks otel bodrum'
      }
    }
  ]
};

// ==================== FLIGHTS DATA ====================
export const AIRLINES = [
  { code: 'TK', name: 'Turkish Airlines', logo: '/airlines/tk.png', rating: 4.5 },
  { code: 'PC', name: 'Pegasus', logo: '/airlines/pc.png', rating: 4.2 },
  { code: 'XQ', name: 'SunExpress', logo: '/airlines/xq.png', rating: 4.1 },
  { code: 'VF', name: 'Anadolu Jet', logo: '/airlines/vf.png', rating: 4.0 }
];

export const FLIGHT_ROUTES = [
  // Istanbul - Antalya
  {
    from: 'IST', to: 'AYT', duration: '1h 20m', frequency: 'Günde 25+ sefer',
    airlines: ['TK', 'PC', 'XQ'],
    prices: { economy: { min: 800, max: 2500 }, business: { min: 3500, max: 7000 } }
  },
  // Istanbul - Bodrum
  {
    from: 'IST', to: 'BJV', duration: '1h 15m', frequency: 'Günde 15+ sefer',
    airlines: ['TK', 'PC'],
    prices: { economy: { min: 900, max: 3000 }, business: { min: 4000, max: 8000 } }
  },
  // Ankara - Antalya
  {
    from: 'ESB', to: 'AYT', duration: '1h 10m', frequency: 'Günde 8+ sefer',
    airlines: ['TK', 'PC'],
    prices: { economy: { min: 700, max: 2200 }, business: { min: 3000, max: 6500 } }
  },
  // İzmir - Antalya
  {
    from: 'ADB', to: 'AYT', duration: '55m', frequency: 'Günde 6+ sefer',
    airlines: ['XQ', 'PC'],
    prices: { economy: { min: 650, max: 1800 }, business: { min: 2800, max: 5500 } }
  }
];

// ==================== TOURS DATA ====================
export const TOURS = [
  {
    id: 'antalya-city-tour',
    name: 'Antalya Şehir Turu',
    city: 'Antalya',
    duration: '8 saat',
    price: { min: 350, max: 500, currency: 'TRY' },
    includes: ['Kaleiçi', 'Düden Şelalesi', 'Öğle Yemeği', 'Rehber'],
    description: 'Antalya\'nın tarihi ve doğal güzelliklerini keşfedin.',
    rating: 4.7,
    reviews: 1250,
    maxPeople: 15,
    languages: ['Türkçe', 'İngilizce', 'Rusça', 'Almanca'],
    tags: ['tarihi', 'kültür', 'doğa', 'fotoğraf']
  },
  {
    id: 'cappadocia-balloon',
    name: 'Kapadokya Balon Turu',
    city: 'Kapadokya',
    duration: '3 saat',
    price: { min: 2500, max: 4000, currency: 'TRY' },
    includes: ['1 Saat Balon Uçuşu', 'Kahvaltı', 'Şampanya', 'Sertifika'],
    description: 'Peribacalarının üzerinde gün doğumunu izleyin.',
    rating: 4.9,
    reviews: 8500,
    maxPeople: 20,
    languages: ['Türkçe', 'İngilizce'],
    highlights: ['Gün Doğumu', 'UNESCO Manzarası', 'Profesyonel Pilot'],
    tags: ['macera', 'romantik', 'fotoğraf', 'must-do']
  },
  {
    id: 'pamukkale-hierapolis',
    name: 'Pamukkale & Hierapolis Turu',
    city: 'Pamukkale',
    duration: '6 saat',
    price: { min: 450, max: 700, currency: 'TRY' },
    includes: ['Travertenler', 'Hierapolis Antik Kenti', 'Kleopatra Havuzu', 'Öğle Yemeği'],
    description: 'Beyaz cennet Pamukkale ve antik Hierapolis.',
    rating: 4.6,
    reviews: 2100,
    maxPeople: 25,
    tags: ['unesco', 'tarihi', 'doğa', 'termal']
  },
  {
    id: 'bosphorus-cruise',
    name: 'Boğaz Turu',
    city: 'İstanbul',
    duration: '2 saat',
    price: { min: 300, max: 800, currency: 'TRY' },
    includes: ['Boğaz Gezisi', 'Çay/Kahve', 'Rehber'],
    description: 'İstanbul Boğazı\'nda tekne turu.',
    rating: 4.5,
    reviews: 3800,
    maxPeople: 50,
    tags: ['boğaz', 'tekne', 'manzara', 'fotoğraf']
  }
];

// ==================== CAR RENTAL DATA ====================
export const CAR_RENTAL_COMPANIES = [
  { id: 'avis', name: 'Avis', logo: '/car-rental/avis.png', rating: 4.3 },
  { id: 'budget', name: 'Budget', logo: '/car-rental/budget.png', rating: 4.2 },
  { id: 'europcar', name: 'Europcar', logo: '/car-rental/europcar.png', rating: 4.4 },
  { id: 'sixt', name: 'Sixt', logo: '/car-rental/sixt.png', rating: 4.5 },
  { id: 'garenta', name: 'Garenta', logo: '/car-rental/garenta.png', rating: 4.1 }
];

export const CAR_TYPES = [
  {
    category: 'Ekonomi',
    models: ['Fiat Egea', 'Renault Symbol', 'Hyundai i20'],
    dailyPrice: { min: 350, max: 550 },
    features: ['Manuel', '5 Kişi', 'Klima', 'Bluetooth'],
    fuelPolicy: 'Dolu/Dolu'
  },
  {
    category: 'Kompakt',
    models: ['Volkswagen Golf', 'Ford Focus', 'Toyota Corolla'],
    dailyPrice: { min: 500, max: 800 },
    features: ['Otomatik', '5 Kişi', 'Klima', 'GPS'],
    fuelPolicy: 'Dolu/Dolu'
  },
  {
    category: 'SUV',
    models: ['Nissan Qashqai', 'Peugeot 3008', 'Hyundai Tucson'],
    dailyPrice: { min: 800, max: 1500 },
    features: ['Otomatik', '5 Kişi', '4x4', 'Deri Koltuk', 'GPS'],
    fuelPolicy: 'Dolu/Dolu'
  },
  {
    category: 'Lüks',
    models: ['BMW 5 Serisi', 'Mercedes E-Class', 'Audi A6'],
    dailyPrice: { min: 1800, max: 3500 },
    features: ['Otomatik', '5 Kişi', 'Premium Ses', 'Deri', 'GPS', 'Sunroof'],
    fuelPolicy: 'Dolu/Dolu'
  }
];

// ==================== ACTIVITIES DATA ====================
export const ACTIVITIES = [
  {
    id: 'paragliding-oludeniz',
    name: 'Yamaç Paraşütü - Ölüdeniz',
    city: 'Fethiye',
    location: 'Ölüdeniz',
    duration: '30-45 dakika',
    price: { min: 800, max: 1200, currency: 'TRY' },
    difficulty: 'Kolay',
    ageLimit: '7+',
    includes: ['Uçuş', 'Ekipman', 'Sigorta', 'Video Çekimi (Opsiyonel)'],
    description: 'Babadağ\'dan Ölüdeniz\'e muhteşem manzara eşliğinde yamaç paraşütü.',
    rating: 4.9,
    reviews: 5200,
    tags: ['macera', 'ekstrem', 'manzara', 'must-do']
  },
  {
    id: 'diving-kas',
    name: 'Dalış Turu - Kaş',
    city: 'Antalya',
    location: 'Kaş',
    duration: '4 saat',
    price: { min: 600, max: 1000, currency: 'TRY' },
    difficulty: 'Orta',
    ageLimit: '12+',
    includes: ['2 Dalış', 'Ekipman', 'Eğitmen', 'Sigorta'],
    description: 'Türkiye\'nin en iyi dalış noktalarından birinde sualtı keşfi.',
    rating: 4.8,
    reviews: 1850,
    tags: ['dalış', 'sualtı', 'macera', 'doğa']
  },
  {
    id: 'rafting-koprulu',
    name: 'Rafting - Köprülü Kanyon',
    city: 'Antalya',
    location: 'Köprülü Kanyon',
    duration: '6 saat',
    price: { min: 350, max: 550, currency: 'TRY' },
    difficulty: 'Orta',
    ageLimit: '10+',
    includes: ['Rafting', 'Ekipman', 'Öğle Yemeği', 'Sigorta'],
    description: 'Köprüçay\'ın berrak sularında adrenalin dolu rafting.',
    rating: 4.7,
    reviews: 2400,
    tags: ['rafting', 'macera', 'aile', 'doğa']
  },
  {
    id: 'atv-safari-belek',
    name: 'ATV Safari - Belek',
    city: 'Antalya',
    location: 'Belek',
    duration: '3 saat',
    price: { min: 400, max: 700, currency: 'TRY' },
    difficulty: 'Kolay',
    ageLimit: '16+ (Sürücü)',
    includes: ['ATV', 'Ekipman', 'Rehber', 'Sigorta'],
    description: 'Belek ormanlarında ATV ile off-road macerası.',
    rating: 4.6,
    reviews: 1600,
    tags: ['atv', 'macera', 'off-road', 'eğlence']
  }
];

// ==================== GROUP TRAVEL PACKAGES ====================
export const GROUP_PACKAGES = [
  {
    id: 'antalya-group-5days',
    name: 'Antalya Grup Tatili - 5 Gün',
    destination: 'Antalya',
    duration: '5 Gün / 4 Gece',
    minPeople: 10,
    maxPeople: 40,
    pricePerPerson: { min: 3500, max: 6500, currency: 'TRY' },
    includes: [
      'Uçak Bileti (İstanbul-Antalya-İstanbul)',
      '4 Gece Konaklama (All Inclusive)',
      'Havaalanı Transferleri',
      'Şehir Turu',
      'Grup Yemeği',
      'Rehber Hizmeti'
    ],
    hotels: ['Delphin Diva', 'Titanic Beach Lara', 'Orange County Kemer'],
    tags: ['grup', 'all-inclusive', 'ekonomik', 'aile']
  },
  {
    id: 'cappadocia-group-3days',
    name: 'Kapadokya Grup Turu - 3 Gün',
    destination: 'Kapadokya',
    duration: '3 Gün / 2 Gece',
    minPeople: 15,
    maxPeople: 30,
    pricePerPerson: { min: 2800, max: 5000, currency: 'TRY' },
    includes: [
      'Uçak Bileti (İstanbul-Kayseri-İstanbul)',
      '2 Gece Mağara Otel',
      'Balon Turu (Opsiyonel)',
      'Kapadokya Turu',
      'Havaalanı Transferleri'
    ],
    hotels: ['Göreme Mağara Otelleri', 'Ürgüp Boutique Hotels'],
    tags: ['grup', 'kültür', 'balon', 'macera']
  }
];

// ==================== SEO METADATA ====================
export const SEO_PAGES = {
  home: {
    title: 'Travel Ailydian - Türkiye\'nin En İyi Turizm ve Seyahat Platformu',
    description: 'Otel rezervasyonu, uçak bileti, tur paketleri, araç kiralama ve aktivite rezervasyonu. Antalya, İstanbul, Bodrum ve tüm Türkiye için en uygun fiyatlar.',
    keywords: 'otel rezervasyonu, uçak bileti, tur paketi, antalya otelleri, istanbul otelleri, tatil, seyahat'
  },
  antalya: {
    title: 'Antalya Otelleri - En Uygun Otel Fiyatları | Travel Ailydian',
    description: 'Antalya\'da Belek, Lara, Kemer, Side, Alanya\'da all inclusive oteller. En uygun fiyatlar ve fırsat paketleri.',
    keywords: 'antalya otelleri, belek otelleri, lara otelleri, all inclusive antalya, antalya tatil'
  },
  belek: {
    title: 'Belek Otelleri - Golf ve Lüks Oteller | Travel Ailydian',
    description: 'Belek\'te golf otelleri ve ultra lüks all inclusive resortlar. Regnum Carya, Rixos Belek ve daha fazlası.',
    keywords: 'belek otelleri, golf resort belek, lüks otel belek, all inclusive belek'
  }
};

export default {
  TURKEY_CITIES,
  HOTELS_DATA,
  AIRLINES,
  FLIGHT_ROUTES,
  TOURS,
  CAR_RENTAL_COMPANIES,
  CAR_TYPES,
  ACTIVITIES,
  GROUP_PACKAGES,
  SEO_PAGES
};
