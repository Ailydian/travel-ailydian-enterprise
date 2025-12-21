# Property Owner Dashboard - Teknik Spesifikasyonu

## 1. Proje Özeti
Airbnb, Booking.com ve Agoda'dan esinlenen, property yöneticileri için enterprise-grade dashboard sistemi.

### Ana Özellikler:
- Multi-page responsive dashboard
- Real-time reservation tracking
- Advanced analytics ve reporting
- Dynamic pricing ve calendar management
- Messaging system
- Property submission wizard
- Comprehensive settings management

---

## 2. Dashboard Sayfaları Mimarisi

### Sayfa Hiyerarşisi:
```
/dashboard
  ├── /dashboard/overview          (Ana Dashboard)
  ├── /dashboard/bookings          (Rezervasyonlar)
  ├── /dashboard/calendar          (Takvim & Fiyatlandırma)
  ├── /dashboard/earnings          (Gelir Raporları)
  ├── /dashboard/messages          (Mesajlar)
  ├── /dashboard/analytics         (İstatistikler)
  ├── /dashboard/settings          (Mülk Ayarları)
  └── /dashboard/properties        (Mülkler Yönetimi)
       └── /dashboard/properties/new (Yeni Mülk Ekleme - Wizard)
```

---

## 3. Global State Management Architecture

### Zustand Store Yapısı:

#### 3.1 Property Store
- Mülk verilerinin merkezi yönetimi
- Cache management
- Real-time updates

#### 3.2 Booking Store
- Aktif rezervasyonlar
- Geçmiş ve gelecek bookings
- Filtering ve sorting

#### 3.3 Message Store
- Konuşmalar
- Unread count
- Optimistic updates

#### 3.4 Analytics Store
- Revenue data
- Performance metrics
- Occupancy rates

#### 3.5 UI Store
- Modal/dialog states
- Toast notifications
- Loading states

---

## 4. API Endpoints (Mock/Real)

### Property Endpoints:
```
GET    /api/properties                    # Tüm mülkler
GET    /api/properties/:id                # Mülk detayları
POST   /api/properties                    # Yeni mülk
PUT    /api/properties/:id                # Mülk güncelle
DELETE /api/properties/:id                # Mülk sil
POST   /api/properties/:id/images         # Resim yükle
PUT    /api/properties/:id/pricing        # Fiyatlandırma güncelle
GET    /api/properties/:id/calendar       # Takvim verisi
```

### Booking Endpoints:
```
GET    /api/bookings                      # Tüm rezervasyonlar
GET    /api/bookings/:id                  # Rezervasyon detayları
POST   /api/bookings/:id/confirm          # Rezervasyonu onayla
POST   /api/bookings/:id/reject           # Rezervasyonu reddet
POST   /api/bookings/:id/cancel           # Rezervasyonu iptal et
POST   /api/bookings/:id/mark-arrived     # Check-in
POST   /api/bookings/:id/mark-completed   # Check-out
```

### Message Endpoints:
```
GET    /api/messages/conversations        # Tüm konuşmalar
GET    /api/messages/:conversationId      # Konuşma mesajları
POST   /api/messages                      # Yeni mesaj gönder
PUT    /api/messages/:id/read             # Mesajı okundu işaretle
DELETE /api/messages/:id                  # Mesaj sil
POST   /api/messages/search               # Mesaj ara
```

### Analytics Endpoints:
```
GET    /api/analytics/overview            # Genel istatistikler
GET    /api/analytics/revenue             # Gelir detayları
GET    /api/analytics/occupancy           # İşgal oranları
GET    /api/analytics/reviews             # Değerlendirmeler
GET    /api/analytics/export              # Rapor dışa aktar
```

### Settings Endpoints:
```
GET    /api/settings/profile              # Profil bilgileri
PUT    /api/settings/profile              # Profil güncelle
GET    /api/settings/bank                 # Banka bilgileri
PUT    /api/settings/bank                 # Banka bilgileri güncelle
GET    /api/settings/notifications        # Bildirim ayarları
PUT    /api/settings/notifications        # Bildirim ayarları güncelle
POST   /api/settings/two-factor           # 2FA setup
```

---

## 5. Detaylı Component Yapısı

### 5.1 OVERVIEW (Ana Dashboard)

**Component Tree:**
```
DashboardOverview
├── DashboardHeader
│   ├── UserGreeting
│   ├── NotificationBell
│   └── ProfileDropdown
├── QuickStats
│   ├── StatCard (Bookings)
│   ├── StatCard (Revenue)
│   ├── StatCard (Occupancy)
│   └── StatCard (Rating)
├── RevenueChart
│   ├── LineChart (30-day trend)
│   └── ComparisonToggle
├── UpcomingBookings
│   ├── BookingsList
│   ├── BookingCard
│   └── ViewAllLink
├── RecentReviews
│   ├── ReviewCard
│   ├── RatingBadge
│   └── ResponseButton
├── PropertyHighlights
│   ├── PropertyCard
│   ├── StatusBadge
│   └── ActionMenu
└── PerformanceMetrics
    ├── OccupancyGauge
    ├── AvgReviewRating
    └── ResponseRateIndicator
```

**State Management:**
```typescript
interface OverviewState {
  stats: DashboardStats;
  upcomingBookings: Booking[];
  recentReviews: Review[];
  propertyHighlights: Property[];
  chartData: RevenueChartData[];
  performanceMetrics: PerformanceMetrics;
  isLoading: boolean;
  error: string | null;
}
```

**UI Widgets:**
- Responsive stat cards with icons
- Line chart (recharts) for revenue trends
- Table with sorting for bookings
- Star rating display
- Progress gauges for metrics
- Modal for booking details

---

### 5.2 BOOKINGS (Rezervasyonlar)

**Component Tree:**
```
BookingsPage
├── BookingsHeader
│   ├── PageTitle
│   ├── SearchBox
│   └── FilterBar
│       ├── StatusFilter
│       ├── DateRangeFilter
│       ├── PropertyFilter
│       └── SortDropdown
├── BookingsTable
│   ├── TableHeader
│   ├── BookingRow
│   │   ├── GuestInfo
│   │   ├── PropertyInfo
│   │   ├── DateRange
│   │   ├── AmountBadge
│   │   ├── StatusBadge
│   │   └── ActionMenu
│   └── Pagination
├── BookingModal
│   ├── BookingDetails
│   │   ├── GuestProfile
│   │   ├── BookingTimeline
│   │   ├── SpecialRequests
│   │   └── PaymentDetails
│   ├── ActionButtons
│   │   ├── ConfirmBtn
│   │   ├── RejectBtn
│   │   ├── CancelBtn
│   │   └── MessageGuestBtn
│   └── DocumentDownload
└── BulkActions
    ├── CheckAllCheckbox
    ├── ConfirmSelectedBtn
    └── ExportBtn
```

**State Management:**
```typescript
interface BookingsState {
  bookings: Booking[];
  filteredBookings: Booking[];
  selectedBooking: Booking | null;
  filters: BookingFilters;
  sortBy: SortOption;
  pagination: PaginationState;
  selectedBookings: string[];
  isModalOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

interface Booking {
  id: string;
  propertyId: string;
  guestId: string;
  guestName: string;
  guestEmail: string;
  guestAvatar: string;
  checkIn: Date;
  checkOut: Date;
  totalNights: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  specialRequests: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: Date;
  lastModified: Date;
}
```

**User Interactions:**
- Click booking row to view details
- Inline status filters
- Bulk select with checkboxes
- Export to CSV/PDF
- Quick actions via dropdown menu
- Message guest directly from modal

---

### 5.3 CALENDAR & PRICING (Takvim)

**Component Tree:**
```
CalendarPage
├── CalendarHeader
│   ├── MonthNavigator
│   ├── ViewToggle (Month/Week/Day)
│   ├── LegendIndicator
│   └── BulkPricingBtn
├── PricingToolbar
│   ├── SeasonalPricingBtn
│   ├── MinStayRulesBtn
│   └── BlockDatesBtn
├── CalendarGrid
│   ├── DayCell
│   │   ├── DateNumber
│   │   ├── PriceDisplay
│   │   ├── StatusIndicator (Booked/Available)
│   │   └── BookingPopover (hover)
│   └── WeekGrid
│       └── DayCell[]
├── PricingModal
│   ├── CalendarSelector
│   ├── PriceInput
│   ├── SeasonName
│   ├── DiscountRules
│   │   ├── WeeklyDiscount
│   │   ├── MonthlyDiscount
│   │   └── MinStayDiscount
│   └── ApplyBtn
├── BlockDatesModal
│   ├── DateRangePicker
│   ├── BlockReason
│   └── BlockBtn
└── RuleManagement
    ├── CurrentRules
    └── RuleEditor
```

**State Management:**
```typescript
interface CalendarState {
  currentMonth: Date;
  viewType: 'month' | 'week' | 'day';
  bookings: CalendarBooking[];
  prices: DayPrice[];
  seasonalPrices: SeasonalPrice[];
  minStayRules: MinStayRule[];
  blockedDates: BlockedDate[];
  selectedDateRange: DateRange | null;
  isPricingModalOpen: boolean;
  isBlockDatesModalOpen: boolean;
  isLoading: boolean;
}

interface DayPrice {
  date: Date;
  price: number;
  discountPercentage?: number;
  minStay?: number;
  isBlocked: boolean;
}
```

**UI Widgets:**
- Full calendar view with color coding
- Price input overlay on dates
- Draggable date range selector
- Discount calculation preview
- Color legend for booking status

---

### 5.4 EARNINGS (Gelir Raporları)

**Component Tree:**
```
EarningsPage
├── EarningsHeader
│   ├── PageTitle
│   ├── DateRangePicker
│   └── CurrencySelector
├── EarningsSummary
│   ├── TotalEarningsCard
│   │   ├── Amount
│   ├── PendingPayoutCard
│   │   ├── Amount
│   │   └── ProcessDateLabel
│   ├── AvgNightlyCard
│   │   └── Amount
│   └── TotalBookingsCard
│       └── Count
├── RevenueBreakdown
│   ├── BarChart (Daily/Weekly/Monthly)
│   ├── TimelineToggle
│   └── ComparisonYearDropdown
├── IncomeByProperty
│   ├── PropertyTable
│   │   ├── PropertyName
│   │   ├── NumBookings
│   │   ├── TotalEarnings
│   │   ├── AvgPrice
│   │   └── Occupancy%
│   └── PropertyRowExpand
├── PayoutManagement
│   ├── PendingPayouts
│   │   ├── PayoutCard
│   │   │   ├── Amount
│   │   │   ├── Payout Date
│   │   │   └── WithdrawalMethod
│   │   └── ProcessPayoutBtn
│   └── PayoutHistory
│       ├── HistoryTable
│       └── DownloadInvoiceBtn
├── CommissionBreakdown
│   ├── PieChart
│   ├── CommissionRate
│   └── FeesExplainer
└── TaxReporting
    ├── DownloadTaxDocBtn
    └── TaxEstimateWidget
```

**State Management:**
```typescript
interface EarningsState {
  dateRange: DateRange;
  currency: string;
  totalEarnings: number;
  pendingPayout: number;
  earnings: EarningRecord[];
  payoutsByProperty: PropertyEarnings[];
  pendingPayouts: Payout[];
  payoutHistory: PayoutHistory[];
  chartData: ChartDataPoint[];
  taxData: TaxReport;
  isLoading: boolean;
}

interface EarningRecord {
  id: string;
  bookingId: string;
  propertyId: string;
  amount: number;
  commission: number;
  netAmount: number;
  date: Date;
  status: 'completed' | 'pending' | 'refunded';
}
```

**User Interactions:**
- Adjust date range with picker
- Export earnings report
- View payment method details
- Download invoices
- Change currency display
- View tax documents

---

### 5.5 MESSAGES (Mesajlar)

**Component Tree:**
```
MessagesPage
├── MessagesLayout (2-column)
│   ├── ConversationsList
│   │   ├── SearchBox
│   │   ├── ConversationItem
│   │   │   ├── UserAvatar
│   │   │   ├── UserName
│   │   │   ├── LastMessage (truncated)
│   │   │   ├── TimeStamp
│   │   │   ├── UnreadBadge
│   │   │   ├── PinIcon
│   │   │   └── MoreMenu
│   │   └── EmptyState
│   │
│   └── MessageThread
│       ├── ThreadHeader
│       │   ├── UserProfile
│       │   ├── UserInfo
│       │   ├── PropertyReference
│       │   └── OptionsMenu
│       ├── MessageList
│       │   ├── MessageGroup (by date)
│       │   ├── MessageBubble
│       │   │   ├── Avatar (guest only)
│       │   │   ├── MessageContent
│       │   │   ├── Timestamp
│       │   │   ├── ReadStatus
│       │   │   └── MoreMenu
│       │   └── AutoScrollToLatest
│       ├── TypingIndicator
│       └── MessageComposer
│           ├── TextInput
│           ├── AttachmentBtn
│           ├── TemplateBtn
│           ├── SendBtn
│           └── CharCount
├── QuickTemplates
│   ├── TemplateButton[]
│   └── CreateTemplateBtn
└── SearchMessages
    ├── SearchInput
    └── SearchResults
```

**State Management:**
```typescript
interface MessagesState {
  conversations: Conversation[];
  currentConversationId: string | null;
  messages: Message[];
  filters: MessageFilters;
  searchQuery: string;
  searchResults: Message[];
  unreadCount: number;
  isLoading: boolean;
  isSending: boolean;
  error: string | null;
  typingUsers: string[];
}

interface Conversation {
  id: string;
  guestId: string;
  propertyId: string;
  guestName: string;
  guestEmail: string;
  guestAvatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isPinned: boolean;
  isArchived: boolean;
}

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: 'host' | 'guest';
  content: string;
  attachments: Attachment[];
  createdAt: Date;
  isRead: boolean;
  editedAt?: Date;
}
```

**User Interactions:**
- Real-time message updates via WebSocket
- Mark as read automatically
- Search messages across conversations
- Quick reply templates
- Archive/Pin conversations
- Attachment support
- Typing indicators
- Message editing (optional)

---

### 5.6 ANALYTICS (İstatistikler)

**Component Tree:**
```
AnalyticsPage
├── AnalyticsHeader
│   ├── PageTitle
│   ├── DateRangePicker (Comparison)
│   ├── PropertyFilter
│   └── ExportBtn
├── KeyMetrics
│   ├── MetricCard (Views)
│   │   ├── Number
│   │   ├── ChangePercent
│   │   └── Sparkline
│   ├── MetricCard (Bookings)
│   ├── MetricCard (Conversion Rate)
│   └── MetricCard (Avg Rating)
├── PerformanceCharts
│   ├── ViewsVsBookingsChart
│   │   ├── AreaChart
│   │   └── TimelineToggle
│   ├── ConversionFunnelChart
│   │   ├── FunnelChart
│   │   └── StagePercentages
│   └── OccupancyRateChart
│       ├── CalendarHeatmap
│       └── YearSelector
├── ReviewsAnalytics
│   ├── AverageRatingCard
│   ├── ReviewTrendChart
│   ├── TopReviewsCarousel
│   │   ├── ReviewCard
│   │   │   ├── Rating
│   │   │   ├── Comment
│   │   │   ├── GuestName
│   │   │   └── ResponseBtn
│   │   └── Navigation
│   └── WorseReviewsAlert
├── CompetitorAnalysis
│   ├── PriceComparison
│   │   ├── BarChart
│   │   └── PropertySelector
│   ├── RatingComparison
│   └── OccupancyComparison
└── CustomReports
    ├── ReportTemplate[]
    ├── CreateCustomReportBtn
    └── ScheduledReports
```

**State Management:**
```typescript
interface AnalyticsState {
  dateRange: DateRange;
  selectedProperties: string[];
  metrics: AnalyticsMetrics;
  chartData: ChartDataPoint[];
  reviews: Review[];
  competitorData: CompetitorMetrics[];
  customReports: CustomReport[];
  isLoading: boolean;
  error: string | null;
}

interface AnalyticsMetrics {
  totalViews: number;
  viewsChange: number;
  totalBookings: number;
  bookingsChange: number;
  conversionRate: number;
  conversionChange: number;
  avgRating: number;
  responseRate: number;
  occupancyRate: number;
}
```

**User Interactions:**
- Compare date ranges
- Filter by property
- View trend details on chart hover
- Respond to reviews
- Download custom reports
- Schedule report delivery

---

### 5.7 PROPERTY SETTINGS (Mülk Ayarları)

**Component Tree:**
```
SettingsPage
├── SettingsSidebar
│   ├── SettingsNavItem (Profile)
│   ├── SettingsNavItem (Property Details)
│   ├── SettingsNavItem (House Rules)
│   ├── SettingsNavItem (Cancellation Policy)
│   ├── SettingsNavItem (Payment)
│   ├── SettingsNavItem (Notifications)
│   ├── SettingsNavItem (Security)
│   └── SettingsNavItem (Integrations)
│
├── SettingsContent
│   ├── ProfileSettings
│   │   ├── AvatarUploader
│   │   ├── NameInput
│   │   ├── BioTextArea
│   │   ├── LocationSelect
│   │   └── SaveBtn
│   │
│   ├── PropertyDetailsSettings
│   │   ├── PropertyNameInput
│   │   ├── PropertyTypeSelect
│   │   ├── LocationSelect
│   │   ├── BedroomsInput
│   │   ├── BathroomsInput
│   │   ├── GuestsInput
│   │   ├── AmenitiesCheckboxes
│   │   └── SaveBtn
│   │
│   ├── HouseRulesSettings
│   │   ├── CheckinTimeSelect
│   │   ├── CheckoutTimeSelect
│   │   ├── PetsPolicySelect
│   │   ├── SmokingPolicySelect
│   │   ├── PartyPolicySelect
│   │   ├── CustomRulesTextArea
│   │   └── SaveBtn
│   │
│   ├── CancellationPolicySettings
│   │   ├── PolicySelect
│   │   │   ├── Flexible
│   │   │   ├── Moderate
│   │   │   ├── Strict
│   │   │   └── NonRefundable
│   │   ├── PolicyExplanation
│   │   └── SaveBtn
│   │
│   ├── PaymentSettings
│   │   ├── BankDetailsForm
│   │   │   ├── BankNameInput
│   │   │   ├── AccountNumberInput
│   │   │   ├── RoutingNumberInput
│   │   │   └── VerifyBtn
│   │   ├── PaypalConnectBtn
│   │   ├── StripeConnectBtn
│   │   └── Payout Schedule
│   │
│   ├── NotificationSettings
│   │   ├── EmailNotificationsCheckboxes
│   │   │   ├── NewBooking
│   │   │   ├── CancellationRequest
│   │   │   ├── NewMessage
│   │   │   ├── ReviewPosted
│   │   │   └── WeeklyReport
│   │   ├── PushNotificationsToggle
│   │   └── SaveBtn
│   │
│   ├── SecuritySettings
│   │   ├── PasswordChangeForm
│   │   ├── TwoFactorToggle
│   │   ├── TwoFactorSetup
│   │   ├── ActiveSessionsList
│   │   │   ├── SessionItem
│   │   │   │   ├── DeviceInfo
│   │   │   │   ├── Location
│   │   │   │   ├── LastActive
│   │   │   │   └── SignOutBtn
│   │   │   └── SignOutAllBtn
│   │   ├── LoginHistoryTable
│   │   └── BlockedUsersManagement
│   │
│   └── IntegrationsSettings
│       ├── ThirdPartyAppsList
│       │   ├── IntegrationCard
│       │   │   ├── AppIcon
│       │   │   ├── AppName
│       │   │   ├── ConnectBtn / DisconnectBtn
│       │   │   └── SettingsBtn
│       │   └── Available: Google Calendar, Airbnb, Booking.com, etc
│       └── WebhookConfiguration
│
└── DangerZone
    ├── DeleteAccountSection
    │   ├── ConfirmCheckbox
    │   ├── PasswordVerification
    │   └── DeleteBtn
    └── ArchivePropertiesSection
```

**State Management:**
```typescript
interface SettingsState {
  profile: ProfileSettings;
  propertyDetails: PropertySettings;
  houseRules: HouseRulesSettings;
  cancellationPolicy: CancellationPolicySettings;
  payment: PaymentSettings;
  notifications: NotificationSettings;
  security: SecuritySettings;
  integrations: IntegrationSettings[];
  activeTab: SettingsTab;
  isLoading: boolean;
  isSaving: boolean;
  errors: Record<string, string>;
  successMessage: string | null;
}

interface HouseRulesSettings {
  checkInTime: string;
  checkOutTime: string;
  petPolicy: 'not-allowed' | 'allowed' | 'extra-charge';
  smokingPolicy: 'not-allowed' | 'allowed';
  partyPolicy: 'not-allowed' | 'allowed';
  customRules: string;
  minStay?: number;
  maxStay?: number;
}
```

**User Interactions:**
- Tab-based navigation
- Real-time form validation
- Save on each section
- Success/error toasts
- Password verification for sensitive changes
- Integration management with OAuth flows

---

## 6. PROPERTY SUBMISSION WIZARD (Yeni Mülk Ekleme)

### 6.1 Wizard Structure

```
PropertySubmissionWizard
├── ProgressIndicator
│   ├── Step 1: Basic Info (active)
│   ├── Step 2: Location & Details
│   ├── Step 3: Amenities & Features
│   ├── Step 4: Pricing
│   ├── Step 5: Photos & Media
│   ├── Step 6: House Rules
│   ├── Step 7: T&C & Legal
│   └── Step 8: Review & Submit
│
├── StepContent
│   └── (Dynamic based on current step)
│
├── NavigationButtons
│   ├── PreviousBtn (disabled on Step 1)
│   ├── SaveDraftBtn
│   └── NextBtn / SubmitBtn (on last step)
│
└── FormStateManager
    ├── Validation
    ├── Auto-save (localStorage)
    └── Progress tracking
```

### 6.2 Step-by-Step Breakdown

#### Step 1: Basic Information (Temel Bilgiler)
```typescript
interface Step1Data {
  propertyName: string;
  propertyType: PropertyType;
  numberOfRooms: number;
  numberOfBathrooms: number;
  maximumGuests: number;
  description: string;
  highlightDescription: string; // 60 characters max
}

type PropertyType =
  | 'apartment'
  | 'house'
  | 'villa'
  | 'bungalow'
  | 'townhouse'
  | 'cottage'
  | 'studio'
  | 'penthouse'
  | 'houseboat'
  | 'other';

// Validation Rules:
// - propertyName: required, 3-100 chars, unique check
// - propertyType: required
// - numberOfRooms: required, 1-20
// - numberOfBathrooms: required, 0.5-20
// - maximumGuests: required, 1-50
// - description: required, 50-5000 chars
// - highlightDescription: optional, max 60 chars
```

#### Step 2: Location & Detailed Information (Konum & Detaylar)
```typescript
interface Step2Data {
  country: string;
  province: string;
  city: string;
  district: string;
  postalCode: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  mapZoomLevel: number;
  timezone: string;

  // Detailed features
  bedrooms: {
    queen: number;
    double: number;
    single: number;
    bunk: number;
  };

  livingAreas: {
    hasKitchen: boolean;
    kitchenType: 'full' | 'kitchenette' | 'none';
    hasLivingRoom: boolean;
    hasDiningArea: boolean;
  };
}

// Validation Rules:
// - All location fields: required
// - coordinates: validate lat/lng ranges
// - address: 5-200 chars
// - totalBedrooms: sum must match propertyType expectations
```

#### Step 3: Amenities & Features (Olanaklı Hizmetler)
```typescript
interface Step3Data {
  amenities: string[]; // From predefined list
  customAmenities: string[];
  features: {
    hasWifi: boolean;
    wifiSpeed?: string;
    hasTV: boolean;
    hasAirConditioning: boolean;
    hasHeating: boolean;
    hasParking: boolean;
    parkingType?: 'free' | 'paid' | 'valet';
    hasElevator: boolean;
    hasBalcony: boolean;
    hasTerrace: boolean;
    hasSwimmingPool: boolean;
    hasGym: boolean;
    hasJacuzzi: boolean;
    hasSauna: boolean;
    hasBBQ: boolean;
    hasWasher: boolean;
    hasDryer: boolean;
    hasDishwasher: boolean;
    hasOven: boolean;
    hasRefrigerator: boolean;
  };

  safetyFeatures: {
    hasSmokeDector: boolean;
    hasFirstAidKit: boolean;
    hasCO2Detector: boolean;
    hasSecurityCamera: boolean;
    hasLock: boolean;
    hasKey: boolean;
  };
}

// Predefined Amenities List (50+):
const AMENITIES = [
  'WiFi', 'Kitchen', 'Washer', 'Dryer', 'Air Conditioning',
  'Heating', 'TV', 'Swimming Pool', 'Hot Tub', 'Gym',
  'Parking', 'Elevator', 'Balcony', 'Garden', 'BBQ Grill',
  'Microwave', 'Oven', 'Stovetop', 'Refrigerator', 'Freezer',
  'Dishwasher', 'Dining Table', 'Crib', 'High Chair', 'Stroller',
  'Bath Essentials', 'Hangers', 'Hair Dryer', 'Iron', 'Board',
  'Coffee Maker', 'Essentials', 'Shampoo', 'Conditioner', 'Body Soap',
  // ... more
];
```

#### Step 4: Pricing (Fiyatlandırma)
```typescript
interface Step4Data {
  basePrice: number;
  currency: string;

  seasonalPrices?: {
    seasonName: string;
    startDate: Date;
    endDate: Date;
    pricePerNight: number;
  }[];

  discounts: {
    weeklyDiscount?: number; // percentage
    monthlyDiscount?: number; // percentage
    earlyBookingDiscount?: number;
  };

  fees: {
    cleaningFee?: number;
    serviceFee?: number;
    taxPercentage?: number;
    petFee?: number;
    petFeePerNight?: boolean;
  };

  availability: {
    minStay: number; // nights
    maxStay?: number;
  };
}

// Validation Rules:
// - basePrice: required, > 0, 2-4 decimal places
// - currency: required (USD, EUR, TRY, etc)
// - Discounts: 0-100 percentage
// - minStay: 1-365 days
// - All prices: must be reasonable range ($10-$10000)
```

#### Step 5: Photos & Media (Fotoğraflar & Medya)
```typescript
interface Step5Data {
  photos: PhotoUpload[];
  coverPhotoIndex: number;
  videoUrl?: string;
  virtualTourUrl?: string;
  floorPlanImage?: string;
}

interface PhotoUpload {
  id: string;
  url: string;
  localFile?: File;
  room: 'living-room' | 'bedroom' | 'bathroom' | 'kitchen' | 'other' | 'exterior';
  caption?: string;
  order: number;
  isUploaded: boolean;
  uploadProgress?: number;
  error?: string;
}

// Validation Rules:
// - Minimum 5 photos required
// - Maximum 50 photos
// - Accepted formats: JPG, PNG, WebP
// - Minimum resolution: 800x600px
// - Maximum file size: 5MB each
// - Cover photo must exist
// - Photos must be distributed across rooms
// - All photos must be property-related (AI validation)
// - No duplicate photos (perceptual hashing)

// Image Optimization:
// - Automatic resize to multiple sizes (thumbnail, preview, full)
// - Automatic compression (80-90% quality)
// - WebP conversion for modern browsers
// - EXIF data removal for privacy
```

#### Step 6: House Rules & Policies (Ev Kuralları)
```typescript
interface Step6Data {
  checkInTime: string; // HH:mm format
  checkOutTime: string;

  policies: {
    smokingAllowed: boolean;
    petsAllowed: boolean;
    petTypes?: string[];
    petFee?: number;
    eventsAllowed: boolean;
    partiesAllowed: boolean;
    commercialPhotographyAllowed: boolean;
  };

  customRules: {
    rule1?: string;
    rule2?: string;
    rule3?: string;
    rule4?: string;
    rule5?: string;
  };

  cancellationPolicy: CancellationPolicy;
}

type CancellationPolicy =
  | 'flexible' // 50% refund up to 1 day before
  | 'moderate' // 50% refund up to 3 days before
  | 'strict' // 50% refund up to 7 days before
  | 'very_strict' // 50% refund up to 30 days before
  | 'non_refundable' // No refund;

// Validation Rules:
// - checkInTime: valid 24-hour format
// - checkOutTime: after checkInTime
// - customRules: max 5, each max 200 chars
// - cancellationPolicy: required
```

#### Step 7: Terms & Conditions (Hüküm & Koşullar)
```typescript
interface Step7Data {
  agreeToTerms: boolean;
  agreeToPrivacyPolicy: boolean;
  agreeToHouseRules: boolean;
  agreeToGuestCommunicationPolicy: boolean;
  guestVettingConsent: boolean;

  legalInformation?: {
    licenseNumber?: string;
    businessRegistration?: string;
    taxId?: string;
    insuranceDetails?: string;
  };

  verification?: {
    governmentIdVerified: boolean;
    addressVerified: boolean;
    phoneVerified: boolean;
    emailVerified: boolean;
  };
}

// Terms Content (multilingual):
// - Service Terms (500+ words)
// - Privacy Policy (500+ words)
// - House Rules Confirmation
// - Guest Communication Standards
// - Payment & Refund Policy
```

#### Step 8: Review & Submit (İnceleme & Gönder)
```typescript
interface Step8Data {
  reviewedData: {
    basicInfo: Step1Data;
    location: Step2Data;
    amenities: Step3Data;
    pricing: Step4Data;
    photos: Step5Data;
    rules: Step6Data;
    legal: Step7Data;
  };

  submissionType: 'save_draft' | 'submit_for_review';
  additionalNotes?: string;
  preferredVerificationMethod?: 'email' | 'phone' | 'document';
}

// Validation Rules:
// - All checkboxes in Step 7 must be checked
// - All required fields must be filled
// - Photos must be validated
// - Pricing must be within platform guidelines
// - No spam/suspicious content detected
```

### 6.3 Global Wizard State Management

```typescript
interface PropertyWizardState {
  currentStep: number;
  totalSteps: number;

  formData: {
    step1: Step1Data;
    step2: Step2Data;
    step3: Step3Data;
    step4: Step4Data;
    step5: Step5Data;
    step6: Step6Data;
    step7: Step7Data;
    step8: Step8Data;
  };

  completedSteps: number[];
  errors: Record<number, string[]>;

  draftData: {
    savedAt: Date;
    autoSaveEnabled: boolean;
    lastSaveId: string;
  };

  uploadProgress: {
    currentFile: string;
    progress: number;
    totalFiles: number;
  };

  validationStatus: {
    step: number;
    isValid: boolean;
    errors: ValidationError[];
  };
}
```

### 6.4 Validation Rules Summary

```typescript
interface ValidationRule {
  field: string;
  rules: Rule[];
}

type Rule =
  | { type: 'required' }
  | { type: 'minLength'; value: number }
  | { type: 'maxLength'; value: number }
  | { type: 'pattern'; pattern: RegExp }
  | { type: 'min'; value: number }
  | { type: 'max'; value: number }
  | { type: 'custom'; validator: (value: any) => boolean }
  | { type: 'unique'; endpoint: string }
  | { type: 'fileType'; allowed: string[] }
  | { type: 'fileSize'; maxSizeMB: number }
  | { type: 'imageResolution'; minWidth: number; minHeight: number };

// Real-time Validation:
// - As user types (debounced 500ms)
// - On blur (immediate)
// - On step change (blocking if invalid)
// - Cross-field validation (e.g., checkOut > checkIn)
// - Server-side validation on submit
// - Async validation for uniqueness (propertyName)
```

### 6.5 Image Upload & Processing System

```typescript
interface ImageUploadConfig {
  maxFileSize: 5 * 1024 * 1024; // 5MB
  maxFiles: 50;
  minFiles: 5;
  acceptedFormats: ['image/jpeg', 'image/png', 'image/webp'];

  imageValidation: {
    minWidth: 800;
    minHeight: 600;
    maxWidth: 6000;
    maxHeight: 6000;
    aspectRatioRange: [0.75, 4]; // width/height
  };

  processing: {
    autoCompress: true;
    targetQuality: 85;
    convertToWebP: true;
    generateThumbnail: true;
    removeSensitiveData: true; // EXIF
  };
}

interface ImageProcessingPipeline {
  1. "FileUpload" - Check size, type, format
  2. "ImageValidation" - Check dimensions, aspect ratio
  3. "DuplicateDetection" - Perceptual hashing
  4. "ExifRemoval" - Remove sensitive metadata
  5. "Compression" - Optimize file size
  6. "WebPConversion" - Convert to modern format
  7. "ThumbnailGeneration" - Create multiple sizes
  8. "S3Upload" - Upload to cloud storage
  9. "CDNOptimization" - Configure CDN caching
  10. "DatabaseUpdate" - Store metadata
}

// Upload Progress:
// - Real-time progress bar per image
// - Estimated time remaining
// - Cancel upload option
// - Retry on failure
// - Bulk upload drag & drop
```

---

## 7. Component Data Flow & Architecture

### 7.1 Global State Management (Zustand)

```typescript
// stores/dashboardStore.ts
import create from 'zustand';

interface DashboardStore {
  // State
  user: User | null;
  properties: Property[];
  selectedProperty: Property | null;

  // Actions
  setUser: (user: User) => void;
  setProperties: (properties: Property[]) => void;
  selectProperty: (propertyId: string) => void;
  updateProperty: (propertyId: string, updates: Partial<Property>) => void;

  // Async thunks
  fetchProperties: () => Promise<void>;
  fetchPropertyDetails: (id: string) => Promise<void>;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  // ... implementation
}));
```

### 7.2 React Query Integration

```typescript
// hooks/useBookings.ts
import { useQuery, useMutation } from '@tanstack/react-query';

export function useBookings(filters?: BookingFilters) {
  return useQuery({
    queryKey: ['bookings', filters],
    queryFn: () => fetchBookings(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60, // 1 minute
  });
}

export function useConfirmBooking() {
  return useMutation({
    mutationFn: (bookingId: string) => confirmBooking(bookingId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}
```

### 7.3 API Service Layer

```typescript
// services/api.ts
class PropertyAPI {
  async getProperties(): Promise<Property[]> {
    const { data } = await axios.get('/api/properties');
    return data;
  }

  async getProperty(id: string): Promise<Property> {
    const { data } = await axios.get(`/api/properties/${id}`);
    return data;
  }

  async createProperty(data: PropertyCreateInput): Promise<Property> {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const response = await axios.post('/api/properties', formData);
    return response.data;
  }
}

export const propertyAPI = new PropertyAPI();
```

---

## 8. UI Component Library

### Standard Components Used:
- **Buttons**: Primary, Secondary, Danger, Ghost, Icon button
- **Input**: Text, Email, Number, Select, Multiselect, Checkbox, Radio, Toggle
- **Cards**: Basic card, Hover card, Stats card
- **Modal/Dialog**: Alert, Confirmation, Custom modal
- **Table**: Sortable, Paginated, Searchable, Expandable rows
- **Charts**: Line, Bar, Pie, Area (via Recharts)
- **Calendar**: Month view, Date picker, Range picker
- **Breadcrumbs**: Navigation breadcrumbs
- **Tabs**: Tab navigation
- **Toast/Alert**: Toast notifications, inline alerts
- **Loading**: Spinner, Skeleton, Progress bar
- **Dropdown**: Menu dropdown, Select dropdown
- **Avatar**: User avatar with fallback

---

## 9. Security & Performance

### Security Measures:
- JWT token authentication
- CSRF protection
- Rate limiting on API
- Input sanitization & XSS prevention
- File upload validation (MIME type, size, dimensions)
- Sensitive data encryption (SSN, bank details)
- Session management & timeout
- Two-factor authentication support

### Performance Optimization:
- Code splitting by route
- Image lazy loading & optimization
- CSS-in-JS with styled-components
- React Query caching strategy
- Memoization of expensive computations
- Virtual scrolling for large lists
- CDN for static assets
- Database query optimization & indexing

---

## 10. Testing Strategy

### Unit Tests:
- Component rendering tests
- Utility function tests
- Validation rules tests

### Integration Tests:
- Form submission flow
- API integration tests
- State management tests

### E2E Tests:
- Property creation wizard
- Booking management flow
- Message sending flow
- Dashboard interactions

---

## 11. Deployment & DevOps

### Infrastructure:
- Next.js on Vercel / AWS
- Prisma ORM with PostgreSQL
- Redis for caching
- S3/CloudFront for asset storage
- SendGrid for emails

### CI/CD:
- GitHub Actions for build & test
- Automated type checking
- ESLint verification
- Test coverage enforcement

---

## 12. Responsive Design Breakpoints

```
Mobile: < 640px
Tablet: 640px - 1024px
Desktop: 1024px - 1920px
Large: > 1920px
```

All components use Tailwind CSS with mobile-first approach.

---

This comprehensive specification provides a complete blueprint for building the Property Owner Dashboard system with all required components, state management, API structure, and validation rules.
