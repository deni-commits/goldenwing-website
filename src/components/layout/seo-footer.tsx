import Link from 'next/link'

const footerLinks = {
  leistungen: {
    title: 'Leistungen',
    links: [
      { text: 'Webdesign Wien', href: '/leistungen/webdesign' },
      { text: 'SEO & Content', href: '/leistungen/seo-content' },
      { text: 'Digital Marketing', href: '/leistungen/digital-marketing' },
      { text: 'Branding & Design', href: '/leistungen/branding' },
      { text: 'Google Ads Agentur', href: '/leistungen/google-ads-agentur' },
      { text: 'Social Media Agentur', href: '/leistungen/social-media-agentur' },
    ],
  },
  standorte: {
    title: 'Standorte',
    links: [
      { text: 'Digitalagentur Wien', href: '/standorte/wien' },
      { text: 'Webdesign Graz', href: '/standorte/graz' },
      { text: 'SEO Agentur Linz', href: '/standorte/linz' },
      { text: 'Werbeagentur Salzburg', href: '/standorte/salzburg' },
      { text: 'Agentur Innsbruck', href: '/standorte/innsbruck' },
      { text: 'Webdesign München', href: '/standorte/muenchen' },
      { text: 'Agentur Berlin', href: '/standorte/berlin' },
      { text: 'Webdesign Zürich', href: '/standorte/zuerich' },
    ],
  },
  vergleiche: {
    title: 'Vergleiche',
    links: [
      { text: 'Alle Vergleiche', href: '/vergleiche' },
      { text: 'Beste SEO Agenturen Wien', href: '/beste-seo-agenturen-wien' },
      { text: 'Beste Webdesign Agenturen', href: '/beste-webdesign-agenturen-wien' },
      { text: 'Top Kreativagenturen Wien', href: '/beste-kreativagenturen-wien' },
      { text: 'Google Ads Agenturen', href: '/beste-google-ads-agenturen-wien' },
    ],
  },
  ressourcen: {
    title: 'Ressourcen',
    links: [
      { text: 'Blog', href: '/blog' },
      { text: 'SEO Lexikon', href: '/lexikon' },
      { text: 'Kostenlose Tools', href: '/tools' },
      { text: 'Über uns', href: '/ueber-uns' },
      { text: 'Kontakt', href: '/kontakt' },
    ],
  },
}

export function SEOFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Leistungen */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              {footerLinks.leistungen.title}
            </h3>
            <ul className="space-y-2">
              {footerLinks.leistungen.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Standorte */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              {footerLinks.standorte.title}
            </h3>
            <ul className="space-y-2">
              {footerLinks.standorte.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vergleiche */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              {footerLinks.vergleiche.title}
            </h3>
            <ul className="space-y-2">
              {footerLinks.vergleiche.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressourcen */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              {footerLinks.ressourcen.title}
            </h3>
            <ul className="space-y-2">
              {footerLinks.ressourcen.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} GoldenWing Creative Studios · Wien · Dubai
            </p>

            {/* Legal Links */}
            <div className="flex gap-6">
              <Link
                href="/impressum"
                className="text-slate-500 hover:text-white transition-colors text-sm"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="text-slate-500 hover:text-white transition-colors text-sm"
              >
                Datenschutz
              </Link>
              <Link
                href="/agb"
                className="text-slate-500 hover:text-white transition-colors text-sm"
              >
                AGB
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SEOFooter
