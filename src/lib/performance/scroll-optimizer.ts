/**
 * Scroll Optimization Utilities for Mobile Performance
 * Provides passive event listeners, debouncing, and RAF-based scroll handling
 *
 * @module performance/scroll-optimizer
 * @performance 60 FPS on mobile devices
 */

import { useEffect, useRef, useCallback, useState } from 'react';

// ===================================================
// PASSIVE EVENT LISTENER SUPPORT DETECTION
// ===================================================

let passiveSupported = false;

if (typeof window !== 'undefined') {
  try {
    const options = Object.defineProperty({}, 'passive', {
      get: function() {
        passiveSupported = true;
        return false;
      }
    });
    window.addEventListener('test' as any, null as any, options);
    window.removeEventListener('test' as any, null as any);
  } catch (err) {
    passiveSupported = false;
  }
}

export const getPassiveOptions = (passive: boolean = true): AddEventListenerOptions | boolean => {
  return passiveSupported ? { passive, capture: false } : false;
};

// ===================================================
// REQUESTANIMATIONFRAME-BASED SCROLL HANDLER
// ===================================================

interface ScrollHandlerOptions {
  passive?: boolean;
  debounce?: number;
  throttle?: number;
}

/**
 * Optimized scroll event handler using RAF
 * Prevents layout thrashing and ensures smooth 60 FPS
 *
 * @usage
 * const unsubscribe = addOptimizedScrollListener((scrollY) => {
 *   console.log('Scroll position:', scrollY);
 * });
 */
export const addOptimizedScrollListener = (
  callback: (scrollY: number, scrollX: number) => void,
  options: ScrollHandlerOptions = {}
): (() => void) => {
  if (typeof window === 'undefined') return () => {};

  const { passive = true, throttle = 16 } = options; // 60 FPS = ~16ms

  let ticking = false;
  let lastScrollY = 0;
  let lastScrollX = 0;
  let lastTime = 0;

  const handleScroll = () => {
    lastScrollY = window.scrollY;
    lastScrollX = window.scrollX;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        const now = Date.now();

        if (now - lastTime >= throttle) {
          callback(lastScrollY, lastScrollX);
          lastTime = now;
        }

        ticking = false;
      });

      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, getPassiveOptions(passive));

  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// ===================================================
// REACT HOOKS FOR SCROLL OPTIMIZATION
// ===================================================

/**
 * Hook for optimized scroll position tracking
 *
 * @usage
 * const scrollY = useOptimizedScroll();
 */
export const useOptimizedScroll = (throttle: number = 16): number => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const unsubscribe = addOptimizedScrollListener((y) => {
      setScrollY(y);
    }, { throttle });

    return unsubscribe;
  }, [throttle]);

  return scrollY;
};

/**
 * Hook for scroll direction detection (for hiding/showing headers)
 *
 * @usage
 * const { scrollDirection, scrollY } = useScrollDirection();
 */
export const useScrollDirection = (threshold: number = 10) => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const unsubscribe = addOptimizedScrollListener((y) => {
      const difference = y - lastScrollY.current;

      if (Math.abs(difference) > threshold) {
        setScrollDirection(difference > 0 ? 'down' : 'up');
        lastScrollY.current = y;
      }

      setScrollY(y);
    });

    return unsubscribe;
  }, [threshold]);

  return { scrollDirection, scrollY };
};

/**
 * Hook for scroll-based visibility (for sticky headers, navbars)
 *
 * @usage
 * const isVisible = useScrollVisibility(100);
 */
export const useScrollVisibility = (showThreshold: number = 100): boolean => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const unsubscribe = addOptimizedScrollListener((y) => {
      if (y < showThreshold) {
        setIsVisible(true);
      } else if (y > lastScrollY.current && y > showThreshold) {
        // Scrolling down
        setIsVisible(false);
      } else if (y < lastScrollY.current) {
        // Scrolling up
        setIsVisible(true);
      }

      lastScrollY.current = y;
    });

    return unsubscribe;
  }, [showThreshold]);

  return isVisible;
};

// ===================================================
// CSS-IN-JS OPTIMIZATION UTILITIES
// ===================================================

/**
 * Generate GPU-accelerated transform styles
 * Forces GPU acceleration and prevents layout thrashing
 */
export const getGPUStyles = (translateY: number = 0, translateX: number = 0) => ({
  transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
  willChange: 'transform',
  backfaceVisibility: 'hidden' as const,
  perspective: 1000,
});

/**
 * Get optimized fixed position styles
 * Prevents mobile scroll jank
 */
export const getFixedPositionStyles = (top: number = 0) => ({
  position: 'fixed' as const,
  top,
  left: 0,
  right: 0,
  ...getGPUStyles(),
});

// ===================================================
// SCROLL LOCK FOR MODALS/OVERLAYS
// ===================================================

let scrollLockCount = 0;
let originalOverflow = '';
let originalPaddingRight = '';

/**
 * Lock scroll (for modals, mobile menus)
 * Prevents background scroll while overlay is open
 */
export const lockScroll = (): void => {
  if (typeof window === 'undefined') return;

  scrollLockCount++;

  if (scrollLockCount === 1) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    originalOverflow = document.body.style.overflow;
    originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = 'hidden';

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }
};

/**
 * Unlock scroll (cleanup for modals)
 */
export const unlockScroll = (): void => {
  if (typeof window === 'undefined') return;

  scrollLockCount = Math.max(0, scrollLockCount - 1);

  if (scrollLockCount === 0) {
    document.body.style.overflow = originalOverflow;
    document.body.style.paddingRight = originalPaddingRight;
  }
};

/**
 * Hook for scroll locking in React components
 *
 * @usage
 * useScrollLock(isModalOpen);
 */
export const useScrollLock = (locked: boolean): void => {
  useEffect(() => {
    if (locked) {
      lockScroll();
      return () => unlockScroll();
    }
  }, [locked]);
};

// ===================================================
// SMOOTH SCROLL TO ELEMENT
// ===================================================

interface ScrollToOptions {
  duration?: number;
  offset?: number;
  behavior?: ScrollBehavior;
}

/**
 * Smooth scroll to element with RAF
 * Cross-browser compatible, smooth animation
 */
export const scrollToElement = (
  element: HTMLElement | string,
  options: ScrollToOptions = {}
): void => {
  if (typeof window === 'undefined') return;

  const { duration = 600, offset = 0, behavior = 'smooth' } = options;

  const targetElement = typeof element === 'string'
    ? document.querySelector(element) as HTMLElement
    : element;

  if (!targetElement) return;

  const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY + offset;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const animation = (currentTime: number): void => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  // Use native smooth scroll if supported and preferred
  if (behavior === 'smooth' && 'scrollBehavior' in document.documentElement.style) {
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  } else {
    requestAnimationFrame(animation);
  }
};

/**
 * Hook for programmatic smooth scrolling
 *
 * @usage
 * const scrollTo = useSmoothScroll();
 * scrollTo('#section', { duration: 800, offset: -100 });
 */
export const useSmoothScroll = () => {
  return useCallback((target: HTMLElement | string, options?: ScrollToOptions) => {
    scrollToElement(target, options);
  }, []);
};

// ===================================================
// SCROLL RESTORATION (for SPAs)
// ===================================================

const scrollPositions = new Map<string, number>();

/**
 * Save scroll position for a route
 */
export const saveScrollPosition = (key: string, position?: number): void => {
  const scrollY = position ?? (typeof window !== 'undefined' ? window.scrollY : 0);
  scrollPositions.set(key, scrollY);
};

/**
 * Restore scroll position for a route
 */
export const restoreScrollPosition = (key: string, fallback: number = 0): void => {
  if (typeof window === 'undefined') return;

  const position = scrollPositions.get(key) ?? fallback;

  // Use RAF to ensure DOM is ready
  requestAnimationFrame(() => {
    window.scrollTo(0, position);
  });
};

/**
 * Hook for automatic scroll restoration (Next.js compatible)
 *
 * @usage
 * useScrollRestoration(router.asPath);
 */
export const useScrollRestoration = (routeKey: string): void => {
  useEffect(() => {
    restoreScrollPosition(routeKey);

    return () => {
      saveScrollPosition(routeKey);
    };
  }, [routeKey]);
};

// ===================================================
// PERFORMANCE METRICS
// ===================================================

/**
 * Measure scroll performance (FPS)
 * Useful for debugging scroll jank
 */
export const measureScrollPerformance = (duration: number = 5000): Promise<number> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(60);
      return;
    }

    let frameCount = 0;
    let lastTime = performance.now();
    const startTime = lastTime;

    const countFrame = (currentTime: number) => {
      frameCount++;
      const elapsed = currentTime - startTime;

      if (elapsed < duration) {
        requestAnimationFrame(countFrame);
      } else {
        const fps = (frameCount / elapsed) * 1000;
        resolve(Math.round(fps));
      }
    };

    requestAnimationFrame(countFrame);
  });
};

/**
 * Debug scroll performance in console
 */
export const debugScrollPerformance = async (): Promise<void> => {
  console.log('Measuring scroll performance for 5 seconds...');
  const fps = await measureScrollPerformance();
  console.log(`Average FPS: ${fps}`);

  if (fps < 30) {
    console.warn('⚠️ Poor scroll performance detected!');
  } else if (fps < 50) {
    console.warn('⚡ Moderate scroll performance');
  } else {
    console.log('✅ Excellent scroll performance!');
  }
};
