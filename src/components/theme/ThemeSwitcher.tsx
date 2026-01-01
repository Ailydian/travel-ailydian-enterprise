import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Palette,
  Sun,
  Moon,
  Droplets,
  Leaf,
  Crown,
  Sunset,
  Clock,
  Calendar,
  Monitor,
  Sparkles,
  ChevronDown } from
'lucide-react';
import { useTheme, themes } from '@/hooks/useTheme';

const themeIcons = {
  ocean: Droplets,
  premium: Crown,
  emerald: Leaf,
  purple: Crown,
  sunset: Sunset,
  dark: Moon
};

const ThemeSwitcher: React.FC = () => {
  const {
    currentTheme,
    changeTheme,
    enableAutoMode,
    autoMode,
    isLoading,
    getCurrentThemeData
  } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [showAutoOptions, setShowAutoOptions] = useState(false);

  const currentThemeData = getCurrentThemeData();
  const CurrentIcon = currentThemeData ? themeIcons[currentThemeData.name as keyof typeof themeIcons] || Palette : Palette;

  return (
    <div className="relative z-50">
      {/* Theme Switcher Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded-xl glass-premium hover-lift shadow-premium transition-all duration-300 flex items-center gap-2"
          style={{
            background: `linear-gradient(135deg, ${currentThemeData?.colors['ac-1']}22, ${currentThemeData?.colors['ac-2']}22)`
          }}>

        {isLoading ?
          <motion.div
            style={{
              borderTopColor: currentThemeData?.colors['ac-1'],
              borderRightColor: currentThemeData?.colors['ac-2']
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>

            <div className="w-5 h-5 border-2 border-lydian-border rounded-full" />
          </motion.div> :

          <CurrentIcon
            className="w-5 h-5"
            style={{ color: currentThemeData?.colors['ac-1'] }} />

          }
        
        <span className="hidden md:inline-block text-sm font-medium" style={{ color: currentThemeData?.colors['tx-1'] }}>
          {currentThemeData?.label || 'Tema'}
        </span>
        
        <ChevronDown
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            style={{ color: currentThemeData?.colors['tx-2'] }} />

        </button>
      </motion.div>

      {/* Simple Theme Dropdown */}
      <AnimatePresence>
        {isOpen &&
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}>

            <div className="absolute top-full right-0 mt-2 w-64 bg-lydian-glass-dark rounded-xl shadow-xl border border-lydian-border-light/10 overflow-hidden">
              <div className="p-4">
              <h3 className="font-semibold text-lydian-text-inverse mb-3">Tema Seçimi</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.values(themes).map((theme) => {
                  const ThemeIcon = themeIcons[theme.name as keyof typeof themeIcons] || Palette;
                  const isActive = currentTheme === theme.name;

                  return (
                    <button
                      key={theme.name}
                      onClick={() => {
                        changeTheme(theme.name);
                        setIsOpen(false);
                      }}
                      className={`p-2 rounded-lg border transition-all ${
                      isActive ?
                      'border-lydian-primary bg-blue-50' :
                      'border-white/10 hover:border-white/20'}`
                      }>

                      <div className="flex items-center gap-2">
                        <ThemeIcon
                          className="w-4 h-4"
                          style={{ color: theme.colors['ac-1'] }} />

                        <span className="text-sm font-medium">{theme.label}</span>
                      </div>
                    </button>);

                })}
              </div>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Backdrop */}
      {isOpen &&
      <div
        className="fixed inset-0 bg-lydian-bg-hover"
        onClick={() => setIsOpen(false)} />

      }
    </div>);

};

export default ThemeSwitcher;