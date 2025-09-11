// Comprehensive Mock Data for Travel Platform

export const TURKEY_FLIGHTS = [
  {
    id: 'TK001',
    airline: 'Turkish Airlines',
    logo: '🇹🇷',
    from: 'İstanbul (IST)',
    to: 'Antalya (AYT)',
    departure: '08:30',
    arrival: '10:15',
    duration: '1s 45d',
    price: 450,
    originalPrice: 580,
    type: 'Direkt',
    aircraft: 'Boeing 737-800',
    amenities: ['WiFi', 'Yemek', 'Eğlence'],
    availability: 12
  },
  {
    id: 'PC002',
    airline: 'Pegasus Airlines',
    logo: '✈️',
    from: 'İstanbul (SAW)',
    to: 'İzmir (ADB)',
    departure: '14:20',
    arrival: '15:35',
    duration: '1s 15d',
    price: 320,
    originalPrice: 420,
    type: 'Direkt',
    aircraft: 'Airbus A320',
    amenities: ['WiFi', 'İkram'],
    availability: 8
  },
  {
    id: 'TK003',
    airline: 'Turkish Airlines',
    logo: '🇹🇷',
    from: 'Ankara (ESB)',
    to: 'Trabzon (TZX)',
    departure: '11:45',
    arrival: '13:20',
    duration: '1s 35d',
    price: 380,
    originalPrice: 480,
    type: 'Direkt',
    aircraft: 'Boeing 737-900',
    amenities: ['WiFi', 'Yemek', 'Eğlence'],
    availability: 15
  },
  {
    id: 'SV004',
    airline: 'SunExpress',
    logo: '☀️',
    from: 'İzmir (ADB)',
    to: 'Antalya (AYT)',
    departure: '16:00',
    arrival: '17:20',
    duration: '1s 20d',
    price: 290,
    originalPrice: 380,
    type: 'Direkt',
    aircraft: 'Boeing 737-800',
    amenities: ['WiFi', 'İkram'],
    availability: 6
  }
];

export const INTERNATIONAL_FLIGHTS = [
  {
    id: 'LH101',
    airline: 'Lufthansa',
    logo: '🇩🇪',
    from: 'İstanbul (IST)',
    to: 'Frankfurt (FRA)',
    departure: '13:45',
    arrival: '16:25',
    duration: '3s 40d',
    price: 1250,
    originalPrice: 1450,
    type: 'Direkt',
    aircraft: 'Airbus A330',
    amenities: ['WiFi', 'Yemek', 'Eğlence', 'Business Lounge'],
    availability: 9
  },
  {
    id: 'AF102',
    airline: 'Air France',
    logo: '🇫🇷',
    from: 'İstanbul (IST)',
    to: 'Paris (CDG)',
    departure: '10:30',
    arrival: '13:15',
    duration: '3s 45d',
    price: 1180,
    originalPrice: 1380,
    type: 'Direkt',
    aircraft: 'Boeing 777-300',
    amenities: ['WiFi', 'Yemek', 'Eğlence'],
    availability: 14
  }
];

export const TURKEY_HOTELS = [
  {
    id: 'H001',
    name: 'Four Seasons Hotel Istanbul',
    location: 'Sultanahmet, İstanbul',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&q=90',
    rating: 4.9,
    reviews: 2847,
    price: 4500,
    originalPrice: 5200,
    currency: '₺',
    amenities: ['Spa', 'Havuz', 'WiFi', 'Kahvaltı', 'Gym', 'Concierge'],
    stars: 5,
    availability: true,
    checkIn: '15:00',
    checkOut: '12:00'
  },
  {
    id: 'H002',
    name: 'Museum Hotel Cappadocia',
    location: 'Uçhisar, Kapadokya',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&q=90',
    rating: 4.8,
    reviews: 1642,
    price: 3200,
    originalPrice: 3800,
    currency: '₺',
    amenities: ['Balon Turu', 'Spa', 'WiFi', 'Restoran', 'Terrace'],
    stars: 5,
    availability: true,
    checkIn: '14:00',
    checkOut: '11:00'
  },
  {
    id: 'H003',
    name: 'Titanic Deluxe Belek',
    location: 'Belek, Antalya',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&q=90',
    rating: 4.7,
    reviews: 3521,
    price: 2800,
    originalPrice: 3400,
    currency: '₺',
    amenities: ['All Inclusive', 'Plaj', 'Havuz', 'Spa', 'Aquapark', 'Golf'],
    stars: 5,
    availability: true,
    checkIn: '15:00',
    checkOut: '12:00'
  }
];

export const INTERNATIONAL_HOTELS = [
  {
    id: 'H101',
    name: 'Hotel de Crillon',
    location: 'Paris, Fransa',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&q=90',
    rating: 4.8,
    reviews: 1890,
    price: 850,
    originalPrice: 1050,
    currency: '€',
    amenities: ['Spa', 'Restoran', 'WiFi', 'Concierge', 'Bar'],
    stars: 5,
    availability: true,
    checkIn: '15:00',
    checkOut: '12:00'
  }
];

export const TURKEY_RESTAURANTS = [
  {
    id: 'R001',
    name: 'Pandeli',
    location: 'Eminönü, İstanbul',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&q=90',
    cuisine: 'Osmanlı Mutfağı',
    rating: 4.6,
    reviews: 1247,
    priceRange: '₺₺₺',
    averagePrice: 180,
    specialties: ['Kuzu Tandır', 'İmam Bayıldı', 'Baklava'],
    openHours: '12:00 - 22:00',
    reservationRequired: true
  },
  {
    id: 'R002',
    name: 'Çiya Sofrası',
    location: 'Kadıköy, İstanbul',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&q=90',
    cuisine: 'Anadolu Mutfağı',
    rating: 4.7,
    reviews: 2156,
    priceRange: '₺₺',
    averagePrice: 120,
    specialties: ['Kebap Çeşitleri', 'Meze', 'Tatlılar'],
    openHours: '11:00 - 23:00',
    reservationRequired: false
  }
];

export const TURKEY_TOURS = [
  {
    id: 'T001',
    name: 'Kapadokya Balon Turu',
    location: 'Kapadokya, Nevşehir',
    image: 'https://images.unsplash.com/photo-1570939274719-c60ee3bf5cd9?w=800&h=600&q=90',
    duration: '3 saat',
    price: 850,
    originalPrice: 1200,
    currency: '₺',
    rating: 4.9,
    reviews: 3847,
    includes: ['Sıcak Hava Balonu', 'Kahvaltı', 'Transfer', 'Sertifika'],
    maxParticipants: 12,
    difficulty: 'Kolay',
    languages: ['Türkçe', 'İngilizce']
  },
  {
    id: 'T002',
    name: 'Pamukkale Travertenleri ve Hierapolis',
    location: 'Denizli',
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d0deeb?w=800&h=600&q=90',
    duration: '6 saat',
    price: 320,
    originalPrice: 450,
    currency: '₺',
    rating: 4.6,
    reviews: 2134,
    includes: ['Rehberli Tur', 'Öğle Yemeği', 'Transfer', 'Giriş Ücreti'],
    maxParticipants: 25,
    difficulty: 'Orta',
    languages: ['Türkçe', 'İngilizce', 'Almanca']
  }
];

export const CAR_RENTALS = [
  {
    id: 'C001',
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&q=90',
    transmission: 'Manuel',
    fuel: 'Benzin',
    seats: 5,
    luggage: 3,
    pricePerDay: 150,
    originalPrice: 180,
    currency: '₺',
    rating: 4.5,
    company: 'Avis',
    location: 'İstanbul Havalimanı',
    features: ['Klima', 'Airbag', 'ABS', 'Bluetooth'],
    mileage: 'Unlimited'
  },
  {
    id: 'C002',
    brand: 'Renault',
    model: 'Clio',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&q=90',
    transmission: 'Otomatik',
    fuel: 'Benzin',
    seats: 5,
    luggage: 2,
    pricePerDay: 120,
    originalPrice: 150,
    currency: '₺',
    rating: 4.3,
    company: 'Budget',
    location: 'Antalya Havalimanı',
    features: ['Klima', 'Airbag', 'GPS', 'USB'],
    mileage: 'Unlimited'
  }
];

// Booking flow states
export const BOOKING_STEPS = {
  SEARCH: 'search',
  SELECT: 'select',
  DETAILS: 'details',
  PAYMENT: 'payment',
  CONFIRMATION: 'confirmation'
};

// Payment methods
export const PAYMENT_METHODS = [
  { id: 'credit', name: 'Kredi Kartı', icon: '💳' },
  { id: 'debit', name: 'Banka Kartı', icon: '🏦' },
  { id: 'paypal', name: 'PayPal', icon: '🅿️' },
  { id: 'apple', name: 'Apple Pay', icon: '🍎' },
  { id: 'google', name: 'Google Pay', icon: '🔍' }
];