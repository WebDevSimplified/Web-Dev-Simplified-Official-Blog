# Article Creation Guide

## Directory Structure for New Articles

Articles must follow the exact directory structure pattern:

```
src/pages/YYYY-MM/article-slug/index.mdx
```

**Important Rules:**

1. **Date Format**: `YYYY-MM` (e.g., `2025-01`, `2024-12`)
2. **Article Slug**: Use kebab-case (lowercase with hyphens)
3. **File Name**: Always `index.mdx`
4. **Monday Release**: Ensure the date in frontmatter is always a Monday

## Article Frontmatter Template

```yaml
---
layout: "@layouts/BlogPost.astro"
title: "Your Article Title"
date: "YYYY-MM-DD" # Must be a Monday
description: "SEO-friendly description for meta tags and previews"
tags: ["CSS", "JavaScript", "React", "Technical Discussion"]
# Optional: updatedDate: "YYYY-MM-DD"  # Only when updating existing articles
---
```

## Frontmatter Field Specifications

- **layout**: Always `"@layouts/BlogPost.astro"`
- **title**: Article title (used in SEO, social sharing, and navigation)
- **date**: ISO date string (YYYY-MM-DD), must be a Monday
- **description**: 1-2 sentence description for SEO and social media previews
- **tags**: Array of relevant tags for categorization and filtering
- **updatedDate**: Optional field when updating an existing article

## Common Tag Categories

- **Languages**: "JavaScript", "TypeScript", "CSS", "HTML"
- **Frameworks**: "React", "Next.js", "Astro"
- **Concepts**: "Technical Discussion", "Performance", "Accessibility"
- **Tools**: "Git", "VS Code", "Browser APIs"

## Content Structure Best Practices

### Standard Article Template

````markdown
---
# frontmatter here
---

import ComponentName from "@blogComponents/folder/ComponentName"

## Introduction

Brief introduction paragraph explaining what the article covers and why it's important.

_If you prefer to learn visually, check out the video version of this article._
`youtube: VIDEO_ID`

## Section Headings

Use ## for main sections, ### for subsections.

### Code Examples

```javascript
// Always include descriptive comments
function example() {
  return "Use proper syntax highlighting"
}
```
````

### Interactive Components

<ComponentName client:load />

## Conclusion

Summarize key takeaways and provide next steps or related resources.

````

## Step-by-Step Article Creation

### 1. Create Directory Structure
```bash
mkdir -p src/pages/YYYY-MM/article-slug
touch src/pages/YYYY-MM/article-slug/index.mdx
````

### 2. Add Frontmatter

- Ensure date is a Monday
- Use descriptive title and description
- Add appropriate tags

### 3. Write Content

- Follow content structure best practices
- Add interactive components as needed
- Include code examples and explanations

### 4. Add Assets (if needed)

```bash
mkdir -p public/articleAssets/YYYY-MM/article-slug
# Add images, demos, etc.
```

### 5. Test Locally

```bash
npm run dev
# Test article, components, and responsive design
```

## YouTube Video Embedding

Use the custom YouTube embedding syntax:

```markdown
`youtube: VIDEO_ID`

# Optional with start time:

`youtube: VIDEO_ID?start=120`
```

This automatically creates responsive, privacy-friendly YouTube embeds.

## Image Guidelines

1. **Location**: Store in `/public/articleAssets/YYYY-MM/article-slug/`
2. **Formats**: Prefer modern formats (WebP, AVIF) with PNG/JPG fallbacks
3. **Responsive**: Images automatically get responsive classes via plugin
4. **Alt Text**: Always include descriptive alt text

```markdown
![Descriptive alt text](/articleAssets/2025-01/article-slug/image.png)
```

## Code Examples Best Practices

### Syntax Highlighting

Use language-specific code blocks with optional line highlighting:

````markdown
```javascript {1,3-5}
// Line 1 is highlighted
const example = "code"
// Lines 3-5 are highlighted
function demo() {
  return "highlighted"
}
```
````

````

### Code Comments
Always include descriptive comments in code examples:

```javascript
// Bad: No explanation
const result = data.filter(item => item.status === 'active')

// Good: Clear explanation
// Filter the data to only include active items
const activeItems = data.filter(item => item.status === 'active')
````

## Content Writing Guidelines

### Introduction Section

- Explain what the article covers
- Why it's important or useful
- What the reader will learn
- Include video reference if available

### Main Sections

- Use descriptive headings (## and ###)
- Break content into digestible chunks
- Include code examples where relevant
- Add interactive demos when helpful

### Conclusion Section

- Summarize key takeaways
- Provide next steps or related resources
- Link to related articles or documentation

## Updating Existing Articles

### 1. Add updatedDate to frontmatter

```yaml
date: "2024-01-15"
updatedDate: "2024-06-15"
```

### 2. Make Content Changes

- Update outdated information
- Add new sections if needed
- Maintain original article structure

### 3. Test Changes

- Verify content renders correctly
- Check that updated date displays properly

## Content Review Checklist

Before publishing, ensure:

- [ ] Date is a Monday
- [ ] Title is descriptive and SEO-friendly
- [ ] Description is 1-2 sentences
- [ ] Tags are appropriate and follow existing patterns
- [ ] All code examples are tested and work correctly
- [ ] Interactive components function properly
- [ ] Images have proper alt text
- [ ] YouTube videos embed correctly
- [ ] Content follows the standard structure
- [ ] Spelling and grammar are correct
- [ ] Article provides clear value to readers
