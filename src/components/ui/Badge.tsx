/**
 * Badge Component - Production-Grade Status Indicator
 * Features: Multiple variants, sizes, icons, removable badges
 */

import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  style?: 'solid' | 'outline' | 'subtle';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRemove?: () => void;
  rounded?: boolean;
  className?: string;
}

const variantStyles = {
  default: { solid: 'bg-gray-600 text-white', outline: 'border-2 border-gray-600 text-gray-600', subtle: 'bg-gray-100 text-gray-700' },
  primary: { solid: 'bg-blue-600 text-white', outline: 'border-2 border-blue-600 text-blue-600', subtle: 'bg-blue-100 text-blue-700' },
  success: { solid: 'bg-green-600 text-white', outline: 'border-2 border-green-600 text-green-600', subtle: 'bg-green-100 text-green-700' },
  warning: { solid: 'bg-yellow-600 text-white', outline: 'border-2 border-yellow-600 text-yellow-600', subtle: 'bg-yellow-100 text-yellow-700' },
  error: { solid: 'bg-red-600 text-white', outline: 'border-2 border-red-600 text-red-600', subtle: 'bg-red-100 text-red-700' },
  info: { solid: 'bg-cyan-600 text-white', outline: 'border-2 border-cyan-600 text-cyan-600', subtle: 'bg-cyan-100 text-cyan-700' },
  neutral: { solid: 'bg-gray-500 text-white', outline: 'border-2 border-gray-500 text-gray-500', subtle: 'bg-gray-50 text-gray-600' },
} as const;

const sizeStyles = {
  xs: 'px-2 py-0.5 text-xs',
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
} as const;

export const Badge: React.FC<BadgeProps> = ({
  children, variant = 'default', size = 'md', style = 'solid',
  leftIcon, rightIcon, onRemove, rounded = false, className = '',
}) => {
  return (
    <span className={`inline-flex items-center gap-1.5 font-medium transition-colors ${variantStyles[variant][style]} ${sizeStyles[size]} ${rounded ? 'rounded-full' : 'rounded-md'} ${className}`}>
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      {onRemove && (
        <button onClick={onRemove} className="flex-shrink-0 ml-1 hover:opacity-70" aria-label="Remove">
          <svg className="w-3.5 h-3.5" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
};

export const DotBadge: React.FC<{ variant?: 'default' | 'primary' | 'success' | 'warning' | 'error'; pulse?: boolean }> = ({ variant = 'default', pulse = false }) => {
  const colors = { default: 'bg-gray-500', primary: 'bg-blue-500', success: 'bg-green-500', warning: 'bg-yellow-500', error: 'bg-red-500' };
  return (
    <span className="relative inline-flex">
      <span className={`w-2 h-2 rounded-full ${colors[variant]}`} />
      {pulse && <span className={`absolute top-0 left-0 w-2 h-2 rounded-full animate-ping opacity-75 ${colors[variant]}`} />}
    </span>
  );
};

export default Badge;
