// @path: src/content/mappers/about.ts
import { loadPage } from '@/content/loader'
import { AboutPageContentSchema } from '@/content/schemas/about'
import type { Locale } from '@/i18n/locales'

type RawGalleryItem = { src?: string; alt?: string }
type RawPlaceSection = {
  title?: string
  subtitle?: { text?: string; href?: string }
}
type RawPlace = {
  name?: string
  src?: string
  sections?: RawPlaceSection[]
  siteUrl?: string
}
type RawPartnerItem = { imgSrc?: string; alt?: string; description?: string }

type RawAbout = {
  hero?: {
    cover?: string
    kicker?: string
    title?: string
    paragraphs?: string[]
    credo?: { kicker?: string; title?: string; text?: string }
    overlap?: string | number
  }
  reasons?: {
    title?: string
    items?: string[]
    gallery?: RawGalleryItem[]
    ctaLabel?: string
  }
  locations?: {
    wrapperTitle?: string
    places?: RawPlace[]
  }
  partners?: {
    title?: string
    intro?: string
    items?: RawPartnerItem[]
  }
}

const DEFAULT_OVERLAP = '12vh'

export async function getAboutPageContent(locale?: Locale) {
  const raw = await loadPage<RawAbout>('about', locale)

  const shaped = {
    hero: {
      cover: raw?.hero?.cover,
      kicker: raw?.hero?.kicker,
      title: raw?.hero?.title,
      paragraphs: raw?.hero?.paragraphs,
      credo: {
        kicker: raw?.hero?.credo?.kicker,
        title: raw?.hero?.credo?.title,
        text: raw?.hero?.credo?.text,
      },
      overlap: raw?.hero?.overlap ?? DEFAULT_OVERLAP,
    },
    reasons: {
      title: raw?.reasons?.title,
      items: raw?.reasons?.items,
      gallery: (raw?.reasons?.gallery ?? []).map((g) => ({
        src: g?.src,
        alt: g?.alt,
      })),
      ctaLabel: raw?.reasons?.ctaLabel,
    },
    locations: {
      wrapperTitle: raw?.locations?.wrapperTitle,
      places: (raw?.locations?.places ?? []).map((p) => ({
        name: p?.name,
        src: p?.src,
        sections: (p?.sections ?? []).map((s) => ({
          title: s?.title,
          subtitle: { text: s?.subtitle?.text, href: s?.subtitle?.href },
        })),
        siteUrl: p?.siteUrl,
      })),
    },
    partners: {
      title: raw?.partners?.title,
      intro: raw?.partners?.intro,
      items: (raw?.partners?.items ?? []).map((i) => ({
        imgSrc: i?.imgSrc,
        alt: i?.alt,
        description: i?.description,
      })),
    },
  }

  return AboutPageContentSchema.parse(shaped)
}
