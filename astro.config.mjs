// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.

import youtubeEmbed from "./src/plugins/youtubeEmbed.mjs"
import responsiveImages from "./src/plugins/responsiveImages.mjs"
import codeHighlightPre from "./src/plugins/codeHighlightPre.mjs"

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
  // Enable the Preact renderer to support Preact JSX components.
  renderers: ["@astrojs/renderer-preact"],
  buildOptions: {
    site: "https://blog.webdevsimplified.com",
    sitemap: true,
  },
  markdownOptions: {
    render: [
      "@astrojs/markdown-remark",
      {
        remarkPlugins: [
          ["remark-gfm"],
          [{ default: codeHighlightPre }],
          [
            "remark-prism",
            {
              plugins: ["prismLineHighlightModified.js"],
            },
          ],
          [{ default: youtubeEmbed }],
          [{ default: responsiveImages }],
        ],
      },
    ],
  },
})

// TODO: Add Google Analytics
