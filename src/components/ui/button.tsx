/**
 * Premium Style Button Component - Red Theme
 * Professional, Modern, Accessible
 */
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'white' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  className = '',
  children,
  disabled,
  ...props
}) => {
  // Base styles - Booking.com professional button
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lydian-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap';

  // Variant styles - Red theme
  const variantStyles = {
    primary: 'bg-lydian-primary text-white hover:bg-lydian-dark active:bg-lydian-dark shadow-sm hover:shadow-md',
    secondary: 'border-2 border-lydian-primary text-lydian-primary bg-white hover:bg-red-50 active:bg-red-100',
    ghost: 'text-lydian-primary hover:bg-red-50 active:bg-red-100',
    white: 'bg-white text-lydian-primary border border-neutral-200 hover:border-lydian-primary hover:shadow-sm',
    link: 'text-lydian-primary underline-offset-4 hover:underline px-0',
  };

  // Size styles - Booking.com standard sizes
  const sizeStyles = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-5 text-base',  // Default
    lg: 'h-12 px-6 text-base',
    xl: 'h-14 px-8 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};
