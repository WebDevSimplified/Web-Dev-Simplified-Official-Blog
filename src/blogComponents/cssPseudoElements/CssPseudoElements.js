import React from "react"
import "./cssPseudoElements.css"

export function Selection({ children }) {
  return <p class="CSS_PSEUDO_ELEMENT-selection">{children}</p>
}

export function FirstLetter({ children }) {
  return <p class="CSS_PSEUDO_ELEMENT-first-letter">{children}</p>
}

export function FirstLine({ children }) {
  return <p class="CSS_PSEUDO_ELEMENT-first-line">{children}</p>
}

export function Tooltip() {
  return (
    <button className="CSS_PSEUDO_ELEMENT-tooltip" data-tooltip="Hovered">
      Hover Me
    </button>
  )
}
