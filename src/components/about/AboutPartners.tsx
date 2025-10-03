// @path: src/components/about/AboutPartners.tsx
'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import PartnerCard from '@/components/shared/PartnerCard'

type PartnersData = {
  title?: string
  intro?: string
  items: Array<{
    imgSrc: string
    alt: string
    description: string
  }>
}

function useIsMdUp() {
  const [mdUp, setMdUp] = useState(false)
  useEffect(() => {
    const m = window.matchMedia('(min-width: 768px)')
    const onChange = () => setMdUp(m.matches)
    onChange()
    m.addEventListener('change', onChange)
    return () => m.removeEventListener('change', onChange)
  }, [])
  return mdUp
}

export default function AboutPartners({ data }: { data: PartnersData }) {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const mdUp = useIsMdUp()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const AMPL = mdUp ? 40 : 0
  const leftRaw = useTransform(scrollYProgress, [0, 1], [-AMPL, AMPL])
  const rightRaw = useTransform(scrollYProgress, [0, 1], [AMPL, -AMPL])
  const yLeft = useSpring(leftRaw, { stiffness: 120, damping: 20, mass: 0.2 })
  const yRight = useSpring(rightRaw, { stiffness: 120, damping: 20, mass: 0.2 })

  return (
    <section
      ref={sectionRef}
      className="grid-layout col-span-full bg-white py-20"
    >
      <div className="col-span-4 col-start-2 mb-6 md:col-span-12 md:col-start-2 lg:col-span-8 lg:col-start-4">
        <h3 className="text-title-1">{data.title}</h3>
      </div>

      <div className="col-span-4 col-start-2 mb-10 md:col-span-12 md:col-start-2 lg:col-span-8 lg:col-start-4">
        <p className="text-body-l-bold text-black">{data.intro}</p>
      </div>

      <div className="col-span-4 col-start-2 md:col-span-12 md:col-start-2 lg:col-span-8 lg:col-start-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {data.items.map((p, idx) => (
            <motion.div
              key={p.alt + idx}
              style={{
                y: mdUp ? (idx % 2 === 0 ? yLeft : yRight) : 0,
                willChange: mdUp ? 'transform' : 'auto',
              }}
              className={idx % 2 === 1 ? 'md:mt-10lg:mt-20' : ''}
            >
              <PartnerCard
                cardClassName="aspect-[311/384]"
                imgSrc={p.imgSrc}
                alt={p.alt}
                description={<p>{p.description}</p>}
                priority={idx === 0}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
