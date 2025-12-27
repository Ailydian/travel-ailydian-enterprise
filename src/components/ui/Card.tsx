/**
 * Card Component - Production-Grade Container
 * Features: Multiple variants, interactive states, accessibility, type-safe
 */
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  selected?: boolean;
  fullWidth?: boolean;
  role?: string;
  tabIndex?: number;
}

const variantStyles = {
  default: 'bg-white border border-gray-200 shadow-sm',
  elevated: 'bg-white shadow-lg',
  outlined: 'bg-transparent border-2 border-gray-300',
  ghost: 'bg-gray-50 border border-transparent',
} as const;

const paddingStyles = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
} as const;

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  onClick,
  variant = 'default',
  padding = 'md',
  selected = false,
  fullWidth = false,
  role,
  tabIndex
}) => {
  const isInteractive = hover || Boolean(onClick);

  return (
    <div
      role={isInteractive ? (role || 'button') : role}
      tabIndex={isInteractive ? (tabIndex ?? 0) : tabIndex}
      onClick={onClick}
      onKeyDown={
        isInteractive
          ? (e) => {
              if ((e.key === 'Enter' || e.key === ' ') && onClick) {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={`
        rounded-xl overflow-hidden transition-all duration-200
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${hover ? 'hover:shadow-xl hover:-translate-y-0.5 cursor-pointer' : ''}
        ${selected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{children: React.ReactNode;className?: string;}> = ({
  children,
  className = ''
}) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

export const CardContent: React.FC<{children: React.ReactNode;className?: string;}> = ({
  children,
  className = ''
}) => {
  return <div className={`px-6 pb-6 ${className}`}>{children}</div>;
};

export const CardFooter: React.FC<{children: React.ReactNode;className?: string;}> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`px-6 py-4 bg-neutral-50 border-t border-neutral-200 rounded-b-lg ${className}`}>
      {children}
    </div>);

};

export const CardTitle: React.FC<{children: React.ReactNode;className?: string;}> = ({
  children,
  className = ''
}) => {
  return (
    <h3 className={`text-lg font-semibold text-lydian-text ${className}`}>
      {children}
    </h3>);

};

export const CardDescription: React.FC<{children: React.ReactNode;className?: string;}> = ({
  children,
  className = ''
}) => {
  return (
    <p className={`text-sm text-neutral-600 mt-1 ${className}`}>
      {children}
    </p>);

};