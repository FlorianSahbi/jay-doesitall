// @path: src/content/mappers/contact.ts
import { loadPage } from '@/content/loader'
import { ContactPageContentSchema } from '@/content/schemas/contact'
import { Locale } from '@/i18n/locales'

type RawContact = {
  hero?: { cover?: string; alt?: string }
  kicker?: string
  title?: string
  intro?: string
  cta?: { label?: string; href?: string }
}

export async function getContactPageContent(locale?: Locale) {
  const raw = await loadPage<RawContact>('contact', locale)

  const shaped = {
    hero: {
      cover: raw?.hero?.cover,
      alt: raw?.hero?.alt ?? raw?.title,
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
