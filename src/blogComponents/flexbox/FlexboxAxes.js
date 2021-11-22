import React from "react"

const MAIN_AXIS_STYLES = {
  backgroundColor: "lime",
  width: "100%",
  gridColumn: 1 / 1,
  gridRow: 1 / 1,
  height: "5px",
}

const CROSS_AXIS_STYLES = {
  backgroundColor: "yellow",
  gridColumn: 1 / 1,
  gridRow: 1 / 1,
  height: "100%",
  width: "5px",
}

const MAIN_AXIS_LABEL_STYLES = {
  fontWeight: "bold",
  gridColumn: 1 / 1,
  gridRow: 1 / 1,
  fontSize: "1.5rem",
  justifySelf: "start",
  transform: "translateY(-50%) translateX(5px)",
  color: "lime",
}

const CROSS_AXIS_LABEL_STYLES = {
  fontWeight: "bold",
  gridColumn: 1 / 1,
  gridRow: 1 / 1,
  fontSize: "1.5rem",
  transform: "translateX(calc(50% + 5px))",
  alignSelf: "start",
  color: "yellow",
}

export default function FlexboxAxes() {
  return (
    <div
      style={{
        height: "100px",
        display: "grid",
        placeItems: "center",
        border: "2px dashed black",
        backgroundColor: "#00AAFF",
        marginBottom: "1rem",
      }}
    >
      <div style={MAIN_AXIS_LABEL_STYLES}>Main Axis</div>
      <div style={MAIN_AXIS_STYLES}></div>
      <div style={CROSS_AXIS_LABEL_STYLES}>Cross Axis</div>
      <div style={CROSS_AXIS_STYLES}></div>
    </div>
  )
}
