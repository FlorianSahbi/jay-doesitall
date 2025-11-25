// @path: src/content/types/services.ts
export type ImageSrc = string

export type HeroCover = {
  desktop: ImageSrc
  mobile: ImageSrc
}

export type ServicesIndexHero = {
  cover: HeroCover
  alt: string
}

export type ServicesIndexCard = {
  href: string
  title: string
  cover: ImageSrc
  ctaLabel: string
}

export type ServicesIndexContent = {
  hero: ServicesIndexHero
  kicker: string
  title: string
  intro: string
  cards: ServicesIndexCard[]
}

export type ServicePlan = {
  type: string
  title: string
  features: string[]
  price: string
}

export type ServiceHero = {
  cover: HeroCover
  alt: string
}

export type ServiceContent = {
  slug: string
  kicker: string
  title: string
  description: string
  hero: ServiceHero
  plans: ServicePlan[]
}
