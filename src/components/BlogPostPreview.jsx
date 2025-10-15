import TagBar from "./TagBar.jsx"
import dateFormatter from "../utils/dateFormatter.js"

export default function BlogPostPreview({ post }) {
  return (
    <article className="blog-preview-wrapper">
      <header
        style={{
          alignItems: "flex-start",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingBottom: "1rem",
          textAlign: "left",
        }}
      >
        <h2 className="preview-title">
          <a className="preview-title" href={post.url}>
            {post.title}
          </a>
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: "1rem",
            color: "var(--theme-text-lighter)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span
            style={{
              textDecoration: post.updatedDate ? "line-through" : "none",
            }}
          >
            {dateFormatter.format(post.date)}
          </span>
          {post.updatedDate && (
            <>Updated: {dateFormatter.format(post.updatedDate)}</>
          )}
        </p>
        <TagBar
          marginTop=".25em"
          tags={post.tags.map(tag => {
            return { name: tag }
          })}
        />
      </header>
      <p>{post.description}</p>
      <a href={post.url}>Read more</a>
    </article>
  )
}
