/**
 * Property Owner Dashboard - TypeScript Type Definitions
 * Comprehensive types for all dashboard entities and states
 */

// ============================================================================
// SHARED TYPES
// ============================================================================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: 'property_owner' | 'guest' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  verificationMethod?: 'email' | 'phone' | 'document';
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// ============================================================================
// PROPERTY TYPES
// ============================================================================

export type PropertyType =
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

export interface Property {
  id: string;
  ownerId: string;
  name: string;
  type: PropertyType;
  description: string;
  highlightDescription?: string;
  country: string;
  province: string;
  city: string;
  district: string;
  postalCode: string;
  address: string;
  coordinates: Coordinates;
  timezone: string;

  // Structure
  rooms: number;
  bathrooms: number;
  maxGuests: number;

  bedrooms?: {
    queen: number;
    double: number;
    single: number;
    bunk: number;
  };

  livingAreas?: {
    hasKitchen: boolean;
    kitchenType?: 'full' | 'kitchenette' | 'none';
    hasLivingRoom: boolean;
    hasDiningArea: boolean;
  };

  // Amenities
  amenities: string[];
  customAmenities?: string[];

  features: PropertyFeatures;
  safetyFeatures: SafetyFeatures;

  // Pricing & Availability
  basePrice: number;
  currency: string;
  seasonalPrices?: SeasonalPrice[];
  discounts?: PropertyDiscounts;
  fees?: PropertyFees;
  availability: Availability;

  // Media
  photos: PropertyPhoto[];
  coverPhotoIndex: number;
  videoUrl?: string;
  virtualTourUrl?: string;
  floorPlanImage?: string;

  // Rules & Policies
  checkInTime: string;
  checkOutTime: string;
  policies: PropertyPolicies;
  customRules?: string[];
  cancellationPolicy: CancellationPolicy;

  // Status & Metadata
  status: 'draft' | 'pending_review' | 'active' | 'inactive' | 'archived';
  isVerified: boolean;
  verifiedAt?: Date;
  rating: number;
  reviewCount: number;
  occupancyRate: number;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface PropertyFeatures {
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
}

export interface SafetyFeatures {
  hasSmokeDector: boolean;
  hasFirstAidKit: boolean;
  hasCO2Detector: boolean;
  hasSecurityCamera: boolean;
  hasLock: boolean;
  hasKey: boolean;
}

export interface PropertyPhoto {
  id: string;
  url: string;
  thumbnailUrl?: string;
  room: 'living-room' | 'bedroom' | 'bathroom' | 'kitchen' | 'other' | 'exterior';
  caption?: string;
  order: number;
  uploadedAt: Date;
}

export interface SeasonalPrice {
  id: string;
  seasonName: string;
  startDate: Date;
  endDate: Date;
  pricePerNight: number;
}

export interface PropertyDiscounts {
  weeklyDiscount?: number; // percentage
  monthlyDiscount?: number; // percentage
  earlyBookingDiscount?: number;
}

export interface PropertyFees {
  cleaningFee?: number;
  serviceFee?: number;
  taxPercentage?: number;
  petFee?: number;
  petFeePerNight?: boolean;
}

export interface Availability {
  minStay: number;
  maxStay?: number;
}

export interface PropertyPolicies {
  smokingAllowed: boolean;
  petsAllowed: boolean;
  petTypes?: string[];
  eventsAllowed: boolean;
  partiesAllowed: boolean;
  commercialPhotographyAllowed: boolean;
}

export type CancellationPolicy =
  | 'flexible'
  | 'moderate'
  | 'strict'
  | 'very_strict'
  | 'non_refundable';

// ============================================================================
// BOOKING TYPES
// ============================================================================

export interface Booking {
  id: string;
  propertyId: string;
  guestId: string;
  guestName: string;
  guestEmail: string;
  guestAvatar?: string;
  guestPhone?: string;
  checkIn: Date;
  checkOut: Date;
  totalNights: number;
  totalPrice: number;
  pricePerNight: number;
  status: BookingStatus;
  specialRequests?: string;
  paymentStatus: PaymentStatus;
  refundAmount?: number;
  refundStatus?: 'pending' | 'processed' | 'failed';
  createdAt: Date;
  lastModified: Date;
  confirmedAt?: Date;
  cancelledAt?: Date;
  cancellationReason?: string;
}

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'checked-in'
  | 'checked-out'
  | 'cancelled';

export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';

export interface BookingFilters {
  status?: BookingStatus;
  propertyId?: string;
  dateRange?: DateRange;
  paymentStatus?: PaymentStatus;
  searchQuery?: string;
}

export interface CalendarBooking {
  id: string;
  propertyId: string;
  checkIn: Date;
  checkOut: Date;
  guestName: string;
  status: BookingStatus;
}

// ============================================================================
// CALENDAR & PRICING TYPES
// ============================================================================

export interface DayPrice {
  date: Date;
  price: number;
  discountPercentage?: number;
  minStay?: number;
  isBlocked: boolean;
  blockReason?: string;
}

export interface MinStayRule {
  id: string;
  startDate: Date;
  endDate: Date;
  minNights: number;
}

export interface BlockedDate {
  id: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  createdAt: Date;
}

// ============================================================================
// MESSAGE TYPES
// ============================================================================

export interface Conversation {
  id: string;
  guestId: string;
  propertyId: string;
  guestName: string;
  guestEmail: string;
  guestAvatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isPinned: boolean;
  isArchived: boolean;
  participantCount: number;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: 'host' | 'guest';
  senderName: string;
  senderAvatar?: string;
  content: string;
  attachments: Attachment[];
  createdAt: Date;
  isRead: boolean;
  readAt?: Date;
  editedAt?: Date;
  repliedToMessageId?: string;
}

export interface Attachment {
  id: string;
  type: 'image' | 'document' | 'video';
  url: string;
  name: string;
  size: number;
  mimeType: string;
}

export interface MessageFilters {
  conversationId?: string;
  isRead?: boolean;
  dateRange?: DateRange;
}

// ============================================================================
// ANALYTICS TYPES
// ============================================================================

export interface AnalyticsMetrics {
  totalViews: number;
  viewsChange: number;
  viewsChangePercent: number;
  totalBookings: number;
  bookingsChange: number;
  bookingsChangePercent: number;
  conversionRate: number;
  conversionChange: number;
  avgRating: number;
  ratingChange: number;
  response_rate: number;
  occupancyRate: number;
  revenueTotal: number;
  revenueChange: number;
}

export interface ChartDataPoint {
  date: Date | string;
  value: number;
  label?: string;
  metadata?: Record<string, any>;
}

export interface Review {
  id: string;
  bookingId: string;
  propertyId: string;
  guestId: string;
  guestName: string;
  guestAvatar?: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  hostResponse?: string;
  hostResponseAt?: Date;
  isFlagged: boolean;
}

export interface EarningRecord {
  id: string;
  bookingId: string;
  propertyId: string;
  amount: number;
  commission: number;
  netAmount: number;
  date: Date;
  status: 'completed' | 'pending' | 'refunded';
  currency: string;
}

export interface PropertyEarnings {
  propertyId: string;
  propertyName: string;
  bookingCount: number;
  totalEarnings: number;
  totalCommission: number;
  avgPrice: number;
  occupancyRate: number;
}

export interface Payout {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  payoutDate: Date;
  withdrawalMethod: 'bank_transfer' | 'paypal' | 'stripe';
  createdAt: Date;
  completedAt?: Date;
}

export interface PayoutHistory {
  id: string;
  amount: number;
  currency: string;
  status: PayoutStatus;
  payoutDate: Date;
  method: string;
  transactionId?: string;
}

export type PayoutStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface TaxReport {
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
  taxableIncome: number;
  estimatedTax: number;
  period: DateRange;
}

export interface CompetitorMetrics {
  propertyName: string;
  avgPrice: number;
  avgRating: number;
  occupancyRate: number;
  responseRate: number;
}

export interface CustomReport {
  id: string;
  name: string;
  type: string;
  metrics: string[];
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    recipients: string[];
  };
  createdAt: Date;
}

// ============================================================================
// SETTINGS TYPES
// ============================================================================

export interface ProfileSettings {
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  location?: string;
  phone?: string;
  preferredLanguage: string;
  timezone: string;
}

export interface PropertySettings {
  propertyName: string;
  propertyType: PropertyType;
  location: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  amenities: string[];
}

export interface HouseRulesSettings {
  checkInTime: string;
  checkOutTime: string;
  petPolicy: 'not-allowed' | 'allowed' | 'extra-charge';
  smokingPolicy: 'not-allowed' | 'allowed';
  partyPolicy: 'not-allowed' | 'allowed';
  customRules?: string;
  minStay?: number;
  maxStay?: number;
}

export interface CancellationPolicySettings {
  policy: CancellationPolicy;
  description: string;
}

export interface PaymentSettings {
  bankName?: string;
  accountNumber?: string;
  routingNumber?: string;
  accountHolderName?: string;
  paypalEmail?: string;
  stripeAccountId?: string;
  payoutSchedule: 'daily' | 'weekly' | 'monthly';
  payoutMethod: 'bank_transfer' | 'paypal' | 'stripe';
}

export interface NotificationSettings {
  emailNotifications: {
    newBooking: boolean;
    cancellationRequest: boolean;
    newMessage: boolean;
    reviewPosted: boolean;
    weeklyReport: boolean;
  };
  pushNotifications: boolean;
  smsNotifications?: boolean;
  notificationFrequency: 'instant' | 'daily' | 'weekly';
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  twoFactorMethod?: 'email' | 'sms' | 'authenticator';
  passwordLastChanged?: Date;
  activeSessions: SessionInfo[];
  blockedUsers: BlockedUser[];
  loginHistory: LoginHistoryEntry[];
}

export interface SessionInfo {
  id: string;
  deviceName: string;
  ipAddress: string;
  location: string;
  lastActive: Date;
  createdAt: Date;
}

export interface BlockedUser {
  id: string;
  userId: string;
  userName: string;
  reason: string;
  blockedAt: Date;
}

export interface LoginHistoryEntry {
  id: string;
  ipAddress: string;
  deviceName: string;
  location: string;
  timestamp: Date;
  success: boolean;
  failureReason?: string;
}

export interface IntegrationSettings {
  id: string;
  appName: string;
  appIcon?: string;
  isConnected: boolean;
  connectedAt?: Date;
  scope?: string[];
  settings?: Record<string, any>;
}

export interface SettingsState {
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

export type SettingsTab =
  | 'profile'
  | 'property-details'
  | 'house-rules'
  | 'cancellation'
  | 'payment'
  | 'notifications'
  | 'security'
  | 'integrations';

// ============================================================================
// DASHBOARD STATE TYPES
// ============================================================================

export interface DashboardStats {
  upcomingBookings: number;
  totalRevenue: number;
  occupancyRate: number;
  averageRating: number;
}

export interface PerformanceMetrics {
  occupancyRate: number;
  avgReviewRating: number;
  responseRate: number;
  conversionRate: number;
}

export interface OverviewState {
  stats: DashboardStats;
  upcomingBookings: Booking[];
  recentReviews: Review[];
  propertyHighlights: Property[];
  chartData: ChartDataPoint[];
  performanceMetrics: PerformanceMetrics;
  isLoading: boolean;
  error: string | null;
}

export interface BookingsState {
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

export interface CalendarState {
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

export interface EarningsState {
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

export interface MessagesState {
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

export interface AnalyticsState {
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

// ============================================================================
// PROPERTY SUBMISSION WIZARD TYPES
// ============================================================================

export interface Step1Data {
  propertyName: string;
  propertyType: PropertyType;
  numberOfRooms: number;
  numberOfBathrooms: number;
  maximumGuests: number;
  description: string;
  highlightDescription?: string;
}

export interface Step2Data {
  country: string;
  province: string;
  city: string;
  district: string;
  postalCode: string;
  address: string;
  coordinates: Coordinates;
  mapZoomLevel: number;
  timezone: string;

  bedrooms: {
    queen: number;
    double: number;
    single: number;
    bunk: number;
  };

  livingAreas: {
    hasKitchen: boolean;
    kitchenType?: 'full' | 'kitchenette' | 'none';
    hasLivingRoom: boolean;
    hasDiningArea: boolean;
  };
}

export interface Step3Data {
  amenities: string[];
  customAmenities?: string[];
  features: PropertyFeatures;
  safetyFeatures: SafetyFeatures;
}

export interface Step4Data {
  basePrice: number;
  currency: string;
  seasonalPrices?: SeasonalPrice[];
  discounts?: PropertyDiscounts;
  fees?: PropertyFees;
  availability: Availability;
}

export interface Step5Data {
  photos: PhotoUpload[];
  coverPhotoIndex: number;
  videoUrl?: string;
  virtualTourUrl?: string;
  floorPlanImage?: string;
}

export interface PhotoUpload {
  id: string;
  url?: string;
  localFile?: File;
  room: 'living-room' | 'bedroom' | 'bathroom' | 'kitchen' | 'other' | 'exterior';
  caption?: string;
  order: number;
  isUploaded: boolean;
  uploadProgress?: number;
  error?: string;
}

export interface Step6Data {
  checkInTime: string;
  checkOutTime: string;
  policies: PropertyPolicies;
  customRules?: Record<string, string>;
  cancellationPolicy: CancellationPolicy;
}

export interface Step7Data {
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

export interface Step8Data {
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

export interface PropertyWizardState {
  currentStep: number;
  totalSteps: number;

  formData: {
    step1: Partial<Step1Data>;
    step2: Partial<Step2Data>;
    step3: Partial<Step3Data>;
    step4: Partial<Step4Data>;
    step5: Partial<Step5Data>;
    step6: Partial<Step6Data>;
    step7: Partial<Step7Data>;
    step8: Partial<Step8Data>;
  };

  completedSteps: number[];
  errors: Record<number, ValidationError[]>;

  draftData: {
    savedAt: Date | null;
    autoSaveEnabled: boolean;
    lastSaveId?: string;
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

  isSubmitting: boolean;
  submitError?: string;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationRule {
  field: string;
  rules: Rule[];
}

export type Rule =
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

// ============================================================================
// UI STATE TYPES
// ============================================================================

export interface UIState {
  modals: Record<string, boolean>;
  toasts: Toast[];
  loading: Record<string, boolean>;
  errors: Record<string, string>;
  notifications: Notification[];
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface Notification {
  id: string;
  type: 'booking' | 'message' | 'review' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
  meta?: {
    pagination?: PaginationState;
    timestamp: Date;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationState;
  meta: {
    timestamp: Date;
  };
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type SortOption = {
  field: string;
  direction: 'asc' | 'desc';
};

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface ImageUploadConfig {
  maxFileSize: number; // bytes
  maxFiles: number;
  minFiles: number;
  acceptedFormats: string[];
  imageValidation: {
    minWidth: number;
    minHeight: number;
    maxWidth: number;
    maxHeight: number;
    aspectRatioRange: [number, number];
  };
  processing: {
    autoCompress: boolean;
    targetQuality: number;
    convertToWebP: boolean;
    generateThumbnail: boolean;
    removeSensitiveData: boolean;
  };
}

// ============================================================================
// EXPORT ALL CONSTANTS
// ============================================================================

export const AMENITIES_LIST = [
  'WiFi',
  'Kitchen',
  'Washer',
  'Dryer',
  'Air Conditioning',
  'Heating',
  'TV',
  'Swimming Pool',
  'Hot Tub',
  'Gym',
  'Parking',
  'Elevator',
  'Balcony',
  'Garden',
  'BBQ Grill',
  'Microwave',
  'Oven',
  'Stovetop',
  'Refrigerator',
  'Freezer',
  'Dishwasher',
  'Dining Table',
  'Crib',
  'High Chair',
  'Stroller',
  'Bath Essentials',
  'Hangers',
  'Hair Dryer',
  'Iron',
  'Board',
  'Coffee Maker',
  'Essentials',
  'Shampoo',
  'Conditioner',
  'Body Soap',
] as const;

export const CANCELLATION_POLICIES = {
  flexible: 'Flexible - 50% refund up to 1 day before',
  moderate: 'Moderate - 50% refund up to 3 days before',
  strict: 'Strict - 50% refund up to 7 days before',
  very_strict: 'Very Strict - 50% refund up to 30 days before',
  non_refundable: 'Non-refundable',
} as const;

export const PROPERTY_TYPES: PropertyType[] = [
  'apartment',
  'house',
  'villa',
  'bungalow',
  'townhouse',
  'cottage',
  'studio',
  'penthouse',
  'houseboat',
  'other',
];
