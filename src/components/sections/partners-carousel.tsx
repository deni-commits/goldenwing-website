import { getPartners } from '@/lib/payload'
import { LogoCarousel, Logo } from './logo-carousel'

interface MediaImage {
  url?: string
  alt?: string
  filename?: string
}

interface PartnersCarouselProps {
  title?: string
  subtitle?: string
  className?: string
  locale?: string
}

export async function PartnersCarousel({
  title = 'Technologien & Partner',
  subtitle = 'Wir arbeiten mit führenden Technologien und vertrauenswürdigen Partnern',
  className,
  locale = "de"
}: PartnersCarouselProps) {
  const partners = await getPartners()

  // Filter partners that should be shown in carousel
  const carouselPartners = partners.filter(
    (partner) => partner.showInCarousel !== false
  )

  // If no CMS partners, the LogoCarousel will use its default logos
  if (carouselPartners.length === 0) {
    return (
      <LogoCarousel
        title={title}
        subtitle={subtitle}
        className={className}
        locale={locale}
      />
    )
  }

  // Transform CMS partners to Logo format
  const logos: Logo[] = carouselPartners.map((partner) => {
    const logoData = partner.logo as MediaImage | undefined

    return {
      id: String(partner.id),
      name: partner.name as string,
      image: logoData?.url || '',
      url: partner.website as string | undefined,
      row: (partner.row === '3' ? '2' : partner.row as '1' | '2') || '1'
    }
  }).filter(logo => logo.image) // Only include partners with logos

  // If no logos with images, fall back to default
  if (logos.length === 0) {
    return (
      <LogoCarousel
        title={title}
        subtitle={subtitle}
        className={className}
        locale={locale}
      />
    )
  }

  return (
    <LogoCarousel
      title={title}
      subtitle={subtitle}
      logos={logos}
      className={className}
      locale={locale}
    />
  )
}
