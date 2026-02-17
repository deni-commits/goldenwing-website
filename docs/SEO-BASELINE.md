# SEO BASELINE — goldenwing.at
Datum: 2026-01-31
Status: GESPERRT

---

## middleware.ts (Zeilen 330-360)
```typescript
    // Detect locale from URL prefix
    const hasEnPrefix = pathname.startsWith('/en/') || pathname === '/en'
    const hasRuPrefix = pathname.startsWith('/ru/') || pathname === '/ru'
    const hasDePrefix = pathname.startsWith('/de/') || pathname === '/de'
    const hasLocalePrefix = hasEnPrefix || hasRuPrefix || hasDePrefix

    // For bots WITHOUT locale prefix: Use intlMiddleware for path translation
    // intlMiddleware handles DE as default locale and translates DE slugs to internal route keys
    // (e.g., /dubai/webdesign-agentur-dubai → internal /dubai/web-design-company-dubai with locale=de)
    if (!hasLocalePrefix) {
      const response = intlMiddleware(request)
      response.headers.set('x-pathname', pathname)
      response.headers.set('x-is-bot', 'true')
      response.headers.set('x-locale', 'de')
      return response
    }

    // For bots WITH locale prefix: Use intlMiddleware for path translation
    // intlMiddleware translates /en/services/web-design → internal /leistungen/webdesign with locale=en
    // Without this, translated EN/RU paths 404 because no matching file exists
    const response = intlMiddleware(request)
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
```

---

## next.config.ts — i18n & Routing
```typescript
import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import createNextIntlPlugin from 'next-intl/plugin';
import { LEGACY_REDIRECTS } from './src/seo/legacy-redirects';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Ensure consistent URLs without trailing slashes (prevents /en vs /en/ issues)
  trailingSlash: false,

  // Enable compression
  compress: true,

  // Image optimization - performance focused
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'goldenwing.at' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },

  // 301 Redirects - ONLY LEGACY WORDPRESS URLs (MAX 50)
  async redirects() {
    return LEGACY_REDIRECTS.map(redirect => ({
      source: redirect.source,
      destination: redirect.destination,
      permanent: true,
    }))
  },

  // Security Headers ...
  // WordPress attack path rewrites ...

  poweredByHeader: false,
  serverExternalPackages: ['undici'],
};

export default withPayload(withNextIntl(nextConfig));
```

---

## routing.ts — Pathnames (Service-relevanter Auszug)
```typescript
import { defineRouting } from 'next-intl/routing'
import { locales, defaultLocale } from './config'

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',

  pathnames: {
    '/': '/',

    // Services / Leistungen - Overview
    '/leistungen': {
      de: '/leistungen',
      en: '/services',
      ru: '/uslugi',
    },
    '/leistungen/[slug]': {
      de: '/leistungen/[slug]',
      en: '/services/[slug]',
      ru: '/uslugi/[slug]',
    },

    // 6 MAIN SERVICES
    '/leistungen/branding': {
      de: '/leistungen/branding',
      en: '/services/branding',
      ru: '/uslugi/brending',
    },
    '/leistungen/webdesign': {
      de: '/leistungen/webdesign',
      en: '/services/web-design',
      ru: '/uslugi/veb-dizayn',
    },
    '/leistungen/digital-marketing': {
      de: '/leistungen/digital-marketing',
      en: '/services/digital-marketing',
      ru: '/uslugi/tsifrovoy-marketing',
    },
    '/leistungen/seo-content': {
      de: '/leistungen/seo-content',
      en: '/services/seo-content',
      ru: '/uslugi/seo-kontent',
    },
    '/leistungen/web-app-entwicklung': {
      de: '/leistungen/web-app-entwicklung',
      en: '/services/web-app-development',
      ru: '/uslugi/razrabotka-veb-prilozheniy',
    },
    '/leistungen/it-cloud-services': {
      de: '/leistungen/it-cloud-services',
      en: '/services/it-cloud-services',
      ru: '/uslugi/it-oblachnye-servisy',
    },

    // SUB-SERVICE PAGES (Dynamic)
    '/leistungen/[slug]/[subslug]': {
      de: '/leistungen/[slug]/[subslug]',
      en: '/services/[slug]/[subslug]',
      ru: '/uslugi/[slug]/[subslug]',
    },

    // ... (weitere Pfade: Pakete, About, Locations, References, Blog, Lexikon,
    //      Landing Pages AT/DE/CH/UAE, Tools, Legal — siehe src/i18n/routing.ts)
  },
})

export const { pathnames } = routing
export type AppPathname = keyof typeof routing.pathnames
```

---

## sitemap.ts — URL-Generierung (Auszug)
```typescript
import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getAllLexikonSlugs } from '@/lib/lexikon/data'
import {
  SUB_SERVICE_SLUGS,
  BLOG_CATEGORY_SLUGS,
  EN_ONLY_BLOG_POSTS,
} from '@/config/slug-mappings'

const BASE_URL = 'https://goldenwing.at'

// E-E-A-T Optimized Priority Strategy:
// 1.0: Homepage
// 0.9: Main conversion pages (Kontakt, Leistungen, AEO Listicles)
// 0.85: E-E-A-T Trust signals (Team, About, Standorte) + SEO Landing Pages
// 0.8: Service pages, Referenzen, Tools
// 0.7: Projects, Blog posts, Location details
// 0.6: Supporting content
// 0.3-0.4: Legal pages

// German uses no prefix (localePrefix: 'as-needed')
// English uses /en with translated paths via translatePath()

// Dynamic CMS content:
// - services (from Payload 'services' collection)
// - sub-services (from Payload 'sub-services' collection, with parent slug)
// - blog posts (locale-aware slugs, DE/EN/EN-only handling)
// - blog categories (translated slugs)
// - projects
// - lexikon entries
// - team members (E-E-A-T)
```

---

## robots.txt
```
# GoldenWing Creative Studios - robots.txt
# https://goldenwing.at

# Default - Allow all crawlers
User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/
Disallow: /api/
Allow: /api/media/
Disallow: /_next/
Allow: /_next/static/
Allow: /_next/image

# Google
User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

# Bing
User-agent: Bingbot
Allow: /

# AI/LLM Crawlers - Explicitly allowed
User-agent: GPTBot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: ChatGPT-User
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: Google-Extended
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: Anthropic-ai
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: Claude-Web
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: PerplexityBot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: Cohere-ai
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: YouBot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

# SEO Crawlers
User-agent: AhrefsBot
Allow: /

User-agent: SemrushBot
Allow: /

User-agent: SiteAuditBot
Allow: /

User-agent: SemrushBot-SA
Allow: /

User-agent: Screaming Frog SEO Spider
Allow: /

User-agent: MozBot
Allow: /

# Block bad bots
User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

# Host (without protocol per robots.txt spec)
Host: goldenwing.at

# Sitemaps
Sitemap: https://goldenwing.at/sitemap.xml

# LLM Context Files
# llms.txt: https://goldenwing.at/llms.txt (summary)
# llms-full.txt: https://goldenwing.at/llms-full.txt (comprehensive)
```

---

## slug-mappings.ts (src/config/slug-mappings.ts)
```typescript
// 6 Main Service Slugs
SERVICE_SLUGS.de = {
  'branding': 'branding',
  'webdesign': 'web-design',
  'digital-marketing': 'digital-marketing',
  'seo-content': 'seo-content',
  'web-app-entwicklung': 'web-app-development',
  'it-cloud-services': 'it-cloud-services',
}

// 27 Sub-Service Slugs (DE → EN)
SUB_SERVICE_SLUGS.de = {
  // Branding (4)
  'markenstrategie-positionierung': 'brand-strategy-positioning',
  'visuelle-identitaet': 'visual-identity',
  'markenrichtlinien-vorlagen': 'brand-guidelines-templates',
  'rebranding': 'rebranding',
  // Webdesign (5)
  'informationsarchitektur': 'information-architecture',
  'ux-konzepte-prototypen': 'ux-concepts-prototypes',
  'ui-design-designsysteme': 'ui-design-systems',
  'webentwicklung-cms': 'web-development-cms',
  'barrierefreiheit-performance': 'accessibility-performance',
  // Digital Marketing (4)
  'kampagnenstrategie-funnel': 'campaign-strategy-funnel',
  'paid-media-content-kampagnen': 'paid-media-campaigns',
  'email-marketing-automatisierung': 'email-marketing-automation',
  'tracking-optimierung': 'tracking-optimization',
  // SEO & Content (5)
  'content-strategie-themenplanung': 'content-strategy-planning',
  'content-strukturierung': 'content-structuring',
  'redaktionsplaene-content-systeme': 'editorial-plans-content-systems',
  'content-produktion': 'content-production',
  'seo-messung-wirkung': 'seo-measurement-impact',
  // Web- & App-Entwicklung (4)
  'technische-architektur': 'technical-architecture',
  'entwicklung': 'development',
  'schnittstellen-integrationen': 'apis-integrations',
  'qualitaetssicherung-testing': 'quality-assurance-testing',
  // IT & Cloud Services (5)
  'cloud-architektur-migration': 'cloud-architecture-migration',
  'monitoring-wartung': 'monitoring-maintenance',
  'sicherheit-backups': 'security-backups',
  'technischer-betrieb-support': 'technical-operations-support',
  'workflow-automation': 'workflow-automation',
}

// Legacy Service Redirects (alte → neue Slugs)
LEGACY_SERVICE_REDIRECTS = {
  'digitales-marketing': 'digital-marketing',
  'seo-sichtbarkeit': 'seo-content',
  'software-entwicklung': 'web-app-entwicklung',
  'technische-loesungen': 'it-cloud-services',
  'digitale-strategie': 'digital-marketing',
  'content-visuals': 'seo-content',
  'entwicklung': 'web-app-entwicklung',
  'it-cloud': 'it-cloud-services',
  'marketing': 'digital-marketing',
  'seo': 'seo-content',
  'software': 'web-app-entwicklung',
  'strategie': 'digital-marketing',
  'digital-strategy': 'digital-marketing',
  'seo-visibility': 'seo-content',
  'technical-solutions': 'it-cloud-services',
}
```

---

## DIESE DATEIEN NIEMALS AENDERN:
- `src/middleware.ts`
- `next.config.ts`
- `src/i18n/routing.ts`
- `src/config/slug-mappings.ts`
- `src/app/sitemap.ts`
- `public/robots.txt`
