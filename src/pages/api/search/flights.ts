import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import logger from '../../../lib/logger';

const prisma = new PrismaClient();

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
  // Allow both GET and POST
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Only GET and POST requests are accepted'
    });
  }

  try {
    // Get params from body (POST) or query (GET)
    const searchParams: FlightSearchRequest = req.method === 'GET' ? req.query as any : req.body;

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

    logger.debug('Flight search request:', { component: 'Flights', metadata: { searchRequest } });

    // Build database query
    const where: any = {
      isActive: true,
    };

    // Origin/Destination filter
    if (searchRequest.originLocationCode && searchRequest.destinationLocationCode) {
      where.AND = [
        {
          OR: [
            { departureAirport: searchRequest.originLocationCode },
            { departureCity: { contains: searchRequest.originLocationCode, mode: 'insensitive' } },
          ],
        },
        {
          OR: [
            { arrivalAirport: searchRequest.destinationLocationCode },
            { arrivalCity: { contains: searchRequest.destinationLocationCode, mode: 'insensitive' } },
          ],
        },
      ];
    }

    // Cabin class filter
    if (searchRequest.travelClass) {
      where.cabinClass = searchRequest.travelClass;
    }

    // Non-stop filter
    if (searchRequest.nonStop) {
      where.stops = 0;
    }

    // Search flights from database
    const flights = await prisma.flight.findMany({
      where,
      orderBy: [
        { priceAdult: 'asc' },
        { departureTime: 'asc' },
      ],
      take: searchRequest.max,
    });

    // Transform to API format
    const transformedFlights = flights.map((flight) => ({
      id: flight.id,
      flightNumber: flight.flightNumber,
      airline: flight.airline,
      airlineCode: flight.airlineCode,
      airlineLogo: flight.airlineLogo,
      from: `${flight.departureCity} (${flight.departureAirport})`,
      to: `${flight.arrivalCity} (${flight.arrivalAirport})`,
      departureAirport: flight.departureAirport,
      arrivalAirport: flight.arrivalAirport,
      departureCity: flight.departureCity,
      arrivalCity: flight.arrivalCity,
      departureTime: flight.departureTime.toISOString(),
      arrivalTime: flight.arrivalTime.toISOString(),
      duration: flight.duration,
      distance: flight.distance,
      aircraft: flight.aircraft,
      flightType: flight.flightType,
      cabinClass: flight.cabinClass,
      stops: flight.stops,
      stopAirports: flight.stopAirports,
      priceAdult: Number(flight.priceAdult),
      priceChild: Number(flight.priceChild),
      priceInfant: Number(flight.priceInfant),
      currency: flight.currency,
      carryOnBaggage: flight.carryOnBaggage,
      checkedBaggage: flight.checkedBaggage,
      availableSeats: flight.availableSeats,
      mealService: flight.mealService,
      wifiAvailable: flight.wifiAvailable,
      entertainmentSystem: flight.entertainmentSystem,
      isRefundable: flight.isRefundable,
    }));

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
    logger.error('Flight search API error:', error as Error, { component: 'Flights' });

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
  } finally {
    await prisma.$disconnect();
  }
}