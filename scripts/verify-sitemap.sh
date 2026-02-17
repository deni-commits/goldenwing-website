#!/bin/bash

# Sitemap Verification Script
#
# Checks:
# 1. Sitemap does NOT contain /projekte or /en/projects
# 2. Sample 100 URLs from sitemap, verify all return 200 (no redirects)

echo "🔍 Sitemap Verification"
echo ""

DOMAIN="https://goldenwing.at"
SITEMAP_URL="$DOMAIN/sitemap.xml"

# 1. Check for redirect URLs in sitemap
echo "📊 Checking for redirect URLs in sitemap..."

if curl -s "$SITEMAP_URL" | grep -q '>/projekte<\|>/en/projects<'; then
  echo "❌ ERROR: Sitemap contains redirect URLs (/projekte or /en/projects)"
  exit 1
else
  echo "✅ No redirect URLs in sitemap"
fi

# 2. Sample 100 URLs and test
echo ""
echo "📊 Testing 100 sample URLs from sitemap..."

# Extract URLs from sitemap (excluding alternates)
SAMPLE_URLS=$(curl -s "$SITEMAP_URL" | grep -o '<loc>[^<]*</loc>' | sed 's/<loc>//;s/<\/loc>//' | head -100)

REDIRECT_COUNT=0
ERROR_COUNT=0

while IFS= read -r url; do
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  REDIRECT_NUM=$(curl -sLI -w "%{num_redirects}" -o /dev/null "$url")

  if [ "$HTTP_CODE" != "200" ]; then
    echo "❌ $url → HTTP $HTTP_CODE"
    ((ERROR_COUNT++))
  elif [ "$REDIRECT_NUM" -gt 0 ]; then
    echo "⚠️  $url → $REDIRECT_NUM redirect(s)"
    ((REDIRECT_COUNT++))
  fi
done <<< "$SAMPLE_URLS"

echo ""
if [ $ERROR_COUNT -gt 0 ]; then
  echo "❌ ERROR: $ERROR_COUNT URLs returned non-200 status"
  exit 1
fi

if [ $REDIRECT_COUNT -gt 0 ]; then
  echo "⚠️  WARNING: $REDIRECT_COUNT URLs have redirects (should be 0)"
  echo "These URLs should not be in sitemap!"
  exit 1
fi

echo "✅ All 100 sampled URLs return 200 OK with 0 redirects"
echo ""
echo "✅ Sitemap verification passed!"
