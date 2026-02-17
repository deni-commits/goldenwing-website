"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { Container } from '@/components/ui/container'

// Customer logos created by GoldenWing
const portfolioLogos = [
  "DerBotaniker-Logo.svg",
  "Dessert-by-Zalina-Logo.svg",
  "ElandiFilms.svg",
  "EMS-Marketing.svg",
  "Erkurt-Gartnegestraltung.svg",
  "Framko-Logo.svg",
  "GRAFF-LOGO.svg",
  "Inzhir-Logo.svg",
  "Jbel-Logo.svg",
  "Jungestheater-Garsten-Logo.svg",
  "Kalaise-Brother-Logo.svg",
  "Kutskap-Logo.svg",
  "LAMBERG-Logo.svg",
  "Lavash-Logo.svg",
  "LeCrebap-Logo.svg",
  "MC-Housen-Logo.svg",
  "Montra-Logo.svg",
  "MyMosaik-Logo.svg",
  "On-Repare-Logo.svg",
  "SBC-Security-Logo.svg",
  "TET-Group-Logo.svg",
  "Turbo-Mango.svg",
  "Umtugsreif-Logo.svg",
  "Veduchi-Logo.svg",
  "Viprotect-Logo.svg",
  "Watter-Logo.svg",
  "Yeliz-Oezen-Logo.svg",
]

interface LogoPortfolioProps {
  title?: string
  subtitle?: string
  className?: string
  locale?: string
}

export function LogoPortfolio({
  title,
  subtitle,
  className,
  locale = "de"
}: LogoPortfolioProps) {
  const isEn = locale === "en"

  const defaultTitle = isEn ? "Our Logo Creations" : "Unsere Logo-Kreationen"
  const defaultSubtitle = isEn
    ? "A selection of logos we've designed for our clients"
    : "Eine Auswahl an Logos, die wir für unsere Kunden gestaltet haben"

  return (
    <section className={cn("py-16 md:py-24 bg-[#1a1a1a]", className)}>
      <Container variant="block">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white">
            {title || defaultTitle}
          </h2>
          <p className="text-neutral-400 text-lg">
            {subtitle || defaultSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-8 md:gap-12">
          {portfolioLogos.map((file) => {
            // Extract client name from filename (e.g., "DerBotaniker-Logo.svg" → "DerBotaniker")
            const clientName = file.replace(/-Logo\.svg$|\.svg$/i, '').replace(/-/g, ' ')
            return (
            <div
              key={file}
              className="flex items-center justify-center p-2"
            >
              <Image
                src={`/logos/portfolio/${file}`}
                alt={`${clientName} Logo`}
                width={100}
                height={100}
                className={cn(
                  "w-full h-auto max-h-16 object-contain",
                  "transition-opacity duration-300",
                  "brightness-0 invert opacity-50",
                  "hover:opacity-100"
                )}
                unoptimized
              />
            </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-neutral-500 text-sm">
            {isEn
              ? `${portfolioLogos.length}+ logos designed and delivered`
              : `${portfolioLogos.length}+ Logos gestaltet und geliefert`
            }
          </p>
        </div>
      </Container>
    </section>
  )
}
