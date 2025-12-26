/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Travel LyDian - Booking.com Style Red Theme
        // Professional, Modern, Trust-Building Color Palette
        lydian: {
          // Primary Red (Main CTA, Links, Active States)
          primary: '#DC2626',      // red-600 - Main Red
          secondary: '#EF4444',    // red-500 - Secondary Red
          dark: '#991B1B',         // red-800 - Dark Red
          light: '#FCA5A5',        // red-300 - Light Red

          // Backgrounds (White & Clean)
          bg: '#FFFFFF',           // Pure White Background
          'bg-card': '#FFFFFF',    // Card Background (white)
          'bg-surface': '#F9FAFB', // Surface Background (very light gray)
          'bg-hover': '#F3F4F6',   // Hover Background
          'bg-selected': '#FEF2F2',// Selected Background (red tint)

          // Text Colors (High Contrast for Readability)
          text: '#111827',         // Primary Text (gray-900)
          'text-secondary': '#374151', // Secondary Text (gray-700)
          'text-muted': '#6B7280', // Muted Text (gray-500)
          'text-dim': '#9CA3AF',   // Dim Text (gray-400)

          // Accent & Highlights
          accent: '#DC2626',       // Accent Red
          success: '#059669',      // Success Green (booking confirmations)
          warning: '#F59E0B',      // Warning Orange
          error: '#DC2626',        // Error Red
          info: '#3B82F6',         // Info Blue

          // Borders
          border: '#E5E7EB',       // Default Border (gray-200)
          'border-light': '#F3F4F6', // Light Border
          'border-dark': '#D1D5DB', // Dark Border
        },

        // Extended Red Palette (Booking.com style)
        primary: {
          50: '#FEF2F2',   // Lightest red
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',  // Main primary
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',  // Darkest red
        },

        // Neutral Grays (for text, borders, backgrounds)
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },

        // Success/Trust Color (Green for confirmations)
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Orbitron', 'monospace'] // Futuristik display font
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.05' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }]
      },
      boxShadow: {
        // Booking.com Style Shadows - Subtle & Professional
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'DEFAULT': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'md': '0 6px 12px -2px rgba(0, 0, 0, 0.1), 0 3px 7px -3px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 6px 10px -4px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 40px -4px rgba(0, 0, 0, 0.1), 0 8px 16px -6px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

        // Card & Component Shadows
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'header': '0 2px 4px rgba(0, 0, 0, 0.06)',
        'dropdown': '0 10px 25px rgba(0, 0, 0, 0.15)',

        // Red Accent Shadows (for buttons, badges)
        'red': '0 4px 12px rgba(220, 38, 38, 0.2)',
        'red-lg': '0 8px 24px rgba(220, 38, 38, 0.25)',

        // Inner shadows
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'inner-lg': 'inset 0 4px 8px 0 rgba(0, 0, 0, 0.1)',

        // No shadow
        'none': 'none',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-right': 'slideRight 0.4s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'neon-pulse': 'neonPulse 1.5s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'text-shimmer': 'textShimmer 2.5s ease-in-out infinite',
        'gradient-shift': 'gradientShift 3s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideRight: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px #059669, 0 0 20px #059669, 0 0 35px #059669' },
          '50%': { boxShadow: '0 0 10px #059669, 0 0 30px #059669, 0 0 60px #059669' }
        },
        neonPulse: {
          '0%': { textShadow: '0 0 5px #059669, 0 0 10px #059669, 0 0 20px #059669' },
          '100%': { textShadow: '0 0 10px #059669, 0 0 20px #059669, 0 0 40px #059669' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' }
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        glowPulse: {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.8', filter: 'brightness(1.2)' }
        },
        textShimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'neon-gradient': 'linear-gradient(45deg, #059669, #10b981, #34d399)',
        'dark-gradient': 'linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)',
        'shimmer': 'linear-gradient(110deg, transparent 40%, rgba(5, 150, 105, 0.1) 50%, transparent 60%)'
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '40px'
      },
      spacing: {
        '128': '32rem',
        '144': '36rem'
      },
      borderRadius: {
        'none': '0px',
        'sm': '0.25rem',    // 4px - Small elements
        'DEFAULT': '0.375rem', // 6px - Booking.com standard
        'md': '0.5rem',     // 8px - Cards, buttons
        'lg': '0.75rem',    // 12px - Large cards
        'xl': '1rem',       // 16px - Modals
        '2xl': '1.25rem',   // 20px
        '3xl': '1.5rem',    // 24px
        '4xl': '2rem',      // 32px
        'full': '9999px',   // Pills, badges
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100'
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-neon': {
          color: '#059669',
          textShadow: '0 0 5px #059669, 0 0 10px #059669, 0 0 20px #059669'
        },
        '.text-neon-orange': {
          color: '#10b981',
          textShadow: '0 0 5px #10b981, 0 0 10px #10b981, 0 0 20px #10b981'
        },
        '.text-neon-blue': {
          color: '#059669',
          textShadow: '0 0 5px #059669, 0 0 10px #059669, 0 0 20px #059669'
        },
        '.border-neon': {
          borderColor: '#059669',
          boxShadow: '0 0 5px #059669, 0 0 10px #059669'
        },
        '.bg-glass': {
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(5, 150, 105, 0.1)'
        },
        '.bg-glass-dark': {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(5, 150, 105, 0.2)'
        }
      };
      addUtilities(newUtilities);
    }
  ],
}
