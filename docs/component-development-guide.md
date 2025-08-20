# Interactive Component Development Guide

## Component Architecture

Interactive components are stored in `src/blogComponents/` and organized by feature:

```
blogComponents/
├── lib/                    # Shared utility components
│   ├── Tangent.astro      # Aside content wrapper
│   └── KeyboardShortcut.astro
├── featureName/           # Feature-specific components
│   ├── MainComponent.jsx  # Primary component
│   ├── SubComponent.astro # Supporting components
│   └── styles.css         # Component-specific styles
```

## Component Import Pattern

Components are imported using the path alias system:

```javascript
import ComponentName from "@blogComponents/folder/ComponentName"
import Tangent from "@blogComponents/lib/Tangent.astro"
```

## Client-Side Hydration

Interactive components require client-side directives:

```jsx
// For components that need immediate interactivity
<ComponentName client:load />

// For components that can wait until visible
<ComponentName client:visible />

// For components that need specific timing
<ComponentName client:idle />
```

## Component Types

### Astro Components (.astro)

For primarily static content with optional styling:

```astro
---
export interface Props {
  title?: string
  variant?: "default" | "highlighted"
}

const { title = "Default Title", variant = "default" } = Astro.props
---

<div class={`component ${variant}`}>
  {title && <h3>{title}</h3>}
  <slot />
</div>

<style>
  .component {
    padding: 1rem;
    border-radius: 0.5rem;
  }

  .highlighted {
    background-color: var(--theme-accent-bg);
  }
</style>
```

### React Components (.jsx)

For interactive functionality:

```jsx
import { useState } from "react"

export default function InteractiveComponent({
  initialValue = "",
  onUpdate = () => {},
}) {
  const [value, setValue] = useState(initialValue)

  const handleChange = newValue => {
    setValue(newValue)
    onUpdate(newValue)
  }

  return (
    <div className="interactive-wrapper">
      <input
        value={value}
        onChange={e => handleChange(e.target.value)}
        style={{
          padding: "0.5rem",
          border: "1px solid var(--theme-divider)",
          borderRadius: "0.25rem",
          backgroundColor: "var(--theme-bg)",
          color: "var(--theme-text)",
        }}
      />
      <div>Current value: {value}</div>
    </div>
  )
}
```

## Common Component Patterns

### 1. Tangent Component

Used for supplementary information that doesn't break the main flow:

```astro
<Tangent>
  This is additional information that provides context but isn't essential to
  the main explanation.
</Tangent>
```

### 2. Interactive Demos

For demonstrating concepts with live examples:

```jsx
// Example: CSS Property Demo
<CSSPropertyDemo client:load initialValue="some-default" showOutput={true} />
```

### 3. Code Playground Components

For interactive code editing and preview:

```jsx
<MarkdownEditor
  client:visible
  initialValue="# Example"
  height="300px"
  isFullWidth={false}
/>
```

## Step-by-Step Component Creation

### 1. Plan Component Structure

- Determine if Astro or React is needed
- Plan data flow and user interactions
- Consider accessibility requirements

### 2. Create Component Directory

```bash
mkdir src/blogComponents/componentName
```

### 3. Implement Component

- Follow existing patterns
- Use theme variables for styling
- Add TypeScript interfaces for props

### 4. Test Integration

- Import in test article
- Verify client-side hydration
- Test across different screen sizes

## Styling Guidelines

### Use Theme Variables

Always use CSS custom properties for consistent theming:

```css
.component {
  background-color: var(--theme-bg);
  color: var(--theme-text);
  border: 1px solid var(--theme-divider);
}

.accent-element {
  background-color: var(--theme-accent);
  color: var(--theme-bg);
}
```

### Responsive Design

Follow mobile-first approach:

```css
.component {
  /* Mobile styles first */
  font-size: 1rem;
  padding: 0.5rem;
}

@media (min-width: 50em) {
  .component {
    /* Desktop enhancements */
    font-size: 1.125rem;
    padding: 1rem;
  }
}
```

## Component Library Reference

### Existing Utility Components

#### Tangent.astro

Wrapper for supplementary content:

```astro
<Tangent>Additional context or explanatory content.</Tangent>
```

#### KeyboardShortcut.astro

Display keyboard shortcuts:

```astro
<KeyboardShortcut keys="Ctrl+C" />
```

### Interactive Component Examples

#### CSS Specificity Display

Interactive CSS specificity calculator:

```jsx
import CssSpecificityDisplay from "@blogComponents/cssSpecificityDisplay/CssSpecificityDisplay"

;<CssSpecificityDisplay client:load />
```

#### Markdown Editor

Live markdown editor with preview:

```jsx
import MarkdownEditor from "@blogComponents/markdownEditor/MarkdownEditor"

;<MarkdownEditor client:visible initialValue="# Example" height="400px" />
```

## Accessibility Guidelines

### Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

```jsx
function AccessibleButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          onClick(e)
        }
      }}
    >
      {children}
    </button>
  )
}
```

### ARIA Labels

Add appropriate ARIA labels for screen readers:

```jsx
<div role="button" aria-label="Interactive demo controls" tabIndex={0}>
  {content}
</div>
```

### Color Contrast

Use theme variables to ensure proper contrast:

```css
.interactive-element {
  background-color: var(--theme-accent);
  color: var(--theme-bg);
  /* These variables maintain proper contrast in both themes */
}
```

## Performance Considerations

### Hydration Strategy

Choose appropriate hydration timing:

- **client:load** - Critical interactive components
- **client:visible** - Components below the fold
- **client:idle** - Non-critical interactive elements

### Bundle Size

Keep components lightweight:

```jsx
// Good: Import only what you need
import { useState } from "react"

// Bad: Import entire library
import * as React from "react"
```

### State Management

Use appropriate state management for component complexity:

```jsx
// Simple state - useState
const [value, setValue] = useState("")

// Complex state - useReducer
const [state, dispatch] = useReducer(reducer, initialState)
```

## Testing Interactive Components

### Manual Testing Checklist

- [ ] Component renders correctly
- [ ] Interactive features work as expected
- [ ] Responsive design functions on all screen sizes
- [ ] Keyboard navigation works properly
- [ ] Component works in both light and dark themes
- [ ] Component hydrates correctly with client directive

### Browser Testing

Test components across:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Component Documentation

When creating new components, document:

1. **Purpose**: What the component does
2. **Props**: Required and optional props with types
3. **Usage Examples**: How to use in articles
4. **Styling**: Any custom CSS or theme variables used
5. **Accessibility**: ARIA labels, keyboard support, etc.

Example component documentation:

```jsx
/**
 * InteractiveDemo - Demonstrates CSS properties with live preview
 *
 * @param {string} property - CSS property to demonstrate
 * @param {string} initialValue - Starting value for the property
 * @param {boolean} showOutput - Whether to show the output preview
 * @param {function} onValueChange - Callback when value changes
 *
 * Usage:
 * <InteractiveDemo
 *   client:load
 *   property="color"
 *   initialValue="red"
 *   showOutput={true}
 * />
 */
```
