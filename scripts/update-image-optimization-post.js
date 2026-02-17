const Database = require('better-sqlite3');
const path = require('path');

// Database path
const dbPath = path.join(__dirname, '..', 'goldenwing.db');
const db = new Database(dbPath);

// Helper function to create Lexical text node
function text(content, format = 0) {
  return {
    type: 'text',
    text: content,
    format: format, // 0=normal, 1=bold, 2=italic, 16=code
    mode: 'normal',
    style: '',
    detail: 0,
    version: 1
  };
}

// Helper function to create heading
function heading(tag, content) {
  return {
    type: 'heading',
    tag: tag,
    children: [text(content)],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1
  };
}

// Helper function to create paragraph
function paragraph(children) {
  return {
    type: 'paragraph',
    children: Array.isArray(children) ? children : [text(children)],
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
    version: 1
  };
}

// Helper function to create list item
function listItem(content, value = 1) {
  return {
    type: 'listitem',
    children: [text(content)],
    direction: 'ltr',
    format: '',
    indent: 0,
    value: value,
    version: 1
  };
}

// Helper function to create bullet list
function bulletList(items) {
  return {
    type: 'list',
    listType: 'bullet',
    children: items.map((item, i) => listItem(item, i + 1)),
    direction: 'ltr',
    format: '',
    indent: 0,
    start: 1,
    tag: 'ul',
    version: 1
  };
}

// Helper function to create blockquote
function blockquote(content) {
  return {
    type: 'quote',
    children: [text(content)],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1
  };
}

// German content
const germanContent = {
  root: {
    type: 'root',
    children: [
      // Intro
      heading('h2', 'Warum Bildoptimierung wichtig ist'),
      paragraph([
        text('Bilder machen durchschnittlich '),
        text('60% der Seitengröße', 1),
        text(' aus – sie sind damit der größte Hebel für Website-Performance. Optimierte Bilder bedeuten:')
      ]),
      bulletList([
        'Schnellere Ladezeiten – direkte Auswirkung auf Conversion Rate',
        'Bessere Core Web Vitals – besonders LCP (Largest Contentful Paint)',
        'Niedrigere Hosting-Kosten – weniger Bandbreite, weniger Speicher',
        'Bessere User Experience – niemand wartet gerne auf ladende Bilder',
        'Bessere SEO – Google belohnt schnelle Seiten'
      ]),
      blockquote('Fakt: Durch moderne Formate wie WebP/AVIF und richtige Kompression kann die Bildlast um 50-80% reduziert werden – ohne sichtbaren Qualitätsverlust.'),

      // Core Web Vitals
      heading('h2', 'Core Web Vitals und Bilder'),
      paragraph('Die Core Web Vitals sind Googles wichtigste Metriken für User Experience. Bilder beeinflussen zwei davon direkt:'),

      heading('h3', 'LCP (Largest Contentful Paint)'),
      paragraph([
        text('Das größte sichtbare Element beim Laden – meist ein Bild. '),
        text('Zielwert: unter 2,5 Sekunden.', 1)
      ]),
      blockquote('Google empfiehlt: „Largest Contentful Paint (LCP) should occur within the first 2.5 seconds of the page starting to load" für eine gute User Experience. — Google Search Central'),

      heading('h3', 'CLS (Cumulative Layout Shift)'),
      paragraph([
        text('Layout-Verschiebungen durch Bilder ohne definierte Dimensionen. '),
        text('Zielwert: unter 0,1.', 1)
      ]),

      // Format comparison
      heading('h2', 'Bildformate im Vergleich 2025'),
      paragraph([
        text('AVIF', 1),
        text(' – Beste Kompression, 94% Browser-Support, ideal für Fotos')
      ]),
      paragraph([
        text('WebP', 1),
        text(' – Sehr gute Kompression, 97% Browser-Support, Allrounder')
      ]),
      paragraph([
        text('JPEG', 1),
        text(' – Standard-Kompression, 100% Support, als Fallback')
      ]),
      paragraph([
        text('PNG', 1),
        text(' – Für Grafiken mit Transparenz')
      ]),
      paragraph([
        text('SVG', 1),
        text(' – Für Icons, Logos, Illustrationen (immer!)')
      ]),

      // AVIF
      heading('h2', 'AVIF: Das beste Format 2025'),
      paragraph('AVIF wurde als Nachfolger von WebP entwickelt und bietet die beste Kompression aller Bildformate:'),
      bulletList([
        '50% kleiner als JPEG bei gleicher visueller Qualität',
        'Unterstützt HDR und Wide Color Gamut',
        '94% Browser-Unterstützung (Stand 2025)',
        'Ideal für fotolastige Websites und Hero-Bilder'
      ]),
      paragraph([
        text('Nachteil: ', 1),
        text('Längere Encoding-Zeit – daher im Build-Prozess einplanen, nicht on-the-fly konvertieren.')
      ]),

      // WebP
      heading('h3', 'WebP: Der zuverlässige Allrounder'),
      paragraph('WebP bleibt ein exzellentes Format mit breitester Unterstützung:'),
      bulletList([
        '30% kleiner als JPEG bei gleicher Qualität',
        'Unterstützt Transparenz (wie PNG)',
        'Unterstützt Animation (wie GIF)',
        '97% Browser-Unterstützung – der sicherste Allrounder'
      ]),
      paragraph([
        text('Empfehlung: ', 1),
        text('AVIF als erste Wahl, WebP als Fallback, JPEG als letzter Fallback.')
      ]),

      // Picture element
      heading('h2', 'Das picture-Element: Format-Fallbacks'),
      paragraph('Moderne Browser können selbst das beste Format wählen:'),
      paragraph([text('<picture>\n  <source srcset="bild.avif" type="image/avif">\n  <source srcset="bild.webp" type="image/webp">\n  <img src="bild.jpg" alt="Alt-Text" width="800" height="600">\n</picture>', 16)]),
      paragraph('Der Browser lädt automatisch das erste unterstützte Format.'),

      // fetchpriority
      heading('h2', 'fetchpriority: Das LCP-Geheimnis'),
      paragraph('Für das wichtigste Bild (Hero-Image) die Lade-Priorität erhöhen:'),
      paragraph([text('<img src="hero.webp" fetchpriority="high" width="1200" height="630" alt="Hero">', 16)]),
      blockquote('Statistik: Laut Web Almanac nutzen nur 15% der Websites das fetchpriority-Attribut – 85% verpassen diese einfache Optimierung!'),
      paragraph([
        text('Wichtig: ', 1),
        text('Nur für 1-2 Bilder pro Seite verwenden.')
      ]),

      // srcset
      heading('h2', 'Responsive Images mit srcset'),
      paragraph('Liefern Sie verschiedene Bildgrößen für verschiedene Bildschirme:'),
      paragraph([text('<img\n  src="bild-800.webp"\n  srcset="bild-400.webp 400w, bild-800.webp 800w, bild-1200.webp 1200w"\n  sizes="(max-width: 600px) 100vw, 50vw"\n  alt="Beschreibung"\n>', 16)]),

      // Checklist
      heading('h2', 'Optimierungs-Checkliste'),
      paragraph([text('✅ Richtige Größe', 1)]),
      bulletList([
        'Nicht größer als nötig (max. 1920px Breite)',
        'Responsive Images mit srcset verwenden'
      ]),
      paragraph([text('✅ Format wählen', 1)]),
      bulletList([
        'Fotos: AVIF → WebP → JPEG',
        'Grafiken mit Transparenz: WebP oder PNG',
        'Icons/Logos: SVG (immer!)'
      ]),
      paragraph([text('✅ Kompression', 1)]),
      bulletList([
        'Qualität 80-85% für Fotos',
        'Tools: Squoosh, TinyPNG, ImageOptim'
      ]),
      paragraph([text('✅ Lazy Loading richtig', 1)]),
      bulletList([
        'Below-the-fold: loading="lazy"',
        'Above-the-fold: loading="eager"',
        'Hero-Bild: zusätzlich fetchpriority="high"'
      ]),
      paragraph([text('✅ Dimensionen angeben', 1)]),
      bulletList([
        'Immer width und height setzen',
        'Verhindert Layout Shifts (CLS)'
      ]),

      // Common mistakes
      heading('h2', 'Häufige Fehler vermeiden'),
      heading('h3', '⛔ NIEMALS das LCP-Bild lazy-loaden'),
      blockquote('Google Web.dev warnt: „Never lazy-load your LCP image, as that will always lead to unnecessary resource load delay, and will have a negative impact on LCP."'),
      paragraph([text('Diese Bilder sollten NICHT lazy-loaded werden:', 1)]),
      bulletList([
        'Hero-Bilder',
        'Das größte sichtbare Bild (LCP-Element)',
        'Logo im Header'
      ]),

      heading('h3', '⚠️ Vorsicht bei Progressive JPEGs'),
      paragraph('Progressive JPEGs sehen beim Laden "schöner" aus, können aber LCP verschlechtern – Google misst erst wenn das Bild VOLLSTÄNDIG geladen ist.'),
      paragraph([
        text('Empfehlung: ', 1),
        text('Für Hero-Bilder besser Standard-JPEGs oder WebP/AVIF verwenden.')
      ]),

      heading('h3', '❌ Zu viele "high priority" Ressourcen'),
      paragraph('Wenn Sie fetchpriority="high" auf viele Bilder setzen, konkurrieren sie alle um Bandbreite.'),
      paragraph([
        text('Regel: ', 1),
        text('Maximal 1-2 Bilder pro Seite mit high priority.')
      ]),

      // Tools
      heading('h2', 'Tools für Bildoptimierung'),
      paragraph([text('Online (kostenlos):', 1)]),
      bulletList([
        'Squoosh.app (Google)',
        'TinyPNG',
        'Compressor.io'
      ]),
      paragraph([text('Desktop:', 1)]),
      bulletList([
        'ImageOptim (Mac)',
        'FileOptimizer (Windows)',
        'GIMP'
      ]),
      paragraph([text('Automatisiert:', 1)]),
      bulletList([
        'Next.js Image Component',
        'Cloudinary',
        'Imgix',
        'Sharp (Node.js)'
      ]),

      // Next.js
      heading('h2', 'Next.js Image Best Practice'),
      paragraph([text('import Image from \'next/image\'\n\n<Image\n  src="/hero.jpg"\n  alt="Hero-Bild"\n  width={1200}\n  height={630}\n  priority // für LCP-Bild\n  quality={85}\n/>', 16)]),

      // Conclusion
      heading('h2', 'Fazit'),
      paragraph('Bildoptimierung ist einer der einfachsten und effektivsten Wege, Ihre Website schneller zu machen. Die wichtigsten Punkte:'),
      bulletList([
        'AVIF nutzen – das beste Format 2025, mit WebP als Fallback',
        'fetchpriority="high" für das Hero-Bild setzen',
        'LCP-Bilder niemals lazy-loaden',
        'Immer width/height angeben für CLS-Vermeidung',
        'srcset verwenden für responsive Bilder'
      ]),
      paragraph('Implementieren Sie diese Best Practices und Sie werden sofortige Verbesserungen bei Core Web Vitals und User Experience sehen.')
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1
  }
};

// English content
const englishContent = {
  root: {
    type: 'root',
    children: [
      // Intro
      heading('h2', 'Why Image Optimization Matters'),
      paragraph([
        text('Images account for an average of '),
        text('60% of page weight', 1),
        text(' – making them the biggest lever for website performance. Optimized images mean:')
      ]),
      bulletList([
        'Faster load times – direct impact on conversion rate',
        'Better Core Web Vitals – especially LCP (Largest Contentful Paint)',
        'Lower hosting costs – less bandwidth, less storage',
        'Better user experience – nobody likes waiting for images to load',
        'Better SEO – Google rewards fast websites'
      ]),
      blockquote('Fact: Modern formats like WebP/AVIF and proper compression can reduce image payload by 50-80% – without visible quality loss.'),

      // Core Web Vitals
      heading('h2', 'Core Web Vitals and Images'),
      paragraph('Core Web Vitals are Google\'s key metrics for user experience. Images directly affect two of them:'),

      heading('h3', 'LCP (Largest Contentful Paint)'),
      paragraph([
        text('The largest visible element during page load – usually an image. '),
        text('Target: under 2.5 seconds.', 1)
      ]),
      blockquote('Google recommends: "Largest Contentful Paint (LCP) should occur within the first 2.5 seconds of the page starting to load" for a good user experience. — Google Search Central'),

      heading('h3', 'CLS (Cumulative Layout Shift)'),
      paragraph([
        text('Layout shifts caused by images without defined dimensions. '),
        text('Target: under 0.1.', 1)
      ]),

      // Format comparison
      heading('h2', 'Image Formats Comparison 2025'),
      paragraph([
        text('AVIF', 1),
        text(' – Best compression, 94% browser support, ideal for photos')
      ]),
      paragraph([
        text('WebP', 1),
        text(' – Very good compression, 97% browser support, all-rounder')
      ]),
      paragraph([
        text('JPEG', 1),
        text(' – Standard compression, 100% support, as fallback')
      ]),
      paragraph([
        text('PNG', 1),
        text(' – For graphics with transparency')
      ]),
      paragraph([
        text('SVG', 1),
        text(' – For icons, logos, illustrations (always!)')
      ]),

      // AVIF
      heading('h2', 'AVIF: The Best Format in 2025'),
      paragraph('AVIF was developed as a successor to WebP and offers the best compression of all image formats:'),
      bulletList([
        '50% smaller than JPEG at the same visual quality',
        'Supports HDR and Wide Color Gamut',
        '94% browser support (as of 2025)',
        'Ideal for photo-heavy websites and hero images'
      ]),
      paragraph([
        text('Drawback: ', 1),
        text('Longer encoding time – plan for build process, not on-the-fly conversion.')
      ]),

      // WebP
      heading('h3', 'WebP: The Reliable All-Rounder'),
      paragraph('WebP remains an excellent format with the broadest support:'),
      bulletList([
        '30% smaller than JPEG at the same quality',
        'Supports transparency (like PNG)',
        'Supports animation (like GIF)',
        '97% browser support – the safest all-rounder'
      ]),
      paragraph([
        text('Recommendation: ', 1),
        text('AVIF as first choice, WebP as fallback, JPEG as last fallback.')
      ]),

      // Picture element
      heading('h2', 'The picture Element: Format Fallbacks'),
      paragraph('Modern browsers can choose the best format themselves:'),
      paragraph([text('<picture>\n  <source srcset="image.avif" type="image/avif">\n  <source srcset="image.webp" type="image/webp">\n  <img src="image.jpg" alt="Alt text" width="800" height="600">\n</picture>', 16)]),
      paragraph('The browser automatically loads the first supported format.'),

      // fetchpriority
      heading('h2', 'fetchpriority: The LCP Secret'),
      paragraph('For your most important image (hero image), increase the loading priority:'),
      paragraph([text('<img src="hero.webp" fetchpriority="high" width="1200" height="630" alt="Hero">', 16)]),
      blockquote('Statistic: According to Web Almanac, only 15% of websites use the fetchpriority attribute – 85% are missing this simple optimization!'),
      paragraph([
        text('Important: ', 1),
        text('Only use for 1-2 images per page.')
      ]),

      // srcset
      heading('h2', 'Responsive Images with srcset'),
      paragraph('Deliver different image sizes for different screens:'),
      paragraph([text('<img\n  src="image-800.webp"\n  srcset="image-400.webp 400w, image-800.webp 800w, image-1200.webp 1200w"\n  sizes="(max-width: 600px) 100vw, 50vw"\n  alt="Description"\n>', 16)]),

      // Checklist
      heading('h2', 'Optimization Checklist'),
      paragraph([text('✅ Right Size', 1)]),
      bulletList([
        'No larger than necessary (max. 1920px width)',
        'Use responsive images with srcset'
      ]),
      paragraph([text('✅ Choose Format', 1)]),
      bulletList([
        'Photos: AVIF → WebP → JPEG',
        'Graphics with transparency: WebP or PNG',
        'Icons/Logos: SVG (always!)'
      ]),
      paragraph([text('✅ Compression', 1)]),
      bulletList([
        'Quality 80-85% for photos',
        'Tools: Squoosh, TinyPNG, ImageOptim'
      ]),
      paragraph([text('✅ Use Lazy Loading Correctly', 1)]),
      bulletList([
        'Below-the-fold: loading="lazy"',
        'Above-the-fold: loading="eager"',
        'Hero image: additionally fetchpriority="high"'
      ]),
      paragraph([text('✅ Always Specify Dimensions', 1)]),
      bulletList([
        'Always set width and height',
        'Prevents layout shifts (CLS)'
      ]),

      // Common mistakes
      heading('h2', 'Common Mistakes to Avoid'),
      heading('h3', '⛔ NEVER Lazy-Load the LCP Image'),
      blockquote('Google Web.dev warns: "Never lazy-load your LCP image, as that will always lead to unnecessary resource load delay, and will have a negative impact on LCP."'),
      paragraph([text('These images should NOT be lazy-loaded:', 1)]),
      bulletList([
        'Hero images',
        'The largest visible image (LCP element)',
        'Logo in header'
      ]),

      heading('h3', '⚠️ Caution with Progressive JPEGs'),
      paragraph('Progressive JPEGs look "nicer" during loading, but can hurt LCP – Google measures only when the image is FULLY loaded.'),
      paragraph([
        text('Recommendation: ', 1),
        text('For hero images, prefer standard JPEGs or WebP/AVIF.')
      ]),

      heading('h3', '❌ Too Many "High Priority" Resources'),
      paragraph('If you set fetchpriority="high" on many images, they all compete for bandwidth.'),
      paragraph([
        text('Rule: ', 1),
        text('Maximum 1-2 images per page with high priority.')
      ]),

      // Tools
      heading('h2', 'Tools for Image Optimization'),
      paragraph([text('Online (Free):', 1)]),
      bulletList([
        'Squoosh.app (Google)',
        'TinyPNG',
        'Compressor.io'
      ]),
      paragraph([text('Desktop:', 1)]),
      bulletList([
        'ImageOptim (Mac)',
        'FileOptimizer (Windows)',
        'GIMP'
      ]),
      paragraph([text('Automated:', 1)]),
      bulletList([
        'Next.js Image Component',
        'Cloudinary',
        'Imgix',
        'Sharp (Node.js)'
      ]),

      // Next.js
      heading('h2', 'Next.js Image Best Practice'),
      paragraph([text('import Image from \'next/image\'\n\n<Image\n  src="/hero.jpg"\n  alt="Hero image"\n  width={1200}\n  height={630}\n  priority // for LCP image\n  quality={85}\n/>', 16)]),

      // Conclusion
      heading('h2', 'Conclusion'),
      paragraph('Image optimization is one of the easiest and most effective ways to make your website faster. Key takeaways:'),
      bulletList([
        'Use AVIF – the best format in 2025, with WebP as fallback',
        'Set fetchpriority="high" for the hero image',
        'Never lazy-load LCP images',
        'Always specify width/height to prevent CLS',
        'Use srcset for responsive images'
      ]),
      paragraph('Implement these best practices and you\'ll see immediate improvements in Core Web Vitals and user experience.')
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1
  }
};

// SEO updates
const germanSeo = {
  title: 'Bilder für Web optimieren: Der komplette Guide 2025',
  metaTitle: 'Bilder optimieren für Web 2025: AVIF, WebP, fetchpriority | Guide',
  metaDescription: 'Bildoptimierung 2025: AVIF vs WebP, fetchpriority für LCP, srcset für responsive Images. Mit Google-Empfehlungen und Code-Beispielen. Jetzt lesen!',
  keywords: 'Bildoptimierung, WebP, AVIF, Core Web Vitals, LCP, fetchpriority, responsive images, srcset, Lazy Loading, Next.js Image'
};

const englishSeo = {
  title: 'Image Optimization for Web: The Complete Guide 2025',
  metaTitle: 'Image Optimization for Web 2025: AVIF, WebP, fetchpriority | Guide',
  metaDescription: 'Image optimization 2025: AVIF vs WebP, fetchpriority for LCP, srcset for responsive images. With Google recommendations and code examples. Read now!',
  keywords: 'image optimization, WebP, AVIF, Core Web Vitals, LCP, fetchpriority, responsive images, srcset, lazy loading, Next.js Image'
};

try {
  // Update German content
  const updateGerman = db.prepare(`
    UPDATE posts_locales
    SET content = ?,
        title = ?,
        seo_meta_title = ?,
        seo_meta_description = ?,
        seo_keywords = ?
    WHERE _parent_id = 7 AND _locale = 'de'
  `);

  updateGerman.run(
    JSON.stringify(germanContent),
    germanSeo.title,
    germanSeo.metaTitle,
    germanSeo.metaDescription,
    germanSeo.keywords
  );

  console.log('✅ German content updated');

  // Update English content
  const updateEnglish = db.prepare(`
    UPDATE posts_locales
    SET content = ?,
        title = ?,
        seo_meta_title = ?,
        seo_meta_description = ?,
        seo_keywords = ?
    WHERE _parent_id = 7 AND _locale = 'en'
  `);

  updateEnglish.run(
    JSON.stringify(englishContent),
    englishSeo.title,
    englishSeo.metaTitle,
    englishSeo.metaDescription,
    englishSeo.keywords
  );

  console.log('✅ English content updated');

  // Update the main post's updated_at timestamp
  const updateTimestamp = db.prepare(`
    UPDATE posts SET updated_at = ? WHERE id = 7
  `);
  updateTimestamp.run(new Date().toISOString());

  console.log('✅ Timestamp updated');
  console.log('');
  console.log('🎉 Blog post "Bilder für Web optimieren" successfully updated!');
  console.log('   Post ID: 7');
  console.log('   Languages: German (de), English (en)');

} catch (error) {
  console.error('❌ Error updating database:', error);
  process.exit(1);
} finally {
  db.close();
}
