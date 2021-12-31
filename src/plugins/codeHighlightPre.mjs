import { visit } from "unist-util-visit"
import { u } from "unist-builder"
import fs from "fs"
import path from "path"

export default function codeHighlightPre() {
  return transformerPre
}

function transformerPre(tree, file) {
  const src = path.resolve("src/plugins/prismLineHighlightModified.js")
  const dest = path.resolve("node_modules/prismLineHighlightModified.js")
  try {
    fs.unlinkSync(dest)
  } catch {}
  fs.copyFileSync(src, dest)

  visit(tree, "code", (node, index, parent) => {
    if (!node.meta) return
    node.lang = `${node.lang}[data-line=${node.meta.replace(/[{}]/g, "")}]`
  })
}
