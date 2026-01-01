import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { withRateLimit, groqRateLimiter } from '@/lib/middleware/rate-limiter';
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { PrismaClient, BookingStatus, PaymentStatus, TransferType } from '@prisma/client'
import { generateBookingReference } from '@/lib/utils/booking-utils'

// Using singleton prisma

async function handler(req: NextApiRequest, res: NextApiResponse) {
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
      transferId,
      vehicleId,
      transferType,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      passengerCount,
      luggageCount,
      flightNumber,
      arrivalTime,
      isVIP,
      specialRequests,
      paymentMethod,
    } = req.body

    // Validate required fields
    if (
      !transferId ||
      !vehicleId ||
      !pickupLocation ||
      !dropoffLocation ||
      !pickupDate ||
      !pickupTime ||
      !passengerCount ||
      !luggageCount
    ) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Validate transfer type
    const transferTypeValue = (transferType || 'ONE_WAY') as TransferType
    if (!['ONE_WAY', 'ROUND_TRIP'].includes(transferTypeValue)) {
      return res.status(400).json({ error: 'Invalid transfer type' })
    }

    // For round trip, validate return details
    if (transferTypeValue === 'ROUND_TRIP' && (!returnDate || !returnTime)) {
      return res.status(400).json({
        error: 'Return date and time required for round trip',
      })
    }

    const pickupDateTime = new Date(pickupDate)

    // Get transfer details
    const transfer = await prisma.airportTransfer.findUnique({
      where: { id: transferId },
    })

    if (!transfer) {
      return res.status(404).json({ error: 'Transfer not found' })
    }

    if (!transfer.isActive) {
      return res.status(400).json({ error: 'Transfer is not available' })
    }

    // Get vehicle details
    const vehicle = await prisma.transferVehicle.findUnique({
      where: { id: vehicleId },
    })

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' })
    }

    if (!vehicle.isAvailable) {
      return res.status(400).json({ error: 'Vehicle is not available' })
    }

    // Check capacity
    if (passengerCount > vehicle.capacity) {
      return res.status(400).json({
        error: `Vehicle can accommodate maximum ${vehicle.capacity} passengers`,
      })
    }

    if (luggageCount > vehicle.luggageCapacity) {
      return res.status(400).json({
        error: `Vehicle can accommodate maximum ${vehicle.luggageCapacity} luggage items`,
      })
    }

    // Calculate pricing
    const basePrice = isVIP
      ? parseFloat(vehicle.priceVIP.toString())
      : parseFloat(vehicle.priceStandard.toString())

    const totalPrice =
      transferTypeValue === 'ROUND_TRIP' ? basePrice * 2 : basePrice

    // Generate booking reference
    const bookingRef = await generateBookingReference()

    // Create booking
    const booking = await prisma.transferBooking.create({
      data: {
        userId: user.id,
        transferId,
        vehicleId,
        bookingRef,
        transferType: transferTypeValue,
        pickupLocation,
        dropoffLocation,
        pickupDate: pickupDateTime,
        pickupTime,
        returnDate: returnDate ? new Date(returnDate) : null,
        returnTime: returnTime || null,
        passengerCount,
        luggageCount,
        flightNumber: flightNumber || null,
        arrivalTime: arrivalTime || null,
        basePrice,
        totalPrice,
        currency: 'TRY',
        isVIP: isVIP || false,
        specialRequests,
        status: BookingStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        paymentMethod: paymentMethod || null,
      },
      include: {
        transfer: {
          select: {
            id: true,
            name: true,
            fromLocation: true,
            toLocation: true,
            distance: true,
            duration: true,
            region: true,
          },
        },
        vehicle: {
          select: {
            id: true,
            vehicleType: true,
            name: true,
            capacity: true,
            luggageCapacity: true,
            features: true,
            image: true,
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
        transfer: booking.transfer,
        vehicle: booking.vehicle,
        transferType: booking.transferType,
        pickupLocation: booking.pickupLocation,
        dropoffLocation: booking.dropoffLocation,
        pickupDate: booking.pickupDate,
        pickupTime: booking.pickupTime,
        returnDate: booking.returnDate,
        returnTime: booking.returnTime,
        passengerCount: booking.passengerCount,
        luggageCount: booking.luggageCount,
        flightNumber: booking.flightNumber,
        arrivalTime: booking.arrivalTime,
        pricing: {
          basePrice: booking.basePrice,
          totalPrice: booking.totalPrice,
          currency: booking.currency,
          isVIP: booking.isVIP,
        },
      },
    })
  } catch (error) {
    console.error('Error creating transfer booking:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export default withRateLimit(handler, groqRateLimiter);
