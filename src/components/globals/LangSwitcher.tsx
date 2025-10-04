// @path: src/components/globals/LangSwitcher.tsx
'use client'

import { useMemo } from 'react'
import { useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'

export default function LangSwitcher({ className }: { className?: string }) {
  const locale = useLocale()
  const otherLocale = useMemo(() => (locale === 'fr' ? 'en' : 'fr'), [locale])
  const pathname = usePathname()

  const href = useMemo(() => {
    if (typeof window === 'undefined') return pathname
    return pathname + window.location.search + window.location.hash
  }, [pathname])

  const base = 'uppercase text-cta-s lg:text-cta-l'
  const pill =
    'rounded-full px-3 py-1.5 bg-black/70 text-white ring-1 ring-black/10 hover:bg-black'
  const finalClassName = [base, pill, className].filter(Boolean).join(' ')

  return (
    <Link
      href={href}
      locale={otherLocale}
      scroll={false}
      aria-label={`Switch to ${otherLocale.toUpperCase()}`}
      className={finalClassName}
    >
      {otherLocale.toUpperCase()}
    </Link>
  )
}
