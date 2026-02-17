/**
 * GoldenWing Middleware
 * 
 * Handles:
 * - i18n routing (de/en/ru)
 * - SEO-safe redirects for slug corrections
 * - Bot detection for crawler handling
 * 
 * @see src/middleware/ for modular implementation
 */

import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'
import { checkAndRedirect } from './middleware/redirects'

// ============================================================
// INTL MIDDLEWARE CONFIGURATION
// ============================================================

const intlMiddleware = createMiddleware({
  ...routing,
  localeCookie: {
    name: 'NEXT_LOCALE',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 365, // 1 year
  },
})

/**
 * SEO FIX: For the default locale (de), prevent redirects from unprefixed
 * URLs to /de/ prefixed URLs. Instead, convert these to rewrites.
 * 
 * With localePrefix: 'as-needed', next-intl should NOT redirect the default
 * locale to /de/, but due to a possible bug it does. This wrapper fixes it.
 */
function fixDefaultLocaleRedirect(request: NextRequest, response: NextResponse): NextResponse {
  const pathname = request.nextUrl.pathname
  
  // Only fix redirects (307/308) that add /de/ prefix to the default locale
  if (response.status === 307 || response.status === 308) {
    const location = response.headers.get('location')
    if (location) {
      // Parse the redirect target
      let targetPath: string
      try {
        const url = new URL(location, request.url)
        targetPath = url.pathname
      } catch {
        targetPath = location
      }
      
      // If redirecting from /path → /de/path, convert to rewrite instead
      if (
        !pathname.startsWith('/de/') && 
        !pathname.startsWith('/en/') && 
        !pathname.startsWith('/ru/') &&
        targetPath.startsWith('/de/')
      ) {
        // Rewrite to /de/ version internally (no visible redirect)
        const rewriteUrl = new URL(targetPath, request.url)
        rewriteUrl.search = request.nextUrl.search
        return NextResponse.rewrite(rewriteUrl)
      }
      
      // For other locale redirects (e.g., /path → /en/path), keep as 308
      if (response.status === 307) {
        return NextResponse.redirect(location, 308)
      }
    }
  }
  
  return response
}

// ============================================================
// MAIN MIDDLEWARE
// ============================================================

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/media') ||
    pathname.includes('.') // Static files like .ico, .png, etc.
  ) {
    return NextResponse.next()
  }

  // Check for SEO-critical slug corrections (applies to all requests)
  const redirect = checkAndRedirect(request)
  if (redirect) return redirect

  // Apply i18n middleware for locale negotiation and URL rewriting
  const response = intlMiddleware(request)
  
  // Fix: convert /de/ redirects to rewrites for SEO (no redirect chains)
  // and convert remaining 307 → 308 for other locale redirects
  return fixDefaultLocaleRedirect(request, response)
}

// ============================================================
// MIDDLEWARE CONFIG
// ============================================================

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt|llms-full.txt|media/|api/).*)',
  ],
}
