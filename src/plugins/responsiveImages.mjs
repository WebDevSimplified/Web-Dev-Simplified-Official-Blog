import { visit } from "unist-util-visit"

export default function responsiveImages() {
  return transformer
}

function transformer(tree) {
  visit(tree, "image", (node, index, parent) => {
    parent.data = parent.data ?? {}
    parent.data.hProperties = parent.data.hProperties ?? {}
    parent.data.hProperties.className = parent.data.hProperties.className ?? []
    parent.data.hProperties.className.push("responsive-img")
  })
}
