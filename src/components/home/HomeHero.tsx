// @path: src/components/home/HomeHero.tsx
'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import type { HomeHeroContent } from '@/content/types/home'

type HomeHeroProps = {
  data: HomeHeroContent
}

export default function HomeHero({ data }: HomeHeroProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const cardY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.35, 1],
    ['140px', '0px', '-6px', '-8px'],
    { clamp: true },
  )

  return (
    <section ref={ref} className="grid-layout col-span-full bg-black">
      <div className="grid-layout relative col-span-full h-screen">
        <Image
          src={data.backgroundImage}
          alt={data.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="relative z-10 col-span-4 col-start-2 flex h-full items-center justify-center text-center text-white md:col-span-12 md:col-start-2 lg:col-span-12 lg:col-start-2">
          <div>
            <h1 className="text-display-xl md:text-home-hero-md lg:text-home-hero-lg">
              {data.title}
            </h1>
            <p className="text-title-4 md:text-title-2 mb-6">{data.subtitle}</p>
            <button className="btn-yellow-fill">{data.ctaLabel}</button>
          </div>
        </div>
      </div>

      <motion.div
        style={{ y: cardY }}
        className="grid-layout col-span-full -mt-14 rounded-t-4xl bg-white pt-10 pb-20 will-change-transform md:col-span-12 md:col-start-2 md:rounded-4xl md:py-12 lg:col-span-12 lg:col-start-2 lg:py-20"
      >
        <p className="text-caption text-yellow col-span-4 col-start-2 mb-2">
          {data.about.kicker}
        </p>

        <p className="text-heading-s md:text-heading-m lg:text-heading-l col-span-4 col-start-2 mb-6 md:col-span-12 md:col-start-2 lg:mb-10">
          {data.about.text}
        </p>

        <button className="btn-yellow-outline col-span-4 col-start-2 max-w-max text-black">
          {data.about.ctaLabel}
        </button>
      </motion.div>
    </section>
  )
}
