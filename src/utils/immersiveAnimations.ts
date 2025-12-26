/**
 * 🌟 IMMERSIVE ANIMATION SYSTEM
 * Modern, buttery-smooth animations for premium travel experience
 * Inspired by award-winning web experiences
 */

export const immersiveAnimations = {
  // Stagger animation - Cards enter progressively
  stagger: {
    initial: { opacity: 0, y: 20 },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1] // Custom easing for smooth feel
      }
    })
  },

  // Glow animation - Pulsing text shadow for hero titles
  glow: {
    initial: {
      textShadow: '0 0 10px rgba(86, 204, 242, 0.3)'
    },
    animate: {
      textShadow: [
        '0 0 10px rgba(86, 204, 242, 0.5)',
        '0 0 20px rgba(86, 204, 242, 0.8)',
        '0 0 30px rgba(86, 204, 242, 0.6)',
        '0 0 20px rgba(86, 204, 242, 0.8)',
        '0 0 10px rgba(86, 204, 242, 0.5)'
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  },

  // Glow animation for elements (border glow)
  elementGlow: {
    initial: {
      boxShadow: '0 0 20px rgba(86, 204, 242, 0.0)'
    },
    animate: {
      boxShadow: [
        '0 0 20px rgba(86, 204, 242, 0.3)',
        '0 0 40px rgba(86, 204, 242, 0.6)',
        '0 0 20px rgba(86, 204, 242, 0.3)'
      ],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  },

  // Card hover - Smooth lift and glow
  cardHover: {
    whileHover: {
      y: -12,
      scale: 1.03,
      boxShadow: '0 20px 60px rgba(86, 204, 242, 0.4), 0 0 40px rgba(86, 204, 242, 0.3)',
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    whileTap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  },

  // Perspective transform - 3D card effect
  perspective: {
    style: {
      transformStyle: 'preserve-3d' as const,
      perspective: '1000px'
    },
    whileHover: {
      rotateY: 3,
      rotateX: -2,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    }
  },

  // Fade in from bottom
  fadeInUp: {
    initial: { opacity: 0, y: 40 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  },

  // Fade in from top
  fadeInDown: {
    initial: { opacity: 0, y: -40 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  },

  // Scale in
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  },

  // Slide in from left
  slideInLeft: {
    initial: { opacity: 0, x: -60 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  },

  // Slide in from right
  slideInRight: {
    initial: { opacity: 0, x: 60 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  },

  // Button hover with glow
  buttonHover: {
    whileHover: {
      scale: 1.05,
      boxShadow: '0 10px 30px rgba(86, 204, 242, 0.5)',
      transition: { duration: 0.2 }
    },
    whileTap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  },

  // Floating animation
  float: {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  },

  // Pulse animation
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  },

  // Shimmer effect
  shimmer: {
    animate: {
      backgroundPosition: ['200% 0', '-200% 0'],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  },

  // Scroll reveal
  scrollReveal: {
    initial: { opacity: 0, y: 50 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    viewport: { once: true, margin: '-100px' }
  },

  // Hero title entrance
  heroTitle: {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        delay: 0.2,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  },

  // Search box entrance
  searchBox: {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  }
};

/**
 * Gradient definitions for backgrounds
 */
export const immersiveGradients = {
  ocean: 'linear-gradient(180deg, #0a1828 0%, #1e3a5f 20%, #2e5f8f 40%, #3b9fd9 70%, #56ccf2 100%)',
  sunset: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #e94560 75%, #f2994a 100%)',
  adventure: 'linear-gradient(180deg, #0d1b2a 0%, #1b263b 30%, #415a77 60%, #778da9 85%, #a8dadc 100%)',
  twilight: 'linear-gradient(180deg, #0a0e27 0%, #1e1a3e 25%, #2e2550 50%, #4a3472 75%, #6247aa 100%)',
  aurora: 'linear-gradient(180deg, #0a192f 0%, #1a365d 25%, #2e5c8a 50%, #4a90a4 75%, #87ceeb 100%)'
};

/**
 * Glassmorphism styles
 */
export const glassmorphismStyles = {
  light: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
  },
  medium: {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
  },
  heavy: {
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
  }
};
