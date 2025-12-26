import type { NextApiRequest, NextApiResponse } from 'next';
import { HOTELS_DATA, TURKEY_CITIES } from '../../../../prisma/seeds/turkey-tourism-data';

/**
 * ADVANCED HOTEL SEARCH API
 * Comprehensive hotel search with filters, comparison, and SEO optimization
 */

interface HotelSearchParams {
  destination?: string;
  district?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  rooms?: number;
  stars?: number[];
  priceMin?: number;
  priceMax?: number;
  amenities?: string[];
  sortBy?: 'price' | 'rating' | 'popularity';
  page?: number;
  limit?: number;
}

interface ComparisonPrices {
  booking: number;
  hotels: number;
  expedia: number;
  trivago: number;
  ourPrice: number;
  savings: number;
  savingsPercent: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const params: HotelSearchParams = req.method === 'GET' ? req.query : req.body;

    // Parse parameters
    const {
      destination,
      district,
      checkIn,
      checkOut,
      guests = 2,
      rooms = 1,
      stars,
      priceMin,
      priceMax,
      amenities,
      sortBy = 'rating',
      page = 1,
      limit = 20
    } = params;

    // Collect all hotels from specified destination/district
    let allHotels: any[] = [];

    if (district && HOTELS_DATA[district as keyof typeof HOTELS_DATA]) {
      allHotels = HOTELS_DATA[district as keyof typeof HOTELS_DATA];
    } else if (destination) {
      // Get all districts for the destination
      const city = TURKEY_CITIES.find(c =>
        c.id === destination.toLowerCase() ||
        c.name.toLowerCase() === destination.toLowerCase()
      );

      if (city && city.districts) {
        city.districts.forEach(dist => {
          const districtKey = dist.id as keyof typeof HOTELS_DATA;
          if (HOTELS_DATA[districtKey]) {
            allHotels.push(...HOTELS_DATA[districtKey]);
          }
        });
      }
    } else {
      // No filter - get all hotels (sample)
      Object.keys(HOTELS_DATA).forEach(key => {
        const districtHotels = HOTELS_DATA[key as keyof typeof HOTELS_DATA];
        if (Array.isArray(districtHotels)) {
          allHotels.push(...districtHotels);
        }
      });
    }

    // Apply filters
    let filteredHotels = allHotels.filter(hotel => {
      // Star filter
      if (stars && stars.length > 0 && !stars.includes(hotel.stars)) {
        return false;
      }

      // Price filter
      if (priceMin && hotel.pricePerNight.min < priceMin) {
        return false;
      }
      if (priceMax && hotel.pricePerNight.max > priceMax) {
        return false;
      }

      // Amenities filter
      if (amenities && amenities.length > 0) {
        const hasAllAmenities = amenities.every(amenity =>
          hotel.amenities.some((a: string) =>
            a.toLowerCase().includes(amenity.toLowerCase())
          )
        );
        if (!hasAllAmenities) {
          return false;
        }
      }

      return true;
    });

    // Calculate competitor prices and our savings
    const hotelsWithComparison = filteredHotels.map(hotel => {
      const basePrice = hotel.pricePerNight.min;

      // Simulate competitor prices (typically 10-30% higher)
      const comparison: ComparisonPrices = {
        booking: Math.round(basePrice * 1.15),
        hotels: Math.round(basePrice * 1.20),
        expedia: Math.round(basePrice * 1.18),
        trivago: Math.round(basePrice * 1.12),
        ourPrice: basePrice,
        savings: 0,
        savingsPercent: 0
      };

      // Calculate average competitor price
      const avgCompetitorPrice = Math.round(
        (comparison.booking + comparison.hotels + comparison.expedia + comparison.trivago) / 4
      );

      comparison.savings = avgCompetitorPrice - basePrice;
      comparison.savingsPercent = Math.round((comparison.savings / avgCompetitorPrice) * 100);

      return {
        ...hotel,
        comparison,
        availability: generateAvailability(checkIn, checkOut),
        totalPrice: calculateTotalPrice(hotel.pricePerNight.min, checkIn, checkOut, rooms)
      };
    });

    // Sort hotels
    const sortedHotels = hotelsWithComparison.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.pricePerNight.min - b.pricePerNight.min;
        case 'rating':
          return b.rating - a.rating;
        case 'popularity':
          return b.reviewCount - a.reviewCount;
        default:
          return b.rating - a.rating;
      }
    });

    // Pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedHotels = sortedHotels.slice(startIndex, endIndex);

    // Prepare response
    const response = {
      success: true,
      data: {
        hotels: paginatedHotels,
        meta: {
          total: sortedHotels.length,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(sortedHotels.length / Number(limit))
        },
        filters: {
          destination,
          district,
          stars,
          priceRange: {
            min: priceMin,
            max: priceMax
          }
        },
        searchInfo: {
          destination: destination || 'All Cities',
          district: district || 'All Districts',
          checkIn,
          checkOut,
          guests,
          rooms
        },
        seo: generateSEO(destination, district)
      }
    };

    return res.status(200).json(response);

  } catch (error) {
    console.error('Hotel search error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

// Helper Functions
function generateAvailability(checkIn?: string, checkOut?: string) {
  // Simulate availability
  const availableRooms = Math.floor(Math.random() * 15) + 5;
  const lastBooked = Math.floor(Math.random() * 120) + 10; // minutes ago

  return {
    available: availableRooms > 0,
    roomsLeft: availableRooms,
    lastBookedMinutesAgo: lastBooked,
    urgency: availableRooms < 5 ? 'high' : availableRooms < 10 ? 'medium' : 'low'
  };
}

function calculateTotalPrice(pricePerNight: number, checkIn?: string, checkOut?: string, rooms: number = 1) {
  if (!checkIn || !checkOut) {
    return pricePerNight * rooms;
  }

  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  return pricePerNight * nights * rooms;
}

function generateSEO(destination?: string, district?: string) {
  const city = TURKEY_CITIES.find(c =>
    c.id === destination?.toLowerCase() ||
    c.name.toLowerCase() === destination?.toLowerCase()
  );

  if (!city) {
    return {
      title: 'Otel Rezervasyonu - En Uygun Otel Fiyatları | Travel LyDian',
      description: 'Türkiye\'nin her yerinde otel rezervasyonu yapın. En uygun fiyatlar ve fırsatlar.',
      keywords: 'otel rezervasyonu, otel fiyatları, tatil, konaklama'
    };
  }

  const districtName = district ? ` - ${district}` : '';

  return {
    title: `${city.name}${districtName} Otelleri - En Uygun Fiyatlar | Travel LyDian`,
    description: `${city.name}${districtName} için en iyi otelleri karşılaştırın. ${city.highlights.slice(0, 3).join(', ')}. Rezervasyon yapın, tasarruf edin!`,
    keywords: `${city.name.toLowerCase()} otelleri${district ? `, ${district} otelleri` : ''}, ${city.tags.join(', ')}, ${city.name.toLowerCase()} tatil`,
    h1: `${city.name}${districtName} Otelleri`,
    breadcrumb: [
      { name: 'Ana Sayfa', url: '/' },
      { name: 'Oteller', url: '/hotels' },
      { name: city.name, url: `/hotels?destination=${city.id}` },
      ...(district ? [{ name: district, url: `/hotels?destination=${city.id}&district=${district}` }] : [])
    ],
    cityInfo: {
      name: city.name,
      description: city.description,
      highlights: city.highlights,
      airport: city.airportName,
      seasonPeak: city.seasonPeak,
      touristCapacity: city.touristCapacity
    }
  };
}
