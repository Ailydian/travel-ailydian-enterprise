/**
 * 🎯 AdminV2 Media Library - List & Search API
 * Production-grade media listing with advanced filters
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import logger from '@/lib/logger';

// Mock media data (replace with DB in production)
const MOCK_MEDIA = [
  {
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
    dimensions: { width: 1920, height: 1080 },
    usageCount: 5,
  },
  {
    id: 'media_002',
    filename: '1735737700000_def456.png',
    originalFilename: 'cappadocia-balloon.png',
    mimetype: 'image/png',
    size: 3567890,
    category: 'image',
    url: '/uploads/1735737700000_def456.png',
    thumbnail: '/uploads/thumbs/1735737700000_def456.png',
    folder: 'tours',
    tags: ['cappadocia', 'hot air balloon', 'adventure'],
    description: 'Hot air balloons in Cappadocia',
    uploadedBy: 'admin@ailydian.com',
    uploadedAt: '2025-01-01T11:00:00Z',
    dimensions: { width: 2560, height: 1440 },
    usageCount: 12,
  },
  {
    id: 'media_003',
    filename: '1735737800000_ghi789.pdf',
    originalFilename: 'tour-brochure.pdf',
    mimetype: 'application/pdf',
    size: 1234567,
    category: 'document',
    url: '/uploads/1735737800000_ghi789.pdf',
    thumbnail: '/icons/pdf.svg',
    folder: 'documents',
    tags: ['brochure', 'marketing'],
    description: 'Tour package brochure',
    uploadedBy: 'admin@ailydian.com',
    uploadedAt: '2025-01-01T12:00:00Z',
    usageCount: 3,
  },
];

interface MediaListParams {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  search?: string;
  category?: 'image' | 'document' | 'video' | 'other';
  folder?: string;
  tags?: string[];
  dateRange?: { start: string; end: string };
  sizeRange?: { min: number; max: number };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only GET allowed
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Auth check
    const session = await getServerSession(req, res, authOptions);
    if (!session || session.user?.role !== 'admin') {
      logger.warn('Unauthorized AdminV2 media list access attempt');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Parse query params
    const {
      page = '1',
      limit = '20',
      sortBy = 'uploadedAt',
      sortOrder = 'desc',
      search,
      category,
      folder,
      tags,
      dateStart,
      dateEnd,
      sizeMin,
      sizeMax,
    } = req.query;

    const params: MediaListParams = {
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
      sortBy: sortBy as string,
      sortOrder: sortOrder as 'asc' | 'desc',
      search: search as string | undefined,
      category: category as 'image' | 'document' | 'video' | 'other' | undefined,
      folder: folder as string | undefined,
      tags: tags ? (Array.isArray(tags) ? tags : [tags]) : undefined,
    };

    if (dateStart || dateEnd) {
      params.dateRange = {
        start: dateStart as string,
        end: dateEnd as string,
      };
    }

    if (sizeMin || sizeMax) {
      params.sizeRange = {
        min: sizeMin ? parseInt(sizeMin as string, 10) : 0,
        max: sizeMax ? parseInt(sizeMax as string, 10) : Number.MAX_SAFE_INTEGER,
      };
    }

    logger.info('AdminV2 media list request', { params, admin: session.user.email });

    // Filter logic
    let filtered = [...MOCK_MEDIA];

    // Search filter
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.originalFilename.toLowerCase().includes(searchLower) ||
          m.description.toLowerCase().includes(searchLower) ||
          m.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Category filter
    if (params.category) {
      filtered = filtered.filter((m) => m.category === params.category);
    }

    // Folder filter
    if (params.folder) {
      filtered = filtered.filter((m) => m.folder === params.folder);
    }

    // Tags filter
    if (params.tags && params.tags.length > 0) {
      filtered = filtered.filter((m) =>
        params.tags!.some((tag) => m.tags.includes(tag))
      );
    }

    // Date range filter
    if (params.dateRange) {
      const { start, end } = params.dateRange;
      filtered = filtered.filter((m) => {
        const uploadDate = new Date(m.uploadedAt);
        const startDate = start ? new Date(start) : new Date(0);
        const endDate = end ? new Date(end) : new Date();
        return uploadDate >= startDate && uploadDate <= endDate;
      });
    }

    // Size range filter
    if (params.sizeRange) {
      filtered = filtered.filter(
        (m) => m.size >= params.sizeRange!.min && m.size <= params.sizeRange!.max
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      const aVal = (a as any)[params.sortBy];
      const bVal = (b as any)[params.sortBy];

      if (typeof aVal === 'string') {
        return params.sortOrder === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return params.sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });

    // Pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / params.limit);
    const start = (params.page - 1) * params.limit;
    const end = start + params.limit;
    const paginated = filtered.slice(start, end);

    // Stats
    const stats = {
      total,
      totalPages,
      currentPage: params.page,
      pageSize: params.limit,
      totalSize: MOCK_MEDIA.reduce((sum, m) => sum + m.size, 0),
      byCategory: {
        image: MOCK_MEDIA.filter((m) => m.category === 'image').length,
        document: MOCK_MEDIA.filter((m) => m.category === 'document').length,
        video: MOCK_MEDIA.filter((m) => m.category === 'video').length,
        other: MOCK_MEDIA.filter((m) => m.category === 'other').length,
      },
      folders: [...new Set(MOCK_MEDIA.map((m) => m.folder))],
      allTags: [...new Set(MOCK_MEDIA.flatMap((m) => m.tags))],
    };

    logger.info('AdminV2 media list success', { total, page: params.page });

    return res.status(200).json({
      success: true,
      data: {
        media: paginated,
        stats,
        filters: params,
      },
    });
  } catch (error) {
    logger.error('AdminV2 media list error', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
