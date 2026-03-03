import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'
import { RichText } from '@/components/ui/RichText'
import { StructuredData, BreadcrumbSchema } from '@/components/seo/StructuredData'
import { getPageSeo } from '@/lib/seo'
import { MotionSection } from '@/components/ui/AnimatedSection'

export async function generateStaticParams() {
  try {
    const payload = await getPayload()
    const entries = await payload.find({ collection: 'glossary', limit: 1000 })
    return entries.docs.map((e: any) => ({ slug: e.slug as string }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  try {
    const payload = await getPayload()
    const data = await payload.find({
      collection: 'glossary',
      locale,
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const entry = data.docs[0] as any | undefined
    if (entry) {
      return {
        title: entry.term as string,
        description: entry.shortDefinition as string,
        ...getPageSeo(`glossar/${slug}`, locale),
      }
    }
  } catch {}
  return { title: slug }
}

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  seo: { de: 'SEO & Suchmaschinen', en: 'SEO & Search Engines', ru: 'SEO и поисковые системы' },
  marketing: { de: 'Marketing & Strategie', en: 'Marketing & Strategy', ru: 'Маркетинг и стратегия' },
  design: { de: 'Design & UX', en: 'Design & UX', ru: 'Дизайн и UX' },
  development: { de: 'Entwicklung & Technologie', en: 'Development & Technology', ru: 'Разработка и технологии' },
  strategy: { de: 'Strategie & Branding', en: 'Strategy & Branding', ru: 'Стратегия и брендинг' },
}

export default async function GlossarDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const t = await getDictionary(locale as Locale)

  let entry: any = null

  try {
    const payload = await getPayload()
    const data = await payload.find({
      collection: 'glossary',
      locale,
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    })
    entry = data.docs[0] as any | undefined
  } catch {}

  if (!entry) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenwing.at'
  const pageUrl = `${siteUrl}/${locale}/glossar/${slug}`
  const categoryLabel = CATEGORY_LABELS[entry.category as string]?.[locale] || (entry.category as string)

  return (
    <>
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'DefinedTerm',
          name: entry.term as string,
          description: entry.shortDefinition as string,
          url: pageUrl,
          inDefinedTermSet: {
            '@type': 'DefinedTermSet',
            name: 'GoldenWing Glossar',
            url: `${siteUrl}/${locale}/glossar`,
          },
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: t.nav.home, url: `${siteUrl}/${locale}` },
          { name: t.glossar.title, url: `${siteUrl}/${locale}/glossar` },
          { name: entry.term as string, url: pageUrl },
        ]}
      />

      <article className="px-4 py-24">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <nav className="text-muted-foreground mb-6 text-sm">
            <Link href={`/${locale}`} className="hover:text-primary">
              {t.nav.home}
            </Link>
            {' / '}
            <Link href={`/${locale}/glossar`} className="hover:text-primary">
              {t.glossar.title}
            </Link>
            {' / '}
            <span className="text-foreground">{entry.term as string}</span>
          </nav>

          {/* Header */}
          <MotionSection>
            <div className="mb-2">
              <Link
                href={`/${locale}/glossar?category=${entry.category as string}`}
                className="bg-muted text-muted-foreground hover:text-primary inline-block rounded-full px-3 py-1 text-xs font-medium transition"
              >
                {categoryLabel}
              </Link>
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">{entry.term as string}</h1>
            <p className="text-muted-foreground mb-8 text-lg">{entry.shortDefinition as string}</p>
          </MotionSection>

          {/* SEO Metrics */}
          {(entry.searchVolume || entry.difficulty) && (
            <MotionSection delay={0.1}>
              <div className="border-border mb-8 flex gap-6 rounded-xl border p-4">
                {entry.searchVolume && (
                  <div>
                    <p className="text-muted-foreground text-xs">Suchvolumen</p>
                    <p className="text-lg font-bold">{Number(entry.searchVolume).toLocaleString()}</p>
                  </div>
                )}
                {entry.difficulty && (
                  <div>
                    <p className="text-muted-foreground text-xs">Keyword Difficulty</p>
                    <p className="text-lg font-bold">{entry.difficulty}/100</p>
                  </div>
                )}
              </div>
            </MotionSection>
          )}

          {/* Full Definition */}
          {entry.fullDefinition && (
            <MotionSection delay={0.15}>
              <div className="prose prose-lg mb-12 max-w-none">
                <RichText content={entry.fullDefinition} />
              </div>
            </MotionSection>
          )}

          {/* Key Points */}
          {entry.keyPoints && (entry.keyPoints as any[]).length > 0 && (
            <MotionSection delay={0.2}>
              <div className="border-border mb-12 rounded-xl border p-6">
                <h2 className="mb-4 text-xl font-bold">{t.glossar.keyPoints}</h2>
                <ul className="space-y-3">
                  {(entry.keyPoints as any[]).map((kp: any, i: number) => (
                    <li key={i} className="flex gap-3">
                      <span className="bg-primary text-primary-foreground mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                        {i + 1}
                      </span>
                      <span>{kp.point as string}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </MotionSection>
          )}

          {/* Usage Example */}
          {entry.usageExample && (
            <MotionSection delay={0.25}>
              <div className="border-primary bg-muted/50 mb-12 rounded-xl border-l-4 p-6">
                <h2 className="text-muted-foreground mb-2 text-sm font-bold tracking-wider uppercase">
                  {t.glossar.usageExample}
                </h2>
                <p className="italic">{entry.usageExample as string}</p>
              </div>
            </MotionSection>
          )}

          {/* Related Terms */}
          {entry.relatedTerms && (entry.relatedTerms as any[]).length > 0 && (
            <MotionSection delay={0.3}>
              <div className="mb-12">
                <h2 className="mb-4 text-xl font-bold">{t.glossar.relatedTerms}</h2>
                <div className="flex flex-wrap gap-2">
                  {(entry.relatedTerms as any[]).map((rel: any) => (
                    <Link
                      key={rel.id || rel}
                      href={`/${locale}/glossar/${rel.slug || rel}`}
                      className="border-border hover:border-primary hover:text-primary rounded-full border px-4 py-2 text-sm font-medium transition"
                    >
                      {rel.term || rel.slug || rel}
                    </Link>
                  ))}
                </div>
              </div>
            </MotionSection>
          )}

          {/* External Links */}
          {entry.externalLinks && (entry.externalLinks as any[]).length > 0 && (
            <MotionSection delay={0.35}>
              <div className="mb-12">
                <h2 className="mb-4 text-xl font-bold">{t.glossar.externalLinks}</h2>
                <ul className="space-y-2">
                  {(entry.externalLinks as any[]).map((link: any, i: number) => (
                    <li key={i}>
                      <a
                        href={link.url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary decoration-primary/30 hover:decoration-primary underline transition"
                      >
                        {link.title as string} &rarr;
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </MotionSection>
          )}

          {/* Back link */}
          <MotionSection delay={0.4}>
            <Link
              href={`/${locale}/glossar`}
              className="text-primary inline-flex items-center gap-2 text-sm font-medium transition hover:underline"
            >
              &larr; {t.glossar.backToOverview}
            </Link>
          </MotionSection>
        </div>
      </article>
    </>
  )
}
