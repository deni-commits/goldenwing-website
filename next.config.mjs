import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.goldenwing.at',
      },
      {
        protocol: 'https',
        hostname: '**.r2.cloudflarestorage.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  experimental: {
    reactCompiler: false,
  },
  async redirects() {
    return [
      // ===== WordPress Migration Redirects (301 permanent) =====
      // Old WordPress trailing-slash pages → new locale-prefixed routes
      { source: '/impressum/', destination: '/de/impressum', permanent: true },
      { source: '/impressum', destination: '/de/impressum', permanent: true },
      { source: '/kontakt/', destination: '/de/kontakt', permanent: true },
      { source: '/kontakt', destination: '/de/kontakt', permanent: true },
      { source: '/blog/', destination: '/de/blog', permanent: true },
      { source: '/datenschutz/', destination: '/de/datenschutz', permanent: true },
      { source: '/datenschutz', destination: '/de/datenschutz', permanent: true },
      { source: '/leistungen/', destination: '/de/leistungen', permanent: true },
      { source: '/leistungen', destination: '/de/leistungen', permanent: true },
      { source: '/portfolio/', destination: '/de/referenzen', permanent: true },
      { source: '/portfolio', destination: '/de/referenzen', permanent: true },
      { source: '/preise/', destination: '/de/leistungen', permanent: true },
      { source: '/sitemap/', destination: '/sitemap.xml', permanent: true },

      // Old service pages
      { source: '/werbeagentur-wien/', destination: '/de/leistungen', permanent: true },
      { source: '/werbeagentur-wien', destination: '/de/leistungen', permanent: true },
      { source: '/leistungen/webdesign-wien/', destination: '/de/leistungen/webdesign', permanent: true },
      { source: '/leistungen/webdesign-wien', destination: '/de/leistungen/webdesign', permanent: true },
      { source: '/webdesign-wien', destination: '/de/leistungen/webdesign', permanent: true },
      { source: '/leistungen/logodesign-wien/', destination: '/de/leistungen/branding', permanent: true },
      { source: '/leistungen/logodesign-wien', destination: '/de/leistungen/branding', permanent: true },
      { source: '/leistungen/suchmaschinenoptimierung-wien/', destination: '/de/leistungen/seo-sichtbarkeit', permanent: true },
      { source: '/leistungen/suchmaschinenoptimierung-wien', destination: '/de/leistungen/seo-sichtbarkeit', permanent: true },
      { source: '/seo-agentur-wien', destination: '/de/leistungen/seo-sichtbarkeit', permanent: true },
      { source: '/leistungen/online-marketing-wien/', destination: '/de/leistungen/digitale-strategie', permanent: true },
      { source: '/leistungen/online-marketing-wien', destination: '/de/leistungen/digitale-strategie', permanent: true },
      { source: '/leistungen/online-shop-erstellen-lassen-wien/', destination: '/de/leistungen/webdesign', permanent: true },
      { source: '/leistungen/corporate-design-agentur-wien/', destination: '/de/leistungen/branding', permanent: true },
      { source: '/leistungen/domain-webhosting-wien/', destination: '/de/leistungen/technische-loesungen', permanent: true },
      { source: '/leistungen/beratung/', destination: '/de/kontakt', permanent: true },
      { source: '/leistungen/wordpress-agentur/', destination: '/de/leistungen/webdesign', permanent: true },

      // Old blog posts
      { source: '/was-kostet-eine-professionelle-website/', destination: '/de/blog/was-kostet-eine-professionelle-website', permanent: true },
      { source: '/core-web-vitals-meistern-so-nutzen-sie-google-tag-manager-und-borlabs-cookie-fuer-optimales-tracking/', destination: '/de/blog/core-web-vitals-optimieren-guide', permanent: true },
      { source: '/die-zukunft-der-seo/', destination: '/de/leistungen/seo-sichtbarkeit', permanent: true },
      { source: '/die-kosten-fuer-die-website-erstellung-was-sie-wissen-muessen/', destination: '/de/blog/was-kostet-eine-professionelle-website', permanent: true },
      { source: '/webseite-kosten-kalkulieren/', destination: '/de/blog/was-kostet-eine-professionelle-website', permanent: true },
      { source: '/seo-agentur-kosten-was-kostet-professionelle-suchmaschinenoptimierung-in-oesterreich-und-deutschland/', destination: '/de/leistungen/seo-sichtbarkeit', permanent: true },

      // Catch-all old blog posts → blog index
      { source: '/barrierefreiheitsgesetz-2025/', destination: '/de/blog', permanent: true },
      { source: '/seo-tipps-kmu-ngos-2025/', destination: '/de/blog', permanent: true },
      { source: '/website-foerderung-relaunch-oesterreich/', destination: '/de/blog', permanent: true },
      { source: '/caching-webentwicklung-beschleunigung/', destination: '/de/blog', permanent: true },
      { source: '/ein-gutes-logo-erstellen-so-verankern-sie-ihre-marke-im-gedaechtnis/', destination: '/de/leistungen/branding', permanent: true },
      { source: '/ui-ux-design-7-tipps-fuer-eine-bessere-website/', destination: '/de/leistungen/webdesign', permanent: true },
      { source: '/wie-lange-dauert-seo-ehrliche-antwort/', destination: '/de/leistungen/seo-sichtbarkeit', permanent: true },

      // Old job page
      { source: '/webdesigner-grafikdesigner-m-w-d/', destination: '/de/ueber-uns', permanent: true },

      // ===== Old /services → /leistungen =====
      { source: '/:locale(de|en|ru)/services', destination: '/:locale/leistungen', permanent: true },
      { source: '/:locale(de|en|ru)/services/:slug', destination: '/:locale/leistungen/:slug', permanent: true },
      { source: '/:locale(de|en|ru)/services/:slug/:sub', destination: '/:locale/leistungen/:slug/:sub', permanent: true },

      // ===== Locale convenience redirects =====
      // Bare paths without locale → German version
      { source: '/services', destination: '/de/leistungen', permanent: false },
      { source: '/leistungen', destination: '/de/leistungen', permanent: false },
      { source: '/ueber-uns', destination: '/de/ueber-uns', permanent: false },
      { source: '/referenzen', destination: '/de/referenzen', permanent: false },
      { source: '/agb', destination: '/de/agb', permanent: false },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

export default withPayload(nextConfig)
