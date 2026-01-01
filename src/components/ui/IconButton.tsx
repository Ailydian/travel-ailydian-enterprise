/**
 * IconButton Component - Specialized Button for Icon-Only Usage
 * A convenience wrapper around the unified Button component
 *
 * Features:
 * - Automatic icon-only mode
 * - Circular or rounded square shapes
 * - Tooltip support
 * - All Button features available
 */

import React, { forwardRef } from 'react';
import { Button, ButtonProps } from './button';

export interface IconButtonProps extends Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'iconOnly' | 'children'> {
  /** Icon to display */
  icon: React.ReactNode;
  /** Accessible label for screen readers */
  'aria-label': string;
  /** Shape of the button */
  shape?: 'circle' | 'rounded';
  /** Tooltip text (optional) */
  tooltip?: string;
}

/**
 * IconButton Component
 *
 * @example
 * ```tsx
 * <IconButton
 *   icon={<HeartIcon />}
 *   aria-label="Add to favorites"
 *   variant="ghost"
 *   size="sm"
 * />
 *
 * <IconButton
 *   icon={<ShareIcon />}
 *   aria-label="Share"
 *   variant="primary"
 *   shape="circle"
 *   tooltip="Share this content"
 * />
 * ```
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      'aria-label': ariaLabel,
      shape = 'rounded',
      tooltip,
      className = '',
      ...props
    },
    ref
  ) => {
    const shapeClass = shape === 'circle' ? 'rounded-full' : '';

    return (
      <Button
        ref={ref}
        iconOnly
        leftIcon={icon}
        aria-label={ariaLabel}
        title={tooltip || ariaLabel}
        className={`${shapeClass} ${className}`}
        {...props}
      />
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
