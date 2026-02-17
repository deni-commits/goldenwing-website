import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import { ArrowRight, Palette, TrendingUp, Target, Globe, FileText, CheckCircle, Phone, Megaphone, PenTool, Camera, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { FAQSection } from '@/components/sections/faq-section'
import { ProcessVerticalStepper } from '@/components/process-sections/ProcessVerticalStepper'
import { getTranslations } from 'next-intl/server'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription, getContactUrl } from '@/lib/utils'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


type SupportedLocale = 'de' | 'en' | 'ru'

export const revalidate = 3600

const iconMap: Record<string, LucideIcon> = {
  'palette': Palette,
  'pen-tool': PenTool,
  'camera': Camera,
  'target': Target,
  'globe': Globe,
  'file-text': FileText,
  'trending-up': TrendingUp,
  'megaphone': Megaphone,
}

// Default content for Werbeagentur Linz - Volume: 880, KD: 27
const defaultContent = {
  de: {
    metaTitle: 'Werbeagentur Linz | Kreativagentur fuer Branding & Marketing',
    metaDescription: 'Werbeagentur in Linz fuer Branding, Corporate Design, Werbung und Marketing. Kreative Konzepte fuer oberoesterreichische Unternehmen. Full-Service von Strategie bis Umsetzung.',
    keywords: ['Werbeagentur Linz', 'Kreativagentur Linz', 'Werbung Linz', 'Marketing Agentur Linz', 'Branding Linz', 'Corporate Design Linz', 'Full-Service Agentur Linz'],
    heroTitle: 'Werbeagentur Linz – Kreative Werbung fuer Oberoesterreich',
    heroDescription: 'Als Werbeagentur in Linz entwickeln wir Markenstrategien, Corporate Designs und Werbekampagnen fuer oberoesterreichische Unternehmen. Von der Idee bis zur Umsetzung – alles aus einer Hand.',
    heroBadge: 'Werbeagentur Linz',
    ctaPrimary: 'Kostenlose Beratung',
    ctaSecondary: 'Unsere Leistungen',
  },
  en: {
    metaTitle: 'Advertising Agency Linz | Creative Agency for Branding & Marketing',
    metaDescription: 'Advertising agency in Linz for branding, corporate design, advertising and marketing. Creative concepts for Upper Austrian businesses. Full-service from strategy to execution.',
    keywords: ['Advertising Agency Linz', 'Creative Agency Linz', 'Advertising Linz', 'Marketing Agency Linz', 'Branding Linz', 'Corporate Design Linz', 'Full-Service Agency Linz'],
    heroTitle: 'Advertising Agency Linz – Creative Advertising for Upper Austria',
    heroDescription: 'As an advertising agency in Linz, we develop brand strategies, corporate designs and advertising campaigns for Upper Austrian businesses. From concept to execution – everything from one source.',
    heroBadge: 'Advertising Agency Linz',
    ctaPrimary: 'Free Consultation',
    ctaSecondary: 'Our Services',
  },
  ru: {
    metaTitle: 'Рекламное агентство Линц | Креативное агентство брендинга и маркетинга',
    metaDescription: 'Рекламное агентство в Линце: брендинг, корпоративный дизайн, реклама и маркетинг. Креативные концепции для компаний Верхней Австрии. Полный цикл услуг от стратегии до реализации.',
    keywords: ['Рекламное агентство Линц', 'Креативное агентство Линц', 'Реклама Линц', 'Маркетинговое агентство Линц', 'Брендинг Линц', 'Корпоративный дизайн Линц', 'Агентство полного цикла Линц'],
    heroTitle: 'Рекламное агентство Линц – Креативная реклама для Верхней Австрии',
    heroDescription: 'Как рекламное агентство в Линце, мы разрабатываем стратегии брендов, корпоративные дизайны и рекламные кампании для компаний Верхней Австрии. От идеи до реализации – всё из одних рук.',
    heroBadge: 'Рекламное агентство Линц',
    ctaPrimary: 'Бесплатная консультация',
    ctaSecondary: 'Наши услуги',
  }
}

const defaultServices = {
  de: [
    { icon: 'palette', title: 'Branding & Corporate Design', description: 'Entwicklung einzigartiger Markenidentitaeten. Logo-Design, Farbwelt, Typografie und umfassende Brand Guidelines fuer Linzer Unternehmen.' },
    { icon: 'pen-tool', title: 'Grafikdesign & Print', description: 'Professionelle Printmedien: Broschueren, Flyer, Plakate, Visitenkarten. Hochwertiges Design fuer alle Drucksachen.' },
    { icon: 'globe', title: 'Webdesign & Entwicklung', description: 'Moderne Websites, die konvertieren. Responsive Design, UX-Optimierung und SEO-freundliche Entwicklung.' },
    { icon: 'megaphone', title: 'Werbekampagnen', description: 'Kreative Kampagnen fuer Print, Digital und Out-of-Home. Von der Konzeption bis zur Mediaplanung.' },
    { icon: 'camera', title: 'Foto & Video Produktion', description: 'Professionelle Produktfotografie, Imagefilme und Social Media Content. Visuelle Inhalte, die begeistern.' },
    { icon: 'target', title: 'Online Marketing', description: 'Google Ads, Social Media Marketing und SEO. Digitale Strategien fuer mehr Reichweite und Umsatz.' },
  ],
  en: [
    { icon: 'palette', title: 'Branding & Corporate Design', description: 'Development of unique brand identities. Logo design, color palette, typography and comprehensive brand guidelines for Linz businesses.' },
    { icon: 'pen-tool', title: 'Graphic Design & Print', description: 'Professional print media: brochures, flyers, posters, business cards. High-quality design for all print materials.' },
    { icon: 'globe', title: 'Web Design & Development', description: 'Modern websites that convert. Responsive design, UX optimization and SEO-friendly development.' },
    { icon: 'megaphone', title: 'Advertising Campaigns', description: 'Creative campaigns for print, digital and out-of-home. From conception to media planning.' },
    { icon: 'camera', title: 'Photo & Video Production', description: 'Professional product photography, corporate videos and social media content. Visual content that inspires.' },
    { icon: 'target', title: 'Online Marketing', description: 'Google Ads, social media marketing and SEO. Digital strategies for more reach and revenue.' },
  ],
  ru: [
    { icon: 'palette', title: 'Брендинг и корпоративный дизайн', description: 'Разработка уникальной идентичности бренда. Дизайн логотипа, цветовая палитра, типографика и комплексные руководства по бренду для компаний Линца.' },
    { icon: 'pen-tool', title: 'Графический дизайн и печать', description: 'Профессиональные печатные материалы: брошюры, флаеры, плакаты, визитки. Качественный дизайн для всех печатных изданий.' },
    { icon: 'globe', title: 'Веб-дизайн и разработка', description: 'Современные сайты, которые конвертируют. Адаптивный дизайн, UX-оптимизация и SEO-дружественная разработка.' },
    { icon: 'megaphone', title: 'Рекламные кампании', description: 'Креативные кампании для печати, цифровых каналов и наружной рекламы. От концепции до медиапланирования.' },
    { icon: 'camera', title: 'Фото и видео производство', description: 'Профессиональная продуктовая фотография, корпоративные видео и контент для социальных сетей. Визуальный контент, который вдохновляет.' },
    { icon: 'target', title: 'Интернет-маркетинг', description: 'Google Ads, маркетинг в социальных сетях и SEO. Цифровые стратегии для большего охвата и дохода.' },
  ],
}

const defaultPackages = {
  de: [
    { name: 'Brand Starter', price: '2.900', priceType: 'einmalig', description: 'Fuer Startups und Neugruendungen', popular: false, features: ['Logo-Design (3 Konzepte)', 'Farbpalette & Typografie', 'Visitenkarten-Design', 'Basis Styleguide', 'Druckdaten-Export'] },
    { name: 'Brand Business', price: '5.900', priceType: 'einmalig', description: 'Komplettes Corporate Design', popular: true, features: ['Logo-Design (5 Konzepte)', 'Vollstaendiges Corporate Design', 'Geschaeftsausstattung', 'Umfassender Styleguide', 'Social Media Templates', 'Website-Design (Konzept)'] },
    { name: 'Brand Premium', price: 'ab 9.900', priceType: 'einmalig', description: 'Enterprise Branding', popular: false, features: ['Markenstrategie & Positionierung', 'Logo & komplette CI', 'Alle Geschaeftsmaterialien', 'Website-Design & Entwicklung', 'Fotoshooting', 'Videoproduktion', 'Launch-Kampagne'] },
  ],
  en: [
    { name: 'Brand Starter', price: '2,900', priceType: 'one-time', description: 'For startups and new businesses', popular: false, features: ['Logo design (3 concepts)', 'Color palette & typography', 'Business card design', 'Basic style guide', 'Print-ready files'] },
    { name: 'Brand Business', price: '5,900', priceType: 'one-time', description: 'Complete corporate design', popular: true, features: ['Logo design (5 concepts)', 'Full corporate design', 'Business stationery', 'Comprehensive style guide', 'Social media templates', 'Website design (concept)'] },
    { name: 'Brand Premium', price: 'from 9,900', priceType: 'one-time', description: 'Enterprise branding', popular: false, features: ['Brand strategy & positioning', 'Logo & complete CI', 'All business materials', 'Website design & development', 'Photo shoot', 'Video production', 'Launch campaign'] },
  ],
  ru: [
    { name: 'Brand Starter', price: '2 900', priceType: 'единоразово', description: 'Для стартапов и новых компаний', popular: false, features: ['Дизайн логотипа (3 концепции)', 'Цветовая палитра и типографика', 'Дизайн визиток', 'Базовый гайдлайн', 'Файлы для печати'] },
    { name: 'Brand Business', price: '5 900', priceType: 'единоразово', description: 'Полный корпоративный дизайн', popular: true, features: ['Дизайн логотипа (5 концепций)', 'Полный корпоративный дизайн', 'Деловая документация', 'Комплексный гайдлайн', 'Шаблоны для соцсетей', 'Дизайн сайта (концепция)'] },
    { name: 'Brand Premium', price: 'от 9 900', priceType: 'единоразово', description: 'Корпоративный брендинг', popular: false, features: ['Стратегия бренда и позиционирование', 'Логотип и полный CI', 'Все деловые материалы', 'Дизайн и разработка сайта', 'Фотосессия', 'Видеопроизводство', 'Кампания запуска'] },
  ],
}

const defaultResults = {
  de: [
    { metric: '250+', label: 'Branding-Projekte', client: 'seit 2014' },
    { metric: '98%', label: 'Kundenzufriedenheit', client: 'nachhaltige Partnerschaften' },
    { metric: '45+', label: 'Branchen bedient', client: 'branchenubergreifende Expertise' },
    { metric: '3', label: 'Standorte weltweit', client: 'Wien, Dubai, California' },
  ],
  en: [
    { metric: '250+', label: 'Branding projects', client: 'since 2014' },
    { metric: '98%', label: 'Client satisfaction', client: 'long-term partnerships' },
    { metric: '45+', label: 'Industries served', client: 'cross-industry expertise' },
    { metric: '3', label: 'Locations worldwide', client: 'Vienna, Dubai, California' },
  ],
  ru: [
    { metric: '250+', label: 'Проектов брендинга', client: 'с 2014 года' },
    { metric: '98%', label: 'Удовлетворённость клиентов', client: 'долгосрочное партнёрство' },
    { metric: '45+', label: 'Обслуженных отраслей', client: 'межотраслевая экспертиза' },
    { metric: '3', label: 'Офиса по всему миру', client: 'Вена, Дубай, Калифорния' },
  ],
}

const defaultFaqs = {
  de: [
    { question: 'Was kostet eine Werbeagentur in Linz?', answer: 'Die Kosten variieren je nach Projekt. Ein Logo-Design beginnt bei ca. 1.500 EUR, ein komplettes Corporate Design liegt zwischen 3.000 und 10.000 EUR. Wir erstellen gerne ein individuelles Angebot basierend auf Ihren Anforderungen.' },
    { question: 'Wie lange dauert ein Branding-Projekt?', answer: 'Ein Logo-Design dauert typischerweise 2-4 Wochen. Ein vollstaendiges Corporate Design benoetigt 6-10 Wochen. Groessere Projekte mit Website und Kampagnen koennen 3-6 Monate in Anspruch nehmen.' },
    { question: 'Arbeitet ihr nur mit grossen Unternehmen?', answer: 'Nein, wir betreuen Kunden aller Groessen – vom Ein-Personen-Unternehmen bis zum Konzern. Unsere Pakete sind skalierbar und auf verschiedene Budgets ausgerichtet.' },
    { question: 'Koennt ihr auch bestehende Marken ueberarbeiten?', answer: 'Ja, Rebranding ist eine unserer Kernkompetenzen. Wir analysieren Ihre aktuelle Marke, identifizieren Optimierungspotenziale und entwickeln eine modernisierte Version, die Ihre Werte besser kommuniziert.' },
    { question: 'Bietet ihr auch laufende Betreuung an?', answer: 'Ja, neben Projektarbeit bieten wir auch monatliche Retainer-Modelle fuer laufende Design- und Marketing-Arbeiten. Das umfasst Social Media Content, Anpassungen und Marketing-Support.' },
    { question: 'Was unterscheidet euch von anderen Werbeagenturen in Linz?', answer: 'Unsere Kombination aus strategischem Denken und kreativem Handwerk. Wir sind keine reine Grafikagentur – wir verstehen Marketing, SEO und Conversion-Optimierung und integrieren diese in jedes Designprojekt.' },
  ],
  en: [
    { question: 'How much does an advertising agency in Linz cost?', answer: 'Costs vary by project. Logo design starts at around 1,500 EUR, complete corporate design ranges from 3,000 to 10,000 EUR. We are happy to create a custom quote based on your requirements.' },
    { question: 'How long does a branding project take?', answer: 'Logo design typically takes 2-4 weeks. A complete corporate design needs 6-10 weeks. Larger projects with website and campaigns can take 3-6 months.' },
    { question: 'Do you only work with large companies?', answer: 'No, we serve clients of all sizes – from one-person businesses to corporations. Our packages are scalable and designed for different budgets.' },
    { question: 'Can you also redesign existing brands?', answer: 'Yes, rebranding is one of our core competencies. We analyze your current brand, identify optimization potential and develop a modernized version that better communicates your values.' },
    { question: 'Do you also offer ongoing support?', answer: 'Yes, besides project work we also offer monthly retainer models for ongoing design and marketing work. This includes social media content, adjustments and marketing support.' },
    { question: 'What sets you apart from other advertising agencies in Linz?', answer: 'Our combination of strategic thinking and creative craftsmanship. We are not just a graphics agency – we understand marketing, SEO and conversion optimization and integrate these into every design project.' },
  ],
  ru: [
    { question: 'Сколько стоит рекламное агентство в Линце?', answer: 'Стоимость зависит от проекта. Дизайн логотипа начинается от 1 500 EUR, полный корпоративный дизайн стоит от 3 000 до 10 000 EUR. Мы с удовольствием составим индивидуальное предложение на основе ваших требований.' },
    { question: 'Сколько времени занимает проект брендинга?', answer: 'Дизайн логотипа обычно занимает 2-4 недели. Полный корпоративный дизайн требует 6-10 недель. Крупные проекты с сайтом и кампаниями могут занять 3-6 месяцев.' },
    { question: 'Вы работаете только с крупными компаниями?', answer: 'Нет, мы обслуживаем клиентов любого размера – от индивидуальных предпринимателей до корпораций. Наши пакеты масштабируемы и рассчитаны на разные бюджеты.' },
    { question: 'Можете ли вы обновить существующий бренд?', answer: 'Да, ребрендинг – одна из наших ключевых компетенций. Мы анализируем ваш текущий бренд, выявляем потенциал для оптимизации и разрабатываем модернизированную версию, которая лучше передаёт ваши ценности.' },
    { question: 'Предлагаете ли вы постоянную поддержку?', answer: 'Да, помимо проектной работы мы предлагаем ежемесячные ретейнер-модели для постоянной дизайнерской и маркетинговой работы. Это включает контент для соцсетей, корректировки и маркетинговую поддержку.' },
    { question: 'Что отличает вас от других рекламных агентств в Линце?', answer: 'Наше сочетание стратегического мышления и креативного мастерства. Мы не просто графическое агентство – мы понимаем маркетинг, SEO и оптимизацию конверсии и интегрируем их в каждый дизайн-проект.' },
  ],
}

const defaultProcess = {
  de: [
    { step: '01', title: 'Briefing', description: 'Kennenlernen, Ziele verstehen, Marktanalyse' },
    { step: '02', title: 'Konzept', description: 'Strategieentwicklung, Moodboards, erste Ideen' },
    { step: '03', title: 'Design', description: 'Kreative Umsetzung, Praesentation, Feedback' },
    { step: '04', title: 'Refinement', description: 'Feinschliff basierend auf Ihrem Feedback' },
    { step: '05', title: 'Delivery', description: 'Finale Dateien, Styleguide, Implementierung' },
  ],
  en: [
    { step: '01', title: 'Briefing', description: 'Getting to know each other, understanding goals, market analysis' },
    { step: '02', title: 'Concept', description: 'Strategy development, moodboards, initial ideas' },
    { step: '03', title: 'Design', description: 'Creative execution, presentation, feedback' },
    { step: '04', title: 'Refinement', description: 'Fine-tuning based on your feedback' },
    { step: '05', title: 'Delivery', description: 'Final files, style guide, implementation' },
  ],
  ru: [
    { step: '01', title: 'Брифинг', description: 'Знакомство, понимание целей, анализ рынка' },
    { step: '02', title: 'Концепция', description: 'Разработка стратегии, мудборды, первые идеи' },
    { step: '03', title: 'Дизайн', description: 'Креативная реализация, презентация, обратная связь' },
    { step: '04', title: 'Доработка', description: 'Финальная доработка на основе вашей обратной связи' },
    { step: '05', title: 'Сдача', description: 'Финальные файлы, гайдлайн, внедрение' },
  ],
}

const defaultRelatedServices = {
  de: [
    { title: 'Online Marketing Linz', description: 'Digitale Strategien fuer mehr Sichtbarkeit und Kunden.', href: '/online-marketing-agentur-linz' },
    { title: 'Webdesign Linz', description: 'Moderne Websites, die Besucher zu Kunden machen.', href: '/webdesign-linz' },
    { title: 'SEO Agentur Linz', description: 'Nachhaltige Sichtbarkeit bei Google.', href: '/seo-agentur-linz' },
  ],
  en: [
    { title: 'Online Marketing Linz', description: 'Digital strategies for more visibility and customers.', href: '/online-marketing-agentur-linz' },
    { title: 'Web Design Linz', description: 'Modern websites that turn visitors into customers.', href: '/webdesign-linz' },
    { title: 'SEO Agency Linz', description: 'Sustainable visibility on Google.', href: '/seo-agentur-linz' },
  ],
  ru: [
    { title: 'Интернет-маркетинг Линц', description: 'Цифровые стратегии для большей видимости и клиентов.', href: '/online-marketing-agentur-linz' },
    { title: 'Веб-дизайн Линц', description: 'Современные сайты, которые превращают посетителей в клиентов.', href: '/webdesign-linz' },
    { title: 'SEO-агентство Линц', description: 'Устойчивая видимость в Google.', href: '/seo-agentur-linz' },
  ],
} as const satisfies Record<'de' | 'en' | 'ru', Array<{ title: string; description: string; href: StaticAppPathname }>>

const whyChooseUs = {
  de: {
    title: 'Warum GoldenWing als Werbeagentur in Linz?',
    reasons: [
      { title: 'Kreativitaet mit Strategie', description: 'Design ist mehr als schoen aussehen. Jedes Projekt basiert auf strategischen Ueberlegungen und klaren Zielen.' },
      { title: 'Full-Service Agentur', description: 'Von Branding ueber Print bis Digital – alles aus einer Hand. Keine Koordination zwischen verschiedenen Dienstleistern.' },
      { title: 'Regionale Naehe', description: 'Als Agentur mit starker Praesenz in Oesterreich verstehen wir den lokalen Markt und Ihre Zielgruppe.' },
      { title: 'Internationale Erfahrung', description: 'Mit Standorten in Wien, Dubai und California bringen wir globale Perspektiven in lokale Projekte.' },
    ],
  },
  en: {
    title: 'Why Choose GoldenWing as Advertising Agency in Linz?',
    reasons: [
      { title: 'Creativity with Strategy', description: 'Design is more than looking good. Every project is based on strategic considerations and clear goals.' },
      { title: 'Full-Service Agency', description: 'From branding to print to digital – everything from one source. No coordination between different providers.' },
      { title: 'Regional Proximity', description: 'As an agency with strong presence in Austria, we understand the local market and your target audience.' },
      { title: 'International Experience', description: 'With locations in Vienna, Dubai and California, we bring global perspectives to local projects.' },
    ],
  },
  ru: {
    title: 'Почему GoldenWing как рекламное агентство в Линце?',
    reasons: [
      { title: 'Креативность со стратегией', description: 'Дизайн – это больше, чем красивый вид. Каждый проект основан на стратегических соображениях и чётких целях.' },
      { title: 'Агентство полного цикла', description: 'От брендинга до печати и цифровых решений – всё из одних рук. Никакой координации между разными подрядчиками.' },
      { title: 'Региональная близость', description: 'Как агентство с сильным присутствием в Австрии, мы понимаем местный рынок и вашу целевую аудиторию.' },
      { title: 'Международный опыт', description: 'С офисами в Вене, Дубае и Калифорнии мы привносим глобальные перспективы в локальные проекты.' },
    ],
  },
}

// Linz-specific content section
const linzContext = {
  de: {
    title: 'Werbeagentur fuer Linz und Oberoesterreich',
    description: 'Linz ist das wirtschaftliche Herz Oberoesterreichs. Als Industriestandort mit Unternehmen wie voestalpine, gleichzeitig Kulturhauptstadt mit Ars Electronica und aufstrebender Startup-Hub in der Tabakfabrik – die Stadt vereint Tradition und Innovation. Genau diese Vielfalt spiegeln wir in unserer Arbeit wider: kreative Loesungen, die sowohl etablierte Industrieunternehmen als auch innovative Startups ansprechen.',
    highlights: [
      'Erfahrung mit Linzer Industrieunternehmen und Zulieferern',
      'Kenntnis des Startup-Oekosystems (Tabakfabrik, tech2b)',
      'Verstaendnis fuer B2B-Marketing in der Region',
      'Netzwerk zu lokalen Medien und Multiplikatoren',
    ],
  },
  en: {
    title: 'Advertising Agency for Linz and Upper Austria',
    description: 'Linz is the economic heart of Upper Austria. As an industrial hub with companies like voestalpine, simultaneously a cultural capital with Ars Electronica and an emerging startup hub in Tabakfabrik – the city combines tradition and innovation. We reflect exactly this diversity in our work: creative solutions that appeal to both established industrial companies and innovative startups.',
    highlights: [
      'Experience with Linz industrial companies and suppliers',
      'Knowledge of the startup ecosystem (Tabakfabrik, tech2b)',
      'Understanding of B2B marketing in the region',
      'Network with local media and multipliers',
    ],
  },
  ru: {
    title: 'Рекламное агентство для Линца и Верхней Австрии',
    description: 'Линц – экономическое сердце Верхней Австрии. Как промышленный центр с компаниями вроде voestalpine, одновременно культурная столица с Ars Electronica и развивающийся стартап-хаб в Tabakfabrik – город сочетает традиции и инновации. Именно это разнообразие мы отражаем в нашей работе: креативные решения, которые привлекают как устоявшиеся промышленные компании, так и инновационные стартапы.',
    highlights: [
      'Опыт работы с промышленными компаниями и поставщиками Линца',
      'Знание стартап-экосистемы (Tabakfabrik, tech2b)',
      'Понимание B2B-маркетинга в регионе',
      'Связи с местными СМИ и лидерами мнений',
    ],
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const content = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']

  const hreflangAlternates = getHreflangAlternates('/werbeagentur-linz', locale)

  return {
    title: content.metaTitle,
    description: truncateMetaDescription(content.metaDescription),
    keywords: content.keywords,
    openGraph: {
      title: content.heroTitle,
      description: truncateMetaDescription(content.metaDescription),
      url: getCanonicalUrl('/werbeagentur-linz', locale),
      type: 'website',
      siteName: 'GoldenWing Creative Studios',
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing Creative Studios' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.heroTitle,
      description: truncateMetaDescription(content.metaDescription),
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: getCanonicalUrl('/werbeagentur-linz', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function WerbeagenturLinzPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const common = await getTranslations({ locale, namespace: 'common' })

  const content = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']
  const results = defaultResults[locale as 'de' | 'en' | 'ru'] ?? defaultResults['en']
  const services = defaultServices[locale as 'de' | 'en' | 'ru'] ?? defaultServices['en']
  const packages = defaultPackages[locale as 'de' | 'en' | 'ru'] ?? defaultPackages['en']
  const process = defaultProcess[locale as 'de' | 'en' | 'ru'] ?? defaultProcess['en']
  const faqs = defaultFaqs[locale as 'de' | 'en' | 'ru'] ?? defaultFaqs['en']
  const relatedServices = defaultRelatedServices[locale as 'de' | 'en' | 'ru'] ?? defaultRelatedServices['en']
  const whyUs = whyChooseUs[locale as 'de' | 'en' | 'ru'] ?? whyChooseUs['en']
  const linz = linzContext[locale as 'de' | 'en' | 'ru'] ?? linzContext['en']

  const servicesTitle = { de: 'Unsere Werbe- & Design-Leistungen', en: 'Our Advertising & Design Services', ru: 'Наши рекламные и дизайн-услуги' }[locale] ?? 'Our Advertising & Design Services'
  const servicesDescription = { de: 'Full-Service Kreativloesungen fuer oberoesterreichische Unternehmen.', en: 'Full-service creative solutions for Upper Austrian businesses.', ru: 'Полный спектр креативных решений для компаний Верхней Австрии.' }[locale] ?? 'Full-service creative solutions for Upper Austrian businesses.'
  const pricingTitle = { de: 'Branding-Pakete', en: 'Branding Packages', ru: 'Пакеты брендинга' }[locale] ?? 'Branding Packages'
  const pricingDescription = { de: 'Transparente Preise fuer Markenentwicklung. Individuelle Angebote fuer groessere Projekte.', en: 'Transparent pricing for brand development. Custom quotes for larger projects.', ru: 'Прозрачные цены на разработку бренда. Индивидуальные предложения для крупных проектов.' }[locale] ?? 'Transparent pricing for brand development. Custom quotes for larger projects.'
  const processTitle = { de: 'Unser kreativer Prozess', en: 'Our Creative Process', ru: 'Наш креативный процесс' }[locale] ?? 'Our Creative Process'
  const processDescription = { de: 'Strukturierte Vorgehensweise fuer herausragende Kreativarbeit.', en: 'Structured approach for outstanding creative work.', ru: 'Структурированный подход для выдающейся креативной работы.' }[locale] ?? 'Structured approach for outstanding creative work.'
  const faqTitle = { de: 'Haeufige Fragen zur Werbeagentur', en: 'Frequently Asked Questions', ru: 'Часто задаваемые вопросы' }[locale] ?? 'Frequently Asked Questions'
  const relatedServicesTitle = { de: 'Verwandte Leistungen', en: 'Related Services', ru: 'Связанные услуги' }[locale] ?? 'Related Services'
  const ctaTitle = { de: 'Bereit fuer einen starken Markenauftritt?', en: 'Ready to Elevate Your Brand?', ru: 'Готовы усилить свой бренд?' }[locale] ?? 'Ready to Elevate Your Brand?'
  const ctaDescription = { de: 'Kostenlose Erstberatung. Wir besprechen Ihre Ziele und zeigen Ihnen kreative Moeglichkeiten.', en: 'Free initial consultation. We discuss your goals and show you creative possibilities.', ru: 'Бесплатная первичная консультация. Мы обсудим ваши цели и покажем креативные возможности.' }[locale] ?? 'Free initial consultation. We discuss your goals and show you creative possibilities.'
  const ctaButton = { de: 'Kostenlose Beratung anfordern', en: 'Request Free Consultation', ru: 'Запросить бесплатную консультацию' }[locale] ?? 'Request Free Consultation'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: { de: 'Werbeagentur Linz', en: 'Advertising Agency Linz', ru: 'Рекламное агентство Линц' }[locale] ?? 'Advertising Agency Linz',
    alternateName: { de: 'Kreativagentur Linz', en: 'Creative Agency Linz', ru: 'Креативное агентство Линц' }[locale] ?? 'Creative Agency Linz',
    url: 'https://goldenwing.at/werbeagentur-linz',
    provider: {
      '@type': 'LocalBusiness',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
      address: { '@type': 'PostalAddress', streetAddress: 'Czeikestrasse 4/21', addressLocality: 'Wien', postalCode: '1100', addressCountry: 'AT' },
    },
    areaServed: [
      { '@type': 'City', name: 'Linz' },
      { '@type': 'State', name: 'Oberoesterreich' },
    ],
    description: { de: 'Full-Service Werbeagentur in Linz. Branding, Corporate Design, Werbekampagnen und Online Marketing fuer oberoesterreichische Unternehmen.', en: 'Full-service advertising agency in Linz. Branding, corporate design, advertising campaigns and online marketing for Upper Austrian businesses.', ru: 'Рекламное агентство полного цикла в Линце. Брендинг, корпоративный дизайн, рекламные кампании и интернет-маркетинг для компаний Верхней Австрии.' }[locale] ?? 'Full-service advertising agency in Linz. Branding, corporate design, advertising campaigns and online marketing for Upper Austrian businesses.',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <Container variant="block">
          <div className="max-w-4xl">
            <Badge className="mb-4">{content.heroBadge}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{content.heroTitle}</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">{content.heroDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <NextLink href={getContactUrl(locale)}>
                  {content.ctaPrimary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </NextLink>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <NextLink href="#leistungen">{content.ctaSecondary}</NextLink>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Results */}
      <section className="py-16 border-y bg-muted/30">
        <Container variant="block">
          <div className="grid md:grid-cols-4 gap-8">
            {results.map((result) => (
              <div key={result.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{result.metric}</div>
                <div className="font-medium mb-1">{result.label}</div>
                <div className="text-sm text-muted-foreground">{result.client}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Services */}
      <section id="leistungen" className="py-20 scroll-mt-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{servicesTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{servicesDescription}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon] || Palette
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

      {/* Linz Context */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">{linz.title}</h2>
            <p className="text-lg text-muted-foreground mb-8">{linz.description}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {linz.highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-12 text-center">{whyUs.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.reasons.map((reason, index) => (
              <div key={reason.title} className="text-center">
                <div className="text-4xl font-bold text-primary/20 mb-4">0{index + 1}</div>
                <h3 className="font-semibold mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground">{reason.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section id="preise" className="py-20 bg-muted/30 scroll-mt-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{pricingTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{pricingDescription}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <Card key={pkg.name} className={pkg.popular ? 'border-primary shadow-lg relative' : ''}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>{{ de: 'Am beliebtesten', en: 'Most Popular', ru: 'Самый популярный' }[locale] ?? 'Most Popular'}</Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">EUR {pkg.price}</span>
                    <span className="text-muted-foreground text-sm"> {pkg.priceType}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={pkg.popular ? 'default' : 'outline'} asChild>
                    <NextLink href={getContactUrl(locale)}>{{ de: 'Jetzt starten', en: 'Get Started', ru: 'Начать' }[locale] ?? 'Get Started'}</NextLink>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Process - ProcessVerticalStepper Layout */}
      <ProcessVerticalStepper
        title={processTitle}
        subtitle={processDescription}
        steps={process.map(item => ({ num: item.step, title: item.title, description: item.description }))}
      />

      {/* FAQ */}
      {faqs.length > 0 && (
        <FAQSection
          title={faqTitle}
          items={faqs}
        />
      )}

      {/* Related */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-8 text-center">{relatedServicesTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {relatedServices.map((service) => (
              <Card key={service.title}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                                    <Link href={service.href} className="text-primary text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                    {common('learnMore')} <ArrowRight className="h-3 w-3" />
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
