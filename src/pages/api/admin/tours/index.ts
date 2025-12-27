import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import logger from '../../../../lib/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // GET - List all tours
    if (req.method === 'GET') {
      const {
        page = '1',
        limit = '50',
        search,
        category,
        region,
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
          { destination: { contains: search as string, mode: 'insensitive' } },
        ];
      }

      if (category) where.category = category;
      if (region) where.region = region;
      if (isActive !== undefined) where.isActive = isActive === 'true';
      if (isFeatured !== undefined) where.isFeatured = isFeatured === 'true';

      const [tours, total] = await Promise.all([
        prisma.tourPackage.findMany({
          where,
          skip,
          take,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.tourPackage.count({ where }),
      ]);

      return res.status(200).json({
        success: true,
        data: tours,
        pagination: {
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          total,
          pages: Math.ceil(total / parseInt(limit as string)),
        },
      });
    }

    // POST - Create new tour
    if (req.method === 'POST') {
      const tourData = req.body;

      const tour = await prisma.tourPackage.create({
        data: {
          ...tourData,
          slug: tourData.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, ''),
        },
      });

      return res.status(201).json({
        success: true,
        data: tour,
        message: 'Tour created successfully',
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    logger.error('Tour API Error:', error as Error, {component:'Index'});
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
