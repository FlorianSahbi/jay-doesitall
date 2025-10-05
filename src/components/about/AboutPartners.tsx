// @path: src/components/about/AboutPartners.tsx
'use client'

import { useRef } from 'react'
import PartnerCard from '@/components/shared/PartnerCard'
import type { AboutPartnersContent } from '@/content/types/about'

type Props = { data: AboutPartnersContent }

export default function AboutPartners({ data }: Props) {
  const sectionRef = useRef<HTMLDivElement | null>(null)

  return (
    <section
      ref={sectionRef}
      className="grid-layout col-span-full bg-white py-20"
    >
      <div className="col-span-4 col-start-2 md:col-span-12 md:col-start-2 lg:col-span-8 lg:col-start-4 xl:col-span-6 xl:col-start-5">
        <h3 className="text-title-1 mb-6">{data.title}</h3>

        <p className="text-body-l-bold mb-10 text-black lg:mb-20">
          {data.intro}
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-8">
          {data.items.map((p, idx) => (
            <div
              key={p.alt + idx}
              className={idx % 2 === 1 ? 'mt-10 md:mt-20' : ''}
            >
              <PartnerCard
                cardClassName="aspect-[311/384]"
                imgSrc={p.imgSrc}
                alt={p.alt}
                description={<p>{p.description}</p>}
                priority={idx === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
