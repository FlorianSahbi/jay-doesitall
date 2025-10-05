// @path: src/content/mappers/globals.ts
// src/content/mappers/globals.ts
import { loadGlobals } from '@/content/loader'
import { GlobalsContentSchema } from '@/content/schemas/globals'
import { Locale } from '@/i18n/locales'

type RawGlobals = {
  menu?: Array<{ href?: string; label?: string }>
  socials?: Array<{ href?: string; label?: string; icon?: string }>
  followLabel?: string
  copyright?: string
  openLabel?: string
  closeLabel?: string
  brand?: string
}

export async function getGlobalsContent(locale?: Locale) {
  const raw = (await loadGlobals(locale)) as RawGlobals
  const shaped = {
    menu: (raw?.menu ?? []).map((m) => ({ href: m?.href, label: m?.label })),
    socials: (raw?.socials ?? []).map((s) => ({
      href: s?.href,
      label: s?.label,
      icon: s?.icon,
    })),
    followLabel: raw?.followLabel,
    copyright: raw?.copyright,
    openLabel: raw?.openLabel,
    closeLabel: raw?.closeLabel,
    brand: raw?.brand,
  }
  return GlobalsContentSchema.parse(shaped)
}
