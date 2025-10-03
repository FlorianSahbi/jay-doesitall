// @path: src/components/shared/StickyHeroSection.tsx
'use client'

import Image from 'next/image'
import { ReactNode } from 'react'

type Props = {
  cover: string
  alt?: string
  overlay?: boolean | string
  topOverlapClass?: string
  cardClassName?: string
  kicker?: string
  title?: string
  intro?: ReactNode
  children?: ReactNode
}

export default function StickyHeroSection({
  cover,
  alt = '',
  topOverlapClass = '-mt-[20vh]',
  kicker,
  title,
  intro,
  children,
}: Props) {
  return (
    <section className="lg:grid-layout col-span-full">
      <div className="sticky top-0 h-screen lg:col-span-full">
        <Image
          src={cover}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div
        className={`relative z-10 lg:col-span-10 lg:col-start-5 ${topOverlapClass}`}
      >
        <div className="md:pt-px-16 rounded-t-2xl bg-white px-8 pt-8 pb-16 text-black md:px-16 md:pt-16 md:pb-20 lg:px-20">
          <div>
            <p className="text-caption text-yellow mb-2">{kicker}</p>
            <h1 className="text-title-1 lg:text-display-s mb-8">{title}</h1>
            <p className="text-body-l-reg mb-6">{intro}</p>
          </div>
          {children}
        </div>
      </div>
    </section>
  )
}
