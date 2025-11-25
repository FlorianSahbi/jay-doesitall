// @path: src/app/[lang]/services/page.tsx
import type { Metadata } from 'next'
import Script from 'next/script'
import StickyHeroSection from '@/components/shared/StickyHeroSection'
import ServiceCard from '@/components/shared/ServiceCard'
import { PAGES } from '@/content/ids'
import { getPageMeta, getPageJsonLd } from '@/content/loader'
import { getServicesPageContent } from '@/content/mappers/services'
import { normalizeLocale } from '@/i18n/locales'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = normalizeLocale(rawLang)
  return await getPageMeta(PAGES.SERVICES, lang)
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang = normalizeLocale(rawLang)

  const DATA = await getServicesPageContent(lang)
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
        coverDesktop={hero.cover.desktop}
        coverMobile={hero.cover.mobile}
        alt={hero.alt}
        overlay={false}
        kicker={kicker}
        title={title}
        intro={intro}
      >
        <div className="grid grid-cols-1 gap-4 gap-y-6 md:mt-16 md:grid-cols-2 lg:gap-8">
          {cards.map((c) => (
            <ServiceCard
              className="aspect-[311/420] lg:aspect-square"
              key={c.href}
              href={c.href}
              title={c.title}
              cover={c.cover}
              ctaLabel={c.ctaLabel}
            />
          ))}
        </div>
      </StickyHeroSection>
    </>
  )
}
