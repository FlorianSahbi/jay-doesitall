// @path: src/components/globals/NavHeader.tsx
'use client'

import { Link } from '@/i18n/navigation'
import LangSwitcher from './LangSwitcher'

export default function NavHeader({
  onOpen,
  showMenuButton,
  openLabel,
  brand,
  hidden,
}: {
  onOpen: () => void
  showMenuButton: boolean
  openLabel: string
  brand: string
  hidden: boolean
  onHoldHeader?: () => void
}) {
  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-[1000]',
        'transition-transform duration-300 will-change-transform',
        hidden ? '-translate-y-full' : 'translate-y-0',
      ].join(' ')}
    >
      <div className="grid-layout grid items-center py-6">
        <div className="col-span-4 col-start-2 flex items-center justify-between md:col-span-12 md:col-start-2">
          <Link
            href="/"
            className="font-heading text-title-3 md:text-title-2 relative top-0.5 tracking-[0.08em] text-white uppercase"
          >
            {brand}
          </Link>

          <div className="flex items-center gap-4">
            <LangSwitcher />

            {showMenuButton && (
              <button
                type="button"
                aria-haspopup="dialog"
                aria-expanded={false}
                aria-controls="site-menu"
                onClick={onOpen}
                className="btn-black-fill"
              >
                {openLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
