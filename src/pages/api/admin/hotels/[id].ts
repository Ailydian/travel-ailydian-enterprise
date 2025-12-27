import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import logger from '../../../../lib/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Hotel ID is required' });
  }

  try {
    // GET - Get single hotel
    if (req.method === 'GET') {
      const hotel = await prisma.hotel.findUnique({
        where: { id },
        include: {
          rooms: true,
        },
      });

      if (!hotel) {
        return res.status(404).json({ error: 'Hotel not found' });
      }

      return res.status(200).json({
        success: true,
        data: hotel,
      });
    }

    // PUT - Update hotel
    if (req.method === 'PUT') {
      const updateData = req.body;

      const hotel = await prisma.hotel.update({
        where: { id },
        data: {
          ...updateData,
          updatedAt: new Date(),
        },
      });

      return res.status(200).json({
        success: true,
        data: hotel,
        message: 'Hotel updated successfully',
      });
    }

    // DELETE - Delete hotel
    if (req.method === 'DELETE') {
      await prisma.hotel.delete({
        where: { id },
      });

      return res.status(200).json({
        success: true,
        message: 'Hotel deleted successfully',
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    logger.error('Hotel API Error:', error as Error, {component:'Id'});
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
