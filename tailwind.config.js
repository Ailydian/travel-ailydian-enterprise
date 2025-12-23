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
        // Ailydian Green Color Palette - Clean & Professional
        ailydian: {
          primary: '#059669',      // Emerald 600 - Ana Yeşil
          secondary: '#10b981',    // Emerald 500 - İkincil Yeşil
          dark: '#047857',         // Emerald 700 - Koyu Yeşil
          bg: '#FFFFFF',          // Beyaz Arka Plan
          'bg-card': '#F9FAFB',    // Kart Arka Planı
          'bg-hover': '#F3F4F6',   // Hover Arka Planı
          text: '#111827',        // Ana Koyu Yazı
          'text-secondary': '#374151',
          'text-muted': '#6B7280',
          'text-dim': '#9CA3AF',
          accent: '#059669',       // Aksanı Yeşil
          glow: '#05966940',       // Glow efekti için
          'neon-blue': '#059669',  // Tüm neon renkler yeşil
          'neon-purple': '#059669',
          'neon-green': '#10b981',
          'neon-yellow': '#10b981'
        },
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b'
        },
        secondary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b'
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
        'neon': '0 0 5px #059669, 0 0 20px #059669, 0 0 35px #059669',
        'neon-lg': '0 0 10px #059669, 0 0 30px #059669, 0 0 60px #059669',
        'neon-orange': '0 0 5px #10b981, 0 0 20px #10b981, 0 0 35px #10b981',
        'neon-blue': '0 0 5px #059669, 0 0 20px #059669, 0 0 35px #059669',
        'neon-purple': '0 0 5px #059669, 0 0 20px #059669, 0 0 35px #059669',
        'glow': '0 0 20px rgba(5, 150, 105, 0.3)',
        'glow-lg': '0 0 40px rgba(5, 150, 105, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(5, 150, 105, 0.2)'
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
