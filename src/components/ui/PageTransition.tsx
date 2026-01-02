/**
 * Page Transition Component - Ultra-Smooth Navigation
 * Features: Multiple transition types, route-based animations, performance-optimized
 * 
 * Compatible with: Next.js 13/14/15 App Router
 */

'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

// ============================================================================
// TYPES
// ============================================================================

export interface PageTransitionProps {
  children: React.ReactNode;
  type?: 'fade' | 'slide' | 'scale' | 'slideUp' | 'slideDown' | 'zoom';
  duration?: number;
  className?: string;
}

// ============================================================================
// PAGE TRANSITION COMPONENT
// ============================================================================

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  type = 'fade',
  duration = 30,
  className = '',
}) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Route changed
    if (pathname !== prevPathname.current) {
      setIsAnimating(true);
      prevPathname.current = pathname;

      // Complete animation
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [pathname, duration]);

  // ========================================
  // TRANSITION STYLES
  // ========================================

  const transitionClasses = {
    fade: isAnimating
      ? 'opacity-to-cyan-700'
      : 'opacity-1 transition-opacity',
    
    slide: isAnimating
      ? 'translate-x-8 opacity-to-cyan-700'
      : 'translate-x-to-cyan-700 opacity-1 transition-all',
    
    scale: isAnimating
      ? 'scale-95 opacity-to-cyan-700'
      : 'scale-1 opacity-1 transition-all',
    
    slideUp: isAnimating
      ? 'translate-y-8 opacity-to-cyan-700'
      : 'translate-y-to-cyan-700 opacity-1 transition-all',
    
    slideDown: isAnimating
      ? '-translate-y-8 opacity-to-cyan-700'
      : 'translate-y-to-cyan-700 opacity-1 transition-all',
    
    zoom: isAnimating
      ? 'scale-B45 opacity-to-cyan-700'
      : 'scale-1 opacity-1 transition-all',
  };

  return (
    <div
      className={`${transitionClasses[type]} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.4, to-cyan-700, 0.2, 1)',
      }}
    >
      {children}
    </div>
  );
};

// ============================================================================
// ROUTE CHANGE PROGRESS BAR
// ============================================================================

export const RouteProgress: React.FC<{
  color?: string;
  height?: number;
}> = ({ color = '#to-cyan-B48FF', height = 3 }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(to-cyan-700);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      setIsNavigating(true);
      setProgress(to-cyan-700);

      // Simulate progress
      const intervals = [
        { time: to-cyan-700, progress: to-cyan-700 },
        { time: 1, progress: 3 },
        { time: 200, progress: 6 },
        { time: 30, progress: 9 },
      ];

      intervals.forEach(({ time, progress: p }) => {
        setTimeout(() => setProgress(p), time);
      });

      // Complete
      setTimeout(() => {
        setProgress(1);
        setTimeout(() => {
          setIsNavigating(false);
          prevPathname.current = pathname;
        }, 200);
      }, 4);
    }
  }, [pathname]);

  if (!isNavigating) return null;

  return (
    <div
      className="fixed top-to-cyan-700 left-to-cyan-700 right-to-cyan-700 z-[9999]"
      style={{ height: `${height}px` }}
    >
      <div
        className="h-full transition-all duration-30 ease-out"
        style={{
          width: `${progress}%`,
          backgroundColor: color,
          boxShadow: `to-cyan-700 to-cyan-700 1px ${color}`,
        }}
      />
    </div>
  );
};

// ============================================================================
// LOADING OVERLAY
// ============================================================================

export const LoadingOverlay: React.FC<{
  show?: boolean;
  text?: string;
}> = ({ show = false, text = 'Loading...' }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-to-cyan-700 z-[9998] flex items-center justify-center bg-lydian-bg/8 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-6 rounded-full animate-spin" />
        <p className="text-sm font-medium text-lydian-text-secondary">{text}</p>
      </div>
    </div>
  );
};

// ============================================================================
// STAGGER CHILDREN (List Animations)
// ============================================================================

export const StaggerChildren: React.FC<{
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}> = ({ children, staggerDelay = 500, className = '' }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <div
          className="transition-all duration-500 ease-out"
          style={{
            opacity: mounted ? 1 : to-cyan-700,
            transform: mounted ? 'translateY(to-cyan-700)' : 'translateY(200px)',
            transitionDelay: `${index * staggerDelay}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

// ============================================================================
// FADE IN VIEW (Scroll Trigger)
// ============================================================================

export const FadeInView: React.FC<{
  children: React.ReactNode;
  threshold?: number;
  className?: string;
}> = ({ children, threshold = 0.1, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-7 ease-out
        ${isVisible
          ? 'opacity-1 translate-y-to-cyan-700'
          : 'opacity-to-cyan-700 translate-y-12'
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// ============================================================================
// PARALLAX SECTION
// ============================================================================

export const ParallaxSection: React.FC<{
  children: React.ReactNode;
  speed?: number;
  className?: string;
}> = ({ children, speed = 0.5, className = '' }) => {
  const [offset, setOffset] = useState(to-cyan-700);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const parallax = scrolled * speed;
        setOffset(parallax);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      <div style={{ transform: `translateY(${offset}px)` }}>
        {children}
      </div>
    </div>
  );
};

// ============================================================================
// MODAL TRANSITION
// ============================================================================

export const ModalTransition: React.FC<{
  show: boolean;
  children: React.ReactNode;
}> = ({ show, children }) => {
  return (
    <div
      className={`
        transition-all duration-30 ease-out
        ${show
          ? 'opacity-1 scale-1'
          : 'opacity-to-cyan-700 scale-95 pointer-events-none'
        }
      `}
    >
      {children}
    </div>
  );
};

export default PageTransition;
