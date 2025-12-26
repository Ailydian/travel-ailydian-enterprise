/**
 * 🔘 NEO-GLASS BUTTON
 * Neomorphism + Glassmorphism Hybrid Button
 * 3D depth with glass blur effects
 */

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { neoPressAnimation } from '@/utils/animations';

export interface NeoButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'glass' | 'neo' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const NeoButton: React.FC<NeoButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  // Size classes
  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-6 py-3 text-base rounded-2xl',
    lg: 'px-8 py-4 text-lg rounded-2xl',
    xl: 'px-10 py-5 text-xl rounded-3xl',
  };

  // Variant styles
  const variants = {
    primary: `
      bg-gradient-to-br from-[#00BAFF] to-[#0088BD]
      text-white font-semibold
      shadow-[0_10px_30px_-5px_rgba(0,186,255,0.3)]
      hover:shadow-[0_15px_40px_-5px_rgba(0,186,255,0.4)]
    `,
    secondary: `
      bg-gradient-to-br from-[#FF9500] to-[#FF6B00]
      text-white font-semibold
      shadow-[0_10px_30px_-5px_rgba(255,149,0,0.3)]
      hover:shadow-[0_15px_40px_-5px_rgba(255,149,0,0.4)]
    `,
    glass: `
      bg-white/10 backdrop-blur-xl
      border border-white/20
      text-gray-900 font-medium
      shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]
      hover:bg-white/20
    `,
    neo: `
      bg-[#F1F5F9]
      text-gray-900 font-semibold
      shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.7)]
      hover:shadow-[12px_12px_24px_rgba(0,0,0,0.15),-12px_-12px_24px_rgba(255,255,255,0.8)]
    `,
    gradient: `
      bg-gradient-to-r from-[#00BAFF] via-[#667EEA] to-[#FF9500]
      bg-[length:200%_100%]
      text-white font-bold
      shadow-[0_10px_30px_-5px_rgba(0,186,255,0.4)]
      hover:bg-[position:100%_0]
      animate-gradient
    `,
  };

  const baseClasses = `
    relative overflow-hidden
    transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-[0.98]
    ${fullWidth ? 'w-full' : 'w-auto'}
    ${sizes[size]}
    ${variants[variant]}
    ${className}
  `;

  return (
    <motion.button
      className={baseClasses}
      disabled={disabled || loading}
      initial="rest"
      whileHover={!disabled && !loading ? 'hover' : 'rest'}
      whileTap={!disabled && !loading ? 'tap' : 'rest'}
      variants={variant === 'neo' ? neoPressAnimation : {
        rest: { scale: 1 },
        hover: { scale: 1.02, y: -2 },
        tap: { scale: 0.98 },
      }}
      {...props}
    >
      {/* Gradient overlay animation */}
      {variant === 'gradient' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && icon && iconPosition === 'left' && icon}
        {children}
        {!loading && icon && iconPosition === 'right' && icon}
      </span>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
    </motion.button>
  );
};

export default NeoButton;
