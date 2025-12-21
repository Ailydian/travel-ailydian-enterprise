/**
 * Vehicle Categories and Features Database
 * Comprehensive vehicle types for rental system
 */

import type { VehicleType, VehicleCategory } from '@/types/vehicle.types';

export interface VehicleCategoryOption {
  value: VehicleType;
  label: string;
  labelEn: string;
  category: VehicleCategory;
  description: string;
  descriptionEn: string;
  icon: string; // Lucide icon name
  popular: boolean;
  averagePrice: number; // Daily rate in TRY
  seats: number;
  exampleBrands: string[];
}

export const VEHICLE_CATEGORIES: VehicleCategoryOption[] = [
  {
    value: 'economy-sedan',
    label: 'Ekonomik Sedan',
    labelEn: 'Economy Sedan',
    category: 'economy',
    description: 'Uygun fiyatlı, yakıt tasarruflu şehir içi araçlar',
    descriptionEn: 'Affordable, fuel-efficient city cars',
    icon: 'Car',
    popular: true,
    averagePrice: 350,
    seats: 5,
    exampleBrands: ['Renault Symbol', 'Fiat Egea', 'Hyundai Accent'],
  },
  {
    value: 'comfort-sedan',
    label: 'Konfor Sedan',
    labelEn: 'Comfort Sedan',
    category: 'comfort',
    description: 'Geniş ve konforlu orta segment araçlar',
    descriptionEn: 'Spacious and comfortable mid-size cars',
    icon: 'Car',
    popular: true,
    averagePrice: 550,
    seats: 5,
    exampleBrands: ['Volkswagen Passat', 'Toyota Corolla', 'Honda Civic'],
  },
  {
    value: 'premium-sedan',
    label: 'Premium Sedan',
    labelEn: 'Premium Sedan',
    category: 'premium',
    description: 'Üst segment konforlu sedan araçlar',
    descriptionEn: 'Upper-class comfortable sedans',
    icon: 'Gem',
    popular: true,
    averagePrice: 850,
    seats: 5,
    exampleBrands: ['Audi A4', 'BMW 3 Serisi', 'Mercedes C-Class'],
  },
  {
    value: 'luxury-sedan',
    label: 'Lüks Sedan',
    labelEn: 'Luxury Sedan',
    category: 'luxury',
    description: 'Üst düzey lüks sedan araçlar',
    descriptionEn: 'High-end luxury sedans',
    icon: 'Crown',
    popular: false,
    averagePrice: 1500,
    seats: 5,
    exampleBrands: ['Mercedes S-Class', 'BMW 7 Serisi', 'Audi A8'],
  },
  {
    value: 'economy-suv',
    label: 'Ekonomik SUV',
    labelEn: 'Economy SUV',
    category: 'suv',
    description: 'Uygun fiyatlı SUV araçlar',
    descriptionEn: 'Affordable SUV vehicles',
    icon: 'Truck',
    popular: true,
    averagePrice: 600,
    seats: 5,
    exampleBrands: ['Dacia Duster', 'Renault Captur', 'Hyundai Creta'],
  },
  {
    value: 'premium-suv',
    label: 'Premium SUV',
    labelEn: 'Premium SUV',
    category: 'suv',
    description: 'Lüks ve geniş SUV araçlar',
    descriptionEn: 'Luxury and spacious SUV vehicles',
    icon: 'Truck',
    popular: true,
    averagePrice: 1200,
    seats: 7,
    exampleBrands: ['BMW X5', 'Mercedes GLE', 'Audi Q7', 'Range Rover'],
  },
  {
    value: 'minivan',
    label: 'Minivan (7-9 Kişilik)',
    labelEn: 'Minivan (7-9 Seats)',
    category: 'family',
    description: 'Aileler ve gruplar için geniş minivan',
    descriptionEn: 'Spacious minivan for families and groups',
    icon: 'Users',
    popular: true,
    averagePrice: 750,
    seats: 9,
    exampleBrands: ['Volkswagen Caravelle', 'Ford Tourneo', 'Mercedes Vito'],
  },
  {
    value: 'passenger-van',
    label: 'Yolcu Minibüsü (12-17 Kişi)',
    labelEn: 'Passenger Van (12-17 Seats)',
    category: 'commercial',
    description: 'Büyük gruplar için minibüs',
    descriptionEn: 'Minibus for large groups',
    icon: 'Bus',
    popular: false,
    averagePrice: 950,
    seats: 17,
    exampleBrands: ['Mercedes Sprinter', 'Ford Transit', 'Hyundai H350'],
  },
  {
    value: 'commercial-van',
    label: 'Ticari Van',
    labelEn: 'Commercial Van',
    category: 'commercial',
    description: 'Yük taşıma ve ticari işler için',
    descriptionEn: 'For cargo transport and commercial use',
    icon: 'Package',
    popular: false,
    averagePrice: 500,
    seats: 3,
    exampleBrands: ['Ford Transit Van', 'Mercedes Sprinter Van', 'Fiat Ducato'],
  },
  {
    value: 'pickup-truck',
    label: 'Kamyonet',
    labelEn: 'Pickup Truck',
    category: 'commercial',
    description: 'Açık kasa yük taşıma aracı',
    descriptionEn: 'Open bed cargo vehicle',
    icon: 'Truck',
    popular: false,
    averagePrice: 650,
    seats: 5,
    exampleBrands: ['Ford Ranger', 'Toyota Hilux', 'Mitsubishi L200'],
  },
  {
    value: 'convertible',
    label: 'Cabrio',
    labelEn: 'Convertible',
    category: 'luxury',
    description: 'Açık tavan lüks araçlar',
    descriptionEn: 'Open-top luxury vehicles',
    icon: 'Sun',
    popular: false,
    averagePrice: 1800,
    seats: 4,
    exampleBrands: ['BMW 4 Serisi Cabrio', 'Mercedes E-Class Cabrio', 'Audi A5 Cabrio'],
  },
  {
    value: 'sports-car',
    label: 'Spor Araba',
    labelEn: 'Sports Car',
    category: 'luxury',
    description: 'Yüksek performanslı spor araçlar',
    descriptionEn: 'High-performance sports vehicles',
    icon: 'Zap',
    popular: false,
    averagePrice: 2500,
    seats: 2,
    exampleBrands: ['Porsche 911', 'Chevrolet Corvette', 'Nissan GT-R'],
  },
  {
    value: 'electric-vehicle',
    label: 'Elektrikli Araç',
    labelEn: 'Electric Vehicle',
    category: 'eco',
    description: 'Tamamen elektrikli çevre dostu araçlar',
    descriptionEn: 'Fully electric eco-friendly vehicles',
    icon: 'Zap',
    popular: true,
    averagePrice: 900,
    seats: 5,
    exampleBrands: ['Tesla Model 3', 'BMW i4', 'Nissan Leaf'],
  },
  {
    value: 'hybrid',
    label: 'Hybrid Araç',
    labelEn: 'Hybrid Vehicle',
    category: 'eco',
    description: 'Benzin ve elektrik motorlu tasarruflu araçlar',
    descriptionEn: 'Petrol and electric motor efficient vehicles',
    icon: 'Leaf',
    popular: true,
    averagePrice: 700,
    seats: 5,
    exampleBrands: ['Toyota Prius', 'Honda Civic Hybrid', 'Hyundai Ioniq'],
  },
];

// Helper functions
export function getVehicleCategoryByType(type: VehicleType): VehicleCategoryOption | undefined {
  return VEHICLE_CATEGORIES.find((c) => c.value === type);
}

export function getVehicleCategoriesByCategory(category: VehicleCategory): VehicleCategoryOption[] {
  return VEHICLE_CATEGORIES.filter((c) => c.category === category);
}

export function getPopularVehicleCategories(): VehicleCategoryOption[] {
  return VEHICLE_CATEGORIES.filter((c) => c.popular);
}

export function searchVehicleCategories(query: string): VehicleCategoryOption[] {
  const lowerQuery = query.toLowerCase();
  return VEHICLE_CATEGORIES.filter(
    (c) =>
      c.label.toLowerCase().includes(lowerQuery) ||
      c.labelEn.toLowerCase().includes(lowerQuery) ||
      c.description.toLowerCase().includes(lowerQuery) ||
      c.exampleBrands.some((brand) => brand.toLowerCase().includes(lowerQuery))
  );
}

// Vehicle features database
export const VEHICLE_FEATURES = {
  // Temel Özellikler
  basic: [
    { id: 'air-conditioning', label: 'Klima', labelEn: 'Air Conditioning', popular: true },
    { id: 'abs', label: 'ABS', labelEn: 'ABS', popular: true },
    { id: 'airbags', label: 'Hava Yastıkları', labelEn: 'Airbags', popular: true },
    { id: 'power-steering', label: 'Hidrolik Direksiyon', labelEn: 'Power Steering', popular: true },
    { id: 'power-windows', label: 'Elektrikli Camlar', labelEn: 'Power Windows', popular: true },
    { id: 'central-locking', label: 'Merkezi Kilit', labelEn: 'Central Locking', popular: true },
  ],

  // Konfor Özellikleri
  comfort: [
    { id: 'leather-seats', label: 'Deri Koltuklar', labelEn: 'Leather Seats', popular: true },
    { id: 'heated-seats', label: 'Isıtmalı Koltuklar', labelEn: 'Heated Seats', popular: false },
    { id: 'cooled-seats', label: 'Havalandırmalı Koltuklar', labelEn: 'Cooled Seats', popular: false },
    { id: 'electric-seats', label: 'Elektrikli Koltuklar', labelEn: 'Electric Seats', popular: true },
    { id: 'sunroof', label: 'Sunroof', labelEn: 'Sunroof', popular: true },
    { id: 'panoramic-roof', label: 'Panoramik Tavan', labelEn: 'Panoramic Roof', popular: false },
    { id: 'cruise-control', label: 'Hız Sabitleyici', labelEn: 'Cruise Control', popular: true },
    { id: 'rain-sensor', label: 'Yağmur Sensörü', labelEn: 'Rain Sensor', popular: false },
    { id: 'light-sensor', label: 'Işık Sensörü', labelEn: 'Light Sensor', popular: false },
  ],

  // Teknoloji
  technology: [
    { id: 'gps', label: 'GPS Navigasyon', labelEn: 'GPS Navigation', popular: true },
    { id: 'bluetooth', label: 'Bluetooth', labelEn: 'Bluetooth', popular: true },
    { id: 'usb-port', label: 'USB Portu', labelEn: 'USB Port', popular: true },
    { id: 'aux-input', label: 'AUX Girişi', labelEn: 'AUX Input', popular: true },
    { id: 'apple-carplay', label: 'Apple CarPlay', labelEn: 'Apple CarPlay', popular: true },
    { id: 'android-auto', label: 'Android Auto', labelEn: 'Android Auto', popular: true },
    { id: 'touchscreen', label: 'Dokunmatik Ekran', labelEn: 'Touchscreen', popular: true },
    { id: 'rear-camera', label: 'Geri Görüş Kamerası', labelEn: 'Rear Camera', popular: true },
    { id: 'parking-sensors', label: 'Park Sensörleri', labelEn: 'Parking Sensors', popular: true },
    { id: '360-camera', label: '360° Kamera', labelEn: '360° Camera', popular: false },
  ],

  // Güvenlik
  safety: [
    { id: 'esp', label: 'ESP', labelEn: 'ESP', popular: true },
    { id: 'traction-control', label: 'Çekiş Kontrolü', labelEn: 'Traction Control', popular: true },
    { id: 'hill-assist', label: 'Yokuş Kalkış Desteği', labelEn: 'Hill Assist', popular: true },
    { id: 'blind-spot', label: 'Kör Nokta Uyarısı', labelEn: 'Blind Spot Warning', popular: false },
    { id: 'lane-assist', label: 'Şerit Takip Asistanı', labelEn: 'Lane Assist', popular: false },
    { id: 'emergency-brake', label: 'Acil Fren Asistanı', labelEn: 'Emergency Brake Assist', popular: false },
    { id: 'isofix', label: 'ISOFIX', labelEn: 'ISOFIX', popular: true },
    { id: 'alarm-system', label: 'Alarm Sistemi', labelEn: 'Alarm System', popular: true },
    { id: 'immobilizer', label: 'İmmobilizer', labelEn: 'Immobilizer', popular: true },
  ],

  // Eğlence
  entertainment: [
    { id: 'premium-sound', label: 'Premium Ses Sistemi', labelEn: 'Premium Sound System', popular: false },
    { id: 'cd-player', label: 'CD Çalar', labelEn: 'CD Player', popular: false },
    { id: 'mp3-player', label: 'MP3 Çalar', labelEn: 'MP3 Player', popular: true },
    { id: 'rear-entertainment', label: 'Arka Eğlence Sistemi', labelEn: 'Rear Entertainment', popular: false },
  ],
};
