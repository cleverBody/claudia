import { useTranslation as useI18nTranslation } from 'react-i18next';
import type { TranslationKey } from '@/types/i18n';

/**
 * Enhanced useTranslation hook with type safety and additional utilities
 */
export function useTranslation() {
  const { t: originalT, i18n, ready } = useI18nTranslation();

  // Type-safe translation function
  const t = (key: TranslationKey | string, options?: any): string => {
    try {
      const result = originalT(key, options);
      
      // In development, warn about missing translations
      if (process.env.NODE_ENV === 'development' && result === key) {
        console.warn(`Missing translation for key: ${key}`);
      }
      
      // Ensure we always return a string
      return typeof result === 'string' ? result : key;
    } catch (error) {
      console.error(`Translation error for key "${key}":`, error);
      return key;
    }
  };

  // Helper function to check if a translation exists
  const exists = (key: TranslationKey | string): boolean => {
    return i18n.exists(key);
  };

  // Helper function to get current language
  const getCurrentLanguage = (): string => {
    return i18n.language;
  };

  // Helper function to change language
  const changeLanguage = async (lng: string): Promise<void> => {
    try {
      await i18n.changeLanguage(lng);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  // Helper function to get available languages
  const getAvailableLanguages = (): string[] => {
    const langs = i18n.options.supportedLngs;
    if (Array.isArray(langs)) {
      return langs.filter((lng: string) => lng !== 'cimode');
    }
    return [];
  };

  // Helper function for pluralization
  const tPlural = (key: TranslationKey | string, count: number, options?: any): string => {
    return t(key, { count, ...options });
  };

  // Helper function for interpolation
  const tInterpolate = (key: TranslationKey | string, values: Record<string, any>): string => {
    return t(key, values);
  };

  return {
    t,
    i18n,
    ready,
    exists,
    getCurrentLanguage,
    changeLanguage,
    getAvailableLanguages,
    tPlural,
    tInterpolate,
  };
}

// Re-export the original hook for compatibility
export { useTranslation as useI18nTranslation } from 'react-i18next';