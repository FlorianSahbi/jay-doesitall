// @path: src/components/shared/PlaceCard.tsx
'use client'
import Image from 'next/image'

type Section = {
  title: string
  subtitle?: { text: string; href?: string }
}

export default function PlaceCard({
  name,
  imgSrc,
  sections,
  siteUrl,
  className,
  priority = false,
  sizes = '100vw',
}: {
  name: string
  imgSrc: string
  sections: Section[]
  siteUrl?: string
  priority?: boolean
  sizes?: string
  className?: string
}) {
  return (
    <article className={`rounded-2xl ${className}`}>
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
        <Image
          src={imgSrc}
          alt={name}
          fill
          sizes={sizes}
          className="object-cover"
          priority={priority}
        />
      </div>

      <div className="mt-6 space-y-6">
        {sections.map((s, i) => (
          <div key={i}>
            <h4 className="text-title-3 uppercase">{s.title}</h4>
            {s.subtitle ? (
              s.subtitle.href ? (
                <a
                  href={s.subtitle.href}
                  className="text-body-s-reg btn-link inline-block font-light text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.subtitle.text}
                </a>
              ) : (
                <p className="text-body-s-reg text-white">{s.subtitle.text}</p>
              )
            ) : null}
          </div>
        ))}

        <a
          href={siteUrl}
          className="text-caption text-yellow inline-block"
          target="_blank"
          rel="noopener noreferrer"
          // eslint-disable-next-line i18next/no-literal-string
        >
          SITE INTERNET
        </a>
      </div>
    </article>
  )
}
