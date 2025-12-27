import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import logger from '../../../lib/logger';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { tripId, activityId, userId, voteType, comment } = req.body;

    // Validate inputs
    if (!tripId || !userId || !voteType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if trip exists
    const trip = await prisma.trip.findUnique({
      where: { id: tripId }
    });

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    // Check if user is a collaborator
    const collaborator = await prisma.tripCollaborator.findFirst({
      where: {
        tripId,
        OR: [
          { userId },
          { email: req.body.userEmail }
        ]
      }
    });

    if (!collaborator) {
      return res.status(403).json({ error: 'User is not a collaborator' });
    }

    // Check if user already voted
    const existingVote = await prisma.tripVote.findUnique({
      where: {
        tripId_activityId_userId: {
          tripId,
          activityId: activityId || '',
          userId
        }
      }
    });

    let vote;

    if (existingVote) {
      // Update existing vote
      vote = await prisma.tripVote.update({
        where: { id: existingVote.id },
        data: {
          voteType,
          comment
        }
      });
    } else {
      // Create new vote
      vote = await prisma.tripVote.create({
        data: {
          tripId,
          activityId,
          userId,
          voteType,
          comment
        }
      });
    }

    // Get vote statistics
    const voteStats = await prisma.tripVote.groupBy({
      by: ['voteType'],
      where: {
        tripId,
        activityId: activityId || undefined
      },
      _count: true
    });

    return res.status(200).json({
      success: true,
      vote,
      statistics: voteStats
    });

  } catch (error: any) {
    logger.error('Error voting:', error as Error, {component:'Vote'});
    return res.status(500).json({
      error: 'Failed to register vote',
      details: error.message
    });
  } finally {
    await prisma.$disconnect();
  }
}
