/**
 * Transfer Service System - TypeScript Type Definitions
 * Comprehensive type system for airport transfers and private transportation
 * Based on Viator research and existing transfer-vehicles.ts data
 */

// ==================== VEHICLE TYPES ====================

/**
 * Vehicle category classification
 * Kategoriler: ekonomik, konforlu, premium, lüks, grup
 */
export type VehicleCategory = 'economy' | 'comfort' | 'premium' | 'luxury' | 'group';

/**
 * Vehicle type identifiers
 * Araç tipi kimlik kodları
 */
export type VehicleTypeId =
  | 'economy-sedan'
  | 'comfort-sedan'
  | 'vip-sedan'
  | 'minivan'
  | 'vip-minivan'
  | 'minibus-14'
  | 'minibus-17'
  | 'bus-30'
  | 'luxury-vip'
  | 'vip-sprinter';

/**
 * Vehicle ownership and operational status
 * Araç sahipliği ve operasyonel durum
 */
export type VehicleStatus = 'available' | 'in-service' | 'maintenance' | 'retired';

/**
 * Vehicle capacity information
 * Araç kapasite bilgileri
 */
export interface VehicleCapacity {
  /** Standard passenger capacity - Standart yolcu kapasitesi */
  passengers: number;
  /** Standard luggage capacity - Standart bagaj kapasitesi */
  luggage: number;
  /** Maximum passenger capacity - Maksimum yolcu kapasitesi */
  maxPassengers: number;
}

/**
 * Vehicle features and amenities
 * Araç özellikleri ve donanımlar
 */
export interface VehicleFeatures {
  /** WiFi available - WiFi mevcut */
  wifi: boolean;
  /** TV/Entertainment system - TV/Eğlence sistemi */
  tv: boolean;
  /** Minibar/Refreshments - Minibar/İçecek ikramı */
  minibar: boolean;
  /** Leather seats - Deri koltuklar */
  leatherSeats: boolean;
  /** Air conditioning - Klima */
  airConditioning: boolean;
  /** Massage seats - Masaj koltuğu */
  massageSeats?: boolean;
  /** Privacy glass - Privacy cam */
  privacyGlass?: boolean;
  /** LED lighting - LED aydınlatma */
  ledLighting?: boolean;
  /** Sound system - Ses sistemi */
  soundSystem?: boolean;
  /** WC (for buses) - Tuvalet (otobüsler için) */
  hasWC?: boolean;
  /** Custom features - Özel özellikler */
  customFeatures?: string[];
}

/**
 * Legal and compliance documentation
 * Yasal ve uyumluluk belgeleri
 */
export interface VehicleLegalInfo {
  /** Tourism license D2 - Turizm belgesi D2 */
  tourismLicense: {
    number: string;
    issueDate: Date;
    expiryDate: Date;
    verified: boolean;
  };
  /** Commercial yellow plate - Ticari sarı plaka */
  commercialPlate: {
    number: string;
    verified: boolean;
  };
  /** Passenger insurance - Yolcu sigortası */
  passengerInsurance: {
    provider: string;
    policyNumber: string;
    coverage: number;
    expiryDate: Date;
    verified: boolean;
  };
  /** Vehicle inspection - Araç muayenesi */
  inspection: {
    lastInspectionDate: Date;
    nextInspectionDate: Date;
    passed: boolean;
  };
}

/**
 * Driver information associated with vehicle
 * Araca atanmış sürücü bilgileri
 */
export interface DriverBasicInfo {
  id: string;
  name: string;
  phoneNumber: string;
  /** Driver's license number - Sürücü belgesi numarası */
  licenseNumber: string;
  /** License expiry date - Belge son kullanma tarihi */
  licenseExpiry: Date;
  /** Psychotechnical certificate - Psikoteknik belgesi */
  psychotechCertificate: {
    number: string;
    expiryDate: Date;
  };
  /** SRC4 professional driving license - SRC4 mesleki yeterlilik belgesi */
  src4License: {
    number: string;
    expiryDate: Date;
  };
  avatar?: string;
  rating: number;
  totalTransfers: number;
}

/**
 * Vehicle pricing configuration
 * Araç fiyatlandırma yapılandırması
 */
export interface VehiclePricing {
  /** Base price per kilometer - Kilometre başı taban fiyat */
  basePricePerKm: number;
  /** Minimum fare for any trip - Minimum seyahat ücreti */
  minimumFare: number;
  /** Price multiplier based on vehicle category - Araç kategorisine göre çarpan */
  priceMultiplier: number;
  /** Airport pickup surcharge - Havalimanı toplama ek ücreti */
  airportPickupSurcharge?: number;
  /** Night time surcharge (22:00-06:00) - Gece ek ücreti */
  nightSurcharge?: {
    multiplier: number;
    startHour: number;
    endHour: number;
  };
  /** Weekend surcharge - Hafta sonu ek ücreti */
  weekendSurcharge?: number;
}

/**
 * Vehicle photo gallery
 * Araç fotoğraf galerisi
 */
export interface VehiclePhoto {
  id: string;
  url: string;
  /** Photo type - Fotoğraf tipi */
  type: 'exterior' | 'interior' | 'vip-features' | 'luggage-space' | 'driver';
  caption?: string;
  order: number;
  isPrimary: boolean;
  uploadedAt: Date;
}

/**
 * Vehicle performance statistics
 * Araç performans istatistikleri
 */
export interface VehicleStats {
  /** Total completed transfers - Toplam tamamlanmış transferler */
  totalTransfers: number;
  /** Average rating from passengers - Yolculardan ortalama puan */
  rating: number;
  /** Total number of ratings - Toplam puan sayısı */
  ratingCount: number;
  /** Total revenue generated - Toplam gelir */
  totalRevenue: number;
  /** Total kilometers driven - Toplam gidilen kilometre */
  totalKilometers: number;
  /** On-time performance percentage - Zamanında varış yüzdesi */
  onTimePerformance: number;
  /** Last service date - Son servis tarihi */
  lastServiceDate?: Date;
  /** Next service due date - Sonraki servis tarihi */
  nextServiceDate?: Date;
}

/**
 * Complete transfer vehicle entity
 * Tam transfer aracı varlığı
 */
export interface TransferVehicle {
  /** Unique vehicle identifier - Benzersiz araç kimliği */
  id: string;
  /** Owner/Partner ID - Araç sahibi/Partner kimliği */
  ownerId: string;
  /** Vehicle type classification - Araç tipi sınıflandırması */
  vehicleType: VehicleTypeId;
  /** License plate number - Plaka numarası */
  licensePlate: string;
  /** Vehicle brand (e.g., Mercedes, BMW) - Araç markası */
  brand: string;
  /** Vehicle model (e.g., E-Class, Vito) - Araç modeli */
  model: string;
  /** Manufacturing year - Üretim yılı */
  year: number;
  /** Vehicle category - Araç kategorisi */
  category: VehicleCategory;
  /** Capacity information - Kapasite bilgileri */
  capacity: VehicleCapacity;
  /** Features and amenities - Özellikler ve donanımlar */
  features: VehicleFeatures;
  /** Current operational status - Güncel operasyonel durum */
  status: VehicleStatus;
  /** Legal and compliance info - Yasal ve uyumluluk bilgileri */
  legalInfo: VehicleLegalInfo;
  /** Pricing configuration - Fiyatlandırma yapılandırması */
  pricing: VehiclePricing;
  /** Photo gallery - Fotoğraf galerisi */
  photos: VehiclePhoto[];
  /** Primary driver assignment - Ana sürücü ataması */
  primaryDriver?: DriverBasicInfo;
  /** Performance statistics - Performans istatistikleri */
  stats: VehicleStats;
  /** Vehicle description - Araç açıklaması */
  description: string;
  /** English description - İngilizce açıklama */
  descriptionEn: string;
  /** Popular/Featured flag - Popüler/Öne çıkan işareti */
  popular: boolean;
  /** Created timestamp - Oluşturulma zamanı */
  createdAt: Date;
  /** Last updated timestamp - Son güncelleme zamanı */
  updatedAt: Date;
}

// ==================== TRANSFER BOOKING ====================

/**
 * Booking status lifecycle
 * Rezervasyon durum yaşam döngüsü
 */
export type TransferBookingStatus =
  | 'pending'           // Awaiting confirmation - Onay bekliyor
  | 'confirmed'         // Confirmed by operator - Operatör tarafından onaylandı
  | 'driver-assigned'   // Driver has been assigned - Sürücü atandı
  | 'in-progress'       // Transfer in progress - Transfer devam ediyor
  | 'completed'         // Successfully completed - Başarıyla tamamlandı
  | 'cancelled'         // Cancelled by customer or operator - Müşteri veya operatör tarafından iptal edildi
  | 'no-show';          // Customer did not show up - Müşteri gelmedi

/**
 * Payment status for booking
 * Rezervasyon ödeme durumu
 */
export type PaymentStatus =
  | 'pending'           // Payment not yet received - Ödeme henüz alınmadı
  | 'paid'              // Fully paid - Tamamen ödendi
  | 'partially-paid'    // Partial payment received - Kısmi ödeme alındı
  | 'refunded'          // Full refund issued - Tam iade yapıldı
  | 'partially-refunded'; // Partial refund issued - Kısmi iade yapıldı

/**
 * Location information for pickup/dropoff
 * Alış/bırakış için konum bilgisi
 */
export interface TransferLocation {
  /** Location name - Konum adı */
  name: string;
  /** Location type - Konum tipi */
  type: 'airport' | 'hotel' | 'address' | 'poi' | 'cruise-port';
  /** Full address - Tam adres */
  address: string;
  /** City - Şehir */
  city: string;
  /** District - İlçe */
  district?: string;
  /** GPS coordinates - GPS koordinatları */
  coordinates: {
    latitude: number;
    longitude: number;
  };
  /** Special instructions - Özel talimatlar */
  instructions?: string;
  /** Terminal (for airports) - Terminal (havalimanları için) */
  terminal?: string;
  /** Gate/Door number - Kapı numarası */
  gateNumber?: string;
}

/**
 * Flight information for airport transfers
 * Havalimanı transferleri için uçuş bilgisi
 */
export interface FlightInfo {
  /** Flight number - Uçuş numarası */
  flightNumber: string;
  /** Airline - Havayolu */
  airline: string;
  /** Departure airport - Kalkış havalimanı */
  departureAirport: string;
  /** Arrival airport - Varış havalimanı */
  arrivalAirport: string;
  /** Scheduled arrival time - Planlanan varış saati */
  scheduledArrival: Date;
  /** Actual arrival time (updated) - Gerçek varış saati (güncel) */
  actualArrival?: Date;
  /** Flight status - Uçuş durumu */
  status?: 'on-time' | 'delayed' | 'cancelled' | 'landed';
  /** Delay in minutes - Gecikme dakikası */
  delayMinutes?: number;
}

/**
 * Extra services for transfer booking
 * Transfer rezervasyonu için ekstra hizmetler
 */
export interface BookingExtraServices {
  /** Meet & greet at airport - Havalimanında karşılama */
  meetGreet: boolean;
  /** Baby seat (0-4 years) - Bebek koltuğu */
  babySeat: number; // Quantity - Adet
  /** Child seat (4-12 years) - Çocuk koltuğu */
  childSeat: number; // Quantity - Adet
  /** Extra wait time in minutes - Ekstra bekleme süresi (dakika) */
  extraWaitTime: number;
  /** Market/shopping stop - Market/alışveriş durağı */
  marketStop: boolean;
  /** Portable WiFi device - Taşınabilir WiFi cihazı */
  portableWifi: boolean;
  /** Special requests - Özel istekler */
  specialRequests?: string;
}

/**
 * Transfer route calculation
 * Transfer rota hesaplaması
 */
export interface TransferRoute {
  /** Route identifier - Rota kimliği */
  id: string;
  /** Pickup location - Alış konumu */
  pickupLocation: TransferLocation;
  /** Dropoff location - Bırakış konumu */
  dropoffLocation: TransferLocation;
  /** Distance in kilometers - Kilometre cinsinden mesafe */
  distance: number;
  /** Estimated duration in minutes - Tahmini süre (dakika) */
  estimatedDuration: number;
  /** Is this a popular/pre-configured route - Popüler/önceden yapılandırılmış rota mu */
  isPopularRoute: boolean;
  /** Route name (for popular routes) - Rota adı (popüler rotalar için) */
  routeName?: string;
}

/**
 * Pricing breakdown for transfer booking
 * Transfer rezervasyonu fiyat dökümü
 */
export interface TransferPricing {
  /** Base transfer price - Taban transfer ücreti */
  basePrice: number;
  /** Extra services total - Ekstra hizmetler toplamı */
  extraServices: {
    meetGreet: number;
    babySeat: number;
    childSeat: number;
    extraWaitTime: number;
    marketStop: number;
    portableWifi: number;
    total: number;
  };
  /** Night surcharge - Gece ek ücreti */
  nightSurcharge?: number;
  /** Weekend surcharge - Hafta sonu ek ücreti */
  weekendSurcharge?: number;
  /** Airport surcharge - Havalimanı ek ücreti */
  airportSurcharge?: number;
  /** Subtotal before discounts - İndirimler öncesi ara toplam */
  subtotal: number;
  /** Discount amount - İndirim tutarı */
  discount: number;
  /** Discount code applied - Uygulanan indirim kodu */
  discountCode?: string;
  /** Tax amount - Vergi tutarı */
  tax: number;
  /** Tax percentage - Vergi yüzdesi */
  taxPercentage: number;
  /** Commission (platform fee) - Komisyon (platform ücreti) */
  commission: number;
  /** Commission percentage - Komisyon yüzdesi */
  commissionPercentage: number;
  /** Total price - Toplam fiyat */
  totalPrice: number;
  /** Currency - Para birimi */
  currency: string;
}

/**
 * Complete transfer booking entity
 * Tam transfer rezervasyonu varlığı
 */
export interface TransferBooking {
  /** Unique booking identifier - Benzersiz rezervasyon kimliği */
  id: string;
  /** Booking reference number - Rezervasyon referans numarası */
  referenceNumber: string;
  /** Vehicle ID - Araç kimliği */
  vehicleId: string;
  /** Vehicle type - Araç tipi */
  vehicleType: VehicleTypeId;
  /** Vehicle details - Araç detayları */
  vehicleDetails: {
    brand: string;
    model: string;
    licensePlate: string;
    category: VehicleCategory;
  };
  /** Customer ID - Müşteri kimliği */
  customerId: string;
  /** Customer details - Müşteri detayları */
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    countryCode: string;
    language: string;
  };
  /** Route information - Rota bilgisi */
  route: TransferRoute;
  /** Flight information (if airport transfer) - Uçuş bilgisi (havalimanı transferi ise) */
  flightInfo?: FlightInfo;
  /** Is this a round trip - Gidiş-dönüş mü */
  isRoundTrip: boolean;
  /** Return transfer details (if round trip) - Dönüş transfer detayları (gidiş-dönüş ise) */
  returnTransfer?: {
    pickupDateTime: Date;
    flightInfo?: FlightInfo;
  };
  /** Pickup date and time - Alış tarihi ve saati */
  pickupDateTime: Date;
  /** Number of passengers - Yolcu sayısı */
  passengerCount: number;
  /** Passenger details - Yolcu detayları */
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  /** Number of luggage items - Bagaj sayısı */
  luggageCount: number;
  /** Extra services - Ekstra hizmetler */
  extraServices: BookingExtraServices;
  /** Pricing breakdown - Fiyat dökümü */
  pricing: TransferPricing;
  /** Booking status - Rezervasyon durumu */
  status: TransferBookingStatus;
  /** Payment status - Ödeme durumu */
  paymentStatus: PaymentStatus;
  /** Assigned driver - Atanan sürücü */
  assignedDriver?: DriverBasicInfo;
  /** Driver assigned timestamp - Sürücü atama zamanı */
  driverAssignedAt?: Date;
  /** Special notes from customer - Müşteriden özel notlar */
  customerNotes?: string;
  /** Internal operator notes - Dahili operatör notları */
  operatorNotes?: string;
  /** Cancellation reason - İptal nedeni */
  cancellationReason?: string;
  /** Cancelled by - İptal eden */
  cancelledBy?: 'customer' | 'operator' | 'system';
  /** Created timestamp - Oluşturulma zamanı */
  createdAt: Date;
  /** Updated timestamp - Güncellenme zamanı */
  updatedAt: Date;
  /** Confirmed timestamp - Onaylama zamanı */
  confirmedAt?: Date;
  /** Completed timestamp - Tamamlanma zamanı */
  completedAt?: Date;
  /** Cancelled timestamp - İptal zamanı */
  cancelledAt?: Date;
}

// ==================== POPULAR ROUTES ====================

/**
 * Pre-configured popular transfer routes
 * Önceden yapılandırılmış popüler transfer rotaları
 */
export interface PopularRoute {
  /** Unique route identifier - Benzersiz rota kimliği */
  id: string;
  /** Route name - Rota adı */
  name: string;
  /** English route name - İngilizce rota adı */
  nameEn: string;
  /** Route category - Rota kategorisi */
  category: 'airport' | 'city-to-city' | 'tourist-attraction' | 'cruise-port' | 'other';
  /** Pickup location - Alış konumu */
  pickupLocation: TransferLocation;
  /** Dropoff location - Bırakış konumu */
  dropoffLocation: TransferLocation;
  /** Distance in kilometers - Kilometre cinsinden mesafe */
  distance: number;
  /** Estimated duration in minutes - Tahmini süre (dakika) */
  estimatedDuration: number;
  /** Base price (before vehicle multiplier) - Taban fiyat (araç çarpanı öncesi) */
  basePrice: number;
  /** Dynamic pricing by time - Zamana göre dinamik fiyatlandırma */
  dynamicPricing?: {
    peakHours: {
      multiplier: number;
      hours: number[]; // Hours of day - Günün saatleri
    };
    weekendMultiplier: number;
    holidayMultiplier: number;
  };
  /** Popular flag - Popüler işareti */
  popular: boolean;
  /** Display order - Görüntüleme sırası */
  displayOrder: number;
  /** Total bookings for this route - Bu rota için toplam rezervasyon */
  totalBookings: number;
  /** Thumbnail image - Küçük resim */
  thumbnail?: string;
  /** Route description - Rota açıklaması */
  description?: string;
}

/**
 * Pre-configured airport routes
 * Önceden yapılandırılmış havalimanı rotaları
 */
export interface AirportRoute extends PopularRoute {
  /** Airport code - Havalimanı kodu */
  airportCode: 'IST' | 'SAW' | 'ESB' | 'ADB' | 'AYT' | 'DLM' | 'BJV' | 'other';
  /** Airport name - Havalimanı adı */
  airportName: string;
  /** Terminals served - Hizmet verilen terminaller */
  terminals: string[];
  /** Destination area - Varış bölgesi */
  destinationArea: string;
  /** Meet & greet recommended - Karşılama hizmeti öneriliyor */
  meetGreetRecommended: boolean;
}

// ==================== DRIVER MANAGEMENT ====================

/**
 * Driver status
 * Sürücü durumu
 */
export type DriverStatus = 'available' | 'busy' | 'off-duty' | 'on-break';

/**
 * Driver license types
 * Sürücü belgesi tipleri
 */
export type DriverLicenseClass = 'B' | 'D' | 'DE';

/**
 * Complete driver entity
 * Tam sürücü varlığı
 */
export interface Driver {
  /** Unique driver identifier - Benzersiz sürücü kimliği */
  id: string;
  /** Partner/Company ID - Partner/Firma kimliği */
  partnerId: string;
  /** Full name - Ad soyad */
  name: string;
  /** Email address - E-posta adresi */
  email: string;
  /** Phone number - Telefon numarası */
  phoneNumber: string;
  /** Profile photo - Profil fotoğrafı */
  avatar?: string;
  /** Date of birth - Doğum tarihi */
  dateOfBirth: Date;
  /** National ID number - TC Kimlik numarası */
  nationalId: string;
  /** Driver's license information - Sürücü belgesi bilgileri */
  license: {
    number: string;
    class: DriverLicenseClass[];
    issueDate: Date;
    expiryDate: Date;
    issuingAuthority: string;
    verified: boolean;
  };
  /** Psychotechnical certificate - Psikoteknik belgesi */
  psychotechCertificate: {
    number: string;
    issueDate: Date;
    expiryDate: Date;
    verified: boolean;
  };
  /** SRC4 professional competence certificate - SRC4 mesleki yeterlilik belgesi */
  src4License: {
    number: string;
    issueDate: Date;
    expiryDate: Date;
    verified: boolean;
  };
  /** Languages spoken - Konuşulan diller */
  languages: string[];
  /** Currently assigned vehicle ID - Şu anda atanmış araç kimliği */
  assignedVehicleId?: string;
  /** Current availability status - Güncel müsaitlik durumu */
  status: DriverStatus;
  /** Performance statistics - Performans istatistikleri */
  stats: {
    totalTransfers: number;
    completedTransfers: number;
    cancelledTransfers: number;
    rating: number;
    ratingCount: number;
    onTimePerformance: number;
    totalKilometers: number;
    totalRevenue: number;
  };
  /** Working schedule - Çalışma programı */
  schedule?: {
    workDays: number[]; // 0-6 (Sunday-Saturday) - Pazar-Cumartesi
    startTime: string; // HH:mm format
    endTime: string; // HH:mm format
  };
  /** Emergency contact - Acil durum irtibatı */
  emergencyContact: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };
  /** Account status - Hesap durumu */
  accountStatus: 'active' | 'suspended' | 'inactive';
  /** Created timestamp - Oluşturulma zamanı */
  createdAt: Date;
  /** Updated timestamp - Güncellenme zamanı */
  updatedAt: Date;
}

// ==================== TRANSFER WIZARD (6 STEPS) ====================

/**
 * Step 1: Vehicle category and basic info
 * Adım 1: Araç kategorisi ve temel bilgiler
 */
export interface TransferWizardStep1 {
  /** Vehicle category selection - Araç kategorisi seçimi */
  category: VehicleCategory;
  /** Vehicle type selection - Araç tipi seçimi */
  vehicleType: VehicleTypeId;
  /** Vehicle brand - Araç markası */
  brand: string;
  /** Vehicle model - Araç modeli */
  model: string;
  /** Manufacturing year - Üretim yılı */
  year: number;
  /** License plate - Plaka */
  licensePlate: string;
}

/**
 * Step 2: Vehicle capacity and features
 * Adım 2: Araç kapasitesi ve özellikleri
 */
export interface TransferWizardStep2 {
  /** Capacity details - Kapasite detayları */
  capacity: VehicleCapacity;
  /** Features and amenities - Özellikler ve donanımlar */
  features: VehicleFeatures;
  /** Vehicle description - Araç açıklaması */
  description: string;
  /** English description - İngilizce açıklama */
  descriptionEn: string;
}

/**
 * Step 3: Photos upload
 * Adım 3: Fotoğraf yükleme
 */
export interface TransferWizardStep3 {
  /** Vehicle photos - Araç fotoğrafları */
  photos: VehiclePhoto[];
  /** Primary photo index - Ana fotoğraf indeksi */
  primaryPhotoIndex: number;
  /** Upload progress - Yükleme ilerlemesi */
  uploadProgress?: {
    currentFile: string;
    progress: number;
    totalFiles: number;
  };
}

/**
 * Step 4: Service areas and popular routes
 * Adım 4: Hizmet bölgeleri ve popüler rotalar
 */
export interface TransferWizardStep4 {
  /** Service areas (cities/regions) - Hizmet bölgeleri (şehirler/bölgeler) */
  serviceAreas: string[];
  /** Supported routes - Desteklenen rotalar */
  supportedRoutes: string[]; // Popular route IDs - Popüler rota kimlikleri
  /** Custom pricing per route - Rota başına özel fiyatlandırma */
  customRoutePricing?: {
    routeId: string;
    customMultiplier: number;
  }[];
  /** Airport service enabled - Havalimanı hizmeti aktif */
  airportServiceEnabled: boolean;
  /** Supported airports - Desteklenen havalimanları */
  supportedAirports?: string[];
}

/**
 * Step 5: Legal documents and compliance
 * Adım 5: Yasal belgeler ve uyumluluk
 */
export interface TransferWizardStep5 {
  /** Legal and compliance information - Yasal ve uyumluluk bilgileri */
  legalInfo: VehicleLegalInfo;
  /** Document uploads - Belge yüklemeleri */
  documents: {
    tourismLicenseDoc?: File;
    insuranceDoc?: File;
    inspectionDoc?: File;
    vehicleRegistration?: File;
  };
  /** Verification status - Doğrulama durumu */
  verificationStatus?: {
    tourismLicense: boolean;
    insurance: boolean;
    inspection: boolean;
    registration: boolean;
  };
}

/**
 * Step 6: Pricing and review
 * Adım 6: Fiyatlandırma ve gözden geçirme
 */
export interface TransferWizardStep6 {
  /** Pricing configuration - Fiyatlandırma yapılandırması */
  pricing: VehiclePricing;
  /** Agree to terms and conditions - Şartları ve koşulları kabul et */
  agreeToTerms: boolean;
  /** Agree to commission structure - Komisyon yapısını kabul et */
  agreeToCommission: boolean;
  /** Additional notes - Ek notlar */
  additionalNotes?: string;
}

/**
 * Complete transfer wizard state
 * Tam transfer sihirbazı durumu
 */
export interface TransferWizardState {
  /** Current step (1-6) - Güncel adım */
  currentStep: number;
  /** Total steps - Toplam adım sayısı */
  totalSteps: 6;
  /** Form data for each step - Her adım için form verisi */
  formData: {
    step1: Partial<TransferWizardStep1>;
    step2: Partial<TransferWizardStep2>;
    step3: Partial<TransferWizardStep3>;
    step4: Partial<TransferWizardStep4>;
    step5: Partial<TransferWizardStep5>;
    step6: Partial<TransferWizardStep6>;
  };
  /** Completed steps - Tamamlanan adımlar */
  completedSteps: number[];
  /** Validation errors - Doğrulama hataları */
  errors: Record<number, ValidationError[]>;
  /** Draft save info - Taslak kayıt bilgisi */
  draftData?: {
    savedAt: Date;
    autoSaveEnabled: boolean;
    lastSaveId: string;
  };
}

/**
 * Validation error structure
 * Doğrulama hatası yapısı
 */
export interface ValidationError {
  /** Field name - Alan adı */
  field: string;
  /** Error message - Hata mesajı */
  message: string;
  /** Error code - Hata kodu */
  code?: string;
}

// ==================== ANALYTICS & REPORTING ====================

/**
 * Revenue analytics by route
 * Rotaya göre gelir analitiği
 */
export interface RouteRevenue {
  /** Route ID - Rota kimliği */
  routeId: string;
  /** Route name - Rota adı */
  routeName: string;
  /** Total bookings - Toplam rezervasyon */
  totalBookings: number;
  /** Total revenue - Toplam gelir */
  totalRevenue: number;
  /** Average price - Ortalama fiyat */
  averagePrice: number;
  /** Revenue trend - Gelir trendi */
  revenueTrend: number; // Percentage change - Yüzde değişim
  /** Popular time slots - Popüler zaman dilimleri */
  popularTimeSlots: {
    hour: number;
    bookingCount: number;
  }[];
}

/**
 * Revenue analytics by vehicle type
 * Araç tipine göre gelir analitiği
 */
export interface VehicleTypeRevenue {
  /** Vehicle type - Araç tipi */
  vehicleType: VehicleTypeId;
  /** Total bookings - Toplam rezervasyon */
  totalBookings: number;
  /** Total revenue - Toplam gelir */
  totalRevenue: number;
  /** Average price - Ortalama fiyat */
  averagePrice: number;
  /** Utilization rate - Kullanım oranı */
  utilizationRate: number;
  /** Revenue per kilometer - Kilometre başı gelir */
  revenuePerKm: number;
}

/**
 * Driver performance metrics
 * Sürücü performans metrikleri
 */
export interface DriverPerformance {
  /** Driver ID - Sürücü kimliği */
  driverId: string;
  /** Driver name - Sürücü adı */
  driverName: string;
  /** Total transfers - Toplam transferler */
  totalTransfers: number;
  /** Completed transfers - Tamamlanan transferler */
  completedTransfers: number;
  /** Cancelled transfers - İptal edilen transferler */
  cancelledTransfers: number;
  /** Average rating - Ortalama puan */
  averageRating: number;
  /** On-time percentage - Zamanında varış yüzdesi */
  onTimePercentage: number;
  /** Total kilometers - Toplam kilometre */
  totalKilometers: number;
  /** Total revenue generated - Toplam gelir */
  totalRevenue: number;
  /** Average revenue per transfer - Transfer başı ortalama gelir */
  averageRevenuePerTransfer: number;
  /** Customer satisfaction score - Müşteri memnuniyet skoru */
  satisfactionScore: number;
}

/**
 * On-time performance metrics
 * Zamanında varış performans metrikleri
 */
export interface OnTimeMetrics {
  /** Total transfers - Toplam transferler */
  totalTransfers: number;
  /** On-time transfers - Zamanında transferler */
  onTimeTransfers: number;
  /** On-time percentage - Zamanında yüzde */
  onTimePercentage: number;
  /** Average delay (minutes) - Ortalama gecikme (dakika) */
  averageDelay: number;
  /** Breakdown by reason - Nedene göre dökümü */
  delayReasons: {
    traffic: number;
    weather: number;
    vehicleIssue: number;
    driverLate: number;
    other: number;
  };
}

/**
 * Transfer analytics dashboard
 * Transfer analitiği dashboard'u
 */
export interface TransferAnalytics {
  /** Date range for analytics - Analiz tarih aralığı */
  dateRange: {
    start: Date;
    end: Date;
  };
  /** Overview metrics - Genel bakış metrikleri */
  overview: {
    totalBookings: number;
    totalRevenue: number;
    totalKilometers: number;
    averageBookingValue: number;
    totalCustomers: number;
    repeatCustomerRate: number;
    cancellationRate: number;
  };
  /** Revenue by route - Rotaya göre gelir */
  revenueByRoute: RouteRevenue[];
  /** Revenue by vehicle type - Araç tipine göre gelir */
  revenueByVehicleType: VehicleTypeRevenue[];
  /** Popular routes - Popüler rotalar */
  popularRoutes: {
    routeId: string;
    routeName: string;
    bookingCount: number;
    trend: number;
  }[];
  /** Driver performance - Sürücü performansı */
  driverPerformance: DriverPerformance[];
  /** On-time metrics - Zamanında varış metrikleri */
  onTimeMetrics: OnTimeMetrics;
  /** Chart data - Grafik verisi */
  chartData: {
    revenue: ChartDataPoint[];
    bookings: ChartDataPoint[];
    routes: ChartDataPoint[];
  };
}

/**
 * Chart data point
 * Grafik veri noktası
 */
export interface ChartDataPoint {
  /** Date label - Tarih etiketi */
  date: string;
  /** Value - Değer */
  value: number;
  /** Additional label - Ek etiket */
  label?: string;
  /** Trend indicator - Trend göstergesi */
  trend?: number;
}

// ==================== API RESPONSES ====================

/**
 * Generic API response wrapper
 * Genel API yanıt sarmalayıcı
 */
export interface APIResponse<T> {
  /** Success flag - Başarı işareti */
  success: boolean;
  /** Response data - Yanıt verisi */
  data?: T;
  /** Error message - Hata mesajı */
  error?: string;
  /** Additional message - Ek mesaj */
  message?: string;
  /** Timestamp - Zaman damgası */
  timestamp: Date;
}

/**
 * Paginated response
 * Sayfalandırılmış yanıt
 */
export interface PaginatedResponse<T> {
  /** Items in current page - Mevcut sayfadaki öğeler */
  items: T[];
  /** Pagination info - Sayfalandırma bilgisi */
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Vehicle availability response
 * Araç müsaitlik yanıtı
 */
export interface VehicleAvailabilityResponse {
  /** Available vehicles - Müsait araçlar */
  availableVehicles: TransferVehicle[];
  /** Route information - Rota bilgisi */
  route: TransferRoute;
  /** Pricing for each vehicle - Her araç için fiyatlandırma */
  pricing: {
    vehicleId: string;
    basePrice: number;
    totalPrice: number;
  }[];
}

/**
 * Booking confirmation response
 * Rezervasyon onay yanıtı
 */
export interface BookingConfirmationResponse {
  /** Booking details - Rezervasyon detayları */
  booking: TransferBooking;
  /** Confirmation code - Onay kodu */
  confirmationCode: string;
  /** QR code for booking - Rezervasyon QR kodu */
  qrCode?: string;
  /** Payment link (if not paid) - Ödeme linki (ödenmemişse) */
  paymentLink?: string;
}

// ==================== FILTERS & SEARCH ====================

/**
 * Transfer booking filters
 * Transfer rezervasyon filtreleri
 */
export interface TransferBookingFilters {
  /** Status filter - Durum filtresi */
  status?: TransferBookingStatus[];
  /** Payment status filter - Ödeme durumu filtresi */
  paymentStatus?: PaymentStatus[];
  /** Vehicle type filter - Araç tipi filtresi */
  vehicleType?: VehicleTypeId[];
  /** Date range filter - Tarih aralığı filtresi */
  dateRange?: {
    start: Date;
    end: Date;
  };
  /** Route filter - Rota filtresi */
  routeId?: string[];
  /** Driver filter - Sürücü filtresi */
  driverId?: string[];
  /** Customer search - Müşteri arama */
  customerSearch?: string;
  /** Reference number search - Referans numarası arama */
  referenceNumber?: string;
}

/**
 * Vehicle search filters
 * Araç arama filtreleri
 */
export interface VehicleSearchFilters {
  /** Category filter - Kategori filtresi */
  category?: VehicleCategory[];
  /** Minimum passenger capacity - Minimum yolcu kapasitesi */
  minPassengers?: number;
  /** Status filter - Durum filtresi */
  status?: VehicleStatus[];
  /** Feature requirements - Özellik gereksinimleri */
  requiredFeatures?: (keyof VehicleFeatures)[];
  /** Service area filter - Hizmet bölgesi filtresi */
  serviceArea?: string;
  /** Owner filter - Sahip filtresi */
  ownerId?: string;
}

/**
 * Sort options
 * Sıralama seçenekleri
 */
export interface SortOption {
  /** Field to sort by - Sıralama alanı */
  field: string;
  /** Sort direction - Sıralama yönü */
  direction: 'asc' | 'desc';
}

// ==================== NOTIFICATIONS ====================

/**
 * Notification types for transfer system
 * Transfer sistemi için bildirim tipleri
 */
export type TransferNotificationType =
  | 'booking-received'
  | 'booking-confirmed'
  | 'driver-assigned'
  | 'transfer-started'
  | 'transfer-completed'
  | 'booking-cancelled'
  | 'payment-received'
  | 'flight-delayed'
  | 'driver-delayed';

/**
 * Notification entity
 * Bildirim varlığı
 */
export interface TransferNotification {
  /** Notification ID - Bildirim kimliği */
  id: string;
  /** Notification type - Bildirim tipi */
  type: TransferNotificationType;
  /** Recipient user ID - Alıcı kullanıcı kimliği */
  recipientId: string;
  /** Related booking ID - İlgili rezervasyon kimliği */
  bookingId?: string;
  /** Notification title - Bildirim başlığı */
  title: string;
  /** Notification message - Bildirim mesajı */
  message: string;
  /** Read status - Okunma durumu */
  isRead: boolean;
  /** Created timestamp - Oluşturulma zamanı */
  createdAt: Date;
  /** Additional data - Ek veri */
  metadata?: Record<string, any>;
}

// ==================== REVIEWS & RATINGS ====================

/**
 * Transfer review and rating
 * Transfer değerlendirme ve puanlama
 */
export interface TransferReview {
  /** Review ID - Değerlendirme kimliği */
  id: string;
  /** Booking ID - Rezervasyon kimliği */
  bookingId: string;
  /** Customer ID - Müşteri kimliği */
  customerId: string;
  /** Customer name - Müşteri adı */
  customerName: string;
  /** Vehicle ID - Araç kimliği */
  vehicleId: string;
  /** Driver ID - Sürücü kimliği */
  driverId: string;
  /** Overall rating (1-5) - Genel puan (1-5) */
  overallRating: number;
  /** Category ratings - Kategori puanları */
  ratings: {
    vehicleCleanliness: number;
    driverProfessionalism: number;
    onTimeArrival: number;
    comfort: number;
    valueForMoney: number;
  };
  /** Review comment - Değerlendirme yorumu */
  comment?: string;
  /** Photos attached to review - Değerlendirmeye eklenen fotoğraflar */
  photos?: string[];
  /** Response from operator - Operatörden yanıt */
  response?: {
    message: string;
    respondedAt: Date;
    respondedBy: string;
  };
  /** Created timestamp - Oluşturulma zamanı */
  createdAt: Date;
  /** Helpful count - Yararlı sayısı */
  helpfulCount: number;
  /** Verified transfer flag - Doğrulanmış transfer işareti */
  verified: boolean;
}

// ==================== DISCOUNT & PROMOTION ====================

/**
 * Discount code types
 * İndirim kodu tipleri
 */
export type DiscountType = 'percentage' | 'fixed-amount' | 'route-specific';

/**
 * Discount code entity
 * İndirim kodu varlığı
 */
export interface DiscountCode {
  /** Code string - Kod dizesi */
  code: string;
  /** Discount type - İndirim tipi */
  type: DiscountType;
  /** Discount value - İndirim değeri */
  value: number;
  /** Minimum booking amount - Minimum rezervasyon tutarı */
  minBookingAmount?: number;
  /** Valid from date - Geçerlilik başlangıç tarihi */
  validFrom: Date;
  /** Valid until date - Geçerlilik bitiş tarihi */
  validUntil: Date;
  /** Usage limit - Kullanım limiti */
  usageLimit?: number;
  /** Current usage count - Mevcut kullanım sayısı */
  usageCount: number;
  /** Applicable routes - Uygulanabilir rotalar */
  applicableRoutes?: string[];
  /** Applicable vehicle types - Uygulanabilir araç tipleri */
  applicableVehicleTypes?: VehicleTypeId[];
  /** Active status - Aktif durumu */
  isActive: boolean;
}

// ==================== EXPORTS ====================

export type {
  // Re-export all types for convenience
};
