// @path: src/components/home/HomeTestimonials.tsx
'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

export default function HomeTestimonials({ data }: { data: any }) {
  return (
    <section className="grid-layout col-span-full bg-white lg:py-20">
      <div className="bg-yellow col-span-full py-10 md:py-20 lg:col-span-12 lg:col-start-2 lg:rounded-2xl">
        <h2 className="text-title-2 md:text-title-1 lg:text-display-s text-center">
          {data.title}
        </h2>

        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true, el: '.testimonials-pagination' }}
          className="my-8 [--slide-w:280px] md:[--slide-w:340px] xl:[--slide-w:400px]"
          slidesPerView="auto"
          spaceBetween={16}
          slidesOffsetBefore={24}
          slidesOffsetAfter={24}
          watchOverflow
          centerInsufficientSlides
          breakpoints={{
            768: {
              spaceBetween: 16,
              slidesOffsetBefore: 64,
              slidesOffsetAfter: 64,
            },
            1440: {
              spaceBetween: 32,
              slidesOffsetBefore: 80,
              slidesOffsetAfter: 80,
            },
          }}
        >
          {data.items.map((item: any, i: number) => (
            <SwiperSlide key={i} className="!w-auto">
              <div className="aspect-[327/209] w-[var(--slide-w)] max-w-[85vw] flex-none rounded-3xl bg-white p-6 text-black md:aspect-[367/209]">
                <p className="text-body-s-reg mb-6 text-center">{item.text}</p>
                <p className="text-caption text-center">{item.author}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          className="testimonials-pagination flex justify-center gap-2"
          style={
            {
              '--swiper-pagination-bullet-size': '8px',
              '--swiper-pagination-color': 'var(--color-black)',
              '--swiper-pagination-bullet-inactive-color': 'var(--color-black)',
              '--swiper-pagination-bullet-inactive-opacity': '0.2',
              position: 'static',
              display: 'flex',
              justifyContent: 'center',
            } as React.CSSProperties
          }
        />
      </div>
    </section>
  )
}
