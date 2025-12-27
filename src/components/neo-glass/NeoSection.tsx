/**
 * 📦 NEO-GLASS SECTION
 * Reusable section wrapper with animations and backgrounds
 */

import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/utils/animations';

export interface NeoSectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  background?: 'white' | 'gray' | 'gradient' | 'glass' | 'neo';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  id?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  animate?: boolean;
}

export const NeoSection: React.FC<NeoSectionProps> = ({
  children,
  title,
  subtitle,
  background = 'white',
  padding = 'lg',
  className = '',
  id,
  containerSize = 'xl',
  animate = true
}) => {
  // Background styles - DARK THEME
  const backgrounds = {
    white: 'bg-transparent', // Transparent to show body gradient
    gray: 'bg-white/5', // Subtle glassmorphism
    gradient: 'bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20',
    glass: 'bg-white/5 backdrop-blur-2xl border-y border-white/10',
    neo: 'bg-white/5'
  };

  // Padding styles
  const paddings = {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-24',
    lg: 'py-20 md:py-32',
    xl: 'py-24 md:py-40'
  };

  // Container sizes
  const containerSizes = {
    sm: 'max-w-4xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  };

  const SectionContent = () =>
  <>
      {/* Section Header */}
      {(title || subtitle) &&
    <motion.div
      className="text-center mb-16 md:mb-20 space-y-4"
      variants={animate ? fadeInUp : undefined}
      initial={animate ? 'hidden' : undefined}
      whileInView={animate ? 'visible' : undefined}
      viewport={{ once: true, margin: '-100px' }}>

          {title &&
      <div className="relative inline-block">
              {/* Glowing underline decoration */}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#00BAFF] via-[#667EEA] to-[#FF9500] rounded-full opacity-70 shadow-[0_0_20px_rgba(102,126,234,0.5)]" />

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-lydian-text-inverse leading-tight tracking-tight drop-shadow-[0_0_30px_rgba(102,126,234,0.3)]">
                {title}
              </h2>
            </div>
      }

          {subtitle &&
      <p className="text-lg md:text-xl lg:text-2xl text-lydian-text-dim max-w-3xl mx-auto leading-relaxed font-light">
              {subtitle}
            </p>
      }
        </motion.div>
    }

      {/* Section Content */}
      {children}
    </>;


  return (
    <section
      id={id}
      className={`
        relative w-full overflow-hidden
        ${backgrounds[background]}
        ${paddings[padding]}
        ${className}
      `}>

      <div className={`${containerSizes[containerSize]} mx-auto px-4 sm:px-6 lg:px-8`}>
        {animate ?
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}>

            <SectionContent />
          </motion.div> :

        <SectionContent />
        }
      </div>

      {/* Decorative elements for certain backgrounds */}
      {background === 'gradient' &&
      <>
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#00BAFF]/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#FF9500]/10 to-transparent rounded-full blur-3xl" />
        </>
      }
    </section>);

};

export default NeoSection;