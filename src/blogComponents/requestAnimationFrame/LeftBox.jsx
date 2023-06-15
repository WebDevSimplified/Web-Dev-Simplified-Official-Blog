import { useEffect, useRef } from "react"

export default function LeftBox() {
  const leftBox = useRef()

  useEffect(() => {
    let lastTime
    let frame
    function playAnimation(time) {
      if (lastTime != null) {
        const delta = time - lastTime
        leftBox.current.style.left = `${
          parseFloat(leftBox.current.style.left) + delta * 0.1
        }%`
        if (parseFloat(leftBox.current.style.left) >= 100) {
          leftBox.current.style.left = 0
        }
      }

      lastTime = time
      frame = window.requestAnimationFrame(playAnimation)
    }
    frame = window.requestAnimationFrame(playAnimation)
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <div
      style={{
        position: "relative",
        height: "100px",
        border: "1px dashed var(--theme-text)",
        overflow: "hidden",
        marginBottom: "1rem",
      }}
    >
      <div
        ref={leftBox}
        style={{
          backgroundColor: "var(--theme-red)",
          height: "50px",
          width: "50px",
          position: "absolute",
          top: "25px",
          left: 0,
        }}
      ></div>
    </div>
  )
}
