/**
 * API Integration Tests for Property Booking Creation
 * Tests for /api/bookings/property/create endpoint
 */

import { NextApiRequest, NextApiResponse } from 'next';
import handler from '../create';
import { getServerSession } from 'next-auth';
import { PrismaClient, BookingStatus, PaymentStatus } from '@prisma/client';
import * as bookingUtils from '@/lib/utils/booking-utils';

// Mock dependencies
jest.mock('next-auth');
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({
    user: { findUnique: jest.fn() },
    rentalProperty: { findUnique: jest.fn() },
    rentalPropertyBooking: { create: jest.fn() },
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
}));

jest.mock('@/lib/utils/booking-utils', () => ({
  generateBookingReference: jest.fn(),
  calculateNights: jest.fn(),
  calculateBookingPrice: jest.fn(),
  validateBookingDates: jest.fn(),
  checkAvailability: jest.fn(),
}));

jest.mock('@/pages/api/auth/[...nextauth]', () => ({
  authOptions: {},
}));

jest.mock('../../../../../lib/logger/winston', () => ({
  logger: {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  },
}));

describe('/api/bookings/property/create', () => {
  let mockReq: Partial<NextApiRequest>;
  let mockRes: Partial<NextApiResponse>;
  let mockPrisma: any;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock }));

    mockReq = {
      method: 'POST',
      body: {},
    };

    mockRes = {
      status: statusMock as any,
      json: jsonMock,
    };

    mockPrisma = new PrismaClient();
    jest.clearAllMocks();
  });

  describe('Method Validation', () => {
    it('should return 405 for non-POST requests', async () => {
      mockReq.method = 'GET';

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(405);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Method not allowed' });
    });
  });

  describe('Authentication', () => {
    it('should return 401 if user is not authenticated', async () => {
      (getServerSession as jest.Mock).mockResolvedValue(null);

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(401);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });

    it('should return 401 if session has no email', async () => {
      (getServerSession as jest.Mock).mockResolvedValue({ user: {} });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(401);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });

    it('should return 404 if user not found in database', async () => {
      (getServerSession as jest.Mock).mockResolvedValue({
        user: { email: 'test@example.com' },
      });
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'User not found' });
    });
  });

  describe('Request Validation', () => {
    beforeEach(() => {
      (getServerSession as jest.Mock).mockResolvedValue({
        user: { email: 'test@example.com' },
      });
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
      });
    });

    it('should return 400 if propertyId is missing', async () => {
      mockReq.body = {
        checkIn: '2025-02-01',
        checkOut: '2025-02-05',
        numberOfGuests: 2,
      };

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Missing required fields' });
    });

    it('should return 400 if checkIn is missing', async () => {
      mockReq.body = {
        propertyId: 'prop-123',
        checkOut: '2025-02-05',
        numberOfGuests: 2,
      };

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Missing required fields' });
    });

    it('should return 400 if checkOut is missing', async () => {
      mockReq.body = {
        propertyId: 'prop-123',
        checkIn: '2025-02-01',
        numberOfGuests: 2,
      };

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Missing required fields' });
    });

    it('should return 400 if numberOfGuests is missing', async () => {
      mockReq.body = {
        propertyId: 'prop-123',
        checkIn: '2025-02-01',
        checkOut: '2025-02-05',
      };

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Missing required fields' });
    });
  });

  describe('Date Validation', () => {
    beforeEach(() => {
      (getServerSession as jest.Mock).mockResolvedValue({
        user: { email: 'test@example.com' },
      });
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user-123',
        email: 'test@example.com',
      });

      mockReq.body = {
        propertyId: 'prop-123',
        checkIn: '2025-02-01',
        checkOut: '2025-02-05',
        numberOfGuests: 2,
      };
    });

    it('should return 400 if dates are invalid', async () => {
      (bookingUtils.validateBookingDates as jest.Mock).mockReturnValue({
        valid: false,
        error: 'Check-in date cannot be in the past',
      });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        error: 'Check-in date cannot be in the past',
      });
    });
  });

  describe('Property Validation', () => {
    beforeEach(() => {
      (getServerSession as jest.Mock).mockResolvedValue({
        user: { email: 'test@example.com' },
      });
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user-123',
        email: 'test@example.com',
      });

      mockReq.body = {
        propertyId: 'prop-123',
        checkIn: '2025-02-01',
        checkOut: '2025-02-05',
        numberOfGuests: 2,
      };

      (bookingUtils.validateBookingDates as jest.Mock).mockReturnValue({ valid: true });
    });

    it('should return 404 if property not found', async () => {
      mockPrisma.rentalProperty.findUnique.mockResolvedValue(null);

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Property not found' });
    });

    it('should return 400 if property is not active', async () => {
      mockPrisma.rentalProperty.findUnique.mockResolvedValue({
        id: 'prop-123',
        isActive: false,
      });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Property is not available' });
    });

    it('should return 400 if number of guests exceeds capacity', async () => {
      mockPrisma.rentalProperty.findUnique.mockResolvedValue({
        id: 'prop-123',
        isActive: true,
        guests: 2,
      });

      (bookingUtils.checkAvailability as jest.Mock).mockResolvedValue({
        available: true,
      });

      mockReq.body.numberOfGuests = 5;

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        error: 'Property can accommodate maximum 2 guests',
      });
    });
  });

  describe('Availability Check', () => {
    beforeEach(() => {
      (getServerSession as jest.Mock).mockResolvedValue({
        user: { email: 'test@example.com' },
      });
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user-123',
        email: 'test@example.com',
      });

      mockReq.body = {
        propertyId: 'prop-123',
        checkIn: '2025-02-01',
        checkOut: '2025-02-05',
        numberOfGuests: 2,
      };

      (bookingUtils.validateBookingDates as jest.Mock).mockReturnValue({ valid: true });

      mockPrisma.rentalProperty.findUnique.mockResolvedValue({
        id: 'prop-123',
        isActive: true,
        guests: 4,
        basePrice: 100,
        cleaningFee: 50,
        currency: 'TRY',
      });
    });

    it('should return 409 if property is not available', async () => {
      (bookingUtils.checkAvailability as jest.Mock).mockResolvedValue({
        available: false,
        conflictingBookings: [{ id: 'booking-1' }],
      });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(409);
      expect(jsonMock).toHaveBeenCalledWith({
        error: 'Property is not available for selected dates',
        conflictingBookings: [{ id: 'booking-1' }],
      });
    });
  });

  describe('Successful Booking Creation', () => {
    beforeEach(() => {
      (getServerSession as jest.Mock).mockResolvedValue({
        user: { email: 'test@example.com' },
      });
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
        phone: '+905551234567',
      });

      mockReq.body = {
        propertyId: 'prop-123',
        checkIn: '2025-02-01',
        checkOut: '2025-02-05',
        numberOfGuests: 2,
        specialRequests: 'Early check-in please',
      };

      (bookingUtils.validateBookingDates as jest.Mock).mockReturnValue({ valid: true });

      mockPrisma.rentalProperty.findUnique.mockResolvedValue({
        id: 'prop-123',
        isActive: true,
        guests: 4,
        basePrice: 100,
        cleaningFee: 50,
        currency: 'TRY',
      });

      (bookingUtils.checkAvailability as jest.Mock).mockResolvedValue({
        available: true,
      });

      (bookingUtils.calculateNights as jest.Mock).mockReturnValue(4);
      (bookingUtils.calculateBookingPrice as jest.Mock).mockReturnValue({
        subtotal: 400,
        tax: 32,
        serviceFee: 20,
        cleaningFee: 50,
        totalPrice: 502,
      });

      (bookingUtils.generateBookingReference as jest.Mock).mockResolvedValue('BK-ABC123');
    });

    it('should create booking successfully', async () => {
      mockPrisma.rentalPropertyBooking.create.mockResolvedValue({
        id: 'booking-123',
        bookingRef: 'BK-ABC123',
        status: BookingStatus.PENDING,
        checkIn: new Date('2025-02-01'),
        checkOut: new Date('2025-02-05'),
        numberOfNights: 4,
        numberOfGuests: 2,
        nightlyRate: 100,
        subtotal: 400,
        cleaningFee: 50,
        serviceFee: 20,
        tax: 32,
        totalPrice: 502,
        currency: 'TRY',
        property: {
          id: 'prop-123',
          title: 'Beautiful Villa',
          type: 'VILLA',
          mainImage: 'image.jpg',
          city: 'Istanbul',
          district: 'Besiktas',
          checkInTime: '14:00',
          checkOutTime: '11:00',
        },
      });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        booking: expect.objectContaining({
          id: 'booking-123',
          bookingRef: 'BK-ABC123',
          status: BookingStatus.PENDING,
        }),
      });
    });

    it('should use default user info if guest info not provided', async () => {
      mockPrisma.rentalPropertyBooking.create.mockResolvedValue({
        id: 'booking-123',
        bookingRef: 'BK-ABC123',
        property: {},
      });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(mockPrisma.rentalPropertyBooking.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            guestName: 'Test User',
            guestEmail: 'test@example.com',
            guestPhone: '+905551234567',
          }),
        })
      );
    });

    it('should use provided guest info over user defaults', async () => {
      mockReq.body.guestName = 'Custom Name';
      mockReq.body.guestEmail = 'custom@example.com';
      mockReq.body.guestPhone = '+905559999999';

      mockPrisma.rentalPropertyBooking.create.mockResolvedValue({
        id: 'booking-123',
        bookingRef: 'BK-ABC123',
        property: {},
      });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(mockPrisma.rentalPropertyBooking.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            guestName: 'Custom Name',
            guestEmail: 'custom@example.com',
            guestPhone: '+905559999999',
          }),
        })
      );
    });

    it('should include special requests in booking', async () => {
      mockPrisma.rentalPropertyBooking.create.mockResolvedValue({
        id: 'booking-123',
        bookingRef: 'BK-ABC123',
        property: {},
      });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(mockPrisma.rentalPropertyBooking.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            specialRequests: 'Early check-in please',
          }),
        })
      );
    });
  });

  describe('Error Handling', () => {
    beforeEach(() => {
      (getServerSession as jest.Mock).mockResolvedValue({
        user: { email: 'test@example.com' },
      });
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user-123',
        email: 'test@example.com',
      });
    });

    it('should return 500 on unexpected errors', async () => {
      mockReq.body = {
        propertyId: 'prop-123',
        checkIn: '2025-02-01',
        checkOut: '2025-02-05',
        numberOfGuests: 2,
      };

      mockPrisma.rentalProperty.findUnique.mockRejectedValue(
        new Error('Database connection error')
      );

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });
});
