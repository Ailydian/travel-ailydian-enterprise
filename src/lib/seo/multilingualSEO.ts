/**
 * Multilingual SEO Configuration
 * Enterprise-grade SEO system for 8 languages
 * Optimized for global reach and search engine visibility
 */

import { NextSeoProps } from 'next-seo';

interface MultilingualSEOConfig {
  locale: string;
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
}

const DOMAIN = 'https://holiday.ailydian.com';

const SEO_DATA: Record<string, MultilingualSEOConfig> = {
  tr: {
    locale: 'tr_TR',
    title: 'Holiday.AILYDIAN - AI Destekli Seyahat ve Turizm Platformu',
    description: 'Yapay zeka ile kişiselleştirilmiş tatil önerileri, otel rezervasyonları, uçuş biletleri, araç kiralama ve tur rezervasyonları. Güvenli ödeme, 7/24 destek.',
    keywords: [
      'tatil',
      'seyahat',
      'turizm',
      'otel rezervasyonu',
      'uçak bileti',
      'araç kiralama',
      'tur',
      'AI seyahat asistanı',
      'yapay zeka',
      'blockchain ödeme',
      'güvenli rezervasyon'
    ],
    canonical: `${DOMAIN}/tr`
  },
  en: {
    locale: 'en_US',
    title: 'Holiday.AILYDIAN - AI-Powered Travel & Tourism Platform',
    description: 'AI-personalized vacation recommendations, hotel bookings, flight tickets, car rentals, and tour reservations. Secure payments, 24/7 support.',
    keywords: [
      'vacation',
      'travel',
      'tourism',
      'hotel booking',
      'flight tickets',
      'car rental',
      'tours',
      'AI travel assistant',
      'artificial intelligence',
      'blockchain payment',
      'secure booking'
    ],
    canonical: `${DOMAIN}/en`
  },
  de: {
    locale: 'de_DE',
    title: 'Holiday.AILYDIAN - KI-gestützte Reise- und Tourismusplattform',
    description: 'KI-personalisierte Urlaubsempfehlungen, Hotelbuchungen, Flugtickets, Autovermietung und Tourbuchungen. Sichere Zahlungen, 24/7 Support.',
    keywords: [
      'Urlaub',
      'Reisen',
      'Tourismus',
      'Hotelbuchung',
      'Flugtickets',
      'Autovermietung',
      'Touren',
      'KI-Reiseassistent',
      'künstliche Intelligenz',
      'Blockchain-Zahlung',
      'sichere Buchung'
    ],
    canonical: `${DOMAIN}/de`
  },
  ru: {
    locale: 'ru_RU',
    title: 'Holiday.AILYDIAN - Платформа путешествий с ИИ',
    description: 'Персонализированные рекомендации отпусков с ИИ, бронирование отелей, авиабилеты, аренда автомобилей, бронирование туров. Безопасные платежи, поддержка 24/7.',
    keywords: [
      'отпуск',
      'путешествия',
      'туризм',
      'бронирование отелей',
      'авиабилеты',
      'аренда автомобилей',
      'туры',
      'ИИ-помощник',
      'искусственный интеллект',
      'блокчейн-оплата',
      'безопасное бронирование'
    ],
    canonical: `${DOMAIN}/ru`
  },
  ar: {
    locale: 'ar_SA',
    title: 'Holiday.AILYDIAN - منصة السفر والسياحة بالذكاء الاصطناعي',
    description: 'توصيات عطلات مخصصة بالذكاء الاصطناعي، حجوزات فنادق، تذاكر طيران، تأجير سيارات، حجوزات جولات. مدفوعات آمنة، دعم على مدار الساعة.',
    keywords: [
      'عطلة',
      'سفر',
      'سياحة',
      'حجز فنادق',
      'تذاكر طيران',
      'تأجير سيارات',
      'جولات',
      'مساعد سفر AI',
      'ذكاء اصطناعي',
      'دفع البلوكتشين',
      'حجز آمن'
    ],
    canonical: `${DOMAIN}/ar`
  },
  fa: {
    locale: 'fa_IR',
    title: 'Holiday.AILYDIAN - پلتفرم سفر و گردشگری هوش مصنوعی',
    description: 'پیشنهادات تعطیلات شخصی‌سازی شده با هوش مصنوعی، رزرو هتل، بلیط هواپیما، اجاره خودرو، رزرو تور. پرداخت امن، پشتیبانی 24/7.',
    keywords: [
      'تعطیلات',
      'سفر',
      'گردشگری',
      'رزرو هتل',
      'بلیط هواپیما',
      'اجاره خودرو',
      'تورها',
      'دستیار سفر هوش مصنوعی',
      'هوش مصنوعی',
      'پرداخت بلاکچین',
      'رزرو امن'
    ],
    canonical: `${DOMAIN}/fa`
  },
  fr: {
    locale: 'fr_FR',
    title: 'Holiday.AILYDIAN - Plateforme de voyage et tourisme IA',
    description: 'Recommandations de vacances personnalisées par IA, réservations d\'hôtels, billets d\'avion, location de voitures, réservations de circuits. Paiements sécurisés, assistance 24h/7.',
    keywords: [
      'vacances',
      'voyage',
      'tourisme',
      'réservation d\'hôtel',
      'billets d\'avion',
      'location de voiture',
      'circuits',
      'assistant de voyage IA',
      'intelligence artificielle',
      'paiement blockchain',
      'réservation sécurisée'
    ],
    canonical: `${DOMAIN}/fr`
  },
  el: {
    locale: 'el_GR',
    title: 'Holiday.AILYDIAN - Πλατφόρμα Ταξιδιών με Τεχνητή Νοημοσύνη',
    description: 'Εξατομικευμένες προτάσεις διακοπών με AI, κρατήσεις ξενοδοχείων, αεροπορικά εισιτήρια, ενοικίαση αυτοκινήτων, κρατήσεις εκδρομών. Ασφαλείς πληρωμές, υποστήριξη 24/7.',
    keywords: [
      'διακοπές',
      'ταξίδι',
      'τουρισμός',
      'κράτηση ξενοδοχείου',
      'αεροπορικά εισιτήρια',
      'ενοικίαση αυτοκινήτου',
      'εκδρομές',
      'βοηθός ταξιδιού AI',
      'τεχνητή νοημοσύνη',
      'πληρωμή blockchain',
      'ασφαλής κράτηση'
    ],
    canonical: `${DOMAIN}/el`
  }
};

export function generateMultilingualSEO(
  basePath: string = '',
  locale: string = 'tr'
): NextSeoProps {
  const config = SEO_DATA[locale] || SEO_DATA.tr;
  const fullPath = basePath ? `/${locale}${basePath}` : `/${locale}`;

  return {
    title: config.title,
    description: config.description,
    canonical: `${DOMAIN}${fullPath}`,

    openGraph: {
      type: 'website',
      locale: config.locale,
      url: `${DOMAIN}${fullPath}`,
      siteName: 'Holiday.AILYDIAN',
      title: config.title,
      description: config.description,
      images: [
        {
          url: `${DOMAIN}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Holiday.AILYDIAN - AI-Powered Travel Platform',
          type: 'image/jpeg',
        },
        {
          url: `${DOMAIN}/og-image-square.jpg`,
          width: 800,
          height: 800,
          alt: 'Holiday.AILYDIAN Logo',
          type: 'image/jpeg',
        }
      ],
    },

    twitter: {
      handle: '@ailydian',
      site: '@ailydian',
      cardType: 'summary_large_image',
    },

    additionalMetaTags: [
      {
        name: 'keywords',
        content: config.keywords.join(', '),
      },
      {
        name: 'author',
        content: 'AILYDIAN',
      },
      {
        name: 'robots',
        content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      {
        name: 'googlebot',
        content: 'index, follow',
      },
      {
        name: 'bingbot',
        content: 'index, follow',
      },
      {
        name: 'theme-color',
        content: '#667EEA',
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent',
      },
      {
        name: 'format-detection',
        content: 'telephone=no',
      },
    ],

    languageAlternates: [
      { hrefLang: 'tr', href: `${DOMAIN}/tr${basePath}` },
      { hrefLang: 'en', href: `${DOMAIN}/en${basePath}` },
      { hrefLang: 'de', href: `${DOMAIN}/de${basePath}` },
      { hrefLang: 'ru', href: `${DOMAIN}/ru${basePath}` },
      { hrefLang: 'ar', href: `${DOMAIN}/ar${basePath}` },
      { hrefLang: 'fa', href: `${DOMAIN}/fa${basePath}` },
      { hrefLang: 'fr', href: `${DOMAIN}/fr${basePath}` },
      { hrefLang: 'el', href: `${DOMAIN}/el${basePath}` },
      { hrefLang: 'x-default', href: `${DOMAIN}${basePath}` },
    ],
  };
}

export function getLocalizedKeywords(locale: string): string[] {
  return SEO_DATA[locale]?.keywords || SEO_DATA.tr.keywords;
}

export function getLocalizedTitle(locale: string): string {
  return SEO_DATA[locale]?.title || SEO_DATA.tr.title;
}

export function getLocalizedDescription(locale: string): string {
  return SEO_DATA[locale]?.description || SEO_DATA.tr.description;
}
