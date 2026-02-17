/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/templates/landing-page'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import type { LandingPageContent, LandingPageSEO } from '@/components/templates/landing-page'
import { sharedLabels } from '@/lib/landing-pages-data'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }]
}

export const revalidate = 3600

const seoData = {
  de: {
    title: 'Website as a Service Wien | Monatliche Website-Betreuung | GoldenWing',
    description: 'Website as a Service: Design, Entwicklung, Hosting, Wartung & Updates — alles aus einer Hand, ab €990/Monat. Keine Investitionskosten, volle Flexibilität.',
    keywords: ['Website as a Service', 'Website Abo', 'Website Betreuung', 'Managed Website', 'Website Wartung', 'Website Hosting'],
  },
  en: {
    title: 'Website as a Service Vienna | Monthly Website Management | GoldenWing',
    description: 'Website as a Service: Design, development, hosting, maintenance & updates — all-in-one, from €990/month. No upfront costs, full flexibility.',
    keywords: ['Website as a Service', 'Website Subscription', 'Website Management', 'Managed Website', 'Website Maintenance'],
  },
}

const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Website as a Service',
      title: 'Ihre Website. Immer perfekt. Ohne Kopfzerbrechen.',
      description: 'Design, Entwicklung, Hosting, Wartung, Updates — alles aus einer Hand. Kein Projektaufwand, keine versteckten Kosten. Einfach eine Website, die funktioniert.',
      ctaPrimary: 'Erstgespräch buchen',
      ctaSecondary: 'Pakete ansehen',
    },
    trustSignals: [
      { icon: 'zap', text: 'Live in 14 Tagen' },
      { icon: 'shield', text: '99,9% Uptime' },
      { icon: 'refresh-cw', text: 'Monatlich kündbar' },
      { icon: 'headphones', text: 'Priority Support' },
    ],
    benefits: [
      {
        icon: 'credit-card',
        title: 'Keine Investitionskosten',
        description: 'Statt €15.000+ Projektkosten zahlen Sie eine fixe monatliche Rate. Keine versteckten Kosten, keine Überraschungen.',
      },
      {
        icon: 'trending-up',
        title: 'Immer aktuell',
        description: 'Regelmäßige Updates, neue Features, Technologie-Upgrades — Ihre Website entwickelt sich mit Ihrem Business.',
      },
      {
        icon: 'shield',
        title: 'Sicherheit inklusive',
        description: 'SSL-Zertifikat, CDN, tägliche Backups, Security-Monitoring — alles automatisch im Paket enthalten.',
      },
      {
        icon: 'headphones',
        title: 'Support & Wartung',
        description: 'Monatliche Support-Stunden für Anpassungen, Bugfixes und Inhaltspflege. Keine extra Rechnungen.',
      },
      {
        icon: 'rocket',
        title: 'Performance-Garantie',
        description: 'Schnelle Ladezeiten (< 2 Sek.), optimiert für Google, Mobile-First. Core Web Vitals im grünen Bereich.',
      },
      {
        icon: 'users',
        title: 'Dediziertes Team',
        description: 'Designer, Developer, SEO-Experte — Ihr festes Team, das Ihr Business versteht.',
      },
    ],
    results: [
      { metric: '14 Tage', label: 'Bis Live', detail: 'Von Briefing bis Launch' },
      { metric: '99,9%', label: 'Uptime', detail: 'Garantiert verfügbar' },
      { metric: '< 2 Sek.', label: 'Ladezeit', detail: 'Performance-optimiert' },
    ],
    packages: [
      {
        name: 'STARTER',
        price: '990',
        priceType: 'monatlich',
        description: 'Perfekt für kleine Unternehmen & Startups.',
        popular: false,
        features: [
          'Bis zu 5 Seiten',
          'Responsive Design (Mobile-First)',
          'SSL-Zertifikat & Hosting',
          'CDN (Content Delivery Network)',
          'Monatliche Backups',
          'Security-Updates',
          '2h Support/Monat',
          'Google Analytics & Search Console',
          'SEO-Grundoptimierung',
        ],
      },
      {
        name: 'BUSINESS',
        price: '1.990',
        priceType: 'monatlich',
        description: 'Für wachsende Unternehmen mit Anspruch.',
        popular: true,
        features: [
          'Alles aus STARTER',
          'Bis zu 15 Seiten',
          'CMS (Content Management System)',
          'Blog-System',
          'Erweiterte SEO-Optimierung',
          'A/B-Testing',
          '4h Support/Monat',
          'Wöchentliche Backups',
          'Priority Support',
          'Conversion-Optimierung',
        ],
      },
      {
        name: 'ENTERPRISE',
        price: '3.990',
        priceType: 'monatlich',
        description: 'Für maximale Performance & Flexibilität.',
        popular: false,
        features: [
          'Alles aus BUSINESS',
          'Unbegrenzte Seiten',
          'E-Commerce-Integration',
          'Mehrsprachigkeit',
          'Erweiterte Integrationen (CRM, API)',
          '8h Support/Monat',
          'Tägliche Backups',
          'Dedizierter Account Manager',
          'Custom Features & Entwicklung',
          'White-Label Reporting',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Briefing & Strategie', description: 'Wir verstehen Ihr Business, Ihre Ziele und Ihre Zielgruppe. Gemeinsam definieren wir die Website-Strategie.' },
      { step: '02', title: 'Design & Konzept', description: 'Individuelles Design-Konzept basierend auf Ihrer Marke und Best Practices für Conversion.' },
      { step: '03', title: 'Entwicklung & Testing', description: 'Professionelle Umsetzung mit modernster Technologie. Ausführliches Testing vor dem Launch.' },
      { step: '04', title: 'Launch & Onboarding', description: 'Go-Live Ihrer neuen Website. Training für Ihr Team zur Content-Pflege.' },
      { step: '05', title: 'Laufende Betreuung', description: 'Wartung, Updates, Support — wir kümmern uns um alles. Sie konzentrieren sich auf Ihr Business.' },
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Cloudflare', 'Vercel', 'Payload CMS', 'Tailwind CSS', 'Google Analytics'],
    faqs: [
      {
        question: 'Warum Website as a Service statt einmaliger Projekt?',
        answer: 'Keine hohen Anfangsinvestitionen (€15.000+), keine versteckten Wartungskosten später. Vorhersehbare monatliche Kosten, immer aktuelle Technologie, laufender Support. Sie zahlen nur, solange Sie die Website nutzen.',
      },
      {
        question: 'Was passiert, wenn ich kündige?',
        answer: 'Monatliche Kündigungsfrist. Sie können die Website gegen Einmalzahlung übernehmen (Restwert nach Laufzeit) oder wir nehmen sie offline. Ihre Inhalte gehören Ihnen und werden exportiert.',
      },
      {
        question: 'Sind Inhalte und Bilder inkludiert?',
        answer: 'Design und Struktur sind inkludiert. Texte und Bilder liefern Sie (oder wir organisieren Content-Erstellung gegen Aufpreis). Stock-Fotos sind im Paket enthalten.',
      },
      {
        question: 'Kann ich selbst Inhalte ändern?',
        answer: 'Ja! Ab BUSINESS-Paket haben Sie Zugriff auf ein benutzerfreundliches CMS. Alternativ nutzen Sie Ihre monatlichen Support-Stunden für Änderungen.',
      },
      {
        question: 'Wie schnell kann die Website live gehen?',
        answer: 'STARTER-Paket: 14 Tage. BUSINESS: 3-4 Wochen. ENTERPRISE: 4-6 Wochen (je nach Komplexität und Content-Readiness).',
      },
      {
        question: 'Was bedeutet "2h/4h/8h Support/Monat"?',
        answer: 'Das sind Ihre inkludierten Stunden für Anpassungen, neue Inhalte, Bugfixes, Feature-Requests. Nicht genutzte Stunden können nicht übertragen werden. Extra-Stunden: €150/h.',
      },
    ],
    relatedServices: [
      { title: 'SEO Retainer', description: 'Monatliche SEO-Betreuung.', href: '/leistungen/seo-retainer' as any },
      { title: 'Brand in a Box', description: 'Komplettes Branding-Paket.', href: '/leistungen/brand-in-a-box' as any },
      { title: 'Digital Marketing', description: 'Performance Marketing.', href: '/leistungen/digital-marketing' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Unsere Pakete',
      pricingDescription: 'Transparent, fair, monatlich kündbar.',
      faqTitle: 'Häufige Fragen',
      faqSubtitle: 'Alles über Website as a Service.',
      ctaTitle: 'Bereit für Ihre neue Website?',
      ctaDescription: 'Kostenloses Erstgespräch: Wir zeigen Ihnen, wie Ihre Website aussehen könnte und welches Paket zu Ihnen passt.',
      ctaButton: 'Erstgespräch buchen',
    },
  },
  en: {
    hero: {
      badge: 'Website as a Service',
      title: 'Your Website. Always Perfect. Zero Headaches.',
      description: 'Design, development, hosting, maintenance, updates — all-in-one. No project overhead, no hidden costs. Just a website that works.',
      ctaPrimary: 'Book Consultation',
      ctaSecondary: 'View Packages',
    },
    trustSignals: [
      { icon: 'zap', text: 'Live in 14 Days' },
      { icon: 'shield', text: '99.9% Uptime' },
      { icon: 'refresh-cw', text: 'Cancel Monthly' },
      { icon: 'headphones', text: 'Priority Support' },
    ],
    benefits: [
      { icon: 'credit-card', title: 'No Upfront Costs', description: 'Instead of €15,000+ project costs, pay a fixed monthly rate. No hidden fees, no surprises.' },
      { icon: 'trending-up', title: 'Always Up-to-Date', description: 'Regular updates, new features, technology upgrades — your website evolves with your business.' },
      { icon: 'shield', title: 'Security Included', description: 'SSL certificate, CDN, daily backups, security monitoring — all automatically included.' },
      { icon: 'headphones', title: 'Support & Maintenance', description: 'Monthly support hours for adjustments, bug fixes, and content updates. No extra invoices.' },
      { icon: 'rocket', title: 'Performance Guarantee', description: 'Fast loading times (< 2 sec), optimized for Google, mobile-first. Core Web Vitals in the green.' },
      { icon: 'users', title: 'Dedicated Team', description: 'Designer, developer, SEO expert — your dedicated team that understands your business.' },
    ],
    results: [
      { metric: '14 Days', label: 'To Live', detail: 'From briefing to launch' },
      { metric: '99.9%', label: 'Uptime', detail: 'Guaranteed availability' },
      { metric: '< 2 Sec', label: 'Load Time', detail: 'Performance-optimized' },
    ],
    packages: [
      { name: 'STARTER', price: '990', priceType: 'monthly', description: 'Perfect for small businesses & startups.', popular: false, features: ['Up to 5 pages', 'Responsive design (mobile-first)', 'SSL certificate & hosting', 'CDN', 'Monthly backups', 'Security updates', '2h support/month', 'Google Analytics & Search Console', 'Basic SEO optimization'] },
      { name: 'BUSINESS', price: '1,990', priceType: 'monthly', description: 'For growing businesses with ambition.', popular: true, features: ['Everything from STARTER', 'Up to 15 pages', 'CMS', 'Blog system', 'Advanced SEO optimization', 'A/B testing', '4h support/month', 'Weekly backups', 'Priority support', 'Conversion optimization'] },
      { name: 'ENTERPRISE', price: '3,990', priceType: 'monthly', description: 'For maximum performance & flexibility.', popular: false, features: ['Everything from BUSINESS', 'Unlimited pages', 'E-commerce integration', 'Multi-language', 'Advanced integrations (CRM, API)', '8h support/month', 'Daily backups', 'Dedicated account manager', 'Custom features & development', 'White-label reporting'] },
    ],
    process: [
      { step: '01', title: 'Briefing & Strategy', description: 'We understand your business, goals, and target audience. Together we define the website strategy.' },
      { step: '02', title: 'Design & Concept', description: 'Individual design concept based on your brand and best practices for conversion.' },
      { step: '03', title: 'Development & Testing', description: 'Professional implementation with cutting-edge technology. Thorough testing before launch.' },
      { step: '04', title: 'Launch & Onboarding', description: 'Go-live of your new website. Training for your team on content management.' },
      { step: '05', title: 'Ongoing Support', description: 'Maintenance, updates, support — we take care of everything. You focus on your business.' },
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Cloudflare', 'Vercel', 'Payload CMS', 'Tailwind CSS', 'Google Analytics'],
    faqs: [
      { question: 'Why Website as a Service instead of one-time project?', answer: 'No high upfront investment (€15,000+), no hidden maintenance costs later. Predictable monthly costs, always current technology, ongoing support.' },
      { question: 'What happens if I cancel?', answer: 'Monthly cancellation period. You can take over the website for a one-time payment (residual value after term) or we take it offline. Your content belongs to you and will be exported.' },
      { question: 'Are content and images included?', answer: 'Design and structure are included. You provide texts and images (or we organize content creation for an additional fee). Stock photos are included.' },
      { question: 'Can I change content myself?', answer: 'Yes! From BUSINESS package onwards, you have access to a user-friendly CMS. Alternatively, use your monthly support hours for changes.' },
      { question: 'How fast can the website go live?', answer: 'STARTER package: 14 days. BUSINESS: 3-4 weeks. ENTERPRISE: 4-6 weeks (depending on complexity and content readiness).' },
    ],
    relatedServices: [
      { title: 'SEO Retainer', description: 'Monthly SEO service.', href: '/services/seo-retainer' as any },
      { title: 'Brand in a Box', description: 'Complete branding package.', href: '/services/brand-in-a-box' as any },
      { title: 'Digital Marketing', description: 'Performance marketing.', href: '/services/digital-marketing' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Our Packages',
      pricingDescription: 'Transparent, fair, cancel monthly.',
      faqTitle: 'FAQ',
      faqSubtitle: 'Everything about Website as a Service.',
      ctaTitle: 'Ready for Your New Website?',
      ctaDescription: 'Free consultation: We show you how your website could look and which package suits you.',
      ctaButton: 'Book Consultation',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const basePath = '/leistungen/website-as-a-service'
  const hreflangAlternates = getHreflangAlternates(basePath)

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl(basePath, locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function WebsiteAsAServicePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: 'Website as a Service',
    cityName: 'Wien',
    cityType: 'City',
    url: '/leistungen/website-as-a-service',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Leistungen' : 'Services', url: locale === 'de' ? 'https://goldenwing.at/leistungen' : 'https://goldenwing.at/en/services' },
      { name: 'Website as a Service', url: 'https://goldenwing.at/leistungen/website-as-a-service' },
    ],
  }

  return <LandingPageTemplate locale={locale} content={content} seo={seo} />
}
