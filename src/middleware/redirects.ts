/**
 * Redirect Logic
 * All URL redirect handling for i18n and legacy paths
 */

import { NextRequest, NextResponse } from 'next/server'
import { SUB_SERVICE_SLUGS, EN_ONLY_BLOG_POSTS, type Locale } from '@/config/slug-mappings'
import { getLocaleFromPathname } from './utils'
import {
  getLegacyServiceRedirect,
  getCorrectServiceSlug,
  getCorrectAdditionalServiceSlug,
  getCorrectSubServiceSlug,
  getCorrectReferenceSlug,
  getCorrectBlogCategorySlug,
  getCorrectPackageSlug,
  getCorrectBlogPostSlug,
} from './slug-validators'

/**
 * Build locale prefix for URLs
 */
function getLocalePrefix(locale: Locale): string {
  return locale === 'de' ? '' : `/${locale}`
}

/**
 * Check all redirect rules and return redirect response if needed
 */
export function checkAndRedirect(request: NextRequest): NextResponse | null {
  const pathname = request.nextUrl.pathname
  const { locale, pathWithoutLocale } = getLocaleFromPathname(pathname)

  // 0a. UMLAUT URL FIX: redaktionspläne → redaktionsplaene
  if (pathname.includes('redaktionspl%C3%A4ne') || pathname.includes('redaktionspläne')) {
    const fixedPath = pathname
      .replace('redaktionspl%C3%A4ne', 'redaktionsplaene')
      .replace('redaktionspläne', 'redaktionsplaene')
    return NextResponse.redirect(new URL(fixedPath, request.url), 301)
  }

  // 0b. RU PACKAGES → DE PACKAGES (RU packages don't exist)
  if (pathname.startsWith('/ru/uslugi/pakety/')) {
    const packageSlug = pathname.replace('/ru/uslugi/pakety/', '')
    return NextResponse.redirect(new URL(`/leistungen/pakete/${packageSlug}`, request.url), 302)
  }

  // 0c. RU BLOG with German slugs → DE Blog (RU translations don't exist)
  const ruBlogGermanSlugs = [
    'bilder-fuer-web-optimieren',
    'content-marketing-strategie-guide',
    'customer-journey-mapping-guide',
    'google-ads-kosten-guide',
    'google-ranking-verbessern',
    'local-seo-oesterreich-guide',
    'markenidentitaet-entwickeln-leitfaden',
    'seo-fuer-anfaenger-guide',
    'seo-kosten-guide',
    'was-kostet-eine-professionelle-website',
    'webdesign-trends-2025',
    'webdesign-und-seo-kombinieren',
    'website-optimieren-guide',
    'wix-alternative-professionelles-webdesign',
    'wordpress-oder-webflow-vergleich',
    'wordpress-website-erstellen-anleitung',
    'youtube-seo-guide',
  ]
  if (pathname.startsWith('/ru/blog/')) {
    const slug = pathname.replace('/ru/blog/', '')
    if (ruBlogGermanSlugs.includes(slug)) {
      return NextResponse.redirect(new URL(`/blog/${slug}`, request.url), 302)
    }
  }

  // 0. PROJEKTE → REFERENZEN (Duplicate Content Fix)
  if (pathWithoutLocale === '/projekte' || pathWithoutLocale === '/projects') {
    const redirectPath = locale === 'en' ? '/en/references' : '/referenzen'
    return NextResponse.redirect(new URL(redirectPath, request.url), 301)
  }

  // 1. SERVICE PAGES: /leistungen/[slug]
  const serviceRedirect = checkServiceRedirect(pathWithoutLocale, locale, request.url)
  if (serviceRedirect) return serviceRedirect

  // 2. SUB-SERVICE PAGES: /leistungen/[parent]/[slug]
  const subServiceRedirect = checkSubServiceRedirect(pathWithoutLocale, locale, request.url)
  if (subServiceRedirect) return subServiceRedirect

  // 3. REFERENCE PAGES: /referenzen/[slug]
  const referenceRedirect = checkReferenceRedirect(pathWithoutLocale, locale, request.url)
  if (referenceRedirect) return referenceRedirect

  // 4. BLOG CATEGORY PAGES: /blog/kategorie/[slug]
  const blogCategoryRedirect = checkBlogCategoryRedirect(pathWithoutLocale, locale, request.url)
  if (blogCategoryRedirect) return blogCategoryRedirect

  // 5. PACKAGE PAGES: /leistungen/pakete/[slug]
  const packageRedirect = checkPackageRedirect(pathWithoutLocale, locale, request.url)
  if (packageRedirect) return packageRedirect

  // 6. BLOG POST PAGES: /blog/[slug]
  const blogPostRedirect = checkBlogPostRedirect(pathWithoutLocale, locale, request.url)
  if (blogPostRedirect) return blogPostRedirect

  return null
}

// ============================================================
// INDIVIDUAL REDIRECT CHECKS
// ============================================================

function checkServiceRedirect(path: string, locale: Locale, baseUrl: string): NextResponse | null {
  const match = path.match(/^\/(leistungen|services|uslugi)\/([^\/]+)$/)
  if (!match) return null

  const slug = match[2]
  const correctSlug = getCorrectServiceSlug(slug, locale) || getCorrectAdditionalServiceSlug(slug, locale)
  
  if (correctSlug) {
    const basePath = locale === 'en' ? '/services' : locale === 'ru' ? '/uslugi' : '/leistungen'
    return NextResponse.redirect(
      new URL(`${getLocalePrefix(locale)}${basePath}/${correctSlug}`, baseUrl),
      301
    )
  }
  return null
}

function checkSubServiceRedirect(path: string, locale: Locale, baseUrl: string): NextResponse | null {
  const match = path.match(/^\/(leistungen|services|uslugi)\/([^\/]+)\/([^\/]+)$/)
  if (!match) return null

  const parentSlug = match[2]
  const subSlug = match[3]

  // Skip package paths
  if (['pakete', 'packages', 'pakety'].includes(parentSlug)) return null

  // Whitelist check: only allow known sub-service slugs
  const validDeSlugs = Object.keys(SUB_SERVICE_SLUGS.de)
  const validEnSlugs = Object.keys(SUB_SERVICE_SLUGS.en)
  if (!validDeSlugs.includes(subSlug) && !validEnSlugs.includes(subSlug)) {
    return new NextResponse('Not Found', { status: 404 })
  }

  // Check legacy redirects for parent
  const legacyParent = getLegacyServiceRedirect(parentSlug)
  const correctParent = legacyParent || getCorrectServiceSlug(parentSlug, locale) || parentSlug
  const correctSub = getCorrectSubServiceSlug(subSlug, locale) || subSlug

  if (correctParent !== parentSlug || correctSub !== subSlug) {
    const basePath = locale === 'en' ? '/services' : locale === 'ru' ? '/uslugi' : '/leistungen'
    return NextResponse.redirect(
      new URL(`${getLocalePrefix(locale)}${basePath}/${correctParent}/${correctSub}`, baseUrl),
      301
    )
  }
  return null
}

function checkReferenceRedirect(path: string, locale: Locale, baseUrl: string): NextResponse | null {
  const match = path.match(/^\/(referenzen|references|referensy)\/([^\/]+)$/)
  if (!match) return null

  const slug = match[2]
  const correctSlug = getCorrectReferenceSlug(slug, locale)
  
  if (correctSlug) {
    const basePath = locale === 'en' ? '/references' : locale === 'ru' ? '/referensy' : '/referenzen'
    return NextResponse.redirect(
      new URL(`${getLocalePrefix(locale)}${basePath}/${correctSlug}`, baseUrl),
      301
    )
  }
  return null
}

function checkBlogCategoryRedirect(path: string, locale: Locale, baseUrl: string): NextResponse | null {
  const match = path.match(/^\/blog\/(kategorie|category|kategoriya)\/([^\/]+)$/)
  if (!match) return null

  const categoryPath = match[1]
  const slug = match[2]
  const correctSlug = getCorrectBlogCategorySlug(slug, locale)
  const correctCategoryPath = locale === 'en' ? 'category' : locale === 'ru' ? 'kategoriya' : 'kategorie'

  if (correctSlug || categoryPath !== correctCategoryPath) {
    const finalSlug = correctSlug || slug
    return NextResponse.redirect(
      new URL(`${getLocalePrefix(locale)}/blog/${correctCategoryPath}/${finalSlug}`, baseUrl),
      301
    )
  }
  return null
}

function checkPackageRedirect(path: string, locale: Locale, baseUrl: string): NextResponse | null {
  const match = path.match(/^\/(leistungen\/pakete|services\/packages|uslugi\/pakety)\/([^\/]+)$/)
  if (!match) return null

  // RU package pages not available
  if (locale === 'ru') {
    return new NextResponse('Not Found', { status: 404 })
  }

  const slug = match[2]
  const correctSlug = getCorrectPackageSlug(slug, locale)
  
  if (correctSlug) {
    const basePath = locale === 'en' ? '/services/packages' : '/leistungen/pakete'
    return NextResponse.redirect(
      new URL(`${getLocalePrefix(locale)}${basePath}/${correctSlug}`, baseUrl),
      301
    )
  }
  return null
}

function checkBlogPostRedirect(path: string, locale: Locale, baseUrl: string): NextResponse | null {
  const match = path.match(/^\/blog\/([^\/]+)$/)
  if (!match) return null

  const slug = match[1]
  
  // Skip category paths
  if (['kategorie', 'category', 'kategoriya'].includes(slug)) return null

  // No RU blog translations
  if (locale === 'ru') {
    return new NextResponse('Not Found', { status: 404 })
  }

  // EN-only posts accessed from DE
  if (locale === 'de' && (EN_ONLY_BLOG_POSTS as readonly string[]).includes(slug)) {
    return NextResponse.redirect(new URL(`/en/blog/${slug}`, baseUrl), 301)
  }

  const correctSlug = getCorrectBlogPostSlug(slug, locale)
  if (correctSlug) {
    return NextResponse.redirect(
      new URL(`${getLocalePrefix(locale)}/blog/${correctSlug}`, baseUrl),
      301
    )
  }
  return null
}
