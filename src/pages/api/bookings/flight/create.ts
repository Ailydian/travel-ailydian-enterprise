import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { PrismaClient, BookingStatus, PaymentStatus, BookingType } from '@prisma/client'
import { generateBookingReference } from '@/lib/utils/booking-utils'

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
      flightId,
      passengers,
      contactInfo,
      baggageOptions,
      seatPreferences,
      specialRequests,
      paymentMethod,
    } = req.body

    // Validate required fields
    if (!flightId || !passengers || passengers.length === 0 || !contactInfo) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Get flight details
    const flight = await prisma.flight.findUnique({
      where: { id: flightId },
    })

    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' })
    }

    if (!flight.isActive) {
      return res.status(400).json({ error: 'Flight is not available' })
    }

    // Check available seats
    if (passengers.length > flight.availableSeats) {
      return res.status(400).json({
        error: `Only ${flight.availableSeats} seats available`,
      })
    }

    // Calculate total price
    let totalPrice = 0
    const passengerBreakdown = {
      adults: 0,
      children: 0,
      infants: 0,
    }

    passengers.forEach((passenger: any) => {
      if (passenger.type === 'adult') {
        totalPrice += parseFloat(flight.priceAdult.toString())
        passengerBreakdown.adults++
      } else if (passenger.type === 'child') {
        totalPrice += parseFloat(flight.priceChild.toString())
        passengerBreakdown.children++
      } else if (passenger.type === 'infant') {
        totalPrice += parseFloat(flight.priceInfant.toString())
        passengerBreakdown.infants++
      }
    })

    // Add baggage fees if any
    let baggageFee = 0
    if (baggageOptions?.extraBaggage > 0 && flight.extraBaggagePrice) {
      baggageFee = parseFloat(flight.extraBaggagePrice.toString()) * baggageOptions.extraBaggage
      totalPrice += baggageFee
    }

    // Generate booking reference
    const bookingRef = await generateBookingReference()

    // Create booking in Booking table
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        bookingType: BookingType.FLIGHT,
        bookingReference: bookingRef,
        totalAmount: totalPrice,
        currency: flight.currency,
        paymentMethod: paymentMethod as any,
        status: BookingStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        guestCount: passengers.length,
        specialRequests,
        metaData: {
          flightId: flight.id,
          flightNumber: flight.flightNumber,
          airline: flight.airline,
          airlineCode: flight.airlineCode,
          departureAirport: flight.departureAirport,
          arrivalAirport: flight.arrivalAirport,
          departureTime: flight.departureTime.toISOString(),
          arrivalTime: flight.arrivalTime.toISOString(),
          duration: flight.duration,
          cabinClass: flight.cabinClass,
          passengers,
          contactInfo,
          passengerBreakdown,
          baggageOptions,
          baggageFee,
          seatPreferences,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    })

    // TODO: Update flight available seats
    // await prisma.flight.update({
    //   where: { id: flightId },
    //   data: { availableSeats: flight.availableSeats - passengers.length }
    // })

    // TODO: Create payment intent with Stripe
    // TODO: Send confirmation email with e-ticket

    return res.status(201).json({
      success: true,
      booking: {
        id: booking.id,
        bookingRef: booking.bookingReference,
        status: booking.status,
        flight: {
          flightNumber: flight.flightNumber,
          airline: flight.airline,
          departureAirport: flight.departureAirport,
          arrivalAirport: flight.arrivalAirport,
          departureTime: flight.departureTime,
          arrivalTime: flight.arrivalTime,
          duration: flight.duration,
          cabinClass: flight.cabinClass,
        },
        passengers: passengerBreakdown,
        pricing: {
          subtotal: totalPrice - baggageFee,
          baggageFee,
          totalPrice,
          currency: flight.currency,
        },
      },
    })
  } catch (error) {
    console.error('Error creating flight booking:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
