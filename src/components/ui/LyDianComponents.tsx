import React, { ReactNode, HTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

// Base interface for LyDian components
interface LyDianBaseProps {
  className?: string;
  children?: ReactNode;
}

// ===== NEON TEXT COMPONENT =====
interface NeonTextProps extends LyDianBaseProps {
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
    pulse: 'lydian-neon-text',
    flicker: 'lydian-neon-text-flicker',
    static: 'text-lydian-text',
  };
  const colorClasses = {
    primary: 'text-lydian-primary',
    secondary: 'text-purple-500',
    white: 'text-lydian-text',
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