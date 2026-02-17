// ============================================================
// GOLDENWING MIDDLEWARE - NEW STRUCTURE 2025
// ============================================================
// 6 Main Services with 31 Sub-Services
// Validates slugs in middleware BEFORE page rendering
//
// IMPORTANT: All slug mappings are imported from the central
// @/config/slug-mappings.ts - SINGLE SOURCE OF TRUTH
// DO NOT DUPLICATE MAPPINGS HERE!
// ============================================================

import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'
import {
  SERVICE_SLUGS,
  SUB_SERVICE_SLUGS,
  REFERENCE_SLUGS,
  BLOG_CATEGORY_SLUGS,
  PACKAGE_SLUGS,
  BLOG_POST_SLUGS,
  LEGACY_SERVICE_REDIRECTS,
  EN_ONLY_BLOG_POSTS,
  type Locale,
} from '@/config/slug-mappings'

// ============================================================
// BOT DETECTION - Prevent redirect loops for SEO crawlers
// ============================================================
const BOT_PATTERN = /bot|crawl|spider|semrush|ahrefs|googlebot|bingbot|yandex|baidu|duckduck|facebookexternalhit|linkedinbot|twitterbot|slurp|msnbot|siteauditbot|screaming|lighthouse|pagespeed|gtmetrix|pingdom|uptimerobot/i

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function getLocaleFromPathname(pathname: string): { locale: Locale; pathWithoutLocale: string } {
  if (pathname.startsWith('/en/') || pathname === '/en') {
    return { locale: 'en', pathWithoutLocale: pathname.slice(3) || '/' }
  }
  if (pathname.startsWith('/ru/') || pathname === '/ru') {
    return { locale: 'ru', pathWithoutLocale: pathname.slice(3) || '/' }
  }
  return { locale: 'de', pathWithoutLocale: pathname }
}

function getLegacyServiceRedirect(slug: string): string | null {
  return LEGACY_SERVICE_REDIRECTS[slug] || null
}

function getCorrectServiceSlug(slug: string, locale: Locale): string | null {
  // First check for legacy redirects
  const legacyRedirect = getLegacyServiceRedirect(slug)
  if (legacyRedirect) {
    // Legacy redirect gives DE slug, but we need EN slug for EN locale
    if (locale === 'en') {
      const enSlug = SERVICE_SLUGS.de[legacyRedirect as keyof typeof SERVICE_SLUGS.de]
      return enSlug || legacyRedirect
    }
    return legacyRedirect
  }

  // If locale is EN, check if slug is a DE slug that needs translation
  if (locale === 'en') {
    const expectedEnSlug = SERVICE_SLUGS.de[slug as keyof typeof SERVICE_SLUGS.de]
    if (expectedEnSlug && expectedEnSlug !== slug) {
      return expectedEnSlug
    }
  }
  // If locale is DE, check if slug is an EN slug that needs translation
  else {
    const expectedDeSlug = SERVICE_SLUGS.en[slug as keyof typeof SERVICE_SLUGS.en]
    if (expectedDeSlug && expectedDeSlug !== slug) {
      return expectedDeSlug
    }
  }
  return null
}

function getCorrectSubServiceSlug(slug: string, locale: Locale): string | null {
  if (locale === 'en') {
    const expectedEnSlug = SUB_SERVICE_SLUGS.de[slug as keyof typeof SUB_SERVICE_SLUGS.de]
    if (expectedEnSlug && expectedEnSlug !== slug) {
      return expectedEnSlug
    }
  } else {
    const expectedDeSlug = SUB_SERVICE_SLUGS.en[slug as keyof typeof SUB_SERVICE_SLUGS.en]
    if (expectedDeSlug && expectedDeSlug !== slug) {
      return expectedDeSlug
    }
  }
  return null
}

function getCorrectReferenceSlug(slug: string, locale: Locale): string | null {
  if (locale === 'en') {
    const expectedEnSlug = REFERENCE_SLUGS.de[slug as keyof typeof REFERENCE_SLUGS.de]
    if (expectedEnSlug && expectedEnSlug !== slug) {
      return expectedEnSlug
    }
  } else {
    const expectedDeSlug = REFERENCE_SLUGS.en[slug as keyof typeof REFERENCE_SLUGS.en]
    if (expectedDeSlug && expectedDeSlug !== slug) {
      return expectedDeSlug
    }
  }
  return null
}

function getCorrectBlogCategorySlug(slug: string, locale: Locale): string | null {
  if (locale === 'en') {
    const expectedEnSlug = BLOG_CATEGORY_SLUGS.de[slug as keyof typeof BLOG_CATEGORY_SLUGS.de]
    if (expectedEnSlug && expectedEnSlug !== slug) {
      return expectedEnSlug
    }
  } else {
    const expectedDeSlug = BLOG_CATEGORY_SLUGS.en[slug as keyof typeof BLOG_CATEGORY_SLUGS.en]
    if (expectedDeSlug && expectedDeSlug !== slug) {
      return expectedDeSlug
    }
  }
  return null
}

function getCorrectPackageSlug(slug: string, locale: Locale): string | null {
  if (locale === 'en') {
    const expectedEnSlug = PACKAGE_SLUGS.de[slug as keyof typeof PACKAGE_SLUGS.de]
    if (expectedEnSlug && expectedEnSlug !== slug) {
      return expectedEnSlug
    }
  } else {
    const expectedDeSlug = PACKAGE_SLUGS.en[slug as keyof typeof PACKAGE_SLUGS.en]
    if (expectedDeSlug && expectedDeSlug !== slug) {
      return expectedDeSlug
    }
  }
  return null
}

function getCorrectBlogPostSlug(slug: string, locale: Locale): string | null {
  if (locale === 'en') {
    const expectedEnSlug = BLOG_POST_SLUGS.de[slug as keyof typeof BLOG_POST_SLUGS.de]
    if (expectedEnSlug && expectedEnSlug !== slug) {
      return expectedEnSlug
    }
  } else {
    const expectedDeSlug = BLOG_POST_SLUGS.en[slug as keyof typeof BLOG_POST_SLUGS.en]
    if (expectedDeSlug && expectedDeSlug !== slug) {
      return expectedDeSlug
    }
  }
  return null
}

// ============================================================
// SLUG VALIDATION & REDIRECT LOGIC
// ============================================================

function checkAndRedirect(request: NextRequest): NextResponse | null {
  const pathname = request.nextUrl.pathname
  const { locale, pathWithoutLocale } = getLocaleFromPathname(pathname)

  // ==============================
  // 0. PROJEKTE OVERVIEW → REFERENZEN (Duplicate Content Fix)
  // Pattern: /projekte or /projects (exact match only, not /projekte/[slug])
  // ==============================
  if (pathWithoutLocale === '/projekte' || pathWithoutLocale === '/projects') {
    const redirectPath = locale === 'en' ? '/en/references' : '/referenzen'
    return NextResponse.redirect(new URL(redirectPath, request.url), 301)
  }

  // ==============================
  // 1. SERVICE PAGES
  // Pattern: /leistungen/[slug] or /services/[slug]
  // ==============================
  const serviceMatch = pathWithoutLocale.match(/^\/(leistungen|services)\/([^\/]+)$/)
  if (serviceMatch) {
    const slug = serviceMatch[2]
    const correctSlug = getCorrectServiceSlug(slug, locale)
    if (correctSlug) {
      const basePath = locale === 'en' ? '/services' : '/leistungen'
      const redirectPath = locale === 'en' ? `/en${basePath}/${correctSlug}` : `${basePath}/${correctSlug}`
      return NextResponse.redirect(new URL(redirectPath, request.url), 301)
    }
  }

  // ==============================
  // 2. SUB-SERVICE PAGES
  // Pattern: /leistungen/[parent]/[slug] or /services/[parent]/[slug]
  // ==============================
  const subServiceMatch = pathWithoutLocale.match(/^\/(leistungen|services)\/([^\/]+)\/([^\/]+)$/)
  if (subServiceMatch) {
    const parentSlug = subServiceMatch[2]
    const subSlug = subServiceMatch[3]

    // Check legacy redirects for parent
    const legacyParent = getLegacyServiceRedirect(parentSlug)
    const correctParent = legacyParent || getCorrectServiceSlug(parentSlug, locale) || parentSlug
    const correctSub = getCorrectSubServiceSlug(subSlug, locale) || subSlug

    // If either needs correction
    if (correctParent !== parentSlug || correctSub !== subSlug) {
      const basePath = locale === 'en' ? '/services' : '/leistungen'
      const finalParent = correctParent !== parentSlug ? correctParent : parentSlug
      const finalSub = correctSub !== subSlug ? correctSub : subSlug
      const redirectPath = locale === 'en'
        ? `/en${basePath}/${finalParent}/${finalSub}`
        : `${basePath}/${finalParent}/${finalSub}`
      return NextResponse.redirect(new URL(redirectPath, request.url), 301)
    }
  }

  // ==============================
  // 3. REFERENCE PAGES
  // Pattern: /referenzen/[slug] or /references/[slug]
  // ==============================
  const referenceMatch = pathWithoutLocale.match(/^\/(referenzen|references)\/([^\/]+)$/)
  if (referenceMatch) {
    const slug = referenceMatch[2]
    const correctSlug = getCorrectReferenceSlug(slug, locale)
    if (correctSlug) {
      const basePath = locale === 'en' ? '/references' : '/referenzen'
      const redirectPath = locale === 'en' ? `/en${basePath}/${correctSlug}` : `${basePath}/${correctSlug}`
      return NextResponse.redirect(new URL(redirectPath, request.url), 301)
    }
  }

  // ==============================
  // 4. BLOG CATEGORY PAGES
  // Pattern: /blog/kategorie/[slug] or /blog/category/[slug]
  // ==============================
  const blogCategoryMatch = pathWithoutLocale.match(/^\/blog\/(kategorie|category)\/([^\/]+)$/)
  if (blogCategoryMatch) {
    const categoryPath = blogCategoryMatch[1]
    const slug = blogCategoryMatch[2]
    const correctSlug = getCorrectBlogCategorySlug(slug, locale)

    // Also check category path itself
    const correctCategoryPath = locale === 'en' ? 'category' : 'kategorie'

    if (correctSlug || categoryPath !== correctCategoryPath) {
      const finalSlug = correctSlug || slug
      const redirectPath = locale === 'en'
        ? `/en/blog/category/${finalSlug}`
        : `/blog/kategorie/${finalSlug}`
      return NextResponse.redirect(new URL(redirectPath, request.url), 301)
    }
  }

  // ==============================
  // 5. PACKAGE PAGES
  // Pattern: /leistungen/pakete/[slug] or /services/packages/[slug]
  // ==============================
  const packageMatch = pathWithoutLocale.match(/^\/(leistungen\/pakete|services\/packages)\/([^\/]+)$/)
  if (packageMatch) {
    const slug = packageMatch[2]
    const correctSlug = getCorrectPackageSlug(slug, locale)
    if (correctSlug) {
      const basePath = locale === 'en' ? '/services/packages' : '/leistungen/pakete'
      const redirectPath = locale === 'en' ? `/en${basePath}/${correctSlug}` : `${basePath}/${correctSlug}`
      return NextResponse.redirect(new URL(redirectPath, request.url), 301)
    }
  }

  // ==============================
  // 6. BLOG POST PAGES (SEO-safe 301 redirects)
  // Pattern: /blog/[slug]
  // ==============================
  const blogPostMatch = pathWithoutLocale.match(/^\/blog\/([^\/]+)$/)
  if (blogPostMatch) {
    const slug = blogPostMatch[1]
    if (slug !== 'kategorie' && slug !== 'category') {
      // Check if this is an EN-only post accessed from DE
      if (locale === 'de' && EN_ONLY_BLOG_POSTS.includes(slug as typeof EN_ONLY_BLOG_POSTS[number])) {
        return NextResponse.redirect(new URL(`/en/blog/${slug}`, request.url), 301)
      }

      const correctSlug = getCorrectBlogPostSlug(slug, locale)
      if (correctSlug) {
        const redirectPath = locale === 'en' ? `/en/blog/${correctSlug}` : `/blog/${correctSlug}`
        return NextResponse.redirect(new URL(redirectPath, request.url), 301)
      }
    }
  }

  return null // No redirect needed
}

// ============================================================
// MAIN MIDDLEWARE
// ============================================================

const intlMiddleware = createMiddleware({
  ...routing,
  // Configure locale cookie with secure settings
  localeCookie: {
    name: 'NEXT_LOCALE',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 365, // 1 year
  },
})

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const userAgent = request.headers.get('user-agent') || ''

  // Skip static files, API routes, admin
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  // ============================================================
  // BOT DETECTION - Special handling for SEO crawlers
  // Bots don't store cookies, so we handle locale via URL structure
  // CRITICAL: Ensure bots on /en/* get English content, not German!
  // ============================================================
  if (BOT_PATTERN.test(userAgent)) {
    // Only check for slug/path redirects (301/308 for correct URLs)
    const redirectResponse = checkAndRedirect(request)
    if (redirectResponse) {
      return redirectResponse
    }

    // Detect locale from URL prefix
    const hasEnPrefix = pathname.startsWith('/en/') || pathname === '/en'
    const hasRuPrefix = pathname.startsWith('/ru/') || pathname === '/ru'
    const hasDePrefix = pathname.startsWith('/de/') || pathname === '/de'
    const hasLocalePrefix = hasEnPrefix || hasRuPrefix || hasDePrefix

    // For bots WITHOUT locale prefix: Rewrite to /de/...
    // /leistungen → /de/leistungen (internal rewrite, keeps URL clean)
    if (!hasLocalePrefix) {
      const url = request.nextUrl.clone()
      if (pathname === '/') {
        url.pathname = '/de'
      } else {
        url.pathname = `/de${pathname}`
      }
      const response = NextResponse.rewrite(url)
      response.headers.set('x-pathname', pathname)
      response.headers.set('x-is-bot', 'true')
      response.headers.set('x-locale', 'de')
      return response
    }

    // For bots WITH locale prefix: Pass through directly
    // /en/services → serve English content (DO NOT rewrite to /de!)
    // /de/leistungen → serve German content
    // /ru/uslugi → serve Russian content
    const response = NextResponse.next()
    response.headers.set('x-pathname', pathname)
    response.headers.set('x-is-bot', 'true')
    // Set locale header based on URL prefix for downstream components
    if (hasEnPrefix) {
      response.headers.set('x-locale', 'en')
    } else if (hasRuPrefix) {
      response.headers.set('x-locale', 'ru')
    } else {
      response.headers.set('x-locale', 'de')
    }
    return response
  }

  // Block literal bracket URLs (e.g., /blog/[slug])
  if (pathname.includes('[') || pathname.includes(']')) {
    return new NextResponse('Not Found', { status: 404 })
  }

  // Check for slug redirects BEFORE page rendering
  const redirectResponse = checkAndRedirect(request)
  if (redirectResponse) {
    return redirectResponse
  }

  // Set request header for locale detection in notFound pages
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

  // Continue with next-intl middleware
  const response = intlMiddleware(request)
  response.headers.set('x-pathname', pathname)
  return response
}

export const config = {
  matcher: [
    '/((?!_next|api|admin|.*\\..*).*)',
  ],
}
