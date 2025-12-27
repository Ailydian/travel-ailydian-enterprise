/**
 * 🎬 NEO-GLASS HERO
 * Full-screen hero with parallax, glassmorphism, and 3D effects
 * Ocean gradient background with floating elements
 */

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { fadeInUp, floatingAnimation } from '@/utils/animations';

export interface NeoHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
  video?: string;
  gradient?: 'ocean' | 'sunset' | 'twilight' | 'aurora';
  height?: string;
  overlayOpacity?: number;
  children?: React.ReactNode;
  showFloatingElements?: boolean;
}

export const NeoHero: React.FC<NeoHeroProps> = ({
  title,
  subtitle,
  image,
  video,
  gradient = 'ocean',
  height = '90vh',
  overlayOpacity = 0.4,
  children,
  showFloatingElements = true,
}) => {
  const { scrollY } = useScroll();

  // Parallax effect
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Gradient backgrounds
  const gradients = {
    ocean: 'linear-gradient(135deg, #00BAFF 0%, #0088BD 50%, #005580 100%)',
    sunset: 'linear-gradient(135deg, #FF9500 0%, #FF6B00 50%, #E05200 100%)',
    twilight: 'linear-gradient(135deg, #667EEA 0%, #764BA2 50%, #5A3472 100%)',
    aurora: 'linear-gradient(135deg, #00BAFF 0%, #667EEA 33%, #764BA2 66%, #FF9500 100%)',
  };

  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ minHeight: height }}
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        {/* Image or Video Background */}
        {image && !video && (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
            quality={90}
          />
        )}

        {video && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={video} type="video/mp4" />
          </video>
        )}

        {/* Gradient Overlay */}
        {!image && !video && (
          <div
            className="absolute inset-0"
            style={{ background: gradients[gradient] }}
          />
        )}

        {/* Dark overlay for readability */}
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />

        {/* Animated gradient mesh */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(0, 186, 255, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255, 149, 0, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 20%, rgba(102, 126, 234, 0.3) 0%, transparent 50%)
            `,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Floating elements (orbs) */}
      {showFloatingElements && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-[#00BAFF]/20 to-[#0088BD]/20 backdrop-blur-3xl"
            variants={floatingAnimation}
            animate="animate"
            style={{ filter: 'blur(40px)' }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-[#FF9500]/20 to-[#FF6B00]/20 backdrop-blur-3xl"
            variants={floatingAnimation}
            animate="animate"
            transition={{ delay: 1, duration: 4, repeat: Infinity }}
            style={{ filter: 'blur(60px)' }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full bg-gradient-to-br from-[#667EEA]/20 to-[#764BA2]/20 backdrop-blur-3xl"
            variants={floatingAnimation}
            animate="animate"
            transition={{ delay: 2, duration: 5, repeat: Infinity }}
            style={{ filter: 'blur(50px)' }}
          />
        </>
      )}

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ opacity }}
      >
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Title with glassmorphism background */}
          <motion.div
            className="inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Glow effect behind text */}
              <div
                className="absolute -inset-4 bg-gradient-to-r from-[#00BAFF] via-[#667EEA] to-[#FF9500] rounded-3xl blur-2xl opacity-30"
              />

              <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tight">
                {title}
              </h1>
            </div>
          </motion.div>

          {/* Subtitle with glass card */}
          {subtitle && (
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)]">
                <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed">
                  {subtitle}
                </p>
              </div>
            </motion.div>
          )}

          {/* CTA Buttons */}
          {children && (
            <motion.div
              className="flex flex-wrap items-center justify-center gap-4 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default NeoHero;
