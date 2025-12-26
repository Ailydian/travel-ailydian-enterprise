/**
 * 🎨 MINIMALIST ANIMATIONS
 * Option5.studio inspired animation utilities
 * Subtle, refined, performance-conscious
 */

export interface AnimationConfig {
  opacity?: number[];
  translateY?: number[];
  translateX?: number[];
  scale?: number[];
  duration?: number;
  delay?: number;
  easing?: string;
}

/**
 * Scroll reveal animations (Anime.js style)
 */
export const minimalistAnimations = {
  // Fade in from bottom
  fadeInUp: {
    initial: {
      opacity: 0,
      y: 30
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94], // easeOutCubic
      }
    }
  },

  // Simple fade in
  fadeIn: {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },

  // Scale in
  scaleIn: {
    initial: {
      opacity: 0,
      scale: 1.1
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.0,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },

  // Staggered children (for lists/grids)
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.1, // 100ms between each child
        delayChildren: 0.2,
      }
    }
  },

  // Text reveal
  textReveal: {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: [0.33, 1, 0.68, 1], // easeOutQuad
      }
    }
  },

  // Image reveal
  imageReveal: {
    initial: {
      opacity: 0,
      scale: 1.05
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.0,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  }
};

/**
 * Hover animations (minimal, purposeful)
 */
export const hoverAnimations = {
  // Subtle scale on image hover
  imageHover: {
    whileHover: {
      scale: 1.02,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },

  // Button lift
  buttonHover: {
    whileHover: {
      y: -2,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    },
    whileTap: {
      scale: 0.98,
    }
  },

  // Link underline
  linkHover: {
    whileHover: {
      opacity: 0.7,
      transition: {
        duration: 0.2,
      }
    }
  }
};

/**
 * Easing functions (cubic-bezier values)
 */
export const easings = {
  easeOutCubic: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  easeOutQuad: [0.33, 1, 0.68, 1] as [number, number, number, number],
  easeInOutCubic: [0.65, 0, 0.35, 1] as [number, number, number, number],
  easeInOutQuad: [0.45, 0, 0.55, 1] as [number, number, number, number],
};

/**
 * Responsive animation configuration
 * Disables complex animations on mobile for performance
 */
export const getAnimationConfig = (isMobile: boolean) => {
  if (isMobile) {
    return {
      enabled: false,
      duration: 0,
    };
  }

  return {
    enabled: true,
    duration: 1,
  };
};

/**
 * Check if animations should be enabled
 */
export const shouldAnimate = (): boolean => {
  if (typeof window === 'undefined') return false;

  // Disable on mobile (< 1024px)
  if (window.innerWidth < 1024) return false;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return false;

  return true;
};

/**
 * Utility to create staggered animation delays
 */
export const getStaggerDelay = (index: number, baseDelay: number = 100): number => {
  return index * baseDelay;
};
