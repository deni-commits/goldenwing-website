import type { Metadata } from 'next'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'
import { LocalBusinessSchema, BreadcrumbSchema } from '@/components/seo/StructuredData'
import { getPageSeo } from '@/lib/seo'
import { ContactForm } from '@/components/kontakt/ContactForm'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)
  return { title: t.contact.title, description: t.contact.metaDescription, ...getPageSeo('kontakt', locale) }
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
            <ContactForm
              datenschutzHref={`/${locale}/datenschutz`}
              labels={{
                name: t.contact.name,
                email: t.contact.email,
                phone: t.contact.phone,
                message: t.contact.message,
                send: t.contact.send,
                privacyLabel: t.contact.privacyLabel,
                privacyLink: t.contact.privacyLink,
                privacySuffix: t.contact.privacySuffix,
                successTitle: t.contact.successTitle,
                successMsg: t.contact.successMsg,
                errorMsg: t.contact.error,
              }}
            />

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="mb-2 text-lg font-semibold">{t.contact.email}</h3>
                <a href="mailto:office@goldenwing.at" className="text-gold-600 hover:underline">office@goldenwing.at</a>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">{t.contact.location}</h3>
                <p className="text-muted">Wien, Oesterreich</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
