import Link from 'next/link'

interface FooterProps {
  locale: string
}

const currentYear = new Date().getFullYear()

export function Footer({ locale }: FooterProps) {
  const t = locale === 'de'
    ? { services: 'Leistungen', company: 'Unternehmen', contact: 'Kontakt', about: 'Ueber uns', referenzen: 'Referenzen', impressum: 'Impressum', datenschutz: 'Datenschutz', agb: 'AGB', allRights: 'Alle Rechte vorbehalten.', agency: 'Marketing- und Branding-Agentur aus Wien.' }
    : locale === 'ru'
    ? { services: 'Услуги', company: 'Компания', contact: 'Контакт', about: 'О нас', referenzen: 'Портфолио', impressum: 'Импрессум', datenschutz: 'Защита данных', agb: 'Условия', allRights: 'Все права защищены.', agency: 'Маркетинговое и брендинговое агентство из Вены.' }
    : { services: 'Services', company: 'Company', contact: 'Contact', about: 'About Us', referenzen: 'Portfolio', impressum: 'Legal Notice', datenschutz: 'Privacy Policy', agb: 'Terms', allRights: 'All rights reserved.', agency: 'Marketing and branding agency from Vienna.' }

  return (
    <footer className="border-t border-gray-100 bg-dark text-gray-300">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href={`/${locale}`} className="text-xl font-bold text-white">
              GoldenWing
            </Link>
            <p className="mt-4 text-sm">{t.agency}</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {t.services}
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/services`} className="hover:text-gold-400">Web Development</Link></li>
              <li><Link href={`/${locale}/services`} className="hover:text-gold-400">SEO</Link></li>
              <li><Link href={`/${locale}/services`} className="hover:text-gold-400">Branding</Link></li>
              <li><Link href={`/${locale}/services`} className="hover:text-gold-400">Marketing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {t.company}
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/ueber-uns`} className="hover:text-gold-400">{t.about}</Link></li>
              <li><Link href={`/${locale}/referenzen`} className="hover:text-gold-400">{t.referenzen}</Link></li>
              <li><Link href={`/${locale}/blog`} className="hover:text-gold-400">Blog</Link></li>
              <li><Link href={`/${locale}/kontakt`} className="hover:text-gold-400">{t.contact}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {t.contact}
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
          <p>&copy; {currentYear} GoldenWing Creative Studios. {t.allRights}</p>
          <div className="mt-4 flex gap-6 md:mt-0">
            <Link href={`/${locale}/impressum`} className="hover:text-gold-400">{t.impressum}</Link>
            <Link href={`/${locale}/datenschutz`} className="hover:text-gold-400">{t.datenschutz}</Link>
            <Link href={`/${locale}/agb`} className="hover:text-gold-400">{t.agb}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
