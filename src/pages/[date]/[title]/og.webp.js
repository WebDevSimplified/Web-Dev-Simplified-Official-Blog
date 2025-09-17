import { generateOpenGraphImage } from "src/utils/generateOpenGraphImage"

export function get({ props: { post } }) {
  return generateOpenGraphImage({
    title: post.title,
    tags: post.tags ?? [],
    secondaryText: post.author || "Web Dev Simplified",
    tertiaryText: Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
    }).format(new Date(post.updatedDate ?? post.date)),
  })
}

export async function getStaticPaths() {
  const allMarkdownPosts = Object.values(
    import.meta.glob("../../**/*.mdx", { eager: true }),
  )

  return allMarkdownPosts.map(post => {
    const [date, title] = post.url.split("/").slice(-2)

    return {
      params: { date, title },
      props: { post: post.frontmatter },
    }
  })
}
