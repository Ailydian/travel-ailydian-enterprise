/**
 * Zod Validation Schemas - CLAUDE.md Compliant
 * 
 * Type-safe input validation for all API endpoints
 * Replaces manual validation and prevents runtime errors
 * 
 * @see https://zod.dev
 */

import { z } from 'zod';

/**
 * Common reusable schemas
 */
export const CommonSchemas = {
  id: z.string().uuid('Invalid UUID format'),
  email: z.string().email('Invalid email format'),
  url: z.string().url('Invalid URL format'),
  phoneNumber: z.string().regex(
    /^\+?[1-9]\d{1,14}$/,
    'Invalid phone number format (E.164)'
  ),
  dateISO: z.string().datetime('Invalid ISO 8601 date'),
  positiveNumber: z.number().positive('Must be positive'),
  nonNegativeNumber: z.number().nonnegative('Must be non-negative'),
  currency: z.enum(['USD', 'EUR', 'GBP', 'TRY', 'AED']),
  locale: z.enum(['en', 'tr', 'ar', 'de', 'fr', 'ru']),
  pagination: z.object({
    page: z.number().int().positive().default(1),
    limit: z.number().int().positive().max(100).default(20),
  }),
};

/**
 * User schemas
 */
export const UserSchemas = {
  create: z.object({
    email: CommonSchemas.email,
    password: z
      .string()
      .min(12, 'Password must be at least 12 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phoneNumber: CommonSchemas.phoneNumber.optional(),
  }),
  
  update: z.object({
    name: z.string().min(2).optional(),
    phoneNumber: CommonSchemas.phoneNumber.optional(),
    preferences: z.record(z.unknown()).optional(),
  }),
  
  login: z.object({
    email: CommonSchemas.email,
    password: z.string().min(1, 'Password is required'),
  }),
};

/**
 * Booking schemas
 */
export const BookingSchemas = {
  create: z.object({
    serviceType: z.enum(['tour', 'transfer', 'car-rental', 'hotel']),
    serviceId: CommonSchemas.id,
    startDate: CommonSchemas.dateISO,
    endDate: CommonSchemas.dateISO,
    travelers: z.number().int().positive().max(50),
    contactInfo: z.object({
      name: z.string().min(2),
      email: CommonSchemas.email,
      phone: CommonSchemas.phoneNumber,
    }),
    paymentMethod: z.enum(['credit-card', 'debit-card', 'crypto', 'bank-transfer']),
    specialRequests: z.string().max(500).optional(),
  }),
  
  update: z.object({
    status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']).optional(),
    specialRequests: z.string().max(500).optional(),
  }),
  
  search: z.object({
    serviceType: z.enum(['tour', 'transfer', 'car-rental', 'hotel']).optional(),
    startDate: CommonSchemas.dateISO.optional(),
    endDate: CommonSchemas.dateISO.optional(),
    minPrice: CommonSchemas.nonNegativeNumber.optional(),
    maxPrice: CommonSchemas.positiveNumber.optional(),
    ...CommonSchemas.pagination.shape,
  }),
};

/**
 * AI service schemas
 */
export const AISchemas = {
  generateItinerary: z.object({
    destination: z.string().min(2),
    startDate: CommonSchemas.dateISO,
    endDate: CommonSchemas.dateISO,
    travelers: z.number().int().positive().max(50),
    budget: CommonSchemas.positiveNumber,
    interests: z.array(z.string()).min(1).max(10),
    travelStyle: z.enum(['luxury', 'budget', 'mid-range', 'adventure', 'cultural']),
  }),
  
  chatMessage: z.object({
    message: z.string().min(1).max(2000),
    conversationId: CommonSchemas.id.optional(),
    context: z.record(z.unknown()).optional(),
  }),
};

/**
 * Tour schemas
 */
export const TourSchemas = {
  create: z.object({
    title: z.string().min(5).max(200),
    description: z.string().min(20).max(5000),
    duration: z.number().int().positive(),
    price: CommonSchemas.positiveNumber,
    currency: CommonSchemas.currency,
    maxParticipants: z.number().int().positive().max(200),
    location: z.object({
      city: z.string().min(2),
      country: z.string().min(2),
      coordinates: z.object({
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180),
      }).optional(),
    }),
    images: z.array(CommonSchemas.url).min(1).max(20),
    included: z.array(z.string()).min(1),
    excluded: z.array(z.string()).default([]),
    languages: z.array(CommonSchemas.locale).min(1),
  }),
  
  update: z.object({
    title: z.string().min(5).max(200).optional(),
    description: z.string().min(20).max(5000).optional(),
    price: CommonSchemas.positiveNumber.optional(),
    maxParticipants: z.number().int().positive().max(200).optional(),
    isActive: z.boolean().optional(),
  }),
  
  search: z.object({
    destination: z.string().optional(),
    minPrice: CommonSchemas.nonNegativeNumber.optional(),
    maxPrice: CommonSchemas.positiveNumber.optional(),
    duration: z.number().int().positive().optional(),
    language: CommonSchemas.locale.optional(),
    ...CommonSchemas.pagination.shape,
  }),
};

/**
 * Transfer schemas
 */
export const TransferSchemas = {
  create: z.object({
    vehicleType: z.enum(['sedan', 'van', 'minibus', 'bus', 'luxury']),
    from: z.object({
      type: z.enum(['airport', 'hotel', 'address']),
      name: z.string().min(2),
      coordinates: z.object({
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180),
      }).optional(),
    }),
    to: z.object({
      type: z.enum(['airport', 'hotel', 'address']),
      name: z.string().min(2),
      coordinates: z.object({
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180),
      }).optional(),
    }),
    passengers: z.number().int().positive().max(50),
    luggage: z.number().int().nonnegative().max(100),
    pickupTime: CommonSchemas.dateISO,
    price: CommonSchemas.positiveNumber,
    currency: CommonSchemas.currency,
  }),
  
  quote: z.object({
    from: z.string().min(2),
    to: z.string().min(2),
    vehicleType: z.enum(['sedan', 'van', 'minibus', 'bus', 'luxury']),
    passengers: z.number().int().positive().max(50),
    pickupDate: CommonSchemas.dateISO,
  }),
};

/**
 * Review schemas
 */
export const ReviewSchemas = {
  create: z.object({
    serviceType: z.enum(['tour', 'transfer', 'car-rental', 'hotel']),
    serviceId: CommonSchemas.id,
    rating: z.number().int().min(1).max(5),
    title: z.string().min(5).max(100),
    comment: z.string().min(20).max(2000),
    photos: z.array(CommonSchemas.url).max(10).optional(),
  }),
  
  moderate: z.object({
    status: z.enum(['approved', 'rejected', 'pending']),
    moderatorNote: z.string().max(500).optional(),
  }),
};

/**
 * Payment schemas
 */
export const PaymentSchemas = {
  createIntent: z.object({
    amount: CommonSchemas.positiveNumber,
    currency: CommonSchemas.currency,
    bookingId: CommonSchemas.id,
    paymentMethod: z.enum(['card', 'crypto', 'bank-transfer']),
  }),
  
  confirm: z.object({
    paymentIntentId: z.string().min(1),
    paymentMethodId: z.string().min(1),
  }),
  
  crypto: z.object({
    amount: CommonSchemas.positiveNumber,
    currency: z.enum(['BTC', 'ETH', 'USDT', 'BNB']),
    walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address'),
  }),
};

/**
 * Analytics schemas
 */
export const AnalyticsSchemas = {
  track: z.object({
    event: z.string().min(1).max(100),
    properties: z.record(z.unknown()).optional(),
    userId: CommonSchemas.id.optional(),
    sessionId: z.string().optional(),
    timestamp: CommonSchemas.dateISO.optional(),
  }),
  
  query: z.object({
    metric: z.string().min(1),
    startDate: CommonSchemas.dateISO,
    endDate: CommonSchemas.dateISO,
    groupBy: z.enum(['day', 'week', 'month']).optional(),
    filters: z.record(z.unknown()).optional(),
  }),
};

/**
 * Helper function to validate data against schema
 */
export function validate<T>(schema: z.ZodSchema<T>, data: unknown): {
  success: true;
  data: T;
} | {
  success: false;
  errors: z.ZodError;
} {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  return { success: false, errors: result.error };
}

/**
 * Type inference helpers
 */
export type UserCreateInput = z.infer<typeof UserSchemas.create>;
export type UserUpdateInput = z.infer<typeof UserSchemas.update>;
export type BookingCreateInput = z.infer<typeof BookingSchemas.create>;
export type TourCreateInput = z.infer<typeof TourSchemas.create>;
export type TransferCreateInput = z.infer<typeof TransferSchemas.create>;
export type ReviewCreateInput = z.infer<typeof ReviewSchemas.create>;

export default {
  CommonSchemas,
  UserSchemas,
  BookingSchemas,
  AISchemas,
  TourSchemas,
  TransferSchemas,
  ReviewSchemas,
  PaymentSchemas,
  AnalyticsSchemas,
  validate,
};
