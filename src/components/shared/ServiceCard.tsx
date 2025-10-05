// @path: src/components/shared/ServiceCard.tsx
'use client'

import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import type { ServicesIndexCard } from '@/content/types/services'

type ServiceCardProps = Pick<
  ServicesIndexCard,
  'href' | 'title' | 'cover' | 'ctaLabel'
> & {
  className?: string
  sizes?: string
}

export default function ServiceCard({
  href,
  title,
  cover,
  sizes = '100vw',
  ctaLabel,
  className = '',
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={`group relative block h-full w-full overflow-hidden rounded-4xl ${className}`}
    >
      <Image
        src={cover}
        alt={title}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-1200 group-hover:scale-105"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-end p-6 pb-10 lg:pb-12">
        <h3 className="text-title-2 md:text-title-1 mb-4 text-center text-white uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
          {title}
        </h3>

        <span className="btn-yellow-fill uppercase">{ctaLabel}</span>
      </div>
    </Link>
  )
}
