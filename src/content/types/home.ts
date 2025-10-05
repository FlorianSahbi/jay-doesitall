// @path: src/content/types/home.ts
export type ImageSrc = string

export type HomeHeroContent = {
  backgroundImage: ImageSrc
  imageAlt: string
  title: string
  subtitle: string
  ctaLabel: string
  about: {
    kicker: string
    text: string
    ctaLabel: string
  }
}

export type HomeServiceCardContent = {
  href: string
  title: string
  cover: ImageSrc
  ctaLabel: string
}

export type HomeServicesContent = {
  title: string
  ctaLabel: string
  ctaHref: string
  cards: HomeServiceCardContent[]
}

export type HomeTestimonialItem = {
  text: string
  author: string
}

export type HomeTestimonialsContent = {
  title: string
  items: HomeTestimonialItem[]
}

export type HomeWhyMeItem = {
  num: string
  title: string
  desc: string
}

export type HomeWhyMeContent = {
  title: string
  backgroundImage: ImageSrc
  backgroundAlt: string
  ctaLabel: string
  items: HomeWhyMeItem[]
}

export type HomePageContent = {
  hero: HomeHeroContent
  services: HomeServicesContent
  testimonials: HomeTestimonialsContent
  whyMe: HomeWhyMeContent
}
