import { useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'claudia_theme';
const THEME_ATTRIBUTE = 'data-theme';

/**
 * Custom hook for managing application theme
 * Supports light and dark themes with system preference detection
 */
export const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [systemTheme, setSystemTheme] = useState<Theme>('light');

  // Detect system theme preference
  const detectSystemTheme = useCallback((): Theme => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  }, []);

  // Get stored theme or system preference
  const getInitialTheme = useCallback((): Theme => {
    if (typeof window === 'undefined') return 'light';
    
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (stored && (stored === 'light' || stored === 'dark')) {
      return stored;
    }
    
    return detectSystemTheme();
  }, [detectSystemTheme]);

  // Apply theme to document
  const applyTheme = useCallback((newTheme: Theme) => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute(THEME_ATTRIBUTE, newTheme);
      
      // Also set class for compatibility
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(newTheme);
    }
  }, []);

  // Set theme and persist to localStorage
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  }, [applyTheme]);

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  // Initialize theme on mount
  useEffect(() => {
    const initialTheme = getInitialTheme();
    const currentSystemTheme = detectSystemTheme();
    
    setThemeState(initialTheme);
    setSystemTheme(currentSystemTheme);
    applyTheme(initialTheme);
  }, [getInitialTheme, detectSystemTheme, applyTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      setSystemTheme(newSystemTheme);
      
      // If no theme is stored, follow system preference
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (!storedTheme) {
        setTheme(newSystemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setTheme]);

  return {
    theme,
    systemTheme,
    setTheme,
    toggleTheme,
    isSystemTheme: !localStorage.getItem(THEME_STORAGE_KEY),
  };
};
