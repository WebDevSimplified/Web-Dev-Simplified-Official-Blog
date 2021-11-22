import React from "react"

const FLEX_CONTAINER_STYLES = {
  display: "flex",
  border: "2px dashed black",
  marginBottom: "1rem",
  position: "relative",
  height: "100%",
}

const FLEX_ITEM_STYLES = {
  backgroundColor: "#00AAFF",
  border: "1px solid black",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "2.5rem",
  color: "white",
}

export default function FlexboxGeneric({
  direction = "row",
  justify = "flex-start",
  align = "stretch",
  wrap = "nowrap",
  gap,
  rowGap,
  columnGap,
  alignContent = "normal",
  variedHeight = false,
  elementProps = [],
  width = "20%",
  height = "100px",
}) {
  const boxStyles = {
    ...FLEX_CONTAINER_STYLES,
    justifyContent: justify,
    alignItems: align,
    flexDirection: direction,
    flexWrap: wrap,
    alignContent,
  }
  if (gap) boxStyles.gap = gap
  if (rowGap) boxStyles.rowGap = rowGap
  if (columnGap) boxStyles.columnGap = columnGap
  return (
    <div style={boxStyles}>
      {[...new Array(3)].map((_, n) => (
        <div
          style={{
            ...FLEX_ITEM_STYLES,
            width,
            height: variedHeight ? `${25 * (n + 3)}px` : height,
            ...elementProps[n],
          }}
        >
          {n + 1}
        </div>
      ))}
    </div>
  )
}
