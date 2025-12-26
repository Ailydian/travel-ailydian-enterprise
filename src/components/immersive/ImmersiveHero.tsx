import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { immersiveAnimations } from '@/utils/immersiveAnimations';
import { GradientBackground } from './GradientBackground';

export interface ImmersiveHeroProps {
  gradient?: 'ocean' | 'sunset' | 'adventure' | 'twilight' | 'aurora';
  videoUrl?: string;
  title: string;
  subtitle?: string;
  searchComponent?: React.ReactNode;
  particlesEnabled?: boolean;
  minHeight?: string;
}

/**
 * 🚀 IMMERSIVE HERO COMPONENT
 * Full-screen hero section with glassmorphic elements and smooth animations
 * Creates an award-winning first impression
 */
export const ImmersiveHero: React.FC<ImmersiveHeroProps> = ({
  gradient = 'ocean',
  videoUrl,
  title,
  subtitle,
  searchComponent,
  minHeight = '100vh'
}) => {
  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight }}>
      {/* Background Layer - z-0 */}
      <GradientBackground type={gradient} animated={true} className="absolute inset-0">
        {/* Optional Video Background */}
        {videoUrl && (
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&q=90&fit=crop"
              alt="Travel Background"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </GradientBackground>

      {/* Animated Overlay Patterns */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Floating circles */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(86, 204, 242, 0.1) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 159, 217, 0.15) 0%, transparent 70%)',
            filter: 'blur(50px)'
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(46, 95, 143, 0.12) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -50, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
        />
      </div>

      {/* Content Layer - z-10 */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8" style={{ minHeight }}>
        <div className="max-w-7xl w-full mx-auto text-center">
          {/* Hero Title with Glow Effect */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight"
            style={{
              letterSpacing: '0.03em',
              lineHeight: 1.1
            }}
            {...immersiveAnimations.heroTitle}
            {...immersiveAnimations.glow}
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-12 max-w-3xl mx-auto font-light"
              style={{
                letterSpacing: '0.02em',
                textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Glassmorphic Search Box */}
          {searchComponent && (
            <motion.div
              className="max-w-4xl mx-auto"
              {...immersiveAnimations.searchBox}
            >
              <div
                className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl"
                style={{
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 60px rgba(86, 204, 242, 0.2)'
                }}
              >
                {searchComponent}
              </div>
            </motion.div>
          )}

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <motion.div
              className="flex flex-col items-center cursor-pointer group"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-white/70 text-sm mb-2 group-hover:text-white/90 transition-colors">
                Scroll to explore
              </span>
              <div className="w-8 h-12 border-2 border-white/30 rounded-full flex items-start justify-center p-2 group-hover:border-white/50 transition-colors">
                <motion.div
                  className="w-1.5 h-1.5 bg-white/70 rounded-full group-hover:bg-white/90"
                  animate={{ y: [0, 16, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-5"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(10, 24, 40, 0.6))'
        }}
      />
    </div>
  );
};
