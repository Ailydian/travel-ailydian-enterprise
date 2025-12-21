/**
 * Property Submission Schemas - Example Usage & Tests
 * Demonstrates how to use all validation schemas
 */

import {
  Step1Schema,
  Step2Schema,
  Step3Schema,
  Step4Schema,
  Step5Schema,
  Step6Schema,
  Step7Schema,
  Step8Schema,
  CompleteSubmissionSchema,
  validateImageFile,
  validateImageDimensions,
  validateImageFiles,
  validatePostalCode,
  validateTimeFormat,
  parseTime,
  validateCoordinates,
  validateSeasonalPrices,
  validatePropertyNameUniqueness,
} from './propertySubmissionSchemas';

// ============================================================================
// EXAMPLE USAGE - STEP 1
// ============================================================================

const step1Example = {
  propertyName: 'Luxury Beach Villa',
  propertyType: 'villa' as const,
  numberOfRooms: 5,
  numberOfBathrooms: 3.5,
  maximumGuests: 12,
  description:
    'A stunning beachfront villa with breathtaking ocean views, perfect for families and groups seeking a luxurious getaway. Features modern amenities, spacious living areas, and direct beach access.',
  highlightDescription: 'Beachfront luxury villa with pool',
};

// Validate Step 1
try {
  const validatedStep1 = Step1Schema.parse(step1Example);
  console.log('Step 1 validation passed:', validatedStep1);
} catch (error) {
  console.error('Step 1 validation failed:', error);
}

// ============================================================================
// EXAMPLE USAGE - STEP 2
// ============================================================================

const step2Example = {
  country: 'Turkey',
  province: 'Muğla',
  city: 'Bodrum',
  district: 'Türkbükü',
  postalCode: '48800',
  address: '123 Seaside Avenue, Bodrum, Turkey',
  coordinates: {
    latitude: 37.2349,
    longitude: 27.4285,
  },
  timezone: 'Europe/Istanbul',
  bedrooms: {
    queen: 3,
    double: 1,
    single: 0,
    bunk: 0,
  },
  livingAreas: {
    hasKitchen: true,
    kitchenType: 'full' as const,
    hasLivingRoom: true,
    hasDiningArea: true,
  },
};

// Validate Step 2
try {
  const validatedStep2 = Step2Schema.parse(step2Example);
  console.log('Step 2 validation passed:', validatedStep2);
} catch (error) {
  console.error('Step 2 validation failed:', error);
}

// Standalone helper function tests
console.log('Postal code validation:', validatePostalCode('48800')); // true
console.log('Coordinate validation:', validateCoordinates(37.2349, 27.4285)); // true

// ============================================================================
// EXAMPLE USAGE - STEP 3
// ============================================================================

const step3Example = {
  amenities: ['WiFi', 'Kitchen', 'Air Conditioning', 'Swimming Pool', 'Parking'],
  customAmenities: ['Private Beach Access', 'Concierge Service'],
  features: {
    hasWifi: true,
    hasTV: true,
    hasAirConditioning: true,
    hasHeating: false,
    hasParking: true,
    hasElevator: false,
    hasBalcony: true,
    hasTerrace: true,
    hasSwimmingPool: true,
    hasGym: false,
    hasJacuzzi: true,
    hasSauna: false,
    hasBBQ: true,
    hasWasher: true,
    hasDryer: true,
    hasDishwasher: true,
    hasOven: true,
    hasRefrigerator: true,
  },
  safetyFeatures: {
    hasSmokeDector: true,
    hasFirstAidKit: true,
    hasCO2Detector: false,
    hasSecurityCamera: true,
    hasLock: true,
    hasKey: true,
  },
};

// Validate Step 3
try {
  const validatedStep3 = Step3Schema.parse(step3Example);
  console.log('Step 3 validation passed:', validatedStep3);
} catch (error) {
  console.error('Step 3 validation failed:', error);
}

// ============================================================================
// EXAMPLE USAGE - STEP 4
// ============================================================================

const step4Example = {
  basePrice: 350,
  currency: 'USD',
  seasonalPrices: [
    {
      id: '1',
      seasonName: 'Peak Summer',
      startDate: '2024-07-01',
      endDate: '2024-08-31',
      pricePerNight: 500,
    },
    {
      id: '2',
      seasonName: 'Winter',
      startDate: '2024-12-15',
      endDate: '2025-01-15',
      pricePerNight: 400,
    },
  ],
  discounts: {
    weeklyDiscount: 10,
    monthlyDiscount: 15,
  },
  fees: {
    cleaningFee: 100,
    serviceFee: 50,
    taxPercentage: 10,
  },
  availability: {
    minStay: 3,
    maxStay: 90,
  },
};

// Validate Step 4
try {
  const validatedStep4 = Step4Schema.parse(step4Example);
  console.log('Step 4 validation passed:', validatedStep4);
} catch (error) {
  console.error('Step 4 validation failed:', error);
}

// Standalone helper function test
const seasonalValid = validateSeasonalPrices(350, step4Example.seasonalPrices);
console.log('Seasonal prices validation:', seasonalValid); // true

// ============================================================================
// EXAMPLE USAGE - STEP 5
// ============================================================================

const step5Example = {
  photos: [
    {
      id: '1',
      url: 'https://example.com/photos/1.jpg',
      room: 'exterior' as const,
      caption: 'Beautiful beachfront exterior',
      order: 0,
      isUploaded: true,
    },
    {
      id: '2',
      url: 'https://example.com/photos/2.jpg',
      room: 'living-room' as const,
      caption: 'Spacious living area',
      order: 1,
      isUploaded: true,
    },
    {
      id: '3',
      url: 'https://example.com/photos/3.jpg',
      room: 'bedroom' as const,
      caption: 'Master bedroom with ocean view',
      order: 2,
      isUploaded: true,
    },
    {
      id: '4',
      url: 'https://example.com/photos/4.jpg',
      room: 'kitchen' as const,
      caption: 'Modern fully equipped kitchen',
      order: 3,
      isUploaded: true,
    },
    {
      id: '5',
      url: 'https://example.com/photos/5.jpg',
      room: 'bathroom' as const,
      caption: 'Luxury bathroom',
      order: 4,
      isUploaded: true,
    },
  ],
  coverPhotoIndex: 0,
  videoUrl: 'https://example.com/videos/tour.mp4',
  virtualTourUrl: 'https://example.com/tour/3d',
};

// Validate Step 5
try {
  const validatedStep5 = Step5Schema.parse(step5Example);
  console.log('Step 5 validation passed:', validatedStep5);
} catch (error) {
  console.error('Step 5 validation failed:', error);
}

// ============================================================================
// EXAMPLE USAGE - STEP 6
// ============================================================================

const step6Example = {
  checkInTime: '15:00',
  checkOutTime: '11:00',
  policies: {
    smokingAllowed: false,
    petsAllowed: true,
    petTypes: ['dogs', 'cats'],
    eventsAllowed: false,
    partiesAllowed: false,
    commercialPhotographyAllowed: false,
  },
  customRules: [
    'Quiet hours from 22:00 to 08:00',
    'No smoking inside the villa',
    'Guests must arrange departure cleaning',
  ],
  cancellationPolicy: 'moderate' as const,
};

// Validate Step 6
try {
  const validatedStep6 = Step6Schema.parse(step6Example);
  console.log('Step 6 validation passed:', validatedStep6);
} catch (error) {
  console.error('Step 6 validation failed:', error);
}

// Standalone helper function test
console.log('Time format validation (15:00):', validateTimeFormat('15:00')); // true
console.log('Time parsing (15:00):', parseTime('15:00')); // { hours: 15, minutes: 0 }

// ============================================================================
// EXAMPLE USAGE - STEP 7
// ============================================================================

const step7Example = {
  agreeToTerms: true,
  agreeToPrivacyPolicy: true,
  agreeToHouseRules: true,
  agreeToGuestCommunicationPolicy: true,
  guestVettingConsent: true,
  legalInformation: {
    licenseNumber: 'LIC-2024-001',
    businessRegistration: 'REG-2024-001',
    taxId: 'TAX-2024-001',
    insuranceDetails: 'INS-2024-001',
  },
  verification: {
    governmentIdVerified: true,
    addressVerified: true,
    phoneVerified: true,
    emailVerified: true,
  },
};

// Validate Step 7
try {
  const validatedStep7 = Step7Schema.parse(step7Example);
  console.log('Step 7 validation passed:', validatedStep7);
} catch (error) {
  console.error('Step 7 validation failed:', error);
}

// ============================================================================
// EXAMPLE USAGE - STEP 8
// ============================================================================

const step8Example = {
  submissionType: 'submit_for_review' as const,
  additionalNotes:
    'This property is premium and ready for listing. All amenities are verified.',
  preferredVerificationMethod: 'email' as const,
};

// Validate Step 8
try {
  const validatedStep8 = Step8Schema.parse(step8Example);
  console.log('Step 8 validation passed:', validatedStep8);
} catch (error) {
  console.error('Step 8 validation failed:', error);
}

// ============================================================================
// COMPLETE SUBMISSION EXAMPLE
// ============================================================================

const completeSubmissionExample = {
  step1: step1Example,
  step2: step2Example,
  step3: step3Example,
  step4: step4Example,
  step5: step5Example,
  step6: step6Example,
  step7: step7Example,
  step8: step8Example,
};

// Validate complete submission
try {
  const validatedComplete = CompleteSubmissionSchema.parse(completeSubmissionExample);
  console.log('Complete submission validation passed');
} catch (error) {
  console.error('Complete submission validation failed:', error);
}

// ============================================================================
// IMAGE VALIDATION HELPERS
// ============================================================================

// Mock File object for demonstration (would be actual File in browser)
const mockImageFile = new File(['mock data'], 'test.jpg', {
  type: 'image/jpeg',
  lastModified: Date.now(),
});

// Note: In actual browser environment
// const isValid = validateImageFile(mockImageFile);
// console.log('Image file validation:', isValid);

// const dimensions = await validateImageDimensions(mockImageFile);
// console.log('Image dimensions validation:', dimensions);

// ============================================================================
// PROPERTY NAME UNIQUENESS
// ============================================================================

// Example of async validation
(async () => {
  const isUnique = await validatePropertyNameUniqueness('Luxury Beach Villa');
  console.log('Property name uniqueness check:', isUnique);
})();

// ============================================================================
// ERROR HANDLING EXAMPLES
// ============================================================================

// Example: Validation with error details
const invalidStep1 = {
  propertyName: 'A', // Too short
  propertyType: 'villa' as const,
  numberOfRooms: 5,
  numberOfBathrooms: 3.5,
  maximumGuests: 12,
  description: 'Short', // Too short
};

try {
  Step1Schema.parse(invalidStep1);
} catch (error: any) {
  console.error('Validation errors:');
  if (error.errors) {
    error.errors.forEach((err: any) => {
      console.error(`- ${err.path.join('.')}: ${err.message}`);
    });
  }
}

// ============================================================================
// SAFE PARSING (returns success/error object instead of throwing)
// ============================================================================

const result = Step1Schema.safeParse(step1Example);
if (result.success) {
  console.log('Safe parse successful:', result.data);
} else {
  console.error('Safe parse errors:', result.error);
}

export {};
