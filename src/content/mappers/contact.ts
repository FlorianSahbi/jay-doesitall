// @path: src/content/mappers/contact.ts
import { loadPage } from '@/content/loader'
import { ContactPageContentSchema } from '@/content/schemas/contact'
import type { Locale } from '@/i18n/locales'

type RawHeroCover = {
  desktop?: string
  mobile?: string
}

type RawContactHero = {
  cover?: RawHeroCover
  alt?: string
}

type RawContactPage = {
  hero?: RawContactHero
  kicker?: string
  title?: string
  intro?: string
  cta?: {
    label?: string
    href?: string
  }
}

export async function getContactPageContent(locale?: Locale) {
  const raw = await loadPage<RawContactPage>('contact', locale)

  const rawCover = raw?.hero?.cover

  const heroCover = {
    desktop: rawCover?.desktop ?? rawCover?.mobile ?? '',
    mobile: rawCover?.mobile ?? rawCover?.desktop ?? '',
  }

  const shaped = {
    hero: {
      cover: heroCover,
      alt: raw?.hero?.alt ?? raw?.title ?? 'Contact',
    },
    kicker: raw?.kicker,
    title: raw?.title,
    intro: raw?.intro,
    cta: {
      label: raw?.cta?.label,
      href: raw?.cta?.href,
    },
  }

  return ContactPageContentSchema.parse(shaped)
}
