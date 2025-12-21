/**
 * Dashboard Component Types
 *
 * Type definitions for dashboard layout components
 */

/**
 * Breadcrumb navigation item
 */
export interface Breadcrumb {
  /** Display label for the breadcrumb */
  label: string;
  /** Optional link for the breadcrumb (omit for current page) */
  href?: string;
}

/**
 * Navigation menu item
 */
export interface NavigationItem {
  /** Display name of the navigation item */
  name: string;
  /** Route path for the navigation item */
  href: string;
  /** Icon component from lucide-react */
  icon: React.ComponentType<{ className?: string }>;
  /** Optional badge count (e.g., for unread messages) */
  badge?: number;
  /** Optional submenu items */
  children?: NavigationItem[];
}

/**
 * Property information for property switcher
 */
export interface Property {
  /** Unique identifier */
  id: string;
  /** Property name */
  name: string;
  /** Property type (e.g., villa, apartment) */
  type?: string;
  /** Optional property image */
  image?: string;
  /** Is this property active/published */
  isActive?: boolean;
}

/**
 * Notification item
 */
export interface Notification {
  /** Unique identifier */
  id: string | number;
  /** Notification title */
  title: string;
  /** Optional notification body/description */
  description?: string;
  /** Timestamp or relative time string */
  time: string;
  /** Is this notification unread */
  unread: boolean;
  /** Optional notification type for styling */
  type?: 'info' | 'success' | 'warning' | 'error';
  /** Optional link to navigate to */
  href?: string;
}

/**
 * User information
 */
export interface User {
  /** User's full name */
  name: string;
  /** User's email address */
  email: string;
  /** Optional avatar image URL */
  avatar?: string;
  /** User role (e.g., 'Host', 'Admin') */
  role?: string;
}

/**
 * Dashboard shell props
 */
export interface DashboardShellProps {
  /** Page content */
  children: React.ReactNode;
  /** Page title */
  title?: string;
  /** Breadcrumb navigation items */
  breadcrumbs?: Breadcrumb[];
}

/**
 * Dashboard sidebar props
 */
export interface DashboardSidebarProps {
  /** Is sidebar open (mobile) */
  isOpen: boolean;
  /** Is sidebar collapsed (desktop) */
  isCollapsed: boolean;
  /** Callback to close sidebar */
  onClose: () => void;
  /** Callback to toggle collapse state */
  onToggleCollapse: () => void;
  /** Optional custom navigation items */
  navigationItems?: NavigationItem[];
  /** Optional properties list */
  properties?: Property[];
  /** Optional selected property ID */
  selectedPropertyId?: string;
  /** Optional callback when property is selected */
  onPropertyChange?: (propertyId: string) => void;
}

/**
 * Dashboard header props
 */
export interface DashboardHeaderProps {
  /** Page title */
  title?: string;
  /** Breadcrumb navigation items */
  breadcrumbs?: Breadcrumb[];
  /** Callback to toggle mobile menu */
  onMenuClick: () => void;
  /** Optional user information */
  user?: User;
  /** Optional notifications */
  notifications?: Notification[];
  /** Optional callback when search is submitted */
  onSearch?: (query: string) => void;
}
