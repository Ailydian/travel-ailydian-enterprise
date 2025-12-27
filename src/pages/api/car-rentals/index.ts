import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import logger from '../../../lib/logger';

const prisma = new PrismaClient();

/**
 * PUBLIC CAR RENTALS API
 * Frontend API for browsing available cars
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const {
        category,
        brand,
        transmission,
        fuelType,
        minSeats,
        maxPrice,
        pickupLocation,
        search,
        page = '1',
        limit = '12',
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = req.query;

      // Build where clause - only show active cars
      const where: any = {
        isActive: true,
        isAvailable: true,
      };

      if (category) {
        where.category = category;
      }

      if (brand) {
        where.brand = brand;
      }

      if (transmission) {
        where.transmission = transmission;
      }

      if (fuelType) {
        where.fuelType = fuelType;
      }

      if (minSeats) {
        where.seats = { gte: parseInt(minSeats as string) };
      }

      if (maxPrice) {
        where.pricePerDay = { lte: parseFloat(maxPrice as string) };
      }

      if (pickupLocation && typeof pickupLocation === 'string') {
        where.pickupLocations = {
          has: pickupLocation,
        };
      }

      if (search && typeof search === 'string') {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { brand: { contains: search, mode: 'insensitive' } },
          { model: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ];
      }

      // Pagination
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;

      // Get total count
      const total = await prisma.carRental.count({ where });

      // Fetch cars
      const cars = await prisma.carRental.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: {
          [sortBy as string]: sortOrder,
        },
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          shortDescription: true,
          brand: true,
          model: true,
          year: true,
          category: true,
          transmission: true,
          fuelType: true,
          seats: true,
          doors: true,
          luggage: true,
          features: true,
          airConditioning: true,
          gps: true,
          bluetooth: true,
          usbCharger: true,
          pricePerDay: true,
          pricePerWeek: true,
          pricePerMonth: true,
          currency: true,
          deposit: true,
          insuranceIncluded: true,
          mainImage: true,
          images: true,
          rating: true,
          reviewCount: true,
          isPopular: true,
          isFeatured: true,
          pickupLocations: true,
        },
      });

      // Get featured cars if no filters
      let featuredCars = [];
      if (pageNum === 1 && !search && !category) {
        featuredCars = await prisma.carRental.findMany({
          where: {
            isActive: true,
            isFeatured: true,
          },
          take: 6,
          orderBy: { rating: 'desc' },
          select: {
            id: true,
            name: true,
            slug: true,
            brand: true,
            model: true,
            category: true,
            pricePerDay: true,
            currency: true,
            mainImage: true,
            rating: true,
            reviewCount: true,
          },
        });
      }

      return res.status(200).json({
        success: true,
        data: cars,
        featured: featuredCars,
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
    logger.error('Car Rentals Public API Error:', error as Error, {component:'Index'});
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  } finally {
    await prisma.$disconnect();
  }
}
