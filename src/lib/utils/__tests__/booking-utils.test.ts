/**
 * Unit Tests for Booking Utilities
 * Tests for booking-utils.ts functions
 */

import {
  generateBookingReference,
  calculateNights,
  calculateBookingPrice,
  validateBookingDates,
  canCancelBooking,
  calculateRefund,
  getCancellationDeadline,
} from '../booking-utils';
import { PrismaClient } from '@prisma/client';

// Mock Prisma
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({
    booking: {
      findUnique: jest.fn(),
    },
  })),
}));

// Mock logger
jest.mock('../../../lib/logger/winston', () => ({
  logger: {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  },
}));

describe('Booking Utils', () => {
  let prisma: any;

  beforeEach(() => {
    prisma = new PrismaClient();
    jest.clearAllMocks();
  });

  describe('generateBookingReference', () => {
    it('should generate a booking reference with BK- prefix', async () => {
      prisma.booking.findUnique.mockResolvedValue(null);

      const reference = await generateBookingReference();

      expect(reference).toMatch(/^BK-[A-Z0-9]{6}$/);
      expect(reference.length).toBe(9); // BK- + 6 chars
    });

    it('should generate unique references when collision occurs', async () => {
      // First call returns existing booking, second call returns null
      prisma.booking.findUnique
        .mockResolvedValueOnce({ id: '1', bookingReference: 'BK-ABC123' })
        .mockResolvedValueOnce(null);

      const reference = await generateBookingReference();

      expect(reference).toMatch(/^BK-[A-Z0-9]{6}$/);
      expect(prisma.booking.findUnique).toHaveBeenCalledTimes(2);
    });

    it('should only use alphanumeric characters excluding confusing ones', async () => {
      prisma.booking.findUnique.mockResolvedValue(null);

      const reference = await generateBookingReference();
      const code = reference.replace('BK-', '');

      // Should not contain 0, 1, I, O (confusing characters)
      expect(code).not.toMatch(/[01IO]/);
    });
  });

  describe('calculateNights', () => {
    it('should calculate correct number of nights', () => {
      const checkIn = new Date('2025-01-01');
      const checkOut = new Date('2025-01-05');

      const nights = calculateNights(checkIn, checkOut);

      expect(nights).toBe(4);
    });

    it('should handle same day check-in and check-out', () => {
      const checkIn = new Date('2025-01-01');
      const checkOut = new Date('2025-01-01');

      const nights = calculateNights(checkIn, checkOut);

      expect(nights).toBe(0);
    });

    it('should handle one night stay', () => {
      const checkIn = new Date('2025-01-01');
      const checkOut = new Date('2025-01-02');

      const nights = calculateNights(checkIn, checkOut);

      expect(nights).toBe(1);
    });

    it('should handle dates in different months', () => {
      const checkIn = new Date('2025-01-28');
      const checkOut = new Date('2025-02-03');

      const nights = calculateNights(checkIn, checkOut);

      expect(nights).toBe(6);
    });
  });

  describe('calculateBookingPrice', () => {
    it('should calculate price with default tax and service fee', () => {
      const result = calculateBookingPrice(100, 3);

      expect(result.basePrice).toBe(100);
      expect(result.subtotal).toBe(300);
      expect(result.tax).toBe(24); // 8% of 300
      expect(result.serviceFee).toBe(15); // 5% of 300
      expect(result.cleaningFee).toBe(0);
      expect(result.totalPrice).toBe(339);
    });

    it('should calculate price with custom tax rate', () => {
      const result = calculateBookingPrice(100, 2, { taxRate: 0.1 });

      expect(result.subtotal).toBe(200);
      expect(result.tax).toBe(20); // 10% of 200
      expect(result.serviceFee).toBe(10); // 5% of 200
      expect(result.totalPrice).toBe(230);
    });

    it('should calculate price with cleaning fee', () => {
      const result = calculateBookingPrice(100, 2, { cleaningFee: 50 });

      expect(result.subtotal).toBe(200);
      expect(result.tax).toBe(16); // 8% of 200
      expect(result.serviceFee).toBe(10); // 5% of 200
      expect(result.cleaningFee).toBe(50);
      expect(result.totalPrice).toBe(276);
    });

    it('should handle zero quantity', () => {
      const result = calculateBookingPrice(100, 0);

      expect(result.subtotal).toBe(0);
      expect(result.tax).toBe(0);
      expect(result.serviceFee).toBe(0);
      expect(result.totalPrice).toBe(0);
    });

    it('should round prices to 2 decimal places', () => {
      const result = calculateBookingPrice(33.33, 3);

      expect(result.subtotal).toBe(99.99);
      expect(result.tax).toBeCloseTo(8, 2);
      expect(result.serviceFee).toBeCloseTo(5, 2);
      expect(typeof result.totalPrice).toBe('number');
    });
  });

  describe('validateBookingDates', () => {
    beforeEach(() => {
      // Mock current date to 2025-01-01
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2025-01-01T12:00:00Z'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should validate correct dates', () => {
      const checkIn = new Date('2025-02-01');
      const checkOut = new Date('2025-02-05');

      const result = validateBookingDates(checkIn, checkOut);

      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject past check-in dates', () => {
      const checkIn = new Date('2024-12-01');
      const checkOut = new Date('2024-12-05');

      const result = validateBookingDates(checkIn, checkOut);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Check-in date cannot be in the past');
    });

    it('should reject check-out before check-in', () => {
      const checkIn = new Date('2025-02-05');
      const checkOut = new Date('2025-02-01');

      const result = validateBookingDates(checkIn, checkOut);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Check-out date must be after check-in date');
    });

    it('should reject same day check-in and check-out', () => {
      const checkIn = new Date('2025-02-01');
      const checkOut = new Date('2025-02-01');

      const result = validateBookingDates(checkIn, checkOut);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Check-out date must be after check-in date');
    });

    it('should reject bookings more than 1 year in advance', () => {
      const checkIn = new Date('2026-02-01');
      const checkOut = new Date('2026-02-05');

      const result = validateBookingDates(checkIn, checkOut);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Bookings can only be made up to 1 year in advance');
    });

    it('should accept bookings exactly 1 year in advance', () => {
      const checkIn = new Date('2025-12-31');
      const checkOut = new Date('2026-01-02');

      const result = validateBookingDates(checkIn, checkOut);

      expect(result.valid).toBe(true);
    });
  });

  describe('canCancelBooking', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2025-01-01T12:00:00Z'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should allow cancellation before deadline', () => {
      const checkIn = new Date('2025-01-03T14:00:00Z'); // 50 hours from now

      const result = canCancelBooking(checkIn, 24);

      expect(result).toBe(true);
    });

    it('should not allow cancellation after deadline', () => {
      const checkIn = new Date('2025-01-02T10:00:00Z'); // 22 hours from now

      const result = canCancelBooking(checkIn, 24);

      expect(result).toBe(false);
    });

    it('should use default 24 hours if not specified', () => {
      const checkIn = new Date('2025-01-03T14:00:00Z');

      const result = canCancelBooking(checkIn);

      expect(result).toBe(true);
    });

    it('should handle custom cancellation hours', () => {
      const checkIn = new Date('2025-01-04T12:00:00Z'); // 72 hours from now

      const result48h = canCancelBooking(checkIn, 48);
      const result96h = canCancelBooking(checkIn, 96);

      expect(result48h).toBe(true);
      expect(result96h).toBe(false);
    });
  });

  describe('getCancellationDeadline', () => {
    it('should calculate correct deadline', () => {
      const checkIn = new Date('2025-01-05T14:00:00Z');

      const deadline = getCancellationDeadline(checkIn, 24);

      expect(deadline.toISOString()).toBe('2025-01-04T14:00:00.000Z');
    });

    it('should use default 24 hours', () => {
      const checkIn = new Date('2025-01-05T14:00:00Z');

      const deadline = getCancellationDeadline(checkIn);

      expect(deadline.toISOString()).toBe('2025-01-04T14:00:00.000Z');
    });

    it('should handle custom hours', () => {
      const checkIn = new Date('2025-01-05T14:00:00Z');

      const deadline = getCancellationDeadline(checkIn, 48);

      expect(deadline.toISOString()).toBe('2025-01-03T14:00:00.000Z');
    });
  });

  describe('calculateRefund', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2025-01-01T12:00:00Z'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should return 100% refund within free cancellation period', () => {
      const checkIn = new Date('2025-01-03T12:00:00Z'); // 48 hours from now
      const totalAmount = 1000;

      const result = calculateRefund(totalAmount, checkIn, {
        freeCancellationHours: 24,
      });

      expect(result.refundAmount).toBe(1000);
      expect(result.refundPercentage).toBe(100);
    });

    it('should return partial refund within partial refund period', () => {
      const checkIn = new Date('2025-01-02T06:00:00Z'); // 18 hours from now
      const totalAmount = 1000;

      const result = calculateRefund(totalAmount, checkIn, {
        freeCancellationHours: 24,
        partialRefundHours: 12,
        partialRefundPercentage: 50,
      });

      expect(result.refundAmount).toBe(500);
      expect(result.refundPercentage).toBe(50);
    });

    it('should return no refund after partial refund period', () => {
      const checkIn = new Date('2025-01-01T18:00:00Z'); // 6 hours from now
      const totalAmount = 1000;

      const result = calculateRefund(totalAmount, checkIn, {
        freeCancellationHours: 24,
        partialRefundHours: 12,
      });

      expect(result.refundAmount).toBe(0);
      expect(result.refundPercentage).toBe(0);
    });

    it('should use default values when policy not provided', () => {
      const checkIn = new Date('2025-01-03T12:00:00Z'); // 48 hours from now
      const totalAmount = 1000;

      const result = calculateRefund(totalAmount, checkIn);

      expect(result.refundAmount).toBe(1000);
      expect(result.refundPercentage).toBe(100);
    });

    it('should handle edge case at exact deadline', () => {
      const checkIn = new Date('2025-01-02T12:00:00Z'); // exactly 24 hours from now
      const totalAmount = 1000;

      const result = calculateRefund(totalAmount, checkIn, {
        freeCancellationHours: 24,
        partialRefundHours: 12,
      });

      // At exactly 24 hours, should get full refund
      expect(result.refundPercentage).toBe(100);
    });

    it('should calculate custom partial refund percentage', () => {
      const checkIn = new Date('2025-01-02T06:00:00Z'); // 18 hours from now
      const totalAmount = 1000;

      const result = calculateRefund(totalAmount, checkIn, {
        freeCancellationHours: 24,
        partialRefundHours: 12,
        partialRefundPercentage: 75,
      });

      expect(result.refundAmount).toBe(750);
      expect(result.refundPercentage).toBe(75);
    });
  });
});
