#!/usr/bin/env python3
"""
Remove unused @ts-expect-error comments
"""

import os
import subprocess

def main():
    os.chdir('/Users/denikhachukaev/Documents/GoldenWing 360/goldenwing-website')

    # Find all files with the specific comment
    result = subprocess.run(
        ['grep', '-r', '-l', '@ts-expect-error Type assertion via satisfies - href properly typed',
         'src/app/[locale]/(marketing)', '--include=*.tsx'],
        capture_output=True,
        text=True
    )

    files = [f.strip() for f in result.stdout.strip().split('\n') if f.strip()]

    for filepath in files:
        with open(filepath, 'r') as f:
            content = f.read()

        # Remove the comment and the empty line after it
        content = content.replace('{/* @ts-expect-error Type assertion via satisfies - href properly typed */}\n\n', '')
        content = content.replace('{/* @ts-expect-error Type assertion via satisfies - href properly typed */}\n', '')
        content = content.replace('{/* @ts-expect-error Type assertion via satisfies - href properly typed */}', '')

        with open(filepath, 'w') as f:
            f.write(content)

        print(f"Cleaned: {filepath}")

    print(f"\nProcessed {len(files)} files")

if __name__ == "__main__":
    main()
