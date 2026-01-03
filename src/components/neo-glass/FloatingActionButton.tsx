/**
 * 🎯 Floating Action Button - Extracted Component
 * Optimized for mobile performance
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

export interface FloatingActionButtonProps {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  onClick?: (e: React.MouseEvent) => void;
  active?: boolean;
  color: string;
  tooltip?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon: Icon,
  onClick,
  active = false,
  color,
  tooltip
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.(e);
  }, [onClick]);

  const handleHoverStart = useCallback(() => {
    if (!isMobile) setShowTooltip(true);
  }, [isMobile]);

  const handleHoverEnd = useCallback(() => {
    setShowTooltip(false);
  }, []);

  return (
    <div className="relative">
      <motion.button
        onClick={handleClick}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        whileHover={!isMobile ? { scale: 1.15, y: -5 } : undefined}
        whileTap={{ scale: 0.9 }}
        className={`
          w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl sm:rounded-2xl backdrop-blur-xl border-2 flex items-center justify-center shadow-lg
          transition-all duration-300
          ${active
            ? 'bg-gradient-to-br border-white/40'
            : 'bg-lydian-bg/20 border-white/40 hover:bg-lydian-bg/30'
          }
        `}
        style={{
          backgroundColor: active ? `${color}40` : undefined
        }}
      >
        <Icon
          className={`w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 ${active ? 'fill-current' : ''}`}
          style={{ color: active ? color : '#fff' }}
        />

        {/* Pulsing Ring Effect */}
        {active && (
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute inset-0 rounded-2xl border-2"
            style={{ borderColor: color }}
          />
        )}
      </motion.button>

      {/* Tooltip */}
      {showTooltip && tooltip && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full mb-2 right-0 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap shadow-xl"
        >
          {tooltip}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </motion.div>
      )}
    </div>
  );
};

export default FloatingActionButton;
