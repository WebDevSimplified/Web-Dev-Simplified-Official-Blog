import { useState } from "preact/hooks"
import TagBar from "./TagBar.jsx"
import SearchBar from "./SearchBar.jsx"
import BlogPostPreview from "./BlogPostPreview.jsx"

export default function BlogList({ allPosts }) {
  const [selectedTags, setSelectedTags] = useState([])
  const tags = Object.entries(
    allPosts.reduce((totals, post) => {
      return post.tags.reduce((tagTotals, tag) => {
        return { ...tagTotals, [tag]: (tagTotals[tag] || 0) + 1 }
      }, totals)
    }, {})
  )
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => {
      if (a.count === b.count) return a.name > b.name ? 1 : -1
      return a.count < b.count ? 1 : -1
    })
    .map(tag => {
      return { ...tag, selected: selectedTags.includes(tag.name) }
    })
  const [searchQuery, setSearchQuery] = useState("")
  const filteredPosts = allPosts.filter(post => {
    return (
      (post.title.toLowerCase().includes(searchQuery) ||
        post.description.toLowerCase().includes(searchQuery)) &&
      (selectedTags.length === 0 ||
        post.tags.some(tag => selectedTags.includes(tag)))
    )
  })

  function handleSearchChange({ target }) {
    setSearchQuery(target.value.toLowerCase())
  }

  function handleTagSelect({ target }) {
    setSelectedTags(prevTags => {
      if (prevTags.includes(target.value)) {
        return prevTags.filter(tag => target.value !== tag)
      } else {
        return [...prevTags, target.value]
      }
    })
  }

  return (
    <div class="wrapper">
      <SearchBar query={searchQuery} onChange={handleSearchChange} />
      <TagBar tags={tags} onTagSelect={handleTagSelect} />
      <main class="content" style={{ marginTop: "3rem" }}>
        <section aria-label="Blog post list">
          {filteredPosts.map(p => (
            <BlogPostPreview post={p} />
          ))}
        </section>
      </main>
    </div>
  )
}
