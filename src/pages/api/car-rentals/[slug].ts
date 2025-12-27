import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import logger from '../../../lib/logger';

const prisma = new PrismaClient();

/**
 * PUBLIC SINGLE CAR RENTAL API
 * Get car details by slug
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Car slug is required',
    });
  }

  try {
    if (req.method === 'GET') {
      const car = await prisma.carRental.findUnique({
        where: { slug },
        include: {
          _count: {
            select: { bookings: true },
          },
        },
      });

      if (!car || !car.isActive) {
        return res.status(404).json({
          success: false,
          error: 'Car not found',
        });
      }

      // Get similar cars
      const similarCars = await prisma.carRental.findMany({
        where: {
          isActive: true,
          category: car.category,
          id: { not: car.id },
        },
        take: 4,
        select: {
          id: true,
          name: true,
          slug: true,
          brand: true,
          model: true,
          category: true,
          pricePerDay: true,
          currency: true,
          mainImage: true,
          rating: true,
          reviewCount: true,
        },
      });

      return res.status(200).json({
        success: true,
        data: car,
        similar: similarCars,
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    logger.error('Car Rental Detail API Error:', error as Error, {component:'Slug'});
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  } finally {
    await prisma.$disconnect();
  }
}
