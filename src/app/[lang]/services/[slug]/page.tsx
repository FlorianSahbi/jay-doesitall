// @path: src/app/[lang]/services/[slug]/page.tsx
import type { Metadata } from 'next'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import {
  getStaticParamsServices,
  getPageMeta,
  getPageJsonLd,
} from '@/content/loader'
import ServicePlanCard from '@/components/shared/ServicePlanCard'
import StickyHeroSection from '@/components/shared/StickyHeroSection'
import { getServiceContent } from '@/content/mappers/services'
import { Locale, LOCALES, normalizeLocale } from '@/i18n/locales'

export async function generateStaticParams() {
  const slugs = await getStaticParamsServices()
  return LOCALES.flatMap((lang: Locale) =>
    slugs.map(({ slug }) => ({ lang, slug })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang: rawLang, slug } = await params
  const lang = normalizeLocale(rawLang)
  return await getPageMeta(slug, lang)
}

export default async function ServiceSlugPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang: rawLang, slug } = await params
  const lang = normalizeLocale(rawLang)

  const service = await getServiceContent(slug, lang)
  if (!service) return notFound()

  const jsonLd = await getPageJsonLd(slug, lang)

  return (
    <>
      {jsonLd?.length > 0 && (
        <Script
          id={`jsonld-service-${slug}`}
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(jsonLd)}
        </Script>
      )}

      <StickyHeroSection
        coverDesktop={service.hero.cover.desktop}
        coverMobile={service.hero.cover.mobile}
        alt={service.title}
        overlay={false}
        kicker={service.kicker}
        title={service.title.toUpperCase()}
        intro={service.description}
      >
        <div className="grid grid-cols-1 gap-4 gap-y-6 lg:grid-cols-3 lg:gap-8">
          {service.plans.map((p) => (
            <ServicePlanCard
              key={p.title}
              title={p.title}
              price={p.price}
              features={p.features}
              type={p.type}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-6 text-center">
          <Link href="/contact" className="btn-yellow-fill">
            {lang === 'fr' ? 'Réserver un coaching !' : 'Book coaching!'}
          </Link>

          <Link href="/services" className="link-black text-cta-l">
            {lang === 'fr' ? 'Retour aux prestations' : 'Back to services'}
          </Link>
        </div>
      </StickyHeroSection>
    </>
  )
}
