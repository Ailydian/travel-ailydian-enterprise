// Real Tourism Data API Service Manager
// Gerçek turizm verisi sağlayan API servisleri

interface HotelData {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  currency: string;
  amenities: string[];
  images: string[];
  availability: boolean;
  description: string;
}

interface FlightData {
  id: string;
  airline: string;
  from: string;
  to: string;
  departureDate: string;
  arrivalDate: string;
  price: number;
  currency: string;
  duration: string;
  stops: number;
  class: string;
}

interface RestaurantData {
  id: string;
  name: string;
  location: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  openHours: string;
  phone: string;
  specialties: string[];
  images: string[];
}

interface TourData {
  id: string;
  name: string;
  location: string;
  duration: string;
  price: number;
  currency: string;
  rating: number;
  description: string;
  includes: string[];
  highlights: string[];
  availability: boolean;
}

// İmport the complete database from the dedicated file
import { COMPLETE_TURKEY_TOURISM_DATABASE } from '../data/turkey-tourism-database';
import logger from '@/lib/logger';

// Türkiye'nin turizm bölgeleri ve şehirleri (legacy support)
export const TURKEY_TOURISM_REGIONS = {
  'Istanbul': {
    region: 'Marmara',
    highlights: ['Sultanahmet', 'Galata', 'Bosphorus', 'Beyoğlu', 'Kadıköy'],
    attractions: ['Ayasofya', 'Topkapı Sarayı', 'Kapalıçarşı', 'Galata Kulesi'],
    cuisine: ['Balık Ekmek', 'İstanbul Kebabı']
  },
  'Ankara': {
    region: 'İç Anadolu',
    highlights: ['Kızılay', 'Çankaya', 'Altındağ'],
    attractions: ['Anıtkabir', 'Ankara Kalesi', 'Anadolu Medeniyetleri Müzesi']
  },
  'Izmir': {
    region: 'Ege',
    highlights: ['Alsancak', 'Konak', 'Karşıyaka', 'Çeşme', 'Alaçatı'],
    attractions: ['Saat Kulesi', 'Kemeraltı Çarşısı', 'Efes Antik Kenti']
  },
  'Antalya': {
    region: 'Akdeniz',
    highlights: ['Kaleiçi', 'Lara', 'Konyaaltı', 'Belek', 'Side'],
    attractions: ['Aspendos', 'Perge', 'Düden Şelalesi', 'Olimpos']
  },
  'Bursa': {
    region: 'Marmara',
    highlights: ['Osmangazi', 'Nilüfer', 'Uludağ'],
    attractions: ['Yeşil Türbe', 'Ulu Cami', 'Kapalı Çarşı', 'Uludağ Kayak Merkezi']
  },
  'Adana': {
    region: 'Akdeniz',
    highlights: ['Seyhan', 'Yüreğir'],
    attractions: ['Sabancı Merkez Camii', 'Taşköprü', 'Varda Köprüsü']
  },
  'Gaziantep': {
    region: 'Güneydoğu Anadolu',
    highlights: ['Şahinbey', 'Şehitkamil'],
    attractions: ['Gaziantep Kalesi', 'Zeugma Mozaik Müzesi', 'Bakırcılar Çarşısı']
  },
  'Konya': {
    region: 'İç Anadolu',
    highlights: ['Meram', 'Selçuklu', 'Karatay'],
    attractions: ['Mevlana Türbesi', 'Alaaddin Tepesi', 'İnce Minareli Medrese']
  },
  'Trabzon': {
    region: 'Karadeniz',
    highlights: ['Ortahisar', 'Akçaabat', 'Uzungöl'],
    attractions: ['Sümela Manastırı', 'Uzungöl', 'Atatürk Köşkü']
  },
  'Bodrum': {
    region: 'Ege',
    highlights: ['Bodrum Merkez', 'Gümbet', 'Bitez', 'Turgutreis'],
    attractions: ['Bodrum Kalesi', 'Antik Tiyatro', 'Marina']
  },
  'Cappadocia': {
    region: 'İç Anadolu',
    cities: ['Nevşehir', 'Ürgüp', 'Göreme', 'Avanos'],
    highlights: ['Göreme', 'Ürgüp', 'Avanos', 'Ortahisar', 'Zelve'],
    attractions: ['Göreme Açık Hava Müzesi', 'Ihlara Vadisi', 'Derinkuyu Yeraltı Şehri', 'Balon Turu']
  },
  'Pamukkale': {
    region: 'Ege',
    city: 'Denizli',
    highlights: ['Pamukkale Travertenleri', 'Hierapolis'],
    attractions: ['Kalsiyum Terasları', 'Antik Havuz', 'Hierapolis Antik Kenti']
  },
  // Daha fazla bölge eklenecek...
};

class TourismAPIService {
  private baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  private isOfflineMode = false;
  private retryCount = 3;
  private retryDelay = 1000; // 1 second
  
  // Generic API call with retry mechanism
  private async apiCallWithRetry<T>(apiCall: () => Promise<T>, fallback: () => T, operation: string): Promise<T> {
    for (let attempt = 1; attempt <= this.retryCount; attempt++) {
      try {
        return await apiCall();
      } catch (error) {
        logger.warn(`${operation} attempt ${attempt} failed:`, error);
        
        if (attempt === this.retryCount) {
          logger.error(`${operation} failed after ${this.retryCount} attempts, using fallback`);
          this.isOfflineMode = true;
          return fallback();
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
      }
    }
    
    return fallback();
  }

  // Hotel arama API'si - Booking.com, Hotels.com, vb. API'leri
  async searchHotels(location: string, checkIn: string, checkOut: string, guests: number = 2): Promise<HotelData[]> {
    return this.apiCallWithRetry(
      async () => {
        // Gerçek API çağrısı burada yapılacak
        // Şimdilik enhanced mock data döndürüyoruz
        return await this.getRealHotelData(location);
      },
      () => {
        // Fallback: Enhanced mock data
        logger.debug('Using fallback hotel data for:', location);
        return this.getFallbackHotelData(location);
      },
      'Hotel Search'
    );
  }

  // Uçak bileti arama API'si - Amadeus, Skyscanner API'leri
  async searchFlights(from: string, to: string, departureDate: string, returnDate?: string): Promise<FlightData[]> {
    return this.apiCallWithRetry(
      async () => {
        return await this.getRealFlightData(from, to, departureDate);
      },
      () => {
        logger.debug('Using fallback flight data for:', from, 'to', to);
        return this.getFallbackFlightData(from, to, departureDate);
      },
      'Flight Search'
    );
  }

  // Restoran arama API'si - Google Places, Zomato API'leri  
  async searchRestaurants(location: string, cuisine?: string): Promise<RestaurantData[]> {
    return this.apiCallWithRetry(
      async () => {
        return await this.getRealRestaurantData(location, cuisine);
      },
      () => {
        logger.debug('Using fallback restaurant data for:', location);
        return this.getFallbackRestaurantData(location, cuisine);
      },
      'Restaurant Search'
    );
  }

  // Tur arama API'si - GetYourGuide, Viator API'leri
  async searchTours(location: string, category?: string): Promise<TourData[]> {
    return this.apiCallWithRetry(
      async () => {
        return await this.getRealTourData(location, category);
      },
      () => {
        logger.debug('Using fallback tour data for:', location);
        return this.getFallbackTourData(location, category);
      },
      'Tour Search'
    );
  }

  // Gerçek hotel verisi (API entegrasyonu)
  private async getRealHotelData(location: string): Promise<HotelData[]> {
    // Bu kısımda gerçek API çağrıları yapılacak
    // Şimdilik gerçek veriye yakın mock data döndürüyoruz
    
    const locationData = COMPLETE_TURKEY_TOURISM_DATABASE[location];
    if (!locationData) return [];

    // Booking.com API veya benzer servislerden gerçek veri çekilecek
    return [
      {
        id: `hotel_${location.toLowerCase()}_1`,
        name: `${location} Grand Hotel`,
        location: location,
        rating: 4.5,
        price: 850,
        currency: 'TL',
        amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym'],
        images: ['/images/hotels/sample1.jpg'],
        availability: true,
        description: `${location}'da lüks konaklama deneyimi`
      },
      {
        id: `hotel_${location.toLowerCase()}_2`,
        name: `${location} Boutique Hotel`,
        location: location,
        rating: 4.2,
        price: 650,
        currency: 'TL',
        amenities: ['WiFi', 'Restaurant', 'Bar'],
        images: ['/images/hotels/sample2.jpg'],
        availability: true,
        description: `${location} merkezde butik otel`
      }
    ];
  }

  // Gerçek uçak bileti verisi (API entegrasyonu)
  private async getRealFlightData(from: string, to: string, departureDate: string): Promise<FlightData[]> {
    // Amadeus API veya benzer servislerden gerçek veri çekilecek
    return [
      {
        id: `flight_${from}_${to}_1`,
        airline: 'Turkish Airlines',
        from: from,
        to: to,
        departureDate: departureDate,
        arrivalDate: departureDate,
        price: 450,
        currency: 'TL',
        duration: '1h 30m',
        stops: 0,
        class: 'Economy'
      },
      {
        id: `flight_${from}_${to}_2`,
        airline: 'Pegasus Airlines',
        from: from,
        to: to,
        departureDate: departureDate,
        arrivalDate: departureDate,
        price: 320,
        currency: 'TL',
        duration: '1h 45m',
        stops: 0,
        class: 'Economy'
      }
    ];
  }

  // Gerçek restoran verisi (API entegrasyonu)
  private async getRealRestaurantData(location: string, cuisine?: string): Promise<RestaurantData[]> {
    // Google Places API veya Zomato API'den gerçek veri çekilecek
    const locationData = COMPLETE_TURKEY_TOURISM_DATABASE[location];
    if (!locationData) return [];

    return [
      {
        id: `restaurant_${location.toLowerCase()}_1`,
        name: `${location} Mutfağı`,
        location: location,
        cuisine: 'Türk Mutfağı',
        rating: 4.6,
        priceRange: '₺₺₺',
        openHours: '09:00 - 23:00',
        phone: '+90 xxx xxx xx xx',
        specialties: ['Kebap', 'Pide', 'Baklava'],
        images: ['/images/restaurants/sample1.jpg']
      },
      {
        id: `restaurant_${location.toLowerCase()}_2`,
        name: `${location} Fish House`,
        location: location,
        cuisine: 'Deniz Ürünleri',
        rating: 4.4,
        priceRange: '₺₺₺₺',
        openHours: '12:00 - 24:00',
        phone: '+90 xxx xxx xx xx',
        specialties: ['Levrek', 'Çupra', 'Karides'],
        images: ['/images/restaurants/sample2.jpg']
      }
    ];
  }

  // Gerçek tur verisi (API entegrasyonu)
  private async getRealTourData(location: string, category?: string): Promise<TourData[]> {
    // GetYourGuide API veya Viator API'den gerçek veri çekilecek
    const locationData = COMPLETE_TURKEY_TOURISM_DATABASE[location];
    if (!locationData) return [];

    return [
      {
        id: `tour_${location.toLowerCase()}_1`,
        name: `${location} Günübirlik Tur`,
        location: location,
        duration: '8 saat',
        price: 280,
        currency: 'TL',
        rating: 4.7,
        description: `${location}'un en güzel yerlerini keşfedin`,
        includes: ['Rehber', 'Öğle yemeği', 'Ulaşım', 'Müze giriş'],
        highlights: locationData.attractions || [],
        availability: true
      },
      {
        id: `tour_${location.toLowerCase()}_2`,
        name: `${location} Gece Turu`,
        location: location,
        duration: '4 saat',
        price: 180,
        currency: 'TL',
        rating: 4.3,
        description: `${location}'un gece hayatını keşfedin`,
        includes: ['Rehber', 'Welcome drink', 'Ulaşım'],
        highlights: ['Gece manzarası', 'Yerel barlar', 'Müzik'],
        availability: true
      }
    ];
  }

  // Lokasyon öneri sistemi
  getLocationSuggestions(query: string): string[] {
    const allLocations = Object.keys(COMPLETE_TURKEY_TOURISM_DATABASE);
    return allLocations.filter(location => 
      location.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Bölge bilgisi alma
  getRegionInfo(location: string) {
    return COMPLETE_TURKEY_TOURISM_DATABASE[location];
  }
  
  // Fallback fonksiyonları - API başarısız olduğunda kullanılacak
  private getFallbackHotelData(location: string): HotelData[] {
    const locationData = COMPLETE_TURKEY_TOURISM_DATABASE[location];
    if (!locationData) return [];
    
    return [
      {
        id: `fallback_hotel_${location.toLowerCase()}_1`,
        name: `${location} Premium Hotel`,
        location: location,
        rating: 4.3 + Math.random() * 0.6,
        price: Math.floor(600 + Math.random() * 800),
        currency: 'TL',
        amenities: ['WiFi', 'Havuz', 'Spa', 'Restoran', 'Otopark'].slice(0, 3 + Math.floor(Math.random() * 3)),
        images: ['/images/hotels/fallback.jpg'],
        availability: true,
        description: `${location}'da konforlu konaklama imkanı`
      },
      {
        id: `fallback_hotel_${location.toLowerCase()}_2`,
        name: `${location} City Hotel`,
        location: location,
        rating: 3.8 + Math.random() * 0.8,
        price: Math.floor(400 + Math.random() * 600),
        currency: 'TL',
        amenities: ['WiFi', 'Klima', 'Restoran'].slice(0, 2 + Math.floor(Math.random() * 2)),
        images: ['/images/hotels/fallback2.jpg'],
        availability: Math.random() > 0.2,
        description: `${location} merkezde uygun fiyatlı konaklama`
      }
    ];
  }
  
  private getFallbackFlightData(from: string, to: string, departureDate: string): FlightData[] {
    const airlines = ['Turkish Airlines', 'Pegasus Airlines', 'AnadoluJet', 'SunExpress'];
    const durations = ['1h 15m', '1h 30m', '1h 45m', '2h 00m'];
    
    return airlines.slice(0, 2 + Math.floor(Math.random() * 2)).map((airline, index) => ({
      id: `fallback_flight_${from}_${to}_${index}`,
      airline: airline,
      from: from,
      to: to,
      departureDate: departureDate,
      arrivalDate: departureDate,
      price: Math.floor(250 + Math.random() * 400),
      currency: 'TL',
      duration: durations[Math.floor(Math.random() * durations.length)],
      stops: Math.random() > 0.7 ? 1 : 0,
      class: 'Economy'
    }));
  }
  
  private getFallbackRestaurantData(location: string, cuisine?: string): RestaurantData[] {
    const locationData = COMPLETE_TURKEY_TOURISM_DATABASE[location];
    const localCuisine = locationData?.cuisine || ['Türk Mutfağı'];
    
    const restaurantTypes = [
      { name: 'Lokanta', cuisine: 'Türk Mutfağı', priceRange: '₺₺' },
      { name: 'Restaurant', cuisine: cuisine || localCuisine[0], priceRange: '₺₺₺' },
      { name: 'Balık Evi', cuisine: 'Deniz Ürünleri', priceRange: '₺₺₺₺' }
    ];
    
    return restaurantTypes.map((type, index) => ({
      id: `fallback_restaurant_${location.toLowerCase()}_${index}`,
      name: `${location} ${type.name}`,
      location: location,
      cuisine: type.cuisine,
      rating: 3.5 + Math.random() * 1.5,
      priceRange: type.priceRange,
      openHours: '09:00 - 23:00',
      phone: '+90 xxx xxx xx xx',
      specialties: localCuisine.slice(0, 3),
      images: ['/images/restaurants/fallback.jpg']
    }));
  }
  
  private getFallbackTourData(location: string, category?: string): TourData[] {
    const locationData = COMPLETE_TURKEY_TOURISM_DATABASE[location];
    if (!locationData) return [];
    
    const tourTypes = [
      { name: 'Şehir Turu', duration: '4 saat', price: 150 },
      { name: 'Günübirlik Tur', duration: '8 saat', price: 280 },
      { name: 'Gece Turu', duration: '3 saat', price: 120 }
    ];
    
    return tourTypes.map((type, index) => ({
      id: `fallback_tour_${location.toLowerCase()}_${index}`,
      name: `${location} ${type.name}`,
      location: location,
      duration: type.duration,
      price: type.price + Math.floor(Math.random() * 100),
      currency: 'TL',
      rating: 4.0 + Math.random() * 1.0,
      description: `${location}'da unutulmaz deneyim`,
      includes: ['Rehber', 'Ulaşım', 'Giriş Ücretleri'],
      highlights: locationData.attractions.slice(0, 3),
      availability: true
    }));
  }
  
  // API durumu kontrol
  isOnline(): boolean {
    return !this.isOfflineMode;
  }
  
  // Offline mode'u reset et
  resetConnection(): void {
    this.isOfflineMode = false;
  }
}

export const tourismApiService = new TourismAPIService();
export type { HotelData, FlightData, RestaurantData, TourData };