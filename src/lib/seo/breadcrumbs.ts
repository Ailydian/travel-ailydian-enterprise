/**
 * Breadcrumb Navigation Utilities
 * Generates breadcrumbs for SEO and user navigation
 *
 * @module seo/breadcrumbs
 * @seo Google Rich Snippets, User Navigation
 */

import { SupportedLocale } from './page-seo';

// ===================================================
// TYPE DEFINITIONS
// ===================================================

export interface BreadcrumbItem {
  name: string;
  url: string;
  active?: boolean;
}

// ===================================================
// BREADCRUMB LABELS (i18n)
// ===================================================

const BREADCRUMB_LABELS: Record<SupportedLocale, Record<string, string>> = {
  tr: {
    home: 'Ana Sayfa',
    tours: 'Turlar',
    hotels: 'Oteller',
    'car-rental': 'Araç Kiralama',
    transfers: 'Transferler',
    rentals: 'Kiralık Evler',
    blog: 'Blog',
    about: 'Hakkımızda',
    contact: 'İletişim',
    search: 'Arama',
    account: 'Hesabım',
    bookings: 'Rezervasyonlarım',
  },
  en: {
    home: 'Home',
    tours: 'Tours',
    hotels: 'Hotels',
    'car-rental': 'Car Rental',
    transfers: 'Transfers',
    rentals: 'Vacation Rentals',
    blog: 'Blog',
    about: 'About',
    contact: 'Contact',
    search: 'Search',
    account: 'My Account',
    bookings: 'My Bookings',
  },
  de: {
    home: 'Startseite',
    tours: 'Touren',
    hotels: 'Hotels',
    'car-rental': 'Autovermietung',
    transfers: 'Transfers',
    rentals: 'Ferienwohnungen',
    blog: 'Blog',
    about: 'Über uns',
    contact: 'Kontakt',
    search: 'Suche',
    account: 'Mein Konto',
    bookings: 'Meine Buchungen',
  },
  ru: {
    home: 'Главная',
    tours: 'Туры',
    hotels: 'Отели',
    'car-rental': 'Аренда авто',
    transfers: 'Трансферы',
    rentals: 'Аренда жилья',
    blog: 'Блог',
    about: 'О нас',
    contact: 'Контакты',
    search: 'Поиск',
    account: 'Мой аккаунт',
    bookings: 'Мои бронирования',
  },
  ar: {
    home: 'الرئيسية',
    tours: 'الجولات',
    hotels: 'الفنادق',
    'car-rental': 'تأجير السيارات',
    transfers: 'النقل',
    rentals: 'إيجار المنازل',
    blog: 'مدونة',
    about: 'معلومات عنا',
    contact: 'اتصل',
    search: 'بحث',
    account: 'حسابي',
    bookings: 'حجوزاتي',
  },
  fa: {
    home: 'خانه',
    tours: 'تورها',
    hotels: 'هتل‌ها',
    'car-rental': 'اجاره خودرو',
    transfers: 'انتقال',
    rentals: 'اجاره خانه',
    blog: 'وبلاگ',
    about: 'درباره ما',
    contact: 'تماس',
    search: 'جستجو',
    account: 'حساب من',
    bookings: 'رزروهای من',
  },
  fr: {
    home: 'Accueil',
    tours: 'Circuits',
    hotels: 'Hôtels',
    'car-rental': 'Location de voiture',
    transfers: 'Transferts',
    rentals: 'Locations de vacances',
    blog: 'Blog',
    about: 'À propos',
    contact: 'Contact',
    search: 'Recherche',
    account: 'Mon compte',
    bookings: 'Mes réservations',
  },
  el: {
    home: 'Αρχική',
    tours: 'Εκδρομές',
    hotels: 'Ξενοδοχεία',
    'car-rental': 'Ενοικίαση αυτοκινήτου',
    transfers: 'Μεταφορές',
    rentals: 'Ενοικιάσεις διακοπών',
    blog: 'Ιστολόγιο',
    about: 'Σχετικά',
    contact: 'Επικοινωνία',
    search: 'Αναζήτηση',
    account: 'Ο λογαριασμός μου',
    bookings: 'Οι κρατήσεις μου',
  },
};

// ===================================================
// BREADCRUMB GENERATION FUNCTIONS
// ===================================================

/**
 * Generate breadcrumbs from URL path
 *
 * @usage
 * const breadcrumbs = generateBreadcrumbs('/tours/istanbul/bosphorus-tour', 'en');
 */
export const generateBreadcrumbs = (
  path: string,
  locale: SupportedLocale = 'tr',
  customLabels: Record<string, string> = {}
): BreadcrumbItem[] => {
  const baseUrl = 'https://holiday.ailydian.com';
  const langPrefix = locale === 'tr' ? '' : `/${locale}`;

  // Remove locale from path if present
  const cleanPath = path.replace(/^\/(tr|en|de|ru|ar|fa|fr|el)/, '');

  // Split path into segments
  const segments = cleanPath.split('/').filter(Boolean);

  const labels = BREADCRUMB_LABELS[locale] || BREADCRUMB_LABELS.tr;

  // Always start with Home
  const breadcrumbs: BreadcrumbItem[] = [
    {
      name: labels.home,
      url: `${baseUrl}${langPrefix}`,
      active: segments.length === 0,
    },
  ];

  // Build breadcrumbs from segments
  let currentPath = langPrefix;

  segments.forEach((segment, index) => {
    const isLast = index === segments.length - 1;
    currentPath += `/${segment}`;

    // Get label from predefined labels or custom labels
    const label =
      customLabels[segment] ||
      labels[segment] ||
      segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    breadcrumbs.push({
      name: label,
      url: `${baseUrl}${currentPath}`,
      active: isLast,
    });
  });

  return breadcrumbs;
};

/**
 * Generate breadcrumbs for tour detail page
 *
 * @usage
 * const breadcrumbs = generateTourBreadcrumbs('istanbul', 'Bosphorus Tour', 'bosphorus-tour', 'en');
 */
export const generateTourBreadcrumbs = (
  city: string,
  tourTitle: string,
  tourSlug: string,
  locale: SupportedLocale = 'tr'
): BreadcrumbItem[] => {
  const baseUrl = 'https://holiday.ailydian.com';
  const langPrefix = locale === 'tr' ? '' : `/${locale}`;
  const labels = BREADCRUMB_LABELS[locale] || BREADCRUMB_LABELS.tr;

  return [
    {
      name: labels.home,
      url: `${baseUrl}${langPrefix}`,
    },
    {
      name: labels.tours,
      url: `${baseUrl}${langPrefix}/tours`,
    },
    {
      name: city.charAt(0).toUpperCase() + city.slice(1),
      url: `${baseUrl}${langPrefix}/tours/${city}`,
    },
    {
      name: tourTitle,
      url: `${baseUrl}${langPrefix}/tours/${city}/${tourSlug}`,
      active: true,
    },
  ];
};

/**
 * Generate breadcrumbs for hotel detail page
 */
export const generateHotelBreadcrumbs = (
  city: string,
  hotelName: string,
  hotelSlug: string,
  locale: SupportedLocale = 'tr'
): BreadcrumbItem[] => {
  const baseUrl = 'https://holiday.ailydian.com';
  const langPrefix = locale === 'tr' ? '' : `/${locale}`;
  const labels = BREADCRUMB_LABELS[locale] || BREADCRUMB_LABELS.tr;

  return [
    {
      name: labels.home,
      url: `${baseUrl}${langPrefix}`,
    },
    {
      name: labels.hotels,
      url: `${baseUrl}${langPrefix}/hotels`,
    },
    {
      name: city.charAt(0).toUpperCase() + city.slice(1),
      url: `${baseUrl}${langPrefix}/hotels/${city}`,
    },
    {
      name: hotelName,
      url: `${baseUrl}${langPrefix}/hotels/${city}/${hotelSlug}`,
      active: true,
    },
  ];
};

/**
 * Generate breadcrumbs for car rental page
 */
export const generateCarRentalBreadcrumbs = (
  carName: string,
  carSlug: string,
  locale: SupportedLocale = 'tr'
): BreadcrumbItem[] => {
  const baseUrl = 'https://holiday.ailydian.com';
  const langPrefix = locale === 'tr' ? '' : `/${locale}`;
  const labels = BREADCRUMB_LABELS[locale] || BREADCRUMB_LABELS.tr;

  return [
    {
      name: labels.home,
      url: `${baseUrl}${langPrefix}`,
    },
    {
      name: labels['car-rental'],
      url: `${baseUrl}${langPrefix}/car-rental`,
    },
    {
      name: carName,
      url: `${baseUrl}${langPrefix}/car-rental/${carSlug}`,
      active: true,
    },
  ];
};

/**
 * Generate breadcrumbs for city page (geo SEO)
 */
export const generateCityBreadcrumbs = (
  pageType: 'tours' | 'hotels' | 'rentals',
  cityName: string,
  locale: SupportedLocale = 'tr'
): BreadcrumbItem[] => {
  const baseUrl = 'https://holiday.ailydian.com';
  const langPrefix = locale === 'tr' ? '' : `/${locale}`;
  const labels = BREADCRUMB_LABELS[locale] || BREADCRUMB_LABELS.tr;

  return [
    {
      name: labels.home,
      url: `${baseUrl}${langPrefix}`,
    },
    {
      name: labels[pageType],
      url: `${baseUrl}${langPrefix}/${pageType}`,
    },
    {
      name: cityName,
      url: `${baseUrl}${langPrefix}/${pageType}/${cityName.toLowerCase()}`,
      active: true,
    },
  ];
};

/**
 * Generate breadcrumbs for blog post
 */
export const generateBlogBreadcrumbs = (
  category: string,
  postTitle: string,
  postSlug: string,
  locale: SupportedLocale = 'tr'
): BreadcrumbItem[] => {
  const baseUrl = 'https://holiday.ailydian.com';
  const langPrefix = locale === 'tr' ? '' : `/${locale}`;
  const labels = BREADCRUMB_LABELS[locale] || BREADCRUMB_LABELS.tr;

  return [
    {
      name: labels.home,
      url: `${baseUrl}${langPrefix}`,
    },
    {
      name: labels.blog,
      url: `${baseUrl}${langPrefix}/blog`,
    },
    {
      name: category,
      url: `${baseUrl}${langPrefix}/blog/${category.toLowerCase()}`,
    },
    {
      name: postTitle,
      url: `${baseUrl}${langPrefix}/blog/${category.toLowerCase()}/${postSlug}`,
      active: true,
    },
  ];
};

// ===================================================
// BREADCRUMB COMPONENT HELPERS
// ===================================================

/**
 * Convert breadcrumbs to JSON-LD schema
 * (Used with generateBreadcrumbSchema from schema-generators.ts)
 */
export const breadcrumbsToSchema = (breadcrumbs: BreadcrumbItem[]) => {
  return breadcrumbs.map((item) => ({
    name: item.name,
    url: item.url,
  }));
};

/**
 * Get breadcrumb label for a segment
 */
export const getBreadcrumbLabel = (
  segment: string,
  locale: SupportedLocale = 'tr'
): string => {
  const labels = BREADCRUMB_LABELS[locale] || BREADCRUMB_LABELS.tr;
  return labels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
};

/**
 * Add custom label to breadcrumbs
 */
export const addCustomLabel = (
  locale: SupportedLocale,
  key: string,
  value: string
): void => {
  if (!BREADCRUMB_LABELS[locale]) {
    BREADCRUMB_LABELS[locale] = {} as any;
  }
  (BREADCRUMB_LABELS[locale] as any)[key] = value;
};

// ===================================================
// EXPORT ALL
// ===================================================

export default {
  generateBreadcrumbs,
  generateTourBreadcrumbs,
  generateHotelBreadcrumbs,
  generateCarRentalBreadcrumbs,
  generateCityBreadcrumbs,
  generateBlogBreadcrumbs,
  breadcrumbsToSchema,
  getBreadcrumbLabel,
  addCustomLabel,
  BREADCRUMB_LABELS,
};
