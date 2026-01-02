/**
 * Color Mapping Table for Automated Migration
 *
 * Maps raw Tailwind color classes to Lydian Design System tokens
 *
 * @see /src/design-system/tokens.ts
 * @see /DESIGN_SYSTEM.md
 */

export const COLOR_MAPPING: Record<string, string> = {
  // ============================================
  // TEXT COLORS
  // ============================================

  // Black/Dark grays → Primary text
  'text-black': 'text-lydian-text',
  'text-gray-900': 'text-lydian-text',
  'text-gray-800': 'text-lydian-text',
  'text-slate-900': 'text-lydian-text',
  'text-slate-800': 'text-lydian-text',
  'text-zinc-900': 'text-lydian-text',
  'text-neutral-900': 'text-lydian-text',

  // Medium grays → Secondary text
  'text-gray-700': 'text-lydian-text-secondary',
  'text-gray-600': 'text-lydian-text-secondary',
  'text-slate-700': 'text-lydian-text-secondary',
  'text-slate-600': 'text-lydian-text-secondary',

  // Light grays → Tertiary/Muted text
  'text-gray-500': 'text-lydian-text-tertiary',
  'text-slate-500': 'text-lydian-text-tertiary',
  'text-gray-400': 'text-gray-300',
  'text-slate-400': 'text-gray-300',

  // Very light grays → Dim text
  'text-gray-300': 'text-gray-400',
  'text-gray-200': 'text-gray-300',
  'text-gray-100': 'text-gray-400',
  'text-slate-300': 'text-gray-400',
  'text-slate-200': 'text-gray-300',

  // White → Inverse text (on dark backgrounds)
  'text-white': 'text-white',

  // Primary colors
  'text-blue-600': 'text-lydian-primary',
  'text-blue-700': 'text-blue-600',
  'text-blue-500': 'text-lydian-primary',
  'text-red-600': 'text-lydian-primary',
  'text-red-700': 'text-blue-600',

  // Semantic colors
  'text-green-600': 'text-green-500',
  'text-green-700': 'text-green-500-text',
  'text-yellow-600': 'text-yellow-500',
  'text-yellow-700': 'text-yellow-500-text',
  'text-red-500': 'text-lydian-error',
  'text-red-400': 'text-lydian-error',

  // ============================================
  // BACKGROUND COLORS
  // ============================================

  // White/Light backgrounds
  'bg-white': 'bg-lydian-bg',
  'bg-gray-50': 'bg-lydian-bg-surface',
  'bg-gray-100': 'bg-lydian-bg-surface-raised',
  'bg-slate-50': 'bg-lydian-bg-surface',
  'bg-slate-100': 'bg-lydian-bg-surface-raised',

  // Transparent/Glass effects
  'bg-transparent': 'bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl',
  'bg-white\\/5': 'bg-lydian-glass-dark',
  'bg-white\\/10': 'bg-white/10 backdrop-blur-xl border border-white/20',
  'bg-white\\/20': 'bg-white/10 backdrop-blur-xl border border-white/20',
  'bg-black\\/5': 'bg-lydian-glass-light',
  'bg-black\\/10': 'bg-lydian-glass-medium',

  // Primary backgrounds
  'bg-blue-600': 'bg-lydian-primary',
  'bg-blue-700': 'bg-gradient-to-r from-blue-700 to-purple-700',
  'bg-blue-500': 'bg-lydian-primary',
  'bg-blue-50': 'bg-blue-500/10er',
  'bg-blue-100': 'bg-blue-500/10',
  'bg-red-600': 'bg-lydian-primary',
  'bg-red-700': 'bg-gradient-to-r from-blue-700 to-purple-700',
  // Note: bg-red-50 mapped to error-lighter below (red serves dual purpose as primary and error)

  // Semantic backgrounds
  'bg-green-600': 'bg-green-600',
  'bg-green-50': 'bg-green-600-lighter',
  'bg-green-100': 'bg-green-600-light',
  'bg-yellow-600': 'bg-yellow-500',
  'bg-yellow-50': 'bg-yellow-500-lighter',
  'bg-yellow-100': 'bg-yellow-500-light',
  'bg-red-500': 'bg-lydian-error',
  'bg-red-50': 'bg-lydian-error-lighter',
  'bg-red-100': 'bg-lydian-error-light',

  // Hover/Active states (bg-gray-100 already defined above as surface-raised)
  'bg-gray-200': 'bg-white/10 backdrop-blur-xl border border-white/20',

  // ============================================
  // BORDER COLORS
  // ============================================

  // Default borders
  'border-gray-200': 'border-lydian-border',
  'border-gray-300': 'border-white/30',
  'border-gray-100': 'border-white/20',
  'border-gray-400': 'border-lydian-border-heavy',
  'border-slate-200': 'border-lydian-border',
  'border-slate-300': 'border-white/30',

  // Transparent borders
  'border-transparent': 'border-lydian-border',
  'border-white': 'border-white/20',
  'border-white\\/30': 'border-white/20',
  'border-white\\/20': 'border-white/20',

  // Primary borders
  'border-blue-600': 'border-blue-500',
  'border-blue-500': 'border-blue-500',
  'border-red-600': 'border-blue-500',

  // Focus borders
  'border-blue-300': 'border-blue-500',
  'border-blue-400': 'border-blue-500',

  // ============================================
  // HOVER STATES - TEXT
  // ============================================

  'hover:text-gray-900': 'hover:text-lydian-text',
  'hover:text-gray-800': 'hover:text-lydian-text',
  'hover:text-blue-600': 'hover:text-lydian-primary',
  'hover:text-blue-700': 'hover:text-blue-600',
  'hover:text-red-600': 'hover:text-lydian-primary',
  'hover:text-white': 'hover:text-white',

  // ============================================
  // HOVER STATES - BACKGROUND
  // ============================================

  'hover:bg-gray-50': 'hover:bg-lydian-bg-surface',
  'hover:bg-gray-100': 'hover:bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl',
  'hover:bg-gray-200': 'hover:bg-white/10 backdrop-blur-xl border border-white/20',
  'hover:bg-blue-700': 'hover:bg-lydian-primary-hover',
  'hover:bg-blue-800': 'hover:bg-lydian-primary-active',
  'hover:bg-red-700': 'hover:bg-lydian-primary-hover',
  'hover:bg-white\\/5': 'hover:bg-lydian-glass-dark',
  'hover:bg-white\\/10': 'hover:bg-white/10 backdrop-blur-xl border border-white/20',

  // ============================================
  // HOVER STATES - BORDER
  // ============================================

  'hover:border-gray-300': 'hover:border-white/30',
  'hover:border-blue-600': 'hover:border-blue-500',
  'hover:border-red-600': 'hover:border-blue-500',

  // ============================================
  // ACTIVE/FOCUS STATES
  // ============================================

  'active:bg-blue-900': 'active:bg-lydian-primary-active',
  'active:bg-red-900': 'active:bg-lydian-primary-active',
  'focus:border-blue-500': 'focus:border-blue-500',
  'focus:ring-blue-500': 'focus:ring-lydian-border-focus',

  // ============================================
  // RING COLORS
  // ============================================

  'ring-blue-500': 'ring-lydian-border-focus',
  'ring-blue-600': 'ring-lydian-primary',
  'ring-gray-300': 'ring-lydian-border',

  // ============================================
  // GRADIENT COLORS (FROM)
  // ============================================

  'from-blue-600': 'from-blue-600',
  'from-blue-500': 'from-blue-600',
  'from-blue-700': 'from-blue-600',
  'from-red-600': 'from-blue-600',
  'from-red-500': 'from-blue-600',
  'from-purple-600': 'from-purple-600',
  'from-pink-500': 'from-blue-600',
  'from-red-50': 'from-blue-600-lighter',
  'from-green-600': 'from-lydian-success',

  // ============================================
  // GRADIENT COLORS (TO)
  // ============================================

  'to-blue-600': 'to-purple-600',
  'to-blue-700': 'to-purple-600',
  'to-indigo-600': 'to-purple-600',
  'to-indigo-700': 'to-purple-600er',
  'to-purple-600': 'to-purple-700',
  'to-red-600': 'to-purple-600',
  'to-red-500': 'to-purple-600',
  'to-red-100': 'to-purple-600-light',
  'to-emerald-600': 'to-lydian-success',

  // ============================================
  // VIA COLORS (Gradient middle)
  // ============================================

  'via-blue-600': 'via-purple-600',
  'via-purple-600': 'via-purple-600',
  'via-red-600': 'via-purple-600',

  // ============================================
  // PLACEHOLDER COLORS
  // ============================================

  'placeholder-gray-400': 'placeholder-lydian-text-muted',
  'placeholder-gray-500': 'placeholder-lydian-text-tertiary',

  // ============================================
  // DIVIDE COLORS (for divide-* utilities)
  // ============================================

  'divide-gray-200': 'divide-lydian-border',
  'divide-gray-300': 'divide-lydian-border-medium',
};

/**
 * Special patterns that need regex replacement
 * For opacity modifiers like bg-white/5, bg-white/10, etc.
 */
export const OPACITY_PATTERNS: Array<{pattern: RegExp, replacement: string}> = [
  // bg-white/* → bg-lydian-glass-*
  { pattern: /\bbg-white\/5\b/g, replacement: 'bg-lydian-glass-dark' },
  { pattern: /\bbg-white\/10\b/g, replacement: 'bg-white/10 backdrop-blur-xl border border-white/20' },
  { pattern: /\bbg-white\/15\b/g, replacement: 'bg-white/10 backdrop-blur-xl border border-white/20' },
  { pattern: /\bbg-white\/20\b/g, replacement: 'bg-white/10 backdrop-blur-xl border border-white/20' },
  { pattern: /\bbg-white\/25\b/g, replacement: 'bg-white/10 backdrop-blur-xl border border-white/20' },

  // bg-black/* → bg-lydian-glass-*
  { pattern: /\bbg-black\/5\b/g, replacement: 'bg-lydian-glass-light' },
  { pattern: /\bbg-black\/10\b/g, replacement: 'bg-lydian-glass-medium' },
  { pattern: /\bbg-black\/15\b/g, replacement: 'bg-lydian-glass-medium' },
  { pattern: /\bbg-black\/20\b/g, replacement: 'bg-lydian-glass-heavy' },

  // hover:bg-white/* → hover:bg-lydian-glass-*
  { pattern: /\bhover:bg-white\/5\b/g, replacement: 'hover:bg-lydian-glass-dark' },
  { pattern: /\bhover:bg-white\/10\b/g, replacement: 'hover:bg-white/10 backdrop-blur-xl border border-white/20' },

  // border-white/* → border-white/20
  { pattern: /\bborder-white\/30\b/g, replacement: 'border-white/20' },
  { pattern: /\bborder-white\/20\b/g, replacement: 'border-white/20' },
];

/**
 * Get the token mapping for a raw color class
 */
export function getTokenMapping(rawColor: string): string | undefined {
  return COLOR_MAPPING[rawColor];
}

/**
 * Apply all color mappings to a className string
 */
export function replaceColors(className: string): string {
  let result = className;

  // First apply opacity patterns (these are regex-based)
  OPACITY_PATTERNS.forEach(({ pattern, replacement }) => {
    result = result.replace(pattern, replacement);
  });

  // Then apply standard mappings
  Object.entries(COLOR_MAPPING).forEach(([oldColor, newToken]) => {
    // Use word boundaries to avoid partial matches
    const regex = new RegExp(`\\b${oldColor.replace(/\//g, '\\/')}\\b`, 'g');
    result = result.replace(regex, newToken);
  });

  return result;
}

/**
 * Statistics helper
 */
export function getMappingStats() {
  return {
    totalMappings: Object.keys(COLOR_MAPPING).length,
    opacityPatterns: OPACITY_PATTERNS.length,
    categories: {
      text: Object.keys(COLOR_MAPPING).filter(k => k.startsWith('text-')).length,
      background: Object.keys(COLOR_MAPPING).filter(k => k.startsWith('bg-')).length,
      border: Object.keys(COLOR_MAPPING).filter(k => k.startsWith('border-')).length,
      hover: Object.keys(COLOR_MAPPING).filter(k => k.startsWith('hover:')).length,
      gradient: Object.keys(COLOR_MAPPING).filter(k => k.startsWith('from-') || k.startsWith('to-') || k.startsWith('via-')).length,
    }
  };
}
