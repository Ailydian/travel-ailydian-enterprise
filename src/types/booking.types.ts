/**
 * Booking System Type Definitions
 * Enterprise-grade type safety for booking functionality
 *
 * @module types/booking
 */

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed'
  | 'refunded'
  | 'failed';

export type PaymentMethod =
  | 'credit-card'
  | 'debit-card'
  | 'paypal'
  | 'bank-transfer'
  | 'crypto'
  | 'cash';

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded';

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country?: string;
  nationality?: string;
  dateOfBirth?: string; // ISO 8601
  passportNumber?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface PaymentInfo {
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  currency: 'TRY' | 'EUR' | 'USD' | 'GBP';
  transactionId?: string;
  paidAt?: string; // ISO 8601
  refundedAt?: string; // ISO 8601
}

export interface BookingDetails {
  checkIn: string; // ISO 8601
  checkOut: string; // ISO 8601
  guests: number;
  adults?: number;
  children?: number;
  infants?: number;
  rooms?: number;
  specialRequests?: string;
  dietaryRestrictions?: string[];
  accessibilityNeeds?: string[];
}

export interface Booking {
  id: string;
  bookingNumber: string; // e.g., "TL-2026-001234"
  status: BookingStatus;
  productType: 'tour' | 'transfer' | 'rental' | 'hotel' | 'experience';
  productId: string;
  productName: string;
  productImage: string;
  customer: CustomerInfo;
  bookingDetails: BookingDetails;
  payment: PaymentInfo;
  cancellationPolicy: string;
  isRefundable: boolean;
  refundAmount?: number;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  confirmedAt?: string; // ISO 8601
  cancelledAt?: string; // ISO 8601
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface CreateBookingPayload {
  productType: Booking['productType'];
  productId: string;
  customer: CustomerInfo;
  bookingDetails: BookingDetails;
  payment: {
    method: PaymentMethod;
    amount: number;
    currency: PaymentInfo['currency'];
  };
  specialRequests?: string;
}

export interface UpdateBookingPayload {
  bookingId: string;
  status?: BookingStatus;
  bookingDetails?: Partial<BookingDetails>;
  customer?: Partial<CustomerInfo>;
  notes?: string;
}

export interface CancelBookingPayload {
  bookingId: string;
  reason?: string;
  refundRequested: boolean;
}

export interface BookingConfirmation {
  booking: Booking;
  confirmationCode: string;
  qrCode?: string; // QR code URL for mobile check-in
  voucher?: string; // Voucher URL/PDF
  instructions: string[];
  contactInfo: {
    phone: string;
    email: string;
    whatsapp?: string;
  };
}

// Search and Filter Types
export interface BookingSearchParams {
  status?: BookingStatus;
  productType?: Booking['productType'];
  dateFrom?: string;
  dateTo?: string;
  customerId?: string;
  bookingNumber?: string;
}

export interface BookingStatistics {
  total: number;
  confirmed: number;
  pending: number;
  cancelled: number;
  completed: number;
  revenue: {
    total: number;
    currency: string;
  };
  byProductType: Record<Booking['productType'], number>;
}
