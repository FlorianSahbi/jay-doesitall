// @path: src/content/loader.ts
import 'server-only'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/locales'
import { DEFAULT_LOCALE } from '@/i18n/locales'

const toArray = (v?: any | any[]) => (Array.isArray(v) ? v : v ? [v] : [])

async function importContent<T = any>(id: string, locale: Locale): Promise<T> {
  try {
    return (await import(`@/content/${id}.${locale}.json`)).default as T
  } catch {
    return (await import(`@/content/${id}.${DEFAULT_LOCALE}.json`)).default as T
  }
}

export async function loadGlobals(
  locale: Locale = DEFAULT_LOCALE,
): Promise<any> {
  return importContent<any>('globals', locale) // ⬅️ plus de prefix ici
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
