import { visit } from "unist-util-visit"
import { u } from "unist-builder"

export default function youtubeEmbed() {
  return transformer
}

function transformer(tree) {
  visit(tree, "inlineCode", (node, index, parent) => {
    const { start, id } =
      node.value.match(/youtube:\s*(?<id>[^?]*)(\?start=(?<start>.*))?/)
        ?.groups || {}
    if (id == null) return
    const beforeChildren = parent.children.slice(0, index)
    const afterChildren = parent.children.slice(index + 1)
    const parentClone = { ...parent }
    parent.type = "element"
    parent.tagName = "div"
    parent.children = []
    if (beforeChildren.length > 0) {
      parent.children.push({ ...parentClone, children: beforeChildren })
    }
    parent.children.push(
      u("html", {
        value: createIframe(id, start),
      })
    )
    if (afterChildren.length > 0) {
      parent.children.push({ ...parentClone, children: afterChildren })
    }
  })
}

function createIframe(id, start) {
  const startString = start ? `&start=${start}` : ""

  return `
    <div style="max-width: 600px; margin: 1rem auto;">
      <div style="padding-bottom: 56.4286%; position: relative; height: 0; overflow: hidden;">
        <iframe
          src="https://www.youtube-nocookie.com/embed/${id}?rel=0${startString}"
          style="border: 0; width: 100%; height: 100%; top: 0; left: 0; position: absolute;"
          loading="lazy"
          allowfullscreen
        ></iframe>
      </div>
    </div>`
}
