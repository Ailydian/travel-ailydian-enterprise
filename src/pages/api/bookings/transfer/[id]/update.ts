import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { PrismaClient, BookingStatus } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
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
    const { specialRequests, flightNumber, arrivalTime } = req.body

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid booking ID' })
    }

    // Get existing booking
    const existingBooking = await prisma.transferBooking.findFirst({
      where: {
        id,
        userId: user.id,
      },
    })

    if (!existingBooking) {
      return res.status(404).json({ error: 'Booking not found' })
    }

    // Check if booking can be updated
    if (
      existingBooking.status === BookingStatus.CANCELLED ||
      existingBooking.status === BookingStatus.COMPLETED
    ) {
      return res.status(400).json({
        error: 'Cannot update cancelled or completed bookings',
      })
    }

    // Update booking
    const updatedBooking = await prisma.transferBooking.update({
      where: { id },
      data: {
        specialRequests: specialRequests || existingBooking.specialRequests,
        flightNumber: flightNumber || existingBooking.flightNumber,
        arrivalTime: arrivalTime || existingBooking.arrivalTime,
        updatedAt: new Date(),
      },
      include: {
        transfer: {
          select: {
            id: true,
            name: true,
            fromLocation: true,
            toLocation: true,
          },
        },
        vehicle: {
          select: {
            id: true,
            name: true,
            vehicleType: true,
          },
        },
      },
    })

    return res.status(200).json({
      success: true,
      booking: updatedBooking,
    })
  } catch (error) {
    console.error('Error updating transfer booking:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
