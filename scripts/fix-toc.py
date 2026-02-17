#!/usr/bin/env python3
"""Fix table of contents for all posts to match actual h2 headings in content"""
import sqlite3
import json
import os
import re
import uuid

db_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'goldenwing.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

def create_slug(text):
    """Same logic as createSlug in RichText component"""
    slug = text.lower()
    # German umlauts
    slug = slug.replace('ä', 'ae').replace('Ä', 'ae')
    slug = slug.replace('ö', 'oe').replace('Ö', 'oe')
    slug = slug.replace('ü', 'ue').replace('Ü', 'ue')
    slug = slug.replace('ß', 'ss')
    # Remove non-alphanumeric (keep spaces and hyphens)
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    # Replace spaces with hyphens
    slug = re.sub(r'\s+', '-', slug)
    # Remove multiple hyphens
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')

def extract_h2_headings(content_json):
    """Extract h2 headings from Lexical JSON content"""
    try:
        content = json.loads(content_json) if isinstance(content_json, str) else content_json
        headings = []

        for node in content.get('root', {}).get('children', []):
            if node.get('type') == 'heading' and node.get('tag') == 'h2':
                # Extract text from children
                text = ''
                for child in node.get('children', []):
                    if child.get('type') == 'text':
                        text += child.get('text', '')
                if text:
                    headings.append(text)

        return headings
    except (json.JSONDecodeError, TypeError):
        return []

# Get all posts
cursor.execute("SELECT id, slug, title, content FROM posts")
posts = cursor.fetchall()

print(f"Processing {len(posts)} posts...\n")

for post_id, post_slug, title, content in posts:
    h2_headings = extract_h2_headings(content)

    if not h2_headings:
        print(f"[SKIP] {post_slug}: No h2 headings found")
        continue

    # Delete existing TOC entries for this post
    cursor.execute("DELETE FROM posts_table_of_contents WHERE _parent_id = ?", (post_id,))

    # Insert new TOC entries
    for order, heading in enumerate(h2_headings, 1):
        anchor = create_slug(heading)
        toc_id = uuid.uuid4().hex[:24]  # Generate random ID like Payload does

        cursor.execute("""
            INSERT INTO posts_table_of_contents (_order, _parent_id, id, heading, anchor)
            VALUES (?, ?, ?, ?, ?)
        """, (order, post_id, toc_id, heading, anchor))

    print(f"[OK] {post_slug}: Added {len(h2_headings)} TOC entries")

conn.commit()
conn.close()

print("\nDone! All TOC entries updated to match h2 headings.")
