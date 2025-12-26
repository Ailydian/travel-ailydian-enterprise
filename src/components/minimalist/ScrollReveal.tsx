/**
 * 🎬 SCROLL REVEAL COMPONENT
 * Option5.studio inspired scroll-triggered animations
 * Performance-conscious, auto-disabled on mobile
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { minimalistAnimations, shouldAnimate } from '@/utils/minimalistAnimations';

export interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fadeInUp' | 'fadeIn' | 'scaleIn' | 'textReveal' | 'imageReveal';
  delay?: number;
  threshold?: number;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  threshold = 0.1,
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationsEnabled] = useState(shouldAnimate());

  useEffect(() => {
    // If animations disabled, show immediately
    if (!animationsEnabled) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, animationsEnabled]);

  // Get animation config
  const animationConfig = minimalistAnimations[animation];

  // If animations disabled, render without motion
  if (!animationsEnabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={animationConfig.initial}
      animate={isVisible ? animationConfig.animate : animationConfig.initial}
      className={className}
      style={{
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </motion.div>
  );
};
