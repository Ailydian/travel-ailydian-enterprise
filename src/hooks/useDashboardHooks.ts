// Property Owner Dashboard - React Query Hooks
// Comprehensive hooks for data fetching with caching & optimistic updates

import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import type {
  Property,
  Booking,
  BookingFilters,
  SortOption,
  Conversation,
  Message,
  AnalyticsMetrics,
  ChartDataPoint,
  Review,
  EarningRecord,
  PropertyEarnings,
  Payout,
  PayoutHistory,
  TaxReport,
  DateRange,
  ProfileSettings,
  HouseRulesSettings,
  CancellationPolicySettings,
  PaymentSettings,
  NotificationSettings,
  SecuritySettings,
  IntegrationSettings,
  PropertyCreateInput,
  DashboardStats,
  PropertyPhoto,
  SeasonalPrice,
  BlockedDate,
  MinStayRule,
  DayPrice,
  CompetitorMetrics,
  CustomReport,
  PaginatedResponse,
  APIResponse,
} from '../types/dashboard.types';

import {
  propertyAPI,
  bookingAPI,
  messageAPI,
  analyticsAPI,
  earningsAPI,
  settingsAPI,
  propertySubmissionAPI,
} from '../services/dashboardApi';

// ==================== QUERY KEYS ====================

export const queryKeys = {
  // Properties
  properties: ['properties'] as const,
  property: (id: string) => ['properties', id] as const,
  propertyCalendar: (id: string, month: number, year: number) =>
    ['properties', id, 'calendar', month, year] as const,
  propertyAvailability: (id: string) => ['properties', id, 'availability'] as const,

  // Bookings
  bookings: ['bookings'] as const,
  bookingsFiltered: (filters: BookingFilters, sort: SortOption) =>
    ['bookings', 'filtered', filters, sort] as const,
  booking: (id: string) => ['bookings', id] as const,
  bookingStats: ['bookings', 'stats'] as const,

  // Messages
  conversations: ['conversations'] as const,
  conversation: (id: string) => ['conversations', id] as const,
  messages: (conversationId: string) => ['messages', conversationId] as const,

  // Analytics
  analyticsOverview: (dateRange: DateRange, propertyIds: string[]) =>
    ['analytics', 'overview', dateRange, propertyIds] as const,
  revenue: (dateRange: DateRange, propertyIds: string[]) =>
    ['analytics', 'revenue', dateRange, propertyIds] as const,
  occupancy: (dateRange: DateRange, propertyIds: string[]) =>
    ['analytics', 'occupancy', dateRange, propertyIds] as const,
  reviews: (propertyId?: string) => ['analytics', 'reviews', propertyId] as const,
  competitors: (propertyId: string) => ['analytics', 'competitors', propertyId] as const,

  // Earnings
  earnings: (filters?: Record<string, any>) => ['earnings', filters] as const,
  payoutHistory: ['payoutHistory'] as const,
  taxReport: (year: number) => ['taxReport', year] as const,
  propertyEarnings: (propertyId?: string) => ['propertyEarnings', propertyId] as const,

  // Settings
  profileSettings: ['settings', 'profile'] as const,
  houseRulesSettings: (propertyId: string) => ['settings', 'houseRules', propertyId] as const,
  cancellationPolicy: (propertyId: string) => ['settings', 'cancellation', propertyId] as const,
  paymentSettings: ['settings', 'payment'] as const,
  securitySettings: ['settings', 'security'] as const,
  integrations: ['settings', 'integrations'] as const,

  // Wizard
  wizardDraft: (draftId: string) => ['wizard', 'draft', draftId] as const,
};

// ==================== PROPERTY HOOKS ====================

/**
 * Fetch all properties for the current user
 */
export function useProperties(options?: UseQueryOptions<Property[]>) {
  return useQuery({
    queryKey: queryKeys.properties,
    queryFn: async () => {
      const response = await propertyAPI.getProperties();
      return response.data!;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
}

/**
 * Fetch single property by ID
 */
export function useProperty(id: string, options?: UseQueryOptions<Property>) {
  return useQuery({
    queryKey: queryKeys.property(id),
    queryFn: async () => {
      const response = await propertyAPI.getPropertyById(id);
      return response.data!;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}

/**
 * Create new property
 */
export function useCreateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PropertyCreateInput) => {
      const response = await propertyAPI.createProperty(data);
      return response.data!;
    },
    onSuccess: (newProperty) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.properties });
      queryClient.setQueryData(queryKeys.property(newProperty.id), newProperty);
    },
  });
}

/**
 * Update property
 */
export function useUpdateProperty(propertyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: Partial<Property>) => {
      const response = await propertyAPI.updateProperty(propertyId, updates);
      return response.data!;
    },
    onMutate: async (updates) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.property(propertyId) });

      const previousProperty = queryClient.getQueryData<Property>(
        queryKeys.property(propertyId)
      );

      if (previousProperty) {
        queryClient.setQueryData(queryKeys.property(propertyId), {
          ...previousProperty,
          ...updates,
        });
      }

      return { previousProperty };
    },
    onError: (err, variables, context) => {
      if (context?.previousProperty) {
        queryClient.setQueryData(
          queryKeys.property(propertyId),
          context.previousProperty
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.property(propertyId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.properties });
    },
  });
}

/**
 * Delete property
 */
export function useDeleteProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (propertyId: string) => {
      await propertyAPI.deleteProperty(propertyId);
      return propertyId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.properties });
    },
  });
}

/**
 * Upload property images with progress tracking
 */
export function useUploadPropertyImages(propertyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      files,
      onProgress,
    }: {
      files: File[];
      onProgress?: (progress: number) => void;
    }) => {
      const response = await propertyAPI.uploadPropertyImages(
        propertyId,
        files,
        onProgress
      );
      return response.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.property(propertyId) });
    },
  });
}

/**
 * Update property pricing
 */
export function useUpdatePropertyPricing(propertyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (pricing: {
      basePrice?: number;
      seasonalPrices?: SeasonalPrice[];
      discounts?: any;
      fees?: any;
    }) => {
      const response = await propertyAPI.updatePropertyPricing(propertyId, pricing);
      return response.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.property(propertyId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.propertyCalendar(propertyId, new Date().getMonth(), new Date().getFullYear()) });
    },
  });
}

/**
 * Fetch property calendar
 */
export function usePropertyCalendar(
  propertyId: string,
  month: number,
  year: number
) {
  return useQuery({
    queryKey: queryKeys.propertyCalendar(propertyId, month, year),
    queryFn: async () => {
      const response = await propertyAPI.getPropertyCalendar(propertyId, month, year);
      return response.data!;
    },
    enabled: !!propertyId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Block calendar dates
 */
export function useBlockDates(propertyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { startDate: Date; endDate: Date; reason: string }) => {
      const response = await propertyAPI.blockDates(propertyId, data);
      return response.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['properties', propertyId, 'calendar']
      });
    },
  });
}

// ==================== BOOKING HOOKS ====================

/**
 * Fetch all bookings with filters and sorting
 */
export function useBookings(
  filters?: BookingFilters,
  sort: SortOption = { field: 'checkIn', direction: 'desc' }
) {
  return useQuery({
    queryKey: queryKeys.bookingsFiltered(filters || {}, sort),
    queryFn: async () => {
      const response = await bookingAPI.getBookings(filters, { page: 1, pageSize: 100 }, sort);
      return response.data!.items;
    },
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 2 * 60 * 1000, // Auto-refetch every 2 minutes
  });
}

/**
 * Fetch single booking
 */
export function useBooking(id: string) {
  return useQuery({
    queryKey: queryKeys.booking(id),
    queryFn: async () => {
      const response = await bookingAPI.getBookingById(id);
      return response.data!;
    },
    enabled: !!id,
  });
}

/**
 * Approve booking
 */
export function useApproveBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingId: string) => {
      const response = await bookingAPI.approveBooking(bookingId);
      return response.data!;
    },
    onSuccess: (_, bookingId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings });
      queryClient.invalidateQueries({ queryKey: queryKeys.booking(bookingId) });
    },
  });
}

/**
 * Reject booking
 */
export function useRejectBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ bookingId, reason }: { bookingId: string; reason: string }) => {
      const response = await bookingAPI.rejectBooking(bookingId, reason);
      return response.data!;
    },
    onSuccess: (_, { bookingId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings });
      queryClient.invalidateQueries({ queryKey: queryKeys.booking(bookingId) });
    },
  });
}

/**
 * Cancel booking
 */
export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ bookingId, reason }: { bookingId: string; reason: string }) => {
      const response = await bookingAPI.cancelBooking(bookingId, reason);
      return response.data!;
    },
    onSuccess: (_, { bookingId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings });
      queryClient.invalidateQueries({ queryKey: queryKeys.booking(bookingId) });
    },
  });
}

/**
 * Bulk update bookings
 */
export function useBulkUpdateBookings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookingIds,
      status,
    }: {
      bookingIds: string[];
      status: string;
    }) => {
      const response = await bookingAPI.bulkUpdateBookings(bookingIds, { status });
      return response.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings });
    },
  });
}

/**
 * Export bookings to CSV
 */
export function useExportBookings() {
  return useMutation({
    mutationFn: async (filters?: BookingFilters) => {
      const response = await bookingAPI.exportBookings('csv', filters);
      return response.data!;
    },
  });
}

/**
 * Fetch booking statistics
 */
export function useBookingStats() {
  return useQuery({
    queryKey: queryKeys.bookingStats,
    queryFn: async () => {
      const response = await bookingAPI.getBookingStats();
      return response.data!;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// ==================== MESSAGE HOOKS ====================

/**
 * Fetch all conversations
 */
export function useConversations() {
  return useQuery({
    queryKey: queryKeys.conversations,
    queryFn: async () => {
      const response = await messageAPI.getConversations();
      return response.data!.items;
    },
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refetch every minute
  });
}

/**
 * Fetch messages for a conversation
 */
export function useMessages(conversationId: string) {
  return useQuery({
    queryKey: queryKeys.messages(conversationId),
    queryFn: async () => {
      const response = await messageAPI.getConversationMessages(conversationId);
      return response.data!.messages;
    },
    enabled: !!conversationId,
    staleTime: 10 * 1000, // 10 seconds
    refetchInterval: 15 * 1000, // Auto-refetch every 15 seconds
  });
}

/**
 * Send message
 */
export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      conversationId,
      content,
      attachments,
    }: {
      conversationId: string;
      content: string;
      attachments?: File[];
    }) => {
      const response = await messageAPI.sendMessage(conversationId, content, attachments);
      return response.data!;
    },
    onMutate: async ({ conversationId, content }) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: queryKeys.messages(conversationId) });

      const previousMessages = queryClient.getQueryData<Message[]>(
        queryKeys.messages(conversationId)
      );

      const optimisticMessage: Message = {
        id: 'temp-' + Date.now(),
        conversationId,
        senderId: 'current-user',
        senderType: 'host',
        senderName: 'You',
        content,
        createdAt: new Date(),
        isRead: true,
      };

      queryClient.setQueryData(queryKeys.messages(conversationId), (old: Message[] = []) => [
        ...old,
        optimisticMessage,
      ]);

      return { previousMessages };
    },
    onError: (err, { conversationId }, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(
          queryKeys.messages(conversationId),
          context.previousMessages
        );
      }
    },
    onSettled: (_, __, { conversationId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.messages(conversationId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.conversations });
    },
  });
}

/**
 * Mark conversation as read
 */
export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (conversationId: string) => {
      const response = await messageAPI.markConversationAsRead(conversationId);
      return response.data!;
    },
    onSuccess: (_, conversationId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.conversations });
      queryClient.invalidateQueries({ queryKey: queryKeys.messages(conversationId) });
    },
  });
}

/**
 * Archive conversation
 */
export function useArchiveConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (conversationId: string) => {
      const response = await messageAPI.archiveConversation(conversationId);
      return response.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.conversations });
    },
  });
}

/**
 * Search messages
 */
export function useSearchMessages() {
  return useMutation({
    mutationFn: async (query: string) => {
      const response = await messageAPI.searchMessages({ searchQuery: query });
      return response.data!;
    },
  });
}

// ==================== ANALYTICS HOOKS ====================

/**
 * Fetch analytics overview
 */
export function useAnalyticsOverview(
  dateRange?: DateRange,
  propertyIds: string[] = []
) {
  const defaultRange: DateRange = {
    start: new Date(new Date().setDate(new Date().getDate() - 30)),
    end: new Date(),
  };

  return useQuery({
    queryKey: queryKeys.analyticsOverview(dateRange || defaultRange, propertyIds),
    queryFn: async () => {
      const response = await analyticsAPI.getOverviewMetrics(
        dateRange || defaultRange,
        propertyIds
      );
      return response.data!;
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Fetch revenue analytics
 */
export function useRevenueAnalytics(
  dateRange?: DateRange,
  propertyIds: string[] = []
) {
  const defaultRange: DateRange = {
    start: new Date(new Date().setDate(new Date().getDate() - 30)),
    end: new Date(),
  };

  return useQuery({
    queryKey: queryKeys.revenue(dateRange || defaultRange, propertyIds),
    queryFn: async () => {
      const response = await analyticsAPI.getRevenueAnalytics(
        dateRange || defaultRange,
        propertyIds
      );
      return response.data!;
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Fetch property reviews
 */
export function usePropertyReviews(propertyId?: string) {
  return useQuery({
    queryKey: queryKeys.reviews(propertyId),
    queryFn: async () => {
      const response = await analyticsAPI.getPropertyReviews(propertyId);
      return response.data!.items;
    },
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Respond to review
 */
export function useRespondToReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reviewId, response }: { reviewId: string; response: string }) => {
      const result = await analyticsAPI.respondToReview(reviewId, response);
      return result.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analytics', 'reviews'] });
    },
  });
}

// ==================== EARNINGS HOOKS ====================

/**
 * Fetch earning records
 */
export function useEarningRecords(filters?: Record<string, any>) {
  return useQuery({
    queryKey: queryKeys.earnings(filters),
    queryFn: async () => {
      const response = await earningsAPI.getEarningRecords(filters);
      return response.data!;
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Fetch payout history
 */
export function usePayoutHistory() {
  return useQuery({
    queryKey: queryKeys.payoutHistory,
    queryFn: async () => {
      const response = await earningsAPI.getPayoutHistory();
      return response.data!;
    },
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Request payout
 */
export function useRequestPayout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { amount: number; method: 'bank' | 'paypal' | 'stripe' }) => {
      const response = await earningsAPI.requestPayout(data.amount, data.method);
      return response.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.payoutHistory });
      queryClient.invalidateQueries({ queryKey: queryKeys.earnings() });
    },
  });
}

/**
 * Fetch tax report
 */
export function useTaxReport(year: number) {
  return useQuery({
    queryKey: queryKeys.taxReport(year),
    queryFn: async () => {
      const response = await earningsAPI.getTaxReport(year);
      return response.data!;
    },
    enabled: !!year,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
}

/**
 * Fetch property earnings breakdown
 */
export function usePropertyEarnings(propertyId?: string) {
  return useQuery({
    queryKey: queryKeys.propertyEarnings(propertyId),
    queryFn: async () => {
      const response = await earningsAPI.getPropertyEarningsBreakdown(propertyId);
      return response.data!;
    },
    staleTime: 10 * 60 * 1000,
  });
}

// ==================== SETTINGS HOOKS ====================

/**
 * Fetch profile settings
 */
export function useProfileSettings() {
  return useQuery({
    queryKey: queryKeys.profileSettings,
    queryFn: async () => {
      const response = await settingsAPI.getProfileSettings();
      return response.data!;
    },
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Update profile settings
 */
export function useUpdateProfileSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<ProfileSettings>) => {
      const response = await settingsAPI.updateProfileSettings(data);
      return response.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profileSettings });
    },
  });
}

/**
 * Fetch payment settings
 */
export function usePaymentSettings() {
  return useQuery({
    queryKey: queryKeys.paymentSettings,
    queryFn: async () => {
      const response = await settingsAPI.getPaymentSettings();
      return response.data!;
    },
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Update payment settings
 */
export function useUpdatePaymentSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<PaymentSettings>) => {
      const response = await settingsAPI.updatePaymentSettings(data);
      return response.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.paymentSettings });
    },
  });
}

/**
 * Fetch security settings
 */
export function useSecuritySettings() {
  return useQuery({
    queryKey: queryKeys.securitySettings,
    queryFn: async () => {
      const response = await settingsAPI.getSecuritySettings();
      return response.data!;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// ==================== PROPERTY SUBMISSION HOOKS ====================

/**
 * Load wizard draft
 */
export function useLoadWizardDraft(draftId: string) {
  return useQuery({
    queryKey: queryKeys.wizardDraft(draftId),
    queryFn: async () => {
      const response = await propertySubmissionAPI.loadDraft(draftId);
      return response.data!;
    },
    enabled: !!draftId,
    staleTime: Infinity, // Don't auto-refetch drafts
  });
}

/**
 * Save wizard draft
 */
export function useSaveWizardDraft() {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await propertySubmissionAPI.saveDraft(data);
      return response.data!;
    },
  });
}

/**
 * Validate wizard step
 */
export function useValidateWizardStep() {
  return useMutation({
    mutationFn: async ({ step, data }: { step: number; data: any }) => {
      const response = await propertySubmissionAPI.validateStep(step, data);
      return response.data!;
    },
  });
}

/**
 * Upload wizard images
 */
export function useUploadWizardImages() {
  return useMutation({
    mutationFn: async ({
      files,
      onProgress,
    }: {
      files: File[];
      onProgress?: (progress: number) => void;
    }) => {
      const response = await propertySubmissionAPI.uploadSubmissionImages(
        files,
        onProgress
      );
      return response.data!;
    },
  });
}

/**
 * Submit property for review
 */
export function useSubmitProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PropertyCreateInput) => {
      const response = await propertySubmissionAPI.submitProperty(data);
      return response.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.properties });
    },
  });
}
