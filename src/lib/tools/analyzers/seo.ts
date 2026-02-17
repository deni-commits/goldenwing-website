/**
 * SEO Analyzer - Analyzes HTML content for SEO issues
 * Uses regex-based parsing (no external dependencies)
 */

export interface SeoAnalysisResult {
  score: number
  title: {
    value: string | null
    length: number
    status: 'good' | 'warning' | 'error'
    message: string
  }
  description: {
    value: string | null
    length: number
    status: 'good' | 'warning' | 'error'
    message: string
  }
  h1: {
    count: number
    values: string[]
    status: 'good' | 'warning' | 'error'
    message: string
  }
  headingStructure: {
    h1: number
    h2: number
    h3: number
    h4: number
    h5: number
    h6: number
    status: 'good' | 'warning' | 'error'
    message: string
  }
  images: {
    total: number
    withoutAlt: number
    withoutAltUrls: string[]
    status: 'good' | 'warning' | 'error'
    message: string
  }
  schema: {
    found: boolean
    types: string[]
    status: 'good' | 'warning' | 'error'
    message: string
  }
  canonical: {
    found: boolean
    url: string | null
    status: 'good' | 'warning' | 'error'
    message: string
  }
  ogTags: {
    title: string | null
    description: string | null
    image: string | null
    status: 'good' | 'warning' | 'error'
  }
  // NEW: Additional SEO metrics
  content: {
    wordCount: number
    status: 'good' | 'warning' | 'error'
    message: string
  }
  internalLinks: {
    count: number
    status: 'good' | 'warning' | 'error'
    message: string
  }
  externalLinks: {
    count: number
    withNofollow: number
    status: 'good' | 'warning' | 'error'
  }
  metaRobots: {
    found: boolean
    value: string | null
    isIndexable: boolean
    status: 'good' | 'warning' | 'error'
  }
  hreflang: {
    found: boolean
    languages: string[]
    status: 'good' | 'info' | 'warning'
  }
  urlStructure: {
    isClean: boolean
    hasKeywords: boolean
    length: number
    status: 'good' | 'warning' | 'error'
  }
  // NEW: Keyword Density & Readability
  keywordDensity: {
    primaryKeyword: string | null
    density: number
    occurrences: number
    status: 'good' | 'warning' | 'error'
    message: string
  }
  readability: {
    score: number // 0-100 scale
    grade: string // "Einfach", "Mittel", "Schwer"
    avgSentenceLength: number
    avgWordLength: number
    status: 'good' | 'warning' | 'error'
    message: string
  }
  sitemapFound: boolean
  robotsFound: boolean
  issues: SeoIssue[]
}

export interface SeoIssue {
  id: string
  category: 'seo'
  severity: 'critical' | 'warning' | 'info' | 'passed'
  title: string
  description: string
  howToFix?: string
  value?: string | number
  target?: string | number
}

// Helper functions for HTML parsing (regex-based)
function extractMetaContent(html: string, name: string): string | null {
  const patterns = [
    new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']*)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${name}["']`, 'i'),
  ]

  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (match && match[1]) return match[1]
  }
  return null
}

function extractMetaProperty(html: string, property: string): string | null {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']*)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+property=["']${property}["']`, 'i'),
  ]

  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (match && match[1]) return match[1]
  }
  return null
}

function extractTitle(html: string): string | null {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i)
  return match ? match[1].trim() : null
}

function extractCanonical(html: string): string | null {
  const match = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i)
  return match ? match[1] : null
}

interface HeadingCounts {
  h1: number
  h2: number
  h3: number
  h4: number
  h5: number
  h6: number
}

function countHeadings(html: string): HeadingCounts {
  const counts: HeadingCounts = { h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0 }

  for (let level = 1; level <= 6; level++) {
    const pattern = new RegExp(`<h${level}[^>]*>`, 'gi')
    const matches = html.match(pattern)
    const key = `h${level}` as keyof HeadingCounts
    counts[key] = matches ? matches.length : 0
  }

  return counts
}

function extractH1Values(html: string): string[] {
  // First, remove all script and style tags with their content to avoid capturing JS code
  const cleanHtml = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '')

  const pattern = /<h1[^>]*>([\s\S]*?)<\/h1>/gi
  const values: string[] = []
  let match

  while ((match = pattern.exec(cleanHtml)) !== null) {
    // Remove any remaining inner tags and clean up whitespace
    const text = match[1]
      .replace(/<[^>]+>/g, '') // Remove any remaining HTML tags
      .replace(/\s+/g, ' ')    // Normalize whitespace
      .trim()

    // Only add if it looks like actual text (not empty or JS-like)
    if (text && text.length > 0 && text.length < 500 && !text.includes('{') && !text.includes('}')) {
      values.push(text)
    }
  }

  return values
}

function extractImages(html: string): { total: number; withoutAlt: number; withoutAltUrls: string[] } {
  const imgPattern = /<img[^>]*>/gi
  const images = html.match(imgPattern) || []

  let withoutAlt = 0
  const withoutAltUrls: string[] = []

  for (const img of images) {
    // Check if alt attribute exists and is not empty
    const hasAlt = /alt=["'][^"']+["']/i.test(img)
    const hasEmptyAlt = /alt=["']\s*["']/i.test(img)

    if (!hasAlt || hasEmptyAlt) {
      withoutAlt++
      // Extract src URL
      const srcMatch = img.match(/src=["']([^"']+)["']/i)
      if (srcMatch && srcMatch[1]) {
        // Only store first 5 URLs to keep response size manageable
        if (withoutAltUrls.length < 5) {
          withoutAltUrls.push(srcMatch[1])
        }
      }
    }
  }

  return { total: images.length, withoutAlt, withoutAltUrls }
}

function extractSchemaTypes(html: string): string[] {
  const types: string[] = []

  // Find JSON-LD scripts
  const jsonLdPattern = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([^<]*)<\/script>/gi
  let match

  while ((match = jsonLdPattern.exec(html)) !== null) {
    try {
      const data = JSON.parse(match[1])
      if (data['@type']) {
        types.push(data['@type'])
      }
      if (Array.isArray(data['@graph'])) {
        for (const item of data['@graph']) {
          if (item['@type']) types.push(item['@type'])
        }
      }
    } catch {
      // Invalid JSON-LD
    }
  }

  return [...new Set(types)]
}

// NEW: Extract word count from visible text
function extractWordCount(html: string): number {
  // Remove scripts, styles, and tags
  const text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  // Count words
  const words = text.split(/\s+/).filter(word => word.length > 0)
  return words.length
}

// NEW: Extract links
function extractLinks(html: string, baseUrl: string): {
  internal: number
  external: number
  externalNofollow: number
} {
  const linkPattern = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi
  const baseHost = new URL(baseUrl).hostname

  let internal = 0
  let external = 0
  let externalNofollow = 0

  let match
  while ((match = linkPattern.exec(html)) !== null) {
    const href = match[1]
    const fullTag = match[0]

    // Skip anchors, javascript, mailto
    if (href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      continue
    }

    try {
      const linkUrl = new URL(href, baseUrl)
      if (linkUrl.hostname === baseHost) {
        internal++
      } else {
        external++
        if (/rel=["'][^"']*nofollow[^"']*["']/i.test(fullTag)) {
          externalNofollow++
        }
      }
    } catch {
      // Invalid URL, count as internal
      internal++
    }
  }

  return { internal, external, externalNofollow }
}

// NEW: Extract meta robots
function extractMetaRobots(html: string): { value: string | null; isIndexable: boolean } {
  const patterns = [
    /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i,
    /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']robots["']/i,
  ]

  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (match && match[1]) {
      const value = match[1].toLowerCase()
      const isIndexable = !value.includes('noindex')
      return { value: match[1], isIndexable }
    }
  }

  return { value: null, isIndexable: true } // Default: indexable
}

// NEW: Extract hreflang tags
function extractHreflang(html: string): string[] {
  const pattern = /<link[^>]+rel=["']alternate["'][^>]+hreflang=["']([^"']+)["']/gi
  const languages: string[] = []

  let match
  while ((match = pattern.exec(html)) !== null) {
    if (match[1] && !languages.includes(match[1])) {
      languages.push(match[1])
    }
  }

  return languages
}

// NEW: Analyze URL structure
function analyzeUrlStructure(url: string): {
  isClean: boolean
  hasKeywords: boolean
  length: number
  isHomepage: boolean
} {
  const urlObj = new URL(url)
  const path = urlObj.pathname

  // Check if it's the homepage (root or just language prefix)
  const isHomepage = path === '/' || path === '' || /^\/(de|en)\/?$/.test(path)

  // Clean URL = no query params, no excessive parameters, readable
  const isClean = !path.includes('?') &&
    !path.includes('&') &&
    !/[A-Z]/.test(path) && // lowercase
    !path.includes('__') &&
    !path.includes('--') &&
    path.length < 100

  // Has keywords = contains meaningful words (not just IDs)
  // Homepage is always "ok" for keywords - brand name in domain is sufficient
  const hasKeywords = isHomepage || (/[a-z]{3,}/.test(path) && !/\d{5,}/.test(path))

  return {
    isClean,
    hasKeywords,
    length: path.length,
    isHomepage,
  }
}

// NEW: Extract visible text from HTML
function extractVisibleText(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

// NEW: Calculate keyword density based on title/H1
function calculateKeywordDensity(
  text: string,
  title: string | null,
  h1Values: string[]
): {
  primaryKeyword: string | null
  density: number
  occurrences: number
} {
  // Extract primary keyword from title or H1
  const source = title || h1Values[0] || ''
  if (!source || !text) {
    return { primaryKeyword: null, density: 0, occurrences: 0 }
  }

  // Get significant words from title (3+ chars, not stop words)
  const stopWords = new Set([
    'der', 'die', 'das', 'und', 'oder', 'für', 'mit', 'von', 'bei', 'aus',
    'the', 'and', 'for', 'with', 'from', 'your', 'our', 'are', 'was', 'has',
    'ein', 'eine', 'einem', 'einen', 'einer', 'eines', 'ist', 'sind', 'wird',
  ])

  const titleWords = source
    .toLowerCase()
    .replace(/[^a-zäöüß\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 3 && !stopWords.has(w))

  if (titleWords.length === 0) {
    return { primaryKeyword: null, density: 0, occurrences: 0 }
  }

  // Use first significant word as primary keyword
  const primaryKeyword = titleWords[0]

  // Count occurrences in text
  const textWords = text.split(/\s+/)
  const totalWords = textWords.length
  const occurrences = textWords.filter(w =>
    w.includes(primaryKeyword) || primaryKeyword.includes(w)
  ).length

  const density = totalWords > 0 ? (occurrences / totalWords) * 100 : 0

  return {
    primaryKeyword,
    density: Math.round(density * 100) / 100,
    occurrences,
  }
}

// NEW: Calculate readability score (simplified for German/English web content)
function calculateReadability(text: string): {
  score: number
  grade: string
  avgSentenceLength: number
  avgWordLength: number
} {
  if (!text || text.length < 100) {
    return { score: 70, grade: 'Nicht genug Text', avgSentenceLength: 0, avgWordLength: 0 }
  }

  // Clean the text - remove numbers, URLs, and excessive special chars
  const cleanText = text
    .replace(/https?:\/\/[^\s]+/g, '')
    .replace(/[0-9]+/g, '')
    .replace(/[^\wäöüßÄÖÜ\s.!?]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (cleanText.length < 100) {
    return { score: 70, grade: 'Nicht genug Text', avgSentenceLength: 0, avgWordLength: 0 }
  }

  // Split into sentences (more robust)
  const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 5)
  const sentenceCount = Math.max(sentences.length, 1)

  // Split into words (only actual words, 2+ chars)
  const words = cleanText.split(/\s+/).filter(w => w.length >= 2 && /[a-zäöü]/i.test(w))
  const wordCount = Math.max(words.length, 1)

  // Calculate averages
  const avgSentenceLength = wordCount / sentenceCount
  const avgWordLength = words.reduce((acc, w) => acc + w.length, 0) / wordCount

  // Simple readability score based on:
  // - Sentence length: shorter is better (target: 10-15 words)
  // - Word length: shorter is better (target: 5-6 chars)
  // This is a simplified, more reliable approach than Flesch

  let score = 100

  // Sentence length scoring (ideal: 10-15 words)
  if (avgSentenceLength < 8) {
    score -= 5 // Very short sentences (might be choppy)
  } else if (avgSentenceLength <= 15) {
    score -= 0 // Perfect
  } else if (avgSentenceLength <= 20) {
    score -= 10 // Slightly long
  } else if (avgSentenceLength <= 25) {
    score -= 20 // Long
  } else {
    score -= 30 // Very long sentences
  }

  // Word length scoring (ideal: 4-6 chars for German)
  if (avgWordLength < 4) {
    score -= 5 // Very simple
  } else if (avgWordLength <= 6) {
    score -= 0 // Normal
  } else if (avgWordLength <= 8) {
    score -= 10 // Slightly complex
  } else {
    score -= 20 // Very complex words
  }

  // Bonus for having enough content
  if (wordCount > 300) {
    score = Math.min(100, score + 5)
  }

  // Normalize
  score = Math.max(30, Math.min(100, score))

  // Determine grade
  let grade: string
  if (score >= 80) {
    grade = 'Sehr gut lesbar'
  } else if (score >= 60) {
    grade = 'Gut lesbar'
  } else if (score >= 40) {
    grade = 'Akzeptabel'
  } else {
    grade = 'Verbesserungswürdig'
  }

  return {
    score: Math.round(score),
    grade,
    avgSentenceLength: Math.round(avgSentenceLength * 10) / 10,
    avgWordLength: Math.round(avgWordLength * 10) / 10,
  }
}

export async function analyzeSeo(url: string): Promise<SeoAnalysisResult> {
  // Fetch the page
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'GoldenWing SEO Analyzer/1.0 (https://goldenwing.at)',
      'Accept': 'text/html,application/xhtml+xml',
    },
    signal: AbortSignal.timeout(30000),
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`)
  }

  const html = await response.text()
  const issues: SeoIssue[] = []
  let totalScore = 0
  let maxScore = 0

  // Extract data
  const title = extractTitle(html)
  const description = extractMetaContent(html, 'description')
  const canonical = extractCanonical(html)
  const headings = countHeadings(html)
  const h1Values = extractH1Values(html)
  const images = extractImages(html)
  const schemaTypes = extractSchemaTypes(html)
  const ogTitle = extractMetaProperty(html, 'og:title')
  const ogDescription = extractMetaProperty(html, 'og:description')
  const ogImage = extractMetaProperty(html, 'og:image')

  // Analyze Title (15 points)
  maxScore += 15
  let titleStatus: 'good' | 'warning' | 'error' = 'good'
  let titleMessage = ''

  if (!title) {
    titleStatus = 'error'
    titleMessage = 'Kein Meta-Title gefunden'
    issues.push({
      id: 'title-missing',
      category: 'seo',
      severity: 'critical',
      title: 'Meta Title fehlt',
      description: 'Die Seite hat keinen Title-Tag. Der Title ist essentiell für SEO.',
      howToFix: 'Fügen Sie einen <title>-Tag im <head> Bereich hinzu, z.B.: <title>Ihre Seite | GoldenWing</title>',
    })
  } else if (title.length < 30) {
    titleStatus = 'warning'
    titleMessage = 'Title ist zu kurz (unter 30 Zeichen)'
    totalScore += 7
    issues.push({
      id: 'title-short',
      category: 'seo',
      severity: 'warning',
      title: 'Meta Title zu kurz',
      description: `Der Title hat nur ${title.length} Zeichen. Optimal sind 50-60 Zeichen.`,
      value: title.length,
      target: '50-60',
      howToFix: 'Erweitern Sie Ihren Title um relevante Keywords.',
    })
  } else if (title.length > 60) {
    titleStatus = 'warning'
    titleMessage = 'Title ist zu lang (über 60 Zeichen)'
    totalScore += 10
    issues.push({
      id: 'title-long',
      category: 'seo',
      severity: 'warning',
      title: 'Meta Title zu lang',
      description: `Der Title hat ${title.length} Zeichen und wird in Suchergebnissen abgeschnitten.`,
      value: title.length,
      target: '50-60',
      howToFix: 'Kürzen Sie den Title auf maximal 60 Zeichen.',
    })
  } else {
    titleMessage = 'Title hat optimale Länge'
    totalScore += 15
    issues.push({
      id: 'title-good',
      category: 'seo',
      severity: 'passed',
      title: 'Meta Title optimal',
      description: `Der Title hat ${title.length} Zeichen - perfekte Länge für Suchergebnisse.`,
    })
  }

  // Analyze Description (15 points)
  maxScore += 15
  let descStatus: 'good' | 'warning' | 'error' = 'good'
  let descMessage = ''

  if (!description) {
    descStatus = 'error'
    descMessage = 'Keine Meta-Description gefunden'
    issues.push({
      id: 'description-missing',
      category: 'seo',
      severity: 'critical',
      title: 'Meta Description fehlt',
      description: 'Die Seite hat keine Meta-Description. Diese wird in Suchergebnissen angezeigt.',
      howToFix: 'Fügen Sie eine Meta-Description hinzu: <meta name="description" content="Ihre Beschreibung">',
    })
  } else if (description.length < 120) {
    descStatus = 'warning'
    descMessage = 'Description ist zu kurz'
    totalScore += 7
    issues.push({
      id: 'description-short',
      category: 'seo',
      severity: 'warning',
      title: 'Meta Description zu kurz',
      description: `Die Description hat nur ${description.length} Zeichen. Optimal sind 150-160 Zeichen.`,
      value: description.length,
      target: '150-160',
    })
  } else if (description.length > 160) {
    descStatus = 'warning'
    descMessage = 'Description ist zu lang'
    totalScore += 10
    issues.push({
      id: 'description-long',
      category: 'seo',
      severity: 'warning',
      title: 'Meta Description zu lang',
      description: `Die Description hat ${description.length} Zeichen und wird abgeschnitten.`,
      value: description.length,
      target: '150-160',
    })
  } else {
    descMessage = 'Description hat optimale Länge'
    totalScore += 15
    issues.push({
      id: 'description-good',
      category: 'seo',
      severity: 'passed',
      title: 'Meta Description optimal',
      description: `Die Description hat ${description.length} Zeichen - perfekte Länge.`,
    })
  }

  // Analyze H1 (10 points)
  maxScore += 10
  let h1Status: 'good' | 'warning' | 'error' = 'good'
  let h1Message = ''

  if (headings.h1 === 0) {
    h1Status = 'error'
    h1Message = 'Keine H1-Überschrift gefunden'
    issues.push({
      id: 'h1-missing',
      category: 'seo',
      severity: 'critical',
      title: 'H1-Überschrift fehlt',
      description: 'Die Seite hat keine H1-Überschrift. Diese ist wichtig für SEO.',
      howToFix: 'Fügen Sie eine H1-Überschrift mit Ihrem Hauptkeyword hinzu.',
    })
  } else if (headings.h1 > 1) {
    h1Status = 'warning'
    h1Message = `${headings.h1} H1-Überschriften gefunden`
    totalScore += 5

    // Build detailed description with H1 values
    let h1Details = `Es wurden ${headings.h1} H1-Tags gefunden. Es sollte nur eine H1 pro Seite geben.`
    if (h1Values.length > 0) {
      h1Details += ` Gefunden: "${h1Values.slice(0, 3).join('", "')}"`
      if (h1Values.length > 3) {
        h1Details += ` und ${h1Values.length - 3} weitere`
      }
    }

    issues.push({
      id: 'h1-multiple',
      category: 'seo',
      severity: 'warning',
      title: 'Mehrere H1-Überschriften',
      description: h1Details,
      value: headings.h1,
      target: 1,
      howToFix: 'Behalten Sie nur eine H1-Überschrift und ändern Sie die anderen zu H2 oder H3.',
    })
  } else {
    h1Message = 'Eine H1-Überschrift vorhanden'
    totalScore += 10
    issues.push({
      id: 'h1-good',
      category: 'seo',
      severity: 'passed',
      title: 'H1-Struktur korrekt',
      description: 'Die Seite hat genau eine H1-Überschrift.',
    })
  }

  // Analyze Heading Structure (10 points)
  maxScore += 10
  let headingStatus: 'good' | 'warning' | 'error' = 'good'
  let headingMessage = ''

  if (headings.h2 === 0 && headings.h3 === 0) {
    headingStatus = 'warning'
    headingMessage = 'Keine Unterüberschriften (H2/H3)'
    totalScore += 3
    issues.push({
      id: 'headings-missing',
      category: 'seo',
      severity: 'warning',
      title: 'Unterüberschriften fehlen',
      description: 'Die Seite nutzt keine H2/H3 Tags zur Strukturierung des Inhalts.',
      howToFix: 'Strukturieren Sie Ihren Inhalt mit H2 und H3 Überschriften.',
    })
  } else {
    headingMessage = 'Heading-Struktur vorhanden'
    totalScore += 10
    issues.push({
      id: 'headings-good',
      category: 'seo',
      severity: 'passed',
      title: 'Heading-Struktur gut',
      description: `Die Seite nutzt ${headings.h2} H2 und ${headings.h3} H3 Tags.`,
    })
  }

  // Analyze Images (10 points)
  maxScore += 10
  let imageStatus: 'good' | 'warning' | 'error' = 'good'
  let imageMessage = ''

  if (images.total === 0) {
    imageStatus = 'good'
    imageMessage = 'Keine Bilder auf der Seite'
    totalScore += 10
  } else if (images.withoutAlt > 0) {
    const ratio = images.withoutAlt / images.total
    if (ratio > 0.5) {
      imageStatus = 'error'
      totalScore += 3
    } else if (ratio > 0.2) {
      imageStatus = 'warning'
      totalScore += 6
    } else {
      imageStatus = 'good'
      totalScore += 8
    }
    imageMessage = `${images.withoutAlt} Bilder ohne Alt-Text`

    // Build detailed description with specific URLs
    let detailedDesc = `${images.withoutAlt} von ${images.total} Bildern haben keinen Alt-Text.`
    if (images.withoutAltUrls.length > 0) {
      detailedDesc += ` Betroffene Bilder: ${images.withoutAltUrls.map(u => u.split('/').pop()).join(', ')}`
      if (images.withoutAlt > images.withoutAltUrls.length) {
        detailedDesc += ` und ${images.withoutAlt - images.withoutAltUrls.length} weitere`
      }
    }

    issues.push({
      id: 'images-alt-missing',
      category: 'seo',
      severity: imageStatus === 'error' ? 'critical' : 'warning',
      title: 'Bilder ohne Alt-Text',
      description: detailedDesc,
      value: images.withoutAlt,
      target: 0,
      howToFix: 'Fügen Sie allen Bildern beschreibende alt-Attribute hinzu. Alt-Texte helfen Suchmaschinen und Screenreadern den Bildinhalt zu verstehen.',
    })
  } else {
    imageStatus = 'good'
    imageMessage = 'Alle Bilder haben Alt-Texte'
    totalScore += 10
    issues.push({
      id: 'images-good',
      category: 'seo',
      severity: 'passed',
      title: 'Alle Bilder mit Alt-Text',
      description: `Alle ${images.total} Bilder haben beschreibende Alt-Texte.`,
    })
  }

  // Analyze Schema (10 points)
  maxScore += 10
  let schemaStatus: 'good' | 'warning' | 'error' = 'good'
  let schemaMessage = ''

  if (schemaTypes.length === 0) {
    schemaStatus = 'warning'
    schemaMessage = 'Kein Schema Markup gefunden'
    issues.push({
      id: 'schema-missing',
      category: 'seo',
      severity: 'warning',
      title: 'Schema Markup fehlt',
      description: 'Die Seite hat kein strukturiertes Daten-Markup (JSON-LD).',
      howToFix: 'Fügen Sie relevante Schema.org Markup hinzu (Organization, Website, etc.)',
    })
  } else {
    schemaMessage = `${schemaTypes.length} Schema-Typen gefunden`
    totalScore += 10
    issues.push({
      id: 'schema-good',
      category: 'seo',
      severity: 'passed',
      title: 'Schema Markup vorhanden',
      description: `Gefundene Schema-Typen: ${schemaTypes.join(', ')}`,
    })
  }

  // Analyze Canonical (10 points)
  maxScore += 10
  let canonicalStatus: 'good' | 'warning' | 'error' = 'good'
  let canonicalMessage = ''

  if (!canonical) {
    canonicalStatus = 'warning'
    canonicalMessage = 'Keine Canonical URL definiert'
    totalScore += 5
    issues.push({
      id: 'canonical-missing',
      category: 'seo',
      severity: 'warning',
      title: 'Canonical URL fehlt',
      description: 'Keine Canonical-URL gesetzt. Dies kann zu Duplicate Content führen.',
      howToFix: 'Fügen Sie <link rel="canonical" href="..."> im <head> hinzu.',
    })
  } else {
    canonicalMessage = 'Canonical URL vorhanden'
    totalScore += 10
    issues.push({
      id: 'canonical-good',
      category: 'seo',
      severity: 'passed',
      title: 'Canonical URL gesetzt',
      description: 'Die Seite hat eine korrekt definierte Canonical URL.',
    })
  }

  // Analyze OG Tags (10 points)
  maxScore += 10
  let ogStatus: 'good' | 'warning' | 'error' = 'good'

  if (!ogTitle && !ogDescription && !ogImage) {
    ogStatus = 'warning'
    issues.push({
      id: 'og-missing',
      category: 'seo',
      severity: 'warning',
      title: 'Open Graph Tags fehlen',
      description: 'Keine OG-Tags für Social Media gefunden.',
      howToFix: 'Fügen Sie og:title, og:description und og:image Meta-Tags hinzu.',
    })
  } else if (!ogImage) {
    ogStatus = 'warning'
    totalScore += 5
    issues.push({
      id: 'og-image-missing',
      category: 'seo',
      severity: 'warning',
      title: 'OG Image fehlt',
      description: 'Es ist kein og:image für Social Media Shares definiert.',
    })
  } else {
    ogStatus = 'good'
    totalScore += 10
    issues.push({
      id: 'og-good',
      category: 'seo',
      severity: 'passed',
      title: 'Open Graph Tags vorhanden',
      description: 'Die Seite hat alle wichtigen OG-Tags für Social Media.',
    })
  }

  // NEW: Extract additional SEO metrics
  const wordCount = extractWordCount(html)
  const links = extractLinks(html, url)
  const metaRobots = extractMetaRobots(html)
  const hreflangTags = extractHreflang(html)
  const urlInfo = analyzeUrlStructure(url)

  // Analyze Word Count (10 points)
  maxScore += 10
  let wordCountStatus: 'good' | 'warning' | 'error' = 'good'
  let wordCountMessage = ''

  if (wordCount < 300) {
    wordCountStatus = 'warning'
    wordCountMessage = `Nur ${wordCount} Wörter - wenig Content`
    totalScore += 3
    issues.push({
      id: 'content-thin',
      category: 'seo',
      severity: 'warning',
      title: 'Dünner Content',
      description: `Die Seite hat nur ${wordCount} Wörter. Für gute Rankings werden mindestens 300+ Wörter empfohlen.`,
      value: wordCount,
      target: '300+',
      howToFix: 'Erweitern Sie den Content mit relevantem, qualitativem Text.',
    })
  } else if (wordCount < 600) {
    wordCountStatus = 'good'
    wordCountMessage = `${wordCount} Wörter - akzeptabel`
    totalScore += 7
    issues.push({
      id: 'content-ok',
      category: 'seo',
      severity: 'info',
      title: 'Content-Länge akzeptabel',
      description: `Die Seite hat ${wordCount} Wörter. Für umfassende Themen wären 600+ besser.`,
    })
  } else {
    wordCountStatus = 'good'
    wordCountMessage = `${wordCount} Wörter - guter Content`
    totalScore += 10
    issues.push({
      id: 'content-good',
      category: 'seo',
      severity: 'passed',
      title: 'Content-Länge gut',
      description: `Die Seite hat ${wordCount} Wörter - ausreichend für gute Rankings.`,
    })
  }

  // Analyze Internal Links (5 points)
  maxScore += 5
  let internalLinksStatus: 'good' | 'warning' | 'error' = 'good'
  let internalLinksMessage = ''

  if (links.internal === 0) {
    internalLinksStatus = 'warning'
    internalLinksMessage = 'Keine internen Links'
    issues.push({
      id: 'internal-links-missing',
      category: 'seo',
      severity: 'warning',
      title: 'Keine internen Links',
      description: 'Die Seite verlinkt nicht auf andere Seiten der Website.',
      howToFix: 'Fügen Sie relevante interne Links zu anderen Seiten Ihrer Website hinzu.',
    })
  } else if (links.internal < 3) {
    internalLinksStatus = 'warning'
    internalLinksMessage = `Nur ${links.internal} interne Links`
    totalScore += 2
    issues.push({
      id: 'internal-links-few',
      category: 'seo',
      severity: 'info',
      title: 'Wenige interne Links',
      description: `Die Seite hat nur ${links.internal} interne Links. Mehr interne Verlinkung verbessert SEO.`,
    })
  } else {
    internalLinksStatus = 'good'
    internalLinksMessage = `${links.internal} interne Links`
    totalScore += 5
    issues.push({
      id: 'internal-links-good',
      category: 'seo',
      severity: 'passed',
      title: 'Interne Verlinkung gut',
      description: `Die Seite hat ${links.internal} interne Links - gute interne Verlinkung.`,
    })
  }

  // Analyze External Links (info only - external links are GOOD for SEO, not a warning)
  let externalLinksStatus: 'good' | 'warning' | 'error' = 'good'
  if (links.external > 0) {
    externalLinksStatus = 'good'
    // External links are NOT an issue - they're good for SEO!
    // Only add as passed/info, never as warning
    issues.push({
      id: 'external-links-ok',
      category: 'seo',
      severity: 'passed',
      title: 'Externe Links vorhanden',
      description: `Die Seite verlinkt auf ${links.external} externe Quellen${links.externalNofollow > 0 ? ` (${links.externalNofollow} mit nofollow)` : ''} - gut für Glaubwürdigkeit.`,
    })
  }

  // Analyze Meta Robots
  let metaRobotsStatus: 'good' | 'warning' | 'error' = 'good'
  if (metaRobots.value && !metaRobots.isIndexable) {
    metaRobotsStatus = 'warning'
    issues.push({
      id: 'meta-robots-noindex',
      category: 'seo',
      severity: 'warning',
      title: 'Seite ist auf noindex gesetzt',
      description: `Meta Robots: "${metaRobots.value}" - diese Seite wird nicht indexiert.`,
      howToFix: 'Entfernen Sie "noindex" aus dem Meta Robots Tag, wenn die Seite indexiert werden soll.',
    })
  } else if (metaRobots.value) {
    issues.push({
      id: 'meta-robots-ok',
      category: 'seo',
      severity: 'passed',
      title: 'Meta Robots korrekt',
      description: `Meta Robots: "${metaRobots.value}" - Seite ist indexierbar.`,
    })
  }

  // Analyze Hreflang (info)
  let hreflangStatus: 'good' | 'info' | 'warning' = 'info'
  if (hreflangTags.length > 0) {
    hreflangStatus = 'good'
    issues.push({
      id: 'hreflang-good',
      category: 'seo',
      severity: 'passed',
      title: 'Hreflang Tags vorhanden',
      description: `Die Seite hat Sprachversionen für: ${hreflangTags.join(', ')}`,
    })
  }

  // Analyze URL Structure (5 points)
  maxScore += 5
  let urlStatus: 'good' | 'warning' | 'error' = 'good'

  if (!urlInfo.isClean) {
    urlStatus = 'warning'
    totalScore += 2
    issues.push({
      id: 'url-not-clean',
      category: 'seo',
      severity: 'warning',
      title: 'URL-Struktur nicht optimal',
      description: 'Die URL enthält Großbuchstaben, lange Parameter oder Sonderzeichen.',
      howToFix: 'Verwenden Sie kurze, lesbare URLs in Kleinbuchstaben ohne Sonderzeichen.',
    })
  } else if (!urlInfo.hasKeywords && !urlInfo.isHomepage) {
    // Only show this for non-homepage URLs - homepage doesn't need keywords in path
    urlStatus = 'good' // Not a real issue, just info
    totalScore += 4
    issues.push({
      id: 'url-no-keywords',
      category: 'seo',
      severity: 'info',
      title: 'URL ohne Keywords',
      description: 'Die URL enthält keine aussagekräftigen Keywords.',
    })
  } else {
    totalScore += 5
    issues.push({
      id: 'url-good',
      category: 'seo',
      severity: 'passed',
      title: 'URL-Struktur optimal',
      description: urlInfo.isHomepage
        ? 'Homepage-URL mit Markenname im Domain - optimal.'
        : 'Die URL ist kurz, lesbar und enthält relevante Keywords.',
    })
  }

  // NEW: Calculate Keyword Density and Readability
  const visibleText = extractVisibleText(html)
  const keywordData = calculateKeywordDensity(visibleText, title, h1Values)
  const readabilityData = calculateReadability(visibleText)

  // Analyze Keyword Density (5 points)
  maxScore += 5
  let keywordStatus: 'good' | 'warning' | 'error' = 'good'
  let keywordMessage = ''

  if (!keywordData.primaryKeyword) {
    keywordStatus = 'warning'
    keywordMessage = 'Kein Hauptkeyword erkannt'
    totalScore += 2
    issues.push({
      id: 'keyword-none',
      category: 'seo',
      severity: 'info',
      title: 'Kein Hauptkeyword erkannt',
      description: 'Es konnte kein primäres Keyword aus Title oder H1 extrahiert werden.',
      howToFix: 'Verwenden Sie ein aussagekräftiges Keyword im Title und H1.',
    })
  } else if (keywordData.density < 0.5) {
    keywordStatus = 'warning'
    keywordMessage = `"${keywordData.primaryKeyword}" nur ${keywordData.density}% Dichte`
    totalScore += 2
    issues.push({
      id: 'keyword-low',
      category: 'seo',
      severity: 'warning',
      title: 'Keyword-Dichte zu niedrig',
      description: `Das Hauptkeyword "${keywordData.primaryKeyword}" kommt nur ${keywordData.occurrences}x vor (${keywordData.density}%). Empfohlen: 1-3%.`,
      value: `${keywordData.density}%`,
      target: '1-3%',
      howToFix: 'Verwenden Sie Ihr Hauptkeyword häufiger im Content, aber natürlich.',
    })
  } else if (keywordData.density > 4) {
    keywordStatus = 'warning'
    keywordMessage = `"${keywordData.primaryKeyword}" ${keywordData.density}% - Keyword-Stuffing?`
    totalScore += 3
    issues.push({
      id: 'keyword-high',
      category: 'seo',
      severity: 'warning',
      title: 'Keyword-Dichte zu hoch',
      description: `Das Hauptkeyword "${keywordData.primaryKeyword}" kommt ${keywordData.occurrences}x vor (${keywordData.density}%). Das könnte als Keyword-Stuffing gewertet werden.`,
      value: `${keywordData.density}%`,
      target: '1-3%',
      howToFix: 'Reduzieren Sie die Keyword-Häufigkeit und nutzen Sie Synonyme.',
    })
  } else {
    keywordMessage = `"${keywordData.primaryKeyword}" ${keywordData.density}% - optimal`
    totalScore += 5
    issues.push({
      id: 'keyword-good',
      category: 'seo',
      severity: 'passed',
      title: 'Keyword-Dichte optimal',
      description: `Das Hauptkeyword "${keywordData.primaryKeyword}" hat eine optimale Dichte von ${keywordData.density}%.`,
    })
  }

  // Analyze Readability (5 points)
  maxScore += 5
  let readabilityStatus: 'good' | 'warning' | 'error' = 'good'
  let readabilityMessage = ''

  if (readabilityData.score === 0) {
    readabilityStatus = 'warning'
    readabilityMessage = 'Zu wenig Text für Analyse'
    totalScore += 2
  } else if (readabilityData.score < 30) {
    readabilityStatus = 'warning'
    readabilityMessage = `Lesbarkeit: ${readabilityData.grade} (schwer)`
    totalScore += 2
    issues.push({
      id: 'readability-hard',
      category: 'seo',
      severity: 'warning',
      title: 'Schwer lesbar',
      description: `Der Text ist schwer zu lesen (Score: ${readabilityData.score}/100). Durchschnittliche Satzlänge: ${readabilityData.avgSentenceLength} Wörter.`,
      value: readabilityData.score,
      target: '60+',
      howToFix: 'Verwenden Sie kürzere Sätze und einfachere Wörter.',
    })
  } else if (readabilityData.score < 50) {
    readabilityStatus = 'good'
    readabilityMessage = `Lesbarkeit: ${readabilityData.grade}`
    totalScore += 3
    issues.push({
      id: 'readability-medium',
      category: 'seo',
      severity: 'info',
      title: 'Lesbarkeit akzeptabel',
      description: `Der Text hat mittlere Lesbarkeit (Score: ${readabilityData.score}/100). Durchschnittliche Satzlänge: ${readabilityData.avgSentenceLength} Wörter.`,
    })
  } else {
    readabilityMessage = `Lesbarkeit: ${readabilityData.grade} (gut)`
    totalScore += 5
    issues.push({
      id: 'readability-good',
      category: 'seo',
      severity: 'passed',
      title: 'Gute Lesbarkeit',
      description: `Der Text ist gut lesbar (Score: ${readabilityData.score}/100). ${readabilityData.grade}.`,
    })
  }

  // Check sitemap and robots (additional checks, async)
  const baseUrl = new URL(url).origin
  let sitemapFound = false
  let robotsFound = false

  try {
    const sitemapRes = await fetch(`${baseUrl}/sitemap.xml`, { method: 'HEAD', signal: AbortSignal.timeout(5000) })
    sitemapFound = sitemapRes.ok
  } catch {
    // Sitemap not found
  }

  try {
    const robotsRes = await fetch(`${baseUrl}/robots.txt`, { method: 'HEAD', signal: AbortSignal.timeout(5000) })
    robotsFound = robotsRes.ok
  } catch {
    // Robots not found
  }

  // Add sitemap/robots issues
  maxScore += 10
  if (sitemapFound) {
    totalScore += 5
    issues.push({
      id: 'sitemap-good',
      category: 'seo',
      severity: 'passed',
      title: 'Sitemap vorhanden',
      description: 'Die Website hat eine sitemap.xml.',
    })
  } else {
    issues.push({
      id: 'sitemap-missing',
      category: 'seo',
      severity: 'warning',
      title: 'Keine Sitemap gefunden',
      description: 'Keine sitemap.xml im Root-Verzeichnis gefunden.',
      howToFix: 'Erstellen Sie eine sitemap.xml und verlinken Sie sie in der robots.txt.',
    })
  }

  if (robotsFound) {
    totalScore += 5
    issues.push({
      id: 'robots-good',
      category: 'seo',
      severity: 'passed',
      title: 'Robots.txt vorhanden',
      description: 'Die Website hat eine robots.txt.',
    })
  } else {
    issues.push({
      id: 'robots-missing',
      category: 'seo',
      severity: 'warning',
      title: 'Keine robots.txt',
      description: 'Keine robots.txt im Root-Verzeichnis gefunden.',
      howToFix: 'Erstellen Sie eine robots.txt im Root-Verzeichnis.',
    })
  }

  // Calculate final score
  const score = Math.round((totalScore / maxScore) * 100)

  return {
    score,
    title: {
      value: title,
      length: title?.length || 0,
      status: titleStatus,
      message: titleMessage,
    },
    description: {
      value: description,
      length: description?.length || 0,
      status: descStatus,
      message: descMessage,
    },
    h1: {
      count: headings.h1,
      values: h1Values,
      status: h1Status,
      message: h1Message,
    },
    headingStructure: {
      ...headings,
      status: headingStatus,
      message: headingMessage,
    },
    images: {
      total: images.total,
      withoutAlt: images.withoutAlt,
      withoutAltUrls: images.withoutAltUrls,
      status: imageStatus,
      message: imageMessage,
    },
    schema: {
      found: schemaTypes.length > 0,
      types: schemaTypes,
      status: schemaStatus,
      message: schemaMessage,
    },
    canonical: {
      found: !!canonical,
      url: canonical,
      status: canonicalStatus,
      message: canonicalMessage,
    },
    ogTags: {
      title: ogTitle,
      description: ogDescription,
      image: ogImage,
      status: ogStatus,
    },
    // NEW: Additional metrics
    content: {
      wordCount,
      status: wordCountStatus,
      message: wordCountMessage,
    },
    internalLinks: {
      count: links.internal,
      status: internalLinksStatus,
      message: internalLinksMessage,
    },
    externalLinks: {
      count: links.external,
      withNofollow: links.externalNofollow,
      status: externalLinksStatus,
    },
    metaRobots: {
      found: metaRobots.value !== null,
      value: metaRobots.value,
      isIndexable: metaRobots.isIndexable,
      status: metaRobotsStatus,
    },
    hreflang: {
      found: hreflangTags.length > 0,
      languages: hreflangTags,
      status: hreflangStatus,
    },
    urlStructure: {
      isClean: urlInfo.isClean,
      hasKeywords: urlInfo.hasKeywords,
      length: urlInfo.length,
      status: urlStatus,
    },
    keywordDensity: {
      primaryKeyword: keywordData.primaryKeyword,
      density: keywordData.density,
      occurrences: keywordData.occurrences,
      status: keywordStatus,
      message: keywordMessage,
    },
    readability: {
      score: readabilityData.score,
      grade: readabilityData.grade,
      avgSentenceLength: readabilityData.avgSentenceLength,
      avgWordLength: readabilityData.avgWordLength,
      status: readabilityStatus,
      message: readabilityMessage,
    },
    sitemapFound,
    robotsFound,
    issues,
  }
}
