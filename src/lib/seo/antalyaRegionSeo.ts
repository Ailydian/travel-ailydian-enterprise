/**
 * Antalya Bölgesi Premium SEO Stratejisi
 * Alanya, Antalya ve tüm turizm ilçeleri için özel SEO optimizasyonu
 */

export interface TourismDistrict {
  id: string;
  name: string;
  slug: string;
  region: 'merkez' | 'bati' | 'dogu';
  popularFor: string[];
  mainKeywords: string[];
  longTailKeywords: string[];
  seasonalKeywords: {
    summer: string[];
    winter: string[];
    spring: string[];
    autumn: string[];
  };
  localAttractions: string[];
  hotelTypes: string[];
  activities: string[];
  coordinates: { lat: number; lng: number };
  metaTitle: string;
  metaDescription: string;
  structuredData: any;
}

// Antalya ve bağlı turizm ilçeleri
export const antalyaTourismDistricts: TourismDistrict[] = [
  // MERKEZ ANTALYA
  {
    id: 'antalya-merkez',
    name: 'Antalya Merkez',
    slug: 'antalya',
    region: 'merkez',
    popularFor: ['Tarihi Kent', 'Marina', 'Plajlar', 'Gece Hayatı', 'Alışveriş'],
    mainKeywords: [
      'antalya otelleri',
      'antalya tatil',
      'antalya otel',
      'antalya tur',
      'antalya gezilecek yerler',
      'antalya plajları',
      'kaleiçi antalya',
      'antalya all inclusive',
      'antalya ucuz otel',
      'antalya lüks otel'
    ],
    longTailKeywords: [
      'antalya merkez en iyi oteller',
      'antalya denize sıfır oteller',
      'antalya aile otelleri',
      'antalya balayı otelleri',
      'antalya butik otel önerileri',
      'antalya havuz başı otel',
      'kaleiçi pansiyon fiyatları',
      'antalya marina yakını otel',
      'antalya konyaaltı plajı otelleri',
      'antalya lara plajı otelleri'
    ],
    seasonalKeywords: {
      summer: [
        'antalya yaz tatili',
        'antalya deniz tatili',
        'antalya plaj otelleri',
        'antalya aquapark oteller',
        'antalya temmuz otelleri'
      ],
      winter: [
        'antalya kış tatili',
        'antalya kış otelleri',
        'antalya spa otelleri',
        'antalya termal oteller',
        'antalya yılbaşı otelleri'
      ],
      spring: [
        'antalya bahar tatili',
        'antalya nisan otelleri',
        'antalya golf otelleri',
        'antalya doğa turları'
      ],
      autumn: [
        'antalya sonbahar tatili',
        'antalya ekim otelleri',
        'antalya sakin oteller'
      ]
    },
    localAttractions: [
      'Kaleiçi',
      'Hadrian Kapısı',
      'Antalya Müzesi',
      'Düden Şelalesi',
      'Kurşunlu Şelalesi',
      'Konyaaltı Plajı',
      'Lara Plajı',
      'Antalya Marina',
      'Perge Antik Kenti',
      'Aspendos Antik Tiyatrosu'
    ],
    hotelTypes: [
      'Butik Otel',
      'All Inclusive Resort',
      'Şehir Oteli',
      'Plaj Oteli',
      'Marina Oteli',
      'Aile Oteli',
      'Balayı Oteli',
      'Lüks Resort'
    ],
    activities: [
      'Dalış',
      'Tekne Turu',
      'Rafting',
      'ATV Safari',
      'Jeep Safari',
      'Paraşüt',
      'Zipline',
      'Kültür Turları'
    ],
    coordinates: { lat: 36.8969, lng: 30.7133 },
    metaTitle: 'Antalya Otelleri - En İyi Otel Fiyatları ve Tatil Fırsatları | Travel LyDian',
    metaDescription: 'Antalya\'da en iyi otel seçenekleri! Kaleiçi, Lara, Konyaaltı\'nda lüks ve butik oteller. All inclusive tatil paketleri, denize sıfır oteller. Hemen rezervasyon yapın!',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'TouristDestination',
      'name': 'Antalya',
      'description': 'Türkiye\'nin turizm başkenti Antalya',
      'image': 'https://holiday.ailydian.com/images/destinations/antalya.jpg'
    }
  },

  // ALANYA
  {
    id: 'alanya',
    name: 'Alanya',
    slug: 'alanya',
    region: 'dogu',
    popularFor: ['Plajlar', 'Kalesi', 'All Inclusive Oteller', 'Gece Hayatı', 'Alışveriş'],
    mainKeywords: [
      'alanya otelleri',
      'alanya otel',
      'alanya tatil',
      'alanya all inclusive',
      'alanya ultra her şey dahil',
      'alanya plajları',
      'alanya kalesi',
      'alanya gezilecek yerler',
      'alanya ucuz otel',
      'alanya lüks otel'
    ],
    longTailKeywords: [
      'alanya denize sıfır oteller',
      'alanya en iyi all inclusive oteller',
      'alanya aile otelleri 2024',
      'alanya 5 yıldızlı oteller',
      'alanya ultra lüks oteller',
      'alanya kleopatra plajı otelleri',
      'alanya mahmutlar otelleri',
      'alanya okurcalar otelleri',
      'alanya türkler otelleri',
      'alanya konakli otelleri'
    ],
    seasonalKeywords: {
      summer: [
        'alanya yaz tatili 2024',
        'alanya temmuz otelleri',
        'alanya ağustos tatili',
        'alanya aquapark otelleri',
        'alanya plaj otelleri'
      ],
      winter: [
        'alanya kış tatili',
        'alanya aralık otelleri',
        'alanya yılbaşı programları',
        'alanya kış güneşi tatili'
      ],
      spring: [
        'alanya bahar tatili',
        'alanya mayıs tatili',
        'alanya erken rezervasyon',
        'alanya nisan otelleri'
      ],
      autumn: [
        'alanya eylül tatili',
        'alanya ekim otelleri',
        'alanya sonbahar fırsatları'
      ]
    },
    localAttractions: [
      'Alanya Kalesi',
      'Kleopatra Plajı',
      'Damlataş Mağarası',
      'Dim Mağarası',
      'Alanya Teleferik',
      'Alanya Aquapark',
      'Dim Çayı',
      'Kızıl Kule',
      'Alanya Arkeoloji Müzesi',
      'Sapadere Kanyonu'
    ],
    hotelTypes: [
      'Ultra All Inclusive',
      'All Inclusive Resort',
      'Her Şey Dahil',
      'Denize Sıfır Otel',
      'Aile Oteli',
      'Yetişkinlere Özel',
      'Aquapark Oteli',
      'Lüks Resort'
    ],
    activities: [
      'Plaj',
      'Tekne Turu',
      'Dalış',
      'Rafting',
      'Jeep Safari',
      'Quad Safari',
      'Paraşüt',
      'Deniz Bisikleti',
      'Aquapark',
      'Gece Kulüpleri'
    ],
    coordinates: { lat: 36.5437, lng: 31.9989 },
    metaTitle: 'Alanya Otelleri - All Inclusive Ultra Her Şey Dahil Tatil | Travel LyDian',
    metaDescription: 'Alanya\'da en iyi all inclusive oteller! Ultra lüks her şey dahil, denize sıfır 5 yıldızlı oteller. Kleopatra, Mahmutlar, Okurcalar\'da tatil fırsatları. Hemen rezerve edin!',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'TouristDestination',
      'name': 'Alanya',
      'description': 'All inclusive tatil cenneti Alanya'
    }
  },

  // BELEK
  {
    id: 'belek',
    name: 'Belek',
    slug: 'belek',
    region: 'dogu',
    popularFor: ['Golf', 'Lüks Oteller', 'Plajlar', 'Spa', 'Aile Tatili'],
    mainKeywords: [
      'belek otelleri',
      'belek otel',
      'belek tatil',
      'belek golf',
      'belek lüks otel',
      'belek all inclusive',
      'belek 5 yıldızlı oteller',
      'belek ultra lüks',
      'belek spa otelleri',
      'belek golf otelleri'
    ],
    longTailKeywords: [
      'belek en iyi golf otelleri',
      'belek ultra lüks all inclusive',
      'belek denize sıfır 5 yıldız',
      'belek aile otelleri aquapark',
      'belek vip tatil',
      'belek golf tatili',
      'belek spa wellness oteller',
      'belek balayı otelleri',
      'belek premium all inclusive'
    ],
    seasonalKeywords: {
      summer: ['belek yaz tatili', 'belek temmuz otelleri', 'belek aquapark'],
      winter: ['belek golf turları', 'belek kış tatili', 'belek yılbaşı'],
      spring: ['belek golf mevsimi', 'belek bahar tatili'],
      autumn: ['belek golf turnuvaları', 'belek sonbahar']
    },
    localAttractions: [
      'The Land of Legends',
      'Troy Aqua & Dolphinarium',
      'Golf Sahaları',
      'Belek Plajları',
      'Kadriye Plajı'
    ],
    hotelTypes: [
      'Ultra Lüks Resort',
      'Golf Resort',
      'Spa & Wellness',
      'All Inclusive Ultra',
      'Aquapark Oteli',
      'VIP Otel'
    ],
    activities: ['Golf', 'Spa', 'Aquapark', 'Plaj', 'Tekne Turu', 'At Binme'],
    coordinates: { lat: 36.8625, lng: 31.0556 },
    metaTitle: 'Belek Otelleri - Ultra Lüks Golf ve Spa Tatili | Travel LyDian',
    metaDescription: 'Belek\'te ultra lüks 5 yıldızlı oteller! Golf resort, spa & wellness, aquapark otelleri. The Land of Legends yakını premium tatil. En iyi fiyatlarla rezervasyon!',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'TouristDestination',
      'name': 'Belek'
    }
  },

  // SIDE
  {
    id: 'side',
    name: 'Side',
    slug: 'side',
    region: 'dogu',
    popularFor: ['Antik Kent', 'Plajlar', 'Aile Otelleri', 'Tarihi Yerler'],
    mainKeywords: [
      'side otelleri',
      'side otel',
      'side tatil',
      'side all inclusive',
      'side plajları',
      'side antik kent',
      'side gezilecek yerler',
      'side aile otelleri'
    ],
    longTailKeywords: [
      'side denize sıfır oteller',
      'side aile otelleri aquapark',
      'side antik kent yakını otel',
      'side sorgun otelleri',
      'side kumköy otelleri',
      'side titreyengöl otelleri',
      'side kızılağaç otelleri'
    ],
    seasonalKeywords: {
      summer: ['side yaz tatili', 'side haziran otelleri'],
      winter: ['side kış tatili', 'side sakin tatil'],
      spring: ['side bahar tatili', 'side mayıs'],
      autumn: ['side eylül tatili', 'side sonbahar']
    },
    localAttractions: [
      'Side Antik Tiyatrosu',
      'Apollon Tapınağı',
      'Side Müzesi',
      'Manavgat Şelalesi',
      'Side Plajları'
    ],
    hotelTypes: [
      'All Inclusive',
      'Aile Oteli',
      'Butik Otel',
      'Plaj Oteli',
      'Aquapark Oteli'
    ],
    activities: ['Antik Kent Turu', 'Plaj', 'Tekne Turu', 'Alışveriş', 'Dalış'],
    coordinates: { lat: 36.7674, lng: 31.3887 },
    metaTitle: 'Side Otelleri - Antik Kent ve Plaj Tatili | Travel LyDian',
    metaDescription: 'Side\'de tarihi dokuda tatil! Antik kent yakını all inclusive oteller, aile otelleri, denize sıfır tesisler. Sorgun, Kumköy, Titreyengöl otelleri. Hemen rezerve edin!',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'TouristDestination',
      'name': 'Side'
    }
  },

  // KEMER
  {
    id: 'kemer',
    name: 'Kemer',
    slug: 'kemer',
    region: 'bati',
    popularFor: ['Doğa', 'Plajlar', 'Dağlar', 'Marina', 'Dalış'],
    mainKeywords: [
      'kemer otelleri',
      'kemer otel',
      'kemer tatil',
      'kemer all inclusive',
      'kemer plajları',
      'kemer marina',
      'kemer gezilecek yerler'
    ],
    longTailKeywords: [
      'kemer denize sıfır oteller',
      'kemer çamyuva otelleri',
      'kemer beldibi otelleri',
      'kemer göynük otelleri',
      'kemer kiriş otelleri',
      'kemer tekirova otelleri',
      'kemer adrasan otelleri'
    ],
    seasonalKeywords: {
      summer: ['kemer yaz tatili', 'kemer temmuz'],
      winter: ['kemer kış tatili', 'kemer aralık'],
      spring: ['kemer bahar', 'kemer mayıs'],
      autumn: ['kemer sonbahar', 'kemer ekim']
    },
    localAttractions: [
      'Phaselis Antik Kenti',
      'Olympos Teleferik',
      'Yanartaş',
      'Kemer Marina',
      'Göynük Kanyonu'
    ],
    hotelTypes: [
      'All Inclusive Resort',
      'Dağ Evi',
      'Plaj Oteli',
      'Butik Otel',
      'Marina Oteli'
    ],
    activities: ['Dalış', 'Trekking', 'Teleferik', 'Tekne Turu', 'Dağ Bisikleti'],
    coordinates: { lat: 36.6025, lng: 30.5597 },
    metaTitle: 'Kemer Otelleri - Doğa ve Denizin Buluştuğu Tatil | Travel LyDian',
    metaDescription: 'Kemer\'de dağ ve deniz manzaralı oteller! All inclusive resort, marina otelleri, Çamyuva, Beldibi, Göynük\'te tatil. Dalış ve doğa turları. Hemen rezervasyon!',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'TouristDestination',
      'name': 'Kemer'
    }
  },

  // KAŞ
  {
    id: 'kas',
    name: 'Kaş',
    slug: 'kas',
    region: 'bati',
    popularFor: ['Dalış', 'Butik Oteller', 'Doğa', 'Sakin Tatil', 'Kültür'],
    mainKeywords: [
      'kaş otelleri',
      'kaş otel',
      'kaş tatil',
      'kaş pansiyon',
      'kaş butik otel',
      'kaş gezilecek yerler',
      'kaş dalış',
      'kaş sakin tatil'
    ],
    longTailKeywords: [
      'kaş deniz manzaralı oteller',
      'kaş merkez butik oteller',
      'kaş kalkan otelleri',
      'kaş romantik tatil',
      'kaş balkonlu otel',
      'kaş kahvaltı dahil pansiyon'
    ],
    seasonalKeywords: {
      summer: ['kaş yaz tatili', 'kaş dalış turu'],
      winter: ['kaş kış tatili', 'kaş sessiz tatil'],
      spring: ['kaş bahar', 'kaş doğa turları'],
      autumn: ['kaş sonbahar', 'kaş ekim']
    },
    localAttractions: [
      'Kaputaş Plajı',
      'Kekova Batık Şehir',
      'Patara Plajı',
      'Likya Yolu',
      'Kaş Antik Tiyatro'
    ],
    hotelTypes: [
      'Butik Otel',
      'Pansiyon',
      'Bungalov',
      'Deniz Evi',
      'Apart Otel'
    ],
    activities: ['Dalış', 'Kano', 'Trekking', 'Tekne Turu', 'Kültür Turları'],
    coordinates: { lat: 36.2019, lng: 29.6414 },
    metaTitle: 'Kaş Otelleri - Butik ve Sakin Tatil Cenneti | Travel LyDian',
    metaDescription: 'Kaş\'ta butik oteller ve pansiyonlar! Deniz manzaralı, balkonlu odalar. Kaputaş, Kekova yakını konaklama. Dalış ve doğa turları. Romantik tatil için ideal!',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'TouristDestination',
      'name': 'Kaş'
    }
  },

  // KALKAN
  {
    id: 'kalkan',
    name: 'Kalkan',
    slug: 'kalkan',
    region: 'bati',
    popularFor: ['Butik Oteller', 'Romantik Tatil', 'Deniz Manzarası', 'Lüks'],
    mainKeywords: [
      'kalkan otelleri',
      'kalkan otel',
      'kalkan butik otel',
      'kalkan tatil',
      'kalkan lüks otel',
      'kalkan balayı',
      'kalkan özel villa'
    ],
    longTailKeywords: [
      'kalkan deniz manzaralı oteller',
      'kalkan özel havuzlu villa',
      'kalkan romantik oteller',
      'kalkan balayı otelleri',
      'kalkan şık butik oteller'
    ],
    seasonalKeywords: {
      summer: ['kalkan yaz tatili', 'kalkan ağustos'],
      winter: ['kalkan kış tatili', 'kalkan sakin'],
      spring: ['kalkan bahar', 'kalkan nisan'],
      autumn: ['kalkan sonbahar', 'kalkan eylül']
    },
    localAttractions: [
      'Kalkan Marina',
      'Patara Plajı',
      'Kaputaş Plajı',
      'Kalkan Çarşı',
      'Xanthos Antik Kenti'
    ],
    hotelTypes: [
      'Butik Otel',
      'Özel Villa',
      'Lüks Pansiyon',
      'Deniz Evi'
    ],
    activities: ['Tekne Turu', 'Dalış', 'Alışveriş', 'Yemek Turları'],
    coordinates: { lat: 36.2666, lng: 29.4089 },
    metaTitle: 'Kalkan Otelleri - Lüks Butik ve Villa Tatili | Travel LyDian',
    metaDescription: 'Kalkan\'da lüks butik oteller ve villalar! Deniz manzaralı, özel havuzlu konaklama. Romantik balayı tatili için ideal. Kalkan marina yakını premium oteller!',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'TouristDestination',
      'name': 'Kalkan'
    }
  }
];

// SEO için dinamik sayfa oluşturucu
export function generateDistrictSeoPages() {
  return antalyaTourismDistricts.map(district => ({
    url: `/destinations/${district.slug}`,
    title: district.metaTitle,
    description: district.metaDescription,
    keywords: [
      ...district.mainKeywords,
      ...district.longTailKeywords.slice(0, 10),
      ...district.seasonalKeywords.summer.slice(0, 3),
      ...district.popularFor
    ],
    content: generateDistrictContent(district),
    structuredData: district.structuredData,
    lastModified: new Date()
  }));
}

// İçerik oluşturucu
function generateDistrictContent(district: TourismDistrict): string {
  return `
${district.name} Tatil Rehberi

${district.name}, Antalya'nın en popüler tatil destinasyonlarından biridir. ${district.popularFor.join(', ')} ile ünlü bu bölge, her yıl milyonlarca turisti ağırlamaktadır.

${district.name} Otelleri
${district.name}'da ${district.hotelTypes.join(', ')} gibi birçok farklı otel türü bulunmaktadır. ${district.mainKeywords.slice(0, 3).join(', ')} arayanlar için ideal seçenekler mevcuttur.

Gezilecek Yerler
${district.localAttractions.slice(0, 5).map(attr => `- ${attr}`).join('\n')}

Aktiviteler
${district.activities.slice(0, 5).map(act => `- ${act}`).join('\n')}

${district.name} için en iyi rezervasyon fırsatları Travel LyDian'da!
  `.trim();
}

// Mevsimsel keyword stratejisi
export function getSeasonalKeywords(district: TourismDistrict): string[] {
  const now = new Date();
  const month = now.getMonth();

  if (month >= 5 && month <= 8) {
    return district.seasonalKeywords.summer;
  } else if (month >= 11 || month <= 1) {
    return district.seasonalKeywords.winter;
  } else if (month >= 2 && month <= 4) {
    return district.seasonalKeywords.spring;
  } else {
    return district.seasonalKeywords.autumn;
  }
}

// Tüm ilçeler için toplu SEO metadata
export function getAllDistrictsSeoMetadata() {
  return {
    totalDistricts: antalyaTourismDistricts.length,
    totalKeywords: antalyaTourismDistricts.reduce(
      (sum, d) => sum + d.mainKeywords.length + d.longTailKeywords.length,
      0
    ),
    districts: antalyaTourismDistricts.map(d => ({
      name: d.name,
      slug: d.slug,
      mainKeywords: d.mainKeywords,
      metaTitle: d.metaTitle
    }))
  };
}

export default antalyaTourismDistricts;
