// @path: src/app/[lang]/about/page.tsx
import type { Metadata } from 'next'
import Script from 'next/script'
import { loadPage, getPageMeta, getPageJsonLd } from '@/content/loader'
import AboutHero from '@/components/about/AboutHero'
import AboutLocations from '@/components/about/AboutLocations'
import AboutPartners from '@/components/about/AboutPartners'
import AboutReasons from '@/components/about/AboutReasons'
import { PAGES } from '@/content/ids'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = (rawLang === 'en' ? 'en' : 'fr') as 'fr' | 'en'
  return await getPageMeta(PAGES.ABOUT, lang)
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang = (rawLang === 'en' ? 'en' : 'fr') as 'fr' | 'en'

  const DATA = (await loadPage(PAGES.ABOUT, lang)) as any
  const { hero, reasons, locations, partners } = DATA

  const jsonLd = await getPageJsonLd(PAGES.ABOUT, lang)

  return (
    <>
      {jsonLd?.length > 0 && (
        <Script
          id="jsonld-about"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(jsonLd)}
        </Script>
      )}

      <AboutHero data={hero} />
      <AboutReasons data={reasons} />
      <AboutLocations data={locations} />
      <AboutPartners data={partners} />
    </>
  )
}
