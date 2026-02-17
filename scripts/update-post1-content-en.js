/**
 * Update Post 1 Content - English Version
 * Converts rich content to Lexical JSON and updates database
 */

const Database = require('better-sqlite3');
const path = require('path');

// Helper functions for Lexical JSON
function text(content, format = 0) {
  return {
    type: "text",
    text: content,
    format, // 0=normal, 1=bold, 2=italic, 3=bold+italic
    mode: "normal",
    style: "",
    detail: 0,
    version: 1
  };
}

function link(url, linkText, isExternal = false) {
  return {
    type: "link",
    url,
    children: [text(linkText)],
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
    rel: isExternal ? "noopener noreferrer" : null,
    target: isExternal ? "_blank" : null
  };
}

function heading(tag, children) {
  return {
    type: "heading",
    tag,
    children: Array.isArray(children) ? children : [text(children)],
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1
  };
}

function paragraph(children) {
  return {
    type: "paragraph",
    children: Array.isArray(children) ? children : [text(children)],
    direction: "ltr",
    format: "",
    indent: 0,
    textFormat: 0,
    version: 1
  };
}

function bulletList(items) {
  return {
    type: "list",
    listType: "bullet",
    children: items.map((item, i) => ({
      type: "listitem",
      children: Array.isArray(item) ? item : [text(item)],
      direction: "ltr",
      format: "",
      indent: 0,
      value: i + 1,
      version: 1
    })),
    direction: "ltr",
    format: "",
    indent: 0,
    start: 1,
    tag: "ul",
    version: 1
  };
}

function quote(children) {
  return {
    type: "quote",
    children: Array.isArray(children) ? children : [paragraph(children)],
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1
  };
}

// Build the complete content for Post 1 EN
const post1ContentEN = {
  root: {
    type: "root",
    children: [
      // Intro
      heading("h2", "How Much Does a Professional Website Cost in Austria 2025?"),

      paragraph([
        text("Planning a new website and wondering: What will it cost? We hear this question at GoldenWing every day. The honest answer: It depends – but don't worry, in this comprehensive guide we'll transparently explain all pricing factors.")
      ]),

      paragraph([
        text("The short version:", 1),
        text(" A professional business website in Austria costs between "),
        text("€3,000 and €15,000", 1),
        text(". Simple one-pagers start from €1,500, complex online shops can cost €30,000 or more. Why the range is so wide and what you can expect for your budget, you'll learn in the next few minutes.")
      ]),

      // Section: The Truth
      heading("h2", "The Truth About Website Prices in Austria"),

      paragraph([
        text("Before we dive into the details, an important point: The cheapest provider is rarely the best. According to a survey by the "),
        link("https://www.wko.at", "Austrian Economic Chamber (WKO)", true),
        text(", over 40% of web projects fail due to poor planning or cheap implementation – often with expensive follow-up costs.")
      ]),

      quote([
        paragraph([
          text("\"If you think good design is expensive, you should see what bad design costs.\" — Dr. Ralf Speth, former CEO of Jaguar Land Rover", 2)
        ])
      ]),

      paragraph([
        text("At "),
        link("/about", "GoldenWing"),
        text(" we work according to the principle: "),
        text("Quality over quantity", 1),
        text(". A website that doesn't bring customers is wasted money – no matter how cheap it was. That's why we invest time in strategy and conception before a single line of code is written.")
      ]),

      // Section: Price Overview
      heading("h2", "Website Costs by Project Type (Austria 2025)"),

      paragraph("The following overview is based on current market prices and our project experience:"),

      paragraph([
        text("One-Pager / Landing Page:", 1),
        text(" €1,500 – €3,500 | 1-2 weeks | For freelancers, startups, campaigns")
      ]),
      paragraph([
        text("Business Website (5-10 pages):", 1),
        text(" €3,500 – €8,000 | 3-6 weeks | For SMEs, tradespeople, service providers")
      ]),
      paragraph([
        text("Corporate Website (10-25 pages):", 1),
        text(" €8,000 – €20,000 | 6-12 weeks | For mid-sized and larger companies")
      ]),
      paragraph([
        text("E-Commerce / Online Shop:", 1),
        text(" €6,000 – €30,000 | 4-12 weeks | For online retailers, retail")
      ]),
      paragraph([
        text("Custom Web Application:", 1),
        text(" €15,000 – €100,000+ | 3-12 months | For startups, SaaS, specialized applications")
      ]),

      paragraph([
        text("Important:", 1),
        text(" These prices apply to professional agencies and freelancers in Austria. According to "),
        link("https://www.statista.com", "Statista", true),
        text(", successful SMEs in the DACH region invest an average of €5,000-€10,000 in their business website.")
      ]),

      // Section: 6 Price Factors
      heading("h2", "The 6 Most Important Price Factors in Detail"),

      heading("h3", "1. Scope and Number of Pages"),

      paragraph("Each additional page means:"),
      bulletList([
        "More conceptual work",
        "More design work",
        "More development time",
        "More content that needs to be created"
      ]),

      paragraph([
        text("Rule of thumb:", 1),
        text(" Per additional page, you can expect €300-€800 in extra costs, depending on complexity.")
      ]),

      paragraph([
        text("Tip:", 1),
        text(" Consider carefully which pages you really need. In our "),
        link("/services/web-design", "web design consultation"),
        text(" we help you find the optimal structure.")
      ]),

      heading("h3", "2. Design Complexity"),

      paragraph([
        text("Design typically accounts for "),
        text("30-40% of total costs", 1),
        text(". There are three approaches:")
      ]),

      paragraph([
        text("Template-based (€1,000-€3,000):", 1),
        text(" Pre-made theme is customized. Quick to implement, but looks like thousands of other websites.")
      ]),

      paragraph([
        text("Semi-Custom (€3,000-€8,000):", 1),
        text(" Template as a base with strong customization. Good compromise between time and uniqueness.")
      ]),

      paragraph([
        text("Full Custom Design (€8,000+):", 1),
        text(" Completely individual design according to your specifications. Unique user experience, longer development time.")
      ]),

      quote([
        paragraph([
          text("\"Design is not just what it looks like and feels like. Design is how it works.\" — Steve Jobs, Co-founder of Apple", 2)
        ])
      ]),

      paragraph([
        text("At GoldenWing we rely on "),
        link("/services/branding", "individual branding"),
        text(" – because your website is your digital business card.")
      ]),

      heading("h3", "3. Functions and Features"),

      paragraph("Additional functions significantly increase the price:"),

      bulletList([
        "Contact form (standard): €200 – €500",
        "Contact form (with CRM integration): €500 – €1,500",
        "Newsletter integration: €300 – €800",
        "Booking/calendar system: €1,000 – €3,500",
        "Members area: €2,000 – €5,000",
        "Multilingual: +30-50% surcharge",
        "E-commerce (basic function): €3,000 – €8,000",
        "Custom interfaces (API): €1,500 – €10,000+"
      ]),

      paragraph([
        text("Our advice:", 1),
        text(" Start with the most important features and expand later. A "),
        link("/services/digital-strategy", "digital strategy"),
        text(" helps you set priorities.")
      ]),

      heading("h3", "4. Content Management System (CMS)"),

      paragraph("The choice of CMS affects both development costs and ongoing costs:"),

      paragraph([
        text("WordPress", 1),
        text(" – License costs: €0, Development: €2,000 – €15,000. Market share: 43% of all websites worldwide according to "),
        link("https://w3techs.com/technologies/details/cm-wordpress", "W3Techs", true),
        text(". Pro: Huge ecosystem, many plugins. Con: Security updates important.")
      ]),

      paragraph([
        text("Webflow", 1),
        text(" – License costs: €14-€39/month, Development: €2,500 – €12,000. Pro: Visual editor, fast load times. Con: Less flexible.")
      ]),

      paragraph([
        text("More in our comparison: "),
        link("/blog/wordpress-or-webflow-comparison", "WordPress or Webflow – Which CMS is Better?")
      ]),

      paragraph([
        text("Headless CMS", 1),
        text(" (Payload, Strapi, Contentful) – Development: €5,000 – €30,000. Maximum flexibility, best performance. We use "),
        link("/services/technical-solutions", "modern technologies"),
        text(" for best results.")
      ]),

      heading("h3", "5. SEO and Performance"),

      paragraph("A website without SEO is like a store without a sign:"),

      paragraph([
        text("Basic SEO (usually included):", 1),
        text(" Meta tags, clean URL structure, mobile optimization, fast load times.")
      ]),

      paragraph([
        text("Professional SEO (additional €1,500-€5,000):", 1),
        text(" Keyword research, content strategy, technical optimization ("),
        link("/blog/core-web-vitals-optimization", "Core Web Vitals"),
        text("), local SEO.")
      ]),

      paragraph([
        text("According to "),
        link("https://developers.google.com/search/docs/fundamentals/seo-starter-guide", "Google", true),
        text(", websites with good SEO have up to 50% more organic traffic. Our "),
        link("/services/seo-visibility", "SEO experts"),
        text(" support you in this.")
      ]),

      heading("h3", "6. Text, Images and Content Creation"),

      paragraph("Often underestimated, but a critical cost factor:"),

      bulletList([
        "Copywriting: €80 – €150 per page (professional writer)",
        "SEO-optimized content: €200 – €400 per page",
        "Stock photos: €10 – €50 per image",
        "Professional photo shoot: €500 – €2,000",
        "Custom illustrations: €200 – €1,000 per graphic"
      ]),

      paragraph([
        text("We offer "),
        link("/services/content-visuals", "Content & Visual Services"),
        text(" from one source – so your website not only looks good but also convinces.")
      ]),

      // Section: Included
      heading("h2", "What's Included in GoldenWing's Price?"),

      paragraph([
        text("With our "),
        link("/services/web-design", "web design projects"),
        text(" you receive as standard:")
      ]),

      bulletList([
        "Concept & Strategy: Target group analysis, sitemap, wireframes",
        "Individual Design: No off-the-shelf template",
        "Responsive Implementation: Perfect on desktop, tablet and mobile",
        "Basic SEO Optimization: Meta tags, fast load times, structured data",
        "CMS Setup: You can edit content yourself",
        "SSL Certificate: Secure HTTPS connection",
        "GDPR Compliant: Cookie banner, privacy policy, legal notice",
        "Training: 60-minute introduction to your CMS",
        "30 Days Support: After launch we're available for questions"
      ]),

      paragraph([
        text("Not included (optionally available):", 1),
        text(" Copywriting, professional photography, ongoing maintenance, extended SEO measures, hosting.")
      ]),

      // Section: Ongoing Costs
      heading("h2", "Ongoing Costs: What Comes After Launch?"),

      paragraph("A website incurs ongoing costs – plan for these from the start:"),

      bulletList([
        "Hosting: €10 – €50 monthly (€120 – €600 annually)",
        "Domain (.at / .com): €10 – €30 annually",
        "SSL Certificate: Often included in hosting",
        "Maintenance & Updates: €50 – €200 monthly",
        "SEO Support (optional): €300 – €1,500 monthly"
      ]),

      paragraph([
        text("Important:", 1),
        text(" Don't neglect maintenance! According to a "),
        link("https://sucuri.net/reports/website-threat-research-report/", "study by Sucuri", true),
        text(", 90% of hacked websites are WordPress sites with outdated plugins.")
      ]),

      // Section: Price Differences
      heading("h2", "Why Some Websites Cost €2,000 and Others €20,000"),

      paragraph("The price differences can be broken down to a few factors:"),

      paragraph([
        text("Budget (Freelancer, small agency):", 1),
        text(" Template-based, standard features, little consulting/strategy, often no ongoing support.")
      ]),

      paragraph([
        text("Premium (established agency):", 1),
        text(" Individual design and concept, strategic consulting, UX/UI expertise, professional project management, long-term partnership.")
      ]),

      quote([
        paragraph([
          text("\"Your website is often the first impression a potential customer has of your business. Invest accordingly.\" — Neil Patel, Digital Marketing Expert", 2)
        ])
      ]),

      paragraph([
        text("The question is not: \"How much does a website cost?\" But rather: "),
        text("\"What is a new customer worth to me?\"", 1),
        text(" A website for €2,000 that brings no customers is more expensive than one for €10,000 that regularly generates inquiries.")
      ]),

      // Section: Mistakes
      heading("h2", "5 Common Budget Planning Mistakes"),

      bulletList([
        [text("Only seeing the initial price:", 1), text(" Don't forget hosting, maintenance and updates")],
        [text("Skimping on content:", 1), text(" Poor copy ruins any design")],
        [text("Ignoring SEO:", 1), text(" An invisible website brings no customers")],
        [text("Too many features at once:", 1), text(" Start lean and expand later")],
        [text("Trusting cheap providers:", 1), text(" Offshore development = often GDPR problems and no support")]
      ]),

      // Section: CTA
      heading("h2", "Your Next Step"),

      paragraph("You now have a good overview of website costs in Austria. Would you like to know what your individual website would cost?"),

      paragraph([
        text("We offer you:", 1)
      ]),
      bulletList([
        "Free initial consultation (30 minutes)",
        "Non-binding quote within 48 hours",
        "Transparent pricing with no hidden costs"
      ]),

      paragraph([
        text("→ "),
        link("/contact", "Get in Touch Now")
      ]),

      paragraph([
        text("Or take a look at our "),
        link("/projects", "previous projects"),
        text(" to get an impression of our work.")
      ]),

      // Section: FAQs
      heading("h2", "Frequently Asked Questions"),

      heading("h3", "How much does a simple 5-page business website cost in Vienna?"),
      paragraph("A professional website with Home, About Us, Services, References and Contact costs between €3,500 and €6,500 at an agency like GoldenWing. Included: concept, individual design, responsive implementation, basic SEO, CMS setup and training."),

      heading("h3", "Why is a €50 WordPress theme not a good idea for businesses?"),
      paragraph("Ready-made themes are generic, used by thousands of websites and offer no differentiation. They're also often poorly optimized, leading to slow load times. Fine for personal blogs – not recommended for businesses wanting to acquire customers."),

      heading("h3", "How long does it take to create a professional website?"),
      paragraph("Plan for 4-8 weeks for a typical business website. A one-pager can be ready in 1-2 weeks, complex online shops take 3-6 months. The timeline depends heavily on how quickly you provide feedback and deliver content."),

      heading("h3", "Does a website builder like Wix or Squarespace make sense for SMEs?"),
      paragraph("For absolute beginners with minimal budget: Yes, as a transitional solution. Long-term, however, website builders are very limiting: No ownership of code, limited SEO capabilities, poor performance, dependency on the provider. As soon as you want to grow, you'll hit limitations."),

      heading("h3", "How much does a bilingual website (German/English) cost?"),
      paragraph("Plan for a 30-50% surcharge compared to the single-language version. For a €5,000 website, that would be €6,500-€7,500. The additional costs come from: Plugin/system setup, translation of all texts, SEO for both languages, testing."),

      heading("h3", "Do I need a maintenance contract?"),
      paragraph("Strongly recommended. Websites without regular updates become a security risk. A maintenance contract (€50-€200/month) includes: Software updates, security backups, performance monitoring and minor support. The alternative – a hack – quickly costs several thousand euros."),

      heading("h3", "What's the difference between web design and web development?"),
      paragraph([
        text("Web design", 1),
        text(" refers to the visual appearance: layout, colors, typography, user interface. "),
        text("Web development", 1),
        text(" is the technical implementation: programming, CMS integration, databases, interfaces. At GoldenWing you get both from one source.")
      ])
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1
  }
};

// Main function
async function updatePost1EN() {
  const dbPath = process.argv[2] || './goldenwing.db';

  console.log('🚀 Updating Post 1 Content (EN)...');
  console.log('Database:', dbPath);

  try {
    const db = new Database(dbPath);

    // Convert to JSON string
    const contentJson = JSON.stringify(post1ContentEN);

    // Update the database
    const stmt = db.prepare(`
      UPDATE posts_locales
      SET content = ?
      WHERE _parent_id = 1 AND _locale = 'en'
    `);

    const result = stmt.run(contentJson);

    console.log('✅ Updated rows:', result.changes);

    // Verify
    const verify = db.prepare(`
      SELECT length(content) as len
      FROM posts_locales
      WHERE _parent_id = 1 AND _locale = 'en'
    `).get();

    console.log('📊 New content length:', verify.len, 'characters');

    db.close();
    console.log('✅ Post 1 EN content updated successfully!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updatePost1EN();
