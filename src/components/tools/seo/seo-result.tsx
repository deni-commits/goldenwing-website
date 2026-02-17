'use client'

import { CheckCircle2, XCircle, AlertTriangle, FileText, Image as ImageIcon, Hash, Link2, Code, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScoreRing, ScoreBar } from '@/components/tools/shared'

interface SeoResultProps {
  result: {
    url: string
    score: number
    title: {
      value: string | null
      length: number
      status: 'good' | 'warning' | 'error'
    }
    description: {
      value: string | null
      length: number
      status: 'good' | 'warning' | 'error'
    }
    h1: {
      count: number
      values: string[]
      status: 'good' | 'warning' | 'error'
    }
    headingStructure: {
      h1: number
      h2: number
      h3: number
      status: 'good' | 'warning' | 'error'
    }
    images: {
      total: number
      withoutAlt: number
      status: 'good' | 'warning' | 'error'
    }
    schema: {
      found: boolean
      types: string[]
      status: 'good' | 'warning' | 'error'
    }
    canonical: {
      found: boolean
      url: string | null
      status: 'good' | 'warning' | 'error'
    }
    ogTags: {
      title: string | null
      description: string | null
      image: string | null
      status: 'good' | 'warning' | 'error'
    }
    sitemapFound: boolean
    robotsFound: boolean
    totalIssues: number
    criticalIssues: number
    warningIssues: number
    passedChecks: number
  }
  isLocked?: boolean
  locale?: string
}

interface CheckItemProps {
  icon: React.ReactNode
  label: string
  value: string | number | null
  status: 'good' | 'warning' | 'error'
  sublabel?: string
  isLocked?: boolean
}

function CheckItem({ icon, label, value, status, sublabel, isLocked }: CheckItemProps) {
  const StatusIcon = status === 'good' ? CheckCircle2 : status === 'warning' ? AlertTriangle : XCircle
  const statusColor = status === 'good' ? 'text-green-500' : status === 'warning' ? 'text-orange-500' : 'text-red-500'

  return (
    <div className="flex items-start gap-3 py-3 border-b last:border-0">
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium text-sm">{label}</span>
          <StatusIcon className={cn('h-4 w-4 flex-shrink-0', statusColor)} />
        </div>
        {value !== null && (
          <p className={cn(
            'text-sm text-muted-foreground mt-0.5 truncate',
            isLocked && 'blur-sm select-none'
          )}>
            {value}
          </p>
        )}
        {sublabel && (
          <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>
        )}
      </div>
    </div>
  )
}

export function SeoResult({ result, isLocked = false, locale = 'de' }: SeoResultProps) {
  const translations = {
    de: {
      summary: 'Zusammenfassung',
      criticalIssues: 'Kritische Probleme',
      warnings: 'Warnungen',
      passed: 'Bestanden',
      metaTags: 'Meta-Tags',
      title: 'Title',
      description: 'Description',
      content: 'Inhalt',
      h1Heading: 'H1 Überschrift',
      headingStructure: 'Heading-Struktur',
      images: 'Bilder',
      imagesWithAlt: 'mit Alt-Text',
      technical: 'Technisch',
      canonical: 'Canonical URL',
      schema: 'Schema Markup',
      sitemap: 'Sitemap',
      robots: 'Robots.txt',
      social: 'Social Media',
      ogTags: 'Open Graph',
      characters: 'Zeichen',
      found: 'Gefunden',
      notFound: 'Nicht gefunden',
      typesFound: 'Typen gefunden',
    },
    en: {
      summary: 'Summary',
      criticalIssues: 'Critical Issues',
      warnings: 'Warnings',
      passed: 'Passed',
      metaTags: 'Meta Tags',
      title: 'Title',
      description: 'Description',
      content: 'Content',
      h1Heading: 'H1 Heading',
      headingStructure: 'Heading Structure',
      images: 'Images',
      imagesWithAlt: 'with alt text',
      technical: 'Technical',
      canonical: 'Canonical URL',
      schema: 'Schema Markup',
      sitemap: 'Sitemap',
      robots: 'Robots.txt',
      social: 'Social Media',
      ogTags: 'Open Graph',
      characters: 'characters',
      found: 'Found',
      notFound: 'Not found',
      typesFound: 'types found',
    },
  }
  const t = translations[locale as keyof typeof translations] || translations.de

  return (
    <div className="space-y-8">
      {/* Score Overview */}
      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
        <ScoreRing score={result.score} size="xl" />

        <div className="flex-1 w-full max-w-xl space-y-4">
          <h2 className="text-xl font-bold">{t.summary}</h2>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20">
              <div className="text-2xl font-bold text-red-500">{result.criticalIssues}</div>
              <div className="text-xs text-muted-foreground">{t.criticalIssues}</div>
            </div>
            <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/20">
              <div className="text-2xl font-bold text-orange-500">{result.warningIssues}</div>
              <div className="text-xs text-muted-foreground">{t.warnings}</div>
            </div>
            <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/20">
              <div className="text-2xl font-bold text-green-500">{result.passedChecks}</div>
              <div className="text-xs text-muted-foreground">{t.passed}</div>
            </div>
          </div>

          <ScoreBar
            score={result.score}
            label={locale === 'de' ? 'SEO Score' : 'SEO Score'}
            size="lg"
          />
        </div>
      </div>

      {/* Detailed Checks */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Meta Tags */}
        <div className="rounded-xl border p-4">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            {t.metaTags}
          </h3>
          <div className="space-y-0">
            <CheckItem
              icon={<FileText className="h-4 w-4" />}
              label={t.title}
              value={result.title.value || t.notFound}
              status={result.title.status}
              sublabel={result.title.value ? `${result.title.length} ${t.characters}` : undefined}
              isLocked={isLocked}
            />
            <CheckItem
              icon={<FileText className="h-4 w-4" />}
              label={t.description}
              value={result.description.value ? `${result.description.value.substring(0, 80)}...` : t.notFound}
              status={result.description.status}
              sublabel={result.description.value ? `${result.description.length} ${t.characters}` : undefined}
              isLocked={isLocked}
            />
          </div>
        </div>

        {/* Content Structure */}
        <div className="rounded-xl border p-4">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <Hash className="h-5 w-5 text-primary" />
            {t.content}
          </h3>
          <div className="space-y-0">
            <CheckItem
              icon={<Hash className="h-4 w-4" />}
              label={t.h1Heading}
              value={result.h1.count === 1 ? result.h1.values[0] : `${result.h1.count} H1 Tags`}
              status={result.h1.status}
              isLocked={isLocked}
            />
            <CheckItem
              icon={<Hash className="h-4 w-4" />}
              label={t.headingStructure}
              value={`H2: ${result.headingStructure.h2}, H3: ${result.headingStructure.h3}`}
              status={result.headingStructure.status}
            />
            <CheckItem
              icon={<ImageIcon className="h-4 w-4" />}
              label={t.images}
              value={`${result.images.total - result.images.withoutAlt}/${result.images.total} ${t.imagesWithAlt}`}
              status={result.images.status}
            />
          </div>
        </div>

        {/* Technical */}
        <div className="rounded-xl border p-4">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            {t.technical}
          </h3>
          <div className="space-y-0">
            <CheckItem
              icon={<Link2 className="h-4 w-4" />}
              label={t.canonical}
              value={result.canonical.found ? (isLocked ? '***' : result.canonical.url) : t.notFound}
              status={result.canonical.status}
              isLocked={isLocked}
            />
            <CheckItem
              icon={<Code className="h-4 w-4" />}
              label={t.schema}
              value={result.schema.found ? `${result.schema.types.length} ${t.typesFound}` : t.notFound}
              status={result.schema.status}
            />
            <CheckItem
              icon={<Globe className="h-4 w-4" />}
              label={t.sitemap}
              value={result.sitemapFound ? t.found : t.notFound}
              status={result.sitemapFound ? 'good' : 'warning'}
            />
            <CheckItem
              icon={<Globe className="h-4 w-4" />}
              label={t.robots}
              value={result.robotsFound ? t.found : t.notFound}
              status={result.robotsFound ? 'good' : 'warning'}
            />
          </div>
        </div>

        {/* Social */}
        <div className="rounded-xl border p-4">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            {t.social}
          </h3>
          <div className="space-y-0">
            <CheckItem
              icon={<Globe className="h-4 w-4" />}
              label={`${t.ogTags} Title`}
              value={result.ogTags.title || t.notFound}
              status={result.ogTags.title ? 'good' : 'warning'}
              isLocked={isLocked}
            />
            <CheckItem
              icon={<Globe className="h-4 w-4" />}
              label={`${t.ogTags} Description`}
              value={result.ogTags.description ? `${result.ogTags.description.substring(0, 50)}...` : t.notFound}
              status={result.ogTags.description ? 'good' : 'warning'}
              isLocked={isLocked}
            />
            <CheckItem
              icon={<ImageIcon className="h-4 w-4" />}
              label={`${t.ogTags} Image`}
              value={result.ogTags.image ? t.found : t.notFound}
              status={result.ogTags.image ? 'good' : 'warning'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
