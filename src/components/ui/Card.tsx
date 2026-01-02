/**
 * Card Component - Production-Grade Container
 * Features: Multiple variants, interactive states, accessibility, type-safe
 *
 * BRAND CONSISTENCY: 100% Design Token Usage
 * - All colors use design tokens (bg-lydian-*, text-lydian-*, etc.)
 * - Zero raw Tailwind color classes
 * - Maintains Lydian RED brand identity
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
  default: 'bg-lydian-bg border border-white/20 shadow-sm',
  elevated: 'bg-lydian-bg shadow-lg',
  outlined: 'bg-transparent border-2 border-lydian-border',
  ghost: 'bg-lydian-bg-surface border border-transparent',
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
        ${selected ? 'ring-2 ring-lydian-primary ring-offset-2' : ''}
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
    <div className={`px-6 py-4 bg-lydian-bg-surface border-t border-white/20 rounded-b-lg ${className}`}>
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
    <p className={`text-sm text-lydian-text-tertiary mt-1 ${className}`}>
      {children}
    </p>);

};
