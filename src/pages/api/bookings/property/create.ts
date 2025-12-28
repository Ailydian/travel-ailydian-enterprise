import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { PrismaClient, BookingStatus, PaymentStatus } from '@prisma/client'
import { logger } from '../../../../lib/logger/winston'
import {
  generateBookingReference,
  calculateNights,
  calculateBookingPrice,
  validateBookingDates,
  checkAvailability,
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
      propertyId,
      checkIn,
      checkOut,
      numberOfGuests,
      guestName,
      guestPhone,
      guestEmail,
      specialRequests,
      paymentMethod,
    } = req.body

    // Validate required fields
    if (!propertyId || !checkIn || !checkOut || !numberOfGuests) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)

    // Validate dates
    const dateValidation = validateBookingDates(checkInDate, checkOutDate)
    if (!dateValidation.valid) {
      return res.status(400).json({ error: dateValidation.error })
    }

    // Get property details
    const property = await prisma.rentalProperty.findUnique({
      where: { id: propertyId },
    })

    if (!property) {
      return res.status(404).json({ error: 'Property not found' })
    }

    if (!property.isActive) {
      return res.status(400).json({ error: 'Property is not available' })
    }

    // Check availability
    const availability = await checkAvailability(
      'property',
      propertyId,
      checkInDate,
      checkOutDate
    )

    if (!availability.available) {
      return res.status(409).json({
        error: 'Property is not available for selected dates',
        conflictingBookings: availability.conflictingBookings,
      })
    }

    // Check guest capacity
    if (numberOfGuests > property.guests) {
      return res.status(400).json({
        error: `Property can accommodate maximum ${property.guests} guests`,
      })
    }

    // Calculate pricing
    const numberOfNights = calculateNights(checkInDate, checkOutDate)
    const pricing = calculateBookingPrice(
      parseFloat(property.basePrice.toString()),
      numberOfNights,
      {
        taxRate: 0.08,
        serviceFeeRate: 0.05,
        cleaningFee: parseFloat(property.cleaningFee.toString()),
      }
    )

    // Generate booking reference
    const bookingRef = await generateBookingReference()

    // Create booking
    const booking = await prisma.rentalPropertyBooking.create({
      data: {
        userId: user.id,
        propertyId,
        bookingRef,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        numberOfNights,
        numberOfGuests,
        nightlyRate: property.basePrice,
        subtotal: pricing.subtotal,
        cleaningFee: property.cleaningFee,
        serviceFee: pricing.serviceFee,
        tax: pricing.tax,
        totalPrice: pricing.totalPrice,
        currency: property.currency,
        guestName: guestName || user.name || '',
        guestPhone: guestPhone || user.phone || '',
        guestEmail: guestEmail || user.email,
        specialRequests,
        status: BookingStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        paymentMethod: paymentMethod || null,
      },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            type: true,
            mainImage: true,
            city: true,
            district: true,
            checkInTime: true,
            checkOutTime: true,
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
        property: booking.property,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        numberOfNights: booking.numberOfNights,
        numberOfGuests: booking.numberOfGuests,
        pricing: {
          nightlyRate: booking.nightlyRate,
          subtotal: booking.subtotal,
          cleaningFee: booking.cleaningFee,
          serviceFee: booking.serviceFee,
          tax: booking.tax,
          totalPrice: booking.totalPrice,
          currency: booking.currency,
        },
      },
    })
  } catch (error) {
    logger.error('Error creating property booking:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
