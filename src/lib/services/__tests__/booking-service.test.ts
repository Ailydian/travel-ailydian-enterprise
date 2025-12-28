/**
 * Unit Tests for Booking Service
 * Tests for booking-service.ts
 */

import { BookingService } from '../booking-service';
import { BookingStatus, PaymentStatus, BookingType, PrismaClient } from '@prisma/client';
import * as bookingUtils from '@/lib/utils/booking-utils';

// Mock Prisma
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({
    booking: {
      create: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
    },
  })),
  BookingStatus: {
    PENDING: 'PENDING',
    CONFIRMED: 'CONFIRMED',
    CANCELLED: 'CANCELLED',
    COMPLETED: 'COMPLETED',
  },
  PaymentStatus: {
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED',
    REFUNDED: 'REFUNDED',
  },
  BookingType: {
    PROPERTY: 'PROPERTY',
    FLIGHT: 'FLIGHT',
    CAR: 'CAR',
    TRANSFER: 'TRANSFER',
  },
}));

// Mock booking utils
jest.mock('@/lib/utils/booking-utils', () => ({
  generateBookingReference: jest.fn(),
}));

// Mock logger
jest.mock('../../../lib/logger/winston', () => ({
  logger: {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  },
}));

describe('BookingService', () => {
  let mockPrisma: any;

  beforeEach(() => {
    mockPrisma = new PrismaClient();
    jest.clearAllMocks();
  });

  describe('createBooking', () => {
    it('should create a booking successfully', async () => {
      const mockBooking = {
        id: 'booking-123',
        userId: 'user-123',
        bookingType: BookingType.PROPERTY,
        totalAmount: 1000,
        currency: 'TRY',
        paymentMethod: 'CARD',
        bookingReference: 'BK-ABC123',
        status: BookingStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        user: {
          id: 'user-123',
          name: 'Test User',
          email: 'test@example.com',
          phone: '+905551234567',
        },
      };

      (bookingUtils.generateBookingReference as jest.Mock).mockResolvedValue('BK-ABC123');
      mockPrisma.booking.create.mockResolvedValue(mockBooking);

      const result = await BookingService.createBooking({
        userId: 'user-123',
        bookingType: BookingType.PROPERTY,
        totalAmount: 1000,
        paymentMethod: 'CARD',
        guestCount: 2,
      });

      expect(result.success).toBe(true);
      expect(result.booking).toEqual(mockBooking);
      expect(bookingUtils.generateBookingReference).toHaveBeenCalled();
      expect(mockPrisma.booking.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: 'user-123',
          bookingType: BookingType.PROPERTY,
          totalAmount: 1000,
          currency: 'TRY',
          bookingReference: 'BK-ABC123',
          status: BookingStatus.PENDING,
          paymentStatus: PaymentStatus.PENDING,
        }),
        include: expect.any(Object),
      });
    });

    it('should use custom currency when provided', async () => {
      (bookingUtils.generateBookingReference as jest.Mock).mockResolvedValue('BK-ABC123');
      mockPrisma.booking.create.mockResolvedValue({});

      await BookingService.createBooking({
        userId: 'user-123',
        bookingType: BookingType.PROPERTY,
        totalAmount: 1000,
        currency: 'USD',
        paymentMethod: 'CARD',
      });

      expect(mockPrisma.booking.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            currency: 'USD',
          }),
        })
      );
    });

    it('should handle errors gracefully', async () => {
      (bookingUtils.generateBookingReference as jest.Mock).mockResolvedValue('BK-ABC123');
      mockPrisma.booking.create.mockRejectedValue(new Error('Database error'));

      const result = await BookingService.createBooking({
        userId: 'user-123',
        bookingType: BookingType.PROPERTY,
        totalAmount: 1000,
        paymentMethod: 'CARD',
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to create booking');
    });
  });

  describe('getBookingById', () => {
    it('should retrieve booking by ID', async () => {
      const mockBooking = {
        id: 'booking-123',
        userId: 'user-123',
        bookingReference: 'BK-ABC123',
        user: { id: 'user-123', name: 'Test User', email: 'test@example.com' },
        reviews: [],
      };

      mockPrisma.booking.findFirst.mockResolvedValue(mockBooking);

      const result = await BookingService.getBookingById('booking-123');

      expect(result.success).toBe(true);
      expect(result.booking).toEqual(mockBooking);
      expect(mockPrisma.booking.findFirst).toHaveBeenCalledWith({
        where: { id: 'booking-123' },
        include: expect.any(Object),
      });
    });

    it('should filter by userId when provided', async () => {
      mockPrisma.booking.findFirst.mockResolvedValue({});

      await BookingService.getBookingById('booking-123', 'user-123');

      expect(mockPrisma.booking.findFirst).toHaveBeenCalledWith({
        where: { id: 'booking-123', userId: 'user-123' },
        include: expect.any(Object),
      });
    });

    it('should return error when booking not found', async () => {
      mockPrisma.booking.findFirst.mockResolvedValue(null);

      const result = await BookingService.getBookingById('booking-123');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Booking not found');
    });

    it('should handle database errors', async () => {
      mockPrisma.booking.findFirst.mockRejectedValue(new Error('Database error'));

      const result = await BookingService.getBookingById('booking-123');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to get booking');
    });
  });

  describe('getBookingByReference', () => {
    it('should retrieve booking by reference', async () => {
      const mockBooking = {
        id: 'booking-123',
        bookingReference: 'BK-ABC123',
        user: { id: 'user-123', name: 'Test User', email: 'test@example.com' },
        reviews: [],
      };

      mockPrisma.booking.findUnique.mockResolvedValue(mockBooking);

      const result = await BookingService.getBookingByReference('BK-ABC123');

      expect(result.success).toBe(true);
      expect(result.booking).toEqual(mockBooking);
      expect(mockPrisma.booking.findUnique).toHaveBeenCalledWith({
        where: { bookingReference: 'BK-ABC123' },
        include: expect.any(Object),
      });
    });

    it('should return error when booking not found', async () => {
      mockPrisma.booking.findUnique.mockResolvedValue(null);

      const result = await BookingService.getBookingByReference('BK-INVALID');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Booking not found');
    });
  });

  describe('updateBooking', () => {
    it('should update booking successfully', async () => {
      const existingBooking = { id: 'booking-123', userId: 'user-123' };
      const updatedBooking = {
        ...existingBooking,
        status: BookingStatus.CONFIRMED,
      };

      mockPrisma.booking.findFirst.mockResolvedValue(existingBooking);
      mockPrisma.booking.update.mockResolvedValue(updatedBooking);

      const result = await BookingService.updateBooking(
        'booking-123',
        { status: BookingStatus.CONFIRMED },
        'user-123'
      );

      expect(result.success).toBe(true);
      expect(result.booking?.status).toBe(BookingStatus.CONFIRMED);
      expect(mockPrisma.booking.update).toHaveBeenCalled();
    });

    it('should fail if booking not found', async () => {
      mockPrisma.booking.findFirst.mockResolvedValue(null);

      const result = await BookingService.updateBooking('booking-123', {
        status: BookingStatus.CONFIRMED,
      });

      expect(result.success).toBe(false);
      expect(mockPrisma.booking.update).not.toHaveBeenCalled();
    });
  });

  describe('cancelBooking', () => {
    it('should cancel booking successfully', async () => {
      const existingBooking = {
        id: 'booking-123',
        userId: 'user-123',
        status: BookingStatus.CONFIRMED,
        metaData: {},
      };

      mockPrisma.booking.findFirst.mockResolvedValue(existingBooking);
      mockPrisma.booking.update.mockResolvedValue({
        ...existingBooking,
        status: BookingStatus.CANCELLED,
      });

      const result = await BookingService.cancelBooking(
        'booking-123',
        'user-123',
        'Customer request'
      );

      expect(result.success).toBe(true);
      expect(mockPrisma.booking.update).toHaveBeenCalledWith({
        where: { id: 'booking-123' },
        data: expect.objectContaining({
          status: BookingStatus.CANCELLED,
          metaData: expect.objectContaining({
            cancellationReason: 'Customer request',
          }),
        }),
        include: expect.any(Object),
      });
    });

    it('should not cancel already cancelled booking', async () => {
      const existingBooking = {
        id: 'booking-123',
        status: BookingStatus.CANCELLED,
      };

      mockPrisma.booking.findFirst.mockResolvedValue(existingBooking);

      const result = await BookingService.cancelBooking('booking-123');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Booking cannot be cancelled');
      expect(mockPrisma.booking.update).not.toHaveBeenCalled();
    });

    it('should not cancel completed booking', async () => {
      const existingBooking = {
        id: 'booking-123',
        status: BookingStatus.COMPLETED,
      };

      mockPrisma.booking.findFirst.mockResolvedValue(existingBooking);

      const result = await BookingService.cancelBooking('booking-123');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Booking cannot be cancelled');
    });
  });

  describe('getUserBookings', () => {
    it('should retrieve user bookings', async () => {
      const mockBookings = [
        { id: 'booking-1', userId: 'user-123', reviews: [] },
        { id: 'booking-2', userId: 'user-123', reviews: [] },
      ];

      mockPrisma.booking.findMany.mockResolvedValue(mockBookings);

      const result = await BookingService.getUserBookings('user-123');

      expect(result.success).toBe(true);
      expect(result.bookings).toEqual(mockBookings);
      expect(result.count).toBe(2);
    });

    it('should filter by status', async () => {
      mockPrisma.booking.findMany.mockResolvedValue([]);

      await BookingService.getUserBookings('user-123', {
        status: BookingStatus.CONFIRMED,
      });

      expect(mockPrisma.booking.findMany).toHaveBeenCalledWith({
        where: expect.objectContaining({
          userId: 'user-123',
          status: BookingStatus.CONFIRMED,
        }),
        include: expect.any(Object),
        orderBy: expect.any(Object),
      });
    });

    it('should filter by date range', async () => {
      const startDate = new Date('2025-01-01');
      const endDate = new Date('2025-12-31');

      mockPrisma.booking.findMany.mockResolvedValue([]);

      await BookingService.getUserBookings('user-123', {
        startDate,
        endDate,
      });

      expect(mockPrisma.booking.findMany).toHaveBeenCalledWith({
        where: expect.objectContaining({
          userId: 'user-123',
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        }),
        include: expect.any(Object),
        orderBy: expect.any(Object),
      });
    });
  });

  describe('confirmPayment', () => {
    it('should confirm payment successfully', async () => {
      const mockBooking = {
        id: 'booking-123',
        status: BookingStatus.CONFIRMED,
        paymentStatus: PaymentStatus.COMPLETED,
      };

      mockPrisma.booking.update.mockResolvedValue(mockBooking);

      const result = await BookingService.confirmPayment('booking-123', 'pi_123456');

      expect(result.success).toBe(true);
      expect(mockPrisma.booking.update).toHaveBeenCalledWith({
        where: { id: 'booking-123' },
        data: expect.objectContaining({
          status: BookingStatus.CONFIRMED,
          paymentStatus: PaymentStatus.COMPLETED,
          metaData: expect.objectContaining({
            paymentIntentId: 'pi_123456',
          }),
        }),
        include: expect.any(Object),
      });
    });
  });

  describe('completeBooking', () => {
    it('should mark booking as completed', async () => {
      const mockBooking = {
        id: 'booking-123',
        status: BookingStatus.COMPLETED,
      };

      mockPrisma.booking.update.mockResolvedValue(mockBooking);

      const result = await BookingService.completeBooking('booking-123');

      expect(result.success).toBe(true);
      expect(mockPrisma.booking.update).toHaveBeenCalledWith({
        where: { id: 'booking-123' },
        data: { status: BookingStatus.COMPLETED },
        include: expect.any(Object),
      });
    });
  });

  describe('getBookingStats', () => {
    it('should retrieve booking statistics', async () => {
      mockPrisma.booking.count
        .mockResolvedValueOnce(100) // total
        .mockResolvedValueOnce(10) // pending
        .mockResolvedValueOnce(60) // confirmed
        .mockResolvedValueOnce(20) // completed
        .mockResolvedValueOnce(10); // cancelled

      const result = await BookingService.getBookingStats();

      expect(result.success).toBe(true);
      expect(result.stats).toEqual({
        total: 100,
        pending: 10,
        confirmed: 60,
        completed: 20,
        cancelled: 10,
      });
    });

    it('should filter stats by userId', async () => {
      mockPrisma.booking.count
        .mockResolvedValueOnce(10)
        .mockResolvedValueOnce(2)
        .mockResolvedValueOnce(5)
        .mockResolvedValueOnce(2)
        .mockResolvedValueOnce(1);

      const result = await BookingService.getBookingStats('user-123');

      expect(result.success).toBe(true);
      expect(mockPrisma.booking.count).toHaveBeenCalledWith({
        where: { userId: 'user-123' },
      });
    });

    it('should handle errors in stats retrieval', async () => {
      mockPrisma.booking.count.mockRejectedValue(new Error('Database error'));

      const result = await BookingService.getBookingStats();

      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to get booking statistics');
    });
  });
});
