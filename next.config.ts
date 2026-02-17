import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import { withSentryConfig } from "@sentry/nextjs";
import createNextIntlPlugin from 'next-intl/plugin';
import { LEGACY_REDIRECTS } from './src/seo/legacy-redirects';
import bundleAnalyzer from '@next/bundle-analyzer';
import webpack from 'webpack';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

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
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
  },

  // Legacy redirects from old CMS paths
  async redirects() {
    return LEGACY_REDIRECTS
  },

  // Security headers
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },

  // Disable x-powered-by header
  poweredByHeader: false,

  // Transpile specific packages for better tree-shaking
  transpilePackages: ['lucide-react', 'date-fns'],

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
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
      'class-variance-authority',
      'clsx',
    ],
  },

  // Webpack config for bundle optimization
  webpack: (config) => {
    // Limit date-fns locales to only de, en, ru
    config.plugins.push(
      new webpack.ContextReplacementPlugin(
        /date-fns[/\\]locale$/,
        /^\.\/(de|en-US|ru)$/
      )
    );
    return config;
  },

  // Mark problematic packages as external (server-side only)
  // Fixes undici module resolution issues with Payload CMS
  serverExternalPackages: [
    'undici',
    'sharp',
  ],

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

const sentryConfig = {
  // Sentry webpack plugin options
  silent: true, // Suppresses source map upload logs
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  
  // Upload source maps only when DSN is configured
  disableServerWebpackPlugin: !process.env.SENTRY_DSN,
  disableClientWebpackPlugin: !process.env.NEXT_PUBLIC_SENTRY_DSN,
};

export default withSentryConfig(
  withBundleAnalyzer(withPayload(withNextIntl(nextConfig))),
  sentryConfig
);
