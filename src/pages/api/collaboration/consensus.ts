/**
 * Collaboration Consensus API
 * Analyzes voting patterns and provides consensus recommendations
 * Part of Phase 1: Real-Time Collaborative Planning
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { withRateLimit, publicRateLimiter } from '@/lib/middleware/rate-limiter';
import { prisma } from '@/lib/prisma';
import { neuralxChat } from '@/lib/groq-service';
import logger from '@/lib/logger';

interface VoteData {
  activityId: string;
  value: number;
  userId: string;
  user: { name: string | null };
}

interface Participant {
  userId: string;
  name: string;
  role: 'owner' | 'editor' | 'viewer';
  joinedAt: string;
}

interface CollaborationData {
  participants?: Participant[];
}

interface CompromiseSuggestion {
  type: 'alternative' | 'modification' | 'combination';
  description: string;
  affectedActivities: string[];
  reasoning: string;
  potentialConsensus: number;
}

interface ConsensusAnalysis {
  roomId: string;
  overallConsensusScore: number; // 0-100
  agreementLevel: 'high' | 'moderate' | 'low' | 'polarized';
  approvedActivities: Array<{
    id: string;
    name: string;
    consensusScore: number;
    votes: { up: number; down: number; neutral: number };
  }>;
  pendingActivities: Array<{
    id: string;
    name: string;
    consensusScore: number;
    votes: { up: number; down: number; neutral: number };
    needsMoreVotes: boolean;
  }>;
  rejectedActivities: Array<{
    id: string;
    name: string;
    consensusScore: number;
    votes: { up: number; down: number; neutral: number };
  }>;
  compromiseSuggestions: Array<{
    type: 'alternative' | 'modification' | 'combination';
    description: string;
    affectedActivities: string[];
    reasoning: string;
    potentialConsensus: number;
  }>;
  groupDynamics: {
    mostActiveVoters: Array<{ name: string; voteCount: number }>;
    agreementMatrix: Record<string, Record<string, number>>; // User-to-user agreement %
    clusterAnalysis: string;
  };
  recommendations: string[];
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get user session
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { roomId } = req.query;

    if (!roomId || typeof roomId !== 'string') {
      return res.status(400).json({ error: 'Missing roomId parameter' });
    }

    // Get trip/room with all votes
    const trip = await prisma.trip.findFirst({
      where: {
        id: roomId,
        isCollaborative: true,
      },
      include: {
        votes: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!trip) {
      return res.status(404).json({ error: 'Collaboration room not found' });
    }

    const collaborationData = trip.collaborationData as CollaborationData;

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user is participant
    const isParticipant = collaborationData?.participants?.some(
      (p) => p.userId === user.id
    );

    if (!isParticipant) {
      return res.status(403).json({
        error: 'Access denied',
        message: 'You must be a participant to view consensus',
      });
    }

    // Group votes by activity
    const votesByActivity = trip.votes.reduce((acc, vote) => {
      if (!acc[vote.activityId]) {
        acc[vote.activityId] = [];
      }
      acc[vote.activityId].push(vote);
      return acc;
    }, {} as Record<string, VoteData[]>);

    // Calculate consensus for each activity
    const activityAnalysis = Object.entries(votesByActivity).map(([activityId, votes]) => {
      const upVotes = votes.filter(v => v.value === 1).length;
      const downVotes = votes.filter(v => v.value === -1).length;
      const neutralVotes = votes.filter(v => v.value === 0).length;
      const totalVotes = votes.length;

      const consensusScore = totalVotes > 0
        ? Math.round(((upVotes + (neutralVotes * 0.5)) / totalVotes) * 100)
        : 0;

      const participantCount = collaborationData?.participants?.length || 1;
      const needsMoreVotes = totalVotes < participantCount * 0.7;

      let status: 'approved' | 'pending' | 'rejected' = 'pending';
      if (!needsMoreVotes) {
        if (consensusScore >= 75) status = 'approved';
        else if (consensusScore <= 25) status = 'rejected';
      }

      return {
        id: activityId,
        name: `Activity ${activityId.slice(-4)}`, // Use last 4 chars as display name
        consensusScore,
        votes: { up: upVotes, down: downVotes, neutral: neutralVotes },
        status,
        needsMoreVotes,
      };
    });

    // Separate by status
    const approved = activityAnalysis.filter(a => a.status === 'approved');
    const pending = activityAnalysis.filter(a => a.status === 'pending');
    const rejected = activityAnalysis.filter(a => a.status === 'rejected');

    // Calculate overall consensus
    const allScores = activityAnalysis.map(a => a.consensusScore);
    const overallConsensusScore = allScores.length > 0
      ? Math.round(allScores.reduce((sum, score) => sum + score, 0) / allScores.length)
      : 0;

    // Determine agreement level
    const variance = allScores.length > 0
      ? allScores.reduce((sum, score) => {
          const diff = score - overallConsensusScore;
          return sum + diff * diff;
        }, 0) / allScores.length
      : 0;

    let agreementLevel: 'high' | 'moderate' | 'low' | 'polarized' = 'moderate';
    if (variance < 100) agreementLevel = 'high';
    else if (variance > 1000) agreementLevel = 'polarized';
    else if (variance > 500) agreementLevel = 'low';

    // Analyze group dynamics
    const voteCountByUser: Record<string, number> = {};
    trip.votes.forEach(vote => {
      voteCountByUser[vote.userId] = (voteCountByUser[vote.userId] || 0) + 1;
    });

    const mostActiveVoters = Object.entries(voteCountByUser)
      .map(([userId, count]) => {
        const userName = trip.votes.find(v => v.userId === userId)?.user.name || 'Anonymous';
        return { name: userName, voteCount: count };
      })
      .sort((a, b) => b.voteCount - a.voteCount)
      .slice(0, 5);

    // Use AI to generate compromise suggestions
    const compromisePrompt = `
Analyze this group voting data and suggest compromises:

Overall Consensus Score: ${overallConsensusScore}
Agreement Level: ${agreementLevel}

Approved Activities: ${approved.length}
Pending Activities: ${pending.length}
Rejected Activities: ${rejected.length}

Pending Activities Details:
${pending.map(a => `- ${a.name}: ${a.votes.up} up, ${a.votes.down} down, consensus ${a.consensusScore}%`).join('\n')}

Suggest 3-5 compromise strategies to help the group reach consensus on pending items.

Return ONLY valid JSON:
{
  "suggestions": [
    {
      "type": "alternative" | "modification" | "combination",
      "description": "string",
      "affectedActivities": ["string"],
      "reasoning": "string",
      "potentialConsensus": number (0-100)
    }
  ],
  "recommendations": ["string"]
}`;

    let compromiseSuggestions: CompromiseSuggestion[] = [];
    let recommendations: string[] = [];

    try {
      const aiResponse = await neuralxChat(
        [
          {
            role: 'system',
            content: 'You are an expert in group dynamics and conflict resolution for travel planning. Provide practical compromise suggestions. Always return valid JSON.',
          },
          {
            role: 'user',
            content: compromisePrompt,
          },
        ],
        {
          model: 'nx-fast-v1',
          temperature: 0.6,
          response_format: { type: 'json_object' },
        }
      );

      const parsed = JSON.parse(aiResponse);
      compromiseSuggestions = parsed.suggestions || [];
      recommendations = parsed.recommendations || [];
    } catch (aiError) {
      logger.warn('AI compromise suggestion error', {
        component: 'CollaborationConsensus',
        action: 'generate_suggestions',
        metadata: { error: aiError instanceof Error ? aiError.message : 'Unknown error' }
      });
      // Provide fallback recommendations
      recommendations = [
        'Encourage all participants to vote on pending activities',
        'Consider discussing polarizing activities in group chat',
        'Focus on approved activities first to build momentum',
      ];
    }

    // Prepare consensus analysis
    const analysis: ConsensusAnalysis = {
      roomId,
      overallConsensusScore,
      agreementLevel,
      approvedActivities: approved,
      pendingActivities: pending,
      rejectedActivities: rejected,
      compromiseSuggestions,
      groupDynamics: {
        mostActiveVoters,
        agreementMatrix: {}, // Simplified for now
        clusterAnalysis: `${agreementLevel} agreement with ${variance.toFixed(0)} variance`,
      },
      recommendations,
    };

    logger.info('Consensus analysis completed', {
      component: 'CollaborationConsensus',
      action: 'analyze_consensus',
      metadata: {
        roomId,
        consensusScore: analysis.overallConsensusScore,
        agreementLevel: analysis.agreementLevel
      }
    });

    return res.status(200).json({
      success: true,
      analysis,
      generatedAt: new Date().toISOString(),
    });

  } catch (error) {
    logger.error('Consensus API Error', error as Error, {
      component: 'CollaborationConsensus',
      action: 'analyze_consensus'
    });

    return res.status(500).json({
      error: 'Failed to analyze consensus',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

export default withRateLimit(handler, publicRateLimiter);
