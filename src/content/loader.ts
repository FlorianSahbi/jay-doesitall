// @path: src/content/loader.ts
import 'server-only'
import type { Metadata } from 'next'

export type Locale = 'fr' | 'en'
const DEFAULT_LOCALE: Locale = 'fr'

const toArray = (v?: any | any[]) => (Array.isArray(v) ? v : v ? [v] : [])

type NavItem = { label: string; href: string }
type SocialItem = {
  label: string
  href: string
  icon: 'instagram' | 'youtube' | 'tiktok'
}
type Globals = {
  menu: NavItem[]
  socials: SocialItem[]
  followLabel: string
  copyright: string
}

function withLocalePrefix(locale: Locale, nav: Globals): Globals {
  const menu = nav.menu.map((it) => {
    if (!it.href?.startsWith('/')) return it
    const href = it.href === '/' ? `/${locale}` : `/${locale}${it.href}`
    return { ...it, href }
  })
  return { ...nav, menu }
}

async function importContent<T = any>(id: string, locale: Locale): Promise<T> {
  try {
    return (await import(`@/content/${id}.${locale}.json`)).default as T
  } catch {
    return (await import(`@/content/${id}.${DEFAULT_LOCALE}.json`)).default as T
  }
}

export async function loadGlobals(
  locale: Locale = DEFAULT_LOCALE,
): Promise<Globals> {
  try {
    const nav = await importContent<Globals>('navigation', locale)
    return withLocalePrefix(locale, nav)
  } catch {
    const g = await importContent<any>('globals', locale)
    const fallbackFollow = locale === 'fr' ? 'SUIVEZ-MOI' : 'FOLLOW ME'
    const year = new Date().getFullYear()
    const fallbackCopy =
      locale === 'fr'
        ? `©${g?.siteName ?? 'Site'} ${year} – Tous droits réservés`
        : `©${g?.siteName ?? 'Site'} ${year} – All rights reserved`

    const menu: NavItem[] = (g?.navigation ?? []).map((n: any) => ({
      label: n.label,
      href: n.href,
    }))

    const socials: SocialItem[] = (g?.socials ?? []).map((s: any) => ({
      label:
        (s.platform ?? '').charAt(0).toUpperCase() +
        (s.platform ?? '').slice(1),
      href: s.url,
      icon: s.platform,
    }))

    return withLocalePrefix(locale, {
      menu,
      socials,
      followLabel: g?.followLabel ?? fallbackFollow,
      copyright: g?.copyright ?? fallbackCopy,
    })
  }
}

export async function loadPage<T = any>(
  id: string,
  locale: Locale = DEFAULT_LOCALE,
): Promise<T> {
  return importContent<T>(id, locale)
}

export async function getPageMeta(
  id: string,
  locale: Locale = DEFAULT_LOCALE,
): Promise<Metadata> {
  const data = await loadPage<any>(id, locale)
  return (data?.meta ?? {}) as Metadata
}

export async function getPageJsonLd(
  id: string,
  locale: Locale = DEFAULT_LOCALE,
) {
  const data = await loadPage<any>(id, locale)
  return toArray(data?.jsonLd)
}

export async function listServiceSlugs() {
  return ['coaching', 'running']
}

export async function loadService<T = any>(
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
) {
  try {
    const service = await importContent<T>(slug, locale)
    return { service } as const
  } catch {
    return null
  }
}

export async function getStaticParamsServices() {
  const slugs = await listServiceSlugs()
  return slugs.map((slug) => ({ slug }))
}
