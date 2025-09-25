import type { NextApiRequest, NextApiResponse } from 'next';
import { amadeusService, transformHotelData } from '@/lib/amadeus-service';

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
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are accepted'
    });
  }

  try {
    const searchParams: HotelSearchRequest = req.body;

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

    console.log('Hotel search request:', searchRequest);

    // Search hotels using Amadeus service
    const response = await amadeusService.searchHotels(searchRequest);

    // Transform results
    const transformedHotels = response.data
      .map(transformHotelData)
      .filter((hotel: any) => hotel !== null);

    // Apply additional filters if specified
    let filteredHotels = transformedHotels;

    // Filter by price range if specified
    if (searchParams.priceRange) {
      const { min, max } = searchParams.priceRange;
      filteredHotels = filteredHotels.filter((hotel: any) => {
        const price = hotel.price;
        return (!min || price >= min) && (!max || price <= max);
      });
    }

    // Filter by ratings if specified
    if (searchParams.ratings && searchParams.ratings.length > 0) {
      filteredHotels = filteredHotels.filter((hotel: any) => 
        searchParams.ratings!.includes(Math.floor(hotel.rating))
      );
    }

    // Sort by rating (highest first) and then by price (lowest first)
    filteredHotels.sort((a: any, b: any) => {
      if (a.rating !== b.rating) {
        return b.rating - a.rating;
      }
      return a.price - b.price;
    });

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
    console.error('Hotel search API error:', error);

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
  }
}