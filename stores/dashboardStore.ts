/**
 * Global Dashboard Store - Zustand
 * Central state management for property owner dashboard
 */

import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  Property,
  Booking,
  Message,
  Conversation,
  Review,
  AnalyticsMetrics,
  Notification,
  Toast,
  User,
} from '@/types/dashboard.types';

// ============================================================================
// DASHBOARD MAIN STORE
// ============================================================================

interface DashboardStore {
  // User State
  user: User | null;
  setUser: (user: User | null) => void;

  // Properties
  properties: Property[];
  selectedProperty: Property | null;
  setProperties: (properties: Property[]) => void;
  selectProperty: (propertyId: string) => void;
  addProperty: (property: Property) => void;
  updateProperty: (propertyId: string, updates: Partial<Property>) => void;
  deleteProperty: (propertyId: string) => void;

  // Bookings Cache
  bookings: Booking[];
  setBookings: (bookings: Booking[]) => void;
  addBooking: (booking: Booking) => void;
  updateBooking: (bookingId: string, updates: Partial<Booking>) => void;

  // Messages Cache
  conversations: Conversation[];
  setConversations: (conversations: Conversation[]) => void;
  updateConversationUnread: (conversationId: string, count: number) => void;

  // UI State
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;

  // Analytics Cache
  analyticsMetrics: AnalyticsMetrics | null;
  setAnalyticsMetrics: (metrics: AnalyticsMetrics) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (notificationId: string) => void;

  // Toasts
  toasts: Toast[];
  addToast: (toast: Toast) => void;
  removeToast: (toastId: string) => void;

  // Reset
  reset: () => void;
}

const initialState = {
  user: null,
  properties: [],
  selectedProperty: null,
  bookings: [],
  conversations: [],
  isLoading: false,
  error: null,
  analyticsMetrics: null,
  notifications: [],
  toasts: [],
};

export const useDashboardStore = create<DashboardStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // User Actions
        setUser: (user) => set({ user }),

        // Property Actions
        setProperties: (properties) =>
          set({ properties, selectedProperty: null }),

        selectProperty: (propertyId) => {
          const property = get().properties.find((p) => p.id === propertyId);
          set({ selectedProperty: property || null });
        },

        addProperty: (property) =>
          set((state) => ({
            properties: [...state.properties, property],
          })),

        updateProperty: (propertyId, updates) =>
          set((state) => ({
            properties: state.properties.map((p) =>
              p.id === propertyId ? { ...p, ...updates } : p
            ),
            selectedProperty:
              state.selectedProperty?.id === propertyId
                ? { ...state.selectedProperty, ...updates }
                : state.selectedProperty,
          })),

        deleteProperty: (propertyId) =>
          set((state) => ({
            properties: state.properties.filter((p) => p.id !== propertyId),
            selectedProperty:
              state.selectedProperty?.id === propertyId
                ? null
                : state.selectedProperty,
          })),

        // Booking Actions
        setBookings: (bookings) => set({ bookings }),

        addBooking: (booking) =>
          set((state) => ({
            bookings: [booking, ...state.bookings],
          })),

        updateBooking: (bookingId, updates) =>
          set((state) => ({
            bookings: state.bookings.map((b) =>
              b.id === bookingId ? { ...b, ...updates } : b
            ),
          })),

        // Conversation Actions
        setConversations: (conversations) => set({ conversations }),

        updateConversationUnread: (conversationId, count) =>
          set((state) => ({
            conversations: state.conversations.map((c) =>
              c.id === conversationId ? { ...c, unreadCount: count } : c
            ),
          })),

        // UI Actions
        setIsLoading: (loading) => set({ isLoading: loading }),
        setError: (error) => set({ error }),

        // Analytics Actions
        setAnalyticsMetrics: (metrics) =>
          set({ analyticsMetrics: metrics }),

        // Notification Actions
        addNotification: (notification) =>
          set((state) => ({
            notifications: [notification, ...state.notifications],
          })),

        removeNotification: (notificationId) =>
          set((state) => ({
            notifications: state.notifications.filter(
              (n) => n.id !== notificationId
            ),
          })),

        // Toast Actions
        addToast: (toast) =>
          set((state) => ({
            toasts: [...state.toasts, toast],
          })),

        removeToast: (toastId) =>
          set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== toastId),
          })),

        // Reset
        reset: () => set(initialState),
      }),
      {
        name: 'dashboard-store',
        partialize: (state) => ({
          user: state.user,
          selectedProperty: state.selectedProperty,
          analyticsMetrics: state.analyticsMetrics,
        }),
      }
    )
  )
);

// ============================================================================
// BOOKING STORE
// ============================================================================

import {
  Booking,
  BookingFilters,
  BookingStatus,
  SortOption,
  PaginationState,
} from '@/types/dashboard.types';

interface BookingStore {
  bookings: Booking[];
  filteredBookings: Booking[];
  selectedBooking: Booking | null;
  filters: BookingFilters;
  sortBy: SortOption;
  pagination: PaginationState;
  selectedBookings: string[];
  isModalOpen: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setBookings: (bookings: Booking[]) => void;
  setSelectedBooking: (booking: Booking | null) => void;
  setFilters: (filters: Partial<BookingFilters>) => void;
  setSortBy: (sort: SortOption) => void;
  setPagination: (pagination: Partial<PaginationState>) => void;
  setSelectedBookings: (bookingIds: string[]) => void;
  toggleBookingSelection: (bookingId: string) => void;
  setIsModalOpen: (open: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  applyFilters: () => void;
  reset: () => void;
}

const initialBookingState = {
  bookings: [],
  filteredBookings: [],
  selectedBooking: null,
  filters: {},
  sortBy: { field: 'checkIn', direction: 'desc' as const },
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 1,
  },
  selectedBookings: [],
  isModalOpen: false,
  isLoading: false,
  error: null,
};

export const useBookingStore = create<BookingStore>()(
  devtools(
    (set, get) => ({
      ...initialBookingState,

      setBookings: (bookings) =>
        set((state) => ({
          bookings,
          pagination: {
            ...state.pagination,
            total: bookings.length,
            totalPages: Math.ceil(bookings.length / state.pagination.pageSize),
          },
        })),

      setSelectedBooking: (booking) => set({ selectedBooking: booking }),

      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
        })),

      setSortBy: (sort) => set({ sortBy: sort }),

      setPagination: (pagination) =>
        set((state) => ({
          pagination: { ...state.pagination, ...pagination },
        })),

      setSelectedBookings: (bookingIds) =>
        set({ selectedBookings: bookingIds }),

      toggleBookingSelection: (bookingId) =>
        set((state) => ({
          selectedBookings: state.selectedBookings.includes(bookingId)
            ? state.selectedBookings.filter((id) => id !== bookingId)
            : [...state.selectedBookings, bookingId],
        })),

      setIsModalOpen: (open) => set({ isModalOpen: open }),

      setIsLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      updateBookingStatus: (bookingId, status) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === bookingId ? { ...b, status } : b
          ),
          selectedBooking:
            state.selectedBooking?.id === bookingId
              ? { ...state.selectedBooking, status }
              : state.selectedBooking,
        })),

      applyFilters: () => {
        const { bookings, filters, sortBy } = get();

        let filtered = [...bookings];

        if (filters.status) {
          filtered = filtered.filter((b) => b.status === filters.status);
        }

        if (filters.propertyId) {
          filtered = filtered.filter(
            (b) => b.propertyId === filters.propertyId
          );
        }

        if (filters.dateRange) {
          filtered = filtered.filter(
            (b) =>
              new Date(b.checkIn) >= filters.dateRange!.startDate &&
              new Date(b.checkOut) <= filters.dateRange!.endDate
          );
        }

        // Sort
        filtered.sort((a, b) => {
          let aVal: any = a[sortBy.field as keyof Booking];
          let bVal: any = b[sortBy.field as keyof Booking];

          if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase();
            bVal = (bVal as string).toLowerCase();
          }

          if (sortBy.direction === 'asc') {
            return aVal > bVal ? 1 : -1;
          } else {
            return aVal < bVal ? 1 : -1;
          }
        });

        set({
          filteredBookings: filtered,
          pagination: {
            ...get().pagination,
            total: filtered.length,
            totalPages: Math.ceil(filtered.length / get().pagination.pageSize),
          },
        });
      },

      reset: () => set(initialBookingState),
    })
  )
);

// ============================================================================
// MESSAGE STORE
// ============================================================================

interface MessageStore {
  conversations: Conversation[];
  currentConversationId: string | null;
  messages: Message[];
  unreadCount: number;
  isLoading: boolean;
  isSending: boolean;
  error: string | null;
  typingUsers: string[];

  // Actions
  setConversations: (conversations: Conversation[]) => void;
  setCurrentConversation: (conversationId: string) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  updateUnreadCount: (conversationId: string, count: number) => void;
  setIsLoading: (loading: boolean) => void;
  setIsSending: (sending: boolean) => void;
  setError: (error: string | null) => void;
  setTypingUsers: (users: string[]) => void;
  reset: () => void;
}

const initialMessageState = {
  conversations: [],
  currentConversationId: null,
  messages: [],
  unreadCount: 0,
  isLoading: false,
  isSending: false,
  error: null,
  typingUsers: [],
};

export const useMessageStore = create<MessageStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialMessageState,

        setConversations: (conversations) => set({ conversations }),

        setCurrentConversation: (conversationId) =>
          set({ currentConversationId: conversationId }),

        setMessages: (messages) => set({ messages }),

        addMessage: (message) =>
          set((state) => ({
            messages: [...state.messages, message],
          })),

        updateUnreadCount: (conversationId, count) =>
          set((state) => ({
            conversations: state.conversations.map((c) =>
              c.id === conversationId ? { ...c, unreadCount: count } : c
            ),
            unreadCount: state.conversations.reduce(
              (sum, c) =>
                sum + (c.id === conversationId ? count : c.unreadCount),
              0
            ),
          })),

        setIsLoading: (loading) => set({ isLoading: loading }),

        setIsSending: (sending) => set({ isSending: sending }),

        setError: (error) => set({ error }),

        setTypingUsers: (users) => set({ typingUsers: users }),

        reset: () => set(initialMessageState),
      }),
      {
        name: 'message-store',
      }
    )
  )
);

// ============================================================================
// ANALYTICS STORE
// ============================================================================

import {
  AnalyticsMetrics,
  ChartDataPoint,
  CompetitorMetrics,
  Review,
  CustomReport,
  DateRange,
} from '@/types/dashboard.types';

interface AnalyticsStore {
  dateRange: DateRange;
  selectedProperties: string[];
  metrics: AnalyticsMetrics | null;
  chartData: ChartDataPoint[];
  reviews: Review[];
  competitorData: CompetitorMetrics[];
  customReports: CustomReport[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setDateRange: (dateRange: DateRange) => void;
  setSelectedProperties: (propertyIds: string[]) => void;
  setMetrics: (metrics: AnalyticsMetrics) => void;
  setChartData: (data: ChartDataPoint[]) => void;
  setReviews: (reviews: Review[]) => void;
  setCompetitorData: (data: CompetitorMetrics[]) => void;
  setCustomReports: (reports: CustomReport[]) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialAnalyticsState = {
  dateRange: {
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
  },
  selectedProperties: [],
  metrics: null,
  chartData: [],
  reviews: [],
  competitorData: [],
  customReports: [],
  isLoading: false,
  error: null,
};

export const useAnalyticsStore = create<AnalyticsStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialAnalyticsState,

        setDateRange: (dateRange) => set({ dateRange }),

        setSelectedProperties: (propertyIds) =>
          set({ selectedProperties: propertyIds }),

        setMetrics: (metrics) => set({ metrics }),

        setChartData: (data) => set({ chartData: data }),

        setReviews: (reviews) => set({ reviews }),

        setCompetitorData: (data) => set({ competitorData: data }),

        setCustomReports: (reports) => set({ customReports: reports }),

        setIsLoading: (loading) => set({ isLoading: loading }),

        setError: (error) => set({ error }),

        reset: () => set(initialAnalyticsState),
      }),
      {
        name: 'analytics-store',
      }
    )
  )
);

// ============================================================================
// UI STORE
// ============================================================================

interface UIStore {
  modals: Record<string, boolean>;
  toasts: Toast[];
  notifications: Notification[];
  loading: Record<string, boolean>;
  errors: Record<string, string>;

  // Actions
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  closeAllModals: () => void;

  addToast: (toast: Toast) => void;
  removeToast: (toastId: string) => void;
  clearToasts: () => void;

  addNotification: (notification: Notification) => void;
  removeNotification: (notificationId: string) => void;

  setLoading: (key: string, loading: boolean) => void;
  setError: (key: string, error: string | null) => void;

  reset: () => void;
}

const initialUIState = {
  modals: {},
  toasts: [],
  notifications: [],
  loading: {},
  errors: {},
};

export const useUIStore = create<UIStore>()(
  devtools(
    (set, get) => ({
      ...initialUIState,

      openModal: (modalId) =>
        set((state) => ({
          modals: { ...state.modals, [modalId]: true },
        })),

      closeModal: (modalId) =>
        set((state) => ({
          modals: { ...state.modals, [modalId]: false },
        })),

      closeAllModals: () => set({ modals: {} }),

      addToast: (toast) =>
        set((state) => ({
          toasts: [...state.toasts, toast],
        })),

      removeToast: (toastId) =>
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== toastId),
        })),

      clearToasts: () => set({ toasts: [] }),

      addNotification: (notification) =>
        set((state) => ({
          notifications: [notification, ...state.notifications],
        })),

      removeNotification: (notificationId) =>
        set((state) => ({
          notifications: state.notifications.filter(
            (n) => n.id !== notificationId
          ),
        })),

      setLoading: (key, loading) =>
        set((state) => ({
          loading: { ...state.loading, [key]: loading },
        })),

      setError: (key, error) =>
        set((state) => ({
          errors: error
            ? { ...state.errors, [key]: error }
            : { ...state.errors, [key]: undefined },
        })),

      reset: () => set(initialUIState),
    })
  )
);
