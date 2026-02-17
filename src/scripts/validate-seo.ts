#!/usr/bin/env tsx
/**
 * SEO Validation Script
 *
 * Runs during build to ensure:
 * 1. All slug mappings are bidirectionally consistent
 * 2. No orphaned translations exist
 * 3. EN pages are properly configured
 *
 * Usage:
 *   npx tsx src/scripts/validate-seo.ts
 *   npm run validate:seo
 */

import {
  SERVICE_SLUGS,
  SUB_SERVICE_SLUGS,
  REFERENCE_SLUGS,
  BLOG_CATEGORY_SLUGS,
  BLOG_POST_SLUGS,
  PACKAGE_SLUGS,
  validateSlugMappings,
} from '../config/slug-mappings'

interface ValidationResult {
  passed: boolean
  errors: string[]
  warnings: string[]
  stats: {
    totalSlugs: number
    deSlugs: number
    enSlugs: number
    bidirectionalMappings: number
  }
}

function validateBidirectionalMapping(
  name: string,
  deToEn: Record<string, string>,
  enToDe: Record<string, string>
): { errors: string[]; warnings: string[] } {
  const errors: string[] = []
  const warnings: string[] = []

  // Check DE → EN → DE roundtrip
  for (const [deSlug, enSlug] of Object.entries(deToEn)) {
    const backToDe = enToDe[enSlug]
    if (!backToDe) {
      errors.push(`${name}: DE slug "${deSlug}" → EN slug "${enSlug}" has no reverse mapping`)
    } else if (backToDe !== deSlug) {
      warnings.push(`${name}: Roundtrip mismatch: "${deSlug}" → "${enSlug}" → "${backToDe}"`)
    }
  }

  // Check EN → DE → EN roundtrip
  for (const [enSlug, deSlug] of Object.entries(enToDe)) {
    const backToEn = deToEn[deSlug]
    if (!backToEn) {
      errors.push(`${name}: EN slug "${enSlug}" → DE slug "${deSlug}" has no reverse mapping`)
    }
  }

  return { errors, warnings }
}

function countSlugs(): { de: number; en: number; total: number } {
  const counts = {
    de: 0,
    en: 0,
  }

  counts.de += Object.keys(SERVICE_SLUGS.de).length
  counts.en += Object.keys(SERVICE_SLUGS.en).length

  counts.de += Object.keys(SUB_SERVICE_SLUGS.de).length
  counts.en += Object.keys(SUB_SERVICE_SLUGS.en).length

  counts.de += Object.keys(REFERENCE_SLUGS.de).length
  counts.en += Object.keys(REFERENCE_SLUGS.en).length

  counts.de += Object.keys(BLOG_CATEGORY_SLUGS.de).length
  counts.en += Object.keys(BLOG_CATEGORY_SLUGS.en).length

  counts.de += Object.keys(BLOG_POST_SLUGS.de).length
  counts.en += Object.keys(BLOG_POST_SLUGS.en).length

  counts.de += Object.keys(PACKAGE_SLUGS.de).length
  counts.en += Object.keys(PACKAGE_SLUGS.en).length

  return {
    de: counts.de,
    en: counts.en,
    total: counts.de + counts.en,
  }
}

function runValidation(): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  console.log('🔍 Starting SEO validation...\n')

  // 1. Validate slug mappings from central config
  console.log('📋 Checking slug mapping consistency...')
  const centralValidation = validateSlugMappings()
  if (!centralValidation.valid) {
    errors.push(...centralValidation.errors)
  }

  // 2. Validate each mapping type
  const mappings = [
    { name: 'SERVICE_SLUGS', de: SERVICE_SLUGS.de, en: SERVICE_SLUGS.en },
    { name: 'SUB_SERVICE_SLUGS', de: SUB_SERVICE_SLUGS.de, en: SUB_SERVICE_SLUGS.en },
    { name: 'REFERENCE_SLUGS', de: REFERENCE_SLUGS.de, en: REFERENCE_SLUGS.en },
    { name: 'BLOG_CATEGORY_SLUGS', de: BLOG_CATEGORY_SLUGS.de, en: BLOG_CATEGORY_SLUGS.en },
    { name: 'BLOG_POST_SLUGS', de: BLOG_POST_SLUGS.de, en: BLOG_POST_SLUGS.en },
    { name: 'PACKAGE_SLUGS', de: PACKAGE_SLUGS.de, en: PACKAGE_SLUGS.en },
  ]

  for (const mapping of mappings) {
    const result = validateBidirectionalMapping(
      mapping.name,
      mapping.de as Record<string, string>,
      mapping.en as Record<string, string>
    )
    errors.push(...result.errors)
    warnings.push(...result.warnings)
    console.log(`  ✓ ${mapping.name}: ${Object.keys(mapping.de).length} DE, ${Object.keys(mapping.en).length} EN`)
  }

  // 3. Count statistics
  const slugCounts = countSlugs()

  // 4. Check for common issues
  console.log('\n📊 Checking for common issues...')

  // Check for duplicate slugs across categories
  const allDeSlugs = new Set<string>()
  const allEnSlugs = new Set<string>()
  const duplicateDe: string[] = []
  const duplicateEn: string[] = []

  for (const mapping of mappings) {
    for (const slug of Object.keys(mapping.de)) {
      if (allDeSlugs.has(slug)) {
        duplicateDe.push(slug)
      }
      allDeSlugs.add(slug)
    }
    for (const slug of Object.keys(mapping.en)) {
      if (allEnSlugs.has(slug)) {
        duplicateEn.push(slug)
      }
      allEnSlugs.add(slug)
    }
  }

  if (duplicateDe.length > 0) {
    warnings.push(`Duplicate DE slugs found across categories: ${duplicateDe.join(', ')}`)
  }
  if (duplicateEn.length > 0) {
    warnings.push(`Duplicate EN slugs found across categories: ${duplicateEn.join(', ')}`)
  }

  // Print results
  console.log('\n' + '='.repeat(50))

  if (errors.length > 0) {
    console.log('\n❌ ERRORS:')
    errors.forEach(err => console.log(`   ${err}`))
  }

  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:')
    warnings.forEach(warn => console.log(`   ${warn}`))
  }

  console.log('\n📈 STATISTICS:')
  console.log(`   Total slug mappings: ${slugCounts.total}`)
  console.log(`   DE slugs: ${slugCounts.de}`)
  console.log(`   EN slugs: ${slugCounts.en}`)
  console.log(`   Balance: ${slugCounts.de === slugCounts.en ? '✓ Equal' : '⚠️ Unequal'}`)

  const passed = errors.length === 0

  console.log('\n' + '='.repeat(50))
  if (passed) {
    console.log('✅ SEO validation PASSED\n')
  } else {
    console.log('❌ SEO validation FAILED\n')
  }

  return {
    passed,
    errors,
    warnings,
    stats: {
      totalSlugs: slugCounts.total,
      deSlugs: slugCounts.de,
      enSlugs: slugCounts.en,
      bidirectionalMappings: slugCounts.de,
    },
  }
}

// Run validation
const result = runValidation()

// Exit with error code if validation failed
if (!result.passed) {
  process.exit(1)
}
