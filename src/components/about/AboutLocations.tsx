// @path: src/components/about/AboutLocations.tsx
'use client'
import PlaceCard from '@/components/shared/PlaceCard'
import type { AboutLocationsContent } from '@/content/types/about'

type Props = { data: AboutLocationsContent }

export default function AboutLocations({ data }: Props) {
  return (
    <section className="grid-layout col-span-full bg-white text-white">
      <div className="col-span-6 col-start-1 bg-black p-20 px-8 py-12 md:col-span-12 md:col-start-2 md:rounded-4xl xl:col-span-8 xl:col-start-4">
        <h3 className="text-title-2 md:text-title-1 mb-10 text-center">
          {data.wrapperTitle}
        </h3>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-4 lg:gap-8">
          {data.places.map((p, i) => (
            <PlaceCard
              key={p.name}
              className="aspect-[311/333] md:aspect-[202/216] lg:aspect-[352/330]"
              name={p.name}
              imgSrc={p.src}
              sections={p.sections}
              siteUrl={p.siteUrl}
              priority={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
