// @path: src/content/mappers/services.ts
import { loadPage, loadService } from '@/content/loader'
import {
  ServicesIndexContentSchema,
  ServiceContentSchema,
} from '@/content/schemas/services'
import type { Locale } from '@/i18n/locales'

type RawServicesIndexCard = {
  href?: string
  title?: string
  cover?: string
  ctaLabel?: string
}

type RawHeroCover = {
  desktop?: string
  mobile?: string
}

type RawServicesIndexHero = {
  cover?: RawHeroCover
  alt?: string
}

type RawServicesIndex = {
  hero?: RawServicesIndexHero
  kicker?: string
  title?: string
  intro?: string
  cards?: RawServicesIndexCard[]
}

export async function getServicesPageContent(locale?: Locale) {
  const raw = await loadPage<RawServicesIndex>('services', locale)

  const rawCover = raw?.hero?.cover

  const heroCover = {
    desktop: rawCover?.desktop ?? rawCover?.mobile ?? '',
    mobile: rawCover?.mobile ?? rawCover?.desktop ?? '',
  }

  const shaped = {
    hero: {
      cover: heroCover,
      alt: raw?.hero?.alt ?? raw?.title ?? 'Services',
    },
    kicker: raw?.kicker,
    title: raw?.title,
    intro: raw?.intro,
    cards: (raw?.cards ?? []).map((c) => ({
      href: c?.href,
      title: c?.title,
      cover: c?.cover,
      ctaLabel: c?.ctaLabel,
    })),
  }

  return ServicesIndexContentSchema.parse(shaped)
}

type RawServicePlan = {
  type?: string
  title?: string
  features?: string[]
  price?: string
}

type RawServiceHero = {
  cover?: RawHeroCover
  alt?: string
}

type RawService = {
  slug?: string
  kicker?: string
  title?: string
  description?: string
  hero?: RawServiceHero
  plans?: RawServicePlan[]
}

export async function getServiceContent(slug: string, locale?: Locale) {
  const data = await loadService<RawService>(slug, locale)
  if (!data) return null

  const s = data.service
  const rawCover = s?.hero?.cover

  const heroCover = {
    desktop: rawCover?.desktop ?? rawCover?.mobile ?? '',
    mobile: rawCover?.mobile ?? rawCover?.desktop ?? '',
  }

  const shaped = {
    slug: s?.slug ?? slug,
    kicker: s?.kicker,
    title: s?.title,
    description: s?.description,
    hero: {
      cover: heroCover,
      alt: s?.hero?.alt ?? s?.title ?? s?.slug ?? slug,
    },
    plans: (s?.plans ?? []).map((p) => ({
      type: p?.type,
      title: p?.title,
      features: Array.isArray(p?.features) ? p.features : [],
      price: Array.isArray(p?.price) ? p.price : [],
    })),
  }

  return ServiceContentSchema.parse(shaped)
}
