import axios from 'axios';
import logger from '../logger';
import {
  Location,
  Review,
  Photo,
  User,
  City,
  Country,
  LocationCategory,
  CreateReviewRequest,
  UpdateReviewRequest,
  CreateLocationRequest,
  SearchLocationsRequest,
  SearchLocationsResponse,
  ApiResponse,
  MultiLanguageContent,
  LocationAnalytics,
  GooglePlaceDetails,
  TripAdvisorLocation
} from '../types/review-system';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
const TRIPADVISOR_API_KEY = process.env.NEXT_PUBLIC_TRIPADVISOR_API_KEY;

class ReviewService {
  private apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  constructor() {
    // Add request interceptor for authentication
    this.apiClient.interceptors.request.use(
      (config) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for error handling
    this.apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // ==================== LOCATIONS ====================
  
  async searchLocations(params: SearchLocationsRequest): Promise<SearchLocationsResponse> {
    const response = await this.apiClient.get<ApiResponse<SearchLocationsResponse>>('/locations/search', {
      params
    });
    return response.data.data!;
  }

  async getLocation(id: number, language = 'en'): Promise<Location> {
    const response = await this.apiClient.get<ApiResponse<Location>>(`/locations/${id}`, {
      params: { language }
    });
    return response.data.data!;
  }

  async getLocationBySlug(slug: string, language = 'en'): Promise<Location> {
    const response = await this.apiClient.get<ApiResponse<Location>>(`/locations/slug/${slug}`, {
      params: { language }
    });
    return response.data.data!;
  }

  async createLocation(data: CreateLocationRequest): Promise<Location> {
    const response = await this.apiClient.post<ApiResponse<Location>>('/locations', data);
    return response.data.data!;
  }

  async updateLocation(id: number, data: Partial<CreateLocationRequest>): Promise<Location> {
    const response = await this.apiClient.put<ApiResponse<Location>>(`/locations/${id}`, data);
    return response.data.data!;
  }

  async deleteLocation(id: number): Promise<void> {
    await this.apiClient.delete(`/locations/${id}`);
  }

  async getLocationAnalytics(id: number): Promise<LocationAnalytics> {
    const response = await this.apiClient.get<ApiResponse<LocationAnalytics>>(`/locations/${id}/analytics`);
    return response.data.data!;
  }

  async getNearbyLocations(lat: number, lng: number, radius = 10, limit = 10): Promise<Location[]> {
    const response = await this.apiClient.get<ApiResponse<Location[]>>('/locations/nearby', {
      params: { lat, lng, radius, limit }
    });
    return response.data.data!;
  }

  async getTrendingLocations(city_id?: number, limit = 10): Promise<Location[]> {
    const response = await this.apiClient.get<ApiResponse<Location[]>>('/locations/trending', {
      params: { city_id, limit }
    });
    return response.data.data!;
  }

  async claimLocation(id: number): Promise<Location> {
    const response = await this.apiClient.post<ApiResponse<Location>>(`/locations/${id}/claim`);
    return response.data.data!;
  }

  // ==================== REVIEWS ====================

  async getReviews(locationId: number, page = 1, limit = 10, language = 'en'): Promise<Review[]> {
    const response = await this.apiClient.get<ApiResponse<Review[]>>(`/locations/${locationId}/reviews`, {
      params: { page, limit, language }
    });
    return response.data.data!;
  }

  async getReview(id: number): Promise<Review> {
    const response = await this.apiClient.get<ApiResponse<Review>>(`/reviews/${id}`);
    return response.data.data!;
  }

  async createReview(data: CreateReviewRequest): Promise<Review> {
    const formData = new FormData();
    
    // Add review data
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'photos' && Array.isArray(value)) {
        value.forEach((file, index) => {
          formData.append(`photos[${index}]`, file);
        });
      } else if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value as string);
      }
    });

    const response = await this.apiClient.post<ApiResponse<Review>>('/reviews', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data.data!;
  }

  async updateReview(data: UpdateReviewRequest): Promise<Review> {
    const { id, ...updateData } = data;
    const response = await this.apiClient.put<ApiResponse<Review>>(`/reviews/${id}`, updateData);
    return response.data.data!;
  }

  async deleteReview(id: number): Promise<void> {
    await this.apiClient.delete(`/reviews/${id}`);
  }

  async voteReview(reviewId: number, voteType: 'helpful' | 'not_helpful'): Promise<void> {
    await this.apiClient.post(`/reviews/${reviewId}/vote`, { vote_type: voteType });
  }

  async reportReview(reviewId: number, reason: string, description?: string): Promise<void> {
    await this.apiClient.post(`/reviews/${reviewId}/report`, { reason, description });
  }

  async getUserReviews(userId: number, page = 1, limit = 10): Promise<Review[]> {
    const response = await this.apiClient.get<ApiResponse<Review[]>>(`/users/${userId}/reviews`, {
      params: { page, limit }
    });
    return response.data.data!;
  }

  // ==================== PHOTOS ====================

  async getLocationPhotos(locationId: number, page = 1, limit = 20): Promise<Photo[]> {
    const response = await this.apiClient.get<ApiResponse<Photo[]>>(`/locations/${locationId}/photos`, {
      params: { page, limit }
    });
    return response.data.data!;
  }

  async uploadPhoto(file: File, locationId?: number, reviewId?: number, caption?: MultiLanguageContent): Promise<Photo> {
    const formData = new FormData();
    formData.append('photo', file);
    if (locationId) formData.append('location_id', locationId.toString());
    if (reviewId) formData.append('review_id', reviewId.toString());
    if (caption) formData.append('caption', JSON.stringify(caption));

    const response = await this.apiClient.post<ApiResponse<Photo>>('/photos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data.data!;
  }

  async deletePhoto(id: number): Promise<void> {
    await this.apiClient.delete(`/photos/${id}`);
  }

  async likePhoto(photoId: number): Promise<void> {
    await this.apiClient.post(`/photos/${photoId}/like`);
  }

  async unlikePhoto(photoId: number): Promise<void> {
    await this.apiClient.delete(`/photos/${photoId}/like`);
  }

  // ==================== LOCATION DATA ====================

  async getCountries(language = 'en'): Promise<Country[]> {
    const response = await this.apiClient.get<ApiResponse<Country[]>>('/countries', {
      params: { language }
    });
    return response.data.data!;
  }

  async getCities(countryId?: number, language = 'en', popular = false): Promise<City[]> {
    const response = await this.apiClient.get<ApiResponse<City[]>>('/cities', {
      params: { country_id: countryId, language, popular }
    });
    return response.data.data!;
  }

  async getLocationCategories(language = 'en'): Promise<LocationCategory[]> {
    const response = await this.apiClient.get<ApiResponse<LocationCategory[]>>('/categories', {
      params: { language }
    });
    return response.data.data!;
  }

  // ==================== USER ACTIONS ====================

  async favoriteLocation(locationId: number): Promise<void> {
    await this.apiClient.post(`/locations/${locationId}/favorite`);
  }

  async unfavoriteLocation(locationId: number): Promise<void> {
    await this.apiClient.delete(`/locations/${locationId}/favorite`);
  }

  async getUserFavorites(page = 1, limit = 20): Promise<Location[]> {
    const response = await this.apiClient.get<ApiResponse<Location[]>>('/user/favorites', {
      params: { page, limit }
    });
    return response.data.data!;
  }

  async followUser(userId: number): Promise<void> {
    await this.apiClient.post(`/users/${userId}/follow`);
  }

  async unfollowUser(userId: number): Promise<void> {
    await this.apiClient.delete(`/users/${userId}/follow`);
  }

  // ==================== EXTERNAL INTEGRATIONS ====================

  async searchGooglePlaces(query: string, location?: { lat: number; lng: number }, radius = 5000): Promise<GooglePlaceDetails[]> {
    if (!GOOGLE_PLACES_API_KEY) {
      throw new Error('Google Places API key not configured');
    }

    const params: any = {
      query,
      key: GOOGLE_PLACES_API_KEY,
      type: 'establishment',
    };

    if (location) {
      params.location = `${location.lat},${location.lng}`;
      params.radius = radius;
    }

    const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      params
    });

    return response.data.results || [];
  }

  async getGooglePlaceDetails(placeId: string): Promise<GooglePlaceDetails | null> {
    if (!GOOGLE_PLACES_API_KEY) {
      throw new Error('Google Places API key not configured');
    }

    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
        params: {
          place_id: placeId,
          key: GOOGLE_PLACES_API_KEY,
          fields: 'name,formatted_address,geometry,types,business_status,opening_hours,rating,user_ratings_total,photos,reviews'
        }
      });

      return response.data.result || null;
    } catch (error) {
      logger.error('Error fetching Google Place details:', error as Error, { component: 'ReviewService' });
      return null;
    }
  }

  async syncWithGoogle(locationId: number): Promise<void> {
    await this.apiClient.post(`/locations/${locationId}/sync/google`);
  }

  async syncWithTripAdvisor(locationId: number): Promise<void> {
    await this.apiClient.post(`/locations/${locationId}/sync/tripadvisor`);
  }

  async searchTripAdvisorLocations(query: string, location?: { lat: number; lng: number }): Promise<TripAdvisorLocation[]> {
    if (!TRIPADVISOR_API_KEY) {
      throw new Error('TripAdvisor API key not configured');
    }

    const params: any = {
      key: TRIPADVISOR_API_KEY,
      searchQuery: query,
      category: 'attractions',
    };

    if (location) {
      params.latLong = `${location.lat},${location.lng}`;
    }

    try {
      const response = await axios.get('https://api.content.tripadvisor.com/api/v1/location/search', {
        params,
        headers: {
          'Accept': 'application/json'
        }
      });

      return response.data.data || [];
    } catch (error) {
      logger.error('Error searching TripAdvisor locations:', error as Error, { component: 'ReviewService' });
      return [];
    }
  }

  // ==================== ANALYTICS & INSIGHTS ====================

  async getReviewTrends(locationId: number, period = '30d'): Promise<any> {
    const response = await this.apiClient.get(`/locations/${locationId}/analytics/review-trends`, {
      params: { period }
    });
    return response.data.data;
  }

  async getPopularTimes(locationId: number): Promise<any> {
    const response = await this.apiClient.get(`/locations/${locationId}/analytics/popular-times`);
    return response.data.data;
  }

  async getCompetitorAnalysis(locationId: number, radius = 2): Promise<Location[]> {
    const response = await this.apiClient.get<ApiResponse<Location[]>>(`/locations/${locationId}/competitors`, {
      params: { radius }
    });
    return response.data.data!;
  }

  // ==================== MODERATION ====================

  async reportContent(contentType: 'review' | 'photo' | 'location', contentId: number, reason: string, description?: string): Promise<void> {
    await this.apiClient.post('/reports', {
      content_type: contentType,
      content_id: contentId,
      reason,
      description
    });
  }

  async moderateContent(reportId: number, action: 'approve' | 'reject' | 'require_changes', notes?: string): Promise<void> {
    await this.apiClient.post(`/reports/${reportId}/moderate`, {
      action,
      moderator_notes: notes
    });
  }

  // ==================== BULK OPERATIONS ====================

  async bulkImportLocations(data: CreateLocationRequest[]): Promise<Location[]> {
    const response = await this.apiClient.post<ApiResponse<Location[]>>('/locations/bulk-import', { locations: data });
    return response.data.data!;
  }

  async bulkImportFromGoogle(placeIds: string[]): Promise<Location[]> {
    const response = await this.apiClient.post<ApiResponse<Location[]>>('/locations/import/google', { place_ids: placeIds });
    return response.data.data!;
  }

  async bulkImportFromTripAdvisor(locationIds: string[]): Promise<Location[]> {
    const response = await this.apiClient.post<ApiResponse<Location[]>>('/locations/import/tripadvisor', { location_ids: locationIds });
    return response.data.data!;
  }

  // ==================== TRANSLATIONS ====================

  async translateContent(text: string, fromLanguage: string, toLanguage: string): Promise<string> {
    const response = await this.apiClient.post<ApiResponse<string>>('/translate', {
      text,
      from: fromLanguage,
      to: toLanguage
    });
    return response.data.data!;
  }

  async getAutoTranslation(locationId: number, targetLanguage: string): Promise<MultiLanguageContent> {
    const response = await this.apiClient.get<ApiResponse<MultiLanguageContent>>(`/locations/${locationId}/translate/${targetLanguage}`);
    return response.data.data!;
  }

  async updateTranslation(locationId: number, language: string, field: string, content: string): Promise<void> {
    await this.apiClient.put(`/locations/${locationId}/translations`, {
      language,
      field,
      content
    });
  }

  // ==================== UTILITY METHODS ====================

  formatRating(rating: number): string {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  }

  formatPriceRange(range: number): string {
    return '$'.repeat(range);
  }

  formatDistance(meters: number): string {
    if (meters < 1000) {
      return `${Math.round(meters)}m`;
    }
    return `${(meters / 1000).toFixed(1)}km`;
  }

  getLocalizedContent(content: MultiLanguageContent, language: string, fallback = 'en'): string {
    return content[language] || content[fallback] || Object.values(content)[0] || '';
  }

  generateSlug(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}

// Singleton instance
export const reviewService = new ReviewService();
export default reviewService;