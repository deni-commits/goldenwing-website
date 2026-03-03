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
    { icon: 'award', text: '120+ Projekte' },
    { icon: 'star', text: '4.9/5 Bewertung' },
    { icon: 'clock', text: 'Seit 2013' },
  ],
  en: [
    { icon: 'award', text: '120+ Projects' },
    { icon: 'star', text: '4.9/5 Rating' },
    { icon: 'clock', text: 'Since 2013' },
  ],
  ru: [
    { icon: 'award', text: '120+ проектов' },
    { icon: 'star', text: '4.9/5 Рейтинг' },
    { icon: 'clock', text: 'С 2013 года' },
  ],
}

// ---------------------------------------------------------------------------
// Benefits
// ---------------------------------------------------------------------------
const benefits: Record<Locale, Benefit[]> = {
  de: [
    {
      icon: 'zap',
      title: 'Blitzschnell',
      description: 'Core Web Vitals optimiert für maximale Ladegeschwindigkeit und beste Nutzererfahrung.',
    },
    {
      icon: 'shield',
      title: 'Sicher',
      description: 'SSL-Verschlüsselung und moderne Sicherheitsstandards schützen Ihre Website und Besucher.',
    },
    {
      icon: 'users',
      title: 'Benutzerfreundlich',
      description: 'Intuitive Navigation und durchdachte UX sorgen für zufriedene Besucher und mehr Conversions.',
    },
    {
      icon: 'star',
      title: 'SEO-optimiert',
      description: 'Von Anfang an für Google optimiert — damit Ihre Website auch gefunden wird.',
    },
  ],
  en: [
    {
      icon: 'zap',
      title: 'Lightning Fast',
      description: 'Core Web Vitals optimized for maximum loading speed and best user experience.',
    },
    {
      icon: 'shield',
      title: 'Secure',
      description: 'SSL encryption and modern security standards protect your website and visitors.',
    },
    {
      icon: 'users',
      title: 'User-Friendly',
      description: 'Intuitive navigation and thoughtful UX ensure satisfied visitors and more conversions.',
    },
    {
      icon: 'star',
      title: 'SEO-Optimized',
      description: 'Optimized for Google from the start — so your website actually gets found.',
    },
  ],
  ru: [
    {
      icon: 'zap',
      title: 'Молниеносно',
      description: 'Оптимизация Core Web Vitals для максимальной скорости загрузки и лучшего пользовательского опыта.',
    },
    {
      icon: 'shield',
      title: 'Безопасно',
      description: 'SSL-шифрование и современные стандарты безопасности защищают ваш сайт и посетителей.',
    },
    {
      icon: 'users',
      title: 'Удобно',
      description: 'Интуитивная навигация и продуманный UX обеспечивают довольных посетителей и больше конверсий.',
    },
    {
      icon: 'star',
      title: 'SEO-оптимизировано',
      description: 'Оптимизировано для Google с самого начала — чтобы ваш сайт действительно находили.',
    },
  ],
}

// ---------------------------------------------------------------------------
// Packages
// ---------------------------------------------------------------------------
const packages: Record<Locale, Package[]> = {
  de: [
    {
      name: 'Starter',
      price: '€2.000',
      priceType: 'einmalig',
      description: 'Perfekt für kleine Unternehmen und Startups.',
      popular: false,
      features: [
        'Bis zu 5 Seiten',
        'Responsives Design',
        'Kontaktformular',
        'Basis-SEO',
        'SSL-Zertifikat',
        '1 Jahr Hosting inklusive',
      ],
    },
    {
      name: 'Business',
      price: '€5.000',
      priceType: 'einmalig',
      description: 'Ideal für wachsende Unternehmen mit höheren Ansprüchen.',
      popular: true,
      features: [
        'Bis zu 15 Seiten',
        'Content-Management-System',
        'Blog-Integration',
        'Erweiterte SEO-Optimierung',
        'Google Analytics',
        'Newsletter-Integration',
        'Social-Media-Einbindung',
        '2 Jahre Support',
      ],
    },
    {
      name: 'Enterprise',
      price: 'ab €10.000',
      priceType: 'einmalig',
      description: 'Maßgeschneiderte Lösung für große Unternehmen.',
      popular: false,
      features: [
        'Unbegrenzte Seiten',
        'Individuelle Entwicklung',
        'E-Commerce-Integration',
        'Mehrsprachigkeit',
        'API-Anbindungen',
        'Performance-Optimierung',
        'Dedizierter Projektmanager',
        'Premium-Support',
      ],
    },
  ],
  en: [
    {
      name: 'Starter',
      price: '€2,000',
      priceType: 'one-time',
      description: 'Perfect for small businesses and startups.',
      popular: false,
      features: [
        'Up to 5 pages',
        'Responsive design',
        'Contact form',
        'Basic SEO',
        'SSL certificate',
        '1 year hosting included',
      ],
    },
    {
      name: 'Business',
      price: '€5,000',
      priceType: 'one-time',
      description: 'Ideal for growing businesses with higher demands.',
      popular: true,
      features: [
        'Up to 15 pages',
        'Content management system',
        'Blog integration',
        'Advanced SEO optimization',
        'Google Analytics',
        'Newsletter integration',
        'Social media integration',
        '2 years support',
      ],
    },
    {
      name: 'Enterprise',
      price: 'from €10,000',
      priceType: 'one-time',
      description: 'Tailored solution for large enterprises.',
      popular: false,
      features: [
        'Unlimited pages',
        'Custom development',
        'E-commerce integration',
        'Multi-language support',
        'API integrations',
        'Performance optimization',
        'Dedicated project manager',
        'Premium support',
      ],
    },
  ],
  ru: [
    {
      name: 'Starter',
      price: '€2 000',
      priceType: 'единоразово',
      description: 'Идеально для малого бизнеса и стартапов.',
      popular: false,
      features: [
        'До 5 страниц',
        'Адаптивный дизайн',
        'Контактная форма',
        'Базовая SEO-оптимизация',
        'SSL-сертификат',
        '1 год хостинга включён',
      ],
    },
    {
      name: 'Business',
      price: '€5 000',
      priceType: 'единоразово',
      description: 'Идеально для растущих компаний с высокими требованиями.',
      popular: true,
      features: [
        'До 15 страниц',
        'Система управления контентом',
        'Интеграция блога',
        'Расширенная SEO-оптимизация',
        'Google Analytics',
        'Интеграция рассылки',
        'Интеграция социальных сетей',
        '2 года поддержки',
      ],
    },
    {
      name: 'Enterprise',
      price: 'от €10 000',
      priceType: 'единоразово',
      description: 'Индивидуальное решение для крупных компаний.',
      popular: false,
      features: [
        'Неограниченное количество страниц',
        'Индивидуальная разработка',
        'Интеграция электронной коммерции',
        'Мультиязычность',
        'Интеграция API',
        'Оптимизация производительности',
        'Выделенный менеджер проекта',
        'Премиум-поддержка',
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Process
// ---------------------------------------------------------------------------
const process: Record<Locale, ProcessStep[]> = {
  de: [
    {
      step: '01',
      title: 'Erstgespräch',
      description: 'Wir lernen Ihr Unternehmen und Ihre Ziele kennen und definieren gemeinsam die Anforderungen.',
    },
    {
      step: '02',
      title: 'Konzept & Design',
      description: 'Wir erstellen Wireframes und ein individuelles Design, das Ihre Marke perfekt repräsentiert.',
    },
    {
      step: '03',
      title: 'Entwicklung',
      description: 'Unsere Entwickler setzen das Design pixel-perfekt um — responsiv, schnell und sicher.',
    },
    {
      step: '04',
      title: 'Testing & Launch',
      description: 'Umfassende Tests auf allen Geräten und Browsern vor dem Go-Live.',
    },
    {
      step: '05',
      title: 'Support',
      description: 'Auch nach dem Launch stehen wir Ihnen mit Wartung, Updates und Support zur Seite.',
    },
  ],
  en: [
    {
      step: '01',
      title: 'Initial Consultation',
      description: 'We get to know your business and goals and define the requirements together.',
    },
    {
      step: '02',
      title: 'Concept & Design',
      description: 'We create wireframes and a custom design that perfectly represents your brand.',
    },
    {
      step: '03',
      title: 'Development',
      description: 'Our developers implement the design pixel-perfectly — responsive, fast, and secure.',
    },
    {
      step: '04',
      title: 'Testing & Launch',
      description: 'Comprehensive testing on all devices and browsers before going live.',
    },
    {
      step: '05',
      title: 'Support',
      description: 'Even after launch, we support you with maintenance, updates, and ongoing assistance.',
    },
  ],
  ru: [
    {
      step: '01',
      title: 'Первичная консультация',
      description: 'Мы знакомимся с вашим бизнесом и целями и совместно определяем требования.',
    },
    {
      step: '02',
      title: 'Концепция и дизайн',
      description: 'Мы создаём вайрфреймы и индивидуальный дизайн, идеально представляющий ваш бренд.',
    },
    {
      step: '03',
      title: 'Разработка',
      description: 'Наши разработчики реализуют дизайн с точностью до пикселя — адаптивно, быстро и безопасно.',
    },
    {
      step: '04',
      title: 'Тестирование и запуск',
      description: 'Комплексное тестирование на всех устройствах и браузерах перед запуском.',
    },
    {
      step: '05',
      title: 'Поддержка',
      description: 'Даже после запуска мы поддерживаем вас обновлениями, обслуживанием и помощью.',
    },
  ],
}

// ---------------------------------------------------------------------------
// Technologies
// ---------------------------------------------------------------------------
const technologies = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WordPress', 'Webflow', 'Shopify', 'Node.js']

// ---------------------------------------------------------------------------
// Related Services
// ---------------------------------------------------------------------------
const relatedServices: Record<Locale, RelatedService[]> = {
  de: [
    {
      title: 'SEO Wien',
      description: 'Suchmaschinenoptimierung für mehr Sichtbarkeit und organischen Traffic.',
      href: '/seo-agentur-wien',
    },
    {
      title: 'Branding',
      description: 'Markenentwicklung für einen einzigartigen und konsistenten Auftritt.',
      href: '/leistungen/branding',
    },
    {
      title: 'E-Commerce',
      description: 'Online-Shops, die verkaufen — modern, sicher und benutzerfreundlich.',
      href: '/leistungen/webdesign',
    },
  ],
  en: [
    {
      title: 'SEO Vienna',
      description: 'Search engine optimization for more visibility and organic traffic.',
      href: '/seo-agentur-wien',
    },
    {
      title: 'Branding',
      description: 'Brand development for a unique and consistent presence.',
      href: '/leistungen/branding',
    },
    {
      title: 'E-Commerce',
      description: 'Online shops that sell — modern, secure, and user-friendly.',
      href: '/leistungen/webdesign',
    },
  ],
  ru: [
    {
      title: 'SEO Вена',
      description: 'Поисковая оптимизация для большей видимости и органического трафика.',
      href: '/seo-agentur-wien',
    },
    {
      title: 'Брендинг',
      description: 'Развитие бренда для уникального и последовательного присутствия.',
      href: '/leistungen/branding',
    },
    {
      title: 'Электронная коммерция',
      description: 'Интернет-магазины, которые продают — современные, безопасные и удобные.',
      href: '/leistungen/webdesign',
    },
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
        question: `Was kostet eine professionelle Website ${prep.de} ${city}?`,
        answer: `Die Kosten für eine professionelle Website ${prep.de} ${city} variieren je nach Umfang und Anforderungen. Unsere Pakete starten bei €2.000 für eine Starter-Website und reichen bis €10.000+ für Enterprise-Lösungen. Kontaktieren Sie uns für ein individuelles Angebot.`,
      },
      {
        question: `Wie lange dauert die Erstellung einer Website ${prep.de} ${city}?`,
        answer: `Eine Starter-Website ist in 2–4 Wochen fertig, Business-Websites in 4–8 Wochen und Enterprise-Projekte in 8–16 Wochen. Der genaue Zeitrahmen hängt von Umfang und Komplexität ab.`,
      },
      {
        question: `Welches CMS empfehlen Sie für Unternehmen ${prep.de} ${city}?`,
        answer: `Die Wahl des CMS hängt von Ihren Anforderungen ab. Für die meisten Unternehmen ${prep.de} ${city} empfehlen wir WordPress für einfache Verwaltung oder Next.js für maximale Performance. Gerne beraten wir Sie individuell.`,
      },
      {
        question: `Ist die Website auch für Mobilgeräte optimiert?`,
        answer: `Ja, alle unsere Websites sind vollständig responsiv und für alle Geräte optimiert — vom Smartphone über Tablets bis zum Desktop. Responsive Design ist bei uns Standard.`,
      },
      {
        question: `Beinhaltet die Website auch SEO-Optimierung?`,
        answer: `Ja, alle unsere Webdesign-Pakete beinhalten eine grundlegende SEO-Optimierung. Dazu gehören technisches SEO, Meta-Tags, Seitenstruktur und Ladezeit-Optimierung. Für erweiterte SEO-Maßnahmen bieten wir separate SEO-Pakete an.`,
      },
    ],
    en: [
      {
        question: `How much does a professional website cost ${prep.en} ${city}?`,
        answer: `The cost of a professional website ${prep.en} ${city} varies depending on scope and requirements. Our packages start at €2,000 for a starter website and go up to €10,000+ for enterprise solutions. Contact us for a custom quote.`,
      },
      {
        question: `How long does it take to create a website ${prep.en} ${city}?`,
        answer: `A starter website takes 2–4 weeks, business websites 4–8 weeks, and enterprise projects 8–16 weeks. The exact timeline depends on scope and complexity.`,
      },
      {
        question: `Which CMS do you recommend for businesses ${prep.en} ${city}?`,
        answer: `The choice of CMS depends on your requirements. For most businesses ${prep.en} ${city}, we recommend WordPress for easy management or Next.js for maximum performance. We are happy to advise you individually.`,
      },
      {
        question: `Is the website also optimized for mobile devices?`,
        answer: `Yes, all our websites are fully responsive and optimized for all devices — from smartphones and tablets to desktops. Responsive design is our standard.`,
      },
      {
        question: `Does the website include SEO optimization?`,
        answer: `Yes, all our web design packages include basic SEO optimization. This includes technical SEO, meta tags, page structure, and loading time optimization. For advanced SEO measures, we offer separate SEO packages.`,
      },
    ],
    ru: [
      {
        question: `Сколько стоит профессиональный сайт ${prep.ru} ${city}?`,
        answer: `Стоимость профессионального сайта ${prep.ru} ${city} зависит от объёма и требований. Наши пакеты начинаются от €2 000 за стартовый сайт и до €10 000+ за корпоративные решения. Свяжитесь с нами для индивидуального предложения.`,
      },
      {
        question: `Сколько времени занимает создание сайта ${prep.ru} ${city}?`,
        answer: `Стартовый сайт готов за 2–4 недели, бизнес-сайты — за 4–8 недель, а корпоративные проекты — за 8–16 недель. Точные сроки зависят от объёма и сложности.`,
      },
      {
        question: `Какую CMS вы рекомендуете для компаний ${prep.ru} ${city}?`,
        answer: `Выбор CMS зависит от ваших требований. Для большинства компаний ${prep.ru} ${city} мы рекомендуем WordPress для удобного управления или Next.js для максимальной производительности. Мы с удовольствием проконсультируем вас индивидуально.`,
      },
      {
        question: `Оптимизирован ли сайт для мобильных устройств?`,
        answer: `Да, все наши сайты полностью адаптивны и оптимизированы для всех устройств — от смартфонов и планшетов до настольных компьютеров. Адаптивный дизайн — наш стандарт.`,
      },
      {
        question: `Включает ли сайт SEO-оптимизацию?`,
        answer: `Да, все наши пакеты веб-дизайна включают базовую SEO-оптимизацию. Сюда входят техническое SEO, мета-теги, структура страниц и оптимизация скорости загрузки. Для расширенных SEO-мер мы предлагаем отдельные SEO-пакеты.`,
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
      badge: `Webdesign Agentur ${city}`,
      title: `Professionelles Webdesign ${prep.de} ${city}`,
      description: `Moderne, schnelle und SEO-optimierte Websites für Unternehmen ${prep.de} ${city}. Wir entwickeln maßgeschneiderte Webauftritte, die Ihre Marke perfekt repräsentieren und Besucher in Kunden verwandeln.`,
      ctaPrimary: 'Kostenlose Beratung',
      ctaSecondary: 'Projekte ansehen',
    },
    en: {
      badge: `Web Design Agency ${city}`,
      title: `Professional Web Design ${prep.en} ${city}`,
      description: `Modern, fast, and SEO-optimized websites for businesses ${prep.en} ${city}. We develop tailored web presences that perfectly represent your brand and turn visitors into customers.`,
      ctaPrimary: 'Free Consultation',
      ctaSecondary: 'View Projects',
    },
    ru: {
      badge: `Агентство веб-дизайна ${city}`,
      title: `Профессиональный веб-дизайн ${prep.ru} ${city}`,
      description: `Современные, быстрые и SEO-оптимизированные сайты для компаний ${prep.ru} ${city}. Мы разрабатываем индивидуальные веб-решения, которые идеально представляют ваш бренд и превращают посетителей в клиентов.`,
      ctaPrimary: 'Бесплатная консультация',
      ctaSecondary: 'Смотреть проекты',
    },
  }
  return heroes[locale]
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
export function getWebdesignContent(citySlug: string, locale: Locale): LandingPageContent {
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
    process: process[locale],
    technologies,
    faqs: getFaqs(city, locale, isIndustry),
    relatedServices: relatedServices[locale],
    labels: {
      ...sharedLabels[locale],
      ctaTitle:
        locale === 'de'
          ? `Webdesign-Projekt ${prep.de} ${city} starten`
          : locale === 'en'
            ? `Start Your Web Design Project ${prep.en} ${city}`
            : `Начните ваш веб-дизайн проект ${prep.ru} ${city}`,
      ctaDescription:
        locale === 'de'
          ? `Lassen Sie uns über Ihr Webdesign-Projekt ${prep.de} ${city} sprechen. Kostenloses Erstgespräch ohne Verpflichtung.`
          : locale === 'en'
            ? `Let's talk about your web design project ${prep.en} ${city}. Free initial consultation with no obligation.`
            : `Давайте обсудим ваш проект веб-дизайна ${prep.ru} ${city}. Бесплатная первичная консультация без обязательств.`,
    },
  }
}

export function getWebdesignMeta(citySlug: string, locale: Locale): { metaTitle: string; metaDescription: string } {
  const cityConfig = getCityBySlug(citySlug)
  const industryConfig = getIndustryBySlug(citySlug)
  const city = cityConfig?.cityName[locale] ?? industryConfig?.name[locale] ?? citySlug
  const isIndustry = !cityConfig && !!industryConfig

  const meta: Record<Locale, { metaTitle: string; metaDescription: string }> = {
    de: {
      metaTitle: `Webdesign ${city} | GoldenWing Creative Studios`,
      metaDescription: `Webdesign Agentur für ${city}. Moderne, schnelle und SEO-optimierte Websites. Responsive Design, CMS-Integration und persönlicher Support. Jetzt anfragen!`,
    },
    en: {
      metaTitle: `Web Design ${city} | GoldenWing Creative Studios`,
      metaDescription: `Web design agency for ${city}. Modern, fast, and SEO-optimized websites. Responsive design, CMS integration, and personal support. Get in touch!`,
    },
    ru: {
      metaTitle: `Веб-дизайн ${city} | GoldenWing Creative Studios`,
      metaDescription: `Агентство веб-дизайна для ${city}. Современные, быстрые и SEO-оптимизированные сайты. Адаптивный дизайн, интеграция CMS и персональная поддержка. Свяжитесь с нами!`,
    },
  }
  return meta[locale]
}
