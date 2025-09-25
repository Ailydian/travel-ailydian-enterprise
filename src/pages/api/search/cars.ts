import type { NextApiRequest, NextApiResponse } from 'next';
import { amadeusService, transformCarRentalData } from '@/lib/amadeus-service';

interface CarRentalSearchRequest {
  pickUpLocationCode: string;
  dropOffLocationCode?: string;
  pickUpDate: string;
  dropOffDate: string;
  pickUpTime?: string;
  dropOffTime?: string;
  currency?: string;
  vehicleCategory?: string[];
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
    const searchParams: CarRentalSearchRequest = req.body;

    // Validate required parameters
    if (!searchParams.pickUpLocationCode || !searchParams.pickUpDate || !searchParams.dropOffDate) {
      return res.status(400).json({
        error: 'Missing required parameters',
        message: 'pickUpLocationCode, pickUpDate, and dropOffDate are required',
        required: ['pickUpLocationCode', 'pickUpDate', 'dropOffDate']
      });
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(searchParams.pickUpDate) || !dateRegex.test(searchParams.dropOffDate)) {
      return res.status(400).json({
        error: 'Invalid date format',
        message: 'Dates must be in YYYY-MM-DD format'
      });
    }

    // Validate that pick-up is before drop-off
    const pickUpDate = new Date(searchParams.pickUpDate);
    const dropOffDate = new Date(searchParams.dropOffDate);
    
    if (pickUpDate >= dropOffDate) {
      return res.status(400).json({
        error: 'Invalid date range',
        message: 'Pick-up date must be before drop-off date'
      });
    }

    // Validate that pick-up is not in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (pickUpDate < today) {
      return res.status(400).json({
        error: 'Invalid pick-up date',
        message: 'Pick-up date cannot be in the past'
      });
    }

    // Validate time format if provided (HH:MM)
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (searchParams.pickUpTime && !timeRegex.test(searchParams.pickUpTime)) {
      return res.status(400).json({
        error: 'Invalid time format',
        message: 'Time must be in HH:MM format'
      });
    }

    if (searchParams.dropOffTime && !timeRegex.test(searchParams.dropOffTime)) {
      return res.status(400).json({
        error: 'Invalid time format',
        message: 'Time must be in HH:MM format'
      });
    }

    // Set default values
    const searchRequest = {
      pickUpLocationCode: searchParams.pickUpLocationCode.toUpperCase(),
      dropOffLocationCode: (searchParams.dropOffLocationCode || searchParams.pickUpLocationCode).toUpperCase(),
      pickUpDate: searchParams.pickUpDate,
      dropOffDate: searchParams.dropOffDate,
      pickUpTime: searchParams.pickUpTime || '10:00',
      dropOffTime: searchParams.dropOffTime || '10:00',
    };

    console.log('Car rental search request:', searchRequest);

    // Search car rentals using Amadeus service
    const response = await amadeusService.searchCarRentals(searchRequest);

    // Transform results
    const transformedCars = response.data
      .map(transformCarRentalData)
      .filter((car: any) => car !== null);

    // Apply additional filters if specified
    let filteredCars = transformedCars;

    // Filter by vehicle category if specified
    if (searchParams.vehicleCategory && searchParams.vehicleCategory.length > 0) {
      filteredCars = filteredCars.filter((car: any) => 
        searchParams.vehicleCategory!.some(category => 
          car.category.toLowerCase().includes(category.toLowerCase())
        )
      );
    }

    // Sort by price (lowest first)
    filteredCars.sort((a: any, b: any) => a.price - b.price);

    // Calculate rental duration in days
    const rentalDays = Math.ceil((dropOffDate.getTime() - pickUpDate.getTime()) / (1000 * 60 * 60 * 24));

    // Group cars by company for better UX
    const carsByCompany = filteredCars.reduce((acc: Record<string, any[]>, car: any) => {
      const company = car.company;
      if (!acc[company]) {
        acc[company] = [];
      }
      acc[company].push(car);
      return acc;
    }, {} as Record<string, any[]>);

    // Return successful response
    return res.status(200).json({
      success: true,
      data: {
        cars: filteredCars,
        carsByCompany,
        searchParams: searchRequest,
        totalResults: filteredCars.length,
        rentalDays,
        location: searchRequest.pickUpLocationCode,
        searchId: `car_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      },
      meta: {
        requestTime: new Date().toISOString(),
        source: 'amadeus',
        cached: false,
        filters: {
          vehicleCategory: searchParams.vehicleCategory
        },
        companies: Object.keys(carsByCompany),
        averagePrice: filteredCars.length > 0 
          ? Math.round(filteredCars.reduce((sum: number, car: any) => sum + car.price, 0) / filteredCars.length)
          : 0
      }
    });

  } catch (error) {
    console.error('Car rental search API error:', error);

    // Return error response
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    return res.status(500).json({
      success: false,
      error: 'Car rental search failed',
      message: errorMessage,
      details: process.env.NODE_ENV === 'development' ? {
        stack: error instanceof Error ? error.stack : 'No stack trace available'
      } : undefined
    });
  }
}