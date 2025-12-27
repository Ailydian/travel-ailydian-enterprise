import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import logger from '../../../lib/logger';
import { sendBookingConfirmation } from '../../../lib/email-service';

const prisma = new PrismaClient();

/**
 * POST /api/bookings/confirm
 * Confirm a booking and send confirmation email
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Get session
    const session = await getSession({ req });

    if (!session || !session.user?.email) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const {
      bookingType,
      totalAmount,
      currency,
      paymentMethod,
      checkInDate,
      checkOutDate,
      guestCount,
      specialRequests,
      metaData
    } = req.body;

    // Validate required fields
    if (!bookingType || !totalAmount || !currency || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    logger.info('Processing booking confirmation', {
      email: session.user.email,
      bookingType,
      totalAmount
    });

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Generate unique booking reference
    const bookingReference = `AILD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Create booking in database
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        bookingType,
        status: 'CONFIRMED',
        totalAmount,
        currency,
        paymentMethod,
        paymentStatus: 'COMPLETED',
        checkInDate: checkInDate ? new Date(checkInDate) : null,
        checkOutDate: checkOutDate ? new Date(checkOutDate) : null,
        guestCount: guestCount || 1,
        specialRequests,
        bookingReference,
        metaData: metaData || {}
      }
    });

    logger.info('Booking created successfully', {
      bookingId: booking.id,
      bookingReference: booking.bookingReference
    });

    // Send confirmation email
    const emailSent = await sendBookingConfirmation(
      user.email,
      {
        bookingRef: booking.bookingReference,
        type: booking.bookingType,
        name: user.name || 'Valued Customer',
        date: checkInDate ? new Date(checkInDate).toLocaleDateString('tr-TR') : new Date().toLocaleDateString('tr-TR'),
        amount: Number(booking.totalAmount),
        currency: booking.currency
      }
    );

    if (!emailSent) {
      logger.error('Failed to send confirmation email', new Error('Email service error'), {
        bookingId: booking.id,
        userEmail: user.email
      });
    }

    // Create notification
    await prisma.notification.create({
      data: {
        userId: user.id,
        type: 'BOOKING_CONFIRMATION',
        title: 'Reservation Confirmed',
        message: `Your ${bookingType} booking has been confirmed. Booking reference: ${bookingReference}`,
        data: {
          bookingId: booking.id,
          bookingReference: booking.bookingReference
        }
      }
    });

    // Award loyalty points (10% of amount)
    const loyaltyPointsEarned = Math.floor(Number(totalAmount) * 0.1);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        loyaltyPoints: {
          increment: loyaltyPointsEarned
        }
      }
    });

    logger.info('Booking confirmation completed', {
      bookingId: booking.id,
      emailSent,
      loyaltyPointsEarned
    });

    return res.status(200).json({
      success: true,
      message: 'Booking confirmed successfully',
      booking: {
        id: booking.id,
        bookingReference: booking.bookingReference,
        status: booking.status,
        totalAmount: booking.totalAmount,
        currency: booking.currency,
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        guestCount: booking.guestCount
      },
      emailSent,
      loyaltyPointsEarned
    });

  } catch (error) {
    logger.error('Booking confirmation failed', error);
    logger.error('Booking confirmation error:', error as Error, {component:'Confirm'});

    return res.status(500).json({
      success: false,
      message: 'An error occurred while confirming your booking',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  } finally {
    await prisma.$disconnect();
  }
}
