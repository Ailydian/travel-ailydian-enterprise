import React from 'react';
import {
  LucideIcon,
  Inbox,
  SearchX,
  AlertTriangle,
  FileQuestion,
  Plus,
} from 'lucide-react';

/**
 * Empty state variant types
 */
export type EmptyStateVariant = 'no-data' | 'search' | 'error' | 'not-found';

/**
 * Props for the EmptyState component
 */
export interface EmptyStateProps {
  /** Variant type that determines default icon and styling */
  variant?: EmptyStateVariant;
  /** Custom icon to override variant default */
  icon?: LucideIcon;
  /** Primary title text */
  title: string;
  /** Descriptive text */
  description?: string;
  /** Call-to-action button label */
  actionLabel?: string;
  /** Handler for action button click */
  onAction?: () => void;
  /** Secondary action label */
  secondaryActionLabel?: string;
  /** Handler for secondary action */
  onSecondaryAction?: () => void;
  /** Additional custom content to render */
  children?: React.ReactNode;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

const variantConfig: Record<
  EmptyStateVariant,
  {
    icon: LucideIcon;
    iconColor: string;
    bgColor: string;
  }
> = {
  'no-data': {
    icon: Inbox,
    iconColor: 'text-gray-400',
    bgColor: 'bg-gray-100',
  },
  search: {
    icon: SearchX,
    iconColor: 'text-blue-400',
    bgColor: 'bg-blue-50',
  },
  error: {
    icon: AlertTriangle,
    iconColor: 'text-red-400',
    bgColor: 'bg-red-50',
  },
  'not-found': {
    icon: FileQuestion,
    iconColor: 'text-gray-400',
    bgColor: 'bg-gray-100',
  },
};

const sizeConfig = {
  sm: {
    container: 'py-8',
    icon: 'h-12 w-12',
    iconContainer: 'h-20 w-20',
    title: 'text-lg',
    description: 'text-sm',
  },
  md: {
    container: 'py-12',
    icon: 'h-16 w-16',
    iconContainer: 'h-24 w-24',
    title: 'text-xl',
    description: 'text-base',
  },
  lg: {
    container: 'py-16',
    icon: 'h-20 w-20',
    iconContainer: 'h-28 w-28',
    title: 'text-2xl',
    description: 'text-lg',
  },
};

/**
 * EmptyState - A component for displaying empty states with call-to-action
 *
 * @example
 * ```tsx
 * // No data variant
 * <EmptyState
 *   variant="no-data"
 *   title="No properties yet"
 *   description="Get started by adding your first property"
 *   actionLabel="Add Property"
 *   onAction={handleAddProperty}
 * />
 *
 * // Search variant
 * <EmptyState
 *   variant="search"
 *   title="No results found"
 *   description="Try adjusting your search filters"
 *   actionLabel="Clear Filters"
 *   onAction={handleClearFilters}
 * />
 *
 * // Custom icon
 * <EmptyState
 *   icon={Home}
 *   title="No available rooms"
 *   description="All rooms are currently booked"
 * />
 * ```
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  variant = 'no-data',
  icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  children,
  size = 'md',
}) => {
  const config = variantConfig[variant];
  const sizeStyle = sizeConfig[size];
  const Icon = icon || config.icon;

  return (
    <div
      className={`flex flex-col items-center justify-center text-center px-4 ${sizeStyle.container}`}
      role="status"
      aria-live="polite"
    >
      {/* Icon */}
      <div
        className={`rounded-full flex items-center justify-center mb-4 ${config.bgColor} ${sizeStyle.iconContainer}`}
      >
        <Icon className={`${sizeStyle.icon} ${config.iconColor}`} aria-hidden="true" />
      </div>

      {/* Title */}
      <h3 className={`font-semibold text-gray-900 mb-2 ${sizeStyle.title}`}>
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className={`text-gray-600 mb-6 max-w-md ${sizeStyle.description}`}>
          {description}
        </p>
      )}

      {/* Custom Content */}
      {children && <div className="mb-6">{children}</div>}

      {/* Actions */}
      {(actionLabel || secondaryActionLabel) && (
        <div className="flex flex-col sm:flex-row gap-3">
          {actionLabel && onAction && (
            <button
              onClick={onAction}
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="h-5 w-5 mr-2" />
              {actionLabel}
            </button>
          )}

          {secondaryActionLabel && onSecondaryAction && (
            <button
              onClick={onSecondaryAction}
              className="inline-flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {secondaryActionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
