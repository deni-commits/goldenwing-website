# i18n Quick Start Guide

Quick reference for working with internationalization in the GoldenWing project.

## 🌍 Supported Locales

- **de** (German) - Default, Austria HQ
- **en** (English) - US office

## 🔧 Common Tasks

### Use Translations in a Component

```tsx
'use client' // If it's a client component

import { useTranslations } from 'next-intl'

export function MyComponent() {
  const t = useTranslations('common')

  return <button>{t('contactUs')}</button>
}
```

### Create Locale-Aware Links

```tsx
import { Link } from '@/lib/i18n-navigation'

// Automatically includes locale prefix
<Link href="/services">Services</Link>
// → /de/services or /en/services
```

### Add Language Switcher

```tsx
import { LanguageSwitcher } from '@/components/layout/language-switcher'

<Header>
  <LanguageSwitcher />
</Header>
```

### Get Current Locale

```tsx
// Client component
import { useLocale } from 'next-intl'

function Component() {
  const locale = useLocale() // 'de' or 'en'
}

// Server component
import { getLocale } from 'next-intl/server'

async function Component() {
  const locale = await getLocale()
}
```

## 📝 Adding New Translations

### 1. Add to Translation Files

```json
// src/messages/de.json
{
  "mySection": {
    "title": "Titel auf Deutsch",
    "description": "Beschreibung auf Deutsch"
  }
}

// src/messages/en.json
{
  "mySection": {
    "title": "Title in English",
    "description": "Description in English"
  }
}
```

### 2. Use in Component

```tsx
const t = useTranslations('mySection')

return (
  <div>
    <h1>{t('title')}</h1>
    <p>{t('description')}</p>
  </div>
)
```

## 🗂️ Translation File Structure

```
messages/
├── de.json              # German translations
│   ├── common          # Shared UI elements
│   ├── nav             # Navigation
│   ├── footer          # Footer
│   ├── offices         # Office locations
│   ├── hero            # Hero sections
│   ├── services        # Services
│   ├── contact         # Contact forms
│   └── languages       # Language switcher
└── en.json             # English translations (same structure)
```

## 🎯 Translation Key Naming

**Good:**
```json
{
  "nav": {
    "home": "Home",
    "services": "Services"
  }
}
```

**Bad:**
```json
{
  "homeLink": "Home",
  "servicesLink": "Services"
}
```

## 🧩 Common Patterns

### Dynamic Values

```tsx
// In translation file
{
  "welcome": "Welcome, {name}!"
}

// In component
t('welcome', { name: 'John' })
// → "Welcome, John!"
```

### Pluralization

```tsx
// In translation file
{
  "itemCount": "{count, plural, =0 {no items} =1 {one item} other {# items}}"
}

// In component
t('itemCount', { count: 5 })
// → "5 items"
```

### HTML in Translations

```tsx
// In translation file
{
  "richText": "Visit our <link>website</link>"
}

// In component
t.rich('richText', {
  link: (chunks) => <Link href="/">{chunks}</Link>
})
```

## 🔍 Testing

### Test Both Locales

```bash
# German (default)
http://localhost:3000/

# English
http://localhost:3000/en/
```

### Switch Languages

1. Add `<LanguageSwitcher />` to header
2. Click to switch between languages
3. Verify all text changes

## ⚡ Quick Checklist

When adding a new page/component:

- [ ] Use `useTranslations()` for all user-facing text
- [ ] Add translations to both `de.json` and `en.json`
- [ ] Use `Link` from `@/lib/i18n-navigation`
- [ ] Test in both German and English
- [ ] Check that language switcher works

## 🚨 Common Mistakes

### ❌ Don't do this:
```tsx
<h1>Willkommen</h1>
```

### ✅ Do this:
```tsx
const t = useTranslations('common')
<h1>{t('welcome')}</h1>
```

---

### ❌ Don't do this:
```tsx
import Link from 'next/link'
<Link href="/services">Services</Link>
```

### ✅ Do this:
```tsx
import { Link } from '@/lib/i18n-navigation'
<Link href="/services">Services</Link>
```

## 📚 More Information

- Full documentation: [INTERNATIONALIZATION.md](./INTERNATIONALIZATION.md)
- Migration guide: [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
- next-intl docs: https://next-intl-docs.vercel.app/

## 💡 Tips

1. **Keep it organized:** Group related translations
2. **Be consistent:** Use same key structure across locales
3. **Don't over-translate:** Keep technical terms as-is
4. **TypeScript helps:** You get autocomplete for translation keys!
5. **Test frequently:** Switch languages often during development
