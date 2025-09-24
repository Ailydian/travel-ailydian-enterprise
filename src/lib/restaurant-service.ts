// Restaurant Service with Google Places and Foursquare API Integration
import NodeCache from 'node-cache';

// Cache instance for API responses
const cache = new NodeCache({ 
  stdTTL: parseInt(process.env.API_CACHE_DURATION_MINUTES || '15') * 60,
  checkperiod: 120 
});

interface RestaurantSearchParams {
  location: string;
  radius?: number;
  cuisine?: string;
  priceLevel?: 1 | 2 | 3 | 4;
  openNow?: boolean;
  rating?: number;
  limit?: number;
}

interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone?: string;
  website?: string;
  rating: number;
  reviewCount: number;
  priceLevel: number;
  cuisine: string[];
  openNow: boolean;
  photos: string[];
  hours?: {
    weekday: string[];
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  description?: string;
}

class RestaurantService {
  private googleApiKey: string;
  private foursquareApiKey: string;

  constructor() {
    this.googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || '';
    this.foursquareApiKey = process.env.FOURSQUARE_API_KEY || '';
    
    if (!this.googleApiKey && !this.foursquareApiKey) {
      console.warn('No restaurant API keys found. Using mock data.');
    }
  }

  // Main search function that tries Google Places first, then Foursquare
  async searchRestaurants(params: RestaurantSearchParams): Promise<Restaurant[]> {
    const cacheKey = `restaurants_${JSON.stringify(params)}`;
    
    // Check cache first
    const cached = cache.get(cacheKey) as Restaurant[];
    if (cached) {
      return cached;
    }

    try {
      let results: Restaurant[] = [];

      // Try Google Places API first
      if (this.googleApiKey) {
        results = await this.searchWithGooglePlaces(params);
      }

      // If Google fails or returns few results, try Foursquare
      if (results.length < 5 && this.foursquareApiKey) {
        const foursquareResults = await this.searchWithFoursquare(params);
        results = [...results, ...foursquareResults];
      }

      // Remove duplicates and limit results
      const uniqueResults = this.removeDuplicateRestaurants(results);
      const limitedResults = uniqueResults.slice(0, params.limit || 20);

      // Cache results
      cache.set(cacheKey, limitedResults);
      
      return limitedResults;
    } catch (error) {
      console.error('Restaurant search error:', error);
      return this.getMockRestaurantData(params);
    }
  }

  // Google Places API search
  private async searchWithGooglePlaces(params: RestaurantSearchParams): Promise<Restaurant[]> {
    if (!this.googleApiKey) {
      throw new Error('Google Places API key not configured');
    }

    try {
      // First, get coordinates for the location
      const geocodeResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(params.location)}&key=${this.googleApiKey}`
      );
      
      const geocodeData = await geocodeResponse.json();
      if (!geocodeData.results?.[0]) {
        throw new Error('Location not found');
      }

      const { lat, lng } = geocodeData.results[0].geometry.location;

      // Search for restaurants
      const searchParams = new URLSearchParams({
        location: `${lat},${lng}`,
        radius: (params.radius || 5000).toString(),
        type: 'restaurant',
        key: this.googleApiKey,
      });

      if (params.openNow) searchParams.append('opennow', 'true');
      if (params.priceLevel) searchParams.append('minprice', params.priceLevel.toString());
      if (params.rating) searchParams.append('rating', params.rating.toString());

      const placesResponse = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${searchParams}`
      );

      const placesData = await placesResponse.json();
      
      if (placesData.status !== 'OK') {
        throw new Error(`Google Places API error: ${placesData.status}`);
      }

      // Transform Google Places data
      const restaurants: Restaurant[] = await Promise.all(
        placesData.results.map(async (place: any) => {
          // Get detailed information
          const details = await this.getPlaceDetails(place.place_id);
          
          return {
            id: place.place_id,
            name: place.name,
            address: place.vicinity || place.formatted_address || '',
            phone: details?.phone,
            website: details?.website,
            rating: place.rating || 0,
            reviewCount: place.user_ratings_total || 0,
            priceLevel: place.price_level || 2,
            cuisine: this.extractCuisineFromTypes(place.types),
            openNow: place.opening_hours?.open_now || false,
            photos: this.getGooglePhotos(place.photos),
            hours: details?.hours,
            coordinates: {
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng,
            },
            description: details?.editorial_summary?.overview || ''
          };
        })
      );

      return restaurants.filter(r => r.name); // Filter out invalid entries
    } catch (error) {
      console.error('Google Places search error:', error);
      throw error;
    }
  }

  // Foursquare API search
  private async searchWithFoursquare(params: RestaurantSearchParams): Promise<Restaurant[]> {
    if (!this.foursquareApiKey) {
      throw new Error('Foursquare API key not configured');
    }

    try {
      const searchParams = new URLSearchParams({
        near: params.location,
        categories: '13065', // Food & Dining category
        limit: (params.limit || 20).toString(),
      });

      if (params.radius) searchParams.append('radius', (params.radius * 3.28084).toString()); // Convert m to ft

      const response = await fetch(
        `https://api.foursquare.com/v3/places/search?${searchParams}`,
        {
          headers: {
            'Authorization': this.foursquareApiKey,
            'Accept': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Foursquare API error: ${response.status}`);
      }

      // Transform Foursquare data
      const restaurants: Restaurant[] = data.results.map((place: any) => ({
        id: `fs_${place.fsq_id}`,
        name: place.name,
        address: place.location?.formatted_address || '',
        rating: place.rating ? place.rating / 2 : 0, // Foursquare uses 10-point scale
        reviewCount: place.stats?.total_tips || 0,
        priceLevel: place.price || 2,
        cuisine: place.categories?.map((cat: any) => cat.name) || [],
        openNow: place.hours?.display === 'Open' || false,
        photos: this.getFoursquarePhotos(place.photos),
        coordinates: {
          lat: place.geocodes?.main?.latitude || 0,
          lng: place.geocodes?.main?.longitude || 0,
        },
        description: place.description || ''
      }));

      return restaurants.filter(r => r.name);
    } catch (error) {
      console.error('Foursquare search error:', error);
      throw error;
    }
  }

  // Get detailed place information from Google Places
  private async getPlaceDetails(placeId: string) {
    if (!this.googleApiKey) return null;

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=phone_number,website,opening_hours,editorial_summary&key=${this.googleApiKey}`
      );

      const data = await response.json();
      
      if (data.status === 'OK') {
        return {
          phone: data.result.phone_number,
          website: data.result.website,
          hours: data.result.opening_hours,
          editorial_summary: data.result.editorial_summary
        };
      }
    } catch (error) {
      console.error('Place details error:', error);
    }
    
    return null;
  }

  // Extract cuisine types from Google Places types
  private extractCuisineFromTypes(types: string[]): string[] {
    const cuisineMap: { [key: string]: string } = {
      'chinese_restaurant': 'Çin',
      'italian_restaurant': 'İtalyan',
      'japanese_restaurant': 'Japon',
      'mexican_restaurant': 'Meksika',
      'indian_restaurant': 'Hint',
      'french_restaurant': 'Fransız',
      'turkish_restaurant': 'Türk',
      'fast_food': 'Fast Food',
      'pizza_restaurant': 'Pizza',
      'seafood_restaurant': 'Deniz Ürünleri',
      'steak_house': 'Et Lokantası',
      'sushi_restaurant': 'Suşi',
      'thai_restaurant': 'Tayland',
      'greek_restaurant': 'Yunan'
    };

    const cuisines = types
      .map(type => cuisineMap[type])
      .filter(Boolean);

    return cuisines.length > 0 ? cuisines : ['Restoran'];
  }

  // Get photo URLs from Google Places
  private getGooglePhotos(photos: any[]): string[] {
    if (!photos || !this.googleApiKey) return [];

    return photos.slice(0, 3).map(photo =>
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photo_reference=${photo.photo_reference}&key=${this.googleApiKey}`
    );
  }

  // Get photo URLs from Foursquare
  private getFoursquarePhotos(photos: any[]): string[] {
    if (!photos) return [];

    return photos.slice(0, 3).map(photo =>
      `${photo.prefix}600x400${photo.suffix}`
    );
  }

  // Remove duplicate restaurants based on name and location similarity
  private removeDuplicateRestaurants(restaurants: Restaurant[]): Restaurant[] {
    const unique = new Map();
    
    restaurants.forEach(restaurant => {
      const key = `${restaurant.name.toLowerCase()}_${Math.round(restaurant.coordinates.lat * 100)}_${Math.round(restaurant.coordinates.lng * 100)}`;
      
      if (!unique.has(key) || unique.get(key).rating < restaurant.rating) {
        unique.set(key, restaurant);
      }
    });

    return Array.from(unique.values());
  }

  // Mock data fallback
  private getMockRestaurantData(params: RestaurantSearchParams): Restaurant[] {
    const mockRestaurants: Restaurant[] = [
      {
        id: 'mock_1',
        name: 'Pandeli Restaurant',
        address: 'Eminönü, İstanbul',
        phone: '+90 212 527 3909',
        website: 'https://pandeli.com.tr',
        rating: 4.6,
        reviewCount: 1247,
        priceLevel: 3,
        cuisine: ['Osmanlı', 'Türk'],
        openNow: true,
        photos: [
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400',
          'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400'
        ],
        coordinates: { lat: 41.0178, lng: 28.9702 },
        description: 'Tarihi Osmanlı mutfağı deneyimi'
      },
      {
        id: 'mock_2',
        name: 'Çiya Sofrası',
        address: 'Kadıköy, İstanbul',
        phone: '+90 216 330 3190',
        rating: 4.7,
        reviewCount: 2156,
        priceLevel: 2,
        cuisine: ['Anadolu', 'Türk'],
        openNow: true,
        photos: [
          'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400'
        ],
        coordinates: { lat: 40.9936, lng: 29.0293 },
        description: 'Anadolu mutfağının eşsiz lezzetleri'
      },
      {
        id: 'mock_3',
        name: 'Lokanta Maya',
        address: 'Karaköy, İstanbul',
        phone: '+90 212 252 6884',
        rating: 4.5,
        reviewCount: 856,
        priceLevel: 4,
        cuisine: ['Modern Türk', 'Fine Dining'],
        openNow: false,
        photos: [
          'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400'
        ],
        coordinates: { lat: 41.0255, lng: 28.9741 },
        description: 'Modern Türk mutfağının şık yorumu'
      }
    ];

    // Filter by location if specified
    const filteredRestaurants = params.location.toLowerCase().includes('istanbul') 
      ? mockRestaurants 
      : mockRestaurants.slice(0, 1);

    return filteredRestaurants;
  }

  // Search restaurants by cuisine type
  async searchByCuisine(location: string, cuisine: string): Promise<Restaurant[]> {
    return this.searchRestaurants({
      location,
      cuisine,
      limit: 15
    });
  }

  // Get restaurant details by ID
  async getRestaurantDetails(id: string): Promise<Restaurant | null> {
    if (id.startsWith('mock_')) {
      const mockData = this.getMockRestaurantData({ location: 'istanbul' });
      return mockData.find(r => r.id === id) || null;
    }

    // For real restaurant IDs, you would fetch from the appropriate API
    // This is a simplified version
    return null;
  }

  // Get nearby restaurants
  async getNearbyRestaurants(lat: number, lng: number, radius: number = 1000): Promise<Restaurant[]> {
    return this.searchRestaurants({
      location: `${lat},${lng}`,
      radius,
      limit: 10
    });
  }
}

// Singleton instance
export const restaurantService = new RestaurantService();

// Export types
export type { Restaurant, RestaurantSearchParams };