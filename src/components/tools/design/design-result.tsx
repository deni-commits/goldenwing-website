'use client'

import { useState } from 'react'
import {
  Smartphone,
  Image as ImageIcon,
  Palette,
  Share2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Globe,
  Type,
  Moon,
  Sun,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScoreRing, ScoreBar } from '@/components/tools/shared'
import { OgPreview } from './og-preview'
import { Button } from '@/components/ui/button'

interface DesignResultProps {
  result: {
    url: string
    score: number
    viewport: {
      found: boolean
      content: string | null
      status: 'good' | 'warning' | 'error'
    }
    favicon: {
      found: boolean
      url: string | null
      type: string | null
      status: 'good' | 'warning' | 'error'
    }
    appleTouchIcon: {
      found: boolean
      url: string | null
      sizes: string | null
      status: 'good' | 'warning' | 'error'
    }
    themeColor: {
      found: boolean
      color: string | null
      status: 'good' | 'warning' | 'error'
    }
    ogTags: {
      title: string | null
      description: string | null
      image: string | null
      imageWidth: string | null
      imageHeight: string | null
      type: string | null
      siteName: string | null
      status: 'good' | 'warning' | 'error'
    }
    twitterCard: {
      card: string | null
      title: string | null
      description: string | null
      image: string | null
      site: string | null
      status: 'good' | 'warning' | 'error'
    }
    fontLoading: {
      hasPreconnect: boolean
      hasFontDisplay: boolean
      customFonts: string[]
      status: 'good' | 'warning' | 'error'
    }
    colorScheme: {
      hasDarkMode: boolean
      preferredScheme: string | null
      status: 'good' | 'info' | 'warning'
    }
    responsiveImages: {
      total: number
      withSrcset: number
      withSizes: number
      lazyLoaded: number
      status: 'good' | 'warning' | 'error'
    }
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
  value: string | null
  status: 'good' | 'warning' | 'error' | 'info'
  sublabel?: string
  isLocked?: boolean
  preview?: React.ReactNode
}

function CheckItem({ icon, label, value, status, sublabel, isLocked, preview }: CheckItemProps) {
  const StatusIcon = status === 'good' ? CheckCircle2 : status === 'warning' ? AlertTriangle : status === 'info' ? AlertTriangle : XCircle
  const statusColor = status === 'good' ? 'text-green-500' : status === 'warning' ? 'text-orange-500' : status === 'info' ? 'text-blue-500' : 'text-red-500'

  return (
    <div className="py-3 border-b last:border-0">
      <div className="flex items-start gap-3">
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
      {preview && (
        <div className="mt-3 ml-11">
          {preview}
        </div>
      )}
    </div>
  )
}

export function DesignResult({ result, isLocked = false, locale = 'de' }: DesignResultProps) {
  const [previewPlatform, setPreviewPlatform] = useState<'facebook' | 'twitter' | 'linkedin'>('facebook')

  const t = locale === 'de' ? {
    summary: 'Zusammenfassung',
    criticalIssues: 'Kritisch',
    warnings: 'Warnungen',
    passed: 'Bestanden',
    mobile: 'Mobile & Viewport',
    viewport: 'Viewport Meta',
    viewportContent: 'Viewport Inhalt',
    assets: 'Icons & Assets',
    favicon: 'Favicon',
    appleTouchIcon: 'Apple Touch Icon',
    themeColor: 'Theme Color',
    social: 'Social Media Preview',
    ogTags: 'Open Graph',
    twitterCard: 'Twitter Card',
    fonts: 'Schriften',
    customFonts: 'Web-Fonts',
    preconnect: 'Preconnect',
    images: 'Bilder',
    responsive: 'Responsive Bilder',
    lazyLoading: 'Lazy Loading',
    colorScheme: 'Farbschema',
    darkMode: 'Dark Mode',
    found: 'Vorhanden',
    notFound: 'Nicht gefunden',
    active: 'Aktiv',
    notActive: 'Nicht aktiv',
    configured: 'Konfiguriert',
    notConfigured: 'Nicht konfiguriert',
  } : {
    summary: 'Summary',
    criticalIssues: 'Critical',
    warnings: 'Warnings',
    passed: 'Passed',
    mobile: 'Mobile & Viewport',
    viewport: 'Viewport Meta',
    viewportContent: 'Viewport Content',
    assets: 'Icons & Assets',
    favicon: 'Favicon',
    appleTouchIcon: 'Apple Touch Icon',
    themeColor: 'Theme Color',
    social: 'Social Media Preview',
    ogTags: 'Open Graph',
    twitterCard: 'Twitter Card',
    fonts: 'Fonts',
    customFonts: 'Web Fonts',
    preconnect: 'Preconnect',
    images: 'Images',
    responsive: 'Responsive Images',
    lazyLoading: 'Lazy Loading',
    colorScheme: 'Color Scheme',
    darkMode: 'Dark Mode',
    found: 'Found',
    notFound: 'Not found',
    active: 'Active',
    notActive: 'Not active',
    configured: 'Configured',
    notConfigured: 'Not configured',
  }

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
            label="Design Score"
            size="lg"
          />
        </div>
      </div>

      {/* Social Media Preview */}
      <div className="rounded-xl border p-4">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Share2 className="h-5 w-5 text-primary" />
          {t.social}
        </h3>

        {/* Platform Tabs */}
        <div className="flex gap-2 mb-4">
          {(['facebook', 'twitter', 'linkedin'] as const).map((platform) => (
            <Button
              key={platform}
              variant={previewPlatform === platform ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreviewPlatform(platform)}
              className="capitalize"
            >
              {platform}
            </Button>
          ))}
        </div>

        {/* Preview */}
        <div className={cn(isLocked && 'blur-sm')}>
          <OgPreview
            title={result.ogTags.title}
            description={result.ogTags.description}
            image={result.ogTags.image}
            siteName={result.ogTags.siteName}
            url={result.url}
            platform={previewPlatform}
            locale={locale}
          />
        </div>

        {/* OG Details */}
        <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
          <div className={cn('p-3 rounded-lg bg-muted/50', isLocked && 'blur-sm')}>
            <div className="font-medium mb-1">og:title</div>
            <div className="text-muted-foreground truncate">
              {result.ogTags.title || t.notFound}
            </div>
          </div>
          <div className={cn('p-3 rounded-lg bg-muted/50', isLocked && 'blur-sm')}>
            <div className="font-medium mb-1">og:description</div>
            <div className="text-muted-foreground truncate">
              {result.ogTags.description || t.notFound}
            </div>
          </div>
          <div className={cn('p-3 rounded-lg bg-muted/50', isLocked && 'blur-sm')}>
            <div className="font-medium mb-1">og:image</div>
            <div className="text-muted-foreground truncate">
              {result.ogTags.image ? t.found : t.notFound}
            </div>
          </div>
          <div className={cn('p-3 rounded-lg bg-muted/50', isLocked && 'blur-sm')}>
            <div className="font-medium mb-1">twitter:card</div>
            <div className="text-muted-foreground truncate">
              {result.twitterCard.card || t.notFound}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Checks */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Mobile & Viewport */}
        <div className="rounded-xl border p-4">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            {t.mobile}
          </h3>
          <div className="space-y-0">
            <CheckItem
              icon={<Smartphone className="h-4 w-4" />}
              label={t.viewport}
              value={result.viewport.found ? t.found : t.notFound}
              status={result.viewport.status}
              sublabel={result.viewport.content || undefined}
            />
            <CheckItem
              icon={result.colorScheme.hasDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              label={t.darkMode}
              value={result.colorScheme.hasDarkMode ? t.active : t.notActive}
              status={result.colorScheme.hasDarkMode ? 'good' : 'info'}
            />
          </div>
        </div>

        {/* Icons & Assets */}
        <div className="rounded-xl border p-4">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            {t.assets}
          </h3>
          <div className="space-y-0">
            <CheckItem
              icon={<Globe className="h-4 w-4" />}
              label={t.favicon}
              value={result.favicon.found ? t.found : t.notFound}
              status={result.favicon.status}
              isLocked={isLocked}
              preview={result.favicon.url && !isLocked ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={result.favicon.url}
                  alt="Favicon"
                  className="h-8 w-8 rounded"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              ) : undefined}
            />
            <CheckItem
              icon={<Smartphone className="h-4 w-4" />}
              label={t.appleTouchIcon}
              value={result.appleTouchIcon.found ? (result.appleTouchIcon.sizes || t.found) : t.notFound}
              status={result.appleTouchIcon.status}
            />
            <CheckItem
              icon={<Palette className="h-4 w-4" />}
              label={t.themeColor}
              value={result.themeColor.color || t.notConfigured}
              status={result.themeColor.status}
              preview={result.themeColor.color ? (
                <div
                  className="h-6 w-12 rounded border"
                  style={{ backgroundColor: result.themeColor.color }}
                />
              ) : undefined}
            />
          </div>
        </div>

        {/* Fonts */}
        <div className="rounded-xl border p-4">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <Type className="h-5 w-5 text-primary" />
            {t.fonts}
          </h3>
          <div className="space-y-0">
            <CheckItem
              icon={<Type className="h-4 w-4" />}
              label={t.customFonts}
              value={result.fontLoading.customFonts.length > 0
                ? result.fontLoading.customFonts.join(', ')
                : locale === 'de' ? 'Keine Web-Fonts' : 'No web fonts'}
              status={result.fontLoading.status}
              isLocked={isLocked}
            />
            <CheckItem
              icon={<Globe className="h-4 w-4" />}
              label={t.preconnect}
              value={result.fontLoading.hasPreconnect ? t.active : t.notActive}
              status={result.fontLoading.hasPreconnect ? 'good' : result.fontLoading.customFonts.length > 0 ? 'warning' : 'good'}
            />
          </div>
        </div>

        {/* Images */}
        <div className="rounded-xl border p-4">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            {t.images}
          </h3>
          <div className="space-y-0">
            <CheckItem
              icon={<ImageIcon className="h-4 w-4" />}
              label={t.responsive}
              value={`${result.responsiveImages.withSrcset}/${result.responsiveImages.total} ${locale === 'de' ? 'mit srcset' : 'with srcset'}`}
              status={result.responsiveImages.status}
            />
            <CheckItem
              icon={<ImageIcon className="h-4 w-4" />}
              label={t.lazyLoading}
              value={`${result.responsiveImages.lazyLoaded}/${result.responsiveImages.total} ${locale === 'de' ? 'lazy geladen' : 'lazy loaded'}`}
              status={result.responsiveImages.lazyLoaded > 0 ? 'good' : result.responsiveImages.total > 5 ? 'warning' : 'good'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
