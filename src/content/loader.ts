// @path: src/content/loader.ts
import 'server-only'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/locales'
import { DEFAULT_LOCALE } from '@/i18n/locales'

const toArray = <T>(v?: T | T[]): T[] => (Array.isArray(v) ? v : v ? [v] : [])

const norm = (id: string) => id.replace(/^\/+|\/+$/g, '')

async function importFromLocale<T = unknown>(
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
): Promise<unknown> {
  return importFromLocale<unknown>(locale, 'globals/data.json')
}

export type PageData<T> = (T extends object ? T : Record<string, never>) & {
  meta: unknown
  jsonLd: unknown[]
}

export async function loadPage<T = unknown>(
  id: string,
  locale: Locale = DEFAULT_LOCALE,
): Promise<PageData<T>> {
  const safeId = norm(id)
  const [data, meta, jsonLd] = await Promise.all([
    importFromLocale<T>(locale, `${safeId}/data.json`).catch(() => ({}) as T),
    importFromLocale<unknown>(locale, `${safeId}/meta.json`).catch(() => ({})),
    importFromLocale<unknown | unknown[]>(
      locale,
      `${safeId}/jsonld.json`,
    ).catch(() => []),
  ])

  const dataObj =
    typeof data === 'object' && data !== null
      ? data
      : ({} as Record<string, unknown>)

  if (
    (process.env.NODE_ENV !== 'production' && !dataObj) ||
    Object.keys(dataObj).length === 0
  ) {
    console.warn(
      `[content] Missing data for ${locale}/${safeId}/data.json (fallback may have been used)`,
    )
  }

  return {
    ...(dataObj as object),
    meta,
    jsonLd: toArray(jsonLd),
  } as PageData<T>
}

export async function getPageMeta(
  id: string,
  locale: Locale = DEFAULT_LOCALE,
): Promise<Metadata> {
  const page = await loadPage<unknown>(id, locale)
  return (page?.meta ?? {}) as Metadata
}

export async function getPageJsonLd(
  id: string,
  locale: Locale = DEFAULT_LOCALE,
) {
  const page = await loadPage<unknown>(id, locale)
  return toArray(page?.jsonLd)
}

export async function listServiceSlugs() {
  return ['coaching', 'running']
}

export async function loadService<T = unknown>(
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
