#!/usr/bin/env node
/**
 * Fix LocalBusiness schema issues on beste-*-agenturen pages
 * - Adds AgencyComparisonSchema to imports
 * - Replaces inline schema with component
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.join(__dirname, '..')

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
let errors = 0

for (const relPath of files) {
  const filePath = path.join(projectRoot, relPath)
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ NOT FOUND: ${relPath}`)
    errors++
    continue
  }
  
  let content = fs.readFileSync(filePath, 'utf8')
  const original = content
  
  // 1. Update import - add AgencyComparisonSchema if not present
  if (!content.includes('AgencyComparisonSchema')) {
    content = content.replace(
      /import \{ BreadcrumbListSchema, FAQSchema, LocalBusinessSchema \} from '@\/components\/seo\/json-ld'/,
      "import { BreadcrumbListSchema, FAQSchema, LocalBusinessSchema, AgencyComparisonSchema } from '@/components/seo/json-ld'"
    )
  }
  
  // 2. Replace inline schema with component
  // Match the entire inline schema block
  const inlineSchemaPattern = /\{\/\* Speakable Schema for AI extraction \*\/\}\s*<script\s+type="application\/ld\+json"\s+dangerouslySetInnerHTML=\{\{\s*__html: JSON\.stringify\(\{[\s\S]*?'@type': 'WebPage'[\s\S]*?itemListElement: agencyList\.map[\s\S]*?\}\),\s*\}\}\s*\/>/

  if (inlineSchemaPattern.test(content)) {
    content = content.replace(
      inlineSchemaPattern,
      `<AgencyComparisonSchema
        title={c.title}
        agencies={agencyList}
        dateModified="2026-02-09"
      />`
    )
  }
  
  if (content !== original) {
    fs.writeFileSync(filePath, content)
    console.log(`✅ Fixed: ${path.basename(path.dirname(relPath))}`)
    fixed++
  } else {
    console.log(`⏭️  No changes needed: ${path.basename(path.dirname(relPath))}`)
  }
}

console.log(`\n📊 Summary: ${fixed} fixed, ${errors} errors, ${files.length - fixed - errors} unchanged`)
