/**
 * Next.js Performance Optimizations for Mobile
 * Ultra-fast loading, smooth animations, premium UX
 */

module.exports = {
  // Mobile-first performance tweaks
  performanceOptimizations: {
    // Reduce initial bundle size
    modularizeImports: {
      'framer-motion': {
        transform: 'framer-motion/dist/es/{{member}}',
      },
      'lucide-react': {
        transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
      },
    },

    // Aggressive code splitting
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // Vendor splitting
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )?.[1];
            return `vendor.${packageName?.replace('@', '')}`;
          },
          priority: 10,
        },
        // UI components
        ui: {
          test: /[\\/]src[\\/]components[\\/]/,
          name: 'ui-components',
          priority: 20,
        },
        // Common modules used across pages
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },

    // Image optimization
    imageOptimization: {
      // Lazy load images below fold
      lazyLoadThreshold: '300px',
      // Blur placeholder for better UX
      placeholder: 'blur',
      // Mobile-optimized sizes
      mobileSizes: [320, 420, 640, 750, 828],
      // Preload critical images only
      priority: false,
    },

    // Font optimization
    fontOptimization: {
      // Subset fonts for faster loading
      subset: true,
      // Preload critical fonts
      preload: true,
      // Display swap for better performance
      display: 'swap',
      // Variable fonts for size reduction
      variable: true,
    },

    // Script optimization
    scriptOptimization: {
      // Defer non-critical scripts
      strategy: 'lazyOnload',
      // Worker threads for heavy computation
      webWorkers: true,
    },

    // CSS optimization
    cssOptimization: {
      // Critical CSS inline
      inlineCritical: true,
      // Remove unused CSS
      purge: true,
      // Minify CSS
      minify: true,
    },

    // Runtime performance
    runtime: {
      // Reduce re-renders
      memoization: true,
      // Virtual scrolling for long lists
      virtualScroll: true,
      // Debounce scroll/resize events
      debounce: 150,
      // Request idle callback for non-critical updates
      useIdleCallback: true,
    },

    // Network optimization
    network: {
      // HTTP/2 Server Push
      http2Push: true,
      // Prefetch next pages
      prefetch: true,
      // Service worker for offline
      serviceWorker: true,
      // Compression
      compression: 'brotli',
    },

    // Mobile-specific
    mobile: {
      // Touch optimization
      touchOptimization: true,
      // Prevent layout shift
      preventLayoutShift: true,
      // Smooth scrolling
      smoothScroll: true,
      // Haptic feedback
      haptics: false, // Optional
      // Reduce motion for accessibility
      respectMotionPreferences: true,
    },
  },
};
