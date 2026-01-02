/**
 * Theme Toggle Button - Animated Dark/Light Mode Switcher
 * Beautiful neo-glass design with smooth animations
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme, Theme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
  variant?: 'icon' | 'dropdown';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabel = false,
  variant = 'icon',
}) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [showDropdown, setShowDropdown] = React.useState(false);

  const themes: { value: Theme; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { value: 'light', label: 'Aydınlık', icon: Sun },
    { value: 'dark', label: 'Karanlık', icon: Moon },
    { value: 'system', label: 'Sistem', icon: Monitor },
  ];

  const currentTheme = themes.find(t => t.value === theme) || themes[1];
  const Icon = currentTheme.icon;

  if (variant === 'dropdown') {
    return (
      <div className="relative">
        <motion.button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`relative p-3 rounded-xl bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-lydian-bg/10 dark:hover:bg-lydian-bg/10 transition-all duration-300 group ${className}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative w-6 h-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ rotate: -180, opacity: 0, scale: 0 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 180, opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
              >
                <Icon className="w-6 h-6 text-gray-400 dark:text-gray-300 group-hover:text-white dark:group-hover:text-white" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/20 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
        </motion.button>

        {/* Dropdown */}
        <AnimatePresence>
          {showDropdown && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowDropdown(false)}
              />

              {/* Dropdown Menu */}
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 z-50 bg-lydian-bg/10 dark:bg-gray-900/90 backdrop-blur-2xl rounded-2xl border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden"
              >
                {themes.map((themeOption) => {
                  const OptionIcon = themeOption.icon;
                  const isActive = theme === themeOption.value;

                  return (
                    <button
                      key={themeOption.value}
                      onClick={() => {
                        setTheme(themeOption.value);
                        setShowDropdown(false);
                      }}
                      className={`w-full px-4 py-3 flex items-center gap-3 transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white'
                          : 'text-gray-400 dark:text-gray-300 hover:bg-white/5 dark:hover:bg-white/5'
                      }`}
                    >
                      <OptionIcon className="w-5 h-5" />
                      <span className="font-medium">{themeOption.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTheme"
                          className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}

                {/* Footer hint */}
                <div className="px-4 py-2 border-t border-white/10 dark:border-white/5">
                  <p className="text-xs text-gray-300 dark:text-gray-300">
                    {theme === 'system' && (
                      <>Sistem: {resolvedTheme === 'dark' ? 'Karanlık' : 'Aydınlık'}</>
                    )}
                    {theme !== 'system' && <>Manuel seçim aktif</>}
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Icon variant (simple toggle)
  return (
    <motion.button
      onClick={() => {
        // Toggle between light and dark (skip system for quick toggle)
        if (theme === 'light') setTheme('dark');
        else if (theme === 'dark') setTheme('light');
        else setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
      }}
      className={`relative p-3 rounded-xl bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-lydian-bg/10 dark:hover:bg-lydian-bg/10 transition-all duration-300 group ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={resolvedTheme}
            initial={{ rotate: -180, opacity: 0, scale: 0 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 180, opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
          >
            {resolvedTheme === 'dark' ? (
              <Moon className="w-6 h-6 text-blue-400 dark:text-blue-300" />
            ) : (
              <Sun className="w-6 h-6 text-yellow-500" />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/20 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />

      {/* Label */}
      {showLabel && (
        <span className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-300 group-hover:text-white dark:group-hover:text-white">
          {resolvedTheme === 'dark' ? 'Karanlık' : 'Aydınlık'}
        </span>
      )}
    </motion.button>
  );
};

export default ThemeToggle;
