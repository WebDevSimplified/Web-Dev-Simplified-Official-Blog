import React from "react"
import { rhythm } from "../utils/typography"

const TAG_STYLES = {
  display: "flex",
  alignItems: "center",
  borderRadius: ".25em",
  marginRight: rhythm(0.5),
}

const TAG_NAME_STYLES = {
  padding: `0 ${rhythm(0.3)}`,
  borderRadius: ".25em 0 0 .25em",
  borderRight: "none",
  border: "1px solid black",
}

const TAG_COUNT_STYLES = {
  display: "flex",
  alignItems: "center",
  fontSize: ".8em",
  backgroundColor: "black",
  color: "white",
  borderRadius: "0 .25em .25em 0",
  padding: "0 .5em",
  alignSelf: "stretch",
}

const INPUT_STYLES = {
  opacity: 0,
  position: "absolute",
  left: "-99999px",
}

export default function Tag({ tag, onTagSelect, marginTop = rhythm(0.5) }) {
  return (
    <>
      {onTagSelect && (
        <input
          style={INPUT_STYLES}
          type="checkbox"
          checked={tag.selected}
          onChange={onTagSelect}
          className={onTagSelect && "tag"}
          id={`tag-${tag.name}`}
          value={tag.name}
        />
      )}
      <label
        htmlFor={onTagSelect && `tag-${tag.name}`}
        style={{ ...TAG_STYLES, marginTop: marginTop }}
      >
        <span style={TAG_NAME_STYLES}>{tag.name}</span>
        {tag.totalCount && <div style={TAG_COUNT_STYLES}>{tag.totalCount}</div>}
      </label>
    </>
  )
}
