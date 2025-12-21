/**
 * Property Submission Wizard - Validation Schemas
 * Comprehensive validation rules using Zod
 */

import { z } from 'zod';
import {
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
  Step5Data,
  Step6Data,
  Step7Data,
  Step8Data,
  PROPERTY_TYPES,
  AMENITIES_LIST,
  CANCELLATION_POLICIES,
} from '@/types/dashboard.types';

// ============================================================================
// UTILITY VALIDATION SCHEMAS
// ============================================================================

// Coordinates validation
export const CoordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

// Date range validation
export const DateRangeSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
}).refine((data) => data.endDate > data.startDate, {
  message: 'End date must be after start date',
  path: ['endDate'],
});

// ============================================================================
// STEP 1: BASIC INFORMATION
// ============================================================================

export const Step1Schema = z.object({
  propertyName: z
    .string()
    .min(3, 'Property name must be at least 3 characters')
    .max(100, 'Property name must not exceed 100 characters')
    .refine(
      (val) => /^[a-zA-Z0-9\s\-,.&()\']+$/.test(val),
      'Property name contains invalid characters'
    ),

  propertyType: z
    .enum(PROPERTY_TYPES as [string, ...string[]])
    .refine(
      (val) => PROPERTY_TYPES.includes(val as any),
      'Invalid property type'
    ),

  numberOfRooms: z
    .number()
    .int('Must be a whole number')
    .min(1, 'Must have at least 1 room')
    .max(20, 'Cannot exceed 20 rooms'),

  numberOfBathrooms: z
    .number()
    .min(0.5, 'Must have at least 0.5 bathroom')
    .max(20, 'Cannot exceed 20 bathrooms'),

  maximumGuests: z
    .number()
    .int('Must be a whole number')
    .min(1, 'Must accommodate at least 1 guest')
    .max(50, 'Cannot accommodate more than 50 guests'),

  description: z
    .string()
    .min(50, 'Description must be at least 50 characters')
    .max(5000, 'Description must not exceed 5000 characters'),

  highlightDescription: z
    .string()
    .max(60, 'Highlight must not exceed 60 characters')
    .optional()
    .or(z.literal('')),
}).strict();

// ============================================================================
// STEP 2: LOCATION & DETAILED INFORMATION
// ============================================================================

export const BedroomSchema = z.object({
  queen: z.number().int().min(0).default(0),
  double: z.number().int().min(0).default(0),
  single: z.number().int().min(0).default(0),
  bunk: z.number().int().min(0).default(0),
}).refine(
  (data) => data.queen + data.double + data.single + data.bunk > 0,
  'Must have at least one bed'
);

export const LivingAreasSchema = z.object({
  hasKitchen: z.boolean(),
  kitchenType: z
    .enum(['full', 'kitchenette', 'none'])
    .optional(),
  hasLivingRoom: z.boolean(),
  hasDiningArea: z.boolean(),
}).refine(
  (data) => {
    if (data.hasKitchen && !data.kitchenType) {
      return false;
    }
    return true;
  },
  {
    message: 'Kitchen type must be specified if kitchen is available',
    path: ['kitchenType'],
  }
);

export const Step2Schema = z.object({
  country: z
    .string()
    .min(2, 'Country is required'),

  province: z
    .string()
    .min(1, 'Province/State is required'),

  city: z
    .string()
    .min(1, 'City is required'),

  district: z
    .string()
    .min(1, 'District is required'),

  postalCode: z
    .string()
    .min(3, 'Valid postal code is required')
    .max(20),

  address: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must not exceed 200 characters'),

  coordinates: CoordinatesSchema,

  mapZoomLevel: z
    .number()
    .int()
    .min(1)
    .max(20)
    .default(15),

  timezone: z
    .string()
    .min(1, 'Timezone is required'),

  bedrooms: BedroomSchema,

  livingAreas: LivingAreasSchema,
}).strict();

// ============================================================================
// STEP 3: AMENITIES & FEATURES
// ============================================================================

export const PropertyFeaturesSchema = z.object({
  hasWifi: z.boolean().default(false),
  wifiSpeed: z.string().optional(),
  hasTV: z.boolean().default(false),
  hasAirConditioning: z.boolean().default(false),
  hasHeating: z.boolean().default(false),
  hasParking: z.boolean().default(false),
  parkingType: z.enum(['free', 'paid', 'valet']).optional(),
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
}).strict();

export const SafetyFeaturesSchema = z.object({
  hasSmokeDector: z.boolean().default(false),
  hasFirstAidKit: z.boolean().default(false),
  hasCO2Detector: z.boolean().default(false),
  hasSecurityCamera: z.boolean().default(false),
  hasLock: z.boolean().default(true),
  hasKey: z.boolean().default(true),
}).strict();

export const Step3Schema = z.object({
  amenities: z
    .array(z.string())
    .min(1, 'Select at least one amenity')
    .refine(
      (amenities) =>
        amenities.every((a) => AMENITIES_LIST.includes(a as any)),
      'Invalid amenity selected'
    ),

  customAmenities: z
    .array(
      z.string()
        .min(2, 'Custom amenity must be at least 2 characters')
        .max(50)
    )
    .optional()
    .default([]),

  features: PropertyFeaturesSchema,

  safetyFeatures: SafetyFeaturesSchema,
}).strict();

// ============================================================================
// STEP 4: PRICING
// ============================================================================

export const SeasonalPriceSchema = z.object({
  seasonName: z.string().min(1).max(50),
  startDate: z.date(),
  endDate: z.date(),
  pricePerNight: z
    .number()
    .min(10, 'Price must be at least $10')
    .max(10000, 'Price cannot exceed $10,000'),
}).refine(
  (data) => data.endDate > data.startDate,
  {
    message: 'End date must be after start date',
    path: ['endDate'],
  }
);

export const Step4Schema = z.object({
  basePrice: z
    .number()
    .min(10, 'Base price must be at least $10')
    .max(10000, 'Base price cannot exceed $10,000'),

  currency: z
    .string()
    .length(3, 'Valid currency code required (e.g., USD, EUR, TRY)')
    .toUpperCase(),

  seasonalPrices: z
    .array(SeasonalPriceSchema)
    .optional()
    .default([]),

  discounts: z
    .object({
      weeklyDiscount: z
        .number()
        .min(0)
        .max(100)
        .optional(),

      monthlyDiscount: z
        .number()
        .min(0)
        .max(100)
        .optional(),

      earlyBookingDiscount: z
        .number()
        .min(0)
        .max(100)
        .optional(),
    })
    .optional(),

  fees: z
    .object({
      cleaningFee: z
        .number()
        .min(0)
        .max(1000)
        .optional(),

      serviceFee: z
        .number()
        .min(0)
        .max(100)
        .optional(),

      taxPercentage: z
        .number()
        .min(0)
        .max(50)
        .optional(),

      petFee: z
        .number()
        .min(0)
        .max(500)
        .optional(),

      petFeePerNight: z.boolean().optional(),
    })
    .optional(),

  availability: z
    .object({
      minStay: z
        .number()
        .int()
        .min(1, 'Minimum stay must be at least 1 night')
        .max(365),

      maxStay: z
        .number()
        .int()
        .min(1)
        .max(365)
        .optional(),
    })
    .refine(
      (data) => !data.maxStay || data.maxStay >= data.minStay,
      {
        message: 'Maximum stay must be greater than or equal to minimum stay',
        path: ['maxStay'],
      }
    ),
}).strict();

// ============================================================================
// STEP 5: PHOTOS & MEDIA
// ============================================================================

export const PhotoUploadSchema = z.object({
  id: z.string().uuid(),
  url: z.string().url().optional(),
  localFile: z.instanceof(File).optional(),
  room: z.enum([
    'living-room',
    'bedroom',
    'bathroom',
    'kitchen',
    'other',
    'exterior',
  ]),
  caption: z.string().max(200).optional(),
  order: z.number().int().min(0),
  isUploaded: z.boolean().default(false),
  uploadProgress: z.number().min(0).max(100).optional(),
  error: z.string().optional(),
});

export const Step5Schema = z.object({
  photos: z
    .array(PhotoUploadSchema)
    .min(5, 'Upload at least 5 photos')
    .max(50, 'Cannot upload more than 50 photos')
    .refine(
      (photos) => {
        const rooms = new Set(photos.map((p) => p.room));
        return rooms.size >= 3; // Photos from at least 3 different rooms
      },
      'Photos must be from at least 3 different rooms'
    ),

  coverPhotoIndex: z
    .number()
    .int()
    .min(0),

  videoUrl: z
    .string()
    .url('Valid video URL required')
    .optional()
    .or(z.literal('')),

  virtualTourUrl: z
    .string()
    .url('Valid tour URL required')
    .optional()
    .or(z.literal('')),

  floorPlanImage: z
    .string()
    .url('Valid image URL required')
    .optional()
    .or(z.literal('')),
}).refine(
  (data) => data.coverPhotoIndex < data.photos.length,
  {
    message: 'Cover photo index out of range',
    path: ['coverPhotoIndex'],
  }
).strict();

// ============================================================================
// STEP 6: HOUSE RULES & POLICIES
// ============================================================================

export const Step6Schema = z.object({
  checkInTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:mm)'),

  checkOutTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:mm)'),

  policies: z
    .object({
      smokingAllowed: z.boolean(),
      petsAllowed: z.boolean(),
      petTypes: z.array(z.string()).optional(),
      eventsAllowed: z.boolean(),
      partiesAllowed: z.boolean(),
      commercialPhotographyAllowed: z.boolean(),
    })
    .strict(),

  customRules: z
    .record(
      z.string().min(5).max(200, 'Rule must not exceed 200 characters')
    )
    .optional()
    .default({}),

  cancellationPolicy: z
    .enum(['flexible', 'moderate', 'strict', 'very_strict', 'non_refundable'])
    .refine(
      (val) => Object.keys(CANCELLATION_POLICIES).includes(val),
      'Invalid cancellation policy'
    ),
}).refine(
  (data) => {
    const checkIn = data.checkInTime;
    const checkOut = data.checkOutTime;
    return checkIn !== checkOut;
  },
  {
    message: 'Check-in and check-out times must be different',
    path: ['checkOutTime'],
  }
).strict();

// ============================================================================
// STEP 7: TERMS & CONDITIONS
// ============================================================================

export const Step7Schema = z.object({
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, 'You must agree to the terms'),

  agreeToPrivacyPolicy: z
    .boolean()
    .refine((val) => val === true, 'You must agree to the privacy policy'),

  agreeToHouseRules: z
    .boolean()
    .refine(
      (val) => val === true,
      'You must acknowledge the house rules'
    ),

  agreeToGuestCommunicationPolicy: z
    .boolean()
    .refine(
      (val) => val === true,
      'You must agree to guest communication policy'
    ),

  guestVettingConsent: z
    .boolean()
    .refine(
      (val) => val === true,
      'You must consent to guest vetting'
    ),

  legalInformation: z
    .object({
      licenseNumber: z.string().optional(),
      businessRegistration: z.string().optional(),
      taxId: z.string().optional(),
      insuranceDetails: z.string().optional(),
    })
    .optional(),

  verification: z
    .object({
      governmentIdVerified: z.boolean().default(false),
      addressVerified: z.boolean().default(false),
      phoneVerified: z.boolean().default(false),
      emailVerified: z.boolean().default(false),
    })
    .optional(),
}).strict();

// ============================================================================
// STEP 8: REVIEW & SUBMIT
// ============================================================================

export const Step8Schema = z.object({
  reviewedData: z.object({
    basicInfo: Step1Schema,
    location: Step2Schema,
    amenities: Step3Schema,
    pricing: Step4Schema,
    photos: Step5Schema,
    rules: Step6Schema,
    legal: Step7Schema,
  }),

  submissionType: z.enum(['save_draft', 'submit_for_review']),

  additionalNotes: z
    .string()
    .max(1000)
    .optional(),

  preferredVerificationMethod: z
    .enum(['email', 'phone', 'document'])
    .optional(),
}).strict();

// ============================================================================
// COMPLETE WIZARD SCHEMA
// ============================================================================

export const CompletePropertyWizardSchema = z.object({
  step1: Step1Schema,
  step2: Step2Schema,
  step3: Step3Schema,
  step4: Step4Schema,
  step5: Step5Schema,
  step6: Step6Schema,
  step7: Step7Schema,
  step8: Step8Schema,
});

// ============================================================================
// IMAGE VALIDATION SCHEMA
// ============================================================================

export const ImageValidationSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) =>
        ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'Only JPEG, PNG, and WebP images are allowed'
    )
    .refine(
      (file) => file.size <= 5 * 1024 * 1024, // 5MB
      'File size must not exceed 5MB'
    ),

  minWidth: z.number().int().min(100).default(800),
  minHeight: z.number().int().min(100).default(600),
  maxWidth: z.number().int().min(800).default(6000),
  maxHeight: z.number().int().min(600).default(6000),
});

// ============================================================================
// UTILITY VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validate a single step of the wizard
 */
export function validateStep(step: number, data: any) {
  const schemas: Record<number, z.ZodSchema> = {
    1: Step1Schema,
    2: Step2Schema,
    3: Step3Schema,
    4: Step4Schema,
    5: Step5Schema,
    6: Step6Schema,
    7: Step7Schema,
    8: Step8Schema,
  };

  const schema = schemas[step];
  if (!schema) {
    throw new Error(`Invalid step number: ${step}`);
  }

  return schema.parseAsync(data);
}

/**
 * Validate complete wizard form
 */
export function validateCompleteWizard(data: any) {
  return CompletePropertyWizardSchema.parseAsync(data);
}

/**
 * Validate property name availability (async custom validation)
 */
export async function validatePropertyNameAvailability(
  name: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `/api/properties/check-name?name=${encodeURIComponent(name)}`
    );
    const { available } = await response.json();
    return available;
  } catch (error) {
    console.error('Error checking property name availability:', error);
    return false;
  }
}

/**
 * Validate image dimensions
 */
export async function validateImageDimensions(
  file: File,
  minWidth: number = 800,
  minHeight: number = 600
): Promise<boolean> {
  return new Promise((resolve) => {
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
 * Validate photo upload batch
 */
export async function validatePhotoBatch(files: File[]) {
  const validationResults = await Promise.all(
    files.map(async (file) => ({
      file,
      isValid: await validateImageDimensions(file),
    }))
  );

  return validationResults;
}

// ============================================================================
// TYPE INFERENCE FROM SCHEMAS
// ============================================================================

export type Step1ValidationData = z.infer<typeof Step1Schema>;
export type Step2ValidationData = z.infer<typeof Step2Schema>;
export type Step3ValidationData = z.infer<typeof Step3Schema>;
export type Step4ValidationData = z.infer<typeof Step4Schema>;
export type Step5ValidationData = z.infer<typeof Step5Schema>;
export type Step6ValidationData = z.infer<typeof Step6Schema>;
export type Step7ValidationData = z.infer<typeof Step7Schema>;
export type Step8ValidationData = z.infer<typeof Step8Schema>;
export type CompleteWizardData = z.infer<typeof CompletePropertyWizardSchema>;
