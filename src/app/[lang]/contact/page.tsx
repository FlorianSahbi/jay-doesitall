// @path: src/app/[lang]/contact/page.tsx
import type { Metadata } from 'next'
import Script from 'next/script'
import StickyHeroSection from '@/components/shared/StickyHeroSection'
import { PAGES } from '@/content/ids'
import { getPageMeta, getPageJsonLd } from '@/content/loader'
import { getContactPageContent } from '@/content/mappers/contact'
import { normalizeLocale } from '@/i18n/locales'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = normalizeLocale(rawLang)
  return await getPageMeta(PAGES.CONTACT, lang)
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang = normalizeLocale(rawLang)

  const data = await getContactPageContent(lang)
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
        <a href={cta.href} className="btn-yellow-fill">
          {cta.label}
        </a>
      </StickyHeroSection>
    </>
  )
}
