import React from "react"

function arrowStyles(transform) {
  return {
    transform: transform,
    margin: "20px",
    maxHeight: "150px",
    width: "100%",
  }
}

export default function CssTransform({ red, green, blue }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        style={arrowStyles(red)}
      >
        <circle cx="12" cy="12" r="12" style={{ fill: "red" }} />
        <path
          d="M14 12v5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-5H8a1 1 0 0 1-.7-1.7l4-4a1 1 0 0 1 1.4 0l4 4A1 1 0 0 1 16 12h-2z"
          style={{ fill: "white" }}
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        style={arrowStyles(green)}
      >
        <circle cx="12" cy="12" r="12" style={{ fill: "green" }} />
        <path
          d="M14 12v5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-5H8a1 1 0 0 1-.7-1.7l4-4a1 1 0 0 1 1.4 0l4 4A1 1 0 0 1 16 12h-2z"
          style={{ fill: "white" }}
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        style={arrowStyles(blue)}
      >
        <circle cx="12" cy="12" r="12" style={{ fill: "blue" }} />
        <path
          d="M14 12v5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-5H8a1 1 0 0 1-.7-1.7l4-4a1 1 0 0 1 1.4 0l4 4A1 1 0 0 1 16 12h-2z"
          style={{ fill: "white" }}
        />
      </svg>
    </div>
  )
}
