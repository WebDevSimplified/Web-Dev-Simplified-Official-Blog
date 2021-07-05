import React, { useState } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SearchBar from "../components/SearchBar"
import TagBar from "../components/TagBar"
import { rhythm } from "../utils/typography"

function BlogIndex(props) {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMdx.edges
  const [selectedTags, setSelectedTags] = useState([])
  const tags = data.tags.group
    .sort((a, b) => {
      if (a.totalCount === b.totalCount) return a.name > b.name ? 1 : -1
      return a.totalCount < b.totalCount ? 1 : -1
    })
    .map(tag => {
      return { ...tag, selected: selectedTags.includes(tag.name) }
    })
  const [searchQuery, setSearchQuery] = useState("")
  const filteredPosts = posts.filter(({ node }) => {
    return (
      (node.frontmatter.title.toLowerCase().includes(searchQuery) ||
        node.frontmatter.description.toLowerCase().includes(searchQuery)) &&
      (selectedTags.length === 0 ||
        node.frontmatter.tags.some(tag => selectedTags.includes(tag)))
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
    <Layout location={props.location} title={siteTitle}>
      <SEO title="All posts" />
      <SearchBar query={searchQuery} onChange={handleSearchChange} />
      <TagBar tags={tags} onTagSelect={handleTagSelect} />
      {filteredPosts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <div style={{ marginBottom: rhythm(0.25) }}>
                <small>
                  <TagBar
                    marginTop={rhythm(0.25)}
                    tags={node.frontmatter.tags.map(tag => {
                      return { name: tag }
                    })}
                  />
                </small>
              </div>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
      {filteredPosts.length === 0 && (
        <div
          style={{
            fontSize: "1.5rem",
            marginTop: rhythm(1.5),
            textAlign: "center",
          }}
        >
          No articles found for search query: <strong>{searchQuery}</strong>
        </div>
      )}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    tags: allMdx {
      group(field: frontmatter___tags) {
        name: fieldValue
        totalCount
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`
