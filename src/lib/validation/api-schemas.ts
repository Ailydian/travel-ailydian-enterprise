/**
 * API Input Validation Schemas
 * Comprehensive Zod schemas for all API endpoints
 * Security Engineer Agent Implementation
 */

import { z } from 'zod';

// ==========================================
// COMMON SCHEMAS
// ==========================================

export const PaginationSchema = z.object({
  page: z.coerce.number().int().min(1).max(1000).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const DateRangeSchema = z.object({
  startDate: z.string().datetime().refine(
    date => new Date(date) > new Date(),
    'Start date must be in the future'
  ),
  endDate: z.string().datetime(),
}).refine(
  data => new Date(data.endDate) > new Date(data.startDate),
  'End date must be after start date'
);

export const PriceRangeSchema = z.object({
  min: z.number().min(0).max(1000000),
  max: z.number().min(0).max(1000000),
}).refine(
  data => data.max >= data.min,
  'Max price must be greater than or equal to min price'
);

// Turkish text validation (allows Turkish characters)
const turkishTextRegex = /^[a-zA-Z0-9\sğüşıöçĞÜŞİÖÇ.,!?'-]+$/;

export const TurkishTextSchema = z.string()
  .min(1, 'Field cannot be empty')
  .max(5000, 'Text too long')
  .regex(turkishTextRegex, 'Invalid characters');

// ==========================================
// TOUR SEARCH SCHEMA
// ==========================================

export const TourSearchSchema = z.object({
  // Search query
  query: z.string()
    .min(2, 'Minimum 2 characters')
    .max(100, 'Maximum 100 characters')
    .regex(turkishTextRegex, 'Invalid characters')
    .optional(),

  // Destination
  destination: z.string()
    .min(2)
    .max(100)
    .regex(turkishTextRegex)
    .optional(),

  // Date range
  dateRange: DateRangeSchema.optional(),

  // Price range
  priceRange: PriceRangeSchema.optional(),

  // Number of guests
  guests: z.number().int().min(1).max(50).default(1),

  // Categories (array of strings)
  categories: z.array(z.string().max(50)).max(10).optional(),

  // Amenities
  amenities: z.array(z.string().max(50)).max(20).optional(),

  // Minimum rating
  rating: z.number().min(0).max(5).optional(),

  // Sort options
  sortBy: z.enum(['price', 'rating', 'popularity', 'date']).default('popularity'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),

  // Pagination
  pagination: PaginationSchema.optional(),
});

export type TourSearchInput = z.infer<typeof TourSearchSchema>;

// ==========================================
// BOOKING SCHEMA
// ==========================================

export const BookingSchema = z.object({
  // Tour/Hotel/Car ID
  itemId: z.string().cuid('Invalid item ID'),
  itemType: z.enum(['tour', 'hotel', 'carRental', 'transfer']),

  // Booking details
  date: z.string().datetime().refine(
    date => new Date(date) > new Date(),
    'Booking date must be in the future'
  ),

  guests: z.number().int().min(1).max(50),

  // Contact info
  contactName: z.string()
    .min(2, 'Name too short')
    .max(100, 'Name too long')
    .regex(turkishTextRegex),

  contactEmail: z.string().email('Invalid email'),

  contactPhone: z.string()
    .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number'),

  // Special requests
  specialRequests: z.string()
    .max(500, 'Special requests too long')
    .regex(turkishTextRegex)
    .optional(),

  // Payment method
  paymentMethod: z.enum(['credit_card', 'debit_card', 'bank_transfer', 'paypal']),

  // Total amount (for verification)
  totalAmount: z.number().positive().max(1000000),
});

export type BookingInput = z.infer<typeof BookingSchema>;

// ==========================================
// PAYMENT SCHEMA
// ==========================================

export const PaymentSchema = z.object({
  bookingId: z.string().cuid(),

  // Card details (will be tokenized, never stored)
  cardNumber: z.string()
    .regex(/^[0-9]{13,19}$/, 'Invalid card number')
    .refine(
      num => luhnCheck(num),
      'Invalid card number (Luhn check failed)'
    ),

  cardholderName: z.string()
    .min(2)
    .max(100)
    .regex(/^[a-zA-Z\s]+$/, 'Only letters and spaces allowed'),

  expiryMonth: z.number().int().min(1).max(12),
  expiryYear: z.number().int().min(new Date().getFullYear()),

  cvv: z.string()
    .regex(/^[0-9]{3,4}$/, 'Invalid CVV'),

  // Billing address
  billingAddress: z.object({
    street: TurkishTextSchema,
    city: z.string().min(2).max(100),
    postalCode: z.string().regex(/^[0-9]{5}$/, 'Invalid postal code'),
    country: z.string().length(2, 'Country code must be 2 characters'),
  }),
});

export type PaymentInput = z.infer<typeof PaymentSchema>;

// Luhn algorithm for card validation
function luhnCheck(cardNumber: string): boolean {
  const digits = cardNumber.split('').map(Number);
  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i];

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

// ==========================================
// USER REGISTRATION SCHEMA
// ==========================================

export const UserRegistrationSchema = z.object({
  name: z.string()
    .min(2, 'Name too short')
    .max(100, 'Name too long')
    .regex(turkishTextRegex),

  email: z.string()
    .email('Invalid email')
    .toLowerCase(),

  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password too long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain uppercase, lowercase, number, and special character'
    ),

  phone: z.string()
    .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number')
    .optional(),

  acceptTerms: z.boolean().refine(val => val === true, 'Must accept terms'),
});

export type UserRegistrationInput = z.infer<typeof UserRegistrationSchema>;

// ==========================================
// USER LOGIN SCHEMA
// ==========================================

export const UserLoginSchema = z.object({
  email: z.string().email('Invalid email').toLowerCase(),
  password: z.string().min(1, 'Password required'),
  rememberMe: z.boolean().default(false),
});

export type UserLoginInput = z.infer<typeof UserLoginSchema>;

// ==========================================
// REVIEW SCHEMA
// ==========================================

export const ReviewSchema = z.object({
  itemId: z.string().cuid(),
  itemType: z.enum(['tour', 'hotel', 'carRental', 'transfer']),

  rating: z.number().int().min(1).max(5),

  comment: z.string()
    .min(10, 'Review must be at least 10 characters')
    .max(2000, 'Review too long')
    .regex(turkishTextRegex),

  // Optional fields
  title: z.string()
    .min(5)
    .max(100)
    .regex(turkishTextRegex)
    .optional(),

  images: z.array(z.string().url()).max(10).optional(),

  pros: z.string().max(500).regex(turkishTextRegex).optional(),
  cons: z.string().max(500).regex(turkishTextRegex).optional(),
});

export type ReviewInput = z.infer<typeof ReviewSchema>;

// ==========================================
// WISHLIST SCHEMA
// ==========================================

export const WishlistAddSchema = z.object({
  itemType: z.enum(['tour', 'hotel', 'carRental', 'transfer']),
  itemId: z.string().cuid(),

  // Price alert settings
  priceAlert: z.boolean().default(false),
  targetPrice: z.number().positive().max(1000000).optional(),
});

export type WishlistAddInput = z.infer<typeof WishlistAddSchema>;

// ==========================================
// CONTACT FORM SCHEMA
// ==========================================

export const ContactFormSchema = z.object({
  name: z.string().min(2).max(100).regex(turkishTextRegex),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/).optional(),
  subject: z.string().min(5).max(200).regex(turkishTextRegex),
  message: z.string().min(20).max(2000).regex(turkishTextRegex),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

// ==========================================
// REFERRAL SCHEMA
// ==========================================

export const ReferralApplySchema = z.object({
  code: z.string()
    .min(6)
    .max(20)
    .regex(/^[A-Z0-9-]+$/, 'Invalid referral code format'),
});

export type ReferralApplyInput = z.infer<typeof ReferralApplySchema>;

// ==========================================
// ADMIN SCHEMAS
// ==========================================

export const AdminCreateTourSchema = z.object({
  title: z.string().min(5).max(200),
  description: z.string().min(50).max(5000),
  destination: z.string().min(2).max(100),
  category: z.string().min(2).max(50),
  price: z.number().positive().max(1000000),
  duration: z.number().int().positive(),
  maxGuests: z.number().int().min(1).max(100),
  images: z.array(z.string().url()).min(1).max(20),
  amenities: z.array(z.string()).max(50),
  itinerary: z.array(z.object({
    day: z.number().int().positive(),
    title: z.string(),
    description: z.string(),
  })),
  active: z.boolean().default(true),
});

export type AdminCreateTourInput = z.infer<typeof AdminCreateTourSchema>;

// ==========================================
// EXPORT HELPER: Validate and sanitize
// ==========================================

export function validateAndSanitize<T extends z.ZodType>(
  schema: T,
  data: unknown
): z.infer<T> {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(
        'Validation failed',
        error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        }))
      );
    }
    throw error;
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public errors: Array<{ field: string; message: string }>
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}
