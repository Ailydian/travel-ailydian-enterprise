import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { prisma } from '@/lib/prisma'; //  from '@prisma/client'
import { logger } from '../../../../../lib/logger/winston';

/**
 * SECURITY: V6 IDOR Protection Verified (CVSS 8.9)
 * Get Booking by ID API
 *
 * This endpoint implements proper authorization checks to prevent
 * Insecure Direct Object Reference (IDOR) vulnerabilities.
 *
 * Protection measures:
 * 1. User authentication required (NextAuth session)
 * 2. User ownership verification via userId matching
 * 3. Explicit authorization check before returning data
 */

// Using singleton prisma

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
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

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid booking ID' })
    }

    // SECURITY V6: Get booking with ownership verification
    let booking
    if (id.startsWith('BK-')) {
      booking = await prisma.rentalPropertyBooking.findUnique({
        where: { bookingRef: id },
        include: {
          property: {
            select: {
              id: true,
              title: true,
              type: true,
              mainImage: true,
              images: true,
              city: true,
              district: true,
              address: true,
              checkInTime: true,
              checkOutTime: true,
              hostName: true,
              hostLanguages: true,
            },
          },
        },
      })
    } else {
      booking = await prisma.rentalPropertyBooking.findFirst({
        where: {
          id,
          // SECURITY V6 CRITICAL: Filter by userId to prevent IDOR
          // This ensures users can ONLY access their own bookings
          userId: user.id,
        },
        include: {
          property: {
            select: {
              id: true,
              title: true,
              type: true,
              mainImage: true,
              images: true,
              city: true,
              district: true,
              address: true,
              checkInTime: true,
              checkOutTime: true,
              hostName: true,
              hostLanguages: true,
            },
          },
        },
      })
    }

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' })
    }

    // SECURITY V6 CRITICAL: Double-check ownership (defense in depth)
    // Even if the query above filters by userId, we verify again as a safety measure
    // This prevents IDOR attacks where users try to access other users' bookings
    if (booking.userId !== user.id) {
      logger.warn('IDOR attempt detected - booking access denied', {
        userId: user.id,
        bookingId: id,
        bookingUserId: booking.userId,
        component: 'BookingAPI',
      });
      return res.status(403).json({ error: 'Access denied' })
    }

    return res.status(200).json({
      success: true,
      booking,
    })
  } catch (error) {
    logger.error('Error fetching property booking:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
