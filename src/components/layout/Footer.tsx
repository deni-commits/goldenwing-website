import Link from 'next/link'

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-dark text-gray-300">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-bold text-white">
              GoldenWing
            </Link>
            <p className="mt-4 text-sm">
              Marketing- und Branding-Agentur aus Wien.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="hover:text-gold-400">Web Development</Link></li>
              <li><Link href="/services" className="hover:text-gold-400">SEO</Link></li>
              <li><Link href="/services" className="hover:text-gold-400">Branding</Link></li>
              <li><Link href="/services" className="hover:text-gold-400">Marketing</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Unternehmen
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/ueber-uns" className="hover:text-gold-400">Ueber uns</Link></li>
              <li><Link href="/referenzen" className="hover:text-gold-400">Referenzen</Link></li>
              <li><Link href="/blog" className="hover:text-gold-400">Blog</Link></li>
              <li><Link href="/kontakt" className="hover:text-gold-400">Kontakt</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Kontakt
            </h3>
            <ul className="space-y-2 text-sm">
              <li>Wien, Oesterreich</li>
              <li>
                <a href="mailto:office@goldenwing.at" className="hover:text-gold-400">
                  office@goldenwing.at
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-800 pt-8 text-sm md:flex-row">
          <p>&copy; {currentYear} GoldenWing Creative Studios. Alle Rechte vorbehalten.</p>
          <div className="mt-4 flex gap-6 md:mt-0">
            <Link href="/impressum" className="hover:text-gold-400">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-gold-400">Datenschutz</Link>
            <Link href="/agb" className="hover:text-gold-400">AGB</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
