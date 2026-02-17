#!/bin/bash

# Redirect Chain Verification Script
#
# Tests critical legacy redirects to ensure NO 2-hop chains
# All redirects should be 1-hop maximum (301/308 → 200)

echo "🔍 Redirect Chain Verification"
echo ""

# Use localhost if dev server is running, otherwise live site
if curl -s http://localhost:3000 > /dev/null 2>&1; then
  DOMAIN="http://localhost:3000"
  echo "ℹ️  Testing against localhost:3000"
else
  DOMAIN="https://goldenwing.at"
  echo "ℹ️  Testing against live site (https://goldenwing.at)"
  echo "⚠️  Note: Live site may have old code until deployed"
fi
echo ""

# Test cases: URLs that previously had 2-hop chains
TEST_URLS=(
  "/portfolio"
  "/leistungen/digitales-marketing"
  "/en/services/seo-sichtbarkeit"
  "/projekte"
  "/en/projects"
)

CHAIN_FOUND=0

for url in "${TEST_URLS[@]}"; do
  FULL_URL="$DOMAIN$url"

  # Get all HTTP status codes (excluding 103 Early Hints)
  HTTP_CODES=$(curl -sLI "$FULL_URL" | grep '^HTTP' | awk '{print $2}' | grep -v '^103$' | tr '\n' ' ')

  # Count HTTP responses (excluding 103, should be 2: redirect + final 200)
  HTTP_COUNT=$(echo "$HTTP_CODES" | wc -w)

  if [ $HTTP_COUNT -gt 2 ]; then
    echo "❌ $url → $HTTP_COUNT hops: $HTTP_CODES"
    ((CHAIN_FOUND++))
  else
    echo "✅ $url → $((HTTP_COUNT-1)) hop: $HTTP_CODES"
  fi
done

echo ""
if [ $CHAIN_FOUND -gt 0 ]; then
  echo "❌ ERROR: $CHAIN_FOUND redirect chains found (> 1 hop)"
  exit 1
fi

echo "✅ All redirects are 1-hop maximum (no chains)"
echo ""
echo "✅ Chain verification passed!"
