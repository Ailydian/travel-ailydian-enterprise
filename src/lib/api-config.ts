// API Configuration for Travel Data
export const API_CONFIG = {
  // Amadeus API - Free tier available
  AMADEUS: {
    BASE_URL: 'https://test.api.amadeus.com/v2',
    CLIENT_ID: process.env.NEXT_PUBLIC_AMADEUS_CLIENT_ID || '',
    CLIENT_SECRET: process.env.AMADEUS_CLIENT_SECRET || '',
    endpoints: {
      flights: '/shopping/flight-offers',
      hotels: '/shopping/hotel-offers',
      locations: '/reference-data/locations',
      destinations: '/reference-data/locations/cities'
    }
  },
  
  // Mock API for development
  MOCK_API: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.holiday.ailydian.com',
    endpoints: {
      flights: '/api/flights',
      hotels: '/api/hotels',
      cars: '/api/cars',
      restaurants: '/api/restaurants',
      tours: '/api/tours'
    }
  },

  // Turkey Tourism Data
  TURKEY_DATA: {
    // Turkish cities and destinations
    cities: [
      'İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa', 'Adana', 'Konya', 
      'Gaziantep', 'Mersin', 'Kayseri', 'Eskişehir', 'Diyarbakır', 'Samsun',
      'Denizli', 'Malatya', 'Kahramanmaraş', 'Van', 'Batman', 'Elazığ', 'Erzurum'
    ],
    popular_destinations: [
      'Kapadokya', 'Pamukkale', 'Bodrum', 'Fethiye', 'Kas', 'Marmaris',
      'Kusadası', 'Çeşme', 'Alanya', 'Side', 'Belek', 'Kemer'
    ]
  },

  // International destinations
  INTERNATIONAL_DATA: {
    popular_countries: [
      'Yunanistan', 'İtalya', 'Fransa', 'İspanya', 'Almanya', 'Hollanda',
      'İngiltere', 'Avusturya', 'İsviçre', 'Çek Cumhuriyeti', 'Macaristan',
      'Polonya', 'Rusya', 'Ukrayna', 'Bulgaristan', 'Romanya', 'Hırvatistan'
    ]
  }
};

// Rate limiting and caching config
export const CACHE_CONFIG = {
  FLIGHTS: 15 * 60 * 1000, // 15 minutes
  HOTELS: 30 * 60 * 1000,  // 30 minutes
  RESTAURANTS: 60 * 60 * 1000, // 1 hour
  TOURS: 2 * 60 * 60 * 1000 // 2 hours
};