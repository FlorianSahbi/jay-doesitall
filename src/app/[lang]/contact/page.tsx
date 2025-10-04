import type { Metadata } from 'next'
import Script from 'next/script'
import StickyHeroSection from '@/components/shared/StickyHeroSection'
import { PAGES } from '@/content/ids'
import { loadPage, getPageMeta, getPageJsonLd } from '@/content/loader'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = (rawLang === 'en' ? 'en' : 'fr') as 'fr' | 'en'
  return await getPageMeta(PAGES.CONTACT, lang)
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang = (rawLang === 'en' ? 'en' : 'fr') as 'fr' | 'en'

  const data = (await loadPage(PAGES.CONTACT, lang)) as any
  const { hero, kicker, title, intro, cta } = data

  const jsonLd = await getPageJsonLd(PAGES.CONTACT, lang)

  return (
    <>
      {jsonLd?.length > 0 && (
        <Script
          id="jsonld-contact"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(jsonLd)}
        </Script>
      )}

      <StickyHeroSection
        cover={hero.cover}
        alt={hero.alt}
        overlay={false}
        kicker={kicker}
        title={title}
        intro={intro}
      >
        <a
          href={cta.href}
          className="btn btn-sm lg:btn-lg btn-yellow-fill text-cta-s lg:text-cta-l"
        >
          {cta.label}
        </a>
      </StickyHeroSection>
    </>
  )
}
