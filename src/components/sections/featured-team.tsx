import { Link } from '@/lib/i18n-navigation'
import Image from 'next/image'
import { ArrowRight, Linkedin, Twitter, Instagram, Github, Mail, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { AnimatedSection } from '@/components/ui/animated-section'
import { getFeaturedTeamMembers } from '@/lib/payload'
import { getTranslations } from 'next-intl/server'

interface SocialLinks {
  linkedin?: string
  twitter?: string
  instagram?: string
  github?: string
}

// Social link config for DRY rendering
const socialConfig: { key: keyof SocialLinks; icon: LucideIcon; label: string }[] = [
  { key: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
  { key: 'twitter', icon: Twitter, label: 'Twitter' },
  { key: 'instagram', icon: Instagram, label: 'Instagram' },
  { key: 'github', icon: Github, label: 'GitHub' },
]

interface MediaImage {
  url?: string
  alt?: string
  filename?: string
}

interface FeaturedTeamProps {
  title?: string
  subtitle?: string
  showCTA?: boolean
  limit?: number
}

export async function FeaturedTeam({
  title,
  subtitle,
  showCTA = true,
  limit = 4
}: FeaturedTeamProps) {
  const tCommon = await getTranslations('common')
  const teamMembers = await getFeaturedTeamMembers()
  const displayMembers = teamMembers.slice(0, limit)

  // Don't render section if no team members
  if (!displayMembers || displayMembers.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-muted/30">
      <Container variant="block">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </AnimatedSection>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayMembers.map((member, index) => {
            const imageData = member.image as MediaImage | undefined
            const socialLinks = member.social as SocialLinks | undefined

            return (
              <AnimatedSection key={member.id} delay={index * 0.1}>
                <div className="group bg-card rounded-2xl border overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                  {/* Image */}
                  <div className="aspect-square relative bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 overflow-hidden">
                    {imageData?.url ? (
                      <Image
                        src={imageData.url}
                        alt={imageData.alt || member.name as string}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        loading="lazy"
                        quality={80}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
                          <span className="text-3xl font-bold text-zinc-400">
                            {(member.name as string)?.charAt(0)}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Social Links Overlay */}
                    {socialLinks && socialConfig.some(({ key }) => socialLinks[key]) && (
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        {socialConfig.map(({ key, icon: Icon, label }) =>
                          socialLinks[key] && (
                            <a
                              key={key}
                              href={socialLinks[key]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-full bg-white/20 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                              aria-label={label}
                            >
                              <Icon className="w-5 h-5" />
                            </a>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 text-center">
                    <h3 className="font-bold text-lg mb-1">{member.name as string}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{member.role as string}</p>

                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        {member.email as string}
                      </a>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>

        {/* CTA */}
        {showCTA && (
          <AnimatedSection className="text-center mt-10" delay={0.4}>
            <Link href="/ueber-uns/team">
              <Button variant="outline" size="lg" className="group">
                {tCommon('meetTheTeam')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </AnimatedSection>
        )}
      </Container>
    </section>
  )
}
