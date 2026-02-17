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

// Werbeagentur Salzburg - Volume: 590, KD: 45
const defaultContent = {
  de: {
    metaTitle: 'Werbeagentur Salzburg | Kreativagentur fuer Branding & Werbung',
    metaDescription: 'Werbeagentur in Salzburg fuer Branding, Corporate Design, Werbekampagnen und Marketing. Kreative Loesungen fuer Salzburger Unternehmen. Full-Service von Strategie bis Umsetzung.',
    keywords: ['Werbeagentur Salzburg', 'Kreativagentur Salzburg', 'Werbung Salzburg', 'Marketing Agentur Salzburg', 'Branding Salzburg', 'Corporate Design Salzburg', 'Full-Service Agentur Salzburg'],
    heroTitle: 'Werbeagentur Salzburg – Kreative Werbung fuer die Mozartstadt',
    heroDescription: 'Als Werbeagentur fuer Salzburg entwickeln wir Markenstrategien, Corporate Designs und Werbekampagnen. Von der Festspielstadt bis ins Salzburger Land – kreative Loesungen, die wirken.',
    heroBadge: 'Werbeagentur Salzburg',
    ctaPrimary: 'Kostenlose Beratung',
    ctaSecondary: 'Unsere Leistungen',
  },
  en: {
    metaTitle: 'Advertising Agency Salzburg | Creative Agency for Branding & Advertising',
    metaDescription: 'Advertising agency in Salzburg for branding, corporate design, advertising campaigns and marketing. Creative solutions for Salzburg businesses. Full-service from strategy to execution.',
    keywords: ['Advertising Agency Salzburg', 'Creative Agency Salzburg', 'Advertising Salzburg', 'Marketing Agency Salzburg', 'Branding Salzburg', 'Corporate Design Salzburg', 'Full-Service Agency Salzburg'],
    heroTitle: 'Advertising Agency Salzburg – Creative Advertising for the Mozart City',
    heroDescription: 'As an advertising agency for Salzburg, we develop brand strategies, corporate designs and advertising campaigns. From the festival city to Salzburg Land – creative solutions that work.',
    heroBadge: 'Advertising Agency Salzburg',
    ctaPrimary: 'Free Consultation',
    ctaSecondary: 'Our Services',
  },
  ru: {
    metaTitle: 'Рекламное агентство Зальцбург | Креативное агентство брендинга и рекламы',
    metaDescription: 'Рекламное агентство в Зальцбурге: брендинг, корпоративный дизайн, рекламные кампании и маркетинг. Креативные решения для бизнеса Зальцбурга. Полный цикл от стратегии до реализации.',
    keywords: ['Рекламное агентство Зальцбург', 'Креативное агентство Зальцбург', 'Реклама Зальцбург', 'Маркетинговое агентство Зальцбург', 'Брендинг Зальцбург', 'Корпоративный дизайн Зальцбург', 'Агентство полного цикла Зальцбург'],
    heroTitle: 'Рекламное агентство Зальцбург – Креативная реклама для города Моцарта',
    heroDescription: 'Как рекламное агентство для Зальцбурга мы разрабатываем стратегии брендов, корпоративный дизайн и рекламные кампании. От фестивального города до земли Зальцбург – креативные решения, которые работают.',
    heroBadge: 'Рекламное агентство Зальцбург',
    ctaPrimary: 'Бесплатная консультация',
    ctaSecondary: 'Наши услуги',
  }
}

const defaultServices = {
  de: [
    { icon: 'palette', title: 'Branding & Corporate Design', description: 'Entwicklung einzigartiger Markenidentitaeten. Logo-Design, Farbwelt, Typografie und umfassende Brand Guidelines fuer Salzburger Unternehmen.' },
    { icon: 'pen-tool', title: 'Grafikdesign & Print', description: 'Professionelle Printmedien: Broschueren, Flyer, Plakate, Visitenkarten. Hochwertiges Design fuer alle Drucksachen – von Festspiel-Programmen bis Hotelprospekten.' },
    { icon: 'globe', title: 'Webdesign & Entwicklung', description: 'Moderne Websites, die konvertieren. Responsive Design, UX-Optimierung und SEO-freundliche Entwicklung fuer Salzburger Tourismus und Wirtschaft.' },
    { icon: 'megaphone', title: 'Werbekampagnen', description: 'Kreative Kampagnen fuer Print, Digital und Out-of-Home. Von der Konzeption bis zur Mediaplanung – regional und international.' },
    { icon: 'camera', title: 'Foto & Video Produktion', description: 'Professionelle Produktfotografie, Imagefilme und Social Media Content. Salzburgs Schoenheit in Szene gesetzt.' },
    { icon: 'target', title: 'Online Marketing', description: 'Google Ads, Social Media Marketing und SEO. Digitale Strategien fuer mehr Reichweite – regional und bei internationalen Gaesten.' },
  ],
  en: [
    { icon: 'palette', title: 'Branding & Corporate Design', description: 'Development of unique brand identities. Logo design, color palette, typography and comprehensive brand guidelines for Salzburg businesses.' },
    { icon: 'pen-tool', title: 'Graphic Design & Print', description: 'Professional print media: brochures, flyers, posters, business cards. High-quality design for all print materials – from festival programs to hotel brochures.' },
    { icon: 'globe', title: 'Web Design & Development', description: 'Modern websites that convert. Responsive design, UX optimization and SEO-friendly development for Salzburg tourism and business.' },
    { icon: 'megaphone', title: 'Advertising Campaigns', description: 'Creative campaigns for print, digital and out-of-home. From conception to media planning – regional and international.' },
    { icon: 'camera', title: 'Photo & Video Production', description: 'Professional product photography, corporate videos and social media content. Showcasing Salzburg\'s beauty.' },
    { icon: 'target', title: 'Online Marketing', description: 'Google Ads, social media marketing and SEO. Digital strategies for more reach – regionally and with international guests.' },
  ],
  ru: [
    { icon: 'palette', title: 'Брендинг и корпоративный дизайн', description: 'Разработка уникальной идентичности бренда. Дизайн логотипа, цветовая палитра, типографика и комплексные гайдлайны бренда для компаний Зальцбурга.' },
    { icon: 'pen-tool', title: 'Графический дизайн и печать', description: 'Профессиональные печатные материалы: брошюры, флаеры, плакаты, визитки. Высококачественный дизайн для всей полиграфии – от программ фестивалей до гостиничных буклетов.' },
    { icon: 'globe', title: 'Веб-дизайн и разработка', description: 'Современные сайты, которые конвертируют. Адаптивный дизайн, UX-оптимизация и SEO-дружественная разработка для туризма и бизнеса Зальцбурга.' },
    { icon: 'megaphone', title: 'Рекламные кампании', description: 'Креативные кампании для печати, диджитал и наружной рекламы. От концепции до медиапланирования – региональные и международные.' },
    { icon: 'camera', title: 'Фото и видео производство', description: 'Профессиональная продуктовая фотография, имиджевые фильмы и контент для социальных сетей. Демонстрируем красоту Зальцбурга.' },
    { icon: 'target', title: 'Онлайн-маркетинг', description: 'Google Ads, маркетинг в социальных сетях и SEO. Цифровые стратегии для большего охвата – региональные и для международных гостей.' },
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
    { name: 'Brand Premium', price: 'от 9 900', priceType: 'единоразово', description: 'Корпоративный брендинг', popular: false, features: ['Стратегия бренда и позиционирование', 'Логотип и полный фирменный стиль', 'Все деловые материалы', 'Дизайн и разработка сайта', 'Фотосессия', 'Видеопроизводство', 'Кампания запуска'] },
  ],
}

const defaultResults = {
  de: [
    { metric: '250+', label: 'Branding-Projekte', client: 'seit 2014' },
    { metric: '98%', label: 'Kundenzufriedenheit', client: 'nachhaltige Partnerschaften' },
    { metric: '45+', label: 'Branchen bedient', client: 'inkl. Tourismus & Hotellerie' },
    { metric: '3', label: 'Standorte weltweit', client: 'Wien, Dubai, California' },
  ],
  en: [
    { metric: '250+', label: 'Branding projects', client: 'since 2014' },
    { metric: '98%', label: 'Client satisfaction', client: 'long-term partnerships' },
    { metric: '45+', label: 'Industries served', client: 'incl. tourism & hospitality' },
    { metric: '3', label: 'Locations worldwide', client: 'Vienna, Dubai, California' },
  ],
  ru: [
    { metric: '250+', label: 'Проектов брендинга', client: 'с 2014 года' },
    { metric: '98%', label: 'Удовлетворенность клиентов', client: 'долгосрочные партнерства' },
    { metric: '45+', label: 'Обслуженных отраслей', client: 'вкл. туризм и гостеприимство' },
    { metric: '3', label: 'Офиса по всему миру', client: 'Вена, Дубай, Калифорния' },
  ],
}

const defaultFaqs = {
  de: [
    { question: 'Was kostet eine Werbeagentur in Salzburg?', answer: 'Die Kosten variieren je nach Projekt. Ein Logo-Design beginnt bei ca. 1.500 EUR, ein komplettes Corporate Design liegt zwischen 3.000 und 10.000 EUR. Fuer Tourismus- und Hotellerie-Projekte erstellen wir gerne massgeschneiderte Angebote.' },
    { question: 'Habt ihr Erfahrung mit Salzburger Tourismus-Unternehmen?', answer: 'Ja, wir haben umfangreiche Erfahrung mit Hotels, Restaurants, Veranstaltungsstaetten und touristischen Attraktionen. Wir verstehen die Anforderungen internationaler Gaeste und die Bedeutung von Premium-Branding in der Festspielstadt.' },
    { question: 'Wie lange dauert ein Branding-Projekt?', answer: 'Ein Logo-Design dauert typischerweise 2-4 Wochen. Ein vollstaendiges Corporate Design benoetigt 6-10 Wochen. Fuer saisonale Tourismus-Kampagnen planen wir 3-6 Monate Vorlauf ein.' },
    { question: 'Koennt ihr auch mehrsprachige Materialien erstellen?', answer: 'Ja, gerade fuer Salzburger Tourismus-Unternehmen erstellen wir haeufig mehrsprachige Materialien (Deutsch, Englisch, teils auch Italienisch oder Franzoesisch). Kulturelle Anpassungen sind Teil unserer Expertise.' },
    { question: 'Bietet ihr auch laufende Betreuung an?', answer: 'Ja, neben Projektarbeit bieten wir monatliche Retainer-Modelle fuer laufende Design- und Marketing-Arbeiten. Besonders fuer Hotels mit saisonalen Kampagnen ist das ein beliebtes Modell.' },
    { question: 'Was unterscheidet euch von Salzburger Lokalagenturen?', answer: 'Unsere Kombination aus lokalem Verstaendnis und internationaler Erfahrung. Mit Standorten in Wien, Dubai und USA bringen wir globale Perspektiven ein – wichtig fuer Salzburger Unternehmen mit internationaler Gaesteklientel.' },
  ],
  en: [
    { question: 'How much does an advertising agency in Salzburg cost?', answer: 'Costs vary by project. Logo design starts at around 1,500 EUR, complete corporate design ranges from 3,000 to 10,000 EUR. For tourism and hospitality projects, we create tailored quotes.' },
    { question: 'Do you have experience with Salzburg tourism businesses?', answer: 'Yes, we have extensive experience with hotels, restaurants, event venues and tourist attractions. We understand the requirements of international guests and the importance of premium branding in the festival city.' },
    { question: 'How long does a branding project take?', answer: 'Logo design typically takes 2-4 weeks. A complete corporate design needs 6-10 weeks. For seasonal tourism campaigns, we plan 3-6 months lead time.' },
    { question: 'Can you also create multilingual materials?', answer: 'Yes, especially for Salzburg tourism businesses we often create multilingual materials (German, English, sometimes Italian or French). Cultural adaptations are part of our expertise.' },
    { question: 'Do you also offer ongoing support?', answer: 'Yes, besides project work we offer monthly retainer models for ongoing design and marketing work. Especially for hotels with seasonal campaigns, this is a popular model.' },
    { question: 'What sets you apart from local Salzburg agencies?', answer: 'Our combination of local understanding and international experience. With locations in Vienna, Dubai and USA, we bring global perspectives – important for Salzburg businesses with international clientele.' },
  ],
  ru: [
    { question: 'Сколько стоят услуги рекламного агентства в Зальцбурге?', answer: 'Стоимость варьируется в зависимости от проекта. Дизайн логотипа начинается от 1 500 EUR, полный корпоративный дизайн стоит от 3 000 до 10 000 EUR. Для туристических и гостиничных проектов мы готовим индивидуальные предложения.' },
    { question: 'Есть ли у вас опыт работы с туристическим бизнесом Зальцбурга?', answer: 'Да, у нас обширный опыт работы с отелями, ресторанами, площадками для мероприятий и туристическими достопримечательностями. Мы понимаем требования международных гостей и важность премиального брендинга в фестивальном городе.' },
    { question: 'Сколько времени занимает проект брендинга?', answer: 'Дизайн логотипа обычно занимает 2-4 недели. Полный корпоративный дизайн требует 6-10 недель. Для сезонных туристических кампаний мы планируем подготовку за 3-6 месяцев.' },
    { question: 'Можете ли вы создавать многоязычные материалы?', answer: 'Да, особенно для туристического бизнеса Зальцбурга мы часто создаем многоязычные материалы (немецкий, английский, иногда итальянский или французский). Культурная адаптация – часть нашей экспертизы.' },
    { question: 'Предлагаете ли вы постоянное сопровождение?', answer: 'Да, помимо проектной работы мы предлагаем ежемесячные ретейнер-модели для постоянной дизайнерской и маркетинговой работы. Особенно для отелей с сезонными кампаниями это популярная модель.' },
    { question: 'Чем вы отличаетесь от местных агентств Зальцбурга?', answer: 'Нашим сочетанием местного понимания и международного опыта. С офисами в Вене, Дубае и США мы привносим глобальную перспективу – важно для компаний Зальцбурга с международной клиентурой.' },
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
    { step: '04', title: 'Доработка', description: 'Финальные корректировки на основе вашей обратной связи' },
    { step: '05', title: 'Сдача', description: 'Финальные файлы, гайдлайн, внедрение' },
  ],
}

const defaultRelatedServices = {
  de: [
    { title: 'Webdesign Salzburg', description: 'Moderne Websites fuer Salzburger Unternehmen.', href: '/webdesign-salzburg' },
    { title: 'SEO Agentur Salzburg', description: 'Sichtbarkeit bei Google fuer lokale Suchen.', href: '/seo-agentur-salzburg' },
    { title: 'Webdesign Oesterreich', description: 'Nationale Webprojekte mit lokalem Fokus.', href: '/webdesign-oesterreich' },
  ],
  en: [
    { title: 'Web Design Salzburg', description: 'Modern websites for Salzburg businesses.', href: '/webdesign-salzburg' },
    { title: 'SEO Agency Salzburg', description: 'Google visibility for local searches.', href: '/seo-agentur-salzburg' },
    { title: 'Web Design Austria', description: 'National web projects with local focus.', href: '/webdesign-oesterreich' },
  ],
  ru: [
    { title: 'Веб-дизайн Зальцбург', description: 'Современные сайты для компаний Зальцбурга.', href: '/webdesign-salzburg' },
    { title: 'SEO-агентство Зальцбург', description: 'Видимость в Google для локального поиска.', href: '/seo-agentur-salzburg' },
    { title: 'Веб-дизайн Австрия', description: 'Национальные веб-проекты с локальным фокусом.', href: '/webdesign-oesterreich' },
  ],
} as const satisfies Record<'de' | 'en' | 'ru', Array<{ title: string; description: string; href: StaticAppPathname }>>

const whyChooseUs = {
  de: {
    title: 'Warum GoldenWing als Werbeagentur fuer Salzburg?',
    reasons: [
      { title: 'Tourismus-Expertise', description: 'Erfahrung mit Hotels, Gastronomie und Kulturveranstaltungen in Salzburg.' },
      { title: 'Internationale Perspektive', description: 'Globale Insights fuer lokale Projekte – wichtig fuer Salzburgs internationale Gaeste.' },
      { title: 'Full-Service Agentur', description: 'Von Branding ueber Print bis Digital – alles aus einer Hand.' },
      { title: 'Premium-Qualitaet', description: 'Hochwertige Kreativarbeit passend zum Anspruch der Festspielstadt.' },
    ],
  },
  en: {
    title: 'Why Choose GoldenWing as Advertising Agency for Salzburg?',
    reasons: [
      { title: 'Tourism Expertise', description: 'Experience with hotels, gastronomy and cultural events in Salzburg.' },
      { title: 'International Perspective', description: 'Global insights for local projects – important for Salzburg\'s international guests.' },
      { title: 'Full-Service Agency', description: 'From branding to print to digital – everything from one source.' },
      { title: 'Premium Quality', description: 'High-quality creative work matching the standards of the festival city.' },
    ],
  },
  ru: {
    title: 'Почему GoldenWing как рекламное агентство для Зальцбурга?',
    reasons: [
      { title: 'Экспертиза в туризме', description: 'Опыт работы с отелями, гастрономией и культурными мероприятиями в Зальцбурге.' },
      { title: 'Международная перспектива', description: 'Глобальные инсайты для локальных проектов – важно для международных гостей Зальцбурга.' },
      { title: 'Агентство полного цикла', description: 'От брендинга до печати и диджитал – все из одного источника.' },
      { title: 'Премиальное качество', description: 'Высококачественная креативная работа, соответствующая стандартам фестивального города.' },
    ],
  },
}

// Salzburg-specific content section
const salzburgContext = {
  de: {
    title: 'Werbeagentur fuer Salzburg und das Salzburger Land',
    description: 'Salzburg vereint Weltkulturerbe, Festspiele und alpine Schoenheit. Als Tourismus-Hochburg mit Millionen internationaler Besucher jaehrlich stellt die Stadt besondere Anforderungen an Markenauftritte: Premium-Qualitaet, internationale Ansprache und kulturelles Feingefuehl. Ob Altstadt-Hotel, Skiresort im Salzburger Land oder innovative Startups im Techno-Z – wir verstehen die einzigartige Positionierung Salzburger Unternehmen.',
    highlights: [
      'Erfahrung mit Salzburger Festspielen und Kulturinstitutionen',
      'Tourismus-Marketing fuer Hotels und Gastronomie',
      'Mehrsprachige Kommunikation fuer internationale Gaeste',
      'Regionale Verwurzelung mit globalem Blick',
    ],
  },
  en: {
    title: 'Advertising Agency for Salzburg and Salzburg Land',
    description: 'Salzburg combines World Heritage, festivals and alpine beauty. As a tourism stronghold with millions of international visitors annually, the city places special demands on brand appearances: premium quality, international appeal and cultural sensitivity. Whether Old Town hotel, ski resort in Salzburg Land or innovative startups in Techno-Z – we understand the unique positioning of Salzburg businesses.',
    highlights: [
      'Experience with Salzburg Festival and cultural institutions',
      'Tourism marketing for hotels and gastronomy',
      'Multilingual communication for international guests',
      'Regional roots with global perspective',
    ],
  },
  ru: {
    title: 'Рекламное агентство для Зальцбурга и земли Зальцбург',
    description: 'Зальцбург объединяет Всемирное наследие, фестивали и альпийскую красоту. Как туристическая столица с миллионами международных посетителей ежегодно, город предъявляет особые требования к брендам: премиальное качество, международная привлекательность и культурная чуткость. Будь то отель в Старом городе, горнолыжный курорт в земле Зальцбург или инновационные стартапы в Techno-Z – мы понимаем уникальное позиционирование компаний Зальцбурга.',
    highlights: [
      'Опыт работы с Зальцбургским фестивалем и культурными институциями',
      'Туристический маркетинг для отелей и гастрономии',
      'Многоязычная коммуникация для международных гостей',
      'Региональные корни с глобальной перспективой',
    ],
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const content = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']

  const hreflangAlternates = getHreflangAlternates('/werbeagentur-salzburg', locale)

  return {
    title: content.metaTitle,
    description: truncateMetaDescription(content.metaDescription),
    keywords: content.keywords,
    openGraph: {
      title: content.heroTitle,
      description: truncateMetaDescription(content.metaDescription),
      url: getCanonicalUrl('/werbeagentur-salzburg', locale),
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
      canonical: getCanonicalUrl('/werbeagentur-salzburg', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function WerbeagenturSalzburgPage({ params }: { params: Promise<{ locale: string }> }) {
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
  const salzburg = salzburgContext[locale as SupportedLocale] ?? salzburgContext['en']

  const servicesTitle = { de: 'Unsere Werbe- & Design-Leistungen', en: 'Our Advertising & Design Services', ru: 'Наши рекламные и дизайн-услуги' }[locale] ?? 'Our Advertising & Design Services'
  const servicesDescription = { de: 'Full-Service Kreativloesungen fuer Salzburger Unternehmen und Tourismus.', en: 'Full-service creative solutions for Salzburg businesses and tourism.', ru: 'Креативные решения полного цикла для бизнеса и туризма Зальцбурга.' }[locale] ?? 'Full-service creative solutions for Salzburg businesses and tourism.'
  const pricingTitle = { de: 'Branding-Pakete', en: 'Branding Packages', ru: 'Пакеты брендинга' }[locale] ?? 'Branding Packages'
  const pricingDescription = { de: 'Transparente Preise fuer Markenentwicklung. Individuelle Angebote fuer groessere Projekte.', en: 'Transparent pricing for brand development. Custom quotes for larger projects.', ru: 'Прозрачные цены на разработку бренда. Индивидуальные предложения для крупных проектов.' }[locale] ?? 'Transparent pricing for brand development. Custom quotes for larger projects.'
  const processTitle = { de: 'Unser kreativer Prozess', en: 'Our Creative Process', ru: 'Наш креативный процесс' }[locale] ?? 'Our Creative Process'
  const processDescription = { de: 'Strukturierte Vorgehensweise fuer herausragende Kreativarbeit.', en: 'Structured approach for outstanding creative work.', ru: 'Структурированный подход к выдающейся креативной работе.' }[locale] ?? 'Structured approach for outstanding creative work.'
  const faqTitle = { de: 'Haeufige Fragen zur Werbeagentur Salzburg', en: 'Frequently Asked Questions', ru: 'Часто задаваемые вопросы' }[locale] ?? 'Frequently Asked Questions'
  const relatedServicesTitle = { de: 'Verwandte Leistungen', en: 'Related Services', ru: 'Связанные услуги' }[locale] ?? 'Related Services'
  const ctaTitle = { de: 'Bereit fuer einen starken Markenauftritt in Salzburg?', en: 'Ready to Elevate Your Salzburg Brand?', ru: 'Готовы усилить ваш бренд в Зальцбурге?' }[locale] ?? 'Ready to Elevate Your Salzburg Brand?'
  const ctaDescription = { de: 'Kostenlose Erstberatung. Wir besprechen Ihre Ziele und zeigen Ihnen kreative Moeglichkeiten.', en: 'Free initial consultation. We discuss your goals and show you creative possibilities.', ru: 'Бесплатная первичная консультация. Мы обсудим ваши цели и покажем креативные возможности.' }[locale] ?? 'Free initial consultation. We discuss your goals and show you creative possibilities.'
  const ctaButton = { de: 'Kostenlose Beratung anfordern', en: 'Request Free Consultation', ru: 'Запросить бесплатную консультацию' }[locale] ?? 'Request Free Consultation'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: { de: 'Werbeagentur Salzburg', en: 'Advertising Agency Salzburg', ru: 'Рекламное агентство Зальцбург' }[locale] ?? 'Advertising Agency Salzburg',
    alternateName: { de: 'Kreativagentur Salzburg', en: 'Creative Agency Salzburg', ru: 'Креативное агентство Зальцбург' }[locale] ?? 'Creative Agency Salzburg',
    url: 'https://goldenwing.at/werbeagentur-salzburg',
    provider: {
      '@type': 'LocalBusiness',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
      address: { '@type': 'PostalAddress', streetAddress: 'Czeikestrasse 4/21', addressLocality: 'Wien', postalCode: '1100', addressCountry: 'AT' },
    },
    areaServed: [
      { '@type': 'City', name: 'Salzburg' },
      { '@type': 'State', name: 'Salzburg' },
    ],
    description: { de: 'Full-Service Werbeagentur fuer Salzburg. Branding, Corporate Design, Werbekampagnen und Marketing fuer Salzburger Unternehmen und Tourismusindustrie.', en: 'Full-service advertising agency for Salzburg. Branding, corporate design, advertising campaigns and marketing for Salzburg businesses and tourism industry.', ru: 'Рекламное агентство полного цикла для Зальцбурга. Брендинг, корпоративный дизайн, рекламные кампании и маркетинг для бизнеса и туристической индустрии Зальцбурга.' }[locale] ?? 'Full-service advertising agency for Salzburg. Branding, corporate design, advertising campaigns and marketing for Salzburg businesses and tourism industry.',
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

      {/* Salzburg Context */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">{salzburg.title}</h2>
            <p className="text-lg text-muted-foreground mb-8">{salzburg.description}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {salzburg.highlights.map((highlight) => (
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
