#!/usr/bin/env python3
"""
Script to fix defaultRelatedServices type annotations
"""

import re
import os

FILES = [
    "src/app/[locale]/(marketing)/leistungen/social-media-agentur/page.tsx",
    "src/app/[locale]/(marketing)/leistungen/sea-agentur/page.tsx",
    "src/app/[locale]/(marketing)/leistungen/wordpress-agentur/page.tsx",
    "src/app/[locale]/(marketing)/leistungen/ecommerce-agentur/page.tsx",
    "src/app/[locale]/(marketing)/leistungen/grafikdesign/page.tsx",
    "src/app/[locale]/(marketing)/leistungen/onlineshop-agentur/page.tsx",
    "src/app/[locale]/(marketing)/leistungen/seo-betreuung/page.tsx",
    "src/app/[locale]/(marketing)/leistungen/seo-texter/page.tsx",
    "src/app/[locale]/(marketing)/leistungen/seo-berater/page.tsx",
    "src/app/[locale]/(marketing)/leistungen/google-ads-agentur/page.tsx",
    "src/app/[locale]/(marketing)/seo-agentur-wien/page.tsx",
    "src/app/[locale]/(marketing)/seo-agentur-linz/page.tsx",
    "src/app/[locale]/(marketing)/seo-agentur-innsbruck/page.tsx",
    "src/app/[locale]/(marketing)/google-ads-agentur-oesterreich/page.tsx",
    "src/app/[locale]/(marketing)/werbeagentur-innsbruck/page.tsx",
    "src/app/[locale]/(marketing)/online-marketing-graz/page.tsx",
    "src/app/[locale]/(marketing)/werbeagentur-salzburg/page.tsx",
    "src/app/[locale]/(marketing)/seo-agentur-graz/page.tsx",
    "src/app/[locale]/(marketing)/google-ads-agentur-wien/page.tsx",
    "src/app/[locale]/(marketing)/online-marketing-agentur-linz/page.tsx",
    "src/app/[locale]/(marketing)/seo-agentur-salzburg/page.tsx",
    "src/app/[locale]/(marketing)/werbeagentur-linz/page.tsx",
]

def fix_file(filepath):
    """Fix a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Pattern 1: Remove 'as AppPathname' from defaultRelatedServices objects
        # This is because we'll use 'satisfies' at the end instead
        content = re.sub(
            r"(href:\s*['\"][^'\"]+['\"])\s+as\s+AppPathname(\s*[,}])",
            r"\1\2",
            content
        )

        # Pattern 2: Find defaultRelatedServices definition and add satisfies
        # Match the entire defaultRelatedServices object
        pattern = r'(const defaultRelatedServices\s*=\s*\{[^}]+de:\s*\[[^\]]+\][^}]+en:\s*\[[^\]]+\]\s*,?\s*\})'
        matches = re.findall(pattern, content, re.DOTALL)

        if matches:
            for match in matches:
                # Check if already has 'satisfies'
                if 'satisfies' not in match:
                    # Add satisfies annotation
                    new_match = match + " as const satisfies Record<'de' | 'en', Array<{ title: string; description: string; href: AppPathname }>>"
                    content = content.replace(match, new_match)

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
        import traceback
        traceback.print_exc()
        return False

def main():
    """Main function"""
    os.chdir('/Users/denikhachukaev/Documents/GoldenWing 360/goldenwing-website')

    print("Fixing defaultRelatedServices type annotations...")
    print("=" * 60)

    fixed_count = 0
    for filepath in FILES:
        if os.path.exists(filepath):
            if fix_file(filepath):
                fixed_count += 1
        else:
            print(f"⚠ File not found: {filepath}")

    print("=" * 60)
    print(f"Done! Fixed {fixed_count} files.")

if __name__ == "__main__":
    main()
