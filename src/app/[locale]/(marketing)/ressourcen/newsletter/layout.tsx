import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'

  if (locale === 'en') {
    return {
      title: 'Newsletter | Insights & Marketing Tips',
      description: 'Subscribe to the GoldenWing Newsletter and receive exclusive insights, practical tips and the latest trends from the world of digital marketing.',
      keywords: ['Newsletter', 'Marketing Newsletter', 'Digital Marketing Insights', 'Branding Tips', 'SEO Newsletter'],
      openGraph: {
        title: 'Newsletter | GoldenWing Creative Studios',
        description: 'Exclusive insights and practical tips straight to your inbox.',
        url: '/en/ressourcen/newsletter',
        type: 'website',
      },
      alternates: {
        canonical: '/en/ressourcen/newsletter',
      },
    }
  }

  return {
    title: 'Newsletter | Insights & Marketing Tipps',
    description: 'Abonnieren Sie den GoldenWing Newsletter und erhalten Sie exklusive Insights, praktische Tipps und die neuesten Trends aus der Welt des digitalen Marketings.',
    keywords: ['Newsletter', 'Marketing Newsletter', 'Digital Marketing Insights', 'Branding Tipps', 'SEO Newsletter'],
    openGraph: {
      title: 'Newsletter | GoldenWing Creative Studios',
      description: 'Exklusive Insights und praktische Tipps direkt in Ihr Postfach.',
      url: '/ressourcen/newsletter',
      type: 'website',
    },
    alternates: {
      canonical: '/ressourcen/newsletter',
    },
  }
}

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
