import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import { ArrowRight, Search, TrendingUp, Target, BarChart3, Globe, FileText, CheckCircle, Phone, LucideIcon } from 'lucide-react'
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
  'search': Search,
  'file-text': FileText,
  'target': Target,
  'globe': Globe,
  'bar-chart-3': BarChart3,
  'trending-up': TrendingUp,
}

// Default content for Innsbruck SEO
const defaultContent = {
  de: {
    metaTitle: 'SEO Innsbruck | Suchmaschinenoptimierung Tirol',
    metaDescription: 'SEO Agentur in Innsbruck. Lokale Suchmaschinenoptimierung fuer Skigebiete, Hotels und Tiroler Unternehmen. Mehr Gaeste, bessere Rankings, mehr Buchungen.',
    keywords: ['SEO Innsbruck', 'Suchmaschinenoptimierung Innsbruck', 'SEO Tirol', 'Google Optimierung Innsbruck', 'Local SEO Tirol', 'Hotel SEO Innsbruck'],
    heroTitle: 'SEO Innsbruck – Mehr Sichtbarkeit in den Alpen',
    heroDescription: 'Wir bringen Ihr Skigebiet, Hotel oder Unternehmen in Innsbruck an die Spitze der Google-Suchergebnisse. Lokale SEO-Strategien fuer nachhaltig mehr Gaeste und Buchungen.',
    heroBadge: 'SEO Innsbruck',
    ctaPrimary: 'Kostenlose SEO-Analyse',
    ctaSecondary: 'SEO-Pakete ansehen',
  },
  en: {
    metaTitle: 'SEO Innsbruck | Search Engine Optimization Tyrol',
    metaDescription: 'SEO agency in Innsbruck. Local search engine optimization for ski resorts, hotels and Tyrolean businesses. More guests, better rankings, more bookings.',
    keywords: ['SEO Innsbruck', 'Search Engine Optimization Innsbruck', 'SEO Tyrol', 'Google Optimization Innsbruck', 'Local SEO Tyrol', 'Hotel SEO Innsbruck'],
    heroTitle: 'SEO Innsbruck – More Visibility in the Alps',
    heroDescription: 'We bring your ski resort, hotel or business in Innsbruck to the top of Google search results. Local SEO strategies for sustainable guest acquisition and bookings.',
    heroBadge: 'SEO Innsbruck',
    ctaPrimary: 'Free SEO Analysis',
    ctaSecondary: 'View SEO Packages',
  },
  ru: {
    metaTitle: 'SEO Innsbruck | Poiskocaya optimizaciya Tirol',
    metaDescription: 'SEO agentstvo v Insbruke. Lokalnaya poiskovaya optimizaciya dlya gornolyzhnyh kurortov, otelej i tirolskih kompanij. Bolshe gostej, luchshie pozicii, bolshe bronirovanij.',
    keywords: ['SEO Innsbruck', 'Poiskovaya optimizaciya Innsbruck', 'SEO Tirol', 'Google optimizaciya Innsbruck', 'Lokalnoe SEO Tirol', 'SEO otelej Innsbruck'],
    heroTitle: 'SEO Innsbruck – Bolshe vidimosti v Alpah',
    heroDescription: 'My vyvedim vash gornolyzhnyj kurort, otel ili biznes v Insbruke na vershinu rezultatov poiska Google. Lokalnye SEO-strategii dlya stabilnogo privlecheniya gostej i bronirovanij.',
    heroBadge: 'SEO Innsbruck',
    ctaPrimary: 'Besplatnyj SEO-analiz',
    ctaSecondary: 'Smotret SEO-pakety',
  }
}

const defaultServices = {
  de: [
    { icon: 'search', title: 'Technisches SEO', description: 'Core Web Vitals, Seitengeschwindigkeit, Mobile-First – schnelle Ladezeiten auch in den Bergen.' },
    { icon: 'file-text', title: 'Content SEO', description: 'Keyword-Recherche fuer Wintersport, Tourismus und Tiroler Maerkte, mehrsprachige SEO-Texte.' },
    { icon: 'target', title: 'Local SEO Innsbruck', description: 'Google Business Profile, Google Maps, lokale Keywords wie "Skigebiet Tirol" und "Hotel Innsbruck".' },
    { icon: 'globe', title: 'International SEO', description: 'Mehrsprachige Optimierung fuer Gaeste aus Deutschland, Italien, UK und anderen Maerkten.' },
    { icon: 'bar-chart-3', title: 'SEO Audit', description: 'Umfassende Analyse Ihrer Skigebiet- oder Hotel-Website mit konkreten Massnahmen.' },
    { icon: 'trending-up', title: 'Saisonales SEO', description: 'Rankings zur Wintersaison und Sommersaison – Timing ist in Tirol entscheidend.' },
  ],
  en: [
    { icon: 'search', title: 'Technical SEO', description: 'Core Web Vitals, page speed, mobile-first – fast loading times even in the mountains.' },
    { icon: 'file-text', title: 'Content SEO', description: 'Keyword research for winter sports, tourism and Tyrolean markets, multilingual SEO copy.' },
    { icon: 'target', title: 'Local SEO Innsbruck', description: 'Google Business Profile, Google Maps, local keywords like "ski resort Tyrol" and "Hotel Innsbruck".' },
    { icon: 'globe', title: 'International SEO', description: 'Multilingual optimization for guests from Germany, Italy, UK and other markets.' },
    { icon: 'bar-chart-3', title: 'SEO Audit', description: 'Comprehensive analysis of your ski resort or hotel website with concrete measures.' },
    { icon: 'trending-up', title: 'Seasonal SEO', description: 'Rankings for winter and summer season – timing is crucial in Tyrol.' },
  ],
  ru: [
    { icon: 'search', title: 'Tehnicheskoe SEO', description: 'Core Web Vitals, skorost zagruzki, mobile-first – bystraya zagruzka dazhe v gorah.' },
    { icon: 'file-text', title: 'Kontent SEO', description: 'Issledovanie klyuchevyh slov dlya zimnego sporta, turizma i tirolskih rynkov, mnogoyazychnye SEO-teksty.' },
    { icon: 'target', title: 'Lokalnoe SEO Innsbruck', description: 'Google Business Profile, Google Maps, lokalnye klyuchevye slova "gornolyzhnyj kurort Tirol" i "Otel Innsbruck".' },
    { icon: 'globe', title: 'Mezhdunarodnoe SEO', description: 'Mnogoyazychnaya optimizaciya dlya gostej iz Germanii, Italii, Velikobritanii i drugih stran.' },
    { icon: 'bar-chart-3', title: 'SEO Audit', description: 'Kompleksnyj analiz sajta vashego gornolyozhnogo kurorta ili otelya s konkretnymi rekomendaciyami.' },
    { icon: 'trending-up', title: 'Sezonnoe SEO', description: 'Rejtingi dlya zimnego i letnego sezona – tajming v Tirole reshayuschij.' },
  ],
}

const defaultPackages = {
  de: [
    { name: 'SEO Audit', price: '490', priceType: 'einmalig', description: 'Umfassende Analyse Ihrer Website', popular: false, features: ['Technische SEO-Analyse', 'Keyword-Recherche Innsbruck/Tirol', 'Wettbewerbsanalyse', 'Content-Audit', 'Google Maps Analyse', 'Priorisierte Massnahmenliste'] },
    { name: 'SEO Starter', price: '790', priceType: 'pro Monat', description: 'Fuer kleine Pensionen und lokale Betriebe', popular: false, features: ['Bis zu 10 Keywords', 'OnPage-Optimierung', 'Local SEO Innsbruck', 'Google Business Profile', 'Monatliches Reporting', '3 Stunden Support/Monat'] },
    { name: 'SEO Business', price: '1.490', priceType: 'pro Monat', description: 'Fuer Hotels und Skigebiete', popular: true, features: ['Bis zu 30 Keywords', 'Vollstaendige OnPage-Optimierung', 'Content-Erstellung (2 Artikel/Monat)', 'Mehrsprachige SEO (DE/EN/IT)', 'Saisonale Anpassung', 'Detailliertes Reporting', '8 Stunden Support/Monat'] },
    { name: 'SEO Enterprise', price: '2.990+', priceType: 'pro Monat', description: 'Fuer grosse Skigebiete und Tourismusverbaende', popular: false, features: ['Unbegrenzte Keywords', 'Dedizierter SEO-Manager', 'Content-Strategie 5+ Sprachen', 'Aggressives Link-Building', 'Konkurrenz-Monitoring', 'Conversion-Optimierung', 'Woechentliche Strategy Calls'] },
  ],
  en: [
    { name: 'SEO Audit', price: '490', priceType: 'one-time', description: 'Comprehensive analysis of your website', popular: false, features: ['Technical SEO analysis', 'Keyword research Innsbruck/Tyrol', 'Competitor analysis', 'Content audit', 'Google Maps analysis', 'Prioritized action list'] },
    { name: 'SEO Starter', price: '790', priceType: 'per month', description: 'For small guesthouses and local businesses', popular: false, features: ['Up to 10 keywords', 'OnPage optimization', 'Local SEO Innsbruck', 'Google Business Profile', 'Monthly reporting', '3 hours support/month'] },
    { name: 'SEO Business', price: '1,490', priceType: 'per month', description: 'For hotels and ski resorts', popular: true, features: ['Up to 30 keywords', 'Complete OnPage optimization', 'Content creation (2 articles/month)', 'Multilingual SEO (DE/EN/IT)', 'Seasonal adjustment', 'Detailed reporting', '8 hours support/month'] },
    { name: 'SEO Enterprise', price: '2,990+', priceType: 'per month', description: 'For large ski resorts and tourism associations', popular: false, features: ['Unlimited keywords', 'Dedicated SEO manager', 'Content strategy 5+ languages', 'Aggressive link building', 'Competitor monitoring', 'Conversion optimization', 'Weekly strategy calls'] },
  ],
  ru: [
    { name: 'SEO Audit', price: '490', priceType: 'odnorazovo', description: 'Kompleksnyj analiz vashego sajta', popular: false, features: ['Tehnicheskij SEO-analiz', 'Issledovanie klyuchevyh slov Innsbruck/Tirol', 'Analiz konkurentov', 'Audit kontenta', 'Analiz Google Maps', 'Prioritetnyj spisok dejstvij'] },
    { name: 'SEO Starter', price: '790', priceType: 'v mesyac', description: 'Dlya nebolshih gostevyh domov i lokalnyh kompanij', popular: false, features: ['Do 10 klyuchevyh slov', 'OnPage optimizaciya', 'Lokalnoe SEO Innsbruck', 'Google Business Profile', 'Ezhemesyachnaya otchetnost', '3 chasa podderzhki/mesyac'] },
    { name: 'SEO Business', price: '1 490', priceType: 'v mesyac', description: 'Dlya otelej i gornolyzhnyh kurortov', popular: true, features: ['Do 30 klyuchevyh slov', 'Polnaya OnPage optimizaciya', 'Sozdanie kontenta (2 stati/mesyac)', 'Mnogoyazychnoe SEO (DE/EN/IT)', 'Sezonnaya korrektirovka', 'Podrobnaya otchetnost', '8 chasov podderzhki/mesyac'] },
    { name: 'SEO Enterprise', price: '2 990+', priceType: 'v mesyac', description: 'Dlya krupnyh gornolyzhnyh kurortov i turisticheskih associacij', popular: false, features: ['Neogranichennoe kolichestvo klyuchevyh slov', 'Vydelennyj SEO-menedzher', 'Kontent-strategiya 5+ yazykov', 'Aktivnoe narashivanie ssylok', 'Monitoring konkurentov', 'Optimizaciya konversii', 'Ezhenedelnye strategicheskie zvonki'] },
  ],
}

const defaultResults = {
  de: [
    { metric: '+312%', label: 'Mehr organischer Traffic', client: 'Skigebiet Stubaital' },
    { metric: 'Top 3', label: 'Rankings fuer "Hotel Innsbruck"', client: '4-Sterne Hotel Zentrum' },
    { metric: '+225%', label: 'Mehr Direktbuchungen', client: 'Alpinresort Tirol' },
  ],
  en: [
    { metric: '+312%', label: 'More organic traffic', client: 'Stubai Valley Ski Resort' },
    { metric: 'Top 3', label: 'Rankings for "Hotel Innsbruck"', client: '4-Star Hotel City Center' },
    { metric: '+225%', label: 'More direct bookings', client: 'Alpine Resort Tyrol' },
  ],
  ru: [
    { metric: '+312%', label: 'Bolshe organicheskogo trafika', client: 'Gornolyzhnyj kurort Stubajskaya dolina' },
    { metric: 'Top 3', label: 'Rejtingi po zaprosu "Otel Innsbruck"', client: '4-zvezdochnyj otel v centre goroda' },
    { metric: '+225%', label: 'Bolshe pryamyh bronirovanij', client: 'Alpijskij kurort Tirol' },
  ],
}

const defaultFaqs = {
  de: [
    { question: 'Wie lange dauert SEO in Innsbruck, bis Ergebnisse sichtbar sind?', answer: 'SEO ist eine langfristige Strategie. Erste Verbesserungen sehen Sie oft nach 3-4 Monaten. Im Wintersport-Tourismus ist Timing entscheidend – wir beginnen im Sommer mit der Optimierung, damit Sie zur Wintersaison optimal positioniert sind.' },
    { question: 'Was kostet SEO fuer Skigebiete und Hotels in Tirol?', answer: 'Unsere SEO-Pakete starten bei 790 Euro pro Monat fuer kleinere Betriebe. Business-Pakete mit mehrsprachiger Optimierung liegen bei 1.490 Euro pro Monat. Ein einmaliger SEO-Audit kostet 490 Euro. Die Kosten haengen von der Groesse und dem Wettbewerb ab.' },
    { question: 'Warum ist Local SEO fuer Tiroler Skigebiete so wichtig?', answer: 'Die meisten Gaeste suchen "Skigebiet Tirol", "Skiurlaub Oesterreich" oder "Hotel Innsbruck" bei Google. Mit Local SEO erscheinen Sie in Google Maps und im Local Pack. Dazu kommt die Optimierung Ihres Google Business Profiles mit aktuellen Infos zu Pisten, Wetter und Oeffnungszeiten.' },
    { question: 'Bietet ihr auch mehrsprachige SEO an?', answer: 'Ja, fuer den Tiroler Tourismus ist das essentiell! Wir optimieren fuer deutsche, englische, italienische und weitere Maerkte. Gaeste aus Deutschland, Italien, UK und den Niederlanden suchen in ihrer Sprache – wir decken alle relevanten Maerkte ab.' },
    { question: 'Wie passt ihr SEO an die Saisonalitaet an?', answer: 'Tirol hat klare Saisonen: Wintersport von November bis April, Wandern und Outdoor von Mai bis Oktober. Wir passen Keywords, Content und Strategie an die Saison an. Vor der Wintersaison pushen wir Ski-Keywords, im Fruehling wechseln wir zu Wander- und Bike-Themen.' },
  ],
  en: [
    { question: 'How long does SEO in Innsbruck take to show results?', answer: 'SEO is a long-term strategy. You often see first improvements after 3-4 months. In winter sports tourism, timing is key – we start optimization in summer so you are optimally positioned for winter season.' },
    { question: 'How much does SEO for ski resorts and hotels in Tyrol cost?', answer: 'Our SEO packages start at 790 euros per month for smaller businesses. Business packages with multilingual optimization are 1,490 euros per month. A one-time SEO audit costs 490 euros. Costs depend on size and competition.' },
    { question: 'Why is Local SEO so important for Tyrolean ski resorts?', answer: 'Most guests search "ski resort Tyrol", "ski holiday Austria" or "Hotel Innsbruck" on Google. With Local SEO, you appear in Google Maps and the Local Pack. Plus optimization of your Google Business Profile with current info on slopes, weather and opening times.' },
    { question: 'Do you offer multilingual SEO?', answer: 'Yes, for Tyrolean tourism this is essential! We optimize for German, English, Italian and other markets. Guests from Germany, Italy, UK and the Netherlands search in their language – we cover all relevant markets.' },
    { question: 'How do you adapt SEO to seasonality?', answer: 'Tyrol has clear seasons: winter sports from November to April, hiking and outdoor from May to October. We adapt keywords, content and strategy to the season. Before winter season, we push ski keywords, in spring we switch to hiking and biking topics.' },
  ],
  ru: [
    { question: 'Skolko vremeni zanimaet SEO v Insbruke do pervyh rezultatov?', answer: 'SEO – eto dolgosrochnaya strategiya. Pervye uluchsheniya chasto vidny cherez 3-4 mesyaca. V zimnem sportivnom turizme tajming reshayuschij – my nachinaem optimizaciyu letom, chtoby vy byli optimalno pozicionirovany k zimnemyu sezonu.' },
    { question: 'Skolko stoit SEO dlya gornolyzhnyh kurortov i otelej v Tirole?', answer: 'Nashi SEO-pakety nachinayutsya ot 790 evro v mesyac dlya nebolshih kompanij. Biznes-pakety s mnogoyazychnoj optimizaciej stoyat 1 490 evro v mesyac. Razovyj SEO-audit stoit 490 evro. Stoimost zavisit ot razmera i konkurencii.' },
    { question: 'Pochemu lokalnoe SEO tak vazhno dlya tirolskih gornolyzhnyh kurortov?', answer: 'Bolshinstvo gostej ishut "gornolyzhnyj kurort Tirol", "lyzhnyj otdyh Avstriya" ili "Otel Innsbruck" v Google. S lokalnym SEO vy poyavlyaetes v Google Maps i Local Pack. Plyus optimizaciya vashego Google Business Profile s aktualnoj informaciej o trassah, pogode i chasah raboty.' },
    { question: 'Vy predlagaete mnogoyazychnoe SEO?', answer: 'Da, dlya tirolskogo turizma eto neobhodimo! My optimiziruem dlya nemeckogo, anglijskogo, italyanskogo i drugih rynkov. Gosti iz Germanii, Italii, Velikobritanii i Niderlandov ishut na svoem yazyke – my ohvatyvaem vse relevantyne rynki.' },
    { question: 'Kak vy adaptiruete SEO k sezonnosti?', answer: 'V Tirole chetkie sezony: zimnij sport s noyabrya po aprel, pohody i outdoor s maya po oktyabr. My adaptiruem klyuchevye slova, kontent i strategiyu k sezonu. Pered zimnim sezonom my prodvigaem lyzhnyе klyuchevye slova, vesnoj pereklyuchaemsya na temy pohoda i velosporta.' },
  ],
}

const defaultProcess = {
  de: [
    { step: '01', title: 'Analyse', description: 'SEO-Audit und Saisonanalyse Ihrer Innsbrucker Website' },
    { step: '02', title: 'Strategie', description: 'Keywords, Sprachen und saisonale Planung' },
    { step: '03', title: 'OnPage', description: 'Technische und inhaltliche Optimierung' },
    { step: '04', title: 'Content', description: 'Mehrsprachige SEO-Texte fuer Ihre Zielmaerkte' },
    { step: '05', title: 'Monitoring', description: 'Saisonale Rankings ueberwachen und anpassen' },
  ],
  en: [
    { step: '01', title: 'Analysis', description: 'SEO audit and seasonal analysis of your Innsbruck website' },
    { step: '02', title: 'Strategy', description: 'Keywords, languages and seasonal planning' },
    { step: '03', title: 'OnPage', description: 'Technical and content optimization' },
    { step: '04', title: 'Content', description: 'Multilingual SEO copy for your target markets' },
    { step: '05', title: 'Monitoring', description: 'Monitor and adjust seasonal rankings' },
  ],
  ru: [
    { step: '01', title: 'Analiz', description: 'SEO-audit i sezonnyj analiz vashego sajta v Insbruke' },
    { step: '02', title: 'Strategiya', description: 'Klyuchevye slova, yazyki i sezonnoe planirovanie' },
    { step: '03', title: 'OnPage', description: 'Tehnicheskaya i kontetnaya optimizaciya' },
    { step: '04', title: 'Kontent', description: 'Mnogoyazychnye SEO-teksty dlya vashih celevyh rynkov' },
    { step: '05', title: 'Monitoring', description: 'Otslezhivanie i korrektirovka sezonnyh rejtingov' },
  ],
}

const defaultRelatedServices = {
  de: [
    { title: 'Webdesign Innsbruck', description: 'SEO-optimierte Websites fuer Tiroler Skigebiete und Hotels.', href: '/webdesign-innsbruck' },
    { title: 'Content Marketing', description: 'Hochwertige Inhalte, die ranken und Gaeste begeistern.', href: '/leistungen/seo-content' },
    { title: 'Google Ads', description: 'Bezahlte Werbung fuer schnelle Sichtbarkeit zur Hochsaison.', href: '/leistungen/digital-marketing' },
  ],
  en: [
    { title: 'Web Design Innsbruck', description: 'SEO-optimized websites for Tyrolean ski resorts and hotels.', href: '/webdesign-innsbruck' },
    { title: 'Content Marketing', description: 'High-quality content that ranks and delights guests.', href: '/leistungen/seo-content' },
    { title: 'Google Ads', description: 'Paid advertising for quick visibility during peak season.', href: '/leistungen/digital-marketing' },
  ],
  ru: [
    { title: 'Veb-dizajn Innsbruck', description: 'SEO-optimizirovannye sajty dlya tirolskih gornolyzhnyh kurortov i otelej.', href: '/webdesign-innsbruck' },
    { title: 'Kontent-marketing', description: 'Vysokokachestvennyj kontent, kotoryj ranzhiruetsya i voshischaet gostej.', href: '/leistungen/seo-content' },
    { title: 'Google Ads', description: 'Platnaya reklama dlya bystroj vidimosti v pik sezona.', href: '/leistungen/digital-marketing' },
  ],
} as const satisfies Record<'de' | 'en' | 'ru', Array<{ title: string; description: string; href: StaticAppPathname }>>

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const content = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']

  const hreflangAlternates = getHreflangAlternates('/seo-agentur-innsbruck', locale)

  return {
    title: content.metaTitle,
    description: truncateMetaDescription(content.metaDescription),
    keywords: content.keywords,
    openGraph: {
      title: content.heroTitle,
      description: truncateMetaDescription(content.metaDescription),
      url: getCanonicalUrl('/seo-agentur-innsbruck', locale),
    },
    alternates: {
      canonical: getCanonicalUrl('/seo-agentur-innsbruck', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function SeoAgenturInnsbruckPage({ params }: { params: Promise<{ locale: string }> }) {
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

  const servicesTitle = { de: 'Unsere SEO-Leistungen fuer Innsbruck', en: 'Our SEO Services for Innsbruck', ru: 'Nashi SEO-uslugi dlya Insbruka' }[locale] ?? 'Unsere SEO-Leistungen fuer Innsbruck'
  const servicesDescription = { de: 'Umfassende Suchmaschinenoptimierung fuer Tiroler Tourismus und Unternehmen.', en: 'Comprehensive search engine optimization for Tyrolean tourism and businesses.', ru: 'Kompleksnaya poiskovaya optimizaciya dlya tirolskogo turizma i biznesa.' }[locale] ?? 'Umfassende Suchmaschinenoptimierung fuer Tiroler Tourismus und Unternehmen.'
  const pricingTitle = { de: 'SEO Innsbruck Pakete', en: 'SEO Innsbruck Packages', ru: 'SEO-pakety Innsbruck' }[locale] ?? 'SEO Innsbruck Pakete'
  const pricingDescription = { de: 'Transparente Preise fuer Tiroler Skigebiete und Unternehmen.', en: 'Transparent pricing for Tyrolean ski resorts and businesses.', ru: 'Prozrachnye ceny dlya tirolskih gornolyzhnyh kurortov i kompanij.' }[locale] ?? 'Transparente Preise fuer Tiroler Skigebiete und Unternehmen.'
  const processTitle = { de: 'Unser SEO-Prozess', en: 'Our SEO Process', ru: 'Nash SEO-process' }[locale] ?? 'Unser SEO-Prozess'
  const processDescription = { de: 'Strukturierte Vorgehensweise mit saisonalem Fokus fuer den Alpentourismus.', en: 'Structured approach with seasonal focus for alpine tourism.', ru: 'Strukturirovannyj podhod s sezonnym fokusom dlya alpijskogo turizma.' }[locale] ?? 'Strukturierte Vorgehensweise mit saisonalem Fokus fuer den Alpentourismus.'
  const faqTitle = { de: 'Haeufige Fragen zu SEO in Innsbruck', en: 'Frequently Asked Questions about SEO in Innsbruck', ru: 'Chasto zadavaemye voprosy o SEO v Insbruke' }[locale] ?? 'Haeufige Fragen zu SEO in Innsbruck'
  const relatedServicesTitle = { de: 'Verwandte Leistungen', en: 'Related Services', ru: 'Svyazannye uslugi' }[locale] ?? 'Verwandte Leistungen'
  const ctaTitle = { de: 'Bereit fuer mehr Gaeste?', en: 'Ready for More Guests?', ru: 'Gotovy k bolshemu kolichestvu gostej?' }[locale] ?? 'Bereit fuer mehr Gaeste?'
  const ctaDescription = { de: 'Kostenlose SEO-Analyse Ihrer Website. Wir zeigen Ihnen, wie Sie vor der Wintersaison die Suchergebnisse dominieren.', en: 'Free SEO analysis of your website. We show you how to dominate the search results before winter season.', ru: 'Besplatnyj SEO-analiz vashego sajta. My pokazhem vam, kak dominirovat v rezultatah poiska pered zimnim sezonom.' }[locale] ?? 'Kostenlose SEO-Analyse Ihrer Website. Wir zeigen Ihnen, wie Sie vor der Wintersaison die Suchergebnisse dominieren.'
  const ctaButton = { de: 'Kostenlose Analyse anfordern', en: 'Request Free Analysis', ru: 'Zakazat besplatnyj analiz' }[locale] ?? 'Kostenlose Analyse anfordern'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'SEO Innsbruck',
    alternateName: { de: 'Suchmaschinenoptimierung Innsbruck', en: 'Search Engine Optimization Innsbruck', ru: 'Poiskovaya optimizaciya Innsbruck' }[locale] ?? 'Suchmaschinenoptimierung Innsbruck',
    url: 'https://goldenwing.at/seo-agentur-innsbruck',
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
    description: { de: 'Professionelle Suchmaschinenoptimierung in Innsbruck. Local SEO, mehrsprachige Optimierung und saisonales SEO fuer bessere Google-Rankings in Tirol.', en: 'Professional search engine optimization in Innsbruck. Local SEO, multilingual optimization and seasonal SEO for better Google rankings in Tyrol.', ru: 'Professionalnaya poiskovaya optimizaciya v Insbruke. Lokalnoe SEO, mnogoyazychnaya optimizaciya i sezonnoe SEO dlya luchshih pozicij v Google v Tirole.' }[locale] ?? 'Professionelle Suchmaschinenoptimierung in Innsbruck. Local SEO, mehrsprachige Optimierung und saisonales SEO fuer bessere Google-Rankings in Tirol.',
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
                <NextLink href="#preise">{content.ctaSecondary}</NextLink>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Results */}
      <section className="py-16 border-y bg-muted/30">
        <Container variant="block">
          <div className="grid md:grid-cols-3 gap-8">
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
      <section className="py-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{servicesTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{servicesDescription}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon] || Search
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
      <section id="preise" className="py-20 bg-muted/30 scroll-mt-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{pricingTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{pricingDescription}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <Card key={pkg.name} className={pkg.popular ? 'border-primary shadow-lg relative' : ''}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>{{ de: 'Empfohlen', en: 'Recommended', ru: 'Rekomenduetsya' }[locale] ?? 'Empfohlen'}</Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">{pkg.name}</CardTitle>
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
                    <NextLink href={getContactUrl(locale)}>{{ de: 'Anfragen', en: 'Inquire', ru: 'Ostavit zayavku' }[locale] ?? 'Anfragen'}</NextLink>
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
          className="bg-muted/30"
        />
      )}

      {/* Related */}
      <section className="py-20">
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
