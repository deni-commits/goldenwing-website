import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/config'
import { OrganizationSchema } from '@/components/seo/StructuredData'
import { getPageSeo } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const descriptions: Record<string, string> = {
    de: 'GoldenWing Creative Studios — Marketing-, Branding- und Webdesign-Agentur aus Wien. Ihre Vision. Unsere Expertise. Perfekte Umsetzung.',
    en: 'GoldenWing Creative Studios — Marketing, branding & web design agency from Vienna. Your vision. Our expertise. Perfect execution.',
    ru: 'GoldenWing Creative Studios — маркетинговое и брендинговое агентство из Вены. Ваше видение. Наша экспертиза.',
  }
  return { description: descriptions[locale] || descriptions.de, ...getPageSeo('', locale) }
}

function formatDate(dateString: string, locale: string): string {
  const localeMap: Record<string, string> = { de: 'de-AT', en: 'en-US', ru: 'ru-RU' }
  return new Date(dateString).toLocaleDateString(localeMap[locale] || 'de-AT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

const stats = [
  { value: '120+', label: { de: 'Abgeschlossene Projekte', en: 'Completed Projects', ru: 'Завершённых проектов' } },
  { value: '98%', label: { de: 'Kundenzufriedenheit', en: 'Client Satisfaction', ru: 'Удовлетворённость клиентов' } },
  { value: '12+', label: { de: 'Jahre Erfahrung', en: 'Years Experience', ru: 'Лет опыта' } },
  { value: '50+', label: { de: 'Zufriedene Kunden', en: 'Happy Clients', ru: 'Довольных клиентов' } },
]

const processSteps = [
  { step: '01', title: 'Discovery', desc: { de: 'Wir verstehen Ihre Ziele, Zielgruppe und Herausforderungen.', en: 'We understand your goals, audience, and challenges.', ru: 'Мы понимаем ваши цели, аудиторию и задачи.' } },
  { step: '02', title: { de: 'Strategie', en: 'Strategy', ru: 'Стратегия' }, desc: { de: 'Wir entwickeln einen massgeschneiderten Plan fuer Ihren Erfolg.', en: 'We develop a tailored plan for your success.', ru: 'Мы разрабатываем индивидуальный план для вашего успеха.' } },
  { step: '03', title: { de: 'Umsetzung', en: 'Execution', ru: 'Реализация' }, desc: { de: 'Wir setzen die Strategie in hochwertige Ergebnisse um.', en: 'We turn strategy into high-quality results.', ru: 'Мы превращаем стратегию в качественные результаты.' } },
  { step: '04', title: { de: 'Optimierung', en: 'Optimization', ru: 'Оптимизация' }, desc: { de: 'Wir analysieren, lernen und verbessern kontinuierlich.', en: 'We analyze, learn, and continuously improve.', ru: 'Мы анализируем, учимся и постоянно совершенствуемся.' } },
]

function loc(obj: string | Record<string, string>, locale: string): string {
  if (typeof obj === 'string') return obj
  return obj[locale] || obj.de || ''
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getDictionary(locale as Locale)

  let posts: any[] = []
  let services: any[] = []
  let testimonials: any[] = []
  let caseStudies: any[] = []

  try {
    const payload = await getPayload()
    const [postsData, servicesData, testimonialsData, caseStudiesData] = await Promise.all([
      payload.find({ collection: 'posts', locale, limit: 3, sort: '-publishedDate', where: { _status: { equals: 'published' } } }),
      payload.find({ collection: 'services', locale, limit: 10, where: { parent: { exists: false } }, sort: 'order' }),
      payload.find({ collection: 'testimonials', locale, limit: 6 }),
      payload.find({ collection: 'case-studies', locale, limit: 4, sort: '-publishedDate' }),
    ])
    posts = postsData.docs
    services = servicesData.docs
    testimonials = testimonialsData.docs
    caseStudies = caseStudiesData.docs
  } catch {
    // Tables may not exist yet on first build
  }

  const heroHeadline = locale === 'de'
    ? { line1: 'Ihre Vision.', highlight: 'Unsere Expertise.', line2: 'Perfekte Umsetzung.' }
    : locale === 'ru'
      ? { line1: 'Ваше видение.', highlight: 'Наша экспертиза.', line2: 'Идеальная реализация.' }
      : { line1: 'Your Vision.', highlight: 'Our Expertise.', line2: 'Perfect Execution.' }

  const heroSub = locale === 'de'
    ? 'Wir setzen Ihre individuellen Wuensche professionell um — von der ersten Idee bis zum fertigen Produkt.'
    : locale === 'ru'
      ? 'Мы профессионально реализуем ваши индивидуальные пожелания — от первой идеи до готового продукта.'
      : 'We professionally implement your individual requirements — from the first idea to the finished product.'

  return (
    <>
      <OrganizationSchema />

      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center bg-dark px-4 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-block rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1 text-sm text-gold-400">
            {locale === 'de' ? 'Kreativagentur aus Wien' : locale === 'ru' ? 'Креативное агентство из Вены' : 'Creative Agency from Vienna'}
          </p>
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
            {heroHeadline.line1}{' '}
            <span className="text-gold-400">{heroHeadline.highlight}</span>{' '}
            {heroHeadline.line2}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300 md:text-xl">
            {heroSub}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href={`/${locale}/kontakt`}
              className="rounded-lg bg-gold-500 px-8 py-3 font-semibold text-white transition hover:bg-gold-600"
            >
              {locale === 'de' ? 'Kostenloses Erstgespraech' : locale === 'ru' ? 'Бесплатная консультация' : 'Free Consultation'}
            </Link>
            <Link
              href={`/${locale}/referenzen`}
              className="rounded-lg border border-white/20 px-8 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              {locale === 'de' ? 'Unsere Arbeiten ansehen' : locale === 'ru' ? 'Наши работы' : 'View Our Work'}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-dark-light px-4 py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.value} className="text-center">
              <p className="text-3xl font-bold text-gold-400 md:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-400">{loc(stat.label, locale)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            {locale === 'de' ? 'Was wir fuer Sie tun koennen' : locale === 'ru' ? 'Что мы можем для вас сделать' : 'What we can do for you'}
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-muted">{t.services.subtitle}</p>
          {services.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service: any) => (
                <Link
                  key={service.id as string}
                  href={`/${locale}/leistungen/${service.slug as string}`}
                  className="group rounded-xl border border-gray-100 p-6 transition hover:border-gold-200 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gold-50 transition group-hover:bg-gold-100">
                    <span className="text-2xl text-gold-500">&#9733;</span>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold group-hover:text-gold-600">{service.title as string}</h3>
                  {service.excerpt && <p className="line-clamp-2 text-muted">{service.excerpt as string}</p>}
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: 'palette', title: 'Branding', desc: locale === 'de' ? 'Markenstrategie & Corporate Identity entwickeln.' : 'Brand strategy & corporate identity development.' },
                { icon: 'globe', title: 'Webdesign', desc: locale === 'de' ? 'Moderne Websites & Online-Shops die konvertieren.' : 'Modern websites & online shops that convert.' },
                { icon: 'search', title: 'SEO', desc: locale === 'de' ? 'Suchmaschinenoptimierung fuer mehr Sichtbarkeit.' : 'Search engine optimization for more visibility.' },
                { icon: 'code', title: 'Software', desc: locale === 'de' ? 'Web Apps, Mobile Apps & Cloud-Loesungen.' : 'Web apps, mobile apps & cloud solutions.' },
              ].map((service) => (
                <Link key={service.title} href={`/${locale}/leistungen`} className="group rounded-xl border border-gray-100 p-6 transition hover:border-gold-200 hover:shadow-lg">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gold-50">
                    <span className="text-2xl text-gold-500">&#9733;</span>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold group-hover:text-gold-600">{service.title}</h3>
                  <p className="text-muted">{service.desc}</p>
                </Link>
              ))}
            </div>
          )}
          <div className="mt-12 text-center">
            <Link
              href={`/${locale}/leistungen`}
              className="inline-block rounded-lg border border-gold-500 px-8 py-3 font-semibold text-gold-600 transition hover:bg-gold-500 hover:text-white"
            >
              {locale === 'de' ? 'Alle Leistungen entdecken' : locale === 'ru' ? 'Все услуги' : 'Discover All Services'}
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-50 px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            {locale === 'de' ? 'Unser Prozess' : locale === 'ru' ? 'Наш процесс' : 'Our Process'}
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-muted">
            {locale === 'de' ? 'Strukturiert, transparent und effizient — so arbeiten wir.' : locale === 'ru' ? 'Структурно, прозрачно и эффективно.' : 'Structured, transparent, and efficient.'}
          </p>
          <div className="grid gap-8 md:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold-500 text-lg font-bold text-white">
                  {step.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{loc(step.title, locale)}</h3>
                <p className="text-sm text-muted">{loc(step.desc, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      {caseStudies.length > 0 && (
        <section className="px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">{t.referenzen.title}</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {caseStudies.map((cs: any) => (
                <Link
                  key={cs.id as string}
                  href={`/${locale}/referenzen/${cs.slug as string}`}
                  className="group rounded-xl border border-gray-100 p-6 transition hover:border-gold-200 hover:shadow-lg"
                >
                  <p className="mb-2 text-sm font-medium text-gold-600">{cs.client as string}</p>
                  <h3 className="mb-3 text-xl font-semibold group-hover:text-gold-600">{cs.title as string}</h3>
                  {cs.results && (cs.results as any[]).length > 0 && (
                    <div className="flex flex-wrap gap-4">
                      {(cs.results as any[]).slice(0, 3).map((r: any, i: number) => (
                        <div key={i} className="rounded-lg bg-gray-50 px-3 py-1">
                          <span className="font-bold text-gold-600">{r.value}</span>{' '}
                          <span className="text-xs text-muted">{r.metric}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href={`/${locale}/referenzen`}
                className="inline-block rounded-lg border border-gold-500 px-8 py-3 font-semibold text-gold-600 transition hover:bg-gold-500 hover:text-white"
              >
                {t.common.viewAll}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="bg-gray-50 px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              {locale === 'de' ? 'Was unsere Kunden sagen' : locale === 'ru' ? 'Что говорят наши клиенты' : 'What our clients say'}
            </h2>
            <p className="mx-auto mb-16 max-w-2xl text-center text-muted">
              {locale === 'de' ? 'Ueber 50 zufriedene Kunden vertrauen auf unsere Expertise.' : locale === 'ru' ? 'Более 50 довольных клиентов доверяют нашей экспертизе.' : 'Over 50 satisfied clients trust our expertise.'}
            </p>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial: any) => (
                <div key={testimonial.id as string} className="rounded-xl border border-gray-100 bg-white p-6">
                  {testimonial.rating && (
                    <div className="mb-3 text-gold-400">
                      {'★'.repeat(testimonial.rating as number)}{'☆'.repeat(5 - (testimonial.rating as number))}
                    </div>
                  )}
                  <p className="mb-6 italic text-muted">&ldquo;{testimonial.quote as string}&rdquo;</p>
                  <div>
                    <p className="font-semibold">{testimonial.author as string}</p>
                    {testimonial.company && <p className="text-sm text-muted">{testimonial.company as string}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Blog Posts */}
      {posts.length > 0 && (
        <section className="px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">{t.home.blogTitle}</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {posts.map((post: any) => (
                <Link
                  key={post.id as string}
                  href={`/${locale}/blog/${post.slug as string}`}
                  className="group rounded-xl border border-gray-100 p-6 transition hover:border-gold-200 hover:shadow-lg"
                >
                  <h3 className="mb-2 text-xl font-semibold group-hover:text-gold-600">{post.title as string}</h3>
                  {post.excerpt && <p className="mb-4 line-clamp-2 text-muted">{post.excerpt as string}</p>}
                  {post.publishedDate && <p className="text-sm text-muted">{formatDate(post.publishedDate as string, locale)}</p>}
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href={`/${locale}/blog`}
                className="inline-block rounded-lg border border-gold-500 px-8 py-3 font-semibold text-gold-600 transition hover:bg-gold-500 hover:text-white"
              >
                {t.common.viewAll}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-dark px-4 py-24 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {locale === 'de' ? 'Erzaehlen Sie uns von Ihrer Idee' : locale === 'ru' ? 'Расскажите нам о вашей идее' : 'Tell us about your idea'}
          </h2>
          <p className="mb-8 text-gray-300">
            {locale === 'de' ? 'Jedes grosse Projekt beginnt mit einem Gespraech. Erzaehlen Sie uns, was Sie sich vorstellen — wir zeigen Ihnen, wie wir es umsetzen koennen.' : locale === 'ru' ? 'Каждый большой проект начинается с разговора. Расскажите нам, что вы себе представляете.' : 'Every great project starts with a conversation. Tell us what you envision — we will show you how we can make it happen.'}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href={`/${locale}/kontakt`}
              className="inline-block rounded-lg bg-gold-500 px-8 py-3 font-semibold text-white transition hover:bg-gold-600"
            >
              {locale === 'de' ? 'Kostenloses Erstgespraech vereinbaren' : locale === 'ru' ? 'Записаться на бесплатную консультацию' : 'Book a Free Consultation'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
