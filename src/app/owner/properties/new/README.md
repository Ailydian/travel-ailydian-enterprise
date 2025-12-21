# Property Submission Wizard

A comprehensive 8-step property submission wizard built with Next.js, React Hook Form, Zod validation, and Framer Motion animations.

## Overview

This wizard provides an Airbnb/Booking.com quality user experience for property owners to list their properties on the platform. It features a modern UI, real-time validation, auto-save functionality, and smooth step transitions.

## Features

### Core Features
- ✅ **8-Step Wizard Flow** - Organized, intuitive step-by-step process
- ✅ **Form State Management** - Powered by react-hook-form
- ✅ **Zod Validation** - Comprehensive field and cross-field validation
- ✅ **Auto-Save** - Drafts automatically saved to localStorage every 30 seconds
- ✅ **Progress Tracking** - Visual progress bar and step indicators
- ✅ **Mobile Responsive** - Fully responsive design for all devices
- ✅ **Animation** - Smooth transitions using Framer Motion
- ✅ **Error Handling** - Clear, user-friendly error messages
- ✅ **Success Modal** - Confirmation animation on submission

### Step-by-Step Features

#### Step 1: Property Type & Basic Info
- Card-based property type selection (10 types)
- Property name input
- Basic capacity information (bedrooms, bathrooms, guests)
- Rich text description
- Optional highlight description

#### Step 2: Location & Details
- Country, province/state, city dropdowns
- Street address and postal code
- GPS coordinates with "Get Current Location" button
- Timezone selection
- Map preview placeholder
- Bedroom configuration (queen, double, single, bunk beds)
- Living areas configuration

#### Step 3: Amenities & Features
- Categorized amenity selection (6 categories)
- Search functionality for amenities
- Custom amenities (up to 10)
- Advanced features toggles (WiFi, Parking with types)
- Safety features checkboxes
- Visual selection count

#### Step 4: Pricing & Availability
- Multi-currency support
- Base price per night
- Length-of-stay discounts (weekly, monthly, early booking)
- Additional fees (cleaning, service, tax, pet)
- Minimum/maximum stay requirements
- Real-time price calculations

#### Step 5: Photos & Media
- Drag & drop photo upload
- Multi-file selection
- Minimum 5 photos requirement (up to 50)
- Photo reordering (drag and drop)
- Room type categorization
- Optional captions
- Cover photo selection
- Video URL (YouTube/Vimeo)
- Virtual tour URL (Matterport)
- Image validation and preview

#### Step 6: House Rules & Policies
- Check-in/check-out times (24-hour format)
- Policy toggles (smoking, pets, events, parties, photography)
- Pet type selection (conditional)
- Custom house rules (up to 5)
- Cancellation policy selection (5 options)
- Visual policy cards

#### Step 7: Terms & Agreements
- 5 required agreements:
  - Terms of Service
  - Privacy Policy
  - Host Responsibilities
  - Guest Communication Policy
  - Guest Vetting Consent
- Optional legal information fields
- External links to full documents
- Visual agreement status indicator

#### Step 8: Review & Submit
- Comprehensive summary of all steps
- Edit buttons for each section
- Photo gallery preview
- Submission type selection (draft/review)
- Additional notes field
- Final checklist
- Pre-submission warnings

## File Structure

```
/src/app/dashboard/properties/new/
├── page.tsx                    # Main wizard orchestrator
├── Step1PropertyType.tsx       # Property type selection
├── Step2Location.tsx           # Location information
├── Step3PropertyDetails.tsx    # Amenities & features
├── Step4Amenities.tsx          # Pricing & availability
├── Step5Photos.tsx             # Photo upload
├── Step6Pricing.tsx            # House rules
├── Step7HouseRules.tsx         # Terms & agreements
├── Step8Review.tsx             # Review & submit
└── README.md                   # This file
```

## Dependencies

### Required Packages
- `react-hook-form` - Form state management
- `@hookform/resolvers` - Zod resolver for validation
- `zod` - Schema validation
- `framer-motion` - Animations
- `lucide-react` - Icons

### Validation Schemas
All schemas are imported from:
```typescript
@/lib/validation/propertySubmissionSchemas
```

### Type Definitions
All types are imported from:
```typescript
@/types/dashboard.types
```

## Usage

### Basic Usage

Navigate to the wizard:
```
/dashboard/properties/new
```

The wizard will:
1. Load any saved draft from localStorage
2. Guide users through 8 steps
3. Validate each step before allowing progression
4. Auto-save progress every 30 seconds
5. Submit to API on final step

### API Integration

The wizard submits to:
```typescript
POST /api/properties/submit
```

Expected payload structure matches the `CompleteSubmissionSchema`:
```typescript
{
  step1: Step1FormData,
  step2: Step2FormData,
  step3: Step3FormData,
  step4: Step4FormData,
  step5: Step5FormData,
  step6: Step6FormData,
  step7: Step7FormData,
  step8: Step8FormData
}
```

### LocalStorage Key

Draft data is saved to:
```
property-submission-draft
```

Draft structure:
```typescript
{
  formData: WizardFormData,
  currentStep: number,
  completedSteps: number[],
  savedAt: string (ISO timestamp)
}
```

## Validation Rules

### Step 1 Validation
- Property name: 3-100 characters
- Property type: Required enum
- Number of rooms: 1-20
- Number of bathrooms: 0.5-20
- Maximum guests: 1-50
- Description: 50-5000 characters
- Highlight description: Max 60 characters (optional)

### Step 2 Validation
- All location fields: Required
- Postal code: Pattern validation
- Coordinates: -90 to 90 (lat), -180 to 180 (lon)
- Timezone: Required
- At least one bed required across all bedroom types

### Step 3 Validation
- Minimum 1 amenity required
- Custom amenities: Max 10, each 1-100 characters
- Features and safety features: Optional booleans

### Step 4 Validation
- Base price: Minimum 10, maximum 100,000
- Currency: 3-character code
- Discounts: 0-100%
- Minimum stay: 1-365 days
- Maximum stay must be >= minimum stay

### Step 5 Validation
- Minimum 5 photos required, maximum 50
- Each photo requires room type
- Cover photo index must be valid
- Video/virtual tour URLs: Valid URL format (optional)
- File validation: Max 10MB, image formats only

### Step 6 Validation
- Check-in/check-out times: HH:mm format (24-hour)
- Times must be different
- Cancellation policy: Required enum
- Custom rules: Max 5, each 1-200 characters

### Step 7 Validation
- All 5 agreements must be accepted (true)
- Legal information fields: All optional

### Step 8 Validation
- Submission type: Required (draft or review)
- Additional notes: Max 1000 characters (optional)

## Customization

### Styling
All components use Tailwind CSS. Key classes:
- Primary color: `blue-500`, `blue-600`
- Success: `green-500`, `green-600`
- Error: `red-500`, `red-600`
- Gradients: `from-blue-50 to-indigo-50`

### Icons
Lucide React icons are used throughout. To change icons:
```typescript
import { NewIcon } from 'lucide-react';
```

### Animations
Framer Motion variants can be customized in page.tsx:
```typescript
<motion.div
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -20 }}
  transition={{ duration: 0.3 }}
>
```

## Best Practices

### Form State
- Use `watch()` for reactive values
- Use `setValue()` for programmatic updates
- Always include `{ shouldValidate: true }` when setting values

### File Uploads
The photo upload component creates base64 previews. In production:
1. Replace with actual upload service (e.g., Cloudinary, AWS S3)
2. Show upload progress
3. Handle upload errors gracefully
4. Compress images before upload

### Map Integration
Step 2 includes a map placeholder. To integrate:
1. Install map library (e.g., `react-leaflet` or Google Maps)
2. Replace the placeholder div with actual map component
3. Add marker placement functionality
4. Enable geocoding for address autocomplete

### API Error Handling
Add comprehensive error handling:
```typescript
try {
  const response = await fetch('/api/properties/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = await response.json();
    // Handle specific error codes
  }
} catch (error) {
  // Handle network errors
}
```

## Accessibility

### Features Implemented
- ✅ Semantic HTML elements
- ✅ Proper label associations
- ✅ ARIA attributes where needed
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Error announcements
- ✅ High contrast colors

### Keyboard Shortcuts
- `Tab` - Navigate between fields
- `Enter` - Submit current step (when valid)
- `Esc` - Close modals (success modal)

## Performance Optimizations

### Implemented
- ✅ Form state persistence
- ✅ Debounced auto-save
- ✅ Lazy component rendering
- ✅ Optimized re-renders with React Hook Form
- ✅ Image preview optimization

### Recommended
- [ ] Code splitting per step
- [ ] Image lazy loading
- [ ] Virtual scrolling for large lists
- [ ] Service worker for offline support
- [ ] Progressive image loading

## Testing

### Unit Tests
Test each step component:
```typescript
describe('Step1PropertyType', () => {
  it('should render property type cards', () => {});
  it('should validate required fields', () => {});
  it('should update form state on selection', () => {});
});
```

### Integration Tests
Test wizard flow:
```typescript
describe('Property Submission Wizard', () => {
  it('should navigate through all steps', () => {});
  it('should save draft to localStorage', () => {});
  it('should submit form successfully', () => {});
  it('should handle validation errors', () => {});
});
```

### E2E Tests
Test complete user journey:
```typescript
describe('Property Submission E2E', () => {
  it('should complete full submission flow', () => {});
  it('should restore from saved draft', () => {});
  it('should handle network errors', () => {});
});
```

## Known Issues & Future Enhancements

### Known Issues
- Map integration is placeholder only
- Photo upload doesn't compress images
- No image dimension validation (client-side)
- Auto-save can be interrupted by rapid navigation

### Planned Enhancements
- [ ] Add progress saving indicator
- [ ] Implement image compression
- [ ] Add multi-language support
- [ ] Enable property templates
- [ ] Add bulk photo upload
- [ ] Implement advanced pricing rules
- [ ] Add availability calendar
- [ ] Enable partial submissions
- [ ] Add guided tour/tooltips
- [ ] Implement AI description generator

## Support

For issues or questions:
- Check validation schema documentation: `/src/lib/validation/README.md`
- Review type definitions: `/src/types/dashboard.types.ts`
- Test validation: `/src/lib/validation/propertySubmissionSchemas.test.ts`

## License

Part of the Travel Ailydian Enterprise platform.
