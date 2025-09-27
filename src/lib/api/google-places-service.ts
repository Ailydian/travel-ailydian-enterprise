// Google Places API Integration Service
// Real restaurant and attraction data with comprehensive search

export interface GooglePlace {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  photos?: {
    photo_reference: string;
    height: number;
    width: number;
    html_attributions: string[];
  }[];
  rating?: number;
  user_ratings_total?: number;
  price_level?: number; // 0-4 scale
  types: string[];
  business_status?: 'OPERATIONAL' | 'CLOSED_TEMPORARILY' | 'CLOSED_PERMANENTLY';
  opening_hours?: {
    open_now: boolean;
    periods: {
      close?: { day: number; time: string };
      open: { day: number; time: string };
    }[];
    weekday_text: string[];
  };
  website?: string;
  formatted_phone_number?: string;
  international_phone_number?: string;
  reviews?: {
    author_name: string;
    author_url: string;
    language: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
  }[];
  vicinity?: string;
  plus_code?: {
    compound_code: string;
    global_code: string;
  };
}

export interface RestaurantData {
  id: string;
  name: string;
  location: {
    address: string;
    city: string;
    latitude: number;
    longitude: number;
  };
  cuisine: string[];
  rating: number;
  reviewCount: number;
  priceLevel: 'Bütçe Dostu' | 'Orta' | 'Pahalı' | 'Çok Pahalı';
  priceRange: string;
  images: string[];
  openingHours: {
    isOpen: boolean;
    hours: string[];
    nextOpenClose?: string;
  };
  contact: {
    phone?: string;
    website?: string;
  };
  features: string[];
  reviews: {
    author: string;
    rating: number;
    text: string;
    date: string;
  }[];
  specialties: string[];
  reservationRequired: boolean;
  deliveryAvailable: boolean;
  isVerified: boolean;
  lastUpdated: Date;
}

export interface AttractionData {
  id: string;
  name: string;
  location: {
    address: string;
    city: string;
    latitude: number;
    longitude: number;
  };
  category: string;
  subcategories: string[];
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  openingHours: {
    isOpen: boolean;
    hours: string[];
  };
  ticketPrice: {
    adult?: number;
    child?: number;
    student?: number;
    currency: string;
  };
  contact: {
    phone?: string;
    website?: string;
  };
  amenities: string[];
  accessibility: string[];
  bestTimeToVisit: string;
  averageVisitDuration: string;
  isPopular: boolean;
  isTouristAttraction: boolean;
  lastUpdated: Date;
}

export interface PlacesSearchParams {
  query: string;
  location?: { lat: number; lng: number };
  radius?: number; // in meters
  type?: string; // restaurant, tourist_attraction, etc.
  minprice?: number; // 0-4
  maxprice?: number; // 0-4
  opennow?: boolean;
  language?: string;
}

class GooglePlacesService {
  private apiKey = process.env.GOOGLE_PLACES_API_KEY || '';
  private baseUrl = 'https://maps.googleapis.com/maps/api/place';
  
  // Rate limiting and caching
  private rateLimitDelay = 100; // 100ms between requests (Google allows high rates)
  private lastRequestTime = 0;
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheExpiryMs = 30 * 60 * 1000; // 30 minutes for place data

  // Make API request with rate limiting and caching
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
      console.log('Returning cached Google Places data for:', endpoint);
      return cachedData.data;
    }

    try {
      const queryParams = new URLSearchParams({
        ...params,
        key: this.apiKey
      });

      const url = `${this.baseUrl}${endpoint}?${queryParams}`;
      
      const response = await fetch(url, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error(`Google Places API error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        throw new Error(`Google Places API error: ${data.status} - ${data.error_message || 'Unknown error'}`);
      }
      
      // Cache the result
      this.cache.set(cacheKey, { data, timestamp: Date.now() });
      
      return data;
    } catch (error) {
      console.error('Google Places API request failed:', error);
      throw error;
    }
  }

  // Text search for places
  async searchPlaces(searchParams: PlacesSearchParams): Promise<GooglePlace[]> {
    try {
      const params: any = {
        query: searchParams.query,
        language: searchParams.language || 'tr'
      };

      if (searchParams.location) {
        params.location = `${searchParams.location.lat},${searchParams.location.lng}`;
        params.radius = searchParams.radius || 10000; // 10km default
      }

      if (searchParams.type) {
        params.type = searchParams.type;
      }

      if (searchParams.minprice !== undefined) {
        params.minprice = searchParams.minprice;
      }

      if (searchParams.maxprice !== undefined) {
        params.maxprice = searchParams.maxprice;
      }

      if (searchParams.opennow) {
        params.opennow = true;
      }

      const response = await this.makeRequest('/textsearch/json', params);
      return response.results || [];
    } catch (error) {
      console.error('Places search failed:', error);
      return [];
    }
  }

  // Nearby search
  async searchNearby(
    location: { lat: number; lng: number },
    radius: number = 5000,
    type: string = 'restaurant',
    keyword?: string
  ): Promise<GooglePlace[]> {
    try {
      const params: any = {
        location: `${location.lat},${location.lng}`,
        radius: radius,
        type: type,
        language: 'tr'
      };

      if (keyword) {
        params.keyword = keyword;
      }

      const response = await this.makeRequest('/nearbysearch/json', params);
      return response.results || [];
    } catch (error) {
      console.error('Nearby search failed:', error);
      return [];
    }
  }

  // Get place details
  async getPlaceDetails(placeId: string): Promise<GooglePlace | null> {
    try {
      const params = {
        place_id: placeId,
        fields: 'place_id,name,formatted_address,geometry,photos,rating,user_ratings_total,price_level,types,business_status,opening_hours,website,formatted_phone_number,international_phone_number,reviews,vicinity,plus_code',
        language: 'tr'
      };

      const response = await this.makeRequest('/details/json', params);
      return response.result || null;
    } catch (error) {
      console.error('Place details fetch failed:', error);
      return null;
    }
  }

  // Search restaurants with detailed data transformation
  async searchRestaurants(
    location: string,
    cuisine?: string,
    radius: number = 10000
  ): Promise<RestaurantData[]> {
    try {
      // First, geocode the location if it's not coordinates
      let searchLocation: { lat: number; lng: number } | undefined;
      
      if (!location.includes(',') || !location.includes('.')) {
        const geocoded = await this.geocodeAddress(location);
        if (geocoded) {
          searchLocation = geocoded;
        }
      }

      const query = cuisine 
        ? `${cuisine} restaurants in ${location}`
        : `restaurants in ${location}`;

      const places = await this.searchPlaces({
        query,
        location: searchLocation,
        radius,
        type: 'restaurant'
      });

      // Transform to our restaurant interface
      const restaurants: RestaurantData[] = [];
      
      for (const place of places.slice(0, 20)) { // Limit to 20 for performance
        try {
          // Get detailed information
          const details = await this.getPlaceDetails(place.place_id);
          if (!details) continue;

          const restaurant: RestaurantData = {
            id: place.place_id,
            name: place.name,
            location: {
              address: place.formatted_address,
              city: this.extractCityFromAddress(place.formatted_address),
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng
            },
            cuisine: this.extractCuisineTypes(place.types),
            rating: place.rating || 0,
            reviewCount: place.user_ratings_total || 0,
            priceLevel: this.convertPriceLevel(place.price_level),
            priceRange: this.getPriceRange(place.price_level),
            images: this.getPlaceImages(place.photos),
            openingHours: {
              isOpen: details.opening_hours?.open_now || false,
              hours: details.opening_hours?.weekday_text || [],
              nextOpenClose: this.getNextOpenClose(details.opening_hours)
            },
            contact: {
              phone: details.formatted_phone_number,
              website: details.website
            },
            features: this.extractFeatures(place.types),
            reviews: this.transformReviews(details.reviews || []),
            specialties: this.inferSpecialties(details.reviews || [], place.types),
            reservationRequired: this.checkReservationRequired(place.types),
            deliveryAvailable: this.checkDeliveryAvailable(place.types),
            isVerified: details.business_status === 'OPERATIONAL',
            lastUpdated: new Date()
          };

          restaurants.push(restaurant);
        } catch (error) {
          console.error(`Failed to process restaurant ${place.name}:`, error);
          continue;
        }
      }

      return restaurants.sort((a, b) => b.rating - a.rating);
    } catch (error) {
      console.error('Restaurant search failed:', error);
      return [];
    }
  }

  // Search tourist attractions
  async searchAttractions(location: string, category?: string): Promise<AttractionData[]> {
    try {
      const query = category 
        ? `${category} attractions in ${location}`
        : `tourist attractions in ${location}`;

      const places = await this.searchPlaces({
        query,
        type: 'tourist_attraction'
      });

      const attractions: AttractionData[] = [];
      
      for (const place of places.slice(0, 15)) {
        try {
          const details = await this.getPlaceDetails(place.place_id);
          if (!details) continue;

          const attraction: AttractionData = {
            id: place.place_id,
            name: place.name,
            location: {
              address: place.formatted_address,
              city: this.extractCityFromAddress(place.formatted_address),
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng
            },
            category: this.categorizeAttraction(place.types),
            subcategories: this.getAttractionSubcategories(place.types),
            rating: place.rating || 0,
            reviewCount: place.user_ratings_total || 0,
            images: this.getPlaceImages(place.photos),
            description: this.generateDescription(details.reviews || [], place.name),
            openingHours: {
              isOpen: details.opening_hours?.open_now || false,
              hours: details.opening_hours?.weekday_text || []
            },
            ticketPrice: {
              currency: 'TRY'
            },
            contact: {
              phone: details.formatted_phone_number,
              website: details.website
            },
            amenities: this.extractAmenities(place.types),
            accessibility: this.inferAccessibility(details.reviews || []),
            bestTimeToVisit: this.inferBestTimeToVisit(details.reviews || []),
            averageVisitDuration: this.inferVisitDuration(place.types),
            isPopular: (place.user_ratings_total || 0) > 100,
            isTouristAttraction: place.types.includes('tourist_attraction'),
            lastUpdated: new Date()
          };

          attractions.push(attraction);
        } catch (error) {
          console.error(`Failed to process attraction ${place.name}:`, error);
          continue;
        }
      }

      return attractions.sort((a, b) => b.rating - a.rating);
    } catch (error) {
      console.error('Attraction search failed:', error);
      return [];
    }
  }

  // Geocode address to coordinates
  async geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.apiKey}`
      );

      const data = await response.json();
      if (data.status === 'OK' && data.results.length > 0) {
        return data.results[0].geometry.location;
      }

      return null;
    } catch (error) {
      console.error('Geocoding failed:', error);
      return null;
    }
  }

  // Get photo URL
  getPhotoUrl(photoReference: string, maxWidth: number = 800): string {
    return `${this.baseUrl}/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${this.apiKey}`;
  }

  // Helper methods
  private extractCityFromAddress(address: string): string {
    const parts = address.split(',');
    if (parts.length >= 2) {
      return parts[parts.length - 3]?.trim() || parts[0]?.trim() || '';
    }
    return parts[0]?.trim() || '';
  }

  private extractCuisineTypes(types: string[]): string[] {
    const cuisineMap: Record<string, string> = {
      'meal_takeaway': 'Paket Servis',
      'meal_delivery': 'Ev Servisi',
      'bakery': 'Fırın-Pastane',
      'cafe': 'Kafe',
      'bar': 'Bar',
      'night_club': 'Gece Kulübü'
    };

    return types
      .map(type => cuisineMap[type] || null)
      .filter(Boolean) as string[];
  }

  private convertPriceLevel(priceLevel?: number): 'Bütçe Dostu' | 'Orta' | 'Pahalı' | 'Çok Pahalı' {
    switch (priceLevel) {
      case 0:
      case 1:
        return 'Bütçe Dostu';
      case 2:
        return 'Orta';
      case 3:
        return 'Pahalı';
      case 4:
        return 'Çok Pahalı';
      default:
        return 'Orta';
    }
  }

  private getPriceRange(priceLevel?: number): string {
    switch (priceLevel) {
      case 0:
      case 1:
        return '₺';
      case 2:
        return '₺₺';
      case 3:
        return '₺₺₺';
      case 4:
        return '₺₺₺₺';
      default:
        return '₺₺';
    }
  }

  private getPlaceImages(photos?: any[]): string[] {
    if (!photos || photos.length === 0) return [];
    
    return photos
      .slice(0, 5)
      .map(photo => this.getPhotoUrl(photo.photo_reference, 800));
  }

  private getNextOpenClose(openingHours?: any): string | undefined {
    if (!openingHours || !openingHours.periods) return undefined;
    
    // This would need more complex logic to determine next open/close time
    return openingHours.open_now ? 'Açık' : 'Kapalı';
  }

  private extractFeatures(types: string[]): string[] {
    const featureMap: Record<string, string> = {
      'meal_delivery': 'Ev Servisi',
      'meal_takeaway': 'Paket Servis',
      'wheelchair_accessible_entrance': 'Engelli Erişimi',
      'serves_wine': 'Alkol Servisi',
      'outdoor_seating': 'Dış Mekan',
      'live_music': 'Canlı Müzik',
      'good_for_children': 'Aile Dostu'
    };

    return types
      .map(type => featureMap[type])
      .filter(Boolean);
  }

  private transformReviews(reviews: any[]): any[] {
    return reviews.slice(0, 5).map(review => ({
      author: review.author_name,
      rating: review.rating,
      text: review.text,
      date: new Date(review.time * 1000).toLocaleDateString('tr-TR')
    }));
  }

  private inferSpecialties(reviews: any[], types: string[]): string[] {
    // This would analyze reviews to extract specialties
    // For now, return based on types
    if (types.includes('bakery')) return ['Ekmek', 'Pastane', 'Tatlı'];
    if (types.includes('cafe')) return ['Kahve', 'Çay', 'Hafif Atıştırmalık'];
    return ['Yerel Mutfak', 'Ana Yemek'];
  }

  private checkReservationRequired(types: string[]): boolean {
    return types.includes('fine_dining') || types.includes('upscale_restaurant');
  }

  private checkDeliveryAvailable(types: string[]): boolean {
    return types.includes('meal_delivery');
  }

  // Attraction-specific methods
  private categorizeAttraction(types: string[]): string {
    if (types.includes('museum')) return 'Müze';
    if (types.includes('amusement_park')) return 'Eğlence Parkı';
    if (types.includes('zoo')) return 'Hayvanat Bahçesi';
    if (types.includes('church') || types.includes('mosque')) return 'Dini Mekan';
    if (types.includes('park')) return 'Park';
    return 'Turistik Mekan';
  }

  private getAttractionSubcategories(types: string[]): string[] {
    return types.filter(type => 
      ['museum', 'art_gallery', 'amusement_park', 'zoo', 'aquarium', 'park', 'historical_landmark'].includes(type)
    );
  }

  private generateDescription(reviews: any[], name: string): string {
    if (reviews.length === 0) return `${name} hakkında detaylı bilgi.`;
    
    // Extract common themes from reviews
    const firstReview = reviews[0]?.text || '';
    return firstReview.slice(0, 200) + '...';
  }

  private extractAmenities(types: string[]): string[] {
    const amenityMap: Record<string, string> = {
      'wheelchair_accessible_entrance': 'Engelli Erişimi',
      'restroom': 'Tuvalet',
      'parking': 'Otopark',
      'wifi': 'WiFi',
      'air_conditioning': 'Klima'
    };

    return types
      .map(type => amenityMap[type])
      .filter(Boolean);
  }

  private inferAccessibility(reviews: any[]): string[] {
    // Analyze reviews for accessibility mentions
    return ['Genel Erişim']; // Default
  }

  private inferBestTimeToVisit(reviews: any[]): string {
    return 'Tüm Yıl'; // Default
  }

  private inferVisitDuration(types: string[]): string {
    if (types.includes('museum')) return '2-3 saat';
    if (types.includes('amusement_park')) return '4-6 saat';
    if (types.includes('park')) return '1-2 saat';
    return '1 saat';
  }

  // Clear cache
  clearCache(): void {
    this.cache.clear();
  }

  // Get cache information
  getCacheInfo(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

export const googlePlacesService = new GooglePlacesService();