import type { NextApiRequest, NextApiResponse } from 'next';
import { restaurantService, type RestaurantSearchParams } from '@/lib/restaurant-service';
import logger from '../../../../../lib/logger';

interface RestaurantSearchRequest extends RestaurantSearchParams {
  sortBy?: 'rating' | 'distance' | 'price' | 'reviews';
  filterOpenNow?: boolean;
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
    const searchParams: RestaurantSearchRequest = req.body;

    // Validate required parameters
    if (!searchParams.location) {
      return res.status(400).json({
        error: 'Missing required parameters',
        message: 'location is required',
        required: ['location']
      });
    }

    // Validate optional numeric parameters
    if (searchParams.radius && (searchParams.radius < 100 || searchParams.radius > 50000)) {
      return res.status(400).json({
        error: 'Invalid radius',
        message: 'Radius must be between 100 and 50000 meters'
      });
    }

    if (searchParams.priceLevel && (searchParams.priceLevel < 1 || searchParams.priceLevel > 4)) {
      return res.status(400).json({
        error: 'Invalid price level',
        message: 'Price level must be between 1 (most affordable) and 4 (most expensive)'
      });
    }

    if (searchParams.rating && (searchParams.rating < 1 || searchParams.rating > 5)) {
      return res.status(400).json({
        error: 'Invalid rating',
        message: 'Rating must be between 1 and 5'
      });
    }

    if (searchParams.limit && (searchParams.limit < 1 || searchParams.limit > 50)) {
      return res.status(400).json({
        error: 'Invalid limit',
        message: 'Limit must be between 1 and 50'
      });
    }

    // Set default values and sanitize inputs
    const searchRequest: RestaurantSearchParams = {
      location: searchParams.location.trim(),
      radius: searchParams.radius || 5000,
      cuisine: searchParams.cuisine?.trim() || undefined,
      priceLevel: searchParams.priceLevel || undefined,
      openNow: searchParams.openNow !== undefined ? Boolean(searchParams.openNow) : undefined,
      rating: searchParams.rating || undefined,
      limit: Math.min(50, Math.max(1, searchParams.limit || 20))
    };

    logger.debug('Restaurant search request:', { component: 'Restaurants', metadata: { searchRequest } });

    // Search restaurants using restaurant service
    const restaurants = await restaurantService.searchRestaurants(searchRequest);

    // Apply additional filtering if specified
    let filteredRestaurants = restaurants;

    // Filter open restaurants if specified
    if (searchParams.filterOpenNow === true) {
      filteredRestaurants = filteredRestaurants.filter(restaurant => restaurant.openNow);
    }

    // Apply sorting
    const sortBy = searchParams.sortBy || 'rating';
    filteredRestaurants.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          if (a.rating !== b.rating) {
            return b.rating - a.rating; // Higher rating first
          }
          return b.reviewCount - a.reviewCount; // More reviews as tiebreaker
        
        case 'price':
          if (a.priceLevel !== b.priceLevel) {
            return a.priceLevel - b.priceLevel; // Lower price first
          }
          return b.rating - a.rating; // Higher rating as tiebreaker
        
        case 'reviews':
          if (a.reviewCount !== b.reviewCount) {
            return b.reviewCount - a.reviewCount; // More reviews first
          }
          return b.rating - a.rating; // Higher rating as tiebreaker
        
        case 'distance':
          // For distance sorting, we would need coordinates
          // For now, fallback to rating
          return b.rating - a.rating;
        
        default:
          return b.rating - a.rating;
      }
    });

    // Group restaurants by cuisine for better UX
    const restaurantsByCuisine = filteredRestaurants.reduce((acc, restaurant) => {
      restaurant.cuisine.forEach(cuisine => {
        if (!acc[cuisine]) {
          acc[cuisine] = [];
        }
        acc[cuisine].push(restaurant);
      });
      return acc;
    }, {} as Record<string, any[]>);

    // Calculate statistics
    const stats = {
      totalResults: filteredRestaurants.length,
      averageRating: filteredRestaurants.length > 0 
        ? Number((filteredRestaurants.reduce((sum, r) => sum + r.rating, 0) / filteredRestaurants.length).toFixed(1))
        : 0,
      averagePriceLevel: filteredRestaurants.length > 0 
        ? Math.round(filteredRestaurants.reduce((sum, r) => sum + r.priceLevel, 0) / filteredRestaurants.length)
        : 0,
      openNowCount: filteredRestaurants.filter(r => r.openNow).length,
      cuisineCount: Object.keys(restaurantsByCuisine).length,
      priceDistribution: {
        budget: filteredRestaurants.filter(r => r.priceLevel === 1).length,
        moderate: filteredRestaurants.filter(r => r.priceLevel === 2).length,
        expensive: filteredRestaurants.filter(r => r.priceLevel === 3).length,
        veryExpensive: filteredRestaurants.filter(r => r.priceLevel === 4).length
      }
    };

    // Return successful response
    return res.status(200).json({
      success: true,
      data: {
        restaurants: filteredRestaurants,
        restaurantsByCuisine,
        searchParams: searchRequest,
        stats,
        location: searchRequest.location,
        searchId: `restaurant_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      },
      meta: {
        requestTime: new Date().toISOString(),
        source: 'google_places_foursquare',
        cached: false,
        filters: {
          sortBy: sortBy,
          openNowOnly: searchParams.filterOpenNow,
          cuisine: searchParams.cuisine,
          priceLevel: searchParams.priceLevel,
          minRating: searchParams.rating
        },
        availableCuisines: Object.keys(restaurantsByCuisine)
      }
    });

  } catch (error) {
    logger.error('Restaurant search API error:', error as Error, { component: 'Restaurants' });

    // Return error response
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    return res.status(500).json({
      success: false,
      error: 'Restaurant search failed',
      message: errorMessage,
      details: process.env.NODE_ENV === 'development' ? {
        stack: error instanceof Error ? error.stack : 'No stack trace available'
      } : undefined
    });
  }
}