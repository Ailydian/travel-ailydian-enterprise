/**
 * Property Submission Wizard - Zod Validation Schemas
 * Comprehensive validation schemas for all 8 wizard steps
 * Includes cross-field validation, helper functions, and error messages
 */

import { z } from 'zod';
import type {
  PropertyType,
  CancellationPolicy,
  PropertyFeatures,
  SafetyFeatures,
  Coordinates,
  SeasonalPrice,
  PropertyDiscounts,
  PropertyFees,
  Availability,
  PropertyPhoto,
  PropertyPolicies,
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
  Step5Data,
  Step6Data,
  Step7Data,
  Step8Data,
} from '../../types/dashboard.types';

// ============================================================================
// UTILITY VALIDATION SCHEMAS
// ============================================================================

/**
 * Postal code validation pattern
 * Supports multiple formats: US (12345, 12345-6789), UK (SW1A 2AA), Canada (K1A 0B1), etc.
 */
const POSTAL_CODE_PATTERN = /^[A-Z0-9][A-Z0-9\s\-]{2,10}$/i;

/**
 * Time validation pattern HH:mm (24-hour format)
 */
const TIME_PATTERN = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

/**
 * URL validation pattern
 */
const URL_PATTERN = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;

// ============================================================================
// STEP 1: BASIC INFORMATION SCHEMA
// ============================================================================

export const Step1Schema = z.object({
  propertyName: z
    .string()
    .min(3, 'Property name must be at least 3 characters')
    .max(100, 'Property name must not exceed 100 characters')
    .trim(),
  propertyType: z.enum(
    ['apartment', 'house', 'villa', 'bungalow', 'townhouse', 'cottage', 'studio', 'penthouse', 'houseboat', 'other'] as const,
    {
      errorMap: () => ({ message: 'Please select a valid property type' }),
    }
  ) as z.ZodType<PropertyType>,
  numberOfRooms: z
    .number()
    .int('Number of rooms must be a whole number')
    .min(1, 'Property must have at least 1 room')
    .max(20, 'Property cannot have more than 20 rooms'),
  numberOfBathrooms: z
    .number()
    .min(0.5, 'Property must have at least 0.5 bathrooms')
    .max(20, 'Property cannot have more than 20 bathrooms'),
  maximumGuests: z
    .number()
    .int('Maximum guests must be a whole number')
    .min(1, 'Property must accommodate at least 1 guest')
    .max(50, 'Property cannot accommodate more than 50 guests'),
  description: z
    .string()
    .min(50, 'Description must be at least 50 characters')
    .max(5000, 'Description must not exceed 5000 characters')
    .trim(),
  highlightDescription: z
    .string()
    .max(60, 'Highlight description must not exceed 60 characters')
    .optional()
    .or(z.literal('')),
});

export type Step1FormData = z.infer<typeof Step1Schema>;

// ============================================================================
// STEP 2: LOCATION & DETAILS SCHEMA
// ============================================================================

const BedroomsSchema = z.object({
  queen: z
    .number()
    .int('Queen beds must be a whole number')
    .min(0, 'Queen beds cannot be negative')
    .default(0),
  double: z
    .number()
    .int('Double beds must be a whole number')
    .min(0, 'Double beds cannot be negative')
    .default(0),
  single: z
    .number()
    .int('Single beds must be a whole number')
    .min(0, 'Single beds cannot be negative')
    .default(0),
  bunk: z
    .number()
    .int('Bunk beds must be a whole number')
    .min(0, 'Bunk beds cannot be negative')
    .default(0),
});

const LivingAreasSchema = z.object({
  hasKitchen: z.boolean().default(false),
  kitchenType: z
    .enum(['full', 'kitchenette', 'none'] as const, {
      errorMap: () => ({ message: 'Please select a valid kitchen type' }),
    })
    .optional(),
  hasLivingRoom: z.boolean().default(false),
  hasDiningArea: z.boolean().default(false),
});

const CoordinatesSchema = z.object({
  latitude: z
    .number()
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90'),
  longitude: z
    .number()
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180'),
}) as z.ZodType<Coordinates>;

export const Step2Schema = z
  .object({
    country: z
      .string()
      .min(2, 'Country is required')
      .trim(),
    province: z
      .string()
      .min(1, 'Province/State is required')
      .trim(),
    city: z
      .string()
      .min(1, 'City is required')
      .trim(),
    district: z
      .string()
      .min(1, 'District is required')
      .trim(),
    postalCode: z
      .string()
      .regex(POSTAL_CODE_PATTERN, 'Please enter a valid postal code')
      .trim(),
    address: z
      .string()
      .min(5, 'Address must be at least 5 characters')
      .max(200, 'Address must not exceed 200 characters')
      .trim(),
    coordinates: CoordinatesSchema,
    timezone: z
      .string()
      .min(1, 'Timezone is required'),
    bedrooms: BedroomsSchema.optional(),
    livingAreas: LivingAreasSchema.optional(),
  })
  .refine(
    (data) => {
      if (data.bedrooms) {
        const totalBeds =
          data.bedrooms.queen +
          data.bedrooms.double +
          data.bedrooms.single +
          data.bedrooms.bunk;
        return totalBeds > 0;
      }
      return true;
    },
    {
      message: 'Must have at least one bed',
      path: ['bedrooms'],
    }
  );

export type Step2FormData = z.infer<typeof Step2Schema>;

// ============================================================================
// STEP 3: AMENITIES SCHEMA
// ============================================================================

const PropertyFeaturesSchema = z.object({
  hasWifi: z.boolean().default(false),
  wifiSpeed: z.string().optional(),
  hasTV: z.boolean().default(false),
  hasAirConditioning: z.boolean().default(false),
  hasHeating: z.boolean().default(false),
  hasParking: z.boolean().default(false),
  parkingType: z.enum(['free', 'paid', 'valet'] as const).optional(),
  hasElevator: z.boolean().default(false),
  hasBalcony: z.boolean().default(false),
  hasTerrace: z.boolean().default(false),
  hasSwimmingPool: z.boolean().default(false),
  hasGym: z.boolean().default(false),
  hasJacuzzi: z.boolean().default(false),
  hasSauna: z.boolean().default(false),
  hasBBQ: z.boolean().default(false),
  hasWasher: z.boolean().default(false),
  hasDryer: z.boolean().default(false),
  hasDishwasher: z.boolean().default(false),
  hasOven: z.boolean().default(false),
  hasRefrigerator: z.boolean().default(false),
}) as z.ZodType<PropertyFeatures>;

const SafetyFeaturesSchema = z.object({
  hasSmokeDector: z.boolean().default(false),
  hasFirstAidKit: z.boolean().default(false),
  hasCO2Detector: z.boolean().default(false),
  hasSecurityCamera: z.boolean().default(false),
  hasLock: z.boolean().default(false),
  hasKey: z.boolean().default(false),
}) as z.ZodType<SafetyFeatures>;

export const Step3Schema = z.object({
  amenities: z
    .array(z.string())
    .min(1, 'Select at least one amenity')
    .default([]),
  customAmenities: z
    .array(
      z
        .string()
        .min(1, 'Amenity text cannot be empty')
        .max(100, 'Amenity text must not exceed 100 characters')
    )
    .max(10, 'Maximum 10 custom amenities allowed')
    .optional()
    .default([]),
  features: PropertyFeaturesSchema.optional(),
  safetyFeatures: SafetyFeaturesSchema.optional(),
});

export type Step3FormData = z.infer<typeof Step3Schema>;

// ============================================================================
// STEP 4: PRICING SCHEMA
// ============================================================================

const SeasonalPriceSchema = z.object({
  id: z.string().optional(),
  seasonName: z
    .string()
    .min(1, 'Season name is required')
    .max(50, 'Season name must not exceed 50 characters'),
  startDate: z.coerce.date().or(z.string()),
  endDate: z.coerce.date().or(z.string()),
  pricePerNight: z
    .number()
    .min(0, 'Price must be a positive number')
    .max(100000, 'Price cannot exceed 100000'),
});

const PropertyDiscountsSchema = z.object({
  weeklyDiscount: z
    .number()
    .min(0, 'Discount cannot be negative')
    .max(100, 'Discount cannot exceed 100%')
    .optional(),
  monthlyDiscount: z
    .number()
    .min(0, 'Discount cannot be negative')
    .max(100, 'Discount cannot exceed 100%')
    .optional(),
  earlyBookingDiscount: z
    .number()
    .min(0, 'Discount cannot be negative')
    .max(100, 'Discount cannot exceed 100%')
    .optional(),
}) as z.ZodType<PropertyDiscounts>;

const PropertyFeesSchema = z.object({
  cleaningFee: z.number().min(0).optional(),
  serviceFee: z.number().min(0).optional(),
  taxPercentage: z.number().min(0).max(100).optional(),
  petFee: z.number().min(0).optional(),
  petFeePerNight: z.boolean().optional(),
}) as z.ZodType<PropertyFees>;

const AvailabilitySchema = z.object({
  minStay: z
    .number()
    .int('Minimum stay must be a whole number')
    .min(1, 'Minimum stay must be at least 1 day')
    .max(365, 'Minimum stay cannot exceed 365 days'),
  maxStay: z
    .number()
    .int('Maximum stay must be a whole number')
    .min(1, 'Maximum stay must be at least 1 day')
    .max(365, 'Maximum stay cannot exceed 365 days')
    .optional(),
}) as z.ZodType<Availability>;

export const Step4Schema = z
  .object({
    basePrice: z
      .number()
      .min(10, 'Base price must be at least 10')
      .max(100000, 'Base price cannot exceed 100000'),
    currency: z
      .string()
      .min(3, 'Currency code must be 3 characters')
      .max(3, 'Currency code must be 3 characters')
      .toUpperCase(),
    seasonalPrices: z.array(SeasonalPriceSchema).optional(),
    discounts: PropertyDiscountsSchema.optional(),
    fees: PropertyFeesSchema.optional(),
    availability: AvailabilitySchema,
  })
  .refine(
    (data) => {
      if (data.availability.maxStay && data.availability.minStay) {
        return data.availability.maxStay >= data.availability.minStay;
      }
      return true;
    },
    {
      message: 'Maximum stay must be greater than or equal to minimum stay',
      path: ['availability.maxStay'],
    }
  );

export type Step4FormData = z.infer<typeof Step4Schema>;

// ============================================================================
// STEP 5: PHOTOS SCHEMA
// ============================================================================

const PhotoObjectSchema = z.object({
  id: z.string(),
  url: z.string().url('Invalid photo URL').optional(),
  room: z.enum(['living-room', 'bedroom', 'bathroom', 'kitchen', 'other', 'exterior'] as const),
  caption: z.string().max(200, 'Caption must not exceed 200 characters').optional(),
  order: z.number().int('Photo order must be a whole number').min(0),
  isUploaded: z.boolean().default(false),
  uploadProgress: z.number().min(0).max(100).optional(),
  error: z.string().optional(),
});

export const Step5Schema = z
  .object({
    photos: z
      .array(PhotoObjectSchema)
      .min(5, 'Upload at least 5 photos')
      .max(50, 'Maximum 50 photos allowed'),
    coverPhotoIndex: z
      .number()
      .int('Cover photo index must be a whole number')
      .min(0, 'Invalid photo index'),
    videoUrl: z
      .string()
      .regex(URL_PATTERN, 'Please enter a valid video URL')
      .optional()
      .or(z.literal('')),
    virtualTourUrl: z
      .string()
      .regex(URL_PATTERN, 'Please enter a valid virtual tour URL')
      .optional()
      .or(z.literal('')),
  })
  .refine(
    (data) => {
      return data.coverPhotoIndex < data.photos.length;
    },
    {
      message: 'Cover photo index is out of range',
      path: ['coverPhotoIndex'],
    }
  );

export type Step5FormData = z.infer<typeof Step5Schema>;

// ============================================================================
// STEP 6: HOUSE RULES SCHEMA
// ============================================================================

const PropertyPoliciesSchema = z.object({
  smokingAllowed: z.boolean().default(false),
  petsAllowed: z.boolean().default(false),
  petTypes: z.array(z.string()).optional(),
  eventsAllowed: z.boolean().default(false),
  partiesAllowed: z.boolean().default(false),
  commercialPhotographyAllowed: z.boolean().default(false),
}) as z.ZodType<PropertyPolicies>;

export const Step6Schema = z
  .object({
    checkInTime: z
      .string()
      .regex(TIME_PATTERN, 'Check-in time must be in HH:mm format (24-hour)'),
    checkOutTime: z
      .string()
      .regex(TIME_PATTERN, 'Check-out time must be in HH:mm format (24-hour)'),
    policies: PropertyPoliciesSchema.optional(),
    customRules: z
      .array(
        z
          .string()
          .min(1, 'Rule cannot be empty')
          .max(200, 'Rule must not exceed 200 characters')
      )
      .max(5, 'Maximum 5 custom rules allowed')
      .optional(),
    cancellationPolicy: z.enum(
      ['flexible', 'moderate', 'strict', 'very_strict', 'non_refundable'] as const,
      {
        errorMap: () => ({ message: 'Please select a valid cancellation policy' }),
      }
    ) as z.ZodType<CancellationPolicy>,
  })
  .refine(
    (data) => {
      const checkInHours = parseInt(data.checkInTime.split(':')[0]);
      const checkOutHours = parseInt(data.checkOutTime.split(':')[0]);
      return checkInHours !== checkOutHours || data.checkInTime !== data.checkOutTime;
    },
    {
      message: 'Check-out time must be different from check-in time',
      path: ['checkOutTime'],
    }
  );

export type Step6FormData = z.infer<typeof Step6Schema>;

// ============================================================================
// STEP 7: TERMS & AGREEMENTS SCHEMA
// ============================================================================

const LegalInformationSchema = z
  .object({
    licenseNumber: z.string().optional(),
    businessRegistration: z.string().optional(),
    taxId: z.string().optional(),
    insuranceDetails: z.string().optional(),
  })
  .optional();

const VerificationSchema = z
  .object({
    governmentIdVerified: z.boolean().default(false),
    addressVerified: z.boolean().default(false),
    phoneVerified: z.boolean().default(false),
    emailVerified: z.boolean().default(false),
  })
  .optional();

export const Step7Schema = z.object({
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms of service',
  }),
  agreeToPrivacyPolicy: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the privacy policy',
  }),
  agreeToHouseRules: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the house rules',
  }),
  agreeToGuestCommunicationPolicy: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the guest communication policy',
  }),
  guestVettingConsent: z.boolean().refine((val) => val === true, {
    message: 'You must consent to guest vetting',
  }),
  legalInformation: LegalInformationSchema,
  verification: VerificationSchema,
});

export type Step7FormData = z.infer<typeof Step7Schema>;

// ============================================================================
// STEP 8: REVIEW & SUBMISSION SCHEMA
// ============================================================================

export const Step8Schema = z.object({
  submissionType: z.enum(['save_draft', 'submit_for_review'] as const, {
    errorMap: () => ({ message: 'Please select a submission type' }),
  }),
  additionalNotes: z
    .string()
    .max(1000, 'Additional notes must not exceed 1000 characters')
    .optional()
    .or(z.literal('')),
  preferredVerificationMethod: z
    .enum(['email', 'phone', 'document'] as const)
    .optional(),
});

export type Step8FormData = z.infer<typeof Step8Schema>;

// ============================================================================
// COMPLETE SUBMISSION SCHEMA
// ============================================================================

export const CompleteSubmissionSchema = z.object({
  step1: Step1Schema,
  step2: Step2Schema,
  step3: Step3Schema,
  step4: Step4Schema,
  step5: Step5Schema,
  step6: Step6Schema,
  step7: Step7Schema,
  step8: Step8Schema,
});

export type CompleteSubmissionData = z.infer<typeof CompleteSubmissionSchema>;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Validates image file type
 * Accepted formats: jpeg, jpg, png, webp
 */
export function validateImageFile(file: File): boolean {
  const acceptedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  if (!file) {
    return false;
  }

  // Check file type
  if (!acceptedFormats.includes(file.type)) {
    return false;
  }

  // Check file size
  if (file.size > maxFileSize) {
    return false;
  }

  return true;
}

/**
 * Validates image dimensions asynchronously
 * Minimum: 400x300 pixels
 * Recommended: 1200x900 or higher
 */
export async function validateImageDimensions(
  file: File,
  minWidth: number = 400,
  minHeight: number = 300
): Promise<boolean> {
  return new Promise((resolve) => {
    if (!file) {
      resolve(false);
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        const isValid = img.width >= minWidth && img.height >= minHeight;
        resolve(isValid);
      };

      img.onerror = () => {
        resolve(false);
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      resolve(false);
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Validates multiple image files in batch
 */
export async function validateImageFiles(
  files: File[],
  options?: {
    minWidth?: number;
    minHeight?: number;
    maxFiles?: number;
    minFiles?: number;
  }
): Promise<{
  valid: boolean;
  errors: string[];
  validFiles: File[];
}> {
  const errors: string[] = [];
  const validFiles: File[] = [];

  const {
    minWidth = 400,
    minHeight = 300,
    maxFiles = 50,
    minFiles = 5,
  } = options || {};

  // Check file count
  if (files.length < minFiles) {
    errors.push(`Minimum ${minFiles} files required`);
  }

  if (files.length > maxFiles) {
    errors.push(`Maximum ${maxFiles} files allowed`);
  }

  // Validate each file
  for (const file of files) {
    if (!validateImageFile(file)) {
      errors.push(`${file.name}: Invalid file type or size exceeds 10MB`);
      continue;
    }

    const isDimensionValid = await validateImageDimensions(file, minWidth, minHeight);
    if (!isDimensionValid) {
      errors.push(
        `${file.name}: Image dimensions must be at least ${minWidth}x${minHeight}`
      );
      continue;
    }

    validFiles.push(file);
  }

  return {
    valid: errors.length === 0,
    errors,
    validFiles,
  };
}

/**
 * Parse and validate postal code format
 */
export function validatePostalCode(postalCode: string): boolean {
  return POSTAL_CODE_PATTERN.test(postalCode);
}

/**
 * Parse and validate time format (HH:mm)
 */
export function validateTimeFormat(time: string): boolean {
  return TIME_PATTERN.test(time);
}

/**
 * Convert time string to Date-like object for comparison
 */
export function parseTime(timeString: string): { hours: number; minutes: number } | null {
  if (!validateTimeFormat(timeString)) {
    return null;
  }

  const [hours, minutes] = timeString.split(':').map(Number);
  return { hours, minutes };
}

/**
 * Validate coordinate precision and range
 */
export function validateCoordinates(
  latitude: number,
  longitude: number,
  precision: number = 6
): boolean {
  const isValidLat = latitude >= -90 && latitude <= 90;
  const isValidLon = longitude >= -180 && longitude <= 180;

  const lat_decimals = (latitude.toString().split('.')[1] || '').length;
  const lon_decimals = (longitude.toString().split('.')[1] || '').length;

  return (
    isValidLat &&
    isValidLon &&
    lat_decimals <= precision &&
    lon_decimals <= precision
  );
}

/**
 * Validate price constraints across seasonal prices
 */
export function validateSeasonalPrices(
  basePrice: number,
  seasonalPrices?: SeasonalPrice[]
): boolean {
  if (!seasonalPrices || seasonalPrices.length === 0) {
    return true;
  }

  // Check for date overlaps
  const sortedPrices = [...seasonalPrices].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  for (let i = 0; i < sortedPrices.length - 1; i++) {
    const current = sortedPrices[i];
    const next = sortedPrices[i + 1];

    const currentEnd = new Date(current.endDate);
    const nextStart = new Date(next.startDate);

    if (currentEnd >= nextStart) {
      return false; // Dates overlap
    }
  }

  // Check that all prices are positive
  return seasonalPrices.every((price) => price.pricePerNight >= 0);
}

/**
 * Sanitize user input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

/**
 * Validate property name uniqueness (client-side placeholder)
 * In production, this should call an API endpoint
 */
export async function validatePropertyNameUniqueness(
  propertyName: string,
  ownerId?: string
): Promise<boolean> {
  try {
    // This is a placeholder - implement actual API call
    // const response = await fetch(`/api/properties/check-name`, {
    //   method: 'POST',
    //   body: JSON.stringify({ propertyName, ownerId }),
    // });
    // return response.ok;

    // For now, always return true (implement server-side validation)
    return true;
  } catch (error) {
    console.error('Error validating property name:', error);
    return false;
  }
}

/**
 * Create a refined schema with async validation
 */
export const Step1SchemaWithUniqueness = Step1Schema.refine(
  async (data) => {
    // Only validate uniqueness on submit
    return await validatePropertyNameUniqueness(data.propertyName);
  },
  {
    message: 'Property name is already taken',
    path: ['propertyName'],
  }
);

// ============================================================================
// EXPORT ALL SCHEMAS
// ============================================================================

export const ValidationSchemas = {
  step1: Step1Schema,
  step2: Step2Schema,
  step3: Step3Schema,
  step4: Step4Schema,
  step5: Step5Schema,
  step6: Step6Schema,
  step7: Step7Schema,
  step8: Step8Schema,
  complete: CompleteSubmissionSchema,
} as const;

export default ValidationSchemas;
