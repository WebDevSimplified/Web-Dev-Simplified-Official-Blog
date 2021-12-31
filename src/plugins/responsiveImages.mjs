import { visit } from "unist-util-visit"

export default function responsiveImages() {
  return transformer
}

function transformer(tree) {
  visit(tree, "image", (node, index, parent) => {
    node.data = node.data ?? {}
    node.data.hProperties = node.data.hProperties ?? {}
    node.data.hProperties.className = node.data.hProperties.className ?? []
    node.data.hProperties.className.push("responsive-img")
  })
}
