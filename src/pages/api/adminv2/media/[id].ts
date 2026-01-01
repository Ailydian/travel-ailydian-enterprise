/**
 * 🎯 AdminV2 Media Library - Get/Update/Delete Media
 * Production-grade media management operations
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import logger from '@/lib/logger';
import fs from 'fs/promises';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// Mock media storage
const MOCK_MEDIA_DB: Record<string, any> = {
  media_001: {
    id: 'media_001',
    filename: '1735737600000_abc123.jpg',
    originalFilename: 'istanbul-sunset.jpg',
    mimetype: 'image/jpeg',
    size: 2456789,
    category: 'image',
    url: '/uploads/1735737600000_abc123.jpg',
    thumbnail: '/uploads/thumbs/1735737600000_abc123.jpg',
    folder: 'tours',
    tags: ['istanbul', 'sunset', 'landscape'],
    description: 'Beautiful Istanbul sunset view',
    uploadedBy: 'admin@ailydian.com',
    uploadedAt: '2025-01-01T10:00:00Z',
    updatedAt: '2025-01-01T10:00:00Z',
    dimensions: { width: 1920, height: 1080 },
    usageCount: 5,
    usedIn: [
      { type: 'tour', id: 'tour_1', title: 'İstanbul Tarihi Turu' },
      { type: 'blog', id: 'blog_5', title: 'İstanbul Gezisi' },
    ],
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid media ID' });
  }

  try {
    // Auth check
    const session = await getServerSession(req, res, authOptions);
    if (!session || session.user?.role !== 'admin') {
      logger.warn('Unauthorized AdminV2 media access attempt', { mediaId: id });
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // GET - Fetch media details
    if (req.method === 'GET') {
      const media = MOCK_MEDIA_DB[id];

      if (!media) {
        logger.warn('AdminV2 media not found', { mediaId: id });
        return res.status(404).json({ error: 'Media not found' });
      }

      logger.info('AdminV2 media fetched', { mediaId: id, admin: session.user.email });

      return res.status(200).json({
        success: true,
        data: media,
      });
    }

    // PUT - Update media metadata
    if (req.method === 'PUT') {
      const updates = req.body;

      const existingMedia = MOCK_MEDIA_DB[id];
      if (!existingMedia) {
        return res.status(404).json({ error: 'Media not found' });
      }

      // Allowed updates: folder, tags, description, originalFilename
      const allowedFields = ['folder', 'tags', 'description', 'originalFilename'];
      const sanitizedUpdates: any = {};

      for (const field of allowedFields) {
        if (updates[field] !== undefined) {
          sanitizedUpdates[field] = updates[field];
        }
      }

      // Update mock data
      MOCK_MEDIA_DB[id] = {
        ...existingMedia,
        ...sanitizedUpdates,
        updatedAt: new Date().toISOString(),
      };

      logger.info('AdminV2 media updated', {
        mediaId: id,
        admin: session.user.email,
        updates: sanitizedUpdates,
      });

      return res.status(200).json({
        success: true,
        data: MOCK_MEDIA_DB[id],
        message: 'Media updated successfully',
      });
    }

    // DELETE - Delete media file
    if (req.method === 'DELETE') {
      const media = MOCK_MEDIA_DB[id];
      if (!media) {
        return res.status(404).json({ error: 'Media not found' });
      }

      // Check if media is in use
      if (media.usageCount > 0) {
        logger.warn('AdminV2 media delete blocked - in use', {
          mediaId: id,
          usageCount: media.usageCount,
        });
        return res.status(409).json({
          error: 'Media is currently in use',
          usageCount: media.usageCount,
          usedIn: media.usedIn,
        });
      }

      // Delete physical file
      const filePath = path.join(UPLOAD_DIR, media.filename);
      try {
        await fs.unlink(filePath);
        logger.info('AdminV2 media file deleted', { filePath });
      } catch (error) {
        logger.warn('AdminV2 media file not found on disk', { filePath, error });
        // Continue anyway - might already be deleted
      }

      // Delete thumbnail if exists
      if (media.thumbnail) {
        const thumbPath = path.join(process.cwd(), 'public', media.thumbnail);
        try {
          await fs.unlink(thumbPath);
        } catch {
          // Ignore thumbnail deletion errors
        }
      }

      // Remove from mock DB
      delete MOCK_MEDIA_DB[id];

      logger.info('AdminV2 media deleted', { mediaId: id, admin: session.user.email });

      return res.status(200).json({
        success: true,
        message: 'Media deleted successfully',
      });
    }

    // Method not allowed
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    logger.error('AdminV2 media operation error', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
