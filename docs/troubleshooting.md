# Troubleshooting Guide

## Build Issues

### MDX Import Errors

#### Problem

```bash
Error: Cannot resolve import "@blogComponents/component/Component"
```

#### Solution

Ensure proper import syntax using path aliases:

```javascript
// ✅ Correct: Use path alias
import Component from "@blogComponents/folder/Component"

// ❌ Incorrect: Relative path
import Component from "../blogComponents/folder/Component"
```

#### Check Path Aliases

Verify `jsconfig.json` configuration:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@layouts/*": ["src/layouts/*"],
      "@blogComponents/*": ["src/blogComponents/*"]
    }
  }
}
```

### Component Hydration Issues

#### Problem

Interactive components not working on the client side.

#### Solution

Add proper client directives:

```jsx
// ✅ Correct: Client directive for interactivity
<Component client:load />

// ❌ Incorrect: Missing client directive
<Component />
```

#### Client Directive Options

- `client:load` - Hydrate immediately
- `client:visible` - Hydrate when visible
- `client:idle` - Hydrate when browser is idle

### Path Resolution Issues

#### Problem

```bash
Module not found: Can't resolve 'src/components/Component'
```

#### Solution

Check import paths and aliases:

```javascript
// Check jsconfig.json for correct path mapping
{
  "compilerOptions": {
    "paths": {
      "@blogComponents/*": ["src/blogComponents/*"]
    }
  }
}
```

### Build Memory Issues

#### Problem

```bash
JavaScript heap out of memory
```

#### Solution

Increase Node.js memory limit:

```bash
# Temporary fix
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# Or modify package.json
{
  "scripts": {
    "build": "NODE_OPTIONS=--max-old-space-size=4096 astro build"
  }
}
```

## Styling Issues

### Theme Variables Not Working

#### Problem

CSS custom properties not applying correctly.

#### Solution

Ensure proper CSS custom property usage:

```css
/* ✅ Correct: Use var() function */
color: var(--theme-text);

/* ❌ Incorrect: Direct reference */
color: --theme-text;
```

#### Check Theme Initialization

Verify theme is set on document element:

```javascript
// UserSettings.jsx should set data-theme
document.documentElement.dataset.theme = theme
```

### Component Styles Not Applied

#### Problem

Astro component styles not showing up.

#### Solution

Use proper style scoping:

```astro
<!-- ✅ Correct: Scoped styles -->
<style>
  .component {
    /* Styles here are scoped to this component */
    padding: 1rem;
  }
</style>

<!-- For global styles, use :global() -->
<style>
  .component :global(.child) {
    /* This affects .child elements globally */
    margin: 0.5rem;
  }
</style>
```

### CSS Grid/Flexbox Issues

#### Problem

Layout not working as expected.

#### Solution

Check browser support and fallbacks:

```css
/* Provide fallbacks for older browsers */
.container {
  display: flex; /* Fallback */
  flex-wrap: wrap;
}

@supports (display: grid) {
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}
```

## Content Issues

### Dates Not Displaying Correctly

#### Problem

Article dates showing incorrectly or not at all.

#### Solution

Check date format and ensure it's a Monday:

```yaml
# ✅ Correct: ISO date format, Monday
date: "2025-01-13"

# ❌ Incorrect: Wrong format or not Monday
date: "01-13-2025"
date: "2025-01-14"  # Tuesday
```

#### Verify Date Formatter

Check `src/utils/dateFormatter.js`:

```javascript
export default new Intl.DateTimeFormat(undefined, {
  timeZone: "UTC",
  month: "long",
  year: "numeric",
  day: "numeric",
})
```

### YouTube Embeds Not Working

#### Problem

YouTube videos not embedding properly.

#### Solution

Verify video ID and syntax:

```markdown
<!-- ✅ Correct: Clean video ID -->

`youtube: dQw4w9WgXcQ`

<!-- ✅ Correct: With start time -->

`youtube: dQw4w9WgXcQ?start=120`

<!-- ❌ Incorrect: Full URL -->

`youtube: https://www.youtube.com/watch?v=dQw4w9WgXcQ`
```

#### Check Video Accessibility

- Ensure video is public
- Verify video ID is correct
- Check for regional restrictions

### Images Not Loading

#### Problem

Images in articles not displaying.

#### Solution

Check image paths and location:

```markdown
<!-- ✅ Correct: Absolute path from public -->

![Alt text](/articleAssets/2025-01/article-slug/image.png)

<!-- ❌ Incorrect: Relative path -->

![Alt text](./image.png)
```

#### Verify Image Location

```
public/
└── articleAssets/
    └── YYYY-MM/
        └── article-slug/
            └── image.png
```

## Development Issues

### Hot Reload Not Working

#### Problem

Changes not reflecting in development server.

#### Solution

1. **Restart Dev Server**:

   ```bash
   # Stop server (Ctrl+C) and restart
   npm run dev
   ```

2. **Clear Browser Cache**:

   - Hard refresh (Ctrl+Shift+R)
   - Clear browser cache

3. **Check File Watchers**:
   ```bash
   # On Linux, increase file watcher limit
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   ```

### Port Already in Use

#### Problem

```bash
Error: Port 3000 is already in use
```

#### Solution

1. **Use Different Port**:

   ```bash
   npm run dev -- --port 3001
   ```

2. **Kill Process on Port**:

   ```bash
   # Find process using port
   lsof -i :3000

   # Kill process
   kill -9 PID
   ```

### Node Version Issues

#### Problem

```bash
Error: Node.js version not supported
```

#### Solution

Use Node.js version 16 or higher:

```bash
# Check current version
node --version

# Install/use correct version with nvm
nvm install 18
nvm use 18
```

## Runtime Issues

### JavaScript Errors in Console

#### Problem

Console shows JavaScript errors in production.

#### Solution

1. **Check Component Hydration**:

   ```jsx
   // Ensure components that need client-side JS have directives
   <InteractiveComponent client:load />
   ```

2. **Verify Imports**:

   ```javascript
   // Check all imports are correctly resolved
   import { useState } from "react"
   ```

3. **Test in Development**:
   ```bash
   npm run dev
   # Check if errors appear in development
   ```

### Performance Issues

#### Problem

Slow page load times or poor performance scores.

#### Solutions

1. **Optimize Images**:

   ```markdown
   <!-- Use modern image formats -->

   ![Alt text](/articleAssets/2025-01/slug/image.webp)
   ```

2. **Reduce JavaScript Bundle Size**:

   ```jsx
   // Use client:visible for below-the-fold components
   <HeavyComponent client:visible />
   ```

3. **Check Bundle Analysis**:
   ```bash
   npm run build -- --verbose
   ```

### Accessibility Issues

#### Problem

Poor accessibility scores or screen reader issues.

#### Solutions

1. **Add ARIA Labels**:

   ```jsx
   <button aria-label="Close dialog">×</button>
   ```

2. **Ensure Proper Heading Hierarchy**:

   ```markdown
   # Page Title (h1)

   ## Section (h2)

   ### Subsection (h3)
   ```

3. **Test with Screen Reader**:
   - Use NVDA, JAWS, or VoiceOver
   - Check keyboard navigation

## Debugging Strategies

### General Debugging Steps

1. **Check Browser Console**:

   - Look for JavaScript errors
   - Check network requests
   - Verify API responses

2. **Verify File Structure**:

   ```bash
   # Check if files exist in expected locations
   ls -la src/pages/YYYY-MM/article-slug/
   ls -la public/articleAssets/YYYY-MM/article-slug/
   ```

3. **Test in Isolation**:

   - Create minimal test case
   - Remove complex components temporarily
   - Test with simple content first

4. **Check Git History**:
   ```bash
   # See what changed recently
   git log --oneline -10
   git diff HEAD~1
   ```

### Development Tools

1. **Astro Dev Toolbar**:

   - Inspect component boundaries
   - View component props
   - Check hydration status

2. **Browser DevTools**:

   - Network tab for failed requests
   - Console for JavaScript errors
   - Elements tab for CSS issues

3. **Lighthouse**:
   - Performance analysis
   - Accessibility checks
   - SEO recommendations

### Getting Help

1. **Check Documentation**:

   - [Astro Documentation](https://docs.astro.build)
   - [React Documentation](https://react.dev)
   - Project-specific docs in this repository

2. **Search for Similar Issues**:

   - GitHub Issues in Astro repository
   - Stack Overflow questions
   - Community forums

3. **Create Minimal Reproduction**:
   - Isolate the problem
   - Remove unnecessary code
   - Document steps to reproduce
