const SEARCH_STYLE = {
  width: "100%",
  padding: ".25em .5em",
  fontSize: "1.25rem",
}

const LABEL_STYLE = {
  fontWeight: "bold",
}

export default function SearchBar({ query, onChange }) {
  return (
    <>
      <label htmlFor="search" style={LABEL_STYLE}>
        Search
      </label>
      <input
        autoFocus
        id="search"
        type="search"
        style={SEARCH_STYLE}
        value={query}
        onInput={onChange}
      />
    </>
  )
}
