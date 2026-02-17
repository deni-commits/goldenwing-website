# Deployment Checklist - GoldenWing Website

## Pre-Deployment Checks

### Environment Variables
- [ ] `NEXT_PUBLIC_SITE_URL` = `https://goldenwing.be` (NOT localhost!)
- [ ] `PAYLOAD_SECRET` = Production secret (not dev secret)

### URLs to Verify After Deploy
| File | Check | Expected Value |
|------|-------|----------------|
| Schema URLs | `curl -s goldenwing.be/leistungen/branding \| grep -o '"url":"[^"]*"'` | `https://goldenwing.be/...` |
| Sitemap | `curl -s goldenwing.be/sitemap.xml \| head -20` | All URLs with `goldenwing.be` |
| robots.txt | `curl -s goldenwing.be/robots.txt` | Host: `https://goldenwing.be` |
| llms.txt | `curl -s goldenwing.be/llms.txt` | Returns text content |

### Files with Hardcoded URLs
These files contain domain references that should be verified:

1. **Environment-based (via NEXT_PUBLIC_SITE_URL)**:
   - `src/components/seo/json-ld.tsx` - All schema URLs
   - Uses: `process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenwing.be'`

2. **Hardcoded to goldenwing.be** (correct):
   - `src/app/sitemap.ts` - BASE_URL constant
   - `src/components/seo/schemas.tsx` - Fallback URLs
   - `src/lib/security/csrf.ts` - ALLOWED_ORIGINS array
   - `public/robots.txt` - Host and Sitemap URLs
   - `public/llms.txt` - Website URL
   - `public/llms-full.txt` - Canonical URL

3. **Pages with canonical/OG URLs** (metadata):
   - All pages in `src/app/[locale]/(marketing)/` use metadata
   - Check: `generateMetadata()` functions use correct base URL

### Static Files (served via nginx)
| File | URL | nginx location |
|------|-----|----------------|
| llms.txt | /llms.txt | `/var/www/goldenwing/public/llms.txt` |
| llms-full.txt | /llms-full.txt | `/var/www/goldenwing/public/llms-full.txt` |
| robots.txt | /robots.txt | `/var/www/goldenwing/public/robots.txt` |

## Deployment Commands

```bash
# 1. Sync files to server
rsync -avz --exclude node_modules --exclude .next --exclude .git \
  ./ root@72.62.52.70:/var/www/goldenwing/

# 2. Build on server
ssh root@72.62.52.70 "cd /var/www/goldenwing && npm install && npm run build"

# 3. Restart PM2
ssh root@72.62.52.70 "pm2 restart goldenwing"

# 4. Verify deployment
curl -s https://goldenwing.be/leistungen/branding | grep -o '"provider":{[^}]*}'
```

## Post-Deployment Verification

```bash
# Check Schema URLs are correct
curl -s "https://goldenwing.be/leistungen/branding" | \
  grep -o '<script type="application/ld+json">[^<]*' | \
  grep -o '"url":"https://goldenwing.be[^"]*"' | head -5

# Should output:
# "url":"https://goldenwing.be/leistungen/branding"
# NOT: "url":"http://localhost:3000/leistungen/branding"
```

## Common Issues

### localhost URLs in Schema
**Problem**: Schema shows `http://localhost:3000`
**Fix**: Set `NEXT_PUBLIC_SITE_URL=https://goldenwing.be` in `.env.local` and rebuild

### Static files return 404
**Problem**: `/llms.txt` returns Next.js 404 page
**Fix**: Check nginx config has location block for `.txt` files

### Sitemap empty
**Problem**: Sitemap returns empty or error
**Fix**: Check Payload CMS is running and database is accessible
