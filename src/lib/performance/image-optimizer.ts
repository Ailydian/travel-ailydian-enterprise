/**
 * Image Optimization Utilities for Mobile Performance
 * Handles responsive images, lazy loading, blur placeholders, and modern formats
 *
 * @module performance/image-optimizer
 * @performance Lighthouse Image Score > 95
 */

import { ImageProps } from 'next/image';

// ===================================================
// IMAGE QUALITY PRESETS
// ===================================================

export const ImageQuality = {
  THUMBNAIL: 50,
  MOBILE: 65,
  DESKTOP: 75,
  HIGH: 85,
  MAXIMUM: 95,
} as const;

export type ImageQualityType = typeof ImageQuality[keyof typeof ImageQuality];

// ===================================================
// RESPONSIVE IMAGE SIZES
// ===================================================

/**
 * Device breakpoints for responsive images
 */
export const DeviceBreakpoints = {
  MOBILE_SM: 640,
  MOBILE_MD: 750,
  MOBILE_LG: 828,
  TABLET: 1080,
  DESKTOP_SM: 1200,
  DESKTOP_MD: 1920,
  DESKTOP_LG: 2048,
  DESKTOP_XL: 3840,
} as const;

/**
 * Generate responsive sizes string for Next.js Image
 *
 * @example
 * getSizes({ mobile: 100, tablet: 50, desktop: 33 })
 * // Returns: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
 */
export const getSizes = (config: {
  mobile?: number;
  tablet?: number;
  desktop?: number;
}): string => {
  const { mobile = 100, tablet = 50, desktop = 33 } = config;

  const sizes: string[] = [];

  if (mobile !== 100) {
    sizes.push(`(max-width: ${DeviceBreakpoints.MOBILE_LG}px) ${mobile}vw`);
  }

  if (tablet !== mobile) {
    sizes.push(`(max-width: ${DeviceBreakpoints.TABLET}px) ${tablet}vw`);
  }

  sizes.push(`${desktop}vw`);

  return sizes.join(', ');
};

/**
 * Predefined responsive size configurations
 */
export const ResponsiveSizes = {
  FULL_WIDTH: getSizes({ mobile: 100, tablet: 100, desktop: 100 }),
  HERO: getSizes({ mobile: 100, tablet: 100, desktop: 100 }),
  CARD: getSizes({ mobile: 100, tablet: 50, desktop: 33 }),
  CARD_LARGE: getSizes({ mobile: 100, tablet: 50, desktop: 50 }),
  THUMBNAIL: getSizes({ mobile: 50, tablet: 33, desktop: 25 }),
  GALLERY: getSizes({ mobile: 100, tablet: 50, desktop: 33 }),
  PROFILE: getSizes({ mobile: 20, tablet: 15, desktop: 10 }),
} as const;

// ===================================================
// BLUR PLACEHOLDER GENERATION
// ===================================================

/**
 * Generate a simple shimmer blur placeholder
 */
export const shimmerBlurDataURL = (width: number = 700, height: number = 475): string => {
  const shimmer = `
    <svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f3f4f6" offset="20%" />
          <stop stop-color="#e5e7eb" offset="50%" />
          <stop stop-color="#f3f4f6" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="#f3f4f6" />
      <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1s" repeatCount="indefinite"  />
    </svg>
  `;

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

  return `data:image/svg+xml;base64,${toBase64(shimmer)}`;
};

/**
 * Generate a gradient blur placeholder
 */
export const gradientBlurDataURL = (color1: string = '#667eea', color2: string = '#764ba2'): string => {
  const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#grad)" />
    </svg>
  `;

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

  return `data:image/svg+xml;base64,${toBase64(svg)}`;
};

/**
 * Get blur placeholder for category
 */
export const getCategoryBlurPlaceholder = (category: string): string => {
  const placeholders: Record<string, string> = {
    beach: gradientBlurDataURL('#0ea5e9', '#06b6d4'),
    mountain: gradientBlurDataURL('#059669', '#047857'),
    city: gradientBlurDataURL('#667eea', '#764ba2'),
    desert: gradientBlurDataURL('#f59e0b', '#d97706'),
    snow: gradientBlurDataURL('#60a5fa', '#93c5fd'),
    default: shimmerBlurDataURL(),
  };

  return placeholders[category.toLowerCase()] || placeholders.default;
};

// ===================================================
// IMAGE LOADER OPTIMIZATION
// ===================================================

/**
 * Custom image loader for external CDNs
 */
export const createImageLoader = (baseUrl: string) => {
  return ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
    const params = new URLSearchParams();

    params.set('w', width.toString());

    if (quality) {
      params.set('q', quality.toString());
    }

    params.set('fm', 'webp'); // Force WebP format
    params.set('fit', 'crop');

    return `${baseUrl}${src}?${params.toString()}`;
  };
};

/**
 * Cloudinary image loader
 */
export const cloudinaryLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  const params = [
    'f_auto', // Auto format
    'c_limit', // Limit size
    `w_${width}`,
    `q_${quality || 'auto'}`,
  ];

  if (src.startsWith('http')) {
    return src;
  }

  return `https://res.cloudinary.com/ailydian/image/upload/${params.join(',')}/${src}`;
};

/**
 * Unsplash image loader with optimization
 */
export const unsplashLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  if (!src.includes('unsplash.com')) {
    return src;
  }

  const params = new URLSearchParams();
  params.set('w', width.toString());
  params.set('q', (quality || 80).toString());
  params.set('fm', 'webp');
  params.set('fit', 'crop');
  params.set('auto', 'format');

  return `${src}&${params.toString()}`;
};

// ===================================================
// OPTIMIZED IMAGE PROPS GENERATORS
// ===================================================

interface OptimizedImageConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: ImageQualityType;
  priority?: boolean;
  sizes?: string;
  className?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  blurDataURL?: string;
}

/**
 * Generate optimized Next.js Image props
 *
 * @usage
 * <Image {...getOptimizedImageProps({ src: '/image.jpg', alt: 'Hero' })} />
 */
export const getOptimizedImageProps = (config: OptimizedImageConfig): Partial<ImageProps> => {
  const {
    src,
    alt,
    width,
    height,
    quality = ImageQuality.DESKTOP,
    priority = false,
    sizes = ResponsiveSizes.CARD,
    className = '',
    objectFit = 'cover',
    blurDataURL,
  } = config;

  const props: Partial<ImageProps> = {
    src,
    alt,
    quality,
    loading: priority ? 'eager' : 'lazy',
    priority,
    sizes,
    className,
    style: { objectFit },
  };

  // Add blur placeholder
  if (blurDataURL) {
    props.placeholder = 'blur';
    props.blurDataURL = blurDataURL;
  } else if (!priority) {
    props.placeholder = 'blur';
    props.blurDataURL = shimmerBlurDataURL(width, height);
  }

  // Add dimensions if provided
  if (width) props.width = width;
  if (height) props.height = height;

  // Fill mode if no dimensions
  if (!width && !height) {
    props.fill = true;
  }

  return props;
};

/**
 * Generate props for hero images (LCP optimization)
 */
export const getHeroImageProps = (config: Omit<OptimizedImageConfig, 'priority' | 'quality'>): Partial<ImageProps> => {
  return getOptimizedImageProps({
    ...config,
    priority: true,
    quality: ImageQuality.HIGH,
    sizes: ResponsiveSizes.HERO,
  });
};

/**
 * Generate props for card images
 */
export const getCardImageProps = (config: OptimizedImageConfig): Partial<ImageProps> => {
  return getOptimizedImageProps({
    ...config,
    quality: ImageQuality.MOBILE,
    sizes: ResponsiveSizes.CARD,
  });
};

/**
 * Generate props for thumbnail images
 */
export const getThumbnailImageProps = (config: OptimizedImageConfig): Partial<ImageProps> => {
  return getOptimizedImageProps({
    ...config,
    quality: ImageQuality.THUMBNAIL,
    sizes: ResponsiveSizes.THUMBNAIL,
  });
};

// ===================================================
// LAZY LOADING UTILITIES
// ===================================================

/**
 * Check if IntersectionObserver is supported
 */
export const isIntersectionObserverSupported = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'IntersectionObserver' in window;
};

/**
 * Create an intersection observer for lazy loading
 *
 * @usage
 * const observer = createLazyLoadObserver((entries) => {
 *   entries.forEach(entry => {
 *     if (entry.isIntersecting) {
 *       loadImage(entry.target);
 *     }
 *   });
 * });
 */
export const createLazyLoadObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver | null => {
  if (!isIntersectionObserverSupported()) {
    return null;
  }

  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px', // Load 50px before entering viewport
    threshold: 0.01,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// ===================================================
// PRELOADING CRITICAL IMAGES
// ===================================================

/**
 * Preload a critical image
 *
 * @usage
 * preloadImage('/hero-image.jpg');
 */
export const preloadImage = (src: string, fetchPriority: 'high' | 'low' | 'auto' = 'high'): void => {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  link.setAttribute('fetchpriority', fetchPriority);

  document.head.appendChild(link);
};

/**
 * Preload multiple critical images
 */
export const preloadImages = (sources: string[]): void => {
  sources.forEach((src, index) => {
    preloadImage(src, index === 0 ? 'high' : 'auto');
  });
};

// ===================================================
// IMAGE FORMAT DETECTION
// ===================================================

/**
 * Check browser support for modern image formats
 */
export const getSupportedFormats = async (): Promise<{
  avif: boolean;
  webp: boolean;
}> => {
  if (typeof window === 'undefined') {
    return { avif: false, webp: false };
  }

  const checkFormat = (format: 'avif' | 'webp'): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();

      img.onload = () => resolve(img.width > 0 && img.height > 0);
      img.onerror = () => resolve(false);

      const testImages = {
        avif: 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=',
        webp: 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=',
      };

      img.src = testImages[format];
    });
  };

  const [avif, webp] = await Promise.all([
    checkFormat('avif'),
    checkFormat('webp'),
  ]);

  return { avif, webp };
};

// ===================================================
// PERFORMANCE MONITORING
// ===================================================

/**
 * Monitor LCP (Largest Contentful Paint) for images
 */
export const monitorImageLCP = (): void => {
  if (typeof window === 'undefined') return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];

      console.log('LCP Image:', {
        element: lastEntry.element,
        loadTime: lastEntry.loadTime,
        renderTime: lastEntry.renderTime,
        size: lastEntry.size,
      });
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (error) {
    console.error('LCP monitoring failed:', error);
  }
};

// ===================================================
// EXPORT ALL
// ===================================================

export default {
  ImageQuality,
  DeviceBreakpoints,
  ResponsiveSizes,
  getSizes,
  shimmerBlurDataURL,
  gradientBlurDataURL,
  getCategoryBlurPlaceholder,
  cloudinaryLoader,
  unsplashLoader,
  getOptimizedImageProps,
  getHeroImageProps,
  getCardImageProps,
  getThumbnailImageProps,
  createLazyLoadObserver,
  preloadImage,
  preloadImages,
  getSupportedFormats,
  monitorImageLCP,
};
