/**
 * Search API Endpoint - Production-Grade
 *
 * Handles real-time search requests with filtering, sorting, and pagination.
 *
 * @version 2.0.0
 * @author Travel LyDian Elite Frontend Team
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { searchAll, getPopularSearches } from '@/lib/search-api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { q, limit, category, location } = req.query;

    // Validate query parameter
    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    // Parse limit
    const parsedLimit = limit ? parseInt(limit as string, 10) : 8;
    if (isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 50) {
      return res.status(400).json({ error: 'Invalid limit parameter' });
    }

    // Perform search
    const searchResults = await searchAll({
      query: q,
      limit: parsedLimit,
      category: category as string | undefined,
      location: location as string | undefined,
    });

    // Return results
    return res.status(200).json(searchResults);
  } catch (error) {
    console.error('Search API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
