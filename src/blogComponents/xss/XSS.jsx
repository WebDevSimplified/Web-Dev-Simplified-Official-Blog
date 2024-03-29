import { useRef, useState } from "react"

const WRAPPER_STYLES = {
  fontSize: "16px",
  backgroundColor: "#333",
  fontWeight: "300",
  boxSizing: "border-box",
  paddingBottom: ".25rem",
  marginBottom: "1rem",
  marginTop: "1rem",
}

const HEADER = {
  color: "#00FF6C",
  textAlign: "center",
  fontSize: "3rem",
  marginTop: "0",
  fontWeight: 500,
}

const URL_INPUT = {
  display: "block",
  fontSize: "16px",
  width: "100%",
  border: "none",
  margin: "0",
  padding: ".5rem",
  backgroundColor: "#DDD",
  color: "#555",
}

const SEARCH_FORM = {
  display: "flex",
  justifyContent: "center",
  margin: "25px",
}

const SEARCH_INPUT = {
  fontSize: "16px",
  maxWidth: "900px",
  width: "60%",
  flexGrow: "1",
  padding: ".5em",
  marginRight: ".25em",
  borderRadius: ".25em",
  border: "1px solid #00FF6C",
  color: "#B2F8D0",
  outline: "none",
  backgroundColor: "rgb(178, 248, 208, .2)",
}

const SEARCH_BUTTON = {
  fontSize: "16px",
  border: "1px solid #00FF6C",
  color: "#B2F8D0",
  background: "none",
  padding: ".5em",
  borderRadius: ".25em",
  cursor: "pointer",
  backgroundColor: "rgb(178, 248, 208, .2)",
}

const SEARCH_QUERY = {
  color: "#B2F8D0",
  fontSize: "1em",
  textAlign: "center",
  fontWeight: "bold",
}

const QUERY = {
  color: "#00FF6C",
  fontWeight: "normal",
  textDecoration: "underline",
}

export default function XSS({ vulnerable = true, initialValue = "" }) {
  const queryRef = useRef()
  const [query, setQuery] = useState(initialValue)
  function handleSubmit(e) {
    e.preventDefault()
    setQuery(queryRef.current.value)
  }

  return (
    <div style={WRAPPER_STYLES}>
      <input
        readOnly
        disabled
        style={URL_INPUT}
        value={"https://example.com?query=" + encodeURIComponent(query)}
      />
      <h1 style={HEADER}>My Awesome Site</h1>
      <form onSubmit={handleSubmit} style={SEARCH_FORM}>
        <input
          ref={queryRef}
          defaultValue={initialValue}
          style={SEARCH_INPUT}
          type="text"
        />
        <button style={SEARCH_BUTTON} type="submit">
          Search
        </button>
      </form>
      <h3 style={SEARCH_QUERY}>
        You Queried:{" "}
        {vulnerable ? (
          <span style={QUERY} dangerouslySetInnerHTML={{ __html: query }} />
        ) : (
          <span style={QUERY}>{query}</span>
        )}
      </h3>
    </div>
  )
}
