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

const AXIS_STYLES = {
  position: "absolute",
  width: "5px",
  height: "5px",
}

const MAIN_AXIS_STYLES = {
  ...AXIS_STYLES,
  backgroundColor: "lime",
  width: "100%",
  top: "50%",
  transform: "translateY(-50%)",
}

const CROSS_AXIS_STYLES = {
  ...AXIS_STYLES,
  backgroundColor: "yellow",
  height: "100%",
  left: "50%",
  transform: "translateX(-50%)",
}

const MAIN_AXIS_LABEL_STYLES = {
  position: "absolute",
  fontWeight: "bold",
  left: "5px",
  fontSize: "1.5rem",
  bottom: "calc(50%)",
  color: "lime",
}

const CROSS_AXIS_LABEL_STYLES = {
  position: "absolute",
  fontWeight: "bold",
  fontSize: "1.5rem",
  top: "0",
  left: "calc(50% + 5px)",
  color: "yellow",
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
  withMainAxis = false,
  withCrossAxis = false,
  variedHeight = false,
  elementProps = [],
  width = withCrossAxis || withMainAxis ? "100%" : "20%",
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
      {withMainAxis && (
        <>
          <div style={MAIN_AXIS_LABEL_STYLES}>Main Axis</div>
          <div style={MAIN_AXIS_STYLES} />
        </>
      )}
      {withCrossAxis && (
        <>
          <div style={CROSS_AXIS_LABEL_STYLES}>Cross Axis</div>
          <div style={CROSS_AXIS_STYLES} />
        </>
      )}
      {[...new Array(3)].map((_, n) => (
        <div
          style={{
            ...FLEX_ITEM_STYLES,
            width,
            height: variedHeight ? `${25 * (n + 3)}px` : height,
            ...elementProps[n],
          }}
        >
          {!withCrossAxis && !withMainAxis && n + 1}
        </div>
      ))}
    </div>
  )
}
