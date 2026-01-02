/**
 * Input Component - Production-Grade Text Input
 * Features: Validation states, accessibility, type-safe variants
 */

import React, { forwardRef, InputHTMLAttributes } from 'react';
import { colors, spacing, typography } from '@/styles/design-system';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input label */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Helper text below input */
  helperText?: string;
  /** Visual size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Validation state */
  state?: 'default' | 'success' | 'warning' | 'error';
  /** Left icon component */
  leftIcon?: React.ReactNode;
  /** Right icon component */
  rightIcon?: React.ReactNode;
  /** Full width */
  fullWidth?: boolean;
  /** Required field indicator */
  required?: boolean;
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg',
} as const;

const stateStyles = {
  default: 'border-white/30 focus:border-blue-500 focus:ring-lydian-primary',
  success: 'border-green-500 focus:border-green-600 focus:ring-green-500',
  warning: 'border-yellow-500 focus:border-yellow-600 focus:ring-yellow-500',
  error: 'border-red-500 focus:border-red-600 focus:ring-red-500',
} as const;

const stateTextColors = {
  default: 'text-lydian-text-secondary',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  error: 'text-lydian-error',
} as const;

/**
 * Input Component
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email Address"
 *   type="email"
 *   placeholder="you@example.com"
 *   error={errors.email}
 *   required
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      size = 'md',
      state = 'default',
      leftIcon,
      rightIcon,
      fullWidth = false,
      required = false,
      className = '',
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const effectiveState = error ? 'error' : state;
    const displayText = error || helperText;

    return (
      <div className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-lydian-text-secondary flex items-center gap-1"
          >
            {label}
            {required && (
              <span className="text-purple-500" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 pointer-events-none text-gray-300">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={effectiveState === 'error'}
            aria-describedby={displayText ? `${inputId}-description` : undefined}
            className={`
              w-full rounded-lg border transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-opacity-50
              disabled:bg-lydian-bg-surface-raised disabled:cursor-not-allowed disabled:text-gray-300
              ${sizeStyles[size]}
              ${stateStyles[effectiveState]}
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
              ${className}
            `}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 pointer-events-none text-gray-300">
              {rightIcon}
            </div>
          )}
        </div>

        {displayText && (
          <p
            id={`${inputId}-description`}
            className={`text-xs ${stateTextColors[effectiveState]}`}
            role={error ? 'alert' : 'status'}
          >
            {displayText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
