/**
 * SEO Hooks for Page-Specific SEO Generation
 * Automatic SEO data generation for all page types
 *
 * @module hooks/useSEO
 * @version 2.0.0
 * @seo Dynamic SEO for tours, hotels, car rentals, transfers
 */

import { useRouter } from 'next/router';
import { useMemo } from 'react';
import {
  generateSchemaOrg,
  getLocaleConfig,
  type SupportedLocale,
  type SchemaOrgConfig,
  type BreadcrumbItem,
} from '@/lib/seo/universal-seo';

// ===================================================
// TYPE DEFINITIONS
// ===================================================

interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  schema?: any;
  breadcrumbs?: BreadcrumbItem[];
}

// ===================================================
// TOUR SEO HOOK
// ===================================================

export interface TourData {
  id: string;
  title: string;
  description: string;
  slug: string;
  location: string;
  city: string;
  category: string;
  price: number;
  duration: string;
  rating?: number;
  reviewCount?: number;
  images?: string[];
  lat?: number;
  lng?: number;
}

/**
 * Generate SEO data for tour pages
 */
export function useTourSEO(tour: TourData): SEOData {
  const { locale } = useRouter();
  const currentLocale = (locale || 'tr') as SupportedLocale;
  const localeConfig = getLocaleConfig(currentLocale);

  return useMemo(() => {
    const translations = {
      tr: {
        titleSuffix: 'Turu',
        descriptionSuffix: 'rezervasyon yapın. Anında onay, en iyi fiyat garantisi.',
        keywordPrefix: 'tur',
        fromPrice: 'başlayan fiyatlarla',
      },
      en: {
        titleSuffix: 'Tour',
        descriptionSuffix: 'Book now. Instant confirmation, best price guarantee.',
        keywordPrefix: 'tour',
        fromPrice: 'from',
      },
      de: {
        titleSuffix: 'Tour',
        descriptionSuffix: 'Jetzt buchen. Sofortbestätigung, Bestpreisgarantie.',
        keywordPrefix: 'tour',
        fromPrice: 'ab',
      },
      ru: {
        titleSuffix: 'Тур',
        descriptionSuffix: 'Забронировать. Мгновенное подтверждение, гарантия лучшей цены.',
        keywordPrefix: 'тур',
        fromPrice: 'от',
      },
      ar: {
        titleSuffix: 'جولة',
        descriptionSuffix: 'احجز الآن. تأكيد فوري، ضمان أفضل سعر.',
        keywordPrefix: 'جولة',
        fromPrice: 'من',
      },
      fa: {
        titleSuffix: 'تور',
        descriptionSuffix: 'اکنون رزرو کنید. تأیید فوری، تضمین بهترین قیمت.',
        keywordPrefix: 'تور',
        fromPrice: 'از',
      },
      fr: {
        titleSuffix: 'Circuit',
        descriptionSuffix: 'Réservez maintenant. Confirmation instantanée, garantie du meilleur prix.',
        keywordPrefix: 'circuit',
        fromPrice: 'à partir de',
      },
      el: {
        titleSuffix: 'Εκδρομή',
        descriptionSuffix: 'Κράτηση τώρα. Άμεση επιβεβαίωση, εγγύηση καλύτερης τιμής.',
        keywordPrefix: 'εκδρομή',
        fromPrice: 'από',
      },
    };

    const t = translations[currentLocale] || translations.tr;

    // Generate title
    const title = `${tour.title} | ${tour.location} ${t.titleSuffix} - Holiday.AILYDIAN`;

    // Generate description
    const shortDesc = tour.description.length > 100
      ? tour.description.substring(0, 100) + '...'
      : tour.description;

    const ratingText = tour.rating && tour.reviewCount
      ? ` ⭐ ${tour.rating}/5 (${tour.reviewCount})`
      : '';

    const priceText = ` ${localeConfig.currencySymbol}${tour.price} ${t.fromPrice}`;

    const description = `${shortDesc}${ratingText}. ${tour.duration}.${priceText} ${t.descriptionSuffix}`;

    // Generate keywords
    const keywords = [
      `${tour.location} ${t.keywordPrefix}`,
      tour.category,
      tour.city,
      tour.title.toLowerCase(),
      `${tour.location} gezilecek yerler`,
      `${tour.location} aktiviteleri`,
    ];

    // Generate schema
    const schemaConfig: SchemaOrgConfig = {
      type: 'TouristAttraction',
      name: tour.title,
      description: tour.description,
      image: tour.images?.[0],
      price: tour.price,
      currency: localeConfig.currency,
      rating: tour.rating,
      reviewCount: tour.reviewCount,
      location: {
        name: tour.location,
        address: tour.city,
        city: tour.city,
        country: 'Turkey',
        coordinates: tour.lat && tour.lng ? { lat: tour.lat, lng: tour.lng } : undefined,
      },
    };

    const schema = generateSchemaOrg(schemaConfig);

    // Generate breadcrumbs
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', url: `https://holiday.ailydian.com/${currentLocale === 'tr' ? '' : currentLocale}` },
      { name: 'Tours', url: `https://holiday.ailydian.com/${currentLocale === 'tr' ? '' : currentLocale + '/'}tours` },
      { name: tour.city, url: `https://holiday.ailydian.com/${currentLocale === 'tr' ? '' : currentLocale + '/'}tours?city=${tour.city.toLowerCase()}` },
      { name: tour.title, url: `https://holiday.ailydian.com/${currentLocale === 'tr' ? '' : currentLocale + '/'}tours/${tour.slug}` },
    ];

    return {
      title,
      description,
      keywords,
      ogImage: tour.images?.[0],
      schema,
      breadcrumbs,
    };
  }, [tour, currentLocale, localeConfig]);
}

// ===================================================
// HOTEL SEO HOOK
// ===================================================

export interface HotelData {
  id: string;
  name: string;
  description: string;
  slug: string;
  city: string;
  address: string;
  stars: number;
  rating?: number;
  reviewCount?: number;
  minPrice: number;
  images?: string[];
  amenities?: string[];
  lat?: number;
  lng?: number;
}

/**
 * Generate SEO data for hotel pages
 */
export function useHotelSEO(hotel: HotelData): SEOData {
  const { locale } = useRouter();
  const currentLocale = (locale || 'tr') as SupportedLocale;
  const localeConfig = getLocaleConfig(currentLocale);

  return useMemo(() => {
    const translations = {
      tr: {
        titleSuffix: 'Yıldızlı Otel',
        descriptionSuffix: 'Rezervasyon yap. Ücretsiz iptal, en iyi fiyat garantisi.',
        keywordHotel: 'otel',
        keywordBooking: 'rezervasyon',
        perNight: 'gecelik',
      },
      en: {
        titleSuffix: 'Star Hotel',
        descriptionSuffix: 'Book now. Free cancellation, best price guarantee.',
        keywordHotel: 'hotel',
        keywordBooking: 'booking',
        perNight: 'per night',
      },
      de: {
        titleSuffix: 'Sterne Hotel',
        descriptionSuffix: 'Jetzt buchen. Kostenlose Stornierung, Bestpreisgarantie.',
        keywordHotel: 'hotel',
        keywordBooking: 'buchung',
        perNight: 'pro Nacht',
      },
      ru: {
        titleSuffix: 'Звездный Отель',
        descriptionSuffix: 'Забронировать. Бесплатная отмена, гарантия лучшей цены.',
        keywordHotel: 'отель',
        keywordBooking: 'бронирование',
        perNight: 'за ночь',
      },
      ar: {
        titleSuffix: 'فندق نجوم',
        descriptionSuffix: 'احجز الآن. إلغاء مجاني، ضمان أفضل سعر.',
        keywordHotel: 'فندق',
        keywordBooking: 'حجز',
        perNight: 'لكل ليلة',
      },
      fa: {
        titleSuffix: 'ستاره هتل',
        descriptionSuffix: 'اکنون رزرو کنید. لغو رایگان، تضمین بهترین قیمت.',
        keywordHotel: 'هتل',
        keywordBooking: 'رزرو',
        perNight: 'هر شب',
      },
      fr: {
        titleSuffix: 'Étoiles Hôtel',
        descriptionSuffix: 'Réservez maintenant. Annulation gratuite, garantie du meilleur prix.',
        keywordHotel: 'hôtel',
        keywordBooking: 'réservation',
        perNight: 'par nuit',
      },
      el: {
        titleSuffix: 'Αστέρων Ξενοδοχείο',
        descriptionSuffix: 'Κράτηση τώρα. Δωρεάν ακύρωση, εγγύηση καλύτερης τιμής.',
        keywordHotel: 'ξενοδοχείο',
        keywordBooking: 'κράτηση',
        perNight: 'ανά διανυκτέρευση',
      },
    };

    const t = translations[currentLocale] || translations.tr;

    // Generate title
    const title = `${hotel.name} | ${hotel.stars} ${t.titleSuffix} ${hotel.city} - Holiday.AILYDIAN`;

    // Generate description
    const shortDesc = hotel.description.length > 110
      ? hotel.description.substring(0, 110) + '...'
      : hotel.description;

    const ratingText = hotel.rating && hotel.reviewCount
      ? ` ⭐ ${hotel.rating}/5 (${hotel.reviewCount})`
      : '';

    const priceText = ` ${localeConfig.currencySymbol}${hotel.minPrice} ${t.perNight}`;

    const description = `${shortDesc}${ratingText}.${priceText}. ${t.descriptionSuffix}`;

    // Generate keywords
    const keywords = [
      hotel.name,
      `${hotel.city} ${t.keywordHotel}`,
      `${hotel.stars} ${t.titleSuffix}`,
      `${hotel.city} ${t.keywordBooking}`,
      `${hotel.city} konaklama`,
      ...(hotel.amenities || []).slice(0, 3),
    ];

    // Generate schema
    const schemaConfig: SchemaOrgConfig = {
      type: 'Hotel',
      name: hotel.name,
      description: hotel.description,
      image: hotel.images?.[0],
      price: hotel.minPrice,
      currency: localeConfig.currency,
      rating: hotel.rating,
      reviewCount: hotel.reviewCount,
      location: {
        name: hotel.name,
        address: hotel.address,
        city: hotel.city,
        country: 'Turkey',
        coordinates: hotel.lat && hotel.lng ? { lat: hotel.lat, lng: hotel.lng } : undefined,
      },
    };

    const schema = generateSchemaOrg(schemaConfig);

    // Generate breadcrumbs
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', url: `https://holiday.ailydian.com/${currentLocale === 'tr' ? '' : currentLocale}` },
      { name: 'Hotels', url: `https://holiday.ailydian.com/${currentLocale === 'tr' ? '' : currentLocale + '/'}hotels` },
      { name: hotel.city, url: `https://holiday.ailydian.com/${currentLocale === 'tr' ? '' : currentLocale + '/'}hotels?city=${hotel.city.toLowerCase()}` },
      { name: hotel.name, url: `https://holiday.ailydian.com/${currentLocale === 'tr' ? '' : currentLocale + '/'}hotels/${hotel.slug}` },
    ];

    return {
      title,
      description,
      keywords,
      ogImage: hotel.images?.[0],
      schema,
      breadcrumbs,
    };
  }, [hotel, currentLocale, localeConfig]);
}

// ===================================================
// CAR RENTAL SEO HOOK
// ===================================================

export interface CarRentalData {
  id: string;
  brand: string;
  model: string;
  description: string;
  slug: string;
  dailyPrice: number;
  transmission: string;
  fuelType: string;
  seats: number;
  rating?: number;
  reviewCount?: number;
  images?: string[];
}

/**
 * Generate SEO data for car rental pages
 */
export function useCarRentalSEO(car: CarRentalData): SEOData {
  const { locale } = useRouter();
  const currentLocale = (locale || 'tr') as SupportedLocale;
  const localeConfig = getLocaleConfig(currentLocale);

  return useMemo(() => {
    const carName = `${car.brand} ${car.model}`;

    const title = `${carName} Kiralama | Rent a Car - Holiday.AILYDIAN`;

    const shortDesc = car.description.length > 120
      ? car.description.substring(0, 120) + '...'
      : car.description;

    const ratingText = car.rating && car.reviewCount
      ? ` ⭐ ${car.rating}/5 (${car.reviewCount})`
      : '';

    const description = `${shortDesc}${ratingText}. ${localeConfig.currencySymbol}${car.dailyPrice}/gün. ${car.transmission}, ${car.fuelType}, ${car.seats} kişilik.`;

    const keywords = [
      `${carName} kiralama`,
      'rent a car',
      'araç kiralama',
      car.brand,
      car.transmission,
      car.fuelType,
      `${car.seats} kişilik araç`,
    ];

    const schemaConfig: SchemaOrgConfig = {
      type: 'Product',
      name: carName,
      description: car.description,
      image: car.images?.[0],
      price: car.dailyPrice,
      currency: localeConfig.currency,
      rating: car.rating,
      reviewCount: car.reviewCount,
      brand: car.brand,
    };

    const schema = generateSchemaOrg(schemaConfig);

    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', url: `https://holiday.ailydian.com/${currentLocale === 'tr' ? '' : currentLocale}` },
      { name: 'Car Rental', url: `https://holiday.ailydian.com/${currentLocale === 'tr' ? '' : currentLocale + '/'}car-rental` },
      { name: carName, url: `https://holiday.ailydian.com/${currentLocale === 'tr' ? '' : currentLocale + '/'}car-rental/${car.slug}` },
    ];

    return {
      title,
      description,
      keywords,
      ogImage: car.images?.[0],
      schema,
      breadcrumbs,
    };
  }, [car, currentLocale, localeConfig]);
}

// ===================================================
// TRANSFER SEO HOOK
// ===================================================

export interface TransferData {
  id: string;
  from: string;
  to: string;
  description: string;
  slug: string;
  price: number;
  vehicleType: string;
  capacity: number;
  rating?: number;
  reviewCount?: number;
  images?: string[];
}

/**
 * Generate SEO data for transfer pages
 */
export function useTransferSEO(transfer: TransferData): SEOData {
  const { locale } = useRouter();
  const currentLocale = (locale || 'tr') as SupportedLocale;
  const localeConfig = getLocaleConfig(currentLocale);

  return useMemo(() => {
    const route = `${transfer.from} - ${transfer.to}`;

    const title = `${route} Transfer | VIP Transfer Hizmeti - Holiday.AILYDIAN`;

    const ratingText = transfer.rating && transfer.reviewCount
      ? ` ⭐ ${transfer.rating}/5 (${transfer.reviewCount})`
      : '';

    const description = `${route} transfer hizmeti.${ratingText} ${localeConfig.currencySymbol}${transfer.price}. ${transfer.vehicleType}, ${transfer.capacity} kişilik. 7/24 hizmet.`;

    const keywords = [
      `${route} transfer`,
      `${transfer.from} transfer`,
      `${transfer.to} transfer`,
      'havalimanı transferi',
      'VIP transfer',
      transfer.vehicleType,
    ];

    const schemaConfig: SchemaOrgConfig = {
      type: 'Service',
      name: `${route} Transfer`,
      description: transfer.description,
      image: transfer.images?.[0],
      price: transfer.price,
      currency: localeConfig.currency,
      rating: transfer.rating,
      reviewCount: transfer.reviewCount,
    };

    const schema = generateSchemaOrg(schemaConfig);

    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', url: `https://holiday.ailydian.com/${currentLocale === 'tr' ? '' : currentLocale}` },
      { name: 'Transfers', url: `https://holiday.ailydian.com/${currentLocale === 'tr' ? '' : currentLocale + '/'}transfers` },
      { name: route, url: `https://holiday.ailydian.com/${currentLocale === 'tr' ? '' : currentLocale + '/'}transfers/${transfer.slug}` },
    ];

    return {
      title,
      description,
      keywords,
      ogImage: transfer.images?.[0],
      schema,
      breadcrumbs,
    };
  }, [transfer, currentLocale, localeConfig]);
}

// ===================================================
// EXPORTS
// ===================================================

export default {
  useTourSEO,
  useHotelSEO,
  useCarRentalSEO,
  useTransferSEO,
};
