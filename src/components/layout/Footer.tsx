import Link from 'next/link'
import type { Dictionary } from '@/i18n/getDictionary'

interface FooterProps {
  locale: string
  t: Dictionary
  footerData?: any | null
  siteSettings?: any | null
}

const currentYear = new Date().getFullYear()

export function Footer({ locale, t, footerData, siteSettings }: FooterProps) {
  const cmsColumns = footerData?.columns as any[] | undefined
  const cmsLegalLinks = footerData?.legalLinks as any[] | undefined
  const cmsCopyright = footerData?.copyright as string | undefined

  const contactEmail = (siteSettings?.contact?.email as string) || 'office@goldenwing.at'
  const contactPhone = siteSettings?.contact?.phone as string | undefined
  const contactAddress = (siteSettings?.contact?.address as string) || t.contact.locationAddress
  const social = siteSettings?.social as { instagram?: string; linkedin?: string; facebook?: string } | undefined

  return (
    <footer className="border-border bg-muted/50 border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 xl:grid-cols-5">
          {/* Col 1: Brand + Social + Contact */}
          <div className="col-span-2 space-y-4 md:col-span-3 xl:col-span-1">
            <Link href={`/${locale}`} className="inline-block text-xl font-bold tracking-tight">
              <span className="text-primary">Golden</span>
              <span className="text-foreground">Wing</span>
            </Link>
            <p className="text-muted-foreground text-sm">{t.footer.agency}</p>

            {/* Contact info */}
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <a href={`mailto:${contactEmail}`} className="hover:text-foreground transition-colors">
                  {contactEmail}
                </a>
              </li>
              {contactPhone && (
                <li className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                  <a href={`tel:${contactPhone}`} className="hover:text-foreground transition-colors">
                    {contactPhone}
                  </a>
                </li>
              )}
              <li className="flex items-start gap-2">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span>{contactAddress}</span>
              </li>
            </ul>

            {/* Social Icons */}
            {social && (social.linkedin || social.instagram || social.facebook) && (
              <div className="flex gap-3 pt-1">
                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
                {social.instagram && (
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                )}
                {social.facebook && (
                  <a
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* CMS columns or dictionary fallback */}
          {cmsColumns && cmsColumns.length > 0 ? (
            cmsColumns.map((column: any, i: number) => (
              <div key={i}>
                <h3 className="text-foreground mb-4 text-sm font-semibold tracking-wider uppercase">
                  {column.heading as string}
                </h3>
                <ul className="space-y-2.5 text-sm">
                  {((column.links as any[]) || []).map((link: any, j: number) => (
                    <li key={j}>
                      {link.newTab ? (
                        <a
                          href={link.link as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {link.label as string}
                        </a>
                      ) : (
                        <Link
                          href={link.link as string}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {link.label as string}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <>
              {/* Col 2: Services */}
              <div>
                <h3 className="text-foreground mb-4 text-sm font-semibold tracking-wider uppercase">
                  {t.footer.services}
                </h3>
                <ul className="space-y-2.5 text-sm">
                  <li>
                    <Link
                      href={`/${locale}/leistungen/webdesign`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t.footer.webDev}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/leistungen/seo`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t.footer.seo}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/leistungen/branding`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t.footer.branding}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/leistungen/marketing`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t.footer.marketing}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Col 3: Company */}
              <div>
                <h3 className="text-foreground mb-4 text-sm font-semibold tracking-wider uppercase">
                  {t.footer.company}
                </h3>
                <ul className="space-y-2.5 text-sm">
                  <li>
                    <Link
                      href={`/${locale}/ueber-uns`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t.nav.about}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/referenzen`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t.nav.referenzen}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/blog`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t.nav.blog || 'Blog'}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/glossar`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t.nav.glossar || 'Glossar'}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/kontakt`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t.nav.contact}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Col 4: Locations */}
              <div>
                <h3 className="text-foreground mb-4 text-sm font-semibold tracking-wider uppercase">
                  {t.contact.location}
                </h3>
                <ul className="text-muted-foreground space-y-2.5 text-sm">
                  <li className="flex items-center gap-2">
                    <span>🇦🇹</span> Wien
                  </li>
                  <li className="flex items-center gap-2">
                    <span>🇦🇪</span> Dubai
                  </li>
                  <li className="flex items-center gap-2">
                    <span>🇺🇸</span> Roseville, CA
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Bottom */}
        <div className="border-border mt-12 flex flex-col items-center justify-between border-t pt-6 text-sm sm:flex-row">
          <p className="text-muted-foreground">
            {cmsCopyright
              ? cmsCopyright.replace('{year}', String(currentYear))
              : `\u00A9 ${currentYear} GoldenWing Creative Studios. ${t.footer.allRights}`}
          </p>
          <div className="mt-4 flex gap-6 sm:mt-0">
            {cmsLegalLinks && cmsLegalLinks.length > 0 ? (
              cmsLegalLinks.map((link: any, i: number) => (
                <Link
                  key={i}
                  href={link.link as string}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label as string}
                </Link>
              ))
            ) : (
              <>
                <Link
                  href={`/${locale}/impressum`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.nav.impressum}
                </Link>
                <Link
                  href={`/${locale}/datenschutz`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.nav.datenschutz}
                </Link>
                <Link href={`/${locale}/agb`} className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.nav.agb}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
