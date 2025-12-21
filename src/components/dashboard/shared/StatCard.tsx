import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

/**
 * Props for the StatCard component
 */
export interface StatCardProps {
  /** The title/label of the statistic */
  title: string;
  /** The main value to display */
  value: string | number;
  /** Icon component from lucide-react */
  icon: LucideIcon;
  /** Trend percentage (positive or negative) */
  trend?: number;
  /** Optional description or subtitle */
  description?: string;
  /** Color variant for the card */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  /** Loading state */
  loading?: boolean;
  /** Optional click handler */
  onClick?: () => void;
}

const variantStyles = {
  default: {
    container: 'bg-white border-gray-200',
    icon: 'bg-gray-100 text-gray-600',
    text: 'text-gray-900',
  },
  primary: {
    container: 'bg-white border-blue-200',
    icon: 'bg-blue-100 text-blue-600',
    text: 'text-gray-900',
  },
  success: {
    container: 'bg-white border-green-200',
    icon: 'bg-green-100 text-green-600',
    text: 'text-gray-900',
  },
  warning: {
    container: 'bg-white border-yellow-200',
    icon: 'bg-yellow-100 text-yellow-600',
    text: 'text-gray-900',
  },
  danger: {
    container: 'bg-white border-red-200',
    icon: 'bg-red-100 text-red-600',
    text: 'text-gray-900',
  },
};

/**
 * StatCard - A statistics card component for displaying metrics
 *
 * @example
 * ```tsx
 * <StatCard
 *   title="Total Revenue"
 *   value="$45,231.89"
 *   icon={DollarSign}
 *   trend={12.5}
 *   variant="success"
 * />
 * ```
 */
export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  description,
  variant = 'default',
  loading = false,
  onClick,
}) => {
  const styles = variantStyles[variant];
  const isPositiveTrend = trend !== undefined && trend >= 0;
  const TrendIcon = isPositiveTrend ? TrendingUp : TrendingDown;

  if (loading) {
    return (
      <div className={`rounded-lg border p-6 ${styles.container}`}>
        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
            <div className="h-8 bg-gray-200 rounded animate-pulse w-32" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-20" />
          </div>
          <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg border p-6 transition-all duration-200 ${styles.container} ${
        onClick ? 'cursor-pointer hover:shadow-md hover:scale-[1.02]' : ''
      }`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      aria-label={onClick ? `View details for ${title}` : undefined}
    >
      <div className="flex items-center justify-between space-x-4">
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-3xl font-bold ${styles.text}`}>{value}</p>
          <div className="flex items-center space-x-2">
            {trend !== undefined && (
              <div
                className={`flex items-center text-sm font-medium ${
                  isPositiveTrend ? 'text-green-600' : 'text-red-600'
                }`}
              >
                <TrendIcon className="h-4 w-4 mr-1" />
                <span>{Math.abs(trend)}%</span>
              </div>
            )}
            {description && (
              <p className="text-xs text-gray-500">{description}</p>
            )}
          </div>
        </div>
        <div className={`rounded-full p-3 ${styles.icon}`}>
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
