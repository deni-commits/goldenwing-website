#!/usr/bin/env node
/**
 * Add English blog post translations with proper Lexical JSON content
 */

const { execSync } = require('child_process')
const path = require('path')

const dbPath = path.join(__dirname, '..', 'goldenwing.db')

function escapeSQL(str) {
  if (!str) return ''
  return str.replace(/'/g, "''")
}

function createLexicalContent(heading, paragraphs) {
  const children = [
    {
      type: "heading",
      tag: "h2",
      children: [
        {
          type: "text",
          text: heading,
          format: 0,
          mode: "normal",
          style: "",
          detail: 0,
          version: 1
        }
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1
    }
  ]

  for (const para of paragraphs) {
    children.push({
      type: "paragraph",
      children: [
        {
          type: "text",
          text: para,
          format: 0,
          mode: "normal",
          style: "",
          detail: 0,
          version: 1
        }
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1
    })
  }

  return JSON.stringify({
    root: {
      type: "root",
      children: children,
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1
    }
  })
}

const posts = [
  {
    parentId: 1,
    title: 'How Much Does a Professional Website Cost in 2025?',
    excerpt: 'Transparent pricing overview for websites in Austria: From simple business pages to complex web shops. Learn which factors influence the price.',
    content: createLexicalContent(
      'What Does a Professional Website Cost?',
      [
        'The cost of a professional website varies significantly – from €3,000 for a simple business site to €50,000+ for complex web applications. In this article, we explain the key pricing factors.',
        'Understanding website costs is essential for planning your digital presence. Multiple factors influence the final price, including design complexity, functionality requirements, content management systems, and ongoing maintenance needs.',
        'A simple business website typically costs between €3,000 and €8,000. This includes a modern design, basic SEO optimization, and mobile responsiveness.',
        'E-commerce websites and web applications require more investment, starting at €15,000 and going up depending on the complexity of features like payment processing, inventory management, and custom functionality.'
      ]
    )
  },
  {
    parentId: 2,
    title: 'WordPress or Webflow: Which CMS is Better?',
    excerpt: 'The ultimate comparison: WordPress vs. Webflow in 2025. We analyze costs, flexibility, SEO, and user-friendliness for your decision.',
    content: createLexicalContent(
      'WordPress vs. Webflow: The Complete Comparison',
      [
        'Choosing the right content management system is a crucial decision for your website. Both WordPress and Webflow have their strengths and are suitable for different use cases.',
        'WordPress powers over 40% of all websites worldwide. Its main advantages are the extensive plugin ecosystem, flexibility, and large community. However, it requires regular updates and security maintenance.',
        'Webflow is a modern visual development platform that combines design and development in one tool. It excels in design flexibility and requires less maintenance than WordPress.',
        'For most business websites, we recommend evaluating your specific needs: WordPress is ideal for content-heavy sites and blogs, while Webflow shines for design-focused marketing sites.'
      ]
    )
  },
  {
    parentId: 3,
    title: 'Core Web Vitals Optimization: The Complete Guide 2025',
    excerpt: 'Everything about LCP, FID and CLS: How to optimize your website for Google\'s Core Web Vitals and achieve better rankings.',
    content: createLexicalContent(
      'Understanding and Optimizing Core Web Vitals',
      [
        'Core Web Vitals are essential ranking factors that Google uses to evaluate user experience. The three main metrics are Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS).',
        'LCP measures loading performance. A good LCP score is under 2.5 seconds. Optimize images, implement lazy loading, and use a CDN to improve this metric.',
        'FID measures interactivity. Users expect your site to respond to their inputs within 100 milliseconds. Minimize JavaScript execution time and break up long tasks.',
        'CLS measures visual stability. Unexpected layout shifts frustrate users. Always specify image dimensions and avoid inserting content above existing content.'
      ]
    )
  },
  {
    parentId: 4,
    title: 'Developing Brand Identity: The Complete Guide',
    excerpt: 'From brand strategy to finished brand book: How to develop a unique brand identity that excites your target audience.',
    content: createLexicalContent(
      'Building a Strong Brand Identity',
      [
        'A strong brand identity is the foundation of successful marketing. It encompasses everything from your visual appearance to your communication style and values.',
        'Start with brand strategy: Define your mission, vision, values, and target audience. Understanding who you are and who you serve is essential before designing any visual elements.',
        'Visual identity includes your logo, color palette, typography, and imagery style. These elements should work together cohesively across all touchpoints.',
        'Document everything in a brand book. This ensures consistency as your team and business grow, making it easier to maintain brand integrity across all communications.'
      ]
    )
  },
  {
    parentId: 5,
    title: 'SEO for Beginners: The Ultimate Starter Guide 2025',
    excerpt: 'Search engine optimization explained simply: From keywords to backlinks – everything you need to know for better Google rankings.',
    content: createLexicalContent(
      'Getting Started with SEO',
      [
        'Search engine optimization helps your website appear in search results when people look for your products or services. This guide covers the fundamentals you need to know.',
        'Keyword research is the foundation of SEO. Use tools like Google Keyword Planner to find terms your audience searches for, then create content that addresses those queries.',
        'On-page SEO includes optimizing your titles, meta descriptions, headings, and content. Make sure each page focuses on a specific topic and includes relevant keywords naturally.',
        'Technical SEO ensures search engines can crawl and index your site effectively. This includes site speed, mobile-friendliness, and proper URL structure.'
      ]
    )
  },
  {
    parentId: 6,
    title: 'Customer Journey Mapping: Understanding Your Customers',
    excerpt: 'Learn how to create a customer journey map and improve your customers\' experience at every touchpoint.',
    content: createLexicalContent(
      'Creating Effective Customer Journey Maps',
      [
        'Customer journey mapping visualizes the complete experience a customer has with your brand, from first awareness to purchase and beyond.',
        'Start by identifying your customer personas. Who are your ideal customers? What are their goals, pain points, and behaviors? This forms the foundation of your journey map.',
        'Map out all touchpoints where customers interact with your brand: website visits, social media, emails, customer service calls, and physical locations if applicable.',
        'Analyze each touchpoint for opportunities to improve. Where do customers get frustrated? Where do they drop off? These insights drive meaningful improvements in customer experience.'
      ]
    )
  },
  {
    parentId: 7,
    title: 'Image Optimization for Web: The Complete Guide',
    excerpt: 'WebP, Lazy Loading, Compression: Everything you need to know about image optimization for fast websites.',
    content: createLexicalContent(
      'Optimizing Images for Better Web Performance',
      [
        'Images typically account for the largest portion of a webpage\'s file size. Proper optimization can dramatically improve loading times without sacrificing visual quality.',
        'Modern image formats like WebP offer superior compression compared to JPEG and PNG. WebP images are typically 25-35% smaller while maintaining equivalent quality.',
        'Lazy loading defers loading of off-screen images until users scroll to them. This significantly improves initial page load time and saves bandwidth for users who don\'t scroll through entire pages.',
        'Always specify width and height attributes for images to prevent layout shifts as they load. Use responsive images with srcset to serve appropriately sized images for different devices.'
      ]
    )
  }
]

console.log('📝 Adding English blog posts with Lexical content...\n')

for (const post of posts) {
  const sql = `INSERT OR IGNORE INTO posts_locales (title, excerpt, content, _locale, _parent_id)
               VALUES ('${escapeSQL(post.title)}', '${escapeSQL(post.excerpt)}', '${escapeSQL(post.content)}', 'en', ${post.parentId});`

  try {
    execSync(`sqlite3 "${dbPath}" "${sql.replace(/"/g, '\\"')}"`, { encoding: 'utf8' })
    console.log(`✓ Added: ${post.title}`)
  } catch (error) {
    console.error(`✗ Error adding ${post.title}:`, error.message)
  }
}

console.log('\n✅ Done!')
