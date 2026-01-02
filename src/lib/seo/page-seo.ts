/**
 * Page-Specific SEO Configuration
 * Comprehensive SEO metadata for all pages in 8 languages
 *
 * @module seo/page-seo
 * @seo Meta descriptions < 155 chars, Titles < 60 chars
 */

export type SupportedLocale = 'tr' | 'en' | 'de' | 'ru' | 'ar' | 'fa' | 'fr' | 'el';

export interface PageSEOConfig {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
}

export type LocalizedSEO = Record<SupportedLocale, PageSEOConfig>;

// ===================================================
// HOMEPAGE SEO
// ===================================================

export const homeSEO: LocalizedSEO = {
  tr: {
    title: 'Tatil Rezervasyonu | Tur, Otel, Araç Kiralama - Holiday.AILYDIAN',
    description: "Türkiye'nin en kapsamlı tatil platformu. 1000+ tur, 500+ otel, araç kiralama ve transfer hizmetleri. Anında rezervasyon, en uygun fiyatlar.",
    keywords: 'tatil, tur, otel rezervasyonu, araç kiralama, transfer, antalya turları, istanbul gezilecek yerler, kapadokya tur, tatil paketleri',
    canonical: 'https://holiday.ailydian.com',
    ogImage: 'https://holiday.ailydian.com/og-image-tr.jpg',
    ogType: 'website',
  },
  en: {
    title: 'Holiday Booking | Tours, Hotels, Car Rentals - Holiday.AILYDIAN',
    description: "Turkey's most comprehensive holiday platform. 1000+ tours, 500+ hotels, car rental and transfer services. Instant booking, best prices.",
    keywords: 'holiday, tour, hotel booking, car rental, transfer, antalya tours, istanbul attractions, cappadocia tour, vacation packages',
    canonical: 'https://holiday.ailydian.com/en',
    ogImage: 'https://holiday.ailydian.com/og-image-en.jpg',
    ogType: 'website',
  },
  de: {
    title: 'Urlaubsbuchung | Touren, Hotels, Mietwagen - Holiday.AILYDIAN',
    description: 'Die umfassendste Urlaubsplattform der Türkei. 1000+ Touren, 500+ Hotels, Mietwagen und Transferdienste. Sofortbuchung, beste Preise.',
    keywords: 'urlaub, tour, hotelbuchung, mietwagen, transfer, antalya touren, istanbul sehenswürdigkeiten, kappadokien tour',
    canonical: 'https://holiday.ailydian.com/de',
    ogImage: 'https://holiday.ailydian.com/og-image-de.jpg',
    ogType: 'website',
  },
  ru: {
    title: 'Бронирование отдыха | Туры, Отели, Аренда авто - Holiday.AILYDIAN',
    description: 'Самая полная платформа для отдыха в Турции. 1000+ туров, 500+ отелей, аренда авто и трансферы. Мгновенное бронирование, лучшие цены.',
    keywords: 'отдых, тур, бронирование отеля, аренда авто, трансфер, туры анталия, достопримечательности стамбула',
    canonical: 'https://holiday.ailydian.com/ru',
    ogImage: 'https://holiday.ailydian.com/og-image-ru.jpg',
    ogType: 'website',
  },
  ar: {
    title: 'حجز العطلات | جولات، فنادق، تأجير سيارات - Holiday.AILYDIAN',
    description: 'أشمل منصة عطلات في تركيا. 1000+ جولة، 500+ فندق، تأجير سيارات وخدمات النقل. حجز فوري، أفضل الأسعار.',
    keywords: 'عطلة، جولة، حجز فندق، تأجير سيارات، نقل، جولات أنطاليا، معالم اسطنبول',
    canonical: 'https://holiday.ailydian.com/ar',
    ogImage: 'https://holiday.ailydian.com/og-image-ar.jpg',
    ogType: 'website',
  },
  fa: {
    title: 'رزرو تعطیلات | تورها، هتل‌ها، اجاره خودرو - Holiday.AILYDIAN',
    description: 'جامع‌ترین پلتفرم تعطیلات ترکیه. 1000+ تور، 500+ هتل، اجاره خودرو و خدمات انتقال. رزرو آنی، بهترین قیمت‌ها.',
    keywords: 'تعطیلات، تور، رزرو هتل، اجاره خودرو، انتقال، تورهای آنتالیا، جاذبه‌های استانبول',
    canonical: 'https://holiday.ailydian.com/fa',
    ogImage: 'https://holiday.ailydian.com/og-image-fa.jpg',
    ogType: 'website',
  },
  fr: {
    title: 'Réservation Vacances | Circuits, Hôtels, Location - Holiday.AILYDIAN',
    description: 'La plateforme de vacances la plus complète de Turquie. 1000+ circuits, 500+ hôtels, location de voitures et transferts. Réservation instantanée.',
    keywords: 'vacances, circuit, réservation hôtel, location voiture, transfert, circuits antalya, attractions istanbul',
    canonical: 'https://holiday.ailydian.com/fr',
    ogImage: 'https://holiday.ailydian.com/og-image-fr.jpg',
    ogType: 'website',
  },
  el: {
    title: 'Κράτηση Διακοπών | Εκδρομές, Ξενοδοχεία, Ενοικίαση - Holiday.AILYDIAN',
    description: 'Η πιο ολοκληρωμένη πλατφόρμα διακοπών της Τουρκίας. 1000+ εκδρομές, 500+ ξενοδοχεία, ενοικίαση αυτοκινήτων. Άμεση κράτηση.',
    keywords: 'διακοπές, εκδρομή, κράτηση ξενοδοχείου, ενοικίαση αυτοκινήτου, μεταφορά, εκδρομές αντάλυα',
    canonical: 'https://holiday.ailydian.com/el',
    ogImage: 'https://holiday.ailydian.com/og-image-el.jpg',
    ogType: 'website',
  },
};

// ===================================================
// TOURS PAGE SEO
// ===================================================

export const toursListSEO: LocalizedSEO = {
  tr: {
    title: 'Turlar ve Aktiviteler | 1000+ Gezilecek Yer - Holiday.AILYDIAN',
    description: '1000+ benzersiz tur ve aktivite. Kültür turları, macera aktiviteleri, yemek turları ve daha fazlası. En iyi fiyat garantisi. Anında onay.',
    keywords: 'turlar, aktiviteler, gezi turları, kültür turları, macera aktiviteleri, yemek turları, şehir turları',
    canonical: 'https://holiday.ailydian.com/tours',
  },
  en: {
    title: 'Tours & Activities | 1000+ Things to Do - Holiday.AILYDIAN',
    description: '1000+ unique tours and activities. Cultural tours, adventure activities, food tours and more. Best price guarantee. Instant confirmation.',
    keywords: 'tours, activities, sightseeing tours, cultural tours, adventure activities, food tours, city tours',
    canonical: 'https://holiday.ailydian.com/en/tours',
  },
  de: {
    title: 'Touren & Aktivitäten | 1000+ Unternehmungen - Holiday.AILYDIAN',
    description: '1000+ einzigartige Touren und Aktivitäten. Kulturtouren, Abenteueraktivitäten, Food-Touren und mehr. Bestpreisgarantie. Sofortbestätigung.',
    keywords: 'touren, aktivitäten, sightseeing, kulturtouren, abenteueraktivitäten, food-touren, stadttouren',
    canonical: 'https://holiday.ailydian.com/de/tours',
  },
  ru: {
    title: 'Туры и Активности | 1000+ Развлечений - Holiday.AILYDIAN',
    description: '1000+ уникальных туров и активностей. Культурные туры, приключения, гастрономические туры и многое другое. Гарантия лучшей цены.',
    keywords: 'туры, активности, экскурсии, культурные туры, приключения, гастрономические туры',
    canonical: 'https://holiday.ailydian.com/ru/tours',
  },
  ar: {
    title: 'الجولات والأنشطة | 1000+ أشياء للقيام بها - Holiday.AILYDIAN',
    description: '1000+ جولة ونشاط فريد. جولات ثقافية، أنشطة مغامرة، جولات طعام والمزيد. ضمان أفضل سعر. تأكيد فوري.',
    keywords: 'جولات، أنشطة، جولات سياحية، جولات ثقافية، أنشطة مغامرة، جولات طعام',
    canonical: 'https://holiday.ailydian.com/ar/tours',
  },
  fa: {
    title: 'تورها و فعالیت‌ها | 1000+ کار برای انجام - Holiday.AILYDIAN',
    description: '1000+ تور و فعالیت منحصر به فرد. تورهای فرهنگی، فعالیت‌های ماجراجویی، تورهای غذا و بیشتر. تضمین بهترین قیمت.',
    keywords: 'تورها، فعالیت‌ها، تورهای گردشگری، تورهای فرهنگی، فعالیت‌های ماجراجویی',
    canonical: 'https://holiday.ailydian.com/fa/tours',
  },
  fr: {
    title: 'Circuits & Activités | 1000+ Choses à Faire - Holiday.AILYDIAN',
    description: '1000+ circuits et activités uniques. Circuits culturels, activités d\'aventure, circuits gastronomiques et plus. Garantie du meilleur prix.',
    keywords: 'circuits, activités, visites touristiques, circuits culturels, activités d\'aventure',
    canonical: 'https://holiday.ailydian.com/fr/tours',
  },
  el: {
    title: 'Εκδρομές & Δραστηριότητες | 1000+ Πράγματα - Holiday.AILYDIAN',
    description: '1000+ μοναδικές εκδρομές και δραστηριότητες. Πολιτιστικές εκδρομές, δραστηριότητες περιπέτειας και περισσότερα.',
    keywords: 'εκδρομές, δραστηριότητες, περιηγήσεις, πολιτιστικές εκδρομές',
    canonical: 'https://holiday.ailydian.com/el/tours',
  },
};

// ===================================================
// HOTELS PAGE SEO
// ===================================================

export const hotelsListSEO: LocalizedSEO = {
  tr: {
    title: 'Otel Rezervasyonu | 500+ Otel ve Konaklama - Holiday.AILYDIAN',
    description: '500+ otel ve konaklama seçeneği. Lüks oteller, butik oteller, pansiyon ve daha fazlası. En uygun fiyatlar. Ücretsiz iptal seçeneği.',
    keywords: 'otel, konaklama, otel rezervasyonu, lüks otel, butik otel, pansiyon, apart otel, tatil köyü',
    canonical: 'https://holiday.ailydian.com/hotels',
  },
  en: {
    title: 'Hotel Booking | 500+ Hotels & Accommodation - Holiday.AILYDIAN',
    description: '500+ hotels and accommodation options. Luxury hotels, boutique hotels, guesthouses and more. Best prices. Free cancellation available.',
    keywords: 'hotel, accommodation, hotel booking, luxury hotel, boutique hotel, guesthouse, resort',
    canonical: 'https://holiday.ailydian.com/en/hotels',
  },
  de: {
    title: 'Hotelbuchung | 500+ Hotels & Unterkünfte - Holiday.AILYDIAN',
    description: '500+ Hotels und Unterkunftsmöglichkeiten. Luxushotels, Boutique-Hotels, Pensionen und mehr. Beste Preise. Kostenlose Stornierung.',
    keywords: 'hotel, unterkunft, hotelbuchung, luxushotel, boutique-hotel, pension, resort',
    canonical: 'https://holiday.ailydian.com/de/hotels',
  },
  ru: {
    title: 'Бронирование Отелей | 500+ Отелей - Holiday.AILYDIAN',
    description: '500+ отелей и вариантов размещения. Роскошные отели, бутик-отели, гостевые дома и многое другое. Лучшие цены. Бесплатная отмена.',
    keywords: 'отель, размещение, бронирование отеля, роскошный отель, бутик-отель, пансион, курорт',
    canonical: 'https://holiday.ailydian.com/ru/hotels',
  },
  ar: {
    title: 'حجز الفنادق | 500+ فندق وإقامة - Holiday.AILYDIAN',
    description: '500+ فندق وخيارات إقامة. فنادق فاخرة، فنادق بوتيك، بيوت ضيافة والمزيد. أفضل الأسعار. إلغاء مجاني.',
    keywords: 'فندق، إقامة، حجز فندق، فندق فاخر، فندق بوتيك، منتجع',
    canonical: 'https://holiday.ailydian.com/ar/hotels',
  },
  fa: {
    title: 'رزرو هتل | 500+ هتل و اقامتگاه - Holiday.AILYDIAN',
    description: '500+ هتل و گزینه‌های اقامت. هتل‌های لوکس، هتل‌های بوتیک، مهمانخانه‌ها و بیشتر. بهترین قیمت‌ها. لغو رایگان.',
    keywords: 'هتل، اقامت، رزرو هتل، هتل لوکس، هتل بوتیک، مهمانپذیر، ریزورت',
    canonical: 'https://holiday.ailydian.com/fa/hotels',
  },
  fr: {
    title: 'Réservation Hôtel | 500+ Hôtels - Holiday.AILYDIAN',
    description: '500+ hôtels et options d\'hébergement. Hôtels de luxe, hôtels boutique, maisons d\'hôtes et plus. Meilleurs prix. Annulation gratuite.',
    keywords: 'hôtel, hébergement, réservation hôtel, hôtel de luxe, hôtel boutique, resort',
    canonical: 'https://holiday.ailydian.com/fr/hotels',
  },
  el: {
    title: 'Κράτηση Ξενοδοχείου | 500+ Ξενοδοχεία - Holiday.AILYDIAN',
    description: '500+ ξενοδοχεία και επιλογές διαμονής. Πολυτελή ξενοδοχεία, boutique ξενοδοχεία και περισσότερα. Καλύτερες τιμές.',
    keywords: 'ξενοδοχείο, διαμονή, κράτηση ξενοδοχείου, πολυτελές ξενοδοχείο, resort',
    canonical: 'https://holiday.ailydian.com/el/hotels',
  },
};

// ===================================================
// CAR RENTAL SEO
// ===================================================

export const carRentalSEO: LocalizedSEO = {
  tr: {
    title: 'Araç Kiralama | En Uygun Fiyatlarla Rent a Car - Holiday.AILYDIAN',
    description: 'Ekonomik ve lüks araç kiralama seçenekleri. Havalimanı teslim, sınırsız kilometre, 7/24 destek. En uygun fiyatlar garantisi.',
    keywords: 'araç kiralama, rent a car, oto kiralama, havalimanı araç kiralama, ekonomik araç, lüks araç',
    canonical: 'https://holiday.ailydian.com/car-rental',
  },
  en: {
    title: 'Car Rental | Best Prices on Rent a Car - Holiday.AILYDIAN',
    description: 'Economy and luxury car rental options. Airport delivery, unlimited mileage, 24/7 support. Best price guarantee.',
    keywords: 'car rental, rent a car, auto rental, airport car rental, economy car, luxury car',
    canonical: 'https://holiday.ailydian.com/en/car-rental',
  },
  de: {
    title: 'Autovermietung | Beste Preise - Holiday.AILYDIAN',
    description: 'Wirtschaftliche und luxuriöse Mietwagenoptionen. Flughafenlieferung, unbegrenzte Kilometer, 24/7 Support.',
    keywords: 'autovermietung, mietwagen, flughafen mietwagen, economy auto, luxusauto',
    canonical: 'https://holiday.ailydian.com/de/car-rental',
  },
  ru: {
    title: 'Аренда Авто | Лучшие Цены - Holiday.AILYDIAN',
    description: 'Экономичные и роскошные варианты аренды авто. Доставка в аэропорт, неограниченный пробег, круглосуточная поддержка.',
    keywords: 'аренда авто, прокат автомобилей, аренда в аэропорту, экономичный автомобиль',
    canonical: 'https://holiday.ailydian.com/ru/car-rental',
  },
  ar: {
    title: 'تأجير السيارات | أفضل الأسعار - Holiday.AILYDIAN',
    description: 'خيارات تأجير السيارات الاقتصادية والفاخرة. التسليم في المطار، عدد كيلومترات غير محدود، دعم على مدار الساعة.',
    keywords: 'تأجير سيارات، استئجار سيارات، تأجير المطار، سيارة اقتصادية',
    canonical: 'https://holiday.ailydian.com/ar/car-rental',
  },
  fa: {
    title: 'اجاره خودرو | بهترین قیمت‌ها - Holiday.AILYDIAN',
    description: 'گزینه‌های اجاره خودروی اقتصادی و لوکس. تحویل فرودگاه، کیلومتر نامحدود، پشتیبانی 24/7.',
    keywords: 'اجاره خودرو، اجاره اتومبیل، اجاره فرودگاه، خودروی اقتصادی',
    canonical: 'https://holiday.ailydian.com/fa/car-rental',
  },
  fr: {
    title: 'Location de Voiture | Meilleurs Prix - Holiday.AILYDIAN',
    description: 'Options de location de voiture économiques et de luxe. Livraison aéroport, kilométrage illimité, support 24/7.',
    keywords: 'location voiture, location auto, location aéroport, voiture économique',
    canonical: 'https://holiday.ailydian.com/fr/car-rental',
  },
  el: {
    title: 'Ενοικίαση Αυτοκινήτου | Καλύτερες Τιμές - Holiday.AILYDIAN',
    description: 'Οικονομικές και πολυτελείς επιλογές ενοικίασης αυτοκινήτου. Παράδοση αεροδρομίου, απεριόριστα χιλιόμετρα.',
    keywords: 'ενοικίαση αυτοκινήτου, ενοικίαση αεροδρομίου, οικονομικό αυτοκίνητο',
    canonical: 'https://holiday.ailydian.com/el/car-rental',
  },
};

// ===================================================
// HELPER FUNCTIONS
// ===================================================

/**
 * Get SEO config for a specific page and locale
 */
export const getPageSEO = (
  page: 'home' | 'tours' | 'hotels' | 'car-rental',
  locale: SupportedLocale = 'tr'
): PageSEOConfig => {
  const seoMap = {
    home: homeSEO,
    tours: toursListSEO,
    hotels: hotelsListSEO,
    'car-rental': carRentalSEO,
  };

  return seoMap[page]?.[locale] || homeSEO.tr;
};

/**
 * Generate tour detail page SEO
 */
export const generateTourSEO = (
  tour: {
    title: string;
    description: string;
    location: string;
    category: string;
    price: number;
    rating: number;
    reviewCount: number;
    duration: string;
    slug: string;
  },
  locale: SupportedLocale = 'tr'
): PageSEOConfig => {
  const templates = {
    tr: {
      titleTemplate: `${tour.title} | ${tour.location} Turu - Holiday.AILYDIAN`,
      descriptionTemplate: `${tour.description.substring(0, 100)}... ⭐ ${tour.rating}/5 (${tour.reviewCount} yorum). ${tour.duration}. ${tour.price}₺'den başlayan fiyatlarla.`,
      keywordsTemplate: `${tour.location} turu, ${tour.category}, ${tour.location} gezilecek yerler, ${tour.title.toLowerCase()}`,
    },
    en: {
      titleTemplate: `${tour.title} | ${tour.location} Tour - Holiday.AILYDIAN`,
      descriptionTemplate: `${tour.description.substring(0, 100)}... ⭐ ${tour.rating}/5 (${tour.reviewCount} reviews). ${tour.duration}. From $${tour.price}.`,
      keywordsTemplate: `${tour.location} tour, ${tour.category}, ${tour.location} attractions, ${tour.title.toLowerCase()}`,
    },
  };

  const template = templates[locale] || templates.tr;

  return {
    title: template.titleTemplate,
    description: template.descriptionTemplate,
    keywords: template.keywordsTemplate,
    canonical: `https://holiday.ailydian.com/${locale === 'tr' ? '' : locale + '/'}tours/${tour.slug}`,
    ogType: 'article',
  };
};

/**
 * Generate hotel detail page SEO
 */
export const generateHotelSEO = (
  hotel: {
    name: string;
    description: string;
    city: string;
    stars: number;
    rating: number;
    reviewCount: number;
    minPrice: number;
    slug: string;
  },
  locale: SupportedLocale = 'tr'
): PageSEOConfig => {
  const templates = {
    tr: {
      titleTemplate: `${hotel.name} | ${hotel.stars} Yıldızlı Otel ${hotel.city} - Holiday.AILYDIAN`,
      descriptionTemplate: `${hotel.description.substring(0, 110)}... ⭐ ${hotel.rating}/5 (${hotel.reviewCount} yorum). ${hotel.minPrice}₺'den başlayan fiyatlarla rezervasyon yap.`,
      keywordsTemplate: `${hotel.name}, ${hotel.city} otel, ${hotel.stars} yıldızlı otel, ${hotel.city} konaklama`,
    },
    en: {
      titleTemplate: `${hotel.name} | ${hotel.stars}-Star Hotel ${hotel.city} - Holiday.AILYDIAN`,
      descriptionTemplate: `${hotel.description.substring(0, 110)}... ⭐ ${hotel.rating}/5 (${hotel.reviewCount} reviews). Book from $${hotel.minPrice}.`,
      keywordsTemplate: `${hotel.name}, ${hotel.city} hotel, ${hotel.stars}-star hotel, ${hotel.city} accommodation`,
    },
  };

  const template = templates[locale] || templates.tr;

  return {
    title: template.titleTemplate,
    description: template.descriptionTemplate,
    keywords: template.keywordsTemplate,
    canonical: `https://holiday.ailydian.com/${locale === 'tr' ? '' : locale + '/'}hotels/${hotel.slug}`,
    ogType: 'business.business',
  };
};

export default {
  homeSEO,
  toursListSEO,
  hotelsListSEO,
  carRentalSEO,
  getPageSEO,
  generateTourSEO,
  generateHotelSEO,
};
