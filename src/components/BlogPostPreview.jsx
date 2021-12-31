import TagBar from "./TagBar.jsx"
import dateFormatter from "../utils/dateFormatter.js"

export default function BlogPostPreview({ post }) {
  return (
    <article style={{ paddingBottom: "2rem", marginBottom: "3rem" }}>
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
        <a href={post.url}>
          <h1
            style={{
              margin: 0,
              fontSize: "2.25rem",
              fontWeight: 700,
              color: "var(--theme-text)",
            }}
          >
            {post.title}
          </h1>
        </a>
        <p
          style={{
            margin: 0,
            fontSize: "1rem",
            color: "var(--theme-text-lighter)",
          }}
        >
          {dateFormatter.format(post.date)}
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
