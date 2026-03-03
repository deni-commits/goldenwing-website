import { ImageResponse } from 'next/og'
import { getPayload } from '@/lib/payload'

export const runtime = 'nodejs'
export const alt = 'GoldenWing Creative Studios — Service'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params

  let title = slug
  let subtitle = ''

  try {
    const payload = await getPayload()
    const data = await payload.find({ collection: 'services', locale, where: { slug: { equals: slug } }, limit: 1 })
    const service = data.docs[0] as any | undefined
    if (service) {
      title = service.title as string
      subtitle = (service.excerpt as string) || ''
    }
  } catch {}

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 80px',
        }}
      >
        <div style={{ fontSize: 24, color: '#D4A853', marginBottom: 16, letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>
          GoldenWing Creative Studios
        </div>
        <div style={{ fontSize: 56, fontWeight: 800, color: '#ffffff', lineHeight: 1.15, marginBottom: 20, maxWidth: 900 }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: 22, color: '#ffffff', opacity: 0.75, maxWidth: 800, lineHeight: 1.4 }}>
            {subtitle.length > 120 ? subtitle.slice(0, 120) + '...' : subtitle}
          </div>
        )}
      </div>
    ),
    { ...size },
  )
}
