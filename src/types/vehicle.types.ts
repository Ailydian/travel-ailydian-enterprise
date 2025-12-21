// Vehicle Rental System - TypeScript Type Definitions
// Complete type system for Turo/Getaround-like vehicle rental management dashboard
// Turkish: Araç Kiralama Sistemi - Kapsamlı Tip Tanımlamaları

// ==================== USER & AUTHENTICATION ====================

/**
 * Vehicle Owner (Fleet Manager) - Araç Sahibi
 * Represents a user who owns and rents out vehicles
 */
export interface VehicleOwner {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'owner' | 'renter' | 'admin';
  emailVerified: boolean;
  phoneVerified: boolean;
  driverLicenseVerified: boolean;
  governmentIdVerified: boolean;
  backgroundCheckCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthToken {
  token: string;
  refreshToken?: string;
  expiresAt: Date;
}

// ==================== VEHICLE ====================

/**
 * Vehicle Types - Araç Kategorileri
 * Comprehensive list of vehicle categories based on Turo/Getaround classification
 */
export type VehicleType =
  | 'economy-sedan'      // Ekonomik Sedan
  | 'comfort-sedan'      // Konforlu Sedan
  | 'premium-sedan'      // Premium Sedan
  | 'luxury-sedan'       // Lüks Sedan
  | 'economy-suv'        // Ekonomik SUV
  | 'premium-suv'        // Premium SUV
  | 'minivan'            // Minivan
  | 'passenger-van'      // Yolcu Minibüsü
  | 'commercial-van'     // Ticari Van
  | 'pickup-truck'       // Pikap
  | 'convertible'        // Cabrio
  | 'sports-car'         // Spor Araba
  | 'electric-vehicle'   // Elektrikli Araç
  | 'hybrid'             // Hibrit
  | 'other';             // Diğer

/**
 * Vehicle Status - Araç Durumu
 */
export type VehicleStatus = 'available' | 'rented' | 'maintenance' | 'inactive' | 'pending_approval' | 'rejected';

/**
 * Transmission Type - Vites Türü
 */
export type TransmissionType = 'manual' | 'automatic' | 'semi-automatic';

/**
 * Fuel Type - Yakıt Türü
 */
export type FuelType = 'petrol' | 'diesel' | 'electric' | 'hybrid' | 'lpg' | 'cng';

/**
 * Vehicle Entity - Araç
 * Complete vehicle information with all details required for rental listing
 */
export interface Vehicle {
  id: string;
  ownerId: string;

  // Basic Information - Temel Bilgiler
  brand: string;              // Marka (e.g., Toyota, BMW, Mercedes)
  model: string;              // Model (e.g., Camry, 3 Series, C-Class)
  year: number;               // Üretim Yılı
  licensePlate: string;       // Plaka
  vin?: string;               // Vehicle Identification Number - Şasi Numarası
  color: string;              // Renk

  // Category & Specifications - Kategori ve Özellikler
  vehicleType: VehicleType;
  transmission: TransmissionType;
  fuelType: FuelType;

  // Capacity - Kapasite
  seats: number;              // Koltuk Sayısı
  doors: number;              // Kapı Sayısı
  luggage: number;            // Bagaj Kapasitesi (number of large suitcases)

  // Technical Specifications - Teknik Özellikler
  engineSize?: string;        // Motor Hacmi (e.g., "2.0L", "1.6L")
  horsePower?: number;        // Beygir Gücü
  mileage: number;            // Kilometre
  tankCapacity?: number;      // Depo Kapasitesi (liters)

  // Features & Amenities - Özellikler ve Donanımlar
  features: VehicleFeatures;

  // Status - Durum
  status: VehicleStatus;
  isVerified: boolean;        // Platform tarafından doğrulandı mı

  // Location & Availability - Konum ve Müsaitlik
  location: VehicleLocation;
  availability: VehicleAvailability;

  // Pricing - Fiyatlandırma
  pricing: VehiclePricing;

  // Insurance & Legal - Sigorta ve Yasal
  insurance: InsuranceDetails;
  documents: VehicleDocuments;

  // Media - Medya
  photos: VehiclePhoto[];
  coverPhotoIndex: number;
  videoUrl?: string;

  // Description - Açıklama
  description: string;
  highlightDescription?: string;
  ownerNotes?: string;

  // Rental Rules - Kiralama Kuralları
  rentalRules: RentalRules;

  // Metadata - Meta Veriler
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  lastMaintenanceDate?: Date;
  nextMaintenanceDate?: Date;

  // Stats - İstatistikler
  rating?: number;
  reviewCount: number;
  totalBookings: number;
  totalRevenue: number;
  viewCount: number;
  favoriteCount: number;
}

/**
 * Vehicle Features - Araç Özellikleri
 * Comprehensive list of vehicle features and amenities
 */
export interface VehicleFeatures {
  // Climate Control - Klima ve Isıtma
  hasAirConditioning: boolean;
  hasClimateControl: boolean;        // Otomatik klima
  hasHeatedSeats: boolean;
  hasCooledSeats: boolean;

  // Navigation & Entertainment - Navigasyon ve Eğlence
  hasGPS: boolean;
  hasBluetoothAudio: boolean;
  hasAppleCarPlay: boolean;
  hasAndroidAuto: boolean;
  hasUSBCharging: boolean;
  hasWirelessCharging: boolean;
  hasPremiumSound: boolean;

  // Safety Features - Güvenlik Özellikleri
  hasABS: boolean;                   // Anti-lock Braking System
  hasESP: boolean;                   // Electronic Stability Program
  hasAirbags: number;                // Hava Yastığı Sayısı
  hasRearCamera: boolean;
  hasParkingSensors: boolean;
  hasBlindSpotMonitor: boolean;
  hasLaneDepartureWarning: boolean;
  hasAdaptiveCruiseControl: boolean;
  hasCollisionWarning: boolean;
  hasAutomaticEmergencyBraking: boolean;

  // Convenience - Konfor
  hasCruiseControl: boolean;
  hasKeylessEntry: boolean;
  hasPushStartButton: boolean;
  hasPowerWindows: boolean;
  hasPowerLocks: boolean;
  hasSunroof: boolean;
  hasPanoramicRoof: boolean;
  hasLeatherSeats: boolean;
  hasPowerSeats: boolean;
  hasMemorySeats: boolean;

  // Assistance - Yardımcı Sistemler
  hasRoofRack: boolean;
  hasTowHitch: boolean;
  hasBikeRack: boolean;
  hasSkiRack: boolean;
  hasCargoNet: boolean;

  // Child Safety - Çocuk Güvenliği
  hasChildSeatAnchors: boolean;      // ISOFIX
  childSeatsAvailable: number;       // Mevcut çocuk koltuğu sayısı

  // Winter Equipment - Kış Donanımı
  hasWinterTires: boolean;
  hasAllSeasonTires: boolean;
  hasSnowChains: boolean;

  // Additional - Ek Özellikler
  hasDashcam: boolean;
  hasToolkit: boolean;
  hasFirstAidKit: boolean;
  hasFireExtinguisher: boolean;
  hasEmergencyKit: boolean;
  hasPetsAllowed: boolean;
  hasSmokingAllowed: boolean;
}

/**
 * Vehicle Location - Araç Konumu
 */
export interface VehicleLocation {
  country: string;
  province: string;          // İl
  city: string;              // İlçe
  district: string;          // Mahalle
  postalCode: string;
  address: string;           // Detaylı adres (opsiyonel, güvenlik için gizlenebilir)
  coordinates: {
    latitude: number;
    longitude: number;
  };
  timezone: string;

  // Pickup & Dropoff Options - Teslim Alma ve Bırakma Seçenekleri
  airportPickupAvailable: boolean;
  airportDropoffAvailable: boolean;
  airportName?: string;
  airportCode?: string;       // IATA kodu (e.g., IST, SAW, ESB)
  airportFee?: number;

  homeDeliveryAvailable: boolean;
  homeDeliveryFee?: number;
  homeDeliveryRadius?: number; // km cinsinden

  meetupLocations?: MeetupLocation[];
}

/**
 * Meetup Location - Buluşma Noktası
 */
export interface MeetupLocation {
  id: string;
  name: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  instructions?: string;
  isDefault: boolean;
}

/**
 * Vehicle Availability - Araç Müsaitlik
 */
export interface VehicleAvailability {
  minRentalDays: number;        // Minimum kiralama süresi (gün)
  maxRentalDays?: number;       // Maximum kiralama süresi (gün)
  advanceNoticeHours: number;   // Kaç saat önceden rezervasyon yapılmalı

  // Instant Booking - Anında Rezervasyon
  instantBookingEnabled: boolean;
  requiresApproval: boolean;    // Onay gerektiriyor mu

  // Calendar - Takvim
  blockedDates?: BlockedDate[];
  availableTimeSlots?: AvailableTimeSlot[];
}

/**
 * Available Time Slot - Müsait Zaman Dilimi
 */
export interface AvailableTimeSlot {
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday
  startTime: string;            // HH:mm format
  endTime: string;              // HH:mm format
}

/**
 * Vehicle Pricing - Araç Fiyatlandırma
 */
export interface VehiclePricing {
  dailyRate: number;            // Günlük fiyat
  hourlyRate?: number;          // Saatlik fiyat (opsiyonel)
  currency: string;             // Para birimi (e.g., USD, EUR, TRY)

  // Discounts - İndirimler
  discounts: PriceDiscounts;

  // Distance & Fuel - Mesafe ve Yakıt
  mileageLimit: MileageLimit;
  fuelPolicy: FuelPolicy;

  // Extra Fees - Ekstra Ücretler
  fees: VehicleFees;

  // Deposits - Depozito
  securityDeposit: number;      // Güvenlik deposu
  depositRefundDays: number;    // Kaç gün sonra iade edilir

  // Seasonal Pricing - Sezonluk Fiyatlandırma
  seasonalPrices?: SeasonalPrice[];
}

/**
 * Price Discounts - Fiyat İndirimleri
 */
export interface PriceDiscounts {
  weeklyDiscount?: number;      // 7+ gün için indirim (%)
  monthlyDiscount?: number;     // 30+ gün için indirim (%)
  earlyBookingDiscount?: number; // Erken rezervasyon indirimi (%)
  lastMinuteDiscount?: number;  // Son dakika indirimi (%)
}

/**
 * Mileage Limit - Kilometre Limiti
 */
export interface MileageLimit {
  type: 'unlimited' | 'limited';
  dailyLimit?: number;          // Günlük limit (km)
  weeklyLimit?: number;         // Haftalık limit (km)
  monthlyLimit?: number;        // Aylık limit (km)
  extraMileageFee?: number;     // Fazla km ücreti (per km)
}

/**
 * Fuel Policy - Yakıt Politikası
 */
export type FuelPolicy =
  | 'full-to-full'              // Dolu alındı, dolu iade edilecek
  | 'same-to-same'              // Aynı seviyede iade
  | 'pre-purchase'              // Önceden satın alınmış
  | 'refund';                   // İade edilebilir

/**
 * Vehicle Fees - Araç Ücretleri
 */
export interface VehicleFees {
  cleaningFee?: number;
  serviceFee?: number;
  taxPercentage?: number;

  // Additional Driver - Ek Sürücü
  additionalDriverFee?: number;
  additionalDriverFeePerDay?: boolean;

  // Young Driver Fee - Genç Sürücü Ücreti
  youngDriverFee?: number;      // 21-25 yaş arası için
  youngDriverAge?: number;      // Minimum yaş

  // Equipment Fees - Ekipman Ücretleri
  gpsRentalFee?: number;
  childSeatFee?: number;
  boosterSeatFee?: number;
  snowChainsFee?: number;
  additionalInsuranceFee?: number;

  // Late Return Fee - Geç İade Ücreti
  lateReturnFeePerHour?: number;

  // Cancellation Fee - İptal Ücreti
  cancellationFee?: number;
  cancellationFeePercentage?: number;
}

/**
 * Seasonal Price - Mevsimsel Fiyat
 */
export interface SeasonalPrice {
  seasonName: string;
  startDate: Date;
  endDate: Date;
  dailyRate: number;
  minimumRentalDays?: number;
}

/**
 * Insurance Details - Sigorta Detayları
 */
export interface InsuranceDetails {
  // Basic Insurance - Temel Sigorta
  hasInsurance: boolean;
  insuranceProvider: string;
  policyNumber: string;
  expiryDate: Date;
  coverageType: 'comprehensive' | 'third-party' | 'collision';

  // Coverage Amounts - Teminat Miktarları
  liabilityCoverage: number;
  collisionDamageCoverage: number;
  theftCoverage: number;
  personalInjuryCoverage: number;

  // Additional Coverage - Ek Teminatlar
  hasRoadsideAssistance: boolean;
  hasReplacementVehicle: boolean;

  // Documents - Belgeler
  insuranceCertificateUrl?: string;

  // Rental Insurance Options - Kiralama Sigorta Seçenekleri
  rentalInsuranceOptions?: RentalInsuranceOption[];
}

/**
 * Rental Insurance Option - Kiralama Sigorta Seçeneği
 */
export interface RentalInsuranceOption {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  coverage: {
    collisionDamageWaiver: boolean;      // Çarpışma Hasarı Muafiyeti
    theftProtection: boolean;            // Hırsızlık Koruması
    liabilityProtection: boolean;        // Sorumluluk Koruması
    personalAccidentInsurance: boolean;  // Kişisel Kaza Sigortası
    tiresAndWindscreen: boolean;         // Lastik ve Cam
  };
  deductible: number;                    // Muafiyet tutarı
  isRecommended: boolean;
}

/**
 * Vehicle Documents - Araç Belgeleri
 */
export interface VehicleDocuments {
  // Registration - Ruhsat
  registrationDocument: string;         // URL
  registrationNumber: string;
  registrationExpiryDate: Date;
  registeredOwner: string;

  // Inspection - Muayene
  inspectionCertificateUrl?: string;
  lastInspectionDate?: Date;
  nextInspectionDate?: Date;

  // Emission Test - Egzoz Emisyon Testi
  emissionTestUrl?: string;
  emissionTestDate?: Date;
  emissionTestExpiryDate?: Date;

  // Owner Documents - Malik Belgeleri
  ownerIdentificationUrl?: string;
  driverLicenseUrl?: string;

  // Additional - Ek Belgeler
  maintenanceRecords?: string[];        // URLs to maintenance records
  accidentReports?: string[];           // URLs to accident reports
}

/**
 * Rental Rules - Kiralama Kuralları
 */
export interface RentalRules {
  // Driver Requirements - Sürücü Gereksinimleri
  minimumAge: number;               // Minimum yaş (genellikle 21)
  minimumDrivingExperience: number; // Minimum sürüş deneyimi (yıl)
  requiresInternationalLicense: boolean;

  // Policies - Politikalar
  policies: {
    smokingAllowed: boolean;
    petsAllowed: boolean;
    petTypes?: string[];
    petFee?: number;
    crossBorderTravelAllowed: boolean;
    allowedCountries?: string[];
    offRoadAllowed: boolean;
    rideSharingAllowed: boolean;
    commercialUseAllowed: boolean;
  };

  // Pickup & Return - Teslim Alma ve İade
  pickupInstructions?: string;
  returnInstructions?: string;
  lateReturnPolicy: string;
  earlyReturnPolicy: string;

  // Cancellation Policy - İptal Politikası
  cancellationPolicy: CancellationPolicy;

  // Custom Rules - Özel Kurallar
  customRules?: string[];

  // Damage Policy - Hasar Politikası
  damageReportingRequired: boolean;
  preRentalInspectionRequired: boolean;
  postRentalInspectionRequired: boolean;
}

/**
 * Cancellation Policy - İptal Politikası
 */
export type CancellationPolicy =
  | 'flexible'                  // Esnek: 24 saat öncesine kadar ücretsiz iptal
  | 'moderate'                  // Orta: 48 saat öncesine kadar ücretsiz iptal
  | 'strict'                    // Katı: 7 gün öncesine kadar %50 iade
  | 'very_strict'               // Çok Katı: 14 gün öncesine kadar %50 iade
  | 'non_refundable';           // İade Edilemez

/**
 * Vehicle Photo - Araç Fotoğrafı
 */
export interface VehiclePhoto {
  id: string;
  url: string;
  localFile?: File;
  category: 'exterior-front' | 'exterior-rear' | 'exterior-left' | 'exterior-right' |
            'interior-front' | 'interior-rear' | 'interior-dashboard' |
            'trunk' | 'engine' | 'wheels' | 'damage' | 'other';
  caption?: string;
  order: number;
  isUploaded: boolean;
  uploadProgress?: number;
  error?: string;
  takenAt?: Date;
  mileageAtPhoto?: number;      // Fotoğraf çekildiğinde kilometre
}

// ==================== RENTAL BOOKING ====================

/**
 * Rental Booking Status - Kiralama Rezervasyon Durumu
 */
export type RentalBookingStatus =
  | 'pending'                   // Onay Bekliyor
  | 'confirmed'                 // Onaylandı
  | 'picked-up'                 // Teslim Alındı
  | 'in-progress'               // Kullanımda
  | 'returned'                  // İade Edildi
  | 'completed'                 // Tamamlandı
  | 'cancelled'                 // İptal Edildi
  | 'rejected';                 // Reddedildi

/**
 * Payment Status - Ödeme Durumu
 */
export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'partially_refunded' | 'disputed';

/**
 * Rental Booking - Kiralama Rezervasyonu
 * Complete rental booking with all details
 */
export interface RentalBooking {
  id: string;
  vehicleId: string;
  vehicleName: string;          // e.g., "2022 Toyota Camry"
  vehiclePhoto: string;
  ownerId: string;
  ownerName: string;

  // Renter Information - Kiralayan Bilgileri
  renterId: string;
  renterName: string;
  renterEmail: string;
  renterPhone?: string;
  renterAvatar?: string;
  renterAge: number;
  drivingLicenseNumber: string;
  drivingLicenseIssueDate: Date;
  drivingLicenseExpiryDate: Date;

  // Additional Drivers - Ek Sürücüler
  additionalDrivers?: AdditionalDriver[];

  // Rental Period - Kiralama Dönemi
  pickupDate: Date;
  returnDate: Date;
  totalDays: number;
  totalHours?: number;          // For hourly rentals

  // Location - Konum
  pickupLocation: RentalLocation;
  returnLocation: RentalLocation;
  isDifferentReturnLocation: boolean;

  // Pricing Breakdown - Fiyat Detayı
  pricing: RentalPricing;

  // Insurance - Sigorta
  selectedInsurance?: RentalInsuranceOption;

  // Extra Services - Ekstra Hizmetler
  extraServices: ExtraService[];

  // Fuel - Yakıt
  fuelPolicy: FuelPolicy;
  fuelLevelAtPickup?: number;   // 0-100 (%)
  fuelLevelAtReturn?: number;   // 0-100 (%)

  // Mileage - Kilometre
  mileageAtPickup?: number;
  mileageAtReturn?: number;
  totalMileageDriven?: number;

  // Damage Inspection - Hasar Kontrolü
  preRentalInspection?: DamageInspection;
  postRentalInspection?: DamageInspection;

  // Status - Durum
  status: RentalBookingStatus;
  paymentStatus: PaymentStatus;

  // Notes & Requests - Notlar ve Talepler
  renterNotes?: string;
  ownerNotes?: string;
  specialRequests?: string;

  // Cancellation - İptal
  cancellationReason?: string;
  cancelledBy?: 'renter' | 'owner' | 'admin';

  // Timestamps - Zaman Damgaları
  createdAt: Date;
  updatedAt: Date;
  confirmedAt?: Date;
  pickedUpAt?: Date;
  returnedAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;

  // Communication - İletişim
  conversationId?: string;
  unreadMessagesCount?: number;
}

/**
 * Additional Driver - Ek Sürücü
 */
export interface AdditionalDriver {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  drivingLicenseNumber: string;
  drivingLicenseIssueDate: Date;
  drivingLicenseExpiryDate: Date;
  age: number;
  fee: number;
}

/**
 * Rental Location - Kiralama Konumu
 */
export interface RentalLocation {
  type: 'owner-address' | 'airport' | 'meetup-point' | 'home-delivery';
  address: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  airportCode?: string;         // IATA code for airport pickup/return
  meetupLocationId?: string;
  deliveryInstructions?: string;
  contactPerson?: string;
  contactPhone?: string;
}

/**
 * Rental Pricing - Kiralama Fiyatlandırma
 */
export interface RentalPricing {
  // Base - Temel
  dailyRate: number;
  numberOfDays: number;
  subtotal: number;             // dailyRate * numberOfDays

  // Discounts - İndirimler
  weeklyDiscount: number;
  monthlyDiscount: number;
  earlyBookingDiscount: number;
  promoCodeDiscount: number;
  totalDiscount: number;

  // Fees - Ücretler
  cleaningFee: number;
  serviceFee: number;
  airportFee: number;
  deliveryFee: number;
  additionalDriverFee: number;
  youngDriverFee: number;

  // Extra Services - Ekstra Hizmetler
  extraServicesFee: number;

  // Insurance - Sigorta
  insuranceFee: number;

  // Taxes - Vergiler
  taxAmount: number;
  taxPercentage: number;

  // Deposits - Depozitolar
  securityDeposit: number;

  // Mileage - Kilometre
  extraMileageFee: number;
  extraMileageDriven: number;

  // Fuel - Yakıt
  fuelCharge: number;

  // Late Fees - Gecikme Ücretleri
  lateReturnFee: number;

  // Damage - Hasar
  damageFee: number;

  // Total - Toplam
  totalPrice: number;           // Amount to be paid by renter
  ownerPayout: number;          // Amount owner will receive
  platformCommission: number;   // Platform commission

  currency: string;
}

/**
 * Extra Service - Ekstra Hizmet
 */
export interface ExtraService {
  id: string;
  type: 'gps' | 'child-seat' | 'booster-seat' | 'baby-seat' | 'snow-chains' |
        'ski-rack' | 'bike-rack' | 'wifi-hotspot' | 'additional-insurance' | 'other';
  name: string;
  description?: string;
  pricePerDay?: number;
  priceOneTime?: number;
  quantity: number;
  totalPrice: number;
}

/**
 * Damage Inspection - Hasar Kontrolü
 */
export interface DamageInspection {
  id: string;
  inspectorId: string;          // Person who did the inspection
  inspectorName: string;
  inspectorRole: 'owner' | 'renter' | 'admin';
  inspectionDate: Date;

  // Vehicle Condition - Araç Durumu
  exteriorCondition: VehicleCondition;
  interiorCondition: VehicleCondition;

  // Specific Items - Özel Maddeler
  items: InspectionItem[];

  // Photos - Fotoğraflar
  photos: DamagePhoto[];

  // Overall - Genel
  overallCondition: 'excellent' | 'good' | 'fair' | 'poor';
  notes?: string;
  signature?: string;           // Digital signature

  // Renter Acknowledgment - Kiracı Onayı
  renterAcknowledged: boolean;
  renterSignature?: string;
  renterAcknowledgedAt?: Date;
}

/**
 * Vehicle Condition - Araç Durumu
 */
export interface VehicleCondition {
  bodywork: 'excellent' | 'good' | 'scratches' | 'dents' | 'damaged';
  paint: 'excellent' | 'good' | 'minor-scratches' | 'major-scratches' | 'damaged';
  windows: 'excellent' | 'good' | 'chips' | 'cracks' | 'broken';
  lights: 'all-working' | 'some-not-working' | 'none-working';
  tires: 'excellent' | 'good' | 'worn' | 'needs-replacement';
  wheels: 'excellent' | 'good' | 'scratched' | 'damaged';
  interior: 'excellent' | 'good' | 'stains' | 'tears' | 'damaged';
  cleanliness: 'very-clean' | 'clean' | 'needs-cleaning' | 'dirty';
}

/**
 * Inspection Item - Kontrol Maddesi
 */
export interface InspectionItem {
  id: string;
  category: 'exterior' | 'interior' | 'mechanical' | 'equipment';
  item: string;                 // e.g., "Front Bumper", "Dashboard", "Spare Tire"
  condition: 'ok' | 'minor-issue' | 'major-issue';
  notes?: string;
  photos?: string[];            // Photo URLs
  location?: string;            // Where on the vehicle
}

/**
 * Damage Photo - Hasar Fotoğrafı
 */
export interface DamagePhoto {
  id: string;
  url: string;
  category: 'exterior' | 'interior' | 'mechanical' | 'other';
  description?: string;
  location?: string;            // Where on the vehicle
  severity: 'minor' | 'moderate' | 'major';
  takenAt: Date;
  mileageAtPhoto?: number;
}

/**
 * Damage Report - Hasar Raporu
 * Formal damage report for insurance/dispute purposes
 */
export interface DamageReport {
  id: string;
  bookingId: string;
  vehicleId: string;
  reportedBy: string;           // User ID
  reportedByRole: 'owner' | 'renter';
  reportDate: Date;

  // Incident Details - Olay Detayları
  incidentDate: Date;
  incidentLocation: string;
  incidentDescription: string;

  // Damage Details - Hasar Detayları
  damageType: 'collision' | 'scratch' | 'dent' | 'broken-glass' | 'interior-damage' |
              'mechanical' | 'theft' | 'vandalism' | 'weather' | 'other';
  damageSeverity: 'minor' | 'moderate' | 'major' | 'total-loss';
  affectedAreas: string[];
  estimatedCost: number;
  actualCost?: number;

  // Evidence - Kanıt
  photos: DamagePhoto[];
  policeReportFiled: boolean;
  policeReportNumber?: string;
  policeReportUrl?: string;
  witnessStatements?: string[];

  // Insurance - Sigorta
  insuranceClaimFiled: boolean;
  insuranceClaimNumber?: string;
  insuranceCompany?: string;
  insuranceCoverage?: number;

  // Resolution - Çözüm
  status: 'reported' | 'under-review' | 'approved' | 'rejected' | 'resolved';
  resolutionNotes?: string;
  resolvedAt?: Date;

  // Payment - Ödeme
  responsibleParty: 'renter' | 'owner' | 'insurance' | 'platform' | 'disputed';
  paymentStatus: 'pending' | 'paid' | 'waived';
  paymentAmount?: number;

  createdAt: Date;
  updatedAt: Date;
}

/**
 * Booking Filters - Rezervasyon Filtreleri
 */
export interface RentalBookingFilters {
  status?: RentalBookingStatus[];
  vehicleId?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
}

/**
 * Sort Option - Sıralama Seçeneği
 */
export type RentalSortOption = {
  field: 'pickupDate' | 'returnDate' | 'totalPrice' | 'createdAt' | 'renterName' | 'vehicleName';
  direction: 'asc' | 'desc';
};

/**
 * Calendar Booking - Takvim Rezervasyonu
 */
export interface CalendarRentalBooking {
  id: string;
  vehicleId: string;
  renterName: string;
  pickupDate: Date;
  returnDate: Date;
  status: RentalBookingStatus;
  totalPrice: number;
}

/**
 * Day Price - Günlük Fiyat
 */
export interface DayPrice {
  date: Date;
  price: number;
  discountPercentage?: number;
  minStay?: number;
  isBlocked: boolean;
  bookingId?: string;
}

/**
 * Blocked Date - Engellenmiş Tarih
 */
export interface BlockedDate {
  id: string;
  vehicleId: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  type: 'maintenance' | 'personal-use' | 'other';
}

/**
 * Minimum Stay Rule - Minimum Kalış Kuralı
 */
export interface MinStayRule {
  id: string;
  vehicleId: string;
  startDate: Date;
  endDate: Date;
  minStay: number;
}

// ==================== MAINTENANCE ====================

/**
 * Maintenance Record - Bakım Kaydı
 */
export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  type: 'scheduled' | 'repair' | 'inspection' | 'tire-change' | 'oil-change' | 'other';
  title: string;
  description: string;

  // Service Details - Servis Detayları
  serviceProvider: string;      // Mechanic/Service center name
  serviceProviderAddress?: string;

  // Date & Mileage - Tarih ve Kilometre
  scheduledDate?: Date;
  completedDate?: Date;
  mileageAtService: number;
  nextServiceMileage?: number;
  nextServiceDate?: Date;

  // Cost - Maliyet
  estimatedCost?: number;
  actualCost?: number;
  currency: string;

  // Parts - Parçalar
  partsReplaced?: MaintenancePart[];

  // Status - Durum
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';

  // Documents - Belgeler
  invoiceUrl?: string;
  receiptUrl?: string;
  warrantyUrl?: string;
  photos?: string[];

  // Notes - Notlar
  notes?: string;
  mechanicNotes?: string;

  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

/**
 * Maintenance Part - Bakım Parçası
 */
export interface MaintenancePart {
  id: string;
  name: string;
  partNumber?: string;
  brand?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  warrantyMonths?: number;
  warrantyExpiryDate?: Date;
}

// ==================== MESSAGES ====================

/**
 * Conversation - Görüşme
 */
export interface Conversation {
  id: string;
  vehicleId: string;
  vehicleName: string;
  vehiclePhoto?: string;
  bookingId?: string;

  // Participants - Katılımcılar
  ownerId: string;
  ownerName: string;
  ownerAvatar?: string;
  renterId: string;
  renterName: string;
  renterEmail: string;
  renterAvatar?: string;

  // Last Message - Son Mesaj
  lastMessage: string;
  lastMessageTime: Date;
  lastMessageSender: 'owner' | 'renter';

  // Status - Durum
  unreadCount: number;
  isPinned: boolean;
  isArchived: boolean;

  createdAt: Date;
  updatedAt: Date;
}

/**
 * Message - Mesaj
 */
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: 'owner' | 'renter' | 'system';
  senderName: string;
  senderAvatar?: string;
  content: string;
  attachments?: Attachment[];

  // Message Type - Mesaj Türü
  messageType: 'text' | 'booking-request' | 'booking-confirmation' | 'system-notification' | 'automated';

  // Status - Durum
  isRead: boolean;
  readAt?: Date;

  // Timestamps - Zaman Damgaları
  createdAt: Date;
  editedAt?: Date;
  deletedAt?: Date;
}

/**
 * Attachment - Ek Dosya
 */
export interface Attachment {
  id: string;
  type: 'image' | 'document' | 'video' | 'pdf';
  url: string;
  filename: string;
  size: number;
  mimeType?: string;
}

/**
 * Message Filters - Mesaj Filtreleri
 */
export interface MessageFilters {
  conversationId?: string;
  searchQuery?: string;
  unreadOnly?: boolean;
  vehicleId?: string;
}

// ==================== EARNINGS & ANALYTICS ====================

/**
 * Earning Record - Kazanç Kaydı
 */
export interface EarningRecord {
  id: string;
  bookingId: string;
  vehicleId: string;
  vehicleName: string;
  renterName: string;

  // Amounts - Tutarlar
  grossAmount: number;          // Toplam ödeme
  platformCommission: number;   // Platform komisyonu
  processingFee: number;        // İşlem ücreti
  netAmount: number;            // Net kazanç (owner alacak)

  // Date - Tarih
  rentalStartDate: Date;
  rentalEndDate: Date;
  payoutDate?: Date;            // Ne zaman ödenecek

  // Status - Durum
  status: 'pending' | 'processing' | 'completed' | 'refunded' | 'disputed';

  // Currency - Para Birimi
  currency: string;

  createdAt: Date;
  updatedAt: Date;
}

/**
 * Vehicle Earnings - Araç Kazançları
 */
export interface VehicleEarnings {
  vehicleId: string;
  vehicleName: string;
  vehiclePhoto?: string;

  // Stats - İstatistikler
  totalBookings: number;
  totalDaysRented: number;
  totalEarnings: number;        // Gross
  netEarnings: number;          // Net after commission
  avgDailyRate: number;
  occupancyRate: number;        // Doluluk oranı (%)

  // Trends - Eğilimler
  earningsThisMonth: number;
  earningsLastMonth: number;
  earningsChange: number;       // % change

  // Performance - Performans
  rating?: number;
  reviewCount: number;
  repeatRenterRate: number;     // % of repeat renters
}

/**
 * Rental Earnings - Kiralama Kazançları
 */
export interface RentalEarnings {
  totalEarnings: number;
  totalBookings: number;
  avgBookingValue: number;
  topVehicles: VehicleEarnings[];
  monthlyEarnings: MonthlyEarnings[];
}

/**
 * Monthly Earnings - Aylık Kazançlar
 */
export interface MonthlyEarnings {
  month: string;                // YYYY-MM
  grossEarnings: number;
  netEarnings: number;
  bookingCount: number;
  avgDailyRate: number;
}

/**
 * Payout - Ödeme
 */
export interface Payout {
  id: string;
  amount: number;
  currency: string;
  payoutDate: Date;
  withdrawalMethod: 'bank' | 'paypal' | 'stripe' | 'wise';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
}

/**
 * Payout History - Ödeme Geçmişi
 */
export interface PayoutHistory extends Payout {
  transactionId: string;
  accountLastFourDigits?: string;
  completedAt?: Date;
  failureReason?: string;
  invoiceUrl?: string;
  receiptUrl?: string;
}

/**
 * Tax Report - Vergi Raporu
 */
export interface TaxReport {
  year: number;
  quarter?: number;

  // Income - Gelir
  totalGrossEarnings: number;
  totalNetEarnings: number;
  totalCommission: number;
  totalExpenses: number;       // Maintenance, cleaning, etc.

  // Tax - Vergi
  taxableIncome: number;
  estimatedTax: number;
  taxPaid: number;

  // Documents - Belgeler
  downloadUrl?: string;

  createdAt: Date;
}

/**
 * Analytics Metrics - Analitik Metrikleri
 */
export interface AnalyticsMetrics {
  // Views - Görüntülenmeler
  totalViews: number;
  viewsChange: number;          // % change from previous period

  // Bookings - Rezervasyonlar
  totalBookings: number;
  bookingsChange: number;

  // Revenue - Gelir
  totalRevenue: number;
  revenueChange: number;
  avgBookingValue: number;

  // Conversion - Dönüşüm
  conversionRate: number;       // Views to bookings (%)
  conversionChange: number;

  // Rating - Değerlendirme
  avgRating: number;
  ratingChange: number;

  // Response - Yanıt
  responseRate: number;         // % of inquiries responded to
  avgResponseTime: number;      // In hours

  // Utilization - Kullanım
  occupancyRate: number;        // % of days rented
  avgRentalDuration: number;    // Days
}

/**
 * Chart Data Point - Grafik Veri Noktası
 */
export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
  additionalData?: Record<string, number>;
}

/**
 * Competitor Metrics - Rakip Metrikleri
 */
export interface CompetitorMetrics {
  vehicleType: VehicleType;
  location: string;
  avgDailyRate: number;
  avgRating: number;
  avgOccupancyRate: number;
  sampleSize: number;           // Number of vehicles in sample
}

/**
 * Review - Değerlendirme
 */
export interface Review {
  id: string;
  bookingId: string;
  vehicleId: string;

  // Reviewer - Değerlendiren
  renterId: string;
  renterName: string;
  renterAvatar?: string;
  verifiedRenter: boolean;

  // Rating - Puan
  overallRating: number;        // 1-5
  categories: {
    vehicleCondition: number;   // Araç durumu
    cleanliness: number;        // Temizlik
    valueForMoney: number;      // Fiyat/Performans
    ownerCommunication: number; // İletişim
    pickupExperience: number;   // Teslim alma deneyimi
    accuracy: number;           // Açıklamaya uygunluk
  };

  // Review Content - Değerlendirme İçeriği
  title?: string;
  comment: string;
  pros?: string[];
  cons?: string[];

  // Photos - Fotoğraflar
  photos?: string[];

  // Recommendation - Tavsiye
  wouldRecommend: boolean;
  wouldRentAgain: boolean;

  // Owner Response - Malik Yanıtı
  response?: string;
  respondedAt?: Date;

  // Metadata - Meta Veri
  isVerified: boolean;          // Verified rental
  isEdited: boolean;
  editedAt?: Date;

  // Status - Durum
  status: 'pending' | 'published' | 'hidden' | 'flagged';
  flagReason?: string;

  // Helpful - Yararlı
  helpfulCount: number;
  notHelpfulCount: number;

  createdAt: Date;
  updatedAt: Date;
}

/**
 * Vehicle Analytics - Araç Analitiği
 */
export interface VehicleAnalytics {
  vehicleId: string;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  startDate: Date;
  endDate: Date;

  // Performance - Performans
  totalViews: number;
  totalInquiries: number;
  totalBookings: number;
  totalRevenue: number;

  // Rates - Oranlar
  inquiryToBookingRate: number; // %
  averageBookingValue: number;
  occupancyRate: number;

  // Comparison - Karşılaştırma
  previousPeriodComparison: {
    viewsChange: number;        // %
    bookingsChange: number;     // %
    revenueChange: number;      // %
  };

  // Market Position - Pazar Pozisyonu
  marketPosition: {
    pricePercentile: number;    // Where you stand in pricing (0-100)
    ratingPercentile: number;
    occupancyPercentile: number;
  };

  // Demographics - Demografi
  renterDemographics?: {
    ageGroups: Record<string, number>;
    rentalDurations: Record<string, number>;
    purposes: Record<string, number>; // business, leisure, etc.
  };
}

/**
 * Custom Report - Özel Rapor
 */
export interface CustomReport {
  id: string;
  name: string;
  type: 'earnings' | 'bookings' | 'reviews' | 'performance' | 'custom';
  description?: string;

  // Filters - Filtreler
  dateRange: DateRange;
  vehicleIds?: string[];
  filters: Record<string, any>;

  // Schedule - Zamanlama
  schedule?: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  nextRunDate?: Date;

  // Format - Format
  format: 'pdf' | 'excel' | 'csv';

  // Recipients - Alıcılar
  recipients?: string[];        // Email addresses

  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

// ==================== SETTINGS ====================

/**
 * Profile Settings - Profil Ayarları
 */
export interface ProfileSettings {
  avatar?: string;
  name: string;
  bio?: string;
  location: string;
  languages: string[];
  phoneNumber?: string;

  // Emergency Contact - Acil Durum İletişim
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };

  // Business Info - İş Bilgileri (for professional owners)
  businessInfo?: {
    businessName?: string;
    businessType?: string;
    taxId?: string;
    companyRegistrationNumber?: string;
  };
}

/**
 * Vehicle Settings - Araç Ayarları
 */
export interface VehicleSettings {
  vehicleName: string;
  vehicleType: VehicleType;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;

  // Pricing - Fiyatlandırma
  dailyRate: number;
  weeklyDiscount?: number;
  monthlyDiscount?: number;

  // Availability - Müsaitlik
  availabilityMode: 'always' | 'calendar' | 'on-request';
  minimumRentalDays: number;
  instantBookingEnabled: boolean;
}

/**
 * Rental Rules Settings - Kiralama Kuralları Ayarları
 */
export interface RentalRulesSettings {
  minimumAge: number;
  minimumDrivingExperience: number;

  // Policies - Politikalar
  smokingPolicy: 'not-allowed' | 'allowed';
  petPolicy: 'not-allowed' | 'allowed' | 'extra-charge';
  crossBorderPolicy: 'not-allowed' | 'allowed' | 'with-permission';

  // Custom Rules - Özel Kurallar
  customRules: string;

  // Cancellation - İptal
  cancellationPolicy: CancellationPolicy;

  minRentalNoticeHours: number;
  maxRentalDays?: number;
}

/**
 * Insurance Settings - Sigorta Ayarları
 */
export interface InsuranceSettings {
  primaryInsurance: {
    provider: string;
    policyNumber: string;
    expiryDate: Date;
    coverageAmount: number;
  };

  // Additional Coverage - Ek Teminat
  additionalCoverageOffered: boolean;
  rentalInsuranceOptions: RentalInsuranceOption[];
}

/**
 * Payment Settings - Ödeme Ayarları
 */
export interface PaymentSettings {
  // Bank Details - Banka Bilgileri
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    routingNumber?: string;
    iban?: string;
    swiftCode?: string;
    accountHolderName: string;
    verified: boolean;
    verifiedAt?: Date;
  };

  // Online Payment Methods - Online Ödeme Yöntemleri
  paypalConnected: boolean;
  paypalEmail?: string;
  stripeConnected: boolean;
  stripeAccountId?: string;
  wiseConnected?: boolean;
  wiseAccountId?: string;

  // Payout Preferences - Ödeme Tercihleri
  payoutSchedule: 'weekly' | 'biweekly' | 'monthly';
  minimumPayoutAmount?: number;
  preferredPayoutMethod: 'bank' | 'paypal' | 'stripe' | 'wise';

  // Security - Güvenlik
  securityDepositRequired: boolean;
  securityDepositAmount?: number;
}

/**
 * Notification Settings - Bildirim Ayarları
 */
export interface NotificationSettings {
  // Email Notifications - E-posta Bildirimleri
  email: {
    newBookingRequest: boolean;
    bookingConfirmation: boolean;
    bookingCancellation: boolean;
    newMessage: boolean;
    reviewPosted: boolean;
    rentalReminders: boolean;   // Pickup/return reminders
    paymentReceived: boolean;
    maintenanceReminders: boolean;
    weeklyReport: boolean;
    monthlyReport: boolean;
  };

  // Push Notifications - Anlık Bildirimler
  push: {
    enabled: boolean;
    newBookingRequest: boolean;
    bookingConfirmation: boolean;
    newMessage: boolean;
    rentalStartsSoon: boolean;
    rentalEndsSoon: boolean;
    urgentAlerts: boolean;
  };

  // SMS Notifications - SMS Bildirimleri
  sms: {
    enabled: boolean;
    urgentOnly: boolean;
    bookingConfirmation: boolean;
    rentalReminders: boolean;
  };
}

/**
 * Security Settings - Güvenlik Ayarları
 */
export interface SecuritySettings {
  // Two-Factor Authentication - İki Faktörlü Doğrulama
  twoFactorEnabled: boolean;
  twoFactorMethod?: 'sms' | 'authenticator' | 'email';

  // Active Sessions - Aktif Oturumlar
  activeSessions: ActiveSession[];

  // Login History - Giriş Geçmişi
  loginHistory: LoginHistory[];

  // Account Security - Hesap Güvenliği
  passwordLastChanged?: Date;
  accountLocked: boolean;
  failedLoginAttempts: number;
}

/**
 * Active Session - Aktif Oturum
 */
export interface ActiveSession {
  id: string;
  deviceInfo: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  browser?: string;
  os?: string;
  location: string;
  ipAddress: string;
  lastActive: Date;
  createdAt: Date;
  isCurrent: boolean;
}

/**
 * Login History - Giriş Geçmişi
 */
export interface LoginHistory {
  id: string;
  deviceInfo: string;
  location: string;
  ipAddress: string;
  timestamp: Date;
  success: boolean;
  failureReason?: string;
}

/**
 * Integration Settings - Entegrasyon Ayarları
 */
export interface IntegrationSettings {
  id: string;
  name: string;
  type: 'calendar' | 'booking' | 'payment' | 'messaging' | 'insurance' | 'maintenance';
  provider: string;
  connected: boolean;
  connectedAt?: Date;
  lastSyncAt?: Date;
  settings?: Record<string, any>;
  isActive: boolean;
}

// ==================== VEHICLE SUBMISSION WIZARD ====================

/**
 * Step 1: Vehicle Category - Araç Kategorisi
 */
export interface VehicleStep1Data {
  vehicleType: VehicleType;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  vin?: string;
  color: string;
  description: string;
  highlightDescription?: string;
}

/**
 * Step 2: Vehicle Details & Specifications - Araç Detayları ve Özellikleri
 */
export interface VehicleStep2Data {
  transmission: TransmissionType;
  fuelType: FuelType;

  // Capacity - Kapasite
  seats: number;
  doors: number;
  luggage: number;

  // Technical Specs - Teknik Özellikler
  engineSize?: string;
  horsePower?: number;
  mileage: number;
  tankCapacity?: number;

  // Location - Konum
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
}

/**
 * Step 3: Features & Amenities - Özellikler ve Donanımlar
 */
export interface VehicleStep3Data {
  features: VehicleFeatures;

  // Pickup Options - Teslim Alma Seçenekleri
  airportPickupAvailable: boolean;
  airportName?: string;
  airportCode?: string;
  airportFee?: number;

  homeDeliveryAvailable: boolean;
  homeDeliveryFee?: number;
  homeDeliveryRadius?: number;

  meetupLocations?: MeetupLocation[];
}

/**
 * Step 4: Photos Upload - Fotoğraf Yükleme
 */
export interface VehicleStep4Data {
  photos: VehiclePhoto[];
  coverPhotoIndex: number;
  videoUrl?: string;

  // Required Photos - Zorunlu Fotoğraflar
  hasExteriorFront: boolean;
  hasExteriorRear: boolean;
  hasExteriorLeft: boolean;
  hasExteriorRight: boolean;
  hasInterior: boolean;
  hasDashboard: boolean;
}

/**
 * Step 5: Pricing & Discounts - Fiyatlandırma ve İndirimler
 */
export interface VehicleStep5Data {
  dailyRate: number;
  hourlyRate?: number;
  currency: string;

  // Discounts - İndirimler
  discounts: PriceDiscounts;

  // Mileage - Kilometre
  mileageLimit: MileageLimit;

  // Fees - Ücretler
  fees: VehicleFees;

  // Deposits - Depozito
  securityDeposit: number;
  depositRefundDays: number;

  // Seasonal Pricing - Sezonluk Fiyatlandırma
  seasonalPrices?: SeasonalPrice[];
}

/**
 * Step 6: Availability & Rules - Müsaitlik ve Kurallar
 */
export interface VehicleStep6Data {
  // Availability - Müsaitlik
  minRentalDays: number;
  maxRentalDays?: number;
  advanceNoticeHours: number;
  instantBookingEnabled: boolean;

  // Rental Rules - Kiralama Kuralları
  minimumAge: number;
  minimumDrivingExperience: number;
  requiresInternationalLicense: boolean;

  // Policies - Politikalar
  policies: {
    smokingAllowed: boolean;
    petsAllowed: boolean;
    petTypes?: string[];
    petFee?: number;
    crossBorderTravelAllowed: boolean;
    allowedCountries?: string[];
    offRoadAllowed: boolean;
    rideSharingAllowed: boolean;
    commercialUseAllowed: boolean;
  };

  // Fuel Policy - Yakıt Politikası
  fuelPolicy: FuelPolicy;

  // Cancellation - İptal
  cancellationPolicy: CancellationPolicy;

  // Custom Rules - Özel Kurallar
  customRules?: string[];
  pickupInstructions?: string;
  returnInstructions?: string;
}

/**
 * Step 7: Insurance & Legal Documents - Sigorta ve Yasal Belgeler
 */
export interface VehicleStep7Data {
  // Insurance - Sigorta
  insurance: {
    hasInsurance: boolean;
    insuranceProvider: string;
    policyNumber: string;
    expiryDate: Date;
    coverageType: 'comprehensive' | 'third-party' | 'collision';
    insuranceCertificateUrl: string;
  };

  // Registration - Ruhsat
  registration: {
    registrationDocument: string;     // URL
    registrationNumber: string;
    registrationExpiryDate: Date;
    registeredOwner: string;
  };

  // Inspection - Muayene
  inspection?: {
    inspectionCertificateUrl: string;
    lastInspectionDate: Date;
    nextInspectionDate: Date;
  };

  // Owner Documents - Malik Belgeleri
  ownerDocuments: {
    driverLicenseUrl: string;
    governmentIdUrl: string;
  };

  // Rental Insurance Options - Kiralama Sigorta Seçenekleri
  rentalInsuranceOptions?: RentalInsuranceOption[];
}

/**
 * Step 8: Review & Submit - İnceleme ve Gönder
 */
export interface VehicleStep8Data {
  // Agreements - Anlaşmalar
  agreeToTerms: boolean;
  agreeToPrivacyPolicy: boolean;
  agreeToInsurancePolicy: boolean;
  agreeToRentalRules: boolean;
  agreeToBackgroundCheck: boolean;

  // Verification - Doğrulama
  verification?: {
    governmentIdVerified: boolean;
    driverLicenseVerified: boolean;
    addressVerified: boolean;
    phoneVerified: boolean;
    emailVerified: boolean;
    backgroundCheckCompleted: boolean;
  };

  // Submission - Gönderim
  submissionType: 'save_draft' | 'submit_for_review';
  additionalNotes?: string;
  preferredContactMethod?: 'email' | 'phone' | 'sms';
}

/**
 * Vehicle Wizard State - Araç Sihirbazı Durumu
 */
export interface VehicleWizardState {
  currentStep: number;
  totalSteps: 8;

  // Form Data - Form Verileri
  formData: {
    step1: Partial<VehicleStep1Data>;
    step2: Partial<VehicleStep2Data>;
    step3: Partial<VehicleStep3Data>;
    step4: Partial<VehicleStep4Data>;
    step5: Partial<VehicleStep5Data>;
    step6: Partial<VehicleStep6Data>;
    step7: Partial<VehicleStep7Data>;
    step8: Partial<VehicleStep8Data>;
  };

  // Progress - İlerleme
  completedSteps: number[];
  errors: Record<number, string[]>;

  // Draft - Taslak
  draftData?: {
    savedAt: Date;
    autoSaveEnabled: boolean;
    lastSaveId: string;
  };

  // Upload Progress - Yükleme İlerlemesi
  uploadProgress?: {
    currentFile: string;
    progress: number;
    totalFiles: number;
    uploadedFiles: number;
  };

  // Validation - Doğrulama
  validationStatus?: {
    step: number;
    isValid: boolean;
    errors: ValidationError[];
    warnings?: ValidationWarning[];
  };
}

/**
 * Validation Error - Doğrulama Hatası
 */
export interface ValidationError {
  field: string;
  message: string;
  code?: string;
  severity: 'error';
}

/**
 * Validation Warning - Doğrulama Uyarısı
 */
export interface ValidationWarning {
  field: string;
  message: string;
  code?: string;
  severity: 'warning';
}

// ==================== UI STATE ====================

/**
 * Dashboard Stats - Gösterge Paneli İstatistikleri
 */
export interface DashboardStats {
  totalVehicles: number;
  activeVehicles: number;
  totalBookings: number;
  activeBookings: number;
  totalRevenue: number;
  revenueThisMonth: number;
  occupancyRate: number;
  avgRating: number;
  pendingBookings: number;
  upcomingPickups: number;
  upcomingReturns: number;
  unreadMessages: number;
  maintenanceDue: number;
}

/**
 * Revenue Chart Data - Gelir Grafik Verisi
 */
export interface RevenueChartData {
  date: string;
  revenue: number;
  bookings: number;
  vehicles: number;
}

/**
 * Performance Metrics - Performans Metrikleri
 */
export interface PerformanceMetrics {
  occupancyGauge: number;
  avgReviewRating: number;
  responseRate: number;
  conversionRate: number;
  repeatRenterRate: number;
}

/**
 * Pagination State - Sayfalama Durumu
 */
export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/**
 * Date Range - Tarih Aralığı
 */
export interface DateRange {
  start: Date;
  end: Date;
}

/**
 * Settings Tab - Ayarlar Sekmesi
 */
export type SettingsTab =
  | 'profile'
  | 'vehicles'
  | 'rental-rules'
  | 'insurance'
  | 'payment'
  | 'notifications'
  | 'security'
  | 'integrations';

// ==================== API RESPONSES ====================

/**
 * API Response - API Yanıtı
 */
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  errorCode?: string;
  statusCode?: number;
}

/**
 * Paginated Response - Sayfalanmış Yanıt
 */
export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  filters?: Record<string, any>;
  sort?: {
    field: string;
    direction: 'asc' | 'desc';
  };
}

/**
 * Search Response - Arama Yanıtı
 */
export interface SearchResponse<T> extends PaginatedResponse<T> {
  searchQuery: string;
  searchFields: string[];
  totalMatches: number;
  facets?: Record<string, FacetResult[]>;
}

/**
 * Facet Result - Yön Sonucu
 */
export interface FacetResult {
  value: string;
  count: number;
  selected: boolean;
}

// ==================== FORM TYPES ====================

/**
 * Vehicle Create Input - Araç Oluşturma Girdisi
 */
export interface VehicleCreateInput {
  step1: VehicleStep1Data;
  step2: VehicleStep2Data;
  step3: VehicleStep3Data;
  step4: VehicleStep4Data;
  step5: VehicleStep5Data;
  step6: VehicleStep6Data;
  step7: VehicleStep7Data;
  step8: VehicleStep8Data;
}

/**
 * Vehicle Update Input - Araç Güncelleme Girdisi
 */
export interface VehicleUpdateInput extends Partial<VehicleCreateInput> {
  id: string;
}

/**
 * Booking Create Input - Rezervasyon Oluşturma Girdisi
 */
export interface BookingCreateInput {
  vehicleId: string;
  pickupDate: Date;
  returnDate: Date;
  pickupLocation: RentalLocation;
  returnLocation: RentalLocation;
  additionalDrivers?: Omit<AdditionalDriver, 'id' | 'fee'>[];
  selectedInsurance?: string;   // Insurance option ID
  extraServices?: Omit<ExtraService, 'id' | 'totalPrice'>[];
  renterNotes?: string;
}

/**
 * Booking Update Input - Rezervasyon Güncelleme Girdisi
 */
export interface BookingUpdateInput extends Partial<BookingCreateInput> {
  id: string;
  status?: RentalBookingStatus;
  ownerNotes?: string;
}

// ==================== UTILITY TYPES ====================

/**
 * Vehicle Filter - Araç Filtresi
 */
export interface VehicleFilter {
  vehicleType?: VehicleType[];
  transmission?: TransmissionType[];
  fuelType?: FuelType[];
  seats?: number[];
  priceRange?: {
    min: number;
    max: number;
  };
  year?: {
    min: number;
    max: number;
  };
  features?: string[];
  location?: {
    city?: string;
    radius?: number;           // km
  };
  availability?: {
    startDate: Date;
    endDate: Date;
  };
  instantBooking?: boolean;
  rating?: number;              // Minimum rating
  sortBy?: 'price' | 'rating' | 'distance' | 'newest' | 'popular';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Vehicle Sort Option - Araç Sıralama Seçeneği
 */
export type VehicleSortOption = {
  field: 'dailyRate' | 'rating' | 'totalBookings' | 'createdAt' | 'brand' | 'year';
  direction: 'asc' | 'desc';
};

// ==================== EXPORTS ====================

// Re-export all types for convenience
export type {
  // All types are already exported via individual export statements
};
