/**
 * 🔘 FUTURISTIC BUTTON 2025
 * Gradient + Glow + Spring Physics + Shimmer Loading
 * Apple Vision Pro Button Aesthetics
 *
 * @deprecated This component is deprecated. Use Button from @/components/ui instead.
 * Migration: <FuturisticButton variant="ai" glow /> → <Button variant="ai" effect="glow" />
 * See BUTTON_MIGRATION_GUIDE.md for details.
 */

import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export interface FuturisticButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'ai' | 'primary' | 'secondary' | 'success' | 'glass' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  glow?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const GRADIENT_VARIANTS = {
  ai: 'bg-gradient-to-r from-[#667EEA] via-[#764BA2] to-[#667EEA]',
  primary: 'bg-gradient-to-r from-[#00BAFF] to-[#667EEA]',
  secondary: 'bg-gradient-to-r from-[#FF9500] to-[#FF6B00]',
  success: 'bg-gradient-to-r from-[var(--lydian-success)] to-[var(--lydian-success-hover)]',
  glass: 'bg-lydian-bg/10 backdrop-blur-xl border-2 border-white/30',
  outline: 'bg-transparent border-2 border-[#667EEA]'
};

const GLOW_COLORS = {
  ai: 'rgba(102, 126, 234, 0.6)',
  primary: 'rgba(0, 186, 255, 0.6)',
  secondary: 'rgba(255, 149, 0, 0.6)',
  success: 'rgba(16, 185, 129, 0.6)',
  glass: 'rgba(255, 255, 255, 0.3)',
  outline: 'rgba(102, 126, 234, 0.4)'
};

const SIZE_CLASSES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl'
};

export const FuturisticButton: React.FC<FuturisticButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  loading = false,
  glow = true,
  className = '',
  type = 'button'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const gradientClass = GRADIENT_VARIANTS[variant];
  const glowColor = GLOW_COLORS[variant];
  const sizeClass = SIZE_CLASSES[size];

  return (
    <motion.button
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setIsHovered(true)}
      disabled={disabled || loading}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      }}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`
        relative group
        ${gradientClass}
        ${sizeClass}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        font-bold rounded-2xl
        text-white
        overflow-hidden
        transition-all duration-300
        ${className}
      `}>

      {/* Shimmer Effect for Loading */}
      {loading &&
      <motion.div
        animate={{
          x: ['-100%', '200%']
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear'
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      }

      {/* Glow Effect */}
      {glow && isHovered && !disabled &&
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1.2 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 -z-10 blur-2xl"
        style={{
          background: `radial-gradient(circle at center, ${glowColor}, transparent)`
        }} />

      }

      {/* Animated Border Glow */}
      {isHovered && !disabled && variant !== 'glass' &&
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: [
          `0 0 20px ${glowColor}`,
          `0 0 40px ${glowColor}`,
          `0 0 20px ${glowColor}`]

        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }} />

      }

      {/* Content */}
      <div className="relative flex items-center justify-center gap-2" style={{ transform: 'translateZ(20px)' }}>
        {loading ?
        <Loader2 className="w-5 h-5 animate-spin" /> :

        <>
            {icon && iconPosition === 'left' && <span>{icon}</span>}
            <span>{children}</span>
            {icon && iconPosition === 'right' && <span>{icon}</span>}
          </>
        }
      </div>

      {/* Gradient Overlay on Hover (for glass/outline) */}
      {(variant === 'glass' || variant === 'outline') && isHovered &&
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-r from-[#00BAFF]/20 to-[#667EEA]/20 rounded-2xl" />

      }
    </motion.button>);

};

// Default export
export default FuturisticButton;