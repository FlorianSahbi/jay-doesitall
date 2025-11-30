// @path: src/content/mappers/home.ts
import { loadPage } from '@/content/loader'
import { HomePageContentSchema } from '@/content/schemas/home'
import type { Locale } from '@/i18n/locales'

type RawServiceCard = {
  href?: string
  title?: string
  cover?: string
  ctaLabel?: string
}
type RawTestimonialItem = { text?: string; author?: string }
type RawWhyMeItem = { num?: string; title?: string; desc?: string }

type RawHomePage = {
  hero?: {
    backgroundImage?: string
    backgroundVideo?: string
    imageAlt?: string
    title?: string
    subtitle?: string
    ctaLabel?: string
    about?: { kicker?: string; text?: string; ctaLabel?: string }
  }
  services?: {
    title?: string
    ctaLabel?: string
    ctaHref?: string
    cards?: RawServiceCard[]
  }
  testimonials?: {
    title?: string
    items?: RawTestimonialItem[]
  }
  whyMe?: {
    title?: string
    backgroundImage?: string
    backgroundAlt?: string
    ctaLabel?: string
    items?: RawWhyMeItem[]
  }
}

export async function getHomePageContent(locale?: Locale) {
  const raw = await loadPage<RawHomePage>('home', locale)

  const shaped = {
    hero: {
      backgroundImage: raw?.hero?.backgroundImage,
      backgroundVideo: raw?.hero?.backgroundVideo,
      imageAlt: raw?.hero?.imageAlt,
      title: raw?.hero?.title,
      subtitle: raw?.hero?.subtitle,
      ctaLabel: raw?.hero?.ctaLabel,
      about: {
        kicker: raw?.hero?.about?.kicker,
        text: raw?.hero?.about?.text,
        ctaLabel: raw?.hero?.about?.ctaLabel,
      },
    },
    services: {
      title: raw?.services?.title,
      ctaLabel: raw?.services?.ctaLabel,
      ctaHref: raw?.services?.ctaHref,
      cards: (raw?.services?.cards ?? []).map((c) => ({
        href: c?.href,
        title: c?.title,
        cover: c?.cover,
        ctaLabel: c?.ctaLabel,
      })),
    },
    testimonials: {
      title: raw?.testimonials?.title,
      items: (raw?.testimonials?.items ?? []).map((t) => ({
        text: t?.text,
        author: t?.author,
      })),
    },
    whyMe: {
      title: raw?.whyMe?.title,
      backgroundImage: raw?.whyMe?.backgroundImage,
      backgroundAlt: raw?.whyMe?.backgroundAlt,
      ctaLabel: raw?.whyMe?.ctaLabel,
      items: (raw?.whyMe?.items ?? []).map((i) => ({
        num: i?.num,
        title: i?.title,
        desc: i?.desc,
      })),
    },
  }

  return HomePageContentSchema.parse(shaped)
}
