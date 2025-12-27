import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import logger from '../../../../lib/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // GET - List all hotels
    if (req.method === 'GET') {
      const {
        page = '1',
        limit = '50',
        search,
        city,
        region,
        stars,
        isActive,
        isFeatured,
      } = req.query;

      const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
      const take = parseInt(limit as string);

      const where: any = {};

      if (search) {
        where.OR = [
          { name: { contains: search as string, mode: 'insensitive' } },
          { description: { contains: search as string, mode: 'insensitive' } },
          { city: { contains: search as string, mode: 'insensitive' } },
          { region: { contains: search as string, mode: 'insensitive' } },
        ];
      }

      if (city) where.city = city;
      if (region) where.region = region;
      if (stars) where.stars = parseInt(stars as string);
      if (isActive !== undefined) where.isActive = isActive === 'true';
      if (isFeatured !== undefined) where.isFeatured = isFeatured === 'true';

      const [hotels, total] = await Promise.all([
        prisma.hotel.findMany({
          where,
          skip,
          take,
          orderBy: { createdAt: 'desc' },
          include: {
            rooms: {
              select: {
                id: true,
                name: true,
                pricePerNight: true,
                isAvailable: true,
              },
            },
          },
        }),
        prisma.hotel.count({ where }),
      ]);

      return res.status(200).json({
        success: true,
        data: hotels,
        pagination: {
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          total,
          pages: Math.ceil(total / parseInt(limit as string)),
        },
      });
    }

    // POST - Create new hotel
    if (req.method === 'POST') {
      const hotelData = req.body;

      const hotel = await prisma.hotel.create({
        data: {
          ...hotelData,
          slug: hotelData.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, ''),
        },
      });

      return res.status(201).json({
        success: true,
        data: hotel,
        message: 'Hotel created successfully',
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    logger.error('Hotel API Error:', error as Error, {component:'Index'});
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
