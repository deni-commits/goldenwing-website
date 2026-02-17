import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { BreadcrumbListSchema, JsonLd } from '@/components/seo/json-ld'
import { getCanonicalUrl, getHreflangAlternates, getSchemaUrl } from '@/lib/utils'
import { getImpressumPage, type SupportedLocale } from '@/lib/payload'
import { Container } from '@/components/ui/container'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 60

// Default content
const defaultContent = {
  de: {
    title: 'Impressum',
    sections: {
      legalInfo: { title: 'Angaben gemäß § 5 ECG', country: 'Österreich' },
      contact: { title: 'Kontakt', email: 'E-Mail', phone: 'Telefon' },
      management: { title: 'Geschäftsführung', name: 'Mag. Deni Khachukaev' },
      businessPurpose: { title: 'Unternehmensgegenstand', content: 'Werbeagentur, IT-Dienstleistungen, Webdesign und Softwareentwicklung' },
      companyRegister: { title: 'Firmenbuch', number: 'FN 605474 d', court: 'Handelsgericht Wien' },
      vatId: { title: 'UID-Nummer', number: 'ATU79107958' },
      chamber: { title: 'Kammermitgliedschaft', content: 'Wirtschaftskammer Wien, Fachgruppe Werbung und Marktkommunikation' },
      authority: { title: 'Aufsichtsbehörde', content: 'Magistrat der Stadt Wien' },
      disclaimer: {
        title: 'Haftungsausschluss',
        contentTitle: 'Haftung für Inhalte',
        contentText: 'Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.',
        linksTitle: 'Haftung für Links',
        linksText: 'Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.',
      },
      copyright: { title: 'Urheberrecht', content: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem österreichischen Urheberrecht.' },
      dispute: {
        title: 'Streitbeilegung',
        intro: 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:',
        platformLabel: 'EU Online-Streitbeilegungsplattform',
        note: 'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
      },
    },
    company: {
      name: 'GOLDENWING Creative Studios e.U.',
      street: 'Czeikestrasse 4/21',
      postalCode: '1100',
      city: 'Wien',
      email: 'deni@goldenwing.at',
      phone: '+43 664 543 96 81',
    },
  },
  en: {
    title: 'Legal Notice',
    sections: {
      legalInfo: { title: 'Information according to § 5 ECG', country: 'Austria' },
      contact: { title: 'Contact', email: 'Email', phone: 'Phone' },
      management: { title: 'Management', name: 'Mag. Deni Khachukaev' },
      businessPurpose: { title: 'Business Purpose', content: 'Advertising agency, IT services, web design and software development' },
      companyRegister: { title: 'Company Register', number: 'FN 605474 d', court: 'Commercial Court Vienna' },
      vatId: { title: 'VAT ID', number: 'ATU79107958' },
      chamber: { title: 'Chamber Membership', content: 'Vienna Chamber of Commerce, Professional Group Advertising and Market Communication' },
      authority: { title: 'Supervisory Authority', content: 'Municipality of the City of Vienna' },
      disclaimer: {
        title: 'Disclaimer',
        contentTitle: 'Liability for Content',
        contentText: 'The content of our pages has been created with the greatest care. However, we cannot guarantee the accuracy, completeness, and timeliness of the content.',
        linksTitle: 'Liability for Links',
        linksText: 'Our website contains links to external third-party websites over whose content we have no influence. Therefore, we cannot accept any liability for this external content.',
      },
      copyright: { title: 'Copyright', content: 'The content and works created by the site operators on these pages are subject to Austrian copyright law.' },
      dispute: {
        title: 'Dispute Resolution',
        intro: 'The European Commission provides a platform for online dispute resolution:',
        platformLabel: 'EU Online Dispute Resolution Platform',
        note: 'We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.',
      },
    },
    company: {
      name: 'GOLDENWING Creative Studios e.U.',
      street: 'Czeikestrasse 4/21',
      postalCode: '1100',
      city: 'Vienna',
      email: 'deni@goldenwing.at',
      phone: '+43 664 543 96 81',
    },
  },
  ru: {
    title: 'Юридическая информация',
    sections: {
      legalInfo: { title: 'Информация согласно § 5 ECG', country: 'Австрия' },
      contact: { title: 'Контакты', email: 'Эл. почта', phone: 'Телефон' },
      management: { title: 'Руководство', name: 'Mag. Deni Khachukaev' },
      businessPurpose: { title: 'Направление деятельности', content: 'Рекламное агентство, IT-услуги, веб-дизайн и разработка программного обеспечения' },
      companyRegister: { title: 'Торговый реестр', number: 'FN 605474 d', court: 'Коммерческий суд Вены' },
      vatId: { title: 'Номер НДС', number: 'ATU79107958' },
      chamber: { title: 'Членство в палате', content: 'Торговая палата Вены, группа рекламы и маркетинговых коммуникаций' },
      authority: { title: 'Надзорный орган', content: 'Магистрат города Вены' },
      disclaimer: {
        title: 'Отказ от ответственности',
        contentTitle: 'Ответственность за контент',
        contentText: 'Содержимое наших страниц создано с максимальной тщательностью. Однако мы не можем гарантировать точность, полноту и актуальность содержания.',
        linksTitle: 'Ответственность за ссылки',
        linksText: 'Наш веб-сайт содержит ссылки на внешние сайты третьих лиц, содержание которых мы не контролируем. Поэтому мы не несём ответственности за содержимое этих внешних ресурсов.',
      },
      copyright: { title: 'Авторское право', content: 'Содержимое и материалы, созданные владельцами сайта, защищены австрийским законом об авторском праве.' },
      dispute: {
        title: 'Урегулирование споров',
        intro: 'Европейская комиссия предоставляет платформу для онлайн-урегулирования споров:',
        platformLabel: 'Платформа ЕС для онлайн-урегулирования споров',
        note: 'Мы не участвуем и не обязаны участвовать в процедурах урегулирования споров перед арбитражной комиссией по защите прав потребителей.',
      },
    },
    company: {
      name: 'GOLDENWING Creative Studios e.U.',
      street: 'Czeikestrasse 4/21',
      postalCode: '1100',
      city: 'Вена',
      email: 'deni@goldenwing.at',
      phone: '+43 664 543 96 81',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const impressumPage = await getImpressumPage(locale)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cp = impressumPage as Record<string, any> | null
  const t = await getTranslations({ locale, namespace: 'imprint' })
  const hreflangAlternates = getHreflangAlternates('/impressum')

  const title = cp?.seo?.metaTitle || t('metaTitle')
  const description = cp?.seo?.metaDescription || t('metaDescription')
  const keywords = cp?.seo?.keywords || t('keywords')

  return {
    title,
    description,
    keywords: keywords.split(',').map((k: string) => k.trim()),
    openGraph: {
      title,
      description,
      url: getCanonicalUrl('/impressum', locale),
      type: 'website',
      siteName: 'GoldenWing Creative Studios',
      images: [
        {
          url: 'https://goldenwing.at/og-image.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: getCanonicalUrl('/impressum', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function ImprintPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const impressumPage = await getImpressumPage(locale)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cp = impressumPage as Record<string, any> | null
  const defaults = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']
  const t = await getTranslations({ locale, namespace: 'imprint' })

  // Build content with CMS data or fallbacks
  const content = {
    title: cp?.title || defaults.title,
    company: {
      name: cp?.companyInfo?.companyName || defaults.company.name,
      street: cp?.companyInfo?.street || defaults.company.street,
      postalCode: cp?.companyInfo?.postalCode || defaults.company.postalCode,
      city: cp?.companyInfo?.city || defaults.company.city,
      country: cp?.companyInfo?.country || defaults.sections.legalInfo.country,
      email: cp?.contact?.email || defaults.company.email,
      phone: cp?.contact?.phone || defaults.company.phone,
    },
    sections: {
      legalInfo: { title: t('sections.legalInfo.title') },
      contact: { title: t('sections.contact.title'), email: t('sections.contact.email'), phone: t('sections.contact.phone') },
      management: { title: cp?.management?.sectionTitle || defaults.sections.management.title, name: cp?.management?.name || defaults.sections.management.name },
      businessPurpose: { title: cp?.businessPurpose?.sectionTitle || defaults.sections.businessPurpose.title, content: cp?.businessPurpose?.content || defaults.sections.businessPurpose.content },
      companyRegister: { title: cp?.companyRegister?.sectionTitle || defaults.sections.companyRegister.title, number: cp?.companyRegister?.number || defaults.sections.companyRegister.number, court: cp?.companyRegister?.court || defaults.sections.companyRegister.court },
      vatId: { title: cp?.vatId?.sectionTitle || defaults.sections.vatId.title, number: cp?.vatId?.number || defaults.sections.vatId.number },
      chamber: { title: cp?.chamber?.sectionTitle || defaults.sections.chamber.title, content: cp?.chamber?.content || defaults.sections.chamber.content },
      authority: { title: cp?.authority?.sectionTitle || defaults.sections.authority.title, content: cp?.authority?.content || defaults.sections.authority.content },
      disclaimer: {
        title: cp?.disclaimer?.sectionTitle || defaults.sections.disclaimer.title,
        contentTitle: cp?.disclaimer?.contentTitle || defaults.sections.disclaimer.contentTitle,
        contentText: cp?.disclaimer?.contentText || defaults.sections.disclaimer.contentText,
        linksTitle: cp?.disclaimer?.linksTitle || defaults.sections.disclaimer.linksTitle,
        linksText: cp?.disclaimer?.linksText || defaults.sections.disclaimer.linksText,
      },
      copyright: { title: cp?.copyright?.sectionTitle || defaults.sections.copyright.title, content: cp?.copyright?.content || defaults.sections.copyright.content },
      dispute: {
        title: cp?.dispute?.sectionTitle || defaults.sections.dispute.title,
        intro: cp?.dispute?.intro || defaults.sections.dispute.intro,
        platformLabel: cp?.dispute?.platformLabel || defaults.sections.dispute.platformLabel,
        note: cp?.dispute?.note || defaults.sections.dispute.note,
      },
    },
  }

  const schemaNames: Record<string, string> = { de: 'Impressum', en: 'Legal Notice', ru: 'Юридическая информация' }
  const schemaDescriptions: Record<string, string> = {
    de: 'Impressum und rechtliche Informationen von GoldenWing Creative Studios e.U., Wien',
    en: 'Legal notice and information about GoldenWing Creative Studios e.U., Vienna',
    ru: 'Юридическая информация о GoldenWing Creative Studios e.U., Вена',
  }
  const schemaLanguages: Record<string, string> = { de: 'de-AT', en: 'en', ru: 'ru' }
  const breadcrumbNames: Record<string, string> = { de: 'Impressum', en: 'Imprint', ru: 'Юридическая информация' }
  const registrationLabels: Record<string, string> = { de: 'Firmenbuchnummer', en: 'Registration Number', ru: 'Регистрационный номер' }
  const courtLabels: Record<string, string> = { de: 'Gericht', en: 'Court', ru: 'Суд' }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: schemaNames[locale] || schemaNames.en,
    description: schemaDescriptions[locale] || schemaDescriptions.en,
    url: getSchemaUrl('/impressum', locale),
    inLanguage: schemaLanguages[locale] || schemaLanguages.en,
    isPartOf: {
      '@type': 'WebSite',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
    },
    about: {
      '@type': 'Organization',
      name: content.company.name,
      legalName: content.company.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: content.company.street,
        addressLocality: content.company.city,
        postalCode: content.company.postalCode,
        addressCountry: 'AT',
      },
      vatID: content.sections.vatId.number,
      telephone: content.company.phone,
      email: content.company.email,
    },
  }

  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: 'Home', url: getSchemaUrl('/', locale) },
          { name: breadcrumbNames[locale] || breadcrumbNames.en, url: getSchemaUrl('/impressum', locale) },
        ]}
      />
      <JsonLd data={webPageSchema} />

      <section className="py-16 md:py-24">
      <Container variant="block">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            {content.title}
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {/* Legal Info */}
            <h2 className="text-3xl md:text-4xl font-semibold mt-8 mb-4">{content.sections.legalInfo.title}</h2>
            <p className="text-muted-foreground mb-4">
              <strong>{content.company.name}</strong><br />
              {content.company.street}<br />
              {content.company.postalCode} {content.company.city}, {content.company.country}
            </p>

            {/* Contact */}
            <h2 className="text-3xl md:text-4xl font-semibold mt-8 mb-4">{content.sections.contact.title}</h2>
            <p className="text-muted-foreground mb-4">
              {content.sections.contact.email}: <a href={`mailto:${content.company.email}`} className="text-primary hover:underline">{content.company.email}</a><br />
              {content.sections.contact.phone}: <a href={`tel:${content.company.phone.replace(/\s/g, '')}`} className="text-primary hover:underline">{content.company.phone}</a>
            </p>

            {/* Management */}
            <h2 className="text-3xl md:text-4xl font-semibold mt-8 mb-4">{content.sections.management.title}</h2>
            <p className="text-muted-foreground mb-4">
              {content.sections.management.name}
            </p>

            {/* Business Purpose */}
            <h2 className="text-3xl md:text-4xl font-semibold mt-8 mb-4">{content.sections.businessPurpose.title}</h2>
            <p className="text-muted-foreground mb-4">
              {content.sections.businessPurpose.content}
            </p>

            {/* Company Register */}
            <h2 className="text-3xl md:text-4xl font-semibold mt-8 mb-4">{content.sections.companyRegister.title}</h2>
            <p className="text-muted-foreground mb-4">
              {registrationLabels[locale] || registrationLabels.en}: {content.sections.companyRegister.number}<br />
              {courtLabels[locale] || courtLabels.en}: {content.sections.companyRegister.court}
            </p>

            {/* VAT ID */}
            <h2 className="text-3xl md:text-4xl font-semibold mt-8 mb-4">{content.sections.vatId.title}</h2>
            <p className="text-muted-foreground mb-4">
              {content.sections.vatId.number}
            </p>

            {/* Chamber Membership */}
            <h2 className="text-3xl md:text-4xl font-semibold mt-8 mb-4">{content.sections.chamber.title}</h2>
            <p className="text-muted-foreground mb-4">
              {content.sections.chamber.content}
            </p>

            {/* Supervisory Authority */}
            <h2 className="text-3xl md:text-4xl font-semibold mt-8 mb-4">{content.sections.authority.title}</h2>
            <p className="text-muted-foreground mb-4">
              {content.sections.authority.content}
            </p>

            {/* Disclaimer */}
            <h2 className="text-3xl md:text-4xl font-semibold mt-8 mb-4">{content.sections.disclaimer.title}</h2>
            <h3 className="text-lg font-medium mt-6 mb-3">{content.sections.disclaimer.contentTitle}</h3>
            <p className="text-muted-foreground mb-4">
              {content.sections.disclaimer.contentText}
            </p>

            <h3 className="text-lg font-medium mt-6 mb-3">{content.sections.disclaimer.linksTitle}</h3>
            <p className="text-muted-foreground mb-4">
              {content.sections.disclaimer.linksText}
            </p>

            {/* Copyright */}
            <h2 className="text-3xl md:text-4xl font-semibold mt-8 mb-4">{content.sections.copyright.title}</h2>
            <p className="text-muted-foreground mb-4">
              {content.sections.copyright.content}
            </p>

            {/* Dispute Resolution */}
            <h2 className="text-3xl md:text-4xl font-semibold mt-8 mb-4">{content.sections.dispute.title}</h2>
            <p className="text-muted-foreground mb-4">
              {content.sections.dispute.intro}{' '}
              <a
                href="https://ec.europa.eu/consumers/odr"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.sections.dispute.platformLabel}
              </a>
            </p>
            <p className="text-muted-foreground">
              {content.sections.dispute.note}
            </p>
          </div>
        </div>
      </Container>
    </section>
    </>
  )
}
