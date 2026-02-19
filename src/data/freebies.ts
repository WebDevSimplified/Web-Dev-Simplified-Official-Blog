export interface Freebie {
  title: string
  description: string
  image: string
  kitFormId: string
  kitFormUrlId: string
}

export const freebies: Record<string, Freebie> = {
  "web-dev-roadmap": {
    title: "Web Dev Roadmap",
    description:
      "260+ videos, 60+ articles, 120+ projects.\nThe only roadmap you need to become a full-stack web developer.",
    image: "/freebies/web-dev-roadmap.avif",
    kitFormId: "2006456",
    kitFormUrlId: "2b29f37c99",
  },
  "ts-util-cheat-sheet": {
    title: "TypeScript Utility Types Cheat Sheet",
    description: "Master 18 must know built in TS utility types!",
    image: "/freebies/ts-util-cheat-sheet.avif",
    kitFormId: "8664388",
    kitFormUrlId: "2d52cd1172",
  },
  "accessibility-checklist": {
    title: "Accessibility Checklist",
    description:
      "80+ items, 12+ categories.\nEnsure your website is accessible to all users with this comprehensive checklist.",
    image: "/freebies/accessibility-checklist.avif",
    kitFormId: "9019792",
    kitFormUrlId: "a485fd2bc3",
  },
}

export const DEFAULT_FREEBIE_ID = "web-dev-roadmap"

export function getFreebie(id: string | undefined): Freebie {
  const freebieId = id || DEFAULT_FREEBIE_ID
  return freebies[freebieId] || freebies[DEFAULT_FREEBIE_ID]
}
