# Content Management

## Article Organization

Articles are organized chronologically by month, following a clear structure that enables:

- **Easy Navigation**: Clear date-based structure
- **Asset Management**: Corresponding asset directories
- **Archive Browsing**: Natural chronological ordering

### Directory Structure

```
src/pages/
├── YYYY-MM/                     # Year-Month organization
│   ├── article-slug-one/
│   │   └── index.mdx
│   ├── article-slug-two/
│   │   └── index.mdx
│   └── ...
└── index.astro                  # Homepage with article listing
```

### Asset Organization

```
public/articleAssets/
├── YYYY-MM/                     # Matches article date structure
│   ├── article-slug-one/
│   │   ├── feature-image.png
│   │   ├── demo-screenshot.jpg
│   │   └── ...
│   └── article-slug-two/
│       └── ...
```

## Tag System

Tags enable content discovery and filtering throughout the blog.

### Tag Categories

#### Programming Languages

- "JavaScript"
- "TypeScript"
- "CSS"
- "HTML"
- "Python"

#### Frameworks and Libraries

- "React"
- "Next.js"
- "Astro"
- "Vue"
- "Node.js"

#### Concepts and Topics

- "Technical Discussion"
- "Performance"
- "Accessibility"
- "Security"
- "Testing"
- "Debugging"

#### Tools and Environments

- "Git"
- "VS Code"
- "Browser APIs"
- "DevTools"

### Tag Best Practices

#### Selection Guidelines

- Use 2-4 tags per article
- Prefer existing tags over creating new ones
- Use specific tags when possible ("CSS Grid" vs "CSS")
- Include one broad category tag ("JavaScript", "CSS")

#### Tag Consistency

```yaml
# Good: Consistent, specific tags
tags: ["JavaScript", "React", "Performance", "Debugging"]

# Avoid: Too many or inconsistent tags
tags: ["js", "javascript", "JavaScript", "react", "React", "performance", "perf"]
```

## Search and Filtering System

The homepage provides comprehensive search and filtering capabilities.

### Search Functionality

Located in `src/components/BlogList.jsx`:

```jsx
const filteredPosts = allPosts.filter(post => {
  return (
    (post.title.toLowerCase().includes(searchQuery) ||
      post.description.toLowerCase().includes(searchQuery)) &&
    (selectedTags.length === 0 ||
      post.tags.some(tag => selectedTags.includes(tag)))
  )
})
```

### Search Features

- **Text Search**: Searches both titles and descriptions
- **Tag Filtering**: Filter by one or multiple tags
- **Combined Filtering**: Search text + tag filtering works together
- **Real-time Results**: Instant filtering without page reload
- **Case Insensitive**: Search is not case-sensitive

### Tag Filtering

- **Multiple Selection**: Users can select multiple tags
- **Tag Counts**: Shows number of articles per tag
- **Tag Sorting**: Tags sorted by frequency (most used first)
- **Visual Feedback**: Selected tags are visually highlighted

## RSS Feed Generation

Automatic RSS feed generation for content syndication.

### RSS Configuration

Located in `src/pages/rss.xml.js`:

```javascript
export function get(context) {
  let allMarkdownPosts = Object.values(
    import.meta.glob("./**/*.mdx", { eager: true }),
  )

  const allPosts = allMarkdownPosts.sort(
    (a, b) => b.frontmatter.date.valueOf() - a.frontmatter.date.valueOf(),
  )

  return rss({
    title: "Web Dev Simplified Blog",
    description: "Web Dev Simplified Blog",
    site: context.site,
    items: allPosts.map(item => ({
      title: item.frontmatter.title,
      description: item.frontmatter.description,
      link: item.url,
      pubDate: item.frontmatter.date,
    })),
  })
}
```

### RSS Features

- **All Articles**: Includes all published articles
- **Proper Dates**: Uses article publication dates
- **Descriptions**: Includes article descriptions
- **Full Links**: Direct links to full articles
- **Automatic Updates**: Updates with each build

## Content Workflow

### Article Lifecycle

#### 1. Creation

```bash
# Create article structure
mkdir -p src/pages/YYYY-MM/article-slug
touch src/pages/YYYY-MM/article-slug/index.mdx

# Create asset directory
mkdir -p public/articleAssets/YYYY-MM/article-slug
```

#### 2. Writing

- Add frontmatter with proper date (Monday)
- Write content following style guide
- Add interactive components as needed
- Include images and assets

#### 3. Review

- Check Monday date requirement
- Verify tag consistency
- Test interactive components
- Proofread content

#### 4. Publication

- Commit to Git repository
- Automatic build and deployment via Netlify
- RSS feed automatically updates

### Content Updates

#### Updating Existing Articles

```yaml
---
title: "Original Title"
date: "2024-01-15" # Original publication date
updatedDate: "2024-06-15" # Add when updating
tags: ["JavaScript"]
---
```

#### Update Display

The blog layout shows both original and updated dates:

- Original date shown with strikethrough when updated
- Updated date prominently displayed
- Both dates preserved for transparency

## Content Quality Guidelines

### Writing Standards

- **Clear Explanations**: Complex concepts broken down step-by-step
- **Code Examples**: Working, tested code examples
- **Interactive Demos**: Live examples where helpful
- **Consistent Voice**: Maintain friendly, educational tone

### Technical Standards

- **Accuracy**: All code and explanations must be accurate
- **Completeness**: Examples should be complete and runnable
- **Best Practices**: Follow current web development best practices
- **Accessibility**: Consider accessibility in all examples

### SEO Optimization

- **Descriptive Titles**: Clear, searchable titles
- **Meta Descriptions**: Informative descriptions under 160 characters
- **Semantic HTML**: Proper heading hierarchy and structure
- **Image Alt Text**: Descriptive alt text for all images

## Content Analytics

### Article Performance Tracking

Using Plausible Analytics:

- **Page Views**: Track individual article popularity
- **Reading Time**: Monitor engagement depth
- **Source Tracking**: Understand traffic sources
- **Goal Tracking**: Monitor newsletter signups and shares

### Content Insights

- **Popular Topics**: Identify most-read content categories
- **Tag Performance**: See which tags drive most engagement
- **Search Queries**: Understand what users search for
- **Bounce Rate**: Monitor content quality through engagement

## Content Maintenance

### Regular Tasks

#### Monthly Review

- Check for outdated information
- Update dependencies in code examples
- Verify all links still work
- Review and update tags if needed

#### Annual Review

- Major content updates for popular articles
- Archive or redirect very old content
- Update copyright and legal information
- Review and update style guide

### Content Archival

- Keep all content in Git history
- Mark deprecated articles clearly
- Provide migration paths for outdated techniques
- Maintain redirects for moved content

## Content Distribution

### Social Media Integration

- **Share Buttons**: Built-in sharing for Twitter, Facebook, LinkedIn
- **Open Graph**: Proper meta tags for social media previews
- **Twitter Cards**: Optimized Twitter preview cards

### Newsletter Integration

- **ConvertKit Forms**: Newsletter signup forms in articles
- **Article Promotion**: New articles promoted via newsletter
- **Content Curation**: Best content highlighted in newsletters

### Community Engagement

- **Comments**: Consider adding comment system
- **Feedback**: Collect reader feedback on articles
- **Suggestions**: Track content requests and suggestions
