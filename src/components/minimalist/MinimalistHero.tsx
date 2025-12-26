/**
 * 🎨 MINIMALIST HERO COMPONENT
 * Option5.studio inspired full-width hero
 * Clean, content-focused, timeless design
 */

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { minimalistAnimations } from '@/utils/minimalistAnimations';

export interface MinimalistHeroProps {
  title: string;
  subtitle?: string;
  image: string;
  height?: '60vh' | '70vh' | '80vh' | '90vh';
  overlayOpacity?: number;
  children?: React.ReactNode;
}

export const MinimalistHero: React.FC<MinimalistHeroProps> = ({
  title,
  subtitle,
  image,
  height = '70vh',
  overlayOpacity = 0.3,
  children
}) => {
  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ minHeight: height }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
          quality={85}
        />
        {/* Dark overlay for text readability */}
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={minimalistAnimations.fadeInUp.initial}
          animate={minimalistAnimations.fadeInUp.animate}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-6">
            {title}
          </h1>

          {subtitle && (
            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-white/90 font-light leading-relaxed"
              initial={minimalistAnimations.textReveal.initial}
              animate={minimalistAnimations.textReveal.animate}
            >
              {subtitle}
            </motion.p>
          )}

          {children && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
