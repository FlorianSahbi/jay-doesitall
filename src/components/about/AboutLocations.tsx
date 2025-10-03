// @path: src/components/about/AboutLocations.tsx
'use client'
import PlaceCard from '@/components/shared/PlaceCard'

type LocationsData = {
  wrapperTitle?: string
  places: Array<{
    name: string
    src: string
    sections: { title: string; subtitle?: { text: string; href?: string } }[]
    siteUrl?: string
  }>
}

export default function AboutLocations({ data }: { data: LocationsData }) {
  return (
    <section className="grid-layout col-span-full text-white">
      <div className="col-span-4 col-start-2 md:col-span-12 md:col-start-2">
        <div className="overflow-hidden rounded-3xl bg-black px-4 py-8 md:px-8 md:py-12 lg:px-12 lg:py-16">
          <h3 className="text-title-1 mb-8 text-center md:mb-12">
            {data.wrapperTitle}
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {data.places.map((p, i) => (
              <PlaceCard
                key={p.name}
                className="aspect-[311/333] md:aspect-[4/3] lg:aspect-[5/4]"
                name={p.name}
                imgSrc={p.src}
                sections={p.sections}
                siteUrl={p.siteUrl}
                priority={i === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
