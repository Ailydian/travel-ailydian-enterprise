// Dinamik Fiyatlandırma ve Rezervasyon Sistemi

export interface PricingFactors {
  seasonMultiplier: number;
  demandMultiplier: number;
  advanceBookingDiscount: number;
  groupSizeMultiplier: number;
  dayOfWeekMultiplier: number;
  weatherImpact: number;
  specialEventMultiplier: number;
  availabilityScarcity: number;
}

export interface BookingRequest {
  itemId: string;
  itemType: 'tour' | 'hotel' | 'package';
  checkInDate: Date;
  checkOutDate?: Date;
  adultsCount: number;
  childrenCount: number;
  roomType?: string;
  specialRequests?: string[];
}

export interface PricingResult {
  basePrice: number;
  finalPrice: number;
  discount: number;
  factors: PricingFactors;
  breakdown: {
    basePrice: number;
    seasonalAdjustment: number;
    demandAdjustment: number;
    advanceBookingDiscount: number;
    groupDiscount: number;
    weekendSurcharge: number;
    taxes: number;
    serviceFee: number;
  };
  currency: string;
  validUntil: Date;
}

export interface ReservationData {
  id: string;
  userId: string;
  bookingRequest: BookingRequest;
  pricingResult: PricingResult;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    nationality: string;
    passportNumber?: string;
    specialRequirements?: string[];
  };
  paymentInfo: {
    method: 'credit_card' | 'bank_transfer' | 'paypal' | 'crypto';
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    transactionId?: string;
    amount: number;
    currency: string;
    paymentDate?: Date;
  };
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  confirmationCode: string;
  cancellationPolicy: {
    freeCancellationUntil: Date;
    cancellationFees: {
      days: number;
      feePercentage: number;
    }[];
  };
}

export class PricingEngine {
  private static readonly SEASON_MULTIPLIERS = {
    spring: { low: 0.8, medium: 1.0, high: 1.2 },
    summer: { low: 1.1, medium: 1.3, high: 1.5 },
    autumn: { low: 0.9, medium: 1.1, high: 1.3 },
    winter: { low: 0.7, medium: 0.9, high: 1.1 }
  };

  private static readonly DEMAND_THRESHOLDS = {
    low: 0.3,
    medium: 0.7,
    high: 0.9
  };

  private static readonly ADVANCE_BOOKING_DISCOUNTS = [
    { days: 90, discount: 0.25 },
    { days: 60, discount: 0.20 },
    { days: 30, discount: 0.15 },
    { days: 14, discount: 0.10 },
    { days: 7, discount: 0.05 }
  ];

  private static readonly GROUP_SIZE_DISCOUNTS = [
    { minSize: 10, discount: 0.15 },
    { minSize: 6, discount: 0.10 },
    { minSize: 4, discount: 0.05 }
  ];

  static calculateDynamicPrice(
    basePrice: number,
    bookingRequest: BookingRequest,
    availabilityData?: any
  ): PricingResult {
    const factors = this.calculatePricingFactors(bookingRequest, availabilityData);
    const breakdown = this.calculatePriceBreakdown(basePrice, factors, bookingRequest);
    
    const finalPrice = Math.round(breakdown.basePrice + 
      breakdown.seasonalAdjustment + 
      breakdown.demandAdjustment - 
      breakdown.advanceBookingDiscount - 
      breakdown.groupDiscount + 
      breakdown.weekendSurcharge + 
      breakdown.taxes + 
      breakdown.serviceFee);

    const totalDiscount = breakdown.advanceBookingDiscount + breakdown.groupDiscount;

    return {
      basePrice,
      finalPrice,
      discount: totalDiscount,
      factors,
      breakdown,
      currency: 'TRY',
      validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 saat geçerli
    };
  }

  private static calculatePricingFactors(
    bookingRequest: BookingRequest,
    availabilityData?: any
  ): PricingFactors {
    const bookingDate = bookingRequest.checkInDate;
    const totalGuests = bookingRequest.adultsCount + bookingRequest.childrenCount;

    return {
      seasonMultiplier: this.getSeasonMultiplier(bookingDate),
      demandMultiplier: this.getDemandMultiplier(bookingDate, availabilityData),
      advanceBookingDiscount: this.getAdvanceBookingDiscount(bookingDate),
      groupSizeMultiplier: this.getGroupSizeDiscount(totalGuests),
      dayOfWeekMultiplier: this.getDayOfWeekMultiplier(bookingDate),
      weatherImpact: this.getWeatherImpact(bookingDate, bookingRequest.itemType),
      specialEventMultiplier: this.getSpecialEventMultiplier(bookingDate),
      availabilityScarcity: this.getAvailabilityScarcity(availabilityData)
    };
  }

  private static calculatePriceBreakdown(
    basePrice: number,
    factors: PricingFactors,
    bookingRequest: BookingRequest
  ) {
    const seasonalAdjustment = basePrice * (factors.seasonMultiplier - 1);
    const demandAdjustment = basePrice * (factors.demandMultiplier - 1);
    const advanceBookingDiscount = basePrice * factors.advanceBookingDiscount;
    const groupDiscount = basePrice * factors.groupSizeMultiplier;
    const weekendSurcharge = basePrice * (factors.dayOfWeekMultiplier - 1);
    
    const subtotal = basePrice + seasonalAdjustment + demandAdjustment + weekendSurcharge;
    const taxes = subtotal * 0.18; // %18 KDV
    const serviceFee = Math.min(subtotal * 0.03, 100); // %3 hizmet bedeli, max 100 TL

    return {
      basePrice,
      seasonalAdjustment: Math.round(seasonalAdjustment),
      demandAdjustment: Math.round(demandAdjustment),
      advanceBookingDiscount: Math.round(advanceBookingDiscount),
      groupDiscount: Math.round(groupDiscount),
      weekendSurcharge: Math.round(weekendSurcharge),
      taxes: Math.round(taxes),
      serviceFee: Math.round(serviceFee)
    };
  }

  private static getSeasonMultiplier(date: Date): number {
    const month = date.getMonth();
    
    // Yüksek sezon: Haziran-Ağustos, Aralık-Şubat
    if ([5, 6, 7, 11, 0, 1].includes(month)) return 1.3;
    // Orta sezon: Mart-Mayıs, Eylül-Kasım
    if ([2, 3, 4, 8, 9, 10].includes(month)) return 1.1;
    // Düşük sezon: diğer aylar
    return 0.9;
  }

  private static getDemandMultiplier(date: Date, availabilityData?: any): number {
    // Gerçek sistemde availability data'dan hesaplanır
    // Şimdilik random bir değer döndürüyoruz
    const occupancyRate = Math.random();
    
    if (occupancyRate > 0.9) return 1.4;
    if (occupancyRate > 0.7) return 1.2;
    if (occupancyRate > 0.5) return 1.1;
    return 1.0;
  }

  private static getAdvanceBookingDiscount(bookingDate: Date): number {
    const daysInAdvance = Math.floor((bookingDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    
    for (const discount of this.ADVANCE_BOOKING_DISCOUNTS) {
      if (daysInAdvance >= discount.days) {
        return discount.discount;
      }
    }
    return 0;
  }

  private static getGroupSizeDiscount(groupSize: number): number {
    for (const discount of this.GROUP_SIZE_DISCOUNTS) {
      if (groupSize >= discount.minSize) {
        return discount.discount;
      }
    }
    return 0;
  }

  private static getDayOfWeekMultiplier(date: Date): number {
    const dayOfWeek = date.getDay();
    // Hafta sonu (Cuma, Cumartesi, Pazar) için %20 ek ücret
    if ([5, 6, 0].includes(dayOfWeek)) return 1.2;
    return 1.0;
  }

  private static getWeatherImpact(date: Date, itemType: string): number {
    // Hava durumu etkisi - gerçek sistemde weather API kullanılır
    if (itemType === 'tour' && date.getMonth() === 1) return 0.9; // Şubat'ta %10 indirim
    return 1.0;
  }

  private static getSpecialEventMultiplier(date: Date): number {
    // Özel etkinlikler için çarpan - gerçek sistemde event calendar kullanılır
    const month = date.getMonth();
    const day = date.getDate();
    
    // Yılbaşı, 23 Nisan, 29 Ekim gibi özel günler
    if ((month === 0 && day === 1) || (month === 3 && day === 23) || (month === 9 && day === 29)) {
      return 1.5;
    }
    return 1.0;
  }

  private static getAvailabilityScarcity(availabilityData?: any): number {
    // Müsaitlik kıtlığı etkisi
    if (!availabilityData) return 1.0;
    
    const availableSpots = availabilityData.available || 10;
    const totalCapacity = availabilityData.capacity || 20;
    const occupancyRate = 1 - (availableSpots / totalCapacity);
    
    if (occupancyRate > 0.95) return 1.3;
    if (occupancyRate > 0.85) return 1.2;
    if (occupancyRate > 0.7) return 1.1;
    return 1.0;
  }
}

export class ReservationManager {
  static generateConfirmationCode(): string {
    const prefix = 'TA';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  }

  static createReservation(
    bookingRequest: BookingRequest,
    customerInfo: ReservationData['customerInfo'],
    pricingResult: PricingResult
  ): ReservationData {
    const reservationId = `RES-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    const confirmationCode = this.generateConfirmationCode();

    const cancellationPolicy = this.generateCancellationPolicy(
      bookingRequest.checkInDate,
      bookingRequest.itemType
    );

    return {
      id: reservationId,
      userId: '', // Kullanıcı sistemi entegre edildiğinde doldurulacak
      bookingRequest,
      pricingResult,
      customerInfo,
      paymentInfo: {
        method: 'credit_card',
        status: 'pending',
        amount: pricingResult.finalPrice,
        currency: pricingResult.currency
      },
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      confirmationCode,
      cancellationPolicy
    };
  }

  private static generateCancellationPolicy(
    checkInDate: Date,
    itemType: string
  ): ReservationData['cancellationPolicy'] {
    const policies = {
      tour: {
        freeCancellationDays: 2,
        fees: [
          { days: 1, feePercentage: 50 },
          { days: 0, feePercentage: 100 }
        ]
      },
      hotel: {
        freeCancellationDays: 3,
        fees: [
          { days: 2, feePercentage: 25 },
          { days: 1, feePercentage: 50 },
          { days: 0, feePercentage: 100 }
        ]
      },
      package: {
        freeCancellationDays: 7,
        fees: [
          { days: 5, feePercentage: 25 },
          { days: 3, feePercentage: 50 },
          { days: 1, feePercentage: 75 },
          { days: 0, feePercentage: 100 }
        ]
      }
    };

    const policy = policies[itemType] || policies.tour;
    const freeCancellationUntil = new Date(checkInDate);
    freeCancellationUntil.setDate(freeCancellationUntil.getDate() - policy.freeCancellationDays);

    return {
      freeCancellationUntil,
      cancellationFees: policy.fees
    };
  }

  static calculateCancellationFee(
    reservation: ReservationData,
    cancellationDate: Date = new Date()
  ): number {
    const checkInDate = reservation.bookingRequest.checkInDate;
    const daysUntilCheckIn = Math.floor(
      (checkInDate.getTime() - cancellationDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (cancellationDate <= reservation.cancellationPolicy.freeCancellationUntil) {
      return 0;
    }

    const fees = reservation.cancellationPolicy.cancellationFees;
    for (const fee of fees) {
      if (daysUntilCheckIn >= fee.days) {
        return Math.round(reservation.pricingResult.finalPrice * (fee.feePercentage / 100));
      }
    }

    // En yüksek ücreti uygula
    const highestFee = Math.max(...fees.map(f => f.feePercentage));
    return Math.round(reservation.pricingResult.finalPrice * (highestFee / 100));
  }
}

// Ödeme sistemi
export interface PaymentRequest {
  reservationId: string;
  amount: number;
  currency: string;
  method: 'credit_card' | 'bank_transfer' | 'paypal' | 'crypto';
  cardInfo?: {
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    cardHolderName: string;
  };
  billingAddress: {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  errorMessage?: string;
  paymentMethod: string;
  amount: number;
  currency: string;
  processedAt: Date;
  providerResponse?: any;
}

export class PaymentProcessor {
  static async processPayment(paymentRequest: PaymentRequest): Promise<PaymentResult> {
    // Simülasyon - gerçek sistemde ödeme sağlayıcıları entegre edilecek
    
    try {
      // Doğrulama
      if (!this.validatePaymentRequest(paymentRequest)) {
        throw new Error('Invalid payment request');
      }

      // Sahte ödeme işlemi (başarı oranı %95)
      const isSuccessful = Math.random() > 0.05;
      
      if (!isSuccessful) {
        throw new Error('Payment failed - insufficient funds or invalid card');
      }

      // Başarılı ödeme
      const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      return {
        success: true,
        transactionId,
        paymentMethod: paymentRequest.method,
        amount: paymentRequest.amount,
        currency: paymentRequest.currency,
        processedAt: new Date(),
        providerResponse: {
          status: 'approved',
          authCode: Math.random().toString(36).substring(2, 8).toUpperCase()
        }
      };

    } catch (error) {
      return {
        success: false,
        errorMessage: error instanceof Error ? error.message : 'Payment processing failed',
        paymentMethod: paymentRequest.method,
        amount: paymentRequest.amount,
        currency: paymentRequest.currency,
        processedAt: new Date()
      };
    }
  }

  private static validatePaymentRequest(request: PaymentRequest): boolean {
    if (!request.amount || request.amount <= 0) return false;
    if (!request.currency || request.currency.length !== 3) return false;
    if (!request.billingAddress.fullName || !request.billingAddress.city) return false;
    
    if (request.method === 'credit_card' && request.cardInfo) {
      if (!request.cardInfo.cardNumber || request.cardInfo.cardNumber.length < 13) return false;
      if (!request.cardInfo.cvv || request.cardInfo.cvv.length < 3) return false;
      if (!request.cardInfo.cardHolderName) return false;
    }

    return true;
  }

  static async refundPayment(
    transactionId: string,
    amount: number,
    reason: string
  ): Promise<PaymentResult> {
    // Sahte iade işlemi
    try {
      const refundId = `RFD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      return {
        success: true,
        transactionId: refundId,
        paymentMethod: 'refund',
        amount: -amount, // Negatif tutar iade işlemini gösterir
        currency: 'TRY',
        processedAt: new Date(),
        providerResponse: {
          status: 'refunded',
          originalTransaction: transactionId,
          reason
        }
      };
    } catch (error) {
      return {
        success: false,
        errorMessage: 'Refund processing failed',
        paymentMethod: 'refund',
        amount: -amount,
        currency: 'TRY',
        processedAt: new Date()
      };
    }
  }
}

// İndirim kuponları sistemi
export interface CouponCode {
  code: string;
  type: 'percentage' | 'fixed_amount';
  value: number;
  minAmount?: number;
  maxDiscount?: number;
  validFrom: Date;
  validUntil: Date;
  usageLimit?: number;
  usedCount: number;
  applicableItems?: string[];
  applicableCategories?: string[];
}

export class CouponManager {
  private static coupons: CouponCode[] = [
    {
      code: 'WELCOME10',
      type: 'percentage',
      value: 10,
      minAmount: 500,
      validFrom: new Date('2024-01-01'),
      validUntil: new Date('2024-12-31'),
      usageLimit: 1000,
      usedCount: 0
    },
    {
      code: 'EARLYBIRD',
      type: 'percentage',
      value: 20,
      minAmount: 1000,
      maxDiscount: 500,
      validFrom: new Date('2024-01-01'),
      validUntil: new Date('2024-06-30'),
      usageLimit: 500,
      usedCount: 0
    },
    {
      code: 'SUMMER2024',
      type: 'fixed_amount',
      value: 200,
      minAmount: 800,
      validFrom: new Date('2024-06-01'),
      validUntil: new Date('2024-08-31'),
      usedCount: 0,
      applicableCategories: ['tour']
    }
  ];

  static validateCoupon(
    couponCode: string,
    bookingAmount: number,
    itemType: string,
    itemId?: string
  ): { isValid: boolean; discount: number; message: string } {
    const coupon = this.coupons.find(c => c.code === couponCode);
    
    if (!coupon) {
      return { isValid: false, discount: 0, message: 'Kupon kodu geçersiz' };
    }

    const now = new Date();
    
    // Tarih kontrolü
    if (now < coupon.validFrom || now > coupon.validUntil) {
      return { isValid: false, discount: 0, message: 'Kupon kodu süresi dolmuş' };
    }

    // Kullanım limiti kontrolü
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return { isValid: false, discount: 0, message: 'Kupon kullanım limiti aşıldı' };
    }

    // Minimum tutar kontrolü
    if (coupon.minAmount && bookingAmount < coupon.minAmount) {
      return { 
        isValid: false, 
        discount: 0, 
        message: `Minimum ${coupon.minAmount} TL tutarında rezervasyon gerekli` 
      };
    }

    // Ürün/kategori kontrolü
    if (coupon.applicableItems && itemId && !coupon.applicableItems.includes(itemId)) {
      return { isValid: false, discount: 0, message: 'Kupon bu ürün için geçerli değil' };
    }

    if (coupon.applicableCategories && !coupon.applicableCategories.includes(itemType)) {
      return { isValid: false, discount: 0, message: 'Kupon bu kategori için geçerli değil' };
    }

    // İndirim hesaplama
    let discount = 0;
    if (coupon.type === 'percentage') {
      discount = bookingAmount * (coupon.value / 100);
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else {
      discount = coupon.value;
    }

    return {
      isValid: true,
      discount: Math.round(discount),
      message: `${coupon.code} kuponu uygulandı - ${discount} TL indirim`
    };
  }
}

export default {
  PricingEngine,
  ReservationManager,
  PaymentProcessor,
  CouponManager
};