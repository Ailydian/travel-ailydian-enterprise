import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]';
import logger from '../../../lib/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

  try {
    if (req.method === 'GET') {
      // Get all user's price alerts
      const { status, entityType } = req.query;

      const where: any = { userId: user.id };
      if (status) where.status = status;
      if (entityType) where.entityType = entityType;

      const alerts = await prisma.priceAlert.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      });

      return res.status(200).json({
        success: true,
        alerts,
        count: alerts.length,
      });
    }

    if (req.method === 'PATCH') {
      // Update alert status
      const { alertId, status } = req.body;

      if (!alertId || !status) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Verify alert belongs to user
      const alert = await prisma.priceAlert.findFirst({
        where: {
          id: alertId,
          userId: user.id,
        },
      });

      if (!alert) {
        return res.status(404).json({ error: 'Alert not found' });
      }

      const updatedAlert = await prisma.priceAlert.update({
        where: { id: alertId },
        data: { status },
      });

      return res.status(200).json({
        success: true,
        alert: updatedAlert,
        message: 'Alert updated successfully',
      });
    }

    if (req.method === 'DELETE') {
      // Delete alert
      const { alertId } = req.query;

      if (!alertId) {
        return res.status(400).json({ error: 'Missing alert ID' });
      }

      // Verify alert belongs to user
      const alert = await prisma.priceAlert.findFirst({
        where: {
          id: alertId as string,
          userId: user.id,
        },
      });

      if (!alert) {
        return res.status(404).json({ error: 'Alert not found' });
      }

      await prisma.priceAlert.delete({
        where: { id: alertId as string },
      });

      return res.status(200).json({
        success: true,
        message: 'Alert deleted successfully',
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    logger.error('Error managing price alerts:', error as Error, {component:'Alerts'});
    return res.status(500).json({ error: 'Internal server error' });
  }
}
