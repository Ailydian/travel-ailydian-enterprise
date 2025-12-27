import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import logger from '../../../../lib/logger';

const prisma = new PrismaClient();

/**
 * SINGLE CAR RENTAL API
 * GET - Fetch single car
 * PUT - Update car
 * DELETE - Delete car
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Car ID is required',
    });
  }

  try {
    if (req.method === 'GET') {
      const car = await prisma.carRental.findUnique({
        where: { id },
        include: {
          bookings: {
            orderBy: { createdAt: 'desc' },
            take: 10,
          },
          _count: {
            select: { bookings: true },
          },
        },
      });

      if (!car) {
        return res.status(404).json({
          success: false,
          error: 'Car not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: car,
      });
    }

    if (req.method === 'PUT') {
      const {
        name,
        slug,
        description,
        shortDescription,
        brand,
        model,
        year,
        category,
        transmission,
        fuelType,
        seats,
        doors,
        luggage,
        features,
        airConditioning,
        gps,
        bluetooth,
        usbCharger,
        pricePerDay,
        pricePerWeek,
        pricePerMonth,
        currency,
        deposit,
        insuranceIncluded,
        insuranceType,
        pickupLocations,
        allowDifferentDropoff,
        availableCount,
        isAvailable,
        mainImage,
        images,
        minimumAge,
        drivingLicenseYears,
        requiredDocuments,
        unlimitedMileage,
        mileageLimit,
        isActive,
        isFeatured,
        isPopular,
        rating,
        reviewCount,
        metaTitle,
        metaDescription,
        keywords,
      } = req.body;

      // Check if car exists
      const existingCar = await prisma.carRental.findUnique({
        where: { id },
      });

      if (!existingCar) {
        return res.status(404).json({
          success: false,
          error: 'Car not found',
        });
      }

      // If slug is changing, check for conflicts
      if (slug && slug !== existingCar.slug) {
        const slugConflict = await prisma.carRental.findUnique({
          where: { slug },
        });

        if (slugConflict) {
          return res.status(400).json({
            success: false,
            error: 'A car with this slug already exists',
          });
        }
      }

      // Build update data
      const updateData: any = {};

      if (name !== undefined) updateData.name = name;
      if (slug !== undefined) updateData.slug = slug;
      if (description !== undefined) updateData.description = description;
      if (shortDescription !== undefined) updateData.shortDescription = shortDescription;
      if (brand !== undefined) updateData.brand = brand;
      if (model !== undefined) updateData.model = model;
      if (year !== undefined) updateData.year = parseInt(year);
      if (category !== undefined) updateData.category = category;
      if (transmission !== undefined) updateData.transmission = transmission;
      if (fuelType !== undefined) updateData.fuelType = fuelType;
      if (seats !== undefined) updateData.seats = parseInt(seats);
      if (doors !== undefined) updateData.doors = parseInt(doors);
      if (luggage !== undefined) updateData.luggage = parseInt(luggage);
      if (features !== undefined) updateData.features = features;
      if (airConditioning !== undefined) updateData.airConditioning = airConditioning;
      if (gps !== undefined) updateData.gps = gps;
      if (bluetooth !== undefined) updateData.bluetooth = bluetooth;
      if (usbCharger !== undefined) updateData.usbCharger = usbCharger;
      if (pricePerDay !== undefined) updateData.pricePerDay = parseFloat(pricePerDay);
      if (pricePerWeek !== undefined) updateData.pricePerWeek = pricePerWeek ? parseFloat(pricePerWeek) : null;
      if (pricePerMonth !== undefined) updateData.pricePerMonth = pricePerMonth ? parseFloat(pricePerMonth) : null;
      if (currency !== undefined) updateData.currency = currency;
      if (deposit !== undefined) updateData.deposit = parseFloat(deposit);
      if (insuranceIncluded !== undefined) updateData.insuranceIncluded = insuranceIncluded;
      if (insuranceType !== undefined) updateData.insuranceType = insuranceType;
      if (pickupLocations !== undefined) updateData.pickupLocations = pickupLocations;
      if (allowDifferentDropoff !== undefined) updateData.allowDifferentDropoff = allowDifferentDropoff;
      if (availableCount !== undefined) updateData.availableCount = parseInt(availableCount);
      if (isAvailable !== undefined) updateData.isAvailable = isAvailable;
      if (mainImage !== undefined) updateData.mainImage = mainImage;
      if (images !== undefined) updateData.images = images;
      if (minimumAge !== undefined) updateData.minimumAge = parseInt(minimumAge);
      if (drivingLicenseYears !== undefined) updateData.drivingLicenseYears = parseInt(drivingLicenseYears);
      if (requiredDocuments !== undefined) updateData.requiredDocuments = requiredDocuments;
      if (unlimitedMileage !== undefined) updateData.unlimitedMileage = unlimitedMileage;
      if (mileageLimit !== undefined) updateData.mileageLimit = mileageLimit ? parseInt(mileageLimit) : null;
      if (isActive !== undefined) updateData.isActive = isActive;
      if (isFeatured !== undefined) updateData.isFeatured = isFeatured;
      if (isPopular !== undefined) updateData.isPopular = isPopular;
      if (rating !== undefined) updateData.rating = parseFloat(rating);
      if (reviewCount !== undefined) updateData.reviewCount = parseInt(reviewCount);
      if (metaTitle !== undefined) updateData.metaTitle = metaTitle;
      if (metaDescription !== undefined) updateData.metaDescription = metaDescription;
      if (keywords !== undefined) updateData.keywords = keywords;

      // Update car
      const updatedCar = await prisma.carRental.update({
        where: { id },
        data: updateData,
      });

      return res.status(200).json({
        success: true,
        data: updatedCar,
        message: 'Car updated successfully',
      });
    }

    if (req.method === 'DELETE') {
      // Check if car exists
      const car = await prisma.carRental.findUnique({
        where: { id },
        include: {
          bookings: true,
        },
      });

      if (!car) {
        return res.status(404).json({
          success: false,
          error: 'Car not found',
        });
      }

      // Check if car has bookings
      if (car.bookings.length > 0) {
        return res.status(400).json({
          success: false,
          error: 'Cannot delete car with existing bookings. Set isActive to false instead.',
        });
      }

      // Delete car
      await prisma.carRental.delete({
        where: { id },
      });

      return res.status(200).json({
        success: true,
        message: 'Car deleted successfully',
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    logger.error('Car Rental API Error:', error as Error, {component:'Id'});
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  } finally {
    await prisma.$disconnect();
  }
}
