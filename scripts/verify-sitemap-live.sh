#!/usr/bin/env bash
set -e
DOMAIN="https://goldenwing.at"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "Fetching sitemap from $DOMAIN..."
curl -fsSL "$DOMAIN/sitemap.xml" > "$TMP/sitemap.xml" 2>/dev/null || {
  echo "Error: Failed to fetch sitemap"
  exit 1
}

# Extract all URLs from sitemap
echo "Extracting URLs..."
grep -oE '<loc>[^<]+' "$TMP/sitemap.xml" | sed 's#<loc>##' | grep "^https://" > "$TMP/urls.txt"

# Get unique URLs
sort -u "$TMP/urls.txt" > "$TMP/urls-unique.txt"

TOTAL=$(wc -l < "$TMP/urls-unique.txt" | tr -d ' ')
echo "Found $TOTAL unique URLs"
echo ""
echo "Checking status codes (this may take a few minutes)..."

# Check status (no redirect following)
: > "$TMP/status.txt"
COUNT=0
while read -r u; do
  code=$(curl -o /dev/null -s -I -w '%{http_code}' "$u" 2>/dev/null || echo "000")
  echo "$code $u" >> "$TMP/status.txt"
  COUNT=$((COUNT + 1))
  if [ $((COUNT % 50)) -eq 0 ]; then
    echo "  Progress: $COUNT/$TOTAL"
  fi
done < "$TMP/urls-unique.txt"

echo ""
echo "========================================="
echo "---- SITEMAP LIVE SUMMARY ----"
echo "========================================="
echo "Checked URLs: $TOTAL"

REDIRECT_COUNT=$(grep -cE '^3' "$TMP/status.txt" 2>/dev/null || echo "0")
ERROR_COUNT=$(grep -cE '^(4|5)' "$TMP/status.txt" 2>/dev/null || echo "0")
OK_COUNT=$(grep -cE '^2' "$TMP/status.txt" 2>/dev/null || echo "0")

echo "200 OK: $OK_COUNT"
echo "3xx Redirects: $REDIRECT_COUNT"
echo "4xx/5xx Errors: $ERROR_COUNT"
echo ""

if [ "$REDIRECT_COUNT" -gt 0 ]; then
  echo "Top 20 redirects:"
  grep -E '^3' "$TMP/status.txt" | head -20 || true
else
  echo "✅ No redirects found in sitemap!"
fi

if [ "$ERROR_COUNT" -gt 0 ]; then
  echo ""
  echo "Errors found:"
  grep -E '^(4|5)' "$TMP/status.txt" || true
fi
