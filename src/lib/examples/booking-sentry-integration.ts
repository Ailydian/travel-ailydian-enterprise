/**
 * Booking Flow Sentry Integration Examples
 * Demonstrates how to integrate Sentry tracking into critical business flows
 * Travel.AILYDIAN Platform
 */

import {
  measureBookingStep,
  trackBookingError,
  trackBookingSuccess,
  trackPaymentError,
  trackPaymentSuccess,
  measurePayment,
  addBreadcrumb,
  setUserContext,
} from '../monitoring/sentry-advanced';

// ============================================================================
// HOTEL BOOKING EXAMPLE
// ============================================================================

/**
 * Example: Hotel booking with Sentry instrumentation
 */
export async function createHotelBooking(
  userId: string,
  hotelId: string,
  checkIn: Date,
  checkOut: Date,
  guests: number,
  rooms: number
) {
  // Set user context
  setUserContext(userId, 'customer');

  try {
    // Step 1: Validate availability
    addBreadcrumb(
      'Starting hotel availability check',
      'booking',
      { hotelId, checkIn: checkIn.toISOString(), checkOut: checkOut.toISOString() },
      'info'
    );

    const availability = await measureBookingStep(
      'search',
      'hotel',
      async () => {
        // API call to check availability
        const response = await fetch('/api/hotels/availability', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ hotelId, checkIn, checkOut, guests, rooms }),
        });

        if (!response.ok) {
          throw new Error(`Availability check failed: ${response.statusText}`);
        }

        return response.json();
      },
      { bookingType: 'hotel', userId }
    );

    if (!availability.available) {
      const error = new Error('Hotel not available for selected dates');
      trackBookingError(error, {
        bookingType: 'hotel',
        step: 'search',
        userId,
      });
      throw error;
    }

    // Step 2: Create booking
    addBreadcrumb(
      'Creating hotel booking',
      'booking',
      { hotelId, guests, rooms },
      'info'
    );

    const booking = await measureBookingStep(
      'selection',
      'hotel',
      async () => {
        const response = await fetch('/api/bookings/property/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            propertyId: hotelId,
            checkIn,
            checkOut,
            guests,
            rooms,
          }),
        });

        if (!response.ok) {
          throw new Error(`Booking creation failed: ${response.statusText}`);
        }

        return response.json();
      },
      { bookingType: 'hotel', userId }
    );

    // Step 3: Process payment
    addBreadcrumb(
      'Processing payment',
      'payment',
      { bookingId: booking.id, amount: booking.total },
      'info'
    );

    const payment = await measurePayment(
      'stripe',
      async () => {
        const response = await fetch('/api/payments/create-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bookingId: booking.id,
            amount: booking.total,
            currency: 'TRY',
          }),
        });

        if (!response.ok) {
          throw new Error(`Payment intent creation failed: ${response.statusText}`);
        }

        return response.json();
      },
      {
        paymentId: booking.id,
        amount: booking.total,
        currency: 'TRY',
        method: 'card',
        userId,
      }
    );

    // Track successful payment
    trackPaymentSuccess({
      paymentId: payment.id,
      provider: 'stripe',
      amount: booking.total,
      currency: 'TRY',
      method: 'card',
      userId,
    });

    // Step 4: Confirm booking
    await measureBookingStep(
      'confirmation',
      'hotel',
      async () => {
        const response = await fetch('/api/bookings/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bookingId: booking.id }),
        });

        if (!response.ok) {
          throw new Error(`Booking confirmation failed: ${response.statusText}`);
        }

        return response.json();
      },
      { bookingType: 'hotel', bookingId: booking.id, userId }
    );

    // Track successful booking
    trackBookingSuccess({
      bookingId: booking.id,
      bookingType: 'hotel',
      step: 'confirmation',
      userId,
      amount: booking.total,
      currency: 'TRY',
    });

    return booking;
  } catch (error) {
    // Track booking error
    trackBookingError(error as Error, {
      bookingType: 'hotel',
      step: 'payment',
      userId,
    });

    throw error;
  }
}

// ============================================================================
// CAR RENTAL BOOKING EXAMPLE
// ============================================================================

/**
 * Example: Car rental booking with Sentry instrumentation
 */
export async function createCarRentalBooking(
  userId: string,
  carId: string,
  pickupDate: Date,
  returnDate: Date,
  pickupLocation: string,
  returnLocation: string
) {
  setUserContext(userId, 'customer');

  try {
    // Search step
    const availability = await measureBookingStep(
      'search',
      'car',
      async () => {
        const response = await fetch('/api/car-rentals/availability', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            carId,
            pickupDate,
            returnDate,
            pickupLocation,
            returnLocation,
          }),
        });

        if (!response.ok) {
          throw new Error('Car availability check failed');
        }

        return response.json();
      },
      { bookingType: 'car', userId }
    );

    // Selection step
    const booking = await measureBookingStep(
      'selection',
      'car',
      async () => {
        const response = await fetch('/api/bookings/car-rental/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            carId,
            pickupDate,
            returnDate,
            pickupLocation,
            returnLocation,
          }),
        });

        if (!response.ok) {
          throw new Error('Car rental booking creation failed');
        }

        return response.json();
      },
      { bookingType: 'car', userId }
    );

    // Payment step
    await measurePayment(
      'stripe',
      async () => {
        const response = await fetch('/api/payments/create-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bookingId: booking.id,
            amount: booking.total,
            currency: 'TRY',
          }),
        });

        if (!response.ok) {
          throw new Error('Payment failed');
        }

        return response.json();
      },
      {
        amount: booking.total,
        currency: 'TRY',
        provider: 'stripe',
        method: 'card',
        userId,
      }
    );

    trackBookingSuccess({
      bookingId: booking.id,
      bookingType: 'car',
      step: 'confirmation',
      userId,
      amount: booking.total,
      currency: 'TRY',
    });

    return booking;
  } catch (error) {
    trackBookingError(error as Error, {
      bookingType: 'car',
      step: 'payment',
      userId,
    });

    throw error;
  }
}

// ============================================================================
// PAYMENT PROCESSING EXAMPLE
// ============================================================================

/**
 * Example: Stripe payment with Sentry instrumentation
 */
export async function processStripePayment(
  bookingId: string,
  amount: number,
  currency: string,
  paymentMethodId: string,
  userId: string
) {
  try {
    addBreadcrumb(
      'Starting Stripe payment',
      'payment',
      { bookingId, amount, currency },
      'info'
    );

    const paymentIntent = await measurePayment(
      'stripe',
      async () => {
        const response = await fetch('/api/payments/create-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bookingId,
            amount,
            currency,
            paymentMethodId,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'Payment failed');
        }

        return response.json();
      },
      {
        paymentId: bookingId,
        amount,
        currency,
        provider: 'stripe',
        method: 'card',
        userId,
      }
    );

    if (paymentIntent.status === 'succeeded') {
      trackPaymentSuccess({
        paymentId: paymentIntent.id,
        provider: 'stripe',
        amount,
        currency,
        method: 'card',
        userId,
      });
    } else {
      const error = new Error(`Payment status: ${paymentIntent.status}`);
      trackPaymentError(error, {
        paymentId: paymentIntent.id,
        provider: 'stripe',
        amount,
        currency,
        method: 'card',
        userId,
      });
      throw error;
    }

    return paymentIntent;
  } catch (error) {
    trackPaymentError(error as Error, {
      paymentId: bookingId,
      provider: 'stripe',
      amount,
      currency,
      method: 'card',
      userId,
    });

    throw error;
  }
}

// ============================================================================
// API ROUTE EXAMPLE WITH SENTRY MIDDLEWARE
// ============================================================================

/**
 * Example: API route using Sentry middleware
 *
 * File: pages/api/bookings/property/create.ts
 */
/*
import { withSentryApiHandler, validateMethod, validateRequiredFields, ApiErrors } from '@/lib/middleware/sentry-api-handler';
import { measureBookingStep, trackBookingSuccess } from '@/lib/monitoring/sentry-advanced';

export default withSentryApiHandler(async (req, res) => {
  // Validate HTTP method
  validateMethod(req, ['POST']);

  // Validate required fields
  const data = validateRequiredFields(req.body, [
    'userId',
    'propertyId',
    'checkIn',
    'checkOut',
    'guests',
  ]);

  try {
    // Create booking with performance tracking
    const booking = await measureBookingStep(
      'selection',
      'hotel',
      async () => {
        // Database operation
        return await prisma.booking.create({
          data: {
            userId: data.userId,
            propertyId: data.propertyId,
            checkIn: new Date(data.checkIn),
            checkOut: new Date(data.checkOut),
            guests: data.guests,
            status: 'PENDING',
          },
        });
      },
      { userId: data.userId }
    );

    // Track success
    trackBookingSuccess({
      bookingId: booking.id,
      bookingType: 'hotel',
      step: 'selection',
      userId: data.userId,
    });

    res.status(201).json({ booking });
  } catch (error) {
    // Error automatically tracked by middleware
    throw error;
  }
}, {
  trackPerformance: true,
  tags: {
    feature: 'booking',
    booking_type: 'hotel',
  },
});
*/

// ============================================================================
// EXPORTS
// ============================================================================

export {
  createHotelBooking,
  createCarRentalBooking,
  processStripePayment,
};
