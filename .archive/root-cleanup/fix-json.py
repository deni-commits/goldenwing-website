import sqlite3
import json
import re

conn = sqlite3.connect("goldenwing.db")
cursor = conn.cursor()

# Get both German and English content
for locale in ['de', 'en']:
    cursor.execute(f"SELECT content FROM posts_locales WHERE _parent_id=7 AND _locale='{locale}'")
    content = cursor.fetchone()[0]

    # Fix unescaped double quotes inside text values
    # Replace ASCII double quotes with Unicode right double quotation marks
    fixed = content.replace(
        '"LCP should occur within 2.5 seconds of page load"',
        '\u201cLCP should occur within 2.5 seconds of page load\u201d'
    )
    fixed = fixed.replace(
        '"Never lazy-load your LCP image, as that will always lead to unnecessary resource load delay."',
        '\u201cNever lazy-load your LCP image, as that will always lead to unnecessary resource load delay.\u201d'
    )

    try:
        json.loads(fixed)
        cursor.execute(f"UPDATE posts_locales SET content=? WHERE _parent_id=7 AND _locale='{locale}'", (fixed,))
        print(f"{locale}: Fixed and valid JSON")
    except json.JSONDecodeError as e:
        print(f"{locale}: Still invalid - {e}")
        # Show the problematic area
        pos = e.pos if hasattr(e, 'pos') else 3426
        print(f"Around position {pos}: ...{content[max(0,pos-30):pos+30]}...")

conn.commit()
conn.close()
print("Done!")
