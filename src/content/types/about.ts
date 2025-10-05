// @path: src/content/types/about.ts
export type ImageSrc = string

export type AboutHeroContent = {
  cover: ImageSrc
  kicker: string
  title: string
  paragraphs: string[]
  credo: {
    kicker: string
    title: string
    text: string
  }
  overlap: string | number
}

export type AboutReasonsContent = {
  title: string
  items: string[]
  gallery: { src: ImageSrc; alt: string }[]
  ctaLabel: string
}

export type AboutLocationSection = {
  title: string
  subtitle: { text: string; href: string }
}

export type AboutPlace = {
  name: string
  src: ImageSrc
  sections: AboutLocationSection[]
  siteUrl: string
}

export type AboutLocationsContent = {
  wrapperTitle: string
  places: AboutPlace[]
}

export type AboutPartnerItem = {
  imgSrc: ImageSrc
  alt: string
  description: string
}

export type AboutPartnersContent = {
  title: string
  intro: string
  items: AboutPartnerItem[]
}

export type AboutPageContent = {
  hero: AboutHeroContent
  reasons: AboutReasonsContent
  locations: AboutLocationsContent
  partners: AboutPartnersContent
}
