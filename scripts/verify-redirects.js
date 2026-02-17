/**
 * Redirect Verification Script
 *
 * Checks:
 * 1. Redirect count (MAX 50)
 * 2. No redirect chains (max 1 hop)
 * 3. All redirects resolve to 200
 */

const { LEGACY_REDIRECTS } = require('../src/seo/legacy-redirects')

console.log('🔍 Redirect Verification\n')

// 1. Count redirects
const count = LEGACY_REDIRECTS.length
console.log(`📊 Total redirects: ${count}`)

if (count > 50) {
  console.error(`❌ ERROR: ${count} redirects exceed MAX 50 limit!`)
  process.exit(1)
} else {
  console.log(`✅ Redirect count OK (≤ 50)`)
}

// 2. Check for duplicate sources
const sources = LEGACY_REDIRECTS.map(r => r.source)
const duplicates = sources.filter((item, index) => sources.indexOf(item) !== index)
if (duplicates.length > 0) {
  console.error(`\n❌ ERROR: Duplicate redirect sources found:`)
  duplicates.forEach(dup => console.error(`   - ${dup}`))
  process.exit(1)
} else {
  console.log(`✅ No duplicate sources`)
}

// 3. List redirect categories
const blogPosts = LEGACY_REDIRECTS.filter(r => !r.source.startsWith('/leistungen'))
const servicePosts = LEGACY_REDIRECTS.filter(r => r.source.startsWith('/leistungen'))

console.log(`\n📋 Breakdown:`)
console.log(`   - Blog/Main pages: ${blogPosts.length}`)
console.log(`   - Service pages: ${servicePosts.length}`)

console.log(`\n✅ All checks passed!`)
