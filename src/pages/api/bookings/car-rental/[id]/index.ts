import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { PrismaClient } from '@prisma/client'
import { logger } from '../../../../../lib/logger/winston';

const prisma = new PrismaClient()

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
      booking = await prisma.carRentalBooking.findUnique({
        where: { bookingRef: id },
        include: {
          car: {
            select: {
              id: true,
              name: true,
              brand: true,
              model: true,
              year: true,
              category: true,
              transmission: true,
              fuelType: true,
              seats: true,
              doors: true,
              luggage: true,
              mainImage: true,
              images: true,
              features: true,
              airConditioning: true,
              gps: true,
              minimumAge: true,
              drivingLicenseYears: true,
            },
          },
        },
      })
    } else {
      booking = await prisma.carRentalBooking.findFirst({
        where: {
          id,
          userId: user.id,
        },
        include: {
          car: {
            select: {
              id: true,
              name: true,
              brand: true,
              model: true,
              year: true,
              category: true,
              transmission: true,
              fuelType: true,
              seats: true,
              doors: true,
              luggage: true,
              mainImage: true,
              images: true,
              features: true,
              airConditioning: true,
              gps: true,
              minimumAge: true,
              drivingLicenseYears: true,
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

    return res.status(200).json({
      success: true,
      booking,
    })
  } catch (error) {
    logger.error('Error fetching car rental booking:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
