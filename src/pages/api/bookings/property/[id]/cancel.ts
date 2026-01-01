import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { PrismaClient, BookingStatus, PaymentStatus } from '@prisma/client'
import { canCancelBooking, calculateRefund } from '@/lib/utils/booking-utils'
import { logger } from '../../../../../lib/logger/winston';

/**
 * SECURITY: V6 IDOR Protection Verified (CVSS 8.9)
 * Cancel Booking API
 *
 * This endpoint implements proper authorization checks to prevent
 * Insecure Direct Object Reference (IDOR) vulnerabilities.
 *
 * Protection measures:
 * 1. User authentication required (NextAuth session)
 * 2. User ownership verification via userId matching
 * 3. Prevents users from canceling other users' bookings
 */

// Using singleton prisma

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE' && req.method !== 'POST') {
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
    const { reason } = req.body || {}

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid booking ID' })
    }

    // SECURITY V6 CRITICAL: Get existing booking with ownership verification
    // Filter by userId to prevent IDOR - users can ONLY cancel their own bookings
    const existingBooking = await prisma.rentalPropertyBooking.findFirst({
      where: {
        id,
        userId: user.id, // IDOR Protection
      },
      include: {
        property: true,
      },
    })

    if (!existingBooking) {
      // Don't reveal if booking exists for other users - generic error
      return res.status(404).json({ error: 'Booking not found' })
    }

    // Check if booking can be cancelled
    if (
      existingBooking.status === BookingStatus.CANCELLED ||
      existingBooking.status === BookingStatus.COMPLETED
    ) {
      return res.status(400).json({
        error: 'Booking is already cancelled or completed',
      })
    }

    // Check cancellation policy
    const canCancel = canCancelBooking(existingBooking.checkIn, 24)
    if (!canCancel) {
      return res.status(400).json({
        error: 'Cancellation deadline has passed (24 hours before check-in)',
      })
    }

    // Calculate refund amount
    const refund = calculateRefund(
      parseFloat(existingBooking.totalPrice.toString()),
      existingBooking.checkIn,
      {
        freeCancellationHours: 24,
        partialRefundHours: 12,
        partialRefundPercentage: 50,
      }
    )

    // Cancel booking
    const cancelledBooking = await prisma.rentalPropertyBooking.update({
      where: { id },
      data: {
        status: BookingStatus.CANCELLED,
        paymentStatus:
          refund.refundPercentage === 100
            ? PaymentStatus.REFUNDED
            : refund.refundPercentage > 0
            ? PaymentStatus.PARTIALLY_REFUNDED
            : PaymentStatus.COMPLETED,
        updatedAt: new Date(),
      },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            mainImage: true,
          },
        },
      },
    })

    // TODO: Process refund via Stripe
    // TODO: Send cancellation email

    return res.status(200).json({
      success: true,
      booking: cancelledBooking,
      refund: {
        amount: refund.refundAmount,
        percentage: refund.refundPercentage,
        message:
          refund.refundPercentage === 100
            ? 'Full refund will be processed'
            : refund.refundPercentage > 0
            ? `${refund.refundPercentage}% refund will be processed`
            : 'No refund available',
      },
    })
  } catch (error) {
    logger.error('Error cancelling property booking:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
