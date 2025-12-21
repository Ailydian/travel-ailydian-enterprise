/**
 * Shared Dashboard UI Components
 *
 * This module exports a comprehensive set of production-ready UI components
 * for building dashboard interfaces with TypeScript, Tailwind CSS, and React.
 *
 * @module dashboard/shared
 */

// Stat and metric components
export { StatCard } from './StatCard';
export type { StatCardProps } from './StatCard';

// Card components
export { PropertyCard } from './PropertyCard';
export type { PropertyCardProps, PropertyStatus } from './PropertyCard';

export { BookingCard } from './BookingCard';
export type { BookingCardProps, BookingStatus } from './BookingCard';

// Status and badge components
export { StatusBadge } from './StatusBadge';
export type { StatusBadgeProps, Status } from './StatusBadge';

// State components
export { EmptyState } from './EmptyState';
export type { EmptyStateProps, EmptyStateVariant } from './EmptyState';

export { LoadingState } from './LoadingState';
export type { LoadingStateProps, LoadingVariant } from './LoadingState';

// Data table component
export { DataTable } from './DataTable';
export type {
  DataTableProps,
  Column,
  RowAction,
} from './DataTable';

// Upload components
export { PhotoUploader } from './PhotoUploader';
export type {
  PhotoUploaderProps,
  UploadedImage,
  ValidationRequirements,
} from './PhotoUploader';

// Filter components
export { FilterBar } from './FilterBar';
export type {
  FilterBarProps,
  FilterValues,
  FilterOption,
} from './FilterBar';
