import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import { ArrowRight, Palette, TrendingUp, Target, Globe, FileText, CheckCircle, Phone, Megaphone, PenTool, Camera, Mountain, LucideIcon } from 'lucide-react'
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
  'mountain': Mountain,
}

// Werbeagentur Innsbruck - Volume: 390, KD: 43
const defaultContent = {
  de: {
    metaTitle: 'Werbeagentur Innsbruck | Kreativagentur fuer Branding & Marketing',
    metaDescription: 'Werbeagentur in Innsbruck fuer Branding, Corporate Design, Werbekampagnen und Marketing. Kreative Loesungen fuer Tiroler Unternehmen. Full-Service von Strategie bis Umsetzung.',
    keywords: ['Werbeagentur Innsbruck', 'Kreativagentur Innsbruck', 'Werbung Innsbruck', 'Marketing Agentur Innsbruck', 'Branding Innsbruck', 'Corporate Design Innsbruck', 'Full-Service Agentur Tirol'],
    heroTitle: 'Werbeagentur Innsbruck – Kreative Werbung fuer Tirol',
    heroDescription: 'Als Werbeagentur fuer Innsbruck und Tirol entwickeln wir Markenstrategien, Corporate Designs und Werbekampagnen. Von der Landeshauptstadt bis in die Tiroler Bergwelt – kreative Loesungen, die wirken.',
    heroBadge: 'Werbeagentur Innsbruck',
    ctaPrimary: 'Kostenlose Beratung',
    ctaSecondary: 'Unsere Leistungen',
  },
  en: {
    metaTitle: 'Advertising Agency Innsbruck | Creative Agency for Branding & Marketing',
    metaDescription: 'Advertising agency in Innsbruck for branding, corporate design, advertising campaigns and marketing. Creative solutions for Tyrolean businesses. Full-service from strategy to execution.',
    keywords: ['Advertising Agency Innsbruck', 'Creative Agency Innsbruck', 'Advertising Innsbruck', 'Marketing Agency Innsbruck', 'Branding Innsbruck', 'Corporate Design Innsbruck', 'Full-Service Agency Tyrol'],
    heroTitle: 'Advertising Agency Innsbruck – Creative Advertising for Tyrol',
    heroDescription: 'As an advertising agency for Innsbruck and Tyrol, we develop brand strategies, corporate designs and advertising campaigns. From the state capital to the Tyrolean mountains – creative solutions that work.',
    heroBadge: 'Advertising Agency Innsbruck',
    ctaPrimary: 'Free Consultation',
    ctaSecondary: 'Our Services',
  },
  ru: {
    metaTitle: 'Рекламное агентство Инсбрук | Креативное агентство для брендинга и маркетинга',
    metaDescription: 'Рекламное агентство в Инсбруке для брендинга, корпоративного дизайна, рекламных кампаний и маркетинга. Креативные решения для тирольских компаний. Полный цикл услуг от стратегии до реализации.',
    keywords: ['Рекламное агентство Инсбрук', 'Креативное агентство Инсбрук', 'Реклама Инсбрук', 'Маркетинговое агентство Инсбрук', 'Брендинг Инсбрук', 'Корпоративный дизайн Инсбрук', 'Агентство полного цикла Тироль'],
    heroTitle: 'Рекламное агентство Инсбрук – Креативная реклама для Тироля',
    heroDescription: 'Как рекламное агентство для Инсбрука и Тироля, мы разрабатываем стратегии брендов, корпоративный дизайн и рекламные кампании. От столицы до тирольских гор – креативные решения, которые работают.',
    heroBadge: 'Рекламное агентство Инсбрук',
    ctaPrimary: 'Бесплатная консультация',
    ctaSecondary: 'Наши услуги',
  }
}

const defaultServices = {
  de: [
    { icon: 'palette', title: 'Branding & Corporate Design', description: 'Entwicklung einzigartiger Markenidentitaeten. Logo-Design, Farbwelt, Typografie und umfassende Brand Guidelines fuer Tiroler Unternehmen.' },
    { icon: 'pen-tool', title: 'Grafikdesign & Print', description: 'Professionelle Printmedien: Broschueren, Flyer, Plakate, Visitenkarten. Hochwertiges Design fuer alle Drucksachen – von Skiresort-Werbung bis Berghuetten-Karten.' },
    { icon: 'globe', title: 'Webdesign & Entwicklung', description: 'Moderne Websites, die konvertieren. Responsive Design, UX-Optimierung und SEO-freundliche Entwicklung fuer Tiroler Tourismus und Wirtschaft.' },
    { icon: 'megaphone', title: 'Werbekampagnen', description: 'Kreative Kampagnen fuer Print, Digital und Out-of-Home. Von der Konzeption bis zur Mediaplanung – regional und international.' },
    { icon: 'camera', title: 'Foto & Video Produktion', description: 'Professionelle Produktfotografie, Imagefilme und Social Media Content. Die Tiroler Bergwelt perfekt in Szene gesetzt.' },
    { icon: 'target', title: 'Tourismus-Marketing', description: 'Spezialisiertes Marketing fuer Hotels, Skigebiete und Bergbahnen. Saisonale Kampagnen fuer Winter- und Sommertourismus.' },
  ],
  en: [
    { icon: 'palette', title: 'Branding & Corporate Design', description: 'Development of unique brand identities. Logo design, color palette, typography and comprehensive brand guidelines for Tyrolean businesses.' },
    { icon: 'pen-tool', title: 'Graphic Design & Print', description: 'Professional print media: brochures, flyers, posters, business cards. High-quality design for all print materials – from ski resort advertising to mountain hut menus.' },
    { icon: 'globe', title: 'Web Design & Development', description: 'Modern websites that convert. Responsive design, UX optimization and SEO-friendly development for Tyrolean tourism and business.' },
    { icon: 'megaphone', title: 'Advertising Campaigns', description: 'Creative campaigns for print, digital and out-of-home. From conception to media planning – regional and international.' },
    { icon: 'camera', title: 'Photo & Video Production', description: 'Professional product photography, corporate videos and social media content. Showcasing the Tyrolean mountains perfectly.' },
    { icon: 'target', title: 'Tourism Marketing', description: 'Specialized marketing for hotels, ski areas and mountain railways. Seasonal campaigns for winter and summer tourism.' },
  ],
  ru: [
    { icon: 'palette', title: 'Брендинг и корпоративный дизайн', description: 'Разработка уникальной идентичности бренда. Дизайн логотипа, цветовая палитра, типографика и комплексные руководства по бренду для тирольских компаний.' },
    { icon: 'pen-tool', title: 'Графический дизайн и полиграфия', description: 'Профессиональная печатная продукция: брошюры, флаеры, плакаты, визитные карточки. Высококачественный дизайн для всех печатных материалов – от рекламы горнолыжных курортов до меню горных хижин.' },
    { icon: 'globe', title: 'Веб-дизайн и разработка', description: 'Современные сайты, которые конвертируют. Адаптивный дизайн, UX-оптимизация и SEO-дружественная разработка для тирольского туризма и бизнеса.' },
    { icon: 'megaphone', title: 'Рекламные кампании', description: 'Креативные кампании для печатной, цифровой и наружной рекламы. От концепции до медиапланирования – региональные и международные.' },
    { icon: 'camera', title: 'Фото- и видеопроизводство', description: 'Профессиональная предметная фотография, имиджевые фильмы и контент для социальных сетей. Идеальная презентация тирольских гор.' },
    { icon: 'target', title: 'Туристический маркетинг', description: 'Специализированный маркетинг для отелей, горнолыжных курортов и канатных дорог. Сезонные кампании для зимнего и летнего туризма.' },
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
    { name: 'Brand Starter', price: '2 900', priceType: 'единоразово', description: 'Для стартапов и новых компаний', popular: false, features: ['Дизайн логотипа (3 концепции)', 'Цветовая палитра и типографика', 'Дизайн визитных карточек', 'Базовый стайлгайд', 'Файлы для печати'] },
    { name: 'Brand Business', price: '5 900', priceType: 'единоразово', description: 'Полный корпоративный дизайн', popular: true, features: ['Дизайн логотипа (5 концепций)', 'Полный корпоративный дизайн', 'Деловая документация', 'Комплексный стайлгайд', 'Шаблоны для социальных сетей', 'Дизайн сайта (концепция)'] },
    { name: 'Brand Premium', price: 'от 9 900', priceType: 'единоразово', description: 'Корпоративный брендинг', popular: false, features: ['Стратегия бренда и позиционирование', 'Логотип и полный CI', 'Все деловые материалы', 'Дизайн и разработка сайта', 'Фотосессия', 'Видеопроизводство', 'Кампания запуска'] },
  ],
}

const defaultResults = {
  de: [
    { metric: '250+', label: 'Branding-Projekte', client: 'seit 2014' },
    { metric: '98%', label: 'Kundenzufriedenheit', client: 'nachhaltige Partnerschaften' },
    { metric: '45+', label: 'Branchen bedient', client: 'inkl. Ski & Tourismus' },
    { metric: '3', label: 'Standorte weltweit', client: 'Wien, Dubai, California' },
  ],
  en: [
    { metric: '250+', label: 'Branding projects', client: 'since 2014' },
    { metric: '98%', label: 'Client satisfaction', client: 'long-term partnerships' },
    { metric: '45+', label: 'Industries served', client: 'incl. ski & tourism' },
    { metric: '3', label: 'Locations worldwide', client: 'Vienna, Dubai, California' },
  ],
  ru: [
    { metric: '250+', label: 'Проектов брендинга', client: 'с 2014 года' },
    { metric: '98%', label: 'Удовлетворенность клиентов', client: 'долгосрочные партнерства' },
    { metric: '45+', label: 'Обслуживаемых отраслей', client: 'вкл. горнолыжный спорт и туризм' },
    { metric: '3', label: 'Офиса по всему миру', client: 'Вена, Дубай, Калифорния' },
  ],
}

const defaultFaqs = {
  de: [
    { question: 'Was kostet eine Werbeagentur in Innsbruck?', answer: 'Die Kosten variieren je nach Projekt. Ein Logo-Design beginnt bei ca. 1.500 EUR, ein komplettes Corporate Design liegt zwischen 3.000 und 10.000 EUR. Fuer Tourismus- und Skigebiet-Projekte erstellen wir gerne massgeschneiderte Angebote.' },
    { question: 'Habt ihr Erfahrung mit Tiroler Tourismus-Unternehmen?', answer: 'Ja, wir haben umfangreiche Erfahrung mit Hotels, Skigebieten, Bergbahnen und touristischen Attraktionen. Wir verstehen die saisonalen Anforderungen und die Bedeutung von emotionalem Berg-Branding.' },
    { question: 'Wie lange dauert ein Branding-Projekt?', answer: 'Ein Logo-Design dauert typischerweise 2-4 Wochen. Ein vollstaendiges Corporate Design benoetigt 6-10 Wochen. Fuer saisonale Tourismus-Kampagnen planen wir 3-6 Monate Vorlauf ein.' },
    { question: 'Koennt ihr auch mehrsprachige Materialien erstellen?', answer: 'Ja, gerade fuer Tiroler Tourismus-Unternehmen erstellen wir haeufig mehrsprachige Materialien (Deutsch, Englisch, Italienisch). Kulturelle Anpassungen fuer internationale Gaeste sind Teil unserer Expertise.' },
    { question: 'Bietet ihr auch saisonale Kampagnen an?', answer: 'Ja, saisonales Marketing ist eine unserer Staerken. Winter-Ski-Kampagnen, Sommer-Wander-Marketing und Uebergangsphasen – wir planen und setzen ganzjaehrige Marketingstrategien um.' },
    { question: 'Was unterscheidet euch von lokalen Innsbrucker Agenturen?', answer: 'Unsere Kombination aus Alpen-Verstaendnis und internationaler Erfahrung. Mit Standorten in Wien, Dubai und USA bringen wir globale Perspektiven ein – wichtig fuer Tirols internationale Gaesteklientel.' },
  ],
  en: [
    { question: 'How much does an advertising agency in Innsbruck cost?', answer: 'Costs vary by project. Logo design starts at around 1,500 EUR, complete corporate design ranges from 3,000 to 10,000 EUR. For tourism and ski resort projects, we create tailored quotes.' },
    { question: 'Do you have experience with Tyrolean tourism businesses?', answer: 'Yes, we have extensive experience with hotels, ski resorts, mountain railways and tourist attractions. We understand the seasonal requirements and the importance of emotional mountain branding.' },
    { question: 'How long does a branding project take?', answer: 'Logo design typically takes 2-4 weeks. A complete corporate design needs 6-10 weeks. For seasonal tourism campaigns, we plan 3-6 months lead time.' },
    { question: 'Can you also create multilingual materials?', answer: 'Yes, especially for Tyrolean tourism businesses we often create multilingual materials (German, English, Italian). Cultural adaptations for international guests are part of our expertise.' },
    { question: 'Do you also offer seasonal campaigns?', answer: 'Yes, seasonal marketing is one of our strengths. Winter ski campaigns, summer hiking marketing and transition phases – we plan and execute year-round marketing strategies.' },
    { question: 'What sets you apart from local Innsbruck agencies?', answer: 'Our combination of alpine understanding and international experience. With locations in Vienna, Dubai and USA, we bring global perspectives – important for Tyrol\'s international guest clientele.' },
  ],
  ru: [
    { question: 'Сколько стоит рекламное агентство в Инсбруке?', answer: 'Стоимость варьируется в зависимости от проекта. Дизайн логотипа начинается от 1 500 EUR, полный корпоративный дизайн стоит от 3 000 до 10 000 EUR. Для туристических и горнолыжных проектов мы создаем индивидуальные предложения.' },
    { question: 'Есть ли у вас опыт работы с тирольскими туристическими компаниями?', answer: 'Да, у нас обширный опыт работы с отелями, горнолыжными курортами, канатными дорогами и туристическими достопримечательностями. Мы понимаем сезонные требования и важность эмоционального горного брендинга.' },
    { question: 'Сколько времени занимает проект брендинга?', answer: 'Дизайн логотипа обычно занимает 2-4 недели. Полный корпоративный дизайн требует 6-10 недель. Для сезонных туристических кампаний мы планируем 3-6 месяцев подготовки.' },
    { question: 'Можете ли вы создавать многоязычные материалы?', answer: 'Да, особенно для тирольских туристических компаний мы часто создаем многоязычные материалы (немецкий, английский, итальянский). Культурная адаптация для международных гостей является частью нашей экспертизы.' },
    { question: 'Предлагаете ли вы сезонные кампании?', answer: 'Да, сезонный маркетинг - одна из наших сильных сторон. Зимние горнолыжные кампании, летний туристический маркетинг и переходные периоды – мы планируем и реализуем круглогодичные маркетинговые стратегии.' },
    { question: 'Чем вы отличаетесь от местных агентств Инсбрука?', answer: 'Нашим сочетанием понимания альпийской специфики и международного опыта. С офисами в Вене, Дубае и США мы привносим глобальные перспективы – что важно для международной клиентуры Тироля.' },
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
    { step: '04', title: 'Доработка', description: 'Финальная шлифовка на основе ваших отзывов' },
    { step: '05', title: 'Передача', description: 'Финальные файлы, стайлгайд, внедрение' },
  ],
}

const defaultRelatedServices = {
  de: [
    { title: 'Webdesign Innsbruck', description: 'Moderne Websites fuer Tiroler Unternehmen.', href: '/webdesign-innsbruck' },
    { title: 'SEO Agentur Innsbruck', description: 'Sichtbarkeit bei Google fuer lokale Suchen.', href: '/seo-agentur-innsbruck' },
    { title: 'Werbeagentur Salzburg', description: 'Unsere Leistungen auch fuer Salzburg.', href: '/werbeagentur-salzburg' },
  ],
  en: [
    { title: 'Web Design Innsbruck', description: 'Modern websites for Tyrolean businesses.', href: '/webdesign-innsbruck' },
    { title: 'SEO Agency Innsbruck', description: 'Google visibility for local searches.', href: '/seo-agentur-innsbruck' },
    { title: 'Advertising Agency Salzburg', description: 'Our services also for Salzburg.', href: '/werbeagentur-salzburg' },
  ],
  ru: [
    { title: 'Веб-дизайн Инсбрук', description: 'Современные сайты для тирольских компаний.', href: '/webdesign-innsbruck' },
    { title: 'SEO агентство Инсбрук', description: 'Видимость в Google для локального поиска.', href: '/seo-agentur-innsbruck' },
    { title: 'Рекламное агентство Зальцбург', description: 'Наши услуги также для Зальцбурга.', href: '/werbeagentur-salzburg' },
  ],
} as const satisfies Record<'de' | 'en' | 'ru', Array<{ title: string; description: string; href: StaticAppPathname }>>

const whyChooseUs = {
  de: {
    title: 'Warum GoldenWing als Werbeagentur fuer Innsbruck?',
    reasons: [
      { title: 'Berg-Tourismus Expertise', description: 'Erfahrung mit Skigebieten, Bergbahnen und alpinen Hotels.' },
      { title: 'Internationale Perspektive', description: 'Globale Insights fuer lokale Projekte – wichtig fuer Tirols internationale Gaeste.' },
      { title: 'Saisonales Know-how', description: 'Winter- und Sommer-Kampagnen perfekt getimed.' },
      { title: 'Premium-Qualitaet', description: 'Hochwertige Kreativarbeit passend zum alpinen Premium-Anspruch.' },
    ],
  },
  en: {
    title: 'Why Choose GoldenWing as Advertising Agency for Innsbruck?',
    reasons: [
      { title: 'Mountain Tourism Expertise', description: 'Experience with ski resorts, mountain railways and alpine hotels.' },
      { title: 'International Perspective', description: 'Global insights for local projects – important for Tyrol\'s international guests.' },
      { title: 'Seasonal Know-how', description: 'Winter and summer campaigns perfectly timed.' },
      { title: 'Premium Quality', description: 'High-quality creative work matching alpine premium standards.' },
    ],
  },
  ru: {
    title: 'Почему GoldenWing как рекламное агентство для Инсбрука?',
    reasons: [
      { title: 'Экспертиза горного туризма', description: 'Опыт работы с горнолыжными курортами, канатными дорогами и альпийскими отелями.' },
      { title: 'Международная перспектива', description: 'Глобальные инсайты для локальных проектов – важно для международных гостей Тироля.' },
      { title: 'Сезонное ноу-хау', description: 'Зимние и летние кампании с идеальным таймингом.' },
      { title: 'Премиальное качество', description: 'Высококачественная креативная работа, соответствующая альпийским премиальным стандартам.' },
    ],
  },
}

// Innsbruck-specific content section
const innsbruckContext = {
  de: {
    title: 'Werbeagentur fuer Innsbruck und Tirol',
    description: 'Innsbruck ist das Herz der Alpen – Olympiastadt, Universitaetsstandort und Tor zu weltbekannten Skigebieten. Von der historischen Altstadt ueber innovative Tech-Startups bis zu Premium-Skiresorts – Tirol vereint Tradition und Moderne. Als Werbeagentur verstehen wir diese einzigartige Positionierung: authentische Bergmarken, die international begeistern.',
    highlights: [
      'Erfahrung mit Tiroler Skigebieten und Bergbahnen',
      'Tourismus-Marketing fuer Hotels und Gastgewerbe',
      'Saisonale Kampagnen (Winter/Sommer) perfekt getimed',
      'Mehrsprachige Kommunikation (DE, EN, IT) fuer internationale Gaeste',
    ],
  },
  en: {
    title: 'Advertising Agency for Innsbruck and Tyrol',
    description: 'Innsbruck is the heart of the Alps – Olympic city, university location and gateway to world-famous ski resorts. From the historic old town to innovative tech startups to premium ski resorts – Tyrol combines tradition and modernity. As an advertising agency, we understand this unique positioning: authentic mountain brands that inspire internationally.',
    highlights: [
      'Experience with Tyrolean ski resorts and mountain railways',
      'Tourism marketing for hotels and hospitality',
      'Seasonal campaigns (winter/summer) perfectly timed',
      'Multilingual communication (DE, EN, IT) for international guests',
    ],
  },
  ru: {
    title: 'Рекламное агентство для Инсбрука и Тироля',
    description: 'Инсбрук - сердце Альп: олимпийский город, университетский центр и ворота к всемирно известным горнолыжным курортам. От исторического старого города через инновационные технологические стартапы до премиальных горнолыжных курортов – Тироль объединяет традиции и современность. Как рекламное агентство, мы понимаем это уникальное позиционирование: аутентичные горные бренды, которые вдохновляют на международном уровне.',
    highlights: [
      'Опыт работы с тирольскими горнолыжными курортами и канатными дорогами',
      'Туристический маркетинг для отелей и гостиничного бизнеса',
      'Сезонные кампании (зима/лето) с идеальным таймингом',
      'Многоязычная коммуникация (DE, EN, IT) для международных гостей',
    ],
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const content = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']

  const hreflangAlternates = getHreflangAlternates('/werbeagentur-innsbruck', locale)

  return {
    title: content.metaTitle,
    description: truncateMetaDescription(content.metaDescription),
    keywords: content.keywords,
    openGraph: {
      title: content.heroTitle,
      description: truncateMetaDescription(content.metaDescription),
      url: getCanonicalUrl('/werbeagentur-innsbruck', locale),
    },
    alternates: {
      canonical: getCanonicalUrl('/werbeagentur-innsbruck', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function WerbeagenturInnsbruckPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const common = await getTranslations({ locale, namespace: 'common' })

  const content = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']
  const results = defaultResults[locale as SupportedLocale] ?? defaultResults['en']
  const services = defaultServices[locale as SupportedLocale] ?? defaultServices['en']
  const packages = defaultPackages[locale as SupportedLocale] ?? defaultPackages['en']
  const process = defaultProcess[locale as SupportedLocale] ?? defaultProcess['en']
  const faqs = defaultFaqs[locale as SupportedLocale] ?? defaultFaqs['en']
  const relatedServices = defaultRelatedServices[locale as SupportedLocale] ?? defaultRelatedServices['en']
  const whyUs = whyChooseUs[locale as SupportedLocale] ?? whyChooseUs['en']
  const innsbruck = innsbruckContext[locale as SupportedLocale] ?? innsbruckContext['en']

  const servicesTitle = { de: 'Unsere Werbe- & Design-Leistungen', en: 'Our Advertising & Design Services', ru: 'Наши рекламные и дизайн-услуги' }[locale] ?? 'Our Advertising & Design Services'
  const servicesDescription = { de: 'Full-Service Kreativloesungen fuer Tiroler Unternehmen und Tourismus.', en: 'Full-service creative solutions for Tyrolean businesses and tourism.', ru: 'Комплексные креативные решения для тирольских компаний и туризма.' }[locale] ?? 'Full-service creative solutions for Tyrolean businesses and tourism.'
  const pricingTitle = { de: 'Branding-Pakete', en: 'Branding Packages', ru: 'Пакеты брендинга' }[locale] ?? 'Branding Packages'
  const pricingDescription = { de: 'Transparente Preise fuer Markenentwicklung. Individuelle Angebote fuer groessere Projekte.', en: 'Transparent pricing for brand development. Custom quotes for larger projects.', ru: 'Прозрачные цены на разработку бренда. Индивидуальные предложения для крупных проектов.' }[locale] ?? 'Transparent pricing for brand development. Custom quotes for larger projects.'
  const processTitle = { de: 'Unser kreativer Prozess', en: 'Our Creative Process', ru: 'Наш креативный процесс' }[locale] ?? 'Our Creative Process'
  const processDescription = { de: 'Strukturierte Vorgehensweise fuer herausragende Kreativarbeit.', en: 'Structured approach for outstanding creative work.', ru: 'Структурированный подход для выдающейся креативной работы.' }[locale] ?? 'Structured approach for outstanding creative work.'
  const faqTitle = { de: 'Haeufige Fragen zur Werbeagentur Innsbruck', en: 'Frequently Asked Questions', ru: 'Часто задаваемые вопросы' }[locale] ?? 'Frequently Asked Questions'
  const relatedServicesTitle = { de: 'Verwandte Leistungen', en: 'Related Services', ru: 'Связанные услуги' }[locale] ?? 'Related Services'
  const ctaTitle = { de: 'Bereit fuer einen starken Markenauftritt in Tirol?', en: 'Ready to Elevate Your Tyrolean Brand?', ru: 'Готовы усилить ваш тирольский бренд?' }[locale] ?? 'Ready to Elevate Your Tyrolean Brand?'
  const ctaDescription = { de: 'Kostenlose Erstberatung. Wir besprechen Ihre Ziele und zeigen Ihnen kreative Moeglichkeiten.', en: 'Free initial consultation. We discuss your goals and show you creative possibilities.', ru: 'Бесплатная первичная консультация. Мы обсудим ваши цели и покажем креативные возможности.' }[locale] ?? 'Free initial consultation. We discuss your goals and show you creative possibilities.'
  const ctaButton = { de: 'Kostenlose Beratung anfordern', en: 'Request Free Consultation', ru: 'Запросить бесплатную консультацию' }[locale] ?? 'Request Free Consultation'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: { de: 'Werbeagentur Innsbruck', en: 'Advertising Agency Innsbruck', ru: 'Рекламное агентство Инсбрук' }[locale] ?? 'Advertising Agency Innsbruck',
    alternateName: { de: 'Kreativagentur Innsbruck', en: 'Creative Agency Innsbruck', ru: 'Креативное агентство Инсбрук' }[locale] ?? 'Creative Agency Innsbruck',
    url: 'https://goldenwing.at/werbeagentur-innsbruck',
    provider: {
      '@type': 'LocalBusiness',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
      address: { '@type': 'PostalAddress', streetAddress: 'Czeikestrasse 4/21', addressLocality: 'Wien', postalCode: '1100', addressCountry: 'AT' },
    },
    areaServed: [
      { '@type': 'City', name: 'Innsbruck' },
      { '@type': 'State', name: 'Tirol' },
    ],
    description: {
      de: 'Full-Service Werbeagentur fuer Innsbruck und Tirol. Branding, Corporate Design, Werbekampagnen und Marketing fuer Tiroler Unternehmen und Tourismusindustrie.',
      en: 'Full-service advertising agency for Innsbruck and Tyrol. Branding, corporate design, advertising campaigns and marketing for Tyrolean businesses and tourism industry.',
      ru: 'Рекламное агентство полного цикла для Инсбрука и Тироля. Брендинг, корпоративный дизайн, рекламные кампании и маркетинг для тирольских компаний и туристической индустрии.'
    }[locale] ?? 'Full-service advertising agency for Innsbruck and Tyrol. Branding, corporate design, advertising campaigns and marketing for Tyrolean businesses and tourism industry.',
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

      {/* Innsbruck Context */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">{innsbruck.title}</h2>
            <p className="text-lg text-muted-foreground mb-8">{innsbruck.description}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {innsbruck.highlights.map((highlight) => (
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
