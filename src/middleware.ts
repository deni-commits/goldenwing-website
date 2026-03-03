import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale, isValidLocale } from './i18n/config'

function getPreferredLocale(request: NextRequest): string {
  const acceptLang = request.headers.get('accept-language')
  if (!acceptLang) return defaultLocale

  const preferred = acceptLang
    .split(',')
    .map((lang) => {
      const parts = lang.trim().split(';q=')
      const code = parts[0]?.split('-')[0]?.toLowerCase() ?? ''
      const quality = parts[1] ? parseFloat(parts[1]) : 1
      return { code, quality }
    })
    .sort((a, b) => b.quality - a.quality)

  for (const { code } of preferred) {
    if (code && isValidLocale(code)) return code
  }
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip internal paths
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/media') ||
    pathname.startsWith('/brand') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/llms.txt' ||
    pathname === '/llms-full.txt' ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  // Check if pathname already has a valid locale prefix
  const segments = pathname.split('/')
  const firstSegment = segments[1] ?? ''
  if (isValidLocale(firstSegment)) {
    const response = NextResponse.next()
    response.headers.set('x-locale', firstSegment)
    return response
  }

  // Redirect to locale-prefixed path
  const locale = getPreferredLocale(request)
  const newUrl = request.nextUrl.clone()
  newUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|brand|media|api|admin).*)'],
}
