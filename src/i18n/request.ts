// @path: src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server'
import { LOCALES, DEFAULT_LOCALE, type Locale } from '@/i18n/locales'

const ALLOWED = new Set<string>(LOCALES as readonly string[])

export default getRequestConfig(({ locale }) => {
  const loc = typeof locale === 'string' ? locale : ''
  const normalized: Locale = ALLOWED.has(loc) ? (loc as Locale) : DEFAULT_LOCALE

  return {
    locale: normalized,
    messages: {},
  }
})
