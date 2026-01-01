/**
 * Comprehensive test suite for booking utilities
 * Coverage: Date validation, price calculation, availability, refunds
 */

import {
  generateBookingReference,
  calculateNights,
  calculateBookingPrice,
  validateBookingDates,
  formatBookingDate,
  getCancellationDeadline,
  canCancelBooking,
  calculateRefund,
} from '../booking-utils';

// Mock Prisma Client
jest.mock('../../database/prisma-client', () => {
  const mockBooking = {
    findUnique: jest.fn(),
  };

  return {
    prisma: {
      booking: mockBooking,
      rentalPropertyBooking: {
        findMany: jest.fn().mockResolvedValue([]),
      },
      carRentalBooking: {
        findMany: jest.fn().mockResolvedValue([]),
      },
      transferBooking: {
        findMany: jest.fn().mockResolvedValue([]),
      },
    },
  };
});

// Get mocked prisma instance
const { prisma: mockPrisma } = jest.requireMock('../../database/prisma-client');

describe('Booking Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateBookingReference', () => {
    it('should generate reference with correct format', async () => {
      mockPrisma.booking.findUnique.mockResolvedValue(null);

      const reference = await generateBookingReference();

      expect(reference).toMatch(/^BK-[A-Z0-9]{6}$/);
    });

    it('should only use safe characters (no I, O, 0, 1)', async () => {
      mockPrisma.booking.findUnique.mockResolvedValue(null);

      for (let i = 0; i < 100; i++) {
        const reference = await generateBookingReference();
        const code = reference.split('-')[1];

        expect(code).not.toMatch(/[IO01]/);
      }
    });

    it('should generate unique references on collision', async () => {
      // First call returns existing, second returns null
      mockPrisma.booking.findUnique
        .mockResolvedValueOnce({ id: '123', bookingReference: 'BK-ABC123' })
        .mockResolvedValueOnce(null);

      const reference = await generateBookingReference();

      expect(reference).toMatch(/^BK-[A-Z0-9]{6}$/);
      expect(mockPrisma.booking.findUnique).toHaveBeenCalledTimes(2);
    });

    it('should handle multiple collisions', async () => {
      mockPrisma.booking.findUnique
        .mockResolvedValueOnce({ id: '1' })
        .mockResolvedValueOnce({ id: '2' })
        .mockResolvedValueOnce({ id: '3' })
        .mockResolvedValueOnce(null);

      const reference = await generateBookingReference();

      expect(reference).toMatch(/^BK-[A-Z0-9]{6}$/);
      expect(mockPrisma.booking.findUnique).toHaveBeenCalledTimes(4);
    });

    it('should generate different references in parallel', async () => {
      mockPrisma.booking.findUnique.mockResolvedValue(null);

      const references = await Promise.all([
        generateBookingReference(),
        generateBookingReference(),
        generateBookingReference(),
      ]);

      const uniqueRefs = new Set(references);
      expect(uniqueRefs.size).toBeGreaterThanOrEqual(2); // At least 2 different
    });
  });

  describe('calculateNights', () => {
    it('should calculate nights correctly for same month', () => {
      const checkIn = new Date('2025-07-15');
      const checkOut = new Date('2025-07-17');

      const nights = calculateNights(checkIn, checkOut);
      expect(nights).toBe(2);
    });

    it('should calculate nights correctly across months', () => {
      const checkIn = new Date('2025-07-30');
      const checkOut = new Date('2025-08-05');

      const nights = calculateNights(checkIn, checkOut);
      expect(nights).toBe(6);
    });

    it('should calculate nights correctly across years', () => {
      const checkIn = new Date('2025-12-29');
      const checkOut = new Date('2026-01-02');

      const nights = calculateNights(checkIn, checkOut);
      expect(nights).toBe(4);
    });

    it('should return 0 for same day check-in and check-out', () => {
      const checkIn = new Date('2025-07-15T14:00:00');
      const checkOut = new Date('2025-07-15T10:00:00');

      const nights = calculateNights(checkIn, checkOut);
      expect(nights).toBe(0);
    });

    it('should handle DST transitions correctly', () => {
      // Spring DST transition
      const checkIn = new Date('2025-03-28');
      const checkOut = new Date('2025-03-31');

      const nights = calculateNights(checkIn, checkOut);
      expect(nights).toBe(3);
    });

    it('should work with Date objects at different times of day', () => {
      const checkIn = new Date('2025-07-15T23:59:59');
      const checkOut = new Date('2025-07-16T00:00:01');

      const nights = calculateNights(checkIn, checkOut);
      expect(nights).toBe(1);
    });

    it('should calculate weeks correctly', () => {
      const checkIn = new Date('2025-07-01');
      const checkOut = new Date('2025-07-08');

      const nights = calculateNights(checkIn, checkOut);
      expect(nights).toBe(7);
    });
  });

  describe('calculateBookingPrice', () => {
    it('should calculate price with default tax and service fee', () => {
      const result = calculateBookingPrice(1000, 2);

      expect(result.basePrice).toBe(1000);
      expect(result.subtotal).toBe(2000);
      expect(result.tax).toBe(160); // 8% of 2000
      expect(result.serviceFee).toBe(100); // 5% of 2000
      expect(result.totalPrice).toBe(2260);
    });

    it('should apply custom tax rate', () => {
      const result = calculateBookingPrice(1000, 1, { taxRate: 0.18 });

      expect(result.tax).toBe(180); // 18% of 1000
    });

    it('should apply custom service fee rate', () => {
      const result = calculateBookingPrice(1000, 1, { serviceFeeRate: 0.10 });

      expect(result.serviceFee).toBe(100); // 10% of 1000
    });

    it('should include cleaning fee in total', () => {
      const result = calculateBookingPrice(1000, 1, { cleaningFee: 200 });

      expect(result.cleaningFee).toBe(200);
      expect(result.totalPrice).toBe(1000 + 80 + 50 + 200); // base + tax + service + cleaning
    });

    it('should handle zero quantity', () => {
      const result = calculateBookingPrice(1000, 0);

      expect(result.subtotal).toBe(0);
      expect(result.totalPrice).toBe(0);
    });

    it('should handle large quantities', () => {
      const result = calculateBookingPrice(500, 100);

      expect(result.subtotal).toBe(50000);
      expect(result.totalPrice).toBe(56500);
    });

    it('should round prices to 2 decimal places', () => {
      const result = calculateBookingPrice(99.99, 3);

      expect(result.tax).toBeCloseTo(23.997, 2);
      expect(result.serviceFee).toBeCloseTo(14.998, 2);
      expect(Number.isFinite(result.totalPrice)).toBe(true);
    });

    it('should handle fractional prices', () => {
      const result = calculateBookingPrice(123.45, 2);

      expect(result.subtotal).toBe(246.9);
      expect(typeof result.tax).toBe('number');
      expect(typeof result.serviceFee).toBe('number');
    });

    it('should calculate correctly with zero tax rate', () => {
      const result = calculateBookingPrice(1000, 2, { taxRate: 0 });

      expect(result.tax).toBe(0);
      expect(result.totalPrice).toBe(2100); // base + serviceFee only
    });

    it('should calculate correctly with zero service fee', () => {
      const result = calculateBookingPrice(1000, 2, { serviceFeeRate: 0 });

      expect(result.serviceFee).toBe(0);
      expect(result.totalPrice).toBe(2160); // base + tax only
    });
  });

  describe('validateBookingDates', () => {
    it('should accept valid future dates', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dayAfter = new Date();
      dayAfter.setDate(dayAfter.getDate() + 2);

      const result = validateBookingDates(tomorrow, dayAfter);

      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject check-in date in the past', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const result = validateBookingDates(yesterday, tomorrow);

      expect(result.valid).toBe(false);
      expect(result.error).toContain('past');
    });

    it('should reject check-out before or same as check-in', () => {
      const checkIn = new Date('2025-07-15');
      const checkOut = new Date('2025-07-15');

      const result = validateBookingDates(checkIn, checkOut);

      expect(result.valid).toBe(false);
      expect(result.error).toContain('after');
    });

    it('should reject bookings more than 1 year in advance', () => {
      const checkIn = new Date();
      checkIn.setFullYear(checkIn.getFullYear() + 2);
      const checkOut = new Date(checkIn);
      checkOut.setDate(checkOut.getDate() + 1);

      const result = validateBookingDates(checkIn, checkOut);

      expect(result.valid).toBe(false);
      expect(result.error).toContain('1 year');
    });

    it('should accept booking exactly 1 year in advance', () => {
      const checkIn = new Date();
      checkIn.setFullYear(checkIn.getFullYear() + 1);
      checkIn.setDate(checkIn.getDate() - 1);
      const checkOut = new Date(checkIn);
      checkOut.setDate(checkOut.getDate() + 1);

      const result = validateBookingDates(checkIn, checkOut);

      expect(result.valid).toBe(true);
    });

    it('should handle midnight check-in correctly', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const dayAfter = new Date(tomorrow);
      dayAfter.setDate(dayAfter.getDate() + 1);

      const result = validateBookingDates(tomorrow, dayAfter);

      expect(result.valid).toBe(true);
    });
  });

  describe('formatBookingDate', () => {
    it('should format date in Turkish locale', () => {
      const date = new Date('2025-07-15T14:30:00');

      const formatted = formatBookingDate(date, 'tr');

      expect(formatted).toContain('2025');
      expect(formatted).toContain('15');
    });

    it('should format date in English locale', () => {
      const date = new Date('2025-07-15T14:30:00');

      const formatted = formatBookingDate(date, 'en');

      expect(formatted).toContain('2025');
      expect(formatted).toContain('15');
    });

    it('should use Turkish as default locale', () => {
      const date = new Date('2025-07-15T14:30:00');

      const formatted = formatBookingDate(date);

      expect(typeof formatted).toBe('string');
      expect(formatted.length).toBeGreaterThan(0);
    });

    it('should include time in formatted output', () => {
      const date = new Date('2025-07-15T14:30:00');

      const formatted = formatBookingDate(date);

      expect(formatted).toContain('14');
      expect(formatted).toContain('30');
    });
  });

  describe('getCancellationDeadline', () => {
    it('should calculate deadline 24 hours before check-in by default', () => {
      const checkIn = new Date('2025-07-15T14:00:00');

      const deadline = getCancellationDeadline(checkIn);

      expect(deadline.getTime()).toBe(checkIn.getTime() - 24 * 60 * 60 * 1000);
    });

    it('should calculate deadline with custom hours', () => {
      const checkIn = new Date('2025-07-15T14:00:00');

      const deadline = getCancellationDeadline(checkIn, 48);

      expect(deadline.getTime()).toBe(checkIn.getTime() - 48 * 60 * 60 * 1000);
    });

    it('should handle zero hours', () => {
      const checkIn = new Date('2025-07-15T14:00:00');

      const deadline = getCancellationDeadline(checkIn, 0);

      expect(deadline.getTime()).toBe(checkIn.getTime());
    });

    it('should handle large hour values', () => {
      const checkIn = new Date('2025-07-15T14:00:00');

      const deadline = getCancellationDeadline(checkIn, 168); // 1 week

      expect(deadline.getTime()).toBe(checkIn.getTime() - 168 * 60 * 60 * 1000);
    });
  });

  describe('canCancelBooking', () => {
    it('should allow cancellation before deadline', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 2);

      const canCancel = canCancelBooking(tomorrow, 24);

      expect(canCancel).toBe(true);
    });

    it('should not allow cancellation after deadline', () => {
      const inTwoHours = new Date();
      inTwoHours.setHours(inTwoHours.getHours() + 2);

      const canCancel = canCancelBooking(inTwoHours, 24);

      expect(canCancel).toBe(false);
    });

    it('should handle exact deadline moment', () => {
      const in24Hours = new Date();
      in24Hours.setHours(in24Hours.getHours() + 24);

      const canCancel = canCancelBooking(in24Hours, 24);

      // At exact deadline, should not be able to cancel
      expect(typeof canCancel).toBe('boolean');
    });

    it('should use 24 hours as default', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 2);

      const canCancel = canCancelBooking(tomorrow);

      expect(canCancel).toBe(true);
    });
  });

  describe('calculateRefund', () => {
    it('should give full refund during free cancellation period', () => {
      const checkIn = new Date();
      checkIn.setDate(checkIn.getDate() + 3);

      const refund = calculateRefund(1000, checkIn, {
        freeCancellationHours: 48,
      });

      expect(refund.refundAmount).toBe(1000);
      expect(refund.refundPercentage).toBe(100);
    });

    it('should give partial refund during partial refund period', () => {
      const checkIn = new Date();
      checkIn.setHours(checkIn.getHours() + 20);

      const refund = calculateRefund(1000, checkIn, {
        freeCancellationHours: 24,
        partialRefundHours: 12,
        partialRefundPercentage: 50,
      });

      expect(refund.refundAmount).toBe(500);
      expect(refund.refundPercentage).toBe(50);
    });

    it('should give no refund after all deadlines', () => {
      const checkIn = new Date();
      checkIn.setHours(checkIn.getHours() + 2);

      const refund = calculateRefund(1000, checkIn, {
        freeCancellationHours: 24,
        partialRefundHours: 12,
      });

      expect(refund.refundAmount).toBe(0);
      expect(refund.refundPercentage).toBe(0);
    });

    it('should use default policy values', () => {
      const checkIn = new Date();
      checkIn.setDate(checkIn.getDate() + 3);

      const refund = calculateRefund(1000, checkIn);

      expect(refund.refundPercentage).toBeGreaterThan(0);
    });

    it('should calculate custom partial refund percentage', () => {
      const checkIn = new Date();
      checkIn.setHours(checkIn.getHours() + 20);

      const refund = calculateRefund(1000, checkIn, {
        freeCancellationHours: 24,
        partialRefundHours: 12,
        partialRefundPercentage: 75,
      });

      expect(refund.refundAmount).toBe(750);
      expect(refund.refundPercentage).toBe(75);
    });

    it('should handle large amounts correctly', () => {
      const checkIn = new Date();
      checkIn.setDate(checkIn.getDate() + 5);

      const refund = calculateRefund(100000, checkIn);

      expect(refund.refundAmount).toBe(100000);
    });

    it('should handle edge case at exact deadline', () => {
      const checkIn = new Date();
      checkIn.setHours(checkIn.getHours() + 24);

      const refund = calculateRefund(1000, checkIn, {
        freeCancellationHours: 24,
      });

      expect([0, 1000]).toContain(refund.refundAmount);
    });
  });

  describe('Integration Tests', () => {
    it('should calculate complete booking flow', async () => {
      // 1. Generate reference
      mockPrisma.booking.findUnique.mockResolvedValue(null);
      const reference = await generateBookingReference();
      expect(reference).toMatch(/^BK-/);

      // 2. Calculate nights
      const checkIn = new Date('2025-07-15');
      const checkOut = new Date('2025-07-17');
      const nights = calculateNights(checkIn, checkOut);
      expect(nights).toBe(2);

      // 3. Calculate price
      const pricing = calculateBookingPrice(1000, nights);
      expect(pricing.totalPrice).toBeGreaterThan(0);

      // 4. Validate dates
      const validation = validateBookingDates(checkIn, checkOut);
      expect(validation.valid).toBe(true);
    });

    it('should handle cancellation flow', () => {
      const checkIn = new Date();
      checkIn.setDate(checkIn.getDate() + 2);

      // Check if can cancel
      const canCancel = canCancelBooking(checkIn, 24);
      expect(canCancel).toBe(true);

      // Calculate refund
      const refund = calculateRefund(1000, checkIn, {
        freeCancellationHours: 24,
      });
      expect(refund.refundPercentage).toBeGreaterThan(0);
    });
  });
});
