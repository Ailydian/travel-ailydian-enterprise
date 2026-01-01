/**
 * Theme Provider - Production-Grade Dark/Light Mode System
 *
 * Features:
 * - Automatic system preference detection
 * - LocalStorage persistence
 * - Smooth transitions (300ms)
 * - No flash of wrong theme (FOUT prevention)
 * - SSR compatible
 * - TypeScript strict mode
 *
 * @version 2.0.0
 * @author Travel LyDian Elite Frontend Team
 */

'use client';

import React from 'react';
import { ThemeProvider as ThemeContextProvider } from '../context/ThemeContext';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
  storageKey?: string;
}

/**
 * Theme Provider Component
 *
 * Wraps the application with theme context and manages theme state.
 * Should be placed in the root layout.
 *
 * @example
 * ```tsx
 * <ThemeProvider defaultTheme="system">
 *   <YourApp />
 * </ThemeProvider>
 * ```
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  storageKey = 'travel-lydian-theme',
}) => {
  return (
    <ThemeContextProvider defaultTheme={defaultTheme} storageKey={storageKey}>
      {children}
    </ThemeContextProvider>
  );
};

export default ThemeProvider;
