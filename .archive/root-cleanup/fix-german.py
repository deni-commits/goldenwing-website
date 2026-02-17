import sqlite3
import json
import re

conn = sqlite3.connect("goldenwing.db")
cursor = conn.cursor()

# Get German content
cursor.execute("SELECT content FROM posts_locales WHERE _parent_id=7 AND _locale='de'")
content = cursor.fetchone()[0]

# The problem is the ASCII double quote in:
# "Google empfiehlt: „LCP should occur within 2.5 seconds of page load" — Google Search Central"
# The " after "load" is unescaped

# Find and replace all problematic patterns
# Pattern: ,"text":"...something with unescaped quotes..."

# Manual fix for known issues - replace the specific broken string
# Original problematic: of page load" — Google
# Should be: of page load" — Google (with unicode right quote)

fixed = content

# Fix 1: The Google recommendation quote
fixed = fixed.replace(
    'of page load" — Google Search Central',
    'of page load\u201d — Google Search Central'
)

# Fix 2: The Web.dev warning about lazy loading
fixed = fixed.replace(
    'resource load delay."',
    'resource load delay.\u201d'
)

# Fix 3: In case there's also an opening quote issue
fixed = fixed.replace(
    '„LCP should occur within',
    '\u201eLCP should occur within'
)
fixed = fixed.replace(
    '„Never lazy-load',
    '\u201eNever lazy-load'
)

try:
    parsed = json.loads(fixed)
    cursor.execute("UPDATE posts_locales SET content=? WHERE _parent_id=7 AND _locale='de'", (fixed,))
    conn.commit()
    print("German content fixed successfully!")
    print(f"Content length: {len(fixed)}")
except json.JSONDecodeError as e:
    print(f"Still invalid JSON: {e}")
    pos = e.pos if hasattr(e, 'pos') else 0
    print(f"Problem at position {pos}:")
    print(f"...{fixed[max(0,pos-50):pos+50]}...")

conn.close()
