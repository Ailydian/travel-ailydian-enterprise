/**
 * Dashboard Configuration
 *
 * Centralized configuration for dashboard components.
 * Modify these values to customize your dashboard without touching component files.
 */

import {
  Home,
  Calendar,
  DollarSign,
  MessageSquare,
  BarChart3,
  Settings,
  Users,
  Star,
  FileText,
  HelpCircle,
} from 'lucide-react';
import type { NavigationItem } from './types';

/**
 * Brand Configuration
 */
export const BRAND_CONFIG = {
  name: 'LyDian',
  logo: '/logo.png', // Update with your logo path
  tagline: 'Enterprise Travel Platform',
};

/**
 * Navigation Menu Items
 *
 * Add, remove, or modify navigation items here.
 * Icons are from lucide-react.
 */
export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: Home,
  },
  {
    name: 'Bookings',
    href: '/dashboard/bookings',
    icon: Calendar,
  },
  {
    name: 'Calendar',
    href: '/dashboard/calendar',
    icon: Calendar,
  },
  {
    name: 'Earnings',
    href: '/dashboard/earnings',
    icon: DollarSign,
  },
  {
    name: 'Messages',
    href: '/dashboard/messages',
    icon: MessageSquare,
  },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

/**
 * User Menu Items
 *
 * Customize the dropdown menu items that appear when clicking the user avatar.
 */
export const USER_MENU_ITEMS = [
  {
    name: 'Profile',
    href: '/dashboard/profile',
    icon: Users,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
  {
    name: 'Help & Support',
    href: '/help',
    icon: HelpCircle,
  },
];

/**
 * Dashboard Color Scheme
 *
 * Customize the color palette for the dashboard.
 * Uses Tailwind CSS color classes.
 */
export const COLOR_SCHEME = {
  primary: 'blue-600',
  primaryHover: 'blue-700',
  primaryLight: 'blue-50',

  sidebar: {
    background: 'white',
    border: 'gray-200',
    text: 'gray-700',
    textHover: 'gray-900',
    activeBackground: 'blue-50',
    activeText: 'blue-700',
  },

  header: {
    background: 'white',
    border: 'gray-200',
    text: 'gray-900',
  },

  notification: {
    badge: 'red-500',
    unread: 'blue-600',
  },
};

/**
 * Layout Configuration
 */
export const LAYOUT_CONFIG = {
  sidebar: {
    widthExpanded: 'w-64',
    widthCollapsed: 'w-20',
    mobileBreakpoint: 1024, // px
  },

  header: {
    height: 'h-16',
    searchBarWidth: 'w-64',
  },

  container: {
    maxWidth: 'container',
    padding: {
      mobile: 'px-4',
      tablet: 'sm:px-6',
      desktop: 'lg:px-8',
    },
  },
};

/**
 * Feature Flags
 *
 * Enable or disable specific features.
 */
export const FEATURES = {
  propertySwitcher: true,
  notifications: true,
  search: true,
  sidebarCollapse: true,
  userAvatar: true,
  breadcrumbs: true,
  addPropertyButton: true,
};

/**
 * Default Values
 */
export const DEFAULTS = {
  pageTitle: 'Dashboard',
  defaultBreadcrumbs: [{ label: 'Dashboard' }],
  notificationLimit: 10,
  searchPlaceholder: 'Search...',
  userRole: 'Host',
};

/**
 * API Endpoints (optional)
 *
 * Configure API endpoints for dashboard data.
 */
export const API_ENDPOINTS = {
  notifications: '/api/dashboard/notifications',
  properties: '/api/dashboard/properties',
  user: '/api/dashboard/user',
  search: '/api/dashboard/search',
};

/**
 * Animation Configuration
 */
export const ANIMATIONS = {
  sidebarTransition: 'transition-all duration-300 ease-in-out',
  dropdownTransition: 'transition-opacity duration-200',
  hoverTransition: 'transition-colors',
};

/**
 * Accessibility Configuration
 */
export const A11Y = {
  skipToContent: true,
  ariaLabels: {
    mainNav: 'Main navigation',
    userMenu: 'User menu',
    notifications: 'Notifications',
    search: 'Search',
    mobileSidebar: 'Mobile sidebar',
    breadcrumb: 'Breadcrumb',
  },
};

/**
 * Property Types (for property switcher)
 */
export const PROPERTY_TYPES = [
  'Villa',
  'Apartment',
  'House',
  'Condo',
  'Hotel',
  'Resort',
  'Cabin',
  'Cottage',
] as const;

/**
 * Notification Types
 */
export const NOTIFICATION_TYPES = {
  info: {
    color: 'blue',
    icon: FileText,
  },
  success: {
    color: 'green',
    icon: Star,
  },
  warning: {
    color: 'yellow',
    icon: HelpCircle,
  },
  error: {
    color: 'red',
    icon: HelpCircle,
  },
} as const;

/**
 * Status Badge Colors
 */
export const STATUS_COLORS = {
  confirmed: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-blue-100 text-blue-800',
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
} as const;

/**
 * Export all configuration
 */
export const dashboardConfig = {
  brand: BRAND_CONFIG,
  navigation: NAVIGATION_ITEMS,
  userMenu: USER_MENU_ITEMS,
  colors: COLOR_SCHEME,
  layout: LAYOUT_CONFIG,
  features: FEATURES,
  defaults: DEFAULTS,
  api: API_ENDPOINTS,
  animations: ANIMATIONS,
  accessibility: A11Y,
  propertyTypes: PROPERTY_TYPES,
  notificationTypes: NOTIFICATION_TYPES,
  statusColors: STATUS_COLORS,
};

export default dashboardConfig;
