import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import logger from '../../../../../lib/logger';

const prisma = new PrismaClient();

/**
 * PUBLIC SINGLE RENTAL PROPERTY API
 * Get property details by slug
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Property slug is required',
    });
  }

  try {
    if (req.method === 'GET') {
      const property = await prisma.rentalProperty.findUnique({
        where: { slug },
        include: {
          _count: {
            select: { bookings: true },
          },
        },
      });

      if (!property || !property.isActive) {
        return res.status(404).json({
          success: false,
          error: 'Property not found',
        });
      }

      // Get similar properties in same city or type
      const similarProperties = await prisma.rentalProperty.findMany({
        where: {
          isActive: true,
          id: { not: property.id },
          OR: [
            { city: property.city },
            { type: property.type },
          ],
        },
        take: 6,
        orderBy: { overall: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          type: true,
          city: true,
          district: true,
          guests: true,
          bedrooms: true,
          bathrooms: true,
          basePrice: true,
          currency: true,
          mainImage: true,
          overall: true,
          reviewCount: true,
          instantBook: true,
          hostSuperhost: true,
          pool: true,
          beachfront: true,
          seaview: true,
        },
      });

      // Get nearby properties (same city & district)
      const nearbyProperties = await prisma.rentalProperty.findMany({
        where: {
          isActive: true,
          id: { not: property.id },
          city: property.city,
          district: property.district,
        },
        take: 4,
        orderBy: { overall: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          basePrice: true,
          currency: true,
          mainImage: true,
          overall: true,
          reviewCount: true,
          guests: true,
          bedrooms: true,
        },
      });

      // Calculate occupancy rate (approximate)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const recentBookings = await prisma.rentalPropertyBooking.count({
        where: {
          propertyId: property.id,
          checkIn: {
            gte: thirtyDaysAgo,
          },
        },
      });

      // Calculate availability calendar for next 90 days
      const today = new Date();
      const ninetyDaysLater = new Date();
      ninetyDaysLater.setDate(ninetyDaysLater.getDate() + 90);

      const upcomingBookings = await prisma.rentalPropertyBooking.findMany({
        where: {
          propertyId: property.id,
          checkIn: {
            gte: today,
            lte: ninetyDaysLater,
          },
          status: {
            in: ['CONFIRMED', 'PENDING'],
          },
        },
        select: {
          checkIn: true,
          checkOut: true,
          status: true,
        },
      });

      return res.status(200).json({
        success: true,
        data: property,
        similar: similarProperties,
        nearby: nearbyProperties,
        availability: {
          upcomingBookings,
          recentBookingsCount: recentBookings,
          occupancyRate: recentBookings > 0 ? Math.min((recentBookings / 30) * 100, 100) : 0,
        },
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    logger.error('Rental Property Detail API Error:', error as Error, {component:'Slug'});
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  } finally {
    await prisma.$disconnect();
  }
}
