const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '..', 'goldenwing.db'));

// Helper to create Lexical JSON
function createLexicalContent(elements) {
  return JSON.stringify({
    root: {
      type: 'root',
      children: elements,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1
    }
  });
}

function h2(text) {
  return {
    type: 'heading',
    tag: 'h2',
    children: [{ type: 'text', text, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1
  };
}

function h3(text) {
  return {
    type: 'heading',
    tag: 'h3',
    children: [{ type: 'text', text, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1
  };
}

function p(text) {
  return {
    type: 'paragraph',
    children: [{ type: 'text', text, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
    version: 1
  };
}

function pBold(boldText, normalText = '') {
  const children = [{ type: 'text', text: boldText, format: 1, mode: 'normal', style: '', detail: 0, version: 1 }];
  if (normalText) {
    children.push({ type: 'text', text: normalText, format: 0, mode: 'normal', style: '', detail: 0, version: 1 });
  }
  return {
    type: 'paragraph',
    children,
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
    version: 1
  };
}

function ul(items) {
  return {
    type: 'list',
    listType: 'bullet',
    children: items.map((text, i) => ({
      type: 'listitem',
      children: [{ type: 'text', text, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
      direction: 'ltr',
      format: '',
      indent: 0,
      value: i + 1,
      version: 1
    })),
    direction: 'ltr',
    format: '',
    indent: 0,
    start: 1,
    tag: 'ul',
    version: 1
  };
}

// Post 1: Website Costs
const post1Content = createLexicalContent([
  h2('What Does a Professional Website Cost?'),
  p('The cost of a professional website varies significantly – from €3,000 for a simple business site to €50,000+ for complex web applications. In this article, we transparently explain all pricing factors.'),
  h3('Price Overview by Website Type'),
  p('[Table - see below]'),
  h3('Factors That Influence the Price'),
  pBold('1. Scope and Number of Pages'),
  p('Each additional page means more design and development effort. A 5-page website costs less than one with 20 pages.'),
  pBold('2. Design Complexity'),
  ul([
    'Template-based: cheaper, but less individual',
    'Custom Design: unique, but more elaborate',
    'Animations and interactions: increase the price'
  ]),
  pBold('3. Functions and Features'),
  ul([
    'Contact forms: €200-500',
    'Newsletter integration: €300-600',
    'Booking system: €1,000-3,000',
    'Multilingual: +30-50% surcharge'
  ]),
  pBold('4. CMS and Technology'),
  ul([
    'WordPress: proven, many plugins',
    'Webflow: visual editor, fast',
    'Headless CMS: flexible, future-proof'
  ]),
  h3('What\'s Included in the Price?'),
  p('At GoldenWing, the following are included as standard:'),
  ul([
    'Responsive Design (Desktop, Tablet, Mobile)',
    'Basic SEO optimization',
    'SSL certificate',
    'GDPR-compliant design',
    '30 days support after launch'
  ]),
  h3('Ongoing Costs'),
  p('In addition to development costs, there are monthly costs:'),
  ul([
    'Hosting: €20-100/month',
    'Domain: €10-20/year',
    'Maintenance & Updates: €50-200/month',
    'SSL certificate: often included in hosting'
  ]),
  h3('Our Advice'),
  p('Invest in quality. A cheap website for €500 will cost you more in the long run – through poor performance, security problems, and lost customers.'),
  pBold('Next step:', ' Contact us for a free initial consultation and an individual offer.')
]);

// Post 2: WordPress vs Webflow
const post2Content = createLexicalContent([
  h2('WordPress vs. Webflow: The Ultimate CMS Comparison'),
  p('Choosing the right content management system is crucial for your online success. In this comprehensive comparison, we analyze WordPress and Webflow across all important criteria.'),
  h3('Overview: WordPress'),
  p('WordPress powers over 40% of all websites worldwide. It\'s an open-source CMS with a massive ecosystem of themes and plugins.'),
  ul([
    'Market share: 43% of all websites',
    'Initial release: 2003',
    'Type: Open Source CMS',
    'Hosting: Self-hosted or managed'
  ]),
  h3('Overview: Webflow'),
  p('Webflow is a modern, visual web design platform that combines design freedom with built-in hosting.'),
  ul([
    'Founded: 2013',
    'Type: SaaS Platform',
    'Hosting: Included (AWS infrastructure)',
    'Target group: Designers and agencies'
  ]),
  h3('Comparison Criteria'),
  pBold('1. Ease of Use'),
  p('WordPress: Requires learning curve, but intuitive for content editing. Many tutorials available.'),
  p('Webflow: Steeper initial learning curve, but powerful visual editor. Ideal for designers.'),
  pBold('2. Design Flexibility'),
  p('WordPress: Dependent on themes. Custom designs require development knowledge or premium themes.'),
  p('Webflow: Complete design freedom. Every element can be styled visually without code.'),
  pBold('3. Performance'),
  p('WordPress: Varies greatly. Depends on theme, plugins, and hosting. Can be very fast with optimization.'),
  p('Webflow: Generally excellent. Clean code output and fast CDN hosting included.'),
  pBold('4. SEO Capabilities'),
  p('WordPress: Excellent with plugins like Yoast SEO or RankMath. Full control over all SEO aspects.'),
  p('Webflow: Good built-in SEO features. All essential options available without plugins.'),
  pBold('5. Costs'),
  p('WordPress: CMS free. Costs for hosting (€5-50/month), themes (€0-200), plugins (€0-500/year).'),
  p('Webflow: Plans from $14-39/month for sites. E-commerce from $29-212/month.'),
  h3('When to Choose WordPress'),
  ul([
    'You need extensive e-commerce features (WooCommerce)',
    'You require complex membership systems',
    'Budget is very limited',
    'You need specific plugins that only exist for WordPress',
    'You want full ownership and control of your data'
  ]),
  h3('When to Choose Webflow'),
  ul([
    'Design quality is your top priority',
    'You want pixel-perfect control without coding',
    'Fast performance is crucial',
    'You prefer an all-in-one solution',
    'You\'re a designer or work closely with one'
  ]),
  h3('Our Recommendation'),
  p('There\'s no universally "better" CMS. The right choice depends on your specific requirements, budget, and technical capabilities. At GoldenWing, we work with both systems and help you find the perfect solution for your project.'),
  pBold('Need help deciding?', ' Contact us for a free consultation.')
]);

// Post 4: Brand Identity
const post4Content = createLexicalContent([
  h2('Developing Brand Identity: The Complete Guide'),
  p('A strong brand identity is the foundation of every successful company. In this guide, we show you step by step how to develop a unique brand identity that excites your target audience.'),
  h3('What is Brand Identity?'),
  p('Brand identity encompasses all visual and communicative elements that make your brand unique and recognizable. It\'s the DNA of your company – the way you present yourself to the world.'),
  h3('The Core Elements'),
  pBold('1. Brand Strategy'),
  p('Before any visual design, you need a clear strategy. This includes:'),
  ul([
    'Vision: Where do you want to go?',
    'Mission: Why do you exist?',
    'Values: What do you stand for?',
    'Positioning: How do you differentiate yourself?',
    'Target audience: Who are you speaking to?'
  ]),
  pBold('2. Brand Name'),
  p('A good brand name is:'),
  ul([
    'Memorable and easy to pronounce',
    'Unique and distinguishable',
    'Relevant to your industry',
    'Available as a domain and trademark'
  ]),
  pBold('3. Logo Design'),
  p('Your logo is the visual anchor of your brand. It should be:'),
  ul([
    'Simple and recognizable',
    'Scalable (works in all sizes)',
    'Timeless (avoids trends)',
    'Versatile (works in different contexts)'
  ]),
  pBold('4. Color Palette'),
  p('Colors evoke emotions and create recognition. Define:'),
  ul([
    'Primary colors (1-2 main colors)',
    'Secondary colors (supporting colors)',
    'Neutral colors (for backgrounds and text)',
    'Color meanings and psychology'
  ]),
  pBold('5. Typography'),
  p('Fonts communicate personality:'),
  ul([
    'Headline font (for impact)',
    'Body font (for readability)',
    'Font hierarchy (sizes and weights)',
    'Web-safe alternatives'
  ]),
  pBold('6. Visual Language'),
  p('Beyond logo and colors, define:'),
  ul([
    'Photography style',
    'Illustration style',
    'Iconography',
    'Graphic elements and patterns'
  ]),
  pBold('7. Brand Voice'),
  p('How your brand communicates:'),
  ul([
    'Tone of voice (formal, friendly, playful, etc.)',
    'Key messages',
    'Vocabulary do\'s and don\'ts',
    'Communication guidelines'
  ]),
  h3('The Brand Book'),
  p('Document everything in a brand book (style guide). This ensures consistency across all touchpoints and makes onboarding new team members or agencies easier.'),
  h3('Common Mistakes to Avoid'),
  ul([
    'Copying competitors instead of differentiating',
    'Following trends instead of building timeless identity',
    'Inconsistent application across channels',
    'Skipping the strategy phase',
    'Not involving stakeholders in the process'
  ]),
  h3('Our Process'),
  p('At GoldenWing, we follow a proven process for brand development:'),
  ul([
    'Discovery: Understanding your business, goals, and audience',
    'Strategy: Defining positioning and brand architecture',
    'Design: Creating visual identity elements',
    'Application: Implementing across all touchpoints',
    'Guidelines: Documenting everything in a brand book'
  ]),
  pBold('Ready to build your brand?', ' Contact us for a free initial consultation.')
]);

// Post 6: Customer Journey Mapping
const post6Content = createLexicalContent([
  h2('Customer Journey Mapping: Understanding Your Customers'),
  p('Customer Journey Mapping is one of the most powerful tools for improving customer experience. Learn how to create effective journey maps and optimize every touchpoint.'),
  h3('What is a Customer Journey Map?'),
  p('A Customer Journey Map is a visual representation of every interaction a customer has with your brand – from first awareness to purchase and beyond. It helps you see your business through your customers\' eyes.'),
  h3('Why Customer Journey Mapping Matters'),
  ul([
    'Identifies pain points and friction in the customer experience',
    'Reveals opportunities for improvement and innovation',
    'Aligns teams around customer needs',
    'Improves customer satisfaction and loyalty',
    'Increases conversion rates and revenue'
  ]),
  h3('The 5 Stages of a Customer Journey'),
  pBold('1. Awareness'),
  p('The customer becomes aware of a problem or need and discovers your brand. Touchpoints include:'),
  ul([
    'Social media posts',
    'Search engine results',
    'Word of mouth',
    'Advertising',
    'Content marketing'
  ]),
  pBold('2. Consideration'),
  p('The customer researches solutions and evaluates options. Key touchpoints:'),
  ul([
    'Website visit',
    'Product pages',
    'Reviews and testimonials',
    'Comparison content',
    'Email nurturing'
  ]),
  pBold('3. Decision'),
  p('The customer decides to purchase. Critical touchpoints:'),
  ul([
    'Pricing page',
    'Checkout process',
    'Sales conversations',
    'Free trials or demos',
    'Guarantee and return policy'
  ]),
  pBold('4. Retention'),
  p('Keeping the customer engaged after purchase:'),
  ul([
    'Onboarding experience',
    'Customer support',
    'Product updates',
    'Loyalty programs',
    'Regular communication'
  ]),
  pBold('5. Advocacy'),
  p('Turning customers into brand advocates:'),
  ul([
    'Referral programs',
    'Review requests',
    'User-generated content',
    'Community building',
    'Case studies'
  ]),
  h3('How to Create a Customer Journey Map'),
  pBold('Step 1: Define Your Buyer Personas'),
  p('Create detailed profiles of your ideal customers including demographics, goals, challenges, and behaviors.'),
  pBold('Step 2: List All Touchpoints'),
  p('Identify every interaction point: website, social media, email, phone, in-person, etc.'),
  pBold('Step 3: Map Customer Actions'),
  p('Document what customers do at each stage: what they search, click, read, and ask.'),
  pBold('Step 4: Identify Emotions'),
  p('Add how customers feel at each touchpoint: frustrated, confident, confused, delighted.'),
  pBold('Step 5: Find Pain Points'),
  p('Highlight where customers struggle or drop off in the journey.'),
  pBold('Step 6: Discover Opportunities'),
  p('Identify ways to improve the experience at each pain point.'),
  h3('Tools for Journey Mapping'),
  ul([
    'Miro or Figma for visual mapping',
    'Google Analytics for behavior data',
    'Hotjar for user recordings',
    'Customer surveys for feedback',
    'CRM data for touchpoint analysis'
  ]),
  h3('Best Practices'),
  ul([
    'Base maps on real customer data, not assumptions',
    'Include multiple personas for different segments',
    'Update maps regularly as your business evolves',
    'Involve cross-functional teams in the process',
    'Focus on emotions, not just actions'
  ]),
  pBold('Need help mapping your customer journey?', ' Contact us for a free consultation.')
]);

// Update function
function updatePost(postId, content, seoTitle, seoDesc, seoKeywords) {
  const stmt = db.prepare(`
    UPDATE posts_locales
    SET content = ?,
        seo_meta_title = ?,
        seo_meta_description = ?,
        seo_keywords = ?
    WHERE _parent_id = ? AND _locale = 'en'
  `);

  stmt.run(content, seoTitle, seoDesc, seoKeywords, postId);
  console.log(`✅ Updated Post ${postId}`);
}

// Run updates
console.log('Starting blog translation updates...\n');

updatePost(1, post1Content,
  'Website Costs 2025: Complete Pricing Guide | GoldenWing',
  'How much does a professional website cost in 2025? From €3,000 for business sites to €50,000+ for web apps. All pricing factors explained.',
  'website cost, web design prices, website pricing, how much does a website cost'
);

updatePost(2, post2Content,
  'WordPress vs Webflow 2025: Which CMS is Better? | GoldenWing',
  'The ultimate WordPress vs Webflow comparison. We analyze costs, flexibility, SEO, and user-friendliness to help you choose the right CMS.',
  'wordpress vs webflow, cms comparison, best cms 2025, webflow or wordpress'
);

updatePost(4, post4Content,
  'Brand Identity Development: The Complete Guide | GoldenWing',
  'Learn how to develop a unique brand identity from strategy to brand book. Step-by-step guide with practical tips for building your brand.',
  'brand identity, branding guide, brand development, visual identity, brand strategy'
);

updatePost(6, post6Content,
  'Customer Journey Mapping: Complete Guide 2025 | GoldenWing',
  'Learn how to create effective customer journey maps. Improve customer experience at every touchpoint with our step-by-step guide.',
  'customer journey mapping, customer journey, touchpoint analysis, customer experience'
);

console.log('\n✅ All posts updated successfully!');
db.close();
