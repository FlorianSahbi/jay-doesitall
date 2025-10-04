// @path: src/app/[lang]/services/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { getStaticParamsServices, loadService } from '@/content/loader'
import ServicePlanCard from '@/components/shared/ServicePlanCard'
import StickyHeroSection from '@/components/shared/StickyHeroSection'

export async function generateStaticParams() {
  const slugs = await getStaticParamsServices()
  const langs: Array<'fr' | 'en'> = ['fr', 'en']
  return langs.flatMap((lang) => slugs.map(({ slug }) => ({ lang, slug })))
}

export default async function ServiceSlugPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang: rawLang, slug } = await params
  const lang = (rawLang === 'en' ? 'en' : 'fr') as 'fr' | 'en'

  const data = (await loadService(slug, lang)) as any
  if (!data) return notFound()
  const { service } = data

  const kicker = lang === 'fr' ? 'PRESTATIONS' : 'SERVICES'

  return (
    <StickyHeroSection
      cover={service.cover}
      alt={service.title}
      overlay
      kicker={kicker}
      title={service.title.toUpperCase()}
      intro={service.description}
    >
      <div className="grid grid-cols-1 gap-4 gap-y-6 lg:grid-cols-3 lg:gap-8">
        {service.plans.map((p: any) => (
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
        <Link
          href="/contact"
          className="btn btn-sm lg:btn-lg text-cta-s lg:text-cta-l btn-yellow-fill"
        >
          {lang === 'fr' ? 'Réserver un coaching !' : 'Book coaching!'}
        </Link>

        <Link href="/services" className="link-black text-cta-l">
          {lang === 'fr' ? 'Retour aux prestations' : 'Back to services'}
        </Link>
      </div>
    </StickyHeroSection>
  )
}
