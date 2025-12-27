/**
 * Collaboration Room Creation API
 * Creates shared trip planning rooms for real-time collaboration
 * Part of Phase 1: Real-Time Collaborative Planning
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import { withRateLimit, publicRateLimiter } from '@/lib/middleware/rate-limiter';
import { prisma } from '@/lib/prisma';
import logger from '../../../../lib/logger';
import crypto from 'crypto';

interface ItineraryItem {
  id: string;
  name: string;
  type: string;
  time?: string;
}

interface Vote {
  userId: string;
  activityId: string;
  value: number;
  timestamp: string;
}

interface Comment {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
}

interface CreateRoomRequest {
  tripName: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget?: {
    total: number;
    currency: string;
  };
  maxParticipants?: number;
  isPublic?: boolean;
  description?: string;
  tags?: string[];
}

interface CollaborationRoom {
  id: string;
  tripName: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget?: {
    total: number;
    currency: string;
    allocated: number;
  };
  creator: {
    id: string;
    name: string;
    email: string;
  };
  participants: Array<{
    userId: string;
    name: string;
    role: 'owner' | 'editor' | 'viewer';
    joinedAt: string;
  }>;
  status: 'planning' | 'confirmed' | 'completed' | 'cancelled';
  shareLink: string;
  shareCode: string;
  maxParticipants: number;
  isPublic: boolean;
  description?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  itinerary: ItineraryItem[];
  votes: Vote[];
  comments: Comment[];
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
        email: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate request body
    const roomData: CreateRoomRequest = req.body;

    if (!roomData.tripName || !roomData.destination || !roomData.startDate || !roomData.endDate) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['tripName', 'destination', 'startDate', 'endDate'],
      });
    }

    // Generate unique room ID and share code
    const roomId = `room_${crypto.randomBytes(16).toString('hex')}`;
    const shareCode = crypto.randomBytes(4).toString('hex').toUpperCase();

    // Create collaboration room
    const room: CollaborationRoom = {
      id: roomId,
      tripName: roomData.tripName,
      destination: roomData.destination,
      startDate: roomData.startDate,
      endDate: roomData.endDate,
      budget: roomData.budget ? {
        ...roomData.budget,
        allocated: 0,
      } : undefined,
      creator: {
        id: user.id,
        name: user.name || 'Anonymous',
        email: user.email,
      },
      participants: [
        {
          userId: user.id,
          name: user.name || 'Anonymous',
          role: 'owner',
          joinedAt: new Date().toISOString(),
        },
      ],
      status: 'planning',
      shareLink: `${process.env.NEXT_PUBLIC_SITE_URL}/collaboration/room/${roomId}`,
      shareCode,
      maxParticipants: roomData.maxParticipants || 10,
      isPublic: roomData.isPublic || false,
      description: roomData.description,
      tags: roomData.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      itinerary: [],
      votes: [],
      comments: [],
    };

    // Store room in database (you'll need to create CollaborationRoom model in Prisma)
    // For now, we'll use Trip model with additional metadata
    await prisma.trip.create({
      data: {
        userId: user.id,
        destination: roomData.destination,
        startDate: new Date(roomData.startDate),
        endDate: new Date(roomData.endDate),
        budget: roomData.budget?.total || 0,
        status: 'planning',
        isPublaborative: true,
        collaborationData: room as unknown as Record<string, unknown>,
        shareCode,
      },
    });

    // Return success response
    return res.status(201).json({
      success: true,
      room,
      message: 'Collaboration room created successfully',
      instructions: {
        shareWithFriends: `Share this code: ${shareCode} or link: ${room.shareLink}`,
        nextSteps: [
          'Add activities to your itinerary',
          'Invite friends using share code or link',
          'Vote on activities together',
          'Split costs automatically',
        ],
      },
    });

    logger.info('Collaboration room created successfully', {
      component: 'CollaborationRoom',
      action: 'create_room',
      metadata: {
        roomId,
        creator: user.id,
        destination: roomData.destination
      }
    });

  } catch (error) {
    logger.error('Collaboration Room Creation Error', error as Error, {
      component: 'CollaborationRoom',
      action: 'create_room'
    });

    return res.status(500).json({
      error: 'Failed to create collaboration room',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

export default withRateLimit(handler, publicRateLimiter);
