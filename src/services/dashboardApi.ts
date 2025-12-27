/**
 * Dashboard API Service Layer
 * Comprehensive API client for property management dashboard with Axios
 * Handles all HTTP requests, authentication, and data transformations
 */

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import logger from '../lib/logger';
import {
  Property,
  Booking,
  Conversation,
  Message,
  EarningRecord,
  Payout,
  TaxReport,
  AnalyticsMetrics,
  Review,
  User,
  ProfileSettings,
  HouseRulesSettings,
  PaymentSettings,
  SecuritySettings,
  PropertyWizardState,
  PropertyPhoto,
  BookingFilters,
  SortOption,
  CalendarBooking,
  DayPrice,
  BlockedDate,
  MinStayRule,
  MessageFilters,
  PropertyEarnings,
  PayoutHistory,
  CustomReport,
  IntegrationSettings,
  ValidationError,
  APIResponse,
  PaginatedResponse,
  PropertyCreateInput,
  PropertyUpdateInput,
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
  Step5Data,
  Step6Data,
  Step7Data,
  Step8Data,
  CancellationPolicySettings,
} from '../types/dashboard.types';

// ==================== TYPES & INTERFACES ====================

interface AuthTokenData {
  token: string;
  refreshToken?: string;
  expiresAt: Date;
}

interface ApiRequestOptions extends AxiosRequestConfig {
  retryCount?: number;
  timeout?: number;
}

interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ==================== ERROR HANDLING ====================

class ApiError extends Error {
  constructor(
    public statusCode: number,
    public response: any,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// ==================== AXIOS CLIENT SETUP ====================

/**
 * Creates and configures the Axios client instance
 * Includes interceptors for authentication and error handling
 */
class AxiosClientFactory {
  private static instance: AxiosInstance;

  static getInstance(): AxiosInstance {
    if (!this.instance) {
      this.instance = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api',
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      // Request Interceptor - Add Auth Token
      this.instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
          const token = localStorage.getItem('authToken');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error: AxiosError) => {
          logger.error('Request interceptor error:', error as Error, { component: 'Dashboardapi' });
          return Promise.reject(error);
        }
      );

      // Response Interceptor - Handle Token Refresh
      this.instance.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error: AxiosError) => {
          const originalRequest = error.config as ApiRequestOptions;

          if (error.response?.status === 401) {
            const refreshToken = localStorage.getItem('refreshToken');

            if (refreshToken && (!originalRequest.retryCount || originalRequest.retryCount < 1)) {
              originalRequest.retryCount = (originalRequest.retryCount || 0) + 1;

              try {
                const refreshResponse = await axios.post(
                  `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api'}/auth/refresh`,
                  { refreshToken }
                );

                const { token } = refreshResponse.data.data;
                localStorage.setItem('authToken', token);

                if (originalRequest.headers) {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                }

                return this.instance(originalRequest);
              } catch (refreshError) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
              }
            }

            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
          }

          return Promise.reject(error);
        }
      );
    }

    return this.instance;
  }
}

// ==================== MOCK DATA GENERATORS ====================

class MockDataGenerator {
  /**
   * Generates mock property data for development
   */
  static generateMockProperty(overrides?: Partial<Property>): Property {
    const id = `prop_${Math.random().toString(36).substr(2, 9)}`;
    return {
      id,
      ownerId: 'owner_123',
      name: 'Beautiful Beachfront Villa',
      type: 'villa',
      description: 'A stunning beachfront property with modern amenities',
      status: 'approved',
      location: {
        country: 'Turkey',
        province: 'Muğla',
        city: 'Bodrum',
        district: 'Bitez',
        postalCode: '48400',
        address: '123 Beach Street',
        coordinates: { latitude: 37.0214, longitude: 27.4421 },
        timezone: 'Europe/Istanbul',
      },
      numberOfRooms: 4,
      numberOfBathrooms: 3,
      maximumGuests: 8,
      bedrooms: { queen: 1, double: 1, single: 2, bunk: 0 },
      livingAreas: {
        hasKitchen: true,
        kitchenType: 'full',
        hasLivingRoom: true,
        hasDiningArea: true,
      },
      amenities: ['wifi', 'air_conditioning', 'pool', 'parking'],
      customAmenities: ['Smart TV', 'Wine fridge'],
      features: {
        hasWifi: true,
        hasTV: true,
        hasAirConditioning: true,
        hasHeating: true,
        hasParking: true,
        hasElevator: false,
        hasBalcony: true,
        hasTerrace: true,
        hasSwimmingPool: true,
        hasGym: false,
        hasJacuzzi: false,
        hasSauna: false,
        hasBBQ: true,
        hasWasher: true,
        hasDryer: true,
        hasDishwasher: true,
        hasOven: true,
        hasRefrigerator: true,
      },
      safetyFeatures: {
        hasSmokeDetector: true,
        hasFirstAidKit: true,
        hasCO2Detector: true,
        hasSecurityCamera: true,
        hasLock: true,
        hasKey: true,
      },
      pricing: {
        basePrice: 250,
        currency: 'USD',
        discounts: { weeklyDiscount: 10, monthlyDiscount: 15 },
        fees: { cleaningFee: 50, serviceFee: 30, taxPercentage: 18 },
        availability: { minStay: 2 },
      },
      houseRules: {
        checkInTime: '14:00',
        checkOutTime: '11:00',
        policies: {
          smokingAllowed: false,
          petsAllowed: true,
          petTypes: ['dogs', 'cats'],
          eventsAllowed: false,
          partiesAllowed: false,
          commercialPhotographyAllowed: true,
        },
        cancellationPolicy: 'moderate',
      },
      photos: [
        {
          id: 'photo_1',
          url: 'https://via.placeholder.com/400x300?text=Exterior',
          room: 'exterior',
          order: 1,
          isUploaded: true,
        },
      ],
      coverPhotoIndex: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      reviewCount: 15,
      bookingCount: 23,
      viewCount: 456,
      rating: 4.8,
      ...overrides,
    };
  }

  /**
   * Generates mock booking data for development
   */
  static generateMockBooking(overrides?: Partial<Booking>): Booking {
    const checkIn = new Date();
    checkIn.setDate(checkIn.getDate() + 7);
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + 3);

    return {
      id: `book_${Math.random().toString(36).substr(2, 9)}`,
      propertyId: 'prop_123',
      propertyName: 'Beautiful Beachfront Villa',
      guestId: 'guest_123',
      guestName: 'John Doe',
      guestEmail: 'john@example.com',
      checkIn,
      checkOut,
      totalNights: 3,
      guests: { adults: 2, children: 1, infants: 0 },
      pricing: {
        pricePerNight: 250,
        totalNights: 3,
        subtotal: 750,
        cleaningFee: 50,
        serviceFee: 30,
        taxes: 135,
        discount: 0,
        totalPrice: 965,
      },
      status: 'confirmed',
      paymentStatus: 'paid',
      createdAt: new Date(),
      updatedAt: new Date(),
      confirmedAt: new Date(),
      ...overrides,
    };
  }

  /**
   * Generates mock conversation data for development
   */
  static generateMockConversation(overrides?: Partial<Conversation>): Conversation {
    return {
      id: `conv_${Math.random().toString(36).substr(2, 9)}`,
      propertyId: 'prop_123',
      propertyName: 'Beautiful Beachfront Villa',
      guestId: 'guest_123',
      guestName: 'Jane Smith',
      guestEmail: 'jane@example.com',
      lastMessage: 'Looking forward to my stay!',
      lastMessageTime: new Date(),
      unreadCount: 0,
      isPinned: false,
      isArchived: false,
      ...overrides,
    };
  }
}

// ==================== PROPERTY API ====================

/**
 * Property API Service
 * Handles all property CRUD operations, image uploads, pricing, and calendar management
 */
class PropertyAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = AxiosClientFactory.getInstance();
  }

  /**
   * Fetch all properties for the authenticated user
   * @param pagination - Pagination parameters
   * @returns Promise with array of properties
   */
  async getProperties(pagination?: PaginationParams): Promise<PaginatedResponse<Property>> {
    try {
      const params = new URLSearchParams();
      if (pagination?.page) params.append('page', pagination.page.toString());
      if (pagination?.pageSize) params.append('pageSize', pagination.pageSize.toString());
      if (pagination?.sortBy) params.append('sortBy', pagination.sortBy);
      if (pagination?.sortOrder) params.append('sortOrder', pagination.sortOrder);

      const response = await this.client.get<APIResponse<PaginatedResponse<Property>>>(
        `/properties?${params.toString()}`
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch properties');
    }
  }

  /**
   * Fetch a single property by ID
   * @param propertyId - The property ID
   * @returns Promise with property data
   */
  async getPropertyById(propertyId: string): Promise<Property> {
    try {
      const response = await this.client.get<APIResponse<Property>>(
        `/properties/${propertyId}`
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, `Failed to fetch property ${propertyId}`);
    }
  }

  /**
   * Create a new property
   * @param data - Property creation data
   * @returns Promise with created property
   */
  async createProperty(data: PropertyCreateInput): Promise<Property> {
    try {
      const response = await this.client.post<APIResponse<Property>>('/properties', data);
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to create property');
    }
  }

  /**
   * Update an existing property
   * @param propertyId - The property ID
   * @param data - Property update data
   * @returns Promise with updated property
   */
  async updateProperty(propertyId: string, data: PropertyUpdateInput): Promise<Property> {
    try {
      const response = await this.client.patch<APIResponse<Property>>(
        `/properties/${propertyId}`,
        data
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, `Failed to update property ${propertyId}`);
    }
  }

  /**
   * Delete a property
   * @param propertyId - The property ID
   */
  async deleteProperty(propertyId: string): Promise<void> {
    try {
      await this.client.delete(`/properties/${propertyId}`);
    } catch (error) {
      throw this.handleError(error, `Failed to delete property ${propertyId}`);
    }
  }

  /**
   * Upload property images
   * @param propertyId - The property ID
   * @param files - Array of image files
   * @param onProgress - Callback for upload progress
   * @returns Promise with uploaded photos
   */
  async uploadPropertyImages(
    propertyId: string,
    files: File[],
    onProgress?: (progress: number) => void
  ): Promise<PropertyPhoto[]> {
    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`images`, file);
      });

      const response = await this.client.post<APIResponse<PropertyPhoto[]>>(
        `/properties/${propertyId}/images`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            if (onProgress && progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              onProgress(progress);
            }
          },
        }
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to upload images');
    }
  }

  /**
   * Delete a property image
   * @param propertyId - The property ID
   * @param photoId - The photo ID
   */
  async deletePropertyImage(propertyId: string, photoId: string): Promise<void> {
    try {
      await this.client.delete(`/properties/${propertyId}/images/${photoId}`);
    } catch (error) {
      throw this.handleError(error, 'Failed to delete image');
    }
  }

  /**
   * Update property pricing
   * @param propertyId - The property ID
   * @param pricing - Pricing data
   * @returns Promise with updated property
   */
  async updatePropertyPricing(propertyId: string, pricing: any): Promise<Property> {
    try {
      const response = await this.client.patch<APIResponse<Property>>(
        `/properties/${propertyId}/pricing`,
        pricing
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to update pricing');
    }
  }

  /**
   * Get calendar with bookings and pricing
   * @param propertyId - The property ID
   * @param startDate - Start date
   * @param endDate - End date
   * @returns Promise with calendar data
   */
  async getPropertyCalendar(
    propertyId: string,
    startDate: Date,
    endDate: Date
  ): Promise<{ bookings: CalendarBooking[]; prices: DayPrice[] }> {
    try {
      const params = new URLSearchParams({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });

      const response = await this.client.get(
        `/properties/${propertyId}/calendar?${params.toString()}`
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch calendar');
    }
  }

  /**
   * Block dates on the calendar
   * @param propertyId - The property ID
   * @param startDate - Start date
   * @param endDate - End date
   * @param reason - Reason for blocking
   * @returns Promise with blocked date record
   */
  async blockDates(
    propertyId: string,
    startDate: Date,
    endDate: Date,
    reason: string
  ): Promise<BlockedDate> {
    try {
      const response = await this.client.post<APIResponse<BlockedDate>>(
        `/properties/${propertyId}/blocked-dates`,
        { startDate, endDate, reason }
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to block dates');
    }
  }

  /**
   * Unblock dates on the calendar
   * @param propertyId - The property ID
   * @param blockedDateId - The blocked date ID
   */
  async unblockDates(propertyId: string, blockedDateId: string): Promise<void> {
    try {
      await this.client.delete(`/properties/${propertyId}/blocked-dates/${blockedDateId}`);
    } catch (error) {
      throw this.handleError(error, 'Failed to unblock dates');
    }
  }

  /**
   * Set minimum stay rules
   * @param propertyId - The property ID
   * @param startDate - Start date
   * @param endDate - End date
   * @param minStay - Minimum stay in nights
   * @returns Promise with min stay rule
   */
  async setMinStayRule(
    propertyId: string,
    startDate: Date,
    endDate: Date,
    minStay: number
  ): Promise<MinStayRule> {
    try {
      const response = await this.client.post<APIResponse<MinStayRule>>(
        `/properties/${propertyId}/min-stay-rules`,
        { startDate, endDate, minStay }
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to set minimum stay rule');
    }
  }

  /**
   * Get property availability
   * @param propertyId - The property ID
   * @returns Promise with availability rules
   */
  async getPropertyAvailability(propertyId: string): Promise<any> {
    try {
      const response = await this.client.get(`/properties/${propertyId}/availability`);
      return response.data.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch availability');
    }
  }

  /**
   * Publish property listing
   * @param propertyId - The property ID
   * @returns Promise with published property
   */
  async publishProperty(propertyId: string): Promise<Property> {
    try {
      const response = await this.client.post<APIResponse<Property>>(
        `/properties/${propertyId}/publish`
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to publish property');
    }
  }

  /**
   * Unpublish property listing
   * @param propertyId - The property ID
   * @returns Promise with unpublished property
   */
  async unpublishProperty(propertyId: string): Promise<Property> {
    try {
      const response = await this.client.post<APIResponse<Property>>(
        `/properties/${propertyId}/unpublish`
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to unpublish property');
    }
  }

  private handleError(error: any, defaultMessage: string): ApiError {
    if (error.response) {
      return new ApiError(
        error.response.status,
        error.response.data,
        error.response.data?.error || defaultMessage
      );
    }
    return new ApiError(500, null, defaultMessage);
  }
}

// ==================== BOOKING API ====================

/**
 * Booking API Service
 * Handles booking CRUD operations, filtering, status updates, bulk operations, and exports
 */
class BookingAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = AxiosClientFactory.getInstance();
  }

  /**
   * Fetch all bookings for the authenticated user
   * @param filters - Booking filter criteria
   * @param pagination - Pagination parameters
   * @param sort - Sort options
   * @returns Promise with paginated bookings
   */
  async getBookings(
    filters?: BookingFilters,
    pagination?: PaginationParams,
    sort?: SortOption
  ): Promise<PaginatedResponse<Booking>> {
    try {
      const params = new URLSearchParams();

      if (filters?.status) {
        filters.status.forEach((status) => params.append('status', status));
      }
      if (filters?.propertyId) {
        filters.propertyId.forEach((id) => params.append('propertyId', id));
      }
      if (filters?.dateRange) {
        params.append('startDate', filters.dateRange.start.toISOString());
        params.append('endDate', filters.dateRange.end.toISOString());
      }
      if (filters?.searchQuery) {
        params.append('search', filters.searchQuery);
      }
      if (pagination?.page) params.append('page', pagination.page.toString());
      if (pagination?.pageSize) params.append('pageSize', pagination.pageSize.toString());
      if (sort?.field) {
        params.append('sortBy', sort.field);
        params.append('sortOrder', sort.direction);
      }

      const response = await this.client.get<APIResponse<PaginatedResponse<Booking>>>(
        `/bookings?${params.toString()}`
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch bookings');
    }
  }

  /**
   * Fetch a single booking by ID
   * @param bookingId - The booking ID
   * @returns Promise with booking data
   */
  async getBookingById(bookingId: string): Promise<Booking> {
    try {
      const response = await this.client.get<APIResponse<Booking>>(
        `/bookings/${bookingId}`
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, `Failed to fetch booking ${bookingId}`);
    }
  }

  /**
   * Update booking status
   * @param bookingId - The booking ID
   * @param status - New booking status
   * @param reason - Optional reason for status change
   * @returns Promise with updated booking
   */
  async updateBookingStatus(
    bookingId: string,
    status: string,
    reason?: string
  ): Promise<Booking> {
    try {
      const response = await this.client.patch<APIResponse<Booking>>(
        `/bookings/${bookingId}/status`,
        { status, reason }
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to update booking status');
    }
  }

  /**
   * Add host notes to a booking
   * @param bookingId - The booking ID
   * @param notes - Host notes
   * @returns Promise with updated booking
   */
  async addHostNotes(bookingId: string, notes: string): Promise<Booking> {
    try {
      const response = await this.client.patch<APIResponse<Booking>>(
        `/bookings/${bookingId}/notes`,
        { hostNotes: notes }
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to add notes');
    }
  }

  /**
   * Approve a pending booking
   * @param bookingId - The booking ID
   * @returns Promise with updated booking
   */
  async approveBooking(bookingId: string): Promise<Booking> {
    try {
      const response = await this.client.post<APIResponse<Booking>>(
        `/bookings/${bookingId}/approve`
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to approve booking');
    }
  }

  /**
   * Reject a pending booking
   * @param bookingId - The booking ID
   * @param reason - Reason for rejection
   * @returns Promise with updated booking
   */
  async rejectBooking(bookingId: string, reason: string): Promise<Booking> {
    try {
      const response = await this.client.post<APIResponse<Booking>>(
        `/bookings/${bookingId}/reject`,
        { reason }
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to reject booking');
    }
  }

  /**
   * Cancel a booking
   * @param bookingId - The booking ID
   * @param reason - Reason for cancellation
   * @returns Promise with updated booking
   */
  async cancelBooking(bookingId: string, reason: string): Promise<Booking> {
    try {
      const response = await this.client.post<APIResponse<Booking>>(
        `/bookings/${bookingId}/cancel`,
        { reason }
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to cancel booking');
    }
  }

  /**
   * Bulk update booking statuses
   * @param bookingIds - Array of booking IDs
   * @param status - New status for all bookings
   * @returns Promise with count of updated bookings
   */
  async bulkUpdateBookings(bookingIds: string[], status: string): Promise<{ updated: number }> {
    try {
      const response = await this.client.post<APIResponse<{ updated: number }>>(
        '/bookings/bulk-update',
        { bookingIds, status }
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to bulk update bookings');
    }
  }

  /**
   * Export bookings to CSV
   * @param filters - Optional filters for export
   * @returns Promise with download URL
   */
  async exportBookings(filters?: BookingFilters): Promise<{ downloadUrl: string }> {
    try {
      const params = new URLSearchParams();

      if (filters?.status) {
        filters.status.forEach((status) => params.append('status', status));
      }
      if (filters?.propertyId) {
        filters.propertyId.forEach((id) => params.append('propertyId', id));
      }

      const response = await this.client.get<APIResponse<{ downloadUrl: string }>>(
        `/bookings/export?${params.toString()}`
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to export bookings');
    }
  }

  /**
   * Get booking statistics
   * @param propertyId - Optional property ID filter
   * @returns Promise with booking statistics
   */
  async getBookingStats(propertyId?: string): Promise<any> {
    try {
      const params = propertyId ? `?propertyId=${propertyId}` : '';
      const response = await this.client.get(`/bookings/stats${params}`);
      return response.data.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch booking statistics');
    }
  }

  private handleError(error: any, defaultMessage: string): ApiError {
    if (error.response) {
      return new ApiError(
        error.response.status,
        error.response.data,
        error.response.data?.error || defaultMessage
      );
    }
    return new ApiError(500, null, defaultMessage);
  }
}

// ==================== MESSAGE API ====================

/**
 * Message API Service
 * Handles messaging and conversation management
 */
class MessageAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = AxiosClientFactory.getInstance();
  }

  /**
   * Fetch all conversations
   * @param pagination - Pagination parameters
   * @returns Promise with paginated conversations
   */
  async getConversations(
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Conversation>> {
    try {
      const params = new URLSearchParams();
      if (pagination?.page) params.append('page', pagination.page.toString());
      if (pagination?.pageSize) params.append('pageSize', pagination.pageSize.toString());

      const response = await this.client.get<APIResponse<PaginatedResponse<Conversation>>>(
        `/conversations?${params.toString()}`
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch conversations');
    }
  }

  /**
   * Get a single conversation with all messages
   * @param conversationId - The conversation ID
   * @param pagination - Pagination parameters
   * @returns Promise with conversation and messages
   */
  async getConversationMessages(
    conversationId: string,
    pagination?: PaginationParams
  ): Promise<{ conversation: Conversation; messages: Message[] }> {
    try {
      const params = new URLSearchParams();
      if (pagination?.page) params.append('page', pagination.page.toString());
      if (pagination?.pageSize) params.append('pageSize', pagination.pageSize.toString());

      const response = await this.client.get(
        `/conversations/${conversationId}/messages?${params.toString()}`
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch conversation');
    }
  }

  /**
   * Send a message
   * @param conversationId - The conversation ID
   * @param content - Message content
   * @param attachments - Optional files to attach
   * @returns Promise with created message
   */
  async sendMessage(
    conversationId: string,
    content: string,
    attachments?: File[]
  ): Promise<Message> {
    try {
      const formData = new FormData();
      formData.append('content', content);

      if (attachments) {
        attachments.forEach((file) => {
          formData.append('attachments', file);
        });
      }

      const response = await this.client.post<APIResponse<Message>>(
        `/conversations/${conversationId}/messages`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to send message');
    }
  }

  /**
   * Edit a message
   * @param conversationId - The conversation ID
   * @param messageId - The message ID
   * @param content - Updated content
   * @returns Promise with updated message
   */
  async editMessage(
    conversationId: string,
    messageId: string,
    content: string
  ): Promise<Message> {
    try {
      const response = await this.client.patch<APIResponse<Message>>(
        `/conversations/${conversationId}/messages/${messageId}`,
        { content }
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to edit message');
    }
  }

  /**
   * Delete a message
   * @param conversationId - The conversation ID
   * @param messageId - The message ID
   */
  async deleteMessage(conversationId: string, messageId: string): Promise<void> {
    try {
      await this.client.delete(`/conversations/${conversationId}/messages/${messageId}`);
    } catch (error) {
      throw this.handleError(error, 'Failed to delete message');
    }
  }

  /**
   * Mark messages as read
   * @param conversationId - The conversation ID
   */
  async markConversationAsRead(conversationId: string): Promise<void> {
    try {
      await this.client.post(`/conversations/${conversationId}/mark-read`);
    } catch (error) {
      throw this.handleError(error, 'Failed to mark as read');
    }
  }

  /**
   * Search messages
   * @param filters - Search filters
   * @param pagination - Pagination parameters
   * @returns Promise with search results
   */
  async searchMessages(
    filters: MessageFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Message>> {
    try {
      const params = new URLSearchParams();

      if (filters.searchQuery) params.append('search', filters.searchQuery);
      if (filters.unreadOnly) params.append('unreadOnly', 'true');
      if (filters.conversationId) params.append('conversationId', filters.conversationId);
      if (pagination?.page) params.append('page', pagination.page.toString());
      if (pagination?.pageSize) params.append('pageSize', pagination.pageSize.toString());

      const response = await this.client.get<APIResponse<PaginatedResponse<Message>>>(
        `/messages/search?${params.toString()}`
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to search messages');
    }
  }

  /**
   * Archive a conversation
   * @param conversationId - The conversation ID
   * @returns Promise with updated conversation
   */
  async archiveConversation(conversationId: string): Promise<Conversation> {
    try {
      const response = await this.client.post<APIResponse<Conversation>>(
        `/conversations/${conversationId}/archive`
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to archive conversation');
    }
  }

  /**
   * Unarchive a conversation
   * @param conversationId - The conversation ID
   * @returns Promise with updated conversation
   */
  async unarchiveConversation(conversationId: string): Promise<Conversation> {
    try {
      const response = await this.client.post<APIResponse<Conversation>>(
        `/conversations/${conversationId}/unarchive`
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to unarchive conversation');
    }
  }

  private handleError(error: any, defaultMessage: string): ApiError {
    if (error.response) {
      return new ApiError(
        error.response.status,
        error.response.data,
        error.response.data?.error || defaultMessage
      );
    }
    return new ApiError(500, null, defaultMessage);
  }
}

// ==================== ANALYTICS API ====================

/**
 * Analytics API Service
 * Handles analytics data, metrics, reviews, and report generation
 */
class AnalyticsAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = AxiosClientFactory.getInstance();
  }

  /**
   * Get overview analytics metrics
   * @param propertyId - Optional property ID filter
   * @param dateRange - Optional date range
   * @returns Promise with analytics metrics
   */
  async getOverviewMetrics(
    propertyId?: string,
    dateRange?: { startDate: Date; endDate: Date }
  ): Promise<AnalyticsMetrics> {
    try {
      const params = new URLSearchParams();
      if (propertyId) params.append('propertyId', propertyId);
      if (dateRange) {
        params.append('startDate', dateRange.startDate.toISOString());
        params.append('endDate', dateRange.endDate.toISOString());
      }

      const response = await this.client.get<APIResponse<AnalyticsMetrics>>(
        `/analytics/overview?${params.toString()}`
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch overview metrics');
    }
  }

  /**
   * Get revenue analytics data
   * @param propertyId - Optional property ID filter
   * @param dateRange - Date range for the report
   * @returns Promise with revenue chart data
   */
  async getRevenueAnalytics(
    dateRange: { startDate: Date; endDate: Date },
    propertyId?: string
  ): Promise<any[]> {
    try {
      const params = new URLSearchParams({
        startDate: dateRange.startDate.toISOString(),
        endDate: dateRange.endDate.toISOString(),
      });

      if (propertyId) params.append('propertyId', propertyId);

      const response = await this.client.get<APIResponse<any[]>>(
        `/analytics/revenue?${params.toString()}`
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch revenue analytics');
    }
  }

  /**
   * Get occupancy analytics data
   * @param propertyId - Optional property ID filter
   * @param dateRange - Date range for the report
   * @returns Promise with occupancy data
   */
  async getOccupancyAnalytics(
    dateRange: { startDate: Date; endDate: Date },
    propertyId?: string
  ): Promise<any[]> {
    try {
      const params = new URLSearchParams({
        startDate: dateRange.startDate.toISOString(),
        endDate: dateRange.endDate.toISOString(),
      });

      if (propertyId) params.append('propertyId', propertyId);

      const response = await this.client.get<APIResponse<any[]>>(
        `/analytics/occupancy?${params.toString()}`
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch occupancy analytics');
    }
  }

  /**
   * Get property reviews
   * @param propertyId - The property ID
   * @param pagination - Pagination parameters
   * @returns Promise with paginated reviews
   */
  async getPropertyReviews(
    propertyId: string,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Review>> {
    try {
      const params = new URLSearchParams();
      if (pagination?.page) params.append('page', pagination.page.toString());
      if (pagination?.pageSize) params.append('pageSize', pagination.pageSize.toString());

      const response = await this.client.get<APIResponse<PaginatedResponse<Review>>>(
        `/properties/${propertyId}/reviews?${params.toString()}`
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch reviews');
    }
  }

  /**
   * Respond to a review
   * @param reviewId - The review ID
   * @param response - Host response text
   * @returns Promise with updated review
   */
  async respondToReview(reviewId: string, response: string): Promise<Review> {
    try {
      const apiResponse = await this.client.post<APIResponse<Review>>(
        `/reviews/${reviewId}/respond`,
        { response }
      );
      return apiResponse.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to respond to review');
    }
  }

  /**
   * Export analytics report
   * @param format - Export format (pdf, csv, etc)
   * @param filters - Optional filters for the report
   * @returns Promise with download URL
   */
  async exportAnalyticsReport(
    format: string,
    filters?: Record<string, any>
  ): Promise<{ downloadUrl: string }> {
    try {
      const response = await this.client.post<APIResponse<{ downloadUrl: string }>>(
        '/analytics/export',
        { format, filters }
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to export report');
    }
  }

  private handleError(error: any, defaultMessage: string): ApiError {
    if (error.response) {
      return new ApiError(
        error.response.status,
        error.response.data,
        error.response.data?.error || defaultMessage
      );
    }
    return new ApiError(500, null, defaultMessage);
  }
}

// ==================== EARNINGS API ====================

/**
 * Earnings API Service
 * Handles earnings records, payouts, and tax reports
 */
class EarningsAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = AxiosClientFactory.getInstance();
  }

  /**
   * Get earnings records
   * @param pagination - Pagination parameters
   * @param filters - Optional filters
   * @returns Promise with paginated earnings records
   */
  async getEarningRecords(
    pagination?: PaginationParams,
    filters?: { propertyId?: string; dateRange?: { startDate: Date; endDate: Date } }
  ): Promise<PaginatedResponse<EarningRecord>> {
    try {
      const params = new URLSearchParams();

      if (pagination?.page) params.append('page', pagination.page.toString());
      if (pagination?.pageSize) params.append('pageSize', pagination.pageSize.toString());
      if (filters?.propertyId) params.append('propertyId', filters.propertyId);
      if (filters?.dateRange) {
        params.append('startDate', filters.dateRange.startDate.toISOString());
        params.append('endDate', filters.dateRange.endDate.toISOString());
      }

      const response = await this.client.get<APIResponse<PaginatedResponse<EarningRecord>>>(
        `/earnings?${params.toString()}`
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch earnings');
    }
  }

  /**
   * Get payout history
   * @param pagination - Pagination parameters
   * @returns Promise with paginated payouts
   */
  async getPayoutHistory(pagination?: PaginationParams): Promise<PaginatedResponse<PayoutHistory>> {
    try {
      const params = new URLSearchParams();
      if (pagination?.page) params.append('page', pagination.page.toString());
      if (pagination?.pageSize) params.append('pageSize', pagination.pageSize.toString());

      const response = await this.client.get<APIResponse<PaginatedResponse<PayoutHistory>>>(
        `/payouts?${params.toString()}`
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch payout history');
    }
  }

  /**
   * Request a payout
   * @param amount - Amount to withdraw
   * @param method - Withdrawal method
   * @returns Promise with created payout
   */
  async requestPayout(amount: number, method: 'bank' | 'paypal' | 'stripe'): Promise<Payout> {
    try {
      const response = await this.client.post<APIResponse<Payout>>(
        '/payouts/request',
        { amount, method }
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to request payout');
    }
  }

  /**
   * Get tax report for a year
   * @param year - The year for the report
   * @returns Promise with tax report
   */
  async getTaxReport(year: number): Promise<TaxReport> {
    try {
      const response = await this.client.get<APIResponse<TaxReport>>(
        `/taxes/report?year=${year}`
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch tax report');
    }
  }

  /**
   * Get earnings breakdown by property
   * @param dateRange - Optional date range
   * @returns Promise with property earnings breakdown
   */
  async getPropertyEarningsBreakdown(
    dateRange?: { startDate: Date; endDate: Date }
  ): Promise<PropertyEarnings[]> {
    try {
      const params = new URLSearchParams();
      if (dateRange) {
        params.append('startDate', dateRange.startDate.toISOString());
        params.append('endDate', dateRange.endDate.toISOString());
      }

      const response = await this.client.get<APIResponse<PropertyEarnings[]>>(
        `/earnings/breakdown?${params.toString()}`
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch earnings breakdown');
    }
  }

  private handleError(error: any, defaultMessage: string): ApiError {
    if (error.response) {
      return new ApiError(
        error.response.status,
        error.response.data,
        error.response.data?.error || defaultMessage
      );
    }
    return new ApiError(500, null, defaultMessage);
  }
}

// ==================== SETTINGS API ====================

/**
 * Settings API Service
 * Handles user settings, preferences, and configurations
 */
class SettingsAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = AxiosClientFactory.getInstance();
  }

  /**
   * Get profile settings
   * @returns Promise with profile data
   */
  async getProfileSettings(): Promise<ProfileSettings> {
    try {
      const response = await this.client.get<APIResponse<ProfileSettings>>(
        '/settings/profile'
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch profile settings');
    }
  }

  /**
   * Update profile settings
   * @param data - Profile settings to update
   * @param avatar - Optional avatar file
   * @returns Promise with updated profile
   */
  async updateProfileSettings(data: ProfileSettings, avatar?: File): Promise<ProfileSettings> {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'avatar' && value !== undefined) {
          formData.append(key, JSON.stringify(value));
        }
      });

      if (avatar) {
        formData.append('avatar', avatar);
      }

      const response = await this.client.patch<APIResponse<ProfileSettings>>(
        '/settings/profile',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to update profile');
    }
  }

  /**
   * Get house rules settings
   * @returns Promise with house rules data
   */
  async getHouseRulesSettings(): Promise<HouseRulesSettings> {
    try {
      const response = await this.client.get<APIResponse<HouseRulesSettings>>(
        '/settings/house-rules'
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch house rules');
    }
  }

  /**
   * Update house rules settings
   * @param data - House rules to update
   * @returns Promise with updated rules
   */
  async updateHouseRulesSettings(data: HouseRulesSettings): Promise<HouseRulesSettings> {
    try {
      const response = await this.client.patch<APIResponse<HouseRulesSettings>>(
        '/settings/house-rules',
        data
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to update house rules');
    }
  }

  /**
   * Get cancellation policy settings
   * @returns Promise with cancellation policy data
   */
  async getCancellationPolicy(): Promise<CancellationPolicySettings> {
    try {
      const response = await this.client.get<APIResponse<CancellationPolicySettings>>(
        '/settings/cancellation-policy'
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch cancellation policy');
    }
  }

  /**
   * Update cancellation policy settings
   * @param data - Cancellation policy to update
   * @returns Promise with updated policy
   */
  async updateCancellationPolicy(data: CancellationPolicySettings): Promise<CancellationPolicySettings> {
    try {
      const response = await this.client.patch<APIResponse<CancellationPolicySettings>>(
        '/settings/cancellation-policy',
        data
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to update cancellation policy');
    }
  }

  /**
   * Get payment settings
   * @returns Promise with payment settings
   */
  async getPaymentSettings(): Promise<PaymentSettings> {
    try {
      const response = await this.client.get<APIResponse<PaymentSettings>>(
        '/settings/payment'
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch payment settings');
    }
  }

  /**
   * Update payment settings
   * @param data - Payment settings to update
   * @returns Promise with updated settings
   */
  async updatePaymentSettings(data: PaymentSettings): Promise<PaymentSettings> {
    try {
      const response = await this.client.patch<APIResponse<PaymentSettings>>(
        '/settings/payment',
        data
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to update payment settings');
    }
  }

  /**
   * Get security settings
   * @returns Promise with security settings
   */
  async getSecuritySettings(): Promise<SecuritySettings> {
    try {
      const response = await this.client.get<APIResponse<SecuritySettings>>(
        '/settings/security'
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch security settings');
    }
  }

  /**
   * Update security settings (e.g., enable 2FA)
   * @param data - Security settings to update
   * @returns Promise with updated settings
   */
  async updateSecuritySettings(data: Partial<SecuritySettings>): Promise<SecuritySettings> {
    try {
      const response = await this.client.patch<APIResponse<SecuritySettings>>(
        '/settings/security',
        data
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to update security settings');
    }
  }

  /**
   * Get integrations
   * @returns Promise with integration settings
   */
  async getIntegrations(): Promise<IntegrationSettings[]> {
    try {
      const response = await this.client.get<APIResponse<IntegrationSettings[]>>(
        '/settings/integrations'
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch integrations');
    }
  }

  private handleError(error: any, defaultMessage: string): ApiError {
    if (error.response) {
      return new ApiError(
        error.response.status,
        error.response.data,
        error.response.data?.error || defaultMessage
      );
    }
    return new ApiError(500, null, defaultMessage);
  }
}

// ==================== PROPERTY SUBMISSION API ====================

/**
 * Property Submission API Service
 * Handles property listing submission workflow and draft management
 */
class PropertySubmissionAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = AxiosClientFactory.getInstance();
  }

  /**
   * Load draft property data
   * @param draftId - The draft ID
   * @returns Promise with draft property wizard state
   */
  async loadDraft(draftId: string): Promise<PropertyWizardState> {
    try {
      const response = await this.client.get<APIResponse<PropertyWizardState>>(
        `/property-submissions/drafts/${draftId}`
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to load draft');
    }
  }

  /**
   * Save property submission draft
   * @param data - Draft data to save
   * @param draftId - Optional existing draft ID for updating
   * @returns Promise with saved draft
   */
  async saveDraft(data: PropertyWizardState, draftId?: string): Promise<PropertyWizardState> {
    try {
      const url = draftId
        ? `/property-submissions/drafts/${draftId}`
        : '/property-submissions/drafts';

      const response = await this.client[draftId ? 'patch' : 'post'](
        url,
        data
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to save draft');
    }
  }

  /**
   * Auto-save property submission draft
   * @param data - Draft data to auto-save
   * @param draftId - Existing draft ID
   * @returns Promise with saved draft
   */
  async autoSaveDraft(data: Partial<PropertyWizardState>, draftId?: string): Promise<void> {
    try {
      const url = draftId
        ? `/property-submissions/drafts/${draftId}/auto-save`
        : '/property-submissions/drafts/auto-save';

      await this.client.post(url, data);
    } catch (error) {
      logger.error('Auto-save failed:', error as Error, { component: 'Dashboardapi' });
      // Don't throw on auto-save failures to not interrupt user
    }
  }

  /**
   * Validate property submission step
   * @param stepNumber - Step number to validate
   * @param data - Step data to validate
   * @returns Promise with validation results
   */
  async validateStep(stepNumber: number, data: any): Promise<{ valid: boolean; errors?: ValidationError[] }> {
    try {
      const response = await this.client.post(
        `/property-submissions/validate-step`,
        { stepNumber, data }
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to validate step');
    }
  }

  /**
   * Upload property submission images
   * @param files - Image files to upload
   * @param draftId - Optional draft ID for tracking
   * @param onProgress - Progress callback
   * @returns Promise with uploaded images
   */
  async uploadSubmissionImages(
    files: File[],
    draftId?: string,
    onProgress?: (progress: number) => void
  ): Promise<PropertyPhoto[]> {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('images', file);
      });

      if (draftId) {
        formData.append('draftId', draftId);
      }

      const response = await this.client.post<APIResponse<PropertyPhoto[]>>(
        '/property-submissions/upload-images',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            if (onProgress && progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              onProgress(progress);
            }
          },
        }
      );
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error, 'Failed to upload images');
    }
  }

  /**
   * Submit property for review
   * @param data - Complete property submission data
   * @param draftId - Optional draft ID to clear
   * @returns Promise with submission confirmation
   */
  async submitProperty(
    data: PropertyCreateInput,
    draftId?: string
  ): Promise<{ propertyId: string; status: string; message: string }> {
    try {
      const response = await this.client.post(
        '/property-submissions/submit',
        { ...data, draftId }
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to submit property');
    }
  }

  private handleError(error: any, defaultMessage: string): ApiError {
    if (error.response) {
      return new ApiError(
        error.response.status,
        error.response.data,
        error.response.data?.error || defaultMessage
      );
    }
    return new ApiError(500, null, defaultMessage);
  }
}

// ==================== EXPORTS ====================

// Export service class instances as singletons
export const propertyAPI = new PropertyAPI();
export const bookingAPI = new BookingAPI();
export const messageAPI = new MessageAPI();
export const analyticsAPI = new AnalyticsAPI();
export const earningsAPI = new EarningsAPI();
export const settingsAPI = new SettingsAPI();
export const propertySubmissionAPI = new PropertySubmissionAPI();

// Export service classes for instantiation
export {
  PropertyAPI,
  BookingAPI,
  MessageAPI,
  AnalyticsAPI,
  EarningsAPI,
  SettingsAPI,
  PropertySubmissionAPI,
};

// Export utility classes
export { AxiosClientFactory, MockDataGenerator, ApiError };

// Export types
export type {
  AuthTokenData,
  ApiRequestOptions,
  PaginationParams,
};
