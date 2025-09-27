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
        // Ailydian Premium Neon Color Palette - www.ailydian.com inspired
        ailydian: {
          primary: '#FF214D',      // --ac-1: Ana Neon Kırmızı
          secondary: '#FF6A45',    // --ac-2: Ana Neon Turuncu
          dark: '#FF0844',         // Koyu Neon Kırmızı
          bg: '#0A0A0B',          // --bg-0: Ultra Karanlık Arka Plan
          'bg-card': '#111113',    // Kart Arka Planı
          'bg-hover': '#1a1a1c',   // Hover Arka Planı
          text: '#F3F4F6',        // --tx-1: Ana Beyaz Yazı
          'text-secondary': '#E5E7EB',
          'text-muted': '#9CA3AF',
          'text-dim': '#6B7280',
          accent: '#FF3366',       // Ekstra Neon Aksanı
          glow: '#FF214D40',       // Glow efekti için
          'neon-blue': '#00D4FF',  // Neon Mavi
          'neon-purple': '#B347FF', // Neon Mor
          'neon-green': '#39FF14', // Neon Yeşil
          'neon-yellow': '#FFFF33' // Neon Sarı
        },
        primary: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#FF214D',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337'
        },
        secondary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#FF6A45',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12'
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
        'neon': '0 0 5px #FF214D, 0 0 20px #FF214D, 0 0 35px #FF214D',
        'neon-lg': '0 0 10px #FF214D, 0 0 30px #FF214D, 0 0 60px #FF214D',
        'neon-orange': '0 0 5px #FF6A45, 0 0 20px #FF6A45, 0 0 35px #FF6A45',
        'neon-blue': '0 0 5px #00D4FF, 0 0 20px #00D4FF, 0 0 35px #00D4FF',
        'neon-purple': '0 0 5px #B347FF, 0 0 20px #B347FF, 0 0 35px #B347FF',
        'glow': '0 0 20px rgba(255, 33, 77, 0.3)',
        'glow-lg': '0 0 40px rgba(255, 33, 77, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(255, 33, 77, 0.2)'
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
          '0%, 100%': { boxShadow: '0 0 5px #FF214D, 0 0 20px #FF214D, 0 0 35px #FF214D' },
          '50%': { boxShadow: '0 0 10px #FF214D, 0 0 30px #FF214D, 0 0 60px #FF214D' }
        },
        neonPulse: {
          '0%': { textShadow: '0 0 5px #FF214D, 0 0 10px #FF214D, 0 0 20px #FF214D' },
          '100%': { textShadow: '0 0 10px #FF214D, 0 0 20px #FF214D, 0 0 40px #FF214D' }
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
        'neon-gradient': 'linear-gradient(45deg, #FF214D, #FF6A45, #00D4FF)',
        'dark-gradient': 'linear-gradient(135deg, #0A0A0B 0%, #1a1a1c 100%)',
        'shimmer': 'linear-gradient(110deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)'
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
        '4xl': '2rem'
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
          color: '#FF214D',
          textShadow: '0 0 5px #FF214D, 0 0 10px #FF214D, 0 0 20px #FF214D'
        },
        '.text-neon-orange': {
          color: '#FF6A45',
          textShadow: '0 0 5px #FF6A45, 0 0 10px #FF6A45, 0 0 20px #FF6A45'
        },
        '.text-neon-blue': {
          color: '#00D4FF',
          textShadow: '0 0 5px #00D4FF, 0 0 10px #00D4FF, 0 0 20px #00D4FF'
        },
        '.border-neon': {
          borderColor: '#FF214D',
          boxShadow: '0 0 5px #FF214D, 0 0 10px #FF214D'
        },
        '.bg-glass': {
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        },
        '.bg-glass-dark': {
          background: 'rgba(10, 10, 11, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 33, 77, 0.2)'
        }
      };
      addUtilities(newUtilities);
    }
  ],
}
