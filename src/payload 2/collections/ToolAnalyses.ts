import type { CollectionConfig } from 'payload'

export const ToolAnalyses: CollectionConfig = {
  slug: 'tool-analyses',
  labels: {
    singular: 'Tool-Analyse',
    plural: 'Tool-Analysen',
  },
  admin: {
    useAsTitle: 'url',
    defaultColumns: ['url', 'toolType', 'overallScore', 'unlocked', 'createdAt'],
    group: 'Marketing',
  },
  access: {
    // Anyone can read their own analysis (by ID)
    read: () => true,
    // Allow public submissions via API
    create: () => true,
    // Only admins can update/delete
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    // Basic Info
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'Analysierte URL',
      admin: {
        description: 'Die URL die analysiert wurde',
      },
    },
    {
      name: 'toolType',
      type: 'select',
      required: true,
      options: [
        { label: 'SEO Checker', value: 'seo' },
        { label: 'Performance Checker', value: 'performance' },
        { label: 'Design Analyzer', value: 'design' },
        { label: 'Security Checker', value: 'security' },
        { label: 'Website Analyzer (Alle)', value: 'combined' },
      ],
      defaultValue: 'seo',
      label: 'Tool-Typ',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Wird verarbeitet', value: 'processing' },
        { label: 'Abgeschlossen', value: 'completed' },
        { label: 'Fehlgeschlagen', value: 'failed' },
      ],
      defaultValue: 'processing',
      label: 'Status',
      admin: {
        position: 'sidebar',
      },
    },

    // Scores (0-100)
    {
      name: 'scores',
      type: 'group',
      label: 'Scores',
      fields: [
        {
          name: 'overall',
          type: 'number',
          min: 0,
          max: 100,
          label: 'Gesamt-Score',
        },
        {
          name: 'seo',
          type: 'number',
          min: 0,
          max: 100,
          label: 'SEO Score',
        },
        {
          name: 'performance',
          type: 'number',
          min: 0,
          max: 100,
          label: 'Performance Score',
        },
        {
          name: 'design',
          type: 'number',
          min: 0,
          max: 100,
          label: 'Design Score',
        },
        {
          name: 'security',
          type: 'number',
          min: 0,
          max: 100,
          label: 'Security Score',
        },
      ],
    },

    // Screenshots
    {
      name: 'screenshots',
      type: 'group',
      label: 'Screenshots',
      admin: {
        condition: (data) => data?.status === 'completed',
      },
      fields: [
        {
          name: 'desktop',
          type: 'text',
          label: 'Desktop Screenshot URL',
        },
        {
          name: 'mobile',
          type: 'text',
          label: 'Mobile Screenshot URL',
        },
      ],
    },

    // SEO Data
    {
      name: 'seoData',
      type: 'group',
      label: 'SEO Daten',
      admin: {
        condition: (data) => ['seo', 'combined'].includes(data?.toolType),
      },
      fields: [
        {
          name: 'title',
          type: 'group',
          fields: [
            { name: 'value', type: 'text', label: 'Title' },
            { name: 'length', type: 'number', label: 'Länge' },
            { name: 'status', type: 'select', options: ['good', 'warning', 'error'] },
          ],
        },
        {
          name: 'description',
          type: 'group',
          fields: [
            { name: 'value', type: 'textarea', label: 'Description' },
            { name: 'length', type: 'number', label: 'Länge' },
            { name: 'status', type: 'select', options: ['good', 'warning', 'error'] },
          ],
        },
        {
          name: 'h1',
          type: 'group',
          fields: [
            { name: 'count', type: 'number', label: 'Anzahl H1' },
            { name: 'values', type: 'json', label: 'H1 Texte' },
            { name: 'status', type: 'select', options: ['good', 'warning', 'error'] },
          ],
        },
        {
          name: 'images',
          type: 'group',
          fields: [
            { name: 'total', type: 'number', label: 'Gesamt' },
            { name: 'withoutAlt', type: 'number', label: 'Ohne Alt-Text' },
            { name: 'status', type: 'select', options: ['good', 'warning', 'error'] },
          ],
        },
        {
          name: 'schema',
          type: 'group',
          fields: [
            { name: 'types', type: 'json', label: 'Schema Types' },
            { name: 'status', type: 'select', options: ['good', 'warning', 'error'] },
          ],
        },
        {
          name: 'sitemapFound',
          type: 'checkbox',
          label: 'Sitemap gefunden',
        },
        {
          name: 'robotsFound',
          type: 'checkbox',
          label: 'Robots.txt gefunden',
        },
        {
          name: 'canonicalUrl',
          type: 'text',
          label: 'Canonical URL',
        },
      ],
    },

    // Performance Data
    {
      name: 'performanceData',
      type: 'group',
      label: 'Performance Daten',
      admin: {
        condition: (data) => ['performance', 'combined'].includes(data?.toolType),
      },
      fields: [
        {
          name: 'lcp',
          type: 'group',
          label: 'Largest Contentful Paint',
          fields: [
            { name: 'value', type: 'number', label: 'Wert (ms)' },
            { name: 'rating', type: 'select', options: ['good', 'needs-improvement', 'poor'] },
          ],
        },
        {
          name: 'fcp',
          type: 'group',
          label: 'First Contentful Paint',
          fields: [
            { name: 'value', type: 'number', label: 'Wert (ms)' },
            { name: 'rating', type: 'select', options: ['good', 'needs-improvement', 'poor'] },
          ],
        },
        {
          name: 'cls',
          type: 'group',
          label: 'Cumulative Layout Shift',
          fields: [
            { name: 'value', type: 'number', label: 'Wert' },
            { name: 'rating', type: 'select', options: ['good', 'needs-improvement', 'poor'] },
          ],
        },
        {
          name: 'ttfb',
          type: 'group',
          label: 'Time to First Byte',
          fields: [
            { name: 'value', type: 'number', label: 'Wert (ms)' },
            { name: 'rating', type: 'select', options: ['good', 'needs-improvement', 'poor'] },
          ],
        },
        {
          name: 'pageSize',
          type: 'number',
          label: 'Seitengröße (bytes)',
        },
        {
          name: 'requestCount',
          type: 'number',
          label: 'Anzahl Requests',
        },
      ],
    },

    // Design Data
    {
      name: 'designData',
      type: 'group',
      label: 'Design Daten',
      admin: {
        condition: (data) => ['design', 'combined'].includes(data?.toolType),
      },
      fields: [
        {
          name: 'mobileFriendly',
          type: 'checkbox',
          label: 'Mobile-freundlich',
        },
        {
          name: 'hasViewport',
          type: 'checkbox',
          label: 'Viewport Meta vorhanden',
        },
        {
          name: 'faviconFound',
          type: 'checkbox',
          label: 'Favicon gefunden',
        },
        {
          name: 'ogImage',
          type: 'group',
          fields: [
            { name: 'found', type: 'checkbox', label: 'OG Image gefunden' },
            { name: 'url', type: 'text', label: 'OG Image URL' },
          ],
        },
        {
          name: 'themeColor',
          type: 'text',
          label: 'Theme Color',
        },
      ],
    },

    // Security Data
    {
      name: 'securityData',
      type: 'group',
      label: 'Security Daten',
      admin: {
        condition: (data) => ['security', 'combined'].includes(data?.toolType),
      },
      fields: [
        {
          name: 'https',
          type: 'checkbox',
          label: 'HTTPS aktiv',
        },
        {
          name: 'ssl',
          type: 'group',
          label: 'SSL Zertifikat',
          fields: [
            { name: 'valid', type: 'checkbox', label: 'Gültig' },
            { name: 'expiresAt', type: 'date', label: 'Läuft ab am' },
            { name: 'issuer', type: 'text', label: 'Aussteller' },
          ],
        },
        {
          name: 'headers',
          type: 'group',
          label: 'Security Headers',
          fields: [
            { name: 'xFrameOptions', type: 'checkbox', label: 'X-Frame-Options' },
            { name: 'contentSecurityPolicy', type: 'checkbox', label: 'Content-Security-Policy' },
            { name: 'xContentTypeOptions', type: 'checkbox', label: 'X-Content-Type-Options' },
            { name: 'strictTransportSecurity', type: 'checkbox', label: 'Strict-Transport-Security' },
          ],
        },
        {
          name: 'mixedContent',
          type: 'checkbox',
          label: 'Mixed Content gefunden',
        },
      ],
    },

    // Issues (JSON for flexibility)
    {
      name: 'issues',
      type: 'json',
      label: 'Gefundene Probleme',
      admin: {
        description: 'Array von Issues mit category, severity, title, description, howToFix',
      },
    },

    // Recommendations
    {
      name: 'recommendations',
      type: 'json',
      label: 'Empfehlungen',
      admin: {
        description: 'Array von Empfehlungen mit priority, title, description, impact, effort',
      },
    },

    // Lead Connection
    {
      name: 'unlocked',
      type: 'checkbox',
      defaultValue: false,
      label: 'Freigeschaltet',
      admin: {
        position: 'sidebar',
        description: 'Wurde der vollständige Report freigeschaltet?',
      },
    },
    {
      name: 'unlockedBy',
      type: 'relationship',
      relationTo: 'leads',
      label: 'Freigeschaltet von',
      admin: {
        position: 'sidebar',
        condition: (data) => data?.unlocked,
      },
    },
    {
      name: 'unlockedAt',
      type: 'date',
      label: 'Freigeschaltet am',
      admin: {
        position: 'sidebar',
        condition: (data) => data?.unlocked,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },

    // Error tracking
    {
      name: 'errorMessage',
      type: 'text',
      label: 'Fehlermeldung',
      admin: {
        condition: (data) => data?.status === 'failed',
        description: 'Falls die Analyse fehlgeschlagen ist',
      },
    },
  ],
  timestamps: true,
  hooks: {
    afterRead: [
      // Calculate overall score if not set
      async ({ doc }) => {
        if (doc.scores && !doc.scores.overall && doc.status === 'completed') {
          const scores = [
            doc.scores.seo,
            doc.scores.performance,
            doc.scores.design,
            doc.scores.security,
          ].filter((s) => typeof s === 'number')

          if (scores.length > 0) {
            doc.scores.overall = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
          }
        }
        return doc
      },
    ],
  },
}
