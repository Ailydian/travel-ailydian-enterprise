/**
 * 🎯 AdminV2 Tours Management API - List Tours
 * Production-grade tour listing with filters, search, pagination
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import logger from '@/lib/logger';

// Types
interface TourListFilters {
  search?: string;
  category?: string;
  status?: 'draft' | 'active' | 'inactive' | 'archived';
  priceRange?: { min: number; max: number };
  destination?: string;
  dateRange?: { start: string; end: string };
}

interface TourListParams extends TourListFilters {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

// Mock data (gerçek DB yerine)
const MOCK_TOURS = [
  {
    id: '1',
    title: 'İstanbul Tarihi Turu',
    slug: 'istanbul-tarihi-turu',
    category: 'cultural',
    destination: 'İstanbul',
    price: 299,
    currency: 'TRY',
    duration: '1 Gün',
    status: 'active',
    featured: true,
    rating: 4.8,
    reviewCount: 156,
    bookingCount: 89,
    image: '/images/tours/istanbul-historical.jpg',
    createdAt: '2025-01-01T10:00:00Z',
    updatedAt: '2025-01-01T15:30:00Z',
  },
  {
    id: '2',
    title: 'Kapadokya Balon Turu',
    slug: 'kapadokya-balon-turu',
    category: 'adventure',
    destination: 'Kapadokya',
    price: 850,
    currency: 'TRY',
    duration: '4 Saat',
    status: 'active',
    featured: true,
    rating: 4.9,
    reviewCount: 342,
    bookingCount: 234,
    image: '/images/tours/cappadocia-balloon.jpg',
    createdAt: '2024-12-15T08:00:00Z',
    updatedAt: '2025-01-01T12:00:00Z',
  },
  {
    id: '3',
    title: 'Antalya Tekne Turu',
    slug: 'antalya-tekne-turu',
    category: 'beach',
    destination: 'Antalya',
    price: 450,
    currency: 'TRY',
    duration: '6 Saat',
    status: 'draft',
    featured: false,
    rating: 4.6,
    reviewCount: 78,
    bookingCount: 45,
    image: '/images/tours/antalya-boat.jpg',
    createdAt: '2024-12-20T14:00:00Z',
    updatedAt: '2024-12-28T09:00:00Z',
  },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only GET allowed
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Auth check
    const session = await getServerSession(req, res, authOptions);
    if (!session || session.user?.role !== 'admin') {
      logger.warn('Unauthorized AdminV2 tours list access attempt');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Parse query params
    const {
      page = '1',
      limit = '10',
      sortBy = 'updatedAt',
      sortOrder = 'desc',
      search,
      category,
      status,
      priceMin,
      priceMax,
      destination,
      dateStart,
      dateEnd,
    } = req.query;

    const params: TourListParams = {
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
      sortBy: sortBy as string,
      sortOrder: sortOrder as 'asc' | 'desc',
      search: search as string | undefined,
      category: category as string | undefined,
      status: status as 'draft' | 'active' | 'inactive' | 'archived' | undefined,
      destination: destination as string | undefined,
    };

    if (priceMin || priceMax) {
      params.priceRange = {
        min: priceMin ? parseInt(priceMin as string, 10) : 0,
        max: priceMax ? parseInt(priceMax as string, 10) : 999999,
      };
    }

    if (dateStart || dateEnd) {
      params.dateRange = {
        start: dateStart as string,
        end: dateEnd as string,
      };
    }

    logger.info('AdminV2 tours list request', { params, admin: session.user.email });

    // Filter & search logic
    let filtered = [...MOCK_TOURS];

    // Search filter
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(
        (tour) =>
          tour.title.toLowerCase().includes(searchLower) ||
          tour.destination.toLowerCase().includes(searchLower) ||
          tour.slug.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (params.category) {
      filtered = filtered.filter((tour) => tour.category === params.category);
    }

    // Status filter
    if (params.status) {
      filtered = filtered.filter((tour) => tour.status === params.status);
    }

    // Destination filter
    if (params.destination) {
      filtered = filtered.filter((tour) => tour.destination === params.destination);
    }

    // Price range filter
    if (params.priceRange) {
      filtered = filtered.filter(
        (tour) => tour.price >= params.priceRange!.min && tour.price <= params.priceRange!.max
      );
    }

    // Date range filter
    if (params.dateRange) {
      const { start, end } = params.dateRange;
      filtered = filtered.filter((tour) => {
        const tourDate = new Date(tour.createdAt);
        const startDate = start ? new Date(start) : new Date(0);
        const endDate = end ? new Date(end) : new Date();
        return tourDate >= startDate && tourDate <= endDate;
      });
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

    // Stats aggregation
    const stats = {
      total,
      totalPages,
      currentPage: params.page,
      pageSize: params.limit,
      activeCount: MOCK_TOURS.filter((t) => t.status === 'active').length,
      draftCount: MOCK_TOURS.filter((t) => t.status === 'draft').length,
      totalRevenue: MOCK_TOURS.reduce((sum, t) => sum + t.price * t.bookingCount, 0),
      totalBookings: MOCK_TOURS.reduce((sum, t) => sum + t.bookingCount, 0),
      avgRating: (MOCK_TOURS.reduce((sum, t) => sum + t.rating, 0) / MOCK_TOURS.length).toFixed(1),
    };

    logger.info('AdminV2 tours list success', { total, page: params.page });

    return res.status(200).json({
      success: true,
      data: {
        tours: paginated,
        stats,
        filters: params,
      },
    });
  } catch (error) {
    logger.error('AdminV2 tours list error', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
