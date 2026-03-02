import { NextResponse } from 'next/server'

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenwing.at'

  const content = `# GoldenWing Creative Studios

> Full-service marketing, branding, and web development agency based in Vienna, Austria.

## About
GoldenWing Creative Studios is a Vienna-based agency specializing in web development, SEO, branding, and digital marketing. We help businesses build strong digital presences with modern technology and creative strategy.

## Services
- Web Development (WordPress, Shopify, Custom Web Apps)
- Search Engine Optimization (Technical SEO, Local SEO, Content SEO)
- Branding & Corporate Identity
- Digital Marketing & Campaigns
- UI/UX Design

## Languages
- German (primary)
- English
- Russian

## Location
Vienna, Austria (serving DACH region and international clients)

## Contact
- Website: ${siteUrl}
- Email: office@goldenwing.at

## Key Pages
- Homepage: ${siteUrl}/de
- Services: ${siteUrl}/de/services
- Portfolio: ${siteUrl}/de/referenzen
- Blog: ${siteUrl}/de/blog
- Contact: ${siteUrl}/de/kontakt
- About: ${siteUrl}/de/ueber-uns

## Technology
Built with Next.js 15, Payload CMS v3, TypeScript, and Tailwind CSS.
Content managed via headless CMS with on-demand ISR revalidation.
`

  return new NextResponse(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
