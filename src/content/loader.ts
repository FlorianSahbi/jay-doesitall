// @path: src/content/loader.ts
import 'server-only'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/locales'
import { DEFAULT_LOCALE } from '@/i18n/locales'

const toArray = (v?: any | any[]) => (Array.isArray(v) ? v : v ? [v] : [])

const norm = (id: string) => id.replace(/^\/+|\/+$/g, '')

async function importFromLocale<T = any>(
  locale: Locale,
  path: string,
): Promise<T> {
  try {
    return (await import(`@/content/${locale}/${path}`)).default as T
  } catch (e) {
    if (locale !== DEFAULT_LOCALE) {
      return (await import(`@/content/${DEFAULT_LOCALE}/${path}`)).default as T
    }
    throw e
  }
}

export async function loadGlobals(
  locale: Locale = DEFAULT_LOCALE,
): Promise<any> {
  return importFromLocale<any>(locale, 'globals/data.json')
}

export async function loadPage<T = any>(
  id: string, // ex: 'about'
  locale: Locale = DEFAULT_LOCALE,
): Promise<T> {
  const safeId = norm(id)
  const [data, meta, jsonLd] = await Promise.all([
    importFromLocale<any>(locale, `${safeId}/data.json`).catch(() => ({})),
    importFromLocale<any>(locale, `${safeId}/meta.json`).catch(() => ({})),
    importFromLocale<any>(locale, `${safeId}/jsonld.json`).catch(() => []),
  ])
  if (
    (process.env.NODE_ENV !== 'production' && !data) ||
    Object.keys(data).length === 0
  ) {
    console.warn(
      `[content] Missing data for ${locale}/${safeId}/data.json (fallback may have been used)`,
    )
  }
  return { ...(data ?? {}), meta: meta ?? {}, jsonLd: toArray(jsonLd) } as T
}

export async function getPageMeta(
  id: string,
  locale: Locale = DEFAULT_LOCALE,
): Promise<Metadata> {
  const page = await loadPage<any>(id, locale)
  return (page?.meta ?? {}) as Metadata
}

export async function getPageJsonLd(
  id: string,
  locale: Locale = DEFAULT_LOCALE,
) {
  const page = await loadPage<any>(id, locale)
  return toArray(page?.jsonLd)
}

export async function listServiceSlugs() {
  return ['coaching', 'running']
}

export async function loadService<T = any>(
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
) {
  try {
    const service = await importFromLocale<T>(locale, `${norm(slug)}/data.json`)
    return { service } as const
  } catch {
    return null
  }
}

export async function getStaticParamsServices() {
  const slugs = await listServiceSlugs()
  return slugs.map((slug) => ({ slug }))
}
