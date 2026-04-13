import { useState, useEffect, useRef } from "react"

const SHAPES = [
  { id: "round", label: "round" },
  { id: "squircle", label: "squircle" },
  { id: "square", label: "square" },
  { id: "bevel", label: "bevel" },
  { id: "scoop", label: "scoop" },
  { id: "notch", label: "notch" },
  { id: "superellipse", label: "superellipse()" },
]

const WARNING_CSS = `
  .cs-playground-warning {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
  }
  @supports not (corner-shape: round) {
    .cs-playground-warning {
      display: flex;
    }
  }
`

const styles = {
  wrapper: {
    position: "relative",
    border: "1px solid var(--theme-divider)",
    borderRadius: "0.5rem",
    overflow: "hidden",
    margin: "1.5rem 0",
  },
  warning: {
    position: "absolute",
    inset: 0,
    backgroundColor: "hsl(41, 100%, 90%)",
    border: "2px solid var(--theme-yellow)",
    zIndex: 10,
    padding: "1.5rem",
    textAlign: "center",
  },
  warningIcon: {
    fontSize: "1.25rem",
    fontWeight: "900",
    width: "2rem",
    height: "2rem",
    borderRadius: "50%",
    backgroundColor: "hsl(41, 80%, 40%)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  warningTitle: {
    fontSize: "1.125rem",
    fontWeight: "700",
    color: "hsl(41, 80%, 20%)",
    margin: 0,
  },
  warningCode: {
    backgroundColor: "hsl(41, 100%, 80%)",
    padding: "0.1em 0.3em",
    borderRadius: "0.2em",
    fontSize: "0.9em",
    fontFamily: "monospace",
  },
  warningText: {
    color: "hsl(41, 60%, 30%)",
    margin: 0,
    maxWidth: "45ch",
    fontSize: "0.875rem",
  },
  inner: {
    padding: "1.5rem",
    display: "flex",
    gap: "2rem",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  controls: {
    flex: "1 1 220px",
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },
  preview: {
    flex: "1 1 220px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  },
  controlGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  controlLabel: {
    fontWeight: "600",
    fontSize: "0.875rem",
    color: "var(--theme-text)",
  },
  controlSubLabel: {
    fontSize: "0.75rem",
    color: "var(--theme-text-lighter)",
    fontFamily: "monospace",
  },
  shapeButtons: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
  },
  slider: {
    width: "100%",
    accentColor: "var(--theme-accent)",
    cursor: "pointer",
  },
  previewBox: {
    width: "160px",
    height: "160px",
    backgroundColor: "var(--theme-accent)",
  },
  codeOutput: {
    backgroundColor: "var(--theme-code-bg)",
    color: "var(--theme-code-text)",
    padding: "0.75rem 1rem",
    borderRadius: "0.375rem",
    fontFamily: "monospace",
    fontSize: "0.8rem",
    whiteSpace: "pre",
    width: "100%",
    overflowX: "auto",
    boxSizing: "border-box",
  },
  hint: {
    fontSize: "0.75rem",
    color: "var(--theme-text-lighter)",
    fontStyle: "italic",
    marginTop: "0.25rem",
  },
}

function ShapeButton({ id, label, selected, onClick }) {
  return (
    <button
      onClick={() => onClick(id)}
      style={{
        padding: "0.4rem 0.8rem",
        borderRadius: "0.25rem",
        border: "2px solid var(--theme-accent)",
        backgroundColor: selected ? "var(--theme-accent)" : "transparent",
        color: selected ? "var(--theme-bg)" : "var(--theme-text)",
        cursor: "pointer",
        fontFamily: "monospace",
        fontSize: "0.85rem",
        transition: "all 0.15s ease",
        fontWeight: selected ? "600" : "400",
      }}
    >
      {label}
    </button>
  )
}

export default function CornerShapePlayground() {
  const [shape, setShape] = useState("round")
  const [borderRadius, setBorderRadius] = useState(40)
  const [superellipseN, setSuperellipseN] = useState(1.5)
  const boxRef = useRef(null)

  const cornerShapeValue =
    shape === "superellipse" ? `superellipse(${superellipseN})` : shape

  // Apply CSS properties directly to DOM since React doesn't know about corner-shape
  useEffect(() => {
    if (!boxRef.current) return
    boxRef.current.style.setProperty("border-radius", `${borderRadius}px`)
    boxRef.current.style.setProperty("corner-shape", cornerShapeValue)
  }, [borderRadius, cornerShapeValue])

  const cssCode = `border-radius: ${borderRadius}px;\ncorner-shape: ${cornerShapeValue};`

  return (
    <div style={styles.wrapper}>
      <style dangerouslySetInnerHTML={{ __html: WARNING_CSS }} />
      <div className="cs-playground-warning" style={styles.warning}>
        <div style={styles.warningIcon}>!</div>
        <p style={styles.warningTitle}>
          Your browser doesn't support{" "}
          <code style={styles.warningCode}>corner-shape</code> yet
        </p>
        <p style={styles.warningText}>
          This interactive demo requires browser support for the{" "}
          <code style={styles.warningCode}>corner-shape</code> CSS property. You
          can interact with the controls, but the preview will only show
          standard rounded corners.
        </p>
      </div>

      <div style={styles.inner}>
        <div style={styles.controls}>
          {/* Shape selector */}
          <div style={styles.controlGroup}>
            <div style={styles.controlLabel}>corner-shape</div>
            <div style={styles.shapeButtons}>
              {SHAPES.map(({ id, label }) => (
                <ShapeButton
                  key={id}
                  id={id}
                  label={label}
                  selected={shape === id}
                  onClick={setShape}
                />
              ))}
            </div>
          </div>

          {/* Superellipse N slider */}
          {shape === "superellipse" && (
            <div style={styles.controlGroup}>
              <div style={styles.controlLabel}>
                n value:{" "}
                <span style={styles.controlSubLabel}>{superellipseN}</span>
              </div>
              <input
                type="range"
                min="-4"
                max="4"
                step="0.1"
                value={superellipseN}
                onChange={e => setSuperellipseN(Number(e.target.value))}
                style={styles.slider}
                aria-label="Superellipse n value"
              />
            </div>
          )}

          {/* Border radius slider */}
          <div style={styles.controlGroup}>
            <div style={styles.controlLabel}>
              border-radius:{" "}
              <span style={styles.controlSubLabel}>{borderRadius}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              value={borderRadius}
              onChange={e => setBorderRadius(Number(e.target.value))}
              style={styles.slider}
              aria-label="Border radius in pixels"
            />
          </div>
        </div>

        <div style={styles.preview}>
          <div ref={boxRef} style={styles.previewBox} aria-hidden="true" />
          <pre style={styles.codeOutput}>{cssCode}</pre>
        </div>
      </div>
    </div>
  )
}
