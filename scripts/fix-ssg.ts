#!/usr/bin/env npx ts-node
/**
 * Fix SSG: Add generateStaticParams to all pages under [locale]
 * 
 * Run: npx ts-node scripts/fix-ssg.ts
 */

import * as fs from 'fs'
import * as path from 'path'
import { glob } from 'glob'

const LOCALES_EXPORT = `
export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}
`

async function main() {
  // Find all page.tsx files under [locale] that don't have generateStaticParams
  const appDir = path.join(__dirname, '../src/app')
  const files = await glob('**/[locale]/**/page.tsx', { cwd: appDir })
  
  let fixed = 0
  let skipped = 0
  const errors: string[] = []

  for (const file of files) {
    const fullPath = path.join(appDir, file)
    
    // Skip dynamic routes like [slug]
    if (file.includes('[slug]') || file.includes('[subslug]')) {
      skipped++
      continue
    }
    
    const content = fs.readFileSync(fullPath, 'utf-8')
    
    // Skip if already has generateStaticParams
    if (content.includes('generateStaticParams')) {
      skipped++
      continue
    }
    
    // Find the best place to insert:
    // 1. After the last import statement
    // 2. Before the first export
    
    const lines = content.split('\n')
    let insertIndex = -1
    
    // Find last import
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].startsWith('import ') || lines[i].match(/^import\s*{/)) {
        insertIndex = i + 1
        break
      }
    }
    
    if (insertIndex === -1) {
      errors.push(`No imports found: ${file}`)
      continue
    }
    
    // Insert the export
    lines.splice(insertIndex, 0, LOCALES_EXPORT)
    
    fs.writeFileSync(fullPath, lines.join('\n'))
    fixed++
    console.log(`✅ Fixed: ${file}`)
  }
  
  console.log(`\n--- Summary ---`)
  console.log(`Fixed: ${fixed}`)
  console.log(`Skipped: ${skipped}`)
  console.log(`Errors: ${errors.length}`)
  
  if (errors.length > 0) {
    console.log('\nErrors:')
    errors.forEach(e => console.log(`  - ${e}`))
  }
}

main().catch(console.error)
