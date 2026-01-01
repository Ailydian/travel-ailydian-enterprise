import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';;
import { nanoid } from 'nanoid';
import logger from '../../../lib/logger';

// Using singleton prisma from @/lib/prisma

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      userId,
      title,
      description,
      destination,
      startDate,
      endDate,
      budget,
      currency = 'TRY',
      travelers,
      preferences,
      itinerary,
      aiGenerated = false,
      isPublic = false
    } = req.body;

    // Validate required fields
    if (!userId || !title || !destination || !startDate || !endDate || !budget) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate unique share link
    const shareLink = nanoid(10);

    // Create trip
    const trip = await prisma.trip.create({
      data: {
        userId,
        title,
        description,
        destination,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        budget,
        currency,
        travelers,
        preferences,
        aiGenerated,
        isPublic,
        shareLink,
        status: 'DRAFT'
      }
    });

    // Create itinerary days if provided
    if (itinerary && Array.isArray(itinerary)) {
      await Promise.all(
        itinerary.map((day: any) =>
          prisma.tripItinerary.create({
            data: {
              tripId: trip.id,
              day: day.day,
              date: new Date(day.date),
              title: day.title,
              description: day.description,
              activities: day.activities || [],
              totalCost: day.totalCost || 0,
              weather: day.weather,
              notes: day.notes
            }
          })
        )
      );
    }

    // Add creator as owner collaborator
    await prisma.tripCollaborator.create({
      data: {
        tripId: trip.id,
        email: req.body.userEmail || 'owner@example.com',
        role: 'OWNER',
        status: 'ACTIVE',
        invitedBy: userId,
        joinedAt: new Date(),
        permissions: ['edit', 'delete', 'invite', 'view', 'comment', 'vote']
      }
    });

    return res.status(201).json({
      success: true,
      trip: {
        ...trip,
        shareUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3100'}/trip/${shareLink}`
      }
    });

  } catch (error: any) {
    logger.error('Error creating trip:', error as Error, {component:'Create'});
    return res.status(500).json({
      error: 'Failed to create trip',
      details: error.message
    });
}
}
