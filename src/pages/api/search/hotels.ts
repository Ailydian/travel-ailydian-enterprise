import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import logger from '../../../../../lib/logger';

const prisma = new PrismaClient();

interface HotelSearchRequest {
  cityCode: string;
  checkInDate: string;
  checkOutDate: string;
  roomQuantity?: number;
  adults?: number;
  childAges?: number[];
  radius?: number;
  radiusUnit?: 'KM' | 'MILE';
  ratings?: number[];
  priceRange?: {
    min?: number;
    max?: number;
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Allow both GET and POST
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Only GET and POST requests are accepted'
    });
  }

  try {
    // Get params from body (POST) or query (GET)
    const searchParams: HotelSearchRequest = req.method === 'GET' ? req.query : req.body;

    // Validate required parameters
    if (!searchParams.cityCode || !searchParams.checkInDate || !searchParams.checkOutDate) {
      return res.status(400).json({
        error: 'Missing required parameters',
        message: 'cityCode, checkInDate, and checkOutDate are required',
        required: ['cityCode', 'checkInDate', 'checkOutDate']
      });
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(searchParams.checkInDate) || !dateRegex.test(searchParams.checkOutDate)) {
      return res.status(400).json({
        error: 'Invalid date format',
        message: 'Dates must be in YYYY-MM-DD format'
      });
    }

    // Validate that check-in is before check-out
    const checkIn = new Date(searchParams.checkInDate);
    const checkOut = new Date(searchParams.checkOutDate);
    
    if (checkIn >= checkOut) {
      return res.status(400).json({
        error: 'Invalid date range',
        message: 'Check-in date must be before check-out date'
      });
    }

    // Validate that check-in is not in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkIn < today) {
      return res.status(400).json({
        error: 'Invalid check-in date',
        message: 'Check-in date cannot be in the past'
      });
    }

    // Set default values
    const searchRequest = {
      cityCode: searchParams.cityCode.toUpperCase(),
      checkInDate: searchParams.checkInDate,
      checkOutDate: searchParams.checkOutDate,
      roomQuantity: Math.max(1, searchParams.roomQuantity || 1),
      adults: Math.max(1, searchParams.adults || 1),
      childAges: searchParams.childAges || [],
      radius: Math.min(20, Math.max(1, searchParams.radius || 5)),
      radiusUnit: searchParams.radiusUnit || 'KM',
      ratings: searchParams.ratings || []
    };

    logger.debug('Hotel search request:', { component: 'Hotels', metadata: { searchRequest } });

    // Build database query
    const where: any = {
      isActive: true,
    };

    // City/Region filter
    if (searchRequest.cityCode) {
      where.OR = [
        { city: { contains: searchRequest.cityCode, mode: 'insensitive' } },
        { region: { contains: searchRequest.cityCode, mode: 'insensitive' } },
      ];
    }

    // Star rating filter
    if (searchRequest.ratings && searchRequest.ratings.length > 0) {
      where.stars = { in: searchRequest.ratings };
    }

    // Price range filter
    if (searchParams.priceRange) {
      const { min, max } = searchParams.priceRange;
      where.AND = where.AND || [];
      if (min) {
        where.AND.push({ priceMin: { gte: min } });
      }
      if (max) {
        where.AND.push({ priceMax: { lte: max } });
      }
    }

    // Search hotels from database
    const hotels = await prisma.hotel.findMany({
      where,
      include: {
        rooms: {
          where: { isAvailable: true },
          orderBy: { pricePerNight: 'asc' },
          take: 3,
        },
      },
      orderBy: [
        { rating: 'desc' },
        { priceMin: 'asc' },
      ],
    });

    // Transform to API format
    const transformedHotels = hotels.map((hotel) => {
      const cheapestRoom = hotel.rooms[0];
      return {
        id: hotel.id,
        name: hotel.name,
        location: `${hotel.city}, ${hotel.region}`,
        city: hotel.city,
        region: hotel.region,
        rating: Number(hotel.rating),
        stars: hotel.stars,
        reviewCount: hotel.reviewCount,
        price: Number(cheapestRoom?.pricePerNight || hotel.priceMin),
        priceMin: Number(hotel.priceMin),
        priceMax: Number(hotel.priceMax),
        currency: hotel.currency,
        mainImage: hotel.mainImage,
        images: hotel.images,
        amenities: hotel.amenities,
        facilities: hotel.facilities,
        description: hotel.shortDescription || hotel.description,
        distanceToAirport: hotel.distanceToAirport,
        distanceToBeach: hotel.distanceToBeach,
        distanceToCenter: hotel.distanceToCenter,
        hotelType: hotel.hotelType,
        availableRooms: hotel.rooms.length,
        isFeatured: hotel.isFeatured,
        isRecommended: hotel.isRecommended,
      };
    });

    let filteredHotels = transformedHotels;

    // Calculate nights
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));

    // Return successful response
    return res.status(200).json({
      success: true,
      data: {
        hotels: filteredHotels,
        searchParams: searchRequest,
        totalResults: filteredHotels.length,
        nights,
        location: searchRequest.cityCode,
        searchId: `hotel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      },
      meta: {
        requestTime: new Date().toISOString(),
        source: 'amadeus',
        cached: false,
        filters: {
          priceRange: searchParams.priceRange,
          ratings: searchParams.ratings
        }
      }
    });

  } catch (error) {
    logger.error('Hotel search API error:', error as Error, { component: 'Hotels' });

    // Return error response
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    return res.status(500).json({
      success: false,
      error: 'Hotel search failed',
      message: errorMessage,
      details: process.env.NODE_ENV === 'development' ? {
        stack: error instanceof Error ? error.stack : 'No stack trace available'
      } : undefined
    });
  } finally {
    await prisma.$disconnect();
  }
}