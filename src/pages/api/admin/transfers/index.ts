import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const {
        page = '1',
        limit = '50',
        search,
        region,
        isActive,
      } = req.query;

      const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
      const take = parseInt(limit as string);

      const where: any = {};

      if (search) {
        where.OR = [
          { name: { contains: search as string, mode: 'insensitive' } },
          { fromLocation: { contains: search as string, mode: 'insensitive' } },
          { toLocation: { contains: search as string, mode: 'insensitive' } },
        ];
      }

      if (region) where.region = region;
      if (isActive !== undefined) where.isActive = isActive === 'true';

      const [transfers, total] = await Promise.all([
        prisma.airportTransfer.findMany({
          where,
          skip,
          take,
          orderBy: { createdAt: 'desc' },
          include: {
            vehicles: {
              select: {
                id: true,
                vehicleType: true,
                name: true,
                priceStandard: true,
                priceVIP: true,
                isAvailable: true,
              },
            },
          },
        }),
        prisma.airportTransfer.count({ where }),
      ]);

      return res.status(200).json({
        success: true,
        data: transfers,
        pagination: {
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          total,
          pages: Math.ceil(total / parseInt(limit as string)),
        },
      });
    }

    if (req.method === 'POST') {
      const transferData = req.body;

      const transfer = await prisma.airportTransfer.create({
        data: transferData,
      });

      return res.status(201).json({
        success: true,
        data: transfer,
        message: 'Transfer created successfully',
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Transfer API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
