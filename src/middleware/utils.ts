/**
 * Middleware Utilities
 * Shared helper functions for middleware processing
 */

import type { Locale } from '@/config/slug-mappings'

// Bot detection pattern for SEO crawlers
export const BOT_PATTERN = /bot|crawl|spider|semrush|ahrefs|googlebot|bingbot|yandex|baidu|duckduck|facebookexternalhit|linkedinbot|twitterbot|slurp|msnbot|siteauditbot|screaming|lighthouse|pagespeed|gtmetrix|pingdom|uptimerobot/i

/**
 * Check if user agent is a bot/crawler
 */
export function isBot(userAgent: string | null): boolean {
  if (!userAgent) return false
  return BOT_PATTERN.test(userAgent)
}

/**
 * Extract locale and path without locale prefix from pathname
 */
export function getLocaleFromPathname(pathname: string): { 
  locale: Locale
  pathWithoutLocale: string 
} {
  if (pathname.startsWith('/en/') || pathname === '/en') {
    return { locale: 'en', pathWithoutLocale: pathname.slice(3) || '/' }
  }
  if (pathname.startsWith('/ru/') || pathname === '/ru') {
    return { locale: 'ru', pathWithoutLocale: pathname.slice(3) || '/' }
  }
  return { locale: 'de', pathWithoutLocale: pathname }
}

/**
 * Build redirect URL with proper locale prefix
 */
export function buildRedirectUrl(
  origin: string,
  locale: Locale,
  path: string,
  search: string = ''
): string {
  const localePrefix = locale === 'de' ? '' : `/${locale}`
  return `${origin}${localePrefix}${path}${search}`
}
