import { useLocalStorage } from "../utils/useStorage"
import { useEffect } from "preact/hooks"

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
  const [theme, setTheme] = useLocalStorage("THEME", "light")
  const [readingWidth, setReadingWidth] = useLocalStorage(
    "READING_WIDTH",
    "default"
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    document.documentElement.dataset.readingWidth = readingWidth
  }, [readingWidth])

  return (
    <aside class="user-settings">
      <form onSubmit={() => {}}>
        <div className="form-group">
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
        <div className="form-group">
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
    </aside>
  )
}
