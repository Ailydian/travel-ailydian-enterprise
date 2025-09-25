import { NextApiResponse } from 'next';
import { withAdminAuth, AuthenticatedRequest } from '../../../../lib/middleware/admin-auth';

interface DashboardStats {
  overview: {
    totalLocations: number;
    totalReviews: number;
    totalUsers: number;
    totalPhotos: number;
    averageRating: number;
    monthlyGrowth: {
      locations: number;
      reviews: number;
      users: number;
    };
  };
  recentActivity: {
    type: 'review' | 'user' | 'location' | 'photo';
    description: string;
    timestamp: string;
    user?: string;
    location?: string;
  }[];
  topLocations: {
    id: number;
    name: string;
    rating: number;
    reviews: number;
    views: number;
  }[];
  platformStats: {
    googleSynced: number;
    tripAdvisorSynced: number;
    lastSync: string;
    syncErrors: number;
  };
  moderationQueue: {
    pendingReviews: number;
    flaggedContent: number;
    reportedUsers: number;
  };
  analytics: {
    dailyStats: {
      date: string;
      locations: number;
      reviews: number;
      users: number;
      views: number;
    }[];
  };
}

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Mock data - in production, this would come from database queries
    const stats: DashboardStats = {
      overview: {
        totalLocations: 1247,
        totalReviews: 8934,
        totalUsers: 3456,
        totalPhotos: 12789,
        averageRating: 4.3,
        monthlyGrowth: {
          locations: 12.5,
          reviews: 23.8,
          users: 18.2
        }
      },
      recentActivity: [
        {
          type: 'review',
          description: 'New review submitted for "Blue Mosque"',
          timestamp: '2024-01-15T14:30:00Z',
          user: 'john.doe@example.com',
          location: 'Blue Mosque'
        },
        {
          type: 'user',
          description: 'New user registered',
          timestamp: '2024-01-15T14:25:00Z',
          user: 'jane.smith@example.com'
        },
        {
          type: 'location',
          description: 'Location "Hagia Sophia" was updated',
          timestamp: '2024-01-15T14:20:00Z',
          location: 'Hagia Sophia'
        },
        {
          type: 'photo',
          description: '5 new photos uploaded for "Galata Tower"',
          timestamp: '2024-01-15T14:15:00Z',
          location: 'Galata Tower'
        }
      ],
      topLocations: [
        {
          id: 1,
          name: 'Hagia Sophia',
          rating: 4.8,
          reviews: 2847,
          views: 45632
        },
        {
          id: 2,
          name: 'Blue Mosque',
          rating: 4.7,
          reviews: 2234,
          views: 38294
        },
        {
          id: 3,
          name: 'Galata Tower',
          rating: 4.6,
          reviews: 1876,
          views: 32481
        },
        {
          id: 4,
          name: 'Grand Bazaar',
          rating: 4.5,
          reviews: 1654,
          views: 29387
        },
        {
          id: 5,
          name: 'Topkapi Palace',
          rating: 4.7,
          reviews: 1432,
          views: 26754
        }
      ],
      platformStats: {
        googleSynced: 892,
        tripAdvisorSynced: 634,
        lastSync: '2024-01-15T12:00:00Z',
        syncErrors: 3
      },
      moderationQueue: {
        pendingReviews: 23,
        flaggedContent: 7,
        reportedUsers: 2
      },
      analytics: {
        dailyStats: Array.from({ length: 30 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (29 - i));
          return {
            date: date.toISOString().split('T')[0],
            locations: Math.floor(Math.random() * 10) + 5,
            reviews: Math.floor(Math.random() * 50) + 20,
            users: Math.floor(Math.random() * 20) + 10,
            views: Math.floor(Math.random() * 1000) + 500
          };
        })
      }
    };

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard statistics'
    });
  }
}

export default withAdminAuth(handler, ['dashboard:read', 'analytics:read']);