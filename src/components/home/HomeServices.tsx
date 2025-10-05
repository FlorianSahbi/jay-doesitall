// @path: src/components/home/HomeServices.tsx
'use client'

import { Link } from '@/i18n/navigation'
import ServiceCard from '../shared/ServiceCard'
import type { HomeServicesContent } from '@/content/types/home'

type HomeServicesProps = {
  data: HomeServicesContent
}

export default function HomeServices({ data }: HomeServicesProps) {
  return (
    <section className="grid-layout col-span-full bg-black py-20 text-white lg:py-32">
      <div className="col-span-4 col-start-2 md:col-span-12 md:col-start-2 lg:col-span-10 lg:col-start-3">
        <h2 className="text-title-2 md:text-title-1 lg:text-display-s text-center">
          {data.title}
        </h2>

        <div className="mt-8 mb-10">
          <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-8">
            {data.cards.map((c) => (
              <div key={c.href}>
                <ServiceCard
                  className="aspect-[311/420] md:aspect-[304/420] lg:aspect-[515/420]"
                  href={c.href}
                  title={c.title}
                  cover={c.cover}
                  ctaLabel={c.ctaLabel}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link
            href={data.ctaHref}
            className="btn-yellow-outline text-white uppercase"
          >
            {data.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
