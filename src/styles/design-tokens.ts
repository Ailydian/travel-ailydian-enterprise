/**
 * 🎨 DESIGN TOKENS 2025
 * Global Design System - Futuristic Theme
 * Synchronized with FuturisticHeader gradient palette
 */

export const DESIGN_TOKENS = {
  // 🎨 Category Colors
  categories: {
    tours: '#667EEA',      // Purple
    transfers: '#00BAFF',  // Cyan
    cars: '#FF9500',       // Orange
    hotels: '#EC4899',     // Pink
    rentals: 'var(--lydian-success)',    // Green
    cultural: '#667EEA',
    adventure: '#FF9500',
    nature: 'var(--lydian-success)',
    culinary: '#EC4899',
  },

  // 🌌 Aurora Effects
  aurora: {
    orb1: 'from-[#00BAFF]/10 to-[#667EEA]/10',
    orb2: 'from-[#FF9500]/10 to-[#EC4899]/10',
    background: 'from-[#00BAFF]/5 via-[#667EEA]/5 to-[#FF9500]/5',
  },

  // 🔘 Button Gradients
  buttons: {
    ai: 'from-[#667EEA] via-[#764BA2] to-[#667EEA]',  // Dark purple gradient
    primary: 'from-[#00BAFF] to-[#667EEA]',
    secondary: 'from-[#FF9500] to-[#FF6B00]',
    success: 'from-[var(--lydian-success)] to-[var(--lydian-success-hover)]',
    danger: 'from-[var(--lydian-secondary)] to-[var(--lydian-primary)]',
    warning: 'from-[var(--lydian-warning)] to-[var(--lydian-warning-hover)]',
  },

  // ✨ Glow Colors
  glow: {
    ai: 'rgba(102, 126, 234, 0.6)',
    primary: 'rgba(0, 186, 255, 0.6)',
    secondary: 'rgba(255, 149, 0, 0.6)',
    success: 'rgba(16, 185, 129, 0.6)',
    danger: 'rgba(239, 68, 68, 0.6)',
  },

  // 🪟 Glassmorphism
  glass: {
    card: 'bg-white/60 backdrop-blur-3xl border border-white/40',
    light: 'bg-white/10 backdrop-blur-xl border border-white/20',
    dark: 'bg-gray-900/60 backdrop-blur-3xl border border-gray-800/40',
    input: 'bg-white/10 backdrop-blur-xl border-2 border-white/30',
  },

  // 🎭 Shadows
  shadows: {
    soft: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
    medium: '0 20px 60px -15px rgba(0, 0, 0, 0.3)',
    hard: '0 25px 80px -20px rgba(0, 0, 0, 0.4)',
    neon: '0 0 20px rgba(0, 186, 255, 0.6), 0 0 40px rgba(102, 126, 234, 0.4)',
  },

  // 📏 Spacing
  spacing: {
    xs: '0.5rem',   // 8px
    sm: '0.75rem',  // 12px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '3rem',  // 48px
    '3xl': '4rem',  // 64px
  },

  // 🔤 Typography
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, -apple-system, sans-serif',
      mono: 'JetBrains Mono, monospace',
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem',// 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      black: '900',
    },
  },

  // 🎯 Border Radius
  borderRadius: {
    sm: '0.5rem',   // 8px
    md: '0.75rem',  // 12px
    lg: '1rem',     // 16px
    xl: '1.5rem',   // 24px
    '2xl': '2rem',  // 32px
    full: '9999px',
  },

  // ⚡ Animations
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
  },

  // 🎨 Gradients (Full CSS)
  gradients: {
    twilight: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    ocean: 'linear-gradient(135deg, #00BAFF 0%, #0088BD 50%, #005580 100%)',
    sunset: 'linear-gradient(135deg, #FF9500 0%, #FF6B00 50%, #FF4500 100%)',
    forest: 'linear-gradient(135deg, var(--lydian-success) 0%, var(--lydian-success-hover) 100%)',
    aurora: 'linear-gradient(135deg, #00BAFF 0%, #667EEA 50%, #FF9500 100%)',
  },
} as const;

// Type exports
export type CategoryColor = keyof typeof DESIGN_TOKENS.categories;
export type ButtonVariant = keyof typeof DESIGN_TOKENS.buttons;
export type GlassVariant = keyof typeof DESIGN_TOKENS.glass;

// Helper functions
export const getCategoryColor = (category: string): string => {
  return DESIGN_TOKENS.categories[category as CategoryColor] || DESIGN_TOKENS.categories.tours;
};

export const getButtonGradient = (variant: ButtonVariant): string => {
  return DESIGN_TOKENS.buttons[variant];
};

export const getGlowColor = (variant: string): string => {
  return DESIGN_TOKENS.glow[variant as keyof typeof DESIGN_TOKENS.glow] || DESIGN_TOKENS.glow.primary;
};

export default DESIGN_TOKENS;
