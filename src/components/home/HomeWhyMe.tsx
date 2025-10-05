// @path: src/components/home/HomeWhyMe.tsx
'use client'

import Image from 'next/image'

export default function HomeWhyMe({ data }: { data: any }) {
  return (
    <section className="relative col-span-full overflow-hidden py-20 lg:aspect-video">
      <Image
        src={data.backgroundImage}
        alt={data.backgroundAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="relative z-10 flex h-full items-end justify-center">
        <div className="grid-layout w-full text-white">
          <div className="col-span-4 col-start-2 md:col-span-12 md:col-start-2">
            <h2 className="text-title-2 lg:text-display-s col-span-full text-center">
              {data.title}
            </h2>
          </div>

          <div className="col-span-4 col-start-2 md:col-span-12 md:col-start-2">
            <div className="mx-auto max-w-80 md:max-w-2xl lg:max-w-5xl">
              <div className="mt-8 mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {data.items.map((item: any) => (
                  <div
                    key={item.num}
                    className="aspect-[312/175] rounded-3xl bg-white p-6 md:aspect-[312/204] lg:aspect-square"
                  >
                    <div className="text-black">
                      <span className="text-title-1 text-yellow">
                        {item.num}
                      </span>
                      <h3 className="text-title-3 mt-4 mb-1">{item.title}</h3>
                      <p className="text-body-s-reg">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-4 col-start-2 justify-self-center md:col-span-12 md:col-start-2">
            <button className="btn-yellow-fill">{data.ctaLabel}</button>
          </div>
        </div>
      </div>
    </section>
  )
}
