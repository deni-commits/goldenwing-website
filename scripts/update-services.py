#!/usr/bin/env python3
import sqlite3
import os

db_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'goldenwing.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Update main services with better descriptions
services_data = [
    {
        "slug": "branding",
        "subtitle": "Ihre Marke verdient mehr als ein Logo",
        "description": "Branding ist das Gefühl, das Menschen haben, wenn sie an Ihr Unternehmen denken. Wir entwickeln Markenidentitäten, die authentisch sind und im Gedächtnis bleiben – von der strategischen Positionierung über das visuelle Erscheinungsbild bis zum Brand Book, das alles zusammenhält."
    },
    {
        "slug": "webdesign",
        "subtitle": "Websites, die mehr sind als nur schön",
        "description": "Eine Website ist Ihr digitales Zuhause. Sie soll Besucher überzeugen, Vertrauen aufbauen und Ergebnisse liefern. Wir gestalten Websites, die auf allen Geräten funktionieren, schnell laden und Ihre Besucher zu Kunden machen – strategisch durchdacht und visuell überzeugend."
    },
    {
        "slug": "digitale-strategie",
        "subtitle": "Der Plan, bevor Sie handeln",
        "description": "Ohne Strategie ist Marketing Glücksspiel. Wir analysieren Ihre Zielgruppe, verstehen deren Bedürfnisse und entwickeln den Weg, wie Sie diese Menschen erreichen und überzeugen. Datenbasiert, durchdacht und auf Ihre Ziele ausgerichtet."
    },
    {
        "slug": "seo-sichtbarkeit",
        "subtitle": "Gefunden werden, wenn es zählt",
        "description": "Was nützt die beste Website, wenn sie niemand findet? SEO bringt die richtigen Menschen zu Ihnen – organisch, nachhaltig und ohne laufende Werbekosten. Wir optimieren technisch, inhaltlich und strategisch für langfristige Sichtbarkeit bei Google."
    },
    {
        "slug": "content-visuals",
        "subtitle": "Inhalte, die wirken",
        "description": "Guter Content informiert nicht nur, er bewegt. Ob überzeugende Texte, professionelle Fotos oder Videos, die im Feed stoppen – wir erstellen Inhalte, die Ihre Botschaft transportieren und Ihre Zielgruppe zum Handeln bewegen."
    },
    {
        "slug": "technische-loesungen",
        "subtitle": "Technik, die Ihnen Zeit spart",
        "description": "Manuelle Prozesse kosten Zeit und Nerven. Wir automatisieren Ihre Workflows, verbinden Ihre Systeme und optimieren die Performance Ihrer Website. Damit Sie sich auf das konzentrieren können, was wirklich zählt: Ihr Business."
    },
    {
        "slug": "software-entwicklung",
        "subtitle": "Maßgeschneiderte digitale Lösungen",
        "description": "Manchmal reicht eine Website nicht. Web-Applikationen, Mobile Apps, komplexe Plattformen – wir entwickeln Software, die genau das tut, was Sie brauchen. Mit modernen Technologien, sauberem Code und einem Team, das versteht, was Sie erreichen wollen."
    }
]

for service in services_data:
    cursor.execute("""
        UPDATE services SET
            subtitle = ?,
            description = ?
        WHERE slug = ?
    """, (service["subtitle"], service["description"], service["slug"]))
    print(f"Updated: {service['slug']}")

conn.commit()
conn.close()

print("\n7 main services updated!")
