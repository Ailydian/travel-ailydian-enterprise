import axios, { AxiosInstance } from 'axios';
import { Location, Review, Photo } from '../types/review-system';

// TripAdvisor API Types
interface TripAdvisorConfig {
  apiKey: string;
  baseUrl: string;
  rateLimitPerMinute: number;
}

interface TripAdvisorLocation {
  location_id: string;
  name: string;
  description: string;
  address_obj: {
    street1?: string;
    street2?: string;
    city?: string;
    state?: string;
    country?: string;
    postalcode?: string;
    address_string: string;
  };
  ancestors: Array<{
    level: string;
    name: string;
    location_id: string;
  }>;
  latitude: string;
  longitude: string;
  timezone: string;
  email?: string;
  phone?: string;
  website?: string;
  write_review?: string;
  ranking_data?: {
    geo_location_id: string;
    ranking_string: string;
    geo_location_name: string;
    ranking_out_of: string;
    ranking: string;
  };
  rating?: string;
  rating_image_url?: string;
  num_reviews?: string;
  review_rating_count?: {
    [key: string]: string;
  };
  subratings?: {
    [key: string]: {
      name: string;
      localized_name: string;
      rating_image_url: string;
      value: string;
    };
  };
  photo_count?: string;
  see_all_photos?: string;
  price_level?: string;
  category?: {
    key: string;
    name: string;
  };
  subcategory?: Array<{
    key: string;
    name: string;
  }>;
  groups?: Array<{
    name: string;
    localized_name: string;
    categories: Array<{
      key: string;
      name: string;
    }>;
  }>;
}

interface TripAdvisorReview {
  id: string;
  url: string;
  location_id: string;
  published_date: string;
  rating: number;
  helpful_votes: number;
  rating_image_url: string;
  text: string;
  title: string;
  trip_type: string;
  travel_date: string;
  user: {
    username: string;
    user_location: {
      name: string;
    };
    avatar: {
      thumbnail: string;
      small: string;
      medium: string;
      large: string;
      original: string;
    };
  };
  subratings?: {
    [key: string]: {
      name: string;
      localized_name: string;
      rating_image_url: string;
      value: string;
    };
  };
}

// Google Places API Types
interface GooglePlacesConfig {
  apiKey: string;
  baseUrl: string;
  rateLimitPerMinute: number;
}

interface GooglePlaceDetails {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    viewport?: {
      northeast: { lat: number; lng: number };
      southwest: { lat: number; lng: number };
    };
  };
  address_components: Array<{
    long_name: string;
    short_name: string;
    types: string[];
  }>;
  adr_address?: string;
  business_status?: string;
  formatted_phone_number?: string;
  international_phone_number?: string;
  icon?: string;
  icon_background_color?: string;
  icon_mask_base_uri?: string;
  opening_hours?: {
    open_now: boolean;
    periods: Array<{
      close?: { day: number; time: string };
      open: { day: number; time: string };
    }>;
    weekday_text: string[];
  };
  photos?: Array<{
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }>;
  plus_code?: {
    compound_code: string;
    global_code: string;
  };
  price_level?: number;
  rating?: number;
  reviews?: GooglePlaceReview[];
  types: string[];
  url?: string;
  user_ratings_total?: number;
  utc_offset?: number;
  vicinity?: string;
  website?: string;
}

interface GooglePlaceReview {
  author_name: string;
  author_url?: string;
  language: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

// Google My Business API Types (requires business verification)
interface GoogleMyBusinessLocation {
  name: string;
  storeCode?: string;
  languageCode?: string;
  primaryPhone?: string;
  additionalPhones?: string[];
  address: {
    regionCode: string;
    languageCode?: string;
    postalCode?: string;
    administrativeArea?: string;
    locality?: string;
    addressLines: string[];
  };
  primaryCategory: {
    categoryId: string;
    displayName?: string;
  };
  additionalCategories?: Array<{
    categoryId: string;
    displayName?: string;
  }>;
  websiteUrl?: string;
  regularHours?: {
    periods: Array<{
      openDay?: string;
      openTime?: string;
      closeDay?: string;
      closeTime?: string;
    }>;
  };
  specialHours?: Array<{
    startDate: string;
    endDate: string;
    closed: boolean;
    openTime?: string;
    closeTime?: string;
  }>;
  serviceArea?: {
    businessType?: string;
    regionCode?: string;
  };
  labels?: string[];
  adWordsLocationExtensions?: {
    adPhone?: string;
  };
  latlng?: {
    latitude: number;
    longitude: number;
  };
  openInfo?: {
    status: string;
    canReopen?: boolean;
  };
  metadata?: {
    duplicate?: {
      locationName: string;
    };
    mapsUrl?: string;
    newReviewUrl?: string;
  };
}

class ExternalPlatformIntegration {
  private tripAdvisorConfig: TripAdvisorConfig;
  private googlePlacesConfig: GooglePlacesConfig;
  private tripAdvisorClient: AxiosInstance;
  private googleClient: AxiosInstance;
  private rateLimiter: Map<string, number[]> = new Map();

  constructor() {
    this.tripAdvisorConfig = {
      apiKey: process.env.TRIPADVISOR_API_KEY || '',
      baseUrl: 'https://api.content.tripadvisor.com/api/v1',
      rateLimitPerMinute: 100
    };

    this.googlePlacesConfig = {
      apiKey: process.env.GOOGLE_PLACES_API_KEY || '',
      baseUrl: 'https://maps.googleapis.com/maps/api',
      rateLimitPerMinute: 1000
    };

    // Initialize API clients
    this.tripAdvisorClient = axios.create({
      baseURL: this.tripAdvisorConfig.baseUrl,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    this.googleClient = axios.create({
      baseURL: this.googlePlacesConfig.baseUrl,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    // Add request interceptors for rate limiting
    this.setupRateLimiting();
  }

  private setupRateLimiting() {
    this.tripAdvisorClient.interceptors.request.use(async (config) => {
      await this.waitForRateLimit('tripadvisor');
      config.params = { ...config.params, key: this.tripAdvisorConfig.apiKey };
      return config;
    });

    this.googleClient.interceptors.request.use(async (config) => {
      await this.waitForRateLimit('google');
      config.params = { ...config.params, key: this.googlePlacesConfig.apiKey };
      return config;
    });
  }

  private async waitForRateLimit(platform: string): Promise<void> {
    const now = Date.now();
    const requests = this.rateLimiter.get(platform) || [];
    
    // Remove requests older than 1 minute
    const recentRequests = requests.filter(time => now - time < 60000);
    
    const limit = platform === 'tripadvisor' 
      ? this.tripAdvisorConfig.rateLimitPerMinute 
      : this.googlePlacesConfig.rateLimitPerMinute;

    if (recentRequests.length >= limit) {
      const oldestRequest = Math.min(...recentRequests);
      const waitTime = 60000 - (now - oldestRequest);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    recentRequests.push(now);
    this.rateLimiter.set(platform, recentRequests);
  }

  // ==================== TRIPADVISOR INTEGRATION ====================

  /**
   * Search TripAdvisor locations
   */
  async searchTripAdvisorLocations(
    query: string, 
    category?: string,
    latLong?: string,
    radius?: string,
    radiusUnit?: 'km' | 'mi',
    language?: string
  ): Promise<TripAdvisorLocation[]> {
    try {
      const params: any = {
        searchQuery: query,
        language: language || 'en'
      };

      if (category) params.category = category;
      if (latLong) params.latLong = latLong;
      if (radius) params.radius = radius;
      if (radiusUnit) params.radiusUnit = radiusUnit;

      const response = await this.tripAdvisorClient.get('/location/search', { params });
      return response.data.data || [];
    } catch (error) {
      console.error('TripAdvisor search error:', error);
      return [];
    }
  }

  /**
   * Get TripAdvisor location details
   */
  async getTripAdvisorLocationDetails(
    locationId: string,
    language?: string,
    currency?: string
  ): Promise<TripAdvisorLocation | null> {
    try {
      const params: any = {
        language: language || 'en'
      };
      if (currency) params.currency = currency;

      const response = await this.tripAdvisorClient.get(`/location/${locationId}/details`, { params });
      return response.data.data || null;
    } catch (error) {
      console.error('TripAdvisor location details error:', error);
      return null;
    }
  }

  /**
   * Get TripAdvisor location reviews
   */
  async getTripAdvisorReviews(
    locationId: string,
    language?: string,
    offset?: number,
    limit?: number
  ): Promise<TripAdvisorReview[]> {
    try {
      const params: any = {
        language: language || 'en',
        offset: offset || 0,
        limit: limit || 20
      };

      const response = await this.tripAdvisorClient.get(`/location/${locationId}/reviews`, { params });
      return response.data.data || [];
    } catch (error) {
      console.error('TripAdvisor reviews error:', error);
      return [];
    }
  }

  /**
   * Get TripAdvisor location photos
   */
  async getTripAdvisorPhotos(locationId: string, offset?: number, limit?: number): Promise<any[]> {
    try {
      const params = {
        offset: offset || 0,
        limit: limit || 20
      };

      const response = await this.tripAdvisorClient.get(`/location/${locationId}/photos`, { params });
      return response.data.data || [];
    } catch (error) {
      console.error('TripAdvisor photos error:', error);
      return [];
    }
  }

  // ==================== GOOGLE PLACES INTEGRATION ====================

  /**
   * Search Google Places
   */
  async searchGooglePlaces(
    query: string,
    location?: string,
    radius?: number,
    type?: string,
    language?: string
  ): Promise<any[]> {
    try {
      const params: any = {
        query,
        language: language || 'en'
      };

      if (location) params.location = location;
      if (radius) params.radius = radius;
      if (type) params.type = type;

      const response = await this.googleClient.get('/place/textsearch/json', { params });
      return response.data.results || [];
    } catch (error) {
      console.error('Google Places search error:', error);
      return [];
    }
  }

  /**
   * Get Google Place details
   */
  async getGooglePlaceDetails(
    placeId: string,
    fields?: string[],
    language?: string,
    sessionToken?: string
  ): Promise<GooglePlaceDetails | null> {
    try {
      const params: any = {
        place_id: placeId,
        language: language || 'en',
        fields: fields ? fields.join(',') : 'place_id,name,formatted_address,geometry,types,business_status,opening_hours,rating,user_ratings_total,reviews,photos,website,formatted_phone_number,price_level'
      };

      if (sessionToken) params.sessiontoken = sessionToken;

      const response = await this.googleClient.get('/place/details/json', { params });
      return response.data.result || null;
    } catch (error) {
      console.error('Google Place details error:', error);
      return null;
    }
  }

  /**
   * Get Google Place photo
   */
  async getGooglePlacePhoto(
    photoReference: string,
    maxWidth?: number,
    maxHeight?: number
  ): Promise<string> {
    const params: any = {
      photoreference: photoReference,
      key: this.googlePlacesConfig.apiKey
    };

    if (maxWidth) params.maxwidth = maxWidth;
    if (maxHeight) params.maxheight = maxHeight;

    const queryParams = new URLSearchParams(params).toString();
    return `${this.googlePlacesConfig.baseUrl}/place/photo?${queryParams}`;
  }

  /**
   * Find nearby places
   */
  async findNearbyGooglePlaces(
    location: string,
    radius: number,
    type?: string,
    keyword?: string,
    language?: string,
    minPrice?: number,
    maxPrice?: number
  ): Promise<any[]> {
    try {
      const params: any = {
        location,
        radius,
        language: language || 'en'
      };

      if (type) params.type = type;
      if (keyword) params.keyword = keyword;
      if (minPrice !== undefined) params.minprice = minPrice;
      if (maxPrice !== undefined) params.maxprice = maxPrice;

      const response = await this.googleClient.get('/place/nearbysearch/json', { params });
      return response.data.results || [];
    } catch (error) {
      console.error('Google nearby search error:', error);
      return [];
    }
  }

  // ==================== SYNCHRONIZATION METHODS ====================

  /**
   * Sync location data from TripAdvisor
   */
  async syncLocationFromTripAdvisor(
    tripAdvisorLocationId: string,
    internalLocationId: number
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Get TripAdvisor location details
      const tripAdvisorLocation = await this.getTripAdvisorLocationDetails(tripAdvisorLocationId);
      if (!tripAdvisorLocation) {
        return { success: false, error: 'TripAdvisor location not found' };
      }

      // Get reviews
      const reviews = await this.getTripAdvisorReviews(tripAdvisorLocationId);
      
      // Get photos
      const photos = await this.getTripAdvisorPhotos(tripAdvisorLocationId);

      // Transform data to our format
      const syncData = {
        external_id: tripAdvisorLocationId,
        name: tripAdvisorLocation.name,
        description: tripAdvisorLocation.description,
        rating: parseFloat(tripAdvisorLocation.rating || '0'),
        review_count: parseInt(tripAdvisorLocation.num_reviews || '0'),
        price_level: this.mapTripAdvisorPriceLevel(tripAdvisorLocation.price_level),
        reviews: reviews.map(this.transformTripAdvisorReview),
        photos: photos.map(this.transformTripAdvisorPhoto),
        last_sync: new Date().toISOString(),
        sync_source: 'tripadvisor'
      };

      return { success: true, data: syncData };
    } catch (error) {
      console.error('TripAdvisor sync error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Sync location data from Google Places
   */
  async syncLocationFromGoogle(
    googlePlaceId: string,
    internalLocationId: number
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Get Google Place details
      const googlePlace = await this.getGooglePlaceDetails(googlePlaceId);
      if (!googlePlace) {
        return { success: false, error: 'Google Place not found' };
      }

      // Transform data to our format
      const syncData = {
        external_id: googlePlaceId,
        name: googlePlace.name,
        address: googlePlace.formatted_address,
        coordinates: {
          lat: googlePlace.geometry.location.lat,
          lng: googlePlace.geometry.location.lng
        },
        rating: googlePlace.rating || 0,
        review_count: googlePlace.user_ratings_total || 0,
        price_level: googlePlace.price_level || 0,
        phone: googlePlace.formatted_phone_number,
        website: googlePlace.website,
        opening_hours: this.transformGoogleOpeningHours(googlePlace.opening_hours),
        reviews: googlePlace.reviews ? googlePlace.reviews.map(this.transformGoogleReview) : [],
        photos: googlePlace.photos ? googlePlace.photos.map((photo) => this.transformGooglePhoto(photo)) : [],
        last_sync: new Date().toISOString(),
        sync_source: 'google'
      };

      return { success: true, data: syncData };
    } catch (error) {
      console.error('Google sync error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Bulk sync locations from multiple platforms
   */
  async bulkSyncLocations(
    locations: Array<{
      internalId: number;
      googlePlaceId?: string;
      tripAdvisorId?: string;
    }>
  ): Promise<Array<{ locationId: number; success: boolean; data?: any; error?: string }>> {
    const results = [];

    for (const location of locations) {
      const locationResult: any = { locationId: location.internalId };

      // Sync from Google Places if available
      if (location.googlePlaceId) {
        const googleSync = await this.syncLocationFromGoogle(location.googlePlaceId, location.internalId);
        locationResult.google = googleSync;
      }

      // Sync from TripAdvisor if available
      if (location.tripAdvisorId) {
        const tripAdvisorSync = await this.syncLocationFromTripAdvisor(location.tripAdvisorId, location.internalId);
        locationResult.tripAdvisor = tripAdvisorSync;
      }

      locationResult.success = (locationResult.google?.success || locationResult.tripAdvisor?.success) || false;
      results.push(locationResult);

      // Add delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return results;
  }

  // ==================== DATA TRANSFORMATION METHODS ====================

  private mapTripAdvisorPriceLevel(priceLevel?: string): number {
    if (!priceLevel) return 0;
    const level = priceLevel.toLowerCase();
    if (level.includes('inexpensive') || level.includes('$')) return 1;
    if (level.includes('moderate') || level.includes('$$')) return 2;
    if (level.includes('expensive') || level.includes('$$$')) return 3;
    if (level.includes('very expensive') || level.includes('$$$$')) return 4;
    return 0;
  }

  private transformTripAdvisorReview = (review: TripAdvisorReview): any => ({
    external_id: review.id,
    title: review.title,
    content: review.text,
    rating: review.rating,
    author_name: review.user.username,
    author_avatar: review.user.avatar?.medium,
    publish_date: review.published_date,
    helpful_votes: review.helpful_votes,
    trip_type: review.trip_type,
    travel_date: review.travel_date,
    source: 'tripadvisor',
    source_url: review.url
  });

  private transformTripAdvisorPhoto = (photo: any): any => ({
    external_id: photo.id,
    url: photo.images?.large?.url || photo.images?.original?.url,
    thumbnail_url: photo.images?.thumbnail?.url,
    caption: photo.caption,
    width: photo.images?.large?.width,
    height: photo.images?.large?.height,
    source: 'tripadvisor'
  });

  private transformGoogleReview = (review: GooglePlaceReview): any => ({
    external_id: `google_${review.time}_${review.author_name}`,
    title: '', // Google reviews don't have titles
    content: review.text,
    rating: review.rating,
    author_name: review.author_name,
    author_avatar: review.profile_photo_url,
    publish_date: new Date(review.time * 1000).toISOString(),
    language: review.language,
    source: 'google',
    source_url: review.author_url
  });

  private transformGooglePhoto = (photo: any): any => ({
    external_id: photo.photo_reference,
    url: this.getGooglePlacePhoto(photo.photo_reference, 800, 600),
    thumbnail_url: this.getGooglePlacePhoto(photo.photo_reference, 200, 150),
    width: photo.width,
    height: photo.height,
    source: 'google',
    attributions: photo.html_attributions
  });

  private transformGoogleOpeningHours(openingHours?: any): any {
    if (!openingHours?.periods) return null;

    const hours: any = {};
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    openingHours.periods.forEach((period: any) => {
      const day = dayNames[period.open.day];
      hours[day] = {
        open: period.open.time,
        close: period.close?.time || '2359',
        closed: false
      };
    });

    return hours;
  }

  // ==================== ANALYTICS AND MONITORING ====================

  /**
   * Get sync statistics
   */
  getSyncStatistics(): {
    totalRequests: number;
    requestsByPlatform: { [platform: string]: number };
    rateLimitStatus: { [platform: string]: { current: number; limit: number } };
  } {
    const stats = {
      totalRequests: 0,
      requestsByPlatform: {} as { [platform: string]: number },
      rateLimitStatus: {} as { [platform: string]: { current: number; limit: number } }
    };

    Array.from(this.rateLimiter.entries()).forEach(([platform, requests]) => {
      const recentRequests = requests.filter(time => Date.now() - time < 60000);
      stats.requestsByPlatform[platform] = recentRequests.length;
      stats.totalRequests += recentRequests.length;

      const limit = platform === 'tripadvisor' 
        ? this.tripAdvisorConfig.rateLimitPerMinute 
        : this.googlePlacesConfig.rateLimitPerMinute;

      stats.rateLimitStatus[platform] = {
        current: recentRequests.length,
        limit
      };
    });

    return stats;
  }

  /**
   * Health check for external services
   */
  async healthCheck(): Promise<{
    tripadvisor: { status: 'ok' | 'error'; error?: string };
    google: { status: 'ok' | 'error'; error?: string };
  }> {
    const results: {
      tripadvisor: { status: 'ok' | 'error'; error?: string };
      google: { status: 'ok' | 'error'; error?: string };
    } = {
      tripadvisor: { status: 'ok', error: undefined },
      google: { status: 'ok', error: undefined }
    };

    // Test TripAdvisor API
    try {
      await this.searchTripAdvisorLocations('test', undefined, undefined, undefined, undefined, 'en');
    } catch (error) {
      results.tripadvisor.status = 'error';
      results.tripadvisor.error = error instanceof Error ? error.message : 'Unknown error';
    }

    // Test Google Places API
    try {
      await this.searchGooglePlaces('test');
    } catch (error) {
      results.google.status = 'error';
      results.google.error = error instanceof Error ? error.message : 'Unknown error';
    }

    return results;
  }
}

// Singleton instance
export const externalPlatformIntegration = new ExternalPlatformIntegration();
export default externalPlatformIntegration;