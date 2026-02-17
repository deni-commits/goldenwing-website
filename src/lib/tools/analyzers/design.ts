/**
 * Design Analyzer - Checks visual and mobile-friendliness aspects
 * Uses HTML parsing (Cheerio) for meta tags and assets
 */

import * as cheerio from 'cheerio'

export interface DesignAnalysisResult {
  score: number
  url: string

  // Viewport & Mobile
  viewport: {
    found: boolean
    content: string | null
    status: 'good' | 'warning' | 'error'
  }

  // Favicon
  favicon: {
    found: boolean
    url: string | null
    type: string | null
    status: 'good' | 'warning' | 'error'
  }

  // Apple Touch Icon
  appleTouchIcon: {
    found: boolean
    url: string | null
    sizes: string | null
    status: 'good' | 'warning' | 'error'
  }

  // Theme Color
  themeColor: {
    found: boolean
    color: string | null
    status: 'good' | 'warning' | 'error'
  }

  // Open Graph
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

  // Twitter Card
  twitterCard: {
    card: string | null
    title: string | null
    description: string | null
    image: string | null
    site: string | null
    status: 'good' | 'warning' | 'error'
  }

  // Font Loading
  fontLoading: {
    hasPreconnect: boolean
    hasFontDisplay: boolean
    customFonts: string[]
    status: 'good' | 'warning' | 'error'
  }

  // Color Scheme
  colorScheme: {
    hasDarkMode: boolean
    preferredScheme: string | null
    status: 'good' | 'info' | 'warning'
  }

  // Responsive Images
  responsiveImages: {
    total: number
    withSrcset: number
    withSizes: number
    lazyLoaded: number
    status: 'good' | 'warning' | 'error'
  }

  // PWA Manifest
  pwaManifest: {
    found: boolean
    url: string | null
    name: string | null
    shortName: string | null
    startUrl: string | null
    display: string | null
    hasIcons: boolean
    status: 'good' | 'warning' | 'error'
  }

  // Issues for display
  issues: DesignIssue[]
  totalIssues: number
  criticalIssues: number
  warningIssues: number
  passedChecks: number
}

export interface DesignIssue {
  id: string
  category: 'design'
  severity: 'critical' | 'warning' | 'info' | 'passed'
  title: string
  description: string
  howToFix?: string
}

function resolveUrl(base: string, relative: string | null): string | null {
  if (!relative) return null
  try {
    return new URL(relative, base).href
  } catch {
    return relative
  }
}

export async function analyzeDesign(url: string): Promise<DesignAnalysisResult> {
  // Fetch the HTML
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; GoldenWingBot/1.0; +https://goldenwing.at)',
      'Accept': 'text/html,application/xhtml+xml',
    },
    signal: AbortSignal.timeout(30000),
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch URL: ${response.status}`)
  }

  const html = await response.text()
  const $ = cheerio.load(html)

  // Extract viewport
  const viewportMeta = $('meta[name="viewport"]').attr('content') || null
  const viewportFound = !!viewportMeta
  const hasWidthDeviceWidth = viewportMeta?.includes('width=device-width') || false
  const hasInitialScale = viewportMeta?.includes('initial-scale=1') || false

  // Extract favicon
  let faviconUrl: string | null = null
  let faviconType: string | null = null

  // Check various favicon locations
  const faviconSelectors = [
    'link[rel="icon"]',
    'link[rel="shortcut icon"]',
    'link[rel="apple-touch-icon"]',
  ]

  for (const selector of faviconSelectors) {
    const el = $(selector).first()
    if (el.length) {
      faviconUrl = resolveUrl(url, el.attr('href') || null)
      faviconType = el.attr('type') || null
      break
    }
  }

  // Try default /favicon.ico if not found in HTML
  if (!faviconUrl) {
    try {
      const faviconResponse = await fetch(new URL('/favicon.ico', url).href, {
        method: 'HEAD',
        signal: AbortSignal.timeout(5000),
      })
      if (faviconResponse.ok) {
        faviconUrl = new URL('/favicon.ico', url).href
        faviconType = 'image/x-icon'
      }
    } catch {
      // Ignore errors
    }
  }

  // Extract Apple Touch Icon
  const appleTouchIconEl = $('link[rel="apple-touch-icon"], link[rel="apple-touch-icon-precomposed"]').first()
  const appleTouchIconUrl = resolveUrl(url, appleTouchIconEl.attr('href') || null)
  const appleTouchIconSizes = appleTouchIconEl.attr('sizes') || null

  // Extract Theme Color
  const themeColorMeta = $('meta[name="theme-color"]').attr('content') || null

  // Extract Open Graph tags
  const ogTitle = $('meta[property="og:title"]').attr('content') || null
  const ogDescription = $('meta[property="og:description"]').attr('content') || null
  const ogImage = resolveUrl(url, $('meta[property="og:image"]').attr('content') || null)
  const ogImageWidth = $('meta[property="og:image:width"]').attr('content') || null
  const ogImageHeight = $('meta[property="og:image:height"]').attr('content') || null
  const ogType = $('meta[property="og:type"]').attr('content') || null
  const ogSiteName = $('meta[property="og:site_name"]').attr('content') || null

  // Extract Twitter Card
  const twitterCard = $('meta[name="twitter:card"]').attr('content') || null
  const twitterTitle = $('meta[name="twitter:title"]').attr('content') || null
  const twitterDescription = $('meta[name="twitter:description"]').attr('content') || null
  const twitterImage = resolveUrl(url, $('meta[name="twitter:image"]').attr('content') || null)
  const twitterSite = $('meta[name="twitter:site"]').attr('content') || null

  // Check font loading
  const hasPreconnect = $('link[rel="preconnect"][href*="fonts"]').length > 0 ||
                        $('link[rel="preconnect"][href*="typekit"]').length > 0
  const styleContent = $('style').text() + $('link[rel="stylesheet"]').map((_, el) => $(el).attr('href')).get().join(' ')
  const hasFontDisplay = styleContent.includes('font-display')
  const customFonts: string[] = []
  $('link[href*="fonts.googleapis.com"], link[href*="fonts.gstatic.com"], link[href*="use.typekit.net"]').each((_, el) => {
    const href = $(el).attr('href')
    if (href) {
      // Extract font family from Google Fonts URL
      const match = href.match(/family=([^&:]+)/)
      if (match) {
        customFonts.push(match[1].replace(/\+/g, ' '))
      }
    }
  })

  // Check color scheme
  const colorSchemeMeta = $('meta[name="color-scheme"]').attr('content') || null
  const hasDarkModeMedia = html.includes('prefers-color-scheme') || html.includes('dark-mode') || html.includes('dark:')

  // Check responsive images
  const images = $('img')
  const totalImages = images.length
  let imagesWithSrcset = 0
  let imagesWithSizes = 0
  let lazyLoadedImages = 0

  images.each((_, el) => {
    const $el = $(el)
    if ($el.attr('srcset')) imagesWithSrcset++
    if ($el.attr('sizes')) imagesWithSizes++
    if ($el.attr('loading') === 'lazy' || $el.attr('data-src')) lazyLoadedImages++
  })

  // Check PWA Manifest
  const manifestLink = $('link[rel="manifest"]').attr('href')
  const manifestUrl = resolveUrl(url, manifestLink || null)
  let manifestName: string | null = null
  let manifestShortName: string | null = null
  let manifestStartUrl: string | null = null
  let manifestDisplay: string | null = null
  let manifestHasIcons = false

  if (manifestUrl) {
    try {
      const manifestResponse = await fetch(manifestUrl, {
        signal: AbortSignal.timeout(5000),
      })
      if (manifestResponse.ok) {
        const manifest = await manifestResponse.json()
        manifestName = manifest.name || null
        manifestShortName = manifest.short_name || null
        manifestStartUrl = manifest.start_url || null
        manifestDisplay = manifest.display || null
        manifestHasIcons = Array.isArray(manifest.icons) && manifest.icons.length > 0
      }
    } catch {
      // Manifest fetch failed
    }
  }

  // Build issues list
  const issues: DesignIssue[] = []

  // Viewport check
  if (!viewportFound) {
    issues.push({
      id: 'viewport-missing',
      category: 'design',
      severity: 'critical',
      title: 'Viewport Meta-Tag fehlt',
      description: 'Ohne Viewport-Tag wird die Seite auf mobilen Geräten nicht korrekt dargestellt.',
      howToFix: 'Fügen Sie <meta name="viewport" content="width=device-width, initial-scale=1"> in den <head> ein.',
    })
  } else if (!hasWidthDeviceWidth || !hasInitialScale) {
    issues.push({
      id: 'viewport-incomplete',
      category: 'design',
      severity: 'warning',
      title: 'Viewport Meta-Tag unvollständig',
      description: `Aktuell: "${viewportMeta}". Empfohlen: width=device-width und initial-scale=1.`,
      howToFix: 'Verwenden Sie: <meta name="viewport" content="width=device-width, initial-scale=1">',
    })
  } else {
    issues.push({
      id: 'viewport-ok',
      category: 'design',
      severity: 'passed',
      title: 'Viewport korrekt konfiguriert',
      description: 'Die Seite ist für mobile Geräte optimiert.',
    })
  }

  // Favicon check
  if (!faviconUrl) {
    issues.push({
      id: 'favicon-missing',
      category: 'design',
      severity: 'warning',
      title: 'Favicon fehlt',
      description: 'Ein Favicon verbessert die Wiedererkennung in Browser-Tabs und Lesezeichen.',
      howToFix: 'Fügen Sie ein Favicon hinzu: <link rel="icon" href="/favicon.ico">',
    })
  } else {
    issues.push({
      id: 'favicon-ok',
      category: 'design',
      severity: 'passed',
      title: 'Favicon vorhanden',
      description: 'Ein Favicon wurde gefunden.',
    })
  }

  // Apple Touch Icon check
  if (!appleTouchIconUrl) {
    issues.push({
      id: 'apple-touch-icon-missing',
      category: 'design',
      severity: 'warning',
      title: 'Apple Touch Icon fehlt',
      description: 'Für iOS-Geräte wird ein Apple Touch Icon empfohlen (180x180 px).',
      howToFix: 'Fügen Sie hinzu: <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">',
    })
  } else {
    issues.push({
      id: 'apple-touch-icon-ok',
      category: 'design',
      severity: 'passed',
      title: 'Apple Touch Icon vorhanden',
      description: appleTouchIconSizes ? `Größe: ${appleTouchIconSizes}` : 'Icon gefunden.',
    })
  }

  // Theme Color check
  if (!themeColorMeta) {
    issues.push({
      id: 'theme-color-missing',
      category: 'design',
      severity: 'info',
      title: 'Theme Color fehlt',
      description: 'Ein Theme Color passt die Browserleiste auf mobilen Geräten an.',
      howToFix: 'Fügen Sie hinzu: <meta name="theme-color" content="#IHRE_FARBE">',
    })
  } else {
    issues.push({
      id: 'theme-color-ok',
      category: 'design',
      severity: 'passed',
      title: 'Theme Color konfiguriert',
      description: `Farbe: ${themeColorMeta}`,
    })
  }

  // OG Tags check
  const ogComplete = ogTitle && ogDescription && ogImage
  if (!ogTitle && !ogDescription && !ogImage) {
    issues.push({
      id: 'og-tags-missing',
      category: 'design',
      severity: 'critical',
      title: 'Open Graph Tags fehlen',
      description: 'Ohne OG-Tags wird Ihre Seite in sozialen Medien schlecht dargestellt.',
      howToFix: 'Fügen Sie og:title, og:description und og:image Meta-Tags hinzu.',
    })
  } else if (!ogComplete) {
    const missing: string[] = []
    if (!ogTitle) missing.push('og:title')
    if (!ogDescription) missing.push('og:description')
    if (!ogImage) missing.push('og:image')
    issues.push({
      id: 'og-tags-incomplete',
      category: 'design',
      severity: 'warning',
      title: 'Open Graph Tags unvollständig',
      description: `Fehlend: ${missing.join(', ')}`,
      howToFix: 'Ergänzen Sie die fehlenden OG-Tags für optimale Social-Media-Darstellung.',
    })
  } else {
    issues.push({
      id: 'og-tags-ok',
      category: 'design',
      severity: 'passed',
      title: 'Open Graph Tags vollständig',
      description: 'Ihre Seite wird in sozialen Medien optimal dargestellt.',
    })
  }

  // Twitter Card check
  if (!twitterCard) {
    issues.push({
      id: 'twitter-card-missing',
      category: 'design',
      severity: 'warning',
      title: 'Twitter Card fehlt',
      description: 'Ohne Twitter Card werden OG-Tags als Fallback verwendet.',
      howToFix: 'Fügen Sie hinzu: <meta name="twitter:card" content="summary_large_image">',
    })
  } else {
    issues.push({
      id: 'twitter-card-ok',
      category: 'design',
      severity: 'passed',
      title: 'Twitter Card konfiguriert',
      description: `Typ: ${twitterCard}`,
    })
  }

  // Font loading check
  if (customFonts.length > 0 && !hasPreconnect) {
    issues.push({
      id: 'font-preconnect-missing',
      category: 'design',
      severity: 'warning',
      title: 'Font Preconnect fehlt',
      description: 'Preconnect beschleunigt das Laden von Web-Fonts.',
      howToFix: 'Fügen Sie hinzu: <link rel="preconnect" href="https://fonts.googleapis.com">',
    })
  } else if (customFonts.length > 0) {
    issues.push({
      id: 'font-loading-ok',
      category: 'design',
      severity: 'passed',
      title: 'Font-Loading optimiert',
      description: `${customFonts.length} Web-Font(s) mit Preconnect.`,
    })
  }

  // Responsive images check
  if (totalImages > 0) {
    const responsiveRatio = totalImages > 0 ? (imagesWithSrcset / totalImages) : 0
    const lazyRatio = totalImages > 0 ? (lazyLoadedImages / totalImages) : 0

    if (responsiveRatio < 0.3 && totalImages > 3) {
      issues.push({
        id: 'responsive-images-missing',
        category: 'design',
        severity: 'warning',
        title: 'Responsive Bilder fehlen',
        description: `Nur ${imagesWithSrcset}/${totalImages} Bilder haben srcset für verschiedene Bildschirmgrößen.`,
        howToFix: 'Verwenden Sie srcset und sizes für responsive Bilder.',
      })
    } else if (totalImages > 0) {
      issues.push({
        id: 'responsive-images-ok',
        category: 'design',
        severity: 'passed',
        title: 'Bilder sind responsiv',
        description: `${imagesWithSrcset}/${totalImages} Bilder mit srcset.`,
      })
    }

    if (lazyRatio < 0.5 && totalImages > 5) {
      issues.push({
        id: 'lazy-loading-missing',
        category: 'design',
        severity: 'warning',
        title: 'Lazy Loading empfohlen',
        description: `Nur ${lazyLoadedImages}/${totalImages} Bilder werden lazy geladen.`,
        howToFix: 'Fügen Sie loading="lazy" zu Bildern unterhalb des sichtbaren Bereichs hinzu.',
      })
    } else if (lazyLoadedImages > 0) {
      issues.push({
        id: 'lazy-loading-ok',
        category: 'design',
        severity: 'passed',
        title: 'Lazy Loading aktiv',
        description: `${lazyLoadedImages}/${totalImages} Bilder werden lazy geladen.`,
      })
    }
  }

  // PWA Manifest check
  if (!manifestUrl) {
    issues.push({
      id: 'pwa-manifest-missing',
      category: 'design',
      severity: 'info',
      title: 'PWA Manifest fehlt',
      description: 'Ohne Web App Manifest kann die Seite nicht als PWA installiert werden.',
      howToFix: 'Erstellen Sie eine manifest.json und verlinken Sie sie: <link rel="manifest" href="/manifest.json">',
    })
  } else if (!manifestName || !manifestHasIcons) {
    issues.push({
      id: 'pwa-manifest-incomplete',
      category: 'design',
      severity: 'warning',
      title: 'PWA Manifest unvollständig',
      description: `Das Manifest wurde gefunden, aber${!manifestName ? ' Name fehlt' : ''}${!manifestHasIcons ? ' Icons fehlen' : ''}.`,
      howToFix: 'Ergänzen Sie name, short_name und icons im Manifest.',
    })
  } else {
    issues.push({
      id: 'pwa-manifest-ok',
      category: 'design',
      severity: 'passed',
      title: 'PWA-fähig',
      description: `Web App Manifest vollständig. Name: "${manifestName}", Display: ${manifestDisplay || 'browser'}`,
    })
  }

  // Calculate score
  let score = 100
  const criticalCount = issues.filter(i => i.severity === 'critical').length
  const warningCount = issues.filter(i => i.severity === 'warning').length
  const passedCount = issues.filter(i => i.severity === 'passed').length

  score -= criticalCount * 20
  score -= warningCount * 8
  score = Math.max(0, Math.min(100, score))

  // Determine statuses
  const viewportStatus: 'good' | 'warning' | 'error' = !viewportFound ? 'error' : (!hasWidthDeviceWidth || !hasInitialScale) ? 'warning' : 'good'
  const faviconStatus: 'good' | 'warning' | 'error' = faviconUrl ? 'good' : 'warning'
  const appleTouchIconStatus: 'good' | 'warning' | 'error' = appleTouchIconUrl ? 'good' : 'warning'
  const themeColorStatus: 'good' | 'warning' | 'error' = themeColorMeta ? 'good' : 'warning'
  const ogStatus: 'good' | 'warning' | 'error' = ogComplete ? 'good' : (!ogTitle && !ogDescription && !ogImage) ? 'error' : 'warning'
  const twitterStatus: 'good' | 'warning' | 'error' = twitterCard ? 'good' : 'warning'
  const fontStatus: 'good' | 'warning' | 'error' = customFonts.length === 0 ? 'good' : hasPreconnect ? 'good' : 'warning'
  const responsiveImagesStatus: 'good' | 'warning' | 'error' = totalImages === 0 ? 'good' : (imagesWithSrcset / totalImages) >= 0.3 ? 'good' : 'warning'
  const pwaManifestStatus: 'good' | 'warning' | 'error' = !manifestUrl ? 'warning' : (!manifestName || !manifestHasIcons) ? 'warning' : 'good'

  return {
    score,
    url,
    viewport: {
      found: viewportFound,
      content: viewportMeta,
      status: viewportStatus,
    },
    favicon: {
      found: !!faviconUrl,
      url: faviconUrl,
      type: faviconType,
      status: faviconStatus,
    },
    appleTouchIcon: {
      found: !!appleTouchIconUrl,
      url: appleTouchIconUrl,
      sizes: appleTouchIconSizes,
      status: appleTouchIconStatus,
    },
    themeColor: {
      found: !!themeColorMeta,
      color: themeColorMeta,
      status: themeColorStatus,
    },
    ogTags: {
      title: ogTitle,
      description: ogDescription,
      image: ogImage,
      imageWidth: ogImageWidth,
      imageHeight: ogImageHeight,
      type: ogType,
      siteName: ogSiteName,
      status: ogStatus,
    },
    twitterCard: {
      card: twitterCard,
      title: twitterTitle,
      description: twitterDescription,
      image: twitterImage,
      site: twitterSite,
      status: twitterStatus,
    },
    fontLoading: {
      hasPreconnect,
      hasFontDisplay,
      customFonts,
      status: fontStatus,
    },
    colorScheme: {
      hasDarkMode: hasDarkModeMedia,
      preferredScheme: colorSchemeMeta,
      status: hasDarkModeMedia ? 'good' : 'info',
    },
    responsiveImages: {
      total: totalImages,
      withSrcset: imagesWithSrcset,
      withSizes: imagesWithSizes,
      lazyLoaded: lazyLoadedImages,
      status: responsiveImagesStatus,
    },
    pwaManifest: {
      found: !!manifestUrl,
      url: manifestUrl,
      name: manifestName,
      shortName: manifestShortName,
      startUrl: manifestStartUrl,
      display: manifestDisplay,
      hasIcons: manifestHasIcons,
      status: pwaManifestStatus,
    },
    issues,
    totalIssues: issues.length,
    criticalIssues: criticalCount,
    warningIssues: warningCount,
    passedChecks: passedCount,
  }
}
