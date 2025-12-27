import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import logger from '../../../lib/logger';

const prisma = new PrismaClient();

/**
 * GET /api/bookings/list
 * Fetch user's bookings
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Get session
    const session = await getSession({ req });

    if (!session || !session.user?.email) {
      return res.status(401).json({
        success: false,
        message: 'Oturum açmanız gerekiyor'
      });
    }

    logger.info('Fetching bookings for user', { email: session.user.email });

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Kullanıcı bulunamadı'
      });
    }

    // Fetch user's bookings with sorting
    const bookings = await prisma.booking.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        reviews: {
          select: {
            id: true,
            rating: true,
            title: true,
            content: true,
            createdAt: true
          }
        }
      }
    });

    logger.info('Bookings fetched successfully', {
      userId: user.id,
      count: bookings.length
    });

    return res.status(200).json({
      success: true,
      bookings,
      count: bookings.length
    });

  } catch (error) {
    logger.error('Bookings fetch failed', error);
    logger.error('Bookings list error:', error as Error, {component:'List'});

    return res.status(500).json({
      success: false,
      message: 'Rezervasyonlar yüklenirken bir hata oluştu',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  } finally {
    await prisma.$disconnect();
  }
}
