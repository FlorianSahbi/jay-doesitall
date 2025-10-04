// @path: src/i18n/locales.ts
export const LOCALES = ['fr', 'en'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'fr'

// Fast membership lookup for allowed locales (O(1) checks).
export const LOCALE_SET = new Set<string>(LOCALES as readonly string[])

/**
 * Normalize any incoming language code to a supported `Locale`.
 *
 * - If `input` exactly matches one of `LOCALES`, return it (typed as `Locale`).
 * - Otherwise, fall back to `DEFAULT_LOCALE`.
 *
 * Use this to avoid sprinkling `if (lang !== 'fr' && lang !== 'en')` checks everywhere
 * and to guarantee callers always receive a valid locale value.
 */
export function normalizeLocale(input?: string): Locale {
  return LOCALE_SET.has(input || '') ? (input as Locale) : DEFAULT_LOCALE
}
