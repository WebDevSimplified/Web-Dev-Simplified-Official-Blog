import React from "react"

const FLEX_CONTAINER_STYLES = {
  display: "flex",
  height: "150px",
  width: "300px",
  backgroundColor: "#00AAFF",
  marginBottom: "1rem",
}

const FLEX_ITEM_STYLES = {
  margin: "10px",
  backgroundColor: "white",
  border: "1px solid black",
}

export default function Flexbox({
  direction = "row",
  justify = "flex-start",
  align = "flex-start",
}) {
  return (
    <div
      style={{
        ...FLEX_CONTAINER_STYLES,
        justifyContent: justify,
        alignItems: align,
        flexDirection: direction,
      }}
    >
      <div style={{ ...FLEX_ITEM_STYLES, width: "50px", height: "50px" }}></div>
      <div style={{ ...FLEX_ITEM_STYLES, width: "75px", height: "75px" }}></div>
      <div style={{ ...FLEX_ITEM_STYLES, width: "50px", height: "50px" }}></div>
    </div>
  )
}
