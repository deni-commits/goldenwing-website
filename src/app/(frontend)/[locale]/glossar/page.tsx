import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'
import { getPageSeo } from '@/lib/seo'
import { StructuredData } from '@/components/seo/StructuredData'
import { MotionSection } from '@/components/ui/AnimatedSection'

const CATEGORY_ICONS: Record<string, string> = {
  seo: '🔍',
  marketing: '📈',
  design: '🎨',
  development: '💻',
  strategy: '🎯',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)
  return {
    title: t.glossar.title,
    description: t.glossar.metaDescription,
    ...getPageSeo('glossar', locale),
  }
}

export default async function GlossarPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { locale } = await params
  const sp = await searchParams
  const t = await getDictionary(locale as Locale)
  const activeCategory = (sp.category as string) || ''

  let entries: any[] = []

  try {
    const payload = await getPayload()
    const data = await payload.find({
      collection: 'glossary',
      locale,
      limit: 500,
      sort: 'term',
      ...(activeCategory && {
        where: { category: { equals: activeCategory } },
      }),
    })
    entries = data.docs
  } catch {}

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenwing.at'

  // Group by first letter for A-Z index
  const letterGroups: Record<string, any[]> = {}
  for (const entry of entries) {
    const letter = ((entry.term as string) || '').charAt(0).toUpperCase()
    if (!letterGroups[letter]) letterGroups[letter] = []
    letterGroups[letter].push(entry)
  }
  const letters = Object.keys(letterGroups).sort()

  const categories = [
    { value: '', label: t.glossar.allCategories },
    { value: 'seo', label: t.glossar.categorySeo },
    { value: 'marketing', label: t.glossar.categoryMarketing },
    { value: 'design', label: t.glossar.categoryDesign },
    { value: 'development', label: t.glossar.categoryDevelopment },
    { value: 'strategy', label: t.glossar.categoryStrategy },
  ]

  return (
    <>
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: t.glossar.title,
          description: t.glossar.metaDescription,
          url: `${siteUrl}/${locale}/glossar`,
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: entries.length,
            itemListElement: entries.map((entry: any, i: number) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `${siteUrl}/${locale}/glossar/${entry.slug as string}`,
              name: entry.term as string,
            })),
          },
        }}
      />

      <section className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <MotionSection>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">{t.glossar.title}</h1>
            <p className="text-muted-foreground mb-8 max-w-2xl text-lg">{t.glossar.subtitle}</p>
            <p className="text-muted-foreground mb-12 text-sm">
              {entries.length} {t.glossar.entries}
            </p>
          </MotionSection>

          {/* Category Filter */}
          <MotionSection delay={0.1}>
            <nav className="mb-12 flex flex-wrap gap-2" aria-label="Category filter">
              {categories.map((cat) => (
                <Link
                  key={cat.value}
                  href={`/${locale}/glossar${cat.value ? `?category=${cat.value}` : ''}`}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeCategory === cat.value
                      ? 'bg-primary text-primary-foreground'
                      : 'border-border hover:border-primary/40 hover:text-primary border'
                  }`}
                >
                  {cat.label}
                </Link>
              ))}
            </nav>
          </MotionSection>

          {/* A-Z Index */}
          {letters.length > 0 && (
            <MotionSection delay={0.15}>
              <nav className="mb-12 flex flex-wrap gap-1" aria-label="Alphabetical index">
                {letters.map((letter) => (
                  <a
                    key={letter}
                    href={`#letter-${letter}`}
                    className="border-border hover:border-primary hover:text-primary flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-bold transition"
                  >
                    {letter}
                  </a>
                ))}
              </nav>
            </MotionSection>
          )}

          {/* Entries grouped by letter */}
          {letters.map((letter) => (
            <section key={letter} id={`letter-${letter}`} className="mb-12">
              <h2 className="border-border mb-6 border-b pb-2 text-2xl font-bold">{letter}</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {(letterGroups[letter] ?? []).map((entry: any) => (
                  <Link
                    key={entry.id as string}
                    href={`/${locale}/glossar/${entry.slug as string}`}
                    className="group border-border hover:border-primary/30 rounded-xl border p-5 transition hover:shadow-lg"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-lg">{CATEGORY_ICONS[entry.category as string] || '📖'}</span>
                      <h3 className="group-hover:text-primary font-semibold">{entry.term as string}</h3>
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-sm">{entry.shortDefinition as string}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          {entries.length === 0 && <p className="text-muted-foreground">{t.common.noResults}</p>}
        </div>
      </section>
    </>
  )
}
