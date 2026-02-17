import { getPayload } from 'payload'
import config from '@payload-config'

// Helper function to convert markdown to Lexical format
function markdownToLexical(markdown: string) {
  const lines = markdown.trim().split('\n')
  const children: unknown[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.trim() === '') {
      i++
      continue
    }

    if (line.startsWith('### ')) {
      children.push({
        type: 'heading',
        tag: 'h3',
        children: [{ type: 'text', text: line.slice(4).trim(), format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })
      i++
      continue
    }

    if (line.startsWith('## ')) {
      children.push({
        type: 'heading',
        tag: 'h2',
        children: [{ type: 'text', text: line.slice(3).trim(), format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })
      i++
      continue
    }

    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const listItems: unknown[] = []
      while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
        const itemText = lines[i].trim().slice(2)
        listItems.push({
          type: 'listitem',
          children: [{ type: 'text', text: itemText, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
          direction: 'ltr',
          format: '',
          indent: 0,
          value: listItems.length + 1,
          version: 1,
        })
        i++
      }
      children.push({
        type: 'list',
        listType: 'bullet',
        children: listItems,
        direction: 'ltr',
        format: '',
        indent: 0,
        start: 1,
        tag: 'ul',
        version: 1,
      })
      continue
    }

    if (/^\d+\.\s/.test(line.trim())) {
      const listItems: unknown[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        const itemText = lines[i].trim().replace(/^\d+\.\s/, '')
        listItems.push({
          type: 'listitem',
          children: [{ type: 'text', text: itemText, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
          direction: 'ltr',
          format: '',
          indent: 0,
          value: listItems.length + 1,
          version: 1,
        })
        i++
      }
      children.push({
        type: 'list',
        listType: 'number',
        children: listItems,
        direction: 'ltr',
        format: '',
        indent: 0,
        start: 1,
        tag: 'ol',
        version: 1,
      })
      continue
    }

    if (line.trim().startsWith('|')) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim())
        i++
      }
      if (tableLines.length >= 2) {
        const parseRow = (row: string): string[] => {
          return row.split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim())
        }
        const headers = parseRow(tableLines[0])
        const dataRows = tableLines.slice(2).map(parseRow)
        const headerText = headers.join(' | ')
        children.push({
          type: 'paragraph',
          children: [{ type: 'text', text: headerText, format: 1, mode: 'normal', style: '', detail: 0, version: 1 }],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          version: 1,
        })
        for (const row of dataRows) {
          children.push({
            type: 'paragraph',
            children: [{ type: 'text', text: row.join(' | '), format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          })
        }
      }
      continue
    }

    // Regular paragraph
    children.push({
      type: 'paragraph',
      children: [{ type: 'text', text: line.trim(), format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
      direction: 'ltr',
      format: '',
      indent: 0,
      textFormat: 0,
      version: 1,
    })
    i++
  }

  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

// English translations for new blog posts
const enTranslations = [
  {
    deSlug: 'wordpress-seo-guide',
    en: {
      title: 'WordPress SEO: The Complete Guide for Better Rankings [2025]',
      slug: 'wordpress-seo-guide',
      excerpt: 'WordPress SEO optimization made easy: Technical setup, on-page optimization, best plugins, and a complete checklist for better Google rankings in 2025.',
      seo: {
        metaTitle: 'WordPress SEO Guide 2025: Complete Tutorial | GoldenWing',
        metaDescription: 'WordPress SEO optimization: Technical setup, best plugins, on-page SEO, and checklist for better Google rankings.',
        keywords: 'wordpress seo, wordpress search engine optimization, wordpress seo plugins, rank math, yoast seo',
      },
      content: `## WordPress SEO: Why It Matters

WordPress powers over 40% of all websites worldwide. This widespread use means both great opportunities and intense competition. Without targeted SEO optimization, your WordPress site will be lost in the flood of content.

The good news: WordPress offers excellent SEO potential right out of the box. With the right settings, plugins, and strategies, you can achieve top rankings - even against larger competitors.

## Technical WordPress SEO

### Permalink Structure

The URL structure is crucial for SEO. WordPress offers various options.

Recommended setting: Post name (Settings > Permalinks)

- Bad: example.com/?p=123
- Good: example.com/wordpress-seo-guide

### XML Sitemap

An XML sitemap helps Google find and index all your pages. Most SEO plugins generate this automatically.

Important: Submit your sitemap in Google Search Console.

### SSL/HTTPS

HTTPS is a ranking factor. Most hosters offer free SSL certificates through Lets Encrypt.

### Optimize Page Speed

Fast loading times are crucial for SEO. Important measures:

1. Caching: Use plugins like WP Rocket or W3 Total Cache
2. Image optimization: Compress images with plugins like ShortPixel
3. Minimize CSS/JS: Combine and minify files
4. CDN: Distribute static content globally
5. Quality hosting: Invest in fast servers

## On-Page SEO for WordPress

### Title Tags and Meta Descriptions

Every page needs optimized meta tags:

Title Tag:
- Main keyword at the beginning
- Maximum 60 characters
- Unique for each page

Meta Description:
- Concise summary with CTA
- Maximum 155 characters
- Include keyword naturally

### Heading Structure

Use headings hierarchically:

- H1: Only once per page (title)
- H2: Main sections
- H3-H6: Subsections

### Image Optimization

Images offer additional SEO potential:

1. File names: Use descriptive names (wordpress-seo-guide.jpg)
2. Alt text: Describe image content and include keywords
3. File size: Compress without quality loss
4. Format: Use WebP for best compression

### Internal Linking

Internal links distribute PageRank and help users navigate:

- Link to relevant content
- Use descriptive anchor text
- Avoid click here links
- Create topic clusters

## Best WordPress SEO Plugins

### Rank Math vs Yoast SEO

| Feature | Rank Math | Yoast SEO |
|---------|-----------|-----------|
| Price (Pro) | 59 USD/year | 99 USD/year |
| Keyword analysis | Unlimited | 1 (free) / 5 (Pro) |
| Schema Markup | Comprehensive | Basic |
| 404 Monitor | Yes | No |
| Redirects | Yes | Premium only |

Our recommendation: Rank Math offers more features at a lower price.

## WordPress SEO Checklist

Use this checklist for every new post:

Before publishing:
- Keyword research completed
- Main keyword in title
- Meta description written
- URL optimized (short, with keyword)
- Heading structure correct (H1, H2, H3)
- Images optimized (alt text, compression)
- Internal links added

After publishing:
- Submitted to Search Console
- Shared on social media
- Monitor rankings

## Frequently Asked Questions

### How long until WordPress SEO shows results?

SEO is a long-term strategy. First results typically appear after 3-6 months. However, it can take 6-12 months for stable top rankings.

### Is WordPress good for SEO?

Yes, WordPress is excellent for SEO. The CMS is search engine friendly by default and offers through plugins like Rank Math almost unlimited optimization possibilities.

### Which SEO plugin is best for WordPress?

Rank Math is currently the best choice for most users. It offers more features than Yoast SEO at a lower price.

### Does WordPress speed affect SEO?

Absolutely. Page speed is an official Google ranking factor. Slow websites have higher bounce rates and worse rankings.

## Conclusion

WordPress SEO is no rocket science but requires systematic work. With the right technical foundation, optimized content, and a good plugin, you can beat even larger competitors.

Need professional WordPress SEO support? Our experts help you get your WordPress site to the top of search results.`,
    },
  },
  {
    deSlug: 'seo-kosten-guide',
    en: {
      title: 'What Does SEO Cost? Prices for Search Engine Optimization 2025',
      slug: 'seo-costs-guide',
      excerpt: 'Transparent SEO price overview: What does professional search engine optimization actually cost? Hourly rates, monthly fees, pricing models, and what affects costs.',
      seo: {
        metaTitle: 'SEO Costs 2025: What Does SEO Really Cost? | GoldenWing',
        metaDescription: 'Transparent SEO pricing: Hourly rates, monthly fees, pricing models explained. Learn what affects SEO costs.',
        keywords: 'seo costs, seo pricing, search engine optimization costs, seo agency prices, seo investment',
      },
      content: `## SEO Costs: A Transparent Overview

What does SEO cost? is one of the most common questions businesses ask us. The honest answer: It depends. But unlike many agencies, we want to give you concrete numbers.

In this guide, you will learn:
- Which SEO pricing models exist
- What influences costs
- Realistic price ranges by service
- Whether cheap SEO is worthwhile
- How to calculate SEO ROI

## SEO Pricing Models

### Hourly Rate

For smaller projects or consulting, SEO is often billed hourly.

Typical hourly rates:
- Junior SEO: 60-80 EUR/hour
- Senior SEO: 100-150 EUR/hour
- SEO agencies: 80-200 EUR/hour

Suitable for: One-time audits, consulting, workshops

### Monthly Retainer

The most common model for ongoing SEO work.

Typical monthly costs:
- Small businesses: 500-1,500 EUR/month
- Medium businesses: 1,500-5,000 EUR/month
- Large businesses: 5,000-20,000+ EUR/month

Includes typically: Technical SEO, content optimization, reporting, link building

### Project-Based

For defined projects with clear scope.

Examples:
- SEO Audit: 500-2,000 EUR
- Website Relaunch SEO: 2,000-10,000 EUR
- Content Strategy: 1,500-5,000 EUR

## What Influences SEO Costs?

### 1. Industry and Competition

Highly competitive industries (finance, insurance, legal) require more effort than niche markets. More competition = more investment needed.

### 2. Current Website Status

A technically clean website with existing content requires less work than a new or problematic site.

### 3. Goals and Scope

National visibility costs more than local SEO. More keywords = more effort.

### 4. In-house Resources

Can your team create content? Do you have a developer? Less agency work = lower costs.

## SEO Costs by Service Type

| Service | Price Range | Frequency |
|---------|-------------|-----------|
| SEO Audit | 500-2,000 EUR | One-time |
| Technical SEO | 1,000-5,000 EUR | One-time/Annual |
| On-Page Optimization | 100-500 EUR/page | Ongoing |
| Content Creation | 200-800 EUR/article | Ongoing |
| Link Building | 200-500 EUR/link | Ongoing |
| Monthly Support | 500-5,000 EUR | Monthly |
| Local SEO | 300-1,000 EUR | Monthly |

## Is Cheap SEO Worthwhile?

Be cautious with offers under 300 EUR/month. Quality SEO requires time and expertise.

Warning signs of poor SEO providers:
- Guaranteed #1 rankings
- Secret techniques
- Extremely low prices
- No transparency about methods
- No references

Risks of cheap SEO:
- Google penalties
- Spammy backlinks
- Duplicate content
- Wasted budget

## SEO ROI: Is the Investment Worth It?

SEO typically offers excellent long-term ROI. Example calculation:

Investment: 2,000 EUR/month for SEO

Results after 12 months:
- 5,000 additional monthly visitors
- 2% conversion rate = 100 leads
- 10% close rate = 10 new customers
- Average customer value: 1,000 EUR
- Monthly revenue: 10,000 EUR

ROI: 500% (10,000 EUR revenue / 2,000 EUR investment)

## GoldenWing SEO Packages

We offer transparent pricing for every budget:

Starter Package - 990 EUR/month
- Technical SEO optimization
- 2 content pieces monthly
- Monthly reporting
- Email support

Growth Package - 1,990 EUR/month
- Everything in Starter
- 4 content pieces monthly
- Link building (3 links/month)
- Competitor analysis

Enterprise Package - Custom pricing
- Full-service SEO
- Dedicated account manager
- Custom strategy
- Priority support

## Frequently Asked Questions

### What is the minimum SEO budget?

For meaningful results, plan at least 500-1,000 EUR/month. Below that, progress is too slow to compete effectively.

### How long until SEO pays off?

Typically 6-12 months for positive ROI. SEO is a long-term investment, not a quick fix.

### One-time or ongoing SEO?

Both have their place. A one-time audit identifies issues, but ongoing work maintains and improves rankings.

### Can I do SEO myself?

Basics yes, but professional SEO requires expertise, tools, and time. Most businesses see better results with expert help.

## Conclusion

SEO costs vary widely based on your needs, competition, and goals. Quality SEO is an investment that typically pays for itself many times over.

Important: Focus on value, not just price. Cheap SEO often costs more in the long run through wasted time and potential penalties.

Ready to discuss your SEO investment? Contact us for a free consultation and custom quote.`,
    },
  },
]

async function seedBlogEN() {
  console.log('Starting EN blog translations seed...')

  const payload = await getPayload({ config })

  for (const translation of enTranslations) {
    try {
      // Find the post by DE slug
      const existingPosts = await payload.find({
        collection: 'posts',
        where: {
          slug: { equals: translation.deSlug },
        },
        locale: 'de',
        limit: 1,
      })

      if (existingPosts.docs.length === 0) {
        console.log(`Post not found: ${translation.deSlug}`)
        continue
      }

      const post = existingPosts.docs[0]

      // Update the post with EN translation
      await payload.update({
        collection: 'posts',
        id: post.id,
        locale: 'en',
        data: {
          title: translation.en.title,
          slug: translation.en.slug,
          excerpt: translation.en.excerpt,
          content: markdownToLexical(translation.en.content),
          seo: translation.en.seo,
        },
      })

      console.log(`Added EN translation: ${translation.en.title}`)
    } catch (error) {
      console.error(`Error adding EN for ${translation.deSlug}:`, error)
    }
  }

  console.log('EN blog translations seed completed!')
  process.exit(0)
}

seedBlogEN()
