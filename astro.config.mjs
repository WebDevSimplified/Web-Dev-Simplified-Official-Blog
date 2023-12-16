// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference
// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.
import youtubeEmbed from "./src/plugins/youtubeEmbed.mjs"
import responsiveImages from "./src/plugins/responsiveImages.mjs"
import myRemarkShiki from "./src/plugins/myRemarkShiki.mjs"
import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
import mdx from "@astrojs/mdx"
import react from "@astrojs/react" // @ts-check

// https://astro.build/config
export default defineConfig(
  /** @type {import('astro').AstroUserConfig} */
  {
    integrations: [react(), sitemap(), mdx()],
    site: "https://blog.webdevsimplified.com",
    markdown: {
      syntaxHighlight: false,
      // TODO: Add official Shiki integration when line highlighting is supported
      remarkPlugins: [myRemarkShiki, youtubeEmbed, responsiveImages],
    },
  }
)

// TODO: Check to see if my plugins can be replaced with official integrations.
// TODO: Implement experimental assets integration
// TODO: Move over to the content folder
// TODO: Add TS Support
// TODO: Add analytic conversion tracking (for things like newsletter signups)
// TODO: Optimize/Shrink Images
