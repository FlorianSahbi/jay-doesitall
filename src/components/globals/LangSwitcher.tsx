// @path: src/components/globals/LangSwitcher.tsx
'use client'

import { useCallback, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function LangSwitcher({
  className,
  defaultLocale = 'fr',
  appearance = 'auto',
}: {
  className?: string
  defaultLocale?: 'fr' | 'en' | (string & {})
  appearance?: 'auto' | 'pill' | 'outline' | 'light' | 'dark'
}) {
  const router = useRouter()
  const pathname = usePathname() || '/'
  const searchParams = useSearchParams()

  const { otherLocale, restPath } = useMemo(() => {
    const supported = new Set(['fr', 'en'])
    const segs = pathname.split('/')
    const first = segs[1] || ''
    const hasLocale = supported.has(first)
    const current = (hasLocale ? first : defaultLocale) as string
    const other = current === 'fr' ? 'en' : 'fr'
    const rest = hasLocale ? segs.slice(2).join('/') : segs.slice(1).join('/')
    return { otherLocale: other, restPath: rest }
  }, [pathname, defaultLocale])

  const switchLocale = useCallback(() => {
    const q = searchParams?.toString()
    const hash = typeof window !== 'undefined' ? window.location.hash : ''
    const base = '/' + otherLocale + (restPath ? '/' + restPath : '')
    const target = base + (q ? `?${q}` : '') + (hash || '')
    router.push(target, { scroll: false })
  }, [otherLocale, restPath, searchParams, router])

  const preset =
    appearance === 'auto'
      ? 'mix-blend-difference text-white'
      : appearance === 'pill'
        ? 'rounded-full px-3 py-1.5 bg-black/70 text-white ring-1 ring-black/10 hover:bg-black'
        : appearance === 'outline'
          ? 'rounded-full px-3 py-1.5 text-black ring-1 ring-black/15 hover:bg-black hover:text-white transition-colors'
          : appearance === 'light'
            ? 'text-white/80 hover:text-white'
            : 'text-black/80 hover:text-black'

  const base = 'uppercase text-cta-s lg:text-cta-l'
  const finalClassName = [base, preset, className].filter(Boolean).join(' ')

  return (
    <button
      type="button"
      onClick={switchLocale}
      aria-label={`Switch to ${otherLocale.toUpperCase()}`}
      className={finalClassName}
    >
      {otherLocale.toUpperCase()}
    </button>
  )
}
