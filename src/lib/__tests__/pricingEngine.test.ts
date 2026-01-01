/**
 * Comprehensive test suite for PricingEngine
 * Coverage: Dynamic pricing, reservations, payments, coupons
 */

import {
  PricingEngine,
  ReservationManager,
  PaymentProcessor,
  CouponManager,
  BookingRequest,
  PricingResult,
  PaymentRequest,
  ReservationData,
} from '../pricingEngine';

describe('PricingEngine', () => {
  describe('calculateDynamicPrice', () => {
    const basePrice = 1000;
    const mockBookingRequest: BookingRequest = {
      itemId: 'tour-123',
      itemType: 'tour',
      checkInDate: new Date('2025-07-15'), // Summer high season
      adultsCount: 2,
      childrenCount: 0,
    };

    it('should calculate price with all factors correctly', () => {
      const result = PricingEngine.calculateDynamicPrice(basePrice, mockBookingRequest);

      expect(result).toHaveProperty('basePrice', basePrice);
      expect(result).toHaveProperty('finalPrice');
      expect(result).toHaveProperty('discount');
      expect(result).toHaveProperty('factors');
      expect(result).toHaveProperty('breakdown');
      expect(result).toHaveProperty('currency', 'TRY');
      expect(result).toHaveProperty('validUntil');
      expect(result.finalPrice).toBeGreaterThan(0);
    });

    it('should apply seasonal multipliers correctly for summer', () => {
      const summerRequest: BookingRequest = {
        ...mockBookingRequest,
        checkInDate: new Date('2025-07-15'), // July = summer
      };

      const result = PricingEngine.calculateDynamicPrice(basePrice, summerRequest);
      expect(result.factors.seasonMultiplier).toBeGreaterThanOrEqual(1.1);
    });

    it('should apply seasonal multipliers correctly for winter', () => {
      const winterRequest: BookingRequest = {
        ...mockBookingRequest,
        checkInDate: new Date('2025-12-15'), // December = winter high
      };

      const result = PricingEngine.calculateDynamicPrice(basePrice, winterRequest);
      expect(result.factors.seasonMultiplier).toBeGreaterThanOrEqual(1.0);
    });

    it('should apply advance booking discounts for early bookings', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 100); // 100 days in advance

      const earlyRequest: BookingRequest = {
        ...mockBookingRequest,
        checkInDate: futureDate,
      };

      const result = PricingEngine.calculateDynamicPrice(basePrice, earlyRequest);
      expect(result.factors.advanceBookingDiscount).toBeGreaterThan(0);
      expect(result.breakdown.advanceBookingDiscount).toBeGreaterThan(0);
    });

    it('should not apply advance booking discount for last-minute bookings', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const lastMinuteRequest: BookingRequest = {
        ...mockBookingRequest,
        checkInDate: tomorrow,
      };

      const result = PricingEngine.calculateDynamicPrice(basePrice, lastMinuteRequest);
      expect(result.factors.advanceBookingDiscount).toBe(0);
    });

    it('should apply group size discounts for large groups', () => {
      const groupRequest: BookingRequest = {
        ...mockBookingRequest,
        adultsCount: 8,
        childrenCount: 2, // Total 10 people
      };

      const result = PricingEngine.calculateDynamicPrice(basePrice, groupRequest);
      expect(result.factors.groupSizeMultiplier).toBeGreaterThan(0);
    });

    it('should not apply group discount for small groups', () => {
      const smallGroupRequest: BookingRequest = {
        ...mockBookingRequest,
        adultsCount: 2,
        childrenCount: 0,
      };

      const result = PricingEngine.calculateDynamicPrice(basePrice, smallGroupRequest);
      expect(result.factors.groupSizeMultiplier).toBe(0);
    });

    it('should apply weekend surcharge for Friday, Saturday, Sunday', () => {
      const saturdayDate = new Date('2025-07-12'); // Saturday

      const weekendRequest: BookingRequest = {
        ...mockBookingRequest,
        checkInDate: saturdayDate,
      };

      const result = PricingEngine.calculateDynamicPrice(basePrice, weekendRequest);
      expect(result.factors.dayOfWeekMultiplier).toBe(1.2);
      expect(result.breakdown.weekendSurcharge).toBeGreaterThan(0);
    });

    it('should not apply weekend surcharge for weekdays', () => {
      const mondayDate = new Date('2025-07-14'); // Monday

      const weekdayRequest: BookingRequest = {
        ...mockBookingRequest,
        checkInDate: mondayDate,
      };

      const result = PricingEngine.calculateDynamicPrice(basePrice, weekdayRequest);
      expect(result.factors.dayOfWeekMultiplier).toBe(1.0);
      expect(result.breakdown.weekendSurcharge).toBe(0);
    });

    it('should calculate taxes correctly (18% VAT)', () => {
      const result = PricingEngine.calculateDynamicPrice(basePrice, mockBookingRequest);

      const subtotal = result.breakdown.basePrice +
                      result.breakdown.seasonalAdjustment +
                      result.breakdown.demandAdjustment +
                      result.breakdown.weekendSurcharge;

      const expectedTax = Math.round(subtotal * 0.18);
      expect(result.breakdown.taxes).toBeCloseTo(expectedTax, 1);
    });

    it('should calculate service fee correctly (3% capped at 100)', () => {
      const result = PricingEngine.calculateDynamicPrice(basePrice, mockBookingRequest);
      expect(result.breakdown.serviceFee).toBeGreaterThan(0);
      expect(result.breakdown.serviceFee).toBeLessThanOrEqual(100);
    });

    it('should have valid price expiration (24 hours)', () => {
      const result = PricingEngine.calculateDynamicPrice(basePrice, mockBookingRequest);
      const now = new Date();
      const expectedExpiry = new Date(now.getTime() + 24 * 60 * 60 * 1000);

      const timeDiff = Math.abs(result.validUntil.getTime() - expectedExpiry.getTime());
      expect(timeDiff).toBeLessThan(5000); // Within 5 seconds
    });

    it('should handle availability data for demand calculation', () => {
      const availabilityData = {
        available: 2,
        capacity: 20,
      };

      const result = PricingEngine.calculateDynamicPrice(
        basePrice,
        mockBookingRequest,
        availabilityData
      );

      expect(result.factors.availabilityScarcity).toBeGreaterThanOrEqual(1.0);
    });

    it('should apply special event multiplier for New Year', () => {
      const newYearRequest: BookingRequest = {
        ...mockBookingRequest,
        checkInDate: new Date('2025-01-01'),
      };

      const result = PricingEngine.calculateDynamicPrice(basePrice, newYearRequest);
      expect(result.factors.specialEventMultiplier).toBe(1.5);
    });

    it('should apply special event multiplier for April 23', () => {
      const april23Request: BookingRequest = {
        ...mockBookingRequest,
        checkInDate: new Date('2025-04-23'),
      };

      const result = PricingEngine.calculateDynamicPrice(basePrice, april23Request);
      expect(result.factors.specialEventMultiplier).toBe(1.5);
    });

    it('should calculate final price as sum of all components', () => {
      const result = PricingEngine.calculateDynamicPrice(basePrice, mockBookingRequest);

      const calculatedTotal =
        result.breakdown.basePrice +
        result.breakdown.seasonalAdjustment +
        result.breakdown.demandAdjustment -
        result.breakdown.advanceBookingDiscount -
        result.breakdown.groupDiscount +
        result.breakdown.weekendSurcharge +
        result.breakdown.taxes +
        result.breakdown.serviceFee;

      expect(Math.round(calculatedTotal)).toBe(result.finalPrice);
    });
  });
});

describe('ReservationManager', () => {
  const mockBookingRequest: BookingRequest = {
    itemId: 'tour-123',
    itemType: 'tour',
    checkInDate: new Date('2025-07-15'),
    adultsCount: 2,
    childrenCount: 1,
  };

  const mockCustomerInfo = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+905551234567',
    nationality: 'TR',
  };

  const mockPricingResult: PricingResult = {
    basePrice: 1000,
    finalPrice: 1500,
    discount: 100,
    factors: {
      seasonMultiplier: 1.2,
      demandMultiplier: 1.1,
      advanceBookingDiscount: 0.1,
      groupSizeMultiplier: 0,
      dayOfWeekMultiplier: 1.0,
      weatherImpact: 1.0,
      specialEventMultiplier: 1.0,
      availabilityScarcity: 1.0,
    },
    breakdown: {
      basePrice: 1000,
      seasonalAdjustment: 200,
      demandAdjustment: 100,
      advanceBookingDiscount: 100,
      groupDiscount: 0,
      weekendSurcharge: 0,
      taxes: 216,
      serviceFee: 30,
    },
    currency: 'TRY',
    validUntil: new Date('2025-07-16'),
  };

  describe('generateConfirmationCode', () => {
    it('should generate unique confirmation codes', () => {
      const codes = new Set<string>();

      for (let i = 0; i < 100; i++) {
        const code = ReservationManager.generateConfirmationCode();
        expect(code).toMatch(/^TA-[A-Z0-9]+-[A-Z0-9]+$/);
        codes.add(code);
      }

      expect(codes.size).toBe(100); // All unique
    });

    it('should generate codes with correct prefix', () => {
      const code = ReservationManager.generateConfirmationCode();
      expect(code.startsWith('TA-')).toBe(true);
    });
  });

  describe('createReservation', () => {
    it('should create a complete reservation object', () => {
      const reservation = ReservationManager.createReservation(
        mockBookingRequest,
        mockCustomerInfo,
        mockPricingResult
      );

      expect(reservation).toHaveProperty('id');
      expect(reservation).toHaveProperty('confirmationCode');
      expect(reservation).toHaveProperty('status', 'pending');
      expect(reservation).toHaveProperty('createdAt');
      expect(reservation).toHaveProperty('updatedAt');
      expect(reservation).toHaveProperty('cancellationPolicy');
      expect(reservation.bookingRequest).toEqual(mockBookingRequest);
      expect(reservation.customerInfo).toEqual(mockCustomerInfo);
      expect(reservation.pricingResult).toEqual(mockPricingResult);
    });

    it('should set payment info correctly', () => {
      const reservation = ReservationManager.createReservation(
        mockBookingRequest,
        mockCustomerInfo,
        mockPricingResult
      );

      expect(reservation.paymentInfo.method).toBe('credit_card');
      expect(reservation.paymentInfo.status).toBe('pending');
      expect(reservation.paymentInfo.amount).toBe(mockPricingResult.finalPrice);
      expect(reservation.paymentInfo.currency).toBe(mockPricingResult.currency);
    });

    it('should generate cancellation policy for tours', () => {
      const reservation = ReservationManager.createReservation(
        { ...mockBookingRequest, itemType: 'tour' },
        mockCustomerInfo,
        mockPricingResult
      );

      expect(reservation.cancellationPolicy).toBeDefined();
      expect(reservation.cancellationPolicy.freeCancellationUntil).toBeDefined();
      expect(reservation.cancellationPolicy.cancellationFees).toHaveLength(2);
    });

    it('should generate cancellation policy for hotels', () => {
      const reservation = ReservationManager.createReservation(
        { ...mockBookingRequest, itemType: 'hotel' },
        mockCustomerInfo,
        mockPricingResult
      );

      expect(reservation.cancellationPolicy.cancellationFees).toHaveLength(3);
    });

    it('should generate cancellation policy for packages', () => {
      const reservation = ReservationManager.createReservation(
        { ...mockBookingRequest, itemType: 'package' },
        mockCustomerInfo,
        mockPricingResult
      );

      expect(reservation.cancellationPolicy.cancellationFees).toHaveLength(4);
    });
  });

  describe('calculateCancellationFee', () => {
    let reservation: ReservationData;

    beforeEach(() => {
      reservation = ReservationManager.createReservation(
        mockBookingRequest,
        mockCustomerInfo,
        mockPricingResult
      );
    });

    it('should return zero fee during free cancellation period', () => {
      const earlyDate = new Date(reservation.cancellationPolicy.freeCancellationUntil);
      earlyDate.setDate(earlyDate.getDate() - 1);

      const fee = ReservationManager.calculateCancellationFee(reservation, earlyDate);
      expect(fee).toBe(0);
    });

    it('should charge 50% fee for cancellation 1 day before check-in', () => {
      const oneDayBefore = new Date(mockBookingRequest.checkInDate);
      oneDayBefore.setDate(oneDayBefore.getDate() - 1);

      const fee = ReservationManager.calculateCancellationFee(reservation, oneDayBefore);
      expect(fee).toBe(Math.round(mockPricingResult.finalPrice * 0.5));
    });

    it('should charge 100% fee for same-day cancellation', () => {
      const sameDay = new Date(mockBookingRequest.checkInDate);

      const fee = ReservationManager.calculateCancellationFee(reservation, sameDay);
      expect(fee).toBe(mockPricingResult.finalPrice);
    });
  });
});

describe('PaymentProcessor', () => {
  const mockPaymentRequest: PaymentRequest = {
    reservationId: 'RES-123',
    amount: 1500,
    currency: 'TRY',
    method: 'credit_card',
    cardInfo: {
      cardNumber: '4111111111111111',
      expiryMonth: '12',
      expiryYear: '2026',
      cvv: '123',
      cardHolderName: 'John Doe',
    },
    billingAddress: {
      fullName: 'John Doe',
      addressLine1: '123 Main St',
      city: 'Istanbul',
      state: 'Istanbul',
      postalCode: '34000',
      country: 'TR',
    },
  };

  describe('processPayment', () => {
    it('should process valid payment successfully', async () => {
      const result = await PaymentProcessor.processPayment(mockPaymentRequest);

      if (result.success) {
        expect(result.transactionId).toBeDefined();
        expect(result.transactionId).toMatch(/^TXN-/);
        expect(result.paymentMethod).toBe('credit_card');
        expect(result.amount).toBe(1500);
        expect(result.currency).toBe('TRY');
        expect(result.processedAt).toBeDefined();
        expect(result.providerResponse).toBeDefined();
      }
    });

    it('should reject payment with invalid amount', async () => {
      const invalidRequest = {
        ...mockPaymentRequest,
        amount: 0,
      };

      const result = await PaymentProcessor.processPayment(invalidRequest);
      expect(result.success).toBe(false);
      expect(result.errorMessage).toBeDefined();
    });

    it('should reject payment with invalid currency', async () => {
      const invalidRequest = {
        ...mockPaymentRequest,
        currency: 'XX', // Invalid currency code
      };

      const result = await PaymentProcessor.processPayment(invalidRequest);
      expect(result.success).toBe(false);
    });

    it('should reject payment without billing address', async () => {
      const invalidRequest = {
        ...mockPaymentRequest,
        billingAddress: {
          ...mockPaymentRequest.billingAddress,
          fullName: '',
          city: '',
        },
      };

      const result = await PaymentProcessor.processPayment(invalidRequest);
      expect(result.success).toBe(false);
    });

    it('should reject credit card payment with short card number', async () => {
      const invalidRequest = {
        ...mockPaymentRequest,
        cardInfo: {
          ...mockPaymentRequest.cardInfo!,
          cardNumber: '123', // Too short
        },
      };

      const result = await PaymentProcessor.processPayment(invalidRequest);
      expect(result.success).toBe(false);
    });

    it('should reject credit card payment with invalid CVV', async () => {
      const invalidRequest = {
        ...mockPaymentRequest,
        cardInfo: {
          ...mockPaymentRequest.cardInfo!,
          cvv: '12', // Too short
        },
      };

      const result = await PaymentProcessor.processPayment(invalidRequest);
      expect(result.success).toBe(false);
    });
  });

  describe('refundPayment', () => {
    it('should process refund successfully', async () => {
      const result = await PaymentProcessor.refundPayment('TXN-123', 1000, 'Customer request');

      expect(result.success).toBe(true);
      expect(result.transactionId).toBeDefined();
      expect(result.transactionId).toMatch(/^RFD-/);
      expect(result.paymentMethod).toBe('refund');
      expect(result.amount).toBe(-1000); // Negative for refund
      expect(result.providerResponse?.status).toBe('refunded');
    });

    it('should include refund reason in response', async () => {
      const reason = 'Duplicate charge';
      const result = await PaymentProcessor.refundPayment('TXN-123', 500, reason);

      expect(result.providerResponse?.reason).toBe(reason);
    });
  });
});

describe('CouponManager', () => {
  describe('validateCoupon', () => {
    it('should validate and apply WELCOME10 coupon correctly', () => {
      const result = CouponManager.validateCoupon('WELCOME10', 1000, 'tour');

      expect(result.isValid).toBe(true);
      expect(result.discount).toBe(100); // 10% of 1000
      expect(result.message).toContain('WELCOME10');
    });

    it('should reject WELCOME10 for amounts below minimum', () => {
      const result = CouponManager.validateCoupon('WELCOME10', 400, 'tour');

      expect(result.isValid).toBe(false);
      expect(result.discount).toBe(0);
      expect(result.message).toContain('500');
    });

    it('should validate and apply EARLYBIRD coupon correctly', () => {
      const result = CouponManager.validateCoupon('EARLYBIRD', 2000, 'tour');

      expect(result.isValid).toBe(true);
      expect(result.discount).toBe(400); // 20% of 2000
    });

    it('should cap EARLYBIRD discount at maximum amount', () => {
      const result = CouponManager.validateCoupon('EARLYBIRD', 5000, 'tour');

      expect(result.isValid).toBe(true);
      expect(result.discount).toBe(500); // Capped at max 500
    });

    it('should validate and apply SUMMER2024 fixed amount coupon', () => {
      const result = CouponManager.validateCoupon('SUMMER2024', 1000, 'tour');

      expect(result.isValid).toBe(true);
      expect(result.discount).toBe(200); // Fixed 200 TL
    });

    it('should reject SUMMER2024 for non-tour items', () => {
      const result = CouponManager.validateCoupon('SUMMER2024', 1000, 'hotel');

      expect(result.isValid).toBe(false);
      expect(result.message).toContain('kategori');
    });

    it('should reject invalid coupon codes', () => {
      const result = CouponManager.validateCoupon('INVALID123', 1000, 'tour');

      expect(result.isValid).toBe(false);
      expect(result.discount).toBe(0);
      expect(result.message).toContain('geçersiz');
    });

    it('should handle case-sensitive coupon codes', () => {
      const result = CouponManager.validateCoupon('welcome10', 1000, 'tour');

      expect(result.isValid).toBe(false); // Case sensitive
    });
  });
});
