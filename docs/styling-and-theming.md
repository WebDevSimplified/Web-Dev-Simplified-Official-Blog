# Styling & Theming System

## CSS Custom Properties Architecture

The theming system is built on CSS custom properties with support for light/dark themes and reading width preferences.

### Core Theme Variables

Located in `src/styles/theme.css`:

```css
:root {
  /* Color Palette */
  --color-blue: hsl(200, 100%, 50%);
  --color-gray-800: #1f2937;
  --color-white: #fff;
  --color-black: #161a1d;
  /* ... more colors */

  /* Theme Variables (Light Mode) */
  --theme-accent: var(--color-blue);
  --theme-text: var(--color-gray-800);
  --theme-bg: var(--color-white);
  --theme-divider: var(--color-gray-100);
  /* ... more theme variables */
}

:root[data-theme="dark"] {
  /* Dark Mode Overrides */
  --theme-text: var(--color-white);
  --theme-bg: var(--color-black);
  --theme-divider: var(--color-gray-900);
  /* ... more dark mode overrides */
}
```

## Theme Variable Categories

### Text Colors

```css
--theme-text         /* Primary text color */
--theme-text-light   /* Secondary text color */
--theme-text-lighter /* Tertiary text color */
```

### Background Colors

```css
--theme-bg           /* Main background */
--theme-bg-accent    /* Accent background with transparency */
--theme-popup-bg     /* Modal/popup backgrounds */
```

### Interactive Colors

```css
--theme-accent       /* Primary accent color */
--theme-accent-light /* Lighter accent variant */
--theme-accent-dark  /* Darker accent variant */
```

### Code Highlighting

```css
--theme-code-bg           /* Code block background */
--theme-code-text         /* Code text color */
--theme-code-inline-bg    /* Inline code background */
--theme-code-highlight-bg /* Highlighted line background */
```

### Tangent/Aside Content

```css
--theme-tangent-bg              /* Tangent background */
--theme-tangent-border          /* Tangent border */
--theme-tangent-code-inline-bg  /* Inline code in tangents */
```

## Theme Usage Guidelines

### Always Use Theme Variables

```css
/* ✅ Good: Use theme variables */
.component {
  background-color: var(--theme-bg);
  color: var(--theme-text);
  border: 1px solid var(--theme-divider);
}

/* ❌ Bad: Hardcoded colors */
.component {
  background-color: #ffffff;
  color: #333333;
  border: 1px solid #eeeeee;
}
```

### Accent Elements

```css
.accent-element {
  background-color: var(--theme-accent);
  color: var(--theme-bg);
}

.accent-hover:hover {
  background-color: var(--theme-accent-light);
}
```

## Reading Width System

The blog supports three reading width options controlled via `data-reading-width` attribute:

```css
/* Default styles */
.content-wrapper {
  max-width: 65ch;
  margin: 0 auto;
}

/* Narrow reading width */
:root[data-reading-width="narrow"] .content-wrapper {
  max-width: 45ch;
}

/* Wide reading width */
:root[data-reading-width="wide"] .content-wrapper {
  max-width: 85ch;
}
```

## Responsive Design Patterns

### Mobile-First Approach

```css
.component {
  /* Mobile styles first */
  font-size: 1rem;
  padding: 0.5rem;
  margin: 0.5rem 0;
}

@media (min-width: 50em) {
  .component {
    /* Desktop enhancements */
    font-size: 1.125rem;
    padding: 1rem;
    margin: 1rem 0;
  }
}
```

### Container Queries (Where Supported)

```css
.responsive-component {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .child-element {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}
```

## Code Syntax Highlighting

### Shiki Integration

Code blocks use Shiki for syntax highlighting with custom line highlighting support:

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

### Custom Highlighting Styles
Located in `src/styles/shiki-highlight.css`:

```css
.highlighted-line {
  background-color: var(--theme-code-highlight-bg);
  display: block;
  margin: 0 -1em;
  padding: 0 1em;
}
````

## Component Styling Best Practices

### Scoped Styles in Astro Components

```astro
<style>
  .component {
    /* Styles here are automatically scoped to this component */
    padding: 1rem;
    border-radius: 0.5rem;
  }

  /* Use :global() for child element styling */
  .component :global(.child) {
    margin-top: 0.5rem;
  }
</style>
```

### Inline Styles for React Components

```jsx
const styles = {
  wrapper: {
    padding: "1rem",
    backgroundColor: "var(--theme-bg)",
    color: "var(--theme-text)",
    border: "1px solid var(--theme-divider)",
  },
}

return <div style={styles.wrapper}>Content</div>
```

## Layout Systems

### CSS Grid for Complex Layouts

```css
.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}
```

### Flexbox for Simple Layouts

```css
.flex-layout {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}

@media (max-width: 50em) {
  .flex-layout {
    flex-direction: column;
    align-items: stretch;
  }
}
```

## Typography System

### Font Stack

```css
:root {
  --font-body: "IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: "IBM Plex Mono", Consolas, "Andale Mono WT", monospace;
}

body {
  font-family: var(--font-body);
}

code,
pre {
  font-family: var(--font-mono);
}
```

### Heading Hierarchy

```css
h1 {
  font-size: 2.25rem;
  font-weight: 700;
}
h2 {
  font-size: 1.875rem;
  font-weight: 600;
}
h3 {
  font-size: 1.5rem;
  font-weight: 600;
}
h4 {
  font-size: 1.25rem;
  font-weight: 500;
}

@media (max-width: 50em) {
  h1 {
    font-size: 1.875rem;
  }
  h2 {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 1.25rem;
  }
}
```

## Interactive Element Styling

### Buttons

```css
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: var(--theme-accent);
  color: var(--theme-bg);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn:hover {
  background-color: var(--theme-accent-dark);
}

.btn:focus {
  outline: 2px solid var(--theme-accent);
  outline-offset: 2px;
}
```

### Form Elements

```css
.input {
  padding: 0.5rem;
  border: 1px solid var(--theme-divider);
  border-radius: 0.25rem;
  background-color: var(--theme-bg);
  color: var(--theme-text);
  font-family: inherit;
}

.input:focus {
  outline: none;
  border-color: var(--theme-accent);
  box-shadow: 0 0 0 2px var(--theme-accent-light);
}
```

## Animation and Transitions

### Subtle Transitions

```css
.component {
  transition: all 0.2s ease;
}

.hover-effect:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
```

### Respect User Preferences

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Accessibility in Styling

### Focus Indicators

```css
.focusable:focus {
  outline: 2px solid var(--theme-accent);
  outline-offset: 2px;
}

/* Custom focus styles for specific elements */
.custom-focus:focus {
  outline: none;
  box-shadow: 0 0 0 3px var(--theme-accent-light);
}
```

### Color Contrast

All theme variables maintain WCAG AA color contrast ratios:

```css
/* These combinations ensure proper contrast */
.high-contrast {
  background-color: var(--theme-accent);
  color: var(--theme-bg);
}

.text-on-background {
  background-color: var(--theme-bg);
  color: var(--theme-text);
}
```

### Screen Reader Support

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

## Performance Considerations

### CSS Loading Strategy

```css
/* Critical CSS is inlined */
/* Non-critical CSS is loaded asynchronously */

/* Use CSS containment for better performance */
.isolated-component {
  contain: layout style paint;
}
```

### Modern CSS Features

```css
/* Use modern CSS when supported */
.modern-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
}

/* Fallback for older browsers */
@supports not (display: grid) {
  .modern-layout {
    display: flex;
    flex-wrap: wrap;
  }
}
```

## Debugging Styles

### Development Helpers

```css
/* Add temporary borders to debug layout issues */
.debug * {
  outline: 1px solid red;
}

/* Check for missing alt text on images */
img:not([alt]) {
  border: 5px solid red;
}
```
