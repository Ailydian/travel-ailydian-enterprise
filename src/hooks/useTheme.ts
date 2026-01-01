import { useState, useEffect, useCallback } from 'react';
import logger from '../lib/logger';

export interface ThemeColors {
  'ac-1': string;    // Primary accent
  'ac-2': string;    // Secondary accent  
  'ac-3': string;    // Tertiary accent
  'bg-0': string;    // Main background
  'bg-1': string;    // Secondary background
  'tx-1': string;    // Primary text
  'tx-2': string;    // Secondary text
  'tx-3': string;    // Tertiary text
}

export interface Theme {
  name: string;
  label: string;
  colors: ThemeColors;
  description: string;
}

// Premium Theme Presets
export const themes: Record<string, Theme> = {
  ocean: {
    name: 'ocean',
    label: 'Ocean Blue',
    description: 'Sakin ve profesyonel deniz teması',
    colors: {
      'ac-1': '#0ea5e9',
      'ac-2': 'var(--lydian-accent-cyan)', 
      'ac-3': '#0284c7',
      'bg-0': 'var(--lydian-text-inverse)',
      'bg-1': '#f8fafc',
      'tx-1': '#1e293b',
      'tx-2': '#334155',
      'tx-3': '#64748b'
    }
  },
  
  premium: {
    name: 'premium',
    label: 'Premium Red',
    description: 'Lüks ve dinamik premium tema',
    colors: {
      'ac-1': '#FF214D',
      'ac-2': '#FF6A45',
      'ac-3': '#FF8A65',
      'bg-0': 'var(--lydian-text-inverse)',
      'bg-1': '#f8fafc',
      'tx-1': '#1e293b',
      'tx-2': '#334155',
      'tx-3': '#64748b'
    }
  },

  emerald: {
    name: 'emerald',
    label: 'Emerald Green',
    description: 'Doğal ve huzur verici yeşil tema',
    colors: {
      'ac-1': 'var(--lydian-success)',
      'ac-2': '#34d399',
      'ac-3': '#6ee7b7',
      'bg-0': 'var(--lydian-text-inverse)',
      'bg-1': '#f0fdf4',
      'tx-1': '#1e293b',
      'tx-2': '#334155',
      'tx-3': '#64748b'
    }
  },

  purple: {
    name: 'purple',
    label: 'Royal Purple',
    description: 'Yaratıcı ve modern mor tema',
    colors: {
      'ac-1': 'var(--lydian-accent-purple)',
      'ac-2': '#a78bfa',
      'ac-3': '#c4b5fd',
      'bg-0': 'var(--lydian-text-inverse)',
      'bg-1': '#faf5ff',
      'tx-1': '#1e293b',
      'tx-2': '#334155',
      'tx-3': '#64748b'
    }
  },

  sunset: {
    name: 'sunset',
    label: 'Sunset Orange',
    description: 'Sıcak ve enerji dolu gün batımı tema',
    colors: {
      'ac-1': '#f97316',
      'ac-2': '#fb923c',
      'ac-3': '#fdba74',
      'bg-0': 'var(--lydian-text-inverse)',
      'bg-1': '#fff7ed',
      'tx-1': '#1e293b',
      'tx-2': '#334155',
      'tx-3': '#64748b'
    }
  },

  dark: {
    name: 'dark',
    label: 'Dark Mode',
    description: 'Göz dostu karanlık tema',
    colors: {
      'ac-1': '#FF214D',
      'ac-2': '#FF6A45',
      'ac-3': '#FF8A65',
      'bg-0': '#0f172a',
      'bg-1': '#1e293b',
      'tx-1': '#f8fafc',
      'tx-2': '#cbd5e1',
      'tx-3': '#94a3b8'
    }
  }
};

// Theme detection utilities
const getSystemThemePreference = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

const getTimeBasedTheme = (): string => {
  const hour = new Date().getHours();
  
  if (hour >= 6 && hour < 12) {
    return 'ocean'; // Morning - calm blue
  } else if (hour >= 12 && hour < 17) {
    return 'emerald'; // Afternoon - energetic green
  } else if (hour >= 17 && hour < 20) {
    return 'sunset'; // Evening - warm sunset
  } else {
    return 'dark'; // Night - dark theme
  }
};

const getSeasonalTheme = (): string => {
  const month = new Date().getMonth(); // 0-11
  
  if (month >= 2 && month <= 4) {
    return 'emerald'; // Spring - green
  } else if (month >= 5 && month <= 7) {
    return 'ocean'; // Summer - blue
  } else if (month >= 8 && month <= 10) {
    return 'sunset'; // Autumn - orange
  } else {
    return 'purple'; // Winter - purple
  }
};

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<string>('premium');
  const [autoMode, setAutoMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Apply theme to CSS custom properties
  const applyTheme = useCallback((themeKey: string) => {
    const theme = themes[themeKey];
    if (!theme || typeof document === 'undefined') return;

    const root = document.documentElement;
    
    // Apply all color variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    // Apply theme class to body
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${themeKey}`);
    
    // Store theme preference
    localStorage.setItem('travel-lydian-theme', themeKey);
    localStorage.setItem('travel-lydian-theme-auto', autoMode.toString());
  }, [autoMode]);

  // Change theme with smooth transition
  const changeTheme = useCallback((themeKey: string) => {
    if (!themes[themeKey]) return;
    
    setIsLoading(true);
    
    // Add transition class
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('theme-transitioning');
    }
    
    // Apply new theme after a short delay for smooth transition
    setTimeout(() => {
      setCurrentTheme(themeKey);
      applyTheme(themeKey);
      setIsLoading(false);
      
      // Remove transition class
      setTimeout(() => {
        if (typeof document !== 'undefined') {
          document.documentElement.classList.remove('theme-transitioning');
        }
      }, 300);
    }, 100);
  }, [applyTheme]);

  // Auto theme detection
  const enableAutoMode = useCallback((mode: 'time' | 'season' | 'system' | 'disable') => {
    setAutoMode(mode !== 'disable');
    
    let selectedTheme: string;
    
    switch (mode) {
      case 'time':
        selectedTheme = getTimeBasedTheme();
        break;
      case 'season':
        selectedTheme = getSeasonalTheme();
        break;
      case 'system':
        selectedTheme = getSystemThemePreference() === 'dark' ? 'dark' : 'premium';
        break;
      default:
        return;
    }
    
    changeTheme(selectedTheme);
    localStorage.setItem('travel-lydian-auto-mode', mode);
  }, [changeTheme]);

  // Generate theme from image colors
  const generateThemeFromImage = useCallback(async (imageUrl: string): Promise<Theme | null> => {
    try {
      // This would normally use a color extraction library
      // For now, return a sample generated theme
      const generatedTheme: Theme = {
        name: 'generated',
        label: 'AI Generated',
        description: 'AI tarafından görsel analizi ile oluşturulan tema',
        colors: {
          'ac-1': '#FF214D', // This would be extracted from image
          'ac-2': '#FF6A45',
          'ac-3': '#FF8A65',
          'bg-0': 'var(--lydian-text-inverse)',
          'bg-1': '#f8fafc',
          'tx-1': '#1e293b',
          'tx-2': '#334155',
          'tx-3': '#64748b'
        }
      };
      
      return generatedTheme;
    } catch (error) {
      logger.error('Theme generation failed:', error as Error, {component:'Usetheme'});
      return null;
    }
  }, []);

  // Initialize theme on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedTheme = localStorage.getItem('travel-lydian-theme');
    const savedAutoMode = localStorage.getItem('travel-lydian-theme-auto') === 'true';
    const savedAutoModeType = localStorage.getItem('travel-lydian-auto-mode');

    setAutoMode(savedAutoMode);

    if (savedAutoMode && savedAutoModeType && savedAutoModeType !== 'disable') {
      enableAutoMode(savedAutoModeType as 'time' | 'season' | 'system');
    } else if (savedTheme && themes[savedTheme]) {
      changeTheme(savedTheme);
    } else {
      // Default to premium theme
      changeTheme('premium');
    }
  }, [changeTheme, enableAutoMode]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined' || !autoMode) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const autoModeType = localStorage.getItem('travel-lydian-auto-mode');
      if (autoModeType === 'system') {
        changeTheme(mediaQuery.matches ? 'dark' : 'premium');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [autoMode, changeTheme]);

  // Export current theme data
  const getCurrentThemeData = useCallback((): Theme | null => {
    return themes[currentTheme] || null;
  }, [currentTheme]);

  return {
    currentTheme,
    themes,
    isLoading,
    autoMode,
    changeTheme,
    enableAutoMode,
    generateThemeFromImage,
    getCurrentThemeData,
    applyTheme
  };
};