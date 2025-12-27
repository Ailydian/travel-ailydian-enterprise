/**
 * Collaboration Voting API
 * Handles voting on activities and consensus tracking
 * Part of Phase 1: Real-Time Collaborative Planning
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { withRateLimit, publicRateLimiter } from '@/lib/middleware/rate-limiter';
import { prisma } from '@/lib/prisma';
import logger from '../../../../../lib/logger';

interface VoteRequest {
  roomId: string;
  activityId: string;
  vote: 'up' | 'down' | 'neutral';
  comment?: string;
}

interface Activity {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: string;
  estimatedCost: number;
  location: string;
  votes: {
    up: number;
    down: number;
    neutral: number;
  };
  voters: Array<{
    userId: string;
    userName: string;
    vote: 'up' | 'down' | 'neutral';
    timestamp: string;
  }>;
  consensusScore: number; // 0-100
  status: 'pending' | 'approved' | 'rejected';
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get user session
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate request
    const voteData: VoteRequest = req.body;

    if (!voteData.roomId || !voteData.activityId || !voteData.vote) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['roomId', 'activityId', 'vote'],
      });
    }

    // Get trip/room
    const trip = await prisma.trip.findFirst({
      where: {
        id: voteData.roomId,
        isCollaborative: true,
      },
    });

    if (!trip) {
      return res.status(404).json({ error: 'Collaboration room not found' });
    }

    const collaborationData = trip.collaborationData as any;

    // Check if user is participant
    const isParticipant = collaborationData?.participants?.some(
      (p: any) => p.userId === user.id
    );

    if (!isParticipant) {
      return res.status(403).json({
        error: 'Access denied',
        message: 'You must be a participant to vote',
      });
    }

    // Create or update vote in database
    const existingVote = await prisma.vote.findFirst({
      where: {
        tripId: trip.id,
        userId: user.id,
        activityId: voteData.activityId,
      },
    });

    if (existingVote) {
      // Update existing vote
      await prisma.vote.update({
        where: { id: existingVote.id },
        data: {
          value: voteData.vote === 'up' ? 1 : voteData.vote === 'down' ? -1 : 0,
          comment: voteData.comment,
        },
      });
    } else {
      // Create new vote
      await prisma.vote.create({
        data: {
          tripId: trip.id,
          userId: user.id,
          activityId: voteData.activityId,
          value: voteData.vote === 'up' ? 1 : voteData.vote === 'down' ? -1 : 0,
          comment: voteData.comment,
        },
      });
    }

    // Get all votes for this activity
    const allVotes = await prisma.vote.findMany({
      where: {
        tripId: trip.id,
        activityId: voteData.activityId,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    // Calculate vote counts
    const upVotes = allVotes.filter(v => v.value === 1).length;
    const downVotes = allVotes.filter(v => v.value === -1).length;
    const neutralVotes = allVotes.filter(v => v.value === 0).length;
    const totalVotes = allVotes.length;
    const participantCount = collaborationData?.participants?.length || 1;

    // Calculate consensus score (0-100)
    // High score = more people voted positively
    const consensusScore = totalVotes > 0
      ? Math.round(((upVotes + (neutralVotes * 0.5)) / totalVotes) * 100)
      : 0;

    // Determine status based on consensus
    let status: 'pending' | 'approved' | 'rejected' = 'pending';
    if (totalVotes >= participantCount * 0.7) { // 70% participation threshold
      if (consensusScore >= 75) {
        status = 'approved';
      } else if (consensusScore <= 25) {
        status = 'rejected';
      }
    }

    // Prepare response
    const voteResult = {
      activityId: voteData.activityId,
      votes: {
        up: upVotes,
        down: downVotes,
        neutral: neutralVotes,
        total: totalVotes,
      },
      voters: allVotes.map(v => ({
        userId: v.userId,
        userName: v.user.name || 'Anonymous',
        vote: v.value === 1 ? 'up' : v.value === -1 ? 'down' : 'neutral',
        timestamp: v.createdAt.toISOString(),
        comment: v.comment,
      })),
      consensusScore,
      status,
      participation: {
        voted: totalVotes,
        total: participantCount,
        percentage: Math.round((totalVotes / participantCount) * 100),
      },
      needsMoreVotes: totalVotes < participantCount * 0.7,
    };

    return res.status(200).json({
      success: true,
      message: 'Vote recorded successfully',
      result: voteResult,
    });

  } catch (error: any) {
    logger.error('Voting API Error:', error as Error, {component:'Vote'});

    return res.status(500).json({
      error: 'Failed to process vote',
      details: error.message,
    });
  }
}

export default withRateLimit(handler, publicRateLimiter);
