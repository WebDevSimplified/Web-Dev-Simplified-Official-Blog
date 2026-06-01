---
name: refine-write-article-skill
description: "Analyze manual edits made to an AI-generated blog article and update the write-article skill with the learnings. Use after manually correcting an AI-drafted article to improve future article generation. Triggers: refine skill, learn from edits, update skill from article, improve article skill, analyze my edits."
argument-hint: "<path-to-article> - optional path to the article index.mdx (defaults to current file)"
---

# Refine Write Article Skill

Compares what the AI generated against what you actually kept, analyzes the pattern of changes, and updates the `write-article` skill so future articles need fewer corrections.

---

## File Locations

```
Original snapshots:  skill-out/YYYY-MM/slug/original.mdx   ← gitignored, read directly
Live articles:       src/pages/YYYY-MM/slug/index.mdx

Skill files to update:
  .agents/skills/write-article/SKILL.md
  .agents/skills/write-article/references/components.md

Copies to keep in sync:
  .github/skills/write-article/SKILL.md
  .github/skills/write-article/references/components.md
  .claude/skills/write-article/SKILL.md
  .claude/skills/write-article/references/components.md
```

---

## Workflow

### Step 1 — Identify the article

Determine which article to analyze:

1. If an article path was passed as an argument, use it.
2. Otherwise, use the currently open file (should be an `index.mdx`).
3. Confirm the file is inside `src/pages/` before proceeding.

### Step 2 — Load the original and current versions

Derive the snapshot path from the article path. Given an article at:

```
src/pages/YYYY-MM/article-slug/index.mdx
```

The original AI-generated snapshot lives at:

```
skill-out/YYYY-MM/article-slug/original.mdx
```

> **Important:** The `skill-out/` directory is listed in `.gitignore` and will not appear in any git-aware file listing. Use the `read_file` tool directly with the absolute path — do not use git commands, git diff, or any tool that filters gitignored files. The file is present on disk even though git ignores it.

Read both files in full. If `original.mdx` does not exist, tell the user it was not saved when the article was generated and stop — there is nothing to compare against. Do not fall back to git.

### Step 3 — Categorize every change

Read the diff line by line and bucket each change into one or more of these categories. A single edit can belong to multiple categories.

| Category                 | What to look for                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------- |
| **Voice**                | Rewrites to sentence structure, word swaps, changes to how "I/you/we" is used, removal of AI-ish phrases |
| **Tone**                 | Changes to enthusiasm level, hedging removed or added, more/less direct                                  |
| **Structure**            | Sections reordered, headings renamed/removed/added, intro rewritten                                      |
| **Anti-pattern removal** | Em dashes replaced, emojis deleted, banned phrases removed ("delve", "leverage", etc.)                   |
| **Code examples**        | Code added, removed, simplified, or corrected                                                            |
| **Component decisions**  | Inline HTML replaced with a component, or vice versa; component props changed                            |
| **Frontmatter**          | Title, description, tags, or freebie changed                                                             |
| **Factual/technical**    | Corrections to accuracy, not style                                                                       |

Ignore pure factual/technical corrections (category 8) — those are article-specific and do not teach the skill anything reusable.

### Step 4 — Extract reusable rules

For each non-technical change, ask: **"If the AI had known this rule upfront, would it have written this correctly the first time?"**

If yes, it is a candidate for a new or updated rule.

Group candidates by category and write them as actionable directives, not observations. Examples:

- Observation (bad): "Kyle removed 'It is worth noting that' three times."
- Rule (good): Add `"It is worth noting that..."` to the banned phrases list with the correction → just say the thing directly.

- Observation (bad): "Kyle restructured the intro."
- Rule (good): "The intro should state the problem and its cost in the first sentence. Do not lead with historical context or background."

### Step 5 — Evaluate impact

Before writing anything, score each candidate rule:

- **High impact**: Appeared more than once in this diff, OR is a pattern that matches other known AI tendencies
- **Low impact**: One-off phrasing preference that may not generalize

Only add **high impact** rules to the skill. Low impact observations can be noted as a comment to the user but should not clutter the skill.

### Step 6 — Update the skill files

Edit the appropriate files based on what was learned:

**For voice, tone, structure, and anti-pattern rules → `SKILL.md`**

Add new banned phrases to the "Banned words and phrases" list. Add new structural rules to the relevant section. If a pattern contradicts an existing rule, update the existing rule rather than adding a duplicate.

**For component rules → `references/components.md`**

If changes reveal a preference for when to use inline HTML vs a component, or a specific structural pattern, add it to the relevant section.

**For frontmatter rules → `SKILL.md` frontmatter section**

If the title, description, or tags were systematically wrong, refine those guidelines.

### Step 7 — Sync skill copies

After updating the canonical skill files, copy them to the `.github` and `.claude` locations:

```bash
cp .agents/skills/write-article/SKILL.md .github/skills/write-article/SKILL.md
cp .agents/skills/write-article/SKILL.md .claude/skills/write-article/SKILL.md
cp .agents/skills/write-article/references/components.md .github/skills/write-article/references/components.md
cp .agents/skills/write-article/references/components.md .claude/skills/write-article/references/components.md
```

### Step 8 — Report back

Summarize what was learned in a short report using this format:

```
## Skill Update Report

**Article analyzed:** src/pages/YYYY-MM/slug/index.mdx
**Original snapshot:** skill-out/YYYY-MM/slug/original.mdx
**Total changes analyzed:** N

### Rules Added
- [Section updated]: Description of the new rule

### Rules Updated
- [Section updated]: What changed and why

### Patterns Noted (not added — too specific)
- Description of one-off changes that were not generalized
```

---

## Decision Guide: Add to Skill vs. Skip

Use this when deciding whether an edit is worth encoding:

| Edit type                                          | Add to skill?                                                         |
| -------------------------------------------------- | --------------------------------------------------------------------- |
| Replaced "leverage" with "use"                     | Yes — add to banned words                                             |
| Removed an em dash                                 | Yes — reinforce the no-em-dash rule with the specific context         |
| Rewrote the intro to lead with the problem         | Yes — add as a structural rule if not already present                 |
| Changed a specific CSS value in a code example     | No — factual fix, not reusable                                        |
| Renamed a heading                                  | Maybe — only if the AI's naming pattern is systematically off         |
| Removed a "Conclusion" section                     | Yes if the current rule says to include one; update the rule          |
| Simplified a React component to an Astro component | Yes — add to the Astro vs React decision table                        |
| Added a `<Tangent>` around a paragraph             | Maybe — only if there is a clear pattern for what belongs in tangents |
| Changed "Let's" to "Let us"                        | No — too minor, does not affect reading experience                    |
| Deleted the closing sentence entirely              | Yes if it was a platitude; add it to the banned phrases list          |
