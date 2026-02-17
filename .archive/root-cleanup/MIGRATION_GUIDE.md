# i18n Migration Guide

## Current Status: Phase 1 Complete

The foundation for internationalization has been implemented. Here's what's been done and what's next.

## ✅ Completed (Phase 1: Foundation)

1. **Configuration Setup**
   - ✅ Installed and configured `next-intl`
   - ✅ Created locale configuration (`src/i18n/config.ts`)
   - ✅ Set up request handler (`src/i18n/request.ts`)
   - ✅ Updated `next.config.ts` with next-intl plugin
   - ✅ Created middleware for locale detection

2. **Translation Infrastructure**
   - ✅ Created German translations (`src/messages/de.json`)
   - ✅ Created English translations (`src/messages/en.json`)
   - ✅ Organized translations by sections (common, nav, footer, offices, etc.)

3. **Components**
   - ✅ Created Language Switcher component
   - ✅ Updated Office Locations component to use translations
   - ✅ Created i18n-aware navigation utilities

4. **Layouts**
   - ✅ Created `[locale]` layout for locale provider
   - ✅ Updated marketing layout with locale-aware metadata
   - ✅ Configured metadata for both German and English

5. **Documentation**
   - ✅ Created comprehensive internationalization documentation
   - ✅ Documented architecture and usage patterns

## 🔄 Next Steps (Phase 2: Route Migration)

**IMPORTANT:** The current routes are still in `app/(marketing)/`. They need to be moved under `app/[locale]/(marketing)/` to fully activate i18n routing.

### Option 1: Manual Migration (Recommended for Testing)

Test the i18n setup first by creating one localized route:

```bash
# Create the locale structure
mkdir -p "src/app/[locale]/(marketing)"

# Copy one page to test (e.g., kontakt)
cp -r "src/app/(marketing)/kontakt" "src/app/[locale]/(marketing)/kontakt"
```

Then visit:
- `http://localhost:3000/kontakt` (German, redirected by middleware)
- `http://localhost:3000/en/kontakt` (English)

### Option 2: Full Migration

Once testing is successful, migrate all routes:

```bash
# Backup current structure
cp -r "src/app/(marketing)" "src/app/(marketing).backup"

# Move all routes under [locale]
mv "src/app/(marketing)" "src/app/[locale]/(marketing)"
```

## 📋 Component Migration Checklist

For each component you update, follow this checklist:

### 1. Add Translation Hook
```tsx
import { useTranslations } from 'next-intl'

function Component() {
  const t = useTranslations('sectionName')
  // ...
}
```

### 2. Replace Hardcoded Text
```tsx
// Before
<h1>Unsere Leistungen</h1>

// After
<h1>{t('title')}</h1>
```

### 3. Update Navigation Links
```tsx
// Before
import Link from 'next/link'
<Link href="/services">Services</Link>

// After
import { Link } from '@/lib/i18n-navigation'
<Link href="/services">Services</Link>
```

### 4. Add Translations to JSON Files
```json
// src/messages/de.json
{
  "sectionName": {
    "title": "Unsere Leistungen"
  }
}

// src/messages/en.json
{
  "sectionName": {
    "title": "Our Services"
  }
}
```

## 🎯 Priority Components to Migrate

### High Priority
1. Header/Navigation
2. Footer
3. Homepage hero sections
4. Contact forms
5. Service pages

### Medium Priority
1. Blog pages
2. Project pages
3. About pages
4. Resource pages

### Low Priority
1. Legal pages (Impressum, Datenschutz)
2. Admin-only sections

## 🧪 Testing Strategy

### 1. Start Dev Server
```bash
npm run dev
```

### 2. Test Locale Detection
- Visit `http://localhost:3000` → Should default to German
- Visit `http://localhost:3000/en` → Should show English
- Change browser language and test auto-detection

### 3. Test Language Switcher
- Add `<LanguageSwitcher />` to Header component
- Click switcher and verify:
  - URL changes
  - Content translates
  - Navigation persists

### 4. Test Office Locations
- Visit page with `<OfficeLocations />` component
- Switch between de/en
- Verify all text translates correctly

## 🚀 Deployment Considerations

### Environment Variables
```env
# .env.production (goldenwing.at)
NEXT_PUBLIC_SITE_URL=https://goldenwing.at
NEXT_PUBLIC_DEFAULT_LOCALE=de

# .env.production (goldenwing.us)
NEXT_PUBLIC_SITE_URL=https://goldenwing.us
NEXT_PUBLIC_DEFAULT_LOCALE=en
```

### Build Process
```bash
# Build with all locales
npm run build

# Test production build
npm run start
```

### Domain Configuration
For production, configure domain-based locale detection:

```typescript
// middleware.ts or next.config.ts
const domainLocales = [
  {
    domain: 'goldenwing.at',
    defaultLocale: 'de',
  },
  {
    domain: 'goldenwing.us',
    defaultLocale: 'en',
  },
]
```

## 📊 Translation Coverage

### Current Coverage
- ✅ Office locations (100%)
- ✅ Common UI elements (partial)
- ⏳ Navigation (0%)
- ⏳ Footer (0%)
- ⏳ Homepage (0%)
- ⏳ Service pages (0%)

### Adding New Translations

1. Identify text to translate
2. Create logical section name
3. Add to both `de.json` and `en.json`
4. Use `useTranslations` hook in component
5. Test in both languages

## 🐛 Common Issues & Solutions

### Issue: "locale is not defined"
**Cause:** Component is outside `[locale]` layout
**Solution:** Move route under `app/[locale]/`

### Issue: Translations not loading
**Cause:** Missing locale in translation files
**Solution:** Ensure key exists in both `de.json` and `en.json`

### Issue: Language switcher redirects to 404
**Cause:** Route doesn't exist under `[locale]`
**Solution:** Migrate the route or handle gracefully

### Issue: SEO metadata not changing
**Cause:** Metadata not using locale
**Solution:** Use `generateMetadata` with locale (already implemented in marketing layout)

## 📝 Example: Migrating a Page

Let's migrate the contact page (`kontakt/page.tsx`):

### Before
```tsx
export default function KontaktPage() {
  return (
    <div>
      <h1>Kontakt</h1>
      <p>Nehmen Sie Kontakt mit uns auf</p>
    </div>
  )
}
```

### After
```tsx
import { useTranslations } from 'next-intl'

export default function KontaktPage() {
  const t = useTranslations('contact')

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
    </div>
  )
}
```

### Add Translations
```json
// de.json
{
  "contact": {
    "title": "Kontakt",
    "subtitle": "Nehmen Sie Kontakt mit uns auf"
  }
}

// en.json
{
  "contact": {
    "title": "Contact",
    "subtitle": "Get in touch with us"
  }
}
```

## 🎓 Best Practices

1. **Consistent naming:** Use clear, hierarchical keys
2. **Don't over-translate:** Keep technical terms, brand names as-is
3. **Test both locales:** Always check de AND en
4. **Use TypeScript:** Leverage next-intl's type safety
5. **Document decisions:** Note any locale-specific logic

## 📚 Resources

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [INTERNATIONALIZATION.md](./INTERNATIONALIZATION.md)
- [CLAUDE.md](./CLAUDE.md)

## 🤝 Need Help?

If you're stuck:
1. Check the documentation above
2. Review existing i18n components (OfficeLocations, LanguageSwitcher)
3. Test in isolation
4. Ask for review before deploying

---

**Remember:** This is a phased migration. The foundation is solid, now it's about systematically moving components and routes to use the i18n infrastructure. Take it one page at a time!
