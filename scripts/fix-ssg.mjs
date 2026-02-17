#!/usr/bin/env node
/**
 * Fix SSG: Add generateStaticParams to all pages under [locale]
 * Handles multi-line imports correctly
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const SSG_CODE = `
export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}
`

function findAllPages(dir, results = []) {
  const files = readdirSync(dir)
  
  for (const file of files) {
    const fullPath = join(dir, file)
    const stat = statSync(fullPath)
    
    if (stat.isDirectory()) {
      // Skip [slug] directories
      if (!file.includes('[slug]') && !file.includes('[subslug]')) {
        findAllPages(fullPath, results)
      }
    } else if (file === 'page.tsx' && dir.includes('[locale]')) {
      results.push(fullPath)
    }
  }
  
  return results
}

function findImportEnd(content) {
  // Find the position after the last import statement ends
  // Handle both single-line and multi-line imports
  
  const lines = content.split('\n')
  let inImport = false
  let braceCount = 0
  let lastImportEnd = -1
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Start of import
    if (line.match(/^import\s/)) {
      inImport = true
      braceCount = 0
    }
    
    if (inImport) {
      // Count braces
      for (const char of line) {
        if (char === '{') braceCount++
        if (char === '}') braceCount--
      }
      
      // Check if import ends on this line
      if (line.includes(' from ') || (braceCount === 0 && line.match(/['"].*['"]/))) {
        inImport = false
        lastImportEnd = i
      }
    }
  }
  
  return lastImportEnd
}

async function main() {
  const appDir = join(__dirname, '../src/app')
  const pages = findAllPages(appDir)
  
  let fixed = 0
  let skipped = 0
  const errors = []
  
  for (const pagePath of pages) {
    const content = readFileSync(pagePath, 'utf-8')
    
    // Skip if already has generateStaticParams
    if (content.includes('generateStaticParams')) {
      skipped++
      continue
    }
    
    // Skip client components
    if (content.includes("'use client'") || content.includes('"use client"')) {
      skipped++
      continue
    }
    
    const lastImportLine = findImportEnd(content)
    
    if (lastImportLine === -1) {
      errors.push(`No imports found: ${pagePath}`)
      continue
    }
    
    const lines = content.split('\n')
    lines.splice(lastImportLine + 1, 0, SSG_CODE)
    
    writeFileSync(pagePath, lines.join('\n'))
    
    const relativePath = pagePath.replace(appDir, '.')
    console.log(`✅ Fixed: ${relativePath}`)
    fixed++
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
