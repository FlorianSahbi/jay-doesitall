// @path: src/components/shared/StickyHeroSection.tsx
'use client'

import Image from 'next/image'
import type { ReactNode } from 'react'

type StickyHeroSectionProps = {
  coverDesktop: string
  coverMobile: string
  alt?: string
  topOverlapClass?: string
  kicker: string
  title: string
  intro: string
  children?: ReactNode
  overlay?: boolean
}

export default function StickyHeroSection({
  coverDesktop,
  coverMobile,
  alt = '',
  topOverlapClass = '-mt-[35vh]',
  kicker,
  title,
  intro,
  children,
  overlay = false,
}: StickyHeroSectionProps) {
  return (
    <section className="lg:grid-layout col-span-full">
      <div className="sticky top-0 h-screen lg:col-span-full">
        <div className="relative h-full">
          {/* Mobile */}
          <Image
            src={coverMobile}
            alt={alt}
            fill
            priority
            sizes="100vw"
            className="block object-cover md:hidden"
          />

          {/* Desktop */}
          <Image
            src={coverDesktop}
            alt={alt}
            fill
            priority
            sizes="100vw"
            className="hidden object-cover md:block"
          />

          {overlay && <div className="absolute inset-0 bg-black/40" />}
        </div>
      </div>

      <div
        className={`relative z-10 lg:col-span-10 lg:col-start-5 ${topOverlapClass}`}
      >
        <div className="md:pt-px-16 rounded-t-2xl bg-white px-8 pt-8 pb-16 text-black md:px-16 md:pt-16 md:pb-20 lg:px-20">
          <div>
            <p className="text-caption text-yellow mb-2">{kicker}</p>
            <h1 className="text-title-1 lg:text-display-s mb-8">{title}</h1>
            <p
              className="text-body-l-reg mb-6"
              dangerouslySetInnerHTML={{ __html: intro }}
            />
          </div>
          {children}
        </div>
      </div>
    </section>
  )
}
