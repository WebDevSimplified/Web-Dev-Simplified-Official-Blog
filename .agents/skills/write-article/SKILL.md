---
name: write-article
description: "Write new Web Dev Simplified blog articles in Kyle's voice and style. Use when creating a new article, drafting blog post content, or generating an article stub for the blog. Triggers: write article, new blog post, draft post, create article, write a blog post."
argument-hint: "<topic> - the topic or title idea for the new article"
---

# Write Article

Generates new Web Dev Simplified blog articles that match Kyle's established writing voice, structure, and formatting conventions. The article must read as if Kyle wrote it himself.

---

## File Location

Every article lives at:

```
src/pages/YYYY-MM/article-slug/index.mdx
```

Create the `YYYY-MM` and `article-slug` folders as needed. The slug should be all lowercase, hyphen-separated, and descriptive of the topic.

---

## Frontmatter

```yaml
---
layout: "@layouts/BlogPost.astro"
title: "Article Title Here"
date: "YYYY-MM-DD"
description: "One to two sentence description of what the reader will learn."
tags: ["CSS"]
freebie: "css-selector-cheat-sheet"
---
```

### Required Fields

| Field         | Rules                                                                       |
| ------------- | --------------------------------------------------------------------------- |
| `layout`      | Always `"@layouts/BlogPost.astro"`. Never change this.                      |
| `title`       | Quoted string. Titles are specific and direct, not vague or generic.        |
| `date`        | ISO date string. **Must always be a Monday.** Calculate the correct Monday. |
| `description` | One or two sentences in plain language. Not marketing copy.                 |
| `tags`        | Array with one or more valid tags (see below).                              |

### Optional Fields

| Field     | Rules                                                                     |
| --------- | ------------------------------------------------------------------------- |
| `freebie` | Only include if the topic has a relevant freebie. See valid values below. |

### Valid Tags

```
"CSS"  "TypeScript"  "JavaScript"  "React"  "Next.js"
"Node.js"  "Express"  "Technical Discussion"  "Non-Technical Discussion"
"HTML"  "Database"
```

### Valid Freebie Values

```
"web-dev-roadmap"         — Web Dev Roadmap (260+ videos, projects)
"ts-util-cheat-sheet"     — TypeScript Utility Types Cheat Sheet
"accessibility-checklist" — Accessibility Checklist (80+ items)
"css-selector-cheat-sheet"— CSS Selector Cheat Sheet
```

Match the freebie to the article topic. CSS articles often use `css-selector-cheat-sheet`, TypeScript articles often use `ts-util-cheat-sheet`. Omit the field entirely if none fit well.

---

## Article Structure

### 1. Opening Paragraph (no heading)

Start immediately with a paragraph. Do not open with a `## Introduction` heading. The modern style for this blog is to jump straight into content. The opening paragraph should:

- Establish the problem, context, or why this topic exists
- Explain why it matters or why it used to be painful
- Signal what the article will cover
- Be 2-5 sentences

### 2. Video Link (if a YouTube video exists)

If a YouTube video accompanies this article, add this block right after the intro paragraph:

```mdx
_If you prefer to learn visually, check out the video version of this article._  
`youtube: VIDEO_ID`
```

In roundup or overview articles that cover multiple sub-topics, a YouTube embed can also appear at the end of an individual section if there is a dedicated video for that specific sub-topic:

```mdx
_If you want to go deeper on X, check out my full crash course video._
`youtube: VIDEO_ID`
```

### 3. Body Sections

Use `##` for top-level sections and `###` for subsections.

- Explain WHY something exists or matters before explaining HOW it works
- Include code examples for nearly every concept discussed
- Use prose to connect ideas. Bullet lists are for actual enumerable items, not paragraphs in disguise.

**Roundup / overview articles:** If the article covers multiple independent features or topics, add a short orientation sentence after the intro paragraph that tells the reader how the article is ordered. For example: "I am going to start with the features available in all browsers and end with the newest ones that are still rolling out."

### 4. Conclusion Section

End with a short "Conclusion" section. This should recap the main points of the article and reinforce why the topic matters. Do not introduce any new concepts here. The conclusion should be 1-4 sentences max.

This can be skipped if the article already ends cleanly on the last concept without a need for a recap.

---

## Common Imports and Components

Import only what the article actually uses. Imports go after the frontmatter, before the article body.

```mdx
import Tangent from "@blogComponents/lib/Tangent.astro"
import MyComponent from "@blogComponents/myTopic/MyComponent.astro"
```

The `@blogComponents` alias maps to `src/blogComponents/`. Use it for all blog component imports.

### `<Tangent>`

The most commonly used component. Wraps an aside or sidenote that is interesting but not essential to the main flow:

```mdx
<Tangent>
  This is extra context the reader might find interesting, but the article works
  fine without it.
</Tangent>
```

**When to use `<Tangent>`:**

- Cross-links to other blog articles that cover a sub-topic in more depth (e.g., "I wrote a full guide on X — that is the article to read if you want to go deeper")
- Links to supplementary resources like cheat sheets or external docs that are optional further reading
- Historical context or background that helps but is not required to understand the concept

Do NOT leave resource cross-links as plain inline prose when they belong in a `<Tangent>`. If an existing article is the place to go for depth on a topic being summarized, wrap the reference in `<Tangent>`.

Always include the import at the top of the file if `<Tangent>` is used anywhere in the article.

### Custom Interactive Components

Many articles include custom demo components that live in `src/blogComponents/`. These are either Astro (static/simple) or React (interactive/stateful). For full guidance on when to use each, how to structure them, and all available CSS theme variables, see [./references/components.md](./references/components.md).

**Quick rules:**

- Custom components go in `src/blogComponents/<topic>/ComponentName.astro` (or `.jsx`/`.tsx`)
- Prefer `.astro` — only reach for React when the component needs `useState` or complex event-driven re-renders
- React components need `client:load` (or `client:visible`) in MDX to be interactive
- **Never use hardcoded colors.** Always use CSS variables like `var(--theme-purple)` so components work in both light and dark mode

### Images

Images reference this path pattern:

```
/articleAssets/YYYY-MM/article-slug/image-name.ext
```

Use `.webp` for photos, `.svg` for diagrams, `.png` as a fallback. Use `<figure>` + `<figcaption>` when the image needs a caption.

---

## Voice and Style

### How Kyle Writes

Kyle writes in first person and speaks directly to the reader. The tone is knowledgeable but conversational, not formal or academic. He is genuinely enthusiastic about the topics he covers without being hyperbolic.

- **First person "I"**: "In this article I will walk through...", "I really love this property because...", "I know this sounds too simple to be true, but..."
- **Direct "you"**: "You probably know...", "If you have ever tried to...", "I bet you didn't know..."
- **Collective "we" for shared code work**: "Let's take a look at...", "Now we can see that...", "We can now animate..."
- **Explains reasoning first**: Always explains _why_ before _how_. Never just drops code with no context.
- **Cross-links to other articles**: References other blog posts using relative links like `[semantic versioning article](/2020-01/semantic-versioning)`.

### Sentence Patterns Kyle Uses

These patterns appear frequently in Kyle's writing. Use them naturally, not mechanically:

- "This is why..." / "This is where X comes in."
- "As you can see..."
- "I know this sounds [adjective], but..."
- "The only thing you need to be aware of is..."
- "By far the most [superlative]..."
- "Even in this very simple example..."
- "Before we can dive into X, we need to understand Y."
- "This may seem like [minor thing], but it actually..."
- "If you have [done X] then you have probably [encountered Y]."
- "Tired of [frustration]? [Solution statement]."
- "This is not ideal since..."
- "This can make it difficult to..."

### Formatting

- Inline code: backticks around every property, function, variable, or keyword
- Code blocks: always include the language (`css`, `ts`, `js`, `jsx`, `tsx`, `html`, `json`)
- Images with captions: use `<figure>` + `<figcaption>` tags
- Bold (`**text**`): only for genuinely important terms being introduced, not random emphasis
- Bullet lists: only for actual lists of items, options, or steps — not as a replacement for prose

---

## What NOT to Do

### Anti-Patterns That Sound Like AI

These are the most important rules. Violating them is what makes AI-written content obvious.

**Punctuation and symbols:**

- No em dashes (`—`). Never. Use a comma, a period, or restructure the sentence instead.
- No emojis. Not in headings, not in text, not anywhere in the article.

**Banned words and phrases:**

- "It's worth noting that..." → just say it
- "It's important to note that..." → just say it
- "In the realm of..." → delete this
- "Unlock [potential/power/capability]" → say what it actually does
- "Game-changing" / "Revolutionary" (as casual hyperbole) → be specific about why it matters
- "Furthermore" / "Moreover" / "Additionally" as sentence starters → restructure
- "Absolutely!" / "Great!" / "Certainly!" / "Of course!" → never as affirmations
- "I hope this article was helpful!" / "Happy coding!" / "Feel free to reach out!" → never close with platitudes
- "Without further ado" / "Let's get started!" → delete
- "In this comprehensive guide..." / "In today's digital landscape..." → never open this way
- "Are you looking to..." as an opener → never

**Structure anti-patterns:**

- Do not write 5+ bullet points where prose would be more natural
- Do not bold random phrases mid-sentence just for visual interest
- Do not echo the article title as the first line of the body
- Do not write empty transition sentences like "Now let's move on to the next section."
- Do not add code comments that substitute for prose explanation (e.g., `// This is the important part`)
- Do not over-hedge: avoid "might potentially", "could possibly", "may or may not"
- Do not use passive voice when active voice is clearer

---

## Example: Good vs. Bad Opening

**Good:**

> For years, `border-radius` has been the only tool we have for shaping corners in CSS. It is genuinely powerful, but it only ever gives us one type of corner: a circular or elliptical arc. That changes with the new `corner-shape` CSS property, which lets you control the actual shape of a corner, not just its size.

**Good:**

> If you are reading this then chances are your head is full of amazing project ideas, but when you sit down to build them you always get stuck, give up, or just never finish. This is the most common problem developers face, but this problem can actually be solved quite easily with just a little bit of planning.

**Bad (AI-style):**

> In today's rapidly evolving web development landscape, it's important to note that staying ahead of the curve is more important than ever. In this comprehensive guide, we will delve into the fascinating realm of CSS and unlock the full potential of modern styling techniques. Let's dive in!

---

## Browser Support

For any feature that does not yet have baseline support across all modern browsers:

- Link the actual caniuse percentage inline rather than saying "check caniuse for the current status". Write it as: `[84% of browsers](https://caniuse.com/feature-slug) supporting this feature as of [month year]`.
- If the feature is fully supported in all major browsers (Chrome, Firefox, Safari) but the global % is dragged down by users on old versions, add: "it is fully supported in all major browsers as of [date] so once users update their browser this will quickly climb to 90+% support."
- If a specific major browser has zero support (most commonly Safari), call it out by name: "This is because Safari has no support for this feature at all yet."
- If the feature is not yet baseline but a reliable polyfill exists, mention it at the end of the section: "Luckily, there are [polyfills](npm-link) available, so you can start using it today."

---

## Pre-Publish Checklist

- [ ] `date` is a Monday
- [ ] All required frontmatter fields are present
- [ ] `freebie` is only included if a relevant one exists
- [ ] No em dashes (`—`) anywhere in the article
- [ ] No emojis anywhere in the article
- [ ] No banned AI phrases (check the anti-patterns list above)
- [ ] Every code block has a language specifier
- [ ] Cross-links to related blog articles where appropriate
- [ ] Resource cross-links and optional further reading are wrapped in `<Tangent>`, not left as inline prose
- [ ] `import Tangent` is present if `<Tangent>` is used anywhere
- [ ] Browser support for non-baseline features uses inline caniuse percentage links, not generic "check caniuse" prompts
- [ ] Images follow the `/articleAssets/YYYY-MM/slug/image.ext` path pattern

---

## Save Original Copy

After writing the article, **always** save an exact copy of the AI-generated output to:

```
skill-out/YYYY-MM/article-slug/original.mdx
```

This snapshot is used by the `refine-article-skill` to compare against the user's manual edits and extract learnings. Without it, the refinement workflow cannot function.

The `YYYY-MM` and `article-slug` must match the article's actual location in `src/pages/`. Copy the full file contents — do not summarize or truncate.
