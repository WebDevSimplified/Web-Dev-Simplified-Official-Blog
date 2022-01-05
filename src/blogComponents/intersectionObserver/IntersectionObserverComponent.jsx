import { useState, useCallback, useEffect } from "preact/hooks"

const WINDOW_HEIGHT = 400
const VIEWPORT_HEIGHT = 200
const MARGIN = 300

// TODO: Eventually transition to JSX (maybe)
export default function IntersectionObserverComponent({
  threshold,
  percentage = false,
}) {
  const [observer, setObserver] = useState(null)
  const [top, setTop] = useState(0)
  const [backgroundColor, setBackgroundColor] = useState("green")
  const [text, setText] = useState("")
  const elementRef = useCallback(
    element => {
      if (element == null || observer == null) return
      observer.observe(element)
      return () => observer.unobserve(element)
    },
    [observer]
  )

  useEffect(() => {
    const o = new IntersectionObserver(
      entries => {
        if (percentage) {
          setText(`${Math.round(entries[0].intersectionRatio * 100)}%`)
        } else {
          setBackgroundColor(entries[0].isIntersecting ? "red" : "green")
        }
      },
      { threshold: threshold ? JSON.parse(threshold) : 0 }
    )
    setObserver(o)
    return () => o.disconnect()
  }, [percentage, threshold])

  return (
    <div
      style={{
        marginTop: "1rem",
        paddingTop: `${WINDOW_HEIGHT - VIEWPORT_HEIGHT}px`,
        paddingBottom: `${WINDOW_HEIGHT - VIEWPORT_HEIGHT}px`,
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      <div
        onScroll={e => setTop(e.target.scrollTop)}
        style={{
          height: `${VIEWPORT_HEIGHT}px`,
          overflow: "auto",
          border: "1px solid black",
          boxSizing: "border-box",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            height: `${WINDOW_HEIGHT}px`,
            boxSizing: "border-box",
            paddingTop: `${MARGIN}px`,
          }}
        >
          <div
            ref={elementRef}
            style={{
              backgroundColor: backgroundColor,
              height: "50px",
              width: "50px",
              boxSizing: "border-box",
            }}
          >
            {text}
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          zIndex: "-1",
          backgroundColor: "rgba(0, 0, 0, .1)",
          height: `${WINDOW_HEIGHT}px`,
          left: 0,
          right: 0,
          border: "1px solid white",
          bottom: `${top}px`,
          boxSizing: "border-box",
          paddingTop: `${MARGIN}px`,
        }}
      >
        <div
          style={{
            backgroundColor: backgroundColor,
            height: "50px",
            width: "50px",
            boxSizing: "border-box",
          }}
        >
          {text}
        </div>
      </div>
    </div>
  )
}
