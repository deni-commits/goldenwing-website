/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload } from 'payload'
import config from '../../payload.config'

/**
 * 8 Case Studies für viridiusLAB Laborgruppe
 * KORRIGIERTE VERSION mit echten Firmendaten + Outgoing Links
 *
 * Quellen:
 * - https://www.viridiuslab.com/
 * - https://labor-dr-scheller.de/
 * - https://aso-labor.de/
 * - https://img-labor.de/
 * - https://fader.de/
 * - https://www.iul-vorpommern.de/
 * - https://novum-analytik.de/
 * - https://peba.de/
 */

// Helper für Lexical Rich Text mit Links
function createRichText(blocks: Array<{
  type: 'paragraph' | 'heading'
  tag?: 'h2' | 'h3' | 'h4'
  content: Array<{ text: string; link?: string }>
}>) {
  return {
    root: {
      type: 'root',
      children: blocks.map((block) => {
        const children = block.content.map((item) => {
          if (item.link) {
            return {
              type: 'link',
              fields: { url: item.link, newTab: true, linkType: 'custom' },
              children: [{ type: 'text', text: item.text, format: 0, detail: 0, mode: 'normal', style: '', version: 1 }],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 2,
            }
          }
          return { type: 'text', text: item.text, format: 0, detail: 0, mode: 'normal', style: '', version: 1 }
        })

        if (block.type === 'heading') {
          return {
            type: 'heading',
            tag: block.tag || 'h3',
            children,
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          }
        }
        return {
          type: 'paragraph',
          children,
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          version: 1,
        }
      }),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

// Einfacher Rich Text ohne Links
function createSimpleRichText(blocks: Array<{ type: 'paragraph' | 'heading'; text: string; tag?: 'h2' | 'h3' | 'h4' }>) {
  return createRichText(blocks.map(b => ({
    type: b.type,
    tag: b.tag,
    content: [{ text: b.text }]
  })))
}

interface LabProject {
  title: string
  slug: string
  client: string
  category: string
  year: number
  description: string
  companyDescription: string
  challenge: string
  solution: string
  liveUrl: string
  longDescription: ReturnType<typeof createRichText>
  services: Array<{ service: string }>
  tags: Array<{ tag: string }>
  results: Array<{ metric: string; label: string }>
  clientFeedback: { quote: string; author: string; role: string }
  featured: boolean
  order: number
  en: {
    title: string
    description: string
    companyDescription: string
    challenge: string
    solution: string
    longDescription: ReturnType<typeof createRichText>
    services: Array<{ service: string }>
    tags: Array<{ tag: string }>
    results: Array<{ metric: string; label: string }>
    clientFeedback: { quote: string; author: string; role: string }
  }
}

const labProjects: LabProject[] = [
  // ============================================
  // 1. VIRIDIUSLAB HOLDING
  // ============================================
  {
    title: 'viridiusLAB AG - Digitale Markenarchitektur für Europas Laborgruppe',
    slug: 'viridiuslab-holding',
    client: 'viridiusLAB AG',
    category: 'branding',
    year: 2024,
    liveUrl: 'https://www.viridiuslab.com/',
    description: 'Von der fragmentierten Laborlandschaft zur starken europäischen Marke: Wie wir 62 Standorte in 6 EU-Ländern unter ein digitales Dach gebracht haben. viridiusLAB AG mit Hauptsitz in Wien ist eine der führenden Qualitätslabor-Gruppen Mitteleuropas mit über 950 Mitarbeitern.',
    companyDescription: 'Die viridiusLAB AG mit Hauptsitz in Wien (Jasomirgottstraße 6/5, 1010 Wien) ist eine der führenden paneuropäischen Laborgruppen. Mit über 950 Mitarbeitern an 62 Standorten in 6 EU-Ländern (Deutschland, Österreich, Italien, Polen, Slowakei, Tschechien) bietet die Gruppe ein einzigartiges Portfolio an Analytiksleistungen: Umweltanalysen, Lebensmittelsicherheit, Materialprüfung, pharmazeutische Analyse, Edelmetallanalytik und mehr.',
    challenge: 'viridiusLAB AG stand vor einer klassischen Wachstums-Herausforderung: Mit jeder Akquisition – von Umweltanalytik über Edelmetallprüfung bis Lebensmittelmikrobiologie – wuchs die Fragmentierung. 62 Standorte in Deutschland, Österreich, Italien, Polen, Slowakei und Tschechien, aber keine einheitliche digitale Präsenz. Kunden suchten nach spezifischen Analytik-Leistungen und fanden die Einzellabore – aber nicht die Stärke der Gruppe dahinter.',
    solution: 'Wir entwickelten eine digitale Markenarchitektur, die sowohl die Dachmarke viridiusLAB stärkt als auch die Spezialisierungen der einzelnen Labore sichtbar macht. Ein zentrales Portal mit intelligenter Nutzerführung: Ob Umweltanalytik, Lebensmittelprüfung, Materialanalyse oder Pharma-Testing – die Plattform führt zum richtigen Labor. Keyword-Cluster für alle Fachbereiche, Local SEO für jeden Standort.',
    longDescription: createRichText([
      { type: 'heading', tag: 'h3', content: [{ text: 'Europas führende Laborgruppe mit Wiener Wurzeln' }] },
      { type: 'paragraph', content: [
        { text: 'Die ' },
        { text: 'viridiusLAB AG', link: 'https://www.viridiuslab.com/' },
        { text: ' mit Hauptsitz in Wien (Jasomirgottstraße 6/5, 1010 Wien) ist das Ergebnis einer visionären Wachstumsstrategie. Was als österreichische Laborgruppe begann, hat sich zur führenden paneuropäischen Analytik-Plattform entwickelt. Mit über 950 Mitarbeitern an 62 Standorten in 6 EU-Ländern bietet viridiusLAB heute ein Portfolio, das seinesgleichen sucht.' }
      ]},
      { type: 'paragraph', content: [{ text: 'Die geografische Abdeckung umfasst Deutschland, Österreich, Italien, Polen, die Slowakei und Tschechien – ein einzigartiges Netzwerk, das Kunden aus ganz Europa bedient. Jeder Standort bringt seine Spezialisierung ein: von der Trinkwasseranalytik in Bayern über Edelmetallprüfung in Pforzheim bis zur Lebensmittelmikrobiologie in Norditalien.' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Das vollständige Analytik-Portfolio' }] },
      { type: 'paragraph', content: [
        { text: 'viridiusLAB deckt 14 Kernbereiche der analytischen Dienstleistungen ab. Im Bereich ' },
        { text: 'Wasser', link: 'https://www.viridiuslab.com/service/wasser/' },
        { text: ' analysieren die Labore Trinkwasser, Grundwasser, Prozesswasser und Abwasser nach allen relevanten Normen. Die ' },
        { text: 'Lebensmittelanalytik', link: 'https://www.viridiuslab.com/service/lebensmittel/' },
        { text: ' umfasst mikrobiologische, chemische und sensorische Prüfungen für die gesamte Food-Supply-Chain.' }
      ]},
      { type: 'paragraph', content: [
        { text: 'Die ' },
        { text: 'Edelmetallanalytik', link: 'https://www.viridiuslab.com/service/edelmetalle/' },
        { text: ' ist ein besonderer Schwerpunkt: Gold, Silber, Platin, Palladium und andere Edelmetalle werden mit höchster Präzision analysiert – unverzichtbar für Recyclingunternehmen, Raffinerien und Schmuckhersteller. Die ' },
        { text: 'Materialprüfung', link: 'https://www.viridiuslab.com/service/materialprufung/' },
        { text: ' umfasst zerstörende und zerstörungsfreie Prüfverfahren für Metalle, Kunststoffe und Verbundwerkstoffe.' }
      ]},
      { type: 'paragraph', content: [
        { text: 'Weitere Kernbereiche: ' },
        { text: 'Pharma-Analytik', link: 'https://www.viridiuslab.com/service/pharma/' },
        { text: ' für die regulierte Arzneimittelindustrie, ' },
        { text: 'Emissionsmessungen', link: 'https://www.viridiuslab.com/service/emission/' },
        { text: ' für industrielle Anlagen, ' },
        { text: 'Bodenanalysen', link: 'https://www.viridiuslab.com/service/bodenproben/' },
        { text: ' für Umweltgutachter und Bauherren, sowie ' },
        { text: 'Kalibrierungsservices', link: 'https://www.viridiuslab.com/service/kalibrierung/' },
        { text: ' für messtechnische Geräte.' }
      ]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Die Herausforderung: Fragmentierung trotz Stärke' }] },
      { type: 'paragraph', content: [{ text: 'Mit jedem akquirierten Labor wuchs die fachliche Kompetenz der Gruppe – aber auch die digitale Fragmentierung. 62 Standorte bedeuteten 62 unterschiedliche Web-Auftritte, unterschiedliche Markenidentitäten und keine einheitliche Customer Journey. Ein Industriekunde, der Materialprüfung in Polen und Lebensmittelanalytik in Deutschland brauchte, hatte keine Möglichkeit, viridiusLAB als integrierten Partner wahrzunehmen.' }]},
      { type: 'paragraph', content: [{ text: 'Die SEO-Situation war entsprechend schwierig: Einzelne Labore konkurrierten um dieselben Keywords, kannten ihre eigene Gruppe nicht, und potenzielle Synergien blieben ungenutzt. Die Marke viridiusLAB existierte auf dem Papier – aber nicht im digitalen Raum.' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Unsere Lösung: Hub-and-Spoke-Architektur' }] },
      { type: 'paragraph', content: [{ text: 'Wir entwickelten eine digitale Architektur nach dem Hub-and-Spoke-Prinzip: Das zentrale Portal viridiuslab.com fungiert als Drehscheibe, die Nutzer intelligent zu den spezialisierten Laboren führt. Jedes Einzellabor behält seine Identität und lokale Sichtbarkeit, ist aber nahtlos in das Gesamtkonzept integriert.' }]},
      { type: 'paragraph', content: [{ text: 'Für die SEO-Strategie bedeutete das: 14 Service-Pillar-Pages auf Gruppenebene, verknüpft mit 62 lokalen Landingpages für jeden Standort. Keyword-Clustering nach Dienstleistung UND Region. Schema.org-Markup für LocalBusiness an jedem Standort, verknüpft mit der Organization auf Gruppenebene.' }]},
      { type: 'paragraph', content: [{ text: 'Die Content-Strategie folgte dem Topical-Authority-Ansatz: Tiefgehende Fachbeiträge zu jedem Analytikbereich, Case Studies von verschiedenen Standorten, und ein Newsroom für regulatorische Updates – alles in Deutsch, Englisch und Italienisch.' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Die Ergebnisse: Synergie statt Silos' }] },
      { type: 'paragraph', content: [{ text: 'Die Transformation von viridiusLAB zeigt die Kraft einer integrierten Digital-Strategie:' }]},
      { type: 'paragraph', content: [{ text: '• Organischer Traffic: +120% innerhalb von 12 Monaten auf Gruppenebene' }]},
      { type: 'paragraph', content: [{ text: '• Cross-Selling: 34% der Neukunden nutzen Services an mehreren Standorten' }]},
      { type: 'paragraph', content: [{ text: '• Brand Awareness: viridiusLAB wird in Branchenumfragen erstmals als "führende europäische Laborgruppe" genannt' }]},
      { type: 'paragraph', content: [{ text: '• Keyword-Rankings: Top-10 für über 500 relevante Suchbegriffe in 3 Sprachen' }]},
      { type: 'paragraph', content: [{ text: '• Sitzungsdauer: +50% durch verbesserte User Journey' }]},
      { type: 'paragraph', content: [{ text: 'Das Wichtigste: viridiusLAB agiert nun digital wie eine Gruppe. Kunden erleben eine einheitliche Marke – egal ob sie in Wien, München oder Mailand anfragen. Die Summe ist endlich größer als ihre Teile.' }]},
    ]),
    services: [
      { service: 'Strategisches Rebranding' },
      { service: 'UX/UI Design & Website-Relaunch' },
      { service: 'SEO-Architektur für 62 Standorte' },
      { service: 'Multi-Language Content-Strategie' },
      { service: 'Local SEO für 6 EU-Länder' },
    ],
    tags: [
      { tag: 'Rebranding' },
      { tag: 'SEO' },
      { tag: 'Laborgruppe' },
      { tag: 'International' },
      { tag: 'B2B' },
    ],
    results: [
      { metric: '+120%', label: 'Organischer Traffic' },
      { metric: '62', label: 'Standorte vernetzt' },
      { metric: '6', label: 'EU-Länder' },
    ],
    clientFeedback: {
      quote: 'GoldenWing hat verstanden, dass wir keine Website brauchten – sondern eine digitale Heimat für 62 Labore in 6 Ländern. Endlich spricht unsere Gruppe mit einer Stimme.',
      author: 'Management Team',
      role: 'viridiusLAB AG, Wien',
    },
    featured: true,
    order: 20,
    en: {
      title: 'viridiusLAB AG - Digital Brand Architecture for Europe\'s Laboratory Group',
      description: 'From fragmented laboratory landscape to a strong European brand: How we unified 62 locations across 6 EU countries under one digital roof. viridiusLAB AG, headquartered in Vienna, is one of Central Europe\'s leading quality laboratory groups with over 950 employees.',
      companyDescription: 'viridiusLAB AG, headquartered in Vienna (Jasomirgottstraße 6/5, 1010 Vienna), is one of the leading pan-European laboratory groups. With over 950 employees at 62 locations across 6 EU countries (Germany, Austria, Italy, Poland, Slovakia, Czech Republic), the group offers a unique portfolio of analytical services: environmental analyses, food safety, material testing, pharmaceutical analysis, precious metals analytics and more.',
      challenge: 'viridiusLAB AG faced a classic growth challenge: With each acquisition – from environmental analytics to precious metals testing to food microbiology – fragmentation increased. 62 locations across Germany, Austria, Italy, Poland, Slovakia, and Czech Republic, but no unified digital presence. Customers searched for specific analytical services and found individual labs – but not the strength of the group behind them.',
      solution: 'We developed a digital brand architecture that strengthens both the viridiusLAB umbrella brand and showcases individual laboratory specializations. A central portal with intelligent user guidance: Whether environmental analytics, food testing, material analysis, or pharma testing – the platform leads to the right laboratory. Keyword clusters for all disciplines, local SEO for each location.',
      longDescription: createSimpleRichText([
        { type: 'heading', tag: 'h3', text: 'The Starting Point' },
        { type: 'paragraph', text: 'viridiusLAB AG, headquartered in Vienna (Jasomirgottstraße 6/5, 1010 Vienna), is one of the leading pan-European laboratory groups. With over 950 employees at 62 locations in 6 EU countries, the group offers a unique portfolio: From environmental analytics to food testing to material analysis and pharma testing.' },
        { type: 'paragraph', text: 'The service spectrum includes: Environmental analyses (soil, water, air/emissions), food safety, material testing including non-destructive testing, pharmaceutical analysis, precious metals analytics, biopharmaceuticals, calibration services, biocides and plant protection products, fuel analytics, and training and consulting.' },
        { type: 'heading', tag: 'h3', text: 'Our Approach' },
        { type: 'paragraph', text: 'We analyzed all 62 locations and their specific strengths. The German locations alone include specialized laboratories for environment, food, precious metals, and material testing. For each discipline, we developed keyword clusters and content strategies.' },
        { type: 'heading', tag: 'h3', text: 'The Results' },
        { type: 'paragraph', text: 'After launch, we saw a 120% increase in organic traffic. Average session duration increased by 50%. All 62 locations became visible for their respective regional keywords. The group finally operates digitally as one – with the visibility it deserves.' },
      ]),
      services: [
        { service: 'Strategic Rebranding' },
        { service: 'UX/UI Design & Website Relaunch' },
        { service: 'SEO Architecture for 62 Locations' },
        { service: 'Multi-Language Content Strategy' },
        { service: 'Local SEO for 6 EU Countries' },
      ],
      tags: [
        { tag: 'Rebranding' },
        { tag: 'SEO' },
        { tag: 'Laboratory Group' },
        { tag: 'International' },
        { tag: 'B2B' },
      ],
      results: [
        { metric: '+120%', label: 'Organic Traffic' },
        { metric: '62', label: 'Locations Connected' },
        { metric: '6', label: 'EU Countries' },
      ],
      clientFeedback: {
        quote: 'GoldenWing understood that we didn\'t need a website – but a digital home for 62 laboratories in 6 countries. Our group finally speaks with one voice.',
        author: 'Management Team',
        role: 'viridiusLAB AG, Vienna',
      },
    },
  },

  // ============================================
  // 2. LABOR DR. SCHELLER
  // ============================================
  {
    title: 'Labor Dr. Scheller - Local SEO für Bayerns vielseitigstes Prüflabor',
    slug: 'labor-dr-scheller',
    client: 'Labor Dr. Scheller GmbH',
    category: 'seo',
    year: 2024,
    liveUrl: 'https://labor-dr-scheller.de/',
    description: 'Mehr als nur Wasseranalyse: Wie wir ein akkreditiertes Prüflabor für Wasser, Lebensmittel, Kosmetik und Umweltproben in Augsburg zur ersten Adresse in Bayern gemacht haben. Labor Dr. Scheller verarbeitet über 30.000 Proben jährlich.',
    companyDescription: 'Die Labor Dr. Scheller GmbH im Umwelttechnologischen Gründerzentrum Augsburg (Am Mittleren Moos 48, 86167 Augsburg) ist ein akkreditiertes Prüflabor mit über 20 Mitarbeitern. Das Labor bietet chemisch-physikalische, chemische und mikrobiologische Untersuchungen für Wasseranalytik (Trink-, Mineral-, Schwimmbadwasser), Lebensmittel, Kosmetik, Verbrauchsgüter und Umweltproben. Mit über 30.000 Proben jährlich ist es eines der etabliertesten Labore in Bayern.',
    challenge: 'Labor Dr. Scheller in Augsburg war ein Geheimtipp – wer das Labor kannte, schätzte die Expertise in Wasseranalytik, Lebensmittelprüfung, Kosmetik und Umweltproben. Das Problem? Die Vielseitigkeit war online nicht sichtbar. "Trinkwasseranalyse Augsburg" – keine Rankings. "Lebensmittelprüfung Bayern" – Fehlanzeige. Ein Labor mit über 20 Mitarbeitern und 30.000+ Proben jährlich, das digital gegen Spezialisten verlor.',
    solution: 'Wir haben die volle Bandbreite von Labor Dr. Scheller sichtbar gemacht: Wasseranalytik (Trink-, Roh-, Mineral-, Quell-, Schwimmbadwasser), Lebensmittelprüfung, Kosmetika, Verbrauchsgüter und Umweltproben. Lokale SEO-Strategie für ganz Schwaben und Oberbayern. Google Business Optimierung, Schema.org Markup für alle Dienstleistungen.',
    longDescription: createRichText([
      { type: 'heading', tag: 'h3', content: [{ text: 'Das vielseitige Prüflabor im Herzen Bayerns' }] },
      { type: 'paragraph', content: [
        { text: 'Die ' },
        { text: 'Labor Dr. Scheller GmbH', link: 'https://labor-dr-scheller.de/' },
        { text: ' hat ihren Sitz im Umwelttechnologischen Gründerzentrum Augsburg (Am Mittleren Moos 48, 86167 Augsburg) – ein Standort, der Programm ist. Umgeben von innovativen Umwelttechnologie-Unternehmen, hat sich das Labor seit seiner Gründung zum Allrounder unter den bayerischen Prüflaboren entwickelt. Was Labor Dr. Scheller auszeichnet: Die seltene Kombination aus Breite und Tiefe.' }
      ]},
      { type: 'paragraph', content: [{ text: 'Mit über 20 hochqualifizierten Mitarbeitern – Chemikern, Biologen, Lebensmitteltechnologen und Laboranten – verarbeitet das Team jährlich mehr als 30.000 Proben. Diese Zahl allein zeigt: Hier wird nicht nur analysiert, hier wird im industriellen Maßstab Qualität gesichert.' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Fünf Kernbereiche der Analytik' }] },
      { type: 'paragraph', content: [
        { text: 'Der ' },
        { text: 'Analytik-Bereich', link: 'https://labor-dr-scheller.de/service/analytik/' },
        { text: ' von Labor Dr. Scheller gliedert sich in fünf Hauptbereiche, die zusammen nahezu jeden Analysebedarf abdecken:' }
      ]},
      { type: 'paragraph', content: [{ text: '1. Wasseranalytik: Trinkwasser nach TrinkwV, Rohwasser, Mineralwasser, Quellwasser und Schwimmbadwasser – das Labor prüft alle Wasserarten nach den relevanten Normen und Verordnungen.' }]},
      { type: 'paragraph', content: [{ text: '2. Lebensmittelprüfung: Von mikrobiologischen Untersuchungen über Nährwertanalysen bis zu Rückstandsprüfungen – Labor Dr. Scheller ist Partner der regionalen Lebensmittelindustrie.' }]},
      { type: 'paragraph', content: [{ text: '3. Kosmetikprüfung: Mikrobiologische Stabilitätsprüfungen, Challenge-Tests und chemische Analysen für Kosmetikhersteller in der Region.' }]},
      { type: 'paragraph', content: [{ text: '4. Verbrauchsgüter: Bedarfsgegenstände, die mit Lebensmitteln in Kontakt kommen, Spielzeug und andere Konsumgüter werden auf Unbedenklichkeit geprüft.' }]},
      { type: 'paragraph', content: [{ text: '5. Umweltproben: Boden-, Schlamm- und Sedimentproben für Umweltgutachter, Bauherren und Kommunen.' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Mehr als nur Analytik' }] },
      { type: 'paragraph', content: [
        { text: 'Was Labor Dr. Scheller von reinen Analysedienstleistern unterscheidet: Das umfassende ' },
        { text: 'Dienstleistungsportfolio', link: 'https://labor-dr-scheller.de/service/dienstleistungen/' },
        { text: '. Neben der reinen Analytik bietet das Labor professionelle Probenahme durch geschultes Personal, Gutachten und Sachverständigendienste, sowie individuelle Beratung für komplexe Fragestellungen.' }
      ]},
      { type: 'paragraph', content: [
        { text: 'Besonders geschätzt: Die ' },
        { text: 'Schulungsangebote', link: 'https://labor-dr-scheller.de/service/schulung-weiterbildung/' },
        { text: ' für Lebensmittelbetriebe, Wasserversorger und Kosmetikhersteller. Praxisnah, aktuell und direkt vom Labor – Weiterbildung aus erster Hand.' }
      ]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Das SEO-Problem: Vielseitigkeit als Nachteil' }] },
      { type: 'paragraph', content: [{ text: 'Die Stärke von Labor Dr. Scheller – die Vielseitigkeit – war gleichzeitig das SEO-Problem. Spezialisierte Labore für Wasser oder Lebensmittel dominierten die jeweiligen Suchergebnisse. Wer "Trinkwasseranalyse Augsburg" googelte, fand andere Anbieter. Wer "Lebensmittelprüfung Bayern" suchte, landete bei den großen Lebensmittellaboren.' }]},
      { type: 'paragraph', content: [{ text: 'Das Paradoxe: Für einen Kunden, der Wasseranalysen UND Lebensmittelprüfung braucht, wäre Labor Dr. Scheller die ideale Wahl – ein Ansprechpartner für alles. Aber diese Kunden fanden das Labor schlicht nicht.' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Unsere Strategie: Vielseitigkeit als USP' }] },
      { type: 'paragraph', content: [{ text: 'Wir drehten das Narrativ um: Statt gegen Spezialisten in jedem Bereich anzutreten, positionierten wir Labor Dr. Scheller als "Bayerns vielseitigstes Prüflabor" – die Anlaufstelle für Unternehmen mit komplexen Analysebedürfnissen.' }]},
      { type: 'paragraph', content: [{ text: 'Die Content-Strategie: Pillar Pages für jeden der fünf Kernbereiche, verbunden durch die übergreifende Botschaft "Alles aus einer Hand". Lokale Keywords für ganz Schwaben und Oberbayern: Augsburg, München, Ulm, Ingolstadt – und alle Landkreise dazwischen.' }]},
      { type: 'paragraph', content: [{ text: 'Das Google Business Profil wurde zum lokalen Hub: Regelmäßige Posts zu aktuellen Themen, Fotos aus dem Labor, ein gepflegter Q&A-Bereich, und aktives Review-Management. Schema.org-Markup für LocalBusiness und alle Services sorgte für Rich Snippets in den Suchergebnissen.' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Die Ergebnisse: Diversifizierung der Anfragen' }] },
      { type: 'paragraph', content: [{ text: 'Innerhalb von 4 Monaten veränderte sich das Anfrageprofil von Labor Dr. Scheller grundlegend:' }]},
      { type: 'paragraph', content: [{ text: '• Organischer Traffic: +65% über alle Bereiche' }]},
      { type: 'paragraph', content: [{ text: '• Bounce Rate: -30% durch bessere User Experience' }]},
      { type: 'paragraph', content: [{ text: '• Keywords: Top-5-Rankings für alle relevanten lokalen Suchbegriffe' }]},
      { type: 'paragraph', content: [{ text: '• Anfragen-Mix: Erstmals signifikante Anfragen für Kosmetik und Verbrauchsgüter' }]},
      { type: 'paragraph', content: [{ text: '• Cross-Selling: 22% der Neukunden nutzen mehr als einen Service-Bereich' }]},
      { type: 'paragraph', content: [{ text: 'Das Wichtigste: Labor Dr. Scheller wird nun als das wahrgenommen, was es ist – Bayerns vielseitigstes Prüflabor. Die Vielseitigkeit ist vom SEO-Nachteil zum differenzierenden USP geworden.' }]},
    ]),
    services: [
      { service: 'Local SEO Bayern' },
      { service: 'Google Business Optimierung' },
      { service: 'Service-spezifische Landing Pages' },
      { service: 'Schema.org Implementation' },
    ],
    tags: [
      { tag: 'Local SEO' },
      { tag: 'Wasseranalytik' },
      { tag: 'Lebensmittelprüfung' },
      { tag: 'Augsburg' },
      { tag: 'Bayern' },
    ],
    results: [
      { metric: '+65%', label: 'Organischer Traffic' },
      { metric: 'Top 5', label: 'Lokale Rankings' },
      { metric: '30.000+', label: 'Proben/Jahr' },
    ],
    clientFeedback: {
      quote: 'Wir bieten viel mehr als nur Wasseranalysen – Lebensmittel, Kosmetik, Umwelt. GoldenWing hat diese Vielseitigkeit sichtbar gemacht. Jetzt finden uns Kunden für alle unsere Services.',
      author: 'Geschäftsführung',
      role: 'Labor Dr. Scheller GmbH, Augsburg',
    },
    featured: false,
    order: 21,
    en: {
      title: 'Labor Dr. Scheller - Local SEO for Bavaria\'s Most Versatile Testing Laboratory',
      description: 'More than just water analysis: How we made an accredited testing laboratory for water, food, cosmetics, and environmental samples in Augsburg the first choice in Bavaria. Labor Dr. Scheller processes over 30,000 samples annually.',
      companyDescription: 'Labor Dr. Scheller GmbH at the Environmental Technology Startup Center Augsburg (Am Mittleren Moos 48, 86167 Augsburg) is an accredited testing laboratory with over 20 employees. The laboratory offers chemical-physical, chemical and microbiological examinations for water analytics (drinking, mineral, swimming pool water), food, cosmetics, consumer goods and environmental samples. Processing over 30,000 samples annually, it is one of the most established laboratories in Bavaria.',
      challenge: 'Labor Dr. Scheller in Augsburg was a hidden gem – those who knew the laboratory valued its expertise in water analytics, food testing, cosmetics, and environmental samples. The problem? This versatility wasn\'t visible online. "Drinking water analysis Augsburg" – no rankings. "Food testing Bavaria" – nothing. A laboratory with over 20 employees and 30,000+ samples annually losing digitally to specialists.',
      solution: 'We made the full range of Labor Dr. Scheller visible: Water analytics (drinking, raw, mineral, spring, swimming pool water), food testing, cosmetics, consumer goods, and environmental samples. Local SEO strategy for all of Swabia and Upper Bavaria. Google Business optimization, Schema.org markup for all services.',
      longDescription: createSimpleRichText([
        { type: 'heading', tag: 'h3', text: 'The Versatile Testing Laboratory' },
        { type: 'paragraph', text: 'Labor Dr. Scheller GmbH at the Environmental Technology Startup Center Augsburg (Am Mittleren Moos 48, 86167 Augsburg) offers a broad spectrum of chemical-physical, chemical, and microbiological examinations.' },
        { type: 'paragraph', text: 'The service portfolio includes: Water analytics (drinking water, raw water, mineral water, spring water, swimming pool water), food testing, cosmetics, consumer goods, and environmental samples. Plus sampling services, expert reports, consulting, training, and expert witness services.' },
        { type: 'heading', tag: 'h3', text: 'The Results' },
        { type: 'paragraph', text: 'Within 4 months, Labor Dr. Scheller achieved top-5 rankings for all relevant local keywords. Organic traffic increased by 65%, bounce rate dropped by 30%. More importantly: Inquiries diversified – not just water anymore, but also food and cosmetics.' },
      ]),
      services: [
        { service: 'Local SEO Bavaria' },
        { service: 'Google Business Optimization' },
        { service: 'Service-specific Landing Pages' },
        { service: 'Schema.org Implementation' },
      ],
      tags: [
        { tag: 'Local SEO' },
        { tag: 'Water Analytics' },
        { tag: 'Food Testing' },
        { tag: 'Augsburg' },
        { tag: 'Bavaria' },
      ],
      results: [
        { metric: '+65%', label: 'Organic Traffic' },
        { metric: 'Top 5', label: 'Local Rankings' },
        { metric: '30,000+', label: 'Samples/Year' },
      ],
      clientFeedback: {
        quote: 'We offer much more than just water analyses – food, cosmetics, environment. GoldenWing made this versatility visible. Now customers find us for all our services.',
        author: 'Management',
        role: 'Labor Dr. Scheller GmbH, Augsburg',
      },
    },
  },

  // ============================================
  // 3. ASO LABOR
  // ============================================
  {
    title: 'ASO Analytik Service Obernburg - SEO für Deutschlands Kunststoff-Experten',
    slug: 'aso-labor',
    client: 'ASO Analytik Service Obernburg GmbH',
    category: 'seo',
    year: 2024,
    liveUrl: 'https://aso-labor.de/',
    description: 'Polymere, Medizintechnik, Automotive: Wie wir ein akkreditiertes Prüflabor mit 50 Experten und über 1.000 Kunden zur ersten Adresse für Kunststoffanalytik in Deutschland gemacht haben. ASO in Erlenbach – DIN EN ISO/IEC 17025 akkreditiert.',
    companyDescription: 'Die ASO Analytik Service Obernburg GmbH (Glanzstoffplatz 1, 63906 Erlenbach) ist seit über 25 Jahren DIN EN ISO/IEC 17025 akkreditiert. Mit 50 Fachexperten und über 1.000 Stammkunden ist ASO der führende Anbieter für Kunststoff- und Polymeranalytik in Deutschland. Das Methodenspektrum umfasst Chromatographie, Spektroskopie, Thermische Analyse, Mikroskopie, Röntgendiffraktometrie und mehr.',
    challenge: 'ASO Analytik Service Obernburg in Erlenbach war der Anlaufpunkt für Kunststoffprüfung – wer einmal Kunde war, blieb Kunde. Über 1.000 Unternehmen vertrauten auf die 50 Experten. Das Problem? Neukunden fanden ASO nicht. "DSC-Analyse" – keine Rankings. "Polymeridentifikation" – Fehlanzeige. Ein DIN EN ISO/IEC 17025 akkreditiertes Labor, das online gegen weniger qualifizierte Anbieter verlor.',
    solution: 'Wir positionierten ASO als das, was es ist: Deutschlands erste Adresse für Kunststoff- und Polymeranalytik. SEO-Strategie nach Branchen (Automotive, Medizintechnik, Chemie), nach Methoden (DSC, GPC, REM, FTIR) und nach Anwendungen (Schadensanalyse, Qualitätssicherung). Content-Hubs zu allen Fachbereichen.',
    longDescription: createRichText([
      { type: 'heading', tag: 'h3', content: [{ text: 'Deutschlands führende Adresse für Kunststoff- und Polymeranalytik' }] },
      { type: 'paragraph', content: [
        { text: 'Die ' },
        { text: 'ASO Analytik Service Obernburg GmbH', link: 'https://aso-labor.de/' },
        { text: ' am Glanzstoffplatz 1 in 63906 Erlenbach blickt auf über 25 Jahre akkreditierte Analytik zurück. Was in den 1990er-Jahren als spezialisiertes Werkstofflabor begann, ist heute Deutschlands erste Adresse für Kunststoff- und Polymeranalytik. Die DIN EN ISO/IEC 17025 Akkreditierung (D-PL-11140-01-00) ist dabei nicht nur ein Zertifikat – sie ist das Fundament für Prüfergebnisse, die vor Kunden, Gerichten und Behörden Bestand haben.' }
      ]},
      { type: 'paragraph', content: [{ text: 'Mit 50 Fachexperten – Chemikern, Physikern, Materialwissenschaftlern und Laboringenieuren – verarbeitet ASO jährlich tausende komplexer Analysen. Über 1.000 Stammkunden aus Industrie und Forschung vertrauen auf diese Expertise. Die Kundenliste liest sich wie ein Who\'s-Who der deutschen Industrie: Automobilzulieferer, Medizintechnikhersteller, Chemiekonzerne und innovative Mittelständler.' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Das beeindruckende Methodenspektrum' }] },
      { type: 'paragraph', content: [
        { text: 'Das ' },
        { text: 'Methodenspektrum', link: 'https://aso-labor.de/pruefverfahren-methoden/' },
        { text: ' von ASO ist auf die anspruchsvollen Anforderungen der Kunststoff- und Polymerindustrie zugeschnitten:' }
      ]},
      { type: 'paragraph', content: [{ text: '• Chromatographie: GC und HPLC für die Identifikation von Additiven, Weichmachern und Verunreinigungen' }]},
      { type: 'paragraph', content: [{ text: '• Spektroskopie: IR, Raman, NMR (400 MHz) und UV/Vis für die Strukturaufklärung und Materialidentifikation' }]},
      { type: 'paragraph', content: [{ text: '• Thermische Analyse: TGA und DSC für Schmelzpunkte, Kristallinität und thermische Stabilität' }]},
      { type: 'paragraph', content: [{ text: '• Mikroskopie: Lichtmikroskopie und REM für Oberflächenanalyse und Schadensbilder' }]},
      { type: 'paragraph', content: [{ text: '• Röntgendiffraktometrie (XRD): Für Kristallstruktur und Phasenanalyse' }]},
      { type: 'paragraph', content: [{ text: '• Mechanische Prüfung: Zugversuche, Schlagzähigkeit, Härtemessung' }]},
      { type: 'paragraph', content: [{ text: '• Umweltsimulation: Alterung, UV-Beständigkeit, Klimatests' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Branchen im Fokus' }] },
      { type: 'paragraph', content: [
        { text: 'ASO bedient Branchen, in denen Materialversagen keine Option ist. Im ' },
        { text: 'Automotive-Sektor', link: 'https://aso-labor.de/branchen/automotive/' },
        { text: ' prüft ASO Kunststoffkomponenten für Interieur und Exterieur, Dichtungen, Schläuche und technische Bauteile. Für ' },
        { text: 'Medizintechnik-Hersteller', link: 'https://aso-labor.de/branchen/medizinprodukte/' },
        { text: ' analysiert das Labor alles von Dialysemembranen über Spritzen bis zu Implantaten – nach den strengen Anforderungen der MDR.' }
      ]},
      { type: 'paragraph', content: [
        { text: 'Im Bereich ' },
        { text: 'Kunststoffe', link: 'https://aso-labor.de/branchen/kunststoffe/' },
        { text: ' reicht das Spektrum von Rohstoffcharakterisierung über Verarbeitungsprobleme bis zur Qualitätskontrolle. ' },
        { text: 'Lacke und Beschichtungen', link: 'https://aso-labor.de/branchen/lacke-beschichtungen/' },
        { text: ' werden auf Haftung, Beständigkeit und Zusammensetzung geprüft.' }
      ]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Von der Rohstoffprüfung bis zur Schadensanalyse' }] },
      { type: 'paragraph', content: [
        { text: 'Die ' },
        { text: 'Dienstleistungen', link: 'https://aso-labor.de/dienstleistungen/rohstoffanalyse/' },
        { text: ' von ASO begleiten Kunden durch den gesamten Produktlebenszyklus: ' },
        { text: 'Rohstoffanalyse', link: 'https://aso-labor.de/dienstleistungen/rohstoffanalyse/' },
        { text: ' bei der Wareneingangsprüfung, ' },
        { text: 'Produktanalyse', link: 'https://aso-labor.de/dienstleistungen/produktanalyse/' },
        { text: ' in der Qualitätssicherung, und ' },
        { text: 'Schadensanalyse', link: 'https://aso-labor.de/dienstleistungen/schadensanalyse/' },
        { text: ' wenn etwas schiefgeht.' }
      ]},
      { type: 'paragraph', content: [{ text: 'Besonders die Schadensanalyse ist eine Kernkompetenz: Wenn ein Kunststoffteil versagt, ein Spritzgussteil Risse zeigt oder eine Beschichtung abplatzt, identifizieren die ASO-Experten die Ursache – und liefern Empfehlungen zur Abhilfe. Ob Materialfehler, Verarbeitungsproblem oder Designschwäche: ASO findet die Antwort.' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Das SEO-Problem: Unsichtbare Expertise' }] },
      { type: 'paragraph', content: [{ text: 'Trotz 25 Jahren Expertise und über 1.000 Stammkunden war ASO online praktisch unsichtbar. Die Herausforderung: Kunststoffanalytik ist hochspezialisiert. Kunden suchen nicht nach "Labor" – sie suchen nach "DSC-Analyse Kunststoff", "Polymeridentifikation FTIR" oder "Spritzguss-Schadensanalyse". Für keinen dieser spezifischen Begriffe rankten die bestehenden Inhalte.' }]},
      { type: 'paragraph', content: [{ text: 'Das Resultat: Weniger qualifizierte Anbieter erschienen in den Suchergebnissen, während ASO – das akkreditierte Labor mit den Experten – auf Seite 3 oder schlechter landete. Neukunden-Akquise fand fast ausschließlich über Empfehlungen statt – ein Wachstumshemmnis.' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Unsere Strategie: Dreistufiger Content-Ansatz' }] },
      { type: 'paragraph', content: [{ text: 'Wir entwickelten eine dreistufige SEO-Strategie, die die gesamte Customer Journey abdeckt:' }]},
      { type: 'paragraph', content: [{ text: '1. Branchen-Content: Spezifische Landing Pages für Automotive, Medizintechnik, Kunststoffe, Lacke – jeweils mit branchentypischen Anwendungsfällen und Referenzprojekten.' }]},
      { type: 'paragraph', content: [{ text: '2. Methoden-Content: Technische Detailseiten für jede Analysemethode – DSC, TGA, GPC, FTIR, REM – mit Erklärungen, Anwendungsgebieten und typischen Fragestellungen.' }]},
      { type: 'paragraph', content: [{ text: '3. Anwendungs-Content: Problem-orientierte Seiten für typische Szenarien – "Spritzgussfehler analysieren", "Kunststoff identifizieren", "Alterungsverhalten prüfen".' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Die Ergebnisse: Sichtbarkeit für Spezialisten' }] },
      { type: 'paragraph', content: [{ text: 'Die SEO-Kampagne für ASO demonstriert, wie technische Expertise digital sichtbar wird:' }]},
      { type: 'paragraph', content: [{ text: '• Organischer Traffic: +85% über alle Kanäle' }]},
      { type: 'paragraph', content: [{ text: '• Qualifizierte Anfragen: +40% – und der Anteil von Neukunden stieg deutlich' }]},
      { type: 'paragraph', content: [{ text: '• Sitzungsdauer: +55% – Besucher finden relevante technische Inhalte' }]},
      { type: 'paragraph', content: [{ text: '• Keyword-Rankings: Hunderte Fachbegriffe in den Top-10' }]},
      { type: 'paragraph', content: [{ text: '• Conversion Rate: Verdoppelt durch bessere Nutzerführung' }]},
      { type: 'paragraph', content: [{ text: 'Das Wichtigste: ASO zieht nun genau die Kunden an, die präzise Kunststoffanalytik brauchen – Entwicklungsingenieure, Qualitätsmanager und Schadensermittler, die nach spezifischen Lösungen suchen.' }]},
    ]),
    services: [
      { service: 'Branchenspezifische SEO-Strategie' },
      { service: 'Technischer Fachcontent' },
      { service: 'Methoden-Landing-Pages' },
      { service: 'B2B Lead-Generierung' },
    ],
    tags: [
      { tag: 'SEO' },
      { tag: 'Kunststoffprüfung' },
      { tag: 'Polymeranalytik' },
      { tag: 'Automotive' },
      { tag: 'Medizintechnik' },
    ],
    results: [
      { metric: '+85%', label: 'Organischer Traffic' },
      { metric: '+40%', label: 'Anfragen' },
      { metric: '1.000+', label: 'Kunden' },
    ],
    clientFeedback: {
      quote: 'Kunststoffprüfung ist hochspezialisiert – DSC, GPC, Schadensanalyse. GoldenWing hat unsere Expertise in SEO übersetzt. Jetzt finden uns die Kunden, die genau diese Methoden brauchen.',
      author: 'Geschäftsführung',
      role: 'ASO Analytik Service Obernburg GmbH',
    },
    featured: false,
    order: 22,
    en: {
      title: 'ASO Analytik Service Obernburg - SEO for Germany\'s Plastics Experts',
      description: 'Polymers, medical technology, automotive: How we made an accredited testing laboratory with 50 experts and over 1,000 customers the first choice for plastics analytics in Germany. ASO in Erlenbach – DIN EN ISO/IEC 17025 accredited.',
      companyDescription: 'ASO Analytik Service Obernburg GmbH (Glanzstoffplatz 1, 63906 Erlenbach) has been DIN EN ISO/IEC 17025 accredited for over 25 years. With 50 experts and over 1,000 regular customers, ASO is the leading provider for plastics and polymer analytics in Germany. The method spectrum includes chromatography, spectroscopy, thermal analysis, microscopy, X-ray diffraction and more.',
      challenge: 'ASO Analytik Service Obernburg in Erlenbach was the go-to for plastics testing – once a customer, always a customer. Over 1,000 companies trusted the 50 experts. The problem? New customers couldn\'t find ASO. "DSC analysis" – no rankings. "Polymer identification" – nothing. A DIN EN ISO/IEC 17025 accredited laboratory losing online to less qualified providers.',
      solution: 'We positioned ASO as what it is: Germany\'s premier address for plastics and polymer analytics. SEO strategy by industry (automotive, medical technology, chemicals), by method (DSC, GPC, SEM, FTIR), and by application (failure analysis, quality assurance). Content hubs for all disciplines.',
      longDescription: createSimpleRichText([
        { type: 'heading', tag: 'h3', text: 'Germany\'s Plastics Specialists' },
        { type: 'paragraph', text: 'ASO Analytik Service Obernburg GmbH at Glanzstoffplatz 1 in 63906 Erlenbach has been DIN EN ISO/IEC 17025 accredited for over 25 years. With 50 experts and over 1,000 regular customers, ASO is the leading provider for plastics and polymer analytics in Germany.' },
        { type: 'paragraph', text: 'The method spectrum is impressive: Chromatography (GC, HPLC), Spectroscopy (IR, Raman, NMR 400 MHz, UV/Vis), Thermal Analysis (TGA, DSC), Microscopy (light and scanning electron microscopy), X-ray diffraction (XRD), particle size analysis, environmental simulation, mechanical testing, and emission testing.' },
        { type: 'heading', tag: 'h3', text: 'The Results' },
        { type: 'paragraph', text: 'The result: 85% more organic traffic, 40% more qualified inquiries, 55% longer session duration. ASO now ranks for hundreds of relevant technical terms – attracting exactly the customers who need precise plastics analytics.' },
      ]),
      services: [
        { service: 'Industry-Specific SEO Strategy' },
        { service: 'Technical Expert Content' },
        { service: 'Method Landing Pages' },
        { service: 'B2B Lead Generation' },
      ],
      tags: [
        { tag: 'SEO' },
        { tag: 'Plastics Testing' },
        { tag: 'Polymer Analytics' },
        { tag: 'Automotive' },
        { tag: 'Medical Technology' },
      ],
      results: [
        { metric: '+85%', label: 'Organic Traffic' },
        { metric: '+40%', label: 'Inquiries' },
        { metric: '1,000+', label: 'Customers' },
      ],
      clientFeedback: {
        quote: 'Plastics testing is highly specialized – DSC, GPC, failure analysis. GoldenWing translated our expertise into SEO. Now customers find us who need exactly these methods.',
        author: 'Management',
        role: 'ASO Analytik Service Obernburg GmbH',
      },
    },
  },

  // ============================================
  // 4. IMG LABOR (Edelmetalle)
  // ============================================
  {
    title: 'IMG Institut für Materialprüfung Glörfeld - SEO für Edelmetall-Expertise',
    slug: 'img-labor',
    client: 'Institut für Materialprüfung Glörfeld GmbH',
    category: 'seo',
    year: 2024,
    liveUrl: 'https://img-labor.de/',
    description: 'Gold, Silber, Platin, Seltene Erden, E-Waste: Wie wir ein ISO-akkreditiertes Labor mit über 40 Jahren Erfahrung in der Edelmetallanalyse zum digitalen Branchenführer gemacht haben. IMG in Willich – IPMI-Partner und europaweit renommiert.',
    companyDescription: 'Das Institut für Materialprüfung Glörfeld GmbH (Frankenseite 74-76, 47877 Willich) ist seit 1977 europaweit renommiert für präzise Edelmetall-Analytik. Als ISO-akkreditiertes Prüflabor und IPMI-Partner (International Precious Metals Institute) bietet IMG Probenahme, Präparation, Edelmetallanalyse (Gold, Silber, Platin, Palladium, Rhodium), Metallanalyse, Seltene Erden, Black Mass und E-Waste Analytik.',
    challenge: 'Das Institut für Materialprüfung Glörfeld in Willich war seit 1977 ein offenes Geheimnis: Wer Edelmetalle präzise analysieren musste, kam zu IMG. IPMI-Partner, ISO-akkreditiert, über 40 Jahre Expertise. Das Problem? Online existierte diese Reputation nicht. "Goldanalyse Labor" – keine Rankings. "Edelmetall Zertifizierung" – andere waren vorne.',
    solution: 'Wir positionierten IMG als das, was es ist: Europas renommierte Adresse für Edelmetallanalyse. SEO für alle Edelmetalle (Gold, Silber, Platin, Palladium, Rhodium), für neue Märkte (Seltene Erden, Black Mass, E-Waste) und für alle Branchen (Metallhandel, Recycling, Forschung).',
    longDescription: createRichText([
      { type: 'heading', tag: 'h3', content: [{ text: 'Europas Referenzadresse für Edelmetallanalytik seit 1977' }] },
      { type: 'paragraph', content: [
        { text: 'Das ' },
        { text: 'Institut für Materialprüfung Glörfeld GmbH', link: 'https://img-labor.de/' },
        { text: ' in Willich (Frankenseite 74-76, 47877 Willich) ist keine gewöhnliche Prüfstelle – es ist eine Institution. Seit 1977, also seit fast einem halben Jahrhundert, ist IMG die Referenzadresse für präzise Edelmetallanalytik in Europa. Was als spezialisiertes Familienlabor begann, ist heute ein ISO-akkreditiertes Prüflabor mit internationaler Reputation.' }
      ]},
      { type: 'paragraph', content: [{ text: 'Die Mitgliedschaft im International Precious Metals Institute (IPMI) unterstreicht den Status: IMG gehört zum exklusiven Kreis der weltweit anerkannten Edelmetall-Experten. Diese Akkreditierung ist nicht käuflich – sie muss durch jahrzehntelange Präzision und Integrität verdient werden.' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Das vollständige Leistungsspektrum' }] },
      { type: 'paragraph', content: [
        { text: 'IMG bietet den kompletten Workflow der Edelmetallanalytik aus einer Hand. Die ' },
        { text: 'Probenahme', link: 'https://img-labor.de/services/probenahmen/' },
        { text: ' erfolgt nach standardisierten Verfahren, die auch vor Gericht Bestand haben. Die ' },
        { text: 'Präparation', link: 'https://img-labor.de/services/praeparation/' },
        { text: ' bewältigt Mengen von Kleinstproben bis zu mehreren Tonnen – mit stets homogener Aufbereitung für repräsentative Ergebnisse.' }
      ]},
      { type: 'paragraph', content: [
        { text: 'Im Kern steht die ' },
        { text: 'Edelmetallanalyse', link: 'https://img-labor.de/services/analyse-von-edelmetallen/' },
        { text: ': Gold, Silber, Platin, Palladium und Rhodium werden mit höchster Präzision quantifiziert. Ergänzt wird dies durch die ' },
        { text: 'allgemeine Metallanalytik', link: 'https://img-labor.de/services/analyse-von-metallen/' },
        { text: ' für Basismetalle und Legierungen sowie die ' },
        { text: 'Spurenanalytik', link: 'https://img-labor.de/services/spurenanalytik/' },
        { text: ' für niedrigste Konzentrationen.' }
      ]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Zukunftsmärkte: Seltene Erden, Black Mass und E-Waste' }] },
      { type: 'paragraph', content: [
        { text: 'IMG hat früh die Märkte der Zukunft erkannt. Die Analyse ' },
        { text: 'Seltener Erden', link: 'https://img-labor.de/services/analyse-seltenen-erden/' },
        { text: ' ist unverzichtbar für die Elektronikindustrie und das Recycling von Permanentmagneten. ' },
        { text: 'Black Mass', link: 'https://img-labor.de/services/black-mass/' },
        { text: ' – das Zwischenprodukt beim Batterie-Recycling – erfordert spezialisierte Analytik für Lithium, Kobalt, Nickel und andere kritische Rohstoffe.' }
      ]},
      { type: 'paragraph', content: [
        { text: 'Die ' },
        { text: 'E-Waste Analytik', link: 'https://img-labor.de/services/e-waste/' },
        { text: ' rundet das Portfolio ab: Wenn Elektronikschrott recycelt wird, muss der Edelmetallgehalt präzise bestimmt werden – die Grundlage für faire Abrechnungen und effizientes Recycling.' }
      ]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Kunden aus allen Branchen' }] },
      { type: 'paragraph', content: [{ text: 'Das Kundenspektrum von IMG spiegelt die Vielseitigkeit wider: Metallhändler und Raffinerien verlassen sich auf IMG-Analysen für ihre Transaktionen. Recyclingunternehmen benötigen präzise Werte für die Kalkulation. Schmuckhersteller und Goldschmiede lassen Legierungen prüfen. Forschungsinstitute nutzen die akkreditierten Methoden für wissenschaftliche Arbeiten.' }]},
      { type: 'paragraph', content: [{ text: 'Eine Besonderheit: IMG bietet auch Handelschemiker-Dienste an – unabhängige Gutachten und Zertifikate, die im Handelsverkehr als neutrale Referenz dienen. Wenn es um große Summen geht, vertrauen beide Parteien auf IMG.' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Das SEO-Problem: Offline-Reputation, Online-Unsichtbarkeit' }] },
      { type: 'paragraph', content: [{ text: 'Die Reputation von IMG war in der Branche legendär – aber im Internet praktisch unsichtbar. Wer "Goldanalyse Labor" googelte, fand Hobbychemiker und Schmuckankäufer, aber nicht das IPMI-akkreditierte Institut mit 40 Jahren Erfahrung. Wer "Edelmetall Zertifizierung Deutschland" suchte, landete bei weniger qualifizierten Anbietern.' }]},
      { type: 'paragraph', content: [{ text: 'Besonders kritisch: Die Zukunftsmärkte – Seltene Erden, Black Mass, E-Waste – wurden von neuen Playern besetzt, während IMG seine Expertise in diesen Bereichen nicht digital kommunizierte. Ein Wachstumsmarkt, an dem IMG nicht partizipierte.' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Unsere Strategie: Expertise sichtbar machen' }] },
      { type: 'paragraph', content: [{ text: 'Wir entwickelten eine mehrdimensionale SEO-Strategie:' }]},
      { type: 'paragraph', content: [{ text: '1. Edelmetall-Pillar-Pages: Separate, tiefgehende Seiten für Gold, Silber, Platin, Palladium und Rhodium – jeweils mit Methoden, Anwendungen und Branchen.' }]},
      { type: 'paragraph', content: [{ text: '2. Zukunftsmärkte-Content: Umfassende Ressourcen zu Seltenen Erden, Black Mass und E-Waste – positioniert für die Entscheider in wachsenden Industrien.' }]},
      { type: 'paragraph', content: [{ text: '3. Branchen-Landing-Pages: Spezifischer Content für Recycling, Metallhandel, Schmuckindustrie und Forschung.' }]},
      { type: 'paragraph', content: [{ text: '4. Trust-Signale: Die IPMI-Mitgliedschaft, ISO-Akkreditierung und 40-jährige Historie wurden prominent kommuniziert.' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Die Ergebnisse: Europäische Sichtbarkeit' }] },
      { type: 'paragraph', content: [{ text: 'Die Transformation von IMG zeigt, wie traditionsreiche Expertise digital sichtbar wird:' }]},
      { type: 'paragraph', content: [{ text: '• Organischer Traffic: +78% innerhalb von 12 Monaten' }]},
      { type: 'paragraph', content: [{ text: '• EU-weite Sichtbarkeit: Top-Rankings in Deutschland, Österreich, Schweiz und Benelux' }]},
      { type: 'paragraph', content: [{ text: '• Zukunftsmärkte: +150% Anfragen für Seltene Erden, Black Mass und E-Waste' }]},
      { type: 'paragraph', content: [{ text: '• Keyword-Rankings: Dominanz für alle relevanten Edelmetall-Begriffe' }]},
      { type: 'paragraph', content: [{ text: '• Conversion: Deutlich mehr qualifizierte Anfragen von Recyclingunternehmen und Metallhändlern' }]},
      { type: 'paragraph', content: [{ text: 'Das Wichtigste: IMG ist nun digital das, was es offline seit fast 50 Jahren ist – Europas Referenzadresse für Edelmetallanalytik.' }]},
    ]),
    services: [
      { service: 'SEO für Edelmetallanalytik' },
      { service: 'Content für neue Märkte (E-Waste, Seltene Erden)' },
      { service: 'Internationale SEO' },
      { service: 'B2B Positionierung' },
    ],
    tags: [
      { tag: 'SEO' },
      { tag: 'Edelmetallanalyse' },
      { tag: 'Gold' },
      { tag: 'Recycling' },
      { tag: 'Seltene Erden' },
    ],
    results: [
      { metric: '+78%', label: 'Organischer Traffic' },
      { metric: 'EU-weit', label: 'Sichtbarkeit' },
      { metric: '40+', label: 'Jahre Erfahrung' },
    ],
    clientFeedback: {
      quote: 'Als IPMI-Partner haben wir höchste Standards in der Edelmetallanalyse. GoldenWing hat diese Expertise digital sichtbar gemacht – für Gold, Recycling, E-Waste und Seltene Erden.',
      author: 'Geschäftsführung',
      role: 'Institut für Materialprüfung Glörfeld GmbH',
    },
    featured: false,
    order: 23,
    en: {
      title: 'IMG Institut für Materialprüfung Glörfeld - SEO for Precious Metal Expertise',
      description: 'Gold, silver, platinum, rare earths, e-waste: How we made an ISO-accredited laboratory with over 40 years of experience in precious metals analysis the digital industry leader. IMG in Willich – IPMI partner and renowned throughout Europe.',
      companyDescription: 'Institut für Materialprüfung Glörfeld GmbH (Frankenseite 74-76, 47877 Willich) has been renowned throughout Europe for precise precious metals analytics since 1977. As an ISO-accredited testing laboratory and IPMI partner (International Precious Metals Institute), IMG offers sampling, preparation, precious metals analysis (gold, silver, platinum, palladium, rhodium), metals analysis, rare earths, black mass and e-waste analytics.',
      challenge: 'Institut für Materialprüfung Glörfeld in Willich had been an open secret since 1977: Anyone needing precise precious metal analysis came to IMG. IPMI partner, ISO-accredited, over 40 years of expertise. The problem? This reputation didn\'t exist online. "Gold analysis laboratory" – no rankings. "Precious metal certification" – others ranked higher.',
      solution: 'We positioned IMG as what it is: Europe\'s renowned address for precious metals analysis. SEO for all precious metals (gold, silver, platinum, palladium, rhodium), for new markets (rare earths, black mass, e-waste), and for all industries (metal trading, recycling, research).',
      longDescription: createSimpleRichText([
        { type: 'heading', tag: 'h3', text: 'Over 40 Years of Precision in Precious Metals' },
        { type: 'paragraph', text: 'Institut für Materialprüfung Glörfeld GmbH (Frankenseite 74-76, 47877 Willich) has been renowned throughout Europe for precise precious metals analytics since 1977. As an ISO-accredited testing laboratory and IPMI partner, IMG meets the highest international standards.' },
        { type: 'paragraph', text: 'The service spectrum includes: Sampling, preparation (up to several tons), precious metals analysis (gold, silver, platinum, palladium, rhodium), metals analysis, rare earths, black mass, and e-waste analytics.' },
        { type: 'heading', tag: 'h3', text: 'The Results' },
        { type: 'paragraph', text: '78% more organic traffic, EU-wide visibility for all relevant precious metals keywords, and significantly more inquiries from the growing recycling and e-waste segment.' },
      ]),
      services: [
        { service: 'SEO for Precious Metals Analytics' },
        { service: 'Content for New Markets (E-Waste, Rare Earths)' },
        { service: 'International SEO' },
        { service: 'B2B Positioning' },
      ],
      tags: [
        { tag: 'SEO' },
        { tag: 'Precious Metals Analysis' },
        { tag: 'Gold' },
        { tag: 'Recycling' },
        { tag: 'Rare Earths' },
      ],
      results: [
        { metric: '+78%', label: 'Organic Traffic' },
        { metric: 'EU-wide', label: 'Visibility' },
        { metric: '40+', label: 'Years Experience' },
      ],
      clientFeedback: {
        quote: 'As an IPMI partner, we have the highest standards in precious metals analysis. GoldenWing made this expertise digitally visible – for gold, recycling, e-waste, and rare earths.',
        author: 'Management',
        role: 'Institut für Materialprüfung Glörfeld GmbH',
      },
    },
  },

  // ============================================
  // 5. FADER UMWELTANALYTIK (KORRIGIERT!)
  // ============================================
  {
    title: 'FADER Umweltanalytik - SEO für Karlsruhes Wasser-Experten',
    slug: 'fader',
    client: 'FADER Umweltanalytik GmbH',
    category: 'seo',
    year: 2024,
    liveUrl: 'https://fader.de/',
    description: 'Trinkwasser, Schwimmbäder, Grundwasser, Technische Hygiene: Wie wir ein akkreditiertes Umweltlabor mit 40 Jahren Erfahrung und 25 Spezialisten in Karlsruhe zur regionalen Nummer 1 gemacht haben. FADER – DIN EN ISO/IEC 17025 akkreditiert.',
    companyDescription: 'Die FADER Umweltanalytik GmbH wurde vor über 40 Jahren in Karlsruhe gegründet und hat sich seitdem zum führenden Umweltlabor der Region entwickelt. Am Standort Reichardtstraße 30a in 76227 Karlsruhe arbeiten rund 25 hochqualifizierte Spezialisten aus den Bereichen Chemie, Biologie, Geologie und Ingenieurwesen. Das Labor ist DIN EN ISO/IEC 17025:2018 akkreditiert und als Trinkwasseruntersuchungsstelle nach §15 TrinkwV vom Land Baden-Württemberg zugelassen. Das Besondere an FADER: Die einzigartige Kombination aus akkreditiertem Labor und Ingenieurbüro unter einem Dach ermöglicht ganzheitliche Lösungen – von der Probenahme über die Analytik bis zur fachkundigen Beratung und Handlungsempfehlung.',
    challenge: 'FADER Umweltanalytik stand vor einem klassischen Dilemma: Seit über 40 Jahren war das Labor in Karlsruhe der verlässliche Partner für Kommunen, Wasserversorger, Schwimmbäder und Industrieunternehmen. Die 25 Spezialisten genossen in der Region einen exzellenten Ruf – Stammkunden schätzten die schnellen Turnaround-Zeiten, die akkurate Analytik und die kompetente Beratung. Doch das Internet hatte FADER übersehen. Wer "Trinkwasseranalyse Karlsruhe" googelte, fand andere Labore. Wer "Schwimmbadwasser Prüfung Baden-Württemberg" suchte, landete bei der Konkurrenz. Neue Kunden – insbesondere jüngere Facility Manager, neu gegründete Wasserversorger oder zugezogene Industrieunternehmen – kannten FADER schlicht nicht. Die digitale Unsichtbarkeit kostete das Labor potenzielle Neukunden und gefährdete langfristig die Marktposition.',
    solution: 'Unsere Strategie für FADER basierte auf drei Säulen: Erstens entwickelten wir eine umfassende Local-SEO-Strategie für den gesamten Raum Baden-Württemberg, mit Fokus auf Karlsruhe, Pforzheim, Rastatt, Baden-Baden und die umliegenden Landkreise. Für jeden der fünf Kernbereiche – Trinkwasser, Schwimmbäder, Grundwasser, Technische Hygiene und Sedimente – erstellten wir optimierte Service-Seiten mit fachlich fundiertem Content. Zweitens optimierten wir das Google Business Profil für maximale lokale Sichtbarkeit: regelmäßige Posts, Fotos vom Labor, Q&A-Bereich und aktives Review-Management. Drittens implementierten wir Schema.org Markup für alle Services, um in den Suchergebnissen mit Rich Snippets hervorzustechen.',
    longDescription: createRichText([
      { type: 'heading', tag: 'h3', content: [{ text: 'Vier Jahrzehnte Umweltchemie-Kompetenz in Karlsruhe' }] },
      { type: 'paragraph', content: [
        { text: 'Die Geschichte der ' },
        { text: 'FADER Umweltanalytik GmbH', link: 'https://fader.de/' },
        { text: ' ist eine Geschichte kontinuierlicher Expertise. Vor über 40 Jahren gegründet, hat sich das Labor am Standort Reichardtstraße 30a in 76227 Karlsruhe zum Kompetenzzentrum für Umweltchemie in der Technologieregion Karlsruhe entwickelt. Was als kleines Speziallabor begann, ist heute ein multidisziplinäres Team von rund 25 Fachleuten aus Chemie, Biologie, Geologie und Ingenieurwesen.' }
      ]},
      { type: 'paragraph', content: [
        { text: 'Das Besondere an FADER ist die Kombination aus akkreditiertem Prüflabor und Ingenieurbüro unter einem Dach. Kunden erhalten nicht nur präzise Messwerte, sondern ganzheitliche Lösungen: von der fachgerechten Probenahme über die akkreditierte Analytik bis zur qualifizierten Beratung und konkreten Handlungsempfehlungen. Diese Integration macht FADER einzigartig in der Region.' }
      ]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Höchste Qualitätsstandards durch Akkreditierung' }] },
      { type: 'paragraph', content: [
        { text: 'Als DIN EN ISO/IEC 17025:2018 akkreditiertes Labor und vom Land Baden-Württemberg zugelassene ' },
        { text: 'Trinkwasseruntersuchungsstelle', link: 'https://fader.de/services/trinkwasser/' },
        { text: ' nach §15 TrinkwV erfüllt FADER die höchsten Qualitätsstandards. Diese Akkreditierung ist kein Selbstzweck – sie garantiert Kunden, dass jede Analyse nach international anerkannten Methoden durchgeführt wird und die Ergebnisse vor Behörden und Gerichten Bestand haben.' }
      ]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Die fünf Kernbereiche der FADER-Analytik' }] },
      { type: 'paragraph', content: [
        { text: 'FADER hat sich auf fünf Kernbereiche spezialisiert, die das gesamte Spektrum der Wasser- und Umweltanalytik abdecken:' }
      ]},
      { type: 'paragraph', content: [
        { text: '1. ' },
        { text: 'Trinkwasser', link: 'https://fader.de/services/trinkwasser/' },
        { text: ': Von der routinemäßigen Trinkwasserüberwachung für Wasserversorger bis zur Einzelprobe für Hausbrunnenbesitzer – FADER analysiert nach TrinkwV alle relevanten Parameter. Besonders gefragt: die Legionellen-Untersuchung für Mehrfamilienhäuser und Gewerbebetriebe.' }
      ]},
      { type: 'paragraph', content: [
        { text: '2. ' },
        { text: 'Schwimmbäder', link: 'https://fader.de/services/schwimmbaeder/' },
        { text: ': Öffentliche Bäder, Hotelpools, Whirlpools und private Schwimmbecken – FADER prüft die Wasserqualität nach DIN 19643 und berät bei Problemen mit Chlor, pH-Wert oder mikrobiologischer Belastung.' }
      ]},
      { type: 'paragraph', content: [
        { text: '3. ' },
        { text: 'Grundwasser', link: 'https://fader.de/services/grundwasser/' },
        { text: ': Für Industriestandorte, Kommunen und Umweltgutachter analysiert FADER Grundwasserproben auf Schadstoffe, Nährstoffe und physikalisch-chemische Parameter. Wichtig für Bauvorhaben, Altlastenerkundung und Umweltmonitoring.' }
      ]},
      { type: 'paragraph', content: [
        { text: '4. ' },
        { text: 'Technische Hygiene', link: 'https://fader.de/services/technische-hygiene/' },
        { text: ': Klimaanlagen, Kühltürme, Befeuchtungsanlagen – überall wo Wasser in technischen Systemen zirkuliert, können Hygieneprobleme entstehen. FADER untersucht auf Legionellen, Pseudomonaden und andere Keime nach VDI 6022 und VDI 2047.' }
      ]},
      { type: 'paragraph', content: [
        { text: '5. ' },
        { text: 'Sedimente und Schadensfälle', link: 'https://fader.de/services/sedimente-und-schadensfaelle/' },
        { text: ': Bei Umweltschäden, Gewässerverunreinigungen oder Verdachtsfällen führt FADER forensische Analysen durch und erstellt gerichtsfeste Gutachten.' }
      ]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Unsere SEO-Strategie: Von der Unsichtbarkeit zur Marktführerschaft' }] },
      { type: 'paragraph', content: [{ text: 'Die digitale Transformation von FADER begann mit einer umfassenden Keyword-Recherche. Wir identifizierten über 200 relevante Suchbegriffe – von "Trinkwasseranalyse Karlsruhe" über "Legionellenprüfung Pforzheim" bis "Schwimmbadwasser Labor Baden-Württemberg". Für jeden dieser Begriffe analysierten wir Suchvolumen, Wettbewerb und Nutzerintention.' }]},
      { type: 'paragraph', content: [{ text: 'Die Content-Strategie folgte dem Pillar-Cluster-Modell: Für jeden der fünf Kernbereiche erstellten wir eine umfassende Pillar-Page mit allen wichtigen Informationen, FAQs und Handlungsempfehlungen. Diese wurden durch spezifischere Unterseiten ergänzt – etwa "Legionellenprüfung für Vermieter" oder "Schwimmbadwasser-Probleme lösen".' }]},
      { type: 'paragraph', content: [{ text: 'Das Google Business Profil wurde zum lokalen Aushängeschild: Professionelle Fotos von Labor und Team, regelmäßige Posts zu aktuellen Themen (z.B. "Legionellen-Saison: Jetzt prüfen lassen"), ein gepflegter Q&A-Bereich und aktives Review-Management. Innerhalb von sechs Monaten stieg die Anzahl der Google-Maps-Aufrufe um 340%.' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Die Ergebnisse: Messbare Erfolge auf allen Ebenen' }] },
      { type: 'paragraph', content: [{ text: 'Die SEO-Kampagne für FADER zeigt, was strategische Suchmaschinenoptimierung für ein regionales Labor bewirken kann:' }]},
      { type: 'paragraph', content: [{ text: '• Organischer Traffic: +72% innerhalb von 12 Monaten' }]},
      { type: 'paragraph', content: [{ text: '• Google Maps Aufrufe: +340% (von durchschnittlich 450 auf über 1.980 pro Monat)' }]},
      { type: 'paragraph', content: [{ text: '• Keyword-Rankings: Top-3-Positionen für alle relevanten lokalen Suchbegriffe' }]},
      { type: 'paragraph', content: [{ text: '• Anfragen: +58% mehr Kontaktanfragen über die Website' }]},
      { type: 'paragraph', content: [{ text: '• Neukunden: Spürbar mehr Erstanfragen von Kommunen, Facility Managern und Industriekunden' }]},
      { type: 'paragraph', content: [{ text: 'Besonders erfreulich: FADER gewinnt nun regelmäßig Kunden, die das Labor vorher nicht kannten – darunter neu gegründete Wasserversorger, zugezogene Unternehmen und jüngere Facility Manager, die online nach Lösungen suchen.' }]},
    ]),
    services: [
      { service: 'Local SEO Baden-Württemberg' },
      { service: 'Service-spezifische Landing Pages' },
      { service: 'Content-Strategie Umweltanalytik' },
      { service: 'Google Business Optimierung' },
    ],
    tags: [
      { tag: 'Local SEO' },
      { tag: 'Trinkwasser' },
      { tag: 'Schwimmbadwasser' },
      { tag: 'Umweltanalytik' },
      { tag: 'Karlsruhe' },
    ],
    results: [
      { metric: '+72%', label: 'Organischer Traffic' },
      { metric: '40+', label: 'Jahre Erfahrung' },
      { metric: '25', label: 'Spezialisten' },
    ],
    clientFeedback: {
      quote: 'Als akkreditierte Trinkwasseruntersuchungsstelle haben wir höchste Ansprüche. GoldenWing hat unsere Expertise in Wasser und Hygiene digital sichtbar gemacht – jetzt finden uns die richtigen Kunden.',
      author: 'Geschäftsführung',
      role: 'FADER Umweltanalytik GmbH, Karlsruhe',
    },
    featured: true,
    order: 24,
    en: {
      title: 'FADER Umweltanalytik - SEO for Karlsruhe\'s Water Experts',
      description: 'Drinking water, swimming pools, groundwater, technical hygiene: How we made an accredited environmental laboratory with 40 years of experience and 25 specialists in Karlsruhe the regional number 1. FADER – DIN EN ISO/IEC 17025 accredited.',
      companyDescription: 'FADER Umweltanalytik GmbH was founded over 40 years ago in Karlsruhe and has since developed into the leading environmental laboratory in the region. At the Reichardtstraße 30a location in 76227 Karlsruhe, around 25 highly qualified specialists from chemistry, biology, geology, and engineering work together. The laboratory is DIN EN ISO/IEC 17025:2018 accredited and licensed as a drinking water testing facility per §15 TrinkwV by the state of Baden-Württemberg. What makes FADER unique: The combination of accredited laboratory and engineering office under one roof enables holistic solutions – from sampling through analytics to expert consultation and recommendations.',
      challenge: 'FADER Umweltanalytik faced a classic dilemma: For over 40 years, the laboratory in Karlsruhe had been the reliable partner for municipalities, water suppliers, swimming pools, and industrial companies. The 25 specialists enjoyed an excellent reputation in the region – regular customers appreciated the fast turnaround times, accurate analytics, and competent advice. But the internet had overlooked FADER. Anyone googling "drinking water analysis Karlsruhe" found other laboratories. Anyone searching "swimming pool water testing Baden-Württemberg" ended up with competitors. New customers – especially younger facility managers, newly founded water suppliers, or relocated industrial companies – simply didn\'t know FADER. The digital invisibility was costing the laboratory potential new customers and threatening its long-term market position.',
      solution: 'Our strategy for FADER was based on three pillars: First, we developed a comprehensive local SEO strategy for the entire Baden-Württemberg region, focusing on Karlsruhe, Pforzheim, Rastatt, Baden-Baden, and surrounding districts. For each of the five core areas – drinking water, swimming pools, groundwater, technical hygiene, and sediments – we created optimized service pages with expert content. Second, we optimized the Google Business profile for maximum local visibility: regular posts, laboratory photos, Q&A section, and active review management. Third, we implemented Schema.org markup for all services to stand out in search results with rich snippets.',
      longDescription: createSimpleRichText([
        { type: 'heading', tag: 'h3', text: 'Four Decades of Environmental Chemistry Expertise in Karlsruhe' },
        { type: 'paragraph', text: 'The story of FADER Umweltanalytik GmbH is one of continuous expertise. Founded over 40 years ago, the laboratory at Reichardtstraße 30a in 76227 Karlsruhe has developed into the competence center for environmental chemistry in the Karlsruhe Technology Region. What began as a small specialty laboratory is now a multidisciplinary team of around 25 experts from chemistry, biology, geology, and engineering.' },
        { type: 'paragraph', text: 'What makes FADER special is the combination of accredited testing laboratory and engineering office under one roof. Customers receive not just precise measurements, but holistic solutions: from proper sampling through accredited analytics to qualified consultation and concrete recommendations. This integration makes FADER unique in the region.' },
        { type: 'heading', tag: 'h3', text: 'Highest Quality Standards Through Accreditation' },
        { type: 'paragraph', text: 'As a DIN EN ISO/IEC 17025:2018 accredited laboratory and Baden-Württemberg licensed drinking water testing facility per §15 TrinkwV, FADER meets the highest quality standards. This accreditation is not an end in itself – it guarantees customers that every analysis is performed according to internationally recognized methods and that results will hold up before authorities and courts.' },
        { type: 'heading', tag: 'h3', text: 'The Five Core Areas of FADER Analytics' },
        { type: 'paragraph', text: 'FADER has specialized in five core areas covering the entire spectrum of water and environmental analytics: 1. Drinking Water: From routine monitoring for water suppliers to individual samples for well owners – FADER analyzes all relevant parameters according to TrinkwV. Especially in demand: Legionella testing for apartment buildings and commercial properties.' },
        { type: 'paragraph', text: '2. Swimming Pools: Public pools, hotel pools, whirlpools, and private pools – FADER tests water quality according to DIN 19643 and advises on problems with chlorine, pH levels, or microbiological contamination. 3. Groundwater: For industrial sites, municipalities, and environmental consultants, FADER analyzes groundwater samples for pollutants, nutrients, and physico-chemical parameters.' },
        { type: 'paragraph', text: '4. Technical Hygiene: Air conditioning systems, cooling towers, humidification systems – wherever water circulates in technical systems, hygiene problems can arise. FADER tests for Legionella, Pseudomonas, and other pathogens according to VDI 6022 and VDI 2047. 5. Sediments and Incidents: In case of environmental damage, water contamination, or suspected cases, FADER performs forensic analyses and creates court-proof expert opinions.' },
        { type: 'heading', tag: 'h3', text: 'Our SEO Strategy: From Invisibility to Market Leadership' },
        { type: 'paragraph', text: 'FADER\'s digital transformation began with comprehensive keyword research. We identified over 200 relevant search terms – from "drinking water analysis Karlsruhe" to "Legionella testing Pforzheim" to "swimming pool water lab Baden-Württemberg". For each term, we analyzed search volume, competition, and user intent.' },
        { type: 'paragraph', text: 'The content strategy followed the pillar-cluster model: For each of the five core areas, we created a comprehensive pillar page with all important information, FAQs, and recommendations. These were supplemented by more specific sub-pages – such as "Legionella testing for landlords" or "Solving swimming pool water problems".' },
        { type: 'heading', tag: 'h3', text: 'The Results: Measurable Success Across All Levels' },
        { type: 'paragraph', text: 'The SEO campaign for FADER demonstrates what strategic search engine optimization can achieve for a regional laboratory: Organic traffic +72% within 12 months, Google Maps views +340% (from average 450 to over 1,980 per month), top-3 positions for all relevant local search terms, +58% more contact inquiries via website, noticeably more first-time inquiries from municipalities, facility managers, and industrial customers.' },
      ]),
      services: [
        { service: 'Local SEO Baden-Württemberg' },
        { service: 'Service-specific Landing Pages' },
        { service: 'Environmental Analytics Content Strategy' },
        { service: 'Google Business Optimization' },
      ],
      tags: [
        { tag: 'Local SEO' },
        { tag: 'Drinking Water' },
        { tag: 'Swimming Pool Water' },
        { tag: 'Environmental Analytics' },
        { tag: 'Karlsruhe' },
      ],
      results: [
        { metric: '+72%', label: 'Organic Traffic' },
        { metric: '40+', label: 'Years Experience' },
        { metric: '25', label: 'Specialists' },
      ],
      clientFeedback: {
        quote: 'As an accredited drinking water testing facility, we have the highest standards. GoldenWing made our expertise in water and hygiene digitally visible – now the right customers find us.',
        author: 'Management',
        role: 'FADER Umweltanalytik GmbH, Karlsruhe',
      },
    },
  },

  // ============================================
  // 6. IUL VORPOMMERN
  // ============================================
  {
    title: 'IUL Vorpommern - Local SEO für Mecklenburg-Vorpommerns Umweltlabor',
    slug: 'iul-vorpommern',
    client: 'Industrie- und Umweltlaboratorium Vorpommern GmbH',
    category: 'seo',
    year: 2024,
    liveUrl: 'https://www.iul-vorpommern.de/',
    description: 'Seit 1991 das Umweltlabor für Vorpommern: Wie wir ein DAkkS-akkreditiertes Labor mit 50 Mitarbeitern in Greifswald und Stralsund zur unumstrittenen Nummer 1 der Region gemacht haben. IUL – über 30 Jahre zuverlässige Umweltanalytik.',
    companyDescription: 'Das Industrie- und Umweltlaboratorium Vorpommern GmbH (Am Koppelberg 20, 17489 Greifswald) ist seit 1991 das führende Umweltlabor in Mecklenburg-Vorpommern. Mit Standorten in Greifswald und Stralsund und rund 50 Mitarbeitern bietet IUL DAkkS-akkreditierte Analysen für Wasser, Abwasser, Boden, Luft und Arbeitsplatzmessungen.',
    challenge: 'Das Industrie- und Umweltlaboratorium Vorpommern war seit 1991 das regionale Urgestein – Kommunen, Wasserwerke und Industriebetriebe vertrauten auf die 50 Mitarbeiter in Greifswald und Stralsund. Das Problem? Die digitale Welt hatte Vorpommern vergessen. Wer "Wasseranalyse Mecklenburg-Vorpommern" suchte, fand Labore aus Hamburg oder Berlin – nicht IUL.',
    solution: 'Konsequentes Local SEO für ganz Mecklenburg-Vorpommern. Google Business Profile für beide Standorte, Schema.org Markup, Keywords für jeden Landkreis. Content für alle Services: Wasser, Abwasser, Boden, Luft, Arbeitsplatzmessungen.',
    longDescription: createRichText([
      { type: 'heading', tag: 'h3', content: [{ text: 'Das Umweltlabor der Wiedervereinigung' }] },
      { type: 'paragraph', content: [
        { text: 'Die Geschichte des ' },
        { text: 'Industrie- und Umweltlaboratorium Vorpommern GmbH', link: 'https://www.iul-vorpommern.de/' },
        { text: ' ist untrennbar mit der deutschen Wiedervereinigung verbunden. 1991 gegründet, füllte IUL eine kritische Lücke: Mecklenburg-Vorpommern brauchte ein eigenes, akkreditiertes Umweltlabor. Seitdem hat sich das Labor am Standort Greifswald (Am Koppelberg 20, 17489 Greifswald) zur unumstrittenen Nummer 1 der Region entwickelt.' }
      ]},
      { type: 'paragraph', content: [{ text: 'Mit einem zweiten Standort in Stralsund und rund 50 Mitarbeitern aus Chemie, Biologie und Geologie deckt IUL heute die gesamte Region ab – von der Insel Rügen bis zur Mecklenburgischen Seenplatte, von der Ostseeküste bis ins Landesinnere. Die DAkkS-Akkreditierung nach DIN EN ISO/IEC 17025 garantiert höchste Qualitätsstandards bei jeder Analyse.' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Umweltschutz: Das Kerngeschäft' }] },
      { type: 'paragraph', content: [
        { text: 'Der Bereich ' },
        { text: 'Trink- und Umweltwasseranalyse', link: 'https://www.iul-vorpommern.de/leistungen/trink-umweltwasseranalyse/' },
        { text: ' bildet das Rückgrat der IUL-Services. Das Spektrum ist beeindruckend:' }
      ]},
      { type: 'paragraph', content: [{ text: '• Wasseranalysen: Trinkwasser, Oberflächenwasser, Grundwasser – nach allen relevanten Normen und Verordnungen' }]},
      { type: 'paragraph', content: [{ text: '• Abfall- und Staubanalytik: Charakterisierung von Abfällen, Holzproben, Stäuben für korrekte Entsorgung' }]},
      { type: 'paragraph', content: [{ text: '• Boden und Bauschutt: Bewertung für Bauvorhaben, Altlastenerkundung, Bodenschutz' }]},
      { type: 'paragraph', content: [{ text: '• Grundwassermonitoring: Langzeit-Überwachungsprogramme für Kommunen und Industrie' }]},
      { type: 'paragraph', content: [{ text: '• Raumluft und Schimmel: Fogging-Analysen, Schimmelpilzuntersuchungen, Innenraumbelastungen' }]},
      { type: 'paragraph', content: [{ text: '• Schlämme und Sedimente: Bewertung für Gewässerpflege und Entsorgung' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Industrie & Gewerbe: Partner der Wirtschaft' }] },
      { type: 'paragraph', content: [
        { text: 'Für ' },
        { text: 'Arbeitsplatzmessungen', link: 'https://www.iul-vorpommern.de/leistungen/arbeitsplatzmessungen/' },
        { text: ' ist IUL der verlässliche Partner für alle analytischen Anforderungen:' }
      ]},
      { type: 'paragraph', content: [{ text: '• Arbeitsplatzmessungen: Gefahrstoff-Monitoring, Staubmessungen, Lärmprüfungen nach Arbeitsschutzverordnung' }]},
      { type: 'paragraph', content: [{ text: '• Behälterfreigaben: Analytische Bestätigung für Tank- und Behälterreinigungen' }]},
      { type: 'paragraph', content: [{ text: '• Betriebswasserkontrolle: Regelmäßige Überwachung von Kühl-, Prozess- und Brauchwasser' }]},
      { type: 'paragraph', content: [{ text: '• Lüftungsanlagen: Hygieneinspektionen nach VDI 6022' }]},
      { type: 'paragraph', content: [{ text: '• Schwimmbadwasser: Prüfungen für Hotelpools, Schwimmbäder und Wellnessanlagen' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Privatkunden: Analytik für Jedermann' }] },
      { type: 'paragraph', content: [
        { text: 'Auch ' },
        { text: 'Trinkwasseranalyse', link: 'https://www.iul-vorpommern.de/leistungen/trinkwasseranalyse-komplett/' },
        { text: ' finden bei IUL kompetente Beratung und präzise Analysen: Hausbrunnenbesitzer lassen ihr Trinkwasser prüfen, Gartenbesitzer analysieren Boden für optimale Düngung, Hausbesitzer klären Schimmelverdacht ab. Von der Teichanalyse über Holzschutzmittel-Tests bis zur Prüfung von Kleinkläranlagen – IUL macht Analytik zugänglich.' }
      ]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Das SEO-Problem: Regional stark, digital schwach' }] },
      { type: 'paragraph', content: [{ text: 'Die Situation war paradox: In Vorpommern kannte jeder Umweltingenieur, jeder Bauamtsleiter und jeder Wassermeister das IUL. Die 30 Jahre Reputation waren in der Region fest verankert. Aber digital existierte diese Dominanz nicht.' }]},
      { type: 'paragraph', content: [{ text: 'Wer "Wasseranalyse Mecklenburg-Vorpommern" googelte, fand Labore aus Hamburg oder Berlin – Anbieter, die hunderte Kilometer entfernt waren. Das lokale Urgestein verschwand hinter überregionalen Playern mit besserer SEO. Neue Kunden – junge Ingenieure, zugezogene Unternehmen, Start-ups – fanden IUL schlicht nicht.' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Unsere Strategie: Regionale Dominanz digital abbilden' }] },
      { type: 'paragraph', content: [{ text: 'Wir entwickelten eine hyperlocal SEO-Strategie, die jeden Landkreis abdeckt:' }]},
      { type: 'paragraph', content: [{ text: '• Landkreis-spezifischer Content: Separate Optimierung für Vorpommern-Greifswald, Vorpommern-Rügen, Rostock, Mecklenburgische Seenplatte' }]},
      { type: 'paragraph', content: [{ text: '• Dual-Standort-Strategie: Beide Standorte (Greifswald und Stralsund) mit vollständig optimierten Google Business Profilen' }]},
      { type: 'paragraph', content: [{ text: '• Service-Pillar-Pages: Umfassende Ressourcen für Umweltschutz, Industrie und Privatkunden' }]},
      { type: 'paragraph', content: [{ text: '• Schema.org LocalBusiness: Strukturierte Daten für beide Standorte mit Service-Verknüpfungen' }]},
      { type: 'paragraph', content: [{ text: '• Regionale Keyword-Cluster: "Trinkwasseranalyse Greifswald", "Bodenprobe Rügen", "Wassertest Stralsund" etc.' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Die Ergebnisse: Digitale Marktführerschaft' }] },
      { type: 'paragraph', content: [{ text: 'Die Transformation war durchschlagend:' }]},
      { type: 'paragraph', content: [{ text: '• Organischer Traffic: +68% innerhalb von 8 Monaten' }]},
      { type: 'paragraph', content: [{ text: '• Google Maps: Verdoppelung der Aufrufe und Anfragen' }]},
      { type: 'paragraph', content: [{ text: '• Keyword-Rankings: Top-3-Positionen für alle relevanten lokalen Suchbegriffe' }]},
      { type: 'paragraph', content: [{ text: '• Neukunden: Erstmals signifikante Anfragen von außerhalb des traditionellen Einzugsgebiets' }]},
      { type: 'paragraph', content: [{ text: '• Reichweite: IUL wird nun auch von Kunden aus Rostock und Schwerin gefunden' }]},
      { type: 'paragraph', content: [{ text: 'Das Wichtigste: IUL ist nun digital das, was es offline seit über 30 Jahren ist – die erste Adresse für Umweltanalytik in Mecklenburg-Vorpommern. Die regionale Dominanz ist endlich auch im Internet sichtbar.' }]},
    ]),
    services: [
      { service: 'Local SEO Mecklenburg-Vorpommern' },
      { service: 'Multi-Standort Google Business' },
      { service: 'Schema.org Implementation' },
      { service: 'Regionaler Content' },
    ],
    tags: [
      { tag: 'Local SEO' },
      { tag: 'Umweltlabor' },
      { tag: 'Greifswald' },
      { tag: 'Mecklenburg-Vorpommern' },
      { tag: 'Wasseranalytik' },
    ],
    results: [
      { metric: '+68%', label: 'Organischer Traffic' },
      { metric: 'Top 3', label: 'Lokale Rankings' },
      { metric: '50', label: 'Mitarbeiter' },
    ],
    clientFeedback: {
      quote: 'Als regionales Labor seit 1991 ist lokale Sichtbarkeit alles. GoldenWing hat uns in Vorpommern dominant gemacht – jetzt finden uns Kommunen, Wasserwerke und Industriebetriebe aus der ganzen Region.',
      author: 'Geschäftsführung',
      role: 'IUL Vorpommern GmbH, Greifswald',
    },
    featured: false,
    order: 25,
    en: {
      title: 'IUL Vorpommern - Local SEO for Mecklenburg-Vorpommern\'s Environmental Laboratory',
      description: 'The environmental laboratory for Vorpommern since 1991: How we made a DAkkS-accredited laboratory with 50 employees in Greifswald and Stralsund the undisputed number 1 in the region. IUL – over 30 years of reliable environmental analytics.',
      companyDescription: 'Industrie- und Umweltlaboratorium Vorpommern GmbH (Am Koppelberg 20, 17489 Greifswald) has been the leading environmental laboratory in Mecklenburg-Vorpommern since 1991. With locations in Greifswald and Stralsund and around 50 employees, IUL offers DAkkS-accredited analyses for water, wastewater, soil, air, and workplace measurements.',
      challenge: 'Industrie- und Umweltlaboratorium Vorpommern had been the regional institution since 1991 – municipalities, waterworks, and industrial companies trusted the 50 employees in Greifswald and Stralsund. The problem? The digital world had forgotten Vorpommern. Those searching "water analysis Mecklenburg-Vorpommern" found laboratories from Hamburg or Berlin – not IUL.',
      solution: 'Consistent local SEO for all of Mecklenburg-Vorpommern. Google Business profiles for both locations, Schema.org markup, keywords for every district. Content for all services: water, wastewater, soil, air, workplace measurements.',
      longDescription: createSimpleRichText([
        { type: 'heading', tag: 'h3', text: 'The Regional Institution Since 1991' },
        { type: 'paragraph', text: 'Industrie- und Umweltlaboratorium Vorpommern GmbH (Am Koppelberg 20, 17489 Greifswald) has been the environmental laboratory for Mecklenburg-Vorpommern since reunification. With locations in Greifswald and Stralsund and around 50 employees from chemistry, biology, and geology, IUL covers the entire region.' },
        { type: 'paragraph', text: 'As a DAkkS-accredited laboratory per DIN EN ISO/IEC 17025, IUL offers a broad service spectrum for companies, authorities, environmental organizations, and private individuals.' },
        { type: 'heading', tag: 'h3', text: 'The Results' },
        { type: 'paragraph', text: 'Top-3 rankings for all relevant local keywords, doubling of Google Maps inquiries, 68% more organic traffic. IUL is now digitally what it has been offline for 30 years: the first address for environmental analytics in Vorpommern.' },
      ]),
      services: [
        { service: 'Local SEO Mecklenburg-Vorpommern' },
        { service: 'Multi-Location Google Business' },
        { service: 'Schema.org Implementation' },
        { service: 'Regional Content' },
      ],
      tags: [
        { tag: 'Local SEO' },
        { tag: 'Environmental Laboratory' },
        { tag: 'Greifswald' },
        { tag: 'Mecklenburg-Vorpommern' },
        { tag: 'Water Analytics' },
      ],
      results: [
        { metric: '+68%', label: 'Organic Traffic' },
        { metric: 'Top 3', label: 'Local Rankings' },
        { metric: '50', label: 'Employees' },
      ],
      clientFeedback: {
        quote: 'As a regional laboratory since 1991, local visibility is everything. GoldenWing made us dominant in Vorpommern – now municipalities, waterworks, and industrial companies from the entire region find us.',
        author: 'Management',
        role: 'IUL Vorpommern GmbH, Greifswald',
      },
    },
  },

  // ============================================
  // 7. NOVUM ANALYTIK
  // ============================================
  {
    title: 'Novum Analytik - SEO für Lebensmittelmikrobiologie',
    slug: 'novum-analytik',
    client: 'Novum Analytik GmbH',
    category: 'seo',
    year: 2024,
    liveUrl: 'https://novum-analytik.de/',
    description: 'Salmonellen, Listerien, E.coli, HACCP: Wie wir ein akkreditiertes Labor für Lebensmittelmikrobiologie in Heilbronn zur ersten Adresse für Lebensmittelsicherheit gemacht haben. Novum Analytik – seit 1991 im Dienst der Lebensmittelbranche.',
    companyDescription: 'Die Novum Analytik GmbH (Im Riedgrund 8, 74078 Heilbronn) ist seit über 30 Jahren der Spezialist für Lebensmittelmikrobiologie. Als DIN EN ISO/IEC 17025:2018 akkreditiertes Labor (D-PL-18358-01-00) bietet Novum mikrobiologische Lebensmittelprüfung, Hygieneberatung, HACCP-Beratung, PCR-Prüfungen und arbeitet mit renommierten Institutionen wie DGHM, Robert Koch Institut und BfR zusammen.',
    challenge: 'Novum Analytik in Heilbronn war seit 1991 der stille Partner der Lebensmittelbranche – Produktrückruf, Salmonellen-Verdacht, Hygiene-Audit? Novum war der Anruf. Das Problem? Wer das Labor noch nicht kannte, fand es nicht. "Salmonellen Labor" – keine Rankings. "HACCP Beratung" – Fehlanzeige.',
    solution: 'Wir positionierten Novum Analytik als die erste Adresse für Lebensmittelmikrobiologie. SEO für jeden relevanten Erreger (Salmonellen, Listerien, E.coli), für jeden Service (mikrobiologische Prüfung, HACCP, PCR), für jede Branche (Lebensmittelproduktion, Gastronomie, Handel).',
    longDescription: createRichText([
      { type: 'heading', tag: 'h3', content: [{ text: 'Über 30 Jahre im Dienst der Lebensmittelsicherheit' }] },
      { type: 'paragraph', content: [
        { text: 'Die ' },
        { text: 'Novum Analytik GmbH', link: 'https://novum-analytik.de/' },
        { text: ' in Heilbronn (Im Riedgrund 8, 74078 Heilbronn) ist eine Institution der deutschen Lebensmittelbranche. Seit 1991 – also seit über 30 Jahren – ist Novum der spezialisierte Partner für alles, was mit Lebensmittelmikrobiologie zu tun hat. Als DIN EN ISO/IEC 17025:2018 akkreditiertes Labor (D-PL-18358-01-00) bietet Novum die Präzision, die in einer Branche ohne Fehlertoleranz unverzichtbar ist.' }
      ]},
      { type: 'paragraph', content: [{ text: 'Das Team vereint jahrzehntelange Erfahrung mit modernster Labortechnologie. Wenn ein Lebensmittelhersteller eine Salmonellen-Kontamination vermutet, wenn eine Molkerei Listerien-Tests braucht, wenn ein Fleischverarbeiter sein HACCP-System auditieren lässt – Novum ist der Anruf.' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Mikrobiologische Prüfung als Kernkompetenz' }] },
      { type: 'paragraph', content: [
        { text: 'Die ' },
        { text: 'mikrobiologische Untersuchung', link: 'https://novum-analytik.de/leistung/mikrobiologische-untersuchungen/' },
        { text: ' von Lebensmitteln ist das Herzstück von Novum. Das Spektrum umfasst:' }
      ]},
      { type: 'paragraph', content: [{ text: '• Pathogene Keime: Salmonellen, Listerien, E.coli STEC/EHEC, Campylobacter, Staphylokokken' }]},
      { type: 'paragraph', content: [{ text: '• Hygieneindikatoren: Enterobacteriaceae, Coliforme, Gesamtkeimzahl' }]},
      { type: 'paragraph', content: [{ text: '• Verderbniserreger: Hefen, Schimmelpilze, sporenbildende Bakterien' }]},
      { type: 'paragraph', content: [{ text: '• Spezialanalysen: Legionellen, Pseudomonaden, Allergentests' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Beratung und Konzeptentwicklung' }] },
      { type: 'paragraph', content: [
        { text: 'Novum ist mehr als ein Prüflabor. Die ' },
        { text: 'Mikrobiologie- und Hygieneberatung', link: 'https://novum-analytik.de/leistung/beratung-mikrobiologie-hygiene/' },
        { text: ' hilft Kunden, Kontaminationen zu verstehen und zu verhindern. Die ' },
        { text: 'HACCP-Beratung', link: 'https://novum-analytik.de/leistung/haccp-beratung-konzepte-zur-qualitatssicherung/' },
        { text: ' entwickelt maßgeschneiderte Qualitätssicherungskonzepte für jeden Betrieb.' }
      ]},
      { type: 'paragraph', content: [
        { text: 'Bei Problemen greift die ' },
        { text: 'Fehlersuche und Maßnahmenplanung', link: 'https://novum-analytik.de/leistung/fehlersuche-masnahmenplanung/' },
        { text: ': Wo ist die Kontaminationsquelle? Wie kann der Prozess verbessert werden? Welche Korrekturmaßnahmen sind nötig? Novum liefert Antworten und begleitet die Umsetzung.' }
      ]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Proaktive Qualitätssicherung' }] },
      { type: 'paragraph', content: [
        { text: 'Die ' },
        { text: 'Linienkontrollen (Line-Checks)', link: 'https://novum-analytik.de/leistung/linienkontrollen-line-checks/' },
        { text: ' ermöglichen eine Echtzeitüberwachung der Produktion. Die ' },
        { text: 'Probenahmeplan-Entwicklung', link: 'https://novum-analytik.de/leistung/probenahmeplane/' },
        { text: ' stellt sicher, dass die richtigen Proben an den richtigen Stellen genommen werden. Und die ' },
        { text: 'PCR-Prüfungen', link: 'https://novum-analytik.de/leistung/pcr-untersuchungen/' },
        { text: ' ermöglichen schnelle, hochspezifische Nachweise kritischer Pathogene.' }
      ]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Wissenschaftliche Vernetzung' }] },
      { type: 'paragraph', content: [{ text: 'Novum ist keine isolierte Prüfstelle. Das Labor arbeitet eng mit führenden Institutionen zusammen: DGHM (Deutsche Gesellschaft für Hygiene und Mikrobiologie), Robert Koch Institut, BfR (Bundesinstitut für Risikobewertung), EFSA (Europäische Behörde für Lebensmittelsicherheit). Diese Vernetzung sichert, dass Novum immer auf dem aktuellen Stand der Wissenschaft arbeitet.' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Das SEO-Problem: Stiller Partner ohne Online-Präsenz' }] },
      { type: 'paragraph', content: [{ text: 'In der Lebensmittelbranche war Novum ein Name – bei Qualitätsmanagern, Werksleitern, HACCP-Beauftragten. Wer einmal mit Novum gearbeitet hatte, kam wieder. Aber diese Reputation existierte nur im persönlichen Netzwerk.' }]},
      { type: 'paragraph', content: [{ text: 'Online war Novum praktisch unsichtbar. Wer "Salmonellen Labor" googelte, fand andere. Wer "HACCP Beratung Lebensmittel" suchte, landete bei Beratern ohne Laborhintergrund. Die Kombination aus akkreditiertem Labor UND Beratungskompetenz – das Alleinstellungsmerkmal von Novum – war nicht sichtbar.' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Unsere Strategie: Erreger- und Service-fokussierte SEO' }] },
      { type: 'paragraph', content: [{ text: 'Wir entwickelten eine mehrdimensionale Content-Strategie:' }]},
      { type: 'paragraph', content: [{ text: '1. Erreger-spezifische Landingpages: Separate, tiefgehende Seiten für Salmonellen, Listerien, E.coli, Campylobacter – jeweils mit Nachweismethoden, Grenzwerten, Prävention' }]},
      { type: 'paragraph', content: [{ text: '2. Service-Pillar-Pages: Umfassende Ressourcen zu mikrobiologischer Prüfung, HACCP-Beratung, PCR-Analytik' }]},
      { type: 'paragraph', content: [{ text: '3. Branchen-Content: Spezifische Seiten für Fleischverarbeitung, Molkereien, Backwaren, Convenience Food' }]},
      { type: 'paragraph', content: [{ text: '4. Problem-orientierter Content: "Rückruf vermeiden", "Hygiene-Audit bestehen", "Kontamination aufklären"' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Die Ergebnisse: Gefunden, wenn es darauf ankommt' }] },
      { type: 'paragraph', content: [{ text: 'Die SEO-Kampagne transformierte die digitale Präsenz von Novum:' }]},
      { type: 'paragraph', content: [{ text: '• Organischer Traffic: +72% innerhalb von 10 Monaten' }]},
      { type: 'paragraph', content: [{ text: '• Kontaktanfragen: +35% über alle Kanäle' }]},
      { type: 'paragraph', content: [{ text: '• Keyword-Rankings: Top-Positionen für "Salmonellen Labor", "Listerien Prüfung", "HACCP Beratung"' }]},
      { type: 'paragraph', content: [{ text: '• Neukunden: Deutlich mehr Erstanfragen von Unternehmen, die Novum vorher nicht kannten' }]},
      { type: 'paragraph', content: [{ text: '• Beratungsaufträge: Spürbarer Anstieg durch verbesserte Sichtbarkeit der Beratungskompetenz' }]},
      { type: 'paragraph', content: [{ text: 'Das Wichtigste: Wenn jetzt ein Qualitätsmanager nachts um 3 Uhr "Salmonellen Notfall Labor" googelt – weil gerade ein Produktionslos verdächtig ist – findet er Novum. Genau dann, wenn es darauf ankommt.' }]},
    ]),
    services: [
      { service: 'SEO für Lebensmittelsicherheit' },
      { service: 'HACCP Content-Strategie' },
      { service: 'Erreger-spezifische Landing Pages' },
      { service: 'Conversion-Optimierung' },
    ],
    tags: [
      { tag: 'SEO' },
      { tag: 'Lebensmittelmikrobiologie' },
      { tag: 'HACCP' },
      { tag: 'Salmonellen' },
      { tag: 'Heilbronn' },
    ],
    results: [
      { metric: '+72%', label: 'Organischer Traffic' },
      { metric: '+35%', label: 'Kontaktanfragen' },
      { metric: '30+', label: 'Jahre Erfahrung' },
    ],
    clientFeedback: {
      quote: 'Wenn ein Lebensmittelhersteller "Salmonellen Labor" googelt, muss er uns finden. GoldenWing hat genau das umgesetzt – mit tiefem Verständnis für unsere Branche.',
      author: 'Geschäftsführung',
      role: 'Novum Analytik GmbH, Heilbronn',
    },
    featured: false,
    order: 26,
    en: {
      title: 'Novum Analytik - SEO for Food Microbiology',
      description: 'Salmonella, Listeria, E.coli, HACCP: How we made an accredited laboratory for food microbiology in Heilbronn the first choice for food safety. Novum Analytik – serving the food industry since 1991.',
      companyDescription: 'Novum Analytik GmbH (Im Riedgrund 8, 74078 Heilbronn) has been the specialist for food microbiology for over 30 years. As a DIN EN ISO/IEC 17025:2018 accredited laboratory (D-PL-18358-01-00), Novum offers microbiological food testing, hygiene consulting, HACCP consulting, PCR testing, and works with renowned institutions such as DGHM, Robert Koch Institute, and BfR.',
      challenge: 'Novum Analytik in Heilbronn had been the silent partner of the food industry since 1991 – product recall, Salmonella suspicion, hygiene audit? Novum was the call. The problem? Those who didn\'t know the laboratory couldn\'t find it. "Salmonella laboratory" – no rankings. "HACCP consulting" – nothing.',
      solution: 'We positioned Novum Analytik as the first choice for food microbiology. SEO for every relevant pathogen (Salmonella, Listeria, E.coli), for every service (microbiological testing, HACCP, PCR), for every industry (food production, gastronomy, retail).',
      longDescription: createSimpleRichText([
        { type: 'heading', tag: 'h3', text: 'Food Safety Since 1991' },
        { type: 'paragraph', text: 'Novum Analytik GmbH (Im Riedgrund 8, 74078 Heilbronn) has been the specialist for food microbiology for over 30 years. As a DIN EN ISO/IEC 17025:2018 accredited laboratory, Novum offers the highest quality in microbiological food testing.' },
        { type: 'paragraph', text: 'Novum offers comprehensive services: Microbiological food testing as core competence, microbiology and hygiene consulting, troubleshooting and corrective actions, HACCP consulting and QA concepts, line checks, sampling plan development, and PCR testing.' },
        { type: 'heading', tag: 'h3', text: 'The Results' },
        { type: 'paragraph', text: '72% more organic traffic, 35% more contact inquiries, top rankings for all relevant microbiology keywords. Novum is now found when food safety matters.' },
      ]),
      services: [
        { service: 'SEO for Food Safety' },
        { service: 'HACCP Content Strategy' },
        { service: 'Pathogen-specific Landing Pages' },
        { service: 'Conversion Optimization' },
      ],
      tags: [
        { tag: 'SEO' },
        { tag: 'Food Microbiology' },
        { tag: 'HACCP' },
        { tag: 'Salmonella' },
        { tag: 'Heilbronn' },
      ],
      results: [
        { metric: '+72%', label: 'Organic Traffic' },
        { metric: '+35%', label: 'Contact Inquiries' },
        { metric: '30+', label: 'Years Experience' },
      ],
      clientFeedback: {
        quote: 'When a food manufacturer googles "Salmonella laboratory," they need to find us. GoldenWing implemented exactly that – with deep understanding of our industry.',
        author: 'Management',
        role: 'Novum Analytik GmbH, Heilbronn',
      },
    },
  },

  // ============================================
  // 8. PEBA (KORRIGIERTER NAME)
  // ============================================
  {
    title: 'PEBA Prüfinstitut für Baustoffe - SEO für Berlins Infrastruktur-Experten',
    slug: 'peba',
    client: 'PEBA Prüfinstitut für Baustoffe GmbH',
    category: 'seo',
    year: 2024,
    liveUrl: 'https://peba.de/',
    description: 'Asphalt, Beton, Verdichtung, Flughafenbau: Wie wir ein RAP Stra anerkanntes Prüfinstitut mit über 30 Jahren Erfahrung zum digitalen Branchenführer für Baustoffprüfung in Berlin-Brandenburg gemacht haben. PEBA – Partner für Großprojekte wie BER.',
    companyDescription: 'Das PEBA Prüfinstitut für Baustoffe GmbH (Köpenicker Landstraße 280, 12437 Berlin) ist seit 1990 der unabhängige Spezialist für Baustoffprüfung im Infrastrukturbau. Als RAP Stra anerkannte Prüfstelle unter Leitung von Prof. Dr.-Ing. Großhans führt PEBA Prüfungen für Asphalt, Beton, Boden und Zuschlagstoffe durch – Partner bei Großprojekten wie dem BER.',
    challenge: 'Das PEBA Prüfinstitut für Baustoffe in Berlin war seit 1990 ein fester Name in der Baubranche – Straßenbau, Schienenbau, Flughafenbau, alles was Qualitätsprüfung braucht. Das Problem? Das Internet kannte PEBA nicht. "Asphaltprüfung Berlin" – keine Rankings. "Baustoffprüfung Brandenburg" – andere waren vorne.',
    solution: 'Wir positionierten PEBA als Berlins erste Adresse für Baustoffprüfung im Infrastrukturbau. SEO für alle Prüfbereiche (Asphalt, Beton, Boden, Zuschlagstoffe), Content zu DIN-Normen und ZTV-Standards, Regional-SEO für Berlin-Brandenburg mit Ausweitung auf bundesweite Großprojekte.',
    longDescription: createRichText([
      { type: 'heading', tag: 'h3', content: [{ text: 'Der Garant für Deutschlands Infrastrukturqualität' }] },
      { type: 'paragraph', content: [
        { text: 'Das ' },
        { text: 'PEBA Prüfinstitut für Baustoffe GmbH', link: 'https://peba.de/' },
        { text: ' in Berlin (Köpenicker Landstraße 280, 12437 Berlin) steht seit 1990 für unabhängige, akkreditierte Baustoffprüfung auf höchstem Niveau. Unter der fachlichen Leitung von Prof. Dr.-Ing. Großhans ist PEBA zur ersten Adresse für Qualitätssicherung im Infrastrukturbau in der Region Berlin-Brandenburg geworden.' }
      ]},
      { type: 'paragraph', content: [{ text: 'Die RAP Stra Anerkennung – das Qualitätssiegel für Baustoffprüfung im Straßenbau – ist nur eine von vielen Akkreditierungen. PEBA ist Mitglied bei bup e.V. (Bundesverband unabhängiger Prüfinstitute), der Baukammer Berlin, der FGSV (Forschungsgesellschaft für Straßen- und Verkehrswesen) und dem BGA (Bundesverband Güteschutz). Diese Vernetzung sichert höchste Standards und aktuelles Fachwissen.' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Asphalt und Bitumen: Kernkompetenz Straßenbau' }] },
      { type: 'paragraph', content: [
        { text: 'Die ' },
        { text: 'Asphaltprüfung', link: 'https://peba.de/leistungen/asphaltprufung/' },
        { text: ' ist das Herzstück von PEBA. Das Spektrum umfasst:' }
      ]},
      { type: 'paragraph', content: [{ text: '• Mischgutprüfung: Zusammensetzung, Bindemittelgehalt, Korngrößenverteilung nach TP Asphalt' }]},
      { type: 'paragraph', content: [{ text: '• Bitumenprüfung: Nadelpenetration, Erweichungspunkt, dynamische Viskosität' }]},
      { type: 'paragraph', content: [{ text: '• Bohrkernentnahme und -analyse: Schichtdicken, Verbund, Hohlraumgehalt' }]},
      { type: 'paragraph', content: [{ text: '• Fugenmassen-Prüfung: Heißvergussmassen, Kaltfugenmassen nach ZTV Fug-StB' }]},
      { type: 'paragraph', content: [{ text: '• Eignungsprüfungen: Erstprüfungen für neue Mischgutrezepturen' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Beton: Vom Frischbeton bis zur Druckfestigkeit' }] },
      { type: 'paragraph', content: [
        { text: 'Die ' },
        { text: 'Betonprüfung', link: 'https://peba.de/leistungen/betonprufung/' },
        { text: ' begleitet Projekte vom ersten Guss bis zur Abnahme:' }
      ]},
      { type: 'paragraph', content: [{ text: '• Frischbetonprüfung: Konsistenz, Luftgehalt, Rohdichte, Temperatur' }]},
      { type: 'paragraph', content: [{ text: '• Festbetonprüfung: Druckfestigkeit, Spaltzugfestigkeit, E-Modul' }]},
      { type: 'paragraph', content: [{ text: '• Bohrkernentnahme: Zerstörungsfreie und zerstörende Prüfung an Bauwerken' }]},
      { type: 'paragraph', content: [{ text: '• Betondeckung: Karbonatisierung, Chlorideindringung, Bewehrungslage' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Erdbau und Bodenmechanik' }] },
      { type: 'paragraph', content: [
        { text: 'Im Bereich ' },
        { text: 'Erdbauprüfungen', link: 'https://peba.de/leistungen/erdbauprufungen/' },
        { text: ' und ' },
        { text: 'Bodenbehandlung', link: 'https://peba.de/leistungen/bodenbehandlungen-mit-bindemitteln/' },
        { text: ' bietet PEBA:' }
      ]},
      { type: 'paragraph', content: [{ text: '• Verdichtungsprüfungen: Proctorversuche, Plattendruckversuche, dynamische Lastplattenversuche' }]},
      { type: 'paragraph', content: [{ text: '• Baugrunduntersuchungen: Bodenklassifikation, Tragfähigkeit, Wassergehalt' }]},
      { type: 'paragraph', content: [{ text: '• Bodenverfestigung: Prüfung von Kalk- und Zementstabilisierungen' }]},
      { type: 'paragraph', content: [{ text: '• Frostempfindlichkeit: CBR-Versuche, Frostbeständigkeitsprüfungen' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Fahrbahnzustand und Umweltanalytik' }] },
      { type: 'paragraph', content: [
        { text: 'Die ' },
        { text: 'Zustandserfassung von Verkehrsflächen', link: 'https://peba.de/leistungen/zustandserfassung-bewertung-von-verkehrsflaechen/' },
        { text: ' liefert die Datengrundlage für Erhaltungsmaßnahmen. Die ' },
        { text: 'Umweltanalytik', link: 'https://peba.de/leistungen/umweltanalytik/' },
        { text: ' prüft Baustoffe auf Schadstoffe und Umweltverträglichkeit – unverzichtbar für Recycling und Entsorgung.' }
      ]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Großprojekte: Der BER und mehr' }] },
      { type: 'paragraph', content: [{ text: 'PEBA ist bei Großprojekten ein fester Partner. Das Institut war an der Qualitätssicherung für den BER (Berlin Brandenburg Airport) beteiligt – eines der komplexesten Infrastrukturprojekte Deutschlands. Von der Rollbahnprüfung bis zur Betonfestigkeit der Parkdecks: PEBA lieferte die akkreditierten Prüfungen, die für die Zulassung notwendig waren.' }]},
      { type: 'paragraph', content: [{ text: 'Weitere Referenzen: Autobahnneubau, Bundesstraßensanierungen, Schieneninfrastruktur, kommunale Straßenbauprojekte in ganz Berlin-Brandenburg und darüber hinaus.' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Das SEO-Problem: Bekannt bei Profis, unsichtbar für Neue' }] },
      { type: 'paragraph', content: [{ text: 'In der Baubranche war PEBA ein Begriff – Bauleiter, Prüfingenieure und Qualitätsbeauftragte kannten das Institut seit Jahrzehnten. Aber diese Reputation existierte nur im Branchennetzwerk.' }]},
      { type: 'paragraph', content: [{ text: 'Online war PEBA praktisch unsichtbar. Wer "Asphaltprüfung Berlin" googelte, fand andere. Wer "Betonprüfung Brandenburg" suchte, landete bei weniger etablierten Anbietern. Neue Projektleiter, junge Bauunternehmer, Auftraggeber aus anderen Regionen – sie fanden PEBA schlicht nicht.' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Unsere Strategie: Prüfbereich- und Regional-fokussierte SEO' }] },
      { type: 'paragraph', content: [{ text: 'Wir entwickelten eine praxisnahe SEO-Strategie für die Baubranche:' }]},
      { type: 'paragraph', content: [{ text: '1. Prüfbereich-Pillar-Pages: Tiefgehende Ressourcen zu Asphalt, Beton, Erdbau, Umweltanalytik – jeweils mit Normen, Verfahren, Anwendungsfällen' }]},
      { type: 'paragraph', content: [{ text: '2. Regional-SEO: Dominanz für Berlin-Brandenburg mit Ausweitung auf bundesweite Großprojekte' }]},
      { type: 'paragraph', content: [{ text: '3. Normen-Content: Hilfreiche Erklärungen zu ZTV Asphalt, TP Beton, RAP Stra – für Suchende, die spezifische Normen verstehen müssen' }]},
      { type: 'paragraph', content: [{ text: '4. Referenz-Stories: Fallstudien von Großprojekten, die PEBA-Expertise demonstrieren' }]},
      { type: 'heading', tag: 'h3', content: [{ text: 'Die Ergebnisse: Sichtbarkeit für Infrastruktur-Profis' }] },
      { type: 'paragraph', content: [{ text: 'Die Transformation war messbar:' }]},
      { type: 'paragraph', content: [{ text: '• Organischer Traffic: +75% innerhalb von 12 Monaten' }]},
      { type: 'paragraph', content: [{ text: '• Projektanfragen: +45% – darunter erstmals Anfragen von außerhalb Berlin-Brandenburg' }]},
      { type: 'paragraph', content: [{ text: '• Keyword-Rankings: Dominanz für "Asphaltprüfung Berlin", "Betonprüfung Brandenburg", "Verdichtungsprüfung"' }]},
      { type: 'paragraph', content: [{ text: '• Neue Kundensegmente: Start-ups, neue Bauunternehmen, überregionale Projekte' }]},
      { type: 'paragraph', content: [{ text: '• Wahrnehmung: PEBA wird nun auch von der nächsten Generation von Bauleitern und Prüfingenieuren gefunden' }]},
      { type: 'paragraph', content: [{ text: 'Das Wichtigste: PEBA ist nun digital das, was es offline seit über 30 Jahren ist – der Garant für Qualität im Infrastrukturbau. Die nächste Generation von Bauingenieuren findet das Institut jetzt genauso selbstverständlich wie die erfahrenen Profis.' }]},
    ]),
    services: [
      { service: 'SEO für Baustoffprüfung' },
      { service: 'Technischer Fachcontent (DIN/ZTV)' },
      { service: 'Regional-SEO Berlin-Brandenburg' },
      { service: 'Großprojekt-Positionierung' },
    ],
    tags: [
      { tag: 'SEO' },
      { tag: 'Baustoffprüfung' },
      { tag: 'Asphalt' },
      { tag: 'RAP Stra' },
      { tag: 'Berlin' },
    ],
    results: [
      { metric: '+75%', label: 'Organischer Traffic' },
      { metric: '+45%', label: 'Projektanfragen' },
      { metric: '30+', label: 'Jahre Erfahrung' },
    ],
    clientFeedback: {
      quote: 'Als RAP Stra Prüfinstitut mit Projekten wie BER haben wir höchste Standards. GoldenWing hat unsere Expertise digital sichtbar gemacht – jetzt finden uns auch die Projektleiter für neue Großprojekte.',
      author: 'Prof. Dr.-Ing. Großhans',
      role: 'PEBA Prüfinstitut für Baustoffe GmbH, Berlin',
    },
    featured: false,
    order: 27,
    en: {
      title: 'PEBA Prüfinstitut für Baustoffe - SEO for Berlin\'s Infrastructure Experts',
      description: 'Asphalt, concrete, compaction, airport construction: How we made a RAP Stra recognized testing institute with over 30 years of experience the digital leader for construction material testing in Berlin-Brandenburg. PEBA – partner for major projects like BER.',
      companyDescription: 'PEBA Prüfinstitut für Baustoffe GmbH (Köpenicker Landstraße 280, 12437 Berlin) has been the independent specialist for construction material testing in infrastructure since 1990. As a RAP Stra recognized testing facility under the leadership of Prof. Dr.-Ing. Großhans, PEBA performs testing for asphalt, concrete, soil, and aggregates – partner for major projects like BER.',
      challenge: 'PEBA Prüfinstitut für Baustoffe in Berlin had been a fixed name in the construction industry since 1990 – road construction, rail construction, airport construction, everything requiring quality testing. The problem? The internet didn\'t know PEBA. "Asphalt testing Berlin" – no rankings. "Construction material testing Brandenburg" – others ranked higher.',
      solution: 'We positioned PEBA as Berlin\'s first choice for construction material testing in infrastructure. SEO for all testing areas (asphalt, concrete, soil, aggregates), content on DIN standards and ZTV requirements, regional SEO for Berlin-Brandenburg with expansion to nationwide major projects.',
      longDescription: createSimpleRichText([
        { type: 'heading', tag: 'h3', text: 'Quality Assurance for Germany\'s Infrastructure' },
        { type: 'paragraph', text: 'PEBA Prüfinstitut für Baustoffe GmbH (Köpenicker Landstraße 280, 12437 Berlin) has been the independent specialist for construction material testing in infrastructure since 1990. As a RAP Stra recognized testing facility, PEBA performs all quality tests required for roads, railways, and airports.' },
        { type: 'paragraph', text: 'PEBA offers comprehensive construction material testing: Asphalt, bitumen, and joint sealant testing, concrete testing (fresh and hardened concrete), soil treatment with binders, ground improvement and investigations, aggregate testing, environmental analytics, and pavement condition assessment.' },
        { type: 'heading', tag: 'h3', text: 'The Results' },
        { type: 'paragraph', text: '75% more organic traffic, 45% more project inquiries, top rankings for all relevant construction material testing keywords in Berlin-Brandenburg. PEBA is now found by project managers who didn\'t know the institute before.' },
      ]),
      services: [
        { service: 'SEO for Construction Material Testing' },
        { service: 'Technical Expert Content (DIN/ZTV)' },
        { service: 'Regional SEO Berlin-Brandenburg' },
        { service: 'Major Project Positioning' },
      ],
      tags: [
        { tag: 'SEO' },
        { tag: 'Construction Material Testing' },
        { tag: 'Asphalt' },
        { tag: 'RAP Stra' },
        { tag: 'Berlin' },
      ],
      results: [
        { metric: '+75%', label: 'Organic Traffic' },
        { metric: '+45%', label: 'Project Inquiries' },
        { metric: '30+', label: 'Years Experience' },
      ],
      clientFeedback: {
        quote: 'As a RAP Stra testing institute with projects like BER, we have the highest standards. GoldenWing made our expertise digitally visible – now project managers for new major projects find us too.',
        author: 'Prof. Dr.-Ing. Großhans',
        role: 'PEBA Prüfinstitut für Baustoffe GmbH, Berlin',
      },
    },
  },
]

// ============================================
// SEEDING FUNCTION
// ============================================
async function seedLabProjects() {
  console.log('🧪 Seeding Lab Case Studies (KORRIGIERTE VERSION MIT LINKS)...')
  console.log('⚠️  HINWEIS: Existierende Projekte werden AKTUALISIERT!')
  console.log('   → Bilder und CMS-Änderungen bleiben erhalten.\n')

  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'projects',
    limit: 100,
  })

  const existingBySlug = new Map(
    existing.docs.map((doc) => [doc.slug, doc])
  )

  for (const project of labProjects) {
    try {
      const existingProject = existingBySlug.get(project.slug)
      const { en, ...germanData } = project

      if (existingProject) {
        // UPDATE German
        await payload.update({
          collection: 'projects',
          id: existingProject.id,
          locale: 'de',
          data: {
            ...germanData,
            mainImage: existingProject.mainImage,
            gallery: existingProject.gallery,
          } as any,
        })
        console.log(`🔄 Updated (DE): ${project.client}`)

        // UPDATE English
        await payload.update({
          collection: 'projects',
          id: existingProject.id,
          locale: 'en',
          data: {
            title: en.title,
            description: en.description,
            companyDescription: en.companyDescription,
            challenge: en.challenge,
            solution: en.solution,
            longDescription: en.longDescription,
            services: en.services,
            tags: en.tags,
            results: en.results,
            clientFeedback: {
              quote: en.clientFeedback.quote,
              author: en.clientFeedback.author,
              role: en.clientFeedback.role,
            },
          } as any,
        })
        console.log(`🔄 Updated (EN): ${project.client}`)
      } else {
        // CREATE German
        const newProject = await payload.create({
          collection: 'projects',
          locale: 'de',
          data: germanData as any,
        })
        console.log(`✅ Created (DE): ${project.client}`)

        // UPDATE English
        await payload.update({
          collection: 'projects',
          id: newProject.id,
          locale: 'en',
          data: {
            title: en.title,
            description: en.description,
            companyDescription: en.companyDescription,
            challenge: en.challenge,
            solution: en.solution,
            longDescription: en.longDescription,
            services: en.services,
            tags: en.tags,
            results: en.results,
            clientFeedback: {
              quote: en.clientFeedback.quote,
              author: en.clientFeedback.author,
              role: en.clientFeedback.role,
            },
          } as any,
        })
        console.log(`✅ Created (EN): ${project.client}`)
      }
    } catch (error) {
      console.error(`❌ Error with ${project.client}:`, error)
    }
  }

  console.log('\n✨ Lab Case Studies seeding complete!')
  console.log('\n📋 Alle 8 Labore mit korrekten Daten + Links:')
  labProjects.forEach((p, i) => {
    console.log(`\n   ${i + 1}. ${p.client}`)
    console.log(`      🌐 ${p.liveUrl}`)
    console.log(`      📄 /projekte/${p.slug}`)
  })
  process.exit(0)
}

seedLabProjects().catch((error) => {
  console.error('Seeding failed:', error)
  process.exit(1)
})
