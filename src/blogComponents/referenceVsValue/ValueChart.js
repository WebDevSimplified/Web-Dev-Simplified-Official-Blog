import React from "react"
import "./referenceVsValue.css"

export default function ValueChart({ variables, memory = [] }) {
  return (
    <div style={{ display: "flex", alignItems: "stretch" }}>
      <table
        className="value-chart"
        style={{
          backgroundColor: "#AA9DE6",
          marginBottom: "1.75rem",
          flexGrow: 1,
          flexBasis: "50%",
        }}
      >
        <thead>
          <tr>
            <th>Variable</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(variables).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {memory.length > 0 && (
        <div
          style={{
            backgroundColor: "#AA9DE6",
            marginLeft: ".25rem",
            marginBottom: "1.75rem",
            flexGrow: 1,
            flexBasis: "50%",
          }}
        >
          <table className="value-chart" style={{ marginBottom: 0 }}>
            <thead>
              <tr>
                {<th>Address</th>}
                {<th>Value</th>}
              </tr>
            </thead>
            <tbody>
              {memory.map(([key, value]) => {
                const className =
                  memory.length < Object.entries(variables).length
                    ? "border-bottom"
                    : ""
                return (
                  <tr key={key}>
                    <td className={className}>{key}</td>
                    <td className={className}>{JSON.stringify(value)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
