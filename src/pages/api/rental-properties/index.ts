import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import logger from '../../../../../lib/logger';

const prisma = new PrismaClient();

/**
 * PUBLIC RENTAL PROPERTIES API
 * Frontend API for browsing available properties
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const {
        type,
        city,
        district,
        minGuests,
        maxGuests,
        bedrooms,
        minPrice,
        maxPrice,
        // Amenities
        wifi,
        kitchen,
        parking,
        pool,
        airConditioning,
        beachfront,
        seaview,
        instantBook,
        superhost,
        search,
        page = '1',
        limit = '12',
        sortBy = 'overall',
        sortOrder = 'desc'
      } = req.query;

      // Build where clause - only show active properties
      const where: any = {
        isActive: true,
      };

      if (type) {
        where.type = type;
      }

      if (city && typeof city === 'string') {
        where.city = { contains: city, mode: 'insensitive' };
      }

      if (district && typeof district === 'string') {
        where.district = { contains: district, mode: 'insensitive' };
      }

      if (minGuests) {
        where.guests = { gte: parseInt(minGuests as string) };
      }

      if (maxGuests) {
        if (!where.guests) where.guests = {};
        where.guests.lte = parseInt(maxGuests as string);
      }

      if (bedrooms) {
        where.bedrooms = parseInt(bedrooms as string);
      }

      if (minPrice) {
        where.basePrice = { gte: parseFloat(minPrice as string) };
      }

      if (maxPrice) {
        if (!where.basePrice) where.basePrice = {};
        where.basePrice.lte = parseFloat(maxPrice as string);
      }

      // Amenities filters
      if (wifi === 'true') {
        where.wifi = true;
      }

      if (kitchen === 'true') {
        where.kitchen = true;
      }

      if (parking === 'true') {
        where.parking = true;
      }

      if (pool === 'true') {
        where.pool = true;
      }

      if (airConditioning === 'true') {
        where.airConditioning = true;
      }

      if (beachfront === 'true') {
        where.beachfront = true;
      }

      if (seaview === 'true') {
        where.seaview = true;
      }

      if (instantBook === 'true') {
        where.instantBook = true;
      }

      if (superhost === 'true') {
        where.hostSuperhost = true;
      }

      if (search && typeof search === 'string') {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { city: { contains: search, mode: 'insensitive' } },
          { district: { contains: search, mode: 'insensitive' } },
          { address: { contains: search, mode: 'insensitive' } },
          { hostName: { contains: search, mode: 'insensitive' } },
        ];
      }

      // Pagination
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;

      // Get total count
      const total = await prisma.rentalProperty.count({ where });

      // Fetch properties with selected fields for performance
      const properties = await prisma.rentalProperty.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: {
          [sortBy as string]: sortOrder,
        },
        select: {
          id: true,
          title: true,
          slug: true,
          type: true,
          city: true,
          district: true,
          guests: true,
          bedrooms: true,
          bathrooms: true,
          beds: true,
          basePrice: true,
          weeklyDiscount: true,
          monthlyDiscount: true,
          currency: true,
          cleaningFee: true,
          // Amenities
          wifi: true,
          kitchen: true,
          parking: true,
          pool: true,
          airConditioning: true,
          heating: true,
          tv: true,
          washer: true,
          beachfront: true,
          seaview: true,
          balcony: true,
          // Booking
          instantBook: true,
          minimumStay: true,
          checkInTime: true,
          checkOutTime: true,
          // Media
          mainImage: true,
          images: true,
          // Host
          hostName: true,
          hostSuperhost: true,
          hostResponseTime: true,
          // Ratings
          overall: true,
          cleanliness: true,
          accuracy: true,
          checkIn: true,
          communication: true,
          location: true,
          value: true,
          reviewCount: true,
          // Price Comparison
          airbnbPrice: true,
          bookingPrice: true,
          agodaPrice: true,
          isFeatured: true,
        },
      });

      // Get featured properties if no filters
      let featuredProperties = [];
      if (pageNum === 1 && !search && !city) {
        featuredProperties = await prisma.rentalProperty.findMany({
          where: {
            isActive: true,
            isFeatured: true,
          },
          take: 6,
          orderBy: { overall: 'desc' },
          select: {
            id: true,
            title: true,
            slug: true,
            type: true,
            city: true,
            district: true,
            guests: true,
            bedrooms: true,
            bathrooms: true,
            basePrice: true,
            currency: true,
            mainImage: true,
            overall: true,
            reviewCount: true,
            instantBook: true,
            hostSuperhost: true,
          },
        });
      }

      // Get popular cities/destinations
      let popularDestinations = [];
      if (pageNum === 1 && !city) {
        const cityAggregation = await prisma.rentalProperty.groupBy({
          by: ['city'],
          where: { isActive: true },
          _count: {
            id: true,
          },
          orderBy: {
            _count: {
              id: 'desc',
            },
          },
          take: 8,
        });

        popularDestinations = cityAggregation.map(item => ({
          city: item.city,
          count: item._count.id,
        }));
      }

      return res.status(200).json({
        success: true,
        data: properties,
        featured: featuredProperties,
        popularDestinations,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum),
        },
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    logger.error('Rental Properties Public API Error:', error as Error, {component:'Index'});
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  } finally {
    await prisma.$disconnect();
  }
}
