import { Metadata } from 'next'
import { Link } from '@/lib/i18n-navigation'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle, Quote, Palette, Globe, Search, Lightbulb, FileText, Code, BookOpen, AlertCircle, Sparkles, ExternalLink, Building2, Calendar, Layers } from 'lucide-react'
import { RichText, type LexicalContent } from '@/components/rich-text'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Section } from '@/components/ui/container'
import { JsonLd } from '@/components/seo/json-ld'
import { ProjectGallery } from '@/components/ui/project-gallery'
import { getProjects, getProjectBySlug, getRelatedProjects, getServiceBySlug, getPostsByCategory, type SupportedLocale } from '@/lib/payload'
import { getProjectTranslationRu } from '@/lib/translations/project-ru'
import { getTranslations } from 'next-intl/server'
import { getCanonicalUrl, getHreflangAlternates, translateServiceSlugToEn, getSchemaUrl, getMediaUrl, truncateMetaDescription } from '@/lib/utils'
// NextLink removed — locale-aware Link is used instead
import { lexikonEntries, type LexikonEntry } from '@/lib/lexikon/data'

// Industry mapping for Schema.org
const industryMapping: Record<string, { name: string; naicsCode: string }> = {
  'manufacturing': { name: 'Manufacturing', naicsCode: '31-33' },
  'ecommerce': { name: 'E-Commerce & Retail', naicsCode: '44-45' },
  'consulting': { name: 'Professional Services', naicsCode: '54' },
  'technology': { name: 'Information Technology', naicsCode: '51' },
  'healthcare': { name: 'Healthcare', naicsCode: '62' },
  'finance': { name: 'Finance & Insurance', naicsCode: '52' },
}

// Category to Blog category mapping for internal links
const categoryToBlogCategory: Record<string, string> = {
  'branding': 'marketing',
  'webdesign': 'webdesign',
  'seo': 'seo',
  'strategie': 'marketing',
  'content': 'marketing',
  'software': 'technologie',
}

// External tool links by category (for E-E-A-T)
const categoryTools: Record<string, { name: string; url: string; description: string }[]> = {
  'branding': [
    { name: 'Adobe Creative Cloud', url: 'https://www.adobe.com/creativecloud.html', description: 'Design Suite' },
    { name: 'Figma', url: 'https://www.figma.com', description: 'UI/UX Design' },
  ],
  'webdesign': [
    { name: 'Figma', url: 'https://www.figma.com', description: 'UI/UX Design' },
    { name: 'Next.js', url: 'https://nextjs.org', description: 'React Framework' },
  ],
  'seo': [
    { name: 'Google Search Console', url: 'https://search.google.com/search-console', description: 'SEO Analytics' },
    { name: 'Ahrefs', url: 'https://ahrefs.com', description: 'SEO Tools' },
  ],
  'strategie': [
    { name: 'Google Analytics', url: 'https://analytics.google.com', description: 'Web Analytics' },
    { name: 'HubSpot', url: 'https://www.hubspot.com', description: 'Marketing Automation' },
  ],
  'content': [
    { name: 'Canva', url: 'https://www.canva.com', description: 'Visual Content' },
    { name: 'Adobe Premiere', url: 'https://www.adobe.com/products/premiere.html', description: 'Video Production' },
  ],
  'software': [
    { name: 'GitHub', url: 'https://github.com', description: 'Version Control' },
    { name: 'AWS', url: 'https://aws.amazon.com', description: 'Cloud Services' },
  ],
}

interface _TagItem {
  id?: string
  tag: string
}

interface ServiceItem {
  id?: string
  service: string
}

interface SolutionPoint {
  id?: string
  title: string
  description?: string
}

interface GalleryItem {
  id?: string
  image?: {
    url?: string
    alt?: string
  }
  caption?: string
}


// Color mapping for project categories
const categoryColors: Record<string, string> = {
  'branding': 'from-amber-500/20 to-orange-500/20',
  'webdesign': 'from-blue-500/20 to-cyan-500/20',
  'seo': 'from-emerald-500/20 to-green-500/20',
  'marketing': 'from-rose-500/20 to-pink-500/20',
  'entwicklung': 'from-violet-500/20 to-purple-500/20',
  'it-cloud': 'from-slate-500/20 to-indigo-500/20',
}

function getColorForCategory(category: string): string {
  return categoryColors[category] || 'from-gray-500/20 to-slate-500/20'
}

// Map project categories to actual service page slugs (DE)
const categoryToServiceSlug: Record<string, string> = {
  'branding': 'branding',
  'webdesign': 'webdesign',
  'seo': 'seo-content',
  'seoContent': 'seo-content',
  'marketing': 'digital-marketing',
  'digitalMarketing': 'digital-marketing',
  'software': 'web-app-entwicklung',
  'entwicklung': 'web-app-entwicklung',
  'webAppDevelopment': 'web-app-entwicklung',
  'strategie': 'digital-marketing',
  'content': 'seo-content',
  'it-cloud': 'it-cloud-services',
  'itCloudServices': 'it-cloud-services',
  'digital-marketing': 'digital-marketing',
  'seo-content': 'seo-content',
  'web-app-entwicklung': 'web-app-entwicklung',
}

// Map project categories to lexikon categories for internal linking
const categoryToLexikonCategories: Record<string, LexikonEntry['category'][]> = {
  'branding': ['design', 'strategy'],
  'webdesign': ['design', 'development'],
  'seo': ['seo', 'marketing'],
  'marketing': ['marketing', 'strategy'],
  'entwicklung': ['development'],
  'it-cloud': ['development', 'strategy'],
}

// Get relevant lexikon entries for a project category
function getRelevantLexikonTerms(projectCategory: string, limit: number = 5): LexikonEntry[] {
  const lexikonCategories = categoryToLexikonCategories[projectCategory] || ['seo', 'marketing']

  // Filter and sort by search volume (higher volume = more important)
  return lexikonEntries
    .filter(entry => lexikonCategories.includes(entry.category))
    .sort((a, b) => b.searchVolume - a.searchVolume)
    .slice(0, limit)
}

function CategoryIcon({ category, size = 'md' }: { category: string; size?: 'md' | 'lg' }) {
  const className = size === 'lg'
    ? "w-24 h-24 text-foreground/10"
    : "w-16 h-16 text-foreground/10"
  switch (category) {
    case 'branding':
      return <Palette className={className} strokeWidth={1} />
    case 'webdesign':
      return <Globe className={className} strokeWidth={1} />
    case 'seo':
      return <Search className={className} strokeWidth={1} />
    case 'marketing':
      return <Lightbulb className={className} strokeWidth={1} />
    case 'entwicklung':
      return <Code className={className} strokeWidth={1} />
    case 'it-cloud':
      return <FileText className={className} strokeWidth={1} />
    default:
      return <Palette className={className} strokeWidth={1} />
  }
}

export async function generateStaticParams() {
  const projects = await getProjects()
  const locales = ['de', 'en'] as const
  // Generate params for both locales - project slugs are the same in both languages
  return locales.flatMap(locale =>
    projects.map(project => ({ locale, slug: project.slug }))
  )
}

// Category labels for meta descriptions
const categoryLabels: Record<string, { de: string; en: string; ru: string }> = {
  'branding': { de: 'Branding', en: 'Branding', ru: 'Брендинг' },
  'webdesign': { de: 'Webdesign', en: 'Web Design', ru: 'Веб-дизайн' },
  'seo': { de: 'SEO', en: 'SEO', ru: 'SEO' },
  'strategie': { de: 'Digitales Marketing', en: 'Digital Marketing', ru: 'Цифровой маркетинг' },
  'content': { de: 'Content & Visuals', en: 'Content & Visuals', ru: 'Контент и визуал' },
  'software': { de: 'Software-Entwicklung', en: 'Software Development', ru: 'Разработка ПО' },
}

// Generate unique meta description from project data
function generateUniqueDescription(
  project: { title?: string; client?: string; category?: string; year?: number; description?: string },
  locale: SupportedLocale
): string {
  const title = project.title || 'Project'
  const client = project.client || 'Client'
  const category = project.category || 'digital'
  // If project has a unique description, use it
  if (project.description && project.description.length > 50 &&
      !project.description.includes('Professional project execution')) {
    return project.description
  }

  const categoryLabel = categoryLabels[category]?.[locale as 'de' | 'en' | 'ru'] || categoryLabels[category]?.['en'] || category
  const yearText = project.year ? ` (${project.year})` : ''

  if (locale === 'de') {
    return `${title} – ${categoryLabel}-Projekt für ${client}${yearText}. Entdecken Sie unsere Case Study und die erzielten Ergebnisse.`
  }
  if (locale === 'ru') {
    return `${title} – ${categoryLabel}-проект для ${client}${yearText}. Ознакомьтесь с нашим кейсом и достигнутыми результатами.`
  }
  return `${title} – ${categoryLabel} project for ${client}${yearText}. Discover our case study and the results achieved.`
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale: localeParam, slug } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  // Payload CMS only has 'de' and 'en' locales — use 'de' fallback for 'ru'
  const cmsLocale = (locale === 'ru' ? 'de' : locale) as SupportedLocale
  const projectData = await getProjectBySlug(slug, cmsLocale)

  if (!projectData) {
    notFound()
  }

  // Apply Russian translations for metadata
  const project = locale === 'ru' ? (() => {
    const ruTranslation = getProjectTranslationRu(slug)
    if (ruTranslation) {
      return {
        ...projectData,
        title: ruTranslation.title || projectData.title,
        description: ruTranslation.description || projectData.description,
      }
    }
    return projectData
  })() : projectData

  const canonicalUrl = getCanonicalUrl(`/projekte/${slug}`, locale)
  const hreflangAlternates = getHreflangAlternates(`/projekte/${slug}`, locale)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uniqueDescription = generateUniqueDescription(project as any, locale)

  // Truncate title to max 60 chars for SEO (suffix is 10 chars max)
  const projectTitle = project.title || ''
  const suffix = locale === 'de' ? ' | Projekt' : locale === 'ru' ? ' | Проект' : ' | Project'
  const maxTitleLength = 60 - suffix.length // ~50 chars for title
  const truncatedTitle = projectTitle.length > maxTitleLength
    ? projectTitle.substring(0, maxTitleLength - 3).trim() + '...'
    : projectTitle

  // Truncate description to max 155 chars for SEO using utility function
  const truncatedDescription = truncateMetaDescription(uniqueDescription, 155)

  return {
    title: `${truncatedTitle}${suffix}`,
    description: truncatedDescription,
    keywords: [project.title, project.client, project.category, 'Portfolio', locale === 'de' ? 'Referenz' : 'Reference'],
    openGraph: {
      title: `${truncatedTitle} | GoldenWing Portfolio`,
      description: truncatedDescription,
      url: canonicalUrl,
      type: 'article',
      siteName: 'GoldenWing Creative Studios',
      publishedTime: project.year ? `${project.year}-01-01` : undefined,
      images: [
        {
          url: (project.mainImage as { url?: string })?.url || 'https://goldenwing.at/og-image.jpg',
          width: 1200,
          height: 630,
          alt: truncatedTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${truncatedTitle} | GoldenWing Portfolio`,
      description: truncatedDescription,
      images: [(project.mainImage as { url?: string })?.url || 'https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: localeParam, slug } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  // Payload CMS only has 'de' and 'en' locales — use 'de' fallback for 'ru'
  const cmsLocale = (locale === 'ru' ? 'de' : locale) as SupportedLocale
  const t = await getTranslations({ locale, namespace: 'projects' })
  const tServices = await getTranslations({ locale, namespace: 'services' })
  const projectData = await getProjectBySlug(slug, cmsLocale)

  // Apply Russian translations as fallback when locale is 'ru'
  // Since CMS content is primarily DE/EN, we use hardcoded translations for Russian
  const project = projectData ? (() => {
    if (locale === 'ru') {
      const ruTranslation = getProjectTranslationRu(slug)
      if (ruTranslation) {
        return {
          ...projectData,
          title: ruTranslation.title || projectData.title,
          description: ruTranslation.description || projectData.description,
          challenge: ruTranslation.challenge || projectData.challenge,
          solution: ruTranslation.solution || projectData.solution,
          companyDescription: ruTranslation.companyDescription || projectData.companyDescription,
          // Override solutionPoints with Russian translations if available
          solutionPoints: ruTranslation.solutionPoints && ruTranslation.solutionPoints.length > 0
            ? ruTranslation.solutionPoints.map((point, idx) => ({
                id: `ru-${idx}`,
                title: point.title,
                description: point.description,
              }))
            : projectData.solutionPoints,
          // Override results with Russian translations if available
          results: ruTranslation.results && ruTranslation.results.length > 0
            ? ruTranslation.results
            : projectData.results,
          // Override client feedback with Russian translations if available
          clientFeedback: ruTranslation.clientFeedbackQuote
            ? {
                ...projectData.clientFeedback,
                quote: ruTranslation.clientFeedbackQuote,
                ...(ruTranslation.clientFeedbackAuthor && { author: ruTranslation.clientFeedbackAuthor }),
                ...(ruTranslation.clientFeedbackRole && { role: ruTranslation.clientFeedbackRole }),
              }
            : projectData.clientFeedback,
          // Override services with Russian translations if available
          services: ruTranslation.services && ruTranslation.services.length > 0
            ? ruTranslation.services.map((service, idx) => ({
                id: `ru-svc-${idx}`,
                service,
              }))
            : projectData.services,
        }
      }
    }
    return projectData
  })() : null

  // Get category labels from translations
  const getCategoryLabel = (category: string): string => {
    const categoryKeys: Record<string, string> = {
      'branding': 'branding.title',
      'webdesign': 'webdesign.title',
      'seo': 'seoContent.title',
      'seoContent': 'seoContent.title',
      'marketing': 'digitalMarketing.title',
      'digitalMarketing': 'digitalMarketing.title',
      'entwicklung': 'webAppDevelopment.title',
      'webAppDevelopment': 'webAppDevelopment.title',
      'it-cloud': 'itCloudServices.title',
      'itCloudServices': 'itCloudServices.title',
    }
    return categoryKeys[category] ? tServices(categoryKeys[category]) : category
  }

  if (!project) {
    notFound()
  }

  // Fetch related projects from the same category
  const relatedProjects = await getRelatedProjects(project.category, slug, cmsLocale, 3)

  // Get the related service for this project category
  const relatedService = await getServiceBySlug(project.category, cmsLocale)

  // Get related blog posts for internal linking
  const blogCategory = categoryToBlogCategory[project.category] || 'marketing'
  const _relatedPosts = await getPostsByCategory(blogCategory, cmsLocale, 3)

  // === ENHANCED SCHEMA MARKUP ===

  // 1. Article/CaseStudy Schema (Primary)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': getSchemaUrl(`/projekte/${slug}#article`, locale),
    headline: project.title,
    description: project.description,
    url: getSchemaUrl(`/projekte/${slug}`, locale),
    datePublished: project.year ? `${project.year}-01-01` : '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': getSchemaUrl(`/projekte/${slug}`, locale),
    },
    author: {
      '@type': 'Organization',
      '@id': 'https://goldenwing.at/#organization',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
      logo: {
        '@type': 'ImageObject',
        url: 'https://goldenwing.at/logo.png',
      },
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://goldenwing.at/#organization',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
      logo: {
        '@type': 'ImageObject',
        url: 'https://goldenwing.at/logo.png',
      },
    },
    about: {
      '@type': 'Thing',
      name: getCategoryLabel(project.category),
    },
    articleSection: getCategoryLabel(project.category),
    wordCount: 1500,
    ...(project.mainImage && typeof project.mainImage === 'object' && project.mainImage.url && {
      image: {
        '@type': 'ImageObject',
        url: getMediaUrl(project.mainImage.url, true),
        width: 1200,
        height: 630,
      },
    }),
  }

  // 2. Organization Schema for Client (E-E-A-T)
  const clientOrganizationSchema = project.client ? {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `https://goldenwing.at/projekte/${slug}#client`,
    name: project.client,
    description: project.companyDescription || `${project.client} - ${locale === 'de' ? 'Kunde von GoldenWing' : 'GoldenWing Client'}`,
    ...(project.industry && project.industry.length > 0 && {
      industry: industryMapping[project.industry[0]]?.name || project.industry[0],
      naics: industryMapping[project.industry[0]]?.naicsCode,
    }),
    ...(project.liveUrl && {
      url: project.liveUrl,
      sameAs: [project.liveUrl],
    }),
  } : null

  // 3. Service Schema (Erbrachte Leistungen)
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://goldenwing.at/projekte/${slug}#service`,
    name: `${getCategoryLabel(project.category)} ${locale === 'de' ? 'für' : 'for'} ${project.client}`,
    description: project.description,
    provider: {
      '@type': 'Organization',
      '@id': 'https://goldenwing.at/#organization',
      name: 'GoldenWing Creative Studios',
    },
    serviceType: getCategoryLabel(project.category),
    areaServed: {
      '@type': 'Place',
      name: 'DACH Region, UAE',
    },
    ...(project.services && project.services.length > 0 && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: locale === 'de' ? 'Erbrachte Leistungen' : 'Services Provided',
        itemListElement: project.services.map((s: ServiceItem, idx: number) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.service,
          },
          position: idx + 1,
        })),
      },
    }),
  }

  // 4. HowTo Schema for Solution Points
  const howToSchema = project.solutionPoints && project.solutionPoints.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `https://goldenwing.at/projekte/${slug}#howto`,
    name: {
      de: `Wie wir ${project.client} bei ${getCategoryLabel(project.category)} unterstützt haben`,
      en: `How we helped ${project.client} with ${getCategoryLabel(project.category)}`,
      ru: `Как мы помогли ${project.client} с ${getCategoryLabel(project.category)}`,
    }[locale] || `How we helped ${project.client} with ${getCategoryLabel(project.category)}`,
    description: project.solution || project.description,
    totalTime: 'P3M',
    step: project.solutionPoints.map((point: SolutionPoint, idx: number) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: point.title,
      text: point.description || point.title,
      url: `${getSchemaUrl(`/projekte/${slug}`, locale)}#solution-step-${idx + 1}`,
    })),
  } : null

  // 5. ItemList Schema for Results/Metrics
  const resultsSchema = project.results && project.results.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `https://goldenwing.at/projekte/${slug}#results`,
    name: locale === 'de' ? 'Projektergebnisse' : 'Project Results',
    description: locale === 'de'
      ? `Messbare Ergebnisse aus dem ${getCategoryLabel(project.category)}-Projekt für ${project.client}`
      : `Measurable results from the ${getCategoryLabel(project.category)} project for ${project.client}`,
    numberOfItems: project.results.length,
    itemListElement: project.results.map((result: { metric: string; label: string }, idx: number) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `${getSchemaUrl(`/projekte/${slug}`, locale)}#result-${idx + 1}`,
      name: result.label,
      description: `${result.metric} - ${result.label}`,
    })),
  } : null

  // 6. Review Schema for client testimonial (SEO Rich Snippets)
  // Note: itemReviewed must be LocalBusiness/Organization/Product - NOT Service (invalid for Google)
  const reviewSchema = project.clientFeedback?.quote ? {
    '@context': 'https://schema.org',
    '@type': 'Review',
    '@id': `https://goldenwing.at/projekte/${slug}#review`,
    itemReviewed: {
      '@type': 'LocalBusiness',
      '@id': 'https://goldenwing.at/#organization',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Czeikestrasse 4/21',
        addressLocality: 'Wien',
        postalCode: '1100',
        addressCountry: 'AT',
      },
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: 5,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      '@type': 'Person',
      name: project.clientFeedback.author || project.client,
      ...(project.clientFeedback.role && { jobTitle: project.clientFeedback.role }),
      worksFor: {
        '@type': 'Organization',
        name: project.client,
      },
    },
    reviewBody: project.clientFeedback.quote,
    datePublished: project.year ? `${project.year}-06-01` : '2024-01-01',
    publisher: {
      '@type': 'Organization',
      name: project.client,
    },
  } : null

  // 7. FAQPage Schema (if we have challenge/solution)
  const faqSchema = project.challenge && project.solution ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `https://goldenwing.at/projekte/${slug}#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: {
          de: `Was war die Herausforderung bei ${project.client}?`,
          en: `What was the challenge at ${project.client}?`,
          ru: `Какая была задача у ${project.client}?`,
        }[locale] || `What was the challenge at ${project.client}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: project.challenge,
        },
      },
      {
        '@type': 'Question',
        name: {
          de: `Wie hat GoldenWing das Problem gelöst?`,
          en: `How did GoldenWing solve the problem?`,
          ru: `Как GoldenWing решил проблему?`,
        }[locale] || `How did GoldenWing solve the problem?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: project.solution,
        },
      },
      ...(project.results && project.results.length > 0 ? [{
        '@type': 'Question',
        name: {
          de: `Welche Ergebnisse wurden erzielt?`,
          en: `What results were achieved?`,
          ru: `Какие результаты были достигнуты?`,
        }[locale] || `What results were achieved?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: project.results.map((r: { metric: string; label: string }) => `${r.metric} ${r.label}`).join(', '),
        },
      }] : []),
    ],
  } : null

  // 8. CreativeWork Schema (Project as creative output)
  const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': getSchemaUrl(`/projekte/${slug}#creativework`, locale),
    name: project.title,
    description: project.description,
    url: getSchemaUrl(`/projekte/${slug}`, locale),
    dateCreated: project.year ? `${project.year}-01-01` : '2024-01-01',
    creator: {
      '@type': 'Organization',
      '@id': 'https://goldenwing.at/#organization',
      name: 'GoldenWing Creative Studios',
    },
    ...(project.client && {
      about: {
        '@type': 'Organization',
        name: project.client,
      },
    }),
    genre: getCategoryLabel(project.category),
    ...(project.mainImage && typeof project.mainImage === 'object' && project.mainImage.url && {
      image: getMediaUrl(project.mainImage.url, true),
    }),
  }

  const referencesLabels: Record<string, string> = { de: 'Referenzen', en: 'References', ru: 'Референции' }

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: getSchemaUrl('/', locale) },
      { '@type': 'ListItem', position: 2, name: referencesLabels[locale] || referencesLabels.en, item: getSchemaUrl('/referenzen', locale) },
      { '@type': 'ListItem', position: 3, name: project.title, item: getSchemaUrl(`/projekte/${slug}`, locale) },
    ],
  }

  // Get tools for this category
  const _tools = categoryTools[project.category] || categoryTools['branding']

  // Build table of contents items based on available content
  const tocLabels = {
    about: { de: `Über ${project.client}`, en: `About ${project.client}`, ru: `О ${project.client}` },
    challenge: { de: 'Herausforderung', en: 'Challenge', ru: 'Задача' },
    solution: { de: 'Lösung', en: 'Solution', ru: 'Решение' },
    details: { de: 'Projektdetails', en: 'Project Details', ru: 'Детали проекта' },
    gallery: { de: 'Galerie', en: 'Gallery', ru: 'Галерея' },
    feedback: { de: 'Kundenfeedback', en: 'Client Feedback', ru: 'Отзыв клиента' },
    services: { de: 'Verwandte Leistungen', en: 'Related Services', ru: 'Связанные услуги' },
  }
  const tocItems = [
    ...(project.companyDescription ? [{ id: 'unternehmen', label: tocLabels.about[locale as 'de' | 'en' | 'ru'] || tocLabels.about.en }] : []),
    ...(project.challenge ? [{ id: 'herausforderung', label: tocLabels.challenge[locale as 'de' | 'en' | 'ru'] || tocLabels.challenge.en }] : []),
    ...((project.solution || (project.solutionPoints && project.solutionPoints.length > 0)) ? [{ id: 'loesung', label: tocLabels.solution[locale as 'de' | 'en' | 'ru'] || tocLabels.solution.en }] : []),
    ...(project.longDescription ? [{ id: 'details', label: tocLabels.details[locale as 'de' | 'en' | 'ru'] || tocLabels.details.en }] : []),
    ...(project.gallery && project.gallery.length > 0 ? [{ id: 'galerie', label: tocLabels.gallery[locale as 'de' | 'en' | 'ru'] || tocLabels.gallery.en }] : []),
    ...(project.clientFeedback?.quote ? [{ id: 'feedback', label: tocLabels.feedback[locale as 'de' | 'en' | 'ru'] || tocLabels.feedback.en }] : []),
    { id: 'leistungen', label: tocLabels.services[locale as 'de' | 'en' | 'ru'] || tocLabels.services.en },
  ]

  return (
    <>
      {/* Enhanced Schema Markup */}
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbData} />
      <JsonLd data={serviceSchema} />
      {clientOrganizationSchema && <JsonLd data={clientOrganizationSchema} />}
      {howToSchema && <JsonLd data={howToSchema} />}
      {resultsSchema && <JsonLd data={resultsSchema} />}
      {reviewSchema && <JsonLd data={reviewSchema} />}
      {faqSchema && <JsonLd data={faqSchema} />}
      <JsonLd data={creativeWorkSchema} />

      {/* Hero Section - Full Width with Main Image */}
      <Section padding="lg" containerVariant="block">
        {/* Breadcrumb */}
        <Link
          href="/referenzen"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          {{ de: 'Alle Referenzen', en: 'All References', ru: 'Все референции' }[locale] || 'All References'}
        </Link>

        {/* Hero Content */}
        <div className="mb-8">
          <Badge className="mb-4">{getCategoryLabel(project.category)}</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Main Image - Full Width */}
        <div className={`aspect-[21/9] bg-gradient-to-br ${getColorForCategory(project.category)} rounded-2xl relative overflow-hidden shadow-lg`}>
          {project.mainImage && typeof project.mainImage === 'object' && project.mainImage.url ? (
            <Image
              src={decodeURIComponent(project.mainImage.url)}
              alt={project.mainImage.alt || project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              quality={85}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <CategoryIcon category={project.category} size="lg" />
            </div>
          )}
        </div>

        {/* Results - Inline below image (only show metrics containing numbers) */}
        {project.results && project.results.filter((r: { metric: string }) => /\d/.test(r.metric)).length > 0 && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.results.filter((r: { metric: string }) => /\d/.test(r.metric)).map((result: { metric: string; label: string }, idx: number) => (
              <div key={idx} id={`result-${idx + 1}`} className="bg-card rounded-xl border p-4 md:p-6 text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  {result.metric}
                </div>
                <div className="text-muted-foreground text-xs md:text-sm">{result.label}</div>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Mobile Navigation - Horizontal Scroll */}
      <div className="lg:hidden border-b bg-background/95 backdrop-blur-sm sticky top-16 z-40">
        <div className="container px-4">
          {/* Quick Facts Row */}
          <div className="flex items-center gap-6 py-3 border-b text-sm">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{project.client}</span>
            </div>
            {project.year && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{project.year}</span>
              </div>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary ml-auto"
              >
                <Globe className="h-4 w-4" />
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
          {/* Navigation Row */}
          {tocItems.length > 1 && (
            <nav className="flex gap-1 py-2 overflow-x-auto scrollbar-hide -mx-4 px-4" aria-label="Schnellnavigation">
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="shrink-0 px-3 py-1.5 text-sm rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <Section padding="none" containerVariant="block">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 py-8 md:py-12 lg:py-16">

          {/* Sticky Sidebar - Desktop Only */}
          <aside className="hidden lg:block lg:w-72 shrink-0">
            <div className="sticky top-24">
              {/* Project Quick Facts */}
              <div className="bg-card rounded-2xl border p-6 mb-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                  {{ de: 'Projektdetails', en: 'Project Details', ru: 'Детали проекта' }[locale] || 'Project Details'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">{t('client')}</span>
                    <p className="font-semibold">{project.client}</p>
                  </div>
                  {project.year && (
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">{t('year')}</span>
                      <p className="font-semibold">{project.year}</p>
                    </div>
                  )}
                  {project.industry && project.industry.length > 0 && (
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">
                        {{ de: 'Branche', en: 'Industry', ru: 'Отрасль' }[locale] || 'Industry'}
                      </span>
                      <p className="font-semibold text-sm">
                        {industryMapping[project.industry[0]]?.name || project.industry[0]}
                      </p>
                    </div>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Globe className="h-4 w-4" />
                      {locale === 'de' ? 'Website' : 'Website'}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Navigation */}
              {tocItems.length > 1 && (
                <nav className="bg-muted/50 rounded-2xl border p-6" aria-label="Inhaltsverzeichnis">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4 flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    {{ de: 'Inhalt', en: 'Contents', ru: 'Содержание' }[locale] || 'Contents'}
                  </h3>
                  <div className="space-y-1">
                    {tocItems.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block px-3 py-2 text-sm rounded-lg hover:bg-background hover:text-primary transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </nav>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* About the Client - Beautiful Card */}
            {project.companyDescription && (
              <section id="unternehmen" className="mb-12 scroll-mt-24">
                <div className="bg-gradient-to-br from-primary/5 via-background to-background rounded-3xl border overflow-hidden">
                  <div className="p-8 md:p-10">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-1">
                          {{ de: `Über ${project.client}`, en: `About ${project.client}`, ru: `О компании ${project.client}` }[locale] || `About ${project.client}`}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {{ de: 'Unser Kunde', en: 'Our Client', ru: 'Наш клиент' }[locale] || 'Our Client'}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg leading-relaxed text-foreground/90">
                      {project.companyDescription}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Challenge - Prominent */}
            {project.challenge && (
              <section id="herausforderung" className="mb-12 scroll-mt-24">
                <div className="flex items-start gap-4 mb-6">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">{t('challenge')}</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {{ de: 'Die Ausgangssituation', en: 'The Starting Point', ru: 'Исходная ситуация' }[locale] || 'The Starting Point'}
                    </p>
                  </div>
                </div>
                <div className="bg-orange-50 dark:bg-orange-950/20 rounded-2xl p-6 md:p-8 border border-orange-200/50 dark:border-orange-800/30">
                  <p className="text-lg leading-relaxed text-foreground/90">
                    {project.challenge}
                  </p>
                </div>
              </section>
            )}

            {/* Solution - Detailed */}
            {(project.solution || (project.solutionPoints && project.solutionPoints.length > 0)) && (
              <section id="loesung" className="mb-12 scroll-mt-24">
                <div className="flex items-start gap-4 mb-6">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">{t('solution')}</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {{ de: 'Unser Ansatz', en: 'Our Approach', ru: 'Наш подход' }[locale] || 'Our Approach'}
                    </p>
                  </div>
                </div>

                {project.solution && (
                  <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                    {project.solution}
                  </p>
                )}

                {project.solutionPoints && project.solutionPoints.length > 0 && (
                  <div className="space-y-4">
                    {project.solutionPoints.map((point: SolutionPoint, idx: number) => (
                      <div
                        key={point.id || idx}
                        id={`solution-step-${idx + 1}`}
                        className="bg-card rounded-xl border p-5 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-4">
                          <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-sm font-bold text-emerald-600 dark:text-emerald-400">
                            {idx + 1}
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">{point.title}</h3>
                            {point.description && (
                              <p className="text-sm text-muted-foreground">{point.description}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Services Tags */}
                {project.services && project.services.length > 0 && (
                  <div className="mt-8 p-6 bg-muted/50 rounded-xl">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                      {t('ourServices')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((serviceItem: ServiceItem, idx: number) => (
                        <span key={serviceItem.id || idx} className="inline-flex items-center gap-2 px-3 py-1.5 bg-background rounded-full text-sm border">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          {serviceItem.service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Long Description - Detailed Project Content */}
            {project.longDescription && (
              <section id="details" className="mb-12 scroll-mt-24">
                <div className="flex items-start gap-4 mb-6">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">
                      {{ de: 'Projektdetails', en: 'Project Details', ru: 'Детали проекта' }[locale] || 'Project Details'}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {{ de: 'Ausführliche Beschreibung', en: 'Detailed Description', ru: 'Подробное описание' }[locale] || 'Detailed Description'}
                    </p>
                  </div>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-foreground/90 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-ul:text-foreground/90 prose-ol:text-foreground/90 prose-li:marker:text-primary">
                  <RichText
                    content={project.longDescription as LexicalContent}
                    className="[&>p]:mb-6 [&>h2]:text-2xl [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:mt-8 [&>h3]:mb-3 [&>ul]:my-6 [&>ol]:my-6 [&>blockquote]:my-8 [&>blockquote]:border-l-primary/50 [&>blockquote]:bg-muted/30 [&>blockquote]:rounded-r-lg [&>blockquote]:py-4 [&>blockquote]:pr-4"
                  />
                </div>
              </section>
            )}

            {/* Project Gallery */}
            {project.gallery && Array.isArray(project.gallery) && project.gallery.length > 0 && (
              <section id="galerie" className="mb-12 scroll-mt-24">
                <div className="flex items-start gap-4 mb-6">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Layers className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">
                      {{ de: 'Projektgalerie', en: 'Project Gallery', ru: 'Галерея проекта' }[locale] || 'Project Gallery'}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {{ de: 'Eindrücke aus dem Projekt', en: 'Project Impressions', ru: 'Впечатления от проекта' }[locale] || 'Project Impressions'}
                    </p>
                  </div>
                </div>
                <ProjectGallery
                  images={project.gallery
                    .filter((item: GalleryItem) => item.image?.url)
                    .map((item: GalleryItem) => ({
                      id: item.id,
                      url: item.image!.url!,
                      alt: item.image?.alt,
                      caption: item.caption,
                    }))}
                  projectTitle={project.title}
                />
              </section>
            )}

            {/* Client Testimonial */}
            {project.clientFeedback?.quote && (
              <section id="feedback" className="mb-12 scroll-mt-24">
                <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-3xl border p-8 md:p-10">
                  <Quote className="h-10 w-10 text-primary/30 mb-6" />
                  <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-6 font-medium">
                    &ldquo;{project.clientFeedback.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">
                        {project.client?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      {project.clientFeedback.author && (
                        <p className="font-semibold text-foreground">{project.clientFeedback.author}</p>
                      )}
                      {project.clientFeedback.role && (
                        <p className="text-sm text-muted-foreground">{project.clientFeedback.role}, {project.client}</p>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Related Services */}
            <section id="leistungen" className="scroll-mt-24">
              <div className="flex items-start gap-4 mb-6">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {{ de: 'Verwandte Leistungen', en: 'Related Services', ru: 'Связанные услуги' }[locale] || 'Related Services'}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {{ de: 'Mehr über unsere Expertise', en: 'More About Our Expertise', ru: 'Подробнее о нашей экспертизе' }[locale] || 'More About Our Expertise'}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={{ pathname: '/leistungen/[slug]', params: { slug: locale === 'en' ? translateServiceSlugToEn(categoryToServiceSlug[project.category] || project.category) : (categoryToServiceSlug[project.category] || project.category) } }}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all group font-medium"
                >
                  {getCategoryLabel(project.category)}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                {project.category === 'branding' && (
                  <Link href="/leistungen/webdesign" className="inline-flex items-center gap-2 px-5 py-3 bg-card rounded-xl border hover:border-primary/50 transition-all font-medium group">
                    {locale === 'de' ? 'Webdesign' : 'Web Design'}
                    <ArrowRight className="h-4 w-4 opacity-50 group-hover:opacity-100" />
                  </Link>
                )}
                {project.category === 'webdesign' && (
                  <Link href="/leistungen/seo-content" className="inline-flex items-center gap-2 px-5 py-3 bg-card rounded-xl border hover:border-primary/50 transition-all font-medium group">
                    SEO & Content
                    <ArrowRight className="h-4 w-4 opacity-50 group-hover:opacity-100" />
                  </Link>
                )}
                {project.category === 'seo' && (
                  <Link href="/leistungen/digital-marketing" className="inline-flex items-center gap-2 px-5 py-3 bg-card rounded-xl border hover:border-primary/50 transition-all font-medium group">
                    Digital Marketing
                    <ArrowRight className="h-4 w-4 opacity-50 group-hover:opacity-100" />
                  </Link>
                )}
                {(project.category === 'software' || project.category === 'entwicklung') && (
                  <Link href="/leistungen/it-cloud-services" className="inline-flex items-center gap-2 px-5 py-3 bg-card rounded-xl border hover:border-primary/50 transition-all font-medium group">
                    IT & Cloud Services
                    <ArrowRight className="h-4 w-4 opacity-50 group-hover:opacity-100" />
                  </Link>
                )}
                {(project.category === 'marketing' || project.category === 'strategie' || project.category === 'content') && (
                  <Link href="/leistungen/seo-content" className="inline-flex items-center gap-2 px-5 py-3 bg-card rounded-xl border hover:border-primary/50 transition-all font-medium group">
                    SEO & Content
                    <ArrowRight className="h-4 w-4 opacity-50 group-hover:opacity-100" />
                  </Link>
                )}
              </div>
            </section>
          </main>
        </div>
      </Section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <Section padding="lg" containerVariant="block">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            {{ de: 'Ähnliche Projekte', en: 'Related Projects', ru: 'Похожие проекты' }[locale] || 'Related Projects'}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProjects.map((relProject) => {
              // Apply Russian translations to related projects
              const relTitle = locale === 'ru'
                ? (getProjectTranslationRu(relProject.slug)?.title || relProject.title)
                : relProject.title
              return (
              <Link
                key={relProject.id}
                href={{ pathname: '/projekte/[slug]', params: { slug: relProject.slug } }}
                className="group"
              >
                <div className="bg-card rounded-2xl border overflow-hidden hover:shadow-lg transition-all">
                  <div className={`aspect-video bg-gradient-to-br ${getColorForCategory(project.category)} relative overflow-hidden`}>
                    {relProject.mainImage && typeof relProject.mainImage === 'object' && relProject.mainImage.url ? (
                      <Image
                        src={decodeURIComponent(relProject.mainImage.url)}
                        alt={relProject.mainImage.alt || relTitle}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                        quality={80}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <CategoryIcon category={project.category} />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">{relProject.client}</p>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {relTitle}
                    </h3>
                  </div>
                </div>
              </Link>
            )})}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/referenzen"
              className="inline-flex items-center text-primary font-medium hover:underline"
            >
              {{ de: 'Alle Referenzen ansehen', en: 'View all references', ru: 'Посмотреть все референции' }[locale] || 'View all references'}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </Section>
      )}

      {/* Related Service Link */}
      {relatedService && (
        <Section background="muted" padding="md" containerVariant="block">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {{ de: 'Mehr über unsere Leistungen', en: 'More about our services', ru: 'Подробнее о наших услугах' }[locale] || 'More about our services'}
              </p>
              <h3 className="text-xl font-semibold">
                {{ de: `Erfahren Sie mehr über ${getCategoryLabel(project.category)}`, en: `Learn more about ${getCategoryLabel(project.category)}`, ru: `Узнайте больше о ${getCategoryLabel(project.category)}` }[locale] || `Learn more about ${getCategoryLabel(project.category)}`}
              </h3>
            </div>
            <Button asChild>
              <Link href={{ pathname: '/leistungen/[slug]', params: { slug: locale === 'en' ? translateServiceSlugToEn(categoryToServiceSlug[project.category] || project.category) : (categoryToServiceSlug[project.category] || project.category) } }}>
                {getCategoryLabel(project.category)}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Section>
      )}

      {/* Related Lexikon Terms - Topical Authority Building */}
      {(() => {
        const relatedTerms = getRelevantLexikonTerms(project.category, 5)
        if (relatedTerms.length === 0) return null
        return (
          <Section padding="md" containerVariant="block" className="border-t">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">
                {{ de: 'Verwandte Begriffe im Lexikon', en: 'Related Glossary Terms', ru: 'Связанные термины в глоссарии' }[locale] || 'Related Glossary Terms'}
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {relatedTerms.map(term => (
                <Link
                  key={term.slug}
                  href={{ pathname: '/lexikon/[slug]', params: { slug: term.slug } }}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-muted hover:bg-muted/80 text-sm font-medium transition-colors group"
                >
                  {locale === 'de' ? term.de.term : term.en.term}
                  <ArrowRight className="ml-2 h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {{ de: 'Erfahren Sie mehr über die Fachbegriffe in unserem ', en: 'Learn more about industry terms in our ', ru: 'Узнайте больше о терминах в нашем ' }[locale] || 'Learn more about industry terms in our '}
              <Link href="/lexikon" className="text-primary hover:underline">
                {{ de: 'Marketing-Lexikon', en: 'Marketing Glossary', ru: 'Маркетинговом глоссарии' }[locale] || 'Marketing Glossary'}
              </Link>
            </p>
          </Section>
        )
      })()}

      {/* CTA */}
      <Section background="primary" padding="lg" containerVariant="block" className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t('similarProjectTitle')}
        </h2>
        <p className="text-lg opacity-90 mb-8">
          {t('similarProjectDescription')}
        </p>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/kontakt">
            {t('ctaButton')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </Section>
    </>
  )
}
