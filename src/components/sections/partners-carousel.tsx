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
  title = 'Vertrauen von führenden Unternehmen',
  subtitle = 'Wir arbeiten mit Marken, die höchste Ansprüche stellen',
  className,
  locale = "de"
}: PartnersCarouselProps) {
  const partners = await getPartners()

  const carouselPartners = partners.filter(
    (partner) => partner.showInCarousel !== false
  )

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

  const logos: Logo[] = carouselPartners.map((partner) => {
    const logoData = partner.logo as MediaImage | undefined

    return {
      id: String(partner.id),
      name: partner.name as string,
      image: logoData?.url || '',
      url: partner.website as string | undefined,
      row: '1' as const
    }
  }).filter(logo => logo.image)

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
