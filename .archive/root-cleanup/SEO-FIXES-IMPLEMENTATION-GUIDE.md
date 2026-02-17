# SEO Fixes - Implementation Guide
**Version:** 1.0
**Date:** January 29, 2026

This document provides specific code changes and implementation steps for the SEO issues identified in the main audit report.

---

## CRITICAL FIXES (Do First)

### FIX #1: Add Alt Text to Logo Carousel

**File:** `/src/components/sections/logo-carousel.tsx`

```typescript
// BEFORE
<Image
  src={client.logo}
  alt=""  // ❌ Missing alt text
  width={80}
  height={80}
/>

// AFTER
<Image
  src={client.logo}
  alt={`${client.name} - Creative client of GoldenWing`}
  width={80}
  height={80}
/>
```

**Action Items:**
1. Find all `<Image>` components without `alt` attribute
2. Add meaningful alt text following pattern: `"[Company Name] - [Context]"`
3. Test with aXe DevTools to verify

---

### FIX #2: Add Missing Schema Markup on FAQ Page

**File:** `/src/app/[locale]/(marketing)/haeufige-fragen/page.tsx`

**Add this schema component:**

```typescript
import { faqData } from '@/lib/faq-data';

interface FAQSchema {
  '@context': string;
  '@type': string;
  'mainEntity': Array<{
    '@type': string;
    'name': string;
    'acceptedAnswer': {
      '@type': string;
      'text': string;
    };
  }>;
}

export function FAQSchema({ items }: { items: Array<{ question: string; answer: string }> }) {
  const schema: FAQSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': items.map((item) => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

**In page component:**

```typescript
export default function FAQPage() {
  const faqItems = getFAQItems(locale);

  return (
    <>
      <FAQSchema items={faqItems} />
      {/* Rest of page */}
    </>
  );
}
```

---

### FIX #3: Add BlogPosting Schema to Blog Posts

**File:** `/src/app/[locale]/(marketing)/blog/[slug]/page.tsx`

**Add BlogPosting schema:**

```typescript
export function BlogPostingSchema({ post, author, locale }: BlogPostSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.excerpt,
    'image': post.featuredImage?.url ? [post.featuredImage.url] : [],
    'datePublished': post.publishedAt,
    'dateModified': post.updatedAt || post.publishedAt,
    'author': {
      '@type': 'Person',
      'name': author?.name || 'GoldenWing Team',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'GoldenWing Creative Studios',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://goldenwing.at/logo.png',
      },
    },
    'isPartOf': {
      '@type': 'Blog',
      'name': 'GoldenWing Blog',
      'url': locale === 'en' ? 'https://goldenwing.at/en/blog' : 'https://goldenwing.at/blog',
    },
    'wordCount': post.content?.split(' ').length || 0,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

---

### FIX #4: Fix robots.txt Host Directive

**File:** `/public/robots.txt`

**Change line 94:**

```diff
- Host: https://goldenwing.at
+ Host: goldenwing.at
```

The robots.txt `Host` directive should NOT include protocol.

---

### FIX #5: Ensure Meta Descriptions Are Properly Set

**File:** `/src/lib/payload.ts` or wherever CMS data is fetched

**Add validation function:**

```typescript
export function validateAndTruncateDescription(description: string | undefined): string {
  const fallback = 'Webdesign, Branding und SEO Agentur in Wien, Dubai und Kalifornien. Unser Creative Studio bietet umfassende digitale Lösungen.';

  if (!description || description.trim().length === 0) {
    return fallback;
  }

  // Truncate to max 160 characters
  if (description.length > 160) {
    return description.substring(0, 160).trim() + '...';
  }

  // Pad if too short (min 120 characters)
  if (description.length < 120) {
    console.warn(`Description too short (${description.length} chars): "${description}"`);
    // Add additional context
    return description + ' | Web Design, Branding & SEO by GoldenWing';
  }

  return description;
}
```

**Usage in metadata:**

```typescript
export async function generateMetadata() {
  const seo = await getSEOData();

  return {
    description: validateAndTruncateDescription(seo?.metaDescription),
    // ...
  };
}
```

---

## HIGH PRIORITY FIXES (Weeks 1-2)

### FIX #6: Implement Sitemap Indexing

**File:** `/src/app/sitemap.ts`

**Modify to use index:**

```typescript
export default async function sitemap(): Promise<MetadataRoute.Sitemap | string[]> {
  const routes: MetadataRoute.Sitemap = [];

  // ... generate all routes ...

  // Check if sitemap is too large
  const totalSize = JSON.stringify(routes).length;
  const maxSize = 50 * 1024 * 1024; // 50MB

  if (totalSize > maxSize) {
    // Return sitemap index URLs instead
    return [
      'https://goldenwing.at/sitemap-0.xml',
      'https://goldenwing.at/sitemap-1.xml',
      'https://goldenwing.at/sitemap-2.xml',
    ];
  }

  return routes;
}
```

OR enable in `next-sitemap.config.js`:

```javascript
module.exports = {
  siteUrl: 'https://goldenwing.at',
  generateRobotsTxt: true,
  generateIndexSitemap: true, // Enable indexing
  sitemapSize: 45000, // URLs per sitemap
  // ...
};
```

---

### FIX #7: Add Russian Locale to Sitemap (or Remove)

**Option A: Add Russian to Sitemap**

File: `/src/app/sitemap.ts`

```typescript
// Add this after English URLs
for (const route of staticRoutes) {
  const ruPath = translatePathToRussian(route.path); // Implement translation

  routes.push({
    url: `${BASE_URL}/ru${ruPath}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority * 0.85, // Lower priority for non-primary locale
    alternates: {
      languages: {
        de: `${BASE_URL}${route.path}`,
        en: `${BASE_URL}${enPath}`,
        ru: `${BASE_URL}/ru${ruPath}`,
      },
    },
  });
}
```

**Option B: Remove Russian from Locales**

File: `/src/i18n/config.ts`

```typescript
// If not ready for Russian, remove entirely
export const locales = ['de', 'en'] as const  // Remove 'ru'
export type Locale = (typeof locales)[number]

// Remove Russian from domainLocaleMap too
export const domainLocaleMap: Record<string, Locale> = {
  'goldenwing.at': 'de',
  'www.goldenwing.at': 'de',
  'goldenwing.us': 'en',
  'www.goldenwing.us': 'en',
  // Remove 'ru' entries
}
```

**Recommendation:** Remove Russian for now unless fully translated.

---

### FIX #8: Add Breadcrumb Schema to Dynamic Pages

**File:** `/src/app/[locale]/(marketing)/leistungen/[slug]/[subslug]/page.tsx`

**Add breadcrumb schema:**

```typescript
import { BreadcrumbSchema } from '@/components/seo/schemas';

export default async function SubServicePage({ params }) {
  const { locale, slug, subslug } = await params;

  const service = await getServiceBySlug(slug, locale);
  const subService = await getSubServiceBySlug(slug, subslug, locale);

  const breadcrumbs = [
    { name: locale === 'en' ? 'Home' : 'Startseite', url: '/' },
    { name: locale === 'en' ? 'Services' : 'Leistungen', url: '/leistungen' },
    { name: service.title, url: `/leistungen/${slug}` },
    { name: subService.title, url: `/leistungen/${slug}/${subslug}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      {/* Page content */}
    </>
  );
}
```

**Apply to all dynamic routes:**
- `/leistungen/[slug]/[subslug]`
- `/referenzen/[slug]`
- `/blog/[slug]`
- `/projekte/[slug]`
- Any other multi-level pages

---

### FIX #9: Verify Blog Hreflang in Metadata

**File:** `/src/app/[locale]/(marketing)/blog/[slug]/page.tsx`

**Ensure metadata includes hreflang:**

```typescript
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params;

  const postDE = await getPostBySlug(slug, 'de');
  const postEN = await getPostBySlug(slug, 'en');

  // Both should exist for proper hreflang
  if (!postDE || !postEN) {
    return { title: 'Not Found' };
  }

  const canonicalPath = locale === 'en' ? `/en/blog/${postEN.slug}` : `/blog/${postDE.slug}`;

  return {
    title: locale === 'en' ? postEN.title : postDE.title,
    description: locale === 'en' ? postEN.excerpt : postDE.excerpt,
    openGraph: {
      url: `https://goldenwing.at${canonicalPath}`,
    },
    alternates: {
      canonical: `https://goldenwing.at${canonicalPath}`,
      languages: {
        de: `https://goldenwing.at/blog/${postDE.slug}`,
        en: `https://goldenwing.at/en/blog/${postEN.slug}`,
        'x-default': `https://goldenwing.at/blog/${postDE.slug}`,
      },
    },
  };
}
```

---

## MEDIUM PRIORITY FIXES (Weeks 2-4)

### FIX #10: Add Internal Links to Landing Pages

**File:** `/src/app/[locale]/(marketing)/webdesign-wien/page.tsx` (apply to all landing pages)

**Add related content section:**

```typescript
function RelatedContent({ locale, serviceSlug }: { locale: string; serviceSlug: string }) {
  const t = locale === 'en' ? 'en' : 'de';

  const links = {
    de: [
      { href: '/leistungen/webdesign', label: 'Webdesign Leistungen' },
      { href: '/blog/kategorie/webdesign', label: 'Webdesign Artikel' },
      { href: '/referenzen/webdesign', label: 'Webdesign Projekte' },
      { href: '/kontakt', label: 'Kostenlose Beratung' },
    ],
    en: [
      { href: '/en/services/web-design', label: 'Web Design Services' },
      { href: '/en/blog/category/web-design', label: 'Web Design Articles' },
      { href: '/en/references/web-design', label: 'Web Design Projects' },
      { href: '/en/contact', label: 'Free Consultation' },
    ],
  };

  return (
    <section className="py-12 border-t">
      <Container>
        <h2 className="text-2xl font-bold mb-6">
          {t === 'en' ? 'Learn More' : 'Mehr erfahren'}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {links[t].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="p-4 border rounded-lg hover:bg-muted transition"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

---

### FIX #11: Optimize OG Image

**Current:** `/public/og-image.jpg` (354KB - too large)
**Target:** 100-150KB with same dimensions

**Steps:**
1. Download current image
2. Use Squoosh, TinyPNG, or ImageOptim to compress
3. Target dimensions: 1200x630px
4. Replace file

**Example command:**
```bash
# Using ImageMagick
convert og-image.jpg -quality 75 -resize 1200x630 og-image-optimized.jpg

# Using ffmpeg
ffmpeg -i og-image.jpg -vf scale=1200:630 -q:v 5 og-image-optimized.jpg
```

---

### FIX #12: Remove Redundant Hreflang Implementation

**File:** `/src/app/[locale]/(marketing)/layout.tsx`

**Check if `<HreflangTags>` is being used:**

```bash
grep -n "HreflangTags" src/app/[locale]/\(marketing\)/layout.tsx
```

**If found and page metadata already has alternates.languages:**

```typescript
// BEFORE - has both server-side and client-side hreflang
export const metadata: Metadata = {
  alternates: {
    languages: { de: '...', en: '...' }
  }
};

export default function Layout({ children }) {
  return (
    <>
      <HreflangTags />  {/* ❌ Duplicate */}
      {children}
    </>
  );
}

// AFTER - only server-side
export const metadata: Metadata = {
  alternates: {
    languages: { de: '...', en: '...' }
  }
};

export default function Layout({ children }) {
  return children; // No duplicate client-side hreflang
}
```

---

### FIX #13: Fix Multiple H1 Issue

**Audit:**
```bash
# Find all files with multiple h1 tags
grep -r "<h1" src/app/[locale]/\(marketing\)/page.tsx | wc -l
# Should return 1 if correct
```

**If multiple H1s found, consolidate:**

```typescript
// BEFORE - Multiple H1s
export default function HomePage() {
  return (
    <>
      <h1>GoldenWing Creative Studios</h1>
      {/* ... */}
      <h1>Our Services</h1>
      {/* ... */}
      <h1>Get Started Today</h1>
    </>
  );
}

// AFTER - Single H1, others as H2
export default function HomePage() {
  return (
    <>
      <h1>GoldenWing Creative Studios - Web Design, Branding & SEO</h1>
      {/* ... */}
      <h2>Our Services</h2>
      {/* ... */}
      <h2>Get Started Today</h2>
    </>
  );
}
```

---

## LOW PRIORITY FIXES (Ongoing)

### FIX #14: Add Mobile Meta Tags

**File:** `/src/app/[locale]/(marketing)/layout.tsx`

**Add to metadata export:**

```typescript
export const metadata: Metadata = {
  // Existing metadata...
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  themeColor: '#000000',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'GoldenWing Creative Studios',
  },
  manifest: '/manifest.json',
};
```

**Create `/public/manifest.json`:**

```json
{
  "name": "GoldenWing Creative Studios",
  "short_name": "GoldenWing",
  "description": "International creative agency with offices in Vienna, Dubai & California",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

### FIX #15: Add Related Services Section

**File:** `/src/components/sections/related-services.tsx` (new file)

```typescript
interface RelatedService {
  slug: string;
  title: string;
  description: string;
}

export function RelatedServices({
  currentSlug,
  locale,
}: {
  currentSlug: string;
  locale: string;
}) {
  const relatedMap: Record<string, string[]> = {
    'branding': ['webdesign', 'digital-marketing'],
    'webdesign': ['branding', 'digital-marketing'],
    'digital-marketing': ['webdesign', 'seo-content'],
    'seo-content': ['digital-marketing', 'webdesign'],
    'web-app-entwicklung': ['it-cloud-services', 'webdesign'],
    'it-cloud-services': ['web-app-entwicklung', 'webdesign'],
  };

  const related = relatedMap[currentSlug] || [];

  return (
    <section className="py-12 bg-muted">
      <Container>
        <h2 className="text-2xl font-bold mb-8">
          {locale === 'en' ? 'Complementary Services' : 'Komplementäre Leistungen'}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {related.map((slug) => (
            <ServiceCard key={slug} slug={slug} locale={locale} />
          ))}
        </div>
      </Container>
    </section>
  );
}
```

---

## VERIFICATION STEPS

After implementing fixes, verify with:

### 1. Schema.org Validator
```
https://validator.schema.org/
```
- Paste page HTML
- Verify no errors/warnings
- Check all schema types render correctly

### 2. Google Search Console
```
https://search.google.com/search-console
```
- Submit updated sitemaps
- Check for new crawl issues
- Monitor indexation

### 3. Meta Tags Debugger
```
https://www.opengraph.xyz/ or
https://www.facebook.com/sharing/debugger/
```
- Test each page's OG tags
- Verify image displays
- Check title/description

### 4. SEO Tools
- Screaming Frog: Crawl entire site for meta tags, headings, alt text
- Lighthouse: Run performance audit
- PageSpeed Insights: Check Core Web Vitals

### 5. Accessibility Check
- aXe DevTools browser extension
- Look for missing alt text warnings
- Verify heading hierarchy

---

## ROLLOUT PLAN

**Week 1 (Critical):**
- [ ] Fix alt text on images
- [ ] Add schema markup to FAQ, Blog, Services
- [ ] Fix robots.txt
- [ ] Validate meta descriptions

**Week 2 (High Priority):**
- [ ] Implement sitemap indexing
- [ ] Add Russian locale or remove
- [ ] Add breadcrumb schemas
- [ ] Verify blog hreflang

**Week 3-4 (Medium Priority):**
- [ ] Optimize OG images
- [ ] Remove duplicate hreflang
- [ ] Fix multiple H1s
- [ ] Add related services sections

**Ongoing:**
- [ ] Monitor Search Console
- [ ] Run monthly audits
- [ ] Update schema as content changes
- [ ] Test new pages before publish

---

## TESTING CHECKLIST

- [ ] No console errors on any page
- [ ] No 404 errors in sitemap
- [ ] All images have alt text
- [ ] Single H1 per page
- [ ] Meta descriptions 120-160 chars
- [ ] OG images display correctly
- [ ] Canonical URLs correct
- [ ] Hreflang tags valid (no duplicates)
- [ ] Schema markup validates
- [ ] Mobile viewport working
- [ ] No mixed content warnings (http/https)
- [ ] Accessibility: WCAG AA compliant

---

**Last Updated:** 2026-01-29
**Next Review:** 2026-04-29
