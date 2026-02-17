import { Metadata } from 'next'
import { getCanonicalUrl, getHreflangAlternates, getSchemaUrl, getContactUrl, getAboutUrl } from '@/lib/utils'
import NextLink from 'next/link'
import { Users, Target, BookOpen, Clock, Coffee, MessageSquare, Shield, ArrowRight, CheckCircle, Calendar, LucideIcon } from 'lucide-react'
import { JsonLd } from '@/components/seo/json-ld'
import { Button } from '@/components/ui/button'
import { getCulturePage, type SupportedLocale } from '@/lib/payload'
import { FAQSection } from '@/components/sections/faq-section'
import { Container } from '@/components/ui/container'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 60

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  'target': Target,
  'users': Users,
  'book-open': BookOpen,
  'clock': Clock,
  'coffee': Coffee,
  'message-square': MessageSquare,
  'calendar': Calendar,
  'shield': Shield,
}

// Default content
const defaultContent = {
  de: {
    title: 'Unsere Kultur',
    subtitle: 'Was uns ausmacht',
    description: 'Unsere Kultur basiert auf dem Prinzip, dass gute Arbeit klare Rahmenbedingungen braucht. Wir schaffen ein Umfeld, in dem jeder Einzelne sein Bestes geben kann – durch Struktur, Vertrauen und gemeinsame Standards.',
    introTitle: 'Warum Kultur entscheidend ist',
    introText: 'Viele Agenturen werben mit kreativem Chaos und dem nächsten großen Wurf. Wir glauben an etwas anderes: Dass nachhaltig gute Ergebnisse aus einer Kultur entstehen, die Fokus, Klarheit und kontinuierliche Verbesserung in den Mittelpunkt stellt. Unsere Kultur ist kein Marketingslogan – sie ist der Grund, warum unsere Kunden und Mitarbeiter langfristig bei uns bleiben.',
    kulturPunkte: [
      { icon: 'target', title: 'Transparente Ziele und Prioritäten', description: 'Jeder im Team kennt die aktuellen Ziele und versteht, warum bestimmte Aufgaben Priorität haben.', details: ['Wöchentliche Team-Updates zu Zielen und Fortschritt', 'Transparente Projekt-Dashboards für alle', 'Offene Diskussion über Prioritätskonflikte'] },
      { icon: 'users', title: 'Klare Zuständigkeiten und Entscheidungswege', description: 'Verantwortlichkeiten sind definiert, Entscheidungen werden nicht aufgeschoben.', details: ['Jedes Projekt hat einen klaren Owner', 'Entscheidungsbefugnisse sind dokumentiert', 'Kurze Wege statt Hierarchie-Ping-Pong'] },
      { icon: 'book-open', title: 'Zeit für Lernen, Austausch und Weiterentwicklung', description: 'Wir investieren bewusst in Wissen und Kompetenz.', details: ['Freitags: Zeit für Weiterbildung', 'Monatliche Skill-Sharing-Sessions', 'Budget für Kurse, Konferenzen und Bücher'] },
      { icon: 'clock', title: 'Planbare Arbeitsweisen statt Ad-hoc-Aktionismus', description: 'Gute Ergebnisse entstehen durch strukturierte Prozesse, nicht durch ständige Feuerwehreinsätze.', details: ['2-Wochen-Sprints mit klaren Deliverables', 'Realistische Zeitschätzungen', 'Puffer für Unvorhergesehenes eingeplant'] },
    ],
    practicesTitle: 'So leben wir unsere Kultur',
    practicesSubtitle: 'Konkrete Praktiken, die unseren Alltag prägen',
    practices: [
      { icon: 'coffee', title: 'Montags-Kickoff', description: 'Jede Woche startet mit einem kurzen Alignment: Was steht an? Wo braucht wer Unterstützung?' },
      { icon: 'message-square', title: 'Offene Feedback-Kultur', description: 'Konstruktives Feedback ist Teil unseres Alltags – nicht nur in Jahresgesprächen.' },
      { icon: 'calendar', title: 'Freitags-Review', description: 'Wöchentlicher Blick zurück: Was lief gut? Was können wir verbessern?' },
      { icon: 'shield', title: 'Dokumentierte Prozesse', description: 'Alles Wichtige ist dokumentiert – so geht kein Wissen verloren und Onboarding ist schnell.' },
    ],
    quote: '"Wir glauben daran, dass Struktur Kreativität nicht einschränkt – sondern erst ermöglicht."',
    quoteAuthor: 'Das GoldenWing Team',
    benefitsTitle: 'Was Sie davon haben',
    benefitsSubtitle: 'Unsere Kultur ist auch Ihre Kultur – als Kunde profitieren Sie direkt',
    benefits: [
      { title: 'Vorhersehbare Ergebnisse', description: 'Strukturierte Prozesse bedeuten weniger Überraschungen und mehr Planbarkeit für Sie.' },
      { title: 'Schnellere Abstimmungen', description: 'Klare Zuständigkeiten heißt: Weniger Meetings, schnellere Entscheidungen.' },
      { title: 'Höhere Qualität', description: 'Zeit für Lernen und Reflexion führt zu besseren Lösungen und weniger Fehlern.' },
      { title: 'Langfristige Partnerschaft', description: 'Zufriedene Mitarbeiter bleiben länger – und kennen Ihre Projekte besser.' },
    ],
    faqTitle: 'Häufige Fragen zu unserer Arbeitsweise',
    faqs: [
      { question: 'Wie flexibel seid ihr bei kurzfristigen Änderungen?', answer: 'Unsere strukturierten Prozesse machen uns flexibler, nicht starrer. Durch klare Prioritäten können wir schnell reagieren, wenn sich Anforderungen ändern.' },
      { question: 'Wie läuft die Kommunikation mit Kunden ab?', answer: 'Jeder Kunde hat einen festen Ansprechpartner. Wir arbeiten mit regelmäßigen Status-Updates und stehen natürlich auch ad-hoc zur Verfügung.' },
      { question: 'Arbeitet ihr remote oder vor Ort?', answer: 'Wir arbeiten hybrid. Unser Kernteam trifft sich regelmäßig in unseren Büros in Wien, Dubai und California.' },
      { question: 'Was unterscheidet eure Kultur von anderen Agenturen?', answer: 'Wir setzen auf klare Strukturen, realistische Planung und Zeit für Qualität statt Chaos und Überstunden.' },
    ],
    ctaTitle: 'Arbeiten Sie mit uns',
    ctaDescription: 'Erfahren Sie mehr über unser Team und wie wir gemeinsam Ihre Projekte umsetzen.',
  },
  en: {
    title: 'Our Culture',
    subtitle: 'What Defines Us',
    description: 'Our culture is based on the principle that good work needs clear frameworks. We create an environment where everyone can do their best – through structure, trust, and shared standards.',
    introTitle: 'Why Culture Matters',
    introText: 'Many agencies advertise creative chaos and the next big thing. We believe in something different: That sustainably good results come from a culture that puts focus, clarity, and continuous improvement at the center.',
    kulturPunkte: [
      { icon: 'target', title: 'Transparent Goals and Priorities', description: 'Everyone on the team knows the current goals and understands why certain tasks have priority.', details: ['Weekly team updates on goals and progress', 'Transparent project dashboards for all', 'Open discussion about priority conflicts'] },
      { icon: 'users', title: 'Clear Responsibilities and Decision Paths', description: 'Responsibilities are defined, decisions are not postponed.', details: ['Every project has a clear owner', 'Decision authorities are documented', 'Short paths instead of hierarchy ping-pong'] },
      { icon: 'book-open', title: 'Time for Learning, Exchange and Development', description: 'We consciously invest in knowledge and competence.', details: ['Fridays: Time for professional development', 'Monthly skill-sharing sessions', 'Budget for courses, conferences, and books'] },
      { icon: 'clock', title: 'Predictable Workflows Instead of Ad-hoc Actions', description: 'Good results come from structured processes, not constant firefighting.', details: ['2-week sprints with clear deliverables', 'Realistic time estimates', 'Buffer for unforeseen issues built in'] },
    ],
    practicesTitle: 'How We Live Our Culture',
    practicesSubtitle: 'Concrete practices that shape our daily work',
    practices: [
      { icon: 'coffee', title: 'Monday Kickoff', description: 'Every week starts with a short alignment: What\'s coming up? Where does someone need support?' },
      { icon: 'message-square', title: 'Open Feedback Culture', description: 'Constructive feedback is part of our daily routine – not just in annual reviews.' },
      { icon: 'calendar', title: 'Friday Review', description: 'Weekly look back: What went well? What can we improve?' },
      { icon: 'shield', title: 'Documented Processes', description: 'Everything important is documented – so no knowledge is lost and onboarding is quick.' },
    ],
    quote: '"We believe that structure doesn\'t limit creativity – it enables it."',
    quoteAuthor: 'The GoldenWing Team',
    benefitsTitle: 'What You Get From This',
    benefitsSubtitle: 'Our culture is also your culture – as a client you benefit directly',
    benefits: [
      { title: 'Predictable Results', description: 'Structured processes mean fewer surprises and more predictability for you.' },
      { title: 'Faster Coordination', description: 'Clear responsibilities means: Fewer meetings, faster decisions.' },
      { title: 'Higher Quality', description: 'Time for learning and reflection leads to better solutions and fewer errors.' },
      { title: 'Long-term Partnership', description: 'Satisfied employees stay longer – and know your projects better.' },
    ],
    faqTitle: 'Frequently Asked Questions About How We Work',
    faqs: [
      { question: 'How flexible are you with short-term changes?', answer: 'Our structured processes make us more flexible, not more rigid. Through clear priorities, we can react quickly when requirements change.' },
      { question: 'How does client communication work?', answer: 'Every client has a dedicated contact person. We work with regular status updates and are of course also available ad-hoc.' },
      { question: 'Do you work remotely or on-site?', answer: 'We work hybrid. Our core team meets regularly in our offices in Vienna, Dubai, and California.' },
      { question: 'What makes your culture different from other agencies?', answer: 'We go for clear structures, realistic planning, and time for quality instead of chaos and overtime.' },
    ],
    ctaTitle: 'Work with Us',
    ctaDescription: 'Learn more about our team and how we implement your projects together.',
  },
  ru: {
    title: 'Наша культура',
    subtitle: 'Что нас определяет',
    description: 'Наша культура основана на принципе, что хорошая работа требует чётких рамок. Мы создаём среду, где каждый может проявить себя наилучшим образом — через структуру, доверие и общие стандарты.',
    introTitle: 'Почему культура важна',
    introText: 'Многие агентства рекламируют творческий хаос и следующий грандиозный прорыв. Мы верим в другое: устойчиво хорошие результаты рождаются из культуры, в центре которой — фокус, ясность и постоянное совершенствование.',
    kulturPunkte: [
      { icon: 'target', title: 'Прозрачные цели и приоритеты', description: 'Каждый в команде знает текущие цели и понимает, почему определённые задачи приоритетны.', details: ['Еженедельные обновления по целям и прогрессу', 'Прозрачные дашборды проектов для всех', 'Открытое обсуждение конфликтов приоритетов'] },
      { icon: 'users', title: 'Чёткие зоны ответственности и пути принятия решений', description: 'Обязанности определены, решения не откладываются.', details: ['Каждый проект имеет чёткого ответственного', 'Полномочия для принятия решений задокументированы', 'Короткие пути вместо иерархического пинг-понга'] },
      { icon: 'book-open', title: 'Время для обучения, обмена опытом и развития', description: 'Мы осознанно инвестируем в знания и компетенции.', details: ['Пятницы: время для профессионального развития', 'Ежемесячные сессии обмена навыками', 'Бюджет на курсы, конференции и книги'] },
      { icon: 'clock', title: 'Планируемые рабочие процессы вместо хаотичных действий', description: 'Хорошие результаты рождаются из структурированных процессов, а не постоянного тушения пожаров.', details: ['2-недельные спринты с чёткими результатами', 'Реалистичные оценки времени', 'Заложен буфер на непредвиденные ситуации'] },
    ],
    practicesTitle: 'Как мы живём нашей культурой',
    practicesSubtitle: 'Конкретные практики, формирующие нашу повседневную работу',
    practices: [
      { icon: 'coffee', title: 'Понедельничный старт', description: 'Каждая неделя начинается с короткой синхронизации: что предстоит? Кому нужна поддержка?' },
      { icon: 'message-square', title: 'Открытая культура обратной связи', description: 'Конструктивная обратная связь — часть нашей повседневности, а не только ежегодных обзоров.' },
      { icon: 'calendar', title: 'Пятничный обзор', description: 'Еженедельный взгляд назад: что прошло хорошо? Что можно улучшить?' },
      { icon: 'shield', title: 'Задокументированные процессы', description: 'Всё важное задокументировано — так знания не теряются, а онбординг проходит быстро.' },
    ],
    quote: '"Мы верим, что структура не ограничивает креативность — она её делает возможной."',
    quoteAuthor: 'Команда GoldenWing',
    benefitsTitle: 'Что это даёт вам',
    benefitsSubtitle: 'Наша культура — это и ваша культура. Как клиент, вы получаете прямую выгоду',
    benefits: [
      { title: 'Предсказуемые результаты', description: 'Структурированные процессы означают меньше сюрпризов и больше планируемости для вас.' },
      { title: 'Быстрые согласования', description: 'Чёткие зоны ответственности означают: меньше встреч, быстрее решения.' },
      { title: 'Высокое качество', description: 'Время на обучение и рефлексию ведёт к лучшим решениям и меньшему количеству ошибок.' },
      { title: 'Долгосрочное партнёрство', description: 'Довольные сотрудники остаются дольше — и лучше знают ваши проекты.' },
    ],
    faqTitle: 'Часто задаваемые вопросы о нашей работе',
    faqs: [
      { question: 'Насколько вы гибки при краткосрочных изменениях?', answer: 'Наши структурированные процессы делают нас более гибкими, а не жёсткими. Благодаря чётким приоритетам мы можем быстро реагировать при изменении требований.' },
      { question: 'Как происходит коммуникация с клиентами?', answer: 'У каждого клиента есть постоянный контактный человек. Мы работаем с регулярными обновлениями статуса и, конечно, также доступны для срочных вопросов.' },
      { question: 'Вы работаете удалённо или в офисе?', answer: 'Мы работаем в гибридном формате. Наша основная команда регулярно встречается в наших офисах в Вене, Дубае и Калифорнии.' },
      { question: 'Чем ваша культура отличается от других агентств?', answer: 'Мы делаем ставку на чёткие структуры, реалистичное планирование и время для качества вместо хаоса и переработок.' },
    ],
    ctaTitle: 'Работайте с нами',
    ctaDescription: 'Узнайте больше о нашей команде и о том, как мы вместе реализуем ваши проекты.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const culturePage = await getCulturePage(locale)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cp = culturePage as Record<string, any> | null
  const defaults = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']
  const canonicalUrl = getCanonicalUrl('/ueber-uns/kultur', locale)
  const hreflangAlternates = getHreflangAlternates('/ueber-uns/kultur')

  const metaTitles: Record<string, string> = {
    de: 'Unsere Kultur | Arbeitsweise bei GoldenWing Creative Studios',
    en: 'Our Culture | How We Work at GoldenWing Creative Studios',
    ru: 'Наша культура | Как мы работаем в GoldenWing Creative Studios',
  }
  const metaDescriptions: Record<string, string> = {
    de: 'Lernen Sie unsere Arbeitskultur kennen: Transparenz, klare Prozesse, Zeit für Weiterentwicklung und planbare Arbeitsweisen.',
    en: 'Discover our work culture: Transparency, clear processes, time for development, and predictable workflows.',
    ru: 'Откройте нашу рабочую культуру: прозрачность, чёткие процессы, время для развития и планируемые рабочие процессы.',
  }
  const metaKeywords: Record<string, string[]> = {
    de: ['Arbeitskultur', 'Agenturkultur', 'Teamarbeit', 'Transparenz', 'Qualität', 'GoldenWing', 'Kreativagentur Wien'],
    en: ['Work culture', 'Agency culture', 'Teamwork', 'Transparency', 'Quality', 'GoldenWing', 'Creative Agency Vienna'],
    ru: ['Рабочая культура', 'Культура агентства', 'Командная работа', 'Прозрачность', 'Качество', 'GoldenWing', 'Креативное агентство'],
  }

  const title = cp?.seo?.metaTitle || metaTitles[locale] || metaTitles.en
  const description = cp?.seo?.metaDescription || metaDescriptions[locale] || metaDescriptions.en

  return {
    title,
    description,
    keywords: metaKeywords[locale] || metaKeywords.en,
    openGraph: {
      title: cp?.heroTitle || defaults.title,
      description,
      type: 'website',
    },
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function KulturPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const culturePage = await getCulturePage(locale)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cp = culturePage as Record<string, any> | null
  const defaults = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']

  // Extract CMS arrays
  type KulturPunkt = { icon?: string; title: string; description: string; details?: Array<{ text: string }> }
  type Practice = { icon?: string; title: string; description: string }
  type Benefit = { title: string; description: string }
  type FAQ = { question: string; answer: string }

  const cmsKulturPunkte = cp?.kulturPunkte as KulturPunkt[] | undefined
  const cmsPractices = cp?.practices as Practice[] | undefined
  const cmsBenefits = cp?.benefits as Benefit[] | undefined
  const cmsFaqs = cp?.faqs as FAQ[] | undefined

  // Build content with fallbacks
  const content = {
    title: cp?.heroTitle || defaults.title,
    subtitle: cp?.heroSubtitle || defaults.subtitle,
    description: cp?.heroDescription || defaults.description,
    introTitle: cp?.introTitle || defaults.introTitle,
    introText: cp?.introText || defaults.introText,
    kulturPunkte: cmsKulturPunkte?.length ? cmsKulturPunkte.map(k => ({
      icon: iconMap[k.icon || 'target'] || Target,
      title: k.title,
      description: k.description,
      details: k.details?.map(d => d.text) || [],
    })) : defaults.kulturPunkte.map(k => ({
      icon: iconMap[k.icon] || Target,
      title: k.title,
      description: k.description,
      details: k.details,
    })),
    practicesTitle: cp?.practicesTitle || defaults.practicesTitle,
    practicesSubtitle: cp?.practicesSubtitle || defaults.practicesSubtitle,
    practices: cmsPractices?.length ? cmsPractices.map(p => ({
      icon: iconMap[p.icon || 'coffee'] || Coffee,
      title: p.title,
      description: p.description,
    })) : defaults.practices.map(p => ({
      icon: iconMap[p.icon] || Coffee,
      title: p.title,
      description: p.description,
    })),
    quote: cp?.quote || defaults.quote,
    quoteAuthor: cp?.quoteAuthor || defaults.quoteAuthor,
    benefitsTitle: cp?.benefitsTitle || defaults.benefitsTitle,
    benefitsSubtitle: cp?.benefitsSubtitle || defaults.benefitsSubtitle,
    benefits: cmsBenefits?.length ? cmsBenefits : defaults.benefits,
    faqTitle: cp?.faqTitle || defaults.faqTitle,
    faqs: cmsFaqs?.length ? cmsFaqs : defaults.faqs,
    ctaTitle: cp?.ctaTitle || defaults.ctaTitle,
    ctaDescription: cp?.ctaDescription || defaults.ctaDescription,
  }

  const aboutLabels: Record<string, string> = { de: 'Über uns', en: 'About Us', ru: 'О нас' }
  const cultureLabels: Record<string, string> = { de: 'Kultur', en: 'Culture', ru: 'Культура' }

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': getSchemaUrl('/', locale) },
      { '@type': 'ListItem', 'position': 2, 'name': aboutLabels[locale] || aboutLabels.en, 'item': getSchemaUrl('/ueber-uns', locale) },
      { '@type': 'ListItem', 'position': 3, 'name': cultureLabels[locale] || cultureLabels.en, 'item': getSchemaUrl('/ueber-uns/kultur', locale) },
    ],
  }

  const schemaNames: Record<string, string> = {
    de: 'Unsere Kultur - GoldenWing Creative Studios',
    en: 'Our Culture - GoldenWing Creative Studios',
    ru: 'Наша культура - GoldenWing Creative Studios',
  }
  const schemaDescriptions: Record<string, string> = {
    de: 'Lernen Sie unsere Arbeitskultur kennen: Transparenz, klare Prozesse, Zeit für Weiterentwicklung und planbare Arbeitsweisen.',
    en: 'Discover our work culture: Transparency, clear processes, time for development, and predictable workflows.',
    ru: 'Откройте нашу рабочую культуру: прозрачность, чёткие процессы, время для развития и планируемые рабочие процессы.',
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': schemaNames[locale] || schemaNames.en,
    'description': schemaDescriptions[locale] || schemaDescriptions.en,
    'url': getSchemaUrl('/ueber-uns/kultur', locale),
    'publisher': {
      '@type': 'Organization',
      'name': 'GoldenWing Creative Studios',
      'url': 'https://goldenwing.at',
      'logo': 'https://goldenwing.at/logo.png',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Czeikestrasse 4/21',
        'addressLocality': 'Wien',
        'postalCode': '1100',
        'addressCountry': 'AT',
      },
    },
    'isPartOf': {
      '@type': 'WebSite',
      'name': 'GoldenWing Creative Studios',
      'url': 'https://goldenwing.at',
    },
  }

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <JsonLd data={webPageSchema} />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-background" />
        <Container variant="block" className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-sm font-medium text-primary mb-4">
              {content.subtitle}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {content.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {content.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Intro Section */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">{content.introTitle}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              {content.introText}
            </p>
          </div>
        </Container>
      </section>

      {/* Kultur Punkte */}
      <section className="py-16 md:py-24 bg-muted/30">
        <Container variant="block">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {content.kulturPunkte.map((punkt, index) => {
              const Icon = punkt.icon
              return (
                <div
                  key={index}
                  className="relative p-8 rounded-2xl border bg-card hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold mb-3">{punkt.title}</h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">{punkt.description}</p>
                      <ul className="space-y-2">
                        {punkt.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Daily Practices */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.practicesTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{content.practicesSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.practices.map((practice, index) => {
              const Icon = practice.icon
              return (
                <div key={index} className="text-center p-6 rounded-xl bg-card border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{practice.title}</h3>
                  <p className="text-sm text-muted-foreground">{practice.description}</p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Quote Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <Container variant="block">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="text-2xl md:text-3xl font-medium italic text-foreground/90 mb-6">
              {content.quote}
            </blockquote>
            <p className="text-muted-foreground">— {content.quoteAuthor}</p>
          </div>
        </Container>
      </section>

      {/* Client Benefits */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.benefitsTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{content.benefitsSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.benefits.map((benefit, index) => (
              <div key={index} className="p-6 rounded-xl bg-card border">
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ Section - Accordion Style */}
      <FAQSection
        title={content.faqTitle}
        subtitle={{ de: 'Antworten auf die häufigsten Fragen.', en: 'Answers to the most common questions.', ru: 'Ответы на самые частые вопросы.' }[locale] || 'Answers to the most common questions.'}
        items={content.faqs}
        className="bg-muted/30"
      />

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.ctaTitle}</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">{content.ctaDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NextLink href={getAboutUrl(locale)}>
                <Button size="lg" variant="secondary">
                  {{ de: 'Mehr über uns', en: 'More About Us', ru: 'Подробнее о нас' }[locale] || 'More About Us'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </NextLink>
              <NextLink href={getContactUrl(locale)}>
                <Button size="lg" variant="outline" className="border-primary-foreground/20 hover:bg-primary-foreground/10">
                  {{ de: 'Kontakt aufnehmen', en: 'Get in Touch', ru: 'Связаться с нами' }[locale] || 'Get in Touch'}
                </Button>
              </NextLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
