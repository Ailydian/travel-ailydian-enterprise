import { NextApiResponse } from 'next';
import { withAdminAuth, AuthenticatedRequest } from '../../../../lib/middleware/admin-auth';
import logger from '../../../../../../lib/logger';

interface AdminLocation {
  id: number;
  name: string;
  slug: string;
  category: string;
  city: string;
  country: string;
  status: 'active' | 'inactive' | 'pending' | 'blocked';
  verified: boolean;
  claimed: boolean;
  totalReviews: number;
  averageRating: number;
  totalPhotos: number;
  totalViews: number;
  googlePlaceId?: string;
  tripAdvisorId?: string;
  lastSyncGoogle?: string;
  lastSyncTripAdvisor?: string;
  createdAt: string;
  updatedAt: string;
}

interface LocationFilters {
  search?: string;
  status?: string;
  category?: string;
  city?: string;
  country?: string;
  verified?: boolean;
  claimed?: boolean;
  hasGoogleId?: boolean;
  hasTripAdvisorId?: boolean;
  minRating?: number;
  maxRating?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Mock locations data
const mockLocations: AdminLocation[] = [
  {
    id: 1,
    name: 'Hagia Sophia',
    slug: 'hagia-sophia-istanbul',
    category: 'Historical Sites',
    city: 'Istanbul',
    country: 'Turkey',
    status: 'active',
    verified: true,
    claimed: true,
    totalReviews: 2847,
    averageRating: 4.8,
    totalPhotos: 1245,
    totalViews: 45632,
    googlePlaceId: 'ChIJd7zBgY5JyUARbAuzBKVH5Lk',
    tripAdvisorId: '293974',
    lastSyncGoogle: '2024-01-15T12:00:00Z',
    lastSyncTripAdvisor: '2024-01-15T11:30:00Z',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-15T12:00:00Z'
  },
  {
    id: 2,
    name: 'Blue Mosque',
    slug: 'blue-mosque-istanbul',
    category: 'Religious Sites',
    city: 'Istanbul',
    country: 'Turkey',
    status: 'active',
    verified: true,
    claimed: false,
    totalReviews: 2234,
    averageRating: 4.7,
    totalPhotos: 987,
    totalViews: 38294,
    googlePlaceId: 'ChIJVVVVVVVVVVVVVVVVVVVVVVV',
    tripAdvisorId: '293975',
    lastSyncGoogle: '2024-01-15T11:45:00Z',
    lastSyncTripAdvisor: '2024-01-15T11:15:00Z',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-15T11:45:00Z'
  },
  {
    id: 3,
    name: 'Galata Tower',
    slug: 'galata-tower-istanbul',
    category: 'Landmarks',
    city: 'Istanbul',
    country: 'Turkey',
    status: 'active',
    verified: false,
    claimed: false,
    totalReviews: 1876,
    averageRating: 4.6,
    totalPhotos: 756,
    totalViews: 32481,
    googlePlaceId: 'ChIJXXXXXXXXXXXXXXXXXXXXXXX',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        return handleGetLocations(req, res);
      case 'POST':
        return handleCreateLocation(req, res);
      case 'PUT':
        return handleBulkUpdate(req, res);
      case 'DELETE':
        return handleBulkDelete(req, res);
      default:
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }
  } catch (error) {
    logger.error('Admin locations API error:', error as Error, {component:'Index'});
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

async function handleGetLocations(req: AuthenticatedRequest, res: NextApiResponse) {
  const filters: LocationFilters = {
    search: req.query.search as string,
    status: req.query.status as string,
    category: req.query.category as string,
    city: req.query.city as string,
    country: req.query.country as string,
    verified: req.query.verified === 'true',
    claimed: req.query.claimed === 'true',
    hasGoogleId: req.query.hasGoogleId === 'true',
    hasTripAdvisorId: req.query.hasTripAdvisorId === 'true',
    minRating: req.query.minRating ? parseFloat(req.query.minRating as string) : undefined,
    maxRating: req.query.maxRating ? parseFloat(req.query.maxRating as string) : undefined,
    page: parseInt(req.query.page as string) || 1,
    limit: parseInt(req.query.limit as string) || 20,
    sortBy: req.query.sortBy as string || 'updatedAt',
    sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc'
  };

  // Apply filters (in production, this would be done in database query)
  let filteredLocations = [...mockLocations];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredLocations = filteredLocations.filter(loc => 
      loc.name.toLowerCase().includes(searchLower) ||
      loc.city.toLowerCase().includes(searchLower) ||
      loc.country.toLowerCase().includes(searchLower)
    );
  }

  if (filters.status) {
    filteredLocations = filteredLocations.filter(loc => loc.status === filters.status);
  }

  if (filters.category) {
    filteredLocations = filteredLocations.filter(loc => loc.category === filters.category);
  }

  if (filters.verified !== undefined) {
    filteredLocations = filteredLocations.filter(loc => loc.verified === filters.verified);
  }

  if (filters.claimed !== undefined) {
    filteredLocations = filteredLocations.filter(loc => loc.claimed === filters.claimed);
  }

  if (filters.hasGoogleId) {
    filteredLocations = filteredLocations.filter(loc => !!loc.googlePlaceId);
  }

  if (filters.hasTripAdvisorId) {
    filteredLocations = filteredLocations.filter(loc => !!loc.tripAdvisorId);
  }

  if (filters.minRating !== undefined) {
    filteredLocations = filteredLocations.filter(loc => loc.averageRating >= filters.minRating!);
  }

  if (filters.maxRating !== undefined) {
    filteredLocations = filteredLocations.filter(loc => loc.averageRating <= filters.maxRating!);
  }

  // Sort
  filteredLocations.sort((a, b) => {
    const aVal = (a as any)[filters.sortBy!];
    const bVal = (b as any)[filters.sortBy!];
    
    if (filters.sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  // Pagination
  const total = filteredLocations.length;
  const startIndex = (filters.page! - 1) * filters.limit!;
  const endIndex = startIndex + filters.limit!;
  const paginatedLocations = filteredLocations.slice(startIndex, endIndex);

  res.status(200).json({
    success: true,
    data: {
      locations: paginatedLocations,
      pagination: {
        page: filters.page,
        limit: filters.limit,
        total,
        pages: Math.ceil(total / filters.limit!)
      }
    }
  });
}

async function handleCreateLocation(req: AuthenticatedRequest, res: NextApiResponse) {
  const locationData = req.body;

  // Basic validation
  if (!locationData.name || !locationData.city || !locationData.country) {
    return res.status(400).json({
      success: false,
      error: 'Name, city, and country are required'
    });
  }

  // Create new location (mock)
  const newLocation: AdminLocation = {
    id: Date.now(), // Mock ID generation
    name: locationData.name,
    slug: locationData.name.toLowerCase().replace(/\s+/g, '-'),
    category: locationData.category || 'Other',
    city: locationData.city,
    country: locationData.country,
    status: 'pending',
    verified: false,
    claimed: false,
    totalReviews: 0,
    averageRating: 0,
    totalPhotos: 0,
    totalViews: 0,
    googlePlaceId: locationData.googlePlaceId,
    tripAdvisorId: locationData.tripAdvisorId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // Add to mock data
  mockLocations.push(newLocation);

  res.status(201).json({
    success: true,
    data: newLocation
  });
}

async function handleBulkUpdate(req: AuthenticatedRequest, res: NextApiResponse) {
  const { locationIds, updateData } = req.body;

  if (!locationIds || !Array.isArray(locationIds) || locationIds.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Location IDs are required'
    });
  }

  // Update locations (mock)
  const updatedCount = locationIds.length;
  
  res.status(200).json({
    success: true,
    data: {
      updatedCount,
      message: `${updatedCount} locations updated successfully`
    }
  });
}

async function handleBulkDelete(req: AuthenticatedRequest, res: NextApiResponse) {
  const { locationIds } = req.body;

  if (!locationIds || !Array.isArray(locationIds) || locationIds.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Location IDs are required'
    });
  }

  // Delete locations (mock)
  const deletedCount = locationIds.length;
  
  res.status(200).json({
    success: true,
    data: {
      deletedCount,
      message: `${deletedCount} locations deleted successfully`
    }
  });
}

export default withAdminAuth(handler, ['locations:read', 'locations:write']);