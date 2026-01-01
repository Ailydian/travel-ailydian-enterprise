import { PrismaClient, BookingStatus, PaymentStatus, BookingType } from '@prisma/client'
import { generateBookingReference } from '@/lib/utils/booking-utils'
import { logger } from '../../lib/logger/winston';

const prisma = new PrismaClient()

export interface CreateBookingInput {
  userId: string
  bookingType: BookingType
  totalAmount: number
  currency?: string
  paymentMethod: string
  checkInDate?: Date
  checkOutDate?: Date
  guestCount?: number
  specialRequests?: string
  metaData?: Record<string, unknown>
}

export interface UpdateBookingInput {
  status?: BookingStatus
  paymentStatus?: PaymentStatus
  specialRequests?: string
  metaData?: Record<string, unknown>
}

export interface BookingFilters {
  userId?: string
  status?: BookingStatus
  bookingType?: BookingType
  startDate?: Date
  endDate?: Date
}

/**
 * Booking Service - Core booking operations
 */
export class BookingService {
  /**
   * Create a new booking
   */
  static async createBooking(input: CreateBookingInput) {
    try {
      const bookingReference = await generateBookingReference()

      const booking = await prisma.booking.create({
        data: {
          userId: input.userId,
          bookingType: input.bookingType,
          totalAmount: input.totalAmount,
          currency: input.currency || 'TRY',
          paymentMethod: input.paymentMethod as 'CREDIT_CARD' | 'PAYPAL' | 'BANK_TRANSFER' | 'CASH',
          checkInDate: input.checkInDate,
          checkOutDate: input.checkOutDate,
          guestCount: input.guestCount,
          specialRequests: input.specialRequests,
          bookingReference,
          metaData: input.metaData,
          status: BookingStatus.PENDING,
          paymentStatus: PaymentStatus.PENDING,
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

      return {
        success: true,
        booking,
      }
    } catch (error) {
      logger.error('Error creating booking:', error)
      return {
        success: false,
        error: 'Failed to create booking',
      }
    }
  }

  /**
   * Get booking by ID
   */
  static async getBookingById(bookingId: string, userId?: string) {
    try {
      const where: { id: string; userId?: string } = { id: bookingId }
      if (userId) {
        where.userId = userId
      }

      const booking = await prisma.booking.findFirst({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
          reviews: true,
        },
      })

      if (!booking) {
        return {
          success: false,
          error: 'Booking not found',
        }
      }

      return {
        success: true,
        booking,
      }
    } catch (error) {
      logger.error('Error getting booking:', error)
      return {
        success: false,
        error: 'Failed to get booking',
      }
    }
  }

  /**
   * Get booking by reference
   */
  static async getBookingByReference(bookingReference: string) {
    try {
      const booking = await prisma.booking.findUnique({
        where: { bookingReference },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
          reviews: true,
        },
      })

      if (!booking) {
        return {
          success: false,
          error: 'Booking not found',
        }
      }

      return {
        success: true,
        booking,
      }
    } catch (error) {
      logger.error('Error getting booking by reference:', error)
      return {
        success: false,
        error: 'Failed to get booking',
      }
    }
  }

  /**
   * Update booking
   */
  static async updateBooking(
    bookingId: string,
    input: UpdateBookingInput,
    userId?: string
  ) {
    try {
      // First check if booking exists and belongs to user
      const existingBooking = await this.getBookingById(bookingId, userId)
      if (!existingBooking.success) {
        return existingBooking
      }

      const booking = await prisma.booking.update({
        where: { id: bookingId },
        data: {
          ...input,
          updatedAt: new Date(),
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

      return {
        success: true,
        booking,
      }
    } catch (error) {
      logger.error('Error updating booking:', error)
      return {
        success: false,
        error: 'Failed to update booking',
      }
    }
  }

  /**
   * Cancel booking
   */
  static async cancelBooking(bookingId: string, userId?: string, reason?: string) {
    try {
      const existingBooking = await this.getBookingById(bookingId, userId)
      if (!existingBooking.success) {
        return existingBooking
      }

      // Check if booking can be cancelled
      if (
        existingBooking.booking!.status === BookingStatus.CANCELLED ||
        existingBooking.booking!.status === BookingStatus.COMPLETED
      ) {
        return {
          success: false,
          error: 'Booking cannot be cancelled',
        }
      }

      const booking = await prisma.booking.update({
        where: { id: bookingId },
        data: {
          status: BookingStatus.CANCELLED,
          metaData: {
            ...(existingBooking.booking!.metaData as any),
            cancellationReason: reason,
            cancelledAt: new Date().toISOString(),
          },
        },
        include: {
          user: true,
        },
      })

      return {
        success: true,
        booking,
      }
    } catch (error) {
      logger.error('Error cancelling booking:', error)
      return {
        success: false,
        error: 'Failed to cancel booking',
      }
    }
  }

  /**
   * Get user bookings
   */
  static async getUserBookings(userId: string, filters?: BookingFilters) {
    try {
      const where: any = { userId }

      if (filters?.status) {
        where.status = filters.status
      }

      if (filters?.bookingType) {
        where.bookingType = filters.bookingType
      }

      if (filters?.startDate || filters?.endDate) {
        where.createdAt = {}
        if (filters.startDate) {
          where.createdAt.gte = filters.startDate
        }
        if (filters.endDate) {
          where.createdAt.lte = filters.endDate
        }
      }

      const bookings = await prisma.booking.findMany({
        where,
        include: {
          reviews: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return {
        success: true,
        bookings,
        count: bookings.length,
      }
    } catch (error) {
      logger.error('Error getting user bookings:', error)
      return {
        success: false,
        error: 'Failed to get bookings',
        bookings: [],
        count: 0,
      }
    }
  }

  /**
   * Confirm booking payment
   */
  static async confirmPayment(bookingId: string, paymentIntentId?: string) {
    try {
      const booking = await prisma.booking.update({
        where: { id: bookingId },
        data: {
          status: BookingStatus.CONFIRMED,
          paymentStatus: PaymentStatus.COMPLETED,
          metaData: {
            paymentIntentId,
            paidAt: new Date().toISOString(),
          },
        },
        include: {
          user: true,
        },
      })

      return {
        success: true,
        booking,
      }
    } catch (error) {
      logger.error('Error confirming payment:', error)
      return {
        success: false,
        error: 'Failed to confirm payment',
      }
    }
  }

  /**
   * Mark booking as completed
   */
  static async completeBooking(bookingId: string) {
    try {
      const booking = await prisma.booking.update({
        where: { id: bookingId },
        data: {
          status: BookingStatus.COMPLETED,
        },
        include: {
          user: true,
        },
      })

      return {
        success: true,
        booking,
      }
    } catch (error) {
      logger.error('Error completing booking:', error)
      return {
        success: false,
        error: 'Failed to complete booking',
      }
    }
  }

  /**
   * Get booking statistics
   */
  static async getBookingStats(userId?: string) {
    try {
      const where: any = userId ? { userId } : {}

      const [total, pending, confirmed, completed, cancelled] = await Promise.all([
        prisma.booking.count({ where }),
        prisma.booking.count({ where: { ...where, status: BookingStatus.PENDING } }),
        prisma.booking.count({ where: { ...where, status: BookingStatus.CONFIRMED } }),
        prisma.booking.count({ where: { ...where, status: BookingStatus.COMPLETED } }),
        prisma.booking.count({ where: { ...where, status: BookingStatus.CANCELLED } }),
      ])

      return {
        success: true,
        stats: {
          total,
          pending,
          confirmed,
          completed,
          cancelled,
        },
      }
    } catch (error) {
      logger.error('Error getting booking stats:', error)
      return {
        success: false,
        error: 'Failed to get booking statistics',
      }
    }
  }
}
