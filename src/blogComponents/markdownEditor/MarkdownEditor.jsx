import { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import "github-markdown-css/github-markdown-dark.css"
import "./MarkdownEditor.css"

export default function MarkdownEditor({
  initialValue = "",
  height = "300px",
  isFullWidth = false,
}) {
  const [value, setValue] = useState(initialValue)
  return (
    <div style={{ height }}>
      <div
        className={isFullWidth ? "full-width-article-element" : ""}
        style={{
          display: "flex",
          alignItems: "stretch",
          height,
          marginTop: "1rem",
        }}
      >
        <textarea
          value={value}
          onChange={e => setValue(e.target.value)}
          style={{
            resize: "none",
            flexGrow: 0,
            flexShrink: 0,
            fontSize: "inherit",
            padding: "1rem",
            overflowY: "auto",
            width: "50%",
            borderRadius: 0,
          }}
        />
        <div
          className="markdown-body"
          style={{
            border: "1px solid var(--theme-text-lighter)",
            borderLeft: "none",
            width: "50%",
            flexGrow: 0,
            flexShrink: 0,
            padding: "1rem",
            overflowY: "auto",
            color: "var(--color-white)",
          }}
        >
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
          >
            {value}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
