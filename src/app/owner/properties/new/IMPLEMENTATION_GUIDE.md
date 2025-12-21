# Property Submission Wizard - Implementation Guide

## Quick Start

### 1. Prerequisites Check
Ensure these dependencies are installed:
```bash
npm install react-hook-form @hookform/resolvers zod framer-motion lucide-react
```

### 2. File Verification
All required files have been created:
- ✅ `page.tsx` - Main orchestrator
- ✅ `Step1PropertyType.tsx` - Step 1 component
- ✅ `Step2Location.tsx` - Step 2 component
- ✅ `Step3PropertyDetails.tsx` - Step 3 component
- ✅ `Step4Amenities.tsx` - Step 4 component
- ✅ `Step5Photos.tsx` - Step 5 component
- ✅ `Step6Pricing.tsx` - Step 6 component
- ✅ `Step7HouseRules.tsx` - Step 7 component
- ✅ `Step8Review.tsx` - Step 8 component

### 3. Required External Files
These files already exist in your project:
- `/src/lib/validation/propertySubmissionSchemas.ts` - Validation schemas
- `/src/types/dashboard.types.ts` - TypeScript types

## API Endpoint Setup

### Create the submission API endpoint

**File:** `/src/app/api/properties/submit/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { CompleteSubmissionSchema } from '@/lib/validation/propertySubmissionSchemas';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the submission
    const validatedData = CompleteSubmissionSchema.parse(body);

    // TODO: Save to database
    // Example:
    // const property = await prisma.property.create({
    //   data: transformSubmissionToProperty(validatedData)
    // });

    // TODO: Send confirmation email
    // await sendPropertySubmissionEmail(property);

    return NextResponse.json({
      success: true,
      message: 'Property submitted successfully',
      propertyId: 'temp-id', // Replace with actual property ID
    });

  } catch (error) {
    console.error('Property submission error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit property',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 400 }
    );
  }
}
```

## Testing the Wizard

### 1. Start Development Server
```bash
npm run dev
```

### 2. Navigate to the Wizard
Open your browser and go to:
```
http://localhost:3100/dashboard/properties/new
```

### 3. Test Each Step

#### Step 1: Property Type
- Select a property type
- Enter property name (min 3 chars)
- Set bedrooms, bathrooms, guests
- Write description (min 50 chars)
- Click "Next Step"

#### Step 2: Location
- Select country, province, city
- Enter address and postal code
- Set GPS coordinates (or use "Get Current Location")
- Configure bedrooms and living areas
- Click "Next Step"

#### Step 3: Amenities
- Select at least 1 amenity
- Add custom amenities (optional)
- Toggle advanced features
- Check safety features
- Click "Next Step"

#### Step 4: Pricing
- Select currency
- Set base price (min $10)
- Add discounts (optional)
- Set fees (optional)
- Configure minimum stay
- Click "Next Step"

#### Step 5: Photos
- Upload at least 5 photos
- Categorize each photo by room type
- Reorder photos by dragging
- Set cover photo
- Add video/tour URLs (optional)
- Click "Next Step"

#### Step 6: House Rules
- Set check-in/check-out times (HH:mm format)
- Configure policies
- Add custom rules (optional)
- Select cancellation policy
- Click "Next Step"

#### Step 7: Terms
- Accept all 5 required agreements
- Fill optional legal information
- Click "Next Step"

#### Step 8: Review
- Review all sections
- Choose submission type
- Add notes (optional)
- Click "Submit Property"

### 4. Test Auto-Save
- Fill out partial information
- Wait 30 seconds
- Refresh the page
- You should see a prompt to restore draft

### 5. Test Validation
- Try to proceed without required fields
- Check error messages appear
- Verify "Next" button is disabled when invalid

## Common Issues & Solutions

### Issue 1: Form Validation Not Working
**Symptom:** Can proceed to next step without filling required fields

**Solution:**
- Check that all fields have `{...register('fieldName')}`
- Verify Zod schema is imported correctly
- Ensure `zodResolver` is passed to `useForm`

### Issue 2: Auto-Save Not Working
**Symptom:** Draft not persisting after refresh

**Solution:**
- Check browser localStorage is enabled
- Look for localStorage quota errors in console
- Verify `LOCAL_STORAGE_KEY` is consistent

### Issue 3: Photos Not Uploading
**Symptom:** Photos appear but don't upload

**Solution:**
- This is expected - file upload is client-side only
- Implement actual upload in production:
```typescript
const handleUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  return await response.json();
};
```

### Issue 4: Step Navigation Broken
**Symptom:** Can't navigate between steps

**Solution:**
- Check that all step components are imported
- Verify `renderStepComponent()` switch statement
- Ensure step numbers match (1-8)

### Issue 5: Styling Issues
**Symptom:** Components look broken or unstyled

**Solution:**
- Verify Tailwind CSS is configured
- Check that `globals.css` is imported in layout
- Clear Next.js cache: `rm -rf .next && npm run dev`

## Production Checklist

### Before Deploying

- [ ] **API Endpoint Created**
  - Create `/api/properties/submit` endpoint
  - Add database integration
  - Implement error handling

- [ ] **File Upload Service**
  - Integrate Cloudinary/AWS S3
  - Add image compression
  - Implement progress tracking

- [ ] **Map Integration**
  - Add Google Maps or Leaflet
  - Implement geocoding
  - Enable address autocomplete

- [ ] **Email Notifications**
  - Setup email service
  - Create submission confirmation template
  - Create approval notification template

- [ ] **Security**
  - Add authentication check
  - Implement rate limiting
  - Validate file types and sizes server-side
  - Sanitize user inputs

- [ ] **Performance**
  - Enable image optimization
  - Add code splitting
  - Implement lazy loading
  - Setup CDN for assets

- [ ] **Testing**
  - Write unit tests for components
  - Add integration tests for flow
  - Setup E2E tests
  - Test on mobile devices

- [ ] **Monitoring**
  - Add error tracking (Sentry)
  - Setup analytics
  - Monitor API performance
  - Track conversion rates

## Environment Variables

Add these to `.env.local`:

```env
# Database
DATABASE_URL="your-database-url"

# File Upload
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-maps-key"

# Email
SMTP_HOST="smtp.example.com"
SMTP_PORT=587
SMTP_USER="your-email"
SMTP_PASSWORD="your-password"
```

## Database Schema

### Prisma Schema Example

```prisma
model Property {
  id                    String   @id @default(cuid())
  ownerId               String

  // Step 1 fields
  name                  String
  type                  PropertyType
  numberOfRooms         Int
  numberOfBathrooms     Float
  maximumGuests         Int
  description           String   @db.Text
  highlightDescription  String?

  // Step 2 fields
  country               String
  province              String
  city                  String
  district              String
  postalCode            String
  address               String
  latitude              Float
  longitude             Float
  timezone              String

  // Step 3 fields (JSON for flexibility)
  amenities             Json
  features              Json
  safetyFeatures        Json

  // Step 4 fields
  basePrice             Float
  currency              String
  discounts             Json?
  fees                  Json?
  minStay               Int
  maxStay               Int?

  // Step 5 fields
  photos                Json
  coverPhotoIndex       Int      @default(0)
  videoUrl              String?
  virtualTourUrl        String?

  // Step 6 fields
  checkInTime           String
  checkOutTime          String
  policies              Json
  customRules           Json?
  cancellationPolicy    String

  // Step 7 fields
  legalInformation      Json?

  // Metadata
  status                PropertyStatus @default(PENDING)
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
  publishedAt           DateTime?

  owner                 User     @relation(fields: [ownerId], references: [id])

  @@index([ownerId])
  @@index([status])
}

enum PropertyType {
  APARTMENT
  HOUSE
  VILLA
  BUNGALOW
  TOWNHOUSE
  COTTAGE
  STUDIO
  PENTHOUSE
  HOUSEBOAT
  OTHER
}

enum PropertyStatus {
  DRAFT
  PENDING
  APPROVED
  REJECTED
  ARCHIVED
}
```

## Customization Examples

### Adding a New Step

1. **Create Step Component**
```typescript
// Step9CustomFeatures.tsx
'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function Step9CustomFeatures({ data }: any) {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      {/* Your custom fields */}
    </div>
  );
}
```

2. **Add Validation Schema**
```typescript
// In propertySubmissionSchemas.ts
export const Step9Schema = z.object({
  customField: z.string().min(1),
});
```

3. **Update Main Wizard**
```typescript
// In page.tsx
import Step9CustomFeatures from './Step9CustomFeatures';

const TOTAL_STEPS = 9; // Update

const stepSchemas = [
  // ... existing schemas
  Step9Schema,
];

// Add to switch statement
case 9:
  return <Step9CustomFeatures {...stepProps} />;
```

### Changing Theme Colors

Update Tailwind colors in components:
```typescript
// Change from blue to purple
className="bg-blue-600"    // Old
className="bg-purple-600"  // New

className="border-blue-500"   // Old
className="border-purple-500" // New
```

### Adding Custom Validation

```typescript
// In page.tsx
const validateStep = async (stepNumber: number, data: any) => {
  // Add custom validation logic
  if (stepNumber === 1) {
    const isUnique = await checkPropertyNameUnique(data.propertyName);
    if (!isUnique) {
      throw new Error('Property name already exists');
    }
  }
};
```

## Support & Resources

### Documentation
- React Hook Form: https://react-hook-form.com/
- Zod: https://zod.dev/
- Framer Motion: https://www.framer.com/motion/
- Lucide Icons: https://lucide.dev/

### Project Files
- Validation Schemas: `/src/lib/validation/propertySubmissionSchemas.ts`
- Type Definitions: `/src/types/dashboard.types.ts`
- Schema Tests: `/src/lib/validation/propertySubmissionSchemas.test.ts`

### Getting Help
1. Check browser console for errors
2. Review validation schema documentation
3. Test with minimal data first
4. Enable verbose logging in development

## Next Steps

1. **Test the wizard thoroughly**
   - Go through all steps
   - Try different property types
   - Test validation errors
   - Verify auto-save works

2. **Setup API endpoint**
   - Create submission handler
   - Add database integration
   - Implement error handling

3. **Add file upload**
   - Choose upload service
   - Implement compression
   - Add progress tracking

4. **Integrate maps**
   - Setup Google Maps/Leaflet
   - Add geocoding
   - Enable address search

5. **Deploy to staging**
   - Test in production environment
   - Monitor performance
   - Gather user feedback

Good luck with your property submission wizard! 🚀
