# Blog Component Development Guide

Custom components live in `src/blogComponents/<topic>/ComponentName.ext`. They are used inside article MDX files as interactive examples or visual demos of the concept being explained.

---

## When to Use Components

Not every article needs a component. Use them when:

- A live demo would illustrate the concept better than a screenshot or code block
- The reader needs to interact with something to understand how it behaves
- A visual comparison between two states (before/after, enabled/disabled) adds real value

Simple one-time HTML layouts can be inlined directly in the MDX with a `<div style="...">`. Components are for anything reusable within the article or complex enough to warrant its own file.

---

## Folder Structure

```
src/blogComponents/
  <topic>/
    ComponentName.astro       # Astro component (preferred)
    ComponentName.jsx         # React component (when interactivity requires state)
    ComponentName.tsx         # React component with TypeScript
    componentName.module.css  # CSS module for React components (if the styles cannot be encoded in inline styles)
```

Name the folder after the article's topic slug (e.g., `cssCalcSize`, `cornerShape`, `htmlDialog`). Use PascalCase for component file names.

---

## Astro vs React: Which to Use

**Default: Astro.** Use `.astro` files unless the component requires client-side state, event-driven re-renders, or complex interactivity that would be painful to do with vanilla JS.

| Situation                                               | Use   |
| ------------------------------------------------------- | ----- |
| Static demo, visual example, CSS showcase               | Astro |
| Simple toggle or expand/collapse (one `<script>` block) | Astro |
| Multiple controlled inputs that drive visual output     | React |
| Real-time updates based on user input (sliders, forms)  | React |
| Component needs `useState` or `useEffect`               | React |

**Examples of Astro components:** `MarginTrimCard`, `CalcSizeAccordion`, `HtmlDialog`, `CssFocusButton`, `LazyLoadedImage`

**Examples of React components:** `CornerShapePlayground` (live sliders), `CSSQuantityQuery` (multi-input form), `DynamicReadMoreButton`

---

## Astro Component Anatomy

```astro
---
interface Props {
  isActive?: boolean
  label?: string
}

const { isActive = false, label = "Default" } = Astro.props
---

<div class={`box ${isActive ? "active" : ""}`}>
  <slot />
</div>

<style>
  .box {
    padding: 1rem;
    background-color: var(--theme-purple);
    border-radius: 0.5rem;
  }

  .box.active {
    background-color: var(--theme-blue);
  }
</style>
```

Key rules:

- Define props with `interface Props` in the frontmatter (`---` block)
- Destructure from `Astro.props` with defaults
- Use `<slot />` to allow the MDX author to pass content into the component
- Styles are scoped by default — no need for class name prefixes unless composing with `is:global`

### Adding Simple Interactivity to Astro

For simple DOM-based interactions (toggle a class, expand an accordion), add a `<script>` block at the bottom of the `.astro` file. The script runs on the client. Use `data-*` attributes to select elements without coupling to class names.

```astro
<button data-my-toggle-btn>Toggle</button>
<div data-my-toggle-target class="hidden">Content</div>

<script>
  document.querySelectorAll("[data-my-toggle-btn]").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest("div").querySelector("[data-my-toggle-target]")
        ?.classList.toggle("hidden")
    })
  })
</script>
```

When there are multiple instances of the component on the same page, always use `querySelectorAll` and scope the interaction to the nearest ancestor rather than using `getElementById`.

---

## React Component Anatomy

Use `.tsx` for React components.

### Styles: CSS Modules vs Inline

- **CSS modules** (`.module.css`): for components with many classes or pseudo-selectors that are hard to express inline
- **Inline styles**: fine for layout/structural styles, but always use CSS variable strings for colors

```jsx
// ✅ Correct — color variable as string in inline style
<div style={{ backgroundColor: "var(--theme-purple)" }}>

// ❌ Wrong — hardcoded color breaks dark mode
<div style={{ backgroundColor: "#7c3aed" }}>
```

When using a CSS module:

```tsx
// componentName.module.css
.btn {
  background-color: var(--theme-purple);
  border: none;
  border-radius: 0.25em;
  padding: 0.5em 0.75em;
  cursor: pointer;
}

.btn:hover {
  background-color: var(--theme-purple-hover);
}
```

```tsx
import styles from "./componentName.module.css"

function Component() {
  return <button className={styles.btn}>Click</button>
}
```

---

## Using Components in MDX

### Importing

Add import statements at the top of the `.mdx` file, after the frontmatter:

```mdx
import MyComponent from "@blogComponents/myTopic/MyComponent.astro"
import AnotherComponent from "@blogComponents/myTopic/AnotherComponent

"
```

The `@blogComponents` alias maps to `src/blogComponents/`. Omit the extension for `.jsx`/`.tsx` files (TypeScript resolves them). Include `.astro` explicitly for Astro files.

### Astro Components

Render like normal JSX elements. No directive needed — Astro renders them at build time:

```mdx
<MyComponent isActive label="Example" />
```

### React Components

Interactive React components need a `client:*` hydration directive. Use `client:load` for components that must be interactive immediately. Use `client:visible` for components lower on the page that can hydrate when scrolled into view:

```mdx
{/* Hydrates as soon as the page loads */}

<MyPlayground client:load />

{/* Hydrates when the component scrolls into view — better for perf */}

<MyInteractiveDemo client:visible />
```

Astro components **cannot** use `client:*` directives. React components **must** use one to be interactive.

---

## CSS Theme Variables

Always use these variables instead of hardcoded colors. They automatically adapt to light and dark mode.

### Color Variables (adapt to dark mode)

| Variable               | Light mode            | Dark mode           | Use for                             |
| ---------------------- | --------------------- | ------------------- | ----------------------------------- |
| `--theme-red`          | `hsl(350, 100%, 54%)` | darker red          | errors, "bad" examples, warnings    |
| `--theme-blue`         | `hsl(200, 100%, 50%)` | darker blue         | info, primary accent, neutral demos |
| `--theme-green`        | `hsl(158, 78%, 42%)`  | darker green        | success, "good" examples            |
| `--theme-orange`       | `hsl(21, 100%, 60%)`  | darker orange       | highlights, secondary accent        |
| `--theme-purple`       | `hsl(269, 79%, 74%)`  | darker purple       | buttons, interactive elements       |
| `--theme-yellow`       | `hsl(41, 100%, 58%)`  | darker yellow       | callouts, attention                 |
| `--theme-purple-hover` | lighter purple        | lighter dark purple | hover state for purple buttons      |

### UI Variables

| Variable                 | Use for                                                    |
| ------------------------ | ---------------------------------------------------------- |
| `--theme-text`           | Body text, borders that should match text                  |
| `--theme-text-light`     | Secondary / subdued text                                   |
| `--theme-text-lighter`   | Placeholder text, very subtle borders                      |
| `--theme-bg`             | Page background — use when you need the "transparent" feel |
| `--theme-divider`        | Subtle divider lines and borders                           |
| `--theme-code-inline-bg` | Inline code backgrounds (outside tangents)                 |

---

## Common Patterns

### Passing CSS to a component via inline CSS variables

When a component needs to be configured visually, pass values as CSS custom properties via `style`:

```astro
<div
  class="demo"
  style={`--br: ${borderRadius}; --cs: ${cornerShape};`}
>
```

```css
.demo {
  border-radius: var(--br);
  corner-shape: var(--cs);
}
```

This pattern lets you drive CSS entirely from props without needing JavaScript.

### Wrapper with a dashed border

A common pattern for component demo areas:

```css
.demo-wrapper {
  border: 1px dashed var(--theme-text-lighter);
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
```

### Buttons

Standard button style used throughout blog components:

```css
.btn {
  border: none;
  border-radius: 0.25em;
  padding: 0.5em 0.75em;
  font-size: inherit;
  background: var(--theme-purple);
  cursor: pointer;
}

.btn:hover {
  background: var(--theme-purple-hover);
}
```

### Feature detection / browser support warning

When demonstrating a cutting-edge CSS/JS feature, try to fake what it should look if possible. Otherwise, show a warning message to users of unsupported browsers using `@supports not`:

```css
.browser-warning {
  display: none;
}

@supports not (corner-shape: round) {
  .browser-warning {
    display: flex;
  }
}
```

---

## Inline HTML in MDX (no component needed)

For one-off layout adjustments, use inline HTML directly in the MDX. Keep inline styles to layout only — no hardcoded colors:

```mdx
<div style="max-width: 500px; margin-inline: auto;">
  ![Image description](/articleAssets/YYYY-MM/slug/image.webp)
</div>

<div style="display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(160px, auto)); margin: 2rem 0;">
  <ComponentA />
  <ComponentB />
</div>
```

Use `<figure>` + `<figcaption>` when an image needs a caption:

```mdx
<figure style="max-width: 500px; margin-left: auto; margin-right: auto;">
  <img
    style="width: 100%;"
    src="/articleAssets/YYYY-MM/slug/image.jpg"
    alt="Description"
  />
  <figcaption>Caption text here</figcaption>
</figure>
```
