# GoldenWing Website - Technischer SEO/i18n Report

**Datum**: 2024-12-28
**Domain**: goldenwing.at
**Status**: Produktion (VPS 72.62.52.70)

---

## 1. REDIRECT-KONFIGURATION

### next.config.ts Redirects (301 permanent)

#### Standorte → Topic Cluster Umstrukturierung
```typescript
{ source: '/ueber-uns/standorte', destination: '/standorte', permanent: true }
```

#### i18n URL-Übersetzungen (EN)
| Source | Destination |
|--------|-------------|
| `/en/leistungen` | `/en/services` |
| `/en/leistungen/:path*` | `/en/services/:path*` |
| `/en/referenzen` | `/en/references` |
| `/en/referenzen/:path*` | `/en/references/:path*` |
| `/en/projekte` | `/en/projects` |
| `/en/projekte/:path*` | `/en/projects/:path*` |
| `/en/ueber-uns` | `/en/about-us` |
| `/en/ueber-uns/team` | `/en/about-us/team` |
| `/en/ueber-uns/kultur` | `/en/about-us/culture` |
| `/en/ueber-uns/werte` | `/en/about-us/values` |
| `/en/ueber-uns/partner` | `/en/about-us/partners` |
| `/en/ueber-uns/facts-figures` | `/en/about-us/facts-figures` |
| `/en/ueber-uns/standorte` | `/en/locations` |
| `/en/about-us/locations` | `/en/locations` |
| `/en/kontakt` | `/en/contact` |
| `/en/standorte` | `/en/locations` |
| `/en/standorte/wien` | `/en/locations/vienna` |
| `/en/standorte/dubai` | `/en/locations/dubai` |
| `/en/standorte/roseville` | `/en/locations/roseville` |

#### Service Slugs (EN)
| Source | Destination |
|--------|-------------|
| `/en/services/digitale-strategie` | `/en/services/digital-strategy` |
| `/en/services/seo-sichtbarkeit` | `/en/services/seo-visibility` |
| `/en/services/technische-loesungen` | `/en/services/technical-solutions` |
| `/en/services/software-entwicklung` | `/en/services/software-development` |

#### Blog Kategorien
```typescript
{ source: '/en/blog/kategorie/:slug*', destination: '/en/blog/category/:slug*', permanent: true }
```

#### Legal Pages (EN)
| Source | Destination |
|--------|-------------|
| `/en/impressum` | `/en/imprint` |
| `/en/datenschutz` | `/en/privacy-policy` |
| `/en/haeufige-fragen` | `/en/faq` |
| `/en/rechtliches/cookie-einstellungen` | `/en/legal/cookie-settings` |

### Security Rewrites (→ /api/gone 410)
- WordPress: `/wp-login.php`, `/wp-admin/*`, `/wp-content/*`, `/wp-includes/*`, `/xmlrpc.php`
- Sensitive: `/.env`, `/.env.local`, `/.env.production`, `/phpmyadmin/*`, `/admin.php`

---

## 2. URL-STRUKTUR

### Locale Prefix Strategie
```typescript
localePrefix: 'as-needed'
```
- **DE (default)**: `/leistungen/branding`
- **EN**: `/en/services/branding`

### Pathname Mappings (src/i18n/routing.ts)

#### Services / Leistungen
| DE | EN |
|----|-----|
| `/leistungen` | `/en/services` |
| `/leistungen/branding` | `/en/services/branding` |
| `/leistungen/webdesign` | `/en/services/web-design` |
| `/leistungen/digitale-strategie` | `/en/services/digital-strategy` |
| `/leistungen/seo-sichtbarkeit` | `/en/services/seo-visibility` |
| `/leistungen/content-visuals` | `/en/services/content-visuals` |
| `/leistungen/technische-loesungen` | `/en/services/technical-solutions` |
| `/leistungen/software-entwicklung` | `/en/services/software-development` |

#### Service-Pakete
| DE | EN |
|----|-----|
| `/leistungen/pakete` | `/en/services/packages` |
| `/leistungen/pakete/brand-web-foundation` | `/en/services/packages/brand-web-foundation` |
| `/leistungen/pakete/seo-content-growth` | `/en/services/packages/seo-content-growth` |
| `/leistungen/pakete/demand-gen-suite` | `/en/services/packages/demand-gen-suite` |
| `/leistungen/pakete/individuelles-paket` | `/en/services/packages/custom-package` |

#### About / Über uns
| DE | EN |
|----|-----|
| `/ueber-uns` | `/en/about-us` |
| `/ueber-uns/team` | `/en/about-us/team` |
| `/ueber-uns/kultur` | `/en/about-us/culture` |
| `/ueber-uns/werte` | `/en/about-us/values` |
| `/ueber-uns/partner` | `/en/about-us/partners` |
| `/ueber-uns/facts-figures` | `/en/about-us/facts-figures` |
| `/ueber-uns/standorte` | `/en/about-us/locations` |

#### Locations / Standorte
| DE | EN |
|----|-----|
| `/standorte` | `/en/locations` |
| `/standorte/wien` | `/en/locations/vienna` |
| `/standorte/dubai` | `/en/locations/dubai` |
| `/standorte/roseville` | `/en/locations/roseville` |

#### References / Referenzen
| DE | EN |
|----|-----|
| `/referenzen` | `/en/references` |
| `/referenzen/branding` | `/en/references/branding` |
| `/referenzen/webdesign` | `/en/references/web-design` |
| `/referenzen/seo` | `/en/references/seo` |
| `/referenzen/marketing` | `/en/references/marketing` |
| `/referenzen/entwicklung` | `/en/references/development` |
| `/referenzen/e-commerce` | `/en/references/e-commerce` |
| `/referenzen/industrie` | `/en/references/industry` |
| `/referenzen/technologie` | `/en/references/technology` |
| `/referenzen/dienstleistung` | `/en/references/consulting` |

#### Blog
| DE | EN |
|----|-----|
| `/blog` | `/en/blog` |
| `/blog/[slug]` | `/en/blog/[slug]` |
| `/blog/kategorie/[slug]` | `/en/blog/category/[slug]` |

**WICHTIG**: Blog-Slugs sind NICHT übersetzt. Beide Sprachen nutzen den gleichen Slug aus der DB.

#### Legal
| DE | EN |
|----|-----|
| `/kontakt` | `/en/contact` |
| `/impressum` | `/en/imprint` |
| `/datenschutz` | `/en/privacy-policy` |
| `/haeufige-fragen` | `/en/faq` |
| `/rechtliches/cookie-einstellungen` | `/en/legal/cookie-settings` |

---

## 3. i18n-KONFIGURATION

### src/i18n/config.ts
```typescript
export const locales = ['de', 'en'] as const
export const defaultLocale = 'de' as const

export const localeNames: Record<Locale, string> = {
  de: 'Deutsch',
  en: 'English',
}

export const domains = {
  'goldenwing.at': 'de' as Locale,
  'goldenwing.us': 'en' as Locale,
}
```

### Middleware (src/middleware.ts)
- Nutzt `createMiddleware` von `next-intl/routing`
- Konfiguration aus `routing.ts`

### Language Switcher (src/components/layout/language-switcher.tsx)
```typescript
const switchLocale = (newLocale: Locale) => {
  router.replace(pathname, { locale: newLocale })
}
```
- Nutzt `usePathname()` und `useRouter()` von `@/lib/i18n-navigation`
- Wechselt Locale unter Beibehaltung des aktuellen Pfads

---

## 4. CANONICAL URLs

### src/lib/utils.ts
```typescript
export function getCanonicalUrl(path: string, locale: string = 'de'): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenwing.at'
  const translatedPath = locale === 'en' && pathTranslations[path]
    ? pathTranslations[path]
    : path
  const localePath = locale === 'de' ? translatedPath : `/en${translatedPath}`
  return `${baseUrl}${localePath}`
}

export function getHreflangAlternates(dePath: string): { de: string; en: string } {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenwing.at'
  const enPath = pathTranslations[dePath] || dePath
  return {
    de: `${baseUrl}${dePath}`,
    en: `${baseUrl}/en${enPath}`,
  }
}
```

### Path Translations Map (Auszug)
```typescript
const pathTranslations: Record<string, string> = {
  '/leistungen': '/services',
  '/leistungen/branding': '/services/branding',
  '/leistungen/webdesign': '/services/web-design',
  // ... weitere Mappings
}
```

---

## 5. SITEMAP-GENERIERUNG

### src/app/sitemap.ts
- Generiert dynamische Sitemap mit allen Routen
- Inkludiert `alternates.languages` für hreflang
- Priorisierung: Homepage (1.0) > Hauptseiten (0.8) > Unterseiten (0.6) > Blog (0.7)

**Beispiel-Output**:
```xml
<url>
  <loc>https://goldenwing.at/leistungen/branding</loc>
  <lastmod>2024-12-28</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
  <xhtml:link rel="alternate" hreflang="de" href="https://goldenwing.at/leistungen/branding"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://goldenwing.at/en/services/branding"/>
</url>
```

---

## 6. SCHEMA.ORG / JSON-LD

### src/components/seo/json-ld.tsx

#### Verfügbare Schema-Komponenten
| Component | Type | Verwendung |
|-----------|------|------------|
| `OrganizationSchema` | Organization | Global (Layout) |
| `BreadcrumbSchema` | BreadcrumbList | Alle Seiten |
| `BlogPostingSchema` | BlogPosting | Blog-Artikel |
| `ServiceSchema` | Service | Leistungsseiten |
| `FAQSchema` | FAQPage | FAQ-Seiten |
| `AggregateRatingSchema` | AggregateRating | Reviews |
| `LocalBusinessSchema` | LocalBusiness | Standortseiten |

#### OrganizationSchema
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "GoldenWing 360°",
  "url": "https://goldenwing.at",
  "logo": "https://goldenwing.at/logo.svg",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "office@goldenwing.at",
    "contactType": "customer service"
  },
  "address": [
    { "@type": "PostalAddress", "addressLocality": "Wien", "addressCountry": "AT" },
    { "@type": "PostalAddress", "addressLocality": "Dubai", "addressCountry": "AE" },
    { "@type": "PostalAddress", "addressLocality": "Roseville", "addressCountry": "US" }
  ]
}
```

---

## 7. INTERNE VERLINKUNG

### Header Navigation (src/components/layout/header.tsx)

#### Desktop Mega-Menu Struktur
```
├── Über uns (Dropdown)
│   ├── Über GoldenWing → /ueber-uns
│   ├── Team → /ueber-uns/team
│   ├── Kultur → /ueber-uns/kultur
│   ├── Werte → /ueber-uns/werte
│   ├── Standorte → /ueber-uns/standorte
│   └── Facts & Figures → /ueber-uns/facts-figures
│
├── Leistungen (Mega-Menu)
│   ├── Services
│   │   ├── Alle Leistungen → /leistungen
│   │   ├── Branding & Design → /leistungen/branding
│   │   ├── Webdesign, UX & UI → /leistungen/webdesign
│   │   ├── Digitales Marketing → /leistungen/digitale-strategie
│   │   ├── SEO & Content Marketing → /leistungen/seo-sichtbarkeit
│   │   ├── Web- & App-Entwicklung → /leistungen/software-entwicklung
│   │   └── IT- & Cloud-Services → /leistungen/technische-loesungen
│   └── Service-Pakete
│       ├── Alle Pakete → /leistungen/pakete
│       ├── Brand & Web Foundation → /leistungen/pakete/brand-web-foundation
│       ├── SEO & Content Growth → /leistungen/pakete/seo-content-growth
│       ├── Demand Gen Suite → /leistungen/pakete/demand-gen-suite
│       └── Individuelles Paket → /leistungen/pakete/individuelles-paket
│
├── Referenzen (Mega-Menu)
│   ├── Nach Service
│   │   ├── Alle Referenzen → /referenzen
│   │   ├── Branding & Design → /referenzen/branding
│   │   ├── Webdesign & UX → /referenzen/webdesign
│   │   ├── Digitales Marketing → /referenzen/marketing
│   │   ├── SEO & Content → /referenzen/seo
│   │   ├── Web- & App-Entwicklung → /referenzen/entwicklung
│   │   └── IT & Cloud Services → /referenzen/it-cloud
│   └── Nach Industrie
│       ├── Industrie & Fertigung → /referenzen/industrie
│       ├── Technologie & SaaS → /referenzen/technologie
│       ├── E-Commerce & Retail → /referenzen/e-commerce
│       └── Dienstleistung & Beratung → /referenzen/dienstleistung
│
└── Kontakt → /kontakt
```

### Footer Navigation (src/components/layout/footer.tsx)
- **Leistungen**: 6 Service-Links
- **Unternehmen**: Team, Kultur, Werte, Standorte, Facts & Figures, Blog
- **Standorte**: Wien, Dubai, Roseville
  - DE: `/standorte/[city]`
  - EN: `/locations/[city]`
- **Rechtliches**: Impressum, Datenschutz, Cookie-Einstellungen

### Link-Komponente
Alle internen Links nutzen `<Link>` von `@/lib/i18n-navigation` für automatische Pfadübersetzung.

---

## 8. DATENBANK / CMS-STRUKTUR

### Payload CMS 3.x mit SQLite

#### Posts Collection (src/payload/collections/Posts.ts)
```typescript
{
  slug: 'posts',
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'slug', type: 'text', required: true, unique: true }, // NICHT lokalisiert
    { name: 'status', type: 'select', options: ['draft', 'scheduled', 'published'] },
    { name: 'excerpt', type: 'textarea', localized: true },
    { name: 'content', type: 'richText', localized: true },
    { name: 'mainImage', type: 'upload', relationTo: 'media' },
    { name: 'category', type: 'relationship', relationTo: 'categories' },
    { name: 'author', type: 'relationship', relationTo: 'team-members' },
    { name: 'relatedServices', type: 'relationship', relationTo: 'services', hasMany: true },
    { name: 'publishedAt', type: 'date' },
    { name: 'readTime', type: 'number' },
    { name: 'featured', type: 'checkbox' },
    { name: 'expertQuotes', type: 'array', localized: true },
    { name: 'faqs', type: 'array', localized: true },
    { name: 'sources', type: 'array' },
    { name: 'tableOfContents', type: 'array', localized: true },
    { name: 'seo', type: 'group', fields: ['metaTitle', 'metaDescription', 'keywords', 'canonicalUrl'] }
  ]
}
```

**WICHTIG**: `slug` ist NICHT lokalisiert - beide Sprachen teilen den gleichen Slug.

#### Weitere Collections
- `Services` - Leistungen
- `SubServices` - Unter-Leistungen
- `Projects` - Portfolio
- `TeamMembers` - Team
- `Partners` - Partner-Logos
- `Testimonials` - Kundenstimmen
- `Categories` - Blog-Kategorien
- `Media` - Bilder/Videos
- `Users` - Admin-Benutzer

---

## 9. BEKANNTE PROBLEME

### Problem 1: Blog-Sprachwechsel (Browser-Cache)
| Aspekt | Status |
|--------|--------|
| Server-Side | ✅ Funktioniert (curl gibt 200 OK) |
| Browser | ⚠️ Cached alte 301 Redirects |
| Root Cause | Alte Redirect-Regeln wurden entfernt, Browser cached sie noch |

**Fix**:
- `generateStaticParams` wurde korrigiert um `locale` einzuschließen
- `dynamicParams = true` hinzugefügt
- Browser-Cache muss manuell geleert werden oder Incognito nutzen

### Problem 2: Blog-Slugs nicht übersetzt
| Aspekt | Status |
|--------|--------|
| Aktueller Stand | Blog-Slugs sind deutsch (z.B. `seo-fuer-anfaenger-guide`) |
| Geplant | Englische Slugs für EN-Version |
| TODO.md | Fälschlicherweise als "done" markiert |

**Aktuelle Blog-Slugs in DB**:
- `seo-fuer-anfaenger-guide`
- `agentur-beauftragen`
- `ki-webdesign`
- etc.

**Empfehlung**:
1. DB-Migration für englische Slugs
2. ODER: Redirect-Regeln `/en/blog/german-slug` → `/en/blog/english-slug`

### Problem 3: Performance (CSS Transitions)
```css
* { transition: all... }
```
- Gilt für ALLE Elemente → Performance-Impact beim Scroll
- **Empfehlung**: Transitions nur auf spezifische Elemente anwenden

---

## 10. LINK-CHECK ERGEBNISSE

### Automatisierter Check (30 URLs)
| Status | Anzahl |
|--------|--------|
| ✅ 200 OK | 30/30 |
| ❌ 404 | 0 |
| ⚠️ Redirect | 0 (korrekt aufgelöst) |

### Getestete URLs
```
https://goldenwing.at/                              200
https://goldenwing.at/leistungen                    200
https://goldenwing.at/leistungen/branding           200
https://goldenwing.at/leistungen/webdesign          200
https://goldenwing.at/referenzen                    200
https://goldenwing.at/ueber-uns                     200
https://goldenwing.at/kontakt                       200
https://goldenwing.at/blog                          200
https://goldenwing.at/en/                           200
https://goldenwing.at/en/services                   200
https://goldenwing.at/en/services/branding          200
https://goldenwing.at/en/references                 200
https://goldenwing.at/en/about-us                   200
https://goldenwing.at/en/contact                    200
... (alle 30 URLs ✅)
```

---

## 11. SICHERHEITS-HEADERS

### next.config.ts headers()
```typescript
X-XSS-Protection: 1; mode=block
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' ...
```

### Static Asset Caching
- `/fonts/*`: 1 Jahr (immutable)
- `/logo.svg`: 1 Jahr (immutable)
- `/_next/static/*`: 1 Jahr (immutable)

---

## 12. DEPLOYMENT

### Stack
- **Framework**: Next.js 15.5.9 (App Router)
- **CMS**: Payload CMS 3.x
- **DB**: SQLite (goldenwing.db)
- **Hosting**: Hostinger VPS (72.62.52.70)
- **Process Manager**: PM2

### Deploy Command
```bash
rsync -avz --exclude-from='.rsyncignore' -e "ssh -i ~/.ssh/id_ed25519_numbers_uae" \
  ./ root@72.62.52.70:/var/www/goldenwing/
ssh -i ~/.ssh/id_ed25519_numbers_uae root@72.62.52.70 \
  "cd /var/www/goldenwing && npm install && npm run build && pm2 restart goldenwing"
```

---

## 13. GIT HISTORY

```
6482f52 Initial commit from Create Next App
```

**Hinweis**: Vollständige Git-History nicht verfügbar im lokalen Repository.

---

## 14. ACTION ITEMS

### Kritisch
1. ❌ Blog-Slugs für EN übersetzen (DB-Migration oder Redirects)
2. ❌ TODO.md korrigieren (Blog-Slug-Änderungen sind NICHT done)

### Hoch
3. ⚠️ CSS `transition: all` Performance-Issue beheben
4. ⚠️ Browser-Cache-Invalidierung dokumentieren

### Mittel
5. 📝 hreflang für Blog-Posts mit gleichen Slugs prüfen
6. 📝 x-default hreflang hinzufügen für internationale SEO

### Niedrig
7. 📋 Canonical URLs für dynamische Seiten validieren
8. 📋 Schema Markup für alle Seitentypen vervollständigen

---

**Report erstellt am**: 2024-12-28
**Erstellt von**: Claude Code Audit
