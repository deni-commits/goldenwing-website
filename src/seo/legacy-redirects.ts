/**
 * LEGACY REDIRECTS (MAX 50)
 *
 * Only REAL legacy WordPress URLs that MUST redirect.
 * NO internal restructuring, NO slug translations - those are handled by middleware or not needed.
 *
 * Categories:
 * 1. Legacy WP Blog Posts → Thematic landing pages (32)
 * 2. Legacy WP Service Pages → Current services (13)
 * 3. Legacy WP Main Pages → Current structure (5)
 *
 * TOTAL: 55 redirects
 */

const LEGACY_REDIRECTS = [
  // ===========================================
  // LEGACY WORDPRESS BLOG POSTS → Thematic Landing Pages (32)
  // ===========================================

  // SEO-related posts → SEO Landing Page (9)
  { source: '/die-zukunft-der-seo', destination: '/seo-agentur-wien', permanent: true },
  { source: '/seo-agentur-kosten-was-kostet-professionelle-suchmaschinenoptimierung-in-oesterreich-und-deutschland', destination: '/seo-agentur-wien', permanent: true },
  { source: '/seo-tipps-fuer-architekten-optimieren-sie-ihre-seo-rankings', destination: '/seo-agentur-wien', permanent: true },
  { source: '/seo-tipps-kmu-ngos-2025', destination: '/seo-agentur-wien', permanent: true },
  { source: '/suchmaschinenoptimierung-seo-fuer-aerzte-so-verbessern-sie-ihre-online-sichtbarkeit', destination: '/seo-agentur-wien', permanent: true },
  { source: '/wie-lange-dauert-seo-ehrliche-antwort', destination: '/seo-agentur-wien', permanent: true },
  { source: '/was-ist-keyword-proximitaet', destination: '/seo-agentur-wien', permanent: true },
  { source: '/bilder-fuer-seo-optimieren-eine-anleitung-zur-verbesserung-der-google-rankings', destination: '/seo-agentur-wien', permanent: true },
  { source: '/core-web-vitals-meistern-so-nutzen-sie-google-tag-manager-und-borlabs-cookie-fuer-optimales-tracking', destination: '/seo-agentur-wien', permanent: true },

  // Webdesign-related posts → Webdesign Landing Page (8)
  { source: '/webdesign-fuer-rechtsanwaelte-eine-effektive-online-praesenz-aufbauen', destination: '/webdesign-wien', permanent: true },
  { source: '/website-fuer-aerzte-warum-jede-praxis-eine-gute-webseite-benoetigt', destination: '/webdesign-wien', permanent: true },
  { source: '/ui-ux-design-7-tipps-fuer-eine-bessere-website', destination: '/webdesign-wien', permanent: true },
  { source: '/barrierefreie-websites-die-wichtigsten-faktoren', destination: '/webdesign-wien', permanent: true },
  { source: '/barrierefreiheitsgesetz-2025', destination: '/webdesign-wien', permanent: true },
  { source: '/caching-webentwicklung-beschleunigung', destination: '/webdesign-wien', permanent: true },
  { source: '/was-ist-caching-und-wie-beschleunigt-es-ihre-website', destination: '/webdesign-wien', permanent: true },
  { source: '/elementor-vs-wpbakery-welcher-page-builder-bietet-das-beste-geschaeftswert', destination: '/webdesign-wien', permanent: true },

  // Website costs posts → Contact (Lead Generation) (4)
  { source: '/die-kosten-fuer-die-website-erstellung-was-sie-wissen-muessen', destination: '/kontakt', permanent: true },
  { source: '/was-kostet-eine-professionelle-website', destination: '/kontakt', permanent: true },
  { source: '/webseite-kosten-kalkulieren', destination: '/kontakt', permanent: true },
  { source: '/website-foerderung-relaunch-oesterreich', destination: '/kontakt', permanent: true },

  // Branding post → Branding Service (1)
  { source: '/ein-gutes-logo-erstellen-so-verankern-sie-ihre-marke-im-gedaechtnis', destination: '/leistungen/branding', permanent: true },

  // E-Commerce posts → Webdesign Service (3)
  { source: '/shopify-101-eine-vollstaendige-einfuehrung-in-die-top-e-commerce-plattform', destination: '/leistungen/webdesign', permanent: true },
  { source: '/verstaendnis-der-shopify-kosten-ein-umfassender-leitfaden-fuer-unternehmen', destination: '/leistungen/webdesign', permanent: true },
  { source: '/woocommerce-vs-shopify-welche-e-commerce-plattform-ist-die-richtige-fuer-dein-unternehmen', destination: '/leistungen/webdesign', permanent: true },

  // General posts → Blog or relevant pages (4)
  { source: '/unterschied-zwischen-website-homepage-und-webseite', destination: '/blog', permanent: true },
  { source: '/warum-eine-eigene-website-erstellen-schluesselgruende-fuer-ihren-digitalen-auftritt', destination: '/blog', permanent: true },
  { source: '/die-10-ultimativen-gruende-um-kuenstliche-intelligenz-in-ihrer-arbeit-zu-nutzen', destination: '/blog', permanent: true },
  { source: '/google-ads-agentur-in-wien-ihre-online-werbestrategie-auf-das-naechste-level-heben', destination: '/leistungen/digital-marketing', permanent: true },

  // ===========================================
  // LEGACY WORDPRESS MAIN PAGES (5)
  // ===========================================
  { source: '/digitales-marketing-und-branding-wien', destination: '/', permanent: true },
  { source: '/werbeagentur-wien', destination: '/ueber-uns', permanent: true },
  { source: '/portfolio', destination: '/referenzen', permanent: true },
  { source: '/preise', destination: '/kontakt', permanent: true },
  { source: '/sitemap', destination: '/sitemap.xml', permanent: true },

  // ===========================================
  // LEGACY WORDPRESS SERVICE PAGES (13)
  // ===========================================
  { source: '/leistungen/beratung', destination: '/leistungen/digital-marketing', permanent: true },
  { source: '/leistungen/corporate-design-agentur-wien', destination: '/leistungen/branding', permanent: true },
  { source: '/leistungen/corporate-identity-wien', destination: '/leistungen/branding', permanent: true },
  { source: '/leistungen/domain-webhosting-wien', destination: '/leistungen/it-cloud-services', permanent: true },
  { source: '/leistungen/logo-design-wien', destination: '/leistungen/branding', permanent: true },
  { source: '/leistungen/logodesign-wien', destination: '/leistungen/branding', permanent: true },
  { source: '/leistungen/online-marketing-wien', destination: '/leistungen/digital-marketing', permanent: true },
  { source: '/leistungen/online-shop-erstellen-lassen-wien', destination: '/leistungen/webdesign', permanent: true },
  { source: '/leistungen/seo-agentur-wien', destination: '/seo-agentur-wien', permanent: true },
  { source: '/leistungen/suchmaschinenoptimierung-wien', destination: '/leistungen/seo-content', permanent: true },
  { source: '/leistungen/webdesign-wien', destination: '/webdesign-wien', permanent: true },
  { source: '/leistungen/webhosting-wien', destination: '/leistungen/it-cloud-services', permanent: true },
  { source: '/leistungen/wordpress-agentur-wien', destination: '/leistungen/webdesign', permanent: true },
  { source: '/leistungen/wordpress-agentur', destination: '/leistungen/web-app-entwicklung', permanent: true },

  // Legacy root-level pages found via Deep Audit 2026
  { source: '/suchmaschinenoptimierung-wien', destination: '/seo-agentur-wien', permanent: true },
  { source: '/corporate-design-agentur-wien', destination: '/leistungen/branding', permanent: true },
  { source: '/golden-wing-ihre-webdesign-marketing-agentur-in-oesterreich-fuer-professionelles-branding-seo-und-webdesign', destination: '/', permanent: true },
  { source: '/en/corporate-design-agency-vienna', destination: '/en/services/branding', permanent: true },

  // ===========================================
  // SEMRUSH AUDIT FIXES (2026-02-12)
  // ===========================================
  // Old service URLs without sub-service structure
  { source: '/leistungen/app-entwicklung', destination: '/leistungen/web-app-entwicklung', permanent: true },
  { source: '/leistungen/design', destination: '/leistungen/branding', permanent: true },
  { source: '/leistungen/google-ads', destination: '/leistungen/digital-marketing', permanent: true },
  { source: '/leistungen/online-marketing', destination: '/leistungen/digital-marketing', permanent: true },
  { source: '/leistungen/seo', destination: '/leistungen/seo-content', permanent: true },
  // With locale prefix (direct access)
  { source: '/de/leistungen/app-entwicklung', destination: '/de/leistungen/web-app-entwicklung', permanent: true },
  { source: '/de/leistungen/design', destination: '/de/leistungen/branding', permanent: true },
  { source: '/de/leistungen/google-ads', destination: '/de/leistungen/digital-marketing', permanent: true },
  { source: '/de/leistungen/online-marketing', destination: '/de/leistungen/digital-marketing', permanent: true },
  { source: '/de/leistungen/seo', destination: '/de/leistungen/seo-content', permanent: true },
  { source: '/de/suchmaschinenoptimierung-wien', destination: '/de/seo-agentur-wien', permanent: true },
  // Russian incomplete → redirect to German
  { source: '/ru/:path*', destination: '/de/:path*', permanent: false },
  // Double locale prefix bug
  { source: '/de/de', destination: '/de', permanent: true },
  { source: '/de/de/:path*', destination: '/de/:path*', permanent: true },
  { source: '/en/en', destination: '/en', permanent: true },
  { source: '/en/en/:path*', destination: '/en/:path*', permanent: true },
]

export type LegacyRedirect = typeof LEGACY_REDIRECTS[number]

// CommonJS export for scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LEGACY_REDIRECTS }
}

export { LEGACY_REDIRECTS }
