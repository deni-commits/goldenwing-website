import type {
  Locale,
  TrustSignal,
  Benefit,
  Package,
  ProcessStep,
  FAQ,
  RelatedService,
  LandingPageContent,
} from '../types'
import { sharedLabels } from '../shared'
import { getCityBySlug } from '../cities'
import { getIndustryBySlug } from '../industries'

// ---------------------------------------------------------------------------
// Trust Signals
// ---------------------------------------------------------------------------
const trustSignals: Record<Locale, TrustSignal[]> = {
  de: [
    { icon: 'award', text: '80+ Marken' },
    { icon: 'star', text: '4.8/5 Bewertung' },
    { icon: 'clock', text: 'Seit 2013' },
  ],
  en: [
    { icon: 'award', text: '80+ Brands' },
    { icon: 'star', text: '4.8/5 Rating' },
    { icon: 'clock', text: 'Since 2013' },
  ],
  ru: [
    { icon: 'award', text: '80+ брендов' },
    { icon: 'star', text: '4.8/5 Рейтинг' },
    { icon: 'clock', text: 'С 2013 года' },
  ],
}

// ---------------------------------------------------------------------------
// Benefits
// ---------------------------------------------------------------------------
const benefits: Record<Locale, Benefit[]> = {
  de: [
    {
      icon: 'fingerprint',
      title: 'Einzigartig',
      description: 'Eine unverwechselbare Markenidentität, die Sie klar von der Konkurrenz abhebt.',
    },
    {
      icon: 'layers',
      title: 'Konsistent',
      description: 'Einheitlicher Markenauftritt über alle Kanäle und Touchpoints hinweg.',
    },
    {
      icon: 'heart',
      title: 'Emotional',
      description: 'Markendesign, das Emotionen weckt und eine starke Verbindung zu Ihrer Zielgruppe schafft.',
    },
    {
      icon: 'badge-check',
      title: 'Professionell',
      description: 'Höchste Qualitätsstandards in Design und Ausführung für einen erstklassigen Auftritt.',
    },
  ],
  en: [
    {
      icon: 'fingerprint',
      title: 'Unique',
      description: 'A distinctive brand identity that clearly sets you apart from the competition.',
    },
    { icon: 'layers', title: 'Consistent', description: 'Unified brand presence across all channels and touchpoints.' },
    {
      icon: 'heart',
      title: 'Emotional',
      description: 'Brand design that evokes emotions and creates a strong connection with your target audience.',
    },
    {
      icon: 'badge-check',
      title: 'Professional',
      description: 'Highest quality standards in design and execution for a first-class appearance.',
    },
  ],
  ru: [
    {
      icon: 'fingerprint',
      title: 'Уникально',
      description: 'Неповторимая идентичность бренда, которая чётко выделяет вас среди конкурентов.',
    },
    {
      icon: 'layers',
      title: 'Последовательно',
      description: 'Единообразное присутствие бренда на всех каналах и точках контакта.',
    },
    {
      icon: 'heart',
      title: 'Эмоционально',
      description: 'Дизайн бренда, который вызывает эмоции и создаёт сильную связь с вашей целевой аудиторией.',
    },
    {
      icon: 'badge-check',
      title: 'Профессионально',
      description: 'Высочайшие стандарты качества в дизайне и исполнении для первоклассного присутствия.',
    },
  ],
}

// ---------------------------------------------------------------------------
// Packages
// ---------------------------------------------------------------------------
const packages: Record<Locale, Package[]> = {
  de: [
    {
      name: 'Logo & Basis',
      price: '€1.500',
      priceType: 'einmalig',
      description: 'Das Fundament Ihrer Marke — professionell und einprägsam.',
      popular: false,
      features: [
        'Logo-Design (3 Konzepte)',
        'Farbpalette',
        'Typografie-Auswahl',
        'Visitenkarten-Design',
        'Logo-Dateien in allen Formaten',
        'Basis-Styleguide',
      ],
    },
    {
      name: 'Corporate Identity',
      price: '€4.000',
      priceType: 'einmalig',
      description: 'Ein vollständiger Markenauftritt für Ihr Unternehmen.',
      popular: true,
      features: [
        'Alles aus Logo & Basis',
        'Vollständiges CI-Manual',
        'Geschäftsausstattung (Briefpapier, Umschläge)',
        'Social-Media-Templates',
        'E-Mail-Signatur-Design',
        'Brand Guidelines',
        'Icon-Set',
        'Präsentations-Template',
      ],
    },
    {
      name: 'Brand Strategy',
      price: 'ab €8.000',
      priceType: 'einmalig',
      description: 'Strategische Markenentwicklung von Grund auf.',
      popular: false,
      features: [
        'Alles aus Corporate Identity',
        'Marktanalyse & Positionierung',
        'Naming & Tagline',
        'Markenstrategie & -story',
        'Brand Book',
        'Launch-Strategie',
        'Tone of Voice Guidelines',
        'Workshop & Beratung',
      ],
    },
  ],
  en: [
    {
      name: 'Logo & Basics',
      price: '€1,500',
      priceType: 'one-time',
      description: 'The foundation of your brand — professional and memorable.',
      popular: false,
      features: [
        'Logo design (3 concepts)',
        'Color palette',
        'Typography selection',
        'Business card design',
        'Logo files in all formats',
        'Basic style guide',
      ],
    },
    {
      name: 'Corporate Identity',
      price: '€4,000',
      priceType: 'one-time',
      description: 'A complete brand presence for your company.',
      popular: true,
      features: [
        'Everything from Logo & Basics',
        'Complete CI manual',
        'Stationery (letterhead, envelopes)',
        'Social media templates',
        'Email signature design',
        'Brand guidelines',
        'Icon set',
        'Presentation template',
      ],
    },
    {
      name: 'Brand Strategy',
      price: 'from €8,000',
      priceType: 'one-time',
      description: 'Strategic brand development from the ground up.',
      popular: false,
      features: [
        'Everything from Corporate Identity',
        'Market analysis & positioning',
        'Naming & tagline',
        'Brand strategy & story',
        'Brand book',
        'Launch strategy',
        'Tone of voice guidelines',
        'Workshop & consulting',
      ],
    },
  ],
  ru: [
    {
      name: 'Логотип и основа',
      price: '€1 500',
      priceType: 'единоразово',
      description: 'Фундамент вашего бренда — профессионально и запоминаемо.',
      popular: false,
      features: [
        'Дизайн логотипа (3 концепции)',
        'Цветовая палитра',
        'Подбор типографики',
        'Дизайн визитных карточек',
        'Файлы логотипа во всех форматах',
        'Базовый стайлгайд',
      ],
    },
    {
      name: 'Корпоративная идентичность',
      price: '€4 000',
      priceType: 'единоразово',
      description: 'Полноценный фирменный стиль для вашей компании.',
      popular: true,
      features: [
        'Всё из пакета «Логотип и основа»',
        'Полный CI-мануал',
        'Деловая документация (бланки, конверты)',
        'Шаблоны для социальных сетей',
        'Дизайн подписи электронной почты',
        'Руководство по бренду',
        'Набор иконок',
        'Шаблон презентации',
      ],
    },
    {
      name: 'Стратегия бренда',
      price: 'от €8 000',
      priceType: 'единоразово',
      description: 'Стратегическое развитие бренда с нуля.',
      popular: false,
      features: [
        'Всё из пакета «Корпоративная идентичность»',
        'Анализ рынка и позиционирование',
        'Нейминг и слоган',
        'Стратегия и история бренда',
        'Брендбук',
        'Стратегия запуска',
        'Руководство по тону коммуникации',
        'Воркшоп и консультации',
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Process
// ---------------------------------------------------------------------------
const processSteps: Record<Locale, ProcessStep[]> = {
  de: [
    {
      step: '01',
      title: 'Analyse',
      description: 'Wir analysieren Ihren Markt, Ihre Zielgruppe und Ihre bestehende Markenwahrnehmung.',
    },
    {
      step: '02',
      title: 'Konzept',
      description: 'Entwicklung der Markenstrategie, Positionierung und visuellen Richtung.',
    },
    {
      step: '03',
      title: 'Design',
      description: 'Gestaltung aller Markenelemente — vom Logo bis zur vollständigen visuellen Identität.',
    },
    {
      step: '04',
      title: 'Finalisierung',
      description: 'Feinschliff, Feedback-Runden und Aufbereitung aller Dateien und Guidelines.',
    },
    {
      step: '05',
      title: 'Implementierung',
      description: 'Unterstützung bei der Umsetzung der neuen Marke über alle Kanäle hinweg.',
    },
  ],
  en: [
    {
      step: '01',
      title: 'Analysis',
      description: 'We analyze your market, target audience, and existing brand perception.',
    },
    { step: '02', title: 'Concept', description: 'Development of brand strategy, positioning, and visual direction.' },
    {
      step: '03',
      title: 'Design',
      description: 'Creation of all brand elements — from logo to complete visual identity.',
    },
    {
      step: '04',
      title: 'Finalization',
      description: 'Refinement, feedback rounds, and preparation of all files and guidelines.',
    },
    { step: '05', title: 'Implementation', description: 'Support in implementing the new brand across all channels.' },
  ],
  ru: [
    {
      step: '01',
      title: 'Анализ',
      description: 'Мы анализируем ваш рынок, целевую аудиторию и текущее восприятие бренда.',
    },
    {
      step: '02',
      title: 'Концепция',
      description: 'Разработка стратегии бренда, позиционирования и визуального направления.',
    },
    {
      step: '03',
      title: 'Дизайн',
      description: 'Создание всех элементов бренда — от логотипа до полной визуальной идентичности.',
    },
    {
      step: '04',
      title: 'Финализация',
      description: 'Доработка, раунды обратной связи и подготовка всех файлов и руководств.',
    },
    { step: '05', title: 'Внедрение', description: 'Поддержка при внедрении нового бренда на всех каналах.' },
  ],
}

// ---------------------------------------------------------------------------
// Related Services
// ---------------------------------------------------------------------------
const relatedServices: Record<Locale, RelatedService[]> = {
  de: [
    {
      title: 'Webdesign',
      description: 'Eine Website, die Ihre neue Marke perfekt repräsentiert.',
      href: '/leistungen/webdesign',
    },
    {
      title: 'Marketing',
      description: 'Bringen Sie Ihre Marke mit gezieltem Marketing in die Welt.',
      href: '/leistungen/marketing',
    },
    { title: 'SEO', description: 'Sorgen Sie dafür, dass Ihre Marke online gefunden wird.', href: '/seo-agentur-wien' },
  ],
  en: [
    {
      title: 'Web Design',
      description: 'A website that perfectly represents your new brand.',
      href: '/leistungen/webdesign',
    },
    {
      title: 'Marketing',
      description: 'Bring your brand into the world with targeted marketing.',
      href: '/leistungen/marketing',
    },
    { title: 'SEO', description: 'Make sure your brand gets found online.', href: '/seo-agentur-wien' },
  ],
  ru: [
    {
      title: 'Веб-дизайн',
      description: 'Сайт, который идеально представляет ваш новый бренд.',
      href: '/leistungen/webdesign',
    },
    {
      title: 'Маркетинг',
      description: 'Выведите ваш бренд в мир с помощью целевого маркетинга.',
      href: '/leistungen/marketing',
    },
    { title: 'SEO', description: 'Убедитесь, что ваш бренд находят в интернете.', href: '/seo-agentur-wien' },
  ],
}

// ---------------------------------------------------------------------------
// FAQs (city-dynamic)
// ---------------------------------------------------------------------------
function getFaqs(city: string, locale: Locale, isIndustry: boolean): FAQ[] {
  const prep = { de: isIndustry ? 'für' : 'in', en: isIndustry ? 'for' : 'in', ru: isIndustry ? 'для' : 'в' }
  const faqs: Record<Locale, FAQ[]> = {
    de: [
      {
        question: `Was kostet ein Branding-Projekt ${prep.de} ${city}?`,
        answer: `Die Kosten für Branding ${prep.de} ${city} hängen vom Umfang ab. Ein Logo mit Basis-Styleguide startet bei €1.500, eine vollständige Corporate Identity bei €4.000 und eine umfassende Brand Strategy bei €8.000+. Kontaktieren Sie uns für ein individuelles Angebot.`,
      },
      {
        question: `Wie lange dauert ein Branding-Prozess?`,
        answer: `Ein Logo-Projekt dauert in der Regel 2–3 Wochen, eine Corporate Identity 4–6 Wochen und eine vollständige Brand Strategy 8–12 Wochen. Der Zeitrahmen hängt von der Komplexität und den Feedback-Runden ab.`,
      },
      {
        question: `Wann ist ein Rebranding sinnvoll?`,
        answer: `Ein Rebranding ist sinnvoll, wenn Ihr Unternehmen sich weiterentwickelt hat, Ihre Zielgruppe sich verändert hat, die aktuelle Marke nicht mehr zeitgemäß ist oder Sie sich stärker vom Wettbewerb abheben möchten.`,
      },
      {
        question: `Was beinhaltet eine Corporate Identity?`,
        answer: `Eine Corporate Identity umfasst Logo, Farbpalette, Typografie, Bildsprache, Gestaltungsraster, Geschäftsausstattung, Social-Media-Templates, Brand Guidelines und alles, was für einen konsistenten Markenauftritt nötig ist.`,
      },
      {
        question: `Wie läuft der Branding-Prozess ab?`,
        answer: `Unser Branding-Prozess besteht aus fünf Phasen: Analyse (Markt & Zielgruppe), Konzept (Strategie & Positionierung), Design (visuelle Identität), Finalisierung (Feinschliff & Dateien) und Implementierung (Umsetzung auf allen Kanälen).`,
      },
    ],
    en: [
      {
        question: `How much does a branding project cost ${prep.en} ${city}?`,
        answer: `The cost of branding ${prep.en} ${city} depends on the scope. A logo with basic style guide starts at €1,500, a full corporate identity at €4,000, and a comprehensive brand strategy at €8,000+. Contact us for a custom quote.`,
      },
      {
        question: `How long does the branding process take?`,
        answer: `A logo project typically takes 2–3 weeks, a corporate identity 4–6 weeks, and a full brand strategy 8–12 weeks. The timeline depends on complexity and feedback rounds.`,
      },
      {
        question: `When is a rebranding appropriate?`,
        answer: `A rebranding makes sense when your company has evolved, your target audience has changed, your current brand is no longer contemporary, or you want to differentiate more strongly from competitors.`,
      },
      {
        question: `What does a corporate identity include?`,
        answer: `A corporate identity includes logo, color palette, typography, imagery style, design grid, stationery, social media templates, brand guidelines, and everything needed for a consistent brand presence.`,
      },
      {
        question: `How does the branding process work?`,
        answer: `Our branding process consists of five phases: Analysis (market & audience), Concept (strategy & positioning), Design (visual identity), Finalization (refinement & files), and Implementation (rollout across all channels).`,
      },
    ],
    ru: [
      {
        question: `Сколько стоит проект брендинга ${prep.ru} ${city}?`,
        answer: `Стоимость брендинга ${prep.ru} ${city} зависит от объёма. Логотип с базовым стайлгайдом — от €1 500, полная корпоративная идентичность — от €4 000, комплексная стратегия бренда — от €8 000+. Свяжитесь с нами для индивидуального предложения.`,
      },
      {
        question: `Сколько времени занимает процесс брендинга?`,
        answer: `Проект логотипа обычно занимает 2–3 недели, корпоративная идентичность — 4–6 недель, полная стратегия бренда — 8–12 недель. Сроки зависят от сложности и раундов обратной связи.`,
      },
      {
        question: `Когда уместен ребрендинг?`,
        answer: `Ребрендинг уместен, когда ваша компания эволюционировала, целевая аудитория изменилась, текущий бренд устарел или вы хотите сильнее выделиться среди конкурентов.`,
      },
      {
        question: `Что включает корпоративная идентичность?`,
        answer: `Корпоративная идентичность включает логотип, цветовую палитру, типографику, стиль изображений, дизайн-сетку, деловую документацию, шаблоны для соцсетей, руководство по бренду и всё необходимое для единообразного присутствия бренда.`,
      },
      {
        question: `Как проходит процесс брендинга?`,
        answer: `Наш процесс брендинга состоит из пяти фаз: анализ (рынок и аудитория), концепция (стратегия и позиционирование), дизайн (визуальная идентичность), финализация (доработка и файлы) и внедрение (реализация на всех каналах).`,
      },
    ],
  }
  return faqs[locale]
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
function getHero(city: string, locale: Locale, isIndustry: boolean) {
  const prep = { de: isIndustry ? 'für' : 'in', en: isIndustry ? 'for' : 'in', ru: isIndustry ? 'для' : 'в' }
  const heroes: Record<
    Locale,
    { badge: string; title: string; description: string; ctaPrimary: string; ctaSecondary: string }
  > = {
    de: {
      badge: `Branding Agentur ${city}`,
      title: `Professionelles Branding ${prep.de} ${city}`,
      description: `Starke Marken entstehen nicht zufällig. Wir entwickeln einzigartige Markenidentitäten für Unternehmen ${prep.de} ${city} — von der Strategie über das Logo bis zur vollständigen Corporate Identity.`,
      ctaPrimary: 'Kostenlose Beratung',
      ctaSecondary: 'Portfolio ansehen',
    },
    en: {
      badge: `Branding Agency ${city}`,
      title: `Professional Branding ${prep.en} ${city}`,
      description: `Strong brands don't happen by accident. We develop unique brand identities for businesses ${prep.en} ${city} — from strategy and logo to complete corporate identity.`,
      ctaPrimary: 'Free Consultation',
      ctaSecondary: 'View Portfolio',
    },
    ru: {
      badge: `Брендинг-агентство ${city}`,
      title: `Профессиональный брендинг ${prep.ru} ${city}`,
      description: `Сильные бренды не возникают случайно. Мы разрабатываем уникальную идентичность бренда для компаний ${prep.ru} ${city} — от стратегии и логотипа до полной корпоративной идентичности.`,
      ctaPrimary: 'Бесплатная консультация',
      ctaSecondary: 'Смотреть портфолио',
    },
  }
  return heroes[locale]
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
export function getBrandingContent(citySlug: string, locale: Locale): LandingPageContent {
  const cityConfig = getCityBySlug(citySlug)
  const industryConfig = getIndustryBySlug(citySlug)
  const city = cityConfig?.cityName[locale] ?? industryConfig?.name[locale] ?? citySlug
  const isIndustry = !cityConfig && !!industryConfig
  const prep = { de: isIndustry ? 'für' : 'in', en: isIndustry ? 'for' : 'in', ru: isIndustry ? 'для' : 'в' }

  return {
    hero: getHero(city, locale, isIndustry),
    trustSignals: trustSignals[locale],
    benefits: benefits[locale],
    packages: packages[locale],
    process: processSteps[locale],
    faqs: getFaqs(city, locale, isIndustry),
    relatedServices: relatedServices[locale],
    labels: {
      ...sharedLabels[locale],
      ctaTitle:
        locale === 'de'
          ? `Branding-Projekt ${prep.de} ${city} starten`
          : locale === 'en'
            ? `Start Your Branding Project ${prep.en} ${city}`
            : `Начните ваш проект брендинга ${prep.ru} ${city}`,
      ctaDescription:
        locale === 'de'
          ? `Lassen Sie uns über Ihre Marke ${prep.de} ${city} sprechen. Kostenloses Erstgespräch ohne Verpflichtung.`
          : locale === 'en'
            ? `Let's talk about your brand ${prep.en} ${city}. Free initial consultation with no obligation.`
            : `Давайте обсудим ваш бренд ${prep.ru} ${city}. Бесплатная первичная консультация без обязательств.`,
    },
  }
}

export function getBrandingMeta(citySlug: string, locale: Locale): { metaTitle: string; metaDescription: string } {
  const cityConfig = getCityBySlug(citySlug)
  const industryConfig = getIndustryBySlug(citySlug)
  const city = cityConfig?.cityName[locale] ?? industryConfig?.name[locale] ?? citySlug
  const isIndustry = !cityConfig && !!industryConfig

  const meta: Record<Locale, { metaTitle: string; metaDescription: string }> = {
    de: {
      metaTitle: `Branding ${city} | GoldenWing Creative Studios`,
      metaDescription: `Branding Agentur für ${city}. Logo-Design, Corporate Identity und Markenstrategie. Einzigartige Marken, die überzeugen. Jetzt anfragen!`,
    },
    en: {
      metaTitle: `Branding ${city} | GoldenWing Creative Studios`,
      metaDescription: `Branding agency for ${city}. Logo design, corporate identity, and brand strategy. Unique brands that convince. Get in touch!`,
    },
    ru: {
      metaTitle: `Брендинг ${city} | GoldenWing Creative Studios`,
      metaDescription: `Брендинг-агентство для ${city}. Дизайн логотипа, корпоративная идентичность и стратегия бренда. Уникальные бренды, которые убеждают. Свяжитесь с нами!`,
    },
  }
  return meta[locale]
}
