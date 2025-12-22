import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * SINGLE RENTAL PROPERTY API (ADMIN)
 * GET - Fetch single property with bookings
 * PUT - Update property
 * DELETE - Delete property
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Property ID is required',
    });
  }

  try {
    if (req.method === 'GET') {
      const property = await prisma.rentalProperty.findUnique({
        where: { id },
        include: {
          bookings: {
            orderBy: { createdAt: 'desc' },
            take: 20,
          },
          _count: {
            select: { bookings: true },
          },
        },
      });

      if (!property) {
        return res.status(404).json({
          success: false,
          error: 'Property not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: property,
      });
    }

    if (req.method === 'PUT') {
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
        currency,
        cleaningFee,
        securityDeposit,
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
        minimumStay,
        maximumStay,
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
        overall,
        cleanliness,
        accuracy,
        checkIn,
        communication,
        location,
        value,
        reviewCount,
        // Price Comparison
        airbnbPrice,
        bookingPrice,
        agodaPrice,
        // SEO
        metaTitle,
        metaDescription,
        keywords,
      } = req.body;

      // Check if property exists
      const existingProperty = await prisma.rentalProperty.findUnique({
        where: { id },
      });

      if (!existingProperty) {
        return res.status(404).json({
          success: false,
          error: 'Property not found',
        });
      }

      // If slug is changing, check for conflicts
      if (slug && slug !== existingProperty.slug) {
        const slugConflict = await prisma.rentalProperty.findUnique({
          where: { slug },
        });

        if (slugConflict) {
          return res.status(400).json({
            success: false,
            error: 'A property with this slug already exists',
          });
        }
      }

      // Build update data
      const updateData: any = {};

      if (title !== undefined) updateData.title = title;
      if (slug !== undefined) updateData.slug = slug;
      if (type !== undefined) updateData.type = type;
      if (city !== undefined) updateData.city = city;
      if (district !== undefined) updateData.district = district;
      if (address !== undefined) updateData.address = address;
      if (coordinates !== undefined) updateData.coordinates = coordinates;
      if (guests !== undefined) updateData.guests = parseInt(guests);
      if (bedrooms !== undefined) updateData.bedrooms = parseInt(bedrooms);
      if (bathrooms !== undefined) updateData.bathrooms = parseInt(bathrooms);
      if (beds !== undefined) updateData.beds = parseInt(beds);
      if (squareMeters !== undefined) updateData.squareMeters = squareMeters ? parseFloat(squareMeters) : null;
      if (basePrice !== undefined) updateData.basePrice = parseFloat(basePrice);
      if (weeklyDiscount !== undefined) updateData.weeklyDiscount = weeklyDiscount ? parseFloat(weeklyDiscount) : null;
      if (monthlyDiscount !== undefined) updateData.monthlyDiscount = monthlyDiscount ? parseFloat(monthlyDiscount) : null;
      if (currency !== undefined) updateData.currency = currency;
      if (cleaningFee !== undefined) updateData.cleaningFee = parseFloat(cleaningFee);
      if (securityDeposit !== undefined) updateData.securityDeposit = parseFloat(securityDeposit);

      // Amenities
      if (wifi !== undefined) updateData.wifi = wifi;
      if (kitchen !== undefined) updateData.kitchen = kitchen;
      if (parking !== undefined) updateData.parking = parking;
      if (pool !== undefined) updateData.pool = pool;
      if (airConditioning !== undefined) updateData.airConditioning = airConditioning;
      if (heating !== undefined) updateData.heating = heating;
      if (tv !== undefined) updateData.tv = tv;
      if (washer !== undefined) updateData.washer = washer;
      if (beachfront !== undefined) updateData.beachfront = beachfront;
      if (seaview !== undefined) updateData.seaview = seaview;
      if (balcony !== undefined) updateData.balcony = balcony;

      // House Rules
      if (smokingAllowed !== undefined) updateData.smokingAllowed = smokingAllowed;
      if (petsAllowed !== undefined) updateData.petsAllowed = petsAllowed;
      if (partiesAllowed !== undefined) updateData.partiesAllowed = partiesAllowed;
      if (childrenAllowed !== undefined) updateData.childrenAllowed = childrenAllowed;

      // Booking
      if (instantBook !== undefined) updateData.instantBook = instantBook;
      if (minimumStay !== undefined) updateData.minimumStay = parseInt(minimumStay);
      if (maximumStay !== undefined) updateData.maximumStay = maximumStay ? parseInt(maximumStay) : null;
      if (checkInTime !== undefined) updateData.checkInTime = checkInTime;
      if (checkOutTime !== undefined) updateData.checkOutTime = checkOutTime;

      // Media
      if (mainImage !== undefined) updateData.mainImage = mainImage;
      if (images !== undefined) updateData.images = images;
      if (virtualTourUrl !== undefined) updateData.virtualTourUrl = virtualTourUrl;

      // Host
      if (hostName !== undefined) updateData.hostName = hostName;
      if (hostSuperhost !== undefined) updateData.hostSuperhost = hostSuperhost;
      if (hostResponseTime !== undefined) updateData.hostResponseTime = hostResponseTime;
      if (hostLanguages !== undefined) updateData.hostLanguages = hostLanguages;

      // Status
      if (isActive !== undefined) updateData.isActive = isActive;
      if (isFeatured !== undefined) updateData.isFeatured = isFeatured;

      // Ratings
      if (overall !== undefined) updateData.overall = parseFloat(overall);
      if (cleanliness !== undefined) updateData.cleanliness = parseFloat(cleanliness);
      if (accuracy !== undefined) updateData.accuracy = parseFloat(accuracy);
      if (checkIn !== undefined) updateData.checkIn = parseFloat(checkIn);
      if (communication !== undefined) updateData.communication = parseFloat(communication);
      if (location !== undefined) updateData.location = parseFloat(location);
      if (value !== undefined) updateData.value = parseFloat(value);
      if (reviewCount !== undefined) updateData.reviewCount = parseInt(reviewCount);

      // Price Comparison
      if (airbnbPrice !== undefined) updateData.airbnbPrice = airbnbPrice ? parseFloat(airbnbPrice) : null;
      if (bookingPrice !== undefined) updateData.bookingPrice = bookingPrice ? parseFloat(bookingPrice) : null;
      if (agodaPrice !== undefined) updateData.agodaPrice = agodaPrice ? parseFloat(agodaPrice) : null;

      // SEO
      if (metaTitle !== undefined) updateData.metaTitle = metaTitle;
      if (metaDescription !== undefined) updateData.metaDescription = metaDescription;
      if (keywords !== undefined) updateData.keywords = keywords;

      // Update property
      const updatedProperty = await prisma.rentalProperty.update({
        where: { id },
        data: updateData,
      });

      return res.status(200).json({
        success: true,
        data: updatedProperty,
        message: 'Property updated successfully',
      });
    }

    if (req.method === 'DELETE') {
      // Check if property exists
      const property = await prisma.rentalProperty.findUnique({
        where: { id },
        include: {
          bookings: true,
        },
      });

      if (!property) {
        return res.status(404).json({
          success: false,
          error: 'Property not found',
        });
      }

      // Check if property has bookings
      if (property.bookings.length > 0) {
        return res.status(400).json({
          success: false,
          error: 'Cannot delete property with existing bookings. Set isActive to false instead.',
        });
      }

      // Delete property
      await prisma.rentalProperty.delete({
        where: { id },
      });

      return res.status(200).json({
        success: true,
        message: 'Property deleted successfully',
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Rental Property Admin API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  } finally {
    await prisma.$disconnect();
  }
}
