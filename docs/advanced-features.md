# Advanced Features

## Custom Markdown Plugins

### YouTube Embedding Plugin

Located in `src/plugins/youtubeEmbed.mjs`

Converts inline YouTube references to responsive embeds:

```javascript
// Input in markdown:
`youtube: VIDEO_ID`
`youtube: VIDEO_ID?start=120`

// Output: Responsive YouTube iframe
<div style="max-width: 600px; margin: 1rem auto;">
  <div style="padding-bottom: 56.4286%; position: relative;">
    <iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID" />
  </div>
</div>
```

#### Features

- **Privacy-friendly**: Uses youtube-nocookie.com domain
- **Responsive**: Maintains 16:9 aspect ratio
- **Start Time Support**: Optional start time parameter
- **Lazy Loading**: Iframe loads when needed

### Responsive Images Plugin

Located in `src/plugins/responsiveImages.mjs`

Automatically adds responsive classes to images:

```javascript
// Input:
![Alt text](image.jpg)

// Output:
<img class="responsive-img" src="image.jpg" alt="Alt text" />
```

#### CSS Implementation

```css
.responsive-img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

### Syntax Highlighting Plugin

Located in `src/plugins/myRemarkShiki.mjs`

Enhanced Shiki integration with line highlighting:

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

#### Features
- **Line Highlighting**: Highlight specific lines or ranges
- **Dark Theme**: Uses "dark-plus" theme for consistency
- **Error Handling**: Logs warnings for unsupported languages
- **Parse Ranges**: Supports complex range syntax (1,3-5,7)

## User Preferences System

### Theme Switching
Located in `src/components/UserSettings.jsx`

#### Features
- **Auto-detection**: Respects system preference on first visit
- **Manual Override**: User can choose light/dark explicitly
- **Persistent Storage**: Preferences saved to localStorage
- **Instant Application**: Theme changes apply immediately

#### Implementation
```javascript
const [theme, setTheme] = useLocalStorage("THEME", () => {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark" : "light"
  }
})

useEffect(() => {
  document.documentElement.dataset.theme = theme
}, [theme])
````

### Reading Width Options

Three reading width options for user comfort:

- **Narrow**: Optimal for focused reading (45ch)
- **Default**: Standard blog layout (65ch)
- **Wide**: Maximum content width (85ch)

#### CSS Implementation

```css
.content-wrapper {
  max-width: 65ch; /* Default */
  margin: 0 auto;
}

:root[data-reading-width="narrow"] .content-wrapper {
  max-width: 45ch;
}

:root[data-reading-width="wide"] .content-wrapper {
  max-width: 85ch;
}
```

## Analytics Integration

### Plausible Analytics

Privacy-friendly analytics without cookies or personal data collection.

#### Configuration

```astro
<!-- BaseHead.astro -->{
  import.meta.env.PROD && (
    <script
      defer
      data-domain="blog.webdevsimplified.com"
      src="https://plausible.io/js/script.js"
    />
  )
}
```

#### Features

- **Environment-aware**: Only loads in production
- **Privacy-focused**: No cookies or personal data
- **Custom Events**: Track newsletter signups and interactions
- **Goal Tracking**: Monitor specific user actions

#### Custom Event Tracking

```javascript
// Track newsletter signups
window.plausible("Newsletter Signup", {
  props: { location: "article-bottom" },
})

// Track social shares
window.plausible("Social Share", {
  props: { platform: "twitter", article: "article-slug" },
})
```

## Social Sharing System

### Automatic Meta Tags

Located in `src/components/BaseHead.astro`

#### Open Graph Tags

```html
<meta property="og:title" content="Article Title" />
<meta property="og:description" content="Article description" />
<meta property="og:url" content="https://blog.webdevsimplified.com/article" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="Web Dev Simplified Blog" />
```

#### Twitter Cards

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@DevSimplified" />
<meta name="twitter:title" content="Article Title" />
<meta name="twitter:description" content="Article description" />
```

### Share Buttons Component

Located in `src/components/ShareButtons.jsx`

#### Supported Platforms

- **Twitter**: With hashtags and mention
- **Facebook**: Direct sharing
- **LinkedIn**: Professional sharing
- **Reddit**: Community sharing
- **Copy Link**: Clipboard functionality

#### Implementation

```jsx
const shareUrls = {
  twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `${title} by @${twitterHandle}`,
  )}&url=${encodeURIComponent(fullUrl)}&hashtags=${tags.join(",")}`,

  facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    fullUrl,
  )}`,

  linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    fullUrl,
  )}`,
}
```

## Performance Features

### Service Worker

Basic service worker for offline functionality and caching.

#### Features

- **Static Asset Caching**: Cache CSS, JS, and images
- **Offline Fallback**: Basic offline page functionality
- **Update Notifications**: Notify users of new content

### Image Optimization

#### Responsive Classes

Automatic responsive behavior for all images:

```css
.responsive-img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1rem auto;
}
```

#### Modern Format Support

```html
<!-- Progressive enhancement with modern formats -->
<picture>
  <source srcset="image.avif" type="image/avif" />
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Description" class="responsive-img" />
</picture>
```

#### Lazy Loading

```html
<img src="image.jpg" loading="lazy" alt="Description" />
```

### Code Splitting

#### Component Islands

Only interactive components load JavaScript:

```jsx
// Static by default - no JavaScript
<StaticComponent />

// Interactive when needed - loads JavaScript
<InteractiveComponent client:load />
```

#### Bundle Optimization

- **Tree Shaking**: Unused code removed automatically
- **Code Splitting**: React components split into separate bundles
- **Dynamic Imports**: Load components only when needed

### Selective Hydration

#### Hydration Strategies

```jsx
// Immediate hydration for critical interactions
<SearchBar client:load />

// Lazy hydration for below-the-fold content
<NewsletterForm client:visible />

// Deferred hydration for non-critical features
<ShareButtons client:idle />
```

## Accessibility Features

### Semantic HTML Structure

#### Proper Heading Hierarchy

```html
<h1>Article Title</h1>
<h2>Main Section</h2>
<h3>Subsection</h3>
<h4>Details</h4>
```

#### ARIA Labels and Roles

```jsx
<nav aria-label="Main navigation">
  <ul role="list">
    <li role="listitem">
      <a href="/" aria-current="page">
        Home
      </a>
    </li>
  </ul>
</nav>
```

#### Screen Reader Support

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### Color Contrast

#### Theme Variables

All theme combinations maintain WCAG AA contrast ratios:

```css
/* Light theme - 4.5:1 contrast ratio */
--theme-text: var(--color-gray-800); /* #1f2937 */
--theme-bg: var(--color-white); /* #ffffff */

/* Dark theme - 7:1 contrast ratio */
--theme-text: var(--color-white); /* #ffffff */
--theme-bg: var(--color-black); /* #161a1d */
```

### Keyboard Navigation

#### Focus Management

```css
.focusable:focus {
  outline: 2px solid var(--theme-accent);
  outline-offset: 2px;
}

/* Custom focus for interactive elements */
.interactive:focus {
  outline: none;
  box-shadow: 0 0 0 3px var(--theme-accent-light);
}
```

#### Skip Links

```html
<a href="#main-content" class="skip-link"> Skip to main content </a>
```

#### Interactive Element Support

All interactive components support:

- Tab navigation
- Enter and Space key activation
- Escape key to close modals/dropdowns
- Arrow key navigation where appropriate

### Motion Preferences

#### Respect User Preferences

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## SEO Optimization

### Structured Data

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
    "description": "Article description"
  }
</script>
```

### Sitemap Generation

Automatic sitemap generation via `@astrojs/sitemap`:

```javascript
// astro.config.mjs
export default defineConfig({
  site: "https://blog.webdevsimplified.com",
  integrations: [sitemap()],
})
```

### Canonical URLs

```html
<link rel="canonical" href="https://blog.webdevsimplified.com/article-url" />
```

## Monitoring and Maintenance

### Performance Monitoring

- **Lighthouse CI**: Automated performance testing
- **Core Web Vitals**: Monitor FCP, LCP, CLS, FID
- **Real User Monitoring**: Track actual user experience

### Error Tracking

```javascript
// Basic error tracking
window.addEventListener("error", event => {
  // Log error details
  console.error("JavaScript Error:", event.error)

  // Track in analytics
  window.plausible("JavaScript Error", {
    props: {
      message: event.error.message,
      filename: event.filename,
      line: event.lineno,
    },
  })
})
```

### Security Headers

```toml
# netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' plausible.io"
```
