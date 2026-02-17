import { SlugMapping } from '../types'

/**
 * Service Slug Mappings - NEW STRUCTURE 2025
 * 6 Main Services with 27 Sub-Services
 */
export const serviceMappings: SlugMapping[] = [
  { de: 'branding', en: 'branding', type: 'service' },
  { de: 'webdesign', en: 'web-design', type: 'service' },
  { de: 'digital-marketing', en: 'digital-marketing', type: 'service' },
  { de: 'seo-content', en: 'seo-content', type: 'service' },
  { de: 'web-app-entwicklung', en: 'web-app-development', type: 'service' },
  { de: 'it-cloud-services', en: 'it-cloud-services', type: 'service' },
]

/**
 * Sub-Service Slug Mappings - NEW STRUCTURE 2025
 * Matches database slugs exactly
 */
export const subServiceMappings: SlugMapping[] = [
  // ============================================
  // BRANDING (4 Sub-Services)
  // ============================================
  { de: 'markenstrategie-positionierung', en: 'brand-strategy-positioning', type: 'sub-service', parent: 'branding' },
  { de: 'visuelle-identitaet', en: 'visual-identity', type: 'sub-service', parent: 'branding' },
  { de: 'markenrichtlinien-vorlagen', en: 'brand-guidelines-templates', type: 'sub-service', parent: 'branding' },
  { de: 'rebranding', en: 'rebranding', type: 'sub-service', parent: 'branding' },

  // ============================================
  // WEBDESIGN (5 Sub-Services)
  // ============================================
  { de: 'informationsarchitektur', en: 'information-architecture', type: 'sub-service', parent: 'webdesign' },
  { de: 'ux-konzepte-prototypen', en: 'ux-concepts-prototypes', type: 'sub-service', parent: 'webdesign' },
  { de: 'ui-design-designsysteme', en: 'ui-design-systems', type: 'sub-service', parent: 'webdesign' },
  { de: 'webentwicklung-cms', en: 'web-development-cms', type: 'sub-service', parent: 'webdesign' },
  { de: 'barrierefreiheit-performance', en: 'accessibility-performance', type: 'sub-service', parent: 'webdesign' },

  // ============================================
  // DIGITAL MARKETING (4 Sub-Services)
  // ============================================
  { de: 'kampagnenstrategie-funnel', en: 'campaign-strategy-funnel', type: 'sub-service', parent: 'digital-marketing' },
  { de: 'paid-media-content-kampagnen', en: 'paid-media-campaigns', type: 'sub-service', parent: 'digital-marketing' },
  { de: 'email-marketing-automatisierung', en: 'email-marketing-automation', type: 'sub-service', parent: 'digital-marketing' },
  { de: 'tracking-optimierung', en: 'tracking-optimization', type: 'sub-service', parent: 'digital-marketing' },

  // ============================================
  // SEO & CONTENT (5 Sub-Services)
  // ============================================
  { de: 'content-strategie-themenplanung', en: 'content-strategy-planning', type: 'sub-service', parent: 'seo-content' },
  { de: 'content-strukturierung', en: 'content-structuring', type: 'sub-service', parent: 'seo-content' },
  { de: 'redaktionsplaene-content-systeme', en: 'editorial-plans-content-systems', type: 'sub-service', parent: 'seo-content' },
  { de: 'content-produktion', en: 'content-production', type: 'sub-service', parent: 'seo-content' },
  { de: 'seo-messung-wirkung', en: 'seo-measurement-impact', type: 'sub-service', parent: 'seo-content' },

  // ============================================
  // WEB- & APP-ENTWICKLUNG (4 Sub-Services)
  // ============================================
  { de: 'technische-architektur', en: 'technical-architecture', type: 'sub-service', parent: 'web-app-entwicklung' },
  { de: 'entwicklung', en: 'development', type: 'sub-service', parent: 'web-app-entwicklung' },
  { de: 'schnittstellen-integrationen', en: 'apis-integrations', type: 'sub-service', parent: 'web-app-entwicklung' },
  { de: 'qualitaetssicherung-testing', en: 'quality-assurance-testing', type: 'sub-service', parent: 'web-app-entwicklung' },

  // ============================================
  // IT & CLOUD SERVICES (5 Sub-Services)
  // ============================================
  { de: 'cloud-architektur-migration', en: 'cloud-architecture-migration', type: 'sub-service', parent: 'it-cloud-services' },
  { de: 'monitoring-wartung', en: 'monitoring-maintenance', type: 'sub-service', parent: 'it-cloud-services' },
  { de: 'sicherheit-backups', en: 'security-backups', type: 'sub-service', parent: 'it-cloud-services' },
  { de: 'technischer-betrieb-support', en: 'technical-operations-support', type: 'sub-service', parent: 'it-cloud-services' },
  { de: 'workflow-automation', en: 'workflow-automation', type: 'sub-service', parent: 'it-cloud-services' },
]

/**
 * Legacy slug mappings for redirects (old → new)
 * Used by middleware to redirect old URLs
 */
export const legacyServiceRedirects: Record<string, string> = {
  // Old main service slugs → new
  'digitale-strategie': 'digital-marketing',
  'seo-sichtbarkeit': 'seo-content',
  'software-entwicklung': 'web-app-entwicklung',
  'technische-loesungen': 'it-cloud-services',
  'content-visuals': 'seo-content',

  // Old sub-service slugs → new locations
  'ux-ui-design': 'webdesign/ui-design-designsysteme',
  'wordpress-webdesign': 'webdesign/webentwicklung-cms',
  'elementor-entwicklung': 'webdesign/webentwicklung-cms',
  'webshops-woocommerce': 'webdesign/webentwicklung-cms',
  'landingpages': 'webdesign/webentwicklung-cms',
  'markenstrategie': 'branding/markenstrategie-positionierung',
  'logo-design': 'branding/visuelle-identitaet',
  'corporate-identity': 'branding/visuelle-identitaet',
  'brand-guidelines': 'branding/markenrichtlinien-vorlagen',
  'zielgruppenanalyse': 'digital-marketing/kampagnenstrategie-funnel',
  'customer-journey-mapping': 'digital-marketing/kampagnenstrategie-funnel',
  'funnel-strategien': 'digital-marketing/kampagnenstrategie-funnel',
  'paid-ads': 'digital-marketing/paid-media-content-kampagnen',
  'social-media-marketing': 'digital-marketing/paid-media-content-kampagnen',
  'e-mail-marketing': 'digital-marketing/email-marketing-automatisierung',
  'seo-audit': 'seo-content/content-strukturierung',
  'keywordstrategie': 'seo-content/content-strategie-themenplanung',
  'copywriting': 'seo-content/content-produktion',
  'content-planung': 'seo-content/redaktionsplaene-content-systeme',
  'business-fotografie': 'seo-content/content-produktion',
  'reels-social-video': 'seo-content/content-produktion',
  'api-integration': 'web-app-entwicklung/schnittstellen-integrationen',
  'web-applications': 'web-app-entwicklung/entwicklung',
  'mobile-apps': 'web-app-entwicklung/entwicklung',
  'qa-testing': 'web-app-entwicklung/qualitaetssicherung-testing',
  'cloud-devops': 'it-cloud-services/cloud-architektur-migration',
  'automatisierung': 'it-cloud-services/workflow-automation',
}
