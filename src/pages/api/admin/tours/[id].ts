import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import logger from '../../../../lib/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Tour ID is required' });
  }

  try {
    if (req.method === 'GET') {
      const tour = await prisma.tourPackage.findUnique({
        where: { id },
      });

      if (!tour) {
        return res.status(404).json({ error: 'Tour not found' });
      }

      return res.status(200).json({
        success: true,
        data: tour,
      });
    }

    if (req.method === 'PUT') {
      const updateData = req.body;

      const tour = await prisma.tourPackage.update({
        where: { id },
        data: {
          ...updateData,
          updatedAt: new Date(),
        },
      });

      return res.status(200).json({
        success: true,
        data: tour,
        message: 'Tour updated successfully',
      });
    }

    if (req.method === 'DELETE') {
      await prisma.tourPackage.delete({
        where: { id },
      });

      return res.status(200).json({
        success: true,
        message: 'Tour deleted successfully',
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    logger.error('Tour API Error:', error as Error, {component:'Id'});
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
