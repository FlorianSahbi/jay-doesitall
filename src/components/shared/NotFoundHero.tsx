// @path: src/components/shared/NotFoundHero.tsx
'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation' // ✅ ton Link localisé (next-intl)

export default function NotFoundHero({
  backgroundImage,
  imageAlt,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
}: any) {
  return (
    <section className="grid-layout col-span-full bg-black">
      <div className="grid-layout relative col-span-full h-screen">
        <Image
          src={backgroundImage}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="relative z-10 col-span-4 col-start-2 flex h-full items-center justify-center text-center text-white md:col-span-12 md:col-start-2 lg:col-span-12 lg:col-start-2">
          <div>
            <h1 className="text-display-xl md:text-home-hero-md lg:text-home-hero-lg">
              {title}
            </h1>
            <p className="text-title-4 md:text-title-2 mb-6">{subtitle}</p>

            <Link href={ctaHref} className="btn-yellow-fill uppercase">
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
