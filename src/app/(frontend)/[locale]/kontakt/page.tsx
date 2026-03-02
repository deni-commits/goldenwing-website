import type { Metadata } from 'next'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'
import { LocalBusinessSchema, BreadcrumbSchema } from '@/components/seo/StructuredData'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)
  return { title: t.contact.title }
}

export default async function KontaktPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenwing.at'

  return (
    <>
      <LocalBusinessSchema />
      <BreadcrumbSchema
        items={[
          { name: t.nav.home, url: `${siteUrl}/${locale}` },
          { name: t.contact.title, url: `${siteUrl}/${locale}/kontakt` },
        ]}
      />
    <section className="px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{t.contact.title}</h1>
        <p className="mb-16 text-lg text-muted">{t.contact.subtitle}</p>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Contact Form */}
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">{t.contact.name}</label>
              <input type="text" id="name" name="name" required className="w-full rounded-lg border border-gray-200 px-4 py-3 transition focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500" />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">{t.contact.email}</label>
              <input type="email" id="email" name="email" required className="w-full rounded-lg border border-gray-200 px-4 py-3 transition focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500" />
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium">{t.contact.phone}</label>
              <input type="tel" id="phone" name="phone" className="w-full rounded-lg border border-gray-200 px-4 py-3 transition focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500" />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium">{t.contact.message}</label>
              <textarea id="message" name="message" rows={5} required className="w-full rounded-lg border border-gray-200 px-4 py-3 transition focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500" />
            </div>
            <button type="submit" className="rounded-lg bg-gold-500 px-8 py-3 font-semibold text-white transition hover:bg-gold-600">
              {t.contact.send}
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="mb-2 text-lg font-semibold">{t.contact.email}</h3>
              <a href="mailto:office@goldenwing.at" className="text-gold-600 hover:underline">office@goldenwing.at</a>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">{locale === 'de' ? 'Standort' : locale === 'ru' ? 'Местоположение' : 'Location'}</h3>
              <p className="text-muted">Wien, Oesterreich</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
