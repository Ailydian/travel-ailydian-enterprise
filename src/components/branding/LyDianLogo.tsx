/**
 * 🚀 FUTURISTIC LYDIAN LOGO 2025
 * Apple Vision Pro Spatial Design + Glassmorphism
 * Features: Dark Purple Gradients, Aurora Glow, 3D Depth, Floating Animation
 */

import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';

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
    subtext: 'text-xs'
  },
  md: {
    icon: 'w-12 h-12',
    iconInner: 'w-5 h-5',
    text: 'text-2xl',
    subtext: 'text-sm'
  },
  lg: {
    icon: 'w-16 h-16',
    iconInner: 'w-7 h-7',
    text: 'text-3xl',
    subtext: 'text-base'
  },
  xl: {
    icon: 'w-20 h-20',
    iconInner: 'w-9 h-9',
    text: 'text-4xl',
    subtext: 'text-lg'
  }
};

export const LyDianLogo: React.FC<LyDianLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  animated = true,
  onClick
}) => {
  const config = sizeConfig[size];

  // Icon Only Variant - Futuristic Glassmorphism
  if (variant === 'icon') {
    return (
      <motion.div
        onClick={onClick}
        whileHover={animated ? { scale: 1.15, rotateY: 180 } : undefined}
        transition={animated ? { duration: 0.7, type: 'spring', stiffness: 200 } : undefined}
        className={`relative ${config.icon} cursor-pointer ${className}`}
        style={{ transformStyle: 'preserve-3d' }}>

        {/* Glassmorphism Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#667EEA] via-[#764BA2] to-[#667EEA] rounded-2xl shadow-2xl" />

        {/* Aurora Glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl blur-xl opacity-60"
          style={{ background: 'radial-gradient(circle at center, #667EEA80, #764BA280)' }}
          animate={animated ? {
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6]
          } : undefined}
          transition={animated ? {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          } : undefined} />


        {/* Icon Container */}
        <div className="relative w-full h-full flex items-center justify-center backdrop-blur-sm rounded-2xl border border-white/20">
          <motion.div
            animate={animated ? {
              y: [0, -4, 0],
              rotateZ: [0, 5, 0, -5, 0]
            } : undefined}
            transition={animated ? {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            } : undefined}>

            <Sparkles className={`${config.iconInner} text-white drop-shadow-lg`} />
          </motion.div>

          {/* Shimmer Effect */}
          {animated &&
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
            }}
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'linear'
            }} />

          }
        </div>
      </motion.div>);

  }

  // Compact Variant (Logo + LyDian only) - Futuristic
  if (variant === 'compact') {
    return (
      <div
        onClick={onClick}
        className={`flex items-center gap-3 group cursor-pointer ${className}`}>

        {/* Futuristic Icon */}
        <motion.div
          whileHover={animated ? { scale: 1.15, rotateY: 180 } : undefined}
          transition={animated ? { duration: 0.7, type: 'spring', stiffness: 200 } : undefined}
          className={`relative ${config.icon}`}
          style={{ transformStyle: 'preserve-3d' }}>

          {/* Glassmorphism Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#667EEA] via-[#764BA2] to-[#667EEA] rounded-2xl shadow-2xl" />

          {/* Aurora Glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"
            style={{ background: 'radial-gradient(circle at center, #667EEA80, #764BA280)' }} />


          {/* Icon */}
          <div className="relative w-full h-full flex items-center justify-center backdrop-blur-sm rounded-2xl border border-white/20">
            <motion.div
              animate={animated ? {
                y: [0, -4, 0],
                rotateZ: [0, 5, 0, -5, 0]
              } : undefined}
              transition={animated ? {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              } : undefined}>

              <Sparkles className={`${config.iconInner} text-white drop-shadow-lg`} />
            </motion.div>
          </div>
        </motion.div>

        {/* Text with Futuristic Gradient */}
        <motion.div
          initial={animated ? { opacity: 0, x: -10 } : undefined}
          animate={animated ? { opacity: 1, x: 0 } : undefined}
          transition={animated ? { delay: 0.2 } : undefined}>

          <span
            className={`${config.text} font-black bg-gradient-to-r from-[#667EEA] via-[#764BA2] to-[#00BAFF] bg-clip-text text-transparent drop-shadow-sm`}>

            LyDian
          </span>
        </motion.div>
      </div>);

  }

  // Full Variant (Travel + LyDian with animations) - Futuristic
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 group cursor-pointer ${className}`}>

      {/* Futuristic Icon */}
      <motion.div
        whileHover={animated ? { scale: 1.15, rotateY: 180 } : undefined}
        transition={animated ? { duration: 0.7, type: 'spring', stiffness: 200 } : undefined}
        className={`relative ${config.icon}`}
        style={{ transformStyle: 'preserve-3d' }}>

        {/* Glassmorphism Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#667EEA] via-[#764BA2] to-[#667EEA] rounded-2xl shadow-2xl" />

        {/* Aurora Glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"
          style={{ background: 'radial-gradient(circle at center, #667EEA80, #764BA280)' }}
          animate={animated ? {
            scale: [1, 1.15, 1],
            opacity: [0.6, 0.8, 0.6]
          } : undefined}
          transition={animated ? {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          } : undefined} />


        {/* Icon */}
        <div className="relative w-full h-full flex items-center justify-center backdrop-blur-sm rounded-2xl border border-white/20">
          <motion.div
            animate={animated ? {
              y: [0, -4, 0],
              rotateZ: [0, 5, 0, -5, 0]
            } : undefined}
            transition={animated ? {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            } : undefined}>

            <Sparkles className={`${config.iconInner} text-white drop-shadow-lg`} />
          </motion.div>

          {/* Shimmer Effect */}
          {animated &&
          <motion.div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
            }}
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'linear'
            }} />

          }
        </div>
      </motion.div>

      {/* Text Stack with Futuristic Gradients */}
      <div className="flex flex-col -space-y-1">
        {/* "Travel" text */}
        <motion.div
          initial={animated ? { opacity: 0, x: -10 } : undefined}
          animate={animated ? { opacity: 1, x: 0 } : undefined}
          transition={animated ? { delay: 0.1 } : undefined}
          className="flex items-baseline">

          <span
            className={`${config.text} font-black bg-gradient-to-r from-[#667EEA] via-[#764BA2] to-[#00BAFF] bg-clip-text text-transparent drop-shadow-sm`}>

            Travel
          </span>
        </motion.div>

        {/* "LyDian" text */}
        <motion.div
          initial={animated ? { opacity: 0, x: -10 } : undefined}
          animate={animated ? { opacity: 1, x: 0 } : undefined}
          transition={animated ? { delay: 0.2 } : undefined}
          className="flex items-baseline">

          <span className={`${config.subtext} font-bold bg-gradient-to-r from-[#00BAFF] to-[#10B981] bg-clip-text text-transparent`}>
            LyDian
          </span>
        </motion.div>
      </div>
    </div>);

};

// Preset exports for common use cases
export const LyDianLogoFull: React.FC<Omit<LyDianLogoProps, 'variant'>> = (props) =>
<LyDianLogo {...props} variant="full" />;


export const LyDianLogoCompact: React.FC<Omit<LyDianLogoProps, 'variant'>> = (props) =>
<LyDianLogo {...props} variant="compact" />;


export const LyDianLogoIcon: React.FC<Omit<LyDianLogoProps, 'variant'>> = (props) =>
<LyDianLogo {...props} variant="icon" />;


export default LyDianLogo;