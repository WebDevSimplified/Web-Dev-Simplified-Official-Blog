# Build & Deployment

## Development Environment

### Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Setup Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server

The development server provides:

- **Hot Reload**: Instant updates when files change
- **Live CSS**: CSS changes apply without full page reload
- **Component Refresh**: React components update preserving state when possible
- **Error Overlay**: Clear error messages in the browser

## Build Process

### Build Steps

1. **Astro Build**: Compiles Astro components and pages to static HTML
2. **MDX Processing**: Processes markdown files with custom plugins
3. **React Hydration**: Bundles interactive components for client-side hydration
4. **Asset Optimization**: Optimizes images and static assets
5. **Static Generation**: Generates static HTML files for all pages

### Build Output

```
dist/
├── index.html                    # Homepage
├── 404.html                     # Error page
├── rss.xml                      # RSS feed
├── YYYY-MM/
│   └── article-slug/
│       └── index.html           # Article pages
├── _astro/                      # Optimized assets
│   ├── *.css                    # Minified CSS
│   ├── *.js                     # JavaScript bundles
│   └── *.woff2                  # Font files
└── articleAssets/               # Article images and assets
```

### Build Configuration

#### astro.config.mjs

```javascript
export default defineConfig({
  integrations: [react(), sitemap(), mdx()],
  site: "https://blog.webdevsimplified.com",
  markdown: {
    syntaxHighlight: false, // Using custom Shiki plugin
    remarkPlugins: [myRemarkShiki, youtubeEmbed, responsiveImages],
  },
})
```

#### Build Optimization

- **Code Splitting**: Automatic splitting of React components
- **CSS Minification**: Production CSS is minified
- **Image Optimization**: Modern image formats when supported
- **Tree Shaking**: Unused code is removed from bundles

## Deployment

### Netlify Configuration

#### netlify.toml

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

#### Deployment Process

1. **Git Push**: Push to main branch triggers build
2. **Build Environment**: Netlify runs `npm run build`
3. **Asset Processing**: Static files are optimized
4. **CDN Distribution**: Files distributed to global CDN
5. **Domain Routing**: Custom domain routing configured

### Environment Variables

#### Production Analytics

Analytics are enabled automatically in production:

```javascript
// BaseHead.astro
{
  import.meta.env.PROD && (
    <script
      defer
      data-domain="blog.webdevsimplified.com"
      src="https://plausible.io/js/script.js"
    ></script>
  )
}
```

#### Build Environment Detection

```javascript
// Environment-specific behavior
const isProduction = import.meta.env.PROD
const isDevelopment = import.meta.env.DEV
```

### Build Optimization Strategies

#### Performance Optimizations

1. **Static Generation**: All pages pre-rendered at build time
2. **Component Islands**: Interactive components only hydrate when needed
3. **Image Optimization**: Responsive images with modern formats
4. **Code Splitting**: Automatic code splitting for React components
5. **Asset Optimization**: CSS and JavaScript minification

#### Bundle Analysis

```bash
# Analyze bundle size
npm run build -- --verbose
```

### Custom Build Scripts

#### package.json Scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

## Performance Monitoring

### Build Performance

Monitor build times and optimize:

- **Asset Processing**: Image optimization during build
- **Bundle Size**: Keep JavaScript bundles minimal
- **Build Cache**: Leverage build caching when available

### Runtime Performance

- **Lighthouse Scores**: Aim for 90+ in all categories
- **Core Web Vitals**: Monitor FCP, LCP, CLS, FID
- **Page Speed**: Target sub-3-second load times

## Troubleshooting Build Issues

### Common Build Errors

#### MDX Import Errors

```bash
# Error: Cannot resolve import
# Solution: Check import paths use correct aliases
import Component from "@blogComponents/folder/Component"
# Not: import Component from "../blogComponents/folder/Component"
```

#### Component Hydration Issues

```jsx
// Error: Component not interactive
// Solution: Add client directive
<Component client:load />
// Not: <Component />
```

#### Path Resolution Issues

```javascript
// Error: Module not found
// Solution: Check jsconfig.json path aliases
{
  "compilerOptions": {
    "paths": {
      "@blogComponents/*": ["src/blogComponents/*"]
    }
  }
}
```

### Build Debugging

#### Verbose Build Output

```bash
npm run build -- --verbose
```

#### Development Build Analysis

```bash
# Check build output structure
npm run build && ls -la dist/
```

## Continuous Integration

### GitHub Actions (Example)

```yaml
name: Build and Deploy
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm ci
      - run: npm run build
```

### Build Caching

Leverage build caching for faster deployments:

```yaml
# Cache node_modules
- uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

## Security Considerations

### Content Security Policy

Configure CSP headers in Netlify:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' plausible.io; style-src 'self' 'unsafe-inline'"
```

### HTTPS Enforcement

Ensure all traffic uses HTTPS:

```toml
[[redirects]]
  from = "http://blog.webdevsimplified.com/*"
  to = "https://blog.webdevsimplified.com/:splat"
  status = 301
  force = true
```

## Backup and Recovery

### Git Repository

- **Source Control**: All content versioned in Git
- **Branch Protection**: Main branch protected from direct pushes
- **Backup Strategy**: Multiple remote repositories recommended

### Asset Backup

- **Article Assets**: Stored in Git repository
- **Build Artifacts**: Reproducible from source code
- **Database**: No database dependencies (static site)

## Monitoring and Alerts

### Build Monitoring

Set up alerts for:

- **Build Failures**: Immediate notification of failed builds
- **Build Time**: Alert if builds take longer than expected
- **Deploy Status**: Confirmation of successful deployments

### Performance Monitoring

- **Lighthouse CI**: Automated performance testing
- **Real User Monitoring**: Track actual user experience
- **Error Tracking**: Monitor client-side errors
