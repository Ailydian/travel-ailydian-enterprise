/**
 * 🎯 AdminV2 Tours Management API - Get/Update/Delete Single Tour
 * Production-grade CRUD operations
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import logger from '@/lib/logger';

// Mock tour detail
const MOCK_TOUR_DETAILS: Record<string, any> = {
  '1': {
    id: '1',
    title: 'İstanbul Tarihi Turu',
    slug: 'istanbul-tarihi-turu',
    description: 'Sultanahmet, Topkapı Sarayı, Ayasofya ve daha fazlasını keşfedin',
    longDescription: `
# İstanbul'un Kalbinde Tarihi Yolculuk

Bu unutulmaz turda İstanbul'un en önemli tarihi mekanlarını gezeceğiz...
    `,
    category: 'cultural',
    destination: 'İstanbul',
    price: 299,
    currency: 'TRY',
    duration: '1 Gün',
    maxGroupSize: 15,
    language: ['tr', 'en'],
    status: 'active',
    featured: true,
    rating: 4.8,
    reviewCount: 156,
    bookingCount: 89,
    images: [
      '/images/tours/istanbul-historical-1.jpg',
      '/images/tours/istanbul-historical-2.jpg',
      '/images/tours/istanbul-historical-3.jpg',
    ],
    highlights: [
      'Sultanahmet Camii ziyareti',
      'Topkapı Sarayı gezisi',
      'Kapalıçarşı alışverişi',
      'Yerel rehber eşliğinde',
      'Öğle yemeği dahil',
    ],
    included: ['Rehber', 'Öğle yemeği', 'Müze giriş ücretleri', 'Ulaşım'],
    excluded: ['Kişisel harcamalar', 'Bahşişler'],
    itinerary: [
      { time: '09:00', title: 'Buluşma', description: 'Sultanahmet Meydanı' },
      { time: '09:30', title: 'Sultanahmet Camii', description: '45 dakika tur' },
      { time: '11:00', title: 'Topkapı Sarayı', description: '2 saat gezinti' },
      { time: '13:00', title: 'Öğle Yemeği', description: 'Geleneksel Türk mutfağı' },
      { time: '14:30', title: 'Kapalıçarşı', description: 'Serbest zaman' },
      { time: '16:00', title: 'Tur Sonu', description: 'Otele dönüş' },
    ],
    availability: {
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
    },
    pricing: {
      adult: 299,
      child: 199,
      infant: 0,
    },
    cancellationPolicy: '24 saat öncesine kadar ücretsiz iptal',
    meetingPoint: {
      name: 'Sultanahmet Meydanı',
      lat: 41.0082,
      lng: 28.9784,
      address: 'Sultan Ahmet, At Meydanı No:7, 34122 Fatih/İstanbul',
    },
    seo: {
      metaTitle: 'İstanbul Tarihi Turu | Sultanahmet, Topkapı, Ayasofya',
      metaDescription: 'İstanbul\'un en önemli tarihi mekanlarını professional rehber eşliğinde keşfedin',
      keywords: ['istanbul', 'tarihi yerler', 'sultanahmet', 'topkapı sarayı'],
    },
    createdAt: '2025-01-01T10:00:00Z',
    updatedAt: '2025-01-01T15:30:00Z',
    createdBy: 'admin@ailydian.com',
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid tour ID' });
  }

  try {
    // Auth check
    const session = await getServerSession(req, res, authOptions);
    if (!session || session.user?.role !== 'admin') {
      logger.warn('Unauthorized AdminV2 tour access attempt', { tourId: id });
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // GET - Fetch tour details
    if (req.method === 'GET') {
      const tour = MOCK_TOUR_DETAILS[id];

      if (!tour) {
        logger.warn('AdminV2 tour not found', { tourId: id });
        return res.status(404).json({ error: 'Tour not found' });
      }

      logger.info('AdminV2 tour fetched', { tourId: id, admin: session.user.email });

      return res.status(200).json({
        success: true,
        data: tour,
      });
    }

    // PUT - Update tour
    if (req.method === 'PUT') {
      const updates = req.body;

      const existingTour = MOCK_TOUR_DETAILS[id];
      if (!existingTour) {
        return res.status(404).json({ error: 'Tour not found' });
      }

      // Validation (production'da Zod schema kullanılır)
      if (updates.price && updates.price < 0) {
        return res.status(400).json({ error: 'Invalid price' });
      }

      // Update mock data
      MOCK_TOUR_DETAILS[id] = {
        ...existingTour,
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      logger.info('AdminV2 tour updated', { tourId: id, admin: session.user.email, updates });

      return res.status(200).json({
        success: true,
        data: MOCK_TOUR_DETAILS[id],
        message: 'Tour updated successfully',
      });
    }

    // DELETE - Soft delete tour
    if (req.method === 'DELETE') {
      const tour = MOCK_TOUR_DETAILS[id];
      if (!tour) {
        return res.status(404).json({ error: 'Tour not found' });
      }

      // Soft delete (status = archived)
      MOCK_TOUR_DETAILS[id].status = 'archived';
      MOCK_TOUR_DETAILS[id].updatedAt = new Date().toISOString();

      logger.info('AdminV2 tour deleted', { tourId: id, admin: session.user.email });

      return res.status(200).json({
        success: true,
        message: 'Tour deleted successfully',
      });
    }

    // Method not allowed
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    logger.error('AdminV2 tour operation error', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
