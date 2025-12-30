import { logger } from '../lib/logger/winston';
/**
 * Performance Optimization Hooks
 * Ultra-fast rendering and optimization utilities
 */

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

// ============================================================================
// LAZY IMAGE LOADING (Intersection Observer)
// ============================================================================

export function useLazyImage(src: string, placeholder?: string) {
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  const handleLoad = () => setIsLoaded(true);

  return { imgRef, imageSrc, isLoaded, handleLoad };
}

// ============================================================================
// DEBOUNCE HOOK
// ============================================================================

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// ============================================================================
// THROTTLE HOOK
// ============================================================================

export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 300
) {
  const lastRun = useRef(Date.now());

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = now;
      }
    },
    [callback, delay]
  ) as T;
}

// ============================================================================
// WINDOW SIZE HOOK (Debounced)
// ============================================================================

export function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
}

// ============================================================================
// INTERSECTION OBSERVER HOOK
// ============================================================================

export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting) {
        setHasIntersected(true);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return { ref, isIntersecting, hasIntersected };
}

// ============================================================================
// MEDIA QUERY HOOK
// ============================================================================

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

// Preset breakpoint hooks
export const useIsMobile = () => useMediaQuery('(max-width: 767px)');
export const useIsTablet = () => useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');

// ============================================================================
// LOCAL STORAGE HOOK (with SSR safety)
// ============================================================================

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      logger.error(`Error loading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        logger.error(`Error saving localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue] as const;
}

// ============================================================================
// PREFETCH HOOK (for faster navigation)
// ============================================================================

export function usePrefetch() {
  const prefetchedUrls = useRef(new Set<string>());

  const prefetch = useCallback((url: string) => {
    if (prefetchedUrls.current.has(url)) return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);

    prefetchedUrls.current.add(url);
  }, []);

  return prefetch;
}

// ============================================================================
// OPTIMISTIC UPDATE HOOK
// ============================================================================

export function useOptimisticUpdate<T>(
  initialValue: T,
  updateFn: (value: T) => Promise<T>
) {
  const [value, setValue] = useState<T>(initialValue);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const update = useCallback(
    async (optimisticValue: T) => {
      const previousValue = value;
      setValue(optimisticValue); // Optimistic update
      setIsUpdating(true);
      setError(null);

      try {
        const result = await updateFn(optimisticValue);
        setValue(result);
      } catch (err) {
        setValue(previousValue); // Rollback on error
        setError(err as Error);
      } finally {
        setIsUpdating(false);
      }
    },
    [value, updateFn]
  );

  return { value, update, isUpdating, error };
}

// ============================================================================
// SCROLL POSITION HOOK (Throttled)
// ============================================================================

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState({
    x: 0,
    y: 0,
    direction: 'up' as 'up' | 'down',
  });

  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrollPosition({
            x: window.scrollX,
            y: currentScrollY,
            direction: currentScrollY > lastScrollY.current ? 'down' : 'up',
          });
          lastScrollY.current = currentScrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
}

// ============================================================================
// IDLE DETECTION HOOK
// ============================================================================

export function useIdleDetection(timeout: number = 60000) {
  const [isIdle, setIsIdle] = useState(false);
  const timeoutId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleActivity = () => {
      setIsIdle(false);
      clearTimeout(timeoutId.current);

      timeoutId.current = setTimeout(() => {
        setIsIdle(true);
      }, timeout);
    };

    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    events.forEach((event) => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    handleActivity(); // Initialize

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity);
      });
      clearTimeout(timeoutId.current);
    };
  }, [timeout]);

  return isIdle;
}

// ============================================================================
// NETWORK STATUS HOOK
// ============================================================================

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// ============================================================================
// BATCH UPDATES HOOK (Performance optimization)
// ============================================================================

export function useBatchUpdates<T>(delay: number = 16) {
  const updates = useRef<T[]>([]);
  const [batchedValue, setBatchedValue] = useState<T[]>([]);

  const addUpdate = useCallback(
    (update: T) => {
      updates.current.push(update);

      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        if (updates.current.length > 0) {
          setBatchedValue([...updates.current]);
          updates.current = [];
        }
      });
    },
    []
  );

  return { batchedValue, addUpdate };
}

export default {
  useLazyImage,
  useDebounce,
  useThrottle,
  useWindowSize,
  useIntersectionObserver,
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useLocalStorage,
  usePrefetch,
  useOptimisticUpdate,
  useScrollPosition,
  useIdleDetection,
  useNetworkStatus,
  useBatchUpdates,
};
