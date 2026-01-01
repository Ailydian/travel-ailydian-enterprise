/**
 * 🔘 MINIMALIST BUTTON COMPONENT
 * Option5.studio inspired buttons
 * Clean, purposeful, accessible
 *
 * @deprecated This component is deprecated. Use Button from @/components/ui instead.
 * Migration: <MinimalistButton variant="primary" /> → <Button variant="primary" />
 * See BUTTON_MIGRATION_GUIDE.md for details.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { hoverAnimations } from '@/utils/minimalistAnimations';

export interface MinimalistButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const MinimalistButton: React.FC<MinimalistButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  type = 'button',
  disabled = false
}) => {
  // Size classes
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  // Variant classes
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-transparent border border-black text-white hover:bg-black hover:text-white',
    ghost: 'bg-transparent text-white hover:opacity-70'
  };

  const baseClasses = 'font-normal transition-all duration-300 rounded-sm';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizes[size]} ${variants[variant]} ${disabledClasses} ${className}`}
      {...(disabled ? {} : hoverAnimations.buttonHover)}
    >
      {children}
    </motion.button>
  );
};
