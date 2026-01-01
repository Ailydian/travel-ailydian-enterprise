// SEO Automation System
// Automatically generates landing pages for every destination + category combination
// AI-powered content generation with unique descriptions
import { logger } from '../lib/logger/winston';

export interface SEOLandingPage {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  h2: string[];
  content: {
    intro: string;
    mainContent: string[];
    features: string[];
    destinations: string[];
    pricing: string;
    cta: string;
  };
  keywords: string[];
  canonicalUrl: string;
  structuredData: Record<string, any>;
  breadcrumbs: Array<{ name: string; url: string }>;
  faq: Array<{ question: string; answer: string }>;
}

// Turkish cities database
export const TURKISH_CITIES = [
  { name: 'İstanbul', slug: 'istanbul', region: 'Marmara', population: 'high', tourism: 'high' },
  { name: 'Ankara', slug: 'ankara', region: 'İç Anadolu', population: 'high', tourism: 'medium' },
  { name: 'İzmir', slug: 'izmir', region: 'Ege', population: 'high', tourism: 'high' },
  { name: 'Antalya', slug: 'antalya', region: 'Akdeniz', population: 'medium', tourism: 'high' },
  { name: 'Bodrum', slug: 'bodrum', region: 'Ege', population: 'low', tourism: 'high' },
  { name: 'Kapadokya', slug: 'kapadokya', region: 'İç Anadolu', population: 'low', tourism: 'high' },
  { name: 'Alaçatı', slug: 'alacati', region: 'Ege', population: 'low', tourism: 'high' },
  { name: 'Fethiye', slug: 'fethiye', region: 'Akdeniz', population: 'low', tourism: 'high' },
  { name: 'Kaş', slug: 'kas', region: 'Akdeniz', population: 'low', tourism: 'high' },
  { name: 'Marmaris', slug: 'marmaris', region: 'Ege', population: 'low', tourism: 'high' },
  { name: 'Çeşme', slug: 'cesme', region: 'Ege', population: 'low', tourism: 'high' },
  { name: 'Bursa', slug: 'bursa', region: 'Marmara', population: 'high', tourism: 'medium' },
  { name: 'Safranbolu', slug: 'safranbolu', region: 'Karadeniz', population: 'low', tourism: 'medium' },
  { name: 'Mardin', slug: 'mardin', region: 'Güneydoğu Anadolu', population: 'low', tourism: 'medium' },
  { name: 'Rize', slug: 'rize', region: 'Karadeniz', population: 'low', tourism: 'medium' },
  { name: 'Göreme', slug: 'goreme', region: 'İç Anadolu', population: 'low', tourism: 'high' },
  { name: 'Pamukkale', slug: 'pamukkale', region: 'Ege', population: 'low', tourism: 'high' },
  { name: 'Bozcaada', slug: 'bozcaada', region: 'Ege', population: 'low', tourism: 'medium' },
  { name: 'Akyaka', slug: 'akyaka', region: 'Ege', population: 'low', tourism: 'medium' },
  { name: 'Datça', slug: 'datca', region: 'Ege', population: 'low', tourism: 'medium' }
];

// Category templates
export const CATEGORY_TEMPLATES = {
  'otel': {
    singular: 'Otel',
    plural: 'Oteller',
    verbPhrase: 'konaklama yapmak',
    icon: '🏨',
    keywords: ['otel', 'konaklama', 'rezervasyon', 'tatil']
  },
  'termal-otel': {
    singular: 'Termal Otel',
    plural: 'Termal Oteller',
    verbPhrase: 'termal tatil yapmak',
    icon: '♨️',
    keywords: ['termal', 'kaplıca', 'şifalı su', 'spa']
  },
  'butik-otel': {
    singular: 'Butik Otel',
    plural: 'Butik Oteller',
    verbPhrase: 'butik konaklama yapmak',
    icon: '🏛️',
    keywords: ['butik', 'özel', 'tasarım', 'lüks']
  },
  'koy-oteli': {
    singular: 'Koy Oteli',
    plural: 'Koy Otelleri',
    verbPhrase: 'koy tatili yapmak',
    icon: '🏖️',
    keywords: ['koy', 'sahil', 'deniz', 'plaj']
  },
  'ev-kiralama': {
    singular: 'Ev Kiralama',
    plural: 'Ev Kiralamaları',
    verbPhrase: 'ev kiralamak',
    icon: '🏡',
    keywords: ['ev', 'villa', 'kiralık', 'yazlık']
  },
  'arac-kiralama': {
    singular: 'Araç Kiralama',
    plural: 'Araç Kiralamaları',
    verbPhrase: 'araç kiralamak',
    icon: '🚗',
    keywords: ['araç', 'araba', 'rent a car', 'kiralık']
  },
  'tur': {
    singular: 'Tur',
    plural: 'Turlar',
    verbPhrase: 'tur yapmak',
    icon: '🎭',
    keywords: ['tur', 'gezi', 'aktivite', 'rehberli']
  },
  'transfer': {
    singular: 'Transfer',
    plural: 'Transferler',
    verbPhrase: 'transfer hizmeti almak',
    icon: '🚕',
    keywords: ['transfer', 'ulaşım', 'havaalanı', 'karşılama']
  }
};

/**
 * Generate SEO-optimized landing page for destination + category
 */
export function generateLandingPage(
  citySlug: string,
  categorySlug: string
): SEOLandingPage {
  const city = TURKISH_CITIES.find(c => c.slug === citySlug);
  const category = CATEGORY_TEMPLATES[categorySlug as keyof typeof CATEGORY_TEMPLATES];

  if (!city || !category) {
    throw new Error('Invalid city or category');
  }

  const slug = `${citySlug}-${categorySlug}`;
  const title = `${city.name} ${category.plural} - En Uygun Fiyatlar | Travel LyDian`;
  const h1 = `${city.name}'da ${category.plural}`;

  // Generate unique content
  const intro = generateIntroContent(city.name, category);
  const mainContent = generateMainContent(city, category);
  const features = generateFeatures(city.name, category);
  const pricing = generatePricingInfo(city.name, category);

  // Generate FAQ
  const faq = generateFAQ(city.name, category);

  // Generate structured data (JSON-LD)
  const structuredData = generateStructuredData(city.name, category, slug);

  // Generate breadcrumbs
  const breadcrumbs = [
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Destinasyonlar', url: '/destinasyonlar' },
    { name: city.name, url: `/destinasyonlar/${citySlug}` },
    { name: category.plural, url: `/${slug}` }
  ];

  return {
    slug,
    title,
    metaDescription: `${city.name} ${category.plural.toLowerCase()} için en uygun fiyatlar. ${intro.substring(0, 100)}...`,
    h1,
    h2: [
      `${city.name} ${category.plural} Hakkında`,
      `En İyi ${city.name} ${category.plural}`,
      `${city.name}'da ${category.verbPhrase.charAt(0).toUpperCase() + category.verbPhrase.slice(1)} İçin İpuçları`,
      'Sıkça Sorulan Sorular'
    ],
    content: {
      intro,
      mainContent,
      features,
      destinations: [city.name],
      pricing,
      cta: `${city.name}'da ${category.singular} rezervasyonunuzu hemen yapın ve %20'ye varan indirimlerden yararlanın!`
    },
    keywords: [
      `${city.name.toLowerCase()} ${category.singular.toLowerCase()}`,
      `${city.name.toLowerCase()} ${category.plural.toLowerCase()}`,
      ...category.keywords.map(k => `${city.name.toLowerCase()} ${k}`),
      `${city.name.toLowerCase()} tatil`,
      `${city.name.toLowerCase()} rezervasyon`
    ],
    canonicalUrl: `https://holiday.ailydian.com/${slug}`,
    structuredData,
    breadcrumbs,
    faq
  };
}

/**
 * Generate intro content
 */
function generateIntroContent(cityName: string, category: any): string {
  return `${cityName}, Türkiye'nin en popüler tatil destinasyonlarından biridir. ${cityName}'da ${category.verbPhrase} isteyenler için geniş bir ${category.plural.toLowerCase()} yelpazesi sunuyoruz. Travel LyDian olarak, ${cityName}'daki en iyi ${category.plural.toLowerCase()}i karşılaştırabilir, en uygun fiyatları bulabilir ve anında rezervasyon yapabilirsiniz.`;
}

/**
 * Generate main content
 */
function generateMainContent(city: any, category: any): string[] {
  return [
    `${city.name} ${city.region} bölgesinde yer alan ve ${city.tourism === 'high' ? 'yoğun turist akışına sahip' : 'huzurlu'} bir destinasyondur. ${category.plural}, ${city.name}'ın en çok tercih edilen konaklama seçenekleri arasındadır.`,
    `Travel LyDian'da ${city.name} ${category.plural.toLowerCase()} için AI-powered arama sistemimiz sayesinde size en uygun seçenekleri sunuyoruz. Fiyat karşılaştırması yapabilir, kullanıcı yorumlarını okuyabilir ve güvenli ödeme ile rezervasyon yapabilirsiniz.`,
    `Bundle pricing sistemimiz ile ${city.name}'da ${category.singular.toLowerCase()} rezervasyonunuza transfer, tur veya araç kiralama ekleyerek %20'ye varan indirimlerden yararlanabilirsiniz.`
  ];
}

/**
 * Generate features
 */
function generateFeatures(cityName: string, category: any): string[] {
  return [
    `✓ ${cityName}'daki tüm ${category.plural.toLowerCase()} tek platformda`,
    '✓ AI-powered akıllı arama sistemi',
    '✓ En uygun fiyat garantisi',
    '✓ Anında rezervasyon onayı',
    '✓ %100 güvenli ödeme (3D Secure)',
    '✓ 7/24 Türkçe müşteri desteği',
    '✓ Ücretsiz iptal seçeneği',
    '✓ LyDian Miles ile puan kazanın',
    '✓ Bundle pricing ile %20 indirim'
  ];
}

/**
 * Generate pricing info
 */
function generatePricingInfo(cityName: string, category: any): string {
  return `${cityName} ${category.plural.toLowerCase()} için fiyatlar sezona, konuma ve özellikler göre değişiklik gösterir. Ortalama gecelik fiyatlar ₺500 ile ₺5,000 arasında değişmektedir. Erken rezervasyon yaparak %15'e varan indirimlerden, paket rezervasyon ile %20'ye varan indirimlerden yararlanabilirsiniz.`;
}

/**
 * Generate FAQ
 */
function generateFAQ(cityName: string, category: any): Array<{ question: string; answer: string }> {
  return [
    {
      question: `${cityName}'da ${category.singular.toLowerCase()} rezervasyonu nasıl yapılır?`,
      answer: `Travel LyDian'da ${cityName} ${category.plural.toLowerCase()} sayfasına girerek tarih ve misafir sayısı seçin, size uygun ${category.singular.toLowerCase()}i bulun ve "Rezervasyon Yap" butonuna tıklayın. Güvenli ödeme ile rezervasyonunuzu tamamlayın.`
    },
    {
      question: `${cityName} ${category.plural.toLowerCase()} fiyatları ne kadardır?`,
      answer: `${cityName} ${category.plural.toLowerCase()} fiyatları sezona, konuma ve özelliklere göre değişir. Ortalama fiyatlar gecelik ₺500-₺5,000 arasındadır. Erken rezervasyon ve paket rezervasyon indirimleri ile daha uygun fiyatlar bulabilirsiniz.`
    },
    {
      question: `${cityName}'da ${category.verbPhrase} için en iyi dönem ne zamandır?`,
      answer: `${cityName} için en iyi dönem genellikle ilkbahar (Nisan-Haziran) ve sonbahar (Eylül-Kasım) aylarıdır. Bu dönemlerde hava şartları daha uygundur ve fiyatlar daha makuldür.`
    },
    {
      question: 'İptal politikası nedir?',
      answer: 'Çoğu rezervasyon 24-48 saat öncesine kadar ücretsiz iptal edilebilir. Detaylı iptal koşulları rezervasyon sırasında gösterilir. Bazı özel fırsatlar ve paket rezervasyonlar farklı iptal koşullarına sahip olabilir.'
    },
    {
      question: 'LyDian Miles nedir?',
      answer: 'LyDian Miles, sadakat programımızdır. Her ₺1 harcamada 1 Mile kazanırsınız. 1,000 Miles = ₺50 indirim olarak kullanabilirsiniz. Miles ile rezervasyon yaparak daha fazla tasarruf edebilirsiniz.'
    }
  ];
}

/**
 * Generate JSON-LD structured data
 */
function generateStructuredData(cityName: string, category: any, slug: string): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${cityName} ${category.plural}`,
    description: `${cityName}'da ${category.plural.toLowerCase()} için en iyi seçenekler`,
    url: `https://holiday.ailydian.com/${slug}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Ana Sayfa',
          item: 'https://holiday.ailydian.com'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: cityName,
          item: `https://holiday.ailydian.com/destinasyonlar/${slug.split('-')[0]}`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: category.plural,
          item: `https://holiday.ailydian.com/${slug}`
        }
      ]
    },
    provider: {
      '@type': 'Organization',
      name: 'Travel LyDian',
      url: 'https://holiday.ailydian.com',
      logo: 'https://holiday.ailydian.com/logo.png'
    }
  };
}

/**
 * Generate all possible landing pages
 */
export function generateAllLandingPages(): SEOLandingPage[] {
  const pages: SEOLandingPage[] = [];

  TURKISH_CITIES.forEach(city => {
    Object.keys(CATEGORY_TEMPLATES).forEach(categorySlug => {
      try {
        const page = generateLandingPage(city.slug, categorySlug);
        pages.push(page);
      } catch (error) {
        logger.error(`Failed to generate page for ${city.slug} - ${categorySlug}:`, error);
      }
    });
  });

  return pages;
}

/**
 * Get sitemap URLs
 */
export function generateSitemapUrls(): string[] {
  const urls: string[] = [];

  TURKISH_CITIES.forEach(city => {
    Object.keys(CATEGORY_TEMPLATES).forEach(categorySlug => {
      urls.push(`/${city.slug}-${categorySlug}`);
    });
  });

  return urls;
}

/**
 * Get total possible pages count
 */
export function getTotalPagesCount(): number {
  return TURKISH_CITIES.length * Object.keys(CATEGORY_TEMPLATES).length;
}
