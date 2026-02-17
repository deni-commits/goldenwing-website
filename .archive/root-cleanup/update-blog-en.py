import sqlite3

# Read the JSON content
with open("english-content.json", "r") as f:
    content = f.read()

# Connect to database
conn = sqlite3.connect("goldenwing.db")
cursor = conn.cursor()

# Update English content
cursor.execute("""
UPDATE posts_locales 
SET content = ?,
    title = ?,
    seo_meta_title = ?,
    seo_meta_description = ?,
    seo_keywords = ?
WHERE _parent_id = 7 AND _locale = 'en'
""", (
    content,
    "Image Optimization for Web: The Complete Guide 2025",
    "Image Optimization 2025: AVIF, WebP, fetchpriority | Guide",
    "Image optimization 2025: AVIF vs WebP, fetchpriority for LCP, srcset. With Google recommendations and code examples.",
    "Image optimization,WebP,AVIF,Core Web Vitals,LCP,fetchpriority,srcset,Lazy Loading"
))

conn.commit()
print(f"English updated: {cursor.rowcount} rows affected")
conn.close()
