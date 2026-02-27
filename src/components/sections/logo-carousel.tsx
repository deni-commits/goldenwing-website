"use client"

import AutoScroll from "embla-carousel-auto-scroll"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

export interface Logo {
  id: string
  name: string
  image: string
  url?: string
  row?: 1 | 2 | 3 | '1' | '2' | '3'
}

function SliderRow({ logos, speed = 0.5, direction = "left" }: { logos: Logo[], speed?: number, direction?: "left" | "right" }) {
  const duplicatedLogos = [...logos, ...logos, ...logos]

  return (
    <div className="relative">
      <Carousel
        opts={{
          loop: true,
          dragFree: true,
          containScroll: false,
          startIndex: Math.floor(logos.length / 2),
        }}
        plugins={[
          AutoScroll({
            playOnInit: true,
            speed: speed,
            direction: direction === "left" ? "forward" : "backward",
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          })
        ]}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {duplicatedLogos.map((logo, index) => (
            <CarouselItem
              key={logo.id + "-" + index}
              className="flex basis-1/3 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 justify-center pl-0"
            >
              <LogoItem logo={logo} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute inset-y-0 left-0 w-12 md:w-16 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-12 md:w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </div>
  )
}

function LogoItem({ logo }: { logo: Logo }) {
  const content = (
    <div className="mx-4 md:mx-6 flex shrink-0 items-center justify-center py-3 w-[140px] md:w-[180px]">
      <Image
        src={logo.image}
        alt={logo.name}
        width={180}
        height={48}
        loading="lazy"
        className={cn(
          "h-8 md:h-11 w-full max-w-[140px] md:max-w-[180px] object-contain",
          "grayscale opacity-60 transition-[filter,opacity] duration-300",
          "hover:grayscale-0 hover:opacity-100"
        )}
      />
    </div>
  )

  if (logo.url) {
    return (
      <Link
        href={logo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        title={logo.name}
      >
        {content}
      </Link>
    )
  }

  return content
}

interface LogoCarouselProps {
  title?: string
  subtitle?: string
  logos?: Logo[]
  className?: string
  locale?: string
}

const defaultLogos: Logo[] = [
  { id: "1", name: "Emirates", image: "/images/partners/emirates.svg", row: 1 },
  { id: "2", name: "Microsoft", image: "/images/partners/microsoft.svg", row: 1 },
  { id: "16", name: "PORR", image: "/images/partners/porr.svg", row: 1 },
  { id: "4", name: "Google", image: "/images/partners/google.svg", row: 1 },
  { id: "5", name: "Shopify", image: "/images/partners/shopify.svg", row: 1 },
  { id: "15", name: "Semrush", image: "/images/partners/semrush.svg", row: 1 },
  { id: "17", name: "viridiusLAB", image: "/images/partners/viridiuslab.svg", row: 1 },
  { id: "18", name: "Adobe", image: "/images/partners/adobe.svg", row: 1 },
  { id: "19", name: "Alinea Partners", image: "/images/partners/alinea.svg", row: 1 },
  { id: "20", name: "Viprotect", image: "/images/partners/viprotect.svg", row: 1 },
]

export function LogoCarousel({
  title = "Vertrauen von führenden Unternehmen",
  subtitle = "Wir arbeiten mit Marken, die höchste Ansprüche stellen",
  logos = defaultLogos,
  className,
  locale: _locale = "de"
}: LogoCarouselProps) {
  const allLogos = logos.filter(l => l.row === 1 || l.row === '1' || !l.row)

  return (
    <section
      className={cn("py-10 md:py-14 overflow-hidden", className)}
      style={{ contain: 'content' }}
    >
      <Container variant="block" className="mb-5 md:mb-7">
        <div className="text-center max-w-2xl mx-auto">
          {title && (
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-muted-foreground text-sm md:text-base">
              {subtitle}
            </p>
          )}
        </div>
      </Container>

      <div>
        {allLogos.length > 0 && (
          <SliderRow logos={allLogos} speed={0.4} direction="left" />
        )}
      </div>
    </section>
  )
}
