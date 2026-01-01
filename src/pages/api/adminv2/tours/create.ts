/**
 * 🎯 AdminV2 Tours Management API - Create New Tour
 * Production-grade tour creation with full validation
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import logger from '@/lib/logger';

// Tour creation schema
interface CreateTourRequest {
  title: string;
  slug?: string;
  description: string;
  longDescription?: string;
  category: string;
  destination: string;
  price: number;
  currency: string;
  duration: string;
  maxGroupSize?: number;
  language?: string[];
  status?: 'draft' | 'active';
  featured?: boolean;
  images?: string[];
  highlights?: string[];
  included?: string[];
  excluded?: string[];
  itinerary?: Array<{
    time: string;
    title: string;
    description: string;
  }>;
  availability?: {
    startDate: string;
    endDate: string;
    daysOfWeek: number[];
  };
  pricing?: {
    adult: number;
    child?: number;
    infant?: number;
  };
  cancellationPolicy?: string;
  meetingPoint?: {
    name: string;
    lat: number;
    lng: number;
    address: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

// Validation helper
function validateTourData(data: CreateTourRequest): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.title || data.title.length < 3) {
    errors.push('Title must be at least 3 characters');
  }

  if (!data.description || data.description.length < 10) {
    errors.push('Description must be at least 10 characters');
  }

  if (!data.category) {
    errors.push('Category is required');
  }

  if (!data.destination) {
    errors.push('Destination is required');
  }

  if (!data.price || data.price <= 0) {
    errors.push('Price must be greater than 0');
  }

  if (!data.duration) {
    errors.push('Duration is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only POST allowed
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Auth check
    const session = await getServerSession(req, res, authOptions);
    if (!session || session.user?.role !== 'admin') {
      logger.warn('Unauthorized AdminV2 tour creation attempt');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const tourData: CreateTourRequest = req.body;

    // Validation
    const validation = validateTourData(tourData);
    if (!validation.valid) {
      logger.warn('AdminV2 tour creation validation failed', { errors: validation.errors });
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors: validation.errors,
      });
    }

    // Generate slug if not provided
    if (!tourData.slug) {
      tourData.slug = generateSlug(tourData.title);
    }

    // Create new tour
    const newTour = {
      id: `tour_${Date.now()}`,
      ...tourData,
      status: tourData.status || 'draft',
      featured: tourData.featured || false,
      rating: 0,
      reviewCount: 0,
      bookingCount: 0,
      images: tourData.images || [],
      highlights: tourData.highlights || [],
      included: tourData.included || [],
      excluded: tourData.excluded || [],
      language: tourData.language || ['tr'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: session.user.email,
    };

    logger.info('AdminV2 tour created successfully', {
      tourId: newTour.id,
      title: newTour.title,
      admin: session.user.email,
    });

    return res.status(201).json({
      success: true,
      data: newTour,
      message: 'Tour created successfully',
    });
  } catch (error) {
    logger.error('AdminV2 tour creation error', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
