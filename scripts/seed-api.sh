#!/bin/bash
# Seed GoldenWing CMS via REST API
# Usage: EMAIL=admin@example.com PASSWORD=yourpass ./seed-api.sh

BASE="http://localhost:3003/api"
EMAIL="${EMAIL:-deni@goldenwing.at}"
PASSWORD="${PASSWORD}"

if [ -z "$PASSWORD" ]; then
  echo "Usage: PASSWORD=yourpass EMAIL=youremail ./seed-api.sh"
  exit 1
fi

# Login
echo "Logging in..."
TOKEN=$(curl -s -X POST "$BASE/users/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}" | grep -oP '"token":"[^"]+' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "Login failed!"
  exit 1
fi
echo "✓ Logged in"
AUTH="Authorization: users API-Key $TOKEN"

post() {
  local collection=$1
  local locale=${2:-de}
  local data=$3
  curl -s -X POST "$BASE/$collection?locale=$locale" \
    -H "Content-Type: application/json" \
    -H "$AUTH" \
    -d "$data"
}

patch() {
  local collection=$1
  local id=$2
  local locale=$3
  local data=$4
  curl -s -X PATCH "$BASE/$collection/$id?locale=$locale" \
    -H "Content-Type: application/json" \
    -H "$AUTH" \
    -d "$data"
}

update_global() {
  local slug=$1
  local locale=${2:-de}
  local data=$3
  curl -s -X POST "$BASE/globals/$slug?locale=$locale" \
    -H "Content-Type: application/json" \
    -H "$AUTH" \
    -d "$data"
}

# ─── Site Settings ───
echo "Seeding Site Settings..."
update_global "site-settings" "de" '{
  "companyName": "GoldenWing Creative Studios",
  "contact": {
    "address": "Neubaugasse 25/3\n1070 Wien\nÖsterreich",
    "phone": "+43 1 234 5678",
    "email": "hello@goldenwing.at"
  },
  "social": {
    "instagram": "https://instagram.com/goldenwing.at",
    "linkedin": "https://linkedin.com/company/goldenwing-creative-studios"
  }
}' > /dev/null
echo "✓ Site Settings"

# ─── Navigation ───
echo "Seeding Navigation..."
update_global "navigation" "de" '{
  "mainMenu": [
    {"label": "Services", "link": "/de/services", "children": []},
    {"label": "Referenzen", "link": "/de/referenzen", "children": []},
    {"label": "Blog", "link": "/de/blog", "children": []},
    {"label": "Über uns", "link": "/de/ueber-uns", "children": []},
    {"label": "Kontakt", "link": "/de/kontakt", "children": []}
  ],
  "ctaButton": {"label": "Projekt starten", "link": "/de/kontakt"}
}' > /dev/null

update_global "navigation" "en" '{
  "mainMenu": [
    {"label": "Services", "link": "/en/services", "children": []},
    {"label": "Portfolio", "link": "/en/referenzen", "children": []},
    {"label": "Blog", "link": "/en/blog", "children": []},
    {"label": "About", "link": "/en/ueber-uns", "children": []},
    {"label": "Contact", "link": "/en/kontakt", "children": []}
  ],
  "ctaButton": {"label": "Start Project", "link": "/en/kontakt"}
}' > /dev/null
echo "✓ Navigation"

# ─── Footer ───
echo "Seeding Footer..."
update_global "footer" "de" '{
  "columns": [
    {
      "heading": "Services",
      "links": [
        {"label": "Webdesign & Entwicklung", "link": "/de/services/webdesign-entwicklung"},
        {"label": "SEO & Online Marketing", "link": "/de/services/seo-online-marketing"},
        {"label": "Branding & Corporate Design", "link": "/de/services/branding-corporate-design"},
        {"label": "Content Marketing", "link": "/de/services/content-marketing"}
      ]
    },
    {
      "heading": "Unternehmen",
      "links": [
        {"label": "Über uns", "link": "/de/ueber-uns"},
        {"label": "Referenzen", "link": "/de/referenzen"},
        {"label": "Blog", "link": "/de/blog"},
        {"label": "Kontakt", "link": "/de/kontakt"}
      ]
    }
  ],
  "copyright": "© {year} GoldenWing Creative Studios. Alle Rechte vorbehalten.",
  "legalLinks": [
    {"label": "Impressum", "link": "/de/impressum"},
    {"label": "Datenschutz", "link": "/de/datenschutz"},
    {"label": "AGB", "link": "/de/agb"}
  ]
}' > /dev/null
echo "✓ Footer"

# ─── Pages ───
echo "Seeding Pages..."

# Homepage
HOMEPAGE_ID=$(post "pages" "de" '{
  "title": "Startseite",
  "slug": "home",
  "layout": [
    {
      "blockType": "hero",
      "heading": "Ihre Marke. Digital transformiert.",
      "subheading": "GoldenWing Creative Studios — Marketing, Branding & Webentwicklung aus Wien.",
      "style": "fullscreen",
      "ctaLabel": "Jetzt Beratung anfragen",
      "ctaLink": "/de/kontakt"
    },
    {
      "blockType": "feature-grid",
      "heading": "Unsere Leistungen",
      "features": [
        {"title": "Webdesign & Entwicklung", "description": "Moderne, performante Websites mit Next.js und Headless CMS.", "icon": "monitor"},
        {"title": "SEO & Online Marketing", "description": "Mehr Sichtbarkeit durch datengetriebene SEO-Strategien.", "icon": "search"},
        {"title": "Branding & Corporate Design", "description": "Einzigartige Markenidentitäten, die im Gedächtnis bleiben.", "icon": "palette"},
        {"title": "Content Marketing", "description": "Inhalte, die Ihre Zielgruppe erreichen und überzeugen.", "icon": "file-text"}
      ]
    },
    {
      "blockType": "stats",
      "stats": [
        {"value": "50+", "label": "Projekte abgeschlossen"},
        {"value": "98%", "label": "Kundenzufriedenheit"},
        {"value": "5+", "label": "Jahre Erfahrung"},
        {"value": "3", "label": "Sprachen"}
      ]
    },
    {
      "blockType": "cta",
      "heading": "Bereit für Ihr nächstes Projekt?",
      "text": "Lassen Sie uns gemeinsam etwas Großartiges schaffen.",
      "buttonLabel": "Kontakt aufnehmen",
      "buttonLink": "/de/kontakt",
      "style": "dark"
    }
  ]
}' | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
echo "✓ Homepage DE (ID: $HOMEPAGE_ID)"

if [ -n "$HOMEPAGE_ID" ]; then
  patch "pages" "$HOMEPAGE_ID" "en" '{
    "title": "Home",
    "layout": [
      {
        "blockType": "hero",
        "heading": "Your Brand. Digitally Transformed.",
        "subheading": "GoldenWing Creative Studios — Marketing, Branding & Web Development from Vienna.",
        "style": "fullscreen",
        "ctaLabel": "Get a Free Consultation",
        "ctaLink": "/en/kontakt"
      },
      {
        "blockType": "feature-grid",
        "heading": "Our Services",
        "features": [
          {"title": "Web Design & Development", "description": "Modern, high-performance websites with Next.js and Headless CMS.", "icon": "monitor"},
          {"title": "SEO & Online Marketing", "description": "More visibility through data-driven SEO strategies.", "icon": "search"},
          {"title": "Branding & Corporate Design", "description": "Unique brand identities that stick.", "icon": "palette"},
          {"title": "Content Marketing", "description": "Content that reaches and converts your audience.", "icon": "file-text"}
        ]
      },
      {
        "blockType": "stats",
        "stats": [
          {"value": "50+", "label": "Projects completed"},
          {"value": "98%", "label": "Client satisfaction"},
          {"value": "5+", "label": "Years experience"},
          {"value": "3", "label": "Languages"}
        ]
      },
      {
        "blockType": "cta",
        "heading": "Ready for your next project?",
        "text": "Let us create something great together.",
        "buttonLabel": "Get in Touch",
        "buttonLink": "/en/kontakt",
        "style": "dark"
      }
    ]
  }' > /dev/null
  echo "✓ Homepage EN"
fi

# Impressum
post "pages" "de" '{
  "title": "Impressum",
  "slug": "impressum",
  "layout": []
}' > /dev/null
echo "✓ Impressum"

# Datenschutz
post "pages" "de" '{
  "title": "Datenschutzerklärung",
  "slug": "datenschutz",
  "layout": []
}' > /dev/null
echo "✓ Datenschutz"

# AGB
post "pages" "de" '{
  "title": "Allgemeine Geschäftsbedingungen",
  "slug": "agb",
  "layout": []
}' > /dev/null
echo "✓ AGB"

# ─── Services ───
echo "Seeding Services..."

create_service() {
  local slug=$1 title_de=$2 title_en=$3 excerpt_de=$4 excerpt_en=$5 icon=$6 category=$7 order=$8

  local ID=$(post "services" "de" "{
    \"title\": \"$title_de\",
    \"slug\": \"$slug\",
    \"excerpt\": \"$excerpt_de\",
    \"icon\": \"$icon\",
    \"category\": \"$category\",
    \"order\": $order,
    \"features\": []
  }" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)

  if [ -n "$ID" ]; then
    patch "services" "$ID" "en" "{
      \"title\": \"$title_en\",
      \"excerpt\": \"$excerpt_en\"
    }" > /dev/null
  fi
  echo "✓ Service: $title_de"
}

create_service "webdesign-entwicklung" "Webdesign & Entwicklung" "Web Design & Development" \
  "Moderne, blitzschnelle Websites mit Next.js, Headless CMS und responsivem Design." \
  "Modern, lightning-fast websites with Next.js, Headless CMS and responsive design." \
  "monitor" "web-development" 1

create_service "seo-online-marketing" "SEO & Online Marketing" "SEO & Online Marketing" \
  "Datengetriebene SEO-Strategien für nachhaltige Sichtbarkeit in Suchmaschinen." \
  "Data-driven SEO strategies for sustainable visibility in search engines." \
  "search" "seo" 2

create_service "branding-corporate-design" "Branding & Corporate Design" "Branding & Corporate Design" \
  "Einzigartige Markenidentitäten, die Vertrauen schaffen und im Gedächtnis bleiben." \
  "Unique brand identities that build trust and stick in people's minds." \
  "palette" "branding" 3

create_service "content-marketing" "Content Marketing" "Content Marketing" \
  "Strategische Inhalte, die Ihre Zielgruppe ansprechen und konvertieren." \
  "Strategic content that engages and converts your target audience." \
  "file-text" "marketing" 4

# ─── Blog Posts ───
echo "Seeding Blog Posts..."

create_post() {
  local slug=$1 title_de=$2 title_en=$3 excerpt_de=$4 excerpt_en=$5 category=$6

  local ID=$(post "posts" "de" "{
    \"title\": \"$title_de\",
    \"slug\": \"$slug\",
    \"excerpt\": \"$excerpt_de\",
    \"category\": \"$category\",
    \"publishedDate\": \"$(date -u +%Y-%m-%dT%H:%M:%S.000Z)\",
    \"_status\": \"published\"
  }" | grep -oP '"id":\s*"?[^",}]+' | head -1 | sed 's/"id":\s*"*//')

  if [ -n "$ID" ]; then
    patch "posts" "$ID" "en" "{
      \"title\": \"$title_en\",
      \"excerpt\": \"$excerpt_en\"
    }" > /dev/null
  fi
  echo "✓ Post: $title_de"
}

create_post "next-js-15-zukunft-webentwicklung" \
  "Warum Next.js 15 die Zukunft der Webentwicklung ist" \
  "Why Next.js 15 is the Future of Web Development" \
  "Next.js 15 bringt Server Components und verbesserte Performance. Erfahren Sie warum wir darauf setzen." \
  "Next.js 15 brings Server Components and improved performance. Learn why we rely on it." \
  "web"

create_post "seo-2026-trends" \
  "SEO 2026: Die wichtigsten Trends für Unternehmen" \
  "SEO 2026: The Most Important Trends for Businesses" \
  "Von GEO über E-E-A-T bis hin zu KI-Suche — diese SEO-Trends sollten Sie 2026 kennen." \
  "From GEO to E-E-A-T to AI search — SEO trends you need to know in 2026." \
  "seo"

create_post "headless-cms-vs-wordpress" \
  "Headless CMS vs. WordPress: Was passt besser?" \
  "Headless CMS vs. WordPress: Which Fits Better?" \
  "Ein Vergleich zwischen Headless CMS (Payload) und WordPress für moderne Webprojekte." \
  "A comparison between Headless CMS (Payload) and WordPress for modern web projects." \
  "tech"

# ─── Team ───
echo "Seeding Team..."
TEAM_ID=$(post "team" "de" '{
  "name": "Deni Khachukaev",
  "role": "Gründer & Creative Director",
  "bio": "Deni vereint strategisches Marketing-Know-how mit technischer Expertise. Mit über 5 Jahren Erfahrung im digitalen Marketing leitet er das Team von GoldenWing.",
  "sortOrder": 1,
  "socialLinks": [
    {"platform": "linkedin", "url": "https://linkedin.com/in/deni-khachukaev"},
    {"platform": "instagram", "url": "https://instagram.com/goldenwing.at"}
  ]
}' | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)

if [ -n "$TEAM_ID" ]; then
  patch "team" "$TEAM_ID" "en" '{
    "role": "Founder & Creative Director",
    "bio": "Deni combines strategic marketing know-how with technical expertise. With over 5 years of experience in digital marketing, he leads the GoldenWing team."
  }' > /dev/null
fi
echo "✓ Team: Deni Khachukaev"

# ─── Testimonials ───
echo "Seeding Testimonials..."

create_testimonial() {
  local author=$1 company=$2 role_de=$3 role_en=$4 quote_de=$5 quote_en=$6 rating=$7

  local ID=$(post "testimonials" "de" "{
    \"quote\": \"$quote_de\",
    \"author\": \"$author\",
    \"company\": \"$company\",
    \"role\": \"$role_de\",
    \"rating\": $rating
  }" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)

  if [ -n "$ID" ]; then
    patch "testimonials" "$ID" "en" "{
      \"quote\": \"$quote_en\",
      \"role\": \"$role_en\"
    }" > /dev/null
  fi
  echo "✓ Testimonial: $author"
}

create_testimonial "Thomas M." "Tech-Startup Wien" "Geschäftsführer" "CEO" \
  "GoldenWing hat unsere Website komplett neu gestaltet. Die Performance ist hervorragend und unser SEO-Ranking hat sich deutlich verbessert." \
  "GoldenWing completely redesigned our website. The performance is excellent and our SEO ranking has improved significantly." 5

create_testimonial "Sarah K." "Boutique Hotel Salzburg" "Marketing Managerin" "Marketing Manager" \
  "Professionell, kreativ und immer erreichbar. Das Branding-Paket hat unsere Marke auf ein neues Level gehoben." \
  "Professional, creative and always available. The branding package has taken our brand to a new level." 5

create_testimonial "Michael R." "E-Commerce Plattform" "Head of Digital" "Head of Digital" \
  "Dank der SEO-Optimierung durch GoldenWing haben wir unseren organischen Traffic in 6 Monaten verdreifacht." \
  "Thanks to SEO optimization by GoldenWing, we tripled our organic traffic in 6 months." 5

echo ""
echo "✅ Seeding complete!"
echo "Check admin: https://dev.goldenwing.at/admin"
