import { useLocalStorage } from "../utils/useStorage"
import { useEffect, useState, useRef } from "preact/hooks"
import Styles from "./userSettings.module.css"

const THEME_OPTIONS = {
  light: "Light",
  dark: "Dark",
}

const READING_WIDTH_OPTIONS = {
  narrow: "Narrow",
  default: "Default",
  wide: "Wide",
}

export default function UserSettings() {
  const [theme, setTheme] = useLocalStorage("THEME", () => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    }
  })
  const [readingWidth, setReadingWidth] = useLocalStorage(
    "READING_WIDTH",
    "default"
  )
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    document.documentElement.dataset.readingWidth = readingWidth
  }, [readingWidth])

  useEffect(() => {
    document.addEventListener("click", e => {
      if (wrapperRef.current == null || wrapperRef.current.contains(e.target))
        return
      setIsOpen(false)
    })
  })

  return (
    <div className={Styles.wrapper} ref={wrapperRef}>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className={`${Styles.btn} ${isOpen ? Styles.active : ""}`}
      >
        Preferences
      </button>
      <form
        className={`${Styles.modal} ${isOpen ? Styles.open : ""}`}
        onSubmit={e => {
          e.preventDefault()
        }}
      >
        <div className={Styles["form-group"]}>
          <label htmlFor="theme">Theme</label>
          <select
            id="theme"
            value={theme}
            onChange={e => setTheme(e.target.value)}
          >
            {Object.entries(THEME_OPTIONS).map(([key, value]) => (
              <option value={key}>{value}</option>
            ))}
          </select>
        </div>
        <div className={Styles["form-group"]}>
          <label htmlFor="readingWidth">Reading Width</label>
          <select
            id="readingWidth"
            value={readingWidth}
            onChange={e => setReadingWidth(e.target.value)}
          >
            {Object.entries(READING_WIDTH_OPTIONS).map(([key, value]) => (
              <option value={key}>{value}</option>
            ))}
          </select>
        </div>
      </form>
    </div>
  )
}
