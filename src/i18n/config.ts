// All available locales (used for routing)
export const locales = ['de', 'en', 'ru'] as const
export type Locale = (typeof locales)[number]

// Locales shown in the language switcher
export const visibleLocales = ['de', 'en', 'ru'] as const
export type VisibleLocale = (typeof visibleLocales)[number]

export const defaultLocale: Locale = 'de'

export const localeNames: Record<Locale, string> = {
  de: 'Deutsch',
  en: 'English',
  ru: 'Русский',
}

export const localeFlags: Record<Locale, string> = {
  de: '🇦🇹', // Austrian flag for .at domain
  en: '🇺🇸', // US flag for .us domain
  ru: '🇷🇺', // Russian flag
}

// Domain to locale mapping
export const domainLocaleMap: Record<string, Locale> = {
  'goldenwing.at': 'de',
  'www.goldenwing.at': 'de',
  'goldenwing.us': 'en',
  'www.goldenwing.us': 'en',
  // Add more domains as needed
}

// Office-specific configuration
export const officeConfig = {
  vienna: {
    domain: 'goldenwing.at',
    locale: 'de' as Locale,
    isHQ: true,
  },
  citrusHeights: {
    domain: 'goldenwing.us',
    locale: 'en' as Locale,
    isHQ: false,
  },
  dubai: {
    domain: 'goldenwing.ae', // Future domain
    locale: 'en' as Locale,
    isHQ: false,
  },
} as const
