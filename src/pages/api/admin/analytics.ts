import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import logger from '../../../../../lib/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const { range = '30d' } = req.query;

      // Calculate date range
      const now = new Date();
      let startDate = new Date();

      switch (range) {
        case '7d':
          startDate.setDate(now.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(now.getDate() - 30);
          break;
        case '90d':
          startDate.setDate(now.getDate() - 90);
          break;
        case '1y':
          startDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      // Fetch real analytics data from database
      const [totalBookings, hotels, tours, transfers] = await Promise.all([
        prisma.booking.count({
          where: {
            createdAt: {
              gte: startDate,
            },
          },
        }),
        prisma.hotel.count({ where: { isActive: true } }),
        prisma.tourPackage.count({ where: { isActive: true } }),
        prisma.airportTransfer.count({ where: { isActive: true } }),
      ]);

      // Mock detailed analytics (in production, calculate from real data)
      const analyticsData = {
        revenue: {
          total: 1250000,
          growth: 23.5,
          byCategory: {
            hotels: 650000,
            tours: 320000,
            flights: 180000,
            transfers: 100000,
          },
        },
        bookings: {
          total: totalBookings,
          growth: 18.2,
          byStatus: {
            confirmed: Math.floor(totalBookings * 0.82),
            pending: Math.floor(totalBookings * 0.13),
            cancelled: Math.floor(totalBookings * 0.05),
          },
        },
        customers: {
          total: await prisma.user.count(),
          new: await prisma.user.count({
            where: {
              createdAt: {
                gte: startDate,
              },
            },
          }),
          returning: 0,
        },
        products: {
          hotels,
          tours,
          transfers,
          flights: 0,
        },
        topProducts: [
          { name: 'Antalya Luxury Resort', bookings: 234, revenue: 156000 },
          { name: 'İstanbul City Tour', bookings: 189, revenue: 98000 },
          { name: 'Kapadokya Balloon', bookings: 167, revenue: 87000 },
        ],
      };

      return res.status(200).json({
        success: true,
        data: analyticsData,
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    logger.error('Analytics API Error:', error as Error, {component:'Analytics'});
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
