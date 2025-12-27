import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import logger from '../../../../lib/logger';

const prisma = new PrismaClient();

/**
 * CAR RENTALS ADMIN API
 * Full CRUD operations for car rental management
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const {
        category,
        isActive,
        isFeatured,
        search,
        page = '1',
        limit = '20',
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = req.query;

      // Build where clause
      const where: any = {};

      if (category) {
        where.category = category;
      }

      if (isActive !== undefined) {
        where.isActive = isActive === 'true';
      }

      if (isFeatured !== undefined) {
        where.isFeatured = isFeatured === 'true';
      }

      if (search && typeof search === 'string') {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { brand: { contains: search, mode: 'insensitive' } },
          { model: { contains: search, mode: 'insensitive' } },
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
        include: {
          _count: {
            select: { bookings: true },
          },
        },
      });

      return res.status(200).json({
        success: true,
        data: cars,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum),
        },
      });
    }

    if (req.method === 'POST') {
      const {
        name,
        slug,
        description,
        shortDescription,
        brand,
        model,
        year,
        category,
        transmission = 'AUTOMATIC',
        fuelType = 'GASOLINE',
        seats,
        doors,
        luggage,
        features = [],
        airConditioning = true,
        gps = false,
        bluetooth = false,
        usbCharger = false,
        pricePerDay,
        pricePerWeek,
        pricePerMonth,
        currency = 'TRY',
        deposit = 0,
        insuranceIncluded = true,
        insuranceType,
        pickupLocations = [],
        allowDifferentDropoff = true,
        availableCount = 1,
        isAvailable = true,
        mainImage,
        images = [],
        minimumAge = 21,
        drivingLicenseYears = 1,
        requiredDocuments = [],
        unlimitedMileage = true,
        mileageLimit,
        isActive = true,
        isFeatured = false,
        isPopular = false,
        metaTitle,
        metaDescription,
        keywords = [],
      } = req.body;

      // Validate required fields
      if (!name || !slug || !description || !brand || !model || !year || !category || !seats || !doors || !luggage || !pricePerDay || !mainImage) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields',
        });
      }

      // Check if slug already exists
      const existingCar = await prisma.carRental.findUnique({
        where: { slug },
      });

      if (existingCar) {
        return res.status(400).json({
          success: false,
          error: 'A car with this slug already exists',
        });
      }

      // Create car rental
      const car = await prisma.carRental.create({
        data: {
          name,
          slug,
          description,
          shortDescription,
          brand,
          model,
          year: parseInt(year),
          category,
          transmission,
          fuelType,
          seats: parseInt(seats),
          doors: parseInt(doors),
          luggage: parseInt(luggage),
          features,
          airConditioning,
          gps,
          bluetooth,
          usbCharger,
          pricePerDay: parseFloat(pricePerDay),
          pricePerWeek: pricePerWeek ? parseFloat(pricePerWeek) : null,
          pricePerMonth: pricePerMonth ? parseFloat(pricePerMonth) : null,
          currency,
          deposit: parseFloat(deposit),
          insuranceIncluded,
          insuranceType,
          pickupLocations,
          allowDifferentDropoff,
          availableCount: parseInt(availableCount),
          isAvailable,
          mainImage,
          images,
          minimumAge: parseInt(minimumAge),
          drivingLicenseYears: parseInt(drivingLicenseYears),
          requiredDocuments,
          unlimitedMileage,
          mileageLimit: mileageLimit ? parseInt(mileageLimit) : null,
          isActive,
          isFeatured,
          isPopular,
          metaTitle,
          metaDescription,
          keywords,
        },
      });

      return res.status(201).json({
        success: true,
        data: car,
        message: 'Car rental created successfully',
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    logger.error('Car Rentals API Error:', error as Error, {component:'Index'});
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  } finally {
    await prisma.$disconnect();
  }
}
