// @path: src/components/globals/Navigation.tsx
'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FocusScope,
  useDialog,
  useModal,
  useOverlay,
  usePreventScroll,
  OverlayContainer,
} from 'react-aria'

const LINKS = [
  { href: '/', label: 'ACCUEIL' },
  { href: '/about', label: 'À PROPOS' },
  { href: '/services', label: 'PRESTATIONS' },
  { href: '#', label: 'PRESSE' },
  { href: '/contact', label: 'CONTACT' },
]

function OverlayDialog({
  onClose,
  children,
}: {
  onClose: () => void
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)

  usePreventScroll()

  const { overlayProps, underlayProps } = useOverlay(
    { isOpen: true, onClose, isDismissable: true },
    ref,
  )

  const { modalProps } = useModal()
  const { dialogProps } = useDialog({ 'aria-label': 'Site menu' }, ref)

  return (
    <div
      id="site-menu"
      role="dialog"
      aria-modal="true"
      {...overlayProps}
      {...dialogProps}
      {...modalProps}
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[9999]"
    >
      <div
        {...underlayProps}
        className="pointer-events-auto absolute inset-0 z-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <FocusScope contain restoreFocus autoFocus>
        <div className="pointer-events-auto relative z-[2] flex h-full w-full items-center justify-center">
          {children}
        </div>
      </FocusScope>
    </div>
  )
}

export default function Navigation({ className = '' }: { className?: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return
    setOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <div className={className}>
      <Link
        href="/"
        className="font-heading text-title-3 md:text-title-2 pointer-events-auto fixed top-6 left-6 z-[1000] tracking-[0.08em] text-white uppercase"
      >
        JAY DOESITALL
      </Link>

      {!open && (
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen(true)}
          className="pointer-events-auto fixed top-6 right-6 z-[1000] rounded-2xl bg-white px-5 py-3 text-black shadow-lg ring-1 ring-black/10"
        >
          MENU
        </button>
      )}

      {mounted && open && (
        <OverlayContainer>
          <OverlayDialog onClose={() => setOpen(false)}>
            <button
              onClick={() => setOpen(false)}
              className="pointer-events-auto fixed top-6 right-6 z-[10000] rounded-2xl bg-white px-5 py-3 text-black shadow-lg ring-1 ring-black/10"
            >
              FERMER
            </button>

            <nav aria-label="Navigation principale">
              <ul className="flex flex-col items-center gap-4 md:gap-6">
                {LINKS.map((l) => {
                  const active = pathname === l.href
                  return (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className={[
                          'font-heading tracking-[0.06em] uppercase',
                          'transition-colors duration-150',
                          'text-title-2 md:text-display-s',
                          active
                            ? 'text-yellow'
                            : 'text-white/60 hover:text-white',
                        ].join(' ')}
                      >
                        {l.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </OverlayDialog>
        </OverlayContainer>
      )}
    </div>
  )
}
