import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import logger from '../../../../../lib/logger';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET - Retrieve comments
  if (req.method === 'GET') {
    try {
      const { tripId, activityId } = req.query;

      if (!tripId) {
        return res.status(400).json({ error: 'Trip ID is required' });
      }

      const comments = await prisma.tripComment.findMany({
        where: {
          tripId: tripId as string,
          activityId: activityId ? (activityId as string) : undefined
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return res.status(200).json({ comments });

    } catch (error: any) {
      logger.error('Error fetching comments:', error as Error, { component: 'Comments' });
      return res.status(500).json({
        error: 'Failed to fetch comments',
        details: error.message
      });
    }
  }

  // POST - Create comment
  if (req.method === 'POST') {
    try {
      const { tripId, userId, activityId, content, parentId } = req.body;

      // Validate inputs
      if (!tripId || !userId || !content) {
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

      // Create comment
      const comment = await prisma.tripComment.create({
        data: {
          tripId,
          userId,
          activityId,
          content,
          parentId
        }
      });

      return res.status(201).json({
        success: true,
        comment
      });

    } catch (error: any) {
      logger.error('Error creating comment:', error as Error, { component: 'Comments' });
      return res.status(500).json({
        error: 'Failed to create comment',
        details: error.message
      });
    }
  }

  // DELETE - Delete comment
  if (req.method === 'DELETE') {
    try {
      const { commentId, userId } = req.body;

      if (!commentId || !userId) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Check if comment exists and user is owner
      const comment = await prisma.tripComment.findUnique({
        where: { id: commentId }
      });

      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      if (comment.userId !== userId) {
        return res.status(403).json({ error: 'Not authorized to delete this comment' });
      }

      // Delete comment
      await prisma.tripComment.delete({
        where: { id: commentId }
      });

      return res.status(200).json({
        success: true,
        message: 'Comment deleted successfully'
      });

    } catch (error: any) {
      logger.error('Error deleting comment:', error as Error, { component: 'Comments' });
      return res.status(500).json({
        error: 'Failed to delete comment',
        details: error.message
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
