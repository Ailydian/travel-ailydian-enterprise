/**
 * UI Component Library - Centralized Exports
 * Production-grade component library for travel.ailydian.com
 * Total Components: 12 production-grade components
 */

// ============================================================================
// FORM COMPONENTS
// ============================================================================

export { Input } from './Input';
export type { InputProps } from './Input';

export { Dropdown } from './Dropdown';
export type { DropdownProps, DropdownOption } from './Dropdown';

export { Form, FormField, useFormContext } from './Form';
export type { FormProps, FormFieldProps, FormFieldConfig, FormContextValue } from './Form';

// ============================================================================
// LAYOUT COMPONENTS
// ============================================================================

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';

export { Modal } from './Modal';
export type { ModalProps } from './Modal';

// ============================================================================
// NAVIGATION COMPONENTS
// ============================================================================

export { Tabs, TabList, TabButton, TabPanel } from './Tabs';
export type { TabsProps, Tab } from './Tabs';

export { Accordion, SimpleAccordion } from './Accordion';
export type { AccordionProps, AccordionItem, SimpleAccordionProps } from './Accordion';

export { Pagination, PaginationInfo } from './Pagination';
export type { PaginationProps } from './Pagination';

// ============================================================================
// DATA DISPLAY COMPONENTS
// ============================================================================

export { Table } from './Table';
export type { TableProps, Column } from './Table';

// ============================================================================
// FEEDBACK COMPONENTS
// ============================================================================

export { Badge, DotBadge } from './Badge';
export type { BadgeProps } from './Badge';

export { ToastProvider, useToast } from './Toast';
export type { Toast } from './Toast';

export {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonList,
  SkeletonTable,
  SkeletonProductCard,
  SkeletonProfile,
  SkeletonDashboard,
  SkeletonImage,
} from './Skeleton';
export type { SkeletonProps, SkeletonCardProps, SkeletonTableProps } from './Skeleton';

// ============================================================================
// BUTTON COMPONENT
// ============================================================================

export { Button } from './button';
export type { ButtonProps } from './button';

// ============================================================================
// LAYOUT & NAVIGATION (PHASE 2)
// ============================================================================

export {
  Sidebar,
  SidebarToggle,
  SidebarHeader,
  SidebarNav,
  SidebarNavItem,
  SidebarFooter,
  useSidebar,
} from './Sidebar';
export type { SidebarProps, SidebarNavItemProps } from './Sidebar';

// ============================================================================
// ANIMATION & TRANSITIONS (PHASE 2)
// ============================================================================

export {
  PageTransition,
  RouteProgress,
  LoadingOverlay,
  StaggerChildren,
  FadeInView,
  ParallaxSection,
  ModalTransition,
} from './PageTransition';
export type { PageTransitionProps } from './PageTransition';
