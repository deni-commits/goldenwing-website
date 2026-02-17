#!/usr/bin/env node
/**
 * Fix LocalBusiness schema issues on beste-*-agenturen pages - v2
 * Handles pages without the "Speakable Schema" comment
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.join(__dirname, '..')

// Files that still have the inline schema
const files = [
  'src/app/[locale]/(marketing)/beste-app-entwicklung-agenturen-wien/page.tsx',
  'src/app/[locale]/(marketing)/beste-branding-agenturen-wien/page.tsx',
  'src/app/[locale]/(marketing)/beste-content-marketing-agenturen-wien/page.tsx',
  'src/app/[locale]/(marketing)/beste-digital-marketing-agenturen-wien/page.tsx',
  'src/app/[locale]/(marketing)/beste-ecommerce-agenturen-wien/page.tsx',
  'src/app/[locale]/(marketing)/beste-google-ads-agenturen-wien/page.tsx',
  'src/app/[locale]/(marketing)/beste-grafikdesign-agenturen-wien/page.tsx',
  'src/app/[locale]/(marketing)/beste-kreativagenturen-wien/page.tsx',
  'src/app/[locale]/(marketing)/beste-online-marketing-agenturen-wien/page.tsx',
  'src/app/[locale]/(marketing)/beste-onlineshop-agenturen-wien/page.tsx',
  'src/app/[locale]/(marketing)/beste-seo-agenturen-fuer-aerzte/page.tsx',
  'src/app/[locale]/(marketing)/beste-seo-agenturen-oesterreich/page.tsx',
  'src/app/[locale]/(marketing)/beste-seo-agenturen-wien/page.tsx',
  'src/app/[locale]/(marketing)/beste-social-media-agenturen-wien/page.tsx',
  'src/app/[locale]/(marketing)/beste-website-relaunch-agenturen/page.tsx',
  'src/app/[locale]/(marketing)/beste-wordpress-agenturen-wien/page.tsx',
]

let fixed = 0
let skipped = 0

for (const relPath of files) {
  const filePath = path.join(projectRoot, relPath)
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ NOT FOUND: ${relPath}`)
    continue
  }
  
  let content = fs.readFileSync(filePath, 'utf8')
  
  // Check if already has AgencyComparisonSchema component (not just import)
  if (content.includes('<AgencyComparisonSchema')) {
    console.log(`⏭️  Already has component: ${path.basename(path.dirname(relPath))}`)
    skipped++
    continue
  }
  
  // Check if has inline schema with itemListElement
  if (!content.includes('itemListElement: agencyList.map')) {
    console.log(`⏭️  No inline schema: ${path.basename(path.dirname(relPath))}`)
    skipped++
    continue
  }
  
  const original = content
  
  // Pattern to match the entire inline schema block
  // This is more flexible - just looks for the <script> with WebPage type and itemListElement
  const inlineSchemaPattern = /<script\s+type="application\/ld\+json"\s+dangerouslySetInnerHTML=\{\{\s*__html: JSON\.stringify\(\{[\s\S]*?'@type': 'WebPage'[\s\S]*?itemListElement: agencyList\.map[\s\S]*?\}\),?\s*\}\}\s*\/>/

  if (inlineSchemaPattern.test(content)) {
    content = content.replace(
      inlineSchemaPattern,
      `<AgencyComparisonSchema
        title={c.title}
        agencies={agencyList}
        dateModified="2026-02-09"
      />`
    )
    
    if (content !== original) {
      fs.writeFileSync(filePath, content)
      console.log(`✅ Fixed: ${path.basename(path.dirname(relPath))}`)
      fixed++
    } else {
      console.log(`⚠️  Regex matched but no change: ${path.basename(path.dirname(relPath))}`)
    }
  } else {
    console.log(`⚠️  Pattern not matched: ${path.basename(path.dirname(relPath))}`)
  }
}

console.log(`\n📊 Summary: ${fixed} fixed, ${skipped} skipped`)
