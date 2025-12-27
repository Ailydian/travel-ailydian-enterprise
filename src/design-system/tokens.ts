/**
 * DESIGN SYSTEM TOKENS
 *
 * This is the SINGLE SOURCE OF TRUTH for all design decisions.
 * All colors, typography, spacing, and visual properties MUST be defined here.
 *
 * Usage:
 * - Tailwind config imports these tokens
 * - Components consume via Tailwind classes (e.g., bg-lydian-primary)
 * - Never use raw Tailwind colors (text-gray-*, bg-blue-*, etc.)
 *
 * Enforcement:
 * - ESLint rules block raw color usage
 * - TypeScript ensures type safety
 * - Build fails if tokens are bypassed
 *
 * @module DesignTokens
 * @since 2025-12-27
 */

/**
 * Color Tokens
 *
 * Semantic naming convention:
 * - Primary: Brand identity colors
 * - Semantic: success, warning, error, info
 * - Neutrals: text, backgrounds, borders
 * - Gradients: Multi-color blends
 * - Glass: Translucent overlay effects
 */
export const colorTokens = {
  // ==========================================
  // PRIMARY BRAND COLORS
  // ==========================================
  primary: {
    DEFAULT: '#DC2626',     // Lydian Red - Main brand color
    hover: '#B91C1C',       // Darker on hover
    active: '#991B1B',      // Even darker on active/pressed
    light: '#FCA5A5',       // Light variant for backgrounds
    lighter: '#FEE2E2',     // Very light for subtle backgrounds
    dark: '#991B1B',        // Dark variant
    darker: '#7F1D1D',      // Very dark variant
  },

  secondary: {
    DEFAULT: '#EF4444',     // Secondary red tone
    hover: '#DC2626',
    active: '#B91C1C',
    light: '#FCA5A5',
    lighter: '#FEE2E2',
  },

  accent: {
    DEFAULT: '#DC2626',     // Accent color (same as primary for brand consistency)
    cyan: '#06B6D4',        // Cyan accent for info/tech elements
    purple: '#8B5CF6',      // Purple accent for premium features
    amber: '#F59E0B',       // Amber accent for highlights
  },

  // ==========================================
  // SEMANTIC COLORS
  // ==========================================
  success: {
    DEFAULT: '#10B981',     // Green for success states
    hover: '#059669',
    active: '#047857',
    light: '#D1FAE5',
    lighter: '#ECFDF5',
    text: '#047857',
  },

  warning: {
    DEFAULT: '#F59E0B',     // Amber for warnings
    hover: '#D97706',
    active: '#B45309',
    light: '#FEF3C7',
    lighter: '#FFFBEB',
    text: '#B45309',
  },

  error: {
    DEFAULT: '#EF4444',     // Red for errors
    hover: '#DC2626',
    active: '#B91C1C',
    light: '#FEE2E2',
    lighter: '#FEF2F2',
    text: '#B91C1C',
  },

  info: {
    DEFAULT: '#3B82F6',     // Blue for informational
    hover: '#2563EB',
    active: '#1D4ED8',
    light: '#DBEAFE',
    lighter: '#EFF6FF',
    text: '#1D4ED8',
  },

  // ==========================================
  // NEUTRAL COLORS (Text, Backgrounds, Borders)
  // ==========================================
  neutral: {
    // Text colors
    text: {
      DEFAULT: '#111827',       // Primary text (gray-900)
      secondary: '#374151',     // Secondary text (gray-700)
      tertiary: '#6B7280',      // Tertiary text (gray-500)
      muted: '#9CA3AF',         // Muted text (gray-400)
      dim: '#D1D5DB',           // Dim text (gray-300)
      inverse: '#FFFFFF',       // White text on dark backgrounds
      'inverse-muted': '#F3F4F6', // Light gray on dark backgrounds
    },

    // Background colors
    bg: {
      DEFAULT: '#FFFFFF',       // Primary background (white)
      surface: '#F9FAFB',       // Surface/elevated background (gray-50)
      'surface-raised': '#F3F4F6', // Raised surface (gray-100)
      overlay: '#00000080',     // Dark overlay (50% opacity)
      'overlay-light': '#00000033', // Light overlay (20% opacity)
      hover: '#F9FAFB',         // Hover state background
      active: '#F3F4F6',        // Active state background
      disabled: '#E5E7EB',      // Disabled state background
    },

    // Border colors
    border: {
      DEFAULT: '#E5E7EB',       // Default border (gray-200)
      light: '#F3F4F6',         // Light border (gray-100)
      medium: '#D1D5DB',        // Medium border (gray-300)
      heavy: '#9CA3AF',         // Heavy border (gray-400)
      focus: '#DC2626',         // Focus state border (primary)
    },

    // Shadow colors (for shadow utilities)
    shadow: {
      sm: 'rgba(0, 0, 0, 0.05)',
      DEFAULT: 'rgba(0, 0, 0, 0.1)',
      md: 'rgba(0, 0, 0, 0.15)',
      lg: 'rgba(0, 0, 0, 0.2)',
      xl: 'rgba(0, 0, 0, 0.25)',
    },
  },

  // ==========================================
  // GRADIENT TOKENS
  // ==========================================
  gradient: {
    primary: {
      from: '#DC2626',
      via: '#EF4444',
      to: '#F87171',
    },
    aurora: {
      from: '#667EEA',
      via: '#764BA2',
      to: '#F093FB',
    },
    sunset: {
      from: '#FF512F',
      via: '#DD2476',
      to: '#FF512F',
    },
    ocean: {
      from: '#0EA5E9',
      via: '#06B6D4',
      to: '#0284C7',
    },
    forest: {
      from: '#10B981',
      via: '#059669',
      to: '#047857',
    },
    cyber: {
      from: '#8B5CF6',
      via: '#A78BFA',
      to: '#C4B5FD',
    },
  },

  // ==========================================
  // GLASSMORPHISM TOKENS
  // ==========================================
  glass: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.15)',
    heavy: 'rgba(255, 255, 255, 0.25)',
    dark: 'rgba(0, 0, 0, 0.1)',
    'dark-medium': 'rgba(0, 0, 0, 0.15)',
    'dark-heavy': 'rgba(0, 0, 0, 0.25)',
  },
} as const;

/**
 * Typography Tokens
 *
 * Defines font families, sizes, weights, line heights, and letter spacing.
 * All typography MUST use these tokens.
 */
export const typographyTokens = {
  // Font families
  fontFamily: {
    sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
    mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
  },

  // Font sizes (with line heights)
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],       // 12px / 16px
    sm: ['0.875rem', { lineHeight: '1.25rem' }],   // 14px / 20px
    base: ['1rem', { lineHeight: '1.5rem' }],      // 16px / 24px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],   // 18px / 28px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],    // 20px / 28px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],     // 24px / 32px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px / 36px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],  // 36px / 40px
    '5xl': ['3rem', { lineHeight: '1' }],          // 48px / 48px
    '6xl': ['3.75rem', { lineHeight: '1' }],       // 60px / 60px
    '7xl': ['4.5rem', { lineHeight: '1' }],        // 72px / 72px
    '8xl': ['6rem', { lineHeight: '1' }],          // 96px / 96px
    '9xl': ['8rem', { lineHeight: '1' }],          // 128px / 128px
  },

  // Font weights
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

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Line height
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
} as const;

/**
 * Spacing Tokens
 *
 * Defines consistent spacing scale for padding, margin, gap, etc.
 * Based on 4px base unit (0.25rem).
 */
export const spacingTokens = {
  0: '0px',
  px: '1px',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem',      // 384px
} as const;

/**
 * Border Radius Tokens
 *
 * Defines consistent border radius scale.
 */
export const borderRadiusTokens = {
  none: '0px',
  sm: '0.125rem',     // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem',     // 6px
  lg: '0.5rem',       // 8px
  xl: '0.75rem',      // 12px
  '2xl': '1rem',      // 16px
  '3xl': '1.5rem',    // 24px
  full: '9999px',     // Fully rounded
} as const;

/**
 * Shadow Tokens
 *
 * Defines consistent elevation system via box shadows.
 */
export const shadowTokens = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  none: '0 0 #0000',

  // Glow effects (colored shadows)
  glow: {
    primary: '0 0 20px rgba(220, 38, 38, 0.5)',
    success: '0 0 20px rgba(16, 185, 129, 0.5)',
    warning: '0 0 20px rgba(245, 158, 11, 0.5)',
    error: '0 0 20px rgba(239, 68, 68, 0.5)',
    info: '0 0 20px rgba(59, 130, 246, 0.5)',
  },
} as const;

/**
 * Animation Tokens
 *
 * Defines consistent animation durations and easing functions.
 */
export const animationTokens = {
  duration: {
    fastest: '100ms',
    fast: '200ms',
    normal: '300ms',
    slow: '500ms',
    slowest: '700ms',
  },
  easing: {
    linear: 'linear',
    ease: 'ease',
    'ease-in': 'ease-in',
    'ease-out': 'ease-out',
    'ease-in-out': 'ease-in-out',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    bounce: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  },
} as const;

/**
 * Z-Index Tokens
 *
 * Defines consistent stacking order.
 */
export const zIndexTokens = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  toast: 1700,
  max: 9999,
} as const;

/**
 * Breakpoint Tokens
 *
 * Defines consistent responsive breakpoints.
 */
export const breakpointTokens = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/**
 * Flattened Color Tokens for Tailwind
 *
 * Converts nested color structure to flat structure required by Tailwind.
 * Example: colorTokens.primary.DEFAULT → lydian.primary
 */
export function flattenColorTokens() {
  return {
    lydian: {
      // Primary
      primary: colorTokens.primary.DEFAULT,
      'primary-hover': colorTokens.primary.hover,
      'primary-active': colorTokens.primary.active,
      'primary-light': colorTokens.primary.light,
      'primary-lighter': colorTokens.primary.lighter,
      'primary-dark': colorTokens.primary.dark,
      'primary-darker': colorTokens.primary.darker,

      // Secondary
      secondary: colorTokens.secondary.DEFAULT,
      'secondary-hover': colorTokens.secondary.hover,
      'secondary-active': colorTokens.secondary.active,
      'secondary-light': colorTokens.secondary.light,
      'secondary-lighter': colorTokens.secondary.lighter,

      // Accent
      accent: colorTokens.accent.DEFAULT,
      'accent-cyan': colorTokens.accent.cyan,
      'accent-purple': colorTokens.accent.purple,
      'accent-amber': colorTokens.accent.amber,

      // Success
      success: colorTokens.success.DEFAULT,
      'success-hover': colorTokens.success.hover,
      'success-active': colorTokens.success.active,
      'success-light': colorTokens.success.light,
      'success-lighter': colorTokens.success.lighter,
      'success-text': colorTokens.success.text,

      // Warning
      warning: colorTokens.warning.DEFAULT,
      'warning-hover': colorTokens.warning.hover,
      'warning-active': colorTokens.warning.active,
      'warning-light': colorTokens.warning.light,
      'warning-lighter': colorTokens.warning.lighter,
      'warning-text': colorTokens.warning.text,

      // Error
      error: colorTokens.error.DEFAULT,
      'error-hover': colorTokens.error.hover,
      'error-active': colorTokens.error.active,
      'error-light': colorTokens.error.light,
      'error-lighter': colorTokens.error.lighter,
      'error-text': colorTokens.error.text,

      // Info
      info: colorTokens.info.DEFAULT,
      'info-hover': colorTokens.info.hover,
      'info-active': colorTokens.info.active,
      'info-light': colorTokens.info.light,
      'info-lighter': colorTokens.info.lighter,
      'info-text': colorTokens.info.text,

      // Text
      text: colorTokens.neutral.text.DEFAULT,
      'text-secondary': colorTokens.neutral.text.secondary,
      'text-tertiary': colorTokens.neutral.text.tertiary,
      'text-muted': colorTokens.neutral.text.muted,
      'text-dim': colorTokens.neutral.text.dim,
      'text-inverse': colorTokens.neutral.text.inverse,
      'text-inverse-muted': colorTokens.neutral.text['inverse-muted'],

      // Background
      bg: colorTokens.neutral.bg.DEFAULT,
      'bg-surface': colorTokens.neutral.bg.surface,
      'bg-surface-raised': colorTokens.neutral.bg['surface-raised'],
      'bg-overlay': colorTokens.neutral.bg.overlay,
      'bg-overlay-light': colorTokens.neutral.bg['overlay-light'],
      'bg-hover': colorTokens.neutral.bg.hover,
      'bg-active': colorTokens.neutral.bg.active,
      'bg-disabled': colorTokens.neutral.bg.disabled,

      // Border
      border: colorTokens.neutral.border.DEFAULT,
      'border-light': colorTokens.neutral.border.light,
      'border-medium': colorTokens.neutral.border.medium,
      'border-heavy': colorTokens.neutral.border.heavy,
      'border-focus': colorTokens.neutral.border.focus,

      // Glass
      'glass-light': colorTokens.glass.light,
      'glass-medium': colorTokens.glass.medium,
      'glass-heavy': colorTokens.glass.heavy,
      'glass-dark': colorTokens.glass.dark,
      'glass-dark-medium': colorTokens.glass['dark-medium'],
      'glass-dark-heavy': colorTokens.glass['dark-heavy'],
    },
  };
}

/**
 * Export all tokens
 */
export const tokens = {
  colors: colorTokens,
  typography: typographyTokens,
  spacing: spacingTokens,
  borderRadius: borderRadiusTokens,
  shadows: shadowTokens,
  animation: animationTokens,
  zIndex: zIndexTokens,
  breakpoints: breakpointTokens,
} as const;

export default tokens;
