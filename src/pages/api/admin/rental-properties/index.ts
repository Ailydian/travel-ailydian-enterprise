import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * ADMIN RENTAL PROPERTIES API
 * GET - List all properties with filters
 * POST - Create new property
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
        minBedrooms,
        minPrice,
        maxPrice,
        wifi,
        pool,
        beachfront,
        instantBook,
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

      if (minBedrooms) {
        where.bedrooms = { gte: parseInt(minBedrooms as string) };
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

      if (pool === 'true') {
        where.pool = true;
      }

      if (beachfront === 'true') {
        where.beachfront = true;
      }

      if (instantBook === 'true') {
        where.instantBook = true;
      }

      if (isActive !== undefined) {
        where.isActive = isActive === 'true';
      }

      if (isFeatured !== undefined) {
        where.isFeatured = isFeatured === 'true';
      }

      if (search && typeof search === 'string') {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { city: { contains: search, mode: 'insensitive' } },
          { district: { contains: search, mode: 'insensitive' } },
          { hostName: { contains: search, mode: 'insensitive' } },
        ];
      }

      // Pagination
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;

      // Get total count
      const total = await prisma.rentalProperty.count({ where });

      // Fetch properties
      const properties = await prisma.rentalProperty.findMany({
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
        data: properties,
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
        title,
        slug,
        type,
        city,
        district,
        address,
        coordinates,
        guests,
        bedrooms,
        bathrooms,
        beds,
        squareMeters,
        basePrice,
        weeklyDiscount,
        monthlyDiscount,
        currency = 'TRY',
        cleaningFee = 0,
        securityDeposit = 0,
        // Amenities
        wifi = false,
        kitchen = false,
        parking = false,
        pool = false,
        airConditioning = false,
        heating = false,
        tv = false,
        washer = false,
        beachfront = false,
        seaview = false,
        balcony = false,
        // House Rules
        smokingAllowed = false,
        petsAllowed = false,
        partiesAllowed = false,
        childrenAllowed = true,
        // Booking
        instantBook = false,
        minimumStay = 1,
        maximumStay,
        checkInTime = '15:00',
        checkOutTime = '11:00',
        // Media
        mainImage,
        images = [],
        virtualTourUrl,
        // Host
        hostName,
        hostSuperhost = false,
        hostResponseTime,
        hostLanguages = [],
        // Status
        isActive = true,
        isFeatured = false,
        // Ratings
        overall = 0,
        cleanliness = 0,
        accuracy = 0,
        checkIn = 0,
        communication = 0,
        location = 0,
        value = 0,
        reviewCount = 0,
        // Price Comparison
        airbnbPrice,
        bookingPrice,
        agodaPrice,
        // SEO
        metaTitle,
        metaDescription,
        keywords = [],
      } = req.body;

      // Validate required fields
      if (
        !title ||
        !slug ||
        !type ||
        !city ||
        !district ||
        !address ||
        !guests ||
        !bedrooms ||
        !bathrooms ||
        !beds ||
        !basePrice ||
        !mainImage ||
        !hostName
      ) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields',
        });
      }

      // Check if slug already exists
      const existingProperty = await prisma.rentalProperty.findUnique({
        where: { slug },
      });

      if (existingProperty) {
        return res.status(400).json({
          success: false,
          error: 'A property with this slug already exists',
        });
      }

      // Create property
      const property = await prisma.rentalProperty.create({
        data: {
          title,
          slug,
          type,
          city,
          district,
          address,
          coordinates,
          guests: parseInt(guests),
          bedrooms: parseInt(bedrooms),
          bathrooms: parseInt(bathrooms),
          beds: parseInt(beds),
          squareMeters: squareMeters ? parseFloat(squareMeters) : null,
          basePrice: parseFloat(basePrice),
          weeklyDiscount: weeklyDiscount ? parseFloat(weeklyDiscount) : null,
          monthlyDiscount: monthlyDiscount ? parseFloat(monthlyDiscount) : null,
          currency,
          cleaningFee: parseFloat(cleaningFee),
          securityDeposit: parseFloat(securityDeposit),
          // Amenities
          wifi,
          kitchen,
          parking,
          pool,
          airConditioning,
          heating,
          tv,
          washer,
          beachfront,
          seaview,
          balcony,
          // House Rules
          smokingAllowed,
          petsAllowed,
          partiesAllowed,
          childrenAllowed,
          // Booking
          instantBook,
          minimumStay: parseInt(minimumStay),
          maximumStay: maximumStay ? parseInt(maximumStay) : null,
          checkInTime,
          checkOutTime,
          // Media
          mainImage,
          images,
          virtualTourUrl,
          // Host
          hostName,
          hostSuperhost,
          hostResponseTime,
          hostLanguages,
          // Status
          isActive,
          isFeatured,
          // Ratings
          overall: parseFloat(overall),
          cleanliness: parseFloat(cleanliness),
          accuracy: parseFloat(accuracy),
          checkIn: parseFloat(checkIn),
          communication: parseFloat(communication),
          location: parseFloat(location),
          value: parseFloat(value),
          reviewCount: parseInt(reviewCount),
          // Price Comparison
          airbnbPrice: airbnbPrice ? parseFloat(airbnbPrice) : null,
          bookingPrice: bookingPrice ? parseFloat(bookingPrice) : null,
          agodaPrice: agodaPrice ? parseFloat(agodaPrice) : null,
          // SEO
          metaTitle,
          metaDescription,
          keywords,
        },
      });

      return res.status(201).json({
        success: true,
        data: property,
        message: 'Rental property created successfully',
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Rental Properties Admin API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  } finally {
    await prisma.$disconnect();
  }
}
