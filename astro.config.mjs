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

import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"

// https://astro.build/config
import mdx from "@astrojs/mdx"

// https://astro.build/config
export default defineConfig(
  /** @type {import('astro').AstroUserConfig} */
  {
    integrations: [preact(), sitemap(), mdx()],
    site: "https://blog.webdevsimplified.com",
    markdown: {
      // TODO: Maybe use shiki and see if it is better and has line highlighting.
      syntaxHighlight: "prism",
      remarkPlugins: ["remark-gfm", youtubeEmbed, responsiveImages],
    },
  }
)

// TODO: Add line highlighting to code blocks.
// TODO: Check to see if my plugins can be replaced with official integrations.
// TODO: Move over to the content folder
// TODO: Add TS Support
