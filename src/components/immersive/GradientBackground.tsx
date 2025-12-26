import React from 'react';
import { motion } from 'framer-motion';
import { immersiveGradients } from '@/utils/immersiveAnimations';

export interface GradientBackgroundProps {
  type?: 'ocean' | 'sunset' | 'adventure' | 'twilight' | 'aurora';
  animated?: boolean;
  opacity?: number;
  children?: React.ReactNode;
  overlay?: boolean;
  className?: string;
}

/**
 * 🌊 GRADIENT BACKGROUND COMPONENT
 * Creates stunning, animated gradient backgrounds
 * Perfect for immersive hero sections
 */
export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  type = 'ocean',
  animated = true,
  opacity = 1,
  children,
  overlay = true,
  className = ''
}) => {
  const gradient = immersiveGradients[type];

  return (
    <div className={`relative w-full ${className}`}>
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: gradient,
          opacity
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity,
          backgroundPosition: animated ? ['0% 0%', '100% 100%'] : '0% 0%'
        }}
        transition={{
          opacity: { duration: 0.8 },
          backgroundPosition: animated
            ? {
                duration: 20,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'linear'
              }
            : {}
        }}
      />

      {/* Optional Dark Overlay */}
      {overlay && (
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.3) 100%)'
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
