/**
 * API Service Layer
 * Centralized API calls for all dashboard features
 */

import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import {
  Property,
  Booking,
  Message,
  Conversation,
  Review,
  AnalyticsMetrics,
  Payout,
  PayoutHistory,
  TaxReport,
  EarningRecord,
  PaginatedResponse,
  ApiResponse,
  BookingFilters,
  DateRange,
  MessageFilters,
  ProfileSettings,
  PropertySettings,
  HouseRulesSettings,
  PaymentSettings,
  NotificationSettings,
  SecuritySettings,
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
  Step5Data,
  Step6Data,
  Step7Data,
} from '@/types/dashboard.types';

// ============================================================================
// API CLIENT SETUP
// ============================================================================

class APIClient {
  private client: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Handle token expiry
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  private async handleRequest<T>(
    request: Promise<AxiosResponse<T>>
  ): Promise<T> {
    try {
      const response = await request;
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || error.message);
      }
      throw error;
    }
  }

  get<T>(url: string, config?: any): Promise<T> {
    return this.handleRequest(this.client.get<T>(url, config));
  }

  post<T>(url: string, data?: any, config?: any): Promise<T> {
    return this.handleRequest(this.client.post<T>(url, data, config));
  }

  put<T>(url: string, data?: any, config?: any): Promise<T> {
    return this.handleRequest(this.client.put<T>(url, data, config));
  }

  patch<T>(url: string, data?: any, config?: any): Promise<T> {
    return this.handleRequest(this.client.patch<T>(url, data, config));
  }

  delete<T>(url: string, config?: any): Promise<T> {
    return this.handleRequest(this.client.delete<T>(url, config));
  }

  postFormData<T>(
    url: string,
    formData: FormData,
    onUploadProgress?: (progressEvent: any) => void
  ): Promise<T> {
    return this.handleRequest(
      this.client.post<T>(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
      })
    );
  }
}

const apiClient = new APIClient();

// ============================================================================
// PROPERTY API
// ============================================================================

export class PropertyAPI {
  static async getProperties(): Promise<Property[]> {
    return apiClient.get<Property[]>('/properties');
  }

  static async getProperty(id: string): Promise<Property> {
    return apiClient.get<Property>(`/properties/${id}`);
  }

  static async createProperty(data: Partial<Property>): Promise<Property> {
    return apiClient.post<Property>('/properties', data);
  }

  static async updateProperty(
    id: string,
    data: Partial<Property>
  ): Promise<Property> {
    return apiClient.put<Property>(`/properties/${id}`, data);
  }

  static async deleteProperty(id: string): Promise<void> {
    return apiClient.delete(`/properties/${id}`);
  }

  static async uploadPropertyImages(
    propertyId: string,
    files: File[],
    onUploadProgress?: (progressEvent: any) => void
  ): Promise<any> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    return apiClient.postFormData(
      `/properties/${propertyId}/images`,
      formData,
      onUploadProgress
    );
  }

  static async updatePricing(
    propertyId: string,
    pricingData: any
  ): Promise<any> {
    return apiClient.put(`/properties/${propertyId}/pricing`, pricingData);
  }

  static async getCalendar(propertyId: string): Promise<any> {
    return apiClient.get(`/properties/${propertyId}/calendar`);
  }

  static async updateCalendar(propertyId: string, data: any): Promise<any> {
    return apiClient.put(`/properties/${propertyId}/calendar`, data);
  }

  static async blockDates(propertyId: string, dates: any): Promise<any> {
    return apiClient.post(`/properties/${propertyId}/block-dates`, dates);
  }

  static async verifyProperty(id: string): Promise<Property> {
    return apiClient.post(`/properties/${id}/verify`, {});
  }
}

// ============================================================================
// BOOKING API
// ============================================================================

export class BookingAPI {
  static async getBookings(filters?: BookingFilters): Promise<Booking[]> {
    const params = new URLSearchParams();

    if (filters?.status) params.append('status', filters.status);
    if (filters?.propertyId) params.append('propertyId', filters.propertyId);
    if (filters?.dateRange?.startDate)
      params.append('startDate', filters.dateRange.startDate.toISOString());
    if (filters?.dateRange?.endDate)
      params.append('endDate', filters.dateRange.endDate.toISOString());
    if (filters?.searchQuery)
      params.append('search', filters.searchQuery);

    return apiClient.get<Booking[]>(`/bookings?${params.toString()}`);
  }

  static async getBooking(id: string): Promise<Booking> {
    return apiClient.get<Booking>(`/bookings/${id}`);
  }

  static async confirmBooking(id: string): Promise<Booking> {
    return apiClient.post<Booking>(`/bookings/${id}/confirm`, {});
  }

  static async rejectBooking(id: string, reason?: string): Promise<Booking> {
    return apiClient.post<Booking>(`/bookings/${id}/reject`, { reason });
  }

  static async cancelBooking(
    id: string,
    reason?: string
  ): Promise<Booking> {
    return apiClient.post<Booking>(`/bookings/${id}/cancel`, { reason });
  }

  static async markCheckedIn(id: string): Promise<Booking> {
    return apiClient.post<Booking>(`/bookings/${id}/check-in`, {});
  }

  static async markCheckedOut(id: string): Promise<Booking> {
    return apiClient.post<Booking>(`/bookings/${id}/check-out`, {});
  }

  static async bulkConfirm(bookingIds: string[]): Promise<any> {
    return apiClient.post('/bookings/bulk/confirm', { bookingIds });
  }

  static async exportBookings(format: 'csv' | 'pdf'): Promise<Blob> {
    return apiClient.get(`/bookings/export?format=${format}`);
  }
}

// ============================================================================
// MESSAGE API
// ============================================================================

export class MessageAPI {
  static async getConversations(): Promise<Conversation[]> {
    return apiClient.get<Conversation[]>('/messages/conversations');
  }

  static async getConversation(conversationId: string): Promise<Conversation> {
    return apiClient.get<Conversation>(
      `/messages/conversations/${conversationId}`
    );
  }

  static async getMessages(
    conversationId: string,
    filters?: MessageFilters
  ): Promise<Message[]> {
    const params = new URLSearchParams();

    if (filters?.isRead !== undefined)
      params.append('isRead', filters.isRead.toString());
    if (filters?.dateRange?.startDate)
      params.append('startDate', filters.dateRange.startDate.toISOString());

    return apiClient.get<Message[]>(
      `/messages/conversations/${conversationId}/messages?${params.toString()}`
    );
  }

  static async sendMessage(
    conversationId: string,
    content: string,
    attachments?: any[]
  ): Promise<Message> {
    return apiClient.post<Message>(
      `/messages/conversations/${conversationId}/messages`,
      {
        content,
        attachments,
      }
    );
  }

  static async markAsRead(messageId: string): Promise<Message> {
    return apiClient.put<Message>(`/messages/${messageId}/read`, {});
  }

  static async markConversationAsRead(
    conversationId: string
  ): Promise<Conversation> {
    return apiClient.put<Conversation>(
      `/messages/conversations/${conversationId}/read`,
      {}
    );
  }

  static async deleteMessage(messageId: string): Promise<void> {
    return apiClient.delete(`/messages/${messageId}`);
  }

  static async searchMessages(query: string): Promise<Message[]> {
    return apiClient.get<Message[]>(`/messages/search?q=${query}`);
  }

  static async archiveConversation(conversationId: string): Promise<void> {
    return apiClient.post(
      `/messages/conversations/${conversationId}/archive`,
      {}
    );
  }

  static async pinConversation(conversationId: string): Promise<void> {
    return apiClient.post(
      `/messages/conversations/${conversationId}/pin`,
      {}
    );
  }
}

// ============================================================================
// ANALYTICS API
// ============================================================================

export class AnalyticsAPI {
  static async getOverview(): Promise<AnalyticsMetrics> {
    return apiClient.get<AnalyticsMetrics>('/analytics/overview');
  }

  static async getRevenue(dateRange: DateRange): Promise<any> {
    const params = new URLSearchParams();
    params.append('startDate', dateRange.startDate.toISOString());
    params.append('endDate', dateRange.endDate.toISOString());

    return apiClient.get(`/analytics/revenue?${params.toString()}`);
  }

  static async getOccupancy(propertyId?: string): Promise<any> {
    let url = '/analytics/occupancy';
    if (propertyId) {
      url += `?propertyId=${propertyId}`;
    }
    return apiClient.get(url);
  }

  static async getReviews(): Promise<Review[]> {
    return apiClient.get<Review[]>('/analytics/reviews');
  }

  static async getChartData(
    metric: string,
    dateRange: DateRange
  ): Promise<any> {
    const params = new URLSearchParams();
    params.append('metric', metric);
    params.append('startDate', dateRange.startDate.toISOString());
    params.append('endDate', dateRange.endDate.toISOString());

    return apiClient.get(`/analytics/chart?${params.toString()}`);
  }

  static async exportReport(format: 'pdf' | 'xlsx'): Promise<Blob> {
    return apiClient.get(`/analytics/export?format=${format}`);
  }

  static async getCompetitorAnalysis(propertyId: string): Promise<any> {
    return apiClient.get(`/analytics/competitors/${propertyId}`);
  }
}

// ============================================================================
// EARNINGS API
// ============================================================================

export class EarningsAPI {
  static async getEarnings(dateRange: DateRange): Promise<EarningRecord[]> {
    const params = new URLSearchParams();
    params.append('startDate', dateRange.startDate.toISOString());
    params.append('endDate', dateRange.endDate.toISOString());

    return apiClient.get<EarningRecord[]>(`/earnings?${params.toString()}`);
  }

  static async getPayouts(): Promise<Payout[]> {
    return apiClient.get<Payout[]>('/earnings/payouts');
  }

  static async getPendingPayouts(): Promise<Payout[]> {
    return apiClient.get<Payout[]>('/earnings/payouts/pending');
  }

  static async requestPayout(amount: number): Promise<Payout> {
    return apiClient.post<Payout>('/earnings/payouts/request', { amount });
  }

  static async getPayoutHistory(): Promise<PayoutHistory[]> {
    return apiClient.get<PayoutHistory[]>('/earnings/payouts/history');
  }

  static async getTaxReport(year: number): Promise<TaxReport> {
    return apiClient.get<TaxReport>(`/earnings/tax-report/${year}`);
  }

  static async getEarningsByProperty(propertyId: string): Promise<any> {
    return apiClient.get(`/earnings/properties/${propertyId}`);
  }
}

// ============================================================================
// SETTINGS API
// ============================================================================

export class SettingsAPI {
  // Profile Settings
  static async getProfileSettings(): Promise<ProfileSettings> {
    return apiClient.get<ProfileSettings>('/settings/profile');
  }

  static async updateProfileSettings(
    settings: Partial<ProfileSettings>
  ): Promise<ProfileSettings> {
    return apiClient.put<ProfileSettings>('/settings/profile', settings);
  }

  static async uploadProfileAvatar(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    return apiClient.postFormData('/settings/profile/avatar', formData);
  }

  // Property Settings
  static async getPropertySettings(propertyId: string): Promise<PropertySettings> {
    return apiClient.get<PropertySettings>(
      `/settings/property/${propertyId}`
    );
  }

  static async updatePropertySettings(
    propertyId: string,
    settings: Partial<PropertySettings>
  ): Promise<PropertySettings> {
    return apiClient.put<PropertySettings>(
      `/settings/property/${propertyId}`,
      settings
    );
  }

  // House Rules
  static async getHouseRules(propertyId: string): Promise<HouseRulesSettings> {
    return apiClient.get<HouseRulesSettings>(
      `/settings/property/${propertyId}/house-rules`
    );
  }

  static async updateHouseRules(
    propertyId: string,
    rules: Partial<HouseRulesSettings>
  ): Promise<HouseRulesSettings> {
    return apiClient.put<HouseRulesSettings>(
      `/settings/property/${propertyId}/house-rules`,
      rules
    );
  }

  // Payment Settings
  static async getPaymentSettings(): Promise<PaymentSettings> {
    return apiClient.get<PaymentSettings>('/settings/payment');
  }

  static async updatePaymentSettings(
    settings: Partial<PaymentSettings>
  ): Promise<PaymentSettings> {
    return apiClient.put<PaymentSettings>('/settings/payment', settings);
  }

  static async verifyBankAccount(data: any): Promise<any> {
    return apiClient.post('/settings/payment/verify-bank', data);
  }

  // Notification Settings
  static async getNotificationSettings(): Promise<NotificationSettings> {
    return apiClient.get<NotificationSettings>('/settings/notifications');
  }

  static async updateNotificationSettings(
    settings: Partial<NotificationSettings>
  ): Promise<NotificationSettings> {
    return apiClient.put<NotificationSettings>(
      '/settings/notifications',
      settings
    );
  }

  // Security Settings
  static async getSecuritySettings(): Promise<SecuritySettings> {
    return apiClient.get<SecuritySettings>('/settings/security');
  }

  static async updatePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<any> {
    return apiClient.post('/settings/security/password', {
      oldPassword,
      newPassword,
    });
  }

  static async enableTwoFactor(method: string): Promise<any> {
    return apiClient.post('/settings/security/2fa/enable', { method });
  }

  static async disableTwoFactor(): Promise<any> {
    return apiClient.post('/settings/security/2fa/disable', {});
  }

  static async verifyTwoFactor(code: string): Promise<any> {
    return apiClient.post('/settings/security/2fa/verify', { code });
  }

  static async getActiveSessions(): Promise<any> {
    return apiClient.get('/settings/security/sessions');
  }

  static async signOutSession(sessionId: string): Promise<void> {
    return apiClient.post(`/settings/security/sessions/${sessionId}/signout`, {});
  }

  static async signOutAllSessions(): Promise<void> {
    return apiClient.post('/settings/security/sessions/signout-all', {});
  }
}

// ============================================================================
// PROPERTY SUBMISSION WIZARD API
// ============================================================================

export class PropertySubmissionAPI {
  static async saveDraft(
    data: Partial<any>,
    draftId?: string
  ): Promise<any> {
    if (draftId) {
      return apiClient.put(`/properties/draft/${draftId}`, data);
    } else {
      return apiClient.post('/properties/draft', data);
    }
  }

  static async getDraft(draftId: string): Promise<any> {
    return apiClient.get(`/properties/draft/${draftId}`);
  }

  static async validateStep(step: number, data: any): Promise<any> {
    return apiClient.post(`/properties/validate/step-${step}`, data);
  }

  static async uploadStep5Images(
    files: File[],
    onUploadProgress?: (progressEvent: any) => void
  ): Promise<any> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    return apiClient.postFormData(
      '/properties/upload-images',
      formData,
      onUploadProgress
    );
  }

  static async submitProperty(
    data: any,
    submissionType: 'save_draft' | 'submit_for_review'
  ): Promise<Property> {
    return apiClient.post<Property>('/properties/submit', {
      data,
      submissionType,
    });
  }

  static async checkPropertyNameAvailability(name: string): Promise<boolean> {
    const { available } = await apiClient.get<{ available: boolean }>(
      `/properties/check-name?name=${encodeURIComponent(name)}`
    );
    return available;
  }

  static async validateImages(files: File[]): Promise<any> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    return apiClient.postFormData(
      '/properties/validate-images',
      formData
    );
  }
}

// ============================================================================
// EXPORT ALL API CLASSES
// ============================================================================

export {
  PropertyAPI,
  BookingAPI,
  MessageAPI,
  AnalyticsAPI,
  EarningsAPI,
  SettingsAPI,
  PropertySubmissionAPI,
};

// ============================================================================
// API CLIENT EXPORT
// ============================================================================

export default apiClient;
