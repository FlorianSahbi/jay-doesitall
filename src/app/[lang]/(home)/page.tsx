import type { Metadata } from 'next'
import Script from 'next/script'
import { loadPage, getPageMeta, getPageJsonLd } from '@/content/loader'
import HomeHero from '@/components/home/HomeHero'
import HomeServices from '@/components/home/HomeServices'
import HomeTestimonials from '@/components/home/HomeTestimonials'
import HomeWhyMe from '@/components/home/HomeWhyMe'
import { PAGES } from '@/content/ids'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = (rawLang === 'en' ? 'en' : 'fr') as 'fr' | 'en'
  return await getPageMeta(PAGES.HOME, lang)
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang = (rawLang === 'en' ? 'en' : 'fr') as 'fr' | 'en'

  const DATA = (await loadPage(PAGES.HOME, lang)) as any
  const { hero, services, testimonials, whyMe } = DATA

  const jsonLd = await getPageJsonLd(PAGES.HOME, lang)

  return (
    <>
      {jsonLd?.length > 0 && (
        <Script
          id="jsonld-home"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(jsonLd)}
        </Script>
      )}

      <HomeHero data={hero} />
      <HomeServices data={services} />
      <HomeTestimonials data={testimonials} />
      <HomeWhyMe data={whyMe} />
    </>
  )
}
