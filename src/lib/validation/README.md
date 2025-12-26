# Property Submission Validation Schemas

Comprehensive Zod validation schemas for the 8-step property submission wizard in the Travel LyDian Enterprise dashboard.

## Overview

This module provides type-safe validation for all property submission steps using Zod. It includes:

- 8 step-specific schemas (Step 1-8)
- 1 complete submission schema
- Multiple helper validation functions
- Image validation utilities
- Cross-field validation with refinements
- Descriptive error messages for each field

## Files

- `propertySubmissionSchemas.ts` - Main validation schemas and helper functions
- `propertySubmissionSchemas.test.ts` - Example usage and test cases
- `README.md` - This documentation

## Installation

Ensure Zod is installed in your project:

```bash
npm install zod
```

## Quick Start

### Import Schemas

```typescript
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
  ValidationSchemas,
} from '@/lib/validation/propertySubmissionSchemas';
```

### Basic Validation

```typescript
// Parse and throw on error
const validData = Step1Schema.parse(data);

// Safe parsing (returns result object)
const result = Step1Schema.safeParse(data);
if (result.success) {
  const validData = result.data;
} else {
  const errors = result.error;
}
```

## Step Schemas

### Step 1: Basic Information

Validates property name, type, room configuration, and description.

**Fields:**
- `propertyName` - string (3-100 chars, required)
- `propertyType` - enum (apartment, house, villa, bungalow, townhouse, cottage, studio, penthouse, houseboat, other)
- `numberOfRooms` - integer (1-20)
- `numberOfBathrooms` - number (0.5-20, allows decimals)
- `maximumGuests` - integer (1-50)
- `description` - string (50-5000 chars)
- `highlightDescription` - string (optional, max 60 chars)

**Example:**
```typescript
const step1Data = {
  propertyName: 'Luxury Beach Villa',
  propertyType: 'villa',
  numberOfRooms: 5,
  numberOfBathrooms: 3.5,
  maximumGuests: 12,
  description: 'A stunning beachfront villa with breathtaking ocean views...',
  highlightDescription: 'Beachfront luxury villa with pool',
};

const validated = Step1Schema.parse(step1Data);
```

### Step 2: Location & Details

Validates property location, coordinates, timezone, and room configurations.

**Fields:**
- `country` - string (required)
- `province` - string (required)
- `city` - string (required)
- `district` - string (required)
- `postalCode` - string (regex validated)
- `address` - string (5-200 chars)
- `coordinates` - object with latitude (-90 to 90) and longitude (-180 to 180)
- `timezone` - string (required)
- `bedrooms` - object with queen, double, single, bunk counts (min 0)
- `livingAreas` - object with kitchen, living room, dining area booleans

**Cross-Field Validation:**
- Must have at least one bed in bedrooms object

**Example:**
```typescript
const step2Data = {
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
    kitchenType: 'full',
    hasLivingRoom: true,
    hasDiningArea: true,
  },
};

const validated = Step2Schema.parse(step2Data);
```

### Step 3: Amenities

Validates amenities, features, and safety features.

**Fields:**
- `amenities` - array of strings (min 1 item)
- `customAmenities` - array of strings (max 10 items)
- `features` - PropertyFeatures object with 20 boolean fields
- `safetyFeatures` - SafetyFeatures object with 6 boolean fields

**Available Features:**
- WiFi, TV, Air Conditioning, Heating, Parking, Elevator
- Balcony, Terrace, Swimming Pool, Gym, Jacuzzi, Sauna
- BBQ, Washer, Dryer, Dishwasher, Oven, Refrigerator

**Safety Features:**
- Smoke Detector, First Aid Kit, CO2 Detector, Security Camera, Lock, Key

**Example:**
```typescript
const step3Data = {
  amenities: ['WiFi', 'Kitchen', 'Air Conditioning', 'Swimming Pool'],
  customAmenities: ['Private Beach Access', 'Concierge Service'],
  features: {
    hasWifi: true,
    hasTV: true,
    hasAirConditioning: true,
    hasSwimmingPool: true,
    // ... other features
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

const validated = Step3Schema.parse(step3Data);
```

### Step 4: Pricing

Validates pricing, discounts, fees, and availability rules.

**Fields:**
- `basePrice` - number (10-100000)
- `currency` - string (3-char uppercase, e.g., 'USD', 'EUR', 'TRY')
- `seasonalPrices` - array of seasonal price objects (optional)
- `discounts` - object with weekly, monthly, early booking percentages (0-100)
- `fees` - object with cleaning, service, tax, pet fees (optional)
- `availability` - object with minStay (1-365) and maxStay (optional)

**Cross-Field Validation:**
- maxStay must be >= minStay
- No overlapping seasonal price date ranges

**Example:**
```typescript
const step4Data = {
  basePrice: 350,
  currency: 'USD',
  seasonalPrices: [
    {
      seasonName: 'Peak Summer',
      startDate: '2024-07-01',
      endDate: '2024-08-31',
      pricePerNight: 500,
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

const validated = Step4Schema.parse(step4Data);
```

### Step 5: Photos

Validates property photos and media links.

**Fields:**
- `photos` - array of photo objects (5-50 items required)
  - `id` - string (unique identifier)
  - `url` - string (valid URL)
  - `room` - enum (living-room, bedroom, bathroom, kitchen, other, exterior)
  - `caption` - string (optional, max 200 chars)
  - `order` - integer (0-based order)
- `coverPhotoIndex` - integer (must be valid index in photos array)
- `videoUrl` - string (optional, valid URL)
- `virtualTourUrl` - string (optional, valid URL)

**Cross-Field Validation:**
- coverPhotoIndex must be within photos array bounds

**Example:**
```typescript
const step5Data = {
  photos: [
    {
      id: '1',
      url: 'https://example.com/photos/1.jpg',
      room: 'exterior',
      caption: 'Beautiful exterior',
      order: 0,
      isUploaded: true,
    },
    // ... 4 more photos required
  ],
  coverPhotoIndex: 0,
  videoUrl: 'https://example.com/videos/tour.mp4',
  virtualTourUrl: 'https://example.com/tour/3d',
};

const validated = Step5Schema.parse(step5Data);
```

### Step 6: House Rules

Validates check-in/out times, policies, and cancellation policy.

**Fields:**
- `checkInTime` - string (HH:mm format, 24-hour)
- `checkOutTime` - string (HH:mm format, 24-hour)
- `policies` - PropertyPolicies object with booleans
- `customRules` - array of rule strings (optional, max 5, each max 200 chars)
- `cancellationPolicy` - enum (flexible, moderate, strict, very_strict, non_refundable)

**Policies:**
- smokingAllowed, petsAllowed, eventsAllowed, partiesAllowed
- commercialPhotographyAllowed, petTypes (array)

**Cross-Field Validation:**
- checkOutTime must differ from checkInTime

**Example:**
```typescript
const step6Data = {
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
  ],
  cancellationPolicy: 'moderate',
};

const validated = Step6Schema.parse(step6Data);
```

### Step 7: Terms & Agreements

Validates acceptance of all terms and legal information.

**Fields:**
- `agreeToTerms` - boolean (must be true)
- `agreeToPrivacyPolicy` - boolean (must be true)
- `agreeToHouseRules` - boolean (must be true)
- `agreeToGuestCommunicationPolicy` - boolean (must be true)
- `guestVettingConsent` - boolean (must be true)
- `legalInformation` - object (optional)
  - licenseNumber, businessRegistration, taxId, insuranceDetails
- `verification` - object (optional)
  - governmentIdVerified, addressVerified, phoneVerified, emailVerified

**Example:**
```typescript
const step7Data = {
  agreeToTerms: true,
  agreeToPrivacyPolicy: true,
  agreeToHouseRules: true,
  agreeToGuestCommunicationPolicy: true,
  guestVettingConsent: true,
  legalInformation: {
    licenseNumber: 'LIC-2024-001',
    businessRegistration: 'REG-2024-001',
    taxId: 'TAX-2024-001',
  },
  verification: {
    governmentIdVerified: true,
    addressVerified: true,
    phoneVerified: true,
    emailVerified: true,
  },
};

const validated = Step7Schema.parse(step7Data);
```

### Step 8: Review & Submission

Validates final review and submission type.

**Fields:**
- `submissionType` - enum (save_draft, submit_for_review)
- `additionalNotes` - string (optional, max 1000 chars)
- `preferredVerificationMethod` - enum (email, phone, document) (optional)

**Example:**
```typescript
const step8Data = {
  submissionType: 'submit_for_review',
  additionalNotes: 'This property is premium and ready for listing.',
  preferredVerificationMethod: 'email',
};

const validated = Step8Schema.parse(step8Data);
```

## Helper Functions

### Image Validation

#### `validateImageFile(file: File): boolean`

Validates image file type and size.

**Accepted Formats:** JPEG, JPG, PNG, WebP
**Maximum Size:** 10MB

```typescript
const file = event.target.files?.[0];
if (validateImageFile(file)) {
  // File is valid
}
```

#### `validateImageDimensions(file: File, minWidth?: number, minHeight?: number): Promise<boolean>`

Validates image dimensions asynchronously.

**Default Minimum:** 400x300 pixels

```typescript
const isValid = await validateImageDimensions(file, 800, 600);
```

#### `validateImageFiles(files: File[], options?): Promise<ValidationResult>`

Batch validates multiple image files.

**Options:**
- `minWidth` - Minimum image width (default: 400)
- `minHeight` - Minimum image height (default: 300)
- `maxFiles` - Maximum file count (default: 50)
- `minFiles` - Minimum file count (default: 5)

**Returns:**
```typescript
interface ValidationResult {
  valid: boolean;
  errors: string[];
  validFiles: File[];
}
```

```typescript
const result = await validateImageFiles(files, {
  minWidth: 800,
  minHeight: 600,
  maxFiles: 50,
  minFiles: 5,
});

if (result.valid) {
  // Upload result.validFiles
} else {
  console.error(result.errors);
}
```

### Location Validation

#### `validatePostalCode(postalCode: string): boolean`

Validates postal code format (supports multiple formats).

```typescript
validatePostalCode('48800'); // true
validatePostalCode('SW1A 2AA'); // true
validatePostalCode('K1A 0B1'); // true
```

#### `validateCoordinates(latitude: number, longitude: number, precision?: number): boolean`

Validates geographic coordinates and decimal precision.

```typescript
validateCoordinates(37.2349, 27.4285); // true
validateCoordinates(91, 180); // false (latitude out of range)
```

### Time Validation

#### `validateTimeFormat(time: string): boolean`

Validates time format (HH:mm, 24-hour).

```typescript
validateTimeFormat('15:30'); // true
validateTimeFormat('25:00'); // false
```

#### `parseTime(timeString: string): { hours: number; minutes: number } | null`

Parses time string into hours and minutes.

```typescript
const time = parseTime('15:30');
// { hours: 15, minutes: 30 }
```

### Pricing Validation

#### `validateSeasonalPrices(basePrice: number, seasonalPrices?: SeasonalPrice[]): boolean`

Validates seasonal prices for overlaps and positive values.

```typescript
const isValid = validateSeasonalPrices(350, seasonalPrices);
```

### Other Utilities

#### `validatePropertyNameUniqueness(propertyName: string, ownerId?: string): Promise<boolean>`

Checks if property name is unique (placeholder for API call).

```typescript
const isUnique = await validatePropertyNameUniqueness('My Property');
```

#### `sanitizeInput(input: string): string`

Sanitizes user input to prevent XSS attacks.

```typescript
const safe = sanitizeInput(userInput);
```

## Error Handling

### Throwing on Error

```typescript
try {
  const data = Step1Schema.parse(formData);
} catch (error) {
  if (error instanceof z.ZodError) {
    error.errors.forEach((err) => {
      console.log(`${err.path.join('.')}: ${err.message}`);
    });
  }
}
```

### Safe Parsing

```typescript
const result = Step1Schema.safeParse(formData);

if (result.success) {
  // result.data is the validated data
  processData(result.data);
} else {
  // result.error contains validation errors
  result.error.errors.forEach((err) => {
    console.log(`${err.path.join('.')}: ${err.message}`);
  });
}
```

## Complete Submission Example

Validating all steps together:

```typescript
import { CompleteSubmissionSchema } from '@/lib/validation/propertySubmissionSchemas';

const completeData = {
  step1: { /* Step 1 data */ },
  step2: { /* Step 2 data */ },
  step3: { /* Step 3 data */ },
  step4: { /* Step 4 data */ },
  step5: { /* Step 5 data */ },
  step6: { /* Step 6 data */ },
  step7: { /* Step 7 data */ },
  step8: { /* Step 8 data */ },
};

const result = CompleteSubmissionSchema.safeParse(completeData);

if (result.success) {
  // Submit to backend
  await submitProperty(result.data);
} else {
  // Display errors
  displayErrors(result.error);
}
```

## Type Exports

All step schemas export corresponding TypeScript types:

```typescript
import {
  Step1FormData,
  Step2FormData,
  Step3FormData,
  Step4FormData,
  Step5FormData,
  Step6FormData,
  Step7FormData,
  Step8FormData,
  CompleteSubmissionData,
} from '@/lib/validation/propertySubmissionSchemas';
```

## Best Practices

1. **Always use safeParse** in user-facing applications to provide better error handling
2. **Validate early** - Validate form data as soon as it's complete
3. **Use refinements** - Leverage cross-field validation for complex rules
4. **Handle async validation** - Use proper async/await for uniqueness checks
5. **Sanitize inputs** - Always sanitize user input before storage
6. **Image validation** - Always validate image dimensions and file type before upload
7. **Error messages** - Display user-friendly error messages from validation

## Common Patterns

### Form Step Validation with React Hook Form

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Step1Schema } from '@/lib/validation/propertySubmissionSchemas';

function PropertyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(Step1Schema),
  });

  const onSubmit = (data) => {
    console.log(data); // Validated data
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('propertyName')} />
      {errors.propertyName && <span>{errors.propertyName.message}</span>}
      {/* More fields */}
    </form>
  );
}
```

### Batch Processing

```typescript
async function processPropertySubmission(formData) {
  // Validate each step
  const step1 = await Step1Schema.safeParseAsync(formData.step1);
  if (!step1.success) {
    throw new Error('Step 1 validation failed');
  }

  const step2 = await Step2Schema.safeParseAsync(formData.step2);
  if (!step2.success) {
    throw new Error('Step 2 validation failed');
  }

  // ... validate remaining steps

  // Process validated data
  return {
    step1: step1.data,
    step2: step2.data,
    // ...
  };
}
```

## API Integration

For backend validation, consider:

1. Duplicate validation on server-side using the same Zod schemas
2. Use async refinements for server-dependent validation (uniqueness checks)
3. Return detailed validation errors in API responses
4. Implement proper error handling and logging

## Contributing

When adding new validation rules:

1. Add the rule to the appropriate step schema
2. Include descriptive error messages
3. Add cross-field validation as refinements
4. Update this documentation
5. Add test cases to the test file

## Support

For issues or questions about validation schemas:

1. Check the example usage in `propertySubmissionSchemas.test.ts`
2. Review the Zod documentation: https://zod.dev
3. Check validation error messages for hints
4. Review cross-field validation refinements
