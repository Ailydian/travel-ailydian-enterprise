import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { PrismaClient, BookingType } from '@prisma/client'

// Using singleton prisma

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
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

    const { id } = req.query

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid booking ID' })
    }

    // Get booking by ID or reference
    let booking
    if (id.startsWith('BK-')) {
      booking = await prisma.booking.findUnique({
        where: { bookingReference: id },
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
    } else {
      booking = await prisma.booking.findFirst({
        where: {
          id,
          userId: user.id,
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
    }

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' })
    }

    // Check if user owns this booking
    if (booking.userId !== user.id) {
      return res.status(403).json({ error: 'Access denied' })
    }

    // Verify it's a flight booking
    if (booking.bookingType !== BookingType.FLIGHT) {
      return res.status(400).json({ error: 'Not a flight booking' })
    }

    // Get flight details from metadata
    const flightData = booking.metaData as any
    const flightId = flightData?.flightId

    let flightDetails = null
    if (flightId) {
      flightDetails = await prisma.flight.findUnique({
        where: { id: flightId },
        select: {
          id: true,
          flightNumber: true,
          airline: true,
          airlineCode: true,
          airlineLogo: true,
          departureAirport: true,
          departureCity: true,
          departureTime: true,
          departureTerminal: true,
          arrivalAirport: true,
          arrivalCity: true,
          arrivalTime: true,
          arrivalTerminal: true,
          duration: true,
          aircraft: true,
          cabinClass: true,
          carryOnBaggage: true,
          checkedBaggage: true,
        },
      })
    }

    return res.status(200).json({
      success: true,
      booking: {
        ...booking,
        flight: flightDetails,
      },
    })
  } catch (error) {
    console.error('Error fetching flight booking:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
