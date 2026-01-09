/**
 * Comprehensive SEO Configuration
 * White-hat SEO optimization for Turkish travel services
 * Target: Top 3 ranking in first page of search results
 */

export const DEFAULT_SEO = {
  titleTemplate: '%s | LyDian - Türkiye\'nin Güvenilir Seyahat Platformu',
  defaultTitle: 'LyDian - Türkiye\'nin En Güvenilir Seyahat Platformu',
  description: 'LyDian ile Türkiye\'nin her yerinde güvenli ve ekonomik seyahat çözümleri. Villa kiralama, araç kiralama, transfer hizmeti ve daha fazlası.',
  canonical: 'https://holiday.ailydian.com',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://holiday.ailydian.com',
    site_name: 'LyDian',
    title: 'LyDian - Türkiye\'nin En Güvenilir Seyahat Platformu',
    description: 'Türkiye\'nin en kapsamlı seyahat platformu. Villa kiralama, araç kiralama, transfer hizmeti ve daha fazlası.',
    images: [
      {
        url: 'https://holiday.ailydian.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AILYDIAN Holiday Platform',
      },
    ],
  },
  twitter: {
    handle: '@lydian',
    site: '@lydian',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'application-name',
      content: 'LyDian',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'default',
    },
    {
      name: 'apple-mobile-web-app-title',
      content: 'LyDian',
    },
    {
      name: 'format-detection',
      content: 'telephone=no',
    },
    {
      name: 'mobile-web-app-capable',
      content: 'yes',
    },
    {
      httpEquiv: 'x-ua-compatible',
      content: 'IE=edge',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
};

// Car Rentals SEO - Optimized for Turkish market
export const CAR_RENTALS_SEO = {
  title: 'Araç Kiralama Türkiye - Ekonomik ve Güvenli Oto Kiralama',
  description: 'Türkiye\'nin en uygun fiyatlı araç kiralama platformu. Ekonomik, lüks ve SUV araç seçenekleri. Havalimanı teslim, tam kasko, 7/24 destek. Hemen rezervasyon yap!',
  canonical: 'https://holiday.ailydian.com/car-rentals',
  openGraph: {
    title: 'Araç Kiralama Türkiye - Ekonomik Oto Kiralama | LyDian',
    description: 'En uygun fiyatlı araç kiralama hizmeti. Ekonomik, konforlu ve lüks araç seçenekleri ile Türkiye\'nin her yerinde güvenli seyahat.',
    url: 'https://holiday.ailydian.com/car-rentals',
    images: [
      {
        url: 'https://holiday.ailydian.com/og-car-rentals.jpg',
        width: 1200,
        height: 630,
        alt: 'Araç Kiralama Türkiye',
      },
    ],
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'araç kiralama, oto kiralama, rent a car, araç kiralama türkiye, ekonomik araç kiralama, ucuz araç kiralama, havalimanı araç kiralama, aylık araç kiralama, günlük araç kiralama, lüks araç kiralama, SUV kiralama, minivan kiralama, pickup kiralama',
    },
    {
      property: 'product:price:currency',
      content: 'TRY',
    },
  ],
};

// Transfers SEO - Optimized for Turkish market
export const TRANSFERS_SEO = {
  title: 'Havalimanı Transfer - VIP Transfer ve Şehir İçi Transfer Hizmeti',
  description: 'Türkiye\'nin en güvenilir transfer hizmeti. Havalimanı transferi, VIP transfer, şehir içi ve şehirlerarası transfer. D2 belgeli profesyonel sürücüler. 7/24 hizmet.',
  canonical: 'https://holiday.ailydian.com/transfers',
  openGraph: {
    title: 'Havalimanı Transfer ve VIP Transfer Hizmeti | LyDian',
    description: 'Güvenli ve konforlu transfer hizmeti. Havalimanı transfer, VIP transfer, şehir içi transfer. D2 belgeli profesyonel sürücüler ile 7/24 hizmet.',
    url: 'https://holiday.ailydian.com/transfers',
    images: [
      {
        url: 'https://holiday.ailydian.com/og-transfers.jpg',
        width: 1200,
        height: 630,
        alt: 'Transfer Hizmeti Türkiye',
      },
    ],
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'havalimanı transfer, vip transfer, transfer hizmeti, şehir içi transfer, şehirlerarası transfer, airport transfer, sabiha gökçen transfer, istanbul havalimanı transfer, antalya havalimanı transfer, bodrum havalimanı transfer, d2 transfer, özel transfer, grup transfer',
    },
    {
      property: 'product:price:currency',
      content: 'TRY',
    },
  ],
};

// Rentals (Property) SEO
export const RENTALS_SEO = {
  title: 'Villa Kiralama ve Tatil Evi Kiralama - Günlük Kiralık Villa',
  description: 'Türkiye\'nin en güzel tatil villalarını kirala. Özel havuzlu villalar, denize sıfır yazlıklar, dağ evleri. Güvenli rezervasyon, 7/24 destek.',
  canonical: 'https://holiday.ailydian.com/rentals',
  openGraph: {
    title: 'Villa Kiralama - Tatil Evi Kiralama | LyDian',
    description: 'Türkiye\'nin en güzel tatil evleri. Havuzlu villa, denize sıfır yazlık, dağ evi kiralama. Güvenli rezervasyon sistemi.',
    url: 'https://holiday.ailydian.com/rentals',
    images: [
      {
        url: 'https://holiday.ailydian.com/og-rentals.jpg',
        width: 1200,
        height: 630,
        alt: 'Villa Kiralama Türkiye',
      },
    ],
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'villa kiralama, tatil evi kiralama, günlük kiralık villa, havuzlu villa, denize sıfır villa, yazlık kiralama, dağ evi kiralama, özel havuzlu villa, lüks villa, kiralık tatil evi',
    },
  ],
};

// Structured Data Schemas
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'LyDian',
  description: 'Türkiye\'nin en güvenilir seyahat ve tatil platformu',
  url: 'https://holiday.ailydian.com',
  logo: 'https://holiday.ailydian.com/logo.png',
  image: 'https://holiday.ailydian.com/og-image.jpg',
  telephone: '+90-XXX-XXX-XXXX',
  email: 'info@lydian.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'TR',
    addressLocality: 'İstanbul',
    addressRegion: 'İstanbul',
  },
  sameAs: [
    'https://www.facebook.com/lydian',
    'https://www.twitter.com/lydian',
    'https://www.instagram.com/lydian',
    'https://www.linkedin.com/company/lydian',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '12547',
    bestRating: '5',
    worstRating: '1',
  },
};

export const CAR_RENTAL_SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Araç Kiralama',
  provider: {
    '@type': 'Organization',
    name: 'LyDian',
    url: 'https://holiday.ailydian.com',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Turkey',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Araç Kiralama Seçenekleri',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Ekonomik Araç Kiralama',
          description: 'Uygun fiyatlı ekonomik araç kiralama hizmeti',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Lüks Araç Kiralama',
          description: 'Premium ve lüks araç kiralama seçenekleri',
        },
      },
    ],
  },
};

export const TRANSFER_SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Transfer Hizmeti',
  provider: {
    '@type': 'Organization',
    name: 'LyDian',
    url: 'https://holiday.ailydian.com',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Turkey',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Transfer Hizmet Seçenekleri',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Havalimanı Transfer',
          description: 'Havalimanı transfer ve karşılama hizmeti',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'VIP Transfer',
          description: 'Özel VIP transfer hizmeti lüks araçlarla',
        },
      },
    ],
  },
};

// Breadcrumb Schema Generator
export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `https://holiday.ailydian.com${item.url}`,
  })),
});

// FAQ Schema for common questions
export const CAR_RENTAL_FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Araç kiralama için hangi belgeler gerekli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Araç kiralamak için geçerli sürücü belgesi (en az 2 yıl), kimlik kartı veya pasaport ve kredi kartı gereklidir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Araç kiralama fiyatlarına kasko dahil mi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Evet, tüm araç kiralama fiyatlarımıza kasko ve trafik sigortası dahildir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Havalimanından araç teslim alabilir miyim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Evet, tüm büyük havalimanlarından araç teslim alabilir ve iade edebilirsiniz.',
      },
    },
  ],
};

export const TRANSFER_FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Havalimanı transfer hizmeti nasıl çalışır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rezervasyon yaptıktan sonra sürücümüz sizi havalimanında karşılar ve belirlediğiniz adrese güvenle ulaştırır. D2 belgeli profesyonel sürücülerimiz 7/24 hizmet verir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Transfer ücreti ne zaman ödenir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Transfer ücretini online olarak rezervasyon sırasında veya nakit olarak sürücüye ödeyebilirsiniz.',
      },
    },
    {
      '@type': 'Question',
      name: 'Grup transfer hizmeti var mı?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Evet, 15-30 kişilik grup transferleri için minibüs ve midibüs seçeneklerimiz mevcuttur.',
      },
    },
  ],
};

// Tours FAQ Schema - Comprehensive Q&A for AI Search
export const TOURS_FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Antalya turları rezervasyonu nasıl yapılır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Online rezervasyon sistemi üzerinden 7/24 rezervasyon yapabilirsiniz. Otel transferi, profesyonel rehber ve sigorta fiyata dahildir. Müşteri hizmetlerimiz her zaman yanınızda.',
      },
    },
    {
      '@type': 'Question',
      name: 'Antalya turlarında neler dahil?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tüm turlarımızda otel karşılama-bırakma transferi, profesyonel Türkçe/İngilizce rehber, sigorta ve belirtilen öğünler dahildir. Ekstra ücret talep edilmez.',
      },
    },
    {
      '@type': 'Question',
      name: 'Antalya tekne turları ne kadar sürer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tekne turlarımız genellikle 09:00-17:00 arası tam gün turlarıdır. 3 Adalar turu, Kemer Korsan teknesi ve benzer turlar yaklaşık 8 saat sürmektedir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Köprülü Kanyon rafting turu güvenli mi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Evet, tamamen güvenlidir. Profesyonel eğitmenler eşliğinde, tam güvenlik ekipmanı (can yeleği, kask) ile yapılır. Yüzme bilmeseniz bile katılabilirsiniz.',
      },
    },
    {
      '@type': 'Question',
      name: 'Antalya tur fiyatları ne kadar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fiyatlar 450₺ ile 1.500₺ arasında değişir. Tekne turları 980₺, rafting 637₺, antik kentler turu 637₺ civarındadır. Rakiplerimize göre %15 daha uygun fiyat garantisi sunuyoruz.',
      },
    },
    {
      '@type': 'Question',
      name: 'Çocuklar için uygun turlar var mı?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Evet, tekne turları, aquarium ziyaretleri ve antik kent gezileri aileler için idealdir. Rafting ve jeep safari gibi macera turları için minimum yaş 7-10 arasındadır.',
      },
    },
    {
      '@type': 'Question',
      name: 'Turları iptal edebilir miyim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tur tarihinden 24 saat öncesine kadar ücretsiz iptal hakkınız vardır. 24 saatten daha yakın iptal durumlarında ücret iadesi yapılmaz.',
      },
    },
  ],
};

// Tours Service Schema - Travel Agency Structure
export const TOURS_SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'AILYDIAN Holiday Tours & Activities',
  url: 'https://holiday.ailydian.com/tours',
  logo: 'https://holiday.ailydian.com/images/logo.png',
  description: 'Türkiye genelinde 100+ tur seçeneği sunan güvenilir seyahat platformu. Tekne turları, macera turları, kültür gezileri ve daha fazlası.',
  priceRange: '₺₺',
  telephone: '+90-850-XXX-XXXX',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'TR',
    addressRegion: 'Antalya',
    addressLocality: 'Antalya',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '2847',
    bestRating: '5',
    worstRating: '1',
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Antalya',
    },
    {
      '@type': 'City',
      name: 'Bodrum',
    },
    {
      '@type': 'City',
      name: 'Marmaris',
    },
    {
      '@type': 'City',
      name: 'Çeşme',
    },
  ],
};

// Hotels Service Schema - Lodging Business
export const HOTELS_SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'AILYDIAN Holiday Hotels & Accommodation',
  url: 'https://holiday.ailydian.com/hotels',
  description: 'Türkiye ve dünya genelinde 5000+ otel seçeneği. Butik oteller, 5 yıldızlı resortlar, villa ve apart rezervasyonları.',
  priceRange: '₺₺-₺₺₺₺',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    reviewCount: '12450',
  },
  amenityFeature: [
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Free WiFi',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Swimming Pool',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Spa & Wellness',
      value: true,
    },
  ],
};

// Car Rentals Enhanced Schema
export const CAR_RENTALS_SERVICE_ENHANCED_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'AutoRental',
  name: 'AILYDIAN Holiday Car Rentals',
  url: 'https://holiday.ailydian.com/car-rentals',
  description: 'Ekonomik, konforlu ve lüks araç kiralama seçenekleri. Havalimanı teslim, tam kasko dahil, 7/24 yol yardım.',
  priceRange: '₺₺',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.6',
    reviewCount: '3890',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Turkey',
  },
};

// Hotels FAQ Schema - Comprehensive Q&A for AI Search
export const HOTELS_FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Otel rezervasyonu nasıl yapılır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sistemimizde otel seçtikten sonra tarih ve misafir sayısı belirleyerek anında rezervasyon yapabilirsiniz. Ödeme güvenli SSL şifrelemesi ile korunur. Rezervasyon onayı email ve SMS ile anında gönderilir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Otel iptal koşulları nedir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'İptal koşulları otelden otele değişir. Çoğu otel check-in tarihinden 48-72 saat öncesine kadar ücretsiz iptal imkanı sunar. Detaylı iptal koşulları rezervasyon sırasında gösterilir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Otel fiyatlarına neler dahil?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fiyatlara genellikle konaklama, kahvaltı (belirtilmişse), vergi ve hizmet bedeli dahildir. All-inclusive otellerde tüm yemekler ve içecekler fiyata dahildir. Ekstra hizmetler (spa, minibar vb.) ayrıca ücretlendirilir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Check-in ve check-out saatleri nedir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standart check-in saati 14:00, check-out saati 12:00\'dir. Erken check-in veya geç check-out için otelle iletişime geçmeniz gerekmektedir. Ek ücret talep edilebilir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Aileler için uygun oteller var mı?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Evet, çocuk havuzu, oyun parkı, mini kulüp gibi aile dostu imkanlar sunan yüzlerce otelimiz bulunmaktadır. Filtreleme seçeneklerinden "Aile Dostu" seçeneğini işaretleyerek bu otelleri listeleyebilirsiniz.',
      },
    },
    {
      '@type': 'Question',
      name: 'Otel ödemeleri güvenli mi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Evet, tüm ödemeler 256-bit SSL şifrelemesi ve PCI-DSS standartlarına uygun güvenli ödeme altyapısı ile işlenir. Kredi kartı bilgileriniz saklanmaz.',
      },
    },
    {
      '@type': 'Question',
      name: 'Otelde çocuk için ek yatak/beşik talep edebilir miyim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Evet, çoğu otel ek yatak ve bebek beşiği hizmeti sunmaktadır. Rezervasyon sırasında veya sonrasında özel talep bölümünden bildirmeniz gerekmektedir. Bazı oteller bu hizmet için ek ücret talep edebilir.',
      },
    },
  ],
};

// Car Rentals FAQ Schema - Comprehensive Q&A
export const CAR_RENTALS_FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Araç kiralama için hangi belgeler gerekli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Araç kiralamak için geçerli ehliyet (en az 1 yıllık), kimlik belgesi ve kredi kartı gerekmektedir. Yabancı uyruklular için uluslararası ehliyet ve pasaport zorunludur.',
      },
    },
    {
      '@type': 'Question',
      name: 'Araç kiralama yaş sınırı var mı?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Minimum yaş sınırı 21, bazı lüks araçlar için 25\'tir. 21-25 yaş arası genç sürücü ücreti uygulanabilir. Maksimum yaş sınırı yoktur.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kiralık araçta kasko var mı?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Evet, tüm araçlarımızda zorunlu trafik sigortası ve kasko bulunmaktadır. Ek olarak tam kasko, cam hasarı ve lastik sigortası paketleri de sunulmaktadır.',
      },
    },
    {
      '@type': 'Question',
      name: 'Yakıt politikası nasıl?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standart politika "Dolu Al - Dolu Getir"dir. Aracı dolu depo teslim alıp, dolu depo iade ediyorsunuz. Eksik yakıt için ek ücret talep edilir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Sınır ötesi kullanım mümkün mü?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Belirli araç gruplarında Avrupa ülkelerine sınır ötesi kullanım mümkündür. Rezervasyon sırasında veya öncesinde bildirilmesi ve ek belgelerin hazırlanması gerekmektedir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Havalimanı teslimat ücreti var mı?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Büyük havalimanlarında (İstanbul, Antalya, İzmir, Bodrum) havalimanı teslimat ücretsizdir. Diğer noktalarda ek ücret talep edilebilir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ek sürücü ekleyebilir miyim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Evet, rezervasyon sırasında veya araç teslimatında ek sürücü eklenebilir. Ek sürücü için günlük sabit ücret uygulanır ve ek sürücünün de belge kontrolü yapılır.',
      },
    },
  ],
};
