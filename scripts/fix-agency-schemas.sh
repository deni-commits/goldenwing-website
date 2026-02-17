#!/bin/bash
# Fix LocalBusiness schema issues on beste-*-agenturen pages
# Changes inline schema to use AgencyComparisonSchema component

cd ~/GoldenWing2026

# List of files to fix (excluding already fixed webdesign page)
files=(
  "src/app/[locale]/(marketing)/beste-app-entwicklung-agenturen-wien/page.tsx"
  "src/app/[locale]/(marketing)/beste-branding-agenturen-wien/page.tsx"
  "src/app/[locale]/(marketing)/beste-content-marketing-agenturen-wien/page.tsx"
  "src/app/[locale]/(marketing)/beste-digital-marketing-agenturen-wien/page.tsx"
  "src/app/[locale]/(marketing)/beste-ecommerce-agenturen-wien/page.tsx"
  "src/app/[locale]/(marketing)/beste-google-ads-agenturen-wien/page.tsx"
  "src/app/[locale]/(marketing)/beste-grafikdesign-agenturen-wien/page.tsx"
  "src/app/[locale]/(marketing)/beste-kreativagenturen-wien/page.tsx"
  "src/app/[locale]/(marketing)/beste-online-marketing-agenturen-wien/page.tsx"
  "src/app/[locale]/(marketing)/beste-onlineshop-agenturen-wien/page.tsx"
  "src/app/[locale]/(marketing)/beste-seo-agenturen-fuer-aerzte/page.tsx"
  "src/app/[locale]/(marketing)/beste-seo-agenturen-oesterreich/page.tsx"
  "src/app/[locale]/(marketing)/beste-seo-agenturen-wien/page.tsx"
  "src/app/[locale]/(marketing)/beste-social-media-agenturen-wien/page.tsx"
  "src/app/[locale]/(marketing)/beste-website-relaunch-agenturen/page.tsx"
  "src/app/[locale]/(marketing)/beste-wordpress-agenturen-wien/page.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Fixing: $file"
    
    # 1. Add AgencyComparisonSchema to import
    sed -i '' "s/BreadcrumbListSchema, FAQSchema, LocalBusinessSchema }/BreadcrumbListSchema, FAQSchema, LocalBusinessSchema, AgencyComparisonSchema }/g" "$file"
    
    # Check if change was made
    if grep -q "AgencyComparisonSchema" "$file"; then
      echo "  ✓ Import updated"
    else
      echo "  ✗ Import NOT updated"
    fi
  else
    echo "NOT FOUND: $file"
  fi
done

echo ""
echo "Done! Now manually replace inline schemas with:"
echo "<AgencyComparisonSchema title={c.title} agencies={agencyList} dateModified=\"2026-02-09\" />"
