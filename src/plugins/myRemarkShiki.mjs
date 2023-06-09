import remarkShiki from "@stefanprobst/remark-shiki"
import * as shiki from "shiki"
import rangeParser from "parse-numeric-range"

const shikiHighlighter = await shiki.getHighlighter({ theme: "dark-plus" })

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

export default [
  remarkShiki,
  {
    highlighter: shikiHighlighter,
    parseMeta,
  },
]
