/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // Always use production URL for sitemap generation
  siteUrl: 'https://goldenwing.at',
  generateRobotsTxt: true,
  generateIndexSitemap: false,

  // Exclude admin and API routes
  exclude: [
    '/admin',
    '/admin/*',
    '/api/*',
    '/(payload)/*',
  ],

  // Robots.txt options
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/_next/'],
      },
    ],
    additionalSitemaps: [
      'https://goldenwing.at/sitemap.xml',
    ],
  },

  // Transform function for custom priority and changefreq
  transform: async (config, path) => {
    // Homepage - highest priority
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }

    // Main sections - high priority
    if (['/leistungen', '/projekte', '/kontakt', '/blog'].includes(path)) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }

    // Service pages - high priority
    if (path.startsWith('/leistungen/') && path.split('/').length === 3) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      }
    }

    // Sub-service pages - medium-high priority
    if (path.startsWith('/leistungen/') && path.split('/').length === 4) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      }
    }

    // Blog posts and project pages - medium priority
    if (path.startsWith('/blog/') || path.startsWith('/projekte/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      }
    }

    // About pages - medium priority
    if (path.startsWith('/ueber-uns')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      }
    }

    // Legal pages - low priority
    if (['/impressum', '/datenschutz', '/rechtliches/cookie-einstellungen'].includes(path)) {
      return {
        loc: path,
        changefreq: 'yearly',
        priority: 0.3,
        lastmod: new Date().toISOString(),
      }
    }

    // Default
    return {
      loc: path,
      changefreq: 'monthly',
      priority: 0.5,
      lastmod: new Date().toISOString(),
    }
  },
}
