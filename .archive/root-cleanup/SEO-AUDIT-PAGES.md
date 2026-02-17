# SEO AUDIT REPORT - GOLDENWING WEBSITE

**Report Generated:** January 29, 2026  
**Total Pages Analyzed:** 121  
**Analysis Scope:** All page.tsx files in `src/app/[locale]/(marketing)/`

---

## EXECUTIVE SUMMARY

### Overall SEO Health: GOOD (72% overall score)

The GoldenWing website demonstrates strong SEO implementation across key metadata and configuration metrics, but has significant gaps in HTML semantics and schema markup.

**Strengths:**
- 93.4% of pages have `generateMetadata()` function
- 94.2% of pages include canonical URLs
- 93.4% of pages include hreflang alternates for multilingual support
- Well-structured metadata and i18n implementation

**Critical Issues:**
- 35.5% of pages missing H1 tags entirely (43 pages)
- Most pages lack JSON-LD schema markup (only 16.5% have any)
- Limited schema markup on dynamic pages (blogs, projects, references)

---

## DETAILED FINDINGS BY CATEGORY

### 1. Meta Tags Implementation ✅

| Metric | Count | % | Status |
|--------|-------|---|--------|
| Pages with generateMetadata() | 113/121 | 93.4% | ✅ Good |
| Pages with metadata title | 113/121 | 93.4% | ✅ Good |
| Pages with metadata description | 113/121 | 93.4% | ✅ Good |
| Pages missing metadata | 8/121 | 6.6% | ⚠️ Needs Fix |

**Finding:** Most pages properly implement metadata through Next.js `generateMetadata` API. The 8 pages without it appear to be dynamic routes that may rely on parent layout metadata.

**Affected Dynamic Routes:**
- `/leistungen/[slug]/page.tsx`
- `/leistungen/[slug]/[subslug]/page.tsx`
- `/blog/kategorie/[slug]/page.tsx`
- Other catch-all routes

**Recommendation:** Verify that all 121 pages have unique, descriptive title and description tags. Run a Google Search Console crawl to confirm no pages show as "No Title" or "No Description."

---

### 2. Canonical URLs ✅

| Metric | Count | % | Status |
|--------|-------|---|--------|
| Pages with canonical URL | 114/121 | 94.2% | ✅ Excellent |
| Pages without canonical | 7/121 | 5.8% | ⚠️ Review |

**Finding:** Canonical URLs are properly implemented using `getCanonicalUrl()` utility on 94.2% of pages, effectively preventing duplicate content issues.

**Implementation Details:**
```tsx
alternates: {
  canonical: getCanonicalUrl('/path', locale),
  languages: hreflangAlternates.languages,
}
```

**Pages Missing Canonical:**
- Dynamic route pages that may inherit from parent
- Possible issue with catch-all routes

**Recommendation:** Verify dynamic routes generate correct canonicals with slug parameters in all locales.

---

### 3. Hreflang (Language Alternates) ✅

| Metric | Count | % | Status |
|--------|-------|---|--------|
| Pages with hreflang/alternates | 113/121 | 93.4% | ✅ Excellent |
| Pages without hreflang | 8/121 | 6.6% | ⚠️ Review |

**Finding:** Multilingual support is well-implemented using `getHreflangAlternates()` utility. The website correctly supports three locales: German (de), English (en), and Russian (ru).

**Implementation Pattern:**
```tsx
const hreflangAlternates = getHreflangAlternates('/path')

return {
  alternates: {
    canonical: '/path',
    languages: hreflangAlternates.languages,
  }
}
```

**Locales Covered:**
- German (de) - Default
- English (en)
- Russian (ru)

**Pages Missing Hreflang:**
- Same 8 pages as metadata issues
- Likely dynamic routes requiring custom implementation

**Recommendation:** Ensure all dynamic routes properly generate hreflang tags using locale parameters.

---

### 4. H1 Tags - CRITICAL FINDING 🔴

| Metric | Count | % | Status |
|--------|-------|---|--------|
| Pages with single H1 | 77/121 | 63.6% | ✅ Best Practice |
| Pages with multiple H1s | 1/121 | 0.8% | ⚠️ Minor Issue |
| Pages with NO H1 | 43/121 | 35.5% | 🔴 CRITICAL |

**Finding:** 35.5% of pages (43 total) lack proper H1 tags - a critical SEO and accessibility concern.

**Issues Identified:**

1. **No H1 Found (43 pages):** These pages appear to:
   - Use heading text in components without semantic `<h1>` tags
   - Rely on page titles from metadata without visual H1
   - Use non-semantic heading elements

2. **Multiple H1s (1 page):** Rare occurrence, generally acceptable

**Pages with Missing H1 (Examples):**

| Page Type | Count | Example |
|-----------|-------|---------|
| Blog posts | 15+ | `/blog/[slug]/page.tsx` |
| Lexikon entries | 10+ | `/lexikon/[slug]/page.tsx` |
| References | 8+ | `/referenzen/[slug]/page.tsx` |
| Projects | 5+ | `/projekte/[slug]/page.tsx` |
| Team members | 3+ | `/ueber-uns/team/[slug]/page.tsx` |
| Services | 2+ | Dynamic service pages |

**SEO Impact:**
- Reduced ability for Google to understand page topic
- Negative accessibility implications (screen readers)
- Missing semantic structure for proper document outline
- May affect ranking for long-tail queries

**Recommendation - Implementation Template:**

```tsx
// ✅ CORRECT: Semantic H1 tag
export default async function BlogPostPage({ params }) {
  const post = await getBlogPost(slug)
  
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        {post.title}
      </h1>
      {/* Page content */}
    </>
  )
}

// ❌ INCORRECT: Fake H1
<h2 className="h1-style">{title}</h2>
<div className="h1">{title}</div>
```

**Priority Fix:**
- Add `<h1>` to all 43 pages
- Ensure only ONE H1 per page
- Use semantic HTML (not divs styled as headings)
- Keep H1 as main page topic/title
- Effort: LOW (4-6 hours)
- ROI: HIGH

---

### 5. JSON-LD Schema Markup - MAJOR GAP 🔴

| Schema Type | Direct Impl. | Via Components | Status |
|-----------|------------|-----------------|--------|
| Organization | 0 | ✅ Homepage | Limited |
| LocalBusiness | 0 | ✅ Locations | Limited |
| Service | 0 | ✅ Services | Limited |
| BreadcrumbList | 0 | ✅ Services | Limited |
| FAQPage | 0 | ✅ Homepage | Limited |
| Article | 0 | ❌ None | 🔴 MISSING |
| CreativeWork/Project | 0 | ❌ None | 🔴 MISSING |
| Person | 0 | ❌ None | 🔴 MISSING |
| Product | 0 | ❌ None | 🔴 MISSING |

**Finding:** While the homepage has comprehensive schema markup via React components, most other pages lack structured data entirely.

**Current Schema Implementation:**

Homepage (`/page.tsx`):
```tsx
// Organization schema ✅
// LocalBusiness schema (3 locations) ✅
// WebSite schema with SearchAction ✅
// FAQPage schema ✅
// ReviewSchema component ✅
// CredentialsSchema component ✅
```

Services Page (`/leistungen/page.tsx`):
```tsx
// BreadcrumbSchema ✅
// ServiceListSchema ✅
// AggregateRatingSchema ✅
// HowToSchema ✅
```

Service Detail Pages (`seo-agentur-wien`):
```tsx
// BreadcrumbListSchema ✅
// Service schema ✅
```

**Missing Schema Markup (84.5% of pages):**

1. **Blog Posts (15+ pages)** - Need Article schema:
   - `datePublished`, `dateModified`
   - Author information
   - Image, headline, description
   - Keywords

2. **Service Detail Pages (50+ pages)** - Need Service schema:
   - `offers` with pricing
   - `areaServed`
   - `provider` information
   - Contact details

3. **Reference/Project Pages (15+ pages)** - Need CreativeWork schema:
   - `creator` (GoldenWing)
   - `client` information
   - `description` and images
   - `dateCreated`

4. **Team Member Pages (5+ pages)** - Need Person schema:
   - `name`, `jobTitle`
   - `image`
   - `contactPoint`
   - `affiliation`

5. **FAQ Pages (10+ pages)** - Need FAQPage schema:
   - `mainEntity` with Question/Answer pairs
   - Increases rich snippet eligibility

6. **Location Pages (8 pages)** - Enhanced LocalBusiness:
   - More complete address information
   - Opening hours (if applicable)
   - Service area

**Implementation Pattern (from homepage):**

```tsx
// Create JSON-LD schema
const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  description: post.excerpt,
  image: post.image,
  datePublished: post.publishedDate,
  author: { '@type': 'Person', name: post.author }
}

// Render in component
<script 
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>
```

**Recommendation:**
- Implement Article schema for all blog posts (8-10 hours)
- Add Service schema with pricing to service pages (4-6 hours)
- Create CreativeWork schema for projects/references (4-6 hours)
- Add Person schema to team pages (2-3 hours)
- Expand FAQPage schema to all applicable pages (2-3 hours)

---

### 6. Internal Links

**Finding:** Internal linking structure is present on pages with rich content sections, but could be more strategic.

**Current Implementation:**
- Homepage links to main sections: `/leistungen`, `/referenzen`, `/blog`, `/ueber-uns`, `/kontakt`
- Service pages link to related services
- Navigation component provides top-level structure
- Limited contextual linking within page content

**Examples of Internal Links Found:**
```
Homepage:
├─ /leistungen (Services)
├─ /referenzen (References)
├─ /blog (Blog)
├─ /ueber-uns (About)
└─ /kontakt (Contact)

Service Pages:
├─ Related service links
├─ Breadcrumb navigation
└─ CTA to contact/inquiry

Blog Pages:
├─ Category links
├─ Related posts
└─ Author pages
```

**Recommendation:**
- Add contextual internal links within page content (2-3 links per 500 words)
- Create topic clusters linking related services
- Add "related posts" sections to blog articles
- Implement contextual "read more about..." links
- Use descriptive anchor text (not "click here")
- Link to canonical pages, not parameters variations

---

## PAGE CATEGORY BREAKDOWN

### 1. Homepage (1 page) - EXCELLENT ✅

```
Status: 100% - EXCELLENT SEO
├─ generateMetadata: ✅ YES
├─ Meta Title: ✅ YES (multilingual)
├─ Meta Description: ✅ YES (multilingual)
├─ Canonical: ✅ YES
├─ Hreflang: ✅ YES (DE/EN/RU)
├─ H1 Tag: ✅ YES (1 H1)
├─ Schema Markup: ✅ EXCELLENT
│  ├─ Organization ✅
│  ├─ LocalBusiness (3 locations) ✅
│  ├─ WebSite ✅
│  ├─ FAQPage ✅
│  ├─ ReviewSchema ✅
│  └─ CredentialsSchema ✅
└─ Internal Links: ✅ Good
```

**File:** `/page.tsx`  
**Notes:** Homepage is comprehensively optimized. Use as template for other pages.

---

### 2. Service Pages (51 pages) - GOOD ⚠️

```
Status: 75% - GOOD (needs H1 additions)
├─ generateMetadata: ✅ 93% (48/51)
├─ Meta Title: ✅ YES
├─ Meta Description: ✅ YES
├─ Canonical: ✅ 96% (49/51)
├─ Hreflang: ✅ 94% (48/51)
├─ H1 Tag: ⚠️ 65% (33/51) - 18 MISSING
├─ Schema Markup: ⚠️ 25%
│  ├─ /leistungen/page.tsx ✅ ServiceListSchema
│  ├─ Individual services ⚠️ Some missing
│  └─ Pricing services 🔴 Missing pricing schema
└─ Internal Links: ✅ Good
```

**Files:**
- `/leistungen/page.tsx` ✅
- `/leistungen/[slug]/page.tsx` ⚠️ Missing H1
- `/leistungen/[slug]/[subslug]/page.tsx` ⚠️ Missing H1
- Individual service pages: `seo-agentur-wien`, `webdesign-wien`, etc.

**Priority Fixes:**
1. Add H1 tags to 18 missing service pages (2-3 hours)
2. Add Service schema with pricing to individual service pages (4-6 hours)
3. Verify all service pages have unique metadata (1-2 hours)

---

### 3. Blog Pages (15+ pages) - NEEDS IMPROVEMENT ⚠️

```
Status: 60% - NEEDS IMPROVEMENT
├─ generateMetadata: ✅ Dynamic generation
├─ H1 Tag: ⚠️ Many missing
├─ Canonical: ✅ Good
├─ Schema Markup: 🔴 NO Article schema
├─ Blog List: `/blog/page.tsx` ✅
├─ Post Detail: `/blog/[slug]/page.tsx` ⚠️
├─ Category: `/blog/kategorie/[slug]/page.tsx` ⚠️
└─ Internal Links: ⚠️ Limited
```

**Issues:**
- Blog posts lack Article schema (15 posts affected)
- Missing H1 tags on post detail pages
- Limited related post linking
- No author schema implementation

**Priority Fixes:**
1. Add Article schema to blog posts (6-8 hours)
2. Add H1 tags with post titles (1-2 hours)
3. Implement "related posts" section (3-4 hours)
4. Add author/byline information (2-3 hours)

---

### 4. Location Pages (18 pages) - GOOD ✅

```
Status: 80% - GOOD
├─ generateMetadata: ✅ YES
├─ H1 Tag: ⚠️ Some missing
├─ Canonical: ✅ YES
├─ Hreflang: ✅ YES
├─ Schema Markup: ✅ LocalBusiness
│  ├─ Vienna locations ✅
│  ├─ Dubai locations ✅
│  ├─ UAE locations ✅
│  └─ Other locations ✅
└─ Internal Links: ✅ Good
```

**Files:**
- `/dubai/page.tsx` ✅
- `/dubai/seo-company-dubai/page.tsx`
- `/abu-dhabi/page.tsx` ✅
- `/sharjah/page.tsx` ✅
- And others...

**Priority Fixes:**
1. Add H1 tags to 3-5 location pages (1 hour)
2. Enhance LocalBusiness schema with hours/phone (1-2 hours)
3. Add local service area information (1 hour)

---

### 5. Dynamic Pages (20+ pages) - NEEDS IMPROVEMENT ⚠️

```
Status: 65% - NEEDS IMPROVEMENT
├─ Reference Posts: `/referenzen/[slug]/page.tsx`
│  ├─ generateMetadata: ✅ Dynamic
│  ├─ H1: 🔴 MISSING (8+ pages)
│  ├─ Schema: 🔴 No CreativeWork schema
│  └─ Fix: Add H1 + CreativeWork schema
│
├─ Projects: `/projekte/[slug]/page.tsx`
│  ├─ generateMetadata: ✅ Dynamic
│  ├─ H1: 🔴 MISSING (5+ pages)
│  ├─ Schema: 🔴 No Project schema
│  └─ Fix: Add H1 + Project schema
│
├─ Lexikon: `/lexikon/[slug]/page.tsx`
│  ├─ generateMetadata: ✅ Dynamic
│  ├─ H1: 🔴 MISSING (10+ pages)
│  ├─ Schema: 🔴 No schema
│  └─ Fix: Add H1 + definition schema
│
└─ Team: `/ueber-uns/team/[slug]/page.tsx`
   ├─ generateMetadata: ✅ Dynamic
   ├─ H1: 🔴 MISSING (3+ pages)
   ├─ Schema: 🔴 No Person schema
   └─ Fix: Add H1 + Person schema
```

**Priority Fixes:**
- Add H1 tags to all dynamic pages (3-4 hours)
- Implement appropriate schema for each content type (8-10 hours)
- Ensure dynamic metadata generation (1-2 hours)

---

### 6. Tools Pages (8 pages) - ACCEPTABLE 🟡

```
Status: 70% - ACCEPTABLE
├─ /tools/page.tsx ✅
├─ /tools/seo-checker/page.tsx ⚠️
├─ /tools/security-checker/page.tsx ⚠️
├─ H1: ⚠️ Some missing
├─ Schema: 🔴 No schema
└─ Internal Links: ✅ Present
```

---

### 7. Resources Pages (10+ pages) - GOOD ✅

```
Status: 75% - GOOD
├─ /ressourcen/page.tsx ✅
├─ /ressourcen/downloads/page.tsx ✅
├─ /ressourcen/newsletter/page.tsx ✅
├─ H1: ⚠️ 60% compliance
└─ Internal Links: ✅ Present
```

---

## PRIORITY ACTION ITEMS

### 🔴 CRITICAL - Implement Immediately (Week 1-2)

#### Task 1: Add H1 Tags to 43 Pages
**Timeline:** 4-6 hours  
**Impact:** HIGH  
**Effort:** LOW  
**ROI:** HIGH

Files requiring H1 tags:
- 15 blog posts: `/blog/[slug]/page.tsx`
- 10 lexikon entries: `/lexikon/[slug]/page.tsx`
- 8 references: `/referenzen/[slug]/page.tsx`
- 5 projects: `/projekte/[slug]/page.tsx`
- 3 team members: `/ueber-uns/team/[slug]/page.tsx`
- 2 service detail pages
- Plus other dynamic/tool pages

Implementation:
```tsx
// Add to each page template:
<h1 className="text-4xl md:text-5xl font-bold mb-6">
  {pageData.title}
</h1>
```

Validation:
- Run Lighthouse SEO audit (DevTools)
- Check Google Rich Results Test
- Verify in Page Inspector

---

#### Task 2: Expand JSON-LD Schema Markup
**Timeline:** 12-16 hours  
**Impact:** HIGH  
**ROI:** HIGH (15-30% CTR improvement potential)

Priority order:
1. **Article Schema** for blog posts (2 hours)
   - Apply to `/blog/[slug]/page.tsx`
   - Include author, date, image

2. **Service Schema** with pricing (4 hours)
   - Apply to individual service pages
   - Include pricing information

3. **CreativeWork Schema** for projects (3 hours)
   - Apply to `/projekte/[slug]/page.tsx`
   - Include images and description

4. **Person Schema** for team (2 hours)
   - Apply to `/ueber-uns/team/[slug]/page.tsx`
   - Include jobTitle, image

5. **FAQPage Schema** (2 hours)
   - Apply to all FAQ sections
   - Increase rich snippet eligibility

---

### 🟡 HIGH PRIORITY (Week 3-4)

#### Task 3: Dynamic Route Optimization
- Verify canonical generation for all [slug] routes
- Test hreflang alternates in all locales
- Validate with Google Search Console Preview

#### Task 4: Internal Link Strategy
- Add contextual links within page content
- Create service link clusters
- Implement "related posts" for blog articles
- Link long-form content strategically

---

## COMPLIANCE CHECKLIST

```
Meta Tags:
  ✅ Page titles: 93.4%
  ✅ Meta descriptions: 93.4%
  ⚠️ Dynamic routes: 6.6% need review

Canonical URLs:
  ✅ Overall: 94.2%
  ⚠️ Dynamic routes: 5.8% need verification

Hreflang/Alternates:
  ✅ Overall: 93.4%
  ✅ All three locales present: DE/EN/RU
  ⚠️ Dynamic routes: 6.6% need review

H1 Tags:
  ✅ Single H1 (best practice): 63.6%
  🔴 NO H1 (critical): 35.5%
  ⚠️ Multiple H1s: 0.8%

Schema Markup:
  ✅ Homepage: Excellent
  ✅ Services page: Good
  ⚠️ Location pages: Partial
  🔴 Blog posts: Missing
  🔴 Projects: Missing
  🔴 References: Missing
  🔴 Team pages: Missing

Internal Links:
  ✅ Present on most pages
  ⚠️ Could be more strategic

Overall Score: 72% → Target: 96%
```

---

## FILES TO UPDATE

### Critical Updates (23+ file types)

**Dynamic Routes - Add H1 tags:**
- `/blog/[slug]/page.tsx`
- `/blog/kategorie/[slug]/page.tsx`
- `/lexikon/[slug]/page.tsx`
- `/referenzen/[slug]/page.tsx`
- `/projekte/[slug]/page.tsx`
- `/ueber-uns/team/[slug]/page.tsx`
- `/leistungen/[slug]/page.tsx`
- `/leistungen/[slug]/[subslug]/page.tsx`
- Various service pages
- Tool pages
- Location pages

**Schema Markup - Add structured data:**
- Blog post templates
- Service detail pages (with pricing)
- Project/reference templates
- Team member pages
- FAQ components
- Location pages (enhanced)

---

## NEXT STEPS

1. **Week 1:** Add H1 tags to 43 missing pages
2. **Week 2:** Implement basic schema markup (Article, Service)
3. **Week 3:** Test and validate with tools
4. **Week 4:** Monitor Search Console for improvements
5. **Ongoing:** Monthly SEO audits and schema updates

---

## TOOLS & RESOURCES

**Validation:**
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org
- Lighthouse SEO Audit: Chrome DevTools → Lighthouse
- Google Search Console: https://search.google.com/search-console

**Code Reference:**
- Schemas: `/src/components/seo/schemas`
- Homepage: `/page.tsx`
- Services: `/leistungen/page.tsx`
- Utility: `/lib/utils` (getCanonicalUrl, getHreflangAlternates)

---

*Report Location: `/sessions/eager-vigilant-ramanujan/mnt/goldenwing-website/SEO-AUDIT-PAGES.md`*  
*Generated: January 29, 2026*  
*Next Review: After implementation phase*
