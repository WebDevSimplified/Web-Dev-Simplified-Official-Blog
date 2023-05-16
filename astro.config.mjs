// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference
// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.
import youtubeEmbed from "./src/plugins/youtubeEmbed.mjs"
import responsiveImages from "./src/plugins/responsiveImages.mjs"
import codeHighlightPre from "./src/plugins/codeHighlightPre.mjs"
import preact from "@astrojs/preact" // @ts-check
import remarkShiki from "@stefanprobst/remark-shiki"
import * as shiki from "shiki"
import rangeParser from "parse-numeric-range"

import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"

// https://astro.build/config
import mdx from "@astrojs/mdx"

const shikiHighlighter = await shiki.getHighlighter({ theme: "dark-plus" })

// https://astro.build/config
export default defineConfig(
  /** @type {import('astro').AstroUserConfig} */
  {
    integrations: [preact(), sitemap(), mdx()],
    site: "https://blog.webdevsimplified.com",
    markdown: {
      syntaxHighlight: false,
      // TODO: Add official Shiki integration when line highlighting is supported
      remarkPlugins: [
        [
          remarkShiki,
          {
            highlighter: shikiHighlighter,
            parseMeta,
          },
        ],
        youtubeEmbed,
        responsiveImages,
      ],
    },
  }
)

function parseMeta(meta, { lang }) {
  if (lang != null) parseLang(lang)

  if (meta == null) return undefined
  if (meta.length === 0) return undefined

  return rangeParser(meta.replaceAll(/[{}]/g, "")).map(line => {
    return { line, classes: ["highlighted-line"] }
  })
}

function parseLang(lang) {
  if (shikiHighlighter.getLoadedLanguages().includes(lang)) return

  console.error(`The language "${lang}" doesn't exist`)
}

// TODO: Check to see if my plugins can be replaced with official integrations.
// TODO: Implement experimental assets integration
// TODO: Move over to the content folder
// TODO: Add TS Support
