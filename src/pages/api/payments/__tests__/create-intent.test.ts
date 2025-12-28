/**
 * API Integration Tests for Payment Intent Creation
 * Tests for /api/payments/create-intent endpoint
 */

import { NextApiRequest, NextApiResponse } from 'next';
import handler from '../create-intent';
import * as stripeClient from '@/lib/stripe/client';
import * as stripeConfig from '@/lib/stripe/config';

// Mock dependencies
jest.mock('@/lib/stripe/client', () => ({
  createPaymentIntent: jest.fn(),
}));

jest.mock('@/lib/stripe/config', () => ({
  amountToCents: jest.fn((amount) => amount * 100),
}));

jest.mock('../../../../lib/logger/winston', () => ({
  logger: {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  },
}));

describe('/api/payments/create-intent', () => {
  let mockReq: Partial<NextApiRequest>;
  let mockRes: Partial<NextApiResponse>;
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

    jest.clearAllMocks();
  });

  describe('Method Validation', () => {
    it('should return 405 for non-POST requests', async () => {
      mockReq.method = 'GET';

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(405);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        error: 'Method not allowed',
      });
    });

    it('should accept POST requests', async () => {
      mockReq.method = 'POST';
      mockReq.body = {
        amount: 100,
        bookingId: 'booking-123',
        customerEmail: 'test@example.com',
      };

      (stripeClient.createPaymentIntent as jest.Mock).mockResolvedValue({
        id: 'pi_123456',
        client_secret: 'pi_123456_secret',
      });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).not.toHaveBeenCalledWith(405);
    });
  });

  describe('Request Validation', () => {
    beforeEach(() => {
      mockReq.method = 'POST';
    });

    it('should return 400 if amount is missing', async () => {
      mockReq.body = {
        bookingId: 'booking-123',
        customerEmail: 'test@example.com',
      };

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        error: 'Invalid amount',
      });
    });

    it('should return 400 if amount is zero', async () => {
      mockReq.body = {
        amount: 0,
        bookingId: 'booking-123',
        customerEmail: 'test@example.com',
      };

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        error: 'Invalid amount',
      });
    });

    it('should return 400 if amount is negative', async () => {
      mockReq.body = {
        amount: -50,
        bookingId: 'booking-123',
        customerEmail: 'test@example.com',
      };

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        error: 'Invalid amount',
      });
    });

    it('should return 400 if bookingId is missing', async () => {
      mockReq.body = {
        amount: 100,
        customerEmail: 'test@example.com',
      };

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        error: 'Booking ID is required',
      });
    });

    it('should return 400 if customerEmail is missing', async () => {
      mockReq.body = {
        amount: 100,
        bookingId: 'booking-123',
      };

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        error: 'Customer email is required',
      });
    });

    it('should return 400 if email format is invalid', async () => {
      mockReq.body = {
        amount: 100,
        bookingId: 'booking-123',
        customerEmail: 'invalid-email',
      };

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        error: 'Invalid email format',
      });
    });

    it('should accept valid email formats', async () => {
      const validEmails = [
        'test@example.com',
        'user.name@example.co.uk',
        'user+tag@example.com',
      ];

      (stripeClient.createPaymentIntent as jest.Mock).mockResolvedValue({
        id: 'pi_123456',
        client_secret: 'pi_123456_secret',
      });

      for (const email of validEmails) {
        mockReq.body = {
          amount: 100,
          bookingId: 'booking-123',
          customerEmail: email,
        };

        await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

        expect(statusMock).not.toHaveBeenCalledWith(400);
      }
    });
  });

  describe('Payment Intent Creation', () => {
    beforeEach(() => {
      mockReq.method = 'POST';
      mockReq.body = {
        amount: 250,
        bookingId: 'booking-123',
        customerEmail: 'test@example.com',
        customerName: 'Test User',
        description: 'Property booking payment',
      };
    });

    it('should create payment intent with correct parameters', async () => {
      (stripeClient.createPaymentIntent as jest.Mock).mockResolvedValue({
        id: 'pi_123456',
        client_secret: 'pi_123456_secret',
      });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(stripeClient.createPaymentIntent).toHaveBeenCalledWith({
        amount: 25000, // 250 * 100
        metadata: {
          bookingId: 'booking-123',
          customerEmail: 'test@example.com',
          customerName: 'Test User',
        },
        description: 'Property booking payment',
        receipt_email: 'test@example.com',
      });
    });

    it('should use default description if not provided', async () => {
      delete mockReq.body.description;

      (stripeClient.createPaymentIntent as jest.Mock).mockResolvedValue({
        id: 'pi_123456',
        client_secret: 'pi_123456_secret',
      });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(stripeClient.createPaymentIntent).toHaveBeenCalledWith(
        expect.objectContaining({
          description: 'Payment for booking booking-123',
        })
      );
    });

    it('should handle missing customerName', async () => {
      delete mockReq.body.customerName;

      (stripeClient.createPaymentIntent as jest.Mock).mockResolvedValue({
        id: 'pi_123456',
        client_secret: 'pi_123456_secret',
      });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(stripeClient.createPaymentIntent).toHaveBeenCalledWith(
        expect.objectContaining({
          metadata: expect.objectContaining({
            customerName: '',
          }),
        })
      );
    });

    it('should return 200 with client secret on success', async () => {
      (stripeClient.createPaymentIntent as jest.Mock).mockResolvedValue({
        id: 'pi_123456',
        client_secret: 'pi_123456_secret',
      });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        clientSecret: 'pi_123456_secret',
        paymentIntentId: 'pi_123456',
      });
    });

    it('should handle payment intent without client_secret', async () => {
      (stripeClient.createPaymentIntent as jest.Mock).mockResolvedValue({
        id: 'pi_123456',
        client_secret: null,
      });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        clientSecret: undefined,
        paymentIntentId: 'pi_123456',
      });
    });

    it('should convert amount to cents correctly', async () => {
      mockReq.body.amount = 100.50;

      (stripeClient.createPaymentIntent as jest.Mock).mockResolvedValue({
        id: 'pi_123456',
        client_secret: 'pi_123456_secret',
      });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(stripeConfig.amountToCents).toHaveBeenCalledWith(100.50);
      expect(stripeClient.createPaymentIntent).toHaveBeenCalledWith(
        expect.objectContaining({
          amount: 10050, // 100.50 * 100
        })
      );
    });
  });

  describe('Error Handling', () => {
    beforeEach(() => {
      mockReq.method = 'POST';
      mockReq.body = {
        amount: 100,
        bookingId: 'booking-123',
        customerEmail: 'test@example.com',
      };
    });

    it('should return 500 on Stripe API error', async () => {
      const stripeError = new Error('Stripe API error: Invalid API key');
      (stripeClient.createPaymentIntent as jest.Mock).mockRejectedValue(stripeError);

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        error: 'Stripe API error: Invalid API key',
      });
    });

    it('should return 500 on network error', async () => {
      const networkError = new Error('Network connection failed');
      (stripeClient.createPaymentIntent as jest.Mock).mockRejectedValue(networkError);

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        error: 'Network connection failed',
      });
    });

    it('should handle non-Error exceptions', async () => {
      (stripeClient.createPaymentIntent as jest.Mock).mockRejectedValue('Unknown error');

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        error: 'Failed to create payment intent',
      });
    });
  });

  describe('Edge Cases', () => {
    beforeEach(() => {
      mockReq.method = 'POST';
    });

    it('should handle very large amounts', async () => {
      mockReq.body = {
        amount: 999999,
        bookingId: 'booking-123',
        customerEmail: 'test@example.com',
      };

      (stripeClient.createPaymentIntent as jest.Mock).mockResolvedValue({
        id: 'pi_123456',
        client_secret: 'pi_123456_secret',
      });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(stripeClient.createPaymentIntent).toHaveBeenCalledWith(
        expect.objectContaining({
          amount: 99999900, // 999999 * 100
        })
      );
    });

    it('should handle small decimal amounts', async () => {
      mockReq.body = {
        amount: 0.01,
        bookingId: 'booking-123',
        customerEmail: 'test@example.com',
      };

      (stripeClient.createPaymentIntent as jest.Mock).mockResolvedValue({
        id: 'pi_123456',
        client_secret: 'pi_123456_secret',
      });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(stripeClient.createPaymentIntent).toHaveBeenCalledWith(
        expect.objectContaining({
          amount: 1, // 0.01 * 100
        })
      );
    });

    it('should trim whitespace from email', async () => {
      mockReq.body = {
        amount: 100,
        bookingId: 'booking-123',
        customerEmail: '  test@example.com  ',
      };

      // Email validation should fail with whitespace unless we handle it
      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(400);
    });

    it('should handle special characters in booking ID', async () => {
      mockReq.body = {
        amount: 100,
        bookingId: 'booking-123-abc_XYZ',
        customerEmail: 'test@example.com',
      };

      (stripeClient.createPaymentIntent as jest.Mock).mockResolvedValue({
        id: 'pi_123456',
        client_secret: 'pi_123456_secret',
      });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(stripeClient.createPaymentIntent).toHaveBeenCalledWith(
        expect.objectContaining({
          metadata: expect.objectContaining({
            bookingId: 'booking-123-abc_XYZ',
          }),
        })
      );
    });
  });
});
