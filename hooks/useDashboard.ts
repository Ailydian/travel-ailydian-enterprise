/**
 * Custom React Hooks for Dashboard
 * Centralized data fetching and mutations using React Query
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Property,
  Booking,
  BookingFilters,
  Message,
  Conversation,
  Review,
  AnalyticsMetrics,
  EarningRecord,
  Payout,
  PayoutHistory,
  TaxReport,
  DateRange,
  PropertySettings,
  HouseRulesSettings,
  PaymentSettings,
  NotificationSettings,
  SecuritySettings,
  ProfileSettings,
} from '@/types/dashboard.types';
import {
  PropertyAPI,
  BookingAPI,
  MessageAPI,
  AnalyticsAPI,
  EarningsAPI,
  SettingsAPI,
} from '@/services/api';

// ============================================================================
// PROPERTY HOOKS
// ============================================================================

export function useProperties() {
  return useQuery({
    queryKey: ['properties'],
    queryFn: () => PropertyAPI.getProperties(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (cache time)
  });
}

export function useProperty(id: string) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => PropertyAPI.getProperty(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Property>) =>
      PropertyAPI.createProperty(data),
    onSuccess: (newProperty) => {
      queryClient.setQueryData(['properties'], (old: Property[] = []) => [
        ...old,
        newProperty,
      ]);
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}

export function useUpdateProperty(propertyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Property>) =>
      PropertyAPI.updateProperty(propertyId, data),
    onSuccess: (updatedProperty) => {
      queryClient.setQueryData(['property', propertyId], updatedProperty);
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}

export function useDeleteProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (propertyId: string) =>
      PropertyAPI.deleteProperty(propertyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}

export function useUploadPropertyImages(propertyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      params: {
        files: File[];
        onUploadProgress?: (progressEvent: any) => void;
      }
    ) =>
      PropertyAPI.uploadPropertyImages(
        propertyId,
        params.files,
        params.onUploadProgress
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['property', propertyId] });
    },
  });
}

export function usePropertyCalendar(propertyId: string) {
  return useQuery({
    queryKey: ['property', propertyId, 'calendar'],
    queryFn: () => PropertyAPI.getCalendar(propertyId),
    enabled: !!propertyId,
    staleTime: 1000 * 60,
  });
}

export function useUpdatePropertyPricing(propertyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pricingData: any) =>
      PropertyAPI.updatePricing(propertyId, pricingData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['property', propertyId],
      });
      queryClient.invalidateQueries({
        queryKey: ['property', propertyId, 'calendar'],
      });
    },
  });
}

// ============================================================================
// BOOKING HOOKS
// ============================================================================

export function useBookings(filters?: BookingFilters) {
  return useQuery({
    queryKey: ['bookings', filters],
    queryFn: () => BookingAPI.getBookings(filters),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
  });
}

export function useBooking(id: string) {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: () => BookingAPI.getBooking(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 2,
  });
}

export function useConfirmBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingId: string) =>
      BookingAPI.confirmBooking(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

export function useRejectBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { bookingId: string; reason?: string }) =>
      BookingAPI.rejectBooking(params.bookingId, params.reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { bookingId: string; reason?: string }) =>
      BookingAPI.cancelBooking(params.bookingId, params.reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

export function useCheckInBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingId: string) =>
      BookingAPI.markCheckedIn(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

export function useCheckOutBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingId: string) =>
      BookingAPI.markCheckedOut(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

export function useBulkConfirmBookings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingIds: string[]) =>
      BookingAPI.bulkConfirm(bookingIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

export function useExportBookings() {
  return useMutation({
    mutationFn: (format: 'csv' | 'pdf') =>
      BookingAPI.exportBookings(format),
  });
}

// ============================================================================
// MESSAGE HOOKS
// ============================================================================

export function useConversations() {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: () => MessageAPI.getConversations(),
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 1000 * 60, // Refetch every minute
  });
}

export function useConversation(conversationId: string) {
  return useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: () => MessageAPI.getConversation(conversationId),
    enabled: !!conversationId,
    staleTime: 1000 * 30,
  });
}

export function useMessages(conversationId: string) {
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => MessageAPI.getMessages(conversationId),
    enabled: !!conversationId,
    staleTime: 0, // Never stale, always refetch
    refetchInterval: 1000 * 5, // Poll every 5 seconds
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      conversationId: string;
      content: string;
      attachments?: any[];
    }) =>
      MessageAPI.sendMessage(
        params.conversationId,
        params.content,
        params.attachments
      ),
    onSuccess: (newMessage, { conversationId }) => {
      queryClient.invalidateQueries({
        queryKey: ['messages', conversationId],
      });
      queryClient.invalidateQueries({
        queryKey: ['conversations'],
      });
    },
  });
}

export function useMarkMessageAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageId: string) =>
      MessageAPI.markAsRead(messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
}

export function useMarkConversationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (conversationId: string) =>
      MessageAPI.markConversationAsRead(conversationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['conversations'],
      });
    },
  });
}

export function useSearchMessages() {
  return useMutation({
    mutationFn: (query: string) =>
      MessageAPI.searchMessages(query),
  });
}

export function useArchiveConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (conversationId: string) =>
      MessageAPI.archiveConversation(conversationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}

// ============================================================================
// ANALYTICS HOOKS
// ============================================================================

export function useAnalyticsOverview() {
  return useQuery({
    queryKey: ['analytics', 'overview'],
    queryFn: () => AnalyticsAPI.getOverview(),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 10,
  });
}

export function useRevenueAnalytics(dateRange: DateRange) {
  return useQuery({
    queryKey: ['analytics', 'revenue', dateRange],
    queryFn: () => AnalyticsAPI.getRevenue(dateRange),
    staleTime: 1000 * 60 * 5,
  });
}

export function useOccupancyAnalytics(propertyId?: string) {
  return useQuery({
    queryKey: ['analytics', 'occupancy', propertyId],
    queryFn: () => AnalyticsAPI.getOccupancy(propertyId),
    staleTime: 1000 * 60 * 5,
  });
}

export function useReviewsAnalytics() {
  return useQuery({
    queryKey: ['analytics', 'reviews'],
    queryFn: () => AnalyticsAPI.getReviews(),
    staleTime: 1000 * 60 * 10,
  });
}

export function useChartData(metric: string, dateRange: DateRange) {
  return useQuery({
    queryKey: ['analytics', 'chart', metric, dateRange],
    queryFn: () => AnalyticsAPI.getChartData(metric, dateRange),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCompetitorAnalysis(propertyId: string) {
  return useQuery({
    queryKey: ['analytics', 'competitors', propertyId],
    queryFn: () => AnalyticsAPI.getCompetitorAnalysis(propertyId),
    enabled: !!propertyId,
    staleTime: 1000 * 60 * 30,
  });
}

export function useExportReport() {
  return useMutation({
    mutationFn: (format: 'pdf' | 'xlsx') =>
      AnalyticsAPI.exportReport(format),
  });
}

// ============================================================================
// EARNINGS HOOKS
// ============================================================================

export function useEarnings(dateRange: DateRange) {
  return useQuery({
    queryKey: ['earnings', dateRange],
    queryFn: () => EarningsAPI.getEarnings(dateRange),
    staleTime: 1000 * 60 * 5,
  });
}

export function usePayouts() {
  return useQuery({
    queryKey: ['payouts'],
    queryFn: () => EarningsAPI.getPayouts(),
    staleTime: 1000 * 60 * 5,
  });
}

export function usePendingPayouts() {
  return useQuery({
    queryKey: ['payouts', 'pending'],
    queryFn: () => EarningsAPI.getPendingPayouts(),
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 5,
  });
}

export function useRequestPayout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (amount: number) =>
      EarningsAPI.requestPayout(amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payouts'] });
      queryClient.invalidateQueries({ queryKey: ['payouts', 'pending'] });
    },
  });
}

export function usePayoutHistory() {
  return useQuery({
    queryKey: ['payouts', 'history'],
    queryFn: () => EarningsAPI.getPayoutHistory(),
    staleTime: 1000 * 60 * 10,
  });
}

export function useTaxReport(year: number) {
  return useQuery({
    queryKey: ['earnings', 'tax-report', year],
    queryFn: () => EarningsAPI.getTaxReport(year),
    enabled: !!year,
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  });
}

// ============================================================================
// SETTINGS HOOKS
// ============================================================================

export function useProfileSettings() {
  return useQuery({
    queryKey: ['settings', 'profile'],
    queryFn: () => SettingsAPI.getProfileSettings(),
    staleTime: 1000 * 60 * 10,
  });
}

export function useUpdateProfileSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (settings: Partial<ProfileSettings>) =>
      SettingsAPI.updateProfileSettings(settings),
    onSuccess: (updated) => {
      queryClient.setQueryData(['settings', 'profile'], updated);
    },
  });
}

export function useUploadProfileAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) =>
      SettingsAPI.uploadProfileAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings', 'profile'] });
    },
  });
}

export function usePropertySettings(propertyId: string) {
  return useQuery({
    queryKey: ['settings', 'property', propertyId],
    queryFn: () => SettingsAPI.getPropertySettings(propertyId),
    enabled: !!propertyId,
    staleTime: 1000 * 60 * 10,
  });
}

export function useUpdatePropertySettings(propertyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (settings: Partial<PropertySettings>) =>
      SettingsAPI.updatePropertySettings(propertyId, settings),
    onSuccess: (updated) => {
      queryClient.setQueryData(
        ['settings', 'property', propertyId],
        updated
      );
    },
  });
}

export function useHouseRules(propertyId: string) {
  return useQuery({
    queryKey: ['settings', 'house-rules', propertyId],
    queryFn: () => SettingsAPI.getHouseRules(propertyId),
    enabled: !!propertyId,
    staleTime: 1000 * 60 * 10,
  });
}

export function useUpdateHouseRules(propertyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rules: Partial<HouseRulesSettings>) =>
      SettingsAPI.updateHouseRules(propertyId, rules),
    onSuccess: (updated) => {
      queryClient.setQueryData(
        ['settings', 'house-rules', propertyId],
        updated
      );
    },
  });
}

export function usePaymentSettings() {
  return useQuery({
    queryKey: ['settings', 'payment'],
    queryFn: () => SettingsAPI.getPaymentSettings(),
    staleTime: 1000 * 60 * 10,
  });
}

export function useUpdatePaymentSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (settings: Partial<PaymentSettings>) =>
      SettingsAPI.updatePaymentSettings(settings),
    onSuccess: (updated) => {
      queryClient.setQueryData(['settings', 'payment'], updated);
    },
  });
}

export function useVerifyBankAccount() {
  return useMutation({
    mutationFn: (data: any) =>
      SettingsAPI.verifyBankAccount(data),
  });
}

export function useNotificationSettings() {
  return useQuery({
    queryKey: ['settings', 'notifications'],
    queryFn: () => SettingsAPI.getNotificationSettings(),
    staleTime: 1000 * 60 * 10,
  });
}

export function useUpdateNotificationSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (settings: Partial<NotificationSettings>) =>
      SettingsAPI.updateNotificationSettings(settings),
    onSuccess: (updated) => {
      queryClient.setQueryData(['settings', 'notifications'], updated);
    },
  });
}

export function useSecuritySettings() {
  return useQuery({
    queryKey: ['settings', 'security'],
    queryFn: () => SettingsAPI.getSecuritySettings(),
    staleTime: 1000 * 60 * 10,
  });
}

export function useUpdatePassword() {
  return useMutation({
    mutationFn: (params: { oldPassword: string; newPassword: string }) =>
      SettingsAPI.updatePassword(params.oldPassword, params.newPassword),
  });
}

export function useEnableTwoFactor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (method: string) =>
      SettingsAPI.enableTwoFactor(method),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings', 'security'] });
    },
  });
}

export function useDisableTwoFactor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      SettingsAPI.disableTwoFactor(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings', 'security'] });
    },
  });
}

export function useGetActiveSessions() {
  return useQuery({
    queryKey: ['settings', 'security', 'sessions'],
    queryFn: () => SettingsAPI.getActiveSessions(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useSignOutSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) =>
      SettingsAPI.signOutSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['settings', 'security', 'sessions'],
      });
    },
  });
}

export function useSignOutAllSessions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      SettingsAPI.signOutAllSessions(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['settings', 'security', 'sessions'],
      });
    },
  });
}
