#!/usr/bin/env python3
"""
Script to fix all 'as any' type casts in TSX files by:
1. Adding AppPathname import
2. Removing 'as any' casts and eslint-disable comments
3. Adding proper type annotations to href fields in arrays
"""

import re
import os
from pathlib import Path

# Files to fix
FILES_TO_FIX = [
    "src/app/[locale]/(marketing)/leistungen/social-media-agentur/page.tsx",
    "src/app/[locale]/(marketing)/leistungen/sea-agentur/page.tsx",
    "src/app/[locale]/(marketing)/leistungen/wordpress-agentur/page.tsx",
    "src/app/[locale]/(marketing)/leistungen/ecommerce-agentur/page.tsx",
    "src/app/[locale]/(marketing)/leistungen/grafikdesign/page.tsx",
    "src/app/[locale]/(marketing)/leistungen/onlineshop-agentur/page.tsx",
    "src/app/[locale]/(marketing)/leistungen/seo-betreuung/page.tsx",
    "src/app/[locale]/(marketing)/leistungen/seo-texter/page.tsx",
    "src/app/[locale]/(marketing)/leistungen/seo-berater/page.tsx",
    "src/app/[locale]/(marketing)/leistungen/pakete/page.tsx",
    "src/app/[locale]/(marketing)/leistungen/google-ads-agentur/page.tsx",
    "src/app/[locale]/(marketing)/kreativagentur-wien/page.tsx",
    "src/app/[locale]/(marketing)/seo-agentur-wien/page.tsx",
    "src/app/[locale]/(marketing)/seo-agentur-linz/page.tsx",
    "src/app/[locale]/(marketing)/projekte/[slug]/page.tsx",
    "src/app/[locale]/(marketing)/seo-agentur-innsbruck/page.tsx",
    "src/app/[locale]/(marketing)/webdesign-wien/page.tsx",
    "src/app/[locale]/(marketing)/google-ads-agentur-oesterreich/page.tsx",
    "src/app/[locale]/(marketing)/werbeagentur-innsbruck/page.tsx",
    "src/app/[locale]/(marketing)/online-marketing-graz/page.tsx",
    "src/app/[locale]/(marketing)/werbeagentur-salzburg/page.tsx",
    "src/app/[locale]/(marketing)/referenzen/page.tsx",
    "src/app/[locale]/(marketing)/referenzen/[slug]/page.tsx",
    "src/app/[locale]/(marketing)/seo-agentur-graz/page.tsx",
    "src/app/[locale]/(marketing)/google-ads-agentur-wien/page.tsx",
    "src/app/[locale]/(marketing)/online-marketing-agentur-linz/page.tsx",
    "src/app/[locale]/(marketing)/seo-agentur-salzburg/page.tsx",
    "src/app/[locale]/(marketing)/ressourcen/newsletter/page.tsx",
    "src/app/[locale]/(marketing)/ressourcen/page.tsx",
    "src/app/[locale]/(marketing)/ressourcen/downloads/page.tsx",
    "src/app/[locale]/(marketing)/werbeagentur-linz/page.tsx",
    "src/app/[locale]/(marketing)/standorte/page.tsx",
]

def fix_file(filepath):
    """Fix a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Step 1: Add AppPathname import if not present
        if "import type { AppPathname } from '@/i18n/routing'" not in content:
            # Find the Link import line
            link_import_pattern = r"(import { Link } from '@/lib/i18n-navigation')"
            if re.search(link_import_pattern, content):
                content = re.sub(
                    link_import_pattern,
                    r"\1\nimport type { AppPathname } from '@/i18n/routing'",
                    content
                )

        # Step 2: Fix href fields in object literals (add 'as AppPathname')
        # Pattern: href: '/some/path'  ->  href: '/some/path' as AppPathname
        # Only match if not already typed
        content = re.sub(
            r"(href:\s*['\"])([^'\"]+)(['\"])(?!\s+as\s+AppPathname)(\s*[,}])",
            r"\1\2\3 as AppPathname\4",
            content
        )

        # Step 3: Remove eslint-disable comments for @typescript-eslint/no-explicit-any
        content = re.sub(
            r'\s*\{/\*\s*eslint-disable-next-line\s+@typescript-eslint/no-explicit-any\s*\*/\}\s*\n',
            '\n',
            content
        )

        # Step 4: Remove 'as any' casts from Link href attributes
        # Pattern: href={something as any}  ->  href={something}
        content = re.sub(
            r'href=\{([^}]+)\s+as\s+any\}',
            r'href={\1}',
            content
        )

        # Only write if content changed
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ Fixed: {filepath}")
            return True
        else:
            print(f"- Skipped (no changes): {filepath}")
            return False

    except Exception as e:
        print(f"✗ Error fixing {filepath}: {e}")
        return False

def main():
    """Main function"""
    print("Fixing 'as any' type casts in TSX files...")
    print("=" * 60)

    fixed_count = 0
    for filepath in FILES_TO_FIX:
        if os.path.exists(filepath):
            if fix_file(filepath):
                fixed_count += 1
        else:
            print(f"⚠ File not found: {filepath}")

    print("=" * 60)
    print(f"Done! Fixed {fixed_count} files.")

if __name__ == "__main__":
    main()
