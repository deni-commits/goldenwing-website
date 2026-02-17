# GoldenWing Creative Studios Website

Premium website for GoldenWing Creative Studios - a creative agency based in Vienna, Dubai, and Roseville.

**Live:** https://goldenwing.at

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.5.9 | App Router, SSR/SSG |
| TypeScript | strict | Type Safety |
| React | 19 | UI Framework |
| Tailwind CSS | 4 | Styling |
| shadcn/ui | latest | UI Components |
| Payload CMS | 3.x | Headless CMS |
| SQLite | - | Database |
| Cheerio | - | HTML Parsing |
| Zod | - | Validation |

---

## Features

### Website Tools Suite (Lead Magnets)

5 free analysis tools at `/tools`:

| Tool | URL | What it checks |
|------|-----|----------------|
| SEO Checker | `/tools/seo-checker` | Meta tags, headings, schema, sitemap |
| Performance Checker | `/tools/performance-checker` | Core Web Vitals via PageSpeed API |
| Design Analyzer | `/tools/design-analyzer` | Viewport, favicon, OG tags |
| Security Checker | `/tools/security-checker` | HTTPS, SSL, security headers |
| Website Analyzer | `/tools/website-analyzer` | All 4 combined with overall score |

**Includes:**
- Animated score rings (0-100)
- Issue categorization (Critical/Warning/Passed)
- Lead capture modal
- PDF report download
- Rate limiting & security

### Multi-Language Support

- German (DE) - Default
- English (EN)
- Locale-specific URLs with proper hreflang

### SEO Features

- JSON-LD Schema markup
- Dynamic meta tags
- Sitemap generation
- 40+ location-specific landing pages

### Security

- Rate limiting per IP
- CSRF protection
- XSS prevention
- Input sanitization
- Security headers

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Generate Payload types
npm run payload generate:types
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## Database Management

**WICHTIG:** Content changes (blog, projects, etc.) should be made on the LIVE system!

- **Live CMS**: https://goldenwing.at/admin
- **Local CMS**: http://localhost:3000/admin

### Deploy (Code Only)

Deploys code changes WITHOUT touching the database:

```bash
# 1. Sync media files
rsync -avz --progress -e "ssh -i ~/.ssh/id_ed25519_numbers_uae" ./public/media/ root@72.62.52.70:/var/www/goldenwing/public/media/

# 2. Sync code
rsync -avz --exclude-from='.rsyncignore' -e "ssh -i ~/.ssh/id_ed25519_numbers_uae" ./ root@72.62.52.70:/var/www/goldenwing/

# 3. Build & restart
ssh -i ~/.ssh/id_ed25519_numbers_uae root@72.62.52.70 "cd /var/www/goldenwing && npm install && npm run build && pm2 restart goldenwing"
```

### Pull Database (VPS → Local)

```bash
./scripts/db-pull.sh
```

### Push Database (Local → VPS)

**DANGEROUS** - Only for initial setup or migrations:

```bash
./scripts/db-push.sh
```

---

## Project Structure

```
src/
├── app/
│   ├── [locale]/(marketing)/    # Public pages (DE/EN)
│   │   ├── tools/               # Website analysis tools
│   │   ├── leistungen/          # Services
│   │   ├── projekte/            # Portfolio
│   │   ├── ueber-uns/           # About
│   │   └── ...                  # 60+ pages
│   ├── (payload)/               # CMS Admin
│   └── api/
│       ├── tools/               # Tool APIs
│       ├── contact/             # Contact form
│       ├── leads/               # Lead capture
│       └── ...
├── components/
│   ├── ui/                      # shadcn components
│   ├── layout/                  # Header, Footer
│   ├── tools/                   # Tool components
│   │   ├── shared/              # Reusable (score-ring, etc.)
│   │   ├── seo/                 # SEO result
│   │   ├── performance/         # Performance result
│   │   ├── design/              # Design result
│   │   └── security/            # Security result
│   ├── sections/                # Page sections
│   ├── seo/                     # JSON-LD schemas
│   └── ...
├── lib/
│   ├── tools/analyzers/         # Analysis logic
│   ├── security/                # Rate limit, CSRF, XSS
│   ├── payload/                 # CMS queries
│   └── utils.ts                 # Utilities
├── messages/                    # i18n (de.json, en.json)
└── payload/
    └── collections/             # CMS collections
```

---

## Payload CMS Collections

| Collection | Purpose |
|------------|---------|
| Users | Admin accounts |
| Media | Images, videos |
| Posts | Blog articles |
| Projects | Portfolio items |
| Services | Main services |
| SubServices | Service details |
| Categories | Content categories |
| TeamMembers | Team profiles |
| Partners | Partner logos |
| Testimonials | Client reviews |
| Resources | Downloads |
| Packages | Pricing packages |
| Leads | Lead capture data |
| ToolAnalyses | Tool results |

---

## Environment Variables

### Local (.env.local)

```env
PAYLOAD_SECRET=your-secret-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DATABASE_URL=file:./goldenwing.db
```

### Production (.env.local on server)

```env
PAYLOAD_SECRET=your-secure-production-secret
NEXT_PUBLIC_SITE_URL=https://goldenwing.at
DATABASE_URL=file:./goldenwing.db
NODE_ENV=production
```

**Note:** `payload.config.ts` has built-in protection against `localhost` in production.

---

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/tools/seo` | POST | SEO analysis |
| `/api/tools/performance` | POST | Performance analysis |
| `/api/tools/design` | POST | Design analysis |
| `/api/tools/security` | POST | Security analysis |
| `/api/tools/analyze` | POST | Combined analysis |
| `/api/tools/send-report` | POST | Email report |
| `/api/contact` | POST | Contact form |
| `/api/leads` | POST | Lead capture |
| `/api/newsletter/subscribe` | POST | Newsletter signup |

---

## Locations

- **Vienna, Austria** (HQ): Czeikestrasse 4/21, 1100 Wien
- **Dubai, UAE**: DAMAC Executive Bay Tower B, Office 1406
- **Roseville, CA, USA**: 2700 N Hayden Pkwy, Roseville, CA 95747

---

## URLs

| Environment | URL |
|-------------|-----|
| Production | https://goldenwing.at |
| CMS Admin | https://goldenwing.at/admin |
| VPS | 72.62.52.70 |

---

## Documentation

- `CLAUDE.md` - AI assistant guidelines & feature documentation
- `.env.production.example` - Production environment template
