import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { PrismaClient, BookingStatus } from '@prisma/client'
import { logger } from '../../../../../lib/logger/winston';

/**
 * SECURITY: V6 IDOR Protection Verified (CVSS 8.9)
 * Update Booking API
 *
 * This endpoint implements proper authorization checks to prevent
 * Insecure Direct Object Reference (IDOR) vulnerabilities.
 *
 * Protection measures:
 * 1. User authentication required (NextAuth session)
 * 2. User ownership verification via userId matching
 * 3. Prevents users from updating other users' bookings
 */

// Using singleton prisma

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // SECURITY V6: Authenticate user session
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
    const { specialRequests } = req.body

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid booking ID' })
    }

    // SECURITY V6 CRITICAL: Get existing booking with ownership verification
    // Filter by userId to prevent IDOR - users can ONLY update their own bookings
    const existingBooking = await prisma.rentalPropertyBooking.findFirst({
      where: {
        id,
        userId: user.id, // IDOR Protection
      },
    })

    if (!existingBooking) {
      // Don't reveal if booking exists for other users - generic error
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
    const updatedBooking = await prisma.rentalPropertyBooking.update({
      where: { id },
      data: {
        specialRequests: specialRequests || existingBooking.specialRequests,
        updatedAt: new Date(),
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
          },
        },
      },
    })

    return res.status(200).json({
      success: true,
      booking: updatedBooking,
    })
  } catch (error) {
    logger.error('Error updating property booking:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
