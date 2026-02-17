import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import { ArrowRight, Image, Users, TrendingUp, MessageCircle, Target, BarChart3, CheckCircle, Phone, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FAQSection } from '@/components/sections/faq-section'
import { getTranslations } from 'next-intl/server'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription, getContactUrl } from '@/lib/utils'
import { SupportedLocale } from '@/lib/payload'
import { BreadcrumbListSchema, AggregateRatingSchema } from '@/components/seo/json-ld'
import { Container } from '@/components/ui/container'
import { ProcessExpandingRows } from '@/components/process-sections/ProcessExpandingRows'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 60

const iconMap: Record<string, LucideIcon> = {
  'image': Image,
  'users': Users,
  'trending-up': TrendingUp,
  'message-circle': MessageCircle,
  'target': Target,
  'bar-chart-3': BarChart3,
}

// Default content for Social Media Agentur page
const defaultServices = {
  de: [
    { icon: 'image', title: 'Content-Erstellung', description: 'Kreative Posts, Stories, Reels und Videos fuer alle Plattformen. Bildbearbeitung, Grafikdesign und Copywriting inklusive.' },
    { icon: 'message-circle', title: 'Community Management', description: 'Aktive Betreuung Ihrer Community: Kommentare, Nachrichten, Krisenmanagement und Engagement-Steigerung.' },
    { icon: 'target', title: 'Paid Social', description: 'Zielgerichtete Werbung auf Facebook, Instagram, LinkedIn und TikTok. Kampagnen-Setup und laufende Optimierung.' },
    { icon: 'trending-up', title: 'Strategie-Entwicklung', description: 'Social-Media-Strategie basierend auf Ihren Zielen, Zielgruppen und Ressourcen. Content-Planung und Redaktionskalender.' },
    { icon: 'bar-chart-3', title: 'Analytics & Reporting', description: 'Datengetriebene Insights: Reichweite, Engagement, Follower-Wachstum und Conversion-Tracking.' },
    { icon: 'users', title: 'Influencer Marketing', description: 'Identifikation und Management von Influencer-Kooperationen. Von Micro bis Macro Influencern.' },
  ],
  en: [
    { icon: 'image', title: 'Content Creation', description: 'Creative posts, stories, reels, and videos for all platforms. Image editing, graphic design, and copywriting included.' },
    { icon: 'message-circle', title: 'Community Management', description: 'Active management of your community: Comments, messages, crisis management, and engagement boosting.' },
    { icon: 'target', title: 'Paid Social', description: 'Targeted advertising on Facebook, Instagram, LinkedIn, and TikTok. Campaign setup and ongoing optimization.' },
    { icon: 'trending-up', title: 'Strategy Development', description: 'Social media strategy based on your goals, audiences, and resources. Content planning and editorial calendar.' },
    { icon: 'bar-chart-3', title: 'Analytics & Reporting', description: 'Data-driven insights: Reach, engagement, follower growth, and conversion tracking.' },
    { icon: 'users', title: 'Influencer Marketing', description: 'Identification and management of influencer collaborations. From micro to macro influencers.' },
  ],
  ru: [
    { icon: 'image', title: 'Создание контента', description: 'Креативные посты, сторис, рилсы и видео для всех платформ. Обработка изображений, графический дизайн и копирайтинг включены.' },
    { icon: 'message-circle', title: 'Управление сообществом', description: 'Активное управление вашим сообществом: комментарии, сообщения, антикризисное управление и повышение вовлеченности.' },
    { icon: 'target', title: 'Платная реклама', description: 'Таргетированная реклама в Facebook, Instagram, LinkedIn и TikTok. Настройка кампаний и постоянная оптимизация.' },
    { icon: 'trending-up', title: 'Разработка стратегии', description: 'Стратегия социальных сетей на основе ваших целей, аудитории и ресурсов. Планирование контента и редакционный календарь.' },
    { icon: 'bar-chart-3', title: 'Аналитика и отчетность', description: 'Аналитика на основе данных: охват, вовлеченность, рост подписчиков и отслеживание конверсий.' },
    { icon: 'users', title: 'Инфлюенсер-маркетинг', description: 'Поиск и управление сотрудничеством с инфлюенсерами. От микро- до макроинфлюенсеров.' },
  ],
}

const defaultPackages = {
  de: [
    { name: 'Starter', price: '790', priceType: 'ab/Monat', description: 'Fuer kleine Unternehmen', popular: false, features: ['1-2 Plattformen', '8 Posts pro Monat', 'Content-Erstellung', 'Basis-Community-Management', 'Monatliches Reporting', 'Content-Kalender', 'Hashtag-Strategie', 'E-Mail-Support'] },
    { name: 'Business', price: '1.490', priceType: 'ab/Monat', description: 'Fuer wachsende Unternehmen', popular: true, features: ['2-3 Plattformen', '16 Posts pro Monat', 'Stories & Reels inkl.', 'Aktives Community Management', 'Paid Social Betreuung', 'Woechentliches Reporting', 'Strategie-Calls', 'WhatsApp-Support'] },
    { name: 'Enterprise', price: '2.990', priceType: 'ab/Monat', description: 'Full-Service Betreuung', popular: false, features: ['Alle relevanten Plattformen', 'Taeglicher Content', 'Video-Produktion inkl.', '24/7 Community Management', 'Umfangreiche Paid-Kampagnen', 'Influencer-Kooperationen', 'Live-Dashboard', 'Dedizierter Account Manager'] },
  ],
  en: [
    { name: 'Starter', price: '790', priceType: 'from/month', description: 'For small businesses', popular: false, features: ['1-2 platforms', '8 posts per month', 'Content creation', 'Basic community management', 'Monthly reporting', 'Content calendar', 'Hashtag strategy', 'Email support'] },
    { name: 'Business', price: '1,490', priceType: 'from/month', description: 'For growing businesses', popular: true, features: ['2-3 platforms', '16 posts per month', 'Stories & Reels incl.', 'Active community management', 'Paid social management', 'Weekly reporting', 'Strategy calls', 'WhatsApp support'] },
    { name: 'Enterprise', price: '2,990', priceType: 'from/month', description: 'Full-service management', popular: false, features: ['All relevant platforms', 'Daily content', 'Video production incl.', '24/7 community management', 'Extensive paid campaigns', 'Influencer collaborations', 'Live dashboard', 'Dedicated account manager'] },
  ],
  ru: [
    { name: 'Starter', price: '790', priceType: 'от/месяц', description: 'Для малого бизнеса', popular: false, features: ['1-2 платформы', '8 постов в месяц', 'Создание контента', 'Базовое управление сообществом', 'Ежемесячная отчетность', 'Контент-календарь', 'Хештег-стратегия', 'Email-поддержка'] },
    { name: 'Business', price: '1 490', priceType: 'от/месяц', description: 'Для растущего бизнеса', popular: true, features: ['2-3 платформы', '16 постов в месяц', 'Stories и Reels вкл.', 'Активное управление сообществом', 'Ведение платной рекламы', 'Еженедельная отчетность', 'Стратегические созвоны', 'WhatsApp-поддержка'] },
    { name: 'Enterprise', price: '2 990', priceType: 'от/месяц', description: 'Полный сервис', popular: false, features: ['Все актуальные платформы', 'Ежедневный контент', 'Видеопроизводство вкл.', 'Круглосуточное управление сообществом', 'Масштабные рекламные кампании', 'Сотрудничество с инфлюенсерами', 'Live-дашборд', 'Персональный аккаунт-менеджер'] },
  ],
}

const defaultResults = {
  de: [
    { metric: '+425%', label: 'Durchschnittliches Engagement-Wachstum', client: 'Nach 6 Monaten' },
    { metric: '50+', label: 'Marken betreut', client: 'Im DACH-Raum' },
    { metric: '2M+', label: 'Erreichte Nutzer', client: 'Monatlich' },
  ],
  en: [
    { metric: '+425%', label: 'Average engagement growth', client: 'After 6 months' },
    { metric: '50+', label: 'Brands managed', client: 'In DACH region' },
    { metric: '2M+', label: 'Users reached', client: 'Monthly' },
  ],
  ru: [
    { metric: '+425%', label: 'Средний рост вовлеченности', client: 'За 6 месяцев' },
    { metric: '50+', label: 'Брендов под управлением', client: 'В регионе DACH' },
    { metric: '2M+', label: 'Охваченных пользователей', client: 'Ежемесячно' },
  ],
}

const defaultFaqs = {
  de: [
    { question: 'Welche Plattformen betreut ihr?', answer: 'Wir betreuen alle relevanten Plattformen: Instagram, Facebook, LinkedIn, TikTok, YouTube, Pinterest und X (Twitter). Die Auswahl richtet sich nach Ihrer Zielgruppe und Ihren Zielen - nicht jedes Unternehmen braucht jede Plattform.' },
    { question: 'Was kostet Social Media Marketing?', answer: 'Unsere Pakete starten ab 790 Euro monatlich fuer kleinere Unternehmen. Business-Pakete beginnen bei 1.490 Euro, Enterprise ab 2.990 Euro. Die genauen Kosten haengen von Plattformen, Content-Umfang und Betreuungsintensitaet ab.' },
    { question: 'Erstellt ihr auch Video-Content?', answer: 'Ja, Video-Content ist in unseren hoeheren Paketen enthalten. Wir produzieren Reels, TikToks, YouTube-Videos und Stories. Fuer aufwaendigere Produktionen erstellen wir individuelle Angebote.' },
    { question: 'Wie schnell sehe ich Ergebnisse?', answer: 'Organisches Wachstum braucht Zeit - rechnen Sie mit 3-6 Monaten fuer signifikante Ergebnisse. Mit Paid Social sehen Sie erste Ergebnisse sofort. Wichtig ist eine konsistente, langfristige Strategie.' },
    { question: 'Koennt ihr auch Paid Social Kampagnen betreuen?', answer: 'Ja, Paid Social ist ein wichtiger Teil unserer Dienstleistungen. Wir betreuen Facebook Ads, Instagram Ads, LinkedIn Ads und TikTok Ads. Die Betreuung ist in unseren Business- und Enterprise-Paketen enthalten.' },
    { question: 'Wie funktioniert das Community Management?', answer: 'Wir beantworten Kommentare und Nachrichten zeitnah, foerdern Interaktionen und moderieren bei Bedarf. Bei kritischen Situationen haben wir etablierte Krisenmanagement-Prozesse.' },
  ],
  en: [
    { question: 'Which platforms do you manage?', answer: 'We manage all relevant platforms: Instagram, Facebook, LinkedIn, TikTok, YouTube, Pinterest, and X (Twitter). The selection depends on your target audience and goals - not every business needs every platform.' },
    { question: 'How much does social media marketing cost?', answer: 'Our packages start at 790 euros monthly for smaller businesses. Business packages start at 1,490 euros, Enterprise from 2,990 euros. Exact costs depend on platforms, content volume, and management intensity.' },
    { question: 'Do you also create video content?', answer: 'Yes, video content is included in our higher packages. We produce Reels, TikToks, YouTube videos, and Stories. For more elaborate productions, we create custom quotes.' },
    { question: 'How quickly will I see results?', answer: 'Organic growth takes time - expect 3-6 months for significant results. With paid social, you see first results immediately. A consistent, long-term strategy is key.' },
    { question: 'Can you also manage paid social campaigns?', answer: 'Yes, paid social is an important part of our services. We manage Facebook Ads, Instagram Ads, LinkedIn Ads, and TikTok Ads. Management is included in our Business and Enterprise packages.' },
    { question: 'How does community management work?', answer: 'We respond to comments and messages promptly, encourage interactions, and moderate when needed. For critical situations, we have established crisis management processes.' },
  ],
  ru: [
    { question: 'Какие платформы вы ведете?', answer: 'Мы ведем все актуальные платформы: Instagram, Facebook, LinkedIn, TikTok, YouTube, Pinterest и X (Twitter). Выбор зависит от вашей целевой аудитории и целей - не каждому бизнесу нужна каждая платформа.' },
    { question: 'Сколько стоит маркетинг в социальных сетях?', answer: 'Наши пакеты начинаются от 790 евро в месяц для небольших компаний. Бизнес-пакеты начинаются от 1 490 евро, Enterprise от 2 990 евро. Точная стоимость зависит от платформ, объема контента и интенсивности ведения.' },
    { question: 'Вы также создаете видеоконтент?', answer: 'Да, видеоконтент включен в наши старшие пакеты. Мы производим Reels, TikTok-видео, YouTube-ролики и Stories. Для более сложных продакшенов мы составляем индивидуальные предложения.' },
    { question: 'Как быстро я увижу результаты?', answer: 'Органический рост требует времени - рассчитывайте на 3-6 месяцев для значительных результатов. С платной рекламой вы увидите первые результаты сразу. Ключевое - последовательная долгосрочная стратегия.' },
    { question: 'Вы также можете вести платные рекламные кампании?', answer: 'Да, платная реклама - важная часть наших услуг. Мы ведем Facebook Ads, Instagram Ads, LinkedIn Ads и TikTok Ads. Ведение включено в наши пакеты Business и Enterprise.' },
    { question: 'Как работает управление сообществом?', answer: 'Мы оперативно отвечаем на комментарии и сообщения, стимулируем взаимодействие и модерируем при необходимости. Для критических ситуаций у нас есть отработанные процессы антикризисного управления.' },
  ],
}

const defaultProcess = {
  de: [
    { step: '01', title: 'Audit', description: 'Analyse Ihrer aktuellen Social-Media-Praesenz' },
    { step: '02', title: 'Strategie', description: 'Ziele, Zielgruppen und Plattformen definieren' },
    { step: '03', title: 'Content', description: 'Redaktionsplan und Content-Produktion' },
    { step: '04', title: 'Publishing', description: 'Veroeffentlichung und Community-Betreuung' },
    { step: '05', title: 'Optimierung', description: 'Analyse, Learnings und Verbesserung' },
  ],
  en: [
    { step: '01', title: 'Audit', description: 'Analysis of your current social media presence' },
    { step: '02', title: 'Strategy', description: 'Define goals, audiences, and platforms' },
    { step: '03', title: 'Content', description: 'Editorial plan and content production' },
    { step: '04', title: 'Publishing', description: 'Publishing and community management' },
    { step: '05', title: 'Optimization', description: 'Analysis, learnings, and improvement' },
  ],
  ru: [
    { step: '01', title: 'Аудит', description: 'Анализ вашего текущего присутствия в социальных сетях' },
    { step: '02', title: 'Стратегия', description: 'Определение целей, аудитории и платформ' },
    { step: '03', title: 'Контент', description: 'Редакционный план и производство контента' },
    { step: '04', title: 'Публикация', description: 'Публикация и управление сообществом' },
    { step: '05', title: 'Оптимизация', description: 'Анализ, выводы и улучшение' },
  ],
}

const defaultRelatedServices = {
  de: [
    { title: 'Google Ads', description: 'Ergaenzende bezahlte Werbung fuer mehr Reichweite.', href: '/leistungen/google-ads-agentur' },
    { title: 'Grafikdesign', description: 'Professionelle Grafiken fuer Ihre Social-Media-Kanaele.', href: '/leistungen/grafikdesign' },
    { title: 'Content Marketing', description: 'Ganzheitliche Content-Strategie fuer alle Kanaele.', href: '/leistungen/seo-content' },
  ],
  en: [
    { title: 'Google Ads', description: 'Complementary paid advertising for more reach.', href: '/leistungen/google-ads-agentur' },
    { title: 'Graphic Design', description: 'Professional graphics for your social media channels.', href: '/leistungen/grafikdesign' },
    { title: 'Content Marketing', description: 'Holistic content strategy for all channels.', href: '/leistungen/seo-content' },
  ],
  ru: [
    { title: 'Google Ads', description: 'Дополнительная платная реклама для большего охвата.', href: '/leistungen/google-ads-agentur' },
    { title: 'Графический дизайн', description: 'Профессиональная графика для ваших каналов в социальных сетях.', href: '/leistungen/grafikdesign' },
    { title: 'Контент-маркетинг', description: 'Комплексная контент-стратегия для всех каналов.', href: '/leistungen/seo-content' },
  ],
} as const satisfies Record<'de' | 'en' | 'ru', Array<{ title: string; description: string; href: StaticAppPathname }>>

const defaultUsps = {
  de: [
    { title: 'Plattform-Experten', description: 'Spezialisiert auf alle relevanten Social-Plattformen.' },
    { title: 'Kreativer Content', description: 'Originelle Ideen statt 08/15-Posts.' },
    { title: 'Datengetrieben', description: 'Entscheidungen basieren auf Analytics, nicht Bauchgefuehl.' },
    { title: 'Full-Service', description: 'Von Strategie ueber Content bis Community Management.' },
  ],
  en: [
    { title: 'Platform Experts', description: 'Specialized in all relevant social platforms.' },
    { title: 'Creative Content', description: 'Original ideas instead of generic posts.' },
    { title: 'Data-Driven', description: 'Decisions based on analytics, not gut feeling.' },
    { title: 'Full Service', description: 'From strategy to content to community management.' },
  ],
  ru: [
    { title: 'Эксперты по платформам', description: 'Специализируемся на всех актуальных социальных платформах.' },
    { title: 'Креативный контент', description: 'Оригинальные идеи вместо шаблонных постов.' },
    { title: 'На основе данных', description: 'Решения основаны на аналитике, а не на интуиции.' },
    { title: 'Полный сервис', description: 'От стратегии через контент до управления сообществом.' },
  ],
}

const defaultPlatforms = {
  de: ['Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'YouTube', 'Pinterest', 'X (Twitter)'],
  en: ['Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'YouTube', 'Pinterest', 'X (Twitter)'],
  ru: ['Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'YouTube', 'Pinterest', 'X (Twitter)'],
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale

  const metaTitle = {
    de: 'Social Media Agentur Wien - Content, Ads & Community | GoldenWing',
    en: 'Social Media Agency Vienna - Content, Ads & Community | GoldenWing',
    ru: 'Агентство социальных сетей Вена | GoldenWing',
  }[locale] ?? 'Social Media Agency Vienna - Content, Ads & Community | GoldenWing'

  const metaDescription = truncateMetaDescription(
    {
      de: 'Social Media Agentur aus Wien: Starter ab 790 Euro/Monat, Business ab 1.490 Euro/Monat. Content-Erstellung, Community Management, Paid Social. 50+ Marken betreut!',
      en: 'Social media agency from Vienna: Starter from 790 euros/month, Business from 1,490 euros/month. Content creation, community management, paid social. 50+ brands managed!',
      ru: 'Агентство социальных сетей из Вены: Starter от 790 евро/месяц, Business от 1 490 евро/месяц. Создание контента, управление сообществом, платная реклама. 50+ брендов под управлением!',
    }[locale] ?? 'Social media agency from Vienna: Starter from 790 euros/month, Business from 1,490 euros/month. Content creation, community management, paid social. 50+ brands managed!'
  )

  const hreflangAlternates = getHreflangAlternates('/leistungen/social-media-agentur', locale)

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: {
      de: ['Social Media Agentur', 'Social Media Agentur Wien', 'Social Media Marketing', 'Instagram Agentur', 'Facebook Marketing', 'TikTok Agentur', 'LinkedIn Marketing'],
      en: ['Social Media Agency', 'Social Media Agency Vienna', 'Social Media Marketing', 'Instagram Agency', 'Facebook Marketing', 'TikTok Agency', 'LinkedIn Marketing'],
      ru: ['Агентство социальных сетей', 'Агентство социальных сетей Вена', 'Маркетинг в социальных сетях', 'Instagram агентство', 'Facebook маркетинг', 'TikTok агентство', 'LinkedIn маркетинг'],
    }[locale] ?? ['Social Media Agency', 'Social Media Agency Vienna', 'Social Media Marketing', 'Instagram Agency', 'Facebook Marketing', 'TikTok Agency', 'LinkedIn Marketing'],
    openGraph: {
      title: {
        de: 'Social Media Agentur Wien',
        en: 'Social Media Agency Vienna',
        ru: 'Агентство социальных сетей Вена',
      }[locale] ?? 'Social Media Agency Vienna',
      description: metaDescription,
      url: getCanonicalUrl('/leistungen/social-media-agentur', locale),
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing - Social Media Agentur' }],
    },
    alternates: {
      canonical: getCanonicalUrl('/leistungen/social-media-agentur', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function SocialMediaAgenturPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const t = await getTranslations({ locale, namespace: 'common' })

  const breadcrumbs = [
    { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale] ?? 'Home', url: 'https://goldenwing.at' },
    { name: { de: 'Leistungen', en: 'Services', ru: 'Услуги' }[locale] ?? 'Services', url: { de: 'https://goldenwing.at/leistungen', en: 'https://goldenwing.at/en/services', ru: 'https://goldenwing.at/ru/services' }[locale] ?? 'https://goldenwing.at/en/services' },
    { name: { de: 'Social Media Agentur', en: 'Social Media Agency', ru: 'Агентство социальных сетей' }[locale] ?? 'Social Media Agency', url: { de: 'https://goldenwing.at/leistungen/social-media-agentur', en: 'https://goldenwing.at/en/services/social-media-agency', ru: 'https://goldenwing.at/ru/services/social-media-agency' }[locale] ?? 'https://goldenwing.at/en/services/social-media-agency' },
  ]

  const heroData = {
    badge: { de: 'Social Media Agentur', en: 'Social Media Agency', ru: 'Агентство социальных сетей' }[locale] ?? 'Social Media Agency',
    title: { de: 'Social Media Agentur Wien', en: 'Social Media Agency Vienna', ru: 'Агентство социальных сетей Вена' }[locale] ?? 'Social Media Agency Vienna',
    subtitle: { de: 'Content, der verbindet.', en: 'Content that connects.', ru: 'Контент, который объединяет.' }[locale] ?? 'Content that connects.',
    description: {
      de: 'Professionelles Social Media Management aus Wien. Content-Erstellung, Community Management, Paid Social und Strategie-Entwicklung. 50+ Marken vertrauen auf unsere Expertise.',
      en: 'Professional social media management from Vienna. Content creation, community management, paid social, and strategy development. 50+ brands trust our expertise.',
      ru: 'Профессиональное управление социальными сетями из Вены. Создание контента, управление сообществом, платная реклама и разработка стратегии. 50+ брендов доверяют нашему опыту.',
    }[locale] ?? 'Professional social media management from Vienna. Content creation, community management, paid social, and strategy development. 50+ brands trust our expertise.',
    ctaPrimary: { de: 'Kostenloses Social Media Audit', en: 'Free Social Media Audit', ru: 'Бесплатный аудит социальных сетей' }[locale] ?? 'Free Social Media Audit',
    ctaSecondary: { de: 'Pakete ansehen', en: 'View Packages', ru: 'Посмотреть пакеты' }[locale] ?? 'View Packages',
  }

  const results = defaultResults[locale as 'de' | 'en' | 'ru'] ?? defaultResults['en']
  const services = defaultServices[locale as 'de' | 'en' | 'ru'] ?? defaultServices['en']
  const packages = defaultPackages[locale as 'de' | 'en' | 'ru'] ?? defaultPackages['en']
  const process = defaultProcess[locale as 'de' | 'en' | 'ru'] ?? defaultProcess['en']
  const faqs = defaultFaqs[locale as 'de' | 'en' | 'ru'] ?? defaultFaqs['en']
  const relatedServices = defaultRelatedServices[locale as 'de' | 'en' | 'ru'] ?? defaultRelatedServices['en']
  const usps = defaultUsps[locale as 'de' | 'en' | 'ru'] ?? defaultUsps['en']
  const platforms = defaultPlatforms[locale as 'de' | 'en' | 'ru'] ?? defaultPlatforms['en']

  const servicesTitle = { de: 'Unsere Social Media Leistungen', en: 'Our Social Media Services', ru: 'Наши услуги в социальных сетях' }[locale] ?? 'Our Social Media Services'
  const servicesDescription = {
    de: 'Von Content-Erstellung bis Community Management - alles fuer Ihren Social-Media-Erfolg.',
    en: 'From content creation to community management - everything for your social media success.',
    ru: 'От создания контента до управления сообществом - все для вашего успеха в социальных сетях.',
  }[locale] ?? 'From content creation to community management - everything for your social media success.'
  const pricingTitle = { de: 'Social Media Pakete', en: 'Social Media Packages', ru: 'Пакеты социальных сетей' }[locale] ?? 'Social Media Packages'
  const pricingDescription = {
    de: 'Flexible Pakete fuer jedes Budget und jede Anforderung.',
    en: 'Flexible packages for every budget and requirement.',
    ru: 'Гибкие пакеты для любого бюджета и требований.',
  }[locale] ?? 'Flexible packages for every budget and requirement.'
  const processTitle = { de: 'Unser Vorgehen', en: 'Our Approach', ru: 'Наш подход' }[locale] ?? 'Our Approach'
  const processDescription = {
    de: 'Strukturierter Prozess fuer erfolgreiches Social Media Management.',
    en: 'Structured process for successful social media management.',
    ru: 'Структурированный процесс для успешного управления социальными сетями.',
  }[locale] ?? 'Structured process for successful social media management.'
  const faqTitle = { de: 'Haeufige Fragen', en: 'Frequently Asked Questions', ru: 'Часто задаваемые вопросы' }[locale] ?? 'Frequently Asked Questions'
  const relatedServicesTitle = { de: 'Verwandte Leistungen', en: 'Related Services', ru: 'Связанные услуги' }[locale] ?? 'Related Services'
  const ctaTitle = { de: 'Bereit fuer mehr Social Media Praesenz?', en: 'Ready to Grow Your Social Presence?', ru: 'Готовы усилить свое присутствие в социальных сетях?' }[locale] ?? 'Ready to Grow Your Social Presence?'
  const ctaDescription = {
    de: 'Lassen Sie uns Ihre Social-Media-Kanaele analysieren - kostenlos und unverbindlich.',
    en: 'Let us analyze your social media channels - free and non-binding.',
    ru: 'Позвольте нам проанализировать ваши каналы в социальных сетях - бесплатно и без обязательств.',
  }[locale] ?? 'Let us analyze your social media channels - free and non-binding.'
  const ctaButton = { de: 'Kostenloses Audit anfordern', en: 'Request Free Audit', ru: 'Запросить бесплатный аудит' }[locale] ?? 'Request Free Audit'
  const uspsTitle = { de: 'Warum wir', en: 'Why Choose Us', ru: 'Почему мы' }[locale] ?? 'Why Choose Us'
  const platformsTitle = { de: 'Plattformen, die wir betreuen', en: 'Platforms We Manage', ru: 'Платформы, которые мы ведем' }[locale] ?? 'Platforms We Manage'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: { de: 'Social Media Agentur Wien', en: 'Social Media Agency Vienna', ru: 'Агентство социальных сетей Вена' }[locale] ?? 'Social Media Agency Vienna',
    alternateName: { de: 'Social Media Marketing Wien', en: 'Social Media Marketing Vienna', ru: 'Маркетинг в социальных сетях Вена' }[locale] ?? 'Social Media Marketing Vienna',
    url: 'https://goldenwing.at/leistungen/social-media-agentur',
    provider: {
      '@type': 'LocalBusiness',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
      address: { '@type': 'PostalAddress', streetAddress: 'Czeikestrasse 4/21', addressLocality: 'Wien', postalCode: '1100', addressCountry: 'AT' },
    },
    areaServed: [
      { '@type': 'Country', name: 'Austria' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'Switzerland' },
    ],
    description: {
      de: 'Professionelles Social Media Management in Wien. Content-Erstellung, Community Management, Paid Social und Strategie-Entwicklung.',
      en: 'Professional social media management in Vienna. Content creation, community management, paid social, and strategy development.',
      ru: 'Профессиональное управление социальными сетями в Вене. Создание контента, управление сообществом, платная реклама и разработка стратегии.',
    }[locale] ?? 'Professional social media management in Vienna. Content creation, community management, paid social, and strategy development.',
    offers: packages.map((pkg) => ({
      '@type': 'Offer',
      name: pkg.name,
      price: pkg.price.replace('.', '').replace(',', '').replace(' ', ''),
      priceCurrency: 'EUR',
      description: pkg.description,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <BreadcrumbListSchema items={breadcrumbs} />
      <AggregateRatingSchema ratingValue={4.9} ratingCount={47} />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <Container variant="block">
          <div className="max-w-4xl">
            <Badge className="mb-4">{heroData.badge}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{heroData.title}</h1>
            <p className="text-2xl text-primary font-medium mb-4">{heroData.subtitle}</p>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">{heroData.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <NextLink href={getContactUrl(locale)}>
                  {heroData.ctaPrimary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </NextLink>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <NextLink href="#pakete">{heroData.ctaSecondary}</NextLink>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Results */}
      <section className="py-16 border-y bg-muted/30">
        <Container variant="block">
          <div className="grid md:grid-cols-3 gap-8">
            {results.map((result: { metric: string; label: string; client: string }) => (
              <div key={result.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{result.metric}</div>
                <div className="font-medium mb-1">{result.label}</div>
                <div className="text-sm text-muted-foreground">{result.client}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* USPs */}
      <section className="py-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{uspsTitle}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {usps.map((usp: { title: string; description: string }) => (
              <Card key={usp.title}>
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-lg mb-2">{usp.title}</h3>
                  <p className="text-sm text-muted-foreground">{usp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Platforms */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{platformsTitle}</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {platforms.map((platform) => (
              <span key={platform} className="px-6 py-3 bg-background rounded-full font-medium border">
                {platform}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="py-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{servicesTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{servicesDescription}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service: { icon: string; title: string; description: string }) => {
              const IconComponent = iconMap[service.icon] || Image
              return (
                <Card key={service.title}>
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section id="pakete" className="py-20 bg-muted/30 scroll-mt-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{pricingTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{pricingDescription}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg: { name: string; price: string; priceType: string; description: string; popular: boolean; features: string[] }) => (
              <Card key={pkg.name} className={pkg.popular ? 'border-primary shadow-lg relative' : ''}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>{{ de: 'Am beliebtesten', en: 'Most Popular', ru: 'Самый популярный' }[locale] ?? 'Most Popular'}</Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-sm text-muted-foreground">{pkg.priceType} </span>
                    <span className="text-3xl font-bold">€{pkg.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {pkg.features.map((feature: string) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={pkg.popular ? 'default' : 'outline'} asChild>
                    <NextLink href={getContactUrl(locale)}>{{ de: 'Anfragen', en: 'Request', ru: 'Запросить' }[locale] ?? 'Request'}</NextLink>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Process - ProcessExpandingRows Layout */}
      <ProcessExpandingRows
        title={processTitle}
        subtitle={processDescription}
        steps={process.map(item => ({ num: item.step, title: item.title, description: item.description }))}
      />

      {/* FAQ */}
      {faqs.length > 0 && (
        <FAQSection
          title={faqTitle}
          items={faqs}
          className="bg-muted/30"
        />
      )}

      {/* Related Services */}
      <section className="py-20">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-8 text-center">{relatedServicesTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {relatedServices.map((service: { title: string; description: string; href: string }) => (
              <Card key={service.title}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>

                  {/* @ts-expect-error CMS data properly typed via satisfies */}

                  <Link href={service.href} className="text-primary text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                    {t('learnMore')} <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <Container variant="block" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{ctaTitle}</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">{ctaDescription}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <NextLink href={getContactUrl(locale)}>
                {ctaButton}
                <ArrowRight className="ml-2 h-4 w-4" />
              </NextLink>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <NextLink href="tel:+436645439681">
                <Phone className="mr-2 h-4 w-4" />
                +43 664 543 96 81
              </NextLink>
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
