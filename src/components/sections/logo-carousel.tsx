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
              key={`${logo.id}-${index}`}
              className="flex basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-[12.5%] justify-center pl-0"
            >
              <LogoItem logo={logo} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* Gradient fades */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </div>
  )
}

function LogoItem({ logo }: { logo: Logo }) {
  const content = (
    <div className="mx-2 md:mx-4 flex shrink-0 items-center justify-center py-1 w-[100px] md:w-[120px]">
      <Image
        src={logo.image}
        alt={logo.name}
        width={120}
        height={32}
        loading="lazy"
        className={cn(
          "h-6 md:h-8 w-full max-w-[100px] md:max-w-[120px] object-contain",
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

// Default partner & client logos
const defaultLogos: Logo[] = [
  // Row 1 - Clients & Partners
  { id: "1", name: "Emirates", image: "/images/partners/emirates.svg", row: 1 },
  { id: "2", name: "Microsoft", image: "/images/partners/microsoft.svg", row: 1 },
  { id: "16", name: "PORR", image: "/images/partners/porr.svg", row: 1 },
  { id: "4", name: "Google", image: "/images/partners/google.svg", row: 1 },
  { id: "5", name: "Shopify", image: "/images/partners/shopify.svg", row: 1 },
  { id: "15", name: "Semrush", image: "/images/partners/semrush.svg", row: 1 },
  // Row 2 - Technologies
  { id: "14", name: "Adobe", image: "/images/partners/adobe.jpg", row: 2 },
  { id: "6", name: "Next.js", image: "/images/partners/nextjs.svg", row: 2 },
  { id: "7", name: "React", image: "/images/partners/react.svg", row: 2 },
  { id: "8", name: "TypeScript", image: "/images/partners/typescript.svg", row: 2 },
  { id: "9", name: "Tailwind CSS", image: "/images/partners/tailwindcss.svg", row: 2 },
  { id: "10", name: "Node.js", image: "/images/partners/nodejs.svg", row: 2 },
  { id: "11", name: "PostgreSQL", image: "/images/partners/postgresql.svg", row: 2 },
  { id: "12", name: "Vercel", image: "/images/partners/vercel.svg", row: 2 },
  { id: "13", name: "Figma", image: "/images/partners/figma.svg", row: 2 },
]

export function LogoCarousel({
  title = "Technologien & Partner",
  subtitle = "Wir arbeiten mit führenden Technologien und vertrauenswürdigen Partnern",
  logos = defaultLogos,
  className,
  locale = "de"
}: LogoCarouselProps) {
  // Merge all into 2 rows: row 1 (clients/partners) and row 2 (tech)
  // Row 3 from CMS gets merged into row 2
  const row1 = logos.filter(l => l.row === 1 || l.row === '1')
  const row2 = logos.filter(l => l.row === 2 || l.row === '2' || l.row === 3 || l.row === '3')
  const unassigned = logos.filter(l => !l.row)
  const allRow1 = [...row1, ...unassigned]

  return (
    <section
      className={cn("py-8 md:py-12 overflow-hidden", className)}
      style={{ contain: 'content' }}
    >
      <Container variant="block" className="mb-4 md:mb-6">
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

      <div className="space-y-2 md:space-y-3">
        {allRow1.length > 0 && (
          <SliderRow logos={allRow1} speed={0.5} direction="left" />
        )}
        {row2.length > 0 && (
          <SliderRow logos={row2} speed={0.4} direction="right" />
        )}
      </div>
    </section>
  )
}
