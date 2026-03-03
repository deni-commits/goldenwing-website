import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'GoldenWing Creative Studios'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const titles: Record<string, string> = {
  de: 'Marketing & Branding Agentur Wien',
  en: 'Marketing & Branding Agency Vienna',
  ru: 'Маркетинговое агентство Вена',
}

export default async function OGImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#D4A853',
            marginBottom: 20,
            letterSpacing: '-0.02em',
          }}
        >
          GoldenWing
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#ffffff',
            opacity: 0.9,
            textAlign: 'center',
            maxWidth: 800,
          }}
        >
          {titles[locale] || titles.de}
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 18,
            color: '#D4A853',
            opacity: 0.7,
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
          }}
        >
          Creative Studios
        </div>
      </div>
    ),
    { ...size },
  )
}
