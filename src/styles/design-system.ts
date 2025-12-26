/**
 * 🎨 TRAVEL.AILYDIAN.COM - DESIGN SYSTEM 2.0
 * Neomorphism + Glassmorphism Hybrid
 * Modern, Premium, Unforgettable
 */

export const designSystem = {
  // 🌈 COLOR PALETTE
  colors: {
    // Primary - Ocean Blues
    primary: {
      50: '#E0F7FF',
      100: '#B3EBFF',
      200: '#80DEFF',
      300: '#4DD1FF',
      400: '#26C6FF',
      500: '#00BAFF', // Main brand color
      600: '#00A3E0',
      700: '#0088BD',
      800: '#006D9A',
      900: '#004D6D',
    },

    // Secondary - Sunset Oranges
    secondary: {
      50: '#FFF4E6',
      100: '#FFE0B3',
      200: '#FFCB80',
      300: '#FFB54D',
      400: '#FFA426',
      500: '#FF9500', // Accent color
      600: '#E08600',
      700: '#BD7200',
      800: '#9A5E00',
      900: '#6D4300',
    },

    // Neutral - Soft Grays
    neutral: {
      0: '#FFFFFF',
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
      950: '#020617',
    },

    // Semantic Colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',

    // Gradients
    gradients: {
      ocean: 'linear-gradient(135deg, #00BAFF 0%, #0088BD 100%)',
      sunset: 'linear-gradient(135deg, #FF9500 0%, #FF6B00 100%)',
      twilight: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
      aurora: 'linear-gradient(135deg, #00BAFF 0%, #667EEA 50%, #FF9500 100%)',
      glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    },
  },

  // ✍️ TYPOGRAPHY
  typography: {
    fontFamily: {
      sans: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      display: 'var(--font-inter), sans-serif',
      mono: 'ui-monospace, "Cascadia Code", "Source Code Pro", monospace',
    },

    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
      '7xl': '4.5rem',    // 72px
      '8xl': '6rem',      // 96px
      '9xl': '8rem',      // 128px
    },

    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },

    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },

    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  // 📐 SPACING SCALE
  spacing: {
    0: '0px',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
    40: '10rem',    // 160px
    48: '12rem',    // 192px
    56: '14rem',    // 224px
    64: '16rem',    // 256px
  },

  // 🎭 SHADOWS (Neomorphism)
  shadows: {
    // Soft shadows for neomorphism
    soft: {
      sm: '2px 2px 4px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(255, 255, 255, 0.7)',
      md: '4px 4px 8px rgba(0, 0, 0, 0.1), -4px -4px 8px rgba(255, 255, 255, 0.7)',
      lg: '8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.7)',
      xl: '12px 12px 24px rgba(0, 0, 0, 0.15), -12px -12px 24px rgba(255, 255, 255, 0.8)',
    },

    // Pressed/inset shadows
    inset: {
      sm: 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.7)',
      md: 'inset 4px 4px 8px rgba(0, 0, 0, 0.1), inset -4px -4px 8px rgba(255, 255, 255, 0.7)',
      lg: 'inset 8px 8px 16px rgba(0, 0, 0, 0.15), inset -8px -8px 16px rgba(255, 255, 255, 0.8)',
    },

    // Glass morphism shadows
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',

    // Standard elevation shadows
    elevation: {
      xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    },

    // Colored shadows
    colored: {
      primary: '0 10px 30px -5px rgba(0, 186, 255, 0.3)',
      secondary: '0 10px 30px -5px rgba(255, 149, 0, 0.3)',
      success: '0 10px 30px -5px rgba(16, 185, 129, 0.3)',
    },
  },

  // 🎪 BLUR EFFECTS (Glassmorphism)
  blur: {
    none: '0',
    sm: 'blur(4px)',
    md: 'blur(8px)',
    lg: 'blur(12px)',
    xl: 'blur(16px)',
    '2xl': 'blur(24px)',
    '3xl': 'blur(40px)',
  },

  // 🔄 BORDER RADIUS
  borderRadius: {
    none: '0',
    sm: '0.25rem',    // 4px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    '3xl': '2rem',    // 32px
    full: '9999px',
  },

  // ⚡ TRANSITIONS & ANIMATIONS
  transitions: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '700ms',
    },

    timing: {
      ease: 'ease',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      bounce: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
    },
  },

  // 📱 BREAKPOINTS
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    '3xl': '1920px',
  },

  // 🎯 Z-INDEX LAYERS
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    notification: 1080,
  },
};

// Export individual sections for convenience
export const { colors, typography, spacing, shadows, blur, borderRadius, transitions, breakpoints, zIndex } = designSystem;

export default designSystem;
