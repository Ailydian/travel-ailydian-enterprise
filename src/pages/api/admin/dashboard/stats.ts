import { NextApiResponse } from 'next';
import { withAdminAuth, AuthenticatedRequest } from '../../../../lib/middleware/admin-auth';
import { prisma } from '@/lib/prisma'; //  from '@prisma/client';
import logger from '../../../../lib/logger';

// Using singleton prisma;

interface DashboardStats {
  overview: {
    totalLocations: number;
    totalReviews: number;
    totalUsers: number;
    totalBookings: number;
    totalRevenue: number;
    averageRating: number;
    monthlyGrowth: {
      bookings: number;
      revenue: number;
      users: number;
    };
  };
  productCounts: {
    hotels: number;
    tours: number;
    transfers: number;
    carRentals: number;
    rentalProperties: number;
  };
  recentActivity: {
    type: 'booking' | 'user' | 'review' | 'hotel' | 'tour';
    description: string;
    timestamp: string;
    user?: string;
    entity?: string;
  }[];
  topPerformers: {
    hotels: { id: string; name: string; rating: number; bookings: number }[];
    tours: { id: string; title: string; rating: number; bookings: number }[];
  };
  bookingStats: {
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  };
  revenueByCategory: {
    hotels: number;
    tours: number;
    transfers: number;
    carRentals: number;
    rentalProperties: number;
  };
  analytics: {
    dailyStats: {
      date: string;
      bookings: number;
      revenue: number;
      users: number;
    }[];
  };
}

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Calculate date ranges
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1);

    // Parallel database queries for performance
    const [
      totalUsers,
      totalReviews,
      totalHotels,
      totalTours,
      totalTransfers,
      totalCarRentals,
      totalRentalProperties,
      totalBookings,
      hotelBookings,
      tourBookings,
      transferBookings,
      carRentalBookings,
      propertyBookings,
      bookingsByStatus,
      recentBookings,
      recentUsers,
      recentReviews,
      topHotels,
      topTours,
      lastMonthBookings,
      twoMonthsAgoBookings,
      lastMonthUsers,
      twoMonthsAgoUsers,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.review.count(),
      prisma.hotel.count(),
      prisma.tour.count(),
      prisma.transfer.count(),
      prisma.carRental.count(),
      prisma.rentalProperty.count(),
      prisma.booking.count(),
      prisma.booking.findMany({ select: { totalPrice: true, paymentStatus: true } }),
      prisma.tourBooking.findMany({ select: { totalPrice: true, paymentStatus: true } }),
      prisma.transferBooking.findMany({ select: { totalPrice: true, paymentStatus: true } }),
      prisma.carRentalBooking.findMany({ select: { totalPrice: true, paymentStatus: true } }),
      prisma.rentalPropertyBooking.findMany({ select: { totalPrice: true, paymentStatus: true } }),
      prisma.booking.groupBy({
        by: ['status'],
        _count: { status: true }
      }),
      prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { hotel: { select: { name: true } }, user: { select: { name: true, email: true } } }
      }),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { name: true, email: true, createdAt: true }
      }),
      prisma.review.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { hotel: { select: { name: true } }, user: { select: { name: true } } }
      }),
      prisma.hotel.findMany({
        take: 5,
        orderBy: { averageRating: 'desc' },
        where: { isActive: true },
        select: { id: true, name: true, averageRating: true, totalReviews: true, _count: { select: { bookings: true } } }
      }),
      prisma.tour.findMany({
        take: 5,
        orderBy: { rating: 'desc' },
        where: { isActive: true },
        select: { id: true, title: true, rating: true, reviewCount: true, _count: { select: { bookings: true } } }
      }),
      prisma.booking.count({ where: { createdAt: { gte: lastMonthStart, lte: lastMonthEnd } } }),
      prisma.booking.count({ where: { createdAt: { gte: twoMonthsAgo, lt: lastMonthStart } } }),
      prisma.user.count({ where: { createdAt: { gte: lastMonthStart, lte: lastMonthEnd } } }),
      prisma.user.count({ where: { createdAt: { gte: twoMonthsAgo, lt: lastMonthStart } } }),
    ]);

    // Calculate total revenue
    interface BookingWithPrice {
      totalPrice: number | string | null;
      paymentStatus: string;
    }
    const calculateRevenue = (bookings: BookingWithPrice[]) => {
      return bookings
        .filter(b => b.paymentStatus === 'PAID' || b.paymentStatus === 'COMPLETED')
        .reduce((sum, b) => sum + Number(b.totalPrice || 0), 0);
    };

    const hotelRevenue = calculateRevenue(hotelBookings);
    const tourRevenue = calculateRevenue(tourBookings);
    const transferRevenue = calculateRevenue(transferBookings);
    const carRentalRevenue = calculateRevenue(carRentalBookings);
    const propertyRevenue = calculateRevenue(propertyBookings);
    const totalRevenue = hotelRevenue + tourRevenue + transferRevenue + carRentalRevenue + propertyRevenue;

    // Calculate average rating
    const allRatings = await prisma.review.aggregate({
      _avg: { rating: true }
    });
    const averageRating = Number(allRatings._avg.rating || 0);

    // Calculate monthly growth
    const bookingGrowth = twoMonthsAgoBookings > 0
      ? ((lastMonthBookings - twoMonthsAgoBookings) / twoMonthsAgoBookings) * 100
      : 0;
    const userGrowth = twoMonthsAgoUsers > 0
      ? ((lastMonthUsers - twoMonthsAgoUsers) / twoMonthsAgoUsers) * 100
      : 0;

    // Get last 30 days revenue by day
    const last30DaysRevenue = await prisma.booking.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: { gte: thirtyDaysAgo },
        paymentStatus: { in: ['PAID', 'COMPLETED'] }
      },
      _sum: { totalPrice: true },
      _count: { id: true }
    });

    const dailyStatsMap = new Map();
    for (let i = 0; i < 30; i++) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      dailyStatsMap.set(dateStr, { bookings: 0, revenue: 0, users: 0 });
    }

    last30DaysRevenue.forEach(item => {
      const dateStr = new Date(item.createdAt).toISOString().split('T')[0];
      if (dailyStatsMap.has(dateStr)) {
        const existing = dailyStatsMap.get(dateStr);
        existing.bookings += item._count.id;
        existing.revenue += Number(item._sum.totalPrice || 0);
      }
    });

    // Get daily user signups
    const dailyUsers = await prisma.user.groupBy({
      by: ['createdAt'],
      where: { createdAt: { gte: thirtyDaysAgo } },
      _count: { id: true }
    });

    dailyUsers.forEach(item => {
      const dateStr = new Date(item.createdAt).toISOString().split('T')[0];
      if (dailyStatsMap.has(dateStr)) {
        dailyStatsMap.get(dateStr).users = item._count.id;
      }
    });

    // Format booking status counts
    const bookingStatusMap = {
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0
    };
    bookingsByStatus.forEach(item => {
      const status = item.status.toLowerCase();
      if (status in bookingStatusMap) {
        bookingStatusMap[status as keyof typeof bookingStatusMap] = item._count.status;
      }
    });

    // Build recent activity feed
    const recentActivity: DashboardStats['recentActivity'] = [];

    recentBookings.forEach(booking => {
      recentActivity.push({
        type: 'booking',
        description: `New booking for "${booking.hotel.name}"`,
        timestamp: booking.createdAt.toISOString(),
        user: booking.user.email,
        entity: booking.hotel.name
      });
    });

    recentUsers.forEach(user => {
      recentActivity.push({
        type: 'user',
        description: 'New user registered',
        timestamp: user.createdAt.toISOString(),
        user: user.email
      });
    });

    recentReviews.forEach(review => {
      recentActivity.push({
        type: 'review',
        description: `New review for "${review.hotel.name}"`,
        timestamp: review.createdAt.toISOString(),
        user: review.user.name || 'Anonymous',
        entity: review.hotel.name
      });
    });

    // Sort by timestamp descending and take top 10
    recentActivity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    const topActivity = recentActivity.slice(0, 10);

    // Build the stats response
    const stats: DashboardStats = {
      overview: {
        totalLocations: totalHotels + totalTours + totalTransfers + totalCarRentals + totalRentalProperties,
        totalReviews,
        totalUsers,
        totalBookings,
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        averageRating: Math.round(averageRating * 10) / 10,
        monthlyGrowth: {
          bookings: Math.round(bookingGrowth * 10) / 10,
          revenue: Math.round(bookingGrowth * 10) / 10, // Using same as bookings for now
          users: Math.round(userGrowth * 10) / 10
        }
      },
      productCounts: {
        hotels: totalHotels,
        tours: totalTours,
        transfers: totalTransfers,
        carRentals: totalCarRentals,
        rentalProperties: totalRentalProperties
      },
      recentActivity: topActivity,
      topPerformers: {
        hotels: topHotels.map(h => ({
          id: h.id,
          name: h.name,
          rating: Number(h.averageRating || 0),
          bookings: h._count.bookings
        })),
        tours: topTours.map(t => ({
          id: t.id,
          title: t.title,
          rating: Number(t.rating || 0),
          bookings: t._count.bookings
        }))
      },
      bookingStats: bookingStatusMap,
      revenueByCategory: {
        hotels: Math.round(hotelRevenue * 100) / 100,
        tours: Math.round(tourRevenue * 100) / 100,
        transfers: Math.round(transferRevenue * 100) / 100,
        carRentals: Math.round(carRentalRevenue * 100) / 100,
        rentalProperties: Math.round(propertyRevenue * 100) / 100
      },
      analytics: {
        dailyStats: Array.from(dailyStatsMap.entries())
          .map(([date, data]) => ({ date, ...data }))
          .sort((a, b) => a.date.localeCompare(b.date))
      }
    };

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    logger.error('Dashboard stats error:', error as Error, {component:'Stats'});
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard statistics',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  } finally {
  }
}

export default withAdminAuth(handler, ['dashboard:read', 'analytics:read']);