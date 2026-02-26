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
  },
  ru: {
    // DE slug → correct RU slug
    'branding': 'brending',
    'webdesign': 'veb-dizayn',
    'digital-marketing': 'tsifrovoy-marketing',
    'seo-content': 'seo-kontent',
    'web-app-entwicklung': 'razrabotka-veb-prilozheniy',
    'it-cloud-services': 'it-oblachnye-servisy',
    // EN slug → correct RU slug
    'web-design': 'veb-dizayn',
    'web-app-development': 'razrabotka-veb-prilozheniy',
  },
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

    // Webdesign (5 + 2 NEW)
    'informationsarchitektur': 'information-architecture',
    'ux-konzepte-prototypen': 'ux-concepts-prototypes',
    'ui-design-designsysteme': 'ui-design-systems',
    'webentwicklung-cms': 'web-development-cms',
    'barrierefreiheit-performance': 'accessibility-performance',
    // NEW: Additional Webdesign sub-services (landing pages)
    'cms-entwicklung': 'cms-development',
    'ui-design-design-systems': 'ui-design-design-systems',

    // Digital Marketing (4)
    'kampagnenstrategie-funnel': 'campaign-strategy-funnel',
    'paid-media-content-kampagnen': 'paid-media-campaigns',
    'email-marketing-automatisierung': 'email-marketing-automation',
    'tracking-optimierung': 'tracking-optimization',

    // SEO & Content (5 + 5 NEW)
    'content-strategie-themenplanung': 'content-strategy-planning',
    'content-strukturierung': 'content-structuring',
    'redaktionsplaene-content-systeme': 'editorial-plans-content-systems',
    'content-produktion': 'content-production',
    'seo-messung-wirkung': 'seo-measurement-impact',
    // NEW: Additional SEO sub-services (landing pages)
    'technical-seo': 'technical-seo',
    'local-seo': 'local-seo',
    'on-page-optimierung': 'on-page-optimization',
    'offpage-linkbuilding': 'offpage-link-building',
    'content-strategie-produktion': 'content-strategy-production',

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

    // Webdesign (5 + 2 NEW)
    'information-architecture': 'informationsarchitektur',
    'ux-concepts-prototypes': 'ux-konzepte-prototypen',
    'ui-design-systems': 'ui-design-designsysteme',
    'web-development-cms': 'webentwicklung-cms',
    'accessibility-performance': 'barrierefreiheit-performance',
    // NEW: Additional Webdesign sub-services (landing pages)
    'cms-development': 'cms-entwicklung',
    'ui-design-design-systems': 'ui-design-design-systems',

    // Digital Marketing (4)
    'campaign-strategy-funnel': 'kampagnenstrategie-funnel',
    'paid-media-campaigns': 'paid-media-content-kampagnen',
    'email-marketing-automation': 'email-marketing-automatisierung',
    'tracking-optimization': 'tracking-optimierung',

    // SEO & Content (5 + 5 NEW)
    'content-strategy-planning': 'content-strategie-themenplanung',
    'content-structuring': 'content-strukturierung',
    'editorial-plans-content-systems': 'redaktionsplaene-content-systeme',
    'content-production': 'content-produktion',
    'seo-measurement-impact': 'seo-messung-wirkung',
    // NEW: Additional SEO sub-services (landing pages)
    'technical-seo': 'technical-seo',
    'local-seo': 'local-seo',
    'on-page-optimization': 'on-page-optimierung',
    'offpage-link-building': 'offpage-linkbuilding',
    'content-strategy-production': 'content-strategie-produktion',

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
  },
  // RU uses EN slugs for sub-services; DE slugs redirect to EN slugs
  ru: {
    // Branding
    'markenstrategie-positionierung': 'brand-strategy-positioning',
    'visuelle-identitaet': 'visual-identity',
    'markenrichtlinien-vorlagen': 'brand-guidelines-templates',
    // Webdesign
    'informationsarchitektur': 'information-architecture',
    'ux-konzepte-prototypen': 'ux-concepts-prototypes',
    'ui-design-designsysteme': 'ui-design-systems',
    'webentwicklung-cms': 'web-development-cms',
    'barrierefreiheit-performance': 'accessibility-performance',
    // Digital Marketing
    'kampagnenstrategie-funnel': 'campaign-strategy-funnel',
    'paid-media-content-kampagnen': 'paid-media-campaigns',
    'email-marketing-automatisierung': 'email-marketing-automation',
    'tracking-optimierung': 'tracking-optimization',
    // SEO & Content
    'content-strategie-themenplanung': 'content-strategy-planning',
    'content-strukturierung': 'content-structuring',
    'redaktionsplaene-content-systeme': 'editorial-plans-content-systems',
    'content-produktion': 'content-production',
    'seo-messung-wirkung': 'seo-measurement-impact',
    // NEW: Additional SEO sub-services (landing pages)
    'technical-seo': 'technical-seo',
    'local-seo': 'local-seo',
    'on-page-optimierung': 'on-page-optimization',
    'offpage-linkbuilding': 'offpage-link-building',
    'content-strategie-produktion': 'content-strategy-production',
    // NEW: Additional Webdesign sub-services (landing pages)
    'cms-entwicklung': 'cms-development',
    'ui-design-design-systems': 'ui-design-design-systems',
    // Web- & App-Entwicklung
    'technische-architektur': 'technical-architecture',
    'entwicklung': 'development',
    'schnittstellen-integrationen': 'apis-integrations',
    'qualitaetssicherung-testing': 'quality-assurance-testing',
    // IT & Cloud Services
    'cloud-architektur-migration': 'cloud-architecture-migration',
    'monitoring-wartung': 'monitoring-maintenance',
    'sicherheit-backups': 'security-backups',
    'technischer-betrieb-support': 'technical-operations-support',
  },
} as const

export type SubServiceSlugDE = keyof typeof SUB_SERVICE_SLUGS.de
export type SubServiceSlugEN = keyof typeof SUB_SERVICE_SLUGS.en

// ============================================================
// ADDITIONAL SERVICE SLUGS (10 AEO Service Pages)
// ============================================================
export const ADDITIONAL_SERVICE_SLUGS = {
  de: {
    'seo-texter': 'seo-copywriter',
    'seo-berater': 'seo-consultant',
    'grafikdesign': 'graphic-design',
    'onlineshop-agentur': 'ecommerce-agency',
    'google-ads-agentur': 'google-ads-agency',
    'social-media-agentur': 'social-media-agency',
    'wordpress-agentur': 'wordpress-agency',
    'seo-betreuung': 'seo-support',
    'sea-agentur': 'sea-agency',
    'ecommerce-agentur': 'ecommerce-agency',
  },
  en: {
    'seo-copywriter': 'seo-texter',
    'seo-consultant': 'seo-berater',
    'graphic-design': 'grafikdesign',
    'ecommerce-agency': 'onlineshop-agentur',
    'google-ads-agency': 'google-ads-agentur',
    'social-media-agency': 'social-media-agentur',
    'wordpress-agency': 'wordpress-agentur',
    'seo-support': 'seo-betreuung',
    'sea-agency': 'sea-agentur',
  },
  ru: {
    // DE slug → correct RU slug
    'seo-texter': 'seo-kopirayting',
    'seo-berater': 'seo-konsultant',
    'grafikdesign': 'graficheskiy-dizayn',
    'onlineshop-agentur': 'agentstvo-internet-magazinov',
    'google-ads-agentur': 'agentstvo-google-ads',
    'social-media-agentur': 'agentstvo-sotsialnykh-setey',
    'wordpress-agentur': 'agentstvo-wordpress',
    'seo-betreuung': 'seo-podderzhka',
    'sea-agentur': 'agentstvo-sea',
    'ecommerce-agentur': 'agentstvo-ecommerce',
    // EN slug → correct RU slug
    'seo-copywriter': 'seo-kopirayting',
    'seo-consultant': 'seo-konsultant',
    'graphic-design': 'graficheskiy-dizayn',
    'ecommerce-agency': 'agentstvo-internet-magazinov',
    'google-ads-agency': 'agentstvo-google-ads',
    'social-media-agency': 'agentstvo-sotsialnykh-setey',
    'wordpress-agency': 'agentstvo-wordpress',
    'seo-support': 'seo-podderzhka',
    'sea-agency': 'agentstvo-sea',
  },
} as const

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
  },
  ru: {
    // DE slug → correct RU slug
    'branding': 'brending',
    'webdesign': 'veb-dizayn',
    'seo': 'seo',
    'marketing': 'marketing',
    'entwicklung': 'razrabotka',
    'e-commerce': 'e-commerce',
    'industrie': 'industriya',
    'technologie': 'tekhnologii',
    'dienstleistung': 'konsalting',
    'it-cloud': 'it-oblako',
    // EN slug → correct RU slug
    'web-design': 'veb-dizayn',
    'development': 'razrabotka',
    'industry': 'industriya',
    'technology': 'tekhnologii',
    'consulting': 'konsalting',
  },
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
    // REMOVED: 'local-seo-oesterreich-guide' - this post is EN-only, no German version exists
    'webdesign-trends-2025': 'web-design-trends-2025',
    'content-marketing-strategie-guide': 'content-marketing-strategy-guide',
    'website-optimieren-guide': 'website-optimization-guide',
    'google-ranking-verbessern': 'improve-google-ranking',
    'suchmaschinenoptimierung-tipps': 'seo-optimization-tips',
    'webdesign-und-seo-kombinieren': 'combining-web-design-and-seo',
    'wordpress-website-erstellen-anleitung': 'create-wordpress-website-guide',
    'youtube-seo-guide': 'youtube-seo-guide',
    'backlinks-aufbauen-guide': 'build-backlinks-guide',
    'seo-kosten-guide': 'seo-costs-guide',
    'wix-alternative-professionelles-webdesign': 'wix-alternative-professional-web-design',
    // 2026 posts
    'geo-2026-seo-reicht-nicht-mehr': 'geo-2026-seo-is-not-enough',
    'local-seo-guide': 'local-seo-guide',
    'wordpress-seo-guide': 'wordpress-seo-guide',
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
    // REMOVED: 'local-seo-austria-guide' - this post is EN-only, mapping caused redirect loop
    'web-design-trends-2025': 'webdesign-trends-2025',
    'content-marketing-strategy-guide': 'content-marketing-strategie-guide',
    'website-optimization-guide': 'website-optimieren-guide',
    'improve-google-ranking': 'google-ranking-verbessern',
    'seo-optimization-tips': 'suchmaschinenoptimierung-tipps',
    'combining-web-design-and-seo': 'webdesign-und-seo-kombinieren',
    'create-wordpress-website-guide': 'wordpress-website-erstellen-anleitung',
    'youtube-seo-guide': 'youtube-seo-guide',
    'build-backlinks-guide': 'backlinks-aufbauen-guide',
    'seo-costs-guide': 'seo-kosten-guide',
    'wix-alternative-professional-web-design': 'wix-alternative-professionelles-webdesign',
    // 2026 posts
    'geo-2026-seo-is-not-enough': 'geo-2026-seo-reicht-nicht-mehr',
    'local-seo-guide': 'local-seo-guide',
    'wordpress-seo-guide': 'wordpress-seo-guide',
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
