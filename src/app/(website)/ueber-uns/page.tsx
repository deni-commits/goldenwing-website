import type { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'

export const metadata: Metadata = {
  title: 'Ueber uns | GoldenWing Creative Studios',
  description: 'Erfahre mehr ueber GoldenWing Creative Studios — eine Wiener Agentur fuer Marketing, Branding und Web Development.',
}

export default async function UeberUnsPage() {
  const payload = await getPayload()

  const [teamData, pageData] = await Promise.all([
    payload.find({
      collection: 'team',
      sort: 'sortOrder',
      limit: 20,
    }),
    payload.find({
      collection: 'pages',
      where: { slug: { equals: 'ueber-uns' } },
      limit: 1,
    }),
  ])

  const team = teamData.docs
  const page = pageData.docs[0] as any | undefined
  const layout = page?.layout as Array<any> | null

  return (
    <>
      {/* Page Content from Payload */}
      {layout && layout.length > 0 ? (
        <RenderBlocks blocks={layout} />
      ) : (
        /* Fallback Header */
        <section className="bg-dark px-4 py-24 text-white">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Ueber uns</h1>
            <p className="max-w-2xl text-xl leading-relaxed text-gray-300">
              GoldenWing Creative Studios ist eine Wiener Marketing- und Branding-Agentur,
              die digitale Strategien entwickelt und umsetzt.
            </p>
          </div>
        </section>
      )}

      {/* Team Section */}
      {team.length > 0 && (
        <section className="px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              Unser Team
            </h2>
            <p className="mx-auto mb-16 max-w-2xl text-center text-muted">
              Die Menschen hinter GoldenWing Creative Studios.
            </p>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {team.map((member: any) => {
                const photo = member.photo as any | null
                return (
                  <div
                    key={member.id as string}
                    className="rounded-xl border border-gray-100 p-6 transition hover:border-gold-200 hover:shadow-lg"
                  >
                    {/* Photo Placeholder */}
                    <div className="mb-4 h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br from-gold-100 to-gold-200">
                      {photo && (photo.url as string) ? (
                        <img
                          src={photo.url as string}
                          alt={(photo.alt as string) || (member.name as string)}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span className="text-3xl text-gold-400">&#9786;</span>
                        </div>
                      )}
                    </div>

                    <h3 className="mb-1 text-xl font-semibold">
                      {member.name as string}
                    </h3>

                    {member.role && (
                      <p className="mb-3 text-sm font-medium text-gold-600">
                        {member.role as string}
                      </p>
                    )}

                    {member.bio && (
                      <p className="text-muted leading-relaxed">
                        {member.bio as string}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Values / Mission */}
      <section className="bg-gray-50 px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            Unsere Werte
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-muted">
            Was uns antreibt und wie wir arbeiten.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: 'Qualitaet', desc: 'Wir liefern keine Kompromisse — nur exzellente Ergebnisse, die wirken.' },
              { title: 'Partnerschaft', desc: 'Wir sehen uns als langfristige Partner, nicht nur als Dienstleister.' },
              { title: 'Innovation', desc: 'Wir bleiben am Puls der Zeit und setzen auf zukunftsfaehige Loesungen.' },
            ].map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-gray-100 bg-white p-6 transition hover:border-gold-200 hover:shadow-lg"
              >
                <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
                <p className="text-muted">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark px-4 py-24 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Lass uns zusammenarbeiten
          </h2>
          <p className="mb-8 text-gray-300">
            Wir freuen uns darauf, dein Projekt kennenzulernen.
          </p>
          <a
            href="/kontakt"
            className="inline-block rounded-lg bg-gold-500 px-8 py-3 font-semibold text-white transition hover:bg-gold-600"
          >
            Kontakt aufnehmen
          </a>
        </div>
      </section>
    </>
  )
}
