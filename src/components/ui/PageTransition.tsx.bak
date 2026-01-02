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
  duration = 300,
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
      ? 'opacity-0'
      : 'opacity-100 transition-opacity',
    
    slide: isAnimating
      ? 'translate-x-8 opacity-0'
      : 'translate-x-0 opacity-100 transition-all',
    
    scale: isAnimating
      ? 'scale-95 opacity-0'
      : 'scale-100 opacity-100 transition-all',
    
    slideUp: isAnimating
      ? 'translate-y-8 opacity-0'
      : 'translate-y-0 opacity-100 transition-all',
    
    slideDown: isAnimating
      ? '-translate-y-8 opacity-0'
      : 'translate-y-0 opacity-100 transition-all',
    
    zoom: isAnimating
      ? 'scale-105 opacity-0'
      : 'scale-100 opacity-100 transition-all',
  };

  return (
    <div
      className={`${transitionClasses[type]} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
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
}> = ({ color = '#0080FF', height = 3 }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      setIsNavigating(true);
      setProgress(0);

      // Simulate progress
      const intervals = [
        { time: 0, progress: 0 },
        { time: 100, progress: 30 },
        { time: 200, progress: 60 },
        { time: 300, progress: 90 },
      ];

      intervals.forEach(({ time, progress: p }) => {
        setTimeout(() => setProgress(p), time);
      });

      // Complete
      setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setIsNavigating(false);
          prevPathname.current = pathname;
        }, 200);
      }, 400);
    }
  }, [pathname]);

  if (!isNavigating) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999]"
      style={{ height: `${height}px` }}
    >
      <div
        className="h-full transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}`,
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
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-lydian-bg/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
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
}> = ({ children, staggerDelay = 50, className = '' }) => {
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
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
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
        transition-all duration-700 ease-out
        ${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
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
  const [offset, setOffset] = useState(0);
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
        transition-all duration-300 ease-out
        ${show
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-95 pointer-events-none'
        }
      `}
    >
      {children}
    </div>
  );
};

export default PageTransition;
