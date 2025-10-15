# SEO & Redirects Management

## Overview

The blog implements comprehensive SEO optimization and redirect management to maintain search rankings and user experience.

## Redirect System

### Netlify Redirects

Located in `public/_redirects`

#### Domain Migration

```
https://elegant-kilby-cf23ab.netlify.com/* https://blog.webdevsimplified.com/:splat 301!
```

- Handles old Netlify subdomain redirects to custom domain
- `301!` ensures forced redirect (bypasses Netlify's SPA handling)

#### Article URL Changes

```
/2020-02/tagged-template-literals /2020-03/tagged-template-literals 301!
/2020-07/use-reducer /2020-07/relative-time-format 301!
/2021-01/css-tranform/ /2021-01/css-transform/ 301!
/2022-11/css-range-media-queries /2022-12/css-range-media-queries 301!
```

#### Redirect Patterns

- **Date Changes**: When articles are moved to different months
- **Typo Fixes**: Correcting misspellings in URLs (`tranform` → `transform`)
- **Content Merging**: When articles are combined or replaced
- **Trailing Slashes**: Consistent URL structure

### SEO Best Practices

#### Meta Tags Implementation

Located in `src/components/BaseHead.astro`

##### Primary Meta Tags

```html
<title>{title}</title>
<meta name="title" content="{title}" />
<meta name="description" content="{description}" />
```

##### Open Graph Tags

```html
<meta property="og:type" content="website" />
<meta property="og:url" content="{permalink}" />
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{description}" />
```

##### Twitter Cards

```html
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="{permalink}" />
<meta property="twitter:title" content="{title}" />
<meta property="twitter:description" content="{description}" />
```

## Sitemap Generation

### Automatic Sitemap

Configured in `astro.config.mjs`:

```javascript
import sitemap from "@astrojs/sitemap"

export default defineConfig({
  site: "https://blog.webdevsimplified.com",
  integrations: [sitemap()],
})
```

#### Features

- Automatically includes all pages
- Updates with each build
- Proper canonical URLs
- Search engine discovery

## URL Structure

### Article URL Pattern

```
https://blog.webdevsimplified.com/YYYY-MM/article-slug/
```

#### SEO Benefits

- **Date in URL**: Clear content freshness indicator
- **Descriptive Slugs**: Keywords in URL path
- **Consistent Structure**: Predictable URL patterns
- **Trailing Slashes**: Consistent for canonical URLs

### Canonical URLs

All pages include canonical URL tags:

```html
<link rel="canonical" href="https://blog.webdevsimplified.com/article-url/" />
```

## Content SEO

### Heading Structure

Proper semantic heading hierarchy:

```html
<h1>Article Title</h1>
<!-- One per page -->
<h2>Main Sections</h2>
<!-- Primary sections -->
<h3>Subsections</h3>
<!-- Secondary sections -->
<h4>Details</h4>
<!-- Tertiary sections -->
```

### Image SEO

- **Alt Text**: Required for all images
- **Descriptive Filenames**: Meaningful image names
- **Responsive Images**: Multiple sizes for performance
- **Modern Formats**: WebP/AVIF with fallbacks

### Code Block SEO

````markdown
```language {highlighting}
// Descriptive comments for better understanding
```
````

## Performance SEO

### Core Web Vitals

- **LCP**: Optimized with static generation
- **FID**: Minimal JavaScript for fast interaction
- **CLS**: Stable layouts with proper sizing

### Technical SEO

- **HTTPS**: SSL/TLS encryption
- **Mobile-First**: Responsive design
- **Fast Loading**: Static site generation
- **Clean URLs**: No query parameters in main URLs

## Analytics for SEO

### Search Console Integration

Track SEO performance:

- Search impressions
- Click-through rates
- Keyword rankings
- Page indexing status

### Plausible Analytics SEO Data

- **Referral Sources**: Track search engine traffic
- **Popular Pages**: Identify high-performing content
- **Search Keywords**: Understand user intent

## Redirect Management

### Adding New Redirects

Edit `public/_redirects`:

```
# Format: old-path new-path status-code
/old-article-url /new-article-url 301!
```

#### Status Codes

- **301**: Permanent redirect (transfers SEO value)
- **302**: Temporary redirect (preserves original SEO)
- **301!**: Forced permanent redirect (recommended)

### Testing Redirects

```bash
# Test redirect locally
curl -I http://localhost:4321/old-url

# Check redirect in production
curl -I https://blog.webdevsimplified.com/old-url
```

## Schema Markup

### Article Schema

Future enhancement for rich snippets:

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Article Title",
    "author": {
      "@type": "Person",
      "name": "Kyle Cook"
    },
    "datePublished": "2025-01-13",
    "dateModified": "2025-01-13",
    "description": "Article description",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://blog.webdevsimplified.com/article-url/"
    }
  }
</script>
```

## SEO Monitoring

### Key Metrics to Track

1. **Organic Traffic**: Search engine visitors
2. **Keyword Rankings**: Target keyword positions
3. **Page Speed**: Core Web Vitals scores
4. **Indexing Status**: Pages discovered by search engines
5. **Backlinks**: External sites linking to content

### Tools for Monitoring

- Google Search Console
- Google PageSpeed Insights
- Lighthouse CI
- Third-party SEO tools

## Common SEO Issues

### Redirect Loops

Avoid circular redirects:

```
# Bad: Creates loop
/a /b 301!
/b /a 301!

# Good: Direct redirect
/old-url /new-url 301!
```

### Missing Meta Descriptions

Ensure all articles have descriptions:

```yaml
description: "Required meta description for SEO"
```

### Duplicate Content

- Use canonical URLs
- Avoid identical content across pages
- Implement proper redirects for moved content

### Broken Internal Links

- Update links when URLs change
- Use relative links where possible
- Test links during content review
