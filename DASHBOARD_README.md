# 🏠 Property Owner Dashboard - Tam Teknik Dokümantasyon

## 📋 İçindekiler

### 1. **Başlangıç Rehberleri**
- **[Teslim Özeti](./DASHBOARD_DELIVERY_SUMMARY.md)** - Proje kapsamı, teslim edilen dosyalar, başlangıç adımları
- **[Uygulama Rehberi](./PROPERTY_DASHBOARD_IMPLEMENTATION_GUIDE.md)** - Adım adım kurulum ve geliştirme
- **[Component Örnekleri](./COMPONENT_EXAMPLES.md)** - Tamamlanmış kod örnekleri ve best practices

### 2. **Teknik Spesifikasyon**
- **[Tam Spesifikasyon](./PROPERTY_OWNER_DASHBOARD_SPEC.md)** - 1200+ satır detaylı tasarım dokümanı

### 3. **Kaynak Kodlar**

#### TypeScript Türleri
```
types/dashboard.types.ts
├── User, Coordinates, DateRange
├── Property types (PropertyType, Property, Features, Photos)
├── Booking types (Booking, BookingStatus, PaymentStatus)
├── Message types (Conversation, Message, Attachment)
├── Analytics types (Metrics, ChartData, Review)
├── Settings types (Profile, Payment, Security, etc)
├── Wizard types (Step1Data - Step8Data)
└── UI types (Toast, Notification, Modal states)
```

#### State Management (Zustand)
```
stores/dashboardStore.ts
├── useDashboardStore (main global state)
│   ├── User & Auth
│   ├── Properties cache
│   ├── Bookings cache
│   ├── Conversations
│   ├── Analytics metrics
│   └── Notifications & Toasts
├── useBookingStore (booking-specific)
│   ├── Filtering (status, date, property)
│   ├── Sorting & pagination
│   ├── Bulk operations
│   └── Modal states
├── useMessageStore (messaging)
│   ├── Conversations list
│   ├── Messages cache
│   ├── Unread counts
│   └── Typing indicators
├── useAnalyticsStore (analytics data)
│   ├── Date range
│   ├── Property filters
│   ├── Chart data
│   └── Metrics
└── useUIStore (global UI state)
    ├── Modals
    ├── Toasts
    ├── Loading states
    └── Errors
```

#### API Services
```
services/api.ts (700+ lines)
├── PropertyAPI (CRUD, images, pricing, calendar)
├── BookingAPI (filtering, status, bulk, export)
├── MessageAPI (conversations, messages, search)
├── AnalyticsAPI (metrics, revenue, occupancy, reports)
├── EarningsAPI (earnings, payouts, taxes)
├── SettingsAPI (profile, payment, security, notifications)
└── PropertySubmissionAPI (draft, validation, upload)
```

#### React Query Hooks
```
hooks/useDashboard.ts (700+ lines, 35+ hooks)
├── Property Hooks
│   ├── useProperties(), useProperty(id)
│   ├── useCreateProperty(), useUpdateProperty()
│   ├── useUploadPropertyImages()
│   ├── usePropertyCalendar()
│   └── useUpdatePropertyPricing()
├── Booking Hooks
│   ├── useBookings(filters), useBooking(id)
│   ├── useConfirmBooking(), useRejectBooking()
│   ├── useCancelBooking(), useCheckIn/Out()
│   └── useBulkConfirmBookings()
├── Message Hooks
│   ├── useConversations(), useMessages()
│   ├── useSendMessage(), useMarkAsRead()
│   ├── useSearchMessages()
│   └── useArchiveConversation()
├── Analytics Hooks
│   ├── useAnalyticsOverview()
│   ├── useRevenueAnalytics(), useOccupancyAnalytics()
│   ├── useReviewsAnalytics()
│   └── useCompetitorAnalysis()
└── Settings Hooks
    ├── useProfileSettings()
    ├── usePaymentSettings()
    ├── useSecuritySettings()
    ├── useNotificationSettings()
    └── Many more...
```

#### Validation Schemas
```
lib/validation/propertySubmissionSchema.ts (750+ lines)
├── Step 1: Basic Info (propertyName uniqueness)
├── Step 2: Location & Details (coordinates validation)
├── Step 3: Amenities (predefined list)
├── Step 4: Pricing (currency, discounts)
├── Step 5: Photos (dimensions, room distribution)
├── Step 6: House Rules (time format, policies)
├── Step 7: Terms (checkbox validations)
├── Step 8: Review (complete validation)
└── Utility validators (images, dimensions)
```

---

## 🎯 Dashboard Sayfaları

### 1️⃣ Overview (Ana Dashboard)
**File:** `app/dashboard/page.tsx`

**Komponentler:**
- QuickStats (4 metric card)
- RevenueChart (Line/Area chart)
- UpcomingBookings (Table)
- RecentReviews (Carousel)
- PropertyHighlights (Cards)
- PerformanceMetrics (Gauges)

**State:**
```typescript
DashboardStats {
  upcomingBookings: number
  totalRevenue: number
  occupancyRate: number
  averageRating: number
}
```

---

### 2️⃣ Bookings (Rezervasyonlar)
**File:** `app/dashboard/bookings/page.tsx`

**Özellikler:**
- Advanced filtering (status, date, property)
- Sortable table (click to sort)
- Bulk select & actions
- Booking detail modal
- Export (CSV/PDF)
- Real-time status updates

**State:**
```typescript
BookingsState {
  bookings: Booking[]
  filters: BookingFilters
  sortBy: SortOption
  pagination: PaginationState
  selectedBooking: Booking | null
  isModalOpen: boolean
}
```

---

### 3️⃣ Calendar & Pricing (Takvim)
**File:** `app/dashboard/calendar/page.tsx`

**Özellikler:**
- Month/week/day view toggle
- Drag-and-drop pricing
- Seasonal pricing setup
- Min stay rules
- Block dates
- Price per night display

**State:**
```typescript
CalendarState {
  currentMonth: Date
  viewType: 'month' | 'week' | 'day'
  prices: DayPrice[]
  seasonalPrices: SeasonalPrice[]
  blockedDates: BlockedDate[]
  selectedDateRange: DateRange | null
}
```

---

### 4️⃣ Earnings (Gelir Raporları)
**File:** `app/dashboard/earnings/page.tsx`

**Özellikler:**
- Total earnings summary
- Revenue by property
- Payout management
- Payment history
- Tax reports
- Currency selector

**State:**
```typescript
EarningsState {
  dateRange: DateRange
  totalEarnings: number
  pendingPayout: number
  earnings: EarningRecord[]
  payoutsByProperty: PropertyEarnings[]
  chartData: ChartDataPoint[]
  taxData: TaxReport
}
```

---

### 5️⃣ Messages (Mesajlar)
**File:** `app/dashboard/messages/page.tsx`

**Özellikler:**
- Real-time messaging (WebSocket)
- Conversation list with search
- Message thread
- Typing indicators
- Quick reply templates
- Archive & pin conversations

**State:**
```typescript
MessagesState {
  conversations: Conversation[]
  currentConversationId: string | null
  messages: Message[]
  unreadCount: number
  typingUsers: string[]
  isSending: boolean
}
```

---

### 6️⃣ Analytics (İstatistikler)
**File:** `app/dashboard/analytics/page.tsx`

**Özellikler:**
- 6+ key metrics with trends
- Revenue trend chart
- Conversion funnel
- Occupancy heatmap
- Review trends
- Competitor analysis

**State:**
```typescript
AnalyticsState {
  dateRange: DateRange
  selectedProperties: string[]
  metrics: AnalyticsMetrics
  chartData: ChartDataPoint[]
  reviews: Review[]
  competitorData: CompetitorMetrics[]
}
```

---

### 7️⃣ Settings (Mülk Ayarları)
**File:** `app/dashboard/settings/page.tsx`

**Ayar Kategorileri:**
1. Profile Settings
   - Avatar, name, bio
   - Location, language, timezone

2. Property Details
   - Name, type, location
   - Rooms, bathrooms, guests
   - Amenities

3. House Rules
   - Check-in/out times
   - Pet, smoking, party policies
   - Custom rules

4. Cancellation Policy
   - Flexible, Moderate, Strict options
   - Custom refund settings

5. Payment Settings
   - Bank account details
   - PayPal & Stripe integration
   - Payout schedule

6. Notification Settings
   - Email notifications
   - Push notifications
   - SMS (optional)

7. Security Settings
   - Password change
   - Two-factor authentication
   - Active sessions
   - Login history

8. Integrations
   - Google Calendar
   - Airbnb sync
   - Booking.com sync
   - Webhooks

**State:**
```typescript
SettingsState {
  profile: ProfileSettings
  propertyDetails: PropertySettings
  houseRules: HouseRulesSettings
  payment: PaymentSettings
  notifications: NotificationSettings
  security: SecuritySettings
  integrations: IntegrationSettings[]
  activeTab: SettingsTab
  isSaving: boolean
  errors: Record<string, string>
}
```

---

## 🧙 Property Submission Wizard (8 Adım)

**File:** `app/dashboard/properties/new/page.tsx`

### Step 1: Basic Information
```typescript
propertyName: string (3-100 chars, unique)
propertyType: PropertyType
numberOfRooms: number (1-20)
numberOfBathrooms: number (0.5-20)
maximumGuests: number (1-50)
description: string (50-5000 chars)
highlightDescription?: string (max 60 chars)
```

### Step 2: Location & Details
```typescript
country: string
province: string
city: string
district: string
postalCode: string
address: string (5-200 chars)
coordinates: { latitude, longitude }
timezone: string
bedrooms: { queen, double, single, bunk }
livingAreas: { hasKitchen, kitchenType, ... }
```

### Step 3: Amenities & Features
```typescript
amenities: string[] (min 1, from predefined list)
customAmenities?: string[]
features: PropertyFeatures (20+ boolean fields)
safetyFeatures: SafetyFeatures (6 safety items)
```

### Step 4: Pricing
```typescript
basePrice: number ($10-$10,000)
currency: string (3-char code)
seasonalPrices?: SeasonalPrice[]
discounts?: {
  weeklyDiscount?: number (0-100%)
  monthlyDiscount?: number (0-100%)
  earlyBookingDiscount?: number
}
fees?: {
  cleaningFee?: number
  serviceFee?: number
  taxPercentage?: number
  petFee?: number
}
availability: {
  minStay: number (1-365 nights)
  maxStay?: number
}
```

### Step 5: Photos & Media
```typescript
photos: PhotoUpload[] (5-50 photos)
  - File validation
  - Dimension check (min 800x600)
  - Room categorization
  - Progress tracking
  - Error handling

coverPhotoIndex: number
videoUrl?: string (URL validation)
virtualTourUrl?: string (URL validation)
floorPlanImage?: string
```

**Image Upload Processing:**
1. File size check (max 5MB)
2. Dimension validation (800x600 minimum)
3. Format check (JPG, PNG, WebP)
4. Duplicate detection (perceptual hashing)
5. EXIF removal (privacy)
6. Compression (80-90% quality)
7. WebP conversion
8. Thumbnail generation
9. S3 upload
10. CDN optimization

### Step 6: House Rules
```typescript
checkInTime: string (HH:mm format)
checkOutTime: string (HH:mm format)
policies: {
  smokingAllowed: boolean
  petsAllowed: boolean
  petTypes?: string[]
  eventsAllowed: boolean
  partiesAllowed: boolean
  commercialPhotographyAllowed: boolean
}
customRules?: { rule1, rule2, rule3, rule4, rule5 } (max 5)
cancellationPolicy: CancellationPolicy
```

### Step 7: Terms & Conditions
```typescript
agreeToTerms: boolean (required)
agreeToPrivacyPolicy: boolean (required)
agreeToHouseRules: boolean (required)
agreeToGuestCommunicationPolicy: boolean (required)
guestVettingConsent: boolean (required)

legalInformation?: {
  licenseNumber?: string
  businessRegistration?: string
  taxId?: string
  insuranceDetails?: string
}

verification?: {
  governmentIdVerified: boolean
  addressVerified: boolean
  phoneVerified: boolean
  emailVerified: boolean
}
```

### Step 8: Review & Submit
```typescript
reviewedData: {
  basicInfo: Step1Data
  location: Step2Data
  amenities: Step3Data
  pricing: Step4Data
  photos: Step5Data
  rules: Step6Data
  legal: Step7Data
}

submissionType: 'save_draft' | 'submit_for_review'
additionalNotes?: string
preferredVerificationMethod?: 'email' | 'phone' | 'document'
```

---

## 🔌 API Endpoints (40+)

### Properties
```
GET    /api/properties                    # List all
GET    /api/properties/:id                # Get one
POST   /api/properties                    # Create
PUT    /api/properties/:id                # Update
DELETE /api/properties/:id                # Delete
POST   /api/properties/:id/images         # Upload images
PUT    /api/properties/:id/pricing        # Update pricing
GET    /api/properties/:id/calendar       # Get calendar
PUT    /api/properties/:id/calendar       # Update calendar
POST   /api/properties/:id/block-dates    # Block dates
POST   /api/properties/:id/verify         # Verify property
```

### Bookings
```
GET    /api/bookings                      # List with filters
GET    /api/bookings/:id                  # Get detail
POST   /api/bookings/:id/confirm          # Confirm
POST   /api/bookings/:id/reject           # Reject
POST   /api/bookings/:id/cancel           # Cancel
POST   /api/bookings/:id/check-in         # Mark arrived
POST   /api/bookings/:id/check-out        # Mark completed
POST   /api/bookings/bulk/confirm         # Bulk confirm
GET    /api/bookings/export?format=csv    # Export
```

### Messages
```
GET    /api/messages/conversations        # List conversations
GET    /api/messages/conversations/:id    # Get conversation
GET    /api/messages/conversations/:id/messages  # Get messages
POST   /api/messages/conversations/:id/messages  # Send message
PUT    /api/messages/:id/read             # Mark read
DELETE /api/messages/:id                  # Delete
GET    /api/messages/search?q=            # Search
POST   /api/messages/conversations/:id/archive
POST   /api/messages/conversations/:id/pin
```

### Analytics
```
GET    /api/analytics/overview            # Overview metrics
GET    /api/analytics/revenue             # Revenue data
GET    /api/analytics/occupancy           # Occupancy rates
GET    /api/analytics/reviews             # Reviews
GET    /api/analytics/chart?metric=&...   # Chart data
GET    /api/analytics/competitors/:id     # Competitor analysis
GET    /api/analytics/export?format=pdf   # Export report
```

### Earnings
```
GET    /api/earnings                      # Earnings records
GET    /api/earnings/payouts              # All payouts
GET    /api/earnings/payouts/pending      # Pending payouts
POST   /api/earnings/payouts/request      # Request payout
GET    /api/earnings/payouts/history      # Payout history
GET    /api/earnings/tax-report/:year     # Tax report
GET    /api/earnings/properties/:id       # Property earnings
```

### Settings
```
GET    /api/settings/profile              # Profile
PUT    /api/settings/profile              # Update profile
POST   /api/settings/profile/avatar       # Upload avatar

GET    /api/settings/property/:id         # Property settings
PUT    /api/settings/property/:id         # Update
GET    /api/settings/property/:id/house-rules
PUT    /api/settings/property/:id/house-rules

GET    /api/settings/payment              # Payment settings
PUT    /api/settings/payment              # Update
POST   /api/settings/payment/verify-bank  # Verify

GET    /api/settings/notifications        # Notifications
PUT    /api/settings/notifications        # Update

GET    /api/settings/security             # Security
POST   /api/settings/security/password    # Change password
POST   /api/settings/security/2fa/enable  # Enable 2FA
POST   /api/settings/security/2fa/verify  # Verify code
GET    /api/settings/security/sessions    # Active sessions
POST   /api/settings/security/sessions/:id/signout  # Sign out
POST   /api/settings/security/sessions/signout-all  # Sign out all
```

### Property Submission
```
POST   /api/properties/draft              # Save draft
PUT    /api/properties/draft/:id          # Update draft
GET    /api/properties/draft/:id          # Get draft
POST   /api/properties/validate/step-X    # Validate step
POST   /api/properties/upload-images      # Upload images
POST   /api/properties/validate-images    # Validate images
POST   /api/properties/submit             # Submit property
GET    /api/properties/check-name?name=   # Check availability
```

---

## 📁 Dosya Yapısı

```
/Users/sardag/Desktop/travel-lydian-enterprise/
├── DASHBOARD_README.md (Bu dosya)
├── DASHBOARD_DELIVERY_SUMMARY.md (Teslim özeti)
├── PROPERTY_OWNER_DASHBOARD_SPEC.md (Tam spesifikasyon)
├── PROPERTY_DASHBOARD_IMPLEMENTATION_GUIDE.md (Uygulama rehberi)
├── COMPONENT_EXAMPLES.md (Component örnekleri)
│
├── types/
│   └── dashboard.types.ts (550+ satır)
│
├── stores/
│   └── dashboardStore.ts (600+ satır)
│
├── services/
│   └── api.ts (700+ satır)
│
├── hooks/
│   └── useDashboard.ts (700+ satır)
│
└── lib/
    └── validation/
        └── propertySubmissionSchema.ts (750+ satır)
```

**Toplam Kod: 3,682+ satır**
**Toplam Dokümantasyon: 2,000+ satır**

---

## 🚀 Hızlı Başlangıç

### 1. Dosyaları Kopyala
```bash
cp types/dashboard.types.ts src/types/
cp stores/dashboardStore.ts src/stores/
cp services/api.ts src/services/
cp hooks/useDashboard.ts src/hooks/
cp lib/validation/propertySubmissionSchema.ts src/lib/validation/
```

### 2. Dependencies Yükle
```bash
npm install @tanstack/react-query zustand zod axios react-hook-form \
  react-dropzone socket.io-client date-fns clsx tailwind-merge
```

### 3. Layout Oluştur
```bash
# app/dashboard/layout.tsx oluştur
# DashboardHeader ve DashboardSidebar components'ini ekle
```

### 4. Pages Oluştur
```bash
# Her page için app/dashboard/[page]/page.tsx oluştur
# Component'leri components/dashboard/ dizininde geliştir
```

### 5. Test Et
```bash
npm run dev
# http://localhost:3000/dashboard ziyaret et
```

---

## 📚 Kaynaklar

- **TypeScript:** [handbook](https://www.typescriptlang.org/docs/)
- **Next.js:** [documentation](https://nextjs.org/docs)
- **React Query:** [docs](https://tanstack.com/query/latest)
- **Zustand:** [github](https://github.com/pmndrs/zustand)
- **Zod:** [github](https://github.com/colinhacks/zod)
- **Tailwind CSS:** [docs](https://tailwindcss.com/docs)

---

## ✅ Kontrol Listesi

Projeyi geliştirirken takip et:

### Phase 1: Setup
- [ ] Dosyaları kopyala
- [ ] Dependencies yükle
- [ ] Environment variables set et
- [ ] Database bağlantısı kur

### Phase 2: Core Features
- [ ] Overview page
- [ ] Bookings page
- [ ] Calendar page
- [ ] Earnings page

### Phase 3: Advanced Features
- [ ] Messages (WebSocket)
- [ ] Analytics
- [ ] Settings

### Phase 4: Property Submission
- [ ] Step 1-4 (Basic - Pricing)
- [ ] Step 5 (Photos)
- [ ] Step 6-7 (Rules - Terms)
- [ ] Step 8 (Review)

### Phase 5: Testing & Deployment
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Performance optimization
- [ ] Security audit
- [ ] Deploy to production

---

## 📊 İstatistikler

| Metrik | Değer |
|--------|-------|
| Dashboard Sayfaları | 7 |
| Wizard Adımları | 8 |
| API Endpoints | 40+ |
| TypeScript Türleri | 50+ |
| Zustand Stores | 5 |
| React Query Hooks | 35+ |
| Validation Schemas | 8 |
| Toplam Kod Satırı | 3,682 |
| Toplam Dokümantasyon | 2,000+ |

---

**Hazırlama:** Aralık 2024
**Durum:** ✅ Tamamlandı
**Versiyon:** 1.0
