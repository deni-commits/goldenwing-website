import logger from '@/lib/logger'
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

/**
 * Translate German paths to English paths for i18n sitemap
 * Based on the routing configuration in src/i18n/routing.ts
 *
 * Sub-service and blog category slugs are imported from the central
 * slug-mappings.ts to ensure consistency across the codebase.
 */

// Use central slug mappings (Single Source of Truth)
const subServiceSlugTranslations: Record<string, string> = SUB_SERVICE_SLUGS.de
const blogCategorySlugTranslations: Record<string, string> = BLOG_CATEGORY_SLUGS.de

const pathTranslations: Record<string, string> = {
  // Main sections
  '/vergleiche': '/comparisons',
  '/branchen': '/industries',
  '/branchen/aerzte': '/industries/healthcare',
  '/branchen/rechtsanwaelte': '/industries/legal',
  '/branchen/ecommerce': '/industries/ecommerce',
  '/branchen/b2b': '/industries/b2b',
  '/branchen/startups': '/industries/startups',
  '/branchen/gastronomie': '/industries/hospitality',
  '/branchen/immobilien': '/industries/real-estate',
  '/branchen/dienstleister': '/industries/services',
  '/leistungen': '/services',
  '/referenzen': '/references',
  '/projekte': '/projects',
  '/ueber-uns': '/about-us',
  '/kontakt': '/contact',
  '/standorte': '/locations',
  '/ressourcen': '/resources',
  '/haeufige-fragen': '/faq',
  '/impressum': '/imprint',
  '/datenschutz': '/privacy-policy',
  '/rechtliches': '/legal',
  // Sub-paths
  '/blog/kategorie': '/blog/category',
  '/ueber-uns/team': '/about-us/team',
  '/ueber-uns/kultur': '/about-us/culture',
  '/ueber-uns/werte': '/about-us/values',
  '/ueber-uns/partner': '/about-us/partners',
  '/ueber-uns/facts-figures': '/about-us/facts-figures',
  '/leistungen/pakete': '/services/packages',
  '/ressourcen/downloads': '/resources/downloads',
  '/ressourcen/newsletter': '/resources/newsletter',
  '/rechtliches/cookie-einstellungen': '/legal/cookie-settings',
  // Location hub slugs
  '/standorte/wien': '/locations/vienna',
  '/standorte/wien/webdesign': '/locations/vienna/web-design',
  '/standorte/wien/seo': '/locations/vienna/seo',
  '/standorte/wien/branding': '/locations/vienna/branding',
  '/standorte/wien/google-ads': '/locations/vienna/google-ads',
  '/standorte/dubai': '/locations/dubai',
  '/standorte/roseville': '/locations/roseville',
  '/standorte/graz': '/locations/graz',
  '/standorte/graz/webdesign': '/locations/graz/web-design',
  '/standorte/graz/seo': '/locations/graz/seo',
  '/standorte/graz/online-marketing': '/locations/graz/online-marketing',
  '/standorte/linz': '/locations/linz',
  '/standorte/linz/webdesign': '/locations/linz/web-design',
  '/standorte/linz/seo': '/locations/linz/seo',
  '/standorte/salzburg': '/locations/salzburg',
  '/standorte/salzburg/webdesign': '/locations/salzburg/web-design',
  '/standorte/innsbruck': '/locations/innsbruck',
  '/standorte/innsbruck/webdesign': '/locations/innsbruck/web-design',
  '/standorte/muenchen': '/locations/munich',
  '/standorte/muenchen/webdesign': '/locations/munich/web-design',
  '/standorte/muenchen/seo': '/locations/munich/seo',
  '/standorte/berlin': '/locations/berlin',
  '/standorte/berlin/webdesign': '/locations/berlin/web-design',
  '/standorte/berlin/seo': '/locations/berlin/seo',
  '/standorte/zuerich': '/locations/zurich',
  '/standorte/zuerich/webdesign': '/locations/zurich/web-design',
  '/standorte/zuerich/seo': '/locations/zurich/seo',
  // Landing pages - Austria
  '/kreativagentur-wien': '/creative-agency-vienna',
  '/webdesign-wien': '/web-design-vienna',
  '/seo-agentur-wien': '/seo-agency-vienna',
  '/branding-agentur-wien': '/branding-agency-vienna',
  '/webdesign-oesterreich': '/web-design-austria',
  '/google-ads-agentur-oesterreich': '/google-ads-agency-austria',
  '/google-ads-agentur-wien': '/google-ads-agency-vienna',
  // Graz
  '/webdesign-graz': '/web-design-graz',
  '/seo-agentur-graz': '/seo-agency-graz',
  '/online-marketing-graz': '/online-marketing-graz',
  // Linz
  '/webdesign-linz': '/web-design-linz',
  '/seo-agentur-linz': '/seo-agency-linz',
  '/online-marketing-agentur-linz': '/online-marketing-agency-linz',
  '/werbeagentur-linz': '/advertising-agency-linz',
  // Salzburg
  '/webdesign-salzburg': '/web-design-salzburg',
  '/seo-agentur-salzburg': '/seo-agency-salzburg',
  '/werbeagentur-salzburg': '/advertising-agency-salzburg',
  // Innsbruck
  '/webdesign-innsbruck': '/web-design-innsbruck',
  '/seo-agentur-innsbruck': '/seo-agency-innsbruck',
  '/werbeagentur-innsbruck': '/advertising-agency-innsbruck',
  // Landing pages - Germany
  '/webdesign-deutschland': '/web-design-germany',
  '/webdesign-muenchen': '/web-design-munich',
  '/webdesign-berlin': '/web-design-berlin',
  '/webdesign-hamburg': '/web-design-hamburg',
  '/webdesign-frankfurt': '/web-design-frankfurt',
  '/seo-agentur-deutschland': '/seo-agency-germany',
  '/branding-agentur-deutschland': '/branding-agency-germany',
  // Landing pages - Switzerland
  '/webdesign-schweiz': '/web-design-switzerland',
  '/webdesign-zuerich': '/web-design-zurich',
  '/seo-agentur-schweiz': '/seo-agency-switzerland',
  // Landing pages - UAE/Dubai
  '/webdesign-dubai': '/web-design-dubai',
  '/webdesign-vae': '/web-design-uae',
  '/seo-agentur-dubai': '/seo-agency-dubai',
  '/branding-agentur-dubai': '/branding-agency-dubai',
  '/kreativagentur-dubai': '/creative-agency-dubai',
  '/ecommerce-agentur-dubai': '/ecommerce-agency-dubai',
  // Keyword Gap Landing Pages
  '/webdesign-preise': '/web-design-pricing',
  '/website-erstellen-lassen': '/have-website-created',
  '/e-mail-marketing-agentur-wien': '/email-marketing-agency-vienna',
  '/barrierefreie-website': '/accessible-website',
  // AEO Listicle pages
  '/beste-webdesign-agenturen-wien': '/best-web-design-agencies-vienna',
  '/beste-branding-agenturen-wien': '/best-branding-agencies-vienna',
  '/beste-digital-marketing-agenturen-wien': '/best-digital-marketing-agencies-vienna',
  '/beste-ecommerce-agenturen-wien': '/best-ecommerce-agencies-vienna',
  '/beste-seo-agenturen-oesterreich': '/best-seo-agencies-austria',
  '/beste-seo-agenturen-fuer-aerzte': '/best-seo-agencies-for-doctors',
  '/beste-website-relaunch-agenturen': '/best-website-relaunch-agencies',
  '/beste-social-media-agenturen-wien': '/best-social-media-agencies-vienna',
  '/beste-online-marketing-agenturen-wien': '/best-online-marketing-agencies-vienna',
  '/beste-kreativagenturen-wien': '/best-creative-agencies-vienna',
  '/beste-google-ads-agenturen-wien': '/best-google-ads-agencies-vienna',
  '/beste-wordpress-agenturen-wien': '/best-wordpress-agencies-vienna',
  '/beste-content-marketing-agenturen-wien': '/best-content-marketing-agencies-vienna',
  '/beste-app-entwicklung-agenturen-wien': '/best-app-development-agencies-vienna',
  '/beste-seo-agenturen-wien': '/best-seo-agencies-vienna',
  '/beste-grafikdesign-agenturen-wien': '/best-graphic-design-agencies-vienna',
  '/beste-onlineshop-agenturen-wien': '/best-online-shop-agencies-vienna',
  // Tools
  '/tools': '/tools',
  '/tools/seo-checker': '/tools/seo-checker',
  '/tools/performance-checker': '/tools/performance-checker',
  '/tools/design-analyzer': '/tools/design-analyzer',
  '/tools/security-checker': '/tools/security-checker',
  '/tools/website-analyzer': '/tools/website-analyzer',
  // UAE Hub pages
  '/vae': '/uae', // German /vae → English /uae
  '/dubai': '/dubai',
  '/abu-dhabi': '/abu-dhabi',
  '/sharjah': '/sharjah',
  // Dubai hub services (DE slug → EN slug)
  '/dubai/webdesign-agentur-dubai': '/dubai/web-design-company-dubai',
  '/dubai/seo-agentur-dubai': '/dubai/seo-company-dubai',
  '/dubai/branding-agentur-dubai': '/dubai/branding-agency-dubai',
  '/dubai/digital-marketing-agentur-dubai': '/dubai/digital-marketing-agency-dubai',
  '/dubai/ecommerce-entwicklung-dubai': '/dubai/ecommerce-development-dubai',
  // Abu Dhabi hub services (DE slug → EN slug)
  '/abu-dhabi/webdesign-abu-dhabi': '/abu-dhabi/web-design-abu-dhabi',
  '/abu-dhabi/seo-agentur-abu-dhabi': '/abu-dhabi/seo-abu-dhabi',
  '/abu-dhabi/branding-agentur-abu-dhabi': '/abu-dhabi/branding-abu-dhabi',
  '/abu-dhabi/digital-marketing-abu-dhabi': '/abu-dhabi/digital-marketing-abu-dhabi',
  '/abu-dhabi/ecommerce-abu-dhabi': '/abu-dhabi/ecommerce-abu-dhabi',
  // Sharjah hub services (DE slug → EN slug)
  '/sharjah/webdesign-sharjah': '/sharjah/web-design-sharjah',
  '/sharjah/seo-agentur-sharjah': '/sharjah/seo-sharjah',
  '/sharjah/branding-agentur-sharjah': '/sharjah/branding-sharjah',
  '/sharjah/digital-marketing-sharjah': '/sharjah/digital-marketing-sharjah',
  '/sharjah/ecommerce-sharjah': '/sharjah/ecommerce-sharjah',
  '/webdesign-abu-dhabi': '/web-design-abu-dhabi', // German /webdesign-abu-dhabi → English /web-design-abu-dhabi
  '/wordpress-agentur-dubai': '/wordpress-agency-dubai',
  '/digitales-marketing-dubai': '/digital-marketing-dubai',
  '/webentwicklung-abu-dhabi': '/web-development-abu-dhabi',
  '/app-entwicklung-dubai': '/app-development-dubai',
  // Package slugs
  '/leistungen/pakete/brand-web-foundation': '/services/packages/brand-web-foundation',
  '/leistungen/pakete/seo-content-growth': '/services/packages/seo-content-growth',
  '/leistungen/pakete/demand-gen-suite': '/services/packages/demand-gen-suite',
  '/leistungen/pakete/individuelles-paket': '/services/packages/custom-package',
  // Service slugs (6 main services)
  '/leistungen/branding': '/services/branding',
  '/leistungen/webdesign': '/services/web-design',
  '/leistungen/digital-marketing': '/services/digital-marketing',
  '/leistungen/seo-content': '/services/seo-content',
  '/leistungen/web-app-entwicklung': '/services/web-app-development',
  '/leistungen/it-cloud-services': '/services/it-cloud-services',
  // Additional service pages
  '/leistungen/seo-betreuung': '/services/seo-support',
  '/leistungen/sea-agentur': '/services/sea-agency',
  '/leistungen/ecommerce-agentur': '/services/ecommerce-agency',
  '/leistungen/seo-berater': '/services/seo-consultant',
  '/leistungen/seo-texter': '/services/seo-copywriter',
  '/leistungen/google-ads-agentur': '/services/google-ads-agency',
  '/leistungen/social-media-agentur': '/services/social-media-agency',
  '/leistungen/onlineshop-agentur': '/services/ecommerce-agency',
  '/leistungen/website-as-a-service': '/services/website-as-a-service',
  '/leistungen/seo-retainer': '/services/seo-retainer',
  '/leistungen/brand-in-a-box': '/services/brand-in-a-box',
  '/leistungen/wordpress-agentur': '/services/wordpress-agency',
  '/leistungen/grafikdesign': '/services/graphic-design',
  // Lexikon/Glossary
  '/lexikon': '/glossary',
  // Reference category slugs
  '/referenzen/entwicklung': '/references/development',
  '/referenzen/industrie': '/references/industry',
  '/referenzen/technologie': '/references/technology',
  '/referenzen/dienstleistung': '/references/consulting',
  '/referenzen/webdesign': '/references/web-design',
  // Wissen/Knowledge section
  '/wissen': '/knowledge',
  '/wissen/guides': '/knowledge/guides',
  '/wissen/guides/webdesign-kosten': '/knowledge/guides/web-design-costs',
  '/wissen/guides/seo-kosten': '/knowledge/guides/seo-costs',
  '/wissen/guides/website-erstellen-lassen': '/knowledge/guides/have-website-created',
  '/wissen/guides/online-marketing-budget': '/knowledge/guides/online-marketing-budget',
}

/**
 * Translate a German path to its English equivalent
 */
function translatePath(dePath: string): string {
  // Check for exact match first
  if (pathTranslations[dePath]) {
    return pathTranslations[dePath]
  }

  // Check for partial matches (for dynamic routes)
  let enPath = dePath

  // Sort by length (longest first) to match most specific paths first
  const sortedPaths = Object.keys(pathTranslations).sort((a, b) => b.length - a.length)

  for (const dePart of sortedPaths) {
    if (enPath.startsWith(dePart)) {
      enPath = pathTranslations[dePart] + enPath.slice(dePart.length)
      break
    }
  }

  return enPath
}

/**
 * E-E-A-T Optimized Sitemap
 *
 * Priority Strategy:
 * - 1.0: Homepage
 * - 0.9: Main conversion pages (Kontakt, Leistungen)
 * - 0.85: E-E-A-T Trust signals (Team, About, Standorte) + SEO Landing Pages
 * - 0.8: Service pages, Referenzen
 * - 0.7: Projects, Blog posts, Location details
 * - 0.6: Supporting content
 * - 0.3-0.4: Legal pages
 */

// E-E-A-T optimized static routes
const staticRoutes = [
  // Homepage - highest priority
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },

  // Main conversion pages - very high priority
  { path: '/kontakt', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/leistungen', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/referenzen', priority: 0.9, changeFrequency: 'weekly' as const },
  // NOTE: /projekte removed - redirects to /referenzen (see middleware.ts:353-356)
  // Individual projects (/projekte/[slug]) are added from CMS below
  { path: '/blog', priority: 0.85, changeFrequency: 'daily' as const },

  // E-E-A-T Trust Signals - HIGH priority (Experience, Expertise, Authority, Trust)
  { path: '/ueber-uns', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/ueber-uns/team', priority: 0.85, changeFrequency: 'monthly' as const }, // Expertise - Who is behind this?
  { path: '/ueber-uns/facts-figures', priority: 0.8, changeFrequency: 'monthly' as const }, // Authority - Proof
  { path: '/ueber-uns/werte', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/ueber-uns/kultur', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/ueber-uns/partner', priority: 0.75, changeFrequency: 'monthly' as const }, // Trust - Partners

  // Location pages - Hub-and-Spoke (GEO/SEO)
  { path: '/standorte', priority: 0.8, changeFrequency: 'monthly' as const }, // Hub
  // TIER 1 - Real offices (LocalBusiness Schema)
  { path: '/standorte/wien', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/standorte/wien/webdesign', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/standorte/wien/seo', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/standorte/wien/branding', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/standorte/wien/google-ads', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/standorte/dubai', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/standorte/roseville', priority: 0.7, changeFrequency: 'monthly' as const },
  // TIER 2 - Austria service areas
  { path: '/standorte/graz', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/standorte/graz/webdesign', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/standorte/graz/seo', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/standorte/graz/online-marketing', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/standorte/linz', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/standorte/linz/webdesign', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/standorte/linz/seo', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/standorte/salzburg', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/standorte/salzburg/webdesign', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/standorte/innsbruck', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/standorte/innsbruck/webdesign', priority: 0.75, changeFrequency: 'monthly' as const },
  // TIER 2 - Germany service areas
  { path: '/standorte/muenchen', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/standorte/muenchen/webdesign', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/standorte/muenchen/seo', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/standorte/berlin', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/standorte/berlin/webdesign', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/standorte/berlin/seo', priority: 0.75, changeFrequency: 'monthly' as const },
  // TIER 2 - Switzerland service areas
  { path: '/standorte/zuerich', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/standorte/zuerich/webdesign', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/standorte/zuerich/seo', priority: 0.75, changeFrequency: 'monthly' as const },

  // SEO Landing pages - Austria - Wien
  { path: '/kreativagentur-wien', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/webdesign-wien', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/seo-agentur-wien', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/branding-agentur-wien', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/webdesign-oesterreich', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/google-ads-agentur-oesterreich', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/google-ads-agentur-wien', priority: 0.85, changeFrequency: 'monthly' as const },
  // SEO Landing pages - Austria - Graz
  { path: '/webdesign-graz', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/seo-agentur-graz', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/online-marketing-graz', priority: 0.8, changeFrequency: 'monthly' as const },
  // SEO Landing pages - Austria - Linz
  { path: '/webdesign-linz', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/seo-agentur-linz', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/online-marketing-agentur-linz', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/werbeagentur-linz', priority: 0.8, changeFrequency: 'monthly' as const },
  // SEO Landing pages - Austria - Salzburg
  { path: '/webdesign-salzburg', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/seo-agentur-salzburg', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/werbeagentur-salzburg', priority: 0.8, changeFrequency: 'monthly' as const },
  // SEO Landing pages - Austria - Innsbruck
  { path: '/webdesign-innsbruck', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/seo-agentur-innsbruck', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/werbeagentur-innsbruck', priority: 0.8, changeFrequency: 'monthly' as const },

  // SEO Landing pages - Germany
  { path: '/webdesign-deutschland', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/webdesign-muenchen', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/webdesign-berlin', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/webdesign-hamburg', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/webdesign-frankfurt', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/seo-agentur-deutschland', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/branding-agentur-deutschland', priority: 0.8, changeFrequency: 'monthly' as const },

  // SEO Landing pages - Switzerland
  { path: '/webdesign-schweiz', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/webdesign-zuerich', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/seo-agentur-schweiz', priority: 0.8, changeFrequency: 'monthly' as const },

  // SEO Landing pages - UAE/Dubai (standalone German pages)
  { path: '/webdesign-dubai', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/webdesign-vae', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/seo-agentur-dubai', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/branding-agentur-dubai', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/kreativagentur-dubai', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/ecommerce-agentur-dubai', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/wordpress-agentur-dubai', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/digitales-marketing-dubai', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/webentwicklung-abu-dhabi', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/app-entwicklung-dubai', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/webdesign-abu-dhabi', priority: 0.75, changeFrequency: 'monthly' as const }, // Correct German path (not /web-design-abu-dhabi which redirects)

  // UAE Hub Pages & Location Services
  { path: '/vae', priority: 0.8, changeFrequency: 'monthly' as const }, // Correct German path (not /uae which redirects)
  { path: '/dubai', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/abu-dhabi', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/sharjah', priority: 0.75, changeFrequency: 'monthly' as const },
  // Dubai hub services (DE slugs - translated to EN via pathTranslations)
  { path: '/dubai/webdesign-agentur-dubai', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/dubai/seo-agentur-dubai', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/dubai/branding-agentur-dubai', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/dubai/digital-marketing-agentur-dubai', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/dubai/ecommerce-entwicklung-dubai', priority: 0.8, changeFrequency: 'monthly' as const },
  // Abu Dhabi hub services (DE slugs)
  { path: '/abu-dhabi/webdesign-abu-dhabi', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/abu-dhabi/seo-agentur-abu-dhabi', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/abu-dhabi/branding-agentur-abu-dhabi', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/abu-dhabi/digital-marketing-abu-dhabi', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/abu-dhabi/ecommerce-abu-dhabi', priority: 0.75, changeFrequency: 'monthly' as const },
  // Sharjah hub services (DE slugs)
  { path: '/sharjah/webdesign-sharjah', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/sharjah/seo-agentur-sharjah', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/sharjah/branding-agentur-sharjah', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/sharjah/digital-marketing-sharjah', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/sharjah/ecommerce-sharjah', priority: 0.7, changeFrequency: 'monthly' as const },

  // Keyword Gap Landing Pages - HIGH priority (high search volume targets)
  { path: '/webdesign-preise', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/website-erstellen-lassen', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/e-mail-marketing-agentur-wien', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/barrierefreie-website', priority: 0.85, changeFrequency: 'monthly' as const },

  // Vergleiche Hub - Aggregates all comparison pages
  { path: '/vergleiche', priority: 0.85, changeFrequency: 'monthly' as const },

  // Branchen Hub - Industry-specific solutions
  { path: '/branchen', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/branchen/aerzte', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/branchen/rechtsanwaelte', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/branchen/ecommerce', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/branchen/b2b', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/branchen/startups', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/branchen/gastronomie', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/branchen/immobilien', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/branchen/dienstleister', priority: 0.75, changeFrequency: 'monthly' as const },

  // AEO Listicle pages - Answer Engine Optimization (HIGH priority for AI visibility)
  { path: '/beste-webdesign-agenturen-wien', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/beste-branding-agenturen-wien', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/beste-digital-marketing-agenturen-wien', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/beste-ecommerce-agenturen-wien', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/beste-seo-agenturen-oesterreich', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/beste-seo-agenturen-fuer-aerzte', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/beste-website-relaunch-agenturen', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/beste-social-media-agenturen-wien', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/beste-online-marketing-agenturen-wien', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/beste-kreativagenturen-wien', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/beste-google-ads-agenturen-wien', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/beste-wordpress-agenturen-wien', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/beste-content-marketing-agenturen-wien', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/beste-app-entwicklung-agenturen-wien', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/beste-seo-agenturen-wien', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/beste-grafikdesign-agenturen-wien', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/beste-onlineshop-agenturen-wien', priority: 0.85, changeFrequency: 'monthly' as const },

  // Tools - Lead Magnets
  { path: '/tools', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/tools/seo-checker', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/tools/performance-checker', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/tools/design-analyzer', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/tools/security-checker', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/tools/website-analyzer', priority: 0.85, changeFrequency: 'monthly' as const },

  // Service packages
  { path: '/leistungen/pakete', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/leistungen/pakete/brand-web-foundation', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/leistungen/pakete/demand-gen-suite', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/leistungen/pakete/seo-content-growth', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/leistungen/pakete/individuelles-paket', priority: 0.75, changeFrequency: 'monthly' as const },

  // Referenzen categories
  { path: '/referenzen/branding', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/referenzen/webdesign', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/referenzen/marketing', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/referenzen/seo', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/referenzen/entwicklung', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/referenzen/it-cloud', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/referenzen/dienstleistung', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/referenzen/e-commerce', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/referenzen/industrie', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/referenzen/technologie', priority: 0.7, changeFrequency: 'monthly' as const },

  // Additional service pages
  { path: '/leistungen/website-as-a-service', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/leistungen/seo-retainer', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/leistungen/brand-in-a-box', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/leistungen/seo-betreuung', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/leistungen/sea-agentur', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/leistungen/ecommerce-agentur', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/leistungen/seo-berater', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/leistungen/seo-texter', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/leistungen/google-ads-agentur', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/leistungen/social-media-agentur', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/leistungen/onlineshop-agentur', priority: 0.75, changeFrequency: 'monthly' as const },
  // REMOVED: /leistungen/wordpress-agentur - redirects to /leistungen/web-app-entwicklung
  { path: '/leistungen/grafikdesign', priority: 0.75, changeFrequency: 'monthly' as const },

  // Wissen Hub - Knowledge center
  { path: '/wissen', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/wissen/guides', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/wissen/guides/webdesign-kosten', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/wissen/guides/seo-kosten', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/wissen/guides/website-erstellen-lassen', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/wissen/guides/online-marketing-budget', priority: 0.7, changeFrequency: 'monthly' as const },

  // Lexikon/Glossary - Knowledge base for E-E-A-T
  { path: '/lexikon', priority: 0.8, changeFrequency: 'weekly' as const },

  // Resources
  { path: '/ressourcen', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/ressourcen/downloads', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/ressourcen/newsletter', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/haeufige-fragen', priority: 0.65, changeFrequency: 'monthly' as const }, // FAQ - good for LLMs

  // Legal pages - low priority but required
  { path: '/impressum', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/datenschutz', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/rechtliches/cookie-einstellungen', priority: 0.2, changeFrequency: 'yearly' as const },
]

// Paths that only exist in German (no English translation)
const deOnlyPaths = new Set([
  '/wissen/guides/webdesign-kosten',
  '/wissen/guides/seo-kosten',
  '/wissen/guides/website-erstellen-lassen',
  '/wissen/guides/online-marketing-budget',
])

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = []

  // Add static routes for each locale
  // Note: German uses no prefix (localePrefix: 'as-needed'), English uses /en with translated paths
  for (const route of staticRoutes) {
    const dePath = `/de${route.path}` // German: explicit /de/ prefix for SEO (e.g., /kontakt)
    const enPath = `/en${translatePath(route.path)}` // English: translated path (e.g., /en/contact)
    const isDeOnly = deOnlyPaths.has(route.path)

    // German (without /de/ prefix - this is the canonical URL)
    routes.push({
      url: `${BASE_URL}${dePath || '/'}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: isDeOnly ? undefined : {
        languages: {
          de: `${BASE_URL}${dePath || '/'}`,
          en: `${BASE_URL}${enPath}`,
        },
      },
    })

    // Skip English for DE-only pages
    if (isDeOnly) continue

    // English
    routes.push({
      url: `${BASE_URL}${enPath}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority * 0.95, // Slightly lower priority for non-default locale
      alternates: {
        languages: {
          de: `${BASE_URL}${dePath || '/'}`,
          en: `${BASE_URL}${enPath}`,
        },
      },
    })
  }

  try {
    const payload = await getPayload({ config })

    // Fetch all services (no status field - all are published)
    const services = await payload.find({
      collection: 'services',
      limit: 100,
    })

    for (const service of services.docs) {
      if (service.slug) {
        const lastMod = new Date(service.updatedAt)
        const dePath = `/de/leistungen/${service.slug}` // No /de/ prefix
        // Use translatePath to translate the full path including service slug
        const enPath = `/en${translatePath(`/leistungen/${service.slug}`)}`

        // German
        routes.push({
          url: `${BASE_URL}${dePath}`,
          lastModified: lastMod,
          changeFrequency: 'monthly',
          priority: 0.8,
          alternates: {
            languages: {
              de: `${BASE_URL}${dePath}`,
              en: `${BASE_URL}${enPath}`,
            },
          },
        })

        // English
        routes.push({
          url: `${BASE_URL}${enPath}`,
          lastModified: lastMod,
          changeFrequency: 'monthly',
          priority: 0.75,
          alternates: {
            languages: {
              de: `${BASE_URL}${dePath}`,
              en: `${BASE_URL}${enPath}`,
            },
          },
        })
      }
    }

    // Fetch all sub-services (no status field)
    const subServices = await payload.find({
      collection: 'sub-services',
      limit: 200,
      depth: 1, // Include parentService
    })

    for (const subService of subServices.docs) {
      if (subService.slug && subService.parentService) {
        const parentSlug = typeof subService.parentService === 'object'
          ? subService.parentService.slug
          : null
        if (parentSlug) {
          // SAFEGUARD: Only emit URLs if EN translation exists
          const enSubSlug = subServiceSlugTranslations[subService.slug]
          if (!enSubSlug) {
            logger.warn(`[SITEMAP] Missing EN translation for subservice slug: ${subService.slug} - skipping URL`)
            continue // Skip this subservice entirely
          }

          const lastMod = new Date(subService.updatedAt)
          const dePath = `/de/leistungen/${parentSlug}/${subService.slug}` // No /de/ prefix
          const enPath = `/en${translatePath(`/leistungen/${parentSlug}`)}/${enSubSlug}`

          routes.push({
            url: `${BASE_URL}${dePath}`,
            lastModified: lastMod,
            changeFrequency: 'monthly',
            priority: 0.7,
            alternates: {
              languages: {
                de: `${BASE_URL}${dePath}`,
                en: `${BASE_URL}${enPath}`,
              },
            },
          })

          routes.push({
            url: `${BASE_URL}${enPath}`,
            lastModified: lastMod,
            changeFrequency: 'monthly',
            priority: 0.65,
            alternates: {
              languages: {
                de: `${BASE_URL}${dePath}`,
                en: `${BASE_URL}${enPath}`,
              },
            },
          })
        }
      }
    }

    // Fetch published blog posts for each locale (slugs are now localized)
    const postsDE = await payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      limit: 500,
      locale: 'de',
    })

    const postsEN = await payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      limit: 500,
      locale: 'en',
    })

    // Create a map of post ID to EN slug for alternates
    const enSlugMap = new Map<string | number, string>()
    for (const post of postsEN.docs) {
      enSlugMap.set(post.id, post.slug)
    }

    // Add blog posts - only include EN version if actually translated
    // (Payload fallback: true means untranslated EN posts serve DE content = duplicate)
    for (const post of postsDE.docs) {
      if (post.slug) {
        const lastMod = post.publishedAt
          ? new Date(post.publishedAt)
          : new Date(post.updatedAt)

        const deSlug = post.slug
        const enSlug = enSlugMap.get(post.id) || post.slug
        // Post is translated if EN slug differs from DE slug
        const isTranslated = enSlug !== deSlug
        const isEnOnly = EN_ONLY_BLOG_POSTS.includes(deSlug as typeof EN_ONLY_BLOG_POSTS[number])

        const dePath = `/de/blog/${deSlug}`
        const enPath = `/en/blog/${enSlug}`

        if (isEnOnly) {
          // EN-only post: only add EN entry, no DE
          routes.push({
            url: `${BASE_URL}${enPath}`,
            lastModified: lastMod,
            changeFrequency: 'monthly',
            priority: post.featured ? 0.7 : 0.6,
          })
        } else if (isTranslated) {
          // Translated post: add both DE and EN with hreflang
          routes.push({
            url: `${BASE_URL}${dePath}`,
            lastModified: lastMod,
            changeFrequency: 'monthly',
            priority: post.featured ? 0.75 : 0.65,
            alternates: {
              languages: {
                de: `${BASE_URL}${dePath}`,
                en: `${BASE_URL}${enPath}`,
              },
            },
          })

          routes.push({
            url: `${BASE_URL}${enPath}`,
            lastModified: lastMod,
            changeFrequency: 'monthly',
            priority: post.featured ? 0.7 : 0.6,
            alternates: {
              languages: {
                de: `${BASE_URL}${dePath}`,
                en: `${BASE_URL}${enPath}`,
              },
            },
          })
        } else {
          // DE-only post: only add DE entry, no EN
          routes.push({
            url: `${BASE_URL}${dePath}`,
            lastModified: lastMod,
            changeFrequency: 'monthly',
            priority: post.featured ? 0.75 : 0.65,
          })
        }
      }
    }

    // Fetch blog categories
    const categories = await payload.find({
      collection: 'categories',
      limit: 50,
    })

    for (const category of categories.docs) {
      if (category.slug) {
        const lastMod = new Date(category.updatedAt)
        const dePath = `/de/blog/kategorie/${category.slug}` // No /de/ prefix
        const enCategorySlug = blogCategorySlugTranslations[category.slug] || category.slug
        const enPath = `/en/blog/category/${enCategorySlug}` // Translated EN path

        routes.push({
          url: `${BASE_URL}${dePath}`,
          lastModified: lastMod,
          changeFrequency: 'weekly',
          priority: 0.6,
          alternates: {
            languages: {
              de: `${BASE_URL}${dePath}`,
              en: `${BASE_URL}${enPath}`,
            },
          },
        })

        routes.push({
          url: `${BASE_URL}${enPath}`,
          lastModified: lastMod,
          changeFrequency: 'weekly',
          priority: 0.55,
          alternates: {
            languages: {
              de: `${BASE_URL}${dePath}`,
              en: `${BASE_URL}${enPath}`,
            },
          },
        })
      }
    }

    // Fetch all projects (no status field - all are published)
    const projects = await payload.find({
      collection: 'projects',
      limit: 200,
    })

    for (const project of projects.docs) {
      if (project.slug) {
        const lastMod = new Date(project.updatedAt)
        const dePath = `/de/projekte/${project.slug}` // No /de/ prefix
        const enPath = `/en/projects/${project.slug}` // Translated EN path

        routes.push({
          url: `${BASE_URL}${dePath}`,
          lastModified: lastMod,
          changeFrequency: 'monthly',
          priority: project.featured ? 0.75 : 0.65,
          alternates: {
            languages: {
              de: `${BASE_URL}${dePath}`,
              en: `${BASE_URL}${enPath}`,
            },
          },
        })

        routes.push({
          url: `${BASE_URL}${enPath}`,
          lastModified: lastMod,
          changeFrequency: 'monthly',
          priority: project.featured ? 0.7 : 0.6,
          alternates: {
            languages: {
              de: `${BASE_URL}${dePath}`,
              en: `${BASE_URL}${enPath}`,
            },
          },
        })
      }
    }

    // Add Lexikon/Glossary entries
    const lexikonSlugs = getAllLexikonSlugs()
    for (const slug of lexikonSlugs) {
      const dePath = `/de/lexikon/${slug}`
      const enPath = `/en/glossary/${slug}`

      routes.push({
        url: `${BASE_URL}${dePath}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.65,
        alternates: {
          languages: {
            de: `${BASE_URL}${dePath}`,
            en: `${BASE_URL}${enPath}`,
          },
        },
      })

      routes.push({
        url: `${BASE_URL}${enPath}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: {
            de: `${BASE_URL}${dePath}`,
            en: `${BASE_URL}${enPath}`,
          },
        },
      })
    }

    // Add Team Member detail pages (E-E-A-T: Expertise signals)
    const teamMembers = await payload.find({
      collection: 'team-members',
      limit: 50,
    })

    for (const member of teamMembers.docs) {
      if (member.slug) {
        const lastMod = new Date(member.updatedAt)
        const dePath = `/de/ueber-uns/team/${member.slug}`
        const enPath = `/en/about-us/team/${member.slug}`

        // German version
        routes.push({
          url: `${BASE_URL}${dePath}`,
          lastModified: lastMod,
          changeFrequency: 'monthly',
          priority: 0.75, // High priority for E-E-A-T
          alternates: {
            languages: {
              de: `${BASE_URL}${dePath}`,
              en: `${BASE_URL}${enPath}`,
            },
          },
        })

        // English version
        routes.push({
          url: `${BASE_URL}${enPath}`,
          lastModified: lastMod,
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: {
            languages: {
              de: `${BASE_URL}${dePath}`,
              en: `${BASE_URL}${enPath}`,
            },
          },
        })
      }
    }

  } catch {
    // CMS fetch failed - return static routes only
  }

  // Deduplicate URLs (keep highest priority when duplicates exist)
  // This handles cases like ecommerce-agentur + onlineshop-agentur → same EN URL
  const urlMap = new Map<string, MetadataRoute.Sitemap[number]>()
  for (const route of routes) {
    const existing = urlMap.get(route.url)
    if (!existing || (route.priority ?? 0) > (existing.priority ?? 0)) {
      urlMap.set(route.url, route)
    }
  }

  return Array.from(urlMap.values())
}
