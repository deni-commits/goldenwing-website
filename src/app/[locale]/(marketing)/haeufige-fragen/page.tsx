import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FAQAccordion } from '@/components/sections/faq-section'
import { getCanonicalUrl, getHreflangAlternates, getContactUrl } from '@/lib/utils'
import { getFAQPage, type SupportedLocale } from '@/lib/payload'
import { Container } from '@/components/ui/container'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 60

// Default FAQ categories
const defaultContent = {
  de: {
    heroTitle: 'Häufige Fragen',
    heroSubtitle: 'Antworten auf die wichtigsten Fragen zu Webdesign, Branding, SEO und unseren Services.',
    heroButtonText: 'Frage nicht dabei? Kontaktieren Sie uns',
    moreInfoTitle: 'Weitere Informationen',
    moreInfoCards: [
      { title: 'Webdesign Wien', description: 'Detaillierte Informationen zu Preisen und Paketen für Webdesign.', linkText: 'Preise ansehen', linkHref: '/webdesign-wien' },
      { title: 'SEO Agentur Wien', description: 'Alles über unsere SEO-Leistungen und Pakete.', linkText: 'Mehr erfahren', linkHref: '/seo-agentur-wien' },
      { title: 'Alle Leistungen', description: 'Überblick über unser komplettes Service-Portfolio.', linkText: 'Leistungen entdecken', linkHref: '/leistungen' },
    ] as const satisfies Array<{ title: string; description: string; linkText: string; linkHref: StaticAppPathname }>,
    ctaTitle: 'Noch Fragen?',
    ctaDescription: 'Wir beraten Sie gerne persönlich – unverbindlich und kostenlos.',
    ctaPrimaryButton: 'Kontakt aufnehmen',
    ctaPhone: '+43 664 543 96 81',
    categories: [
      {
        title: 'Webdesign & Websites',
        icon: '🌐',
        slug: 'webdesign',
        questions: [
          { question: 'Was kostet eine professionelle Website?', answer: 'Professionelles Webdesign beginnt bei uns ab €2.000 für einfache Websites. Business-Websites mit CMS kosten €5.000-8.000. Komplexe E-Commerce-Lösungen liegen bei €10.000-20.000+.' },
          { question: 'Wie lange dauert die Erstellung einer Website?', answer: 'Eine einfache Website ist in 2-4 Wochen fertig. Business-Websites mit CMS benötigen 4-8 Wochen. Komplexe E-Commerce-Projekte können 8-12 Wochen dauern.' },
          { question: 'Kann ich meine Website selbst bearbeiten?', answer: 'Ja! Bei unseren Business- und Enterprise-Paketen ist ein benutzerfreundliches CMS inklusive. Nach einer kurzen Einschulung können Sie Inhalte selbstständig aktualisieren.' },
          { question: 'Ist die Website für Mobilgeräte optimiert?', answer: 'Ja, alle unsere Websites sind zu 100% responsive und mobile-first entwickelt.' },
          { question: 'Welche Technologien verwendet ihr?', answer: 'Wir setzen auf moderne Technologien wie Next.js, React und TypeScript für maximale Performance. Für CMS bieten wir WordPress und Payload CMS an.' },
          { question: 'Bietet ihr auch Hosting und Wartung an?', answer: 'Ja, wir bieten komplette Hosting-Pakete und laufende Wartung an. Im ersten Jahr ist Hosting bei den meisten Paketen inklusive.' },
        ],
      },
      {
        title: 'Branding & Corporate Design',
        icon: '🎨',
        slug: 'branding',
        questions: [
          { question: 'Was beinhaltet ein Branding-Paket?', answer: 'Ein vollständiges Branding-Paket umfasst: Markenstrategie, Logo-Design mit Varianten, Farbpalette und Typografie, Brand Guidelines und Geschäftsausstattung.' },
          { question: 'Wie lange dauert die Entwicklung einer Markenidentität?', answer: 'Ein professionelles Branding-Projekt dauert in der Regel 4-8 Wochen.' },
          { question: 'Was kostet ein Logo-Design?', answer: 'Ein professionelles Logo-Design beginnt bei €1.500. Komplette Branding-Pakete mit Guidelines starten bei €3.500.' },
          { question: 'Bekomme ich die Dateien in allen Formaten?', answer: 'Ja, Sie erhalten alle Dateien in verschiedenen Formaten (AI, EPS, PDF, SVG, PNG, JPG) für Print und Digital.' },
        ],
      },
      {
        title: 'SEO & Online Marketing',
        icon: '📈',
        slug: 'seo',
        questions: [
          { question: 'Wie lange dauert es, bis SEO Ergebnisse zeigt?', answer: 'SEO ist eine langfristige Strategie. Erste Verbesserungen sehen Sie oft nach 3-6 Monaten. Signifikante Ergebnisse erreichen wir nach 6-12 Monaten.' },
          { question: 'Was kostet SEO?', answer: 'Unsere SEO-Pakete starten bei €790/Monat. Für einen einmaligen SEO-Audit berechnen wir €490.' },
          { question: 'Garantiert ihr bestimmte Rankings?', answer: 'Seriöse SEO-Agenturen können keine konkreten Rankings garantieren. Was wir garantieren: professionelle Arbeit und messbare Verbesserungen.' },
          { question: 'Brauche ich SEO, wenn ich bereits Google Ads schalte?', answer: 'Ja! SEO und SEA ergänzen sich perfekt. SEO bringt nachhaltigen, kostenlosen Traffic, während Google Ads schnelle Ergebnisse liefert.' },
          { question: 'Was ist Local SEO?', answer: 'Local SEO fokussiert auf lokale Suchanfragen und optimiert Ihr Google Business Profile und lokale Verzeichnisse.' },
        ],
      },
      {
        title: 'Zusammenarbeit & Prozess',
        icon: '🤝',
        slug: 'prozess',
        questions: [
          { question: 'Wie läuft die Zusammenarbeit ab?', answer: 'Nach einem kostenlosen Erstgespräch erstellen wir ein Angebot. Bei Beauftragung starten wir mit Kickoff, Konzept, Design, Entwicklung und Testing.' },
          { question: 'Kann ich auch nur einzelne Leistungen buchen?', answer: 'Ja, Sie können sowohl Einzelleistungen als auch Komplettpakete buchen.' },
          { question: 'Arbeitet ihr auch mit Kunden außerhalb von Wien?', answer: 'Ja! Wir haben Büros in Wien, Dubai und California und arbeiten mit Kunden weltweit zusammen.' },
          { question: 'Wie kommunizieren wir während des Projekts?', answer: 'Je nach Präferenz über E-Mail, Telefon, Video-Calls oder persönliche Meetings. Sie haben einen festen Ansprechpartner.' },
          { question: 'Was passiert nach dem Projekt-Launch?', answer: 'Nach dem Launch bieten wir Support-Pakete für Wartung und Weiterentwicklung an. Im ersten Monat beheben wir Bugs kostenlos.' },
        ],
      },
      {
        title: 'Preise & Zahlung',
        icon: '💰',
        slug: 'preise',
        questions: [
          { question: 'Wie sind eure Zahlungsbedingungen?', answer: 'Bei Projekten über €2.000: 50% bei Auftragserteilung, 50% bei Fertigstellung.' },
          { question: 'Gibt es versteckte Kosten?', answer: 'Nein. Unser Angebot enthält alle besprochenen Leistungen transparent aufgeschlüsselt.' },
          { question: 'Bietet ihr Ratenzahlung an?', answer: 'Bei größeren Projekten können wir flexible Zahlungsmodelle vereinbaren.' },
          { question: 'Was ist, wenn ich mit dem Ergebnis nicht zufrieden bin?', answer: 'Wir arbeiten iterativ mit Feedback-Schleifen. Bei Unzufriedenheit finden wir gemeinsam eine Lösung.' },
        ],
      },
    ],
  },
  en: {
    heroTitle: 'Frequently Asked Questions',
    heroSubtitle: 'Answers to the most important questions about web design, branding, SEO and our services.',
    heroButtonText: 'Question not listed? Contact us',
    moreInfoTitle: 'More Information',
    moreInfoCards: [
      { title: 'Web Design Vienna', description: 'Detailed information about web design pricing and packages.', linkText: 'View Pricing', linkHref: '/webdesign-wien' },
      { title: 'SEO Agency Vienna', description: 'Everything about our SEO services and packages.', linkText: 'Learn more', linkHref: '/seo-agentur-wien' },
      { title: 'All Services', description: 'Overview of our complete service portfolio.', linkText: 'Discover Services', linkHref: '/leistungen' },
    ] as const satisfies Array<{ title: string; description: string; linkText: string; linkHref: StaticAppPathname }>,
    ctaTitle: 'Still have questions?',
    ctaDescription: 'We are happy to advise you personally – no obligation and free of charge.',
    ctaPrimaryButton: 'Contact Us',
    ctaPhone: '+43 664 543 96 81',
    categories: [
      {
        title: 'Web Design & Websites',
        icon: '🌐',
        slug: 'webdesign',
        questions: [
          { question: 'How much does a professional website cost?', answer: 'Professional web design starts at €2,000 for simple websites. Business websites with CMS cost €5,000-8,000. Complex e-commerce solutions range from €10,000-20,000+.' },
          { question: 'How long does it take to create a website?', answer: 'A simple website takes 2-4 weeks. Business websites with CMS need 4-8 weeks. Complex e-commerce projects can take 8-12 weeks.' },
          { question: 'Can I edit my website myself?', answer: 'Yes! Our Business and Enterprise packages include a user-friendly CMS. After a brief training, you can update content independently.' },
          { question: 'Is the website optimized for mobile devices?', answer: 'Yes, all our websites are 100% responsive and mobile-first developed.' },
          { question: 'What technologies do you use?', answer: 'We use modern technologies like Next.js, React and TypeScript for maximum performance. For CMS, we offer WordPress and Payload CMS.' },
          { question: 'Do you also offer hosting and maintenance?', answer: 'Yes, we offer complete hosting packages and ongoing maintenance. Hosting is included in the first year with most packages.' },
        ],
      },
      {
        title: 'Branding & Corporate Design',
        icon: '🎨',
        slug: 'branding',
        questions: [
          { question: 'What does a branding package include?', answer: 'A complete branding package includes: brand strategy, logo design with variants, color palette and typography, brand guidelines, and business stationery.' },
          { question: 'How long does it take to develop a brand identity?', answer: 'A professional branding project typically takes 4-8 weeks.' },
          { question: 'How much does logo design cost?', answer: 'Professional logo design starts at €1,500. Complete branding packages with guidelines start at €3,500.' },
          { question: 'Do I receive the files in all formats?', answer: 'Yes, you receive all files in various formats (AI, EPS, PDF, SVG, PNG, JPG) for print and digital use.' },
        ],
      },
      {
        title: 'SEO & Online Marketing',
        icon: '📈',
        slug: 'seo',
        questions: [
          { question: 'How long until SEO shows results?', answer: 'SEO is a long-term strategy. You\'ll often see first improvements after 3-6 months. Significant results are typically achieved after 6-12 months.' },
          { question: 'How much does SEO cost?', answer: 'Our SEO packages start at €790/month. A one-time SEO audit costs €490.' },
          { question: 'Do you guarantee specific rankings?', answer: 'Reputable SEO agencies cannot guarantee specific rankings. What we guarantee: professional work and measurable improvements.' },
          { question: 'Do I need SEO if I already run Google Ads?', answer: 'Yes! SEO and SEA complement each other perfectly. SEO brings sustainable, free traffic, while Google Ads delivers quick results.' },
          { question: 'What is Local SEO?', answer: 'Local SEO focuses on local search queries and optimizes your Google Business Profile and local directories.' },
        ],
      },
      {
        title: 'Collaboration & Process',
        icon: '🤝',
        slug: 'prozess',
        questions: [
          { question: 'How does collaboration work?', answer: 'After a free initial consultation, we create a proposal. Upon commissioning, we start with kickoff, concept, design, development, and testing.' },
          { question: 'Can I book individual services?', answer: 'Yes, you can book both individual services and complete packages.' },
          { question: 'Do you work with clients outside Vienna?', answer: 'Yes! With offices in Vienna, Dubai, and California, we work with clients worldwide.' },
          { question: 'How do we communicate during the project?', answer: 'Via email, phone, video calls, or in-person meetings, depending on your preference. You have a dedicated contact person.' },
          { question: 'What happens after the project launch?', answer: 'After launch, we offer support packages for maintenance and further development. We fix bugs free of charge in the first month.' },
        ],
      },
      {
        title: 'Pricing & Payment',
        icon: '💰',
        slug: 'preise',
        questions: [
          { question: 'What are your payment terms?', answer: 'For projects over €2,000: 50% upon commissioning, 50% upon completion.' },
          { question: 'Are there hidden costs?', answer: 'No. Our proposal contains all discussed services transparently itemized.' },
          { question: 'Do you offer payment plans?', answer: 'For larger projects, we can arrange flexible payment models.' },
          { question: 'What if I\'m not satisfied with the result?', answer: 'We work iteratively with feedback loops. If you\'re unsatisfied, we find a solution together.' },
        ],
      },
    ],
  },
  ru: {
    heroTitle: 'Часто задаваемые вопросы',
    heroSubtitle: 'Ответы на самые важные вопросы о веб-дизайне, брендинге, SEO и наших услугах.',
    heroButtonText: 'Не нашли ответ? Свяжитесь с нами',
    moreInfoTitle: 'Дополнительная информация',
    moreInfoCards: [
      { title: 'Веб-дизайн Вена', description: 'Подробная информация о ценах и пакетах веб-дизайна.', linkText: 'Посмотреть цены', linkHref: '/webdesign-wien' },
      { title: 'SEO-агентство Вена', description: 'Всё о наших SEO-услугах и пакетах.', linkText: 'Узнать больше', linkHref: '/seo-agentur-wien' },
      { title: 'Все услуги', description: 'Обзор нашего полного портфолио услуг.', linkText: 'Открыть услуги', linkHref: '/leistungen' },
    ] as const satisfies Array<{ title: string; description: string; linkText: string; linkHref: StaticAppPathname }>,
    ctaTitle: 'Остались вопросы?',
    ctaDescription: 'Мы с удовольствием проконсультируем вас лично — бесплатно и без обязательств.',
    ctaPrimaryButton: 'Связаться с нами',
    ctaPhone: '+43 664 543 96 81',
    categories: [
      {
        title: 'Веб-дизайн и сайты',
        icon: '🌐',
        slug: 'webdesign',
        questions: [
          { question: 'Сколько стоит профессиональный сайт?', answer: 'Профессиональный веб-дизайн начинается от €2 000 для простых сайтов. Бизнес-сайты с CMS стоят €5 000-8 000. Сложные решения для электронной коммерции — от €10 000-20 000+.' },
          { question: 'Сколько времени занимает создание сайта?', answer: 'Простой сайт готов за 2-4 недели. Бизнес-сайты с CMS требуют 4-8 недель. Сложные проекты электронной коммерции могут занять 8-12 недель.' },
          { question: 'Могу ли я сам редактировать свой сайт?', answer: 'Да! Наши пакеты Business и Enterprise включают удобную CMS. После краткого обучения вы сможете самостоятельно обновлять контент.' },
          { question: 'Оптимизирован ли сайт для мобильных устройств?', answer: 'Да, все наши сайты на 100% адаптивны и разработаны по принципу mobile-first.' },
          { question: 'Какие технологии вы используете?', answer: 'Мы используем современные технологии: Next.js, React и TypeScript для максимальной производительности. Для CMS предлагаем WordPress и Payload CMS.' },
          { question: 'Предлагаете ли вы хостинг и обслуживание?', answer: 'Да, мы предлагаем полные пакеты хостинга и постоянное обслуживание. В первый год хостинг включён в большинство пакетов.' },
        ],
      },
      {
        title: 'Брендинг и корпоративный дизайн',
        icon: '🎨',
        slug: 'branding',
        questions: [
          { question: 'Что входит в пакет брендинга?', answer: 'Полный пакет брендинга включает: стратегию бренда, дизайн логотипа с вариантами, цветовую палитру и типографику, руководство по бренду и деловую документацию.' },
          { question: 'Сколько времени занимает разработка фирменного стиля?', answer: 'Профессиональный проект брендинга обычно занимает 4-8 недель.' },
          { question: 'Сколько стоит дизайн логотипа?', answer: 'Профессиональный дизайн логотипа начинается от €1 500. Полные пакеты брендинга с руководством — от €3 500.' },
          { question: 'Получу ли я файлы во всех форматах?', answer: 'Да, вы получите все файлы в различных форматах (AI, EPS, PDF, SVG, PNG, JPG) для печати и цифрового использования.' },
        ],
      },
      {
        title: 'SEO и онлайн-маркетинг',
        icon: '📈',
        slug: 'seo',
        questions: [
          { question: 'Через какое время SEO даёт результаты?', answer: 'SEO — это долгосрочная стратегия. Первые улучшения часто видны через 3-6 месяцев. Значительные результаты достигаются через 6-12 месяцев.' },
          { question: 'Сколько стоит SEO?', answer: 'Наши SEO-пакеты начинаются от €790/месяц. Разовый SEO-аудит стоит €490.' },
          { question: 'Гарантируете ли вы определённые позиции в поиске?', answer: 'Серьёзные SEO-агентства не могут гарантировать конкретные позиции. Что мы гарантируем: профессиональную работу и измеримые улучшения.' },
          { question: 'Нужен ли мне SEO, если я уже использую Google Ads?', answer: 'Да! SEO и контекстная реклама отлично дополняют друг друга. SEO приносит устойчивый бесплатный трафик, а Google Ads даёт быстрые результаты.' },
          { question: 'Что такое локальное SEO?', answer: 'Локальное SEO фокусируется на местных поисковых запросах и оптимизирует ваш профиль Google Business и местные каталоги.' },
        ],
      },
      {
        title: 'Сотрудничество и процесс',
        icon: '🤝',
        slug: 'prozess',
        questions: [
          { question: 'Как проходит сотрудничество?', answer: 'После бесплатной первичной консультации мы составляем предложение. При заказе начинаем с kickoff, концепции, дизайна, разработки и тестирования.' },
          { question: 'Могу ли я заказать отдельные услуги?', answer: 'Да, вы можете заказать как отдельные услуги, так и полные пакеты.' },
          { question: 'Работаете ли вы с клиентами за пределами Вены?', answer: 'Да! С офисами в Вене, Дубае и Калифорнии мы работаем с клиентами по всему миру.' },
          { question: 'Как мы общаемся во время проекта?', answer: 'По электронной почте, телефону, видеозвонкам или на личных встречах — в зависимости от ваших предпочтений. У вас будет постоянный контактный специалист.' },
          { question: 'Что происходит после запуска проекта?', answer: 'После запуска мы предлагаем пакеты поддержки для обслуживания и дальнейшего развития. В первый месяц мы бесплатно исправляем ошибки.' },
        ],
      },
      {
        title: 'Цены и оплата',
        icon: '💰',
        slug: 'preise',
        questions: [
          { question: 'Каковы ваши условия оплаты?', answer: 'Для проектов свыше €2 000: 50% при заказе, 50% по завершении.' },
          { question: 'Есть ли скрытые расходы?', answer: 'Нет. Наше предложение содержит все обсуждённые услуги с прозрачной детализацией.' },
          { question: 'Предлагаете ли вы рассрочку?', answer: 'Для крупных проектов мы можем согласовать гибкие модели оплаты.' },
          { question: 'Что если я не доволен результатом?', answer: 'Мы работаем итеративно с циклами обратной связи. При неудовлетворённости мы вместе найдём решение.' },
        ],
      },
    ],
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const faqPage = await getFAQPage(locale as SupportedLocale)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cp = faqPage as Record<string, any> | null
  const hreflangAlternates = getHreflangAlternates('/haeufige-fragen')

  const title = cp?.seo?.metaTitle || { de: 'Häufige Fragen (FAQ) | Webdesign, Branding & SEO', en: 'FAQ | Web Design, Branding & SEO', ru: 'ЧаВо | Веб-дизайн, брендинг и SEO' }[locale as 'de' | 'en' | 'ru'] || 'Häufige Fragen (FAQ) | Webdesign, Branding & SEO'
  const description = cp?.seo?.metaDescription || { de: 'Antworten auf häufige Fragen zu Webdesign, Branding, SEO und unseren Services. Was kostet eine Website? Wie lange dauert ein Projekt?', en: 'Answers to frequently asked questions about web design, branding, SEO and our services. How much does a website cost? How long does a project take?', ru: 'Ответы на часто задаваемые вопросы о веб-дизайне, брендинге, SEO и наших услугах. Сколько стоит сайт? Сколько длится проект?' }[locale as 'de' | 'en' | 'ru'] || 'Antworten auf häufige Fragen zu Webdesign, Branding, SEO und unseren Services. Was kostet eine Website? Wie lange dauert ein Projekt?'
  const keywords = cp?.seo?.keywords || { de: 'FAQ Webdesign, Häufige Fragen Agentur, Was kostet Webdesign, SEO Fragen, Branding FAQ', en: 'FAQ Web Design, Agency Questions, Web Design Cost, SEO Questions, Branding FAQ', ru: 'ЧаВо веб-дизайн, вопросы агентству, стоимость веб-дизайна, вопросы SEO, брендинг FAQ' }[locale as 'de' | 'en' | 'ru'] || 'FAQ Webdesign, Häufige Fragen Agentur, Was kostet Webdesign, SEO Fragen, Branding FAQ'

  const ogTitle = { de: 'Häufige Fragen | GoldenWing Creative Studios', en: 'FAQ | GoldenWing Creative Studios', ru: 'ЧаВо | GoldenWing Creative Studios' }[locale as 'de' | 'en' | 'ru'] || 'Häufige Fragen | GoldenWing Creative Studios'
  const ogDescription = { de: 'Antworten auf alle wichtigen Fragen zu unseren Services.', en: 'Answers to all important questions about our services.', ru: 'Ответы на все важные вопросы о наших услугах.' }[locale as 'de' | 'en' | 'ru'] || 'Antworten auf alle wichtigen Fragen zu unseren Services.'

  return {
    title,
    description,
    keywords: keywords.split(',').map((k: string) => k.trim()),
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: getCanonicalUrl('/haeufige-fragen', locale),
      type: 'website',
      siteName: 'GoldenWing Creative Studios',
      images: [
        {
          url: 'https://goldenwing.at/og-image.jpg',
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: getCanonicalUrl('/haeufige-fragen', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function HaeufigeFragen({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const faqPage = await getFAQPage(locale as SupportedLocale)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cp = faqPage as Record<string, any> | null
  const defaults = defaultContent[locale as 'de' | 'en' | 'ru'] || defaultContent.de

  // Extract CMS arrays
  type Question = { question: string; answer: string }
  type Category = { title: string; icon: string; slug: string; questions: Question[] }
  type MoreInfoCard = { title: string; description: string; linkText: string; linkHref: StaticAppPathname }

  const cmsCategories = cp?.categories as Category[] | undefined
  const cmsMoreInfoCards = cp?.moreInfoCards as MoreInfoCard[] | undefined

  // Build content with CMS data or fallbacks
  const content: {
    heroTitle: string
    heroSubtitle: string
    heroButtonText: string
    moreInfoTitle: string
    moreInfoCards: readonly { title: string; description: string; linkText: string; linkHref: StaticAppPathname }[]
    ctaTitle: string
    ctaDescription: string
    ctaPrimaryButton: string
    ctaPhone: string
    categories: Category[]
  } = {
    heroTitle: cp?.heroTitle || defaults.heroTitle,
    heroSubtitle: cp?.heroSubtitle || defaults.heroSubtitle,
    heroButtonText: cp?.heroButtonText || defaults.heroButtonText,
    moreInfoTitle: cp?.moreInfoTitle || defaults.moreInfoTitle,
    moreInfoCards: cmsMoreInfoCards?.length ? cmsMoreInfoCards : defaults.moreInfoCards,
    ctaTitle: cp?.ctaTitle || defaults.ctaTitle,
    ctaDescription: cp?.ctaDescription || defaults.ctaDescription,
    ctaPrimaryButton: cp?.ctaPrimaryButton || defaults.ctaPrimaryButton,
    ctaPhone: cp?.ctaPhone || defaults.ctaPhone,
    categories: cmsCategories?.length ? cmsCategories : defaults.categories,
  }

  // FAQ Schema for all questions
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.categories.flatMap((category) =>
      category.questions.map((q) => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.answer,
        },
      }))
    ),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <Container variant="block">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4">FAQ</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {content.heroTitle}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {content.heroSubtitle}
            </p>
            <div className="flex justify-center">
              <Button asChild>
                <NextLink href={getContactUrl(locale)}>
                  {content.heroButtonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </NextLink>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Links */}
      <section className="py-12 border-y bg-muted/30">
        <Container variant="block">
          <div className="flex flex-wrap justify-center gap-4">
            {content.categories.map((category) => (
              <NextLink
                key={category.slug}
                href={`#${category.slug}`}
                className="px-4 py-2 bg-background border rounded-full text-sm hover:border-primary transition-colors flex items-center gap-2"
              >
                <span>{category.icon}</span>
                {category.title}
              </NextLink>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ Categories */}
      <section className="py-20">
        <Container variant="block">
          <div className="max-w-4xl mx-auto space-y-16">
            {content.categories.map((category) => (
              <div key={category.slug} id={category.slug} className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-3xl">{category.icon}</span>
                  <h2 className="text-3xl md:text-4xl font-bold">{category.title}</h2>
                </div>
                <FAQAccordion items={category.questions} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Related Links */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{content.moreInfoTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {content.moreInfoCards.map((card, index) => {
              // Type assertion needed because TypeScript can't narrow the union type from readonly array
              const href = card.linkHref as StaticAppPathname
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {card.description}
                    </p>
                    <Link href={href} className="text-primary text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                      {card.linkText} <ArrowRight className="h-3 w-3" />
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <Container variant="block" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {content.ctaTitle}
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {content.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <NextLink href={getContactUrl(locale)}>
                {content.ctaPrimaryButton}
                <ArrowRight className="ml-2 h-4 w-4" />
              </NextLink>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <NextLink href={`tel:${content.ctaPhone.replace(/\s/g, '')}`}>
                {content.ctaPhone}
              </NextLink>
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
