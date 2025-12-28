import { PrismaClient } from '@prisma/client'
import { logger } from '../../lib/logger/winston';

const prisma = new PrismaClient()

/**
 * Generate unique booking reference
 */
export async function generateBookingReference(): Promise<string> {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let reference = ''

  // Generate reference: BK-XXXXXX (e.g., BK-A3H7K9)
  for (let i = 0; i < 6; i++) {
    reference += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  const bookingRef = `BK-${reference}`

  // Check if reference already exists
  const existing = await prisma.booking.findUnique({
    where: { bookingReference: bookingRef },
  })

  // If exists, generate a new one recursively
  if (existing) {
    return generateBookingReference()
  }

  return bookingRef
}

/**
 * Calculate number of nights between two dates
 */
export function calculateNights(checkIn: Date, checkOut: Date): number {
  const oneDay = 24 * 60 * 60 * 1000
  return Math.round(Math.abs((checkOut.getTime() - checkIn.getTime()) / oneDay))
}

/**
 * Calculate booking price
 */
export interface PriceCalculation {
  basePrice: number
  nights?: number
  days?: number
  subtotal: number
  tax: number
  serviceFee: number
  cleaningFee?: number
  totalPrice: number
}

export function calculateBookingPrice(
  basePrice: number,
  quantity: number,
  options?: {
    taxRate?: number
    serviceFeeRate?: number
    cleaningFee?: number
  }
): PriceCalculation {
  const taxRate = options?.taxRate || 0.08 // 8% default tax
  const serviceFeeRate = options?.serviceFeeRate || 0.05 // 5% service fee

  const subtotal = basePrice * quantity
  const tax = subtotal * taxRate
  const serviceFee = subtotal * serviceFeeRate
  const cleaningFee = options?.cleaningFee || 0

  const totalPrice = subtotal + tax + serviceFee + cleaningFee

  return {
    basePrice,
    subtotal,
    tax: parseFloat(tax.toFixed(2)),
    serviceFee: parseFloat(serviceFee.toFixed(2)),
    cleaningFee,
    totalPrice: parseFloat(totalPrice.toFixed(2)),
  }
}

/**
 * Validate booking dates
 */
export function validateBookingDates(checkIn: Date, checkOut: Date): {
  valid: boolean
  error?: string
} {
  const now = new Date()
  now.setHours(0, 0, 0, 0)

  // Check if dates are in the past
  if (checkIn < now) {
    return {
      valid: false,
      error: 'Check-in date cannot be in the past',
    }
  }

  // Check if check-out is after check-in
  if (checkOut <= checkIn) {
    return {
      valid: false,
      error: 'Check-out date must be after check-in date',
    }
  }

  // Check if booking is too far in advance (1 year)
  const oneYearFromNow = new Date()
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)

  if (checkIn > oneYearFromNow) {
    return {
      valid: false,
      error: 'Bookings can only be made up to 1 year in advance',
    }
  }

  return { valid: true }
}

/**
 * Check availability for a property/car/transfer
 */
export async function checkAvailability(
  entityType: string,
  entityId: string,
  checkIn: Date,
  checkOut: Date
): Promise<{ available: boolean; conflictingBookings?: any[] }> {
  try {
    let conflictingBookings: any[] = []

    switch (entityType) {
      case 'property':
        conflictingBookings = await prisma.rentalPropertyBooking.findMany({
          where: {
            propertyId: entityId,
            status: { in: ['PENDING', 'CONFIRMED'] },
            OR: [
              {
                AND: [
                  { checkIn: { lte: checkIn } },
                  { checkOut: { gte: checkIn } },
                ],
              },
              {
                AND: [
                  { checkIn: { lte: checkOut } },
                  { checkOut: { gte: checkOut } },
                ],
              },
              {
                AND: [
                  { checkIn: { gte: checkIn } },
                  { checkOut: { lte: checkOut } },
                ],
              },
            ],
          },
        })
        break

      case 'car':
        conflictingBookings = await prisma.carRentalBooking.findMany({
          where: {
            carId: entityId,
            status: { in: ['PENDING', 'CONFIRMED'] },
            OR: [
              {
                AND: [
                  { pickupDate: { lte: checkIn } },
                  { dropoffDate: { gte: checkIn } },
                ],
              },
              {
                AND: [
                  { pickupDate: { lte: checkOut } },
                  { dropoffDate: { gte: checkOut } },
                ],
              },
              {
                AND: [
                  { pickupDate: { gte: checkIn } },
                  { dropoffDate: { lte: checkOut } },
                ],
              },
            ],
          },
        })
        break

      case 'transfer':
        conflictingBookings = await prisma.transferBooking.findMany({
          where: {
            transferId: entityId,
            status: { in: ['PENDING', 'CONFIRMED'] },
            pickupDate: {
              gte: checkIn,
              lte: checkOut,
            },
          },
        })
        break
    }

    return {
      available: conflictingBookings.length === 0,
      conflictingBookings: conflictingBookings.length > 0 ? conflictingBookings : undefined,
    }
  } catch (error) {
    logger.error('Error checking availability:', error)
    return { available: false }
  }
}

/**
 * Format booking date for display
 */
export function formatBookingDate(date: Date, locale: string = 'tr'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

/**
 * Get cancellation deadline
 */
export function getCancellationDeadline(checkIn: Date, hours: number = 24): Date {
  const deadline = new Date(checkIn)
  deadline.setHours(deadline.getHours() - hours)
  return deadline
}

/**
 * Check if cancellation is allowed
 */
export function canCancelBooking(checkIn: Date, cancellationHours: number = 24): boolean {
  const deadline = getCancellationDeadline(checkIn, cancellationHours)
  return new Date() < deadline
}

/**
 * Calculate refund amount
 */
export function calculateRefund(
  totalAmount: number,
  checkIn: Date,
  cancellationPolicy?: {
    freeCancellationHours?: number
    partialRefundHours?: number
    partialRefundPercentage?: number
  }
): { refundAmount: number; refundPercentage: number } {
  const now = new Date()
  const hoursUntilCheckIn = (checkIn.getTime() - now.getTime()) / (1000 * 60 * 60)

  const freeCancellationHours = cancellationPolicy?.freeCancellationHours || 24
  const partialRefundHours = cancellationPolicy?.partialRefundHours || 12
  const partialRefundPercentage = cancellationPolicy?.partialRefundPercentage || 50

  if (hoursUntilCheckIn >= freeCancellationHours) {
    // Full refund
    return { refundAmount: totalAmount, refundPercentage: 100 }
  } else if (hoursUntilCheckIn >= partialRefundHours) {
    // Partial refund
    const refundAmount = (totalAmount * partialRefundPercentage) / 100
    return { refundAmount, refundPercentage: partialRefundPercentage }
  } else {
    // No refund
    return { refundAmount: 0, refundPercentage: 0 }
  }
}
