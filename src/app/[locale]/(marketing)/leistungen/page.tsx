import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ServicesGrid } from './services-grid'
import { HeroStats } from './hero-stats'
import { ServicesMarquee } from './services-marquee'
import { ProcessSection } from './process-section'
import { ValuesSection } from './values-section'
import { PaketeCTA } from './pakete-cta'
import { FinalCTA } from './final-cta'
import { LeistungenFAQ, type LeistungenFAQItem } from './leistungen-faq'
import { getCanonicalUrl, getHreflangAlternates, getOpenGraphConfig, getContactUrl } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type SupportedLocale = 'de' | 'en' | 'ru'

interface ServiceData {
  num: string
  label: string
  icon: string
  title: string
  description: string
  tags: string[]
  href: string
  ariaLabel: string
}

interface HeroStat {
  value: string
  label: string
  animated?: boolean
}

interface ProcessStep {
  num: string
  title: string
  description: string
}

interface ValueProp {
  num: string
  title: string
  description: string
}

interface PageContent {
  breadcrumbHome: string
  breadcrumbCurrent: string
  eyebrow: string
  headline: string
  headlineHighlight: string
  headlineLight: string
  introText: string
  badge: string
  ctaButton: string
  heroStats: HeroStat[]
  marqueeTitle: string
  marqueeServices: string[]
  processEyebrow: string
  processTitle: string
  processTitleHighlight: string
  processDescription: string
  processSteps: ProcessStep[]
  valuesEyebrow: string
  valuesTitle: string
  valuesTitleHighlight: string
  values: ValueProp[]
  paketeTitle: string
  paketeTitleHighlight: string
  paketeDescription: string
  paketeButton: string
  finalCtaTitle: string
  finalCtaTitleHighlight: string
  finalCtaDescription: string
  finalCtaButton: string
  faqEyebrow: string
  faqTitle: string
  faqTitleHighlight: string
  faqDescription: string
  services: ServiceData[]
  faqs: LeistungenFAQItem[]
}

// ─────────────────────────────────────────────────────────────────────────────
// I18N CONTENT
// ─────────────────────────────────────────────────────────────────────────────

const content: Record<SupportedLocale, PageContent> = {
  de: {
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'Leistungen',
    eyebrow: 'Was wir machen',
    headline: 'Unsere',
    headlineHighlight: 'Kompetenzfelder',
    headlineLight: 'im Überblick',
    introText: 'GoldenWing Creative Studios verbindet Markenstrategie, Design, digitale Kommunikation und technologische Umsetzung. Von Wien aus betreuen wir Kunden in ganz Europa — mit sechs Kernbereichen für nachhaltiges digitales Wachstum.',
    badge: '06 Kernbereiche · 30+ Services',
    ctaButton: 'Projekt starten',
    heroStats: [
      { value: '100+', label: 'Erfolgreiche Projekte', animated: true },
      { value: '13+', label: 'Jahre Erfahrung', animated: true },
      { value: '3', label: 'Standorte weltweit' },
      { value: '95%', label: 'Kundenzufriedenheit' },
    ],
    marqueeTitle: 'Spezialisierte Services für spezifische Anforderungen',
    marqueeServices: ['Grafikdesign', 'SEO Texter', 'SEO Berater', 'SEO Betreuung', 'SEA Agentur', 'Google Ads Agentur', 'E-Commerce Agentur', 'Onlineshop Agentur', 'WordPress Agentur', 'Social Media Agentur', 'GEO Optimierung', 'Content Creation', 'Reels & Video', 'Business-Fotografie'],
    processEyebrow: 'Prozess',
    processTitle: 'Unser Arbeits',
    processTitleHighlight: 'prozess',
    processDescription: 'Strukturiert, transparent und ergebnisorientiert. Fünf Phasen, die jedes Projekt zum Erfolg führen.',
    processSteps: [
      { num: '01', title: 'Discovery', description: 'Wir analysieren Ihre Ziele, Zielgruppen und Wettbewerber. In einem Workshop erarbeiten wir gemeinsam die strategische Grundlage für Ihr Projekt.' },
      { num: '02', title: 'Strategie', description: 'Basierend auf den Erkenntnissen entwickeln wir eine maßgeschneiderte Strategie mit klaren Meilensteinen, KPIs und einem realistischen Zeitplan.' },
      { num: '03', title: 'Kreation', description: 'Unser Kreativteam setzt die Strategie in hochwertige Designs und Inhalte um. Regelmäßige Abstimmungen stellen sicher, dass wir Ihre Vision treffen.' },
      { num: '04', title: 'Umsetzung', description: 'Entwickler und Spezialisten bringen die Konzepte in die Realität. Qualitätssicherung und Testing garantieren einwandfreie Ergebnisse.' },
      { num: '05', title: 'Launch & Optimierung', description: 'Nach dem erfolgreichen Launch analysieren wir kontinuierlich die Performance und optimieren für nachhaltigen Erfolg.' },
    ],
    valuesEyebrow: 'Versprechen',
    valuesTitle: 'Was Sie von uns erwarten',
    valuesTitleHighlight: 'können',
    values: [
      { num: '01', title: 'Strategischer Fokus', description: 'Jede Maßnahme dient einem klaren Ziel. Wir investieren Zeit in Strategie, damit die Umsetzung sitzt.' },
      { num: '02', title: 'Persönliche Betreuung', description: 'Ein fester Ansprechpartner kennt Ihr Projekt in- und auswendig. Keine Warteschleifen, direkte Kommunikation.' },
      { num: '03', title: 'Schnelle Umsetzung', description: 'Agile Methoden und eingespieltes Team ermöglichen kurze Durchlaufzeiten ohne Qualitätsverlust.' },
      { num: '04', title: 'Transparente Preise', description: 'Faire Festpreise oder transparente Stundensätze. Keine versteckten Kosten, keine bösen Überraschungen.' },
    ],
    paketeTitle: 'Service-',
    paketeTitleHighlight: 'Pakete',
    paketeDescription: 'Unsere Pakete bündeln die wichtigsten Services zu attraktiven Konditionen. Ideal für Unternehmen, die einen ganzheitlichen Ansatz suchen.',
    paketeButton: 'Pakete entdecken',
    finalCtaTitle: 'Bereit für Ihr nächstes',
    finalCtaTitleHighlight: 'Projekt?',
    finalCtaDescription: 'Lassen Sie uns in einem unverbindlichen Gespräch herausfinden, wie wir Ihnen helfen können.',
    finalCtaButton: 'Kostenloses Erstgespräch buchen',
    faqEyebrow: 'FAQ',
    faqTitle: 'Häufige Fragen zu unseren',
    faqTitleHighlight: 'Leistungen',
    faqDescription: 'Klicken Sie auf eine Frage, um die Antwort zu sehen.',
    services: [
      {
        num: '01',
        label: 'Service 01',
        icon: '◎',
        title: 'Branding',
        description: 'Markenstrategie, visuelle Identität und Markenrichtlinien — von der Idee bis zur gelebten Marke, die bei eurer Zielgruppe resoniert.',
        tags: ['Markenstrategie', 'Corporate Identity', 'Logo-Design', 'Brand Guidelines'],
        href: '/leistungen/branding',
        ariaLabel: 'Branding — Markenstrategie, Corporate Identity, Logo-Design und Brand Guidelines. Mehr erfahren.'
      },
      {
        num: '02',
        label: 'Service 02',
        icon: '⊕',
        title: 'Webdesign',
        description: 'UX/UI-Design und CMS-Entwicklung für performante, moderne Webauftritte die konvertieren.',
        tags: ['UX/UI-Design', 'WordPress', 'Responsive'],
        href: '/leistungen/webdesign',
        ariaLabel: 'Webdesign — UX/UI-Design, CMS-Entwicklung und Responsive Design. Mehr erfahren.'
      },
      {
        num: '03',
        label: 'Service 03',
        icon: '⚡',
        title: 'Digital Marketing',
        description: 'Kampagnenstrategie, Paid Media und E-Mail-Automatisierung für messbare Ergebnisse und nachhaltiges Wachstum.',
        tags: ['Kampagnen', 'Paid Media', 'E-Mail-Automation'],
        href: '/leistungen/digitale-strategie',
        ariaLabel: 'Digital Marketing — Kampagnenstrategie, Paid Media und Automation. Mehr erfahren.'
      },
      {
        num: '04',
        label: 'Service 04',
        icon: '◉',
        title: 'SEO & Content',
        description: 'Technical SEO, Local SEO, Keywordstrategie und Content-Produktion für nachhaltige Sichtbarkeit in Wien und ganz Österreich.',
        tags: ['Technical SEO', 'Local SEO Wien', 'Content-Strategie'],
        href: '/leistungen/seo-sichtbarkeit',
        ariaLabel: 'SEO & Content — Technical SEO, Local SEO und Content-Produktion. Mehr erfahren.'
      },
      {
        num: '05',
        label: 'Service 05',
        icon: '⟨/⟩',
        title: 'Web- & App-Entwicklung',
        description: 'Full-Stack Architektur, API-Integration, Mobile Apps und Automatisierung — maßgeschneidert für eure Anforderungen.',
        tags: ['Full-Stack', 'API-Integration', 'Mobile Apps', 'Automation'],
        href: '/leistungen/technische-loesungen',
        ariaLabel: 'Web- & App-Entwicklung — Full-Stack, APIs und Mobile Apps. Mehr erfahren.'
      },
      {
        num: '06',
        label: 'Service 06',
        icon: '☁',
        title: 'IT & Cloud Services',
        description: 'Cloud-Architektur, DevOps, Monitoring, Sicherheit und IT-Support für skalierbare Infrastruktur.',
        tags: ['Cloud-Architektur', 'DevOps', 'Monitoring', 'Security'],
        href: '/leistungen/software-entwicklung',
        ariaLabel: 'IT & Cloud Services — Cloud-Architektur, DevOps und Security. Mehr erfahren.'
      }
    ],
    faqs: [
      {
        question: 'Welche Leistungen bietet GoldenWing an?',
        answer: 'GoldenWing bietet sechs Kernbereiche: Branding & Markenstrategie, Webdesign & UX/UI, Digital Marketing & Paid Media, SEO & Content-Produktion, Web- & App-Entwicklung sowie IT & Cloud Services. Alle Leistungen sind modular kombinierbar.',
        links: [
          { href: '/leistungen/branding', text: 'Branding' },
          { href: '/leistungen/webdesign', text: 'Webdesign' },
          { href: '/leistungen/digitale-strategie', text: 'Digital Marketing' },
          { href: '/leistungen/seo-sichtbarkeit', text: 'SEO & Content' },
          { href: '/leistungen/technische-loesungen', text: 'Web- & App-Entwicklung' },
          { href: '/leistungen/software-entwicklung', text: 'IT & Cloud Services' }
        ]
      },
      {
        question: 'Für wen sind die Services von GoldenWing geeignet?',
        answer: 'GoldenWing arbeitet mit KMU, Startups, Coaches, Dienstleistern und Agenturen, die ihren digitalen Markenauftritt professionell und zukunftsfähig gestalten möchten — in Wien, Österreich und ganz Europa.'
      },
      {
        question: 'Was kostet eine Zusammenarbeit mit GoldenWing?',
        answer: 'Die Kosten richten sich nach Projektumfang und gewünschten Leistungen. GoldenWing bietet modulare Pakete und individuelle Angebote. Ein kostenloses Erstgespräch klärt Anforderungen und Budget.',
        links: [{ href: '/kontakt', text: 'Kostenloses Erstgespräch vereinbaren' }]
      }
    ]
  },
  en: {
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'Services',
    eyebrow: 'What we do',
    headline: 'Our',
    headlineHighlight: 'Expertise',
    headlineLight: 'at a glance',
    introText: 'GoldenWing Creative Studios combines brand strategy, design, digital communication and technological implementation. From Vienna, we serve clients across Europe — with six core areas for sustainable digital growth.',
    badge: '06 Core Areas · 30+ Services',
    ctaButton: 'Start Project',
    heroStats: [
      { value: '100+', label: 'Successful Projects', animated: true },
      { value: '13+', label: 'Years Experience', animated: true },
      { value: '3', label: 'Locations Worldwide' },
      { value: '95%', label: 'Client Satisfaction' },
    ],
    marqueeTitle: 'Specialized services for specific requirements',
    marqueeServices: ['Graphic Design', 'SEO Copywriting', 'SEO Consulting', 'SEO Management', 'SEA Agency', 'Google Ads Agency', 'E-Commerce Agency', 'Online Shop Agency', 'WordPress Agency', 'Social Media Agency', 'GEO Optimization', 'Content Creation', 'Reels & Video', 'Business Photography'],
    processEyebrow: 'Process',
    processTitle: 'Our Work',
    processTitleHighlight: 'process',
    processDescription: 'Structured, transparent and results-oriented. Five phases that lead every project to success.',
    processSteps: [
      { num: '01', title: 'Discovery', description: 'We analyze your goals, target audiences and competitors. In a workshop we develop the strategic foundation for your project together.' },
      { num: '02', title: 'Strategy', description: 'Based on the insights, we develop a tailored strategy with clear milestones, KPIs and a realistic timeline.' },
      { num: '03', title: 'Creation', description: 'Our creative team translates the strategy into high-quality designs and content. Regular check-ins ensure we hit your vision.' },
      { num: '04', title: 'Implementation', description: 'Developers and specialists bring concepts to reality. Quality assurance and testing guarantee flawless results.' },
      { num: '05', title: 'Launch & Optimization', description: 'After a successful launch, we continuously analyze performance and optimize for sustainable success.' },
    ],
    valuesEyebrow: 'Promise',
    valuesTitle: 'What you can expect',
    valuesTitleHighlight: 'from us',
    values: [
      { num: '01', title: 'Strategic Focus', description: 'Every measure serves a clear goal. We invest time in strategy so the execution is on point.' },
      { num: '02', title: 'Personal Support', description: 'A dedicated contact person knows your project inside out. No waiting, direct communication.' },
      { num: '03', title: 'Fast Delivery', description: 'Agile methods and a seasoned team enable short turnaround times without quality loss.' },
      { num: '04', title: 'Transparent Pricing', description: 'Fair fixed prices or transparent hourly rates. No hidden costs, no unpleasant surprises.' },
    ],
    paketeTitle: 'Service ',
    paketeTitleHighlight: 'Packages',
    paketeDescription: 'Our packages bundle the most important services at attractive conditions. Ideal for companies looking for a holistic approach.',
    paketeButton: 'Discover Packages',
    finalCtaTitle: 'Ready for your next',
    finalCtaTitleHighlight: 'Project?',
    finalCtaDescription: 'Let us find out in a non-binding conversation how we can help you.',
    finalCtaButton: 'Book a Free Consultation',
    faqEyebrow: 'FAQ',
    faqTitle: 'Frequently asked questions about our',
    faqTitleHighlight: 'Services',
    faqDescription: 'Click on a question to see the answer.',
    services: [
      {
        num: '01',
        label: 'Service 01',
        icon: '◎',
        title: 'Branding',
        description: 'Brand strategy, visual identity and brand guidelines — from concept to a living brand that resonates with your target audience.',
        tags: ['Brand Strategy', 'Corporate Identity', 'Logo Design', 'Brand Guidelines'],
        href: '/leistungen/branding',
        ariaLabel: 'Branding — Brand strategy, corporate identity, logo design and brand guidelines. Learn more.'
      },
      {
        num: '02',
        label: 'Service 02',
        icon: '⊕',
        title: 'Web Design',
        description: 'UX/UI design and CMS development for performant, modern websites that convert.',
        tags: ['UX/UI Design', 'WordPress', 'Responsive'],
        href: '/leistungen/webdesign',
        ariaLabel: 'Web Design — UX/UI design, CMS development and responsive design. Learn more.'
      },
      {
        num: '03',
        label: 'Service 03',
        icon: '⚡',
        title: 'Digital Marketing',
        description: 'Campaign strategy, paid media and email automation for measurable results and sustainable growth.',
        tags: ['Campaigns', 'Paid Media', 'Email Automation'],
        href: '/leistungen/digitale-strategie',
        ariaLabel: 'Digital Marketing — Campaign strategy, paid media and automation. Learn more.'
      },
      {
        num: '04',
        label: 'Service 04',
        icon: '◉',
        title: 'SEO & Content',
        description: 'Technical SEO, local SEO, keyword strategy and content production for sustainable visibility.',
        tags: ['Technical SEO', 'Local SEO', 'Content Strategy'],
        href: '/leistungen/seo-sichtbarkeit',
        ariaLabel: 'SEO & Content — Technical SEO, local SEO and content production. Learn more.'
      },
      {
        num: '05',
        label: 'Service 05',
        icon: '⟨/⟩',
        title: 'Web & App Development',
        description: 'Full-stack architecture, API integration, mobile apps and automation — tailored to your requirements.',
        tags: ['Full-Stack', 'API Integration', 'Mobile Apps', 'Automation'],
        href: '/leistungen/technische-loesungen',
        ariaLabel: 'Web & App Development — Full-stack, APIs and mobile apps. Learn more.'
      },
      {
        num: '06',
        label: 'Service 06',
        icon: '☁',
        title: 'IT & Cloud Services',
        description: 'Cloud architecture, DevOps, monitoring, security and IT support for scalable infrastructure.',
        tags: ['Cloud Architecture', 'DevOps', 'Monitoring', 'Security'],
        href: '/leistungen/software-entwicklung',
        ariaLabel: 'IT & Cloud Services — Cloud architecture, DevOps and security. Learn more.'
      }
    ],
    faqs: [
      {
        question: 'What services does GoldenWing offer?',
        answer: 'GoldenWing offers six core areas: Branding & brand strategy, web design & UX/UI, digital marketing & paid media, SEO & content production, web & app development, and IT & cloud services. All services can be combined modularly.',
        links: [
          { href: '/leistungen/branding', text: 'Branding' },
          { href: '/leistungen/webdesign', text: 'Web Design' },
          { href: '/leistungen/digitale-strategie', text: 'Digital Marketing' },
          { href: '/leistungen/seo-sichtbarkeit', text: 'SEO & Content' },
          { href: '/leistungen/technische-loesungen', text: 'Web & App Development' },
          { href: '/leistungen/software-entwicklung', text: 'IT & Cloud Services' }
        ]
      },
      {
        question: 'Who are GoldenWing\'s services suitable for?',
        answer: 'GoldenWing works with SMEs, startups, coaches, service providers and agencies who want to professionally design their digital brand presence — in Vienna, Austria and across Europe.'
      },
      {
        question: 'How much does working with GoldenWing cost?',
        answer: 'Costs depend on project scope and desired services. GoldenWing offers modular packages and individual offers. A free initial consultation clarifies requirements and budget.',
        links: [{ href: '/kontakt', text: 'Schedule a free consultation' }]
      }
    ]
  },
  ru: {
    breadcrumbHome: 'Главная',
    breadcrumbCurrent: 'Услуги',
    eyebrow: 'Что мы делаем',
    headline: 'Наши',
    headlineHighlight: 'Компетенции',
    headlineLight: 'обзор',
    introText: 'GoldenWing Creative Studios объединяет стратегию бренда, дизайн, цифровую коммуникацию и технологическую реализацию. Из Вены мы обслуживаем клиентов по всей Европе — с шестью ключевыми направлениями для устойчивого цифрового роста.',
    badge: '06 направлений · 30+ услуг',
    ctaButton: 'Начать проект',
    heroStats: [
      { value: '100+', label: 'Успешных проектов', animated: true },
      { value: '13+', label: 'Лет опыта', animated: true },
      { value: '3', label: 'Офиса в мире' },
      { value: '95%', label: 'Удовлетворённость клиентов' },
    ],
    marqueeTitle: 'Специализированные услуги для конкретных задач',
    marqueeServices: ['Графический дизайн', 'SEO-копирайтинг', 'SEO-консалтинг', 'SEO-сопровождение', 'SEA агентство', 'Google Ads агентство', 'E-Commerce агентство', 'Интернет-магазин', 'WordPress агентство', 'SMM агентство', 'GEO оптимизация', 'Контент-маркетинг', 'Reels и видео', 'Бизнес-фотография'],
    processEyebrow: 'Процесс',
    processTitle: 'Наш рабочий',
    processTitleHighlight: 'процесс',
    processDescription: 'Структурированный, прозрачный и ориентированный на результат. Пять фаз, которые ведут каждый проект к успеху.',
    processSteps: [
      { num: '01', title: 'Анализ', description: 'Мы анализируем ваши цели, целевые аудитории и конкурентов. На воркшопе совместно разрабатываем стратегическую основу проекта.' },
      { num: '02', title: 'Стратегия', description: 'На основе полученных данных разрабатываем индивидуальную стратегию с чёткими этапами, KPI и реалистичным графиком.' },
      { num: '03', title: 'Креатив', description: 'Наша креативная команда воплощает стратегию в качественный дизайн и контент. Регулярные согласования гарантируют точное попадание.' },
      { num: '04', title: 'Реализация', description: 'Разработчики и специалисты воплощают концепции в реальность. Контроль качества и тестирование гарантируют безупречный результат.' },
      { num: '05', title: 'Запуск и оптимизация', description: 'После успешного запуска мы непрерывно анализируем показатели и оптимизируем для устойчивого успеха.' },
    ],
    valuesEyebrow: 'Гарантии',
    valuesTitle: 'Что вы можете ожидать',
    valuesTitleHighlight: 'от нас',
    values: [
      { num: '01', title: 'Стратегический фокус', description: 'Каждое действие служит чёткой цели. Мы инвестируем время в стратегию, чтобы реализация была точной.' },
      { num: '02', title: 'Персональная поддержка', description: 'Выделенный менеджер знает ваш проект досконально. Без очередей, прямая коммуникация.' },
      { num: '03', title: 'Быстрая реализация', description: 'Agile-методы и слаженная команда обеспечивают короткие сроки без потери качества.' },
      { num: '04', title: 'Прозрачные цены', description: 'Честные фиксированные цены или прозрачные часовые ставки. Без скрытых расходов.' },
    ],
    paketeTitle: 'Сервисные ',
    paketeTitleHighlight: 'пакеты',
    paketeDescription: 'Наши пакеты объединяют ключевые услуги на выгодных условиях. Идеально для компаний, ищущих комплексный подход.',
    paketeButton: 'Узнать о пакетах',
    finalCtaTitle: 'Готовы к следующему',
    finalCtaTitleHighlight: 'проекту?',
    finalCtaDescription: 'Давайте в необязывающей беседе выясним, как мы можем вам помочь.',
    finalCtaButton: 'Бесплатная консультация',
    faqEyebrow: 'FAQ',
    faqTitle: 'Часто задаваемые вопросы о наших',
    faqTitleHighlight: 'услугах',
    faqDescription: 'Нажмите на вопрос, чтобы увидеть ответ.',
    services: [
      {
        num: '01',
        label: 'Услуга 01',
        icon: '◎',
        title: 'Брендинг',
        description: 'Стратегия бренда, визуальная идентичность и руководства по бренду — от идеи до живого бренда, который резонирует с вашей целевой аудиторией.',
        tags: ['Стратегия бренда', 'Фирменный стиль', 'Дизайн логотипа', 'Брендбук'],
        href: '/leistungen/branding',
        ariaLabel: 'Брендинг — Стратегия бренда, фирменный стиль, дизайн логотипа и брендбук. Узнать больше.'
      },
      {
        num: '02',
        label: 'Услуга 02',
        icon: '⊕',
        title: 'Веб-дизайн',
        description: 'UX/UI дизайн и разработка CMS для производительных, современных веб-сайтов, которые конвертируют.',
        tags: ['UX/UI дизайн', 'WordPress', 'Адаптивный'],
        href: '/leistungen/webdesign',
        ariaLabel: 'Веб-дизайн — UX/UI дизайн, разработка CMS и адаптивный дизайн. Узнать больше.'
      },
      {
        num: '03',
        label: 'Услуга 03',
        icon: '⚡',
        title: 'Цифровой маркетинг',
        description: 'Стратегия кампаний, платная реклама и автоматизация email для измеримых результатов и устойчивого роста.',
        tags: ['Кампании', 'Платная реклама', 'Email-автоматизация'],
        href: '/leistungen/digitale-strategie',
        ariaLabel: 'Цифровой маркетинг — Стратегия кампаний, платная реклама и автоматизация. Узнать больше.'
      },
      {
        num: '04',
        label: 'Услуга 04',
        icon: '◉',
        title: 'SEO и контент',
        description: 'Технический SEO, локальный SEO, стратегия ключевых слов и производство контента для устойчивой видимости.',
        tags: ['Технический SEO', 'Локальный SEO', 'Контент-стратегия'],
        href: '/leistungen/seo-sichtbarkeit',
        ariaLabel: 'SEO и контент — Технический SEO, локальный SEO и производство контента. Узнать больше.'
      },
      {
        num: '05',
        label: 'Услуга 05',
        icon: '⟨/⟩',
        title: 'Веб и мобильная разработка',
        description: 'Full-stack архитектура, API интеграция, мобильные приложения и автоматизация — под ваши требования.',
        tags: ['Full-Stack', 'API интеграция', 'Мобильные приложения', 'Автоматизация'],
        href: '/leistungen/technische-loesungen',
        ariaLabel: 'Веб и мобильная разработка — Full-stack, API и мобильные приложения. Узнать больше.'
      },
      {
        num: '06',
        label: 'Услуга 06',
        icon: '☁',
        title: 'IT и облачные услуги',
        description: 'Облачная архитектура, DevOps, мониторинг, безопасность и IT-поддержка для масштабируемой инфраструктуры.',
        tags: ['Облачная архитектура', 'DevOps', 'Мониторинг', 'Безопасность'],
        href: '/leistungen/software-entwicklung',
        ariaLabel: 'IT и облачные услуги — Облачная архитектура, DevOps и безопасность. Узнать больше.'
      }
    ],
    faqs: [
      {
        question: 'Какие услуги предлагает GoldenWing?',
        answer: 'GoldenWing предлагает шесть ключевых направлений: Брендинг и стратегия бренда, веб-дизайн и UX/UI, цифровой маркетинг и платная реклама, SEO и производство контента, веб и мобильная разработка, IT и облачные услуги. Все услуги можно комбинировать модульно.',
        links: [
          { href: '/leistungen/branding', text: 'Брендинг' },
          { href: '/leistungen/webdesign', text: 'Веб-дизайн' },
          { href: '/leistungen/digitale-strategie', text: 'Цифровой маркетинг' },
          { href: '/leistungen/seo-sichtbarkeit', text: 'SEO и контент' },
          { href: '/leistungen/technische-loesungen', text: 'Веб и мобильная разработка' },
          { href: '/leistungen/software-entwicklung', text: 'IT и облачные услуги' }
        ]
      },
      {
        question: 'Для кого подходят услуги GoldenWing?',
        answer: 'GoldenWing работает с МСБ, стартапами, коучами, поставщиками услуг и агентствами, которые хотят профессионально оформить свое цифровое присутствие — в Вене, Австрии и по всей Европе.'
      },
      {
        question: 'Сколько стоит сотрудничество с GoldenWing?',
        answer: 'Стоимость зависит от объема проекта и желаемых услуг. GoldenWing предлагает модульные пакеты и индивидуальные предложения. Бесплатная первичная консультация прояснит требования и бюджет.',
        links: [{ href: '/kontakt', text: 'Записаться на бесплатную консультацию' }]
      }
    ]
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SEO METADATA
// ─────────────────────────────────────────────────────────────────────────────

const seoData: Record<SupportedLocale, { title: string; description: string; keywords: string[] }> = {
  de: {
    title: 'Unsere Leistungen — GoldenWing Creative Studios | Digitalagentur Wien',
    description: 'GoldenWing bietet 6 Kernbereiche: Branding, Webdesign, Digital Marketing, SEO & Content, Web- & App-Entwicklung, IT & Cloud Services. Alles aus einer Hand — von Wien für ganz Europa.',
    keywords: ['Branding Agentur Wien', 'Webdesign Wien', 'SEO Agentur', 'Digital Marketing', 'App-Entwicklung', 'Cloud Services']
  },
  en: {
    title: 'Our Services — GoldenWing Creative Studios | Digital Agency Vienna',
    description: 'GoldenWing offers 6 core areas: Branding, web design, digital marketing, SEO & content, web & app development, IT & cloud services. All from one source — from Vienna for all of Europe.',
    keywords: ['Branding Agency Vienna', 'Web Design Vienna', 'SEO Agency', 'Digital Marketing', 'App Development', 'Cloud Services']
  },
  ru: {
    title: 'Наши услуги — GoldenWing Creative Studios | Цифровое агентство Вена',
    description: 'GoldenWing предлагает 6 ключевых направлений: Брендинг, веб-дизайн, цифровой маркетинг, SEO и контент, веб и мобильная разработка, IT и облачные услуги. Всё из одних рук — из Вены для всей Европы.',
    keywords: ['Брендинг агентство Вена', 'Веб-дизайн Вена', 'SEO агентство', 'Цифровой маркетинг', 'Разработка приложений', 'Облачные услуги']
  }
}

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/leistungen')

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    robots: { index: true, follow: true },
    openGraph: getOpenGraphConfig({
      title: seo.title,
      description: seo.description,
      url: getCanonicalUrl('/leistungen', locale),
      locale: locale as 'de' | 'en',
    }),
    alternates: {
      canonical: getCanonicalUrl('/leistungen', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA.ORG JSON-LD
// ─────────────────────────────────────────────────────────────────────────────

function ProfessionalServiceSchema({ locale }: { locale: SupportedLocale }) {
  const c = content[locale]
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'GoldenWing Creative Studios',
    url: 'https://goldenwing.at',
    logo: 'https://goldenwing.at/logo.svg',
    description: locale === 'de' 
      ? 'Inhabergeführte Kreativ- und Digitalagentur aus Wien. Branding, Webdesign, SEO, Entwicklung und Cloud Services.'
      : locale === 'en'
      ? 'Owner-managed creative and digital agency from Vienna. Branding, web design, SEO, development and cloud services.'
      : 'Креативное и цифровое агентство из Вены под управлением владельца. Брендинг, веб-дизайн, SEO, разработка и облачные услуги.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Wien',
      addressCountry: 'AT'
    },
    areaServed: ['AT', 'DE', 'CH', 'EU'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: c.breadcrumbCurrent,
      itemListElement: c.services.map(service => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
          url: `https://goldenwing.at/${locale}${service.href}`,
          provider: { '@type': 'Organization', name: 'GoldenWing Creative Studios' }
        }
      }))
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

function BreadcrumbSchema({ locale }: { locale: SupportedLocale }) {
  const c = content[locale]
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: c.breadcrumbHome, item: `https://goldenwing.at/${locale}` },
      { '@type': 'ListItem', position: 2, name: c.breadcrumbCurrent, item: `https://goldenwing.at/${locale}/leistungen` }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

function FAQPageSchema({ locale }: { locale: SupportedLocale }) {
  const c = content[locale]
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default async function LeistungenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const c = content[locale] || content.de

  return (
    <>
      {/* Schema.org JSON-LD */}
      <ProfessionalServiceSchema locale={locale} />
      <BreadcrumbSchema locale={locale} />
      <FAQPageSchema locale={locale} />

      <section 
        className="relative py-24 lg:py-32 px-5 sm:px-9 lg:px-16 max-w-[1520px] mx-auto"
        aria-labelledby="services-heading"
      >
        {/* Decorative dot grid - dark mode only */}
        <div 
          className="absolute top-[60px] right-[60px] w-[180px] h-[180px] pointer-events-none opacity-50 hidden lg:dark:block"
          style={{
            backgroundImage: 'radial-gradient(rgba(242,251,49,0.08) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
            maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)'
          }}
          aria-hidden="true"
        />

        {/* Ambient glow - dark mode only */}
        <div 
          className="absolute top-[5%] left-[40%] w-[1000px] h-[700px] pointer-events-none hidden dark:block"
          style={{
            background: 'radial-gradient(ellipse, rgba(242,251,49,0.02) 0%, transparent 60%)',
            filter: 'blur(60px)'
          }}
          aria-hidden="true"
        />

        {/* Breadcrumb */}
        <nav 
          className="mb-12 animate-[fadeUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.05s_both]"
          aria-label="Breadcrumb"
        >
          <ol className="flex gap-2 text-[0.7rem] text-neutral-400 dark:text-neutral-500">
            <li>
              <Link 
                href={`/${locale}`} 
                className="text-neutral-400 dark:text-white/30 no-underline transition-colors duration-300 hover:text-primary dark:hover:text-[#f2fb31]"
              >
                {c.breadcrumbHome}
              </Link>
            </li>
            <li className="opacity-30" aria-hidden="true">/</li>
            <li className="text-neutral-500 dark:text-white/50" aria-current="page">
              {c.breadcrumbCurrent}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-20 lg:mb-24 gap-7 lg:gap-16 animate-[fadeUp_0.9s_cubic-bezier(0.16,1,0.3,1)_0.1s_both]">
          <div>
            {/* Eyebrow */}
            <div 
              className="inline-flex items-center gap-2.5 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-primary dark:text-[#f2fb31] font-normal mb-7"
              aria-hidden="true"
            >
              <span 
                className="w-[7px] h-[7px] bg-primary dark:bg-[#f2fb31] rotate-45 flex-shrink-0 animate-pulse"
                style={{ animationDuration: '3s' }}
              />
              {c.eyebrow}
            </div>
            
            {/* H1 Headline */}
            <h1 
              id="services-heading"
              className="font-[var(--font-bricolage)] text-[clamp(3.2rem,6.5vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.05em] text-neutral-900 dark:text-white"
            >
              {c.headline}<br />
              <span className="relative inline-block text-primary dark:text-[#f2fb31]">
                {c.headlineHighlight}
                <span 
                  className="absolute bottom-[2px] -left-[2px] -right-[2px] h-1.5 bg-primary/10 dark:bg-[#f2fb31]/12 rounded-sm"
                  aria-hidden="true"
                />
              </span>
              <span className="block font-normal text-neutral-300 dark:text-white/25 text-[0.65em] mt-2 tracking-[-0.02em]">
                {c.headlineLight}
              </span>
            </h1>
          </div>

          <div className="flex-shrink-0 max-w-[380px] text-left lg:text-right">
            <p className="text-neutral-500 dark:text-neutral-400 text-[0.88rem] leading-[1.8]">
              <strong className="text-neutral-700 dark:text-white font-semibold">GoldenWing Creative Studios</strong>{' '}
              {c.introText.replace('GoldenWing Creative Studios ', '')}
            </p>
            <HeroStats stats={c.heroStats} />
          </div>
        </header>

        {/* Services Grid */}
        <ServicesGrid services={c.services} locale={locale} />

        {/* CTA Row */}
        <div className="flex justify-center items-center gap-7 mt-20 lg:mt-24 animate-[fadeUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.6s_both]">
          <div 
            className="w-20 h-px hidden sm:block"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(242,251,49,0.15))' }}
            aria-hidden="true"
          />
          
          <Link
            href={getContactUrl(locale)}
            className="group relative inline-flex items-center gap-3.5 px-12 py-5 bg-transparent border-[1.5px] border-primary/20 dark:border-[rgba(242,251,49,0.2)] text-primary dark:text-[#f2fb31] font-bold text-[0.88rem] rounded-full overflow-hidden transition-all duration-500 hover:border-primary dark:hover:border-[#f2fb31] hover:shadow-[0_0_60px_rgba(242,251,49,0.1)] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4"
            aria-label={`${c.ctaButton} — Kontakt aufnehmen`}
          >
            <span 
              className="absolute inset-0 bg-primary dark:bg-[#f2fb31] rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[0.55s] cubic-bezier(0.16,1,0.3,1) z-0"
              aria-hidden="true"
            />
            <span className="relative z-[1] transition-colors duration-[0.45s] group-hover:text-white dark:group-hover:text-[#0a0a0a]">
              {c.ctaButton}
            </span>
            <ArrowRight className="relative z-[1] w-4 h-4 transition-colors duration-[0.45s] group-hover:text-white dark:group-hover:text-[#0a0a0a]" />
          </Link>
          
          <div 
            className="w-20 h-px hidden sm:block"
            style={{ background: 'linear-gradient(90deg, rgba(242,251,49,0.15), transparent)' }}
            aria-hidden="true"
          />
        </div>
      </section>

      {/* Marquee: Additional Services */}
      <ServicesMarquee title={c.marqueeTitle} services={c.marqueeServices} />

      {/* Process Section */}
      <ProcessSection
        eyebrow={c.processEyebrow}
        title={c.processTitle}
        titleHighlight={c.processTitleHighlight}
        description={c.processDescription}
        steps={c.processSteps}
      />

      {/* Value Props */}
      <ValuesSection
        eyebrow={c.valuesEyebrow}
        title={c.valuesTitle}
        titleHighlight={c.valuesTitleHighlight}
        values={c.values}
      />

      {/* Pakete CTA */}
      <PaketeCTA
        title={c.paketeTitle}
        titleHighlight={c.paketeTitleHighlight}
        description={c.paketeDescription}
        buttonText={c.paketeButton}
        locale={locale}
      />

      {/* FAQ Section */}
      <LeistungenFAQ 
        eyebrow={c.faqEyebrow}
        title={c.faqTitle}
        titleHighlight={c.faqTitleHighlight}
        description={c.faqDescription}
        items={c.faqs} 
        locale={locale}
      />

      {/* Final CTA */}
      <FinalCTA
        title={c.finalCtaTitle}
        titleHighlight={c.finalCtaTitleHighlight}
        description={c.finalCtaDescription}
        buttonText={c.finalCtaButton}
        href={getContactUrl(locale)}
      />
    </>
  )
}
