/**
 * Collaboration Room Retrieval API
 * Gets collaboration room details and handles join requests
 * Part of Phase 1: Real-Time Collaborative Planning
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import { withRateLimit, publicRateLimiter } from '@/lib/middleware/rate-limiter';
import { prisma } from '@/lib/prisma';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid room ID' });
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

    if (req.method === 'GET') {
      // Retrieve room details
      const trip = await prisma.trip.findFirst({
        where: {
          OR: [
            { id },
            { shareCode: id }, // Allow access by share code
          ],
          isCollaborative: true,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          comments: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
          },
          votes: true,
        },
      });

      if (!trip) {
        return res.status(404).json({ error: 'Collaboration room not found' });
      }

      // Get collaboration data
      const collaborationData = trip.collaborationData as any;

      // Check if user is participant
      const isParticipant = collaborationData?.participants?.some(
        (p: any) => p.userId === user.id
      );

      // If private room and not participant, deny access
      if (!trip.isPublic && !isParticipant) {
        return res.status(403).json({
          error: 'Access denied',
          message: 'This is a private collaboration room',
        });
      }

      // Return room details
      return res.status(200).json({
        success: true,
        room: {
          ...collaborationData,
          comments: trip.comments,
          votes: trip.votes,
          updatedAt: trip.updatedAt,
        },
        userRole: isParticipant
          ? collaborationData?.participants?.find((p: any) => p.userId === user.id)?.role
          : null,
        canEdit: isParticipant,
      });

    } else if (req.method === 'POST') {
      // Join room
      const trip = await prisma.trip.findFirst({
        where: {
          OR: [
            { id },
            { shareCode: id },
          ],
          isCollaborative: true,
        },
      });

      if (!trip) {
        return res.status(404).json({ error: 'Collaboration room not found' });
      }

      const collaborationData = trip.collaborationData as any;

      // Check if already participant
      const isAlreadyParticipant = collaborationData?.participants?.some(
        (p: any) => p.userId === user.id
      );

      if (isAlreadyParticipant) {
        return res.status(200).json({
          success: true,
          message: 'Already a participant',
          room: collaborationData,
        });
      }

      // Check max participants
      if (collaborationData?.participants?.length >= collaborationData?.maxParticipants) {
        return res.status(400).json({
          error: 'Room is full',
          message: `This room has reached its maximum capacity of ${collaborationData.maxParticipants} participants`,
        });
      }

      // Add user as participant
      const updatedParticipants = [
        ...(collaborationData?.participants || []),
        {
          userId: user.id,
          name: user.name || 'Anonymous',
          role: 'editor',
          joinedAt: new Date().toISOString(),
        },
      ];

      const updatedCollaborationData = {
        ...collaborationData,
        participants: updatedParticipants,
        updatedAt: new Date().toISOString(),
      };

      // Update trip
      await prisma.trip.update({
        where: { id: trip.id },
        data: {
          collaborationData: updatedCollaborationData as any,
        },
      });

      return res.status(200).json({
        success: true,
        message: 'Successfully joined collaboration room',
        room: updatedCollaborationData,
        userRole: 'editor',
      });

    } else if (req.method === 'PATCH') {
      // Update room (owner/editor only)
      const trip = await prisma.trip.findFirst({
        where: {
          id,
          isCollaborative: true,
        },
      });

      if (!trip) {
        return res.status(404).json({ error: 'Collaboration room not found' });
      }

      const collaborationData = trip.collaborationData as any;

      // Check if user has edit permission
      const participant = collaborationData?.participants?.find(
        (p: any) => p.userId === user.id
      );

      if (!participant || !['owner', 'editor'].includes(participant.role)) {
        return res.status(403).json({
          error: 'Permission denied',
          message: 'You do not have permission to edit this room',
        });
      }

      // Update room data
      const updates = req.body;
      const updatedCollaborationData = {
        ...collaborationData,
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      await prisma.trip.update({
        where: { id: trip.id },
        data: {
          collaborationData: updatedCollaborationData as any,
          destination: updates.destination || trip.destination,
          startDate: updates.startDate ? new Date(updates.startDate) : trip.startDate,
          endDate: updates.endDate ? new Date(updates.endDate) : trip.endDate,
          budget: updates.budget?.total || trip.budget,
        },
      });

      return res.status(200).json({
        success: true,
        message: 'Room updated successfully',
        room: updatedCollaborationData,
      });

    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error: any) {
    console.error('Collaboration Room API Error:', error);

    return res.status(500).json({
      error: 'Internal server error',
      details: error.message,
    });
  }
}

export default withRateLimit(handler, publicRateLimiter);
