/**
 * WordPress → Next.js Migration Redirects
 *
 * Old domain: goldenwing.at (WordPress)
 * New domain: goldenwing.at (Next.js)
 *
 * Instructions:
 * 1. Add these redirects to next.config.js
 * 2. Or configure in nginx for goldenwing.at domain
 */

const wordpressRedirects = [
  // ==================== PAGES ====================
  { source: '/impressum/', destination: '/impressum', permanent: true },
  { source: '/kontakt/', destination: '/kontakt', permanent: true },
  { source: '/blog/', destination: '/blog', permanent: true },
  { source: '/datenschutz/', destination: '/datenschutz', permanent: true },
  { source: '/leistungen/', destination: '/leistungen', permanent: true },
  { source: '/portfolio/', destination: '/projekte', permanent: true },
  { source: '/preise/', destination: '/leistungen/pakete', permanent: true },
  { source: '/sitemap/', destination: '/sitemap.xml', permanent: true },

  // Service pages
  { source: '/werbeagentur-wien/', destination: '/kreativagentur-wien', permanent: true },
  { source: '/leistungen/webdesign-wien/', destination: '/webdesign-wien', permanent: true },
  { source: '/leistungen/logodesign-wien/', destination: '/leistungen/branding', permanent: true },
  { source: '/leistungen/suchmaschinenoptimierung-wien/', destination: '/seo-agentur-wien', permanent: true },
  { source: '/leistungen/online-marketing-wien/', destination: '/leistungen/digitale-strategie', permanent: true },
  { source: '/leistungen/online-shop-erstellen-lassen-wien/', destination: '/leistungen/webdesign', permanent: true },
  { source: '/leistungen/corporate-design-agentur-wien/', destination: '/leistungen/branding', permanent: true },
  { source: '/leistungen/domain-webhosting-wien/', destination: '/leistungen/technische-loesungen', permanent: true },
  { source: '/leistungen/beratung/', destination: '/kontakt', permanent: true },
  { source: '/leistungen/wordpress-agentur/', destination: '/leistungen/webdesign', permanent: true },

  // Job page (redirect to about or contact)
  { source: '/webdesigner-grafikdesigner-m-w-d/', destination: '/ueber-uns', permanent: true },

  // ==================== BLOG POSTS ====================
  // These map old WordPress blog slugs to new blog or relevant pages
  { source: '/was-kostet-eine-professionelle-website/', destination: '/blog/was-kostet-eine-professionelle-website', permanent: true },
  { source: '/core-web-vitals-meistern-so-nutzen-sie-google-tag-manager-und-borlabs-cookie-fuer-optimales-tracking/', destination: '/blog/core-web-vitals-optimieren-guide', permanent: true },
  { source: '/barrierefreiheitsgesetz-2025/', destination: '/blog', permanent: true },
  { source: '/seo-tipps-kmu-ngos-2025/', destination: '/blog', permanent: true },
  { source: '/website-foerderung-relaunch-oesterreich/', destination: '/blog', permanent: true },
  { source: '/caching-webentwicklung-beschleunigung/', destination: '/blog', permanent: true },
  { source: '/ein-gutes-logo-erstellen-so-verankern-sie-ihre-marke-im-gedaechtnis/', destination: '/leistungen/branding', permanent: true },
  { source: '/warum-eine-eigene-website-erstellen-schluesselgruende-fuer-ihren-digitalen-auftritt/', destination: '/leistungen/webdesign', permanent: true },
  { source: '/die-10-ultimativen-gruende-um-kuenstliche-intelligenz-in-ihrer-arbeit-zu-nutzen/', destination: '/blog', permanent: true },
  { source: '/die-zukunft-der-seo/', destination: '/leistungen/seo-sichtbarkeit', permanent: true },
  { source: '/unterschied-zwischen-website-homepage-und-webseite/', destination: '/blog', permanent: true },
  { source: '/was-ist-keyword-proximitaet/', destination: '/leistungen/seo-sichtbarkeit', permanent: true },
  { source: '/ui-ux-design-7-tipps-fuer-eine-bessere-website/', destination: '/leistungen/webdesign', permanent: true },
  { source: '/shopify-101-eine-vollstaendige-einfuehrung-in-die-top-e-commerce-plattform/', destination: '/leistungen/webdesign', permanent: true },
  { source: '/bilder-fuer-seo-optimieren-eine-anleitung-zur-verbesserung-der-google-rankings/', destination: '/leistungen/seo-sichtbarkeit', permanent: true },
  { source: '/woocommerce-vs-shopify-welche-e-commerce-plattform-ist-die-richtige-fuer-dein-unternehmen/', destination: '/leistungen/webdesign', permanent: true },
  { source: '/seo-agentur-kosten-was-kostet-professionelle-suchmaschinenoptimierung-in-oesterreich-und-deutschland/', destination: '/seo-agentur-wien', permanent: true },
  { source: '/suchmaschinenoptimierung-seo-fuer-aerzte-so-verbessern-sie-ihre-online-sichtbarkeit/', destination: '/leistungen/seo-sichtbarkeit', permanent: true },
  { source: '/die-kosten-fuer-die-website-erstellung-was-sie-wissen-muessen/', destination: '/blog/was-kostet-eine-professionelle-website', permanent: true },
  { source: '/was-ist-caching-und-wie-beschleunigt-es-ihre-website/', destination: '/blog', permanent: true },
  { source: '/verstaendnis-der-shopify-kosten-ein-umfassender-leitfaden-fuer-unternehmen/', destination: '/leistungen/webdesign', permanent: true },
  { source: '/elementor-vs-wpbakery-welcher-page-builder-bietet-das-beste-geschaeftswert/', destination: '/blog', permanent: true },
  { source: '/website-fuer-aerzte-warum-jede-praxis-eine-gute-webseite-benoetigt/', destination: '/leistungen/webdesign', permanent: true },
  { source: '/seo-tipps-fuer-architekten-optimieren-sie-ihre-seo-rankings/', destination: '/leistungen/seo-sichtbarkeit', permanent: true },
  { source: '/wie-lange-dauert-seo-ehrliche-antwort/', destination: '/leistungen/seo-sichtbarkeit', permanent: true },
  { source: '/barrierefreie-websites-die-wichtigsten-faktoren/', destination: '/leistungen/webdesign', permanent: true },
  { source: '/webdesign-fuer-rechtsanwaelte-eine-effektive-online-praesenz-aufbauen/', destination: '/leistungen/webdesign', permanent: true },
  { source: '/google-ads-agentur-in-wien-ihre-online-werbestrategie-auf-das-naechste-level-heben/', destination: '/leistungen/digitale-strategie', permanent: true },
  { source: '/webseite-kosten-kalkulieren/', destination: '/blog/was-kostet-eine-professionelle-website', permanent: true },

  // ==================== CATCH-ALL ====================
  // Redirect any remaining WordPress URLs to homepage
  // { source: '/:path*', destination: 'https://goldenwing.at/:path*', permanent: true },
]

// For nginx config (goldenwing.at → goldenwing.at)
const nginxRedirectConfig = `
# goldenwing.at → goldenwing.at Redirect
server {
    listen 80;
    listen 443 ssl;
    server_name goldenwing.at www.goldenwing.at;

    ssl_certificate /etc/letsencrypt/live/goldenwing-combined/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/goldenwing-combined/privkey.pem;

    # Specific page redirects
    location = /impressum/ { return 301 https://goldenwing.at/impressum; }
    location = /kontakt/ { return 301 https://goldenwing.at/kontakt; }
    location = /blog/ { return 301 https://goldenwing.at/blog; }
    location = /datenschutz/ { return 301 https://goldenwing.at/datenschutz; }
    location = /leistungen/ { return 301 https://goldenwing.at/leistungen; }
    location = /portfolio/ { return 301 https://goldenwing.at/projekte; }
    location = /preise/ { return 301 https://goldenwing.at/leistungen/pakete; }
    location = /werbeagentur-wien/ { return 301 https://goldenwing.at/kreativagentur-wien; }
    location = /leistungen/webdesign-wien/ { return 301 https://goldenwing.at/webdesign-wien; }
    location = /leistungen/suchmaschinenoptimierung-wien/ { return 301 https://goldenwing.at/seo-agentur-wien; }
    location = /leistungen/logodesign-wien/ { return 301 https://goldenwing.at/leistungen/branding; }
    location = /leistungen/corporate-design-agentur-wien/ { return 301 https://goldenwing.at/leistungen/branding; }
    location = /leistungen/online-marketing-wien/ { return 301 https://goldenwing.at/leistungen/digitale-strategie; }
    location = /leistungen/online-shop-erstellen-lassen-wien/ { return 301 https://goldenwing.at/leistungen/webdesign; }
    location = /leistungen/domain-webhosting-wien/ { return 301 https://goldenwing.at/leistungen/technische-loesungen; }
    location = /leistungen/beratung/ { return 301 https://goldenwing.at/kontakt; }
    location = /leistungen/wordpress-agentur/ { return 301 https://goldenwing.at/leistungen/webdesign; }

    # Catch-all: redirect everything else to homepage
    location / {
        return 301 https://goldenwing.at$request_uri;
    }
}
`

module.exports = { wordpressRedirects, nginxRedirectConfig }
