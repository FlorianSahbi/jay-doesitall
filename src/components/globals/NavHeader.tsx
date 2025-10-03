// @path: src/components/globals/NavHeader.tsx
'use client'

import Link from 'next/link'

export default function NavHeader({
  onOpen,
  showMenuButton,
  hidden,
}: {
  onOpen: () => void
  showMenuButton: boolean
  hidden: boolean
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
            JAY DOESITALL
          </Link>

          {showMenuButton && (
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded={false}
              aria-controls="site-menu"
              onClick={onOpen}
              className="btn btn-sm text-cta-s lg:text-cta-l btn-black-fill"
            >
              MENU
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
