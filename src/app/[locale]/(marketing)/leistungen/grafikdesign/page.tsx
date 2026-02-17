import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import { ArrowRight, Palette, PenTool, Image, Layout, FileText, Printer, CheckCircle, Phone, LucideIcon } from 'lucide-react'
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
  'palette': Palette,
  'pen-tool': PenTool,
  'image': Image,
  'layout': Layout,
  'file-text': FileText,
  'printer': Printer,
}

// Default content for Grafikdesign page
const defaultServices = {
  de: [
    { icon: 'palette', title: 'Logo Design', description: 'Einzigartige Logos, die Ihre Marke unverwechselbar machen. Vom Konzept bis zur finalen Datei in allen Formaten.' },
    { icon: 'pen-tool', title: 'Corporate Design', description: 'Durchgaengige visuelle Identitaet: Farben, Typografie, Bildsprache und Design-Guidelines fuer konsistente Markenkommunikation.' },
    { icon: 'printer', title: 'Print Design', description: 'Visitenkarten, Broschueren, Flyer, Plakate, Roll-ups und mehr. Druckfertige Dateien fuer jeden Einsatzzweck.' },
    { icon: 'layout', title: 'Digital Design', description: 'Social Media Grafiken, Banner, Praesentationen, E-Mail-Templates und digitale Werbemittel.' },
    { icon: 'image', title: 'Bildbearbeitung', description: 'Professionelle Retusche, Freisteller, Composings und Bildoptimierung fuer Print und Web.' },
    { icon: 'file-text', title: 'Layout & Satz', description: 'Professionelles Layout fuer Magazine, Kataloge, Geschaeftsberichte und Buecher.' },
  ],
  en: [
    { icon: 'palette', title: 'Logo Design', description: 'Unique logos that make your brand unmistakable. From concept to final file in all formats.' },
    { icon: 'pen-tool', title: 'Corporate Design', description: 'Consistent visual identity: Colors, typography, imagery, and design guidelines for consistent brand communication.' },
    { icon: 'printer', title: 'Print Design', description: 'Business cards, brochures, flyers, posters, roll-ups, and more. Print-ready files for every purpose.' },
    { icon: 'layout', title: 'Digital Design', description: 'Social media graphics, banners, presentations, email templates, and digital advertising materials.' },
    { icon: 'image', title: 'Image Editing', description: 'Professional retouching, clipping paths, composites, and image optimization for print and web.' },
    { icon: 'file-text', title: 'Layout & Typesetting', description: 'Professional layout for magazines, catalogs, annual reports, and books.' },
  ],
  ru: [
    { icon: 'palette', title: 'Дизайн логотипа', description: 'Уникальные логотипы, которые сделают ваш бренд узнаваемым. От концепции до финального файла во всех форматах.' },
    { icon: 'pen-tool', title: 'Корпоративный дизайн', description: 'Целостная визуальная идентичность: цвета, типографика, визуальный язык и руководства по дизайну для последовательной коммуникации бренда.' },
    { icon: 'printer', title: 'Печатный дизайн', description: 'Визитки, брошюры, флаеры, плакаты, ролл-апы и многое другое. Файлы, готовые к печати для любых целей.' },
    { icon: 'layout', title: 'Цифровой дизайн', description: 'Графика для социальных сетей, баннеры, презентации, email-шаблоны и цифровые рекламные материалы.' },
    { icon: 'image', title: 'Обработка изображений', description: 'Профессиональная ретушь, обтравка, композитинг и оптимизация изображений для печати и веба.' },
    { icon: 'file-text', title: 'Верстка и набор', description: 'Профессиональная верстка журналов, каталогов, годовых отчетов и книг.' },
  ],
}

const defaultPackages = {
  de: [
    { name: 'Logo Design', price: '890', priceType: 'ab', description: 'Professionelles Logodesign', popular: false, features: ['3 Konzeptentwuerfe', '2 Revisionsrunden', 'Finale Dateien (AI, EPS, PDF, PNG, SVG)', 'Farbvarianten (positiv/negativ)', 'Styleguide Basics', 'Nutzungsrechte inklusive'] },
    { name: 'Corporate Design', price: '2.490', priceType: 'ab', description: 'Komplette visuelle Identitaet', popular: true, features: ['Logo Design inkl.', 'Farbpalette & Typografie', 'Visitenkarten-Design', 'Briefpapier & Vorlagen', 'Social Media Templates', 'Brand Guidelines (PDF)', 'Alle Quelldateien', 'Praesentation & Uebergabe'] },
    { name: 'Visitenkarten', price: '190', priceType: 'ab', description: 'Professionelle Visitenkarten', popular: false, features: ['Individuelles Design', 'Vorder- und Rueckseite', '2 Revisionsrunden', 'Druckfertige Dateien', 'Optional: Druckabwicklung', 'Schnelle Lieferung'] },
    { name: 'Broschuere', price: '690', priceType: 'ab', description: '8-seitige Broschuere', popular: false, features: ['Bis zu 8 Seiten', 'Individuelles Layout', 'Bildbearbeitung inkl.', 'Druckfertige Dateien', '2 Revisionsrunden', 'InDesign-Quelldatei'] },
  ],
  en: [
    { name: 'Logo Design', price: '890', priceType: 'from', description: 'Professional logo design', popular: false, features: ['3 concept drafts', '2 revision rounds', 'Final files (AI, EPS, PDF, PNG, SVG)', 'Color variants (positive/negative)', 'Basic style guide', 'Usage rights included'] },
    { name: 'Corporate Design', price: '2,490', priceType: 'from', description: 'Complete visual identity', popular: true, features: ['Logo design incl.', 'Color palette & typography', 'Business card design', 'Letterhead & templates', 'Social media templates', 'Brand guidelines (PDF)', 'All source files', 'Presentation & handover'] },
    { name: 'Business Cards', price: '190', priceType: 'from', description: 'Professional business cards', popular: false, features: ['Individual design', 'Front and back', '2 revision rounds', 'Print-ready files', 'Optional: Print handling', 'Fast delivery'] },
    { name: 'Brochure', price: '690', priceType: 'from', description: '8-page brochure', popular: false, features: ['Up to 8 pages', 'Individual layout', 'Image editing incl.', 'Print-ready files', '2 revision rounds', 'InDesign source file'] },
  ],
  ru: [
    { name: 'Дизайн логотипа', price: '890', priceType: 'от', description: 'Профессиональный дизайн логотипа', popular: false, features: ['3 концептуальных варианта', '2 раунда правок', 'Финальные файлы (AI, EPS, PDF, PNG, SVG)', 'Цветовые варианты (позитив/негатив)', 'Базовый стайлгайд', 'Права на использование включены'] },
    { name: 'Корпоративный дизайн', price: '2 490', priceType: 'от', description: 'Полная визуальная идентичность', popular: true, features: ['Дизайн логотипа вкл.', 'Цветовая палитра и типографика', 'Дизайн визиток', 'Бланки и шаблоны', 'Шаблоны для соцсетей', 'Брендбук (PDF)', 'Все исходные файлы', 'Презентация и передача'] },
    { name: 'Визитки', price: '190', priceType: 'от', description: 'Профессиональные визитки', popular: false, features: ['Индивидуальный дизайн', 'Лицевая и оборотная сторона', '2 раунда правок', 'Файлы для печати', 'Опционально: организация печати', 'Быстрая доставка'] },
    { name: 'Брошюра', price: '690', priceType: 'от', description: '8-страничная брошюра', popular: false, features: ['До 8 страниц', 'Индивидуальная верстка', 'Обработка изображений вкл.', 'Файлы для печати', '2 раунда правок', 'Исходный файл InDesign'] },
  ],
}

const defaultResults = {
  de: [
    { metric: '500+', label: 'Logos gestaltet', client: 'Seit 2015' },
    { metric: '98%', label: 'Zufriedene Kunden', client: 'Weiterempfehlungsrate' },
    { metric: '72h', label: 'Erste Entwuerfe', client: 'Durchschnittlich' },
  ],
  en: [
    { metric: '500+', label: 'Logos designed', client: 'Since 2015' },
    { metric: '98%', label: 'Satisfied customers', client: 'Referral rate' },
    { metric: '72h', label: 'First drafts', client: 'On average' },
  ],
  ru: [
    { metric: '500+', label: 'Логотипов создано', client: 'С 2015 года' },
    { metric: '98%', label: 'Довольных клиентов', client: 'Уровень рекомендаций' },
    { metric: '72ч', label: 'Первые эскизы', client: 'В среднем' },
  ],
}

const defaultFaqs = {
  de: [
    { question: 'Was kostet ein Logo Design?', answer: 'Ein professionelles Logo Design startet bei uns ab 890 Euro. Dieser Preis beinhaltet 3 Konzeptentwuerfe, 2 Revisionsrunden und alle finalen Dateiformate. Fuer umfangreichere Projekte mit mehr Varianten oder zusaetzlichen Anwendungen erstellen wir ein individuelles Angebot.' },
    { question: 'Wie lange dauert ein Logo Design?', answer: 'Ein Logo-Projekt dauert typischerweise 2-3 Wochen. Die ersten Entwuerfe erhalten Sie innerhalb von 72 Stunden nach dem Briefing. Die Gesamtdauer haengt von der Anzahl der Revisionsrunden und Ihrer Feedback-Geschwindigkeit ab.' },
    { question: 'Was ist im Corporate Design enthalten?', answer: 'Unser Corporate Design Paket umfasst Logo, Farbpalette, Typografie, Visitenkarten, Briefpapier, Social Media Templates und ein umfassendes Brand Guidelines Dokument. Alle Quelldateien sind inklusive.' },
    { question: 'Welche Dateiformate erhalte ich?', answer: 'Sie erhalten alle branchenuelichen Formate: Vektordateien (AI, EPS, SVG, PDF) fuer den Druck und Rasterdateien (PNG, JPG) fuer digitale Anwendungen. Quelldateien wie InDesign oder Illustrator sind je nach Paket enthalten.' },
    { question: 'Bieten Sie auch Print-Produktion an?', answer: 'Ja, auf Wunsch uebernehmen wir auch die Druckabwicklung. Wir arbeiten mit ausgewaehlten Druckereien zusammen und koennen so beste Qualitaet zu fairen Preisen garantieren.' },
    { question: 'Wie laeuft die Zusammenarbeit ab?', answer: 'Nach einem ausfuehrlichen Briefing praesentieren wir Ihnen erste Konzepte. Basierend auf Ihrem Feedback verfeinern wir das Design in mehreren Runden, bis Sie vollstaendig zufrieden sind. Abschliessend erhalten Sie alle Dateien und eine Praesentation.' },
  ],
  en: [
    { question: 'How much does logo design cost?', answer: 'A professional logo design starts at 890 euros with us. This price includes 3 concept drafts, 2 revision rounds, and all final file formats. For more extensive projects with more variants or additional applications, we create a custom quote.' },
    { question: 'How long does logo design take?', answer: 'A logo project typically takes 2-3 weeks. You receive the first drafts within 72 hours after the briefing. The total duration depends on the number of revision rounds and your feedback speed.' },
    { question: 'What is included in corporate design?', answer: 'Our corporate design package includes logo, color palette, typography, business cards, letterhead, social media templates, and a comprehensive brand guidelines document. All source files are included.' },
    { question: 'What file formats do I receive?', answer: 'You receive all industry-standard formats: Vector files (AI, EPS, SVG, PDF) for print and raster files (PNG, JPG) for digital use. Source files like InDesign or Illustrator are included depending on the package.' },
    { question: 'Do you also offer print production?', answer: 'Yes, on request we also handle print production. We work with selected printers and can thus guarantee the best quality at fair prices.' },
    { question: 'How does the collaboration work?', answer: 'After a detailed briefing, we present you with initial concepts. Based on your feedback, we refine the design in several rounds until you are completely satisfied. Finally, you receive all files and a presentation.' },
  ],
  ru: [
    { question: 'Сколько стоит дизайн логотипа?', answer: 'Профессиональный дизайн логотипа у нас начинается от 890 евро. Эта цена включает 3 концептуальных варианта, 2 раунда правок и все финальные форматы файлов. Для более масштабных проектов с дополнительными вариантами или применениями мы составляем индивидуальное предложение.' },
    { question: 'Сколько времени занимает дизайн логотипа?', answer: 'Проект по созданию логотипа обычно занимает 2-3 недели. Первые эскизы вы получите в течение 72 часов после брифинга. Общая продолжительность зависит от количества раундов правок и скорости вашей обратной связи.' },
    { question: 'Что входит в корпоративный дизайн?', answer: 'Наш пакет корпоративного дизайна включает логотип, цветовую палитру, типографику, визитки, бланки, шаблоны для социальных сетей и полный документ с руководством по бренду. Все исходные файлы включены.' },
    { question: 'Какие форматы файлов я получу?', answer: 'Вы получите все стандартные форматы: векторные файлы (AI, EPS, SVG, PDF) для печати и растровые файлы (PNG, JPG) для цифрового использования. Исходные файлы InDesign или Illustrator включены в зависимости от пакета.' },
    { question: 'Вы также предлагаете печатное производство?', answer: 'Да, по запросу мы также организуем печать. Мы работаем с проверенными типографиями и можем гарантировать лучшее качество по справедливым ценам.' },
    { question: 'Как проходит сотрудничество?', answer: 'После подробного брифинга мы представляем вам первоначальные концепции. На основе вашей обратной связи мы дорабатываем дизайн в несколько раундов, пока вы не будете полностью удовлетворены. В завершение вы получаете все файлы и презентацию.' },
  ],
}

const defaultProcess = {
  de: [
    { step: '01', title: 'Briefing', description: 'Ihre Vision, Zielgruppe und Anforderungen verstehen' },
    { step: '02', title: 'Konzeption', description: 'Ideenfindung und erste Entwuerfe' },
    { step: '03', title: 'Praesentation', description: 'Vorstellung der Konzepte mit Erklaerung' },
    { step: '04', title: 'Verfeinerung', description: 'Feedback einarbeiten und optimieren' },
    { step: '05', title: 'Finalisierung', description: 'Dateien aufbereiten und uebergeben' },
  ],
  en: [
    { step: '01', title: 'Briefing', description: 'Understand your vision, target audience, and requirements' },
    { step: '02', title: 'Conception', description: 'Ideation and first drafts' },
    { step: '03', title: 'Presentation', description: 'Present concepts with explanation' },
    { step: '04', title: 'Refinement', description: 'Incorporate feedback and optimize' },
    { step: '05', title: 'Finalization', description: 'Prepare and deliver files' },
  ],
  ru: [
    { step: '01', title: 'Брифинг', description: 'Понять вашу визию, целевую аудиторию и требования' },
    { step: '02', title: 'Концепция', description: 'Генерация идей и первые эскизы' },
    { step: '03', title: 'Презентация', description: 'Представление концептов с объяснением' },
    { step: '04', title: 'Доработка', description: 'Учесть обратную связь и оптимизировать' },
    { step: '05', title: 'Финализация', description: 'Подготовить и передать файлы' },
  ],
}

const defaultRelatedServices = {
  de: [
    { title: 'Branding', description: 'Komplette Markenentwicklung von der Strategie bis zum Design.', href: '/leistungen/branding' },
    { title: 'Webdesign', description: 'Websites, die Ihr Corporate Design digital umsetzen.', href: '/leistungen/webdesign' },
    { title: 'Social Media', description: 'Konsistente Grafiken fuer Ihre Social-Media-Kanaele.', href: '/leistungen/social-media-agentur' },
  ],
  en: [
    { title: 'Branding', description: 'Complete brand development from strategy to design.', href: '/leistungen/branding' },
    { title: 'Web Design', description: 'Websites that digitally implement your corporate design.', href: '/leistungen/webdesign' },
    { title: 'Social Media', description: 'Consistent graphics for your social media channels.', href: '/leistungen/social-media-agentur' },
  ],
  ru: [
    { title: 'Брендинг', description: 'Полное развитие бренда от стратегии до дизайна.', href: '/leistungen/branding' },
    { title: 'Веб-дизайн', description: 'Веб-сайты, которые цифрово воплощают ваш корпоративный дизайн.', href: '/leistungen/webdesign' },
    { title: 'Социальные сети', description: 'Единообразная графика для ваших каналов в социальных сетях.', href: '/leistungen/social-media-agentur' },
  ],
} as const satisfies Record<'de' | 'en' | 'ru', Array<{ title: string; description: string; href: StaticAppPathname }>>

const defaultUsps = {
  de: [
    { title: 'Erfahrene Designer', description: 'Ueber 10 Jahre Erfahrung in der Markengestaltung.' },
    { title: 'Schnelle Lieferung', description: 'Erste Entwuerfe innerhalb von 72 Stunden.' },
    { title: 'Alle Dateiformate', description: 'Vektoren, Pixel, Quelldateien - alles inklusive.' },
    { title: 'Faire Preise', description: 'Transparente Pauschalen statt Stundensaetze.' },
  ],
  en: [
    { title: 'Experienced Designers', description: 'Over 10 years of experience in brand design.' },
    { title: 'Fast Delivery', description: 'First drafts within 72 hours.' },
    { title: 'All File Formats', description: 'Vectors, pixels, source files - all included.' },
    { title: 'Fair Prices', description: 'Transparent flat rates instead of hourly rates.' },
  ],
  ru: [
    { title: 'Опытные дизайнеры', description: 'Более 10 лет опыта в дизайне брендов.' },
    { title: 'Быстрая доставка', description: 'Первые эскизы в течение 72 часов.' },
    { title: 'Все форматы файлов', description: 'Векторы, пиксели, исходники - все включено.' },
    { title: 'Справедливые цены', description: 'Прозрачные фиксированные тарифы вместо почасовой оплаты.' },
  ],
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale

  const metaTitle = { de: 'Grafikdesign Wien - Logo, Corporate Design & Print | GoldenWing', en: 'Graphic Design Vienna - Logo, Corporate Design & Print | GoldenWing', ru: 'Графический дизайн Вена | GoldenWing' }[locale as 'de' | 'en' | 'ru'] ?? 'Graphic Design Vienna - Logo, Corporate Design & Print | GoldenWing'

  const metaDescription = truncateMetaDescription(
    { de: 'Grafikdesigner aus Wien: Logo ab 890 Euro, Corporate Design ab 2.490 Euro, Visitenkarten ab 190 Euro, Broschueren ab 690 Euro. 500+ Logos gestaltet. Jetzt anfragen!', en: 'Graphic designer from Vienna: Logo from 890 euros, corporate design from 2,490 euros, business cards from 190 euros, brochures from 690 euros. 500+ logos designed. Request now!', ru: 'Графический дизайнер из Вены: логотип от 890 евро, корпоративный дизайн от 2 490 евро, визитки от 190 евро, брошюры от 690 евро. Создано 500+ логотипов. Запросите сейчас!' }[locale as 'de' | 'en' | 'ru'] ?? 'Graphic designer from Vienna: Logo from 890 euros, corporate design from 2,490 euros, business cards from 190 euros, brochures from 690 euros. 500+ logos designed. Request now!'
  )

  const hreflangAlternates = getHreflangAlternates('/leistungen/grafikdesign', locale)

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: { de: ['Grafikdesign', 'Grafikdesigner Wien', 'Logo Design Wien', 'Corporate Design Wien', 'Grafikdesign Wien', 'Visitenkarten Design', 'Broschueren Design'], en: ['Graphic Design', 'Graphic Designer Vienna', 'Logo Design Vienna', 'Corporate Design Vienna', 'Business Card Design', 'Brochure Design'], ru: ['Графический дизайн', 'Графический дизайнер Вена', 'Дизайн логотипа Вена', 'Корпоративный дизайн Вена', 'Дизайн визиток', 'Дизайн брошюр'] }[locale as 'de' | 'en' | 'ru'] ?? ['Graphic Design', 'Graphic Designer Vienna', 'Logo Design Vienna', 'Corporate Design Vienna', 'Business Card Design', 'Brochure Design'],
    openGraph: {
      title: { de: 'Grafikdesign Wien', en: 'Graphic Design Vienna', ru: 'Графический дизайн Вена' }[locale as 'de' | 'en' | 'ru'] ?? 'Graphic Design Vienna',
      description: metaDescription,
      url: getCanonicalUrl('/leistungen/grafikdesign', locale),
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing - Grafikdesign' }],
    },
    alternates: {
      canonical: getCanonicalUrl('/leistungen/grafikdesign', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function GrafikdesignPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const t = await getTranslations({ locale, namespace: 'common' })

  const breadcrumbs = [
    { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale as 'de' | 'en' | 'ru'] ?? 'Home', url: 'https://goldenwing.at' },
    { name: { de: 'Leistungen', en: 'Services', ru: 'Услуги' }[locale as 'de' | 'en' | 'ru'] ?? 'Services', url: { de: 'https://goldenwing.at/leistungen', en: 'https://goldenwing.at/en/services', ru: 'https://goldenwing.at/ru/services' }[locale as 'de' | 'en' | 'ru'] ?? 'https://goldenwing.at/leistungen' },
    { name: { de: 'Grafikdesign', en: 'Graphic Design', ru: 'Графический дизайн' }[locale as 'de' | 'en' | 'ru'] ?? 'Graphic Design', url: { de: 'https://goldenwing.at/leistungen/grafikdesign', en: 'https://goldenwing.at/en/services/graphic-design', ru: 'https://goldenwing.at/ru/services/graphic-design' }[locale as 'de' | 'en' | 'ru'] ?? 'https://goldenwing.at/leistungen/grafikdesign' },
  ]

  const heroData = {
    badge: { de: 'Grafikdesign', en: 'Graphic Design', ru: 'Графический дизайн' }[locale as 'de' | 'en' | 'ru'] ?? 'Graphic Design',
    title: { de: 'Grafikdesign Wien', en: 'Graphic Design Vienna', ru: 'Графический дизайн Вена' }[locale as 'de' | 'en' | 'ru'] ?? 'Graphic Design Vienna',
    subtitle: { de: 'Design, das Eindruck hinterlaesst.', en: 'Design that leaves an impression.', ru: 'Дизайн, который производит впечатление.' }[locale as 'de' | 'en' | 'ru'] ?? 'Design that leaves an impression.',
    description: { de: 'Professionelles Grafikdesign aus Wien. Logodesign, Corporate Design, Printmaterialien und digitale Grafiken. Erfahrene Designer, schnelle Lieferung, faire Preise.', en: 'Professional graphic design from Vienna. Logo design, corporate design, print materials, and digital graphics. Experienced designers, fast delivery, fair prices.', ru: 'Профессиональный графический дизайн из Вены. Дизайн логотипов, корпоративный дизайн, печатные материалы и цифровая графика. Опытные дизайнеры, быстрая доставка, справедливые цены.' }[locale as 'de' | 'en' | 'ru'] ?? 'Professional graphic design from Vienna. Logo design, corporate design, print materials, and digital graphics. Experienced designers, fast delivery, fair prices.',
    ctaPrimary: { de: 'Angebot anfordern', en: 'Request Quote', ru: 'Запросить предложение' }[locale as 'de' | 'en' | 'ru'] ?? 'Request Quote',
    ctaSecondary: { de: 'Preise ansehen', en: 'View Pricing', ru: 'Посмотреть цены' }[locale as 'de' | 'en' | 'ru'] ?? 'View Pricing',
  }

  const results = defaultResults[locale as 'de' | 'en' | 'ru'] ?? defaultResults['en']
  const services = defaultServices[locale as 'de' | 'en' | 'ru'] ?? defaultServices['en']
  const packages = defaultPackages[locale as 'de' | 'en' | 'ru'] ?? defaultPackages['en']
  const process = defaultProcess[locale as 'de' | 'en' | 'ru'] ?? defaultProcess['en']
  const faqs = defaultFaqs[locale as 'de' | 'en' | 'ru'] ?? defaultFaqs['en']
  const relatedServices = defaultRelatedServices[locale as 'de' | 'en' | 'ru'] ?? defaultRelatedServices['en']
  const usps = defaultUsps[locale as 'de' | 'en' | 'ru'] ?? defaultUsps['en']

  const servicesTitle = { de: 'Unsere Grafikdesign-Leistungen', en: 'Our Graphic Design Services', ru: 'Наши услуги графического дизайна' }[locale as 'de' | 'en' | 'ru'] ?? 'Our Graphic Design Services'
  const servicesDescription = { de: 'Vom Logo bis zum kompletten Corporate Design - wir gestalten alles, was Sie fuer eine starke Markenpraesenz brauchen.', en: 'From logo to complete corporate design - we design everything you need for a strong brand presence.', ru: 'От логотипа до полного корпоративного дизайна - мы создаем все, что вам нужно для сильного присутствия бренда.' }[locale as 'de' | 'en' | 'ru'] ?? 'From logo to complete corporate design - we design everything you need for a strong brand presence.'
  const pricingTitle = { de: 'Grafikdesign-Pakete', en: 'Graphic Design Packages', ru: 'Пакеты графического дизайна' }[locale as 'de' | 'en' | 'ru'] ?? 'Graphic Design Packages'
  const pricingDescription = { de: 'Transparente Pauschalpreise fuer professionelles Grafikdesign.', en: 'Transparent flat-rate prices for professional graphic design.', ru: 'Прозрачные фиксированные цены на профессиональный графический дизайн.' }[locale as 'de' | 'en' | 'ru'] ?? 'Transparent flat-rate prices for professional graphic design.'
  const processTitle = { de: 'Unser Designprozess', en: 'Our Design Process', ru: 'Наш процесс дизайна' }[locale as 'de' | 'en' | 'ru'] ?? 'Our Design Process'
  const processDescription = { de: 'Vom Briefing zum fertigen Design in 5 Schritten.', en: 'From briefing to finished design in 5 steps.', ru: 'От брифинга до готового дизайна за 5 шагов.' }[locale as 'de' | 'en' | 'ru'] ?? 'From briefing to finished design in 5 steps.'
  const faqTitle = { de: 'Haeufige Fragen', en: 'Frequently Asked Questions', ru: 'Часто задаваемые вопросы' }[locale as 'de' | 'en' | 'ru'] ?? 'Frequently Asked Questions'
  const relatedServicesTitle = { de: 'Verwandte Leistungen', en: 'Related Services', ru: 'Связанные услуги' }[locale as 'de' | 'en' | 'ru'] ?? 'Related Services'
  const ctaTitle = { de: 'Sie brauchen professionelles Design?', en: 'Need Professional Design?', ru: 'Нужен профессиональный дизайн?' }[locale as 'de' | 'en' | 'ru'] ?? 'Need Professional Design?'
  const ctaDescription = { de: 'Lassen Sie uns ueber Ihr Designprojekt sprechen. Kostenloses Erstgespraech.', en: 'Let\'s discuss your design project. Free initial consultation.', ru: 'Давайте обсудим ваш дизайн-проект. Бесплатная первичная консультация.' }[locale as 'de' | 'en' | 'ru'] ?? 'Let\'s discuss your design project. Free initial consultation.'
  const ctaButton = { de: 'Kostenloses Angebot anfordern', en: 'Request Free Quote', ru: 'Запросить бесплатное предложение' }[locale as 'de' | 'en' | 'ru'] ?? 'Request Free Quote'
  const uspsTitle = { de: 'Warum wir', en: 'Why Choose Us', ru: 'Почему мы' }[locale as 'de' | 'en' | 'ru'] ?? 'Why Choose Us'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: { de: 'Grafikdesign Wien', en: 'Graphic Design Vienna', ru: 'Графический дизайн Вена' }[locale as 'de' | 'en' | 'ru'] ?? 'Graphic Design Vienna',
    alternateName: { de: 'Grafikdesigner Wien', en: 'Graphic Designer Vienna', ru: 'Графический дизайнер Вена' }[locale as 'de' | 'en' | 'ru'] ?? 'Graphic Designer Vienna',
    url: 'https://goldenwing.at/leistungen/grafikdesign',
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
    description: { de: 'Professionelles Grafikdesign in Wien. Logodesign, Corporate Design, Printmaterialien und digitale Grafiken.', en: 'Professional graphic design services in Vienna. Logo design, corporate design, print materials, and digital graphics.', ru: 'Профессиональные услуги графического дизайна в Вене. Дизайн логотипов, корпоративный дизайн, печатные материалы и цифровая графика.' }[locale as 'de' | 'en' | 'ru'] ?? 'Professional graphic design services in Vienna. Logo design, corporate design, print materials, and digital graphics.',
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
                <NextLink href="#preise">{heroData.ctaSecondary}</NextLink>
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

      {/* Services */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{servicesTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{servicesDescription}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service: { icon: string; title: string; description: string }) => {
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

      {/* Pricing */}
      <section id="preise" className="py-20 scroll-mt-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{pricingTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{pricingDescription}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg: { name: string; price: string; priceType: string; description: string; popular: boolean; features: string[] }) => (
              <Card key={pkg.name} className={pkg.popular ? 'border-primary shadow-lg relative' : ''}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>{{ de: 'Beliebt', en: 'Popular', ru: 'Популярный' }[locale as 'de' | 'en' | 'ru'] ?? 'Popular'}</Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">{pkg.name}</CardTitle>
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
                    <NextLink href={getContactUrl(locale)}>{{ de: 'Anfragen', en: 'Request', ru: 'Запросить' }[locale as 'de' | 'en' | 'ru'] ?? 'Request'}</NextLink>
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
          className="bg-background"
        />
      )}

      {/* Related Services */}
      <section className="py-20 bg-muted/30">
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
