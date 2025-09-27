import React, { ReactNode, HTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

// Base interface for Ailydian components
interface AilydianBaseProps {
  className?: string;
  children?: ReactNode;
}

// ===== NEON TEXT COMPONENT =====
interface NeonTextProps extends AilydianBaseProps {
  variant?: 'pulse' | 'flicker' | 'static';
  color?: 'primary' | 'secondary' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

export const NeonText: React.FC<NeonTextProps> = ({
  children,
  variant = 'static',
  color = 'primary',
  size = 'md',
  as: Component = 'span',
  className = '',
  ...props
}) => {
  const baseClasses = 'font-bold';
  const variantClasses = {
    pulse: 'ailydian-neon-text',
    flicker: 'ailydian-neon-text-flicker',
    static: 'text-ailydian-text',
  };
  const colorClasses = {
    primary: 'text-ailydian-primary',
    secondary: 'text-ailydian-secondary',
    white: 'text-ailydian-text',
  };
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    colorClasses[color],
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default {
  NeonText,
};