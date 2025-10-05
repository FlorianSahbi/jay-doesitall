// @path: src/app/[lang]/services/page.tsx
import type { Metadata } from 'next'
import Script from 'next/script'
import { loadPage, getPageMeta, getPageJsonLd } from '@/content/loader'
import StickyHeroSection from '@/components/shared/StickyHeroSection'
import ServiceCard from '@/components/shared/ServiceCard'
import { PAGES } from '@/content/ids'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = (rawLang === 'en' ? 'en' : 'fr') as 'fr' | 'en'
  return await getPageMeta(PAGES.SERVICES, lang)
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang = (rawLang === 'en' ? 'en' : 'fr') as 'fr' | 'en'

  const DATA = (await loadPage(PAGES.SERVICES, lang)) as any
  const { hero, kicker, title, intro, cards } = DATA

  const jsonLd = await getPageJsonLd(PAGES.SERVICES, lang)

  return (
    <>
      {jsonLd?.length > 0 && (
        <Script
          id="jsonld-services"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(jsonLd)}
        </Script>
      )}

      <StickyHeroSection
        cover={hero.cover}
        alt={hero.alt}
        overlay
        kicker={kicker}
        title={title}
        intro={intro}
      >
        <div className="grid grid-cols-1 gap-4 gap-y-6 md:mt-16 md:grid-cols-2 lg:gap-8">
          {cards.map((c: any) => (
            <ServiceCard
              className="aspect-[311/420] lg:aspect-square"
              key={c.href}
              href={c.href}
              title={c.title}
              cover={c.cover}
              sizes={c.sizes}
              ctaLabel={c.ctaLabel}
            />
          ))}
        </div>
      </StickyHeroSection>
    </>
  )
}
