import React from 'react';
import {
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Power,
  Loader,
  Home,
} from 'lucide-react';

/**
 * Available status types
 */
export type Status =
  | 'confirmed'
  | 'pending'
  | 'cancelled'
  | 'completed'
  | 'active'
  | 'inactive'
  | 'checked-in'
  | 'checked-out'
  | 'error'
  | 'processing';

/**
 * Props for the StatusBadge component
 */
export interface StatusBadgeProps {
  /** The status to display */
  status: Status;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show icon */
  showIcon?: boolean;
  /** Custom label override */
  label?: string;
}

interface StatusConfig {
  label: string;
  icon: React.ElementType;
  className: string;
}

const statusConfig: Record<Status, StatusConfig> = {
  confirmed: {
    label: 'Confirmed',
    icon: CheckCircle,
    className: 'bg-green-100 text-green-800 border-green-200',
  },
  pending: {
    label: 'Pending',
    icon: Clock,
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  cancelled: {
    label: 'Cancelled',
    icon: XCircle,
    className: 'bg-red-100 text-red-800 border-red-200',
  },
  completed: {
    label: 'Completed',
    icon: CheckCircle,
    className: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  active: {
    label: 'Active',
    icon: Power,
    className: 'bg-green-100 text-green-800 border-green-200',
  },
  inactive: {
    label: 'Inactive',
    icon: Power,
    className: 'bg-gray-100 text-gray-800 border-gray-200',
  },
  'checked-in': {
    label: 'Checked In',
    icon: Home,
    className: 'bg-purple-100 text-purple-800 border-purple-200',
  },
  'checked-out': {
    label: 'Checked Out',
    icon: CheckCircle,
    className: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  },
  error: {
    label: 'Error',
    icon: AlertCircle,
    className: 'bg-red-100 text-red-800 border-red-200',
  },
  processing: {
    label: 'Processing',
    icon: Loader,
    className: 'bg-blue-100 text-blue-800 border-blue-200',
  },
};

const sizeStyles = {
  sm: {
    container: 'px-2 py-1 text-xs',
    icon: 'h-3 w-3',
  },
  md: {
    container: 'px-3 py-1.5 text-sm',
    icon: 'h-4 w-4',
  },
  lg: {
    container: 'px-4 py-2 text-base',
    icon: 'h-5 w-5',
  },
};

/**
 * StatusBadge - A badge component for displaying status with color coding
 *
 * @example
 * ```tsx
 * <StatusBadge status="confirmed" size="md" showIcon />
 * <StatusBadge status="pending" size="sm" />
 * <StatusBadge status="cancelled" label="Canceled by Guest" />
 * ```
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true,
  label,
}) => {
  const config = statusConfig[status];
  const sizeStyle = sizeStyles[size];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${config.className} ${sizeStyle.container}`}
      role="status"
      aria-label={label || config.label}
    >
      {showIcon && (
        <Icon
          className={`${sizeStyle.icon} mr-1 ${
            status === 'processing' ? 'animate-spin' : ''
          }`}
          aria-hidden="true"
        />
      )}
      <span>{label || config.label}</span>
    </span>
  );
};

export default StatusBadge;
