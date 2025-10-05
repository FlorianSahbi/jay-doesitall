// @path: src/content/types/contact.ts
export type ImageSrc = string

export type ContactHero = {
  cover: ImageSrc
  alt: string
}

export type ContactCTA = {
  label: string
  href: string
}

export type ContactPageContent = {
  hero: ContactHero
  kicker: string
  title: string
  intro: string
  cta: ContactCTA
}
