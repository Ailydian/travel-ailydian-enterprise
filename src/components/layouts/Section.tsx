/**
 * UNIFIED SECTION COMPONENT
 * Provides consistent spacing and backgrounds for page sections
 */

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  background?: 'light' | 'dark' | 'gradient' | 'neo' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  containerized?: boolean;
  id?: string;
  animate?: boolean;
}

const backgroundClasses = {
  light: 'bg-lydian-bg',
  dark: 'bg-gradient-to-br from-gray-900 via-[#1a1a2e] to-gray-900',
  gradient: 'bg-gradient-to-br from-[#00BAFF]/10 via-[#667EEA]/10 to-[#FF9500]/10',
  neo: 'bg-gradient-to-br from-gray-50 via-white to-gray-50',
  glass: 'bg-gradient-to-br from-slate-900 via-black to-slate-800 backdrop-blur-3xl',
};

const paddingClasses = {
  none: '',
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16',
  xl: 'py-20 md:py-24',
};

export const Section: React.FC<SectionProps> = ({
  children,
  title,
  subtitle,
  background = 'light',
  padding = 'lg',
  className = '',
  containerized = true,
  id,
  animate = true,
}) => {
  const content = (
    <>
      {(title || subtitle) && (
        <motion.div
          initial={animate ? { opacity: 0, y: 20 } : {}}
          whileInView={animate ? { opacity: 1, y: 0 } : {}}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          {title && (
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black mb-4 ${
              background === 'dark' || background === 'glass'
                ? 'text-white'
                : 'text-lydian-text'
            }`}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
              background === 'dark' || background === 'glass'
                ? 'text-gray-400'
                : 'text-lydian-text-secondary'
            }`}>
              {subtitle}
            </p>
          )}
        </motion.div>
      )}
      {children}
    </>
  );

  return (
    <section
      id={id}
      className={`${backgroundClasses[background]} ${paddingClasses[padding]} ${className} relative overflow-hidden`}
    >
      {/* Background gradient overlay for dark/glass themes */}
      {(background === 'dark' || background === 'glass') && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#00BAFF]/10 via-[#667EEA]/10 to-[#FF9500]/10 opacity-30" />
      )}

      <div className={containerized ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10' : 'relative z-10'}>
        {content}
      </div>
    </section>
  );
};

export default Section;
