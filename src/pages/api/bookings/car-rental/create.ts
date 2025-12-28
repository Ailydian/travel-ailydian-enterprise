import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { PrismaClient, BookingStatus, PaymentStatus } from '@prisma/client'
import { logger } from '../../../../lib/logger/winston'
import {
  generateBookingReference,
  calculateBookingPrice,
  validateBookingDates,
  checkAvailability,
  calculateNights,
} from '@/lib/utils/booking-utils'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const session = await getServerSession(req, res, authOptions)
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const {
      carId,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
      driverName,
      driverLicense,
      driverPhone,
      driverEmail,
      gpsRequested,
      childSeatRequested,
      additionalDriver,
      specialRequests,
      paymentMethod,
    } = req.body

    // Validate required fields
    if (
      !carId ||
      !pickupLocation ||
      !dropoffLocation ||
      !pickupDate ||
      !pickupTime ||
      !dropoffDate ||
      !dropoffTime ||
      !driverName ||
      !driverLicense ||
      !driverPhone ||
      !driverEmail
    ) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const pickupDateTime = new Date(pickupDate)
    const dropoffDateTime = new Date(dropoffDate)

    // Validate dates
    const dateValidation = validateBookingDates(pickupDateTime, dropoffDateTime)
    if (!dateValidation.valid) {
      return res.status(400).json({ error: dateValidation.error })
    }

    // Get car details
    const car = await prisma.carRental.findUnique({
      where: { id: carId },
    })

    if (!car) {
      return res.status(404).json({ error: 'Car not found' })
    }

    if (!car.isAvailable || !car.isActive) {
      return res.status(400).json({ error: 'Car is not available' })
    }

    // Check availability
    const availability = await checkAvailability(
      'car',
      carId,
      pickupDateTime,
      dropoffDateTime
    )

    if (!availability.available) {
      return res.status(409).json({
        error: 'Car is not available for selected dates',
        conflictingBookings: availability.conflictingBookings,
      })
    }

    // Calculate days
    const numberOfDays = calculateNights(pickupDateTime, dropoffDateTime)

    // Calculate pricing
    const pricing = calculateBookingPrice(
      parseFloat(car.pricePerDay.toString()),
      numberOfDays,
      { taxRate: 0.08, serviceFeeRate: 0 }
    )

    // Calculate extras
    let extrasTotal = 0
    if (gpsRequested) extrasTotal += 50 * numberOfDays // 50 TRY per day
    if (childSeatRequested) extrasTotal += 30 * numberOfDays // 30 TRY per day
    if (additionalDriver) extrasTotal += 100 // One-time fee

    const totalPrice = pricing.totalPrice + extrasTotal + parseFloat(car.deposit.toString())

    // Generate booking reference
    const bookingRef = await generateBookingReference()

    // Create booking
    const booking = await prisma.carRentalBooking.create({
      data: {
        userId: user.id,
        carId,
        bookingRef,
        pickupLocation,
        dropoffLocation,
        pickupDate: pickupDateTime,
        pickupTime,
        dropoffDate: dropoffDateTime,
        dropoffTime,
        dailyRate: car.pricePerDay,
        numberOfDays,
        subtotal: pricing.subtotal,
        tax: pricing.tax,
        deposit: car.deposit,
        totalPrice,
        currency: car.currency,
        gpsRequested: gpsRequested || false,
        childSeatRequested: childSeatRequested || false,
        additionalDriver: additionalDriver || false,
        extrasTotal,
        driverName,
        driverLicense,
        driverPhone,
        driverEmail,
        specialRequests,
        status: BookingStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        paymentMethod: paymentMethod || null,
      },
      include: {
        car: {
          select: {
            id: true,
            name: true,
            brand: true,
            model: true,
            category: true,
            mainImage: true,
            seats: true,
            transmission: true,
            fuelType: true,
            features: true,
          },
        },
      },
    })

    // TODO: Create payment intent with Stripe
    // TODO: Send confirmation email

    return res.status(201).json({
      success: true,
      booking: {
        id: booking.id,
        bookingRef: booking.bookingRef,
        status: booking.status,
        car: booking.car,
        pickupLocation: booking.pickupLocation,
        dropoffLocation: booking.dropoffLocation,
        pickupDate: booking.pickupDate,
        pickupTime: booking.pickupTime,
        dropoffDate: booking.dropoffDate,
        dropoffTime: booking.dropoffTime,
        numberOfDays: booking.numberOfDays,
        pricing: {
          dailyRate: booking.dailyRate,
          subtotal: booking.subtotal,
          tax: booking.tax,
          deposit: booking.deposit,
          extrasTotal: booking.extrasTotal,
          totalPrice: booking.totalPrice,
          currency: booking.currency,
        },
        extras: {
          gps: booking.gpsRequested,
          childSeat: booking.childSeatRequested,
          additionalDriver: booking.additionalDriver,
        },
      },
    })
  } catch (error) {
    logger.error('Error creating car rental booking:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
