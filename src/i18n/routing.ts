import { defineRouting } from 'next-intl/routing'
import { locales, defaultLocale } from './config'

/**
 * Internationalized URL Routing Configuration - NEW STRUCTURE 2025
 *
 * This defines locale-specific pathnames for SEO-optimized URLs.
 * German (de) uses German slugs, English (en) uses English slugs.
 * Russian (ru) uses transliterated slugs for SEO-friendliness.
 *
 * 6 Main Services:
 * - branding
 * - webdesign / web-design
 * - digital-marketing (same DE + EN)
 * - seo-content (same DE + EN)
 * - web-app-entwicklung / web-app-development
 * - it-cloud-services (same DE + EN)
 */
export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',

  // Locale-specific pathnames for SEO
  pathnames: {
    // ============================================
    // MAIN NAVIGATION
    // ============================================
    '/': '/',

    // Services / Leistungen - Overview
    '/leistungen': {
      de: '/leistungen',
      en: '/services',
      ru: '/uslugi',
    },
    // Dynamic service pages
    '/leistungen/[slug]': {
      de: '/leistungen/[slug]',
      en: '/services/[slug]',
      ru: '/uslugi/[slug]',
    },

    // ============================================
    // 6 MAIN SERVICES (NEW 2025)
    // ============================================
    '/leistungen/branding': {
      de: '/leistungen/branding',
      en: '/services/branding',
      ru: '/uslugi/brending',
    },
    '/leistungen/webdesign': {
      de: '/leistungen/webdesign',
      en: '/services/web-design',
      ru: '/uslugi/veb-dizayn',
    },
    '/leistungen/digital-marketing': {
      de: '/leistungen/digital-marketing',
      en: '/services/digital-marketing',
      ru: '/uslugi/tsifrovoy-marketing',
    },
    '/leistungen/seo-content': {
      de: '/leistungen/seo-content',
      en: '/services/seo-content',
      ru: '/uslugi/seo-kontent',
    },
    '/leistungen/web-app-entwicklung': {
      de: '/leistungen/web-app-entwicklung',
      en: '/services/web-app-development',
      ru: '/uslugi/razrabotka-veb-prilozheniy',
    },
    '/leistungen/it-cloud-services': {
      de: '/leistungen/it-cloud-services',
      en: '/services/it-cloud-services',
      ru: '/uslugi/it-oblachnye-servisy',
    },

    // ============================================
    // SUB-SERVICE PAGES (Dynamic)
    // ============================================
    '/leistungen/[slug]/[subslug]': {
      de: '/leistungen/[slug]/[subslug]',
      en: '/services/[slug]/[subslug]',
      ru: '/uslugi/[slug]/[subslug]',
    },

    // ============================================
    // STATIC SUB-SERVICE PAGES (NEW 2026)
    // ============================================
    // SEO & Content Sub-Services
    '/leistungen/seo-content/technical-seo': {
      de: '/leistungen/seo-content/technical-seo',
      en: '/services/seo-content/technical-seo',
      ru: '/uslugi/seo-kontent/technical-seo',
    },
    '/leistungen/seo-content/local-seo': {
      de: '/leistungen/seo-content/local-seo',
      en: '/services/seo-content/local-seo',
      ru: '/uslugi/seo-kontent/local-seo',
    },
    '/leistungen/seo-content/on-page-optimierung': {
      de: '/leistungen/seo-content/on-page-optimierung',
      en: '/services/seo-content/on-page-optimization',
      ru: '/uslugi/seo-kontent/on-page-optimizatsiya',
    },
    '/leistungen/seo-content/offpage-linkbuilding': {
      de: '/leistungen/seo-content/offpage-linkbuilding',
      en: '/services/seo-content/offpage-link-building',
      ru: '/uslugi/seo-kontent/offpage-linkbilding',
    },
    '/leistungen/seo-content/content-strategie-produktion': {
      de: '/leistungen/seo-content/content-strategie-produktion',
      en: '/services/seo-content/content-strategy-production',
      ru: '/uslugi/seo-kontent/kontent-strategiya-proizvodstvo',
    },
    // Webdesign Sub-Services
    '/leistungen/webdesign/cms-entwicklung': {
      de: '/leistungen/webdesign/cms-entwicklung',
      en: '/services/web-design/cms-development',
      ru: '/uslugi/veb-dizayn/cms-razrabotka',
    },
    '/leistungen/webdesign/ui-design-design-systems': {
      de: '/leistungen/webdesign/ui-design-design-systems',
      en: '/services/web-design/ui-design-design-systems',
      ru: '/uslugi/veb-dizayn/ui-dizayn-dizayn-sistemy',
    },

    // ============================================
    // SERVICE PACKAGES / PAKETE
    // ============================================
    '/leistungen/pakete': {
      de: '/leistungen/pakete',
      en: '/services/packages',
      ru: '/uslugi/pakety',
    },
    '/leistungen/pakete/[slug]': {
      de: '/leistungen/pakete/[slug]',
      en: '/services/packages/[slug]',
      ru: '/uslugi/pakety/[slug]',
    },
    '/leistungen/pakete/brand-web-foundation': {
      de: '/leistungen/pakete/brand-web-foundation',
      en: '/services/packages/brand-web-foundation',
      ru: '/uslugi/pakety/brand-web-foundation',
    },
    '/leistungen/pakete/seo-content-growth': {
      de: '/leistungen/pakete/seo-content-growth',
      en: '/services/packages/seo-content-growth',
      ru: '/uslugi/pakety/seo-content-growth',
    },
    '/leistungen/pakete/demand-gen-suite': {
      de: '/leistungen/pakete/demand-gen-suite',
      en: '/services/packages/demand-gen-suite',
      ru: '/uslugi/pakety/demand-gen-suite',
    },
    '/leistungen/pakete/individuelles-paket': {
      de: '/leistungen/pakete/individuelles-paket',
      en: '/services/packages/custom-package',
      ru: '/uslugi/pakety/individualnyy-paket',
    },

    // ============================================
    // ABOUT / ÜBER UNS
    // ============================================
    '/ueber-uns': {
      de: '/ueber-uns',
      en: '/about-us',
      ru: '/o-nas',
    },
    '/ueber-uns/team': {
      de: '/ueber-uns/team',
      en: '/about-us/team',
      ru: '/o-nas/komanda',
    },
    '/ueber-uns/team/[slug]': {
      de: '/ueber-uns/team/[slug]',
      en: '/about-us/team/[slug]',
      ru: '/o-nas/komanda/[slug]',
    },
    '/ueber-uns/kultur': {
      de: '/ueber-uns/kultur',
      en: '/about-us/culture',
      ru: '/o-nas/kultura',
    },
    '/ueber-uns/werte': {
      de: '/ueber-uns/werte',
      en: '/about-us/values',
      ru: '/o-nas/tsennosti',
    },
    '/ueber-uns/partner': {
      de: '/ueber-uns/partner',
      en: '/about-us/partners',
      ru: '/o-nas/partnery',
    },
    '/ueber-uns/facts-figures': {
      de: '/ueber-uns/facts-figures',
      en: '/about-us/facts-figures',
      ru: '/o-nas/fakty-i-tsifry',
    },

    // ============================================
    // LOCATIONS / STANDORTE
    // ============================================
    '/standorte': {
      de: '/standorte',
      en: '/locations',
      ru: '/ofisy',
    },
    '/standorte/[slug]': {
      de: '/standorte/[slug]',
      en: '/locations/[slug]',
      ru: '/ofisy/[slug]',
    },
    '/standorte/wien': {
      de: '/standorte/wien',
      en: '/locations/vienna',
      ru: '/ofisy/vena',
    },
    '/standorte/dubai': {
      de: '/standorte/dubai',
      en: '/locations/dubai',
      ru: '/ofisy/dubay',
    },
    '/standorte/roseville': {
      de: '/standorte/roseville',
      en: '/locations/roseville',
      ru: '/ofisy/rozvill',
    },

    // ============================================
    // STADT-SERVICE-SEITEN (NEW 2026 - Hub & Spoke)
    // ============================================

    // Wien Services (TIER 1 - echte Assets)
    '/standorte/wien/webdesign': {
      de: '/standorte/wien/webdesign',
      en: '/locations/vienna/web-design',
      ru: '/ofisy/vena/veb-dizayn',
    },
    '/standorte/wien/seo': {
      de: '/standorte/wien/seo',
      en: '/locations/vienna/seo',
      ru: '/ofisy/vena/seo',
    },
    '/standorte/wien/branding': {
      de: '/standorte/wien/branding',
      en: '/locations/vienna/branding',
      ru: '/ofisy/vena/brending',
    },
    '/standorte/wien/google-ads': {
      de: '/standorte/wien/google-ads',
      en: '/locations/vienna/google-ads',
      ru: '/ofisy/vena/google-ads',
    },
    '/standorte/wien/social-media': {
      de: '/standorte/wien/social-media',
      en: '/locations/vienna/social-media',
      ru: '/ofisy/vena/sotsialnye-seti',
    },
    '/standorte/wien/kreativagentur': {
      de: '/standorte/wien/kreativagentur',
      en: '/locations/vienna/creative-agency',
      ru: '/ofisy/vena/kreativnoe-agentstvo',
    },

    // Graz Services (TIER 2 - Service-Area)
    '/standorte/graz': {
      de: '/standorte/graz',
      en: '/locations/graz',
      ru: '/ofisy/grats',
    },
    '/standorte/graz/webdesign': {
      de: '/standorte/graz/webdesign',
      en: '/locations/graz/web-design',
      ru: '/ofisy/grats/veb-dizayn',
    },
    '/standorte/graz/seo': {
      de: '/standorte/graz/seo',
      en: '/locations/graz/seo',
      ru: '/ofisy/grats/seo',
    },
    '/standorte/graz/online-marketing': {
      de: '/standorte/graz/online-marketing',
      en: '/locations/graz/online-marketing',
      ru: '/ofisy/grats/onlayn-marketing',
    },

    // Linz Services (TIER 2 - Service-Area)
    '/standorte/linz': {
      de: '/standorte/linz',
      en: '/locations/linz',
      ru: '/ofisy/lints',
    },
    '/standorte/linz/webdesign': {
      de: '/standorte/linz/webdesign',
      en: '/locations/linz/web-design',
      ru: '/ofisy/lints/veb-dizayn',
    },
    '/standorte/linz/seo': {
      de: '/standorte/linz/seo',
      en: '/locations/linz/seo',
      ru: '/ofisy/lints/seo',
    },
    '/standorte/linz/online-marketing': {
      de: '/standorte/linz/online-marketing',
      en: '/locations/linz/online-marketing',
      ru: '/ofisy/lints/onlayn-marketing',
    },
    '/standorte/linz/werbeagentur': {
      de: '/standorte/linz/werbeagentur',
      en: '/locations/linz/advertising-agency',
      ru: '/ofisy/lints/reklamnoe-agentstvo',
    },

    // Salzburg Services (TIER 2 - Service-Area)
    '/standorte/salzburg': {
      de: '/standorte/salzburg',
      en: '/locations/salzburg',
      ru: '/ofisy/zaltsburg',
    },
    '/standorte/salzburg/webdesign': {
      de: '/standorte/salzburg/webdesign',
      en: '/locations/salzburg/web-design',
      ru: '/ofisy/zaltsburg/veb-dizayn',
    },
    '/standorte/salzburg/seo': {
      de: '/standorte/salzburg/seo',
      en: '/locations/salzburg/seo',
      ru: '/ofisy/zaltsburg/seo',
    },
    '/standorte/salzburg/werbeagentur': {
      de: '/standorte/salzburg/werbeagentur',
      en: '/locations/salzburg/advertising-agency',
      ru: '/ofisy/zaltsburg/reklamnoe-agentstvo',
    },

    // Innsbruck Services (TIER 2 - Service-Area)
    '/standorte/innsbruck': {
      de: '/standorte/innsbruck',
      en: '/locations/innsbruck',
      ru: '/ofisy/insbruk',
    },
    '/standorte/innsbruck/webdesign': {
      de: '/standorte/innsbruck/webdesign',
      en: '/locations/innsbruck/web-design',
      ru: '/ofisy/insbruk/veb-dizayn',
    },
    '/standorte/innsbruck/seo': {
      de: '/standorte/innsbruck/seo',
      en: '/locations/innsbruck/seo',
      ru: '/ofisy/insbruk/seo',
    },
    '/standorte/innsbruck/werbeagentur': {
      de: '/standorte/innsbruck/werbeagentur',
      en: '/locations/innsbruck/advertising-agency',
      ru: '/ofisy/insbruk/reklamnoe-agentstvo',
    },

    // München Services (TIER 2 - DACH)
    '/standorte/muenchen': {
      de: '/standorte/muenchen',
      en: '/locations/munich',
      ru: '/ofisy/myunkhen',
    },
    '/standorte/muenchen/webdesign': {
      de: '/standorte/muenchen/webdesign',
      en: '/locations/munich/web-design',
      ru: '/ofisy/myunkhen/veb-dizayn',
    },
    '/standorte/muenchen/seo': {
      de: '/standorte/muenchen/seo',
      en: '/locations/munich/seo',
      ru: '/ofisy/myunkhen/seo',
    },
    '/standorte/muenchen/online-marketing': {
      de: '/standorte/muenchen/online-marketing',
      en: '/locations/munich/online-marketing',
      ru: '/ofisy/myunkhen/onlayn-marketing',
    },

    // Berlin Services (TIER 2 - DACH)
    '/standorte/berlin': {
      de: '/standorte/berlin',
      en: '/locations/berlin',
      ru: '/ofisy/berlin',
    },
    '/standorte/berlin/webdesign': {
      de: '/standorte/berlin/webdesign',
      en: '/locations/berlin/web-design',
      ru: '/ofisy/berlin/veb-dizayn',
    },
    '/standorte/berlin/seo': {
      de: '/standorte/berlin/seo',
      en: '/locations/berlin/seo',
      ru: '/ofisy/berlin/seo',
    },
    '/standorte/berlin/branding': {
      de: '/standorte/berlin/branding',
      en: '/locations/berlin/branding',
      ru: '/ofisy/berlin/brending',
    },

    // Zürich Services (TIER 2 - CH)
    '/standorte/zuerich': {
      de: '/standorte/zuerich',
      en: '/locations/zurich',
      ru: '/ofisy/tsyurikh',
    },
    '/standorte/zuerich/webdesign': {
      de: '/standorte/zuerich/webdesign',
      en: '/locations/zurich/web-design',
      ru: '/ofisy/tsyurikh/veb-dizayn',
    },
    '/standorte/zuerich/seo': {
      de: '/standorte/zuerich/seo',
      en: '/locations/zurich/seo',
      ru: '/ofisy/tsyurikh/seo',
    },
    '/standorte/zuerich/branding': {
      de: '/standorte/zuerich/branding',
      en: '/locations/zurich/branding',
      ru: '/ofisy/tsyurikh/brending',
    },

    // Dubai Services (TIER 1 - echte Assets)
    '/standorte/dubai/webdesign': {
      de: '/standorte/dubai/webdesign',
      en: '/locations/dubai/web-design',
      ru: '/ofisy/dubay/veb-dizayn',
    },
    '/standorte/dubai/seo': {
      de: '/standorte/dubai/seo',
      en: '/locations/dubai/seo',
      ru: '/ofisy/dubay/seo',
    },
    '/standorte/dubai/branding': {
      de: '/standorte/dubai/branding',
      en: '/locations/dubai/branding',
      ru: '/ofisy/dubay/brending',
    },
    '/standorte/dubai/digital-marketing': {
      de: '/standorte/dubai/digital-marketing',
      en: '/locations/dubai/digital-marketing',
      ru: '/ofisy/dubay/tsifrovoy-marketing',
    },
    '/standorte/dubai/ecommerce': {
      de: '/standorte/dubai/ecommerce',
      en: '/locations/dubai/ecommerce',
      ru: '/ofisy/dubay/elektronnaya-kommertsiya',
    },

    // ============================================
    // VERGLEICHE HUB (NEW 2026)
    // ============================================
    '/vergleiche': {
      de: '/vergleiche',
      en: '/comparisons',
      ru: '/sravneniya',
    },
    '/vergleiche/seo-agenturen-wien': {
      de: '/vergleiche/seo-agenturen-wien',
      en: '/comparisons/seo-agencies-vienna',
      ru: '/sravneniya/seo-agentstva-vena',
    },
    '/vergleiche/webdesign-agenturen-wien': {
      de: '/vergleiche/webdesign-agenturen-wien',
      en: '/comparisons/web-design-agencies-vienna',
      ru: '/sravneniya/veb-dizayn-agentstva-vena',
    },

    // ============================================
    // BRANCHEN HUB (NEW 2026)
    // ============================================
    '/branchen': {
      de: '/branchen',
      en: '/industries',
      ru: '/otrasli',
    },
    '/branchen/aerzte': {
      de: '/branchen/aerzte',
      en: '/industries/healthcare',
      ru: '/otrasli/vrachi',
    },
    '/branchen/rechtsanwaelte': {
      de: '/branchen/rechtsanwaelte',
      en: '/industries/legal',
      ru: '/otrasli/yuristy',
    },
    '/branchen/ecommerce': {
      de: '/branchen/ecommerce',
      en: '/industries/ecommerce',
      ru: '/otrasli/ecommerce',
    },
    '/branchen/b2b': {
      de: '/branchen/b2b',
      en: '/industries/b2b',
      ru: '/otrasli/b2b',
    },
    '/branchen/startups': {
      de: '/branchen/startups',
      en: '/industries/startups',
      ru: '/otrasli/startapy',
    },
    '/branchen/gastronomie': {
      de: '/branchen/gastronomie',
      en: '/industries/hospitality',
      ru: '/otrasli/gastronomiya',
    },
    '/branchen/immobilien': {
      de: '/branchen/immobilien',
      en: '/industries/real-estate',
      ru: '/otrasli/nedvizhimost',
    },
    '/branchen/dienstleister': {
      de: '/branchen/dienstleister',
      en: '/industries/services',
      ru: '/otrasli/uslugi',
    },
    '/branchen/aerzte/seo': {
      de: '/branchen/aerzte/seo',
      en: '/industries/healthcare/seo',
      ru: '/otrasli/vrachi/seo',
    },

    // ============================================
    // WISSEN HUB (NEW 2026)
    // ============================================
    '/wissen': {
      de: '/wissen',
      en: '/knowledge',
      ru: '/znaniya',
    },
    '/wissen/blog': {
      de: '/wissen/blog',
      en: '/knowledge/blog',
      ru: '/znaniya/blog',
    },
    '/wissen/lexikon': {
      de: '/wissen/lexikon',
      en: '/knowledge/glossary',
      ru: '/znaniya/slovar',
    },
    '/wissen/guides': {
      de: '/wissen/guides',
      en: '/knowledge/guides',
      ru: '/znaniya/rukovodstva',
    },
    '/wissen/tools': {
      de: '/wissen/tools',
      en: '/knowledge/tools',
      ru: '/znaniya/instrumenty',
    },

    // ============================================
    // REFERENCES / REFERENZEN
    // ============================================
    '/referenzen': {
      de: '/referenzen',
      en: '/references',
      ru: '/referensy',
    },
    '/referenzen/[slug]': {
      de: '/referenzen/[slug]',
      en: '/references/[slug]',
      ru: '/referensy/[slug]',
    },
    '/referenzen/branding': {
      de: '/referenzen/branding',
      en: '/references/branding',
      ru: '/referensy/brending',
    },
    '/referenzen/webdesign': {
      de: '/referenzen/webdesign',
      en: '/references/web-design',
      ru: '/referensy/veb-dizayn',
    },
    '/referenzen/seo': {
      de: '/referenzen/seo',
      en: '/references/seo',
      ru: '/referensy/seo',
    },
    '/referenzen/marketing': {
      de: '/referenzen/marketing',
      en: '/references/marketing',
      ru: '/referensy/marketing',
    },
    '/referenzen/entwicklung': {
      de: '/referenzen/entwicklung',
      en: '/references/development',
      ru: '/referensy/razrabotka',
    },
    '/referenzen/e-commerce': {
      de: '/referenzen/e-commerce',
      en: '/references/e-commerce',
      ru: '/referensy/e-commerce',
    },
    '/referenzen/industrie': {
      de: '/referenzen/industrie',
      en: '/references/industry',
      ru: '/referensy/industriya',
    },
    '/referenzen/technologie': {
      de: '/referenzen/technologie',
      en: '/references/technology',
      ru: '/referensy/tekhnologii',
    },
    '/referenzen/dienstleistung': {
      de: '/referenzen/dienstleistung',
      en: '/references/consulting',
      ru: '/referensy/konsalting',
    },
    '/referenzen/it-cloud': {
      de: '/referenzen/it-cloud',
      en: '/references/it-cloud',
      ru: '/referensy/it-oblako',
    },

    // ============================================
    // PROJECTS / PROJEKTE
    // ============================================
    '/projekte': {
      de: '/projekte',
      en: '/projects',
      ru: '/proekty',
    },
    '/projekte/[slug]': {
      de: '/projekte/[slug]',
      en: '/projects/[slug]',
      ru: '/proekty/[slug]',
    },

    // ============================================
    // BLOG
    // ============================================
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/blog/kategorie/[slug]': {
      de: '/blog/kategorie/[slug]',
      en: '/blog/category/[slug]',
      ru: '/blog/kategoriya/[slug]',
    },

    // ============================================
    // RESOURCES / RESSOURCEN
    // ============================================
    '/ressourcen': {
      de: '/ressourcen',
      en: '/resources',
      ru: '/resursy',
    },
    '/ressourcen/downloads': {
      de: '/ressourcen/downloads',
      en: '/resources/downloads',
      ru: '/resursy/zagruzki',
    },
    '/ressourcen/newsletter': {
      de: '/ressourcen/newsletter',
      en: '/resources/newsletter',
      ru: '/resursy/rassylka',
    },

    // ============================================
    // LEXIKON / GLOSSAR
    // ============================================
    '/lexikon': {
      de: '/lexikon',
      en: '/glossary',
      ru: '/slovar',
    },
    '/lexikon/[slug]': {
      de: '/lexikon/[slug]',
      en: '/glossary/[slug]',
      ru: '/slovar/[slug]',
    },

    // ============================================
    // ADDITIONAL SERVICE PAGES
    // ============================================
    '/leistungen/seo-texter': {
      de: '/leistungen/seo-texter',
      en: '/services/seo-copywriter',
      ru: '/uslugi/seo-kopirayting',
    },
    '/leistungen/seo-berater': {
      de: '/leistungen/seo-berater',
      en: '/services/seo-consultant',
      ru: '/uslugi/seo-konsultant',
    },
    '/leistungen/grafikdesign': {
      de: '/leistungen/grafikdesign',
      en: '/services/graphic-design',
      ru: '/uslugi/graficheskiy-dizayn',
    },
    '/leistungen/onlineshop-agentur': {
      de: '/leistungen/onlineshop-agentur',
      en: '/services/ecommerce-agency',
      ru: '/uslugi/agentstvo-internet-magazinov',
    },
    '/leistungen/google-ads-agentur': {
      de: '/leistungen/google-ads-agentur',
      en: '/services/google-ads-agency',
      ru: '/uslugi/agentstvo-google-ads',
    },
    '/leistungen/social-media-agentur': {
      de: '/leistungen/social-media-agentur',
      en: '/services/social-media-agency',
      ru: '/uslugi/agentstvo-sotsialnykh-setey',
    },
    '/leistungen/wordpress-agentur': {
      de: '/leistungen/wordpress-agentur',
      en: '/services/wordpress-agency',
      ru: '/uslugi/agentstvo-wordpress',
    },
    '/leistungen/seo-betreuung': {
      de: '/leistungen/seo-betreuung',
      en: '/services/seo-support',
      ru: '/uslugi/seo-podderzhka',
    },
    '/leistungen/sea-agentur': {
      de: '/leistungen/sea-agentur',
      en: '/services/sea-agency',
      ru: '/uslugi/agentstvo-sea',
    },
    '/leistungen/ecommerce-agentur': {
      de: '/leistungen/ecommerce-agentur',
      en: '/services/ecommerce-agency',
      ru: '/uslugi/agentstvo-ecommerce',
    },

    // ============================================
    // LISTICLE / COMPARISON PAGES (AEO)
    // ============================================
    '/beste-webdesign-agenturen-wien': {
      de: '/beste-webdesign-agenturen-wien',
      en: '/best-web-design-agencies-vienna',
      ru: '/luchshie-veb-dizayn-agentstva-vena',
    },
    '/beste-seo-agenturen-oesterreich': {
      de: '/beste-seo-agenturen-oesterreich',
      en: '/best-seo-agencies-austria',
      ru: '/luchshie-seo-agentstva-avstriya',
    },
    '/beste-branding-agenturen-wien': {
      de: '/beste-branding-agenturen-wien',
      en: '/best-branding-agencies-vienna',
      ru: '/luchshie-brending-agentstva-vena',
    },
    '/beste-digital-marketing-agenturen-wien': {
      de: '/beste-digital-marketing-agenturen-wien',
      en: '/best-digital-marketing-agencies-vienna',
      ru: '/luchshie-digital-marketing-agentstva-vena',
    },
    '/beste-ecommerce-agenturen-wien': {
      de: '/beste-ecommerce-agenturen-wien',
      en: '/best-ecommerce-agencies-vienna',
      ru: '/luchshie-ecommerce-agentstva-vena',
    },
    '/beste-website-relaunch-agenturen': {
      de: '/beste-website-relaunch-agenturen',
      en: '/best-website-relaunch-agencies',
      ru: '/luchshie-agentstva-relancha-saytov',
    },
    '/beste-seo-agenturen-fuer-aerzte': {
      de: '/beste-seo-agenturen-fuer-aerzte',
      en: '/best-seo-agencies-for-doctors',
      ru: '/luchshie-seo-agentstva-dlya-vrachey',
    },
    '/beste-social-media-agenturen-wien': {
      de: '/beste-social-media-agenturen-wien',
      en: '/best-social-media-agencies-vienna',
      ru: '/luchshie-smm-agentstva-vena',
    },
    '/beste-online-marketing-agenturen-wien': {
      de: '/beste-online-marketing-agenturen-wien',
      en: '/best-online-marketing-agencies-vienna',
      ru: '/luchshie-onlayn-marketing-agentstva-vena',
    },
    '/beste-kreativagenturen-wien': {
      de: '/beste-kreativagenturen-wien',
      en: '/best-creative-agencies-vienna',
      ru: '/luchshie-kreativnye-agentstva-vena',
    },
    '/beste-google-ads-agenturen-wien': {
      de: '/beste-google-ads-agenturen-wien',
      en: '/best-google-ads-agencies-vienna',
      ru: '/luchshie-google-ads-agentstva-vena',
    },
    '/beste-wordpress-agenturen-wien': {
      de: '/beste-wordpress-agenturen-wien',
      en: '/best-wordpress-agencies-vienna',
      ru: '/luchshie-wordpress-agentstva-vena',
    },
    '/beste-content-marketing-agenturen-wien': {
      de: '/beste-content-marketing-agenturen-wien',
      en: '/best-content-marketing-agencies-vienna',
      ru: '/luchshie-kontent-marketing-agentstva-vena',
    },
    '/beste-app-entwicklung-agenturen-wien': {
      de: '/beste-app-entwicklung-agenturen-wien',
      en: '/best-app-development-agencies-vienna',
      ru: '/luchshie-agentstva-razrabotki-prilozheniy-vena',
    },
    '/beste-seo-agenturen-wien': {
      de: '/beste-seo-agenturen-wien',
      en: '/best-seo-agencies-vienna',
      ru: '/luchshie-seo-agentstva-vena',
    },
    '/beste-grafikdesign-agenturen-wien': {
      de: '/beste-grafikdesign-agenturen-wien',
      en: '/best-graphic-design-agencies-vienna',
      ru: '/luchshie-graficheskiy-dizayn-agentstva-vena',
    },
    '/beste-onlineshop-agenturen-wien': {
      de: '/beste-onlineshop-agenturen-wien',
      en: '/best-online-shop-agencies-vienna',
      ru: '/luchshie-agentstva-internet-magazinov-vena',
    },
    '/webshop-erstellen-lassen': {
      de: '/webshop-erstellen-lassen',
      en: '/have-webshop-created',
      ru: '/sozdanie-internet-magazina',
    },

    // ============================================
    // KEYWORD GAP LANDING PAGES (NEW 2026)
    // ============================================
    '/webdesign-preise': {
      de: '/webdesign-preise',
      en: '/web-design-pricing',
      ru: '/tseny-na-veb-dizayn',
    },
    '/website-erstellen-lassen': {
      de: '/website-erstellen-lassen',
      en: '/have-website-created',
      ru: '/zakazat-sozdanie-sayta',
    },
    '/e-mail-marketing-agentur-wien': {
      de: '/e-mail-marketing-agentur-wien',
      en: '/email-marketing-agency-vienna',
      ru: '/agentstvo-email-marketinga-vena',
    },
    '/barrierefreie-website': {
      de: '/barrierefreie-website',
      en: '/accessible-website',
      ru: '/dostupnyy-veb-sayt',
    },

    // ============================================
    // LANDING PAGES - Austria
    // ============================================
    '/webdesign-wien': {
      de: '/webdesign-wien',
      en: '/web-design-vienna',
      ru: '/veb-dizayn-vena',
    },
    '/seo-agentur-wien': {
      de: '/seo-agentur-wien',
      en: '/seo-agency-vienna',
      ru: '/seo-agentstvo-vena',
    },
    '/kreativagentur-wien': {
      de: '/kreativagentur-wien',
      en: '/creative-agency-vienna',
      ru: '/kreativnoe-agentstvo-vena',
    },
    '/webdesign-oesterreich': {
      de: '/webdesign-oesterreich',
      en: '/web-design-austria',
      ru: '/veb-dizayn-avstriya',
    },
    '/branding-agentur-wien': {
      de: '/branding-agentur-wien',
      en: '/branding-agency-vienna',
      ru: '/brending-agentstvo-vena',
    },
    // Graz
    '/webdesign-graz': {
      de: '/webdesign-graz',
      en: '/web-design-graz',
      ru: '/veb-dizayn-grats',
    },
    '/seo-agentur-graz': {
      de: '/seo-agentur-graz',
      en: '/seo-agency-graz',
      ru: '/seo-agentstvo-grats',
    },
    // Linz
    '/webdesign-linz': {
      de: '/webdesign-linz',
      en: '/web-design-linz',
      ru: '/veb-dizayn-lints',
    },
    '/seo-agentur-linz': {
      de: '/seo-agentur-linz',
      en: '/seo-agency-linz',
      ru: '/seo-agentstvo-lints',
    },
    '/online-marketing-agentur-linz': {
      de: '/online-marketing-agentur-linz',
      en: '/online-marketing-agency-linz',
      ru: '/agentstvo-onlayn-marketinga-lints',
    },
    '/werbeagentur-linz': {
      de: '/werbeagentur-linz',
      en: '/advertising-agency-linz',
      ru: '/reklamnoe-agentstvo-lints',
    },
    // Graz
    '/online-marketing-graz': {
      de: '/online-marketing-graz',
      en: '/online-marketing-graz',
      ru: '/onlayn-marketing-grats',
    },
    // Salzburg
    '/werbeagentur-salzburg': {
      de: '/werbeagentur-salzburg',
      en: '/advertising-agency-salzburg',
      ru: '/reklamnoe-agentstvo-zaltsburg',
    },
    // Innsbruck
    '/werbeagentur-innsbruck': {
      de: '/werbeagentur-innsbruck',
      en: '/advertising-agency-innsbruck',
      ru: '/reklamnoe-agentstvo-insbruk',
    },
    // Google Ads Austria
    '/google-ads-agentur-oesterreich': {
      de: '/google-ads-agentur-oesterreich',
      en: '/google-ads-agency-austria',
      ru: '/agentstvo-google-ads-avstriya',
    },
    '/google-ads-agentur-wien': {
      de: '/google-ads-agentur-wien',
      en: '/google-ads-agency-vienna',
      ru: '/agentstvo-google-ads-vena',
    },
    // Salzburg (existing)
    '/webdesign-salzburg': {
      de: '/webdesign-salzburg',
      en: '/web-design-salzburg',
      ru: '/veb-dizayn-zaltsburg',
    },
    '/seo-agentur-salzburg': {
      de: '/seo-agentur-salzburg',
      en: '/seo-agency-salzburg',
      ru: '/seo-agentstvo-zaltsburg',
    },
    // Innsbruck
    '/webdesign-innsbruck': {
      de: '/webdesign-innsbruck',
      en: '/web-design-innsbruck',
      ru: '/veb-dizayn-insbruk',
    },
    '/seo-agentur-innsbruck': {
      de: '/seo-agentur-innsbruck',
      en: '/seo-agency-innsbruck',
      ru: '/seo-agentstvo-insbruk',
    },

    // ============================================
    // LANDING PAGES - Germany
    // ============================================
    '/webdesign-deutschland': {
      de: '/webdesign-deutschland',
      en: '/web-design-germany',
      ru: '/veb-dizayn-germaniya',
    },
    '/webdesign-muenchen': {
      de: '/webdesign-muenchen',
      en: '/web-design-munich',
      ru: '/veb-dizayn-myunkhen',
    },
    '/webdesign-berlin': {
      de: '/webdesign-berlin',
      en: '/web-design-berlin',
      ru: '/veb-dizayn-berlin',
    },
    '/webdesign-hamburg': {
      de: '/webdesign-hamburg',
      en: '/web-design-hamburg',
      ru: '/veb-dizayn-gamburg',
    },
    '/webdesign-frankfurt': {
      de: '/webdesign-frankfurt',
      en: '/web-design-frankfurt',
      ru: '/veb-dizayn-frankfurt',
    },
    '/seo-agentur-deutschland': {
      de: '/seo-agentur-deutschland',
      en: '/seo-agency-germany',
      ru: '/seo-agentstvo-germaniya',
    },
    '/branding-agentur-deutschland': {
      de: '/branding-agentur-deutschland',
      en: '/branding-agency-germany',
      ru: '/brending-agentstvo-germaniya',
    },

    // ============================================
    // LANDING PAGES - Switzerland
    // ============================================
    '/webdesign-schweiz': {
      de: '/webdesign-schweiz',
      en: '/web-design-switzerland',
      ru: '/veb-dizayn-shveytsariya',
    },
    '/webdesign-zuerich': {
      de: '/webdesign-zuerich',
      en: '/web-design-zurich',
      ru: '/veb-dizayn-tsyurikh',
    },
    '/seo-agentur-schweiz': {
      de: '/seo-agentur-schweiz',
      en: '/seo-agency-switzerland',
      ru: '/seo-agentstvo-shveytsariya',
    },

    // ============================================
    // LANDING PAGES - UAE / Dubai
    // ============================================
    '/webdesign-dubai': {
      de: '/webdesign-dubai',
      en: '/web-design-dubai',
      ru: '/veb-dizayn-dubay',
    },
    '/seo-agentur-dubai': {
      de: '/seo-agentur-dubai',
      en: '/seo-agency-dubai',
      ru: '/seo-agentstvo-dubay',
    },
    '/branding-agentur-dubai': {
      de: '/branding-agentur-dubai',
      en: '/branding-agency-dubai',
      ru: '/brending-agentstvo-dubay',
    },
    '/webdesign-vae': {
      de: '/webdesign-vae',
      en: '/web-design-uae',
      ru: '/veb-dizayn-oae',
    },
    '/kreativagentur-dubai': {
      de: '/kreativagentur-dubai',
      en: '/creative-agency-dubai',
      ru: '/kreativnoe-agentstvo-dubay',
    },
    '/ecommerce-agentur-dubai': {
      de: '/ecommerce-agentur-dubai',
      en: '/ecommerce-agency-dubai',
      ru: '/agentstvo-ecommerce-dubay',
    },
    '/wordpress-agentur-dubai': {
      de: '/wordpress-agentur-dubai',
      en: '/wordpress-agency-dubai',
      ru: '/agentstvo-wordpress-dubay',
    },
    '/digitales-marketing-dubai': {
      de: '/digitales-marketing-dubai',
      en: '/digital-marketing-dubai',
      ru: '/tsifrovoy-marketing-dubay',
    },
    '/webentwicklung-abu-dhabi': {
      de: '/webentwicklung-abu-dhabi',
      en: '/web-development-abu-dhabi',
      ru: '/veb-razrabotka-abu-dabi',
    },
    '/web-design-abu-dhabi': {
      de: '/webdesign-abu-dhabi',
      en: '/web-design-abu-dhabi',
      ru: '/veb-dizayn-abu-dabi',
    },
    '/app-entwicklung-dubai': {
      de: '/app-entwicklung-dubai',
      en: '/app-development-dubai',
      ru: '/razrabotka-prilozheniy-dubay',
    },

    // ============================================
    // UAE HUB PAGES (NEW 2025)
    // ============================================
    // Dubai Hub
    '/dubai': {
      de: '/dubai',
      en: '/dubai',
      ru: '/dubay',
    },
    '/dubai/web-design-company-dubai': {
      de: '/dubai/webdesign-agentur-dubai',
      en: '/dubai/web-design-company-dubai',
      ru: '/dubay/veb-dizayn-kompaniya-dubay',
    },
    '/dubai/seo-company-dubai': {
      de: '/dubai/seo-agentur-dubai',
      en: '/dubai/seo-company-dubai',
      ru: '/dubay/seo-kompaniya-dubay',
    },
    '/dubai/branding-agency-dubai': {
      de: '/dubai/branding-agentur-dubai',
      en: '/dubai/branding-agency-dubai',
      ru: '/dubay/brending-agentstvo-dubay',
    },
    '/dubai/ecommerce-development-dubai': {
      de: '/dubai/ecommerce-entwicklung-dubai',
      en: '/dubai/ecommerce-development-dubai',
      ru: '/dubay/razrabotka-ecommerce-dubay',
    },
    '/dubai/digital-marketing-agency-dubai': {
      de: '/dubai/digital-marketing-agentur-dubai',
      en: '/dubai/digital-marketing-agency-dubai',
      ru: '/dubay/agentstvo-tsifrovogo-marketinga-dubay',
    },

    // Abu Dhabi Hub
    '/abu-dhabi': {
      de: '/abu-dhabi',
      en: '/abu-dhabi',
      ru: '/abu-dabi',
    },
    '/abu-dhabi/web-design-abu-dhabi': {
      de: '/abu-dhabi/webdesign-abu-dhabi',
      en: '/abu-dhabi/web-design-abu-dhabi',
      ru: '/abu-dabi/veb-dizayn-abu-dabi',
    },
    '/abu-dhabi/seo-abu-dhabi': {
      de: '/abu-dhabi/seo-agentur-abu-dhabi',
      en: '/abu-dhabi/seo-abu-dhabi',
      ru: '/abu-dabi/seo-abu-dabi',
    },
    '/abu-dhabi/branding-abu-dhabi': {
      de: '/abu-dhabi/branding-agentur-abu-dhabi',
      en: '/abu-dhabi/branding-abu-dhabi',
      ru: '/abu-dabi/brending-abu-dabi',
    },
    '/abu-dhabi/ecommerce-abu-dhabi': {
      de: '/abu-dhabi/ecommerce-abu-dhabi',
      en: '/abu-dhabi/ecommerce-abu-dhabi',
      ru: '/abu-dabi/ecommerce-abu-dabi',
    },
    '/abu-dhabi/digital-marketing-abu-dhabi': {
      de: '/abu-dhabi/digital-marketing-abu-dhabi',
      en: '/abu-dhabi/digital-marketing-abu-dhabi',
      ru: '/abu-dabi/tsifrovoy-marketing-abu-dabi',
    },

    // Sharjah Hub
    '/sharjah': {
      de: '/sharjah',
      en: '/sharjah',
      ru: '/shardzha',
    },
    '/sharjah/web-design-sharjah': {
      de: '/sharjah/webdesign-sharjah',
      en: '/sharjah/web-design-sharjah',
      ru: '/shardzha/veb-dizayn-shardzha',
    },
    '/sharjah/seo-sharjah': {
      de: '/sharjah/seo-agentur-sharjah',
      en: '/sharjah/seo-sharjah',
      ru: '/shardzha/seo-shardzha',
    },
    '/sharjah/branding-sharjah': {
      de: '/sharjah/branding-agentur-sharjah',
      en: '/sharjah/branding-sharjah',
      ru: '/shardzha/brending-shardzha',
    },
    '/sharjah/ecommerce-sharjah': {
      de: '/sharjah/ecommerce-sharjah',
      en: '/sharjah/ecommerce-sharjah',
      ru: '/shardzha/ecommerce-shardzha',
    },
    '/sharjah/digital-marketing-sharjah': {
      de: '/sharjah/digital-marketing-sharjah',
      en: '/sharjah/digital-marketing-sharjah',
      ru: '/shardzha/tsifrovoy-marketing-shardzha',
    },

    // UAE Hub (Country-wide)
    '/uae': {
      de: '/vae',
      en: '/uae',
      ru: '/oae',
    },

    // ============================================
    // TOOLS (FREE SEO/PERFORMANCE TOOLS)
    // ============================================
    '/tools': {
      de: '/tools',
      en: '/tools',
      ru: '/instrumenty',
    },
    '/tools/seo-checker': {
      de: '/tools/seo-checker',
      en: '/tools/seo-checker',
      ru: '/instrumenty/seo-proverka',
    },
    '/tools/performance-checker': {
      de: '/tools/performance-checker',
      en: '/tools/performance-checker',
      ru: '/instrumenty/proverka-skorosti',
    },
    '/tools/design-analyzer': {
      de: '/tools/design-analyzer',
      en: '/tools/design-analyzer',
      ru: '/instrumenty/analiz-dizayna',
    },
    '/tools/security-checker': {
      de: '/tools/security-checker',
      en: '/tools/security-checker',
      ru: '/instrumenty/proverka-bezopasnosti',
    },
    '/tools/website-analyzer': {
      de: '/tools/website-analyzer',
      en: '/tools/website-analyzer',
      ru: '/instrumenty/analiz-sayta',
    },

    // ============================================
    // COMBINED TOOLS (3 new combined tools)
    // ============================================
    '/tools/seo-performance': {
      de: '/tools/seo-performance',
      en: '/tools/seo-performance',
      ru: '/instrumenty/seo-proizvoditelnost',
    },
    '/tools/website-design': {
      de: '/tools/website-design',
      en: '/tools/website-design',
      ru: '/instrumenty/dizayn-sayta',
    },
    '/tools/security': {
      de: '/tools/security',
      en: '/tools/security',
      ru: '/instrumenty/bezopasnost',
    },

    // ============================================
    // LEGAL / RECHTLICHES
    // ============================================
    '/kontakt': {
      de: '/kontakt',
      en: '/contact',
      ru: '/kontakty',
    },
    '/impressum': {
      de: '/impressum',
      en: '/imprint',
      ru: '/impressum',
    },
    '/datenschutz': {
      de: '/datenschutz',
      en: '/privacy-policy',
      ru: '/politika-konfidentsialnosti',
    },
    '/haeufige-fragen': {
      de: '/haeufige-fragen',
      en: '/faq',
      ru: '/chasto-zadavaemye-voprosy',
    },
    '/rechtliches/cookie-einstellungen': {
      de: '/rechtliches/cookie-einstellungen',
      en: '/legal/cookie-settings',
      ru: '/pravovaya-informatsiya/nastroyki-cookie',
    },
  },
})

// Export pathnames for use in other modules
export const { pathnames } = routing

// Type for pathname keys
export type AppPathname = keyof typeof routing.pathnames

// Type that excludes dynamic routes (contains [slug], [subslug], etc.)
export type StaticAppPathname = Exclude<
  AppPathname,
  | '/leistungen/[slug]'
  | '/leistungen/[slug]/[subslug]'
  | '/leistungen/pakete/[slug]'
  | '/standorte/[slug]'
  | '/referenzen/[slug]'
  | '/projekte/[slug]'
  | '/blog/[slug]'
  | '/blog/kategorie/[slug]'
  | '/lexikon/[slug]'
  | '/ueber-uns/team/[slug]'
>
