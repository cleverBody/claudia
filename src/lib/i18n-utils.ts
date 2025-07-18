import React from 'react';
import i18n from './i18n';
import type { TranslationKey } from '@/types/i18n';

/**
 * Translates a key without using the hook (for non-component contexts)
 * @param key Translation key
 * @param options Translation options
 * @returns Translated string
 */
export function translate(key: TranslationKey | string, options?: any): string {
  try {
    const result = i18n.t(key, options);
    return typeof result === 'string' ? result : key;
  } catch (error) {
    console.error(`Translation error for key "${key}":`, error);
    return key;
  }
}

/**
 * Formats a date according to the current locale
 * @param date Date to format
 * @param options Date formatting options
 * @returns Formatted date string
 */
export function formatDate(date: Date | number, options?: Intl.DateTimeFormatOptions): string {
  const locale = i18n.language === 'zh' ? 'zh-CN' : 'en-US';
  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * Formats a number according to the current locale
 * @param number Number to format
 * @param options Number formatting options
 * @returns Formatted number string
 */
export function formatNumber(number: number, options?: Intl.NumberFormatOptions): string {
  const locale = i18n.language === 'zh' ? 'zh-CN' : 'en-US';
  return new Intl.NumberFormat(locale, options).format(number);
}

/**
 * Checks if the current language is Chinese
 * @returns True if current language is Chinese
 */
export function isChinese(): boolean {
  return i18n.language === 'zh';
}

/**
 * Gets the current language
 * @returns Current language code
 */
export function getCurrentLanguage(): string {
  return i18n.language;
}

/**
 * Changes the application language
 * @param lang Language code to change to
 * @returns Promise that resolves when language is changed
 */
export async function changeLanguage(lang: string): Promise<void> {
  await i18n.changeLanguage(lang);
}

/**
 * Gets all available languages
 * @returns Array of available language codes
 */
export function getAvailableLanguages(): string[] {
  const langs = i18n.options.supportedLngs;
  if (Array.isArray(langs)) {
    return langs.filter((lng: string) => lng !== 'cimode');
  }
  return [];
}

/**
 * Creates a translation context provider component
 * @param Component Component to wrap with translation context
 * @returns Wrapped component with translation context
 */
export function withTranslation<P extends object>(Component: React.ComponentType<P>): React.FC<P> {
  const WrappedComponent: React.FC<P> = (props: P) => {
    return React.createElement(Component, props);
  };
  return WrappedComponent;
}