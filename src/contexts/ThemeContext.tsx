import React, { createContext, useContext, ReactNode } from 'react';
import { useTheme, type Theme } from '@/hooks/useTheme';

interface ThemeContextType {
  theme: Theme;
  systemTheme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isSystemTheme: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Theme provider component that manages application theme state
 * Wraps the app to provide theme context to all components
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themeHook = useTheme();

  return (
    <ThemeContext.Provider value={themeHook}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to access theme context
 * Must be used within a ThemeProvider
 */
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
