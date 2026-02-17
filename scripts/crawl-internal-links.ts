#!/usr/bin/env tsx

/**
 * Internal Link Crawler & Verifier (No external dependencies)
 *
 * Crawls specified start URLs and verifies all internal links return 200 OK.
 * Reports any 3xx/4xx responses with source page and DOM location.
 *
 * Usage:
 *   npm run dev  # Start dev server first
 *   tsx scripts/crawl-internal-links.ts
 */

import { writeFileSync } from 'fs'

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

const START_URLS = [
  '/',
  '/leistungen',
  '/lexikon',
  '/blog',
  '/referenzen',
  '/kontakt',
  '/en',
  '/en/services',
  '/en/glossary',
  '/en/blog',
  '/en/references',
  '/en/contact',
]

interface LinkInfo {
  href: string
  text: string
  source: string
  section: 'header' | 'footer' | 'content' | 'unknown'
  isStringHref: boolean
}

interface LinkResult {
  url: string
  status: number
  redirects: number
  finalUrl: string
  sources: LinkInfo[]
}

/**
 * Extract section from HTML context (simple heuristic)
 */
function getSection(htmlBefore: string, htmlAfter: string): 'header' | 'footer' | 'content' | 'unknown' {
  const context = (htmlBefore + htmlAfter).toLowerCase()

  // Look for header/footer tags in surrounding context
  const headerDistance = context.lastIndexOf('<header')
  const footerDistance = context.lastIndexOf('<footer')
  const headerCloseDistance = context.indexOf('</header>')
  const footerCloseDistance = context.indexOf('</footer>')

  if (headerDistance !== -1 && (headerCloseDistance === -1 || headerCloseDistance > 0)) {
    return 'header'
  }

  if (footerDistance !== -1 && (footerCloseDistance === -1 || footerCloseDistance > 0)) {
    return 'footer'
  }

  // Check for nav in header/footer
  if (context.includes('<nav') && headerDistance !== -1) return 'header'
  if (context.includes('<nav') && footerDistance !== -1) return 'footer'

  return 'content'
}

/**
 * Check if href was likely a string literal (simple heuristic)
 */
function isLikelyStringHref(href: string): boolean {
  // Simple paths without params/query are likely string hrefs
  return /^\/[a-z-]+$/.test(href) || /^\/[a-z-]+\/[a-z-]+$/.test(href)
}

/**
 * Fetch a URL and follow redirects manually to count them
 */
async function checkUrl(url: string): Promise<{ status: number; redirects: number; finalUrl: string }> {
  let currentUrl = url
  let redirectCount = 0
  let status = 0

  try {
    while (redirectCount < 10) {
      const response = await fetch(currentUrl, { redirect: 'manual' })
      status = response.status

      if (status >= 300 && status < 400) {
        const location = response.headers.get('location')
        if (!location) break

        redirectCount++
        currentUrl = new URL(location, currentUrl).toString()
      } else {
        break
      }
    }
  } catch (error) {
    console.error(`Error checking ${url}:`, error)
    status = 0
  }

  return { status, redirects: redirectCount, finalUrl: currentUrl }
}

/**
 * Extract all internal links from HTML using regex (no DOM parser needed)
 */
async function extractLinks(url: string): Promise<LinkInfo[]> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      console.error(`Failed to fetch ${url}: ${response.status}`)
      return []
    }

    const html = await response.text()
    const links: LinkInfo[] = []

    // Regex to match <a href="/path">text</a>
    // This is not perfect but works for most cases
    const linkRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi

    let match
    while ((match = linkRegex.exec(html)) !== null) {
      const href = match[1]
      const innerHtml = match[2]

      // Only internal links starting with /
      if (!href.startsWith('/') || href.startsWith('//')) continue

      // Clean href (remove hash, query for grouping)
      const cleanHref = href.split('?')[0].split('#')[0]
      if (!cleanHref || cleanHref === '/') continue

      // Extract text content (remove HTML tags)
      const text = innerHtml.replace(/<[^>]+>/g, '').trim() || '[no text]'

      // Get context around the link (500 chars before/after)
      const linkPosition = match.index
      const contextBefore = html.substring(Math.max(0, linkPosition - 500), linkPosition)
      const contextAfter = html.substring(linkPosition, Math.min(html.length, linkPosition + 500))

      const section = getSection(contextBefore, contextAfter)
      const isStringHref = isLikelyStringHref(cleanHref)

      links.push({
        href: cleanHref,
        text: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
        source: url.replace(BASE_URL, ''),
        section,
        isStringHref,
      })
    }

    return links
  } catch (error) {
    console.error(`Error extracting links from ${url}:`, error)
    return []
  }
}

/**
 * Crawl all start URLs and verify internal links
 */
async function crawlAndVerify() {
  console.log('🔍 Internal Link Crawler & Verifier')
  console.log('='.repeat(50))
  console.log(`Base URL: ${BASE_URL}`)
  console.log(`Start URLs: ${START_URLS.length}`)
  console.log('')

  // Step 1: Extract all links from start URLs
  console.log('📊 Step 1: Extracting links from start pages...')
  const allLinks: LinkInfo[] = []

  for (const startPath of START_URLS) {
    const url = `${BASE_URL}${startPath}`
    console.log(`  Crawling: ${startPath}`)
    const links = await extractLinks(url)
    allLinks.push(...links)
  }

  console.log(`  Found ${allLinks.length} total link instances`)
  console.log('')

  // Step 2: Group links by target URL
  const linksByTarget = new Map<string, LinkInfo[]>()
  allLinks.forEach(link => {
    if (!linksByTarget.has(link.href)) {
      linksByTarget.set(link.href, [])
    }
    linksByTarget.get(link.href)!.push(link)
  })

  console.log(`  Unique targets: ${linksByTarget.size}`)
  console.log('')

  // Step 3: Check each unique target
  console.log('🔍 Step 2: Checking link targets...')
  const results: LinkResult[] = []
  let checked = 0

  for (const [href, sources] of linksByTarget.entries()) {
    const url = `${BASE_URL}${href}`
    checked++

    if (checked % 10 === 0) {
      console.log(`  Progress: ${checked}/${linksByTarget.size}`)
    }

    const check = await checkUrl(url)

    results.push({
      url: href,
      status: check.status,
      redirects: check.redirects,
      finalUrl: check.finalUrl.replace(BASE_URL, ''),
      sources,
    })
  }

  console.log(`  Checked: ${checked} URLs`)
  console.log('')

  // Step 4: Filter and report findings
  console.log('📋 Step 3: Analyzing results...')
  console.log('')

  const findings = results.filter(r => r.status !== 200)
  const redirects = results.filter(r => r.redirects > 0)
  const errors = results.filter(r => r.status >= 400 || r.status === 0)

  console.log(`✅ 200 OK: ${results.length - findings.length}`)
  console.log(`⚠️  3xx Redirects: ${redirects.length}`)
  console.log(`❌ 4xx/5xx Errors: ${errors.length}`)
  console.log('')

  // Generate detailed report
  let report = '# Internal Link Verification Report\n\n'
  report += `**Date:** ${new Date().toISOString().split('T')[0]}\n`
  report += `**Base URL:** ${BASE_URL}\n`
  report += `**Start URLs:** ${START_URLS.length}\n\n`

  report += '## Summary\n\n'
  report += `- **Total link instances:** ${allLinks.length}\n`
  report += `- **Unique targets:** ${linksByTarget.size}\n`
  report += `- **200 OK:** ${results.length - findings.length}\n`
  report += `- **3xx Redirects:** ${redirects.length}\n`
  report += `- **4xx/5xx Errors:** ${errors.length}\n\n`

  if (findings.length === 0) {
    report += '## ✅ Result: All Links OK\n\n'
    report += 'All internal links return 200 OK. No action required.\n'
  } else {
    report += '## ⚠️ Findings\n\n'

    if (redirects.length > 0) {
      report += '### Redirects (3xx)\n\n'
      redirects.forEach(result => {
        report += `#### \`${result.url}\` → ${result.status} (${result.redirects} redirect${result.redirects > 1 ? 's' : ''})\n\n`
        report += `**Final URL:** \`${result.finalUrl}\`\n\n`
        report += '**Sources:**\n\n'

        // Group by source page
        const bySource = new Map<string, LinkInfo[]>()
        result.sources.forEach(src => {
          if (!bySource.has(src.source)) bySource.set(src.source, [])
          bySource.get(src.source)!.push(src)
        })

        bySource.forEach((links, source) => {
          report += `- **${source}** (${links.length} instance${links.length > 1 ? 's' : ''})\n`
          links.forEach(link => {
            report += `  - ${link.section} → "${link.text}"`
            if (link.isStringHref) report += ` 🔴 STRING HREF`
            report += '\n'
          })
        })

        report += '\n'
      })
    }

    if (errors.length > 0) {
      report += '### Errors (4xx/5xx)\n\n'
      errors.forEach(result => {
        report += `#### \`${result.url}\` → ${result.status}\n\n`
        report += '**Sources:**\n\n'

        const bySource = new Map<string, LinkInfo[]>()
        result.sources.forEach(src => {
          if (!bySource.has(src.source)) bySource.set(src.source, [])
          bySource.get(src.source)!.push(src)
        })

        bySource.forEach((links, source) => {
          report += `- **${source}** (${links.length} instance${links.length > 1 ? 's' : ''})\n`
          links.forEach(link => {
            report += `  - ${link.section} → "${link.text}"`
            if (link.isStringHref) report += ` 🔴 STRING HREF`
            report += '\n'
          })
        })

        report += '\n'
      })
    }
  }

  // Special section: String href analysis
  const stringHrefs = allLinks.filter(l => l.isStringHref)
  if (stringHrefs.length > 0) {
    report += '## 🔍 String href Analysis\n\n'
    report += `Found ${stringHrefs.length} links that appear to use string hrefs.\n\n`

    const stringHrefsByTarget = new Map<string, LinkInfo[]>()
    stringHrefs.forEach(link => {
      if (!stringHrefsByTarget.has(link.href)) {
        stringHrefsByTarget.set(link.href, [])
      }
      stringHrefsByTarget.get(link.href)!.push(link)
    })

    stringHrefsByTarget.forEach((links, href) => {
      const result = results.find(r => r.url === href)
      const status = result ? result.status : 'unknown'
      const hasRedirect = result && result.redirects > 0

      report += `### \`${href}\` (${links.length} instances) - Status: ${status}`
      if (hasRedirect) report += ` ⚠️ REDIRECTS`
      report += '\n\n'

      const bySource = new Map<string, LinkInfo[]>()
      links.forEach(src => {
        if (!bySource.has(src.source)) bySource.set(src.source, [])
        bySource.get(src.source)!.push(src)
      })

      bySource.forEach((sourceLinks, source) => {
        report += `- ${source} (${sourceLinks.length}×)\n`
      })

      report += '\n'
    })
  }

  // Verification commands
  report += '## Verification Commands\n\n'
  report += '```bash\n'
  report += '# Re-run this script\n'
  report += 'npm run dev  # Ensure dev server is running\n'
  report += 'tsx scripts/crawl-internal-links.ts\n\n'
  report += '# Manual spot checks\n'
  if (redirects.length > 0) {
    redirects.slice(0, 3).forEach(r => {
      report += `curl -sI ${BASE_URL}${r.url} | grep "HTTP\\|Location"\n`
    })
  }
  report += '```\n'

  // Save report
  const reportPath = './LINK-VERIFICATION-REPORT.md'
  writeFileSync(reportPath, report)
  console.log(`📄 Report saved: ${reportPath}`)
  console.log('')

  // Console summary
  if (findings.length > 0) {
    console.log('⚠️  FINDINGS DETECTED')
    console.log('')
    console.log(`${redirects.length} redirect(s) and ${errors.length} error(s) found.`)
    console.log(`See ${reportPath} for details.`)
    console.log('')
    console.log('🔧 Next steps:')
    console.log('1. Review the report')
    console.log('2. Fix link generation to be locale-aware')
    console.log('3. Re-run this script to verify')
  } else {
    console.log('✅ ALL LINKS OK')
    console.log('')
    console.log('No internal links with 3xx or 4xx status found.')
  }

  // Exit code
  process.exit(findings.length > 0 ? 1 : 0)
}

// Check if dev server is running
async function checkDevServer() {
  try {
    const response = await fetch(BASE_URL, { signal: AbortSignal.timeout(3000) })
    return response.ok
  } catch {
    return false
  }
}

// Main
async function main() {
  const serverRunning = await checkDevServer()

  if (!serverRunning) {
    console.error('❌ Dev server not running!')
    console.error('')
    console.error('Please start the dev server first:')
    console.error('  npm run dev')
    console.error('')
    process.exit(1)
  }

  await crawlAndVerify()
}

main()
