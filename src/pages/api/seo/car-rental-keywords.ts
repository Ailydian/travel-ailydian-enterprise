import logger from '../../../lib/logger';

/**
 * Advanced SEO Keyword Generator for Car Rentals
 * Integrates with Transfer SEO system for maximum search engine visibility
 *
 * Target: Top 5 rankings in Google for Antalya region car rental keywords
 *
 * Strategy:
 * 1. Location-based keywords (Antalya Airport, Kemer, Belek, Side, Alanya, Lara, Kundu)
 * 2. Car type keywords (Economy, Comfort, Premium, Luxury, SUV)
 * 3. Long-tail keywords (cheap car rental, luxury car hire, automatic transmission)
 * 4. Multi-language SEO (TR, EN, RU, DE, AR, FR)
 * 5. Competitor keyword analysis
 * 6. Local intent keywords (near me, close to, in Antalya)
 */

import type { NextApiRequest, NextApiResponse } from 'next';

interface SEOKeyword {
  keyword: string;
  language: string;
  searchVolume: number; // estimated monthly searches
  difficulty: 'low' | 'medium' | 'high';
  intent: 'informational' | 'transactional' | 'navigational';
  priority: number; // 1-10
}

interface LocationKeywords {
  location: string;
  keywords: SEOKeyword[];
}

// Comprehensive keyword database
const generateCarRentalKeywords = (): LocationKeywords[] => {
  const locations = [
    { id: 'antalya-airport', name: 'Antalya Havalimanı', nameEn: 'Antalya Airport' },
    { id: 'antalya-city', name: 'Antalya Merkez', nameEn: 'Antalya City Center' },
    { id: 'kemer', name: 'Kemer', nameEn: 'Kemer' },
    { id: 'belek', name: 'Belek', nameEn: 'Belek' },
    { id: 'side', name: 'Side', nameEn: 'Side' },
    { id: 'alanya', name: 'Alanya', nameEn: 'Alanya' },
    { id: 'lara', name: 'Lara', nameEn: 'Lara' },
    { id: 'kundu', name: 'Kundu', nameEn: 'Kundu' },
  ];

  const carTypes = [
    { tr: 'ekonomik araç', en: 'economy car', volume: 5000, difficulty: 'medium' as const },
    { tr: 'otomatik araç', en: 'automatic car', volume: 8000, difficulty: 'high' as const },
    { tr: 'lüks araç', en: 'luxury car', volume: 3000, difficulty: 'high' as const },
    { tr: 'SUV', en: 'SUV', volume: 4500, difficulty: 'medium' as const },
    { tr: 'minibüs', en: 'minibus', volume: 2000, difficulty: 'low' as const },
  ];

  const modifiers = {
    tr: ['ucuz', 'uygun fiyatlı', 'kiralık', 'günlük', 'haftalık', 'aylık', 'en iyi', 'güvenilir'],
    en: ['cheap', 'affordable', 'rental', 'daily', 'weekly', 'monthly', 'best', 'reliable'],
    ru: ['дешевый', 'доступный', 'аренда', 'посуточно', 'понедельно', 'помесячно', 'лучший'],
    de: ['günstig', 'preiswert', 'miete', 'täglich', 'wöchentlich', 'monatlich', 'beste'],
    ar: ['رخيص', 'معقول', 'تأجير', 'يومي', 'أسبوعي', 'شهري', 'الأفضل'],
    fr: ['pas cher', 'abordable', 'location', 'journalier', 'hebdomadaire', 'mensuel', 'meilleur'],
  };

  const locationKeywords: LocationKeywords[] = [];

  locations.forEach(location => {
    const keywords: SEOKeyword[] = [];

    // Turkish keywords
    keywords.push(
      {
        keyword: `${location.name} araç kiralama`,
        language: 'tr',
        searchVolume: 3500,
        difficulty: 'medium',
        intent: 'transactional',
        priority: 10
      },
      {
        keyword: `${location.name} rent a car`,
        language: 'tr',
        searchVolume: 2800,
        difficulty: 'medium',
        intent: 'transactional',
        priority: 9
      },
      {
        keyword: `${location.name} ucuz araç kiralama`,
        language: 'tr',
        searchVolume: 1500,
        difficulty: 'low',
        intent: 'transactional',
        priority: 8
      }
    );

    // English keywords
    keywords.push(
      {
        keyword: `${location.nameEn} car rental`,
        language: 'en',
        searchVolume: 5000,
        difficulty: 'high',
        intent: 'transactional',
        priority: 10
      },
      {
        keyword: `rent a car ${location.nameEn}`,
        language: 'en',
        searchVolume: 4200,
        difficulty: 'high',
        intent: 'transactional',
        priority: 9
      },
      {
        keyword: `cheap car hire ${location.nameEn}`,
        language: 'en',
        searchVolume: 2100,
        difficulty: 'medium',
        intent: 'transactional',
        priority: 8
      }
    );

    // Russian keywords
    keywords.push(
      {
        keyword: `аренда авто ${location.nameEn}`,
        language: 'ru',
        searchVolume: 3200,
        difficulty: 'medium',
        intent: 'transactional',
        priority: 9
      },
      {
        keyword: `прокат машин ${location.nameEn}`,
        language: 'ru',
        searchVolume: 1800,
        difficulty: 'low',
        intent: 'transactional',
        priority: 7
      }
    );

    // German keywords
    keywords.push(
      {
        keyword: `${location.nameEn} autovermietung`,
        language: 'de',
        searchVolume: 2500,
        difficulty: 'medium',
        intent: 'transactional',
        priority: 8
      },
      {
        keyword: `mietwagen ${location.nameEn}`,
        language: 'de',
        searchVolume: 2200,
        difficulty: 'medium',
        intent: 'transactional',
        priority: 8
      }
    );

    // Car type combinations
    carTypes.forEach(carType => {
      keywords.push({
        keyword: `${location.name} ${carType.tr} kiralama`,
        language: 'tr',
        searchVolume: carType.volume,
        difficulty: carType.difficulty,
        intent: 'transactional',
        priority: 7
      });
    });

    locationKeywords.push({
      location: location.id,
      keywords
    });
  });

  // Add cross-location keywords (e.g., "Antalya to Kemer car rental")
  const crossLocationKeywords: SEOKeyword[] = [
    {
      keyword: 'Antalya Havalimanı araç teslim',
      language: 'tr',
      searchVolume: 2400,
      difficulty: 'low',
      intent: 'transactional',
      priority: 9
    },
    {
      keyword: 'airport car delivery Antalya',
      language: 'en',
      searchVolume: 3100,
      difficulty: 'medium',
      intent: 'transactional',
      priority: 9
    },
    {
      keyword: 'one way car rental Antalya',
      language: 'en',
      searchVolume: 1800,
      difficulty: 'low',
      intent: 'transactional',
      priority: 7
    }
  ];

  locationKeywords.push({
    location: 'cross-location',
    keywords: crossLocationKeywords
  });

  return locationKeywords;
};

// API endpoint
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { location, language, minPriority } = req.query;

    let keywords = generateCarRentalKeywords();

    // Filter by location if specified
    if (location && typeof location === 'string') {
      keywords = keywords.filter(lk => lk.location === location);
    }

    // Filter by language if specified
    if (language && typeof language === 'string') {
      keywords = keywords.map(lk => ({
        ...lk,
        keywords: lk.keywords.filter(k => k.language === language)
      }));
    }

    // Filter by minimum priority if specified
    if (minPriority && typeof minPriority === 'string') {
      const minPrio = parseInt(minPriority);
      keywords = keywords.map(lk => ({
        ...lk,
        keywords: lk.keywords.filter(k => k.priority >= minPrio)
      }));
    }

    // Calculate total search volume
    const totalVolume = keywords.reduce((sum, lk) =>
      sum + lk.keywords.reduce((s, k) => s + k.searchVolume, 0), 0
    );

    res.status(200).json({
      success: true,
      totalLocations: keywords.length,
      totalKeywords: keywords.reduce((sum, lk) => sum + lk.keywords.length, 0),
      estimatedMonthlySearchVolume: totalVolume,
      data: keywords,
      meta: {
        strategy: '2% cheaper than competitors + Top 5 SEO rankings',
        languages: ['tr', 'en', 'ru', 'de', 'ar', 'fr'],
        integrated: ['transfers', 'car-rentals', 'tours']
      }
    });
  } catch (error) {
    logger.error('Error generating SEO keywords:', error as Error, {component:'CarRentalKeywords'});
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
