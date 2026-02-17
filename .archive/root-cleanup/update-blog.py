import sqlite3
import json

# Read the JSON content
with open("german-content.json", "r") as f:
    content = f.read()

# Connect to database
conn = sqlite3.connect("goldenwing.db")
cursor = conn.cursor()

# Update German content
cursor.execute("""
UPDATE posts_locales 
SET content = ?,
    title = ?,
    seo_meta_title = ?,
    seo_meta_description = ?,
    seo_keywords = ?
WHERE _parent_id = 7 AND _locale = 'de'
""", (
    content,
    "Bilder für Web optimieren: Der komplette Guide 2025",
    "Bilder optimieren 2025: AVIF, WebP, fetchpriority | Guide",
    "Bildoptimierung 2025: AVIF vs WebP, fetchpriority für LCP, srcset. Mit Google-Empfehlungen und Code-Beispielen.",
    "Bildoptimierung,WebP,AVIF,Core Web Vitals,LCP,fetchpriority,srcset,Lazy Loading"
))

# Update timestamp
cursor.execute("UPDATE posts SET updated_at = datetime('now') WHERE id = 7")

conn.commit()
print(f"German updated: {cursor.rowcount} rows affected")
conn.close()
