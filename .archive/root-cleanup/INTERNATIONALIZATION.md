# GoldenWing Internationalization (i18n) Structure

## Overview

GoldenWing operates in 3 international locations with localized websites:
- **Vienna, Austria** (goldenwing.at) - German (de) - Headquarters
- **Citrus Heights, CA, USA** (goldenwing.us) - English (en)
- **Dubai, UAE** (future: goldenwing.ae) - English (en)

This implementation uses `next-intl` for internationalization with a URL-based locale strategy.

## Architecture

### URL Structure

We use the **"as-needed"** locale prefix strategy:
- Default locale (de): `goldenwing.at/` or `goldenwing.at/de/`
- English: `goldenwing.us/` or `goldenwing.at/en/`

Examples:
```
German (default):
- goldenwing.at → homepage (de)
- goldenwing.at/de → homepage (de)
- goldenwing.at/leistungen → services page (de)
- goldenwing.at/de/leistungen → services page (de)

English:
- goldenwing.us → homepage (en)
- goldenwing.at/en → homepage (en)
- goldenwing.at/en/services → services page (en)
```

### File Structure

```
src/
├── i18n/
│   ├── config.ts              # Locale configuration
│   └── request.ts             # next-intl request config
├── messages/
│   ├── de.json                # German translations
│   └── en.json                # English translations
├── lib/
│   └── i18n-navigation.ts     # Locale-aware Link/navigation
├── middleware.ts              # Locale detection & routing
└── app/
    ├── [locale]/              # Locale segment
    │   └── layout.tsx         # Locale provider
    └── (marketing)/           # Route group (no locale yet)
        └── layout.tsx         # Marketing layout
```

## Configuration Files

### 1. i18n/config.ts
Defines:
- Supported locales: `['de', 'en']`
- Default locale: `'de'`
- Locale names and flags
- Domain-to-locale mapping
- Office-specific configuration

### 2. i18n/request.ts
Loads translation messages based on the current locale.

### 3. middleware.ts
Handles:
- Locale detection from URL or Accept-Language header
- Automatic redirects to appropriate locale
- Excludes admin, API, and static files

## Translation Files

### Structure
JSON files with nested keys for organization:
```json
{
  "common": { ... },
  "nav": { ... },
  "footer": { ... },
  "offices": { ... }
}
```

### Usage in Components
```tsx
import { useTranslations } from 'next-intl'

function Component() {
  const t = useTranslations('offices')
  return <h1>{t('title')}</h1>
}
```

## Components

### Language Switcher
Located at: `src/components/layout/language-switcher.tsx`

Usage:
```tsx
import { LanguageSwitcher } from '@/components/layout/language-switcher'

// In header or navigation
<LanguageSwitcher />
```

Features:
- Dropdown menu with all available locales
- Visual indicator for current language
- Preserves current page path when switching

### Internationalized Components

#### Office Locations
`src/components/sections/office-locations.tsx`
- Uses translations for all office data
- Supports German and English
- Maintains static map data (doesn't need translation)

## Navigation

### Using i18n-aware Links
```tsx
import { Link } from '@/lib/i18n-navigation'

// Automatically includes locale in href
<Link href="/services">Services</Link>
// → /de/services or /en/services
```

### Using Standard Next.js Link
```tsx
import Link from 'next/link'
import { useLocale } from 'next-intl'

function Component() {
  const locale = useLocale()
  return <Link href={`/${locale}/services`}>Services</Link>
}
```

## Migration Path

### Current State (Before Migration)
```
app/
└── (marketing)/
    ├── page.tsx               # Homepage
    ├── leistungen/            # Services
    ├── projekte/              # Projects
    └── ueber-uns/             # About
```

### Target State (After Full Migration)
```
app/
└── [locale]/
    └── (marketing)/
        ├── page.tsx           # Homepage (i18n)
        ├── leistungen/        # Services (i18n)
        ├── projekte/          # Projects (i18n)
        └── ueber-uns/         # About (i18n)
```

### Migration Steps

1. **Phase 1: Foundation** ✅ (Completed)
   - Install and configure next-intl
   - Create locale configuration
   - Set up middleware
   - Create translation files
   - Build language switcher

2. **Phase 2: Move Routes** (Next Step)
   ```bash
   # Move marketing routes into [locale]
   mv app/(marketing)/* app/[locale]/(marketing)/
   ```

3. **Phase 3: Update Components**
   - Replace hardcoded German text with `useTranslations()`
   - Update all navigation links to use `Link` from `@/lib/i18n-navigation`
   - Add translations for all user-facing text

4. **Phase 4: SEO & Metadata**
   - Add locale-specific metadata
   - Implement hreflang tags
   - Update sitemap generation

## Domain Configuration

### Production Domains
```typescript
// i18n/config.ts
export const domainLocaleMap = {
  'goldenwing.at': 'de',
  'goldenwing.us': 'en',
  // Future: 'goldenwing.ae': 'en'
}
```

### Environment Variables
```env
# .env.local
NEXT_PUBLIC_SITE_URL=https://goldenwing.at
NEXT_PUBLIC_DEFAULT_LOCALE=de
```

## Office-Specific Features

Each office can have:
- Custom locale (de/en)
- Dedicated domain
- Office-specific translations
- Regional contact information

Example:
```typescript
// Access office config
import { officeConfig } from '@/i18n/config'

const viennaOffice = officeConfig.vienna
// { domain: 'goldenwing.at', locale: 'de', isHQ: true }
```

## Testing

### Test Different Locales
```bash
# German (default)
http://localhost:3000
http://localhost:3000/de

# English
http://localhost:3000/en
```

### Test Language Switching
1. Visit any page
2. Click language switcher
3. Verify page content changes
4. Verify URL updates correctly

## Best Practices

1. **Always use translation keys**
   ```tsx
   // ✅ Good
   {t('offices.title')}

   // ❌ Bad
   {"Unsere Standorte"}
   ```

2. **Use i18n-aware navigation**
   ```tsx
   // ✅ Good
   import { Link } from '@/lib/i18n-navigation'

   // ❌ Bad (for localized routes)
   import Link from 'next/link'
   ```

3. **Organize translations logically**
   ```json
   {
     "nav": { "home": "...", "about": "..." },
     "footer": { "copyright": "..." }
   }
   ```

4. **Keep static data separate**
   - Map coordinates, URLs → Don't translate
   - Office names, addresses → Translate

## Adding New Translations

1. Add key to both `de.json` and `en.json`:
   ```json
   // de.json
   {
     "newSection": {
       "title": "Neuer Bereich"
     }
   }

   // en.json
   {
     "newSection": {
       "title": "New Section"
     }
   }
   ```

2. Use in component:
   ```tsx
   const t = useTranslations('newSection')
   return <h1>{t('title')}</h1>
   ```

## Future Enhancements

- [ ] Add Dubai office (goldenwing.ae)
- [ ] Add more languages (French, Arabic, etc.)
- [ ] Implement automatic locale detection from domain
- [ ] Add RTL support for Arabic
- [ ] Content localization in Payload CMS
- [ ] Locale-specific blog posts and projects

## Troubleshooting

### Issue: Translations not loading
**Solution:** Ensure locale is properly passed through layout hierarchy

### Issue: Language switcher not working
**Solution:** Check middleware matcher configuration

### Issue: 404 on locale routes
**Solution:** Verify `generateStaticParams` in `[locale]/layout.tsx`

## Resources

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [GoldenWing CLAUDE.md](./CLAUDE.md)
