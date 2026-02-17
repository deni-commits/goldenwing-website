import { Metadata } from 'next'
import { Mail, Phone, Calendar, FileText, MessageCircle, ArrowRight, Clock, Users, Target, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ContactForm } from '@/components/forms/contact-form'
import { CalPopupButton } from '@/components/integrations/cal-embed'
import { OfficeLocations } from '@/components/sections/office-locations'
import { StepsWithProgress } from '@/components/sections/steps-with-progress'
import { JsonLd, HowToSchema, LocalBusinessSchema } from '@/components/seo/json-ld'
import { getCanonicalUrl, getHreflangAlternates, getSchemaUrl } from '@/lib/utils'
import { getContactPage, type SupportedLocale } from '@/lib/payload'
import { Container } from '@/components/ui/container'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


// ISR: Revalidate every 60 seconds
export const revalidate = 60

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  'calendar': Calendar,
  'file-text': FileText,
  'message-circle': MessageCircle,
  'target': Target,
  'users': Users,
  'clock': Clock,
}

function getIcon(iconName: string | undefined | null): LucideIcon {
  return iconMap[iconName || 'calendar'] || Calendar
}

// Default content for fallback
const defaultContent = {
  de: {
    title: 'Kontakt aufnehmen',
    subtitle: 'Wir freuen uns auf Ihre Anfrage',
    description: 'Ob Sie ein neues Projekt starten, eine bestehende Lösung verbessern oder einfach Ihre Möglichkeiten erkunden möchten – wir sind für Sie da.',
    contactOptions: {
      title: 'Drei Wege zu uns',
      options: [
        {
          icon: 'calendar',
          title: 'Erstgespräch vereinbaren',
          description: 'In einem kostenlosen 30-minütigen Gespräch lernen wir Ihre Herausforderungen und Ziele kennen – und Sie uns. Unverbindlich und ohne Verpflichtung.',
          cta: 'Termin buchen',
        },
        {
          icon: 'file-text',
          title: 'Projektanfrage senden',
          description: 'Sie haben bereits eine konkrete Vorstellung? Nutzen Sie unser Formular und beschreiben Sie Ihr Projekt. Wir melden uns innerhalb von 24 Stunden.',
          cta: 'Zum Formular',
        },
        {
          icon: 'message-circle',
          title: 'Direkter Kontakt',
          description: 'Schnelle Fragen oder ein persönliches Anliegen? Rufen Sie uns an oder schreiben Sie eine E-Mail. Wir sind gerne für Sie da.',
          cta: 'Kontaktdaten',
        },
      ],
    },
    whatHappens: {
      title: 'Was passiert nach Ihrer Anfrage?',
      steps: [
        { number: '1', title: 'Wir melden uns', description: 'Innerhalb von 24 Stunden erhalten Sie eine Rückmeldung von uns.' },
        { number: '2', title: 'Wir verstehen', description: 'In einem ersten Gespräch klären wir Ihre Ziele, Herausforderungen und Rahmenbedingungen.' },
        { number: '3', title: 'Wir beraten', description: 'Sie erhalten eine ehrliche Einschätzung und konkrete Empfehlungen – auch wenn wir nicht der richtige Partner sind.' },
        { number: '4', title: 'Wir planen', description: 'Bei einem Match erstellen wir einen klaren Projektplan mit Zeitrahmen und Investition.' },
      ],
    },
    collaboration: {
      title: 'Wie wir Zusammenarbeit verstehen',
      points: [
        { icon: 'target', title: 'Zielorientiert', description: 'Wir arbeiten auf messbare Ergebnisse hin, nicht auf Beschäftigung.' },
        { icon: 'users', title: 'Partnerschaftlich', description: 'Wir sehen uns als Teil Ihres Teams, nicht als externen Dienstleister.' },
        { icon: 'clock', title: 'Verbindlich', description: 'Was wir zusagen, halten wir. Transparente Kommunikation ist für uns selbstverständlich.' },
      ],
    },
    form: {
      title: 'Projektanfrage',
      description: 'Beschreiben Sie Ihr Projekt und wir melden uns bei Ihnen.',
    },
    contact: {
      title: 'Direkter Kontakt',
      email: 'deni@goldenwing.at',
      phone: '+43 664 543 96 81',
      availability: 'Erreichbarkeit',
      hours: 'Mo - Fr: 09:00 - 18:00',
    },
    calendly: {
      title: 'Termin buchen',
      description: 'Wählen Sie einen passenden Zeitpunkt für ein kostenloses 30-minütiges Erstgespräch.',
    },
    cta: {
      title: 'Bereit, loszulegen?',
      description: 'Egal ob großes Projekt oder kleine Frage – wir sind für Sie da.',
      primary: 'Gespräch buchen',
      secondary: 'Projektanfrage senden',
    },
  },
  en: {
    title: 'Get in Touch',
    subtitle: 'We look forward to hearing from you',
    description: 'Whether you\'re starting a new project, improving an existing solution, or simply exploring your options – we\'re here for you.',
    contactOptions: {
      title: 'Three Ways to Reach Us',
      options: [
        {
          icon: 'calendar',
          title: 'Schedule Consultation',
          description: 'In a free 30-minute consultation, we\'ll learn about your challenges and goals – and you\'ll learn about us. No obligation, no pressure.',
          cta: 'Book Appointment',
        },
        {
          icon: 'file-text',
          title: 'Send Project Inquiry',
          description: 'Already have a concrete idea? Use our form to describe your project. We\'ll get back to you within 24 hours.',
          cta: 'Go to Form',
        },
        {
          icon: 'message-circle',
          title: 'Direct Contact',
          description: 'Quick questions or a personal matter? Give us a call or send an email. We\'re happy to help.',
          cta: 'Contact Details',
        },
      ],
    },
    whatHappens: {
      title: 'What Happens After Your Inquiry?',
      steps: [
        { number: '1', title: 'We Respond', description: 'You\'ll receive a response from us within 24 hours.' },
        { number: '2', title: 'We Understand', description: 'In an initial conversation, we clarify your goals, challenges, and requirements.' },
        { number: '3', title: 'We Advise', description: 'You receive an honest assessment and concrete recommendations – even if we\'re not the right fit.' },
        { number: '4', title: 'We Plan', description: 'If it\'s a match, we create a clear project plan with timeline and investment.' },
      ],
    },
    collaboration: {
      title: 'How We Understand Collaboration',
      points: [
        { icon: 'target', title: 'Goal-Oriented', description: 'We work toward measurable results, not just activity.' },
        { icon: 'users', title: 'Partnership', description: 'We see ourselves as part of your team, not an external vendor.' },
        { icon: 'clock', title: 'Reliable', description: 'What we promise, we deliver. Transparent communication is standard for us.' },
      ],
    },
    form: {
      title: 'Project Inquiry',
      description: 'Describe your project and we\'ll get back to you.',
    },
    contact: {
      title: 'Direct Contact',
      email: 'deni@goldenwing.at',
      phone: '+43 664 543 96 81',
      availability: 'Availability',
      hours: 'Mon - Fri: 09:00 - 18:00',
    },
    calendly: {
      title: 'Book Appointment',
      description: 'Choose a suitable time for a free 30-minute initial consultation.',
    },
    cta: {
      title: 'Ready to Get Started?',
      description: 'Whether it\'s a big project or a small question – we\'re here for you.',
      primary: 'Book Consultation',
      secondary: 'Send Project Inquiry',
    },
  },
  ru: {
    title: 'Связаться с нами',
    subtitle: 'Мы рады вашему обращению',
    description: 'Хотите начать новый проект, улучшить существующее решение или просто изучить возможности — мы здесь для вас.',
    contactOptions: {
      title: 'Три способа связи',
      options: [
        {
          icon: 'calendar',
          title: 'Записаться на консультацию',
          description: 'В бесплатной 30-минутной консультации мы узнаем о ваших задачах и целях — а вы узнаете о нас. Без обязательств.',
          cta: 'Записаться',
        },
        {
          icon: 'file-text',
          title: 'Отправить запрос на проект',
          description: 'Уже есть конкретная идея? Используйте нашу форму, чтобы описать проект. Мы ответим в течение 24 часов.',
          cta: 'К форме',
        },
        {
          icon: 'message-circle',
          title: 'Прямой контакт',
          description: 'Быстрый вопрос или личное обращение? Позвоните или напишите. Мы всегда рады помочь.',
          cta: 'Контакты',
        },
      ],
    },
    whatHappens: {
      title: 'Что происходит после вашего запроса?',
      steps: [
        { number: '1', title: 'Мы отвечаем', description: 'Вы получите ответ от нас в течение 24 часов.' },
        { number: '2', title: 'Мы понимаем', description: 'В первом разговоре выясняем ваши цели, задачи и требования.' },
        { number: '3', title: 'Мы консультируем', description: 'Вы получаете честную оценку и конкретные рекомендации — даже если мы не подходим.' },
        { number: '4', title: 'Мы планируем', description: 'При совпадении ожиданий создаём чёткий план проекта со сроками и бюджетом.' },
      ],
    },
    collaboration: {
      title: 'Как мы понимаем сотрудничество',
      points: [
        { icon: 'target', title: 'Нацеленность на результат', description: 'Мы работаем на измеримые результаты, а не просто ради деятельности.' },
        { icon: 'users', title: 'Партнёрство', description: 'Мы видим себя частью вашей команды, а не внешним подрядчиком.' },
        { icon: 'clock', title: 'Надёжность', description: 'Что обещаем — выполняем. Прозрачная коммуникация для нас стандарт.' },
      ],
    },
    form: {
      title: 'Запрос на проект',
      description: 'Опишите ваш проект, и мы свяжемся с вами.',
    },
    contact: {
      title: 'Прямой контакт',
      email: 'deni@goldenwing.at',
      phone: '+43 664 543 96 81',
      availability: 'Время работы',
      hours: 'Пн - Пт: 09:00 - 18:00',
    },
    calendly: {
      title: 'Записаться на встречу',
      description: 'Выберите удобное время для бесплатной 30-минутной консультации.',
    },
    cta: {
      title: 'Готовы начать?',
      description: 'Большой проект или маленький вопрос — мы здесь для вас.',
      primary: 'Записаться на консультацию',
      secondary: 'Отправить запрос',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const contactPage = await getContactPage(locale)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cp = contactPage as Record<string, any> | null
  const hreflangAlternates = getHreflangAlternates('/kontakt')

  const metaTitles: Record<string, string> = {
    de: 'Kontakt & Erstgespräch | GoldenWing Creative Studios Wien',
    en: 'Contact & Free Consultation | GoldenWing Creative Studios',
    ru: 'Контакты и консультация | GoldenWing Creative Studios Вена',
  }
  const metaDescriptions: Record<string, string> = {
    de: 'Kontaktieren Sie GoldenWing Creative Studios. Kostenloses Erstgespräch für Ihr Branding, Webdesign oder Marketing-Projekt. Wien · Dubai · California.',
    en: 'Contact GoldenWing Creative Studios. Free initial consultation for your branding, web design, or marketing project. Vienna · Dubai · California.',
    ru: 'Свяжитесь с GoldenWing Creative Studios. Бесплатная консультация по вашему проекту брендинга, веб-дизайна или маркетинга. Вена · Дубай · Калифорния.',
  }
  const metaKeywords: Record<string, string[]> = {
    de: ['Kontakt Agentur Wien', 'Webdesign Anfrage', 'Branding Beratung', 'Marketing Agentur Kontakt'],
    en: ['Contact Agency Vienna', 'Web Design Inquiry', 'Branding Consultation', 'Marketing Agency Contact'],
    ru: ['Контакты агентство Вена', 'Заказать веб-дизайн', 'Консультация по брендингу', 'Маркетинговое агентство'],
  }
  const ogTitles: Record<string, string> = {
    de: 'Kontakt | GoldenWing Creative Studios',
    en: 'Contact | GoldenWing Creative Studios',
    ru: 'Контакты | GoldenWing Creative Studios',
  }
  const ogDescriptions: Record<string, string> = {
    de: 'Lassen Sie uns über Ihr Projekt sprechen. Kostenloses Erstgespräch vereinbaren.',
    en: 'Let\'s talk about your project. Schedule a free initial consultation.',
    ru: 'Давайте обсудим ваш проект. Запишитесь на бесплатную консультацию.',
  }

  return {
    title: cp?.seo?.metaTitle || metaTitles[locale] || metaTitles.en,
    description: cp?.seo?.metaDescription || metaDescriptions[locale] || metaDescriptions.en,
    keywords: metaKeywords[locale] || metaKeywords.en,
    openGraph: {
      title: ogTitles[locale] || ogTitles.en,
      description: ogDescriptions[locale] || ogDescriptions.en,
      url: locale === 'de' ? 'https://goldenwing.at/kontakt' : locale === 'ru' ? 'https://goldenwing.at/ru/kontakty' : 'https://goldenwing.at/en/contact',
      type: 'website',
      siteName: 'GoldenWing Creative Studios',
      images: [
        {
          url: 'https://goldenwing.at/og-image.jpg',
          width: 1200,
          height: 630,
          alt: ogTitles[locale] || ogTitles.en,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitles[locale] || ogTitles.en,
      description: ogDescriptions[locale] || ogDescriptions.en,
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: getCanonicalUrl('/kontakt', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const contactPage = await getContactPage(locale)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cp = contactPage as Record<string, any> | null
  const defaults = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']

  // Extract CMS arrays with proper typing
  const cmsContactOptions = cp?.contactOptions as Array<{ icon?: string; title: string; description: string; cta: string }> | undefined
  const cmsWhatHappensSteps = cp?.whatHappensSteps as Array<{ number?: string; title: string; description: string }> | undefined
  const cmsCollaborationPoints = cp?.collaborationPoints as Array<{ icon?: string; title: string; description: string }> | undefined

  // Build content from CMS with fallbacks
  const content = {
    title: cp?.heroTitle || defaults.title,
    subtitle: cp?.heroSubtitle || defaults.subtitle,
    description: cp?.heroDescription || defaults.description,
    contactOptions: {
      title: cp?.contactOptionsTitle || defaults.contactOptions.title,
      options: cmsContactOptions?.length
        ? cmsContactOptions.map((opt) => ({
            icon: getIcon(opt.icon),
            title: opt.title,
            description: opt.description,
            cta: opt.cta,
          }))
        : defaults.contactOptions.options.map(opt => ({
            icon: getIcon(opt.icon),
            title: opt.title,
            description: opt.description,
            cta: opt.cta,
          })),
    },
    whatHappens: {
      title: cp?.whatHappensTitle || defaults.whatHappens.title,
      steps: cmsWhatHappensSteps?.length
        ? cmsWhatHappensSteps
        : defaults.whatHappens.steps,
    },
    collaboration: {
      title: cp?.collaborationTitle || defaults.collaboration.title,
      points: cmsCollaborationPoints?.length
        ? cmsCollaborationPoints.map((point) => ({
            icon: getIcon(point.icon),
            title: point.title,
            description: point.description,
          }))
        : defaults.collaboration.points.map(point => ({
            icon: getIcon(point.icon),
            title: point.title,
            description: point.description,
          })),
    },
    form: {
      title: cp?.formTitle || defaults.form.title,
      description: cp?.formDescription || defaults.form.description,
    },
    contact: {
      title: cp?.contactTitle || defaults.contact.title,
      email: cp?.email || defaults.contact.email,
      phone: cp?.phone || defaults.contact.phone,
      availability: cp?.availabilityLabel || defaults.contact.availability,
      hours: cp?.hours || defaults.contact.hours,
    },
    calendly: {
      title: cp?.calendlyTitle || defaults.calendly.title,
      description: cp?.calendlyDescription || defaults.calendly.description,
    },
    cta: {
      title: cp?.ctaTitle || defaults.cta.title,
      description: cp?.ctaDescription || defaults.cta.description,
      primary: cp?.ctaPrimary || defaults.cta.primary,
      secondary: cp?.ctaSecondary || defaults.cta.secondary,
    },
  }

  const contactPageNames: Record<string, string> = { de: 'Kontakt - GoldenWing', en: 'Contact - GoldenWing', ru: 'Контакты - GoldenWing' }
  const contactPageDescriptions: Record<string, string> = { de: 'Kontaktseite für Projektanfragen', en: 'Contact page for project inquiries', ru: 'Страница контактов для запросов на проект' }
  const breadcrumbNames: Record<string, string> = { de: 'Kontakt', en: 'Contact', ru: 'Контакты' }

  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: contactPageNames[locale] || contactPageNames.en,
    description: contactPageDescriptions[locale] || contactPageDescriptions.en,
    url: getSchemaUrl('/kontakt', locale),
  }

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': getSchemaUrl('/', locale) },
      { '@type': 'ListItem', 'position': 2, 'name': breadcrumbNames[locale] || breadcrumbNames.en, 'item': getSchemaUrl('/kontakt', locale) }
    ]
  }

  // HowTo schema for process steps
  const howToSteps = content.whatHappens.steps.map((step) => ({
    name: step.title,
    text: step.description,
  }))

  return (
    <>
      <JsonLd data={contactJsonLd} />
      <JsonLd data={breadcrumbData} />
      <HowToSchema
        name={locale === 'de' ? 'Projektanfrage bei GoldenWing stellen' : locale === 'ru' ? 'Как отправить запрос на проект в GoldenWing' : 'How to Submit a Project Inquiry to GoldenWing'}
        description={locale === 'de'
          ? 'So läuft die Zusammenarbeit mit GoldenWing ab - von der ersten Anfrage bis zum Projektstart.'
          : locale === 'ru'
          ? 'Как работает сотрудничество с GoldenWing — от первого запроса до старта проекта.'
          : 'How to work with GoldenWing - from first inquiry to project start.'}
        steps={howToSteps}
        totalTime="P1W"
      />
      <LocalBusinessSchema />

      {/* Hero */}
      <section className="py-24 md:py-32">
        <Container variant="block">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {content.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              {content.subtitle}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {content.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Options */}
      <section className="py-16 md:py-24 bg-muted/30">
        <Container variant="block">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">{content.contactOptions.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {content.contactOptions.options.map((option, index) => (
              <div key={index} className="bg-background rounded-xl border p-6 md:p-8 text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <option.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{option.title}</h3>
                <p className="text-muted-foreground mb-6">{option.description}</p>
                <Button variant="outline" className="w-full" asChild>
                  <a href={index === 0 ? '#calendly' : index === 1 ? '#form' : '#contact'}>
                    {option.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What Happens After - with animated progress line */}
      <StepsWithProgress
        title={content.whatHappens.title}
        steps={content.whatHappens.steps}
      />

      {/* Form & Contact Info */}
      <section id="form" className="py-16 md:py-24 bg-muted/30 scroll-mt-24">
        <Container variant="block">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-background rounded-xl border p-6 md:p-8">
                <h2 className="text-2xl font-semibold mb-2">{content.form.title}</h2>
                <p className="text-muted-foreground mb-6">{content.form.description}</p>
                <ContactForm />
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-8" id="contact">
              <div className="bg-background rounded-xl border p-6">
                <h3 className="text-lg font-semibold mb-4">{content.contact.title}</h3>
                <ul className="space-y-4">
                  <li>
                    <a
                      href={`mailto:${content.contact.email}`}
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                      {content.contact.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${content.contact.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                      {content.contact.phone}
                    </a>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">{content.contact.availability}</p>
                      <p>{content.contact.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-background rounded-xl border p-6" id="calendly">
                <h3 className="text-lg font-semibold mb-2">{content.calendly.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {content.calendly.description}
                </p>
                <CalPopupButton>
                  {locale === 'de' ? 'Jetzt Termin wählen' : locale === 'ru' ? 'Выбрать время' : 'Choose Appointment'}
                </CalPopupButton>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Office Locations */}
      <OfficeLocations />

      {/* Final CTA */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{content.cta.title}</h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">{content.cta.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="#calendly">
                  {content.cta.primary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10" asChild>
                <a href="#form">{content.cta.secondary}</a>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
