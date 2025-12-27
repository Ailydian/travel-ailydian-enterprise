import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import logger from '../../../../../lib/logger';

// AI-Powered Unified Search API
// Tüm kategorilerde (otel, araç, uçuş, tur, transfer) arama yapar
// Natural language processing ile kullanıcı niyetini anlar

interface SearchResult {
  category: 'hotel' | 'car' | 'flight' | 'tour' | 'transfer' | 'package';
  title: string;
  description: string;
  price: number;
  image: string;
  url: string;
  rating?: number;
  location?: string;
}

interface AISearchSuggestion {
  type: 'bundle' | 'alternative' | 'upgrade';
  title: string;
  description: string;
  savings?: number;
  items: string[];
}

// Extract search intent from natural language query
function analyzeSearchIntent(query: string) {
  const lowerQuery = query.toLowerCase();

  const intent = {
    location: null as string | null,
    nights: null as number | null,
    guests: null as number | null,
    categories: [] as string[],
    dates: {
      start: null as Date | null,
      end: null as Date | null
    },
    keywords: [] as string[]
  };

  // Extract location (Turkish cities)
  const cities = [
    'istanbul', 'ankara', 'izmir', 'antalya', 'bodrum', 'kapadokya',
    'pamukkale', 'fethiye', 'marmaris', 'kuşadası', 'çeşme', 'alaçatı',
    'kaş', 'kalkan', 'didim', 'dalaman', 'muğla', 'aydın', 'denizli',
    'konya', 'trabzon', 'samsun', 'adana', 'gaziantep', 'şanlıurfa'
  ];

  for (const city of cities) {
    if (lowerQuery.includes(city)) {
      intent.location = city.charAt(0).toUpperCase() + city.slice(1);
      break;
    }
  }

  // Extract nights
  const nightsMatch = lowerQuery.match(/(\d+)\s*(gece|night|gün)/);
  if (nightsMatch) {
    intent.nights = parseInt(nightsMatch[1]);
  }

  // Extract guests
  const guestsMatch = lowerQuery.match(/(\d+)\s*(kişi|person|guest)/);
  if (guestsMatch) {
    intent.guests = parseInt(guestsMatch[1]);
  }

  // Detect categories from keywords
  const categoryKeywords = {
    hotel: ['otel', 'hotel', 'konaklama', 'konakla', 'kal'],
    car: ['araç', 'car', 'araba', 'kiralama', 'rent'],
    flight: ['uçuş', 'flight', 'uçak', 'uç'],
    tour: ['tur', 'tour', 'gezi', 'aktivite', 'activity'],
    transfer: ['transfer', 'havaalanı', 'airport', 'karşılama', 'pickup']
  };

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => lowerQuery.includes(keyword))) {
      intent.categories.push(category);
    }
  }

  // Extract general keywords
  intent.keywords = lowerQuery.split(/\s+/).filter(word => word.length > 2);

  return intent;
}

// Calculate bundle discount
function calculateBundleDiscount(categories: string[]): number {
  const categoryCount = categories.length;

  if (categoryCount >= 5) return 20; // Full package: %20
  if (categoryCount >= 4) return 15; // Otel + Transfer + Tur + Araç: %15
  if (categoryCount >= 3) return 10; // Otel + Transfer + Tur: %10
  if (categoryCount >= 2) return 5;  // Otel + Transfer: %5

  return 0;
}

// Generate AI suggestions based on search
function generateAISuggestions(
  intent: ReturnType<typeof analyzeSearchIntent>,
  results: SearchResult[]
): AISearchSuggestion[] {
  const suggestions: AISearchSuggestion[] = [];

  // Bundle suggestion
  if (intent.categories.length >= 2) {
    const discount = calculateBundleDiscount(intent.categories);
    suggestions.push({
      type: 'bundle',
      title: 'Paket Rezervasyon Yapın, Kazanın!',
      description: `${intent.categories.length} kategoriyi birlikte rezerve ederek %${discount} tasarruf edin.`,
      savings: discount,
      items: [
        intent.categories.includes('hotel') ? '✓ Otel konaklama' : '',
        intent.categories.includes('car') ? '✓ Araç kiralama' : '',
        intent.categories.includes('flight') ? '✓ Uçak bileti' : '',
        intent.categories.includes('tour') ? '✓ Tur ve aktiviteler' : '',
        intent.categories.includes('transfer') ? '✓ Havaalanı transferi' : '',
      ].filter(Boolean)
    });
  }

  // Alternative destination suggestion
  if (intent.location) {
    const alternativeDestinations: Record<string, string[]> = {
      'Antalya': ['Kaş', 'Kalkan', 'Fethiye'],
      'İstanbul': ['Bursa', 'İznik', 'Polonezköy'],
      'Bodrum': ['Marmaris', 'Datça', 'Akyaka'],
      'Kapadokya': ['Konya', 'Aksaray', 'Kayseri']
    };

    const alternatives = alternativeDestinations[intent.location];
    if (alternatives) {
      suggestions.push({
        type: 'alternative',
        title: `${intent.location} Yerine Keşfedin`,
        description: `Daha uygun fiyatlarla benzer deneyimler`,
        savings: 25,
        items: alternatives.map(dest => `📍 ${dest}`)
      });
    }
  }

  // Upgrade suggestion
  if (results.length > 0) {
    suggestions.push({
      type: 'upgrade',
      title: 'VIP Deneyim Paketi',
      description: 'Premium araç, lüks otel ve özel turlarla unutulmaz bir tatil',
      items: [
        '⭐ 5 yıldızlı boutique otel',
        '🚗 Premium araç (Mercedes S-Class)',
        '✈️ Business class uçak bileti',
        '🎭 Özel rehberli turlar',
        '🥂 VIP karşılama ve transfer'
      ]
    });
  }

  return suggestions;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { query, categories } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ success: false, message: 'Query is required' });
    }

    // Analyze search intent
    const intent = analyzeSearchIntent(query);

    // Override with explicit categories if provided
    const searchCategories = categories && categories.length > 0
      ? categories
      : intent.categories;

    const results: SearchResult[] = [];

    // Search hotels
    if (searchCategories.length === 0 || searchCategories.includes('hotels')) {
      const hotels = await prisma.property.findMany({
        where: {
          AND: [
            intent.location ? {
              OR: [
                { city: { contains: intent.location, mode: 'insensitive' } },
                { district: { contains: intent.location, mode: 'insensitive' } }
              ]
            } : {},
            { status: 'active' }
          ]
        },
        take: 6,
        orderBy: { createdAt: 'desc' }
      });

      results.push(
        ...hotels.map(hotel => ({
          category: 'hotel' as const,
          title: hotel.title,
          description: hotel.description.substring(0, 100) + '...',
          price: parseInt(hotel.basePrice),
          image: hotel.images[0] || '/images/placeholder-hotel.jpg',
          url: `/rentals/${hotel.slug}`,
          rating: parseFloat(hotel.rating),
          location: `${hotel.district}, ${hotel.city}`
        }))
      );
    }

    // Search car rentals
    if (searchCategories.length === 0 || searchCategories.includes('cars')) {
      const cars = await prisma.carRental.findMany({
        where: {
          AND: [
            intent.location ? {
              OR: [
                { location: { contains: intent.location, mode: 'insensitive' } },
                { pickupLocations: { has: intent.location } }
              ]
            } : {},
            { available: true }
          ]
        },
        take: 6,
        orderBy: { createdAt: 'desc' }
      });

      results.push(
        ...cars.map(car => ({
          category: 'car' as const,
          title: `${car.make} ${car.model} ${car.year}`,
          description: `${car.transmission} · ${car.fuelType} · ${car.seats} koltuk`,
          price: parseInt(car.pricePerDay),
          image: car.images[0] || '/images/placeholder-car.jpg',
          url: `/car-rentals/${car.slug}`,
          rating: parseFloat(car.rating),
          location: car.location
        }))
      );
    }

    // Search tours
    if (searchCategories.length === 0 || searchCategories.includes('tours')) {
      const tours = await prisma.tour.findMany({
        where: {
          AND: [
            intent.location ? {
              OR: [
                { destination: { contains: intent.location, mode: 'insensitive' } },
                { title: { contains: intent.location, mode: 'insensitive' } }
              ]
            } : {},
            { active: true }
          ]
        },
        take: 6,
        orderBy: { createdAt: 'desc' }
      });

      results.push(
        ...tours.map(tour => ({
          category: 'tour' as const,
          title: tour.title,
          description: tour.description.substring(0, 100) + '...',
          price: parseInt(tour.price),
          image: tour.images[0] || '/images/placeholder-tour.jpg',
          url: `/tours/${tour.slug}`,
          rating: parseFloat(tour.rating),
          location: tour.destination
        }))
      );
    }

    // Generate AI suggestions
    const aiSuggestions = generateAISuggestions(intent, results);

    // Sort results by relevance (hotels first, then by rating)
    results.sort((a, b) => {
      // Priority order: hotel > tour > car > transfer > flight
      const categoryPriority = { hotel: 1, tour: 2, car: 3, transfer: 4, flight: 5, package: 6 };
      const priorityDiff = categoryPriority[a.category] - categoryPriority[b.category];

      if (priorityDiff !== 0) return priorityDiff;

      // Then by rating
      return (b.rating || 0) - (a.rating || 0);
    });

    return res.status(200).json({
      success: true,
      results,
      aiSuggestions,
      intent,
      totalResults: results.length
    });

  } catch (error) {
    logger.error('Unified search error:', error as Error, {component:'Unified'});
    return res.status(500).json({
      success: false,
      message: 'Search failed',
      error: process.env.NODE_ENV === 'development' ? String(error) : undefined
    });
  }
}
