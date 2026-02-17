import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'GoldenWing Creative Studios - Branding & Webdesign Agentur'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        {/* Logo Text */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#D4A574',
              letterSpacing: '-2px',
              marginBottom: '8px',
            }}
          >
            GOLDEN
          </div>
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#ffffff',
              letterSpacing: '-2px',
            }}
          >
            WING
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '28px',
            color: '#9ca3af',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          Internationale Kreativagentur für Branding, Webdesign und digitales Marketing
        </div>

        {/* Locations */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
            marginTop: '40px',
          }}
        >
          {['Wien', 'Dubai', 'California'].map((city) => (
            <div
              key={city}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#D4A574',
                }}
              />
              <span
                style={{
                  fontSize: '20px',
                  color: '#ffffff',
                }}
              >
                {city}
              </span>
            </div>
          ))}
        </div>

        {/* Website URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: '18px',
            color: '#6b7280',
          }}
        >
          goldenwing.at
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
