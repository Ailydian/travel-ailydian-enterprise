// Booking.com API Integration Service
// Real hotel data integration with error handling and fallback

export interface BookingHotel {
  id: string;
  name: string;
  location: {
    address: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  images: string[];
  rating: number;
  reviewScore: number;
  reviewCount: number;
  price: {
    amount: number;
    currency: string;
    originalAmount?: number;
  };
  amenities: string[];
  roomTypes: {
    id: string;
    name: string;
    maxOccupancy: number;
    price: number;
    available: boolean;
  }[];
  policies: {
    checkIn: string;
    checkOut: string;
    cancellationPolicy: string;
  };
  description: string;
  highlights: string[];
  nearbyAttractions: {
    name: string;
    distance: string;
  }[];
  isAvailable: boolean;
  lastUpdated: Date;
}

export interface BookingSearchParams {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children?: number;
  rooms?: number;
  currency?: string;
  language?: string;
}

export interface BookingSearchResponse {
  hotels: BookingHotel[];
  totalCount: number;
  searchId: string;
  filters: {
    priceRange: { min: number; max: number };
    starRatings: number[];
    amenities: string[];
    locations: string[];
  };
}

class BookingComService {
  private apiUrl = 'https://booking-com.p.rapidapi.com/v1';
  private apiKey = process.env.RAPIDAPI_KEY || '';
  private apiHost = 'booking-com.p.rapidapi.com';
  
  // Rate limiting
  private rateLimitDelay = 1000; // 1 second between requests
  private lastRequestTime = 0;
  
  // Cache
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheExpiryMs = 5 * 60 * 1000; // 5 minutes

  private async makeRequest(endpoint: string, params: any = {}): Promise<any> {
    // Rate limiting
    const now = Date.now();
    const timeToWait = this.rateLimitDelay - (now - this.lastRequestTime);
    if (timeToWait > 0) {
      await new Promise(resolve => setTimeout(resolve, timeToWait));
    }
    this.lastRequestTime = Date.now();

    // Check cache
    const cacheKey = `${endpoint}_${JSON.stringify(params)}`;
    const cachedData = this.cache.get(cacheKey);
    if (cachedData && (Date.now() - cachedData.timestamp < this.cacheExpiryMs)) {
      console.log('Returning cached data for:', endpoint);
      return cachedData.data;
    }

    try {
      const queryParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          queryParams.append(key, params[key].toString());
        }
      });

      const url = `${this.apiUrl}${endpoint}?${queryParams}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': this.apiKey,
          'X-RapidAPI-Host': this.apiHost,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Booking.com API error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      
      // Cache the result
      this.cache.set(cacheKey, { data, timestamp: Date.now() });
      
      return data;
    } catch (error) {
      console.error('Booking.com API request failed:', error);
      throw error;
    }
  }

  // Search for destinations
  async searchDestinations(query: string): Promise<any[]> {
    try {
      const response = await this.makeRequest('/hotels/locations', {
        name: query,
        locale: 'tr'
      });

      return response.result || [];
    } catch (error) {
      console.error('Destination search failed:', error);
      return [];
    }
  }

  // Search hotels with comprehensive data
  async searchHotels(searchParams: BookingSearchParams): Promise<BookingSearchResponse> {
    try {
      // First, get destination ID
      const destinations = await this.searchDestinations(searchParams.destination);
      if (destinations.length === 0) {
        throw new Error(`No destination found for: ${searchParams.destination}`);
      }

      const destinationId = destinations[0].dest_id;
      const destinationType = destinations[0].dest_type;

      // Search hotels
      const hotelsResponse = await this.makeRequest('/hotels/search', {
        dest_id: destinationId,
        dest_type: destinationType,
        checkin_date: searchParams.checkIn.toISOString().split('T')[0],
        checkout_date: searchParams.checkOut.toISOString().split('T')[0],
        adults_number: searchParams.adults,
        children_number: searchParams.children || 0,
        room_number: searchParams.rooms || 1,
        currency: searchParams.currency || 'TRY',
        locale: searchParams.language || 'tr',
        units: 'metric',
        order_by: 'popularity'
      });

      // Transform the data to our interface
      const hotels: BookingHotel[] = (hotelsResponse.result || []).map((hotel: any) => ({
        id: hotel.hotel_id?.toString() || '',
        name: hotel.hotel_name || '',
        location: {
          address: hotel.address || '',
          city: hotel.city || searchParams.destination,
          country: hotel.country_trans || 'Türkiye',
          latitude: hotel.latitude || 0,
          longitude: hotel.longitude || 0
        },
        images: hotel.main_photo_url ? [hotel.main_photo_url] : [],
        rating: hotel.class || 0,
        reviewScore: hotel.review_score || 0,
        reviewCount: hotel.review_nr || 0,
        price: {
          amount: hotel.min_total_price || 0,
          currency: searchParams.currency || 'TRY',
          originalAmount: hotel.price_breakdown?.gross_price
        },
        amenities: hotel.facilities || [],
        roomTypes: [], // Would need additional API call for room details
        policies: {
          checkIn: hotel.checkin?.from || '14:00',
          checkOut: hotel.checkout?.until || '12:00',
          cancellationPolicy: 'Varies by rate'
        },
        description: hotel.hotel_name_trans || hotel.hotel_name || '',
        highlights: [
          ...(hotel.hotel_facilities || []).slice(0, 3),
          hotel.distances ? `${Math.round(hotel.distances[0]?.distance || 0)}km from center` : ''
        ].filter(Boolean),
        nearbyAttractions: (hotel.distances || []).map((dist: any) => ({
          name: dist.name || '',
          distance: `${Math.round(dist.distance || 0)}km`
        })).slice(0, 5),
        isAvailable: hotel.is_free_cancellable !== undefined,
        lastUpdated: new Date()
      }));

      return {
        hotels,
        totalCount: hotelsResponse.total_count_with_filters || hotels.length,
        searchId: `search_${Date.now()}`,
        filters: {
          priceRange: {
            min: Math.min(...hotels.map(h => h.price.amount).filter(p => p > 0)) || 0,
            max: Math.max(...hotels.map(h => h.price.amount)) || 10000
          },
          starRatings: [...new Set(hotels.map(h => h.rating).filter(r => r > 0))],
          amenities: [...new Set(hotels.flatMap(h => h.amenities))],
          locations: [...new Set(hotels.map(h => h.location.city))]
        }
      };
    } catch (error) {
      console.error('Hotel search failed:', error);
      throw error;
    }
  }

  // Get hotel details
  async getHotelDetails(hotelId: string): Promise<BookingHotel | null> {
    try {
      const response = await this.makeRequest('/hotels/data', {
        hotel_id: hotelId,
        locale: 'tr'
      });

      if (!response.result) {
        return null;
      }

      const hotel = response.result[0];
      return {
        id: hotel.hotel_id?.toString() || '',
        name: hotel.hotel_name || '',
        location: {
          address: hotel.address || '',
          city: hotel.city || '',
          country: hotel.country_trans || '',
          latitude: hotel.latitude || 0,
          longitude: hotel.longitude || 0
        },
        images: hotel.photos || [],
        rating: hotel.class || 0,
        reviewScore: hotel.review_score || 0,
        reviewCount: hotel.review_nr || 0,
        price: {
          amount: 0, // Would need availability check for current price
          currency: 'TRY'
        },
        amenities: hotel.facilities || [],
        roomTypes: [], // Would need additional API call
        policies: {
          checkIn: hotel.checkin?.from || '14:00',
          checkOut: hotel.checkout?.until || '12:00',
          cancellationPolicy: 'Varies by rate'
        },
        description: hotel.description || '',
        highlights: (hotel.hotel_facilities || []).slice(0, 5),
        nearbyAttractions: [],
        isAvailable: true,
        lastUpdated: new Date()
      };
    } catch (error) {
      console.error('Hotel details fetch failed:', error);
      return null;
    }
  }

  // Get popular destinations
  async getPopularDestinations(country: string = 'tr'): Promise<any[]> {
    try {
      const response = await this.makeRequest('/hotels/locations', {
        name: country === 'tr' ? 'Turkey' : country,
        locale: 'tr'
      });

      return (response.result || []).slice(0, 10);
    } catch (error) {
      console.error('Popular destinations fetch failed:', error);
      return [];
    }
  }

  // Clear cache
  clearCache(): void {
    this.cache.clear();
  }

  // Get cache size
  getCacheInfo(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

export const bookingComService = new BookingComService();