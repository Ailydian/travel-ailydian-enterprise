/**
 * Component Tests for StripeCheckout
 * Tests for StripeCheckout.tsx component
 */

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StripeCheckout from '../StripeCheckout';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Mock Stripe
jest.mock('@stripe/react-stripe-js', () => ({
  Elements: ({ children }: any) => <div data-testid="stripe-elements">{children}</div>,
  PaymentElement: () => <div data-testid="payment-element">Payment Element</div>,
  useStripe: jest.fn(),
  useElements: jest.fn(),
}));

jest.mock('@stripe/stripe-js', () => ({
  loadStripe: jest.fn(() => Promise.resolve({})),
}));

jest.mock('@/lib/stripe/config', () => ({
  stripeConfig: {
    publishableKey: 'pk_test_123456789',
    currency: 'try',
  },
  formatAmount: (amount: number) => `₺${(amount / 100).toFixed(2)}`,
}));

// Mock fetch
global.fetch = jest.fn();

describe('StripeCheckout', () => {
  const mockStripe = {
    confirmPayment: jest.fn(),
  };

  const mockElements = {
    submit: jest.fn(),
  };

  const defaultProps = {
    amount: 100,
    bookingId: 'booking-123',
    customerEmail: 'test@example.com',
    customerName: 'Test User',
    description: 'Test booking',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useStripe as jest.Mock).mockReturnValue(mockStripe);
    (useElements as jest.Mock).mockReturnValue(mockElements);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render loading state initially', async () => {
      (global.fetch as jest.Mock).mockImplementation(() =>
        new Promise((resolve) => setTimeout(resolve, 100))
      );

      render(<StripeCheckout {...defaultProps} />);

      expect(screen.getByTestId('stripe-elements')).toBeInTheDocument();
      await waitFor(() => {
        const spinner = document.querySelector('.animate-spin');
        expect(spinner).toBeInTheDocument();
      });
    });

    it('should render payment form after loading', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          clientSecret: 'pi_test_secret',
        }),
      });

      render(<StripeCheckout {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('payment-element')).toBeInTheDocument();
      });
    });

    it('should display correct amount', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          clientSecret: 'pi_test_secret',
        }),
      });

      render(<StripeCheckout {...defaultProps} amount={250} />);

      await waitFor(() => {
        expect(screen.getByText('₺250.00')).toBeInTheDocument();
      });
    });

    it('should render submit button with correct text', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          clientSecret: 'pi_test_secret',
        }),
      });

      render(<StripeCheckout {...defaultProps} amount={100} />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Pay ₺100\.00/i })).toBeInTheDocument();
      });
    });

    it('should display security message', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          clientSecret: 'pi_test_secret',
        }),
      });

      render(<StripeCheckout {...defaultProps} />);

      await waitFor(() => {
        expect(
          screen.getByText(/Your payment is secured by Stripe/i)
        ).toBeInTheDocument();
      });
    });
  });

  describe('Payment Intent Creation', () => {
    it('should create payment intent on mount', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          clientSecret: 'pi_test_secret',
        }),
      });

      render(<StripeCheckout {...defaultProps} />);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/payments/create-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: 100,
            bookingId: 'booking-123',
            customerEmail: 'test@example.com',
            customerName: 'Test User',
            description: 'Test booking',
          }),
        });
      });
    });

    it('should handle payment intent creation error', async () => {
      const mockOnError = jest.fn();
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          success: false,
          error: 'Payment intent creation failed',
        }),
      });

      render(<StripeCheckout {...defaultProps} onError={mockOnError} />);

      await waitFor(() => {
        expect(mockOnError).toHaveBeenCalledWith('Payment intent creation failed');
      });
    });

    it('should display error message on payment intent failure', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          success: false,
          error: 'Invalid amount',
        }),
      });

      render(<StripeCheckout {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText(/Invalid amount/i)).toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          clientSecret: 'pi_test_secret',
        }),
      });
    });

    it('should submit payment on form submit', async () => {
      mockStripe.confirmPayment.mockResolvedValue({
        paymentIntent: {
          id: 'pi_123456',
          status: 'succeeded',
        },
      });

      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true, clientSecret: 'pi_test_secret' }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true }),
        });

      render(<StripeCheckout {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('payment-element')).toBeInTheDocument();
      });

      const submitButton = screen.getByRole('button', { name: /Pay/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockStripe.confirmPayment).toHaveBeenCalled();
      });
    });

    it('should disable submit button when Stripe is not loaded', async () => {
      (useStripe as jest.Mock).mockReturnValue(null);

      render(<StripeCheckout {...defaultProps} />);

      await waitFor(() => {
        const submitButton = screen.getByRole('button', { name: /Pay/i });
        expect(submitButton).toBeDisabled();
      });
    });

    it('should show loading state during submission', async () => {
      mockStripe.confirmPayment.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

      render(<StripeCheckout {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('payment-element')).toBeInTheDocument();
      });

      const submitButton = screen.getByRole('button', { name: /Pay/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Processing.../i)).toBeInTheDocument();
      });
    });

    it('should call onSuccess callback on successful payment', async () => {
      const mockOnSuccess = jest.fn();
      mockStripe.confirmPayment.mockResolvedValue({
        paymentIntent: {
          id: 'pi_123456',
          status: 'succeeded',
        },
      });

      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true, clientSecret: 'pi_test_secret' }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true }),
        });

      render(<StripeCheckout {...defaultProps} onSuccess={mockOnSuccess} />);

      await waitFor(() => {
        expect(screen.getByTestId('payment-element')).toBeInTheDocument();
      });

      const submitButton = screen.getByRole('button', { name: /Pay/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSuccess).toHaveBeenCalledWith('pi_123456');
      });
    });

    it('should handle payment confirmation error', async () => {
      const mockOnError = jest.fn();
      mockStripe.confirmPayment.mockResolvedValue({
        error: {
          message: 'Card declined',
        },
      });

      render(<StripeCheckout {...defaultProps} onError={mockOnError} />);

      await waitFor(() => {
        expect(screen.getByTestId('payment-element')).toBeInTheDocument();
      });

      const submitButton = screen.getByRole('button', { name: /Pay/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnError).toHaveBeenCalledWith('Card declined');
        expect(screen.getByText(/Card declined/i)).toBeInTheDocument();
      });
    });

    it('should handle backend confirmation error', async () => {
      mockStripe.confirmPayment.mockResolvedValue({
        paymentIntent: {
          id: 'pi_123456',
          status: 'succeeded',
        },
      });

      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true, clientSecret: 'pi_test_secret' }),
        })
        .mockResolvedValueOnce({
          ok: false,
          json: async () => ({ success: false, error: 'Booking not found' }),
        });

      const mockOnError = jest.fn();
      render(<StripeCheckout {...defaultProps} onError={mockOnError} />);

      await waitFor(() => {
        expect(screen.getByTestId('payment-element')).toBeInTheDocument();
      });

      const submitButton = screen.getByRole('button', { name: /Pay/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnError).toHaveBeenCalledWith('Booking not found');
      });
    });
  });

  describe('Error Handling', () => {
    it('should display error message in UI', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          success: false,
          error: 'Network error',
        }),
      });

      render(<StripeCheckout {...defaultProps} />);

      await waitFor(() => {
        const errorElement = screen.getByText(/Network error/i);
        expect(errorElement).toBeInTheDocument();
        expect(errorElement.closest('div')).toHaveClass('bg-red-50');
      });
    });

    it('should clear error on new submission', async () => {
      mockStripe.confirmPayment
        .mockResolvedValueOnce({
          error: { message: 'First error' },
        })
        .mockResolvedValueOnce({
          paymentIntent: { id: 'pi_123456', status: 'succeeded' },
        });

      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true, clientSecret: 'pi_test_secret' }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true }),
        });

      render(<StripeCheckout {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('payment-element')).toBeInTheDocument();
      });

      const submitButton = screen.getByRole('button', { name: /Pay/i });

      // First submission - error
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(screen.getByText(/First error/i)).toBeInTheDocument();
      });

      // Second submission - should clear error
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(screen.queryByText(/First error/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have accessible form structure', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          clientSecret: 'pi_test_secret',
        }),
      });

      render(<StripeCheckout {...defaultProps} />);

      await waitFor(() => {
        const form = screen.getByRole('button', { name: /Pay/i }).closest('form');
        expect(form).toBeInTheDocument();
      });
    });

    it('should disable button during loading', async () => {
      mockStripe.confirmPayment.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

      render(<StripeCheckout {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('payment-element')).toBeInTheDocument();
      });

      const submitButton = screen.getByRole('button', { name: /Pay/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(submitButton).toBeDisabled();
      });
    });
  });
});
