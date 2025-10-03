// @path: src/components/shared/PartnerCard.tsx
import Image from 'next/image'
import type { ReactNode } from 'react'

export default function PartnerCard({
  imgSrc,
  alt,
  description,
  sizes = '(min-width:1440px) 36vw, (min-width:768px) 48vw, 92vw',
  className = '',
  cardClassName = '',
  priority = false,
}: {
  imgSrc: string
  alt: string
  description: ReactNode
  sizes?: string
  className?: string
  cardClassName?: string
  priority?: boolean
}) {
  return (
    <article className={className}>
      <div
        className={`relative mb-8 w-full overflow-hidden rounded-2xl ${cardClassName}`}
      >
        <Image
          src={imgSrc}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
      <div className="text-body-s-reg text-black">{description}</div>
    </article>
  )
}
