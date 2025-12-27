import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]';
import logger from '../../../../../lib/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const {
      entityType,
      entityId,
      entityName,
      targetPrice,
      currentPrice,
      currency = 'TRY',
      priceDropPercentage,
      expiresAt,
      notificationMethod = ['EMAIL'],
      metadata,
    } = req.body;

    // Validation
    if (!entityType || !entityId || !entityName || !targetPrice || !currentPrice) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!['HOTEL', 'FLIGHT', 'TOUR'].includes(entityType)) {
      return res.status(400).json({ error: 'Invalid entity type' });
    }

    // Check if alert already exists for this user and entity
    const existingAlert = await prisma.priceAlert.findFirst({
      where: {
        userId: user.id,
        entityType,
        entityId,
        status: 'ACTIVE',
      },
    });

    if (existingAlert) {
      // Update existing alert
      const updatedAlert = await prisma.priceAlert.update({
        where: { id: existingAlert.id },
        data: {
          targetPrice,
          currentPrice,
          priceDropPercentage,
          expiresAt,
          notificationMethod,
          metadata,
          updatedAt: new Date(),
        },
      });

      return res.status(200).json({
        success: true,
        alert: updatedAlert,
        message: 'Price alert updated successfully',
      });
    }

    // Create new price alert
    const priceAlert = await prisma.priceAlert.create({
      data: {
        userId: user.id,
        entityType,
        entityId,
        entityName,
        targetPrice,
        currentPrice,
        currency,
        priceDropPercentage,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        notificationMethod,
        metadata,
        status: 'ACTIVE',
      },
    });

    // Store initial price in history
    await prisma.priceHistory.create({
      data: {
        entityType,
        entityId,
        price: currentPrice,
        currency,
        metadata,
        checkInDate: metadata?.checkInDate ? new Date(metadata.checkInDate) : null,
        checkOutDate: metadata?.checkOutDate ? new Date(metadata.checkOutDate) : null,
        travelDate: metadata?.travelDate ? new Date(metadata.travelDate) : null,
        source: 'USER_TRACKING',
      },
    });

    return res.status(201).json({
      success: true,
      alert: priceAlert,
      message: 'Price tracking started successfully',
    });
  } catch (error) {
    logger.error('Error creating price alert:', error as Error, {component:'Track'});
    return res.status(500).json({ error: 'Internal server error' });
  }
}
