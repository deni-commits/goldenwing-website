# /audit

Führe einen vollständigen Audit der Website durch.

## Audit Bereiche

### 1. Technical SEO
- Meta Tags (Title, Description)
- Heading Hierarchie
- Schema Markup
- Sitemap
- Robots.txt
- Canonical URLs
- Mobile Friendliness
- Core Web Vitals

### 2. Content Quality
- Answer-First Format
- Zitierfähige Fakten
- FAQ Blocks
- Tabellen/Vergleiche
- Internal Linking
- External Citations

### 3. Performance
- Lighthouse Score
- First Contentful Paint
- Largest Contentful Paint
- Cumulative Layout Shift
- Image Optimization
- Bundle Size

### 4. Accessibility
- WCAG 2.1 AA Compliance
- Focus States
- Color Contrast
- Alt Texts
- ARIA Labels
- Keyboard Navigation

### 5. Security
- HTTPS
- CSP Headers
- XSS Prevention
- CORS Config
- Cookie Security

## Output Format

```markdown
# Website Audit Report

**Datum**: [Datum]
**URL**: https://goldenwing.at

## Executive Summary
- Overall Score: [A-F]
- Critical Issues: [Anzahl]
- High Priority: [Anzahl]
- Medium Priority: [Anzahl]

## Technical SEO
| Check | Status | Notes |
|-------|--------|-------|
| ... | ✅/❌ | ... |

Score: [0-100]

## Content Quality
| Page | Answer-First | FAQs | Tables | Links |
|------|--------------|------|--------|-------|
| ... | ✅/❌ | [n] | [n] | [n] |

Score: [0-100]

## Performance
| Metric | Value | Status |
|--------|-------|--------|
| LCP | [s] | ✅/❌ |
| FCP | [s] | ✅/❌ |
| CLS | [value] | ✅/❌ |

Score: [0-100]

## Accessibility
| Check | Status |
|-------|--------|
| ... | ✅/❌ |

Score: [0-100]

## Priority Actions
1. [Critical] ...
2. [High] ...
3. [Medium] ...

## Next Steps
- ...
```

## Verwendung
```
/audit
/audit performance
/audit seo
/audit accessibility
/audit /leistungen
```
