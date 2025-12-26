/**
 * LyDian Logo Component
 * Premium, modern animated logo with gradient effects
 * Supports 3 variants: full, compact, icon
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';

export type LogoVariant = 'full' | 'compact' | 'icon';

interface LyDianLogoProps {
  variant?: LogoVariant;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animated?: boolean;
  onClick?: () => void;
}

const sizeConfig = {
  sm: {
    icon: 'w-8 h-8',
    iconInner: 'w-4 h-4',
    text: 'text-lg',
    subtext: 'text-xs',
  },
  md: {
    icon: 'w-12 h-12',
    iconInner: 'w-6 h-6',
    text: 'text-2xl',
    subtext: 'text-sm',
  },
  lg: {
    icon: 'w-16 h-16',
    iconInner: 'w-8 h-8',
    text: 'text-3xl',
    subtext: 'text-base',
  },
  xl: {
    icon: 'w-20 h-20',
    iconInner: 'w-10 h-10',
    text: 'text-4xl',
    subtext: 'text-lg',
  },
};

export const LyDianLogo: React.FC<LyDianLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  animated = true,
  onClick,
}) => {
  const config = sizeConfig[size];

  // Icon Only Variant
  if (variant === 'icon') {
    return (
      <motion.div
        onClick={onClick}
        whileHover={animated ? { rotate: 360, scale: 1.1 } : undefined}
        transition={animated ? { duration: 0.6, type: 'spring' } : undefined}
        className={`relative ${config.icon} cursor-pointer ${className}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-red-600 rounded-xl shadow-lg" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-600 rounded-xl blur-md opacity-50" />
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            animate={
              animated
                ? {
                    y: [0, -3, 0],
                  }
                : undefined
            }
            transition={
              animated
                ? {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
                : undefined
            }
          >
            <Plane className={`${config.iconInner} text-white`} />
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Compact Variant (Logo + LyDian only)
  if (variant === 'compact') {
    return (
      <div
        onClick={onClick}
        className={`flex items-center gap-3 group cursor-pointer ${className}`}
      >
        {/* Icon */}
        <motion.div
          whileHover={animated ? { rotate: 360, scale: 1.1 } : undefined}
          transition={animated ? { duration: 0.6, type: 'spring' } : undefined}
          className={`relative ${config.icon} bg-gradient-to-br from-red-600 via-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all`}
        >
          <motion.div
            animate={
              animated
                ? {
                    y: [0, -3, 0],
                  }
                : undefined
            }
            transition={
              animated
                ? {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
                : undefined
            }
          >
            <Plane className={`${config.iconInner} text-white`} />
          </motion.div>
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-600 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity -z-10" />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={animated ? { opacity: 0, x: -10 } : undefined}
          animate={animated ? { opacity: 1, x: 0 } : undefined}
          transition={animated ? { delay: 0.2 } : undefined}
        >
          <span
            className={`${config.text} font-black bg-gradient-to-r from-red-600 to-red-600 bg-clip-text text-transparent`}
          >
            LyDian
          </span>
        </motion.div>
      </div>
    );
  }

  // Full Variant (Travel + LyDian with animations)
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 group cursor-pointer ${className}`}
    >
      {/* Icon */}
      <motion.div
        whileHover={animated ? { rotate: 360, scale: 1.1 } : undefined}
        transition={animated ? { duration: 0.6, type: 'spring' } : undefined}
        className={`relative ${config.icon} bg-gradient-to-br from-red-600 via-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all`}
      >
        <motion.div
          animate={
            animated
              ? {
                  y: [0, -3, 0],
                }
              : undefined
          }
          transition={
            animated
              ? {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
              : undefined
          }
        >
          <Plane className={`${config.iconInner} text-white`} />
        </motion.div>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-600 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity -z-10" />
      </motion.div>

      {/* Text Stack */}
      <div className="flex flex-col -space-y-1">
        {/* "Travel" text */}
        <motion.div
          initial={animated ? { opacity: 0, x: -10 } : undefined}
          animate={animated ? { opacity: 1, x: 0 } : undefined}
          transition={animated ? { delay: 0.1 } : undefined}
          className="flex items-baseline"
        >
          <span
            className={`${config.text} font-black bg-gradient-to-r from-red-600 to-red-600 bg-clip-text text-transparent`}
          >
            Travel
          </span>
        </motion.div>

        {/* "LyDian" text */}
        <motion.div
          initial={animated ? { opacity: 0, x: -10 } : undefined}
          animate={animated ? { opacity: 1, x: 0 } : undefined}
          transition={animated ? { delay: 0.2 } : undefined}
          className="flex items-baseline"
        >
          <span className={`${config.subtext} font-bold text-gray-700 dark:text-gray-300`}>
            LyDian
          </span>
        </motion.div>
      </div>
    </div>
  );
};

// Preset exports for common use cases
export const LyDianLogoFull: React.FC<Omit<LyDianLogoProps, 'variant'>> = (props) => (
  <LyDianLogo {...props} variant="full" />
);

export const LyDianLogoCompact: React.FC<Omit<LyDianLogoProps, 'variant'>> = (props) => (
  <LyDianLogo {...props} variant="compact" />
);

export const LyDianLogoIcon: React.FC<Omit<LyDianLogoProps, 'variant'>> = (props) => (
  <LyDianLogo {...props} variant="icon" />
);

export default LyDianLogo;
