import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  display: 'swap',
  variable: '--font-sans',
})

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const locale = headersList.get('x-locale') || 'de'

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body className="bg-white text-dark antialiased">{children}</body>
    </html>
  )
}
