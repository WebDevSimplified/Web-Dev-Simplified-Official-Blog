import React from "react"

const WHEEL_STYLES = {
  borderRadius: "100%",
  height: "100%",
}

const CONTAINER_STYLES = {
  margin: "auto",
  padding: "1rem",
  aspectRatio: "1/1",
  maxHeight: "33vh",
}

export default function ColorWheel() {
  const conicGradients = Array(30)
    .fill("")
    .map((v, index) => `hsl(${index * 12}, 100%, 50%)`)
    .join(", ")
  return (
    <div style={CONTAINER_STYLES}>
      <div
        style={{
          ...WHEEL_STYLES,
          background: `conic-gradient(${conicGradients})`,
        }}
      ></div>
    </div>
  )
}
