import type { NextApiRequest, NextApiResponse } from 'next';
import { amadeusService, transformFlightData } from '@/lib/amadeus-service';

interface FlightSearchRequest {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  infants?: number;
  travelClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
  nonStop?: boolean;
  currencyCode?: string;
  max?: number;
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
    const searchParams: FlightSearchRequest = req.body;

    // Validate required parameters
    if (!searchParams.originLocationCode || !searchParams.destinationLocationCode || !searchParams.departureDate) {
      return res.status(400).json({
        error: 'Missing required parameters',
        message: 'originLocationCode, destinationLocationCode, and departureDate are required',
        required: ['originLocationCode', 'destinationLocationCode', 'departureDate']
      });
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(searchParams.departureDate)) {
      return res.status(400).json({
        error: 'Invalid date format',
        message: 'Date must be in YYYY-MM-DD format'
      });
    }

    // If return date is provided, validate it
    if (searchParams.returnDate && !dateRegex.test(searchParams.returnDate)) {
      return res.status(400).json({
        error: 'Invalid return date format',
        message: 'Return date must be in YYYY-MM-DD format'
      });
    }

    // Set default values
    const searchRequest = {
      originLocationCode: searchParams.originLocationCode.toUpperCase(),
      destinationLocationCode: searchParams.destinationLocationCode.toUpperCase(),
      departureDate: searchParams.departureDate,
      returnDate: searchParams.returnDate,
      adults: Math.max(1, searchParams.adults || 1),
      children: Math.max(0, searchParams.children || 0),
      infants: Math.max(0, searchParams.infants || 0),
      travelClass: searchParams.travelClass || 'ECONOMY',
      nonStop: Boolean(searchParams.nonStop),
      currencyCode: searchParams.currencyCode || 'TRY',
      max: Math.min(50, Math.max(1, searchParams.max || 20))
    };

    console.log('Flight search request:', searchRequest);

    // Search flights using Amadeus service
    const response = await amadeusService.searchFlights(searchRequest);

    // Transform results
    const transformedFlights = response.data
      .map(transformFlightData)
      .filter((flight: any) => flight !== null)
      .slice(0, searchRequest.max);

    // Return successful response
    return res.status(200).json({
      success: true,
      data: {
        flights: transformedFlights,
        searchParams: searchRequest,
        totalResults: transformedFlights.length,
        currency: searchRequest.currencyCode,
        searchId: `flight_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      },
      meta: {
        requestTime: new Date().toISOString(),
        source: 'amadeus',
        cached: false
      }
    });

  } catch (error) {
    console.error('Flight search API error:', error);

    // Return error response
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    return res.status(500).json({
      success: false,
      error: 'Flight search failed',
      message: errorMessage,
      details: process.env.NODE_ENV === 'development' ? {
        stack: error instanceof Error ? error.stack : 'No stack trace available'
      } : undefined
    });
  }
}