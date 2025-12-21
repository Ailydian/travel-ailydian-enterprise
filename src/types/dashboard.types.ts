// Property Owner Dashboard - TypeScript Type Definitions
// Complete type system for Airbnb/Booking.com-like property management dashboard

// ==================== USER & AUTHENTICATION ====================

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'host' | 'guest' | 'admin';
  emailVerified: boolean;
  phoneVerified: boolean;
  governmentIdVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthToken {
  token: string;
  refreshToken?: string;
  expiresAt: Date;
}

// ==================== PROPERTY ====================

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

export type PropertyStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'archived';

export interface Property {
  id: string;
  ownerId: string;
  name: string;
  type: PropertyType;
  description: string;
  highlightDescription?: string;
  status: PropertyStatus;

  // Location
  location: {
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
    timezone: string;
  };

  // Capacity
  numberOfRooms: number;
  numberOfBathrooms: number;
  maximumGuests: number;

  // Bedroom details
  bedrooms: {
    queen: number;
    double: number;
    single: number;
    bunk: number;
  };

  // Living areas
  livingAreas: {
    hasKitchen: boolean;
    kitchenType: 'full' | 'kitchenette' | 'none';
    hasLivingRoom: boolean;
    hasDiningArea: boolean;
  };

  // Amenities
  amenities: string[];
  customAmenities: string[];

  features: PropertyFeatures;
  safetyFeatures: SafetyFeatures;

  // Pricing
  pricing: PropertyPricing;

  // House Rules
  houseRules: HouseRules;

  // Media
  photos: PropertyPhoto[];
  coverPhotoIndex: number;
  videoUrl?: string;
  virtualTourUrl?: string;
  floorPlanImage?: string;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;

  // Stats
  rating?: number;
  reviewCount: number;
  bookingCount: number;
  viewCount: number;
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
  hasSmokeDetector: boolean;
  hasFirstAidKit: boolean;
  hasCO2Detector: boolean;
  hasSecurityCamera: boolean;
  hasLock: boolean;
  hasKey: boolean;
}

export interface PropertyPricing {
  basePrice: number;
  currency: string;
  seasonalPrices?: SeasonalPrice[];
  discounts: PriceDiscounts;
  fees: PropertyFees;
  availability: AvailabilityRules;
}

export interface SeasonalPrice {
  seasonName: string;
  startDate: Date;
  endDate: Date;
  pricePerNight: number;
}

export interface PriceDiscounts {
  weeklyDiscount?: number;
  monthlyDiscount?: number;
  earlyBookingDiscount?: number;
}

export interface PropertyFees {
  cleaningFee?: number;
  serviceFee?: number;
  taxPercentage?: number;
  petFee?: number;
  petFeePerNight?: boolean;
}

export interface AvailabilityRules {
  minStay: number;
  maxStay?: number;
}

export interface HouseRules {
  checkInTime: string;
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
  customRules?: string[];
  cancellationPolicy: CancellationPolicy;
}

export type CancellationPolicy =
  | 'flexible'
  | 'moderate'
  | 'strict'
  | 'very_strict'
  | 'non_refundable';

export interface PropertyPhoto {
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

// ==================== BOOKING ====================

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'checked-in'
  | 'checked-out'
  | 'cancelled'
  | 'rejected';

export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'partially_refunded';

export interface Booking {
  id: string;
  propertyId: string;
  propertyName: string;
  guestId: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  guestAvatar?: string;

  checkIn: Date;
  checkOut: Date;
  totalNights: number;

  guests: {
    adults: number;
    children: number;
    infants: number;
  };

  pricing: {
    pricePerNight: number;
    totalNights: number;
    subtotal: number;
    cleaningFee: number;
    serviceFee: number;
    taxes: number;
    discount: number;
    totalPrice: number;
  };

  status: BookingStatus;
  paymentStatus: PaymentStatus;

  specialRequests?: string;
  cancellationReason?: string;

  createdAt: Date;
  updatedAt: Date;
  confirmedAt?: Date;
  cancelledAt?: Date;

  hostNotes?: string;
}

export interface BookingFilters {
  status?: BookingStatus[];
  propertyId?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchQuery?: string;
}

export type SortOption = {
  field: 'checkIn' | 'checkOut' | 'totalPrice' | 'createdAt' | 'guestName';
  direction: 'asc' | 'desc';
};

export interface CalendarBooking {
  id: string;
  propertyId: string;
  guestName: string;
  checkIn: Date;
  checkOut: Date;
  status: BookingStatus;
}

export interface DayPrice {
  date: Date;
  price: number;
  discountPercentage?: number;
  minStay?: number;
  isBlocked: boolean;
  bookingId?: string;
}

export interface BlockedDate {
  id: string;
  propertyId: string;
  startDate: Date;
  endDate: Date;
  reason: string;
}

export interface MinStayRule {
  id: string;
  propertyId: string;
  startDate: Date;
  endDate: Date;
  minStay: number;
}

// ==================== MESSAGES ====================

export interface Conversation {
  id: string;
  propertyId: string;
  propertyName: string;
  guestId: string;
  guestName: string;
  guestEmail: string;
  guestAvatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isPinned: boolean;
  isArchived: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: 'host' | 'guest';
  senderName: string;
  content: string;
  attachments?: Attachment[];
  createdAt: Date;
  isRead: boolean;
  editedAt?: Date;
}

export interface Attachment {
  id: string;
  type: 'image' | 'document' | 'video';
  url: string;
  filename: string;
  size: number;
}

export interface MessageFilters {
  conversationId?: string;
  searchQuery?: string;
  unreadOnly?: boolean;
}

// ==================== EARNINGS & ANALYTICS ====================

export interface EarningRecord {
  id: string;
  bookingId: string;
  propertyId: string;
  propertyName: string;
  guestName: string;
  amount: number;
  commission: number;
  netAmount: number;
  date: Date;
  status: 'completed' | 'pending' | 'refunded';
}

export interface PropertyEarnings {
  propertyId: string;
  propertyName: string;
  totalBookings: number;
  totalEarnings: number;
  avgPrice: number;
  occupancyRate: number;
}

export interface Payout {
  id: string;
  amount: number;
  currency: string;
  payoutDate: Date;
  withdrawalMethod: 'bank' | 'paypal' | 'stripe';
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

export interface PayoutHistory extends Payout {
  transactionId: string;
  completedAt?: Date;
  invoiceUrl?: string;
}

export interface TaxReport {
  year: number;
  totalEarnings: number;
  totalCommission: number;
  totalTaxes: number;
  netIncome: number;
  downloadUrl?: string;
}

export interface AnalyticsMetrics {
  totalViews: number;
  viewsChange: number;
  totalBookings: number;
  bookingsChange: number;
  conversionRate: number;
  conversionChange: number;
  avgRating: number;
  ratingChange: number;
  responseRate: number;
  occupancyRate: number;
  totalRevenue: number;
  revenueChange: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface CompetitorMetrics {
  propertyId: string;
  propertyName: string;
  avgPrice: number;
  rating: number;
  occupancyRate: number;
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
  categories: {
    cleanliness: number;
    communication: number;
    checkIn: number;
    accuracy: number;
    location: number;
    value: number;
  };
  response?: string;
  respondedAt?: Date;
  createdAt: Date;
}

export interface CustomReport {
  id: string;
  name: string;
  type: 'earnings' | 'bookings' | 'reviews' | 'custom';
  dateRange: DateRange;
  filters: Record<string, any>;
  schedule?: 'daily' | 'weekly' | 'monthly';
  createdAt: Date;
}

// ==================== SETTINGS ====================

export interface ProfileSettings {
  avatar?: string;
  name: string;
  bio?: string;
  location: string;
  languages: string[];
  phoneNumber?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
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
  customRules: string;
  minStay?: number;
  maxStay?: number;
}

export interface CancellationPolicySettings {
  policy: CancellationPolicy;
  customTerms?: string;
}

export interface PaymentSettings {
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    routingNumber: string;
    accountHolderName: string;
    verified: boolean;
  };
  paypalConnected: boolean;
  paypalEmail?: string;
  stripeConnected: boolean;
  stripeAccountId?: string;
  payoutSchedule: 'weekly' | 'biweekly' | 'monthly';
}

export interface NotificationSettings {
  email: {
    newBooking: boolean;
    cancellationRequest: boolean;
    newMessage: boolean;
    reviewPosted: boolean;
    weeklyReport: boolean;
    monthlyReport: boolean;
  };
  push: {
    enabled: boolean;
    newBooking: boolean;
    newMessage: boolean;
  };
  sms: {
    enabled: boolean;
    urgentOnly: boolean;
  };
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  twoFactorMethod?: 'sms' | 'authenticator';
  activeSessions: ActiveSession[];
  loginHistory: LoginHistory[];
}

export interface ActiveSession {
  id: string;
  deviceInfo: string;
  location: string;
  ipAddress: string;
  lastActive: Date;
  isCurrent: boolean;
}

export interface LoginHistory {
  id: string;
  deviceInfo: string;
  location: string;
  ipAddress: string;
  timestamp: Date;
  success: boolean;
}

export interface IntegrationSettings {
  id: string;
  name: string;
  type: 'calendar' | 'booking' | 'payment' | 'messaging';
  connected: boolean;
  connectedAt?: Date;
  settings?: Record<string, any>;
}

// ==================== PROPERTY SUBMISSION WIZARD ====================

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
  coordinates: {
    latitude: number;
    longitude: number;
  };
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
    kitchenType: 'full' | 'kitchenette' | 'none';
    hasLivingRoom: boolean;
    hasDiningArea: boolean;
  };
}

export interface Step3Data {
  amenities: string[];
  customAmenities: string[];
  features: PropertyFeatures;
  safetyFeatures: SafetyFeatures;
}

export interface Step4Data {
  basePrice: number;
  currency: string;
  seasonalPrices?: SeasonalPrice[];
  discounts: PriceDiscounts;
  fees: PropertyFees;
  availability: AvailabilityRules;
}

export interface Step5Data {
  photos: PropertyPhoto[];
  coverPhotoIndex: number;
  videoUrl?: string;
  virtualTourUrl?: string;
  floorPlanImage?: string;
}

export interface Step6Data {
  checkInTime: string;
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
  customRules?: string[];
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
  errors: Record<number, string[]>;
  draftData?: {
    savedAt: Date;
    autoSaveEnabled: boolean;
    lastSaveId: string;
  };
  uploadProgress?: {
    currentFile: string;
    progress: number;
    totalFiles: number;
  };
  validationStatus?: {
    step: number;
    isValid: boolean;
    errors: ValidationError[];
  };
}

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

// ==================== UI STATE ====================

export interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  occupancyRate: number;
  avgRating: number;
  pendingBookings: number;
  unreadMessages: number;
}

export interface RevenueChartData {
  date: string;
  revenue: number;
  bookings: number;
}

export interface PerformanceMetrics {
  occupancyGauge: number;
  avgReviewRating: number;
  responseRate: number;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface DateRange {
  start: Date;
  end: Date;
}

export type SettingsTab =
  | 'profile'
  | 'property'
  | 'house-rules'
  | 'cancellation'
  | 'payment'
  | 'notifications'
  | 'security'
  | 'integrations';

// ==================== API RESPONSES ====================

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// ==================== FORM TYPES ====================

export interface PropertyCreateInput {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data;
  step5: Step5Data;
  step6: Step6Data;
  step7: Step7Data;
  step8: Step8Data;
}

export interface PropertyUpdateInput extends Partial<PropertyCreateInput> {
  id: string;
}

// ==================== EXPORTS ====================

export type {
  // Re-export all types for convenience
};
