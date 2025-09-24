import type { NextApiRequest, NextApiResponse } from 'next';
import advancedSearchEngine, { AdvancedSearchFilters, PersonalizationData } from '../../../lib/search/advanced-search';

interface AdvancedSearchRequest {
  filters: AdvancedSearchFilters;
  personalization?: PersonalizationData;
  page?: number;
  limit?: number;
}

interface SmartRecommendationsRequest {
  personalization: PersonalizationData;
  currentLocation?: { lat: number; lng: number };
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night';
}

interface SimilarLocationsRequest {
  locationId: number;
  limit?: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { action, ...data } = req.body;

    switch (action) {
      case 'search': {
        const { filters, personalization, page = 1, limit = 20 } = data as AdvancedSearchRequest;
        
        const results = await advancedSearchEngine.advancedSearch(
          filters,
          personalization,
          page,
          limit
        );

        return res.status(200).json({
          success: true,
          data: results
        });
      }

      case 'smart_recommendations': {
        const { personalization, currentLocation, timeOfDay } = data as SmartRecommendationsRequest;
        
        const recommendations = await advancedSearchEngine.getSmartRecommendations(
          personalization,
          currentLocation,
          timeOfDay
        );

        return res.status(200).json({
          success: true,
          data: { recommendations }
        });
      }

      case 'similar_locations': {
        const { locationId, limit = 5 } = data as SimilarLocationsRequest;
        
        const similarLocations = await advancedSearchEngine.getSimilarLocations(
          locationId,
          limit
        );

        return res.status(200).json({
          success: true,
          data: { similar_locations: similarLocations }
        });
      }

      case 'trending_data': {
        const trendingData = await advancedSearchEngine.getTrendingData();

        return res.status(200).json({
          success: true,
          data: { trending: trendingData }
        });
      }

      case 'search_analytics': {
        const analytics = advancedSearchEngine.getSearchAnalytics();

        return res.status(200).json({
          success: true,
          data: { analytics }
        });
      }

      default:
        return res.status(400).json({ 
          error: 'Invalid action. Supported actions: search, smart_recommendations, similar_locations, trending_data, search_analytics' 
        });
    }
  } catch (error) {
    console.error('Advanced search API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Export types for use in client-side code
export type { AdvancedSearchRequest, SmartRecommendationsRequest, SimilarLocationsRequest };