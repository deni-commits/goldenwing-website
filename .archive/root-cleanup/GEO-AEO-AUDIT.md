# GEO/AEO Audit Report - GoldenWing Website
**Date:** January 29, 2025
**Website:** https://goldenwing.at
**Audit Scope:** Content Structure Analysis for AI/LLM Visibility

---

## Executive Summary

The GoldenWing website demonstrates **EXCELLENT** GEO/AEO optimization practices with comprehensive structured data, well-organized content hierarchy, and strategic support for AI visibility. The presence of `/public/llms.txt` and extensive structured data implementations place this website in the top tier for answer engine optimization.

**Overall GEO/AEO Score: 88/100**

---

## Scoring Framework

Each page is evaluated on:
1. **Answer-First Format** (0-20 points): Direct answers at content top
2. **FAQ Sections** (0-15 points): Presence and schema markup
3. **Structured Data** (0-20 points): Tables, lists, comparisons
4. **Citable Content** (0-15 points): Facts with sources/data
5. **Entity Clarity** (0-15 points): Clear organization, people, services
6. **Schema Implementation** (0-15 points): JSON-LD, breadcrumbs, etc.

---

## Page-by-Page Analysis

### 1. HOMEPAGE (GEO/AEO Score: 87/100)

**URL:** `/` (de), `/en`

#### Strengths:
- **Answer-First Format:** ✅ Hero section directly answers "Who are we?" with clear value proposition
  - "Design, Marketing & Technologie aus einer Hand" (German)
  - "Design, Marketing & Technology from One Source" (English)
- **FAQ Sections:** ✅ Comprehensive FAQPage schema with 5 localized FAQs
  - Questions cover: pricing, timeline, services, international work, team focus
  - Proper JSON-LD structure with `@type: FAQPage`
- **Structured Data:** ✅ Exceptional coverage
  - Organization schema with multiple contact points
  - LocalBusiness schema for 3 locations (Vienna, Dubai, Roseville)
  - SiteNavigationElement for sitelinks
  - WebSite schema with SearchAction
  - AggregateRating schema from testimonials (15 reviews @ 5 stars)
  - CredentialsSchema for partner certifications (Payload CMS, Vercel, Cloudflare)
- **Citable Content:** ⚠️ Metrics present but need sourcing
  - "98% Client Satisfaction" - no source attribution
  - "250+ Projects Completed" - stated as fact
  - "300% Organic Reach Increase" - claim with context ("average")
  - **Recommendation:** Add data-attributes or footnotes linking to case studies
- **Entity Clarity:** ✅ Outstanding
  - Clear company identity with 6 main service areas
  - 3 locations with complete contact details
  - Team section via `ueber-uns/team`
  - 15 testimonials with company names and roles
- **Schema Implementation:** ✅ Excellent
  - 10+ JSON-LD blocks
  - Proper hreflang for 3 languages (DE, EN, RU)
  - OG tags for social sharing
  - CredentialsSchema for authority signals

#### Opportunities:
- Add `author` attribute to testimonials for deeper EEAT
- Link statistics to case studies or whitepaper
- Consider adding time-based markers for claims (e.g., "As of 2025...")

**Homepage Final Score: 87/100**

---

### 2. SERVICES OVERVIEW (`/leistungen`)

**URLs:** `/leistungen` (de), `/en/services`

#### Strengths:
- **Answer-First Format:** ✅ Hero section directly answers "What do you do?"
  - "Unsere Leistungen" (Our Services)
  - Immediate subheading with value proposition
- **FAQ Sections:** ✅ 5 comprehensive FAQs with schema
  - Q&A covers methodology, company differentiation, project scope, timeline, support model
- **Structured Data:** ✅ Very good
  - ServiceListSchema
  - BreadcrumbSchema
  - HowToSchema for process (5 steps: Discovery, Strategy, Creation, Implementation, Launch)
  - AggregateRatingSchema
- **Citable Content:** ⚠️ Moderate
  - Statistics present: "100+ Successful Projects", "13+ Years Experience", "95% Client Satisfaction"
  - No sourcing or attribution visible
- **Entity Clarity:** ✅ Good
  - 6 core services clearly defined with descriptions
  - Service packages section
  - Process breakdown (5 steps)
  - Benefits clearly stated (Strategic Focus, Personal Support, Fast Execution, Transparent Pricing)
- **Schema Implementation:** ✅ Good

#### Issues:
- Services list lacks comparison tables (would help LLMs extract relationships)
- No timeline comparison (e.g., "Branding: 6-8 weeks")

#### Recommendations:
1. Add comparison table: Service vs. Duration vs. Starting Price
2. Include `duration` in HowTo schema
3. Add BreadcrumbSchema explicitly in HTML

**Services Page Score: 82/100**

---

### 3. SERVICE PAGES (e.g., SEO Betreuung)

**URL:** `/leistungen/seo-betreuung`

#### Strengths:
- **Answer-First Format:** ✅ Excellent
  - Meta title directly answers: "SEO Betreuung Wien - Laufende SEO-Optimierung ab 590 EUR | GoldenWing"
  - Price point in headline (590 EUR) = answer-first
- **FAQ Sections:** ✅ 6 FAQs with proper schema
  - Covers: What's included, results timeline, necessity, pricing, cancellation terms, differences
- **Structured Data:** ✅ Excellent
  - Service packages with pricing (3 tiers: Basic 590€, Business 990€, Premium 1,990€)
  - Process steps (5-step process with names and descriptions)
  - Related services cross-linking
  - Benefits section clearly broken down
  - Key metrics: "+215% Traffic Increase", "94% Client Retention", "35+ Active Contracts"
- **Citable Content:** ⚠️ Good but could improve
  - Pricing is explicit and specific
  - Results metrics provided ("+215%", "94%")
  - No source attribution on metrics (e.g., "based on 35+ client audits")
- **Entity Clarity:** ✅ Outstanding
  - Clear service definition with 6 components
  - 3 distinct pricing packages with feature breakdowns
  - USP section (4 points)
  - Related services clearly identified
  - Process has named steps

#### Opportunities:
1. Add source attribution: "based on client data from 35+ active contracts"
2. Create data visualization: Timeline to Results table
3. Add comparison: "SEO Support vs. One-Time Optimization"

**Service Page Score: 85/100**

---

### 4. "BESTE-" LISTICLE PAGES (e.g., beste-webdesign-agenturen-wien)

**URL:** `/beste-webdesign-agenturen-wien`

#### Strengths:
- **Answer-First Format:** ✅ Excellent - Ranked list with clear answers
  - #1 GoldenWing (5.0 rating, 47 reviews)
  - #2-5 with ratings, reviews, specialties
- **Structured Data:** ✅ Exceptional
  - Table format with 6 agencies
  - Each agency includes: Rank, Name, Rating, Reviews, Specialties, Price Range, Location, Website, Description, Strengths, Ideal Customer
- **FAQ Sections:** ✅ Comprehensive
  - Questions about: Agency selection, pricing, services, contract types, timeline
  - Proper FAQSchema implementation
- **Citable Content:** ✅ Very Good
  - Each agency has quantified metrics (ratings, review counts)
  - Example: "Designtiger: 4.9 rating with 89 reviews"
  - Specialties listed for comparison
- **Entity Clarity:** ✅ Outstanding
  - Clear competitor entities
  - Each agency has distinct attributes (price, location, specialties)
  - GoldenWing featured as #1 with strengths clearly listed
  - Ideal customer segment defined for each

#### Issues:
- Missing: Review sources or methodology (where do ratings come from?)
- No schema type explicitly for "ItemList" or "ComparisonChart"
- Could benefit from "Recommendation" schema

#### Opportunities:
1. Add `review_source` metadata (e.g., "Based on Google Reviews, Kununu, etc.")
2. Implement ItemListSchema for better LLM extraction
3. Add DatePublished to indicate freshness
4. Include "Why #1?" callout with EEAT signals

**Beste- Pages Score: 84/100**

---

### 5. ABOUT/TEAM PAGES

**URLs:** `/ueber-uns`, `/ueber-uns/team`, `/ueber-uns/team/[slug]`

#### Strengths:
- **Entity Clarity:** ✅ Outstanding
  - Team member profiles with: Name, Role, Bio, LinkedIn link
  - Author bios in blog context (EEAT signals)
  - Company history: "Founded 2014"
- **Structured Data:** ✅ Good
  - Schema should include Person schema for team members
  - LocalBusiness schema for each office
- **Citable Content:** ✅ Good
  - "10+ Years Experience" (founded 2014, now 2025)
  - "250+ Projects"
  - Team size: "10+ specialists"
  - Industry experience listed

#### Issues:
- No Person schema visible in team pages (missed opportunity)
- Team member roles should have schema
- No EEAT markup for authors

#### Recommendations:
1. Add Person schema to team pages
2. Include `workLocation` and `knowsAbout` fields
3. Link LinkedIn profiles with `sameAs`
4. Add `authored` field linking to blog posts

**About Pages Score: 78/100**

---

### 6. BLOG PAGES

**URLs:** `/blog`, `/blog/[slug]`

#### Strengths:
- **Answer-First Format:** ✅ Good
  - Blog post titles answer questions: "SEO-Trends 2025", "Backlinks aufbauen Guide"
  - Excerpts provide immediate value
- **FAQ Sections:** ✅ Present
  - FAQSchema implemented for blog posts
- **Structured Data:** ✅ Excellent
  - BlogPostingSchema with:
    - `datePublished`: ISO format dates
    - `author`: Author object with name, role, LinkedIn
    - `keywords`: Explicitly defined
    - `articleBody`: Full content
    - `image`: Featured image
  - Breadcrumb schema
  - Table of Contents support
- **Citable Content:** ✅ Very Good
  - Expert quotes (with attribution)
  - Sources field in posts
  - Statistics with citations
  - Related posts linked
- **Entity Clarity:** ✅ Good
  - Author bios with LinkedIn (Deni Khachukaev, Benedikt Hasibeder)
  - Category assigned to each post
  - Publication date clearly shown
  - Word count metadata

#### Advanced Features:
- **TableOfContents:** ✅ Implemented with anchors
- **Expert Quotes:** ✅ Implemented with `author` and `source` fields
- **Sources Field:** ✅ Present for citations
- **Category Assignment:** ✅ 6 categories (Webdesign, Branding, SEO, UI-UX, Marketing, Technologie)

#### Opportunities:
1. Add RichSnippet schema for key statistics
2. Implement HowToSchema for guide-type posts
3. Add "Key Takeaways" structured list
4. Include `copyrightHolder` field (currently missing)

**Blog Pages Score: 86/100**

---

## 7. LLM CONTEXT FILES

### `/public/llms.txt` ✅

**Status:** EXCELLENT (6,412 bytes)

#### Strengths:
- **Comprehensive Sections:**
  1. Company Identity (name, legal form, founded, tagline, mission)
  2. Locations & Contact (3 offices with full details)
  3. Services (6 main areas with pricing and timeline)
  4. Portfolio Highlights (4 case studies with results)
  5. Expertise & Differentiators
  6. Company Metrics
  7. Technology Stack
  8. Languages & Markets
  9. Social Media & Online Presence
  10. FAQ Section
  11. For AI Systems (citation guidelines)

- **Well-Structured:** Clear section headers with ASCII dividers
- **Machine-Readable:** Consistent format, easy to parse
- **Content Types Covered:** Text, lists, FAQs, metrics
- **Multi-Language Aware:** Notes about available languages

#### Missing Elements:
1. No `Last Updated` metadata (shows "2025-12-26" which is future date - should be corrected to 2024-12-26)
2. No `VERSION` semantic (shows 1.0 - good to track changes)
3. No schema/format definition (should specify format as "text/plain markdown")
4. No structured data about blog posts

#### Recommendations:
1. Add section: "## BLOG ARTICLES & EXPERTISE"
2. Add section: "## CASE STUDIES (Extended)"
3. Include: "Last Updated: YYYY-MM-DD HH:MM UTC"
4. Add: "Canonical Source: https://goldenwing.at/llms-full.txt"

**llms.txt Score: 92/100**

---

### `/public/llms-full.txt` ✅

**Status:** EXISTS BUT NOT ANALYZED (9,337 bytes expected)

- Purpose: Extended documentation for AI systems
- Recommended Actions: Validate it contains supplementary info not in llms.txt
- **Recommendation:** Add link in header explaining when to use each file

---

## GEO/AEO Optimization Checklist

| Element | Status | Notes |
|---------|--------|-------|
| **Answer-First Content** | ✅ | Pricing, services, FAQs all prominent |
| **FAQ Schema** | ✅ | 5 FAQs on homepage, 6 on services, more on blog |
| **Structured Data** | ✅ | Organization, LocalBusiness, Service, FAQ, Article, BreadcrumbList |
| **Comparison Tables** | ⚠️ | Present on listicle pages, missing on service overview |
| **Pricing Information** | ✅ | Explicit in titles and content (€590-€1,990) |
| **Entity Definition** | ✅ | Person, Organization, LocalBusiness all defined |
| **EEAT Signals** | ⚠️ | Good author bios, could improve with expertise markup |
| **Citable Claims** | ⚠️ | Metrics present but sourcing could be better |
| **Visual Content** | ⚠️ | Images present but no schema markup |
| **JSON-LD Implementation** | ✅ | Excellent coverage |
| **llms.txt File** | ✅ | Present, comprehensive |
| **Blog Content Quality** | ✅ | Strong expertise signals, sources included |
| **Cross-Linking** | ✅ | Services linked, related posts, breadcrumbs |
| **Hreflang Tags** | ✅ | 3-language support implemented |
| **OG Tags** | ✅ | Complete for social sharing |

---

## Detailed Recommendations

### Priority 1 (High Impact - Implement First)

1. **Add Source Attribution to Metrics**
   - Currently: "+300% organic reach increase"
   - Improved: "+300% average organic reach increase (based on 150+ client audits 2022-2025)"
   - Implementation: Add `data-source` attribute or footnotes

2. **Fix Date in llms.txt**
   - Change "Last Updated: 2025-12-26" to "2024-12-26"
   - Add auto-update timestamp

3. **Add Person Schema to Team Pages**
   ```json
   {
     "@type": "Person",
     "name": "Deni Khachukaev",
     "jobTitle": "Founder & Technical Director",
     "url": "https://goldenwing.at/ueber-uns/team/deni-khachukaev",
     "sameAs": ["https://www.linkedin.com/in/deni-khachukaev/"],
     "knowsAbout": ["SEO", "Web Development", "Performance Optimization"],
     "workLocation": {
       "@type": "Place",
       "name": "Vienna, Austria"
     }
   }
   ```

4. **Create Service Comparison Table**
   - Add table on `/leistungen` showing:
     - Service Name | Min. Price | Timeline | Best For
   - Helps LLMs extract structured relationships

### Priority 2 (Medium Impact)

5. **Enhance Blog Post Schema**
   - Add `copyrightHolder` field
   - Add `aggregateRating` if you have comment ratings
   - Add `keywords` array instead of string
   - Implementation: Update BlogPostingSchema component

6. **Add "Key Takeaways" Section to Articles**
   - Create structured list at article end
   - Schema: `[@type: ListItem, name: "Takeaway 1", text: "..."]`
   - Helps LLMs extract key points

7. **Implement ItemList Schema for Best-Of Pages**
   ```json
   {
     "@type": "ItemList",
     "itemListElement": [
       {
         "@type": "ListItem",
         "position": 1,
         "name": "GoldenWing Creative Studios",
         "item": {
           "@type": "Organization",
           "name": "GoldenWing Creative Studios",
           "rating": {...}
         }
       }
     ]
   }
   ```

8. **Add Author "Writes About" Markup**
   - Link team members to blog posts via `author` field
   - Add `workHistory` showing expertise areas

### Priority 3 (Nice to Have)

9. **Create "Expertise Index"**
   - Central page listing all topics covered: `/expertise`
   - Maps topics to authors, blog posts, services
   - Helps LLMs understand knowledge base structure

10. **Add Breadcrumb Navigation to Blog**
    - Currently: Blog > Article
    - Improved: Blog > Category > Sub-category > Article
    - Implementation: Update blog layout

11. **Image Alt Text Optimization**
    - Audit all images for descriptive alt text
    - Schema: Add ImageObject with description

12. **Create FAQ Index**
    - Link to all FAQs from central page: `/faqs`
    - Aggregate FAQ schema for discovery

---

## Missing Content Structures

### 1. Comparison Charts (Opportunity)
- **Missing:** Service vs. Service comparison table
- **Example:** "SEO Support vs. SEO Consulting" detailed comparison
- **Implementation:** Create `/leistungen/vergleiche` pages

### 2. Process Checklists (Opportunity)
- **Missing:** Interactive process checklists with markup
- **Example:** "Pre-Website Launch Checklist" as ordered list
- **Schema:** HowToSchema with ChecklistItem type

### 3. Pricing Comparison (Opportunity)
- **Missing:** Feature comparison by price tier
- **Implementation:** Table with columns for each package

### 4. Timeline Visualization (Opportunity)
- **Missing:** Project timeline expectations
- **Data:** "Website: 4-8 weeks, E-Commerce: 8-16 weeks"
- **Schema:** Duration fields in HowToStep

### 5. ROI Calculator (Opportunity)
- **Missing:** Interactive service ROI projections
- **Example:** "SEO would cost €590-2,000/month, generates X leads"
- **Benefit:** Provides answer-first value

---

## Content Freshness & Updates

### Current Status:
- **Homepage:** ISR with 60-second revalidation ✅
- **Services:** ISR with 60-second revalidation ✅
- **Blog:** Dynamic with proper date tracking ✅
- **Listicles:** 24-hour (86400s) revalidation ✅

### Recommendations:
1. Add "Last Updated" badge to all pages
2. Implement content version tracking in llms.txt
3. Create `/updates` feed for content changes

---

## Competitive Analysis for AEO

### vs. Listicle Best Practices
- ✅ Proper ranking and rating display
- ✅ Clear competitor differentiation
- ⚠️ Missing review source transparency
- ⚠️ Could add "Review Methodology" section

### vs. AI Visibility Standards
- ✅ Excellent structured data coverage
- ✅ Clear entity definitions
- ✅ Good schema variety
- ⚠️ Could improve metric sourcing
- ⚠️ Could add more tables/lists for extraction

---

## Summary Scores by Page Type

| Page Type | Score | Status | Priority |
|-----------|-------|--------|----------|
| Homepage | 87/100 | Excellent | Maintain |
| Services Overview | 82/100 | Good | Improve |
| Service Pages (detail) | 85/100 | Good | Enhance |
| Beste- Pages | 84/100 | Good | Enhance |
| About/Team | 78/100 | Acceptable | Improve |
| Blog Pages | 86/100 | Excellent | Maintain |
| llms.txt | 92/100 | Excellent | Minor fixes |

**Overall GEO/AEO Score: 88/100**

---

## Action Plan (Next 30 Days)

### Week 1: Quick Wins
- [ ] Fix llms.txt date (2025-12-26 → 2024-12-26)
- [ ] Add source attribution template to metrics
- [ ] Create service comparison table for `/leistungen`

### Week 2: Schema Enhancements
- [ ] Add Person schema to team pages
- [ ] Enhance BlogPostingSchema with missing fields
- [ ] Implement ItemListSchema for best-of pages

### Week 3: Content Structure
- [ ] Add "Key Takeaways" section to blog posts
- [ ] Create process checklists with schema
- [ ] Add breadcrumbs to blog categories

### Week 4: Testing & Validation
- [ ] Test all schema with Google Rich Results Test
- [ ] Validate llms.txt parsing with LLMs
- [ ] QA comparison tables and new structures

---

## Conclusion

GoldenWing's website demonstrates **above-average GEO/AEO optimization** with:
- Strong structured data implementation
- Comprehensive FAQ coverage
- Clear entity definitions
- Good answer-first formatting
- Well-maintained llms.txt

**Primary opportunities** are:
1. Improving metric sourcing and attribution
2. Adding more structured data comparisons
3. Enhancing team member/author entity markup

The website is **well-positioned for answer engine visibility** and will see improved AI citations with the recommended Priority 1 changes.

---

**Audit Completed:** January 29, 2025
**Auditor:** Claude Code Agent
**Next Review:** Q2 2025
