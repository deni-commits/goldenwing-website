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
  const contactAddress = (siteSettings?.contact?.address as string) || t.contact.locationAddress
  const social = siteSettings?.social as { instagram?: string; linkedin?: string; facebook?: string } | undefined

  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="container py-12 md:py-16">
        <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-4">
            <Link href={`/${locale}`} className="text-xl font-bold tracking-tight">
              <span className="text-primary">Golden</span><span className="text-foreground">Wing</span>
            </Link>
            <p className="text-sm text-muted-foreground">{t.footer.agency}</p>
            {social && (social.linkedin || social.instagram || social.facebook) && (
              <div className="flex gap-3">
                {social.linkedin && (
                  <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground transition-colors hover:text-foreground">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </a>
                )}
                {social.instagram && (
                  <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground transition-colors hover:text-foreground">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                  </a>
                )}
                {social.facebook && (
                  <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground transition-colors hover:text-foreground">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* CMS columns or dictionary fallback */}
          {cmsColumns && cmsColumns.length > 0 ? (
            cmsColumns.map((column: any, i: number) => (
              <div key={i}>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                  {column.heading as string}
                </h3>
                <ul className="space-y-2 text-sm">
                  {(column.links as any[] || []).map((link: any, j: number) => (
                    <li key={j}>
                      {link.newTab ? (
                        <a href={link.link as string} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
                          {link.label as string}
                        </a>
                      ) : (
                        <Link href={link.link as string} className="text-muted-foreground transition-colors hover:text-foreground">
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
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                  {t.footer.services}
                </h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href={`/${locale}/leistungen`} className="text-muted-foreground transition-colors hover:text-foreground">{t.footer.webDev}</Link></li>
                  <li><Link href={`/${locale}/leistungen`} className="text-muted-foreground transition-colors hover:text-foreground">{t.footer.seo}</Link></li>
                  <li><Link href={`/${locale}/leistungen`} className="text-muted-foreground transition-colors hover:text-foreground">{t.footer.branding}</Link></li>
                  <li><Link href={`/${locale}/leistungen`} className="text-muted-foreground transition-colors hover:text-foreground">{t.footer.marketing}</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                  {t.footer.company}
                </h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href={`/${locale}/ueber-uns`} className="text-muted-foreground transition-colors hover:text-foreground">{t.nav.about}</Link></li>
                  <li><Link href={`/${locale}/referenzen`} className="text-muted-foreground transition-colors hover:text-foreground">{t.nav.referenzen}</Link></li>
                  <li><Link href={`/${locale}/blog`} className="text-muted-foreground transition-colors hover:text-foreground">{t.nav.blog || 'Blog'}</Link></li>
                  <li><Link href={`/${locale}/kontakt`} className="text-muted-foreground transition-colors hover:text-foreground">{t.nav.contact}</Link></li>
                </ul>
              </div>
            </>
          )}

          {/* Contact Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t.nav.contact}
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">{contactAddress}</li>
              <li>
                <a href={`mailto:${contactEmail}`} className="text-muted-foreground transition-colors hover:text-foreground">
                  {contactEmail}
                </a>
              </li>
              {siteSettings?.contact?.phone && (
                <li>
                  <a href={`tel:${siteSettings.contact.phone as string}`} className="text-muted-foreground transition-colors hover:text-foreground">
                    {siteSettings.contact.phone as string}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-border pt-6 text-sm sm:flex-row">
          <p className="text-muted-foreground">
            {cmsCopyright
              ? cmsCopyright.replace('{year}', String(currentYear))
              : `\u00A9 ${currentYear} GoldenWing Creative Studios. ${t.footer.allRights}`}
          </p>
          <div className="mt-4 flex gap-6 sm:mt-0">
            {cmsLegalLinks && cmsLegalLinks.length > 0 ? (
              cmsLegalLinks.map((link: any, i: number) => (
                <Link key={i} href={link.link as string} className="text-muted-foreground transition-colors hover:text-foreground">
                  {link.label as string}
                </Link>
              ))
            ) : (
              <>
                <Link href={`/${locale}/impressum`} className="text-muted-foreground transition-colors hover:text-foreground">{t.nav.impressum}</Link>
                <Link href={`/${locale}/datenschutz`} className="text-muted-foreground transition-colors hover:text-foreground">{t.nav.datenschutz}</Link>
                <Link href={`/${locale}/agb`} className="text-muted-foreground transition-colors hover:text-foreground">{t.nav.agb}</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
