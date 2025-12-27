import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import logger from '../../../../../lib/logger';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { tripId, email, role = 'VIEWER', invitedBy } = req.body;

    // Validate inputs
    if (!tripId || !email || !invitedBy) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if trip exists
    const trip = await prisma.trip.findUnique({
      where: { id: tripId }
    });

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    // Check if user is already a collaborator
    const existingCollaborator = await prisma.tripCollaborator.findUnique({
      where: {
        tripId_email: {
          tripId,
          email
        }
      }
    });

    if (existingCollaborator) {
      return res.status(400).json({ error: 'User is already a collaborator' });
    }

    // Set permissions based on role
    let permissions: string[] = [];
    switch (role) {
      case 'OWNER':
        permissions = ['edit', 'delete', 'invite', 'view', 'comment', 'vote'];
        break;
      case 'EDITOR':
        permissions = ['edit', 'view', 'comment', 'vote'];
        break;
      case 'VIEWER':
        permissions = ['view', 'comment', 'vote'];
        break;
    }

    // Create collaborator
    const collaborator = await prisma.tripCollaborator.create({
      data: {
        tripId,
        email,
        role,
        status: 'PENDING',
        invitedBy,
        permissions
      }
    });

    // TODO: Send invitation email
    // await sendInvitationEmail(email, trip, collaborator);

    return res.status(201).json({
      success: true,
      collaborator,
      message: 'Invitation sent successfully'
    });

  } catch (error: any) {
    logger.error('Error sharing trip:', error as Error, {component:'Share'});
    return res.status(500).json({
      error: 'Failed to share trip',
      details: error.message
    });
  } finally {
    await prisma.$disconnect();
  }
}
