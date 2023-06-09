import rss from "@astrojs/rss"

export function get(context) {
  let allMarkdownPosts = Object.values(
    import.meta.glob("./**/*.mdx", { eager: true })
  )
  const allPosts = allMarkdownPosts.sort(
    (a, b) => b.frontmatter.date.valueOf() - a.frontmatter.date.valueOf()
  )

  return rss({
    title: "Web Dev Simplified Blog",
    description: "Web Dev Simplified Blog",
    customData: `<language>en-us</language>`,
    site: context.site,
    items: allPosts.map(item => ({
      title: item.frontmatter.title,
      description: item.frontmatter.description,
      link: item.url,
      pubDate: item.frontmatter.date,
    })),
  })
}
