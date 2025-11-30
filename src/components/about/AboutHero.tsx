// @path: src/components/about/AboutHero.tsx
'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { AboutHeroContent } from '@/content/types/about'
import { linkifyKeywords } from '@/lib/linkifyKeywords'

type Props = { data: AboutHeroContent }

export default function AboutHero({ data }: Props) {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [imgOpacity, setImgOpacity] = useState(1)
  const overlap =
    typeof data.overlap === 'number' ? `${data.overlap}px` : data.overlap

  useEffect(() => {
    // const onScroll = () => {
    //   const el = sectionRef.current
    //   if (!el) return
    //   const rect = el.getBoundingClientRect()
    //   const fadeDist = Math.max(1, window.innerHeight * 0.18)
    //   const progress = Math.min(Math.max(-rect.top / fadeDist, 0), 1)
    //   setImgOpacity(1 - progress)
    // }
    // onScroll()
    // window.addEventListener('scroll', onScroll, { passive: true })
    // return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="grid-layout relative col-span-full bg-black text-white"
    >
      <div className="absolute h-[600px] w-full md:h-[100%]">
        <Image
          src={data.coverMobile}
          alt={data.title}
          fill
          priority
          sizes="100vw"
          className="block object-cover md:hidden"
        />
        <Image
          src={data.cover}
          alt={data.title}
          fill
          priority
          sizes="100vw"
          className="m-[auto] hidden max-w-370 object-cover object-top md:block"
        />
      </div>
      <div
        className="pointer-events-none top-0 z-0 col-span-full transition-opacity duration-500"
        style={{ opacity: imgOpacity }}
      >
        <div className="relative h-[400px] max-h-[1080px] w-full md:h-[84vh] lg:h-[800px]">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3" />
        </div>
      </div>

      <div className="col-span-4 col-start-2 md:col-span-12 md:col-start-2 lg:col-span-8 lg:col-start-4 xl:col-span-4 xl:col-start-6">
        <div
          className="relative z-10 pb-20 lg:pb-32"
          style={{ marginTop: `calc(-1 * ${overlap})` }}
        >
          <p className="text-caption text-yellow mb-2">{data.kicker}</p>

          <h1 className="text-title-1 md:text-display-s lg:text-display-xl mb-6 leading-tight">
            {data.title}
          </h1>

          <div>
            {data.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-body-s-reg lg:text-body-l-reg mt-4 leading-relaxed"
              >
                {p}
              </p>
            ))}
          </div>

          <div className="mt-16 text-center lg:mt-20">
            <p className="text-caption mb-2 text-white">{data.credo.kicker}</p>

            <h2 className="text-display-s lg:text-display-xl text-yellow mb-16 justify-self-center text-center lg:mb-20 lg:max-w-9/12">
              {data.credo.title}
            </h2>

            <p className="text-body-l-reg text-white">
              {linkifyKeywords(data.credo.text)}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
