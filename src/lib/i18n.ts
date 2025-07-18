import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation resources
import zhTranslation from '../locales/zh.json';
import enTranslation from '../locales/en.json';

const resources = {
  zh: {
    translation: zhTranslation,
  },
  en: {
    translation: enTranslation,
  },
};

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    
    // Default language
    lng: 'zh',
    
    // Fallback language
    fallbackLng: 'en',
    
    // Debug mode (disable in production)
    debug: process.env.NODE_ENV === 'development',
    
    // Language detection options
    detection: {
      // Order of language detection methods
      order: ['localStorage', 'navigator', 'htmlTag'],
      
      // Cache user language
      caches: ['localStorage'],
    },
    
    // Interpolation options
    interpolation: {
      // React already escapes values
      escapeValue: false,
    },
    
    // Supported languages
    supportedLngs: ['zh', 'en'],
    
    // Namespace configuration
    defaultNS: 'translation',
    
    // Key separator
    keySeparator: '.',
    
    // Nested separator
    nsSeparator: ':',
  });

export default i18n;