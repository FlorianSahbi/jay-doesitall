// @path: src/components/globals/Navigation.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import NavHeader from './NavHeader'
import NavOverlay, { type NavItem } from './NavOverlay'
import { OverlayContainer } from 'react-aria'
import { useScroll, useMotionValueEvent } from 'framer-motion'

export default function Navigation({ menu }: { menu: NavItem[] }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)

  const { scrollY } = useScroll()
  const lastY = useRef(0)
  const THRESH = 8

  useEffect(() => {
    lastY.current = scrollY.get()
  }, [scrollY])

  useMotionValueEvent(scrollY, 'change', (y) => {
    if (open) {
      if (hidden) setHidden(false)
      lastY.current = y
      return
    }
    if (y <= 24) {
      setHidden(false)
    } else if (y - lastY.current > THRESH) {
      setHidden(true)
    } else if (lastY.current - y > THRESH) {
      setHidden(false)
    }
    lastY.current = y
  })

  useEffect(() => {
    if (open) setOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <div>
      <NavHeader
        onOpen={() => setOpen(true)}
        showMenuButton={!open}
        hidden={hidden}
      />

      {open && (
        <OverlayContainer>
          <NavOverlay menu={menu} onClose={() => setOpen(false)} />
        </OverlayContainer>
      )}
    </div>
  )
}
