import axios, { AxiosInstance } from 'axios';

interface AdminAuthData {
  adminId: number;
  email: string;
  role: string;
  permissions: string[];
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  admin: AdminAuthData;
}

class AdminService {
  private apiClient: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.apiClient = axios.create({
      baseURL: '/api/admin',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Load token from localStorage on initialization
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('admin_token');
      if (this.token) {
        this.apiClient.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      }
    }

    // Add response interceptor for token expiration
    this.apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.logout();
        }
        return Promise.reject(error);
      }
    );
  }

  // ==================== AUTHENTICATION ====================

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await this.apiClient.post('/auth/login', credentials);
    const { token, admin } = response.data.data;
    
    this.token = token;
    this.apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_data', JSON.stringify(admin));
    }
    
    return { token, admin };
  }

  logout(): void {
    this.token = null;
    delete this.apiClient.defaults.headers.common['Authorization'];
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_data');
      window.location.href = '/admin/login';
    }
  }

  getStoredAdminData(): AdminAuthData | null {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('admin_data');
      return data ? JSON.parse(data) : null;
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  // ==================== DASHBOARD ====================

  async getDashboardStats() {
    const response = await this.apiClient.get('/dashboard/stats');
    return response.data.data;
  }

  // ==================== LOCATIONS ====================

  async getLocations(filters?: any) {
    const response = await this.apiClient.get('/locations', { params: filters });
    return response.data.data;
  }

  async getLocation(id: number) {
    const response = await this.apiClient.get(`/locations/${id}`);
    return response.data.data;
  }

  async createLocation(locationData: any) {
    const response = await this.apiClient.post('/locations', locationData);
    return response.data.data;
  }

  async updateLocation(id: number, locationData: any) {
    const response = await this.apiClient.put(`/locations/${id}`, locationData);
    return response.data.data;
  }

  async deleteLocation(id: number) {
    const response = await this.apiClient.delete(`/locations/${id}`);
    return response.data;
  }

  async bulkUpdateLocations(locationIds: number[], updateData: any) {
    const response = await this.apiClient.put('/locations', { locationIds, updateData });
    return response.data.data;
  }

  async bulkDeleteLocations(locationIds: number[]) {
    const response = await this.apiClient.delete('/locations', { data: { locationIds } });
    return response.data.data;
  }

  async syncLocationWithGoogle(locationId: number) {
    const response = await this.apiClient.post(`/locations/${locationId}/sync/google`);
    return response.data.data;
  }

  async syncLocationWithTripAdvisor(locationId: number) {
    const response = await this.apiClient.post(`/locations/${locationId}/sync/tripadvisor`);
    return response.data.data;
  }

  // ==================== USERS ====================

  async getUsers(filters?: any) {
    const response = await this.apiClient.get('/users', { params: filters });
    return response.data.data;
  }

  async getUser(id: number) {
    const response = await this.apiClient.get(`/users/${id}`);
    return response.data.data;
  }

  async updateUser(id: number, userData: any) {
    const response = await this.apiClient.put(`/users/${id}`, userData);
    return response.data.data;
  }

  async deleteUser(id: number) {
    const response = await this.apiClient.delete(`/users/${id}`);
    return response.data;
  }

  async bulkUpdateUsers(userIds: number[], updateData: any) {
    const response = await this.apiClient.put('/users', { userIds, updateData });
    return response.data.data;
  }

  // ==================== REVIEWS ====================

  async getReviews(filters?: any) {
    const response = await this.apiClient.get('/reviews', { params: filters });
    return response.data.data;
  }

  async getReview(id: number) {
    const response = await this.apiClient.get(`/reviews/${id}`);
    return response.data.data;
  }

  async moderateReview(id: number, action: 'approve' | 'reject' | 'flag', reason?: string) {
    const response = await this.apiClient.post(`/reviews/${id}/moderate`, { action, reason });
    return response.data.data;
  }

  async bulkModerateReviews(reviewIds: number[], action: string, reason?: string) {
    const response = await this.apiClient.post('/reviews/bulk-moderate', { reviewIds, action, reason });
    return response.data.data;
  }

  // ==================== ANALYTICS ====================

  async getAnalytics(type: string, filters?: any) {
    const response = await this.apiClient.get(`/analytics/${type}`, { params: filters });
    return response.data.data;
  }

  async exportData(type: string, filters?: any) {
    const response = await this.apiClient.get(`/export/${type}`, { 
      params: filters,
      responseType: 'blob'
    });
    return response.data;
  }

  // ==================== EXTERNAL PLATFORMS ====================

  async getPlatformConnections() {
    const response = await this.apiClient.get('/platforms');
    return response.data.data;
  }

  async updatePlatformConnection(platform: string, connectionData: any) {
    const response = await this.apiClient.put(`/platforms/${platform}`, connectionData);
    return response.data.data;
  }

  async testPlatformConnection(platform: string) {
    const response = await this.apiClient.post(`/platforms/${platform}/test`);
    return response.data.data;
  }

  async schedulePlatformSync(platform: string, scheduleData: any) {
    const response = await this.apiClient.post(`/platforms/${platform}/schedule`, scheduleData);
    return response.data.data;
  }

  // ==================== SYSTEM SETTINGS ====================

  async getSystemSettings() {
    const response = await this.apiClient.get('/settings');
    return response.data.data;
  }

  async updateSystemSettings(settings: any) {
    const response = await this.apiClient.put('/settings', settings);
    return response.data.data;
  }

  async getSystemLogs(filters?: any) {
    const response = await this.apiClient.get('/logs', { params: filters });
    return response.data.data;
  }

  // ==================== CONTENT MANAGEMENT ====================

  async getCategories() {
    const response = await this.apiClient.get('/categories');
    return response.data.data;
  }

  async createCategory(categoryData: any) {
    const response = await this.apiClient.post('/categories', categoryData);
    return response.data.data;
  }

  async updateCategory(id: number, categoryData: any) {
    const response = await this.apiClient.put(`/categories/${id}`, categoryData);
    return response.data.data;
  }

  async deleteCategory(id: number) {
    const response = await this.apiClient.delete(`/categories/${id}`);
    return response.data;
  }

  // ==================== UTILITY METHODS ====================

  private handleApiError(error: any): never {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('An unexpected error occurred');
  }
}

// Singleton instance
export const adminService = new AdminService();
export default adminService;