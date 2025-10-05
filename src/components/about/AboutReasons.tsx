// @path: src/components/about/AboutReasons.tsx
'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import Image from 'next/image'
import FeatureLine from '@/components/shared/FeatureLine'
import type { AboutReasonsContent } from '@/content/types/about'

type Props = { data: AboutReasonsContent }

export default function AboutReasons({ data }: Props) {
  return (
    <section className="grid-layout col-span-full bg-white py-20 lg:py-32">
      <div className="col-span-4 col-start-2 mb-6 md:col-span-12 md:col-start-2 lg:col-span-8 lg:col-start-4 xl:col-span-4 xl:col-start-6">
        <h3 className="text-title-2">{data.title}</h3>
      </div>

      <div className="col-span-4 col-start-2 mb-10 md:col-span-12 md:col-start-2 lg:col-span-8 lg:col-start-4 lg:mb-16 xl:col-span-4 xl:col-start-6">
        <ul className="space-y-6">
          {data.items.map((t, i) => (
            <FeatureLine key={i} className="text-body-l-reg">
              {t}
            </FeatureLine>
          ))}
        </ul>
      </div>

      <div className="col-span-5 col-start-2 mb-10 md:col-span-13 md:col-start-2 lg:col-start-4 lg:mb-16 xl:col-span-9 xl:col-start-6">
        <Swiper
          modules={[Autoplay]}
          loop
          speed={1000}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={12}
          slidesPerView={1.2}
          breakpoints={{
            768: { slidesPerView: 2.4, spaceBetween: 16 },
            1440: { slidesPerView: 3.6, spaceBetween: 32 },
          }}
        >
          {data.gallery.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative aspect-[293/440] w-full overflow-hidden rounded-2xl">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width:1440px) 30vw, (min-width:768px) 31vw, 90vw"
                  className="object-cover transition-transform duration-300 will-change-transform hover:scale-[1.03]"
                  priority={i === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="col-span-5 col-start-2 md:col-span-12 md:col-start-2 lg:col-span-8 lg:col-start-4 xl:col-span-4 xl:col-start-6">
        <button className="btn-yellow-fill">{data.ctaLabel}</button>
      </div>
    </section>
  )
}
