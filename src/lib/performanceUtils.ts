/**
 * Performance Utilities for Mobile Optimization
 * Smooth animations, fast loading, premium UX
 */

import { useEffect, useState, useCallback } from 'react';

/**
 * Debounce function for performance
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function for scroll/resize events
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Request Idle Callback wrapper for non-critical updates
 */
export const requestIdleCallback =
  typeof window !== 'undefined' && 'requestIdleCallback' in window
    ? window.requestIdleCallback
    : (callback: IdleRequestCallback) => setTimeout(callback, 1);

export const cancelIdleCallback =
  typeof window !== 'undefined' && 'cancelIdleCallback' in window
    ? window.cancelIdleCallback
    : clearTimeout;

/**
 * Intersection Observer hook for lazy loading
 */
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [elementRef, options]);

  return isIntersecting;
}

/**
 * Prefetch link on hover for faster navigation
 */
export function usePrefetchOnHover(href: string) {
  const prefetch = useCallback(() => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    }
  }, [href]);

  return { onMouseEnter: prefetch };
}

/**
 * Detect slow connection (2G/3G)
 */
export function useSlowConnection(): boolean {
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      const effectiveType = connection?.effectiveType;
      setIsSlowConnection(['slow-2g', '2g', '3g'].includes(effectiveType));

      const updateConnection = () => {
        const newType = connection?.effectiveType;
        setIsSlowConnection(['slow-2g', '2g', '3g'].includes(newType));
      };

      connection?.addEventListener('change', updateConnection);
      return () => connection?.removeEventListener('change', updateConnection);
    }
  }, []);

  return isSlowConnection;
}

/**
 * Detect if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

/**
 * Get optimized image props based on device
 */
export function getOptimizedImageProps(src: string, alt: string) {
  if (typeof window === 'undefined') {
    return { src, alt, loading: 'lazy' as const };
  }

  const isMobile = window.innerWidth < 768;
  const isSlowNetwork = (navigator as any).connection?.effectiveType === '2g';

  return {
    src,
    alt,
    loading: 'lazy' as const,
    quality: isSlowNetwork ? 60 : isMobile ? 75 : 85,
    sizes: isMobile
      ? '(max-width: 640px) 100vw, 640px'
      : '(max-width: 1024px) 100vw, 1024px',
    priority: false,
    placeholder: 'blur' as const,
  };
}

/**
 * Prevent layout shift with aspect ratio
 */
export function getAspectRatioPadding(width: number, height: number): string {
  return `${(height / width) * 100}%`;
}

/**
 * Smooth scroll to element
 */
export function smoothScrollTo(
  element: HTMLElement | null,
  options: ScrollIntoViewOptions = {}
) {
  if (!element) return;

  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    ...options,
  });
}

/**
 * Check if device supports touch
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;

  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
}

/**
 * Get viewport dimensions with debouncing
 */
export function useViewportSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = debounce(() => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 150);

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
