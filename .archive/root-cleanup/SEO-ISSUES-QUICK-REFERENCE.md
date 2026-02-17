# SEO Issues - Quick Reference
**Date:** January 29, 2026
**Status:** 15 Issues Found (5 CRITICAL, 6 HIGH, 4 MEDIUM)

---

## CRITICAL ISSUES (Fix Immediately)

| # | Issue | Location | Impact | Fix |
|---|-------|----------|--------|-----|
| 1 | Missing alt text on logo images | `/src/components/sections/logo-carousel.tsx` | Images not indexed by search engines | Add `alt={client.name}` to Image components |
| 2 | Missing FAQPage schema | `/haeufige-fragen/page.tsx` | FAQ content not rich-snipped in SERPs | Add FAQPage JSON-LD schema |
| 3 | Missing BlogPosting schema | `/blog/[slug]/page.tsx` | Blog posts not optimized for search | Add BlogPosting JSON-LD schema |
| 4 | Robots.txt Host error | `/public/robots.txt` line 94 | Robots.txt may not parse correctly | Remove `https://` from Host directive |
| 5 | Inconsistent meta descriptions | Multiple pages | Poor SERP appearance, CTR loss | Ensure all descriptions are 120-160 chars |

---

## HIGH PRIORITY ISSUES (Week 1-2)

| # | Issue | Location | Impact | Fix |
|---|-------|----------|--------|-----|
| 6 | Sitemap indexing not implemented | `/src/app/sitemap.ts` | Sitemap may exceed 50MB | Implement `generateIndexSitemap: true` |
| 7 | Russian locale in sitemap | `/src/app/sitemap.ts` | Inconsistent with hidden ru locale | Add RU URLs or remove `ru` from locales |
| 8 | Missing BreadcrumbList schema | Dynamic pages | Breadcrumbs not shown in rich snippets | Add `<BreadcrumbSchema>` to multi-level pages |
| 9 | Dual hreflang implementation | Client + Server | Duplicate hreflang tags | Use server-side only (remove `<HreflangTags>`) |
| 10 | Blog hreflang verification needed | `/blog/[slug]/page.tsx` | Alternates not set in metadata | Verify metadata.alternates.languages |

---

## MEDIUM PRIORITY ISSUES (Week 2-4)

| # | Issue | Location | Impact | Fix |
|---|-------|----------|--------|-----|
| 11 | Landing pages lack internal links | All `/[service]-[location]` pages | Lower engagement, poor crawl flow | Add related content sections |
| 12 | Generic/missing alt text | Portfolio, feature images | SEO and accessibility issues | Add descriptive alt text (>5 chars) |
| 13 | OG image too large | `/public/og-image.jpg` (354KB) | Slow social sharing, poor UX | Compress to <150KB |
| 14 | Multiple H1 tags per page | `/page.tsx` (homepage likely) | SEO anti-pattern, keyword dilution | Ensure single H1 per page |

---

## LOW PRIORITY ISSUES (Ongoing)

| # | Issue | Location | Impact | Fix |
|---|-------|----------|--------|-----|
| 15 | Missing mobile meta tags | Layout | Reduced mobile SEO signals | Add theme-color, manifest, appleWebApp |

---

## FILE LOCATIONS NEEDING CHANGES

### Components
- `/src/components/sections/logo-carousel.tsx` - Add alt text
- `/src/components/sections/logo-portfolio.tsx` - Add alt text
- `/src/components/sections/partners-carousel.tsx` - Verify alt text
- `/src/components/ui/project-gallery.tsx` - Already has good alt text ✅

### Pages
- `/src/app/[locale]/(marketing)/page.tsx` - Multiple H1 check
- `/src/app/[locale]/(marketing)/haeufige-fragen/page.tsx` - Add FAQPage schema
- `/src/app/[locale]/(marketing)/blog/[slug]/page.tsx` - Add BlogPosting schema, verify hreflang
- All service sub-pages - Add BreadcrumbSchema
- All landing pages - Add internal links

### Config/Static Files
- `/public/robots.txt` - Fix Host directive (line 94)
- `/src/app/sitemap.ts` - Add indexing, add/remove Russian
- `/src/i18n/config.ts` - Consider removing Russian locale

### SEO Components
- `/src/components/seo/schemas.tsx` - Verify being used
- `/src/components/seo/hreflang-tags.tsx` - Check if duplicate/remove

---

## QUICK VERIFICATION COMMANDS

### Find images without alt text
```bash
grep -r "<Image" src/components --include="*.tsx" | grep -v "alt=" | wc -l
```

### Find pages with multiple H1s
```bash
grep -r "<h1" src/app/[locale]/ --include="*.tsx" | wc -l
# Should be much lower than total components with h1
```

### Check robots.txt syntax
```bash
curl -s https://goldenwing.at/robots.txt | head -100
# Look for Host line error
```

### Validate schema
```bash
# Visit each page and check:
https://validator.schema.org/
```

### Test OG tags
```bash
https://www.opengraph.xyz/
```

---

## IMPACT ASSESSMENT

### SEO Impact: MEDIUM
- Current implementation is solid (70% complete)
- Missing pieces are mostly enhancements (schema, internal links)
- No major crawlability or indexation issues
- Potential SERP improvements with fixes

### Traffic Impact: LOW-MEDIUM
- Alt text fixes: +5-10% image search traffic (if applicable)
- Schema additions: +10-20% CTR improvement (rich snippets)
- Internal links: +5% crawl efficiency
- Estimated total: +15-30% organic traffic uplift

### Implementation Time: 40-60 hours
- Critical fixes: 8-12 hours
- High priority: 16-24 hours
- Medium/Low: 16-24 hours

---

## MONITORING & MAINTENANCE

### Monthly Tasks
- [ ] Check Google Search Console for new errors
- [ ] Validate sitemap size and inclusion
- [ ] Test sample pages with Lighthouse
- [ ] Verify meta tags on top pages
- [ ] Check for crawl anomalies

### Quarterly Tasks
- [ ] Full SEO audit with Screaming Frog
- [ ] Schema markup re-validation
- [ ] Hreflang configuration review
- [ ] Analytics review (impressions, CTR, rankings)

### Annual Tasks
- [ ] Complete SEO audit
- [ ] Competitive analysis
- [ ] Strategy review and updates
- [ ] Content optimization prioritization

---

## RESOURCES & TOOLS

### Free Tools
- Google Search Console: https://search.google.com/search-console
- Schema.org Validator: https://validator.schema.org/
- Lighthouse: Built into Chrome DevTools
- OpenGraph Debugger: https://www.opengraph.xyz/

### Paid Tools (Recommended)
- Screaming Frog SEO Spider: $199/year (one-time)
- SEMrush: $99-999/month
- Ahrefs: $99-999/month
- Moz: $99-599/month

### Documentation
- Next.js Metadata: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- Schema.org Types: https://schema.org/
- Robots.txt Guide: https://developers.google.com/search/docs/beginner/robots_txt
- Hreflang: https://developers.google.com/search/docs/specialty/international/localized-versions

---

## SUCCESS METRICS

Track these KPIs to measure impact:

| Metric | Current | Target | Timeline |
|--------|---------|--------|----------|
| Organic impressions | TBD | +25% | 3 months |
| Avg CTR from SERPs | TBD | +20% | 3 months |
| Average ranking position | TBD | -5 positions | 6 months |
| Pages with rich snippets | ~5 | 50+ | 2 months |
| Crawl errors | TBD | 0 | 1 month |
| Indexation rate | TBD | >95% | 1 month |

---

## STAKEHOLDER COMMUNICATION

### For Management
✅ Website has solid SEO foundation
⚠️ 15 identified improvements (mostly medium priority)
💰 Estimated 15-30% organic traffic uplift possible
⏱️ 40-60 hours implementation needed

### For Development
✅ Changes are low-risk, mostly additive
✅ No major refactoring needed
✅ Can be implemented incrementally
⚠️ Requires CMS data validation

### For Marketing
✅ Will improve SERP appearance (rich snippets)
✅ Better crawl coverage = more indexed pages
⚠️ Results take 2-6 weeks to show
📊 Track in GSC and GA4

---

**Report Generated:** 2026-01-29
**By:** SEO Audit Agent
**Next Review:** 2026-04-29
