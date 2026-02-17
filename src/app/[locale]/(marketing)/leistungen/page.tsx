import type { ComponentType } from 'react'
import { Metadata } from 'next'
import { Link } from '@/lib/i18n-navigation'
import { ArrowRight, Palette, Globe, Search, LineChart, Camera, Code, CheckCircle2, Users, Target, Zap, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getServices, getServicesOverviewPage, type SupportedLocale } from '@/lib/payload'
import { getServiceTranslationRu } from '@/lib/translations/services-ru'
import { BreadcrumbSchema, ServiceListSchema } from '@/components/seo/schemas'
import { AggregateRatingSchema, HowToSchema } from '@/components/seo/json-ld'
import NextLink from 'next/link'
import { getServiceUrl } from '@/lib/utils'
import { FAQSection } from '@/components/sections/faq-section'
import { ProcessExpandingRows } from '@/components/process-sections/ProcessExpandingRows'
import { getTranslations } from 'next-intl/server'
import { getCanonicalUrl, getHreflangAlternates, getOpenGraphConfig, getContactUrl } from '@/lib/utils'
import { Container } from '@/components/ui/container'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 60

interface Feature {
  id?: string
  title: string
  description?: string
}

// Default content for fallback
const defaultContent = {
  de: {
    heroTitle: 'Unsere Leistungen',
    heroSubtitle: 'Ganzheitliche Lösungen für Ihren digitalen Erfolg',
    heroDescription: 'Von der ersten Markenidee bis zum fertigen Produkt begleiten wir Sie auf Ihrem Weg zum digitalen Erfolg. Unsere Experten in Wien, Dubai und California entwickeln maßgeschneiderte Strategien, die messbare Ergebnisse liefern.',
    introTitle: 'Warum GoldenWing?',
    introText: 'Seit 2019 unterstützen wir Unternehmen dabei, ihre digitale Präsenz zu transformieren. Was uns unterscheidet: Wir denken nicht in Einzelleistungen, sondern in Gesamtlösungen. Jedes Projekt beginnt mit einem tiefen Verständnis Ihrer Ziele und endet mit messbaren Ergebnissen. Unser Team vereint strategisches Denken mit handwerklicher Exzellenz – von der Markenpositionierung über das Webdesign bis zur Performance-Optimierung.',
    stats: [
      { value: '100+', label: 'Erfolgreiche Projekte' },
      { value: '13+', label: 'Jahre Erfahrung' },
      { value: '3', label: 'Standorte weltweit' },
      { value: '95%', label: 'Kundenzufriedenheit' },
    ],
    processTitle: 'Unser Arbeitsprozess',
    processSubtitle: 'Strukturiert, transparent und ergebnisorientiert',
    process: [
      { step: '01', title: 'Discovery', description: 'Wir analysieren Ihre Ziele, Zielgruppen und Wettbewerber. In einem Workshop erarbeiten wir gemeinsam die strategische Grundlage für Ihr Projekt.' },
      { step: '02', title: 'Strategie', description: 'Basierend auf den Erkenntnissen entwickeln wir eine maßgeschneiderte Strategie mit klaren Meilensteinen, KPIs und einem realistischen Zeitplan.' },
      { step: '03', title: 'Kreation', description: 'Unser Kreativteam setzt die Strategie in hochwertige Designs und Inhalte um. Regelmäßige Abstimmungen stellen sicher, dass wir Ihre Vision treffen.' },
      { step: '04', title: 'Umsetzung', description: 'Entwickler und Spezialisten bringen die Konzepte in die Realität. Qualitätssicherung und Testing garantieren einwandfreie Ergebnisse.' },
      { step: '05', title: 'Launch & Optimierung', description: 'Nach dem erfolgreichen Launch analysieren wir kontinuierlich die Performance und optimieren für nachhaltigen Erfolg.' },
    ],
    benefitsTitle: 'Was Sie von uns erwarten können',
    benefits: [
      { icon: 'target', title: 'Strategischer Fokus', description: 'Jede Maßnahme dient einem klaren Ziel. Wir investieren Zeit in Strategie, damit die Umsetzung sitzt.' },
      { icon: 'users', title: 'Persönliche Betreuung', description: 'Ein fester Ansprechpartner kennt Ihr Projekt in- und auswendig. Keine Warteschleifen, direkte Kommunikation.' },
      { icon: 'zap', title: 'Schnelle Umsetzung', description: 'Agile Methoden und eingespieltes Team ermöglichen kurze Durchlaufzeiten ohne Qualitätsverlust.' },
      { icon: 'shield', title: 'Transparente Preise', description: 'Faire Festpreise oder transparente Stundensätze. Keine versteckten Kosten, keine bösen Überraschungen.' },
    ],
    servicesTitle: 'Unsere Kernleistungen',
    servicesSubtitle: 'Spezialisiert auf das, was wirklich zählt',
    packagesTitle: 'Service-Pakete',
    packagesSubtitle: 'Kombinierte Leistungen für maximale Wirkung',
    packagesDescription: 'Unsere Pakete bündeln die wichtigsten Services zu attraktiven Konditionen. Ideal für Unternehmen, die einen ganzheitlichen Ansatz suchen.',
    packagesButton: 'Pakete entdecken',
    faqTitle: 'Häufige Fragen zu unseren Leistungen',
    faqs: [
      { question: 'Wie läuft eine typische Zusammenarbeit ab?', answer: 'Jedes Projekt startet mit einem kostenlosen Erstgespräch, in dem wir Ihre Ziele und Anforderungen verstehen. Danach erstellen wir ein detailliertes Angebot mit Zeitplan. Nach Beauftragung arbeiten wir in definierten Phasen mit regelmäßigen Abstimmungen. Sie haben jederzeit volle Transparenz über den Projektfortschritt.' },
      { question: 'Was unterscheidet GoldenWing von anderen Agenturen?', answer: 'Drei Dinge: Erstens denken wir ganzheitlich – von der Strategie bis zur Umsetzung aus einer Hand. Zweitens sind wir inhabergeführt, was kurze Entscheidungswege und persönliche Betreuung garantiert. Drittens kombinieren wir internationales Know-how (Wien, Dubai, California) mit lokaler Expertise.' },
      { question: 'Für welche Unternehmensgrößen arbeiten Sie?', answer: 'Wir arbeiten mit ambitionierten Unternehmen jeder Größe – vom Startup über den Mittelstand bis zum Konzern. Entscheidend ist nicht die Unternehmensgröße, sondern der Anspruch an Qualität und die Bereitschaft zur partnerschaftlichen Zusammenarbeit.' },
      { question: 'Wie lange dauert ein typisches Projekt?', answer: 'Das hängt stark vom Umfang ab. Ein Branding-Projekt dauert typischerweise 6-8 Wochen, eine Website 8-12 Wochen. Komplexe Projekte mit mehreren Komponenten können 3-6 Monate in Anspruch nehmen. Wir erstellen für jedes Projekt einen realistischen Zeitplan.' },
      { question: 'Bieten Sie auch laufende Betreuung an?', answer: 'Ja, viele Kunden schätzen unsere Retainer-Modelle für kontinuierliche Betreuung: SEO-Management, Content-Erstellung, Performance-Marketing oder technische Wartung. So bleiben Sie flexibel und haben immer Zugriff auf unser Expertenwissen.' },
    ],
    ctaTitle: 'Bereit für Ihr nächstes Projekt?',
    ctaDescription: 'Lassen Sie uns in einem unverbindlichen Gespräch herausfinden, wie wir Ihnen helfen können. Wir freuen uns darauf, Sie kennenzulernen.',
    ctaButton: 'Kostenloses Erstgespräch buchen',
  },
  en: {
    heroTitle: 'Our Services',
    heroSubtitle: 'Holistic solutions for your digital success',
    heroDescription: 'From the first brand idea to the finished product, we accompany you on your path to digital success. Our experts in Vienna, Dubai, and California develop customized strategies that deliver measurable results.',
    introTitle: 'Why GoldenWing?',
    introText: 'Since 2019, we have been helping companies transform their digital presence. What sets us apart: We don\'t think in individual services, but in complete solutions. Every project starts with a deep understanding of your goals and ends with measurable results. Our team combines strategic thinking with craftsmanship excellence – from brand positioning to web design to performance optimization.',
    stats: [
      { value: '100+', label: 'Successful Projects' },
      { value: '13+', label: 'Years Experience' },
      { value: '3', label: 'Locations Worldwide' },
      { value: '95%', label: 'Client Satisfaction' },
    ],
    processTitle: 'Our Work Process',
    processSubtitle: 'Structured, transparent and results-oriented',
    process: [
      { step: '01', title: 'Discovery', description: 'We analyze your goals, target audiences, and competitors. In a workshop, we jointly develop the strategic foundation for your project.' },
      { step: '02', title: 'Strategy', description: 'Based on insights, we develop a customized strategy with clear milestones, KPIs, and a realistic timeline.' },
      { step: '03', title: 'Creation', description: 'Our creative team translates strategy into high-quality designs and content. Regular check-ins ensure we hit your vision.' },
      { step: '04', title: 'Implementation', description: 'Developers and specialists bring concepts to reality. Quality assurance and testing guarantee flawless results.' },
      { step: '05', title: 'Launch & Optimization', description: 'After successful launch, we continuously analyze performance and optimize for sustainable success.' },
    ],
    benefitsTitle: 'What You Can Expect From Us',
    benefits: [
      { icon: 'target', title: 'Strategic Focus', description: 'Every action serves a clear goal. We invest time in strategy so implementation hits the mark.' },
      { icon: 'users', title: 'Personal Support', description: 'A dedicated contact knows your project inside out. No queues, direct communication.' },
      { icon: 'zap', title: 'Fast Execution', description: 'Agile methods and experienced team enable short turnaround times without quality loss.' },
      { icon: 'shield', title: 'Transparent Pricing', description: 'Fair fixed prices or transparent hourly rates. No hidden costs, no nasty surprises.' },
    ],
    servicesTitle: 'Our Core Services',
    servicesSubtitle: 'Specialized in what really matters',
    packagesTitle: 'Service Packages',
    packagesSubtitle: 'Combined services for maximum impact',
    packagesDescription: 'Our packages bundle the most important services at attractive rates. Ideal for companies seeking a holistic approach.',
    packagesButton: 'Discover Packages',
    faqTitle: 'Frequently Asked Questions About Our Services',
    faqs: [
      { question: 'How does a typical collaboration work?', answer: 'Every project starts with a free initial consultation where we understand your goals and requirements. Then we create a detailed proposal with timeline. After commissioning, we work in defined phases with regular check-ins. You have full transparency on project progress at all times.' },
      { question: 'What sets GoldenWing apart from other agencies?', answer: 'Three things: First, we think holistically – from strategy to implementation under one roof. Second, we are owner-managed, which guarantees short decision paths and personal support. Third, we combine international know-how (Vienna, Dubai, California) with local expertise.' },
      { question: 'What company sizes do you work with?', answer: 'We work with ambitious companies of all sizes – from startups to mid-sized companies to corporations. What matters is not company size, but the commitment to quality and willingness for partnership collaboration.' },
      { question: 'How long does a typical project take?', answer: 'This depends heavily on scope. A branding project typically takes 6-8 weeks, a website 8-12 weeks. Complex projects with multiple components can take 3-6 months. We create a realistic timeline for each project.' },
      { question: 'Do you also offer ongoing support?', answer: 'Yes, many clients appreciate our retainer models for continuous support: SEO management, content creation, performance marketing, or technical maintenance. This keeps you flexible and always gives you access to our expertise.' },
    ],
    ctaTitle: 'Ready for your next project?',
    ctaDescription: 'Let\'s find out how we can help you in a no-obligation conversation. We look forward to meeting you.',
    ctaButton: 'Free Initial Consultation',
  },
  ru: {
    heroTitle: 'Наши услуги',
    heroSubtitle: 'Комплексные решения для вашего цифрового успеха',
    heroDescription: 'От первой идеи бренда до готового продукта мы сопровождаем вас на пути к цифровому успеху. Наши эксперты в Вене, Дубае и Калифорнии разрабатывают индивидуальные стратегии, которые приносят измеримые результаты.',
    introTitle: 'Почему GoldenWing?',
    introText: 'С 2019 года мы помогаем компаниям трансформировать их цифровое присутствие. Что нас отличает: мы мыслим не отдельными услугами, а комплексными решениями. Каждый проект начинается с глубокого понимания ваших целей и заканчивается измеримыми результатами.',
    stats: [
      { value: '100+', label: 'Успешных проектов' },
      { value: '13+', label: 'Лет опыта' },
      { value: '3', label: 'Локации по всему миру' },
      { value: '95%', label: 'Удовлетворённость клиентов' },
    ],
    processTitle: 'Наш рабочий процесс',
    processSubtitle: 'Структурированный, прозрачный и ориентированный на результат',
    process: [
      { step: '01', title: 'Исследование', description: 'Мы анализируем ваши цели, целевые аудитории и конкурентов.' },
      { step: '02', title: 'Стратегия', description: 'На основе полученных данных мы разрабатываем индивидуальную стратегию.' },
      { step: '03', title: 'Создание', description: 'Наша креативная команда воплощает стратегию в качественный дизайн.' },
      { step: '04', title: 'Реализация', description: 'Разработчики и специалисты воплощают концепции в реальность.' },
      { step: '05', title: 'Запуск и оптимизация', description: 'После успешного запуска мы постоянно анализируем результаты.' },
    ],
    benefitsTitle: 'Что вы можете от нас ожидать',
    benefits: [
      { icon: 'target', title: 'Стратегический фокус', description: 'Каждое действие служит чёткой цели.' },
      { icon: 'users', title: 'Персональная поддержка', description: 'Выделенный контакт знает ваш проект изнутри.' },
      { icon: 'zap', title: 'Быстрое выполнение', description: 'Agile методы и опытная команда.' },
      { icon: 'shield', title: 'Прозрачное ценообразование', description: 'Справедливые фиксированные цены.' },
    ],
    servicesTitle: 'Наши основные услуги',
    servicesSubtitle: 'Специализация на том, что действительно важно',
    packagesTitle: 'Пакеты услуг',
    packagesSubtitle: 'Комбинированные услуги для максимального эффекта',
    packagesDescription: 'Наши пакеты объединяют важнейшие услуги по привлекательным ценам.',
    packagesButton: 'Узнать о пакетах',
    faqTitle: 'Часто задаваемые вопросы о наших услугах',
    faqs: [
      { question: 'Как проходит типичное сотрудничество?', answer: 'Каждый проект начинается с бесплатной первичной консультации.' },
      { question: 'Что отличает GoldenWing от других агентств?', answer: 'Три вещи: комплексный подход, собственное управление, международный опыт.' },
      { question: 'С какими компаниями вы работаете?', answer: 'Мы работаем с амбициозными компаниями любого размера.' },
      { question: 'Сколько времени занимает типичный проект?', answer: 'Это сильно зависит от объёма. Брендинг: 6-8 недель, веб-сайт: 8-12 недель.' },
      { question: 'Предлагаете ли вы постоянную поддержку?', answer: 'Да, многие клиенты ценят наши модели абонентского обслуживания.' },
    ],
    ctaTitle: 'Готовы к вашему следующему проекту?',
    ctaDescription: 'Давайте в необязательном разговоре выясним, как мы можем вам помочь.',
    ctaButton: 'Бесплатная первичная консультация',
  },
}

const defaultSEO = {
  de: {
    title: 'Leistungen | Branding, Webdesign & SEO Services Wien',
    description: 'Agentur-Leistungen in Wien: Branding, Webdesign, SEO, Digital Marketing & Software-Entwicklung. Über 100 erfolgreiche Projekte seit 2019.',
    keywords: ['Webdesign Wien', 'Branding Agentur Wien', 'SEO Agentur Österreich', 'Digital Marketing Services', 'Kreativagentur Wien'],
  },
  en: {
    title: 'Services | Branding, Web Design & SEO Services Vienna',
    description: 'Agency services in Vienna: Branding, web design, SEO, digital marketing & software development. Over 100 successful projects since 2019.',
    keywords: ['Web Design Vienna', 'Branding Agency Vienna', 'SEO Agency Austria', 'Digital Marketing Services', 'Creative Agency Vienna'],
  },
  ru: {
    title: 'Услуги | Брендинг, Веб-дизайн и SEO Услуги Вена',
    description: 'Профессиональные агентские услуги в Вене: брендинг, веб-дизайн, SEO, цифровой маркетинг и разработка программного обеспечения. Более 100 успешных проектов с 2019 года.',
    keywords: ['Веб-дизайн Вена', 'Брендинг агентство Вена', 'SEO агентство Австрия', 'Услуги цифрового маркетинга', 'Креативное агентство Вена'],
  },
}

// Icon mapping
const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  palette: Palette,
  globe: Globe,
  search: Search,
  'line-chart': LineChart,
  camera: Camera,
  code: Code,
  target: Target,
  users: Users,
  zap: Zap,
  shield: Shield,
}

function getIcon(iconName: string) {
  return iconMap[iconName] || Palette
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const page = await getServicesOverviewPage(locale)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sp = page as Record<string, any> | null
  const defaults = defaultSEO[locale] || defaultSEO.de
  const hreflangAlternates = getHreflangAlternates('/leistungen')

  const title = sp?.seo?.metaTitle || defaults.title
  const description = sp?.seo?.metaDescription || defaults.description
  const keywords = sp?.seo?.keywords?.split(',').map((k: string) => k.trim()) || defaults.keywords

  return {
    title,
    description,
    keywords,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: getOpenGraphConfig({
      title: title.split(' | ')[0] + ' | GoldenWing Creative Studios',
      description,
      url: getCanonicalUrl('/leistungen', locale),
      locale: locale as 'de' | 'en',
    }),
    alternates: {
      canonical: getCanonicalUrl('/leistungen', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const tCommon = await getTranslations({ locale, namespace: 'common' })
  const servicesRaw = await getServices(locale)
  const page = await getServicesOverviewPage(locale)

  // Apply Russian translations to services when locale is 'ru'
  const services = locale === 'ru' && servicesRaw
    ? servicesRaw.map(service => {
        const ruTranslation = getServiceTranslationRu(service.slug)
        if (ruTranslation) {
          return {
            ...service,
            title: ruTranslation.title || service.title,
            subtitle: ruTranslation.subtitle || service.subtitle,
            description: ruTranslation.description || service.description,
          }
        }
        return service
      })
    : servicesRaw
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sp = page as Record<string, any> | null
  const defaults = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']

  // Build content from CMS or defaults
  const content = {
    heroTitle: sp?.heroTitle || defaults.heroTitle,
    heroSubtitle: sp?.heroSubtitle || defaults.heroSubtitle,
    heroDescription: sp?.heroDescription || defaults.heroDescription,
    introTitle: sp?.introTitle || defaults.introTitle,
    introText: sp?.introText || defaults.introText,
    stats: sp?.stats?.length ? sp.stats : defaults.stats,
    processTitle: sp?.processTitle || defaults.processTitle,
    processSubtitle: sp?.processSubtitle || defaults.processSubtitle,
    process: sp?.process?.length ? sp.process : defaults.process,
    benefitsTitle: sp?.benefitsTitle || defaults.benefitsTitle,
    benefits: sp?.benefits?.length
      ? sp.benefits.map((b: { icon: string; title: string; description: string }) => ({
          icon: iconMap[b.icon] || Target,
          title: b.title,
          description: b.description,
        }))
      : defaults.benefits.map((b) => ({ icon: iconMap[b.icon] || Target, title: b.title, description: b.description })),
    servicesTitle: sp?.servicesTitle || defaults.servicesTitle,
    servicesSubtitle: sp?.servicesSubtitle || defaults.servicesSubtitle,
    packagesTitle: sp?.packagesTitle || defaults.packagesTitle,
    packagesSubtitle: sp?.packagesSubtitle || defaults.packagesSubtitle,
    packagesDescription: sp?.packagesDescription || defaults.packagesDescription,
    packagesButton: sp?.packagesButton || defaults.packagesButton,
    faqTitle: sp?.faqTitle || defaults.faqTitle,
    faqs: sp?.faqs?.length ? sp.faqs : defaults.faqs,
    ctaTitle: sp?.ctaTitle || defaults.ctaTitle,
    ctaDescription: sp?.ctaDescription || defaults.ctaDescription,
    ctaButton: sp?.ctaButton || defaults.ctaButton,
  }

  // Prepare services for schema
  const servicesForSchema = services.map((service) => ({
    name: service.title,
    description: service.description || '',
    url: `/${locale}/leistungen/${service.slug}`,
  }))

  return (
    <>
      {/* Schema Markup - FAQ Schema wird automatisch von FAQSection gerendert */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `/${locale}` },
          { name: content.heroTitle, url: `/${locale}/leistungen` },
        ]}
      />
      <ServiceListSchema services={servicesForSchema} />
      {/* AggregateRating for Organization - Builds trust in SERP */}
      <AggregateRatingSchema
        ratingValue={4.9}
        ratingCount={47}
      />
      {/* HowTo Schema for Process - Rich Results */}
      <HowToSchema
        name={({ de: 'Wie wir Projekte umsetzen', en: 'How We Deliver Projects', ru: 'Как мы реализуем проекты' } as Record<'de' | 'en' | 'ru', string>)[locale as 'de' | 'en' | 'ru'] || 'How We Deliver Projects'}
        description={({ de: 'Unser bewährter 5-Schritte-Prozess für erfolgreiche Projekte.', en: 'Our proven 5-step process for successful projects.', ru: 'Наш проверенный 5-шаговый процесс для успешных проектов.' } as Record<'de' | 'en' | 'ru', string>)[locale as 'de' | 'en' | 'ru'] || 'Our proven 5-step process for successful projects.'}
        steps={content.process.map((step: { title: string; description: string }) => ({
          name: step.title,
          text: step.description,
        }))}
      />

      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <Container variant="block">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {content.heroTitle}
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground mb-4">
              {content.heroSubtitle}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {content.heroDescription}
            </p>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <Container variant="block">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {content.stats.map((stat: { value: string; label: string }, index: number) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Introduction / Why GoldenWing */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">{content.introTitle}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {content.introText}
            </p>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-muted/30">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{content.servicesTitle}</h2>
            <p className="text-lg text-muted-foreground">{content.servicesSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = getIcon(service.icon)
              return (
                <div
                  key={service.id}
                  className="group bg-background rounded-xl border p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {service.features.slice(0, 5).map((feature: Feature | string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                          {typeof feature === 'string' ? feature : feature.title}
                        </li>
                      ))}
                    </ul>
                  )}
                  <NextLink
                    href={getServiceUrl(service.slug, locale)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
                  >
                    {tCommon('learnMore')}
                    <ArrowRight className="h-4 w-4" />
                  </NextLink>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Additional Services Section */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {locale === 'de' ? 'Weitere Leistungen' : locale === 'ru' ? 'Дополнительные услуги' : 'Additional Services'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {locale === 'de'
                ? 'Spezialisierte Services für spezifische Anforderungen.'
                : locale === 'ru'
                ? 'Специализированные услуги для конкретных требований.'
                : 'Specialized services for specific requirements.'}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { href: '/leistungen/grafikdesign', de: 'Grafikdesign', en: 'Graphic Design', ru: 'Графический дизайн' },
              { href: '/leistungen/seo-texter', de: 'SEO Texter', en: 'SEO Copywriter', ru: 'SEO копирайтер' },
              { href: '/leistungen/seo-berater', de: 'SEO Berater', en: 'SEO Consultant', ru: 'SEO консультант' },
              { href: '/leistungen/seo-betreuung', de: 'SEO Betreuung', en: 'SEO Support', ru: 'SEO поддержка' },
              { href: '/leistungen/sea-agentur', de: 'SEA Agentur', en: 'SEA Agency', ru: 'SEA агентство' },
              { href: '/leistungen/google-ads-agentur', de: 'Google Ads Agentur', en: 'Google Ads Agency', ru: 'Google Ads агентство' },
              { href: '/leistungen/ecommerce-agentur', de: 'E-Commerce Agentur', en: 'E-Commerce Agency', ru: 'E-Commerce агентство' },
              { href: '/leistungen/onlineshop-agentur', de: 'Onlineshop Agentur', en: 'Online Shop Agency', ru: 'Агентство интернет-магазинов' },
              { href: '/leistungen/wordpress-agentur', de: 'WordPress Agentur', en: 'WordPress Agency', ru: 'WordPress агентство' },
              { href: '/leistungen/social-media-agentur', de: 'Social Media Agentur', en: 'Social Media Agency', ru: 'SMM агентство' },
              { href: '/leistungen/geo-optimierung', de: 'GEO Optimierung', en: 'GEO Optimization', ru: 'GEO оптимизация' },
            ].map((item) => (
              <Link key={item.href} href={item.href as '/'} className="p-4 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-colors text-center">
                <span className="text-sm font-medium">{locale === 'de' ? item.de : locale === 'ru' ? item.ru : item.en}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Process Section - ProcessExpandingRows Layout */}
      <ProcessExpandingRows
        title={content.processTitle}
        subtitle={content.processSubtitle}
        steps={content.process.map((s: { step: string; title: string; description: string }) => ({ num: s.step, title: s.title, description: s.description }))}
      />

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <Container variant="block">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">{content.benefitsTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {content.benefits.map((benefit: { icon: ComponentType<{ className?: string }>; title: string; description: string }, index: number) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Packages Teaser */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="bg-muted/50 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{content.packagesTitle}</h2>
            <p className="text-lg text-muted-foreground mb-2">{content.packagesSubtitle}</p>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">{content.packagesDescription}</p>
            <Button size="lg" asChild>
              <Link href="/leistungen/pakete">
                {content.packagesButton}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <FAQSection
        title={content.faqTitle}
        items={content.faqs}
        className="bg-muted/30"
      />

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <Container variant="block" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {content.ctaTitle}
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {content.ctaDescription}
          </p>
          <Button size="lg" variant="secondary" asChild>
            <NextLink href={getContactUrl(locale)}>
              {content.ctaButton}
              <ArrowRight className="ml-2 h-4 w-4" />
            </NextLink>
          </Button>
        </Container>
      </section>
    </>
  )
}
