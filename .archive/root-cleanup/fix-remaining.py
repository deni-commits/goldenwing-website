#!/usr/bin/env python3
"""
Script to fix remaining files without 'as AppPathname' in relatedServices arrays
"""

import re
import os
import subprocess

def get_files_to_fix():
    """Find all files with relatedServices that need fixing"""
    result = subprocess.run(
        ['bash', '-c',
         """find src/app/\\[locale\\]/\\(marketing\\) -name "*.tsx" -type f -exec grep -l "relatedServices:" {} \\; | while read file; do if ! grep -q "href:.*as AppPathname" "$file"; then echo "$file"; fi; done"""],
        capture_output=True,
        text=True,
        cwd='/Users/denikhachukaev/Documents/GoldenWing 360/goldenwing-website'
    )
    return [f.strip() for f in result.stdout.strip().split('\n') if f.strip()]

def fix_file(filepath):
    """Fix a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Step 1: Add AppPathname import if not present
        if "import type { AppPathname } from '@/i18n/routing'" not in content:
            # Try different import patterns
            patterns = [
                (r"(import { Metadata } from 'next')", r"\1\nimport type { AppPathname } from '@/i18n/routing'"),
                (r"(import { getCanonicalUrl[^}]*} from '@/lib/utils')", r"\1\nimport type { AppPathname } from '@/i18n/routing'"),
            ]

            for pattern, replacement in patterns:
                if re.search(pattern, content):
                    content = re.sub(pattern, replacement, content, count=1)
                    break

        # Step 2: Fix href fields in relatedServices arrays (add 'as AppPathname')
        # Pattern: href: '/some/path'  ->  href: '/some/path' as AppPathname
        # Only match if not already typed
        content = re.sub(
            r"(href:\s*['\"])([^'\"]+)(['\"])(?!\s+as\s+AppPathname)(\s*[,}])",
            r"\1\2\3 as AppPathname\4",
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
    os.chdir('/Users/denikhachukaev/Documents/GoldenWing 360/goldenwing-website')

    print("Finding files that need fixing...")
    files = get_files_to_fix()

    print(f"Found {len(files)} files to fix")
    print("=" * 60)

    fixed_count = 0
    for filepath in files:
        if os.path.exists(filepath):
            if fix_file(filepath):
                fixed_count += 1
        else:
            print(f"⚠ File not found: {filepath}")

    print("=" * 60)
    print(f"Done! Fixed {fixed_count} files.")

if __name__ == "__main__":
    main()
