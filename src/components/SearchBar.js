import React from 'react'

const SEARCH_STYLE = {
  width: '100%',
  padding: '.25em .5em'
}

const LABEL_STYLE = {
  fontWeight: 'bold'
}

export default function SearchBar({ query, onChange }) {
  return (
    <>
      <label htmlFor="search" style={LABEL_STYLE}>Search</label>
      <input
        id="search"
        type="search"
        style={SEARCH_STYLE}
        value={query}
        onChange={onChange}
      />
    </>
  )
}
