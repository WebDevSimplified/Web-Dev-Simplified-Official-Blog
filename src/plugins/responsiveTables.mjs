import { visit } from "unist-util-visit"

export default function responsiveTables() {
  return transformer
}

function transformer(tree) {
  visit(tree, "table", (node, index, parent) => {
    const wrapper = {
      type: "containerDirective", // or use 'parent' depending on your toolchain
      data: {
        hName: "div",
        hProperties: { className: ["responsive-table"] },
      },
      children: [node],
    }

    parent.children[index] = wrapper
  })
}
