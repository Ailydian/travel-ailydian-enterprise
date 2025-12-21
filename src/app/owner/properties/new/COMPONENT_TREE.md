# Property Submission Wizard - Component Tree

```
📁 /dashboard/properties/new/
│
├── 📄 page.tsx (Main Orchestrator)
│   │
│   ├── 🎯 State Management
│   │   ├── FormProvider (react-hook-form)
│   │   ├── currentStep (1-8)
│   │   ├── completedSteps[]
│   │   ├── allFormData{}
│   │   └── isSubmitting
│   │
│   ├── 📊 UI Components
│   │   ├── Header
│   │   │   ├── Title: "List Your Property"
│   │   │   └── Description
│   │   │
│   │   ├── Progress Bar
│   │   │   ├── Step counter (X of 8)
│   │   │   ├── Percentage display
│   │   │   └── Animated progress bar
│   │   │
│   │   ├── Step Indicators (8 cards)
│   │   │   ├── Step number
│   │   │   ├── Completion checkmark
│   │   │   └── Step title
│   │   │
│   │   ├── Auto-save Indicator
│   │   │   └── Last saved timestamp
│   │   │
│   │   ├── Step Content Container
│   │   │   └── {Dynamic Step Component}
│   │   │
│   │   ├── Error Summary
│   │   │   └── Field error list
│   │   │
│   │   └── Navigation Buttons
│   │       ├── Back button
│   │       ├── Save Draft button
│   │       └── Next/Submit button
│   │
│   ├── 🎬 Features
│   │   ├── Auto-save (30s interval)
│   │   ├── Draft restoration
│   │   ├── LocalStorage persistence
│   │   ├── Step validation
│   │   ├── Form submission
│   │   └── Success modal
│   │
│   └── 🔄 Step Router
│       ├── Step 1: PropertyType
│       ├── Step 2: Location
│       ├── Step 3: PropertyDetails (Amenities)
│       ├── Step 4: Pricing
│       ├── Step 5: Photos
│       ├── Step 6: House Rules
│       ├── Step 7: Terms
│       └── Step 8: Review
│
│
├── 📄 Step1PropertyType.tsx
│   ├── Property Type Cards (10 options)
│   │   ├── Apartment
│   │   ├── House
│   │   ├── Villa
│   │   ├── Cottage
│   │   ├── Studio
│   │   ├── Townhouse
│   │   ├── Bungalow
│   │   ├── Penthouse
│   │   ├── Houseboat
│   │   └── Other
│   │
│   ├── Form Fields
│   │   ├── Property Name (input)
│   │   ├── Number of Bedrooms (number)
│   │   ├── Number of Bathrooms (number)
│   │   ├── Maximum Guests (number)
│   │   ├── Description (textarea)
│   │   └── Highlight Description (input, optional)
│   │
│   ├── Visual Elements
│   │   ├── Icon for each property type
│   │   ├── Selection highlighting
│   │   ├── Character counter
│   │   └── Tips box
│   │
│   └── Validation
│       ├── Required fields
│       ├── Min/max lengths
│       └── Number ranges
│
│
├── 📄 Step2Location.tsx
│   ├── Address Fields
│   │   ├── Country (dropdown)
│   │   ├── Province/State (input)
│   │   ├── City (input)
│   │   ├── District (input)
│   │   ├── Postal Code (input)
│   │   └── Street Address (input)
│   │
│   ├── Coordinates Section
│   │   ├── Latitude (number input)
│   │   ├── Longitude (number input)
│   │   └── "Get Current Location" button
│   │
│   ├── Map Preview
│   │   └── Placeholder for map integration
│   │
│   ├── Timezone
│   │   └── Timezone selector (dropdown)
│   │
│   ├── Bedroom Configuration
│   │   ├── Queen Beds (number)
│   │   ├── Double Beds (number)
│   │   ├── Single Beds (number)
│   │   └── Bunk Beds (number)
│   │
│   ├── Living Areas
│   │   ├── Has Kitchen (checkbox)
│   │   ├── Kitchen Type (conditional dropdown)
│   │   ├── Has Living Room (checkbox)
│   │   └── Has Dining Area (checkbox)
│   │
│   └── Validation
│       ├── Required address fields
│       ├── Postal code pattern
│       ├── Coordinate ranges
│       └── At least 1 bed required
│
│
├── 📄 Step3PropertyDetails.tsx (Amenities)
│   ├── Search Bar
│   │   └── Filter amenities
│   │
│   ├── Selected Count
│   │   └── Display total selected
│   │
│   ├── Amenity Categories (6 sections)
│   │   ├── Basic Amenities (11 items)
│   │   │   └── WiFi, AC, Heating, Parking, TV, etc.
│   │   │
│   │   ├── Bathroom (7 items)
│   │   │   └── Shower, Bathtub, Hair Dryer, etc.
│   │   │
│   │   ├── Kitchen & Dining (11 items)
│   │   │   └── Stove, Oven, Microwave, etc.
│   │   │
│   │   ├── Entertainment (8 items)
│   │   │   └── TV, Streaming, Games, etc.
│   │   │
│   │   ├── Outdoor (10 items)
│   │   │   └── Balcony, Pool, BBQ, etc.
│   │   │
│   │   └── Safety & Security (8 items)
│   │       └── Smoke Detector, Fire Ext., etc.
│   │
│   ├── Custom Amenities
│   │   ├── Add custom field
│   │   ├── Remove button per item
│   │   └── Max 10 custom items
│   │
│   ├── Advanced Features
│   │   ├── WiFi (with speed input)
│   │   └── Parking (with type selector)
│   │
│   ├── Safety Features
│   │   ├── Smoke Detector
│   │   ├── CO2 Detector
│   │   ├── First Aid Kit
│   │   └── Door Lock
│   │
│   └── Validation
│       ├── Min 1 amenity
│       ├── Max 10 custom
│       └── Custom length limits
│
│
├── 📄 Step4Amenities.tsx (Pricing)
│   ├── Base Pricing
│   │   ├── Currency selector (7 options)
│   │   └── Base Price per Night (number)
│   │
│   ├── Discounts Section
│   │   ├── Weekly Discount (%)
│   │   │   └── Calculated weekly price
│   │   ├── Monthly Discount (%)
│   │   │   └── Calculated monthly price
│   │   └── Early Booking Discount (%)
│   │
│   ├── Additional Fees
│   │   ├── Cleaning Fee ($)
│   │   ├── Service Fee ($)
│   │   ├── Tax Percentage (%)
│   │   └── Pet Fee ($)
│   │       └── Per night checkbox
│   │
│   ├── Stay Requirements
│   │   ├── Minimum Stay (nights)
│   │   └── Maximum Stay (nights, optional)
│   │
│   ├── Pricing Summary
│   │   └── Real-time calculation display
│   │
│   └── Validation
│       ├── Min/max price limits
│       ├── Discount ranges
│       └── Max >= min stay
│
│
├── 📄 Step5Photos.tsx
│   ├── Upload Zone
│   │   ├── Drag & drop area
│   │   ├── File browser button
│   │   └── Requirements display
│   │
│   ├── Photo Requirements
│   │   └── Min 5, max 50, formats, size
│   │
│   ├── Status Display
│   │   ├── Photo count
│   │   └── Requirement met indicator
│   │
│   ├── Photo Grid (per photo)
│   │   ├── Image preview
│   │   ├── Cover photo badge
│   │   ├── Drag handle
│   │   ├── Room type selector
│   │   ├── Caption input
│   │   ├── "Set as Cover" button
│   │   └── Remove button
│   │
│   ├── Drag & Drop Reordering
│   │   └── Visual feedback
│   │
│   ├── Additional Media
│   │   ├── Video URL (input)
│   │   └── Virtual Tour URL (input)
│   │
│   └── Validation
│       ├── Min/max photo count
│       ├── File type checking
│       ├── File size limit (10MB)
│       ├── Valid cover index
│       └── URL format
│
│
├── 📄 Step6Pricing.tsx (House Rules)
│   ├── Check-in/Check-out
│   │   ├── Check-in Time (time input)
│   │   └── Check-out Time (time input)
│   │
│   ├── House Policies (5 toggles)
│   │   ├── Smoking Allowed
│   │   ├── Pets Allowed
│   │   │   └── Pet Types (conditional)
│   │   ├── Events Allowed
│   │   ├── Parties Allowed
│   │   └── Commercial Photography
│   │
│   ├── Custom Rules
│   │   ├── Add rule input
│   │   ├── Rule list (max 5)
│   │   └── Remove button per rule
│   │
│   ├── Cancellation Policy (5 options)
│   │   ├── Flexible
│   │   ├── Moderate
│   │   ├── Strict
│   │   ├── Very Strict
│   │   └── Non-Refundable
│   │
│   └── Validation
│       ├── Time format (HH:mm)
│       ├── Times must differ
│       ├── Max 5 custom rules
│       └── Policy required
│
│
├── 📄 Step7HouseRules.tsx (Terms)
│   ├── Header
│   │   └── Terms importance explanation
│   │
│   ├── Required Agreements (5 checkboxes)
│   │   ├── Terms of Service
│   │   │   ├── Description
│   │   │   ├── "Read Terms" link
│   │   │   ├── Checkbox
│   │   │   └── Status indicator
│   │   │
│   │   ├── Privacy Policy
│   │   │   └── [Same structure]
│   │   │
│   │   ├── Host Responsibilities
│   │   │   └── [Same structure]
│   │   │
│   │   ├── Guest Communication Policy
│   │   │   └── [Same structure]
│   │   │
│   │   └── Guest Vetting Consent
│   │       └── [Same structure]
│   │
│   ├── Optional Legal Information
│   │   ├── License Number
│   │   ├── Business Registration
│   │   ├── Tax ID
│   │   └── Insurance Details
│   │
│   ├── Agreement Status
│   │   └── All agreed indicator
│   │
│   └── Validation
│       └── All 5 must be true
│
│
└── 📄 Step8Review.tsx
    ├── Header
    │   └── Review instructions
    │
    ├── Summary Sections (7 sections)
    │   ├── Step 1: Basic Information
    │   │   ├── Edit button
    │   │   ├── Property name
    │   │   ├── Property type
    │   │   ├── Capacity info
    │   │   └── Description
    │   │
    │   ├── Step 2: Location
    │   │   ├── Edit button
    │   │   ├── Full address
    │   │   └── Coordinates
    │   │
    │   ├── Step 3: Amenities
    │   │   ├── Edit button
    │   │   ├── Amenity chips
    │   │   └── Custom amenity chips
    │   │
    │   ├── Step 4: Pricing
    │   │   ├── Edit button
    │   │   ├── Base price
    │   │   ├── Discounts
    │   │   └── Stay requirements
    │   │
    │   ├── Step 5: Photos
    │   │   ├── Edit button
    │   │   ├── Photo count
    │   │   ├── Photo grid (8 preview)
    │   │   └── Cover photo indicator
    │   │
    │   ├── Step 6: House Rules
    │   │   ├── Edit button
    │   │   ├── Check times
    │   │   ├── Policies
    │   │   └── Cancellation policy
    │   │
    │   └── Step 7: Terms (referenced)
    │
    ├── Submission Type
    │   ├── Save as Draft (radio)
    │   └── Submit for Review (radio)
    │
    ├── Additional Notes
    │   └── Notes textarea
    │
    ├── Final Checklist
    │   ├── All info provided ✓
    │   ├── Photos uploaded ✓
    │   ├── Pricing set ✓
    │   └── Terms accepted ✓
    │
    └── Warning Box
        └── Pre-submission reminders


📚 Documentation Files
│
├── 📖 README.md
│   ├── Overview
│   ├── Features breakdown
│   ├── File structure
│   ├── Dependencies
│   ├── Usage guide
│   ├── Validation rules
│   ├── Customization
│   ├── Best practices
│   ├── Accessibility
│   ├── Performance
│   ├── Testing
│   └── Known issues
│
└── 📖 IMPLEMENTATION_GUIDE.md
    ├── Quick start
    ├── Prerequisites
    ├── API setup
    ├── Testing steps
    ├── Common issues
    ├── Production checklist
    ├── Database schema
    ├── Environment setup
    └── Customization examples
```

## Component Hierarchy

```
PropertySubmissionWizard (page.tsx)
└── FormProvider
    ├── Header
    ├── ProgressBar
    ├── StepIndicators[8]
    ├── AutoSaveIndicator
    ├── StepContent
    │   ├── Step1PropertyType
    │   ├── Step2Location
    │   ├── Step3PropertyDetails
    │   ├── Step4Amenities
    │   ├── Step5Photos
    │   ├── Step6Pricing
    │   ├── Step7HouseRules
    │   └── Step8Review
    ├── ErrorSummary
    ├── NavigationButtons
    └── SuccessModal
```

## Data Flow

```
User Input
    ↓
React Hook Form (per step)
    ↓
Zod Validation (step schema)
    ↓
Form State (allFormData)
    ↓
LocalStorage (auto-save)
    ↓
Step Navigation
    ↓
Final Submission
    ↓
API Endpoint (/api/properties/submit)
    ↓
Success Modal
    ↓
Redirect to Dashboard
```

## State Management

```
Global State (page.tsx)
├── currentStep: number
├── completedSteps: number[]
├── isSubmitting: boolean
├── showSuccessModal: boolean
├── lastSavedAt: Date | null
└── allFormData: {
    ├── step1: Step1FormData
    ├── step2: Step2FormData
    ├── step3: Step3FormData
    ├── step4: Step4FormData
    ├── step5: Step5FormData
    ├── step6: Step6FormData
    ├── step7: Step7FormData
    └── step8: Step8FormData
}

Form State (React Hook Form)
├── values: current step data
├── errors: validation errors
├── isValid: step validity
├── isDirty: form touched
└── touchedFields: field states

LocalStorage
└── property-submission-draft: {
    ├── formData: WizardFormData
    ├── currentStep: number
    ├── completedSteps: number[]
    └── savedAt: ISO timestamp
}
```

## Icon Usage Map

```
Home           → Step 1 header, property type
Building2      → Apartment type
Castle         → Villa type
TreePine       → Cottage type
Hotel          → Bungalow type
MapPin         → Step 2 header, location
Navigation     → Get location button
Globe          → Timezone field
Wifi           → WiFi amenity
Tv             → TV amenity
Wind           → Outdoor category
Utensils       → Kitchen category
Bed            → Bathroom category
Shield         → Safety category
Search         → Amenity search
X              → Remove items
DollarSign     → Pricing fields
Percent        → Discount fields
TrendingDown   → Discount header
Calendar       → Availability
Upload         → Photo upload
Image          → Photos header
GripVertical   → Drag handle
Star           → Cover photo
Clock          → Check times
Ban            → Smoking policy
PawPrint       → Pet policy
PartyPopper    → Events/parties
Camera         → Photography
Plus           → Add items
FileText       → Terms document
Users          → Host responsibilities
MessageSquare  → Communication policy
CheckCircle2   → Completion marks
Edit           → Edit buttons
AlertCircle    → Warnings
Sparkles       → Review header
Loader2        → Loading states
ChevronLeft    → Back button
ChevronRight   → Next button
Save           → Save draft
ExternalLink   → External links
AlertTriangle  → Important notices
```

## Validation Schema Map

```
Step1Schema → Step1PropertyType.tsx
Step2Schema → Step2Location.tsx
Step3Schema → Step3PropertyDetails.tsx (Amenities)
Step4Schema → Step4Amenities.tsx (Pricing)
Step5Schema → Step5Photos.tsx
Step6Schema → Step6Pricing.tsx (House Rules)
Step7Schema → Step7HouseRules.tsx (Terms)
Step8Schema → Step8Review.tsx
```

## Total Component Counts

- **Main Components**: 9
- **Form Fields**: ~80+
- **Icons Used**: ~40+
- **Validation Rules**: ~100+
- **Lines of Code**: ~4,000
- **Documentation Lines**: ~900
- **Interactive Elements**: ~200+
