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
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'goldenwing.at',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Prefer AVIF for best compression, WebP as fallback
    formats: ['image/avif', 'image/webp'],
    // Optimized device sizes for common breakpoints
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Long cache TTL for better performance
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },

  // 301 Redirects - ONLY LEGACY WORDPRESS URLs (MAX 50)
  // Source: src/seo/legacy-redirects.ts
  //
  // NOTE: Path translations (e.g. /leistungen → /services) are handled by next-intl routing.ts
  // NOTE: Slug corrections (e.g. DE slug on EN page) are handled by middleware.ts
  // ONLY add redirects here for REAL legacy URLs that must permanently redirect.
  async redirects() {
    return LEGACY_REDIRECTS.map(redirect => ({
      source: redirect.source,
      destination: redirect.destination,
      permanent: true,
    }))
  },

  // Security Headers - only for public pages, not admin
  async headers() {
    const securityHeaders = [
      { key: "X-XSS-Protection", value: "1; mode=block" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          // Note: 'unsafe-inline' needed for Next.js hydration scripts
          // 'unsafe-eval' needed for Next.js dev mode hot reload (only added in development)
          `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''} https://app.cal.com https://www.googletagmanager.com https://analytics.ahrefs.com https://static.cloudflareinsights.com https://feedbax.de https://static.hotjar.com https://*.hotjar.com`,
          "style-src 'self' 'unsafe-inline' https://app.cal.com https://fonts.googleapis.com https://ray.st",
          "img-src 'self' data: https: blob:",
          "font-src 'self' data: https://fonts.gstatic.com https://ray.st",
          "connect-src 'self' https://app.cal.com https://api.resend.com https://analytics.ahrefs.com https://www.google-analytics.com https://region1.google-analytics.com https://www.google.com https://cloudflareinsights.com https://*.hotjar.com https://*.hotjar.io",
          "worker-src 'self' blob:",
          "child-src 'self' https://app.cal.com",
          "frame-src 'self' https://www.google.com https://app.cal.com https://www.googletagmanager.com https://vars.hotjar.com",
          "frame-ancestors 'self'",
          "base-uri 'self'",
          "form-action 'self'",
          "object-src 'none'",
          "upgrade-insecure-requests"
        ].join('; '),
      },
      { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
    ];

    return [
      // Public pages get full security headers
      {
        source: "/((?!admin|api|_next).*)",
        headers: securityHeaders,
      },
      // Cache static assets for 1 year
      {
        source: "/fonts/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/logo.svg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/logo-light.svg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // Cache images for 1 year
      {
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // Cache Next.js optimized images
      {
        source: "/_next/image(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  // Disable x-powered-by header
  poweredByHeader: false,

  // Enable experimental features for Payload
  experimental: {
    reactCompiler: false,
    // Optimize bundle size for common packages
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-icons',
      'date-fns',
      'lodash',
    ],
  },

  // Mark problematic packages as external (server-side only)
  // Fixes undici module resolution issues with Payload CMS
  serverExternalPackages: ['undici'],

  // Rewrite WordPress attack paths to 410 Gone API route
  async rewrites() {
    return {
      beforeFiles: [
        // WordPress paths - return 410 Gone
        { source: '/wp-login.php', destination: '/api/gone' },
        { source: '/wp-admin', destination: '/api/gone' },
        { source: '/wp-admin/', destination: '/api/gone' },
        { source: '/wp-admin/:path*', destination: '/api/gone' },
        { source: '/wp-content', destination: '/api/gone' },
        { source: '/wp-content/:path*', destination: '/api/gone' },
        { source: '/wp-includes', destination: '/api/gone' },
        { source: '/wp-includes/:path*', destination: '/api/gone' },
        { source: '/xmlrpc.php', destination: '/api/gone' },
        { source: '/wordpress', destination: '/api/gone' },
        { source: '/wordpress/:path*', destination: '/api/gone' },
        // Security attack paths
        { source: '/.env', destination: '/api/gone' },
        { source: '/.env.local', destination: '/api/gone' },
        { source: '/.env.production', destination: '/api/gone' },
        { source: '/phpmyadmin/:path*', destination: '/api/gone' },
        { source: '/admin.php', destination: '/api/gone' },
      ],
      afterFiles: [],
      fallback: [],
    }
  },
};

export default withPayload(withNextIntl(nextConfig));
