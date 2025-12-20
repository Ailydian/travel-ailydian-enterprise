/**
 * Transfer Vehicle Types and Pricing
 * Comprehensive vehicle database for airport transfers
 */

export interface VehicleType {
  id: string;
  name: string;
  nameEn: string;
  category: 'economy' | 'comfort' | 'premium' | 'luxury' | 'group';
  capacity: {
    passengers: number;
    luggage: number;
    maxPassengers: number;
  };
  features: string[];
  image: string;
  priceMultiplier: number; // Base price multiplier
  popular: boolean;
  description: string;
  descriptionEn: string;
}

export const TRANSFER_VEHICLES: VehicleType[] = [
  {
    id: 'economy-sedan',
    name: 'Ekonomik Sedan',
    nameEn: 'Economy Sedan',
    category: 'economy',
    capacity: {
      passengers: 3,
      luggage: 2,
      maxPassengers: 4
    },
    features: [
      'Klimalı',
      'Konforlu',
      'Uygun Fiyat',
      'Profesyonel Şoför'
    ],
    image: '/vehicles/economy-sedan.jpg',
    priceMultiplier: 1.0,
    popular: true,
    description: '1-3 kişilik aileler için ideal ekonomik transfer aracı',
    descriptionEn: 'Ideal economical transfer vehicle for 1-3 person families'
  },
  {
    id: 'comfort-sedan',
    name: 'Konfor Sedan',
    nameEn: 'Comfort Sedan',
    category: 'comfort',
    capacity: {
      passengers: 3,
      luggage: 3,
      maxPassengers: 4
    },
    features: [
      'Premium Klima',
      'Geniş Bagaj',
      'WiFi',
      'Su İkramı',
      'Profesyonel Şoför'
    ],
    image: '/vehicles/comfort-sedan.jpg',
    priceMultiplier: 1.3,
    popular: true,
    description: 'Daha konforlu yolculuk için geniş bagajlı sedan',
    descriptionEn: 'Sedan with spacious luggage for more comfortable journey'
  },
  {
    id: 'vip-sedan',
    name: 'VIP Sedan',
    nameEn: 'VIP Sedan',
    category: 'premium',
    capacity: {
      passengers: 3,
      luggage: 3,
      maxPassengers: 4
    },
    features: [
      'Mercedes E-Class',
      'Deri Koltuklar',
      'WiFi',
      'Su & İçecek İkramı',
      'VIP Şoför',
      'Havlu & Mendil'
    ],
    image: '/vehicles/vip-sedan.jpg',
    priceMultiplier: 1.8,
    popular: true,
    description: 'Mercedes E-Class ile lüks ve konforlu transfer deneyimi',
    descriptionEn: 'Luxury and comfortable transfer experience with Mercedes E-Class'
  },
  {
    id: 'minivan',
    name: 'Minivan (7 Kişilik)',
    nameEn: 'Minivan (7 Seats)',
    category: 'comfort',
    capacity: {
      passengers: 6,
      luggage: 6,
      maxPassengers: 7
    },
    features: [
      'Geniş İç Mekan',
      'Klimalı',
      'Çok Bagajlı',
      'WiFi',
      'Su İkramı',
      'Profesyonel Şoför'
    ],
    image: '/vehicles/minivan.jpg',
    priceMultiplier: 1.5,
    popular: true,
    description: 'Büyük aileler ve gruplar için ideal 7 kişilik minivan',
    descriptionEn: 'Ideal 7-seater minivan for large families and groups'
  },
  {
    id: 'vip-minivan',
    name: 'VIP Minivan',
    nameEn: 'VIP Minivan',
    category: 'premium',
    capacity: {
      passengers: 6,
      luggage: 6,
      maxPassengers: 7
    },
    features: [
      'Mercedes Vito/Viano',
      'Deri Koltuklar',
      'WiFi',
      'TV & Müzik',
      'Su & İçecek İkramı',
      'VIP Şoför',
      'Geniş Bagaj'
    ],
    image: '/vehicles/vip-minivan.jpg',
    priceMultiplier: 2.2,
    popular: true,
    description: 'Mercedes Vito ile premium grup transferi',
    descriptionEn: 'Premium group transfer with Mercedes Vito'
  },
  {
    id: 'minibus-14',
    name: 'Minibüs (14 Kişilik)',
    nameEn: 'Minibus (14 Seats)',
    category: 'group',
    capacity: {
      passengers: 12,
      luggage: 12,
      maxPassengers: 14
    },
    features: [
      'Geniş Alan',
      'Klimalı',
      'Bagaj Bölmesi',
      'Konforlu Koltuklar',
      'WiFi',
      'Profesyonel Şoför'
    ],
    image: '/vehicles/minibus-14.jpg',
    priceMultiplier: 2.5,
    popular: false,
    description: 'Orta büyüklükte gruplar için 14 kişilik minibüs',
    descriptionEn: '14-seater minibus for medium-sized groups'
  },
  {
    id: 'minibus-17',
    name: 'Minibüs (17 Kişilik)',
    nameEn: 'Minibus (17 Seats)',
    category: 'group',
    capacity: {
      passengers: 15,
      luggage: 15,
      maxPassengers: 17
    },
    features: [
      'Geniş İç Mekan',
      'Klimalı',
      'Geniş Bagaj',
      'Konforlu Koltuklar',
      'WiFi',
      'Profesyonel Şoför'
    ],
    image: '/vehicles/minibus-17.jpg',
    priceMultiplier: 2.8,
    popular: false,
    description: 'Büyük gruplar için 17 kişilik minibüs',
    descriptionEn: '17-seater minibus for large groups'
  },
  {
    id: 'bus-30',
    name: 'Otobüs (30 Kişilik)',
    nameEn: 'Bus (30 Seats)',
    category: 'group',
    capacity: {
      passengers: 28,
      luggage: 28,
      maxPassengers: 30
    },
    features: [
      'Çok Geniş Alan',
      'Klimalı',
      'Bagaj Bölmesi',
      'Konforlu Koltuklar',
      'WiFi',
      'TV',
      'WC',
      'Profesyonel Şoför'
    ],
    image: '/vehicles/bus-30.jpg',
    priceMultiplier: 4.0,
    popular: false,
    description: 'Çok büyük gruplar ve organizasyonlar için 30 kişilik otobüs',
    descriptionEn: '30-seater bus for very large groups and organizations'
  },
  {
    id: 'luxury-vip',
    name: 'Lüks VIP Araç',
    nameEn: 'Luxury VIP Vehicle',
    category: 'luxury',
    capacity: {
      passengers: 3,
      luggage: 3,
      maxPassengers: 4
    },
    features: [
      'Mercedes S-Class / BMW 7 Series',
      'Deri Koltuklar',
      'Premium WiFi',
      'Premium İkram',
      'VIP Şoför',
      'Masaj Koltuğu',
      'Soğutma Dolabı',
      'Privacy Cam'
    ],
    image: '/vehicles/luxury-vip.jpg',
    priceMultiplier: 3.0,
    popular: false,
    description: 'Mercedes S-Class ile ultimate lüks transfer deneyimi',
    descriptionEn: 'Ultimate luxury transfer experience with Mercedes S-Class'
  },
  {
    id: 'vip-sprinter',
    name: 'VIP Sprinter',
    nameEn: 'VIP Sprinter',
    category: 'luxury',
    capacity: {
      passengers: 12,
      luggage: 12,
      maxPassengers: 14
    },
    features: [
      'Mercedes Sprinter VIP',
      'Deri Koltuklar',
      'LED Aydınlatma',
      'Premium WiFi',
      'TV & Müzik',
      'Minibar',
      'Premium İkram',
      'VIP Şoför'
    ],
    image: '/vehicles/vip-sprinter.jpg',
    priceMultiplier: 3.5,
    popular: false,
    description: 'VIP Mercedes Sprinter ile lüks grup transferi',
    descriptionEn: 'Luxury group transfer with VIP Mercedes Sprinter'
  }
];

// Helper functions
export function getVehicleById(id: string): VehicleType | undefined {
  return TRANSFER_VEHICLES.find(v => v.id === id);
}

export function getVehiclesByCapacity(passengers: number): VehicleType[] {
  return TRANSFER_VEHICLES
    .filter(v => v.capacity.maxPassengers >= passengers)
    .sort((a, b) => a.priceMultiplier - b.priceMultiplier);
}

export function getVehiclesByCategory(category: VehicleType['category']): VehicleType[] {
  return TRANSFER_VEHICLES.filter(v => v.category === category);
}

export function getPopularVehicles(): VehicleType[] {
  return TRANSFER_VEHICLES.filter(v => v.popular);
}

// Base pricing per km (in TRY)
export const BASE_PRICE_PER_KM = 8.5;
export const MINIMUM_PRICE = 250;

// Calculate transfer price
export function calculateTransferPrice(
  distanceKm: number,
  vehicleId: string,
  isRoundTrip: boolean = false
): number {
  const vehicle = getVehicleById(vehicleId);
  if (!vehicle) return 0;

  let basePrice = distanceKm * BASE_PRICE_PER_KM * vehicle.priceMultiplier;

  // Apply minimum price
  if (basePrice < MINIMUM_PRICE) {
    basePrice = MINIMUM_PRICE;
  }

  // Round trip discount 10%
  if (isRoundTrip) {
    return Math.round((basePrice * 2) * 0.9);
  }

  return Math.round(basePrice);
}

// Extra services
export interface ExtraService {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  iconName: 'baby' | 'child' | 'meetgreet' | 'clock' | 'shopping' | 'wifi';
  description: string;
}

export const EXTRA_SERVICES: ExtraService[] = [
  {
    id: 'baby-seat',
    name: 'Bebek Koltuğu',
    nameEn: 'Baby Seat',
    price: 50,
    iconName: 'baby',
    description: '0-4 yaş arası için güvenli bebek koltuğu'
  },
  {
    id: 'child-seat',
    name: 'Çocuk Koltuğu',
    nameEn: 'Child Seat',
    price: 50,
    iconName: 'child',
    description: '4-12 yaş arası için güvenli çocuk koltuğu'
  },
  {
    id: 'meet-greet',
    name: 'Karşılama Hizmeti',
    nameEn: 'Meet & Greet',
    price: 100,
    iconName: 'meetgreet',
    description: 'Havalimanı içinde karşılama ve yönlendirme'
  },
  {
    id: 'wait-time-30',
    name: '30 Dk Ekstra Bekleme',
    nameEn: '30 Min Extra Wait',
    price: 75,
    iconName: 'clock',
    description: 'Uçuş gecikmesi için ekstra bekleme süresi'
  },
  {
    id: 'stop-market',
    name: 'Market Durağı',
    nameEn: 'Market Stop',
    price: 100,
    iconName: 'shopping',
    description: 'Transfer sırasında market alışverişi için durak'
  },
  {
    id: 'wifi-device',
    name: 'Taşınabilir WiFi',
    nameEn: 'Portable WiFi',
    price: 150,
    iconName: 'wifi',
    description: 'Yolculuk boyunca sınırsız internet'
  }
];
