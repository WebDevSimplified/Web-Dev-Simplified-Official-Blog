import { generateOpenGraphImage } from "src/utils/generateOpenGraphImage"

export function GET() {
  const count = Object.values(
    import.meta.glob("./**/*.mdx", { eager: true }),
  ).length

  return generateOpenGraphImage({
    title: "Web Dev Simplified Blog",
    tags: ["TypeScript", "React", "CSS", "Next.js", "Technical Explainers"],
    secondaryText: "No Stack to Full Stack",
    tertiaryText: `${count} Articles`,
  })
}
