#!/bin/bash
# Fix SSG: Add generateStaticParams to all pages under [locale]
# that don't have dynamic routes [slug]

FIXED=0
SKIPPED=0

# The code to insert (after imports)
read -r -d '' SSG_CODE << 'EOF'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}
EOF

cd "$(dirname "$0")/../src/app" || exit 1

# Find all page.tsx under [locale] excluding [slug] directories
find . -path '*\[locale\]*' -name 'page.tsx' ! -path '*\[slug\]*' ! -path '*\[subslug\]*' | while read -r file; do
  # Check if already has generateStaticParams
  if grep -q 'generateStaticParams' "$file"; then
    ((SKIPPED++))
    continue
  fi
  
  # Find line number of last import
  LAST_IMPORT=$(grep -n "^import " "$file" | tail -1 | cut -d: -f1)
  
  if [ -z "$LAST_IMPORT" ]; then
    echo "⚠️  No imports found: $file"
    continue
  fi
  
  # Insert after last import using sed
  # Create temp file with insertion
  head -n "$LAST_IMPORT" "$file" > "$file.tmp"
  echo "$SSG_CODE" >> "$file.tmp"
  tail -n +"$((LAST_IMPORT + 1))" "$file" >> "$file.tmp"
  mv "$file.tmp" "$file"
  
  echo "✅ Fixed: $file"
  ((FIXED++))
done

echo ""
echo "Done! Run 'npm run build' to verify."
