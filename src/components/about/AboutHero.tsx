// @path: src/components/about/AboutHero.tsx
'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function AboutHero({ data }: any) {
  const cover = data?.cover
  const kicker = data?.kicker ?? 'À PROPOS'
  const title = data?.title ?? 'COACH SPORTIF & EXPERT EN RUNNING'
  const paragraphs = data?.paragraphs ?? []
  const credo = data?.credo
  const overlapInput = data?.overlap ?? '12vh'
  const overlap =
    typeof overlapInput === 'number' ? `${overlapInput}px` : overlapInput

  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [imgOpacity, setImgOpacity] = useState(1)

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const fadeDist = Math.max(1, window.innerHeight * 0.18)
      // rect.top passe de 0 (en haut) à négatif quand on scrolle
      const progress = Math.min(Math.max(-rect.top / fadeDist, 0), 1)
      setImgOpacity(1 - progress)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="grid-layout col-span-full bg-black text-white"
    >
      {/* IMAGE HERO : ~90% viewport en desktop, un peu moins en mobile */}
      {cover ? (
        <div
          className="pointer-events-none top-0 z-0 col-span-full transition-opacity duration-500"
          style={{ opacity: imgOpacity }}
        >
          <div className="relative h-[78vh] max-h-[1080px] w-full md:h-[84vh] lg:h-[90vh]">
            <Image
              src={cover}
              alt={title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-top"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent via-black/40 to-black" />
          </div>
        </div>
      ) : null}

      <div className="col-span-4 col-start-2 md:col-span-12 md:col-start-2 lg:col-span-8 lg:col-start-4 xl:col-span-4 xl:col-start-6">
        <div
          className="relative z-10 pb-20 lg:pb-32"
          style={{ marginTop: `calc(-1 * ${overlap})` }}
        >
          <p className="text-caption text-yellow mb-2">{kicker}</p>

          <h1 className="text-title-1 md:text-display-s lg:text-display-xl mb-6 leading-tight">
            {title}
          </h1>

          <div className="">
            {paragraphs.map((p: any, i: number) => (
              <p
                key={i}
                className="text-body-s-reg lg:text-body-l-reg mt-4 leading-relaxed"
              >
                {p}
              </p>
            ))}
          </div>

          <div className="mt-16 text-center lg:mt-20">
            <p className="text-caption mb-2 text-white">{credo?.kicker}</p>

            <h2 className="text-display-s lg:text-display-xl text-yellow mb-16 justify-self-center text-center lg:mb-20 lg:max-w-9/12">
              {credo?.title}
            </h2>

            <p className="text-body-l-reg text-white">{credo?.text}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
