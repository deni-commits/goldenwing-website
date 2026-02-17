// ============================================================
// GOLDENWING SLUG MAPPINGS - SINGLE SOURCE OF TRUTH
// ============================================================
// This file is the ONLY place where slug translations are defined.
// All other files (middleware.ts, utils.ts, sitemap.ts) MUST import from here.
//
// DO NOT DUPLICATE THESE MAPPINGS ELSEWHERE!
// ============================================================

export type Locale = 'de' | 'en' | 'ru'

// ============================================================
// SERVICE SLUGS (6 Main Services)
// ============================================================
export const SERVICE_SLUGS = {
  de: {
    'branding': 'branding',
    'webdesign': 'web-design',
    'digital-marketing': 'digital-marketing',
    'seo-content': 'seo-content',
    'web-app-entwicklung': 'web-app-development',
    'it-cloud-services': 'it-cloud-services',
  },
  en: {
    'branding': 'branding',
    'web-design': 'webdesign',
    'digital-marketing': 'digital-marketing',
    'seo-content': 'seo-content',
    'web-app-development': 'web-app-entwicklung',
    'it-cloud-services': 'it-cloud-services',
  }
} as const

export type ServiceSlugDE = keyof typeof SERVICE_SLUGS.de
export type ServiceSlugEN = keyof typeof SERVICE_SLUGS.en

// ============================================================
// SUB-SERVICE SLUGS (27 Sub-Services)
// ============================================================
export const SUB_SERVICE_SLUGS = {
  de: {
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
  },
  en: {
    // Branding (4)
    'brand-strategy-positioning': 'markenstrategie-positionierung',
    'visual-identity': 'visuelle-identitaet',
    'brand-guidelines-templates': 'markenrichtlinien-vorlagen',
    'rebranding': 'rebranding',

    // Webdesign (5)
    'information-architecture': 'informationsarchitektur',
    'ux-concepts-prototypes': 'ux-konzepte-prototypen',
    'ui-design-systems': 'ui-design-designsysteme',
    'web-development-cms': 'webentwicklung-cms',
    'accessibility-performance': 'barrierefreiheit-performance',

    // Digital Marketing (4)
    'campaign-strategy-funnel': 'kampagnenstrategie-funnel',
    'paid-media-campaigns': 'paid-media-content-kampagnen',
    'email-marketing-automation': 'email-marketing-automatisierung',
    'tracking-optimization': 'tracking-optimierung',

    // SEO & Content (5)
    'content-strategy-planning': 'content-strategie-themenplanung',
    'content-structuring': 'content-strukturierung',
    'editorial-plans-content-systems': 'redaktionsplaene-content-systeme',
    'content-production': 'content-produktion',
    'seo-measurement-impact': 'seo-messung-wirkung',

    // Web- & App-Entwicklung (4)
    'technical-architecture': 'technische-architektur',
    'development': 'entwicklung',
    'apis-integrations': 'schnittstellen-integrationen',
    'quality-assurance-testing': 'qualitaetssicherung-testing',

    // IT & Cloud Services (5)
    'cloud-architecture-migration': 'cloud-architektur-migration',
    'monitoring-maintenance': 'monitoring-wartung',
    'security-backups': 'sicherheit-backups',
    'technical-operations-support': 'technischer-betrieb-support',
    'workflow-automation': 'workflow-automation',
  }
} as const

export type SubServiceSlugDE = keyof typeof SUB_SERVICE_SLUGS.de
export type SubServiceSlugEN = keyof typeof SUB_SERVICE_SLUGS.en

// ============================================================
// LEGACY SERVICE REDIRECTS (Old URLs → New URLs)
// ============================================================
export const LEGACY_SERVICE_REDIRECTS: Record<string, string> = {
  // Old German slugs
  'digitales-marketing': 'digital-marketing',
  'seo-sichtbarkeit': 'seo-content',
  'software-entwicklung': 'web-app-entwicklung',
  'technische-loesungen': 'it-cloud-services',
  'digitale-strategie': 'digital-marketing',
  'content-visuals': 'seo-content',
  // Semrush discovered soft-404s (2026-01-16)
  'entwicklung': 'web-app-entwicklung',
  'it-cloud': 'it-cloud-services',
  'marketing': 'digital-marketing',
  'seo': 'seo-content',
  'software': 'web-app-entwicklung',
  'strategie': 'digital-marketing',
  // EN versions
  'digital-strategy': 'digital-marketing',
  'seo-visibility': 'seo-content',
  'technical-solutions': 'it-cloud-services',
}

// ============================================================
// REFERENCE/PORTFOLIO CATEGORY SLUGS
// ============================================================
export const REFERENCE_SLUGS = {
  de: {
    'branding': 'branding',
    'webdesign': 'web-design',
    'seo': 'seo',
    'marketing': 'marketing',
    'entwicklung': 'development',
    'e-commerce': 'e-commerce',
    'industrie': 'industry',
    'technologie': 'technology',
    'dienstleistung': 'consulting',
    'it-cloud': 'it-cloud',
  },
  en: {
    'branding': 'branding',
    'web-design': 'webdesign',
    'seo': 'seo',
    'marketing': 'marketing',
    'development': 'entwicklung',
    'e-commerce': 'e-commerce',
    'industry': 'industrie',
    'technology': 'technologie',
    'consulting': 'dienstleistung',
    'it-cloud': 'it-cloud',
  }
} as const

// ============================================================
// BLOG CATEGORY SLUGS
// ============================================================
export const BLOG_CATEGORY_SLUGS = {
  de: {
    'design': 'design',
    'technologie': 'technology',
    'marketing': 'marketing',
    'strategie': 'strategy',
    'business': 'business',
    'seo': 'seo',
    'webdesign': 'web-design',
    'branding': 'branding',
    'ui-ux': 'ui-ux',
  },
  en: {
    'design': 'design',
    'technology': 'technologie',
    'marketing': 'marketing',
    'strategy': 'strategie',
    'business': 'business',
    'seo': 'seo',
    'web-design': 'webdesign',
    'branding': 'branding',
    'ui-ux': 'ui-ux',
  }
} as const

// ============================================================
// PACKAGE SLUGS
// ============================================================
export const PACKAGE_SLUGS = {
  de: {
    'brand-web-foundation': 'brand-web-foundation',
    'seo-content-growth': 'seo-content-growth',
    'demand-gen-suite': 'demand-gen-suite',
    'individuelles-paket': 'custom-package',
  },
  en: {
    'brand-web-foundation': 'brand-web-foundation',
    'seo-content-growth': 'seo-content-growth',
    'demand-gen-suite': 'demand-gen-suite',
    'custom-package': 'individuelles-paket',
  }
} as const

// ============================================================
// BLOG POST SLUGS (for cross-locale redirects)
// ============================================================
export const BLOG_POST_SLUGS = {
  de: {
    'was-kostet-eine-professionelle-website': 'professional-website-cost-2025',
    'wordpress-oder-webflow-vergleich': 'wordpress-vs-webflow-comparison',
    'core-web-vitals-optimieren-guide': 'core-web-vitals-optimization-guide',
    'markenidentitaet-entwickeln-leitfaden': 'brand-identity-development-guide',
    'seo-fuer-anfaenger-guide': 'seo-beginners-guide',
    'customer-journey-mapping-guide': 'customer-journey-mapping-guide',
    'bilder-fuer-web-optimieren': 'web-image-optimization-guide',
    'seo-vs-geo-ai-suche': 'seo-vs-geo-ai-search',
    'google-ads-kosten-guide': 'google-ads-cost-guide',
    'local-seo-oesterreich-guide': 'local-seo-austria-guide',
    'webdesign-trends-2025': 'web-design-trends-2025',
  },
  en: {
    'professional-website-cost-2025': 'was-kostet-eine-professionelle-website',
    'wordpress-vs-webflow-comparison': 'wordpress-oder-webflow-vergleich',
    'core-web-vitals-optimization-guide': 'core-web-vitals-optimieren-guide',
    'brand-identity-development-guide': 'markenidentitaet-entwickeln-leitfaden',
    'seo-beginners-guide': 'seo-fuer-anfaenger-guide',
    'customer-journey-mapping-guide': 'customer-journey-mapping-guide',
    'web-image-optimization-guide': 'bilder-fuer-web-optimieren',
    'seo-vs-geo-ai-search': 'seo-vs-geo-ai-suche',
    'google-ads-cost-guide': 'google-ads-kosten-guide',
    'local-seo-austria-guide': 'local-seo-oesterreich-guide',
    'web-design-trends-2025': 'webdesign-trends-2025',
  }
} as const

// ============================================================
// EN-ONLY CONTENT (no German translation available)
// ============================================================
export const EN_ONLY_BLOG_POSTS = [
  'local-seo-austria-guide',
] as const

// ============================================================
// PATH TRANSLATIONS (for URL structure)
// ============================================================
export const PATH_TRANSLATIONS = {
  // Main sections
  'leistungen': 'services',
  'services': 'leistungen',
  'referenzen': 'references',
  'references': 'referenzen',
  'ueber-uns': 'about-us',
  'about-us': 'ueber-uns',
  'kontakt': 'contact',
  'contact': 'kontakt',
  'standorte': 'locations',
  'locations': 'standorte',
  'projekte': 'projects',
  'projects': 'projekte',
  'lexikon': 'glossary',
  'glossary': 'lexikon',
  'ressourcen': 'resources',
  'resources': 'ressourcen',
  'datenschutz': 'privacy-policy',
  'privacy-policy': 'datenschutz',
  'impressum': 'imprint',
  'imprint': 'impressum',
  'haeufige-fragen': 'faq',
  'faq': 'haeufige-fragen',
  // Sub-paths
  'team': 'team',
  'kultur': 'culture',
  'culture': 'kultur',
  'werte': 'values',
  'values': 'werte',
  'partner': 'partners',
  'partners': 'partner',
  'pakete': 'packages',
  'packages': 'pakete',
  'kategorie': 'category',
  'category': 'kategorie',
  'downloads': 'downloads',
  'newsletter': 'newsletter',
} as const

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Translate a service slug between locales
 */
export function translateServiceSlug(slug: string, fromLocale: Locale, toLocale: Locale): string | null {
  if (fromLocale === toLocale) return slug

  const mappings = fromLocale === 'de' ? SERVICE_SLUGS.de : SERVICE_SLUGS.en
  const translated = mappings[slug as keyof typeof mappings]

  return translated || null
}

/**
 * Translate a sub-service slug between locales
 */
export function translateSubServiceSlug(slug: string, fromLocale: Locale, toLocale: Locale): string | null {
  if (fromLocale === toLocale) return slug

  const mappings = fromLocale === 'de' ? SUB_SERVICE_SLUGS.de : SUB_SERVICE_SLUGS.en
  const translated = mappings[slug as keyof typeof mappings]

  return translated || null
}

/**
 * Translate a reference category slug between locales
 */
export function translateReferenceSlug(slug: string, fromLocale: Locale, toLocale: Locale): string | null {
  if (fromLocale === toLocale) return slug

  const mappings = fromLocale === 'de' ? REFERENCE_SLUGS.de : REFERENCE_SLUGS.en
  const translated = mappings[slug as keyof typeof mappings]

  return translated || null
}

/**
 * Translate a blog category slug between locales
 */
export function translateBlogCategorySlug(slug: string, fromLocale: Locale, toLocale: Locale): string | null {
  if (fromLocale === toLocale) return slug

  const mappings = fromLocale === 'de' ? BLOG_CATEGORY_SLUGS.de : BLOG_CATEGORY_SLUGS.en
  const translated = mappings[slug as keyof typeof mappings]

  return translated || null
}

/**
 * Translate a package slug between locales
 */
export function translatePackageSlug(slug: string, fromLocale: Locale, toLocale: Locale): string | null {
  if (fromLocale === toLocale) return slug

  const mappings = fromLocale === 'de' ? PACKAGE_SLUGS.de : PACKAGE_SLUGS.en
  const translated = mappings[slug as keyof typeof mappings]

  return translated || null
}

/**
 * Translate a blog post slug between locales
 */
export function translateBlogPostSlug(slug: string, fromLocale: Locale, toLocale: Locale): string | null {
  if (fromLocale === toLocale) return slug

  const mappings = fromLocale === 'de' ? BLOG_POST_SLUGS.de : BLOG_POST_SLUGS.en
  const translated = mappings[slug as keyof typeof mappings]

  return translated || null
}

/**
 * Check if a blog post is EN-only (no German translation)
 */
export function isEnOnlyBlogPost(slug: string): boolean {
  return EN_ONLY_BLOG_POSTS.includes(slug as typeof EN_ONLY_BLOG_POSTS[number])
}

/**
 * Get the legacy redirect target for an old service slug
 */
export function getLegacyServiceRedirect(slug: string): string | null {
  return LEGACY_SERVICE_REDIRECTS[slug] || null
}

/**
 * Translate a path segment (e.g., 'leistungen' → 'services')
 */
export function translatePathSegment(segment: string): string {
  return PATH_TRANSLATIONS[segment as keyof typeof PATH_TRANSLATIONS] || segment
}

// ============================================================
// VALIDATION (for build-time checks)
// ============================================================

/**
 * Validate that all DE slugs have EN translations and vice versa
 */
export function validateSlugMappings(): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Check SERVICE_SLUGS bidirectional mapping
  for (const [deSlug, enSlug] of Object.entries(SERVICE_SLUGS.de)) {
    if (!SERVICE_SLUGS.en[enSlug as keyof typeof SERVICE_SLUGS.en]) {
      errors.push(`SERVICE_SLUGS: DE slug "${deSlug}" maps to EN "${enSlug}" but reverse mapping missing`)
    }
  }

  // Check SUB_SERVICE_SLUGS bidirectional mapping
  for (const [deSlug, enSlug] of Object.entries(SUB_SERVICE_SLUGS.de)) {
    if (!SUB_SERVICE_SLUGS.en[enSlug as keyof typeof SUB_SERVICE_SLUGS.en]) {
      errors.push(`SUB_SERVICE_SLUGS: DE slug "${deSlug}" maps to EN "${enSlug}" but reverse mapping missing`)
    }
  }

  // Check REFERENCE_SLUGS bidirectional mapping
  for (const [deSlug, enSlug] of Object.entries(REFERENCE_SLUGS.de)) {
    if (!REFERENCE_SLUGS.en[enSlug as keyof typeof REFERENCE_SLUGS.en]) {
      errors.push(`REFERENCE_SLUGS: DE slug "${deSlug}" maps to EN "${enSlug}" but reverse mapping missing`)
    }
  }

  // Check BLOG_CATEGORY_SLUGS bidirectional mapping
  for (const [deSlug, enSlug] of Object.entries(BLOG_CATEGORY_SLUGS.de)) {
    if (!BLOG_CATEGORY_SLUGS.en[enSlug as keyof typeof BLOG_CATEGORY_SLUGS.en]) {
      errors.push(`BLOG_CATEGORY_SLUGS: DE slug "${deSlug}" maps to EN "${enSlug}" but reverse mapping missing`)
    }
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

// Run validation on import in development
if (process.env.NODE_ENV === 'development') {
  const validation = validateSlugMappings()
  if (!validation.valid) {
    console.warn('⚠️ Slug mapping validation errors:')
    validation.errors.forEach(err => console.warn(`  - ${err}`))
  }
}
