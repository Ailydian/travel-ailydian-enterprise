// Property Owner Dashboard - Zustand State Management
// 5 specialized stores for complete dashboard functionality

import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import type {
  User,
  Property,
  Booking,
  BookingFilters,
  SortOption,
  Conversation,
  Message,
  MessageFilters,
  AnalyticsMetrics,
  ChartDataPoint,
  Review,
  CustomReport,
  DateRange,
  DashboardStats,
  PropertyWizardState,
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
  Step5Data,
  Step6Data,
  Step7Data,
  Step8Data,
} from '../types/dashboard.types';

// ==================== DASHBOARD STORE ====================

interface DashboardState {
  // User
  user: User | null;
  setUser: (user: User | null) => void;

  // Properties
  properties: Property[];
  selectedProperty: Property | null;
  setProperties: (properties: Property[]) => void;
  addProperty: (property: Property) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  selectProperty: (id: string | null) => void;

  // Dashboard Stats
  stats: DashboardStats | null;
  setStats: (stats: DashboardStats) => void;

  // Loading & Errors
  isLoading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;

  // Actions
  reset: () => void;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  title?: string;
  timestamp: Date;
}

export const useDashboardStore = create<DashboardState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        properties: [],
        selectedProperty: null,
        stats: null,
        isLoading: false,
        error: null,
        notifications: [],

        // User actions
        setUser: (user) => set({ user }),

        // Property actions
        setProperties: (properties) => set({ properties }),

        addProperty: (property) =>
          set((state) => ({
            properties: [...state.properties, property],
          })),

        updateProperty: (id, updates) =>
          set((state) => ({
            properties: state.properties.map((p) =>
              p.id === id ? { ...p, ...updates } : p
            ),
            selectedProperty:
              state.selectedProperty?.id === id
                ? { ...state.selectedProperty, ...updates }
                : state.selectedProperty,
          })),

        deleteProperty: (id) =>
          set((state) => ({
            properties: state.properties.filter((p) => p.id !== id),
            selectedProperty:
              state.selectedProperty?.id === id ? null : state.selectedProperty,
          })),

        selectProperty: (id) =>
          set((state) => ({
            selectedProperty:
              state.properties.find((p) => p.id === id) || null,
          })),

        // Stats actions
        setStats: (stats) => set({ stats }),

        // Loading & error actions
        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),

        // Notification actions
        addNotification: (notification) =>
          set((state) => ({
            notifications: [
              ...state.notifications,
              {
                ...notification,
                id: Math.random().toString(36).substring(7),
                timestamp: new Date(),
              },
            ],
          })),

        removeNotification: (id) =>
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          })),

        clearNotifications: () => set({ notifications: [] }),

        // Reset
        reset: () =>
          set({
            user: null,
            properties: [],
            selectedProperty: null,
            stats: null,
            isLoading: false,
            error: null,
            notifications: [],
          }),
      }),
      {
        name: 'dashboard-storage',
        partialize: (state) => ({
          user: state.user,
          selectedProperty: state.selectedProperty,
        }),
      }
    )
  )
);

// ==================== BOOKING STORE ====================

interface BookingState {
  bookings: Booking[];
  filteredBookings: Booking[];
  selectedBooking: Booking | null;
  filters: BookingFilters;
  sortBy: SortOption;
  selectedBookingIds: string[];
  isModalOpen: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setBookings: (bookings: Booking[]) => void;
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;
  selectBooking: (booking: Booking | null) => void;
  setFilters: (filters: Partial<BookingFilters>) => void;
  setSortBy: (sortBy: SortOption) => void;
  toggleBookingSelection: (id: string) => void;
  selectAllBookings: () => void;
  clearSelection: () => void;
  setModalOpen: (isOpen: boolean) => void;
  applyFiltersAndSort: () => void;
  reset: () => void;
}

export const useBookingStore = create<BookingState>()(
  devtools((set, get) => ({
    // Initial state
    bookings: [],
    filteredBookings: [],
    selectedBooking: null,
    filters: {},
    sortBy: { field: 'checkIn', direction: 'desc' },
    selectedBookingIds: [],
    isModalOpen: false,
    isLoading: false,
    error: null,

    // Actions
    setBookings: (bookings) => {
      set({ bookings });
      get().applyFiltersAndSort();
    },

    addBooking: (booking) => {
      set((state) => ({ bookings: [booking, ...state.bookings] }));
      get().applyFiltersAndSort();
    },

    updateBooking: (id, updates) => {
      set((state) => ({
        bookings: state.bookings.map((b) => (b.id === id ? { ...b, ...updates } : b)),
        selectedBooking:
          state.selectedBooking?.id === id
            ? { ...state.selectedBooking, ...updates }
            : state.selectedBooking,
      }));
      get().applyFiltersAndSort();
    },

    deleteBooking: (id) => {
      set((state) => ({
        bookings: state.bookings.filter((b) => b.id !== id),
        selectedBooking: state.selectedBooking?.id === id ? null : state.selectedBooking,
      }));
      get().applyFiltersAndSort();
    },

    selectBooking: (selectedBooking) => set({ selectedBooking }),

    setFilters: (newFilters) => {
      set((state) => ({ filters: { ...state.filters, ...newFilters } }));
      get().applyFiltersAndSort();
    },

    setSortBy: (sortBy) => {
      set({ sortBy });
      get().applyFiltersAndSort();
    },

    toggleBookingSelection: (id) =>
      set((state) => ({
        selectedBookingIds: state.selectedBookingIds.includes(id)
          ? state.selectedBookingIds.filter((bId) => bId !== id)
          : [...state.selectedBookingIds, id],
      })),

    selectAllBookings: () =>
      set((state) => ({
        selectedBookingIds: state.filteredBookings.map((b) => b.id),
      })),

    clearSelection: () => set({ selectedBookingIds: [] }),

    setModalOpen: (isModalOpen) => set({ isModalOpen }),

    applyFiltersAndSort: () => {
      const { bookings, filters, sortBy } = get();
      let filtered = [...bookings];

      // Apply filters
      if (filters.status && filters.status.length > 0) {
        filtered = filtered.filter((b) => filters.status!.includes(b.status));
      }

      if (filters.propertyId && filters.propertyId.length > 0) {
        filtered = filtered.filter((b) => filters.propertyId!.includes(b.propertyId));
      }

      if (filters.dateRange) {
        filtered = filtered.filter((b) => {
          const checkIn = new Date(b.checkIn);
          return (
            checkIn >= filters.dateRange!.start && checkIn <= filters.dateRange!.end
          );
        });
      }

      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (b) =>
            b.guestName.toLowerCase().includes(query) ||
            b.guestEmail.toLowerCase().includes(query) ||
            b.propertyName.toLowerCase().includes(query)
        );
      }

      // Apply sorting
      filtered.sort((a, b) => {
        const aValue = a[sortBy.field];
        const bValue = b[sortBy.field];
        const direction = sortBy.direction === 'asc' ? 1 : -1;

        if (aValue instanceof Date && bValue instanceof Date) {
          return (aValue.getTime() - bValue.getTime()) * direction;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue) * direction;
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return (aValue - bValue) * direction;
        }

        return 0;
      });

      set({ filteredBookings: filtered });
    },

    reset: () =>
      set({
        bookings: [],
        filteredBookings: [],
        selectedBooking: null,
        filters: {},
        sortBy: { field: 'checkIn', direction: 'desc' },
        selectedBookingIds: [],
        isModalOpen: false,
      }),
  }))
);

// ==================== MESSAGE STORE ====================

interface MessageState {
  conversations: Conversation[];
  currentConversationId: string | null;
  messages: Record<string, Message[]>;
  filters: MessageFilters;
  searchQuery: string;
  unreadCount: number;
  isLoading: boolean;
  isSending: boolean;
  error: string | null;
  typingUsers: string[];

  // Actions
  setConversations: (conversations: Conversation[]) => void;
  addConversation: (conversation: Conversation) => void;
  updateConversation: (id: string, updates: Partial<Conversation>) => void;
  setCurrentConversation: (id: string | null) => void;
  setMessages: (conversationId: string, messages: Message[]) => void;
  addMessage: (conversationId: string, message: Message) => void;
  updateMessage: (conversationId: string, messageId: string, updates: Partial<Message>) => void;
  deleteMessage: (conversationId: string, messageId: string) => void;
  markAsRead: (conversationId: string) => void;
  pinConversation: (id: string) => void;
  archiveConversation: (id: string) => void;
  setFilters: (filters: Partial<MessageFilters>) => void;
  setSearchQuery: (query: string) => void;
  setTypingUser: (userId: string, isTyping: boolean) => void;
  reset: () => void;
}

export const useMessageStore = create<MessageState>()(
  devtools((set, get) => ({
    // Initial state
    conversations: [],
    currentConversationId: null,
    messages: {},
    filters: {},
    searchQuery: '',
    unreadCount: 0,
    isLoading: false,
    isSending: false,
    error: null,
    typingUsers: [],

    // Actions
    setConversations: (conversations) => {
      const unreadCount = conversations.reduce((sum, c) => sum + c.unreadCount, 0);
      set({ conversations, unreadCount });
    },

    addConversation: (conversation) =>
      set((state) => ({
        conversations: [conversation, ...state.conversations],
        unreadCount: state.unreadCount + conversation.unreadCount,
      })),

    updateConversation: (id, updates) =>
      set((state) => {
        const conversations = state.conversations.map((c) =>
          c.id === id ? { ...c, ...updates } : c
        );
        const unreadCount = conversations.reduce((sum, c) => sum + c.unreadCount, 0);
        return { conversations, unreadCount };
      }),

    setCurrentConversation: (currentConversationId) => set({ currentConversationId }),

    setMessages: (conversationId, messages) =>
      set((state) => ({
        messages: { ...state.messages, [conversationId]: messages },
      })),

    addMessage: (conversationId, message) =>
      set((state) => ({
        messages: {
          ...state.messages,
          [conversationId]: [
            ...(state.messages[conversationId] || []),
            message,
          ],
        },
        conversations: state.conversations.map((c) =>
          c.id === conversationId
            ? {
                ...c,
                lastMessage: message.content,
                lastMessageTime: message.createdAt,
              }
            : c
        ),
      })),

    updateMessage: (conversationId, messageId, updates) =>
      set((state) => ({
        messages: {
          ...state.messages,
          [conversationId]: (state.messages[conversationId] || []).map((m) =>
            m.id === messageId ? { ...m, ...updates } : m
          ),
        },
      })),

    deleteMessage: (conversationId, messageId) =>
      set((state) => ({
        messages: {
          ...state.messages,
          [conversationId]: (state.messages[conversationId] || []).filter(
            (m) => m.id !== messageId
          ),
        },
      })),

    markAsRead: (conversationId) =>
      set((state) => {
        const conversation = state.conversations.find((c) => c.id === conversationId);
        if (!conversation) return state;

        const unreadBefore = conversation.unreadCount;

        return {
          conversations: state.conversations.map((c) =>
            c.id === conversationId ? { ...c, unreadCount: 0 } : c
          ),
          messages: {
            ...state.messages,
            [conversationId]: (state.messages[conversationId] || []).map((m) => ({
              ...m,
              isRead: true,
            })),
          },
          unreadCount: state.unreadCount - unreadBefore,
        };
      }),

    pinConversation: (id) =>
      set((state) => ({
        conversations: state.conversations.map((c) =>
          c.id === id ? { ...c, isPinned: !c.isPinned } : c
        ),
      })),

    archiveConversation: (id) =>
      set((state) => ({
        conversations: state.conversations.map((c) =>
          c.id === id ? { ...c, isArchived: !c.isArchived } : c
        ),
      })),

    setFilters: (newFilters) =>
      set((state) => ({ filters: { ...state.filters, ...newFilters } })),

    setSearchQuery: (searchQuery) => set({ searchQuery }),

    setTypingUser: (userId, isTyping) =>
      set((state) => ({
        typingUsers: isTyping
          ? [...state.typingUsers, userId]
          : state.typingUsers.filter((id) => id !== userId),
      })),

    reset: () =>
      set({
        conversations: [],
        currentConversationId: null,
        messages: {},
        filters: {},
        searchQuery: '',
        unreadCount: 0,
      }),
  }))
);

// ==================== ANALYTICS STORE ====================

interface AnalyticsState {
  dateRange: DateRange;
  selectedProperties: string[];
  metrics: AnalyticsMetrics | null;
  chartData: ChartDataPoint[];
  reviews: Review[];
  customReports: CustomReport[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setDateRange: (dateRange: DateRange) => void;
  setSelectedProperties: (propertyIds: string[]) => void;
  togglePropertySelection: (propertyId: string) => void;
  setMetrics: (metrics: AnalyticsMetrics) => void;
  setChartData: (data: ChartDataPoint[]) => void;
  setReviews: (reviews: Review[]) => void;
  addCustomReport: (report: CustomReport) => void;
  deleteCustomReport: (id: string) => void;
  reset: () => void;
}

const defaultDateRange: DateRange = {
  start: new Date(new Date().setDate(new Date().getDate() - 30)),
  end: new Date(),
};

export const useAnalyticsStore = create<AnalyticsState>()(
  devtools((set) => ({
    // Initial state
    dateRange: defaultDateRange,
    selectedProperties: [],
    metrics: null,
    chartData: [],
    reviews: [],
    customReports: [],
    isLoading: false,
    error: null,

    // Actions
    setDateRange: (dateRange) => set({ dateRange }),

    setSelectedProperties: (selectedProperties) => set({ selectedProperties }),

    togglePropertySelection: (propertyId) =>
      set((state) => ({
        selectedProperties: state.selectedProperties.includes(propertyId)
          ? state.selectedProperties.filter((id) => id !== propertyId)
          : [...state.selectedProperties, propertyId],
      })),

    setMetrics: (metrics) => set({ metrics }),

    setChartData: (chartData) => set({ chartData }),

    setReviews: (reviews) => set({ reviews }),

    addCustomReport: (report) =>
      set((state) => ({
        customReports: [...state.customReports, report],
      })),

    deleteCustomReport: (id) =>
      set((state) => ({
        customReports: state.customReports.filter((r) => r.id !== id),
      })),

    reset: () =>
      set({
        dateRange: defaultDateRange,
        selectedProperties: [],
        metrics: null,
        chartData: [],
        reviews: [],
        customReports: [],
      }),
  }))
);

// ==================== UI STORE ====================

interface UIState {
  // Modals
  modals: Record<string, boolean>;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  toggleModal: (modalId: string) => void;

  // Toast notifications
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;

  // Loading states
  loadingStates: Record<string, boolean>;
  setLoading: (key: string, isLoading: boolean) => void;

  // Sidebar
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;

  // Theme
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;

  reset: () => void;
}

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        modals: {},
        toasts: [],
        loadingStates: {},
        sidebarOpen: true,
        theme: 'light',

        // Modal actions
        openModal: (modalId) =>
          set((state) => ({
            modals: { ...state.modals, [modalId]: true },
          })),

        closeModal: (modalId) =>
          set((state) => ({
            modals: { ...state.modals, [modalId]: false },
          })),

        toggleModal: (modalId) =>
          set((state) => ({
            modals: { ...state.modals, [modalId]: !state.modals[modalId] },
          })),

        // Toast actions
        addToast: (toast) =>
          set((state) => ({
            toasts: [
              ...state.toasts,
              { ...toast, id: Math.random().toString(36).substring(7) },
            ],
          })),

        removeToast: (id) =>
          set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
          })),

        // Loading actions
        setLoading: (key, isLoading) =>
          set((state) => ({
            loadingStates: { ...state.loadingStates, [key]: isLoading },
          })),

        // Sidebar actions
        toggleSidebar: () =>
          set((state) => ({ sidebarOpen: !state.sidebarOpen })),

        setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),

        // Theme actions
        setTheme: (theme) => set({ theme }),

        toggleTheme: () =>
          set((state) => ({
            theme: state.theme === 'light' ? 'dark' : 'light',
          })),

        reset: () =>
          set({
            modals: {},
            toasts: [],
            loadingStates: {},
          }),
      }),
      {
        name: 'ui-storage',
        partialize: (state) => ({
          sidebarOpen: state.sidebarOpen,
          theme: state.theme,
        }),
      }
    )
  )
);

// ==================== PROPERTY WIZARD STORE ====================

const initialWizardState: PropertyWizardState = {
  currentStep: 1,
  totalSteps: 8,
  formData: {
    step1: {},
    step2: {},
    step3: {},
    step4: {},
    step5: {},
    step6: {},
    step7: {},
    step8: {},
  },
  completedSteps: [],
  errors: {},
};

interface WizardStore extends PropertyWizardState {
  // Navigation
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;

  // Data management
  setFormData: <T extends keyof PropertyWizardState['formData']>(
    step: T,
    data: Partial<PropertyWizardState['formData'][T]>
  ) => void;

  setAllFormData: (data: Partial<PropertyWizardState['formData']>) => void;

  // Validation
  setStepErrors: (step: number, errors: string[]) => void;
  clearStepErrors: (step: number) => void;
  markStepComplete: (step: number) => void;

  // Draft management
  saveDraft: () => Promise<void>;
  loadDraft: (draftId: string) => Promise<void>;

  // Reset
  reset: () => void;
}

export const useWizardStore = create<WizardStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialWizardState,

        // Navigation
        nextStep: () =>
          set((state) => ({
            currentStep: Math.min(state.currentStep + 1, state.totalSteps),
          })),

        prevStep: () =>
          set((state) => ({
            currentStep: Math.max(state.currentStep - 1, 1),
          })),

        goToStep: (step) =>
          set(() => ({
            currentStep: Math.max(1, Math.min(step, 8)),
          })),

        // Data management
        setFormData: (step, data) =>
          set((state) => ({
            formData: {
              ...state.formData,
              [step]: { ...state.formData[step], ...data },
            },
          })),

        setAllFormData: (data) =>
          set((state) => ({
            formData: { ...state.formData, ...data },
          })),

        // Validation
        setStepErrors: (step, errors) =>
          set((state) => ({
            errors: { ...state.errors, [step]: errors },
          })),

        clearStepErrors: (step) =>
          set((state) => {
            const newErrors = { ...state.errors };
            delete newErrors[step];
            return { errors: newErrors };
          }),

        markStepComplete: (step) =>
          set((state) => ({
            completedSteps: state.completedSteps.includes(step)
              ? state.completedSteps
              : [...state.completedSteps, step].sort((a, b) => a - b),
          })),

        // Draft management
        saveDraft: async () => {
          const state = get();
          const draftData = {
            savedAt: new Date(),
            autoSaveEnabled: true,
            lastSaveId: Math.random().toString(36).substring(7),
          };

          set({ draftData });

          // In real app, save to API
          // await api.saveDraft(state.formData, draftData.lastSaveId);
        },

        loadDraft: async (draftId: string) => {
          // In real app, load from API
          // const draft = await api.loadDraft(draftId);
          // set({ formData: draft.formData, draftData: draft.metadata });
        },

        // Reset
        reset: () => set(initialWizardState),
      }),
      {
        name: 'property-wizard-storage',
        partialize: (state) => ({
          formData: state.formData,
          currentStep: state.currentStep,
          completedSteps: state.completedSteps,
          draftData: state.draftData,
        }),
      }
    )
  )
);

// Export all stores
export {
  useDashboardStore,
  useBookingStore,
  useMessageStore,
  useAnalyticsStore,
  useUIStore,
  useWizardStore,
};
