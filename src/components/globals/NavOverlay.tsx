// @path: src/components/globals/NavOverlay.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FocusScope,
  useDialog,
  useModal,
  useOverlay,
  usePreventScroll,
} from 'react-aria'
import { motion, type Variants } from 'framer-motion'
import { useRef } from 'react'

export type NavItem = { label: string; href: string }

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}
const listVariants: Variants = {
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
}
const itemVariants: Variants = {
  hidden: { opacity: 0, y: -6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.18, ease: 'easeOut' as const },
  },
}

export default function NavOverlay({
  menu,
  onClose,
}: {
  menu: NavItem[]
  onClose: () => void
}) {
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)

  usePreventScroll()
  const { overlayProps, underlayProps } = useOverlay(
    { isOpen: true, onClose, isDismissable: true },
    ref,
  )
  const { modalProps } = useModal()
  const { dialogProps } = useDialog({ 'aria-label': 'Site menu' }, ref)

  const underlayMotionSafe = { ...(underlayProps as any) }
  delete (underlayMotionSafe as any).onAnimationStart
  delete (underlayMotionSafe as any).onAnimationEnd
  delete (underlayMotionSafe as any).onAnimationStartCapture
  delete (underlayMotionSafe as any).onAnimationEndCapture

  return (
    <div
      id="site-menu"
      role="dialog"
      aria-modal="true"
      {...overlayProps}
      {...dialogProps}
      {...modalProps}
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
    >
      <motion.div
        {...underlayMotionSafe}
        initial="hidden"
        animate="visible"
        variants={backdropVariants}
        className="pointer-events-auto absolute inset-0 z-0 bg-black/80 backdrop-blur-md md:backdrop-blur-lg"
        onClick={onClose}
        transition={{ duration: 0.22 }}
      />

      <FocusScope contain restoreFocus autoFocus>
        <div className="pointer-events-auto relative z-[2] flex h-full w-full items-center justify-center">
          <button
            onClick={onClose}
            className="btn btn-sm text-cta-s lg:text-cta-l btn-black-fill pointer-events-auto fixed top-6 right-6 z-[10000]"
          >
            FERMER
          </button>

          <nav aria-label="Navigation principale">
            <motion.ul
              className="flex flex-col items-center gap-4 md:gap-6"
              initial="hidden"
              animate="visible"
              variants={listVariants}
            >
              {menu.map((l) => {
                const active = pathname === l.href
                return (
                  <motion.li key={l.href} variants={itemVariants}>
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
                  </motion.li>
                )
              })}
            </motion.ul>
          </nav>
        </div>
      </FocusScope>
    </div>
  )
}
