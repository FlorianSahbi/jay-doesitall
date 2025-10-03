// @path: src/app/services/[slug]/page.tsx

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getStaticParamsServices, loadService } from '@/content/loader'
import ServicePlanCard from '@/components/shared/ServicePlanCard'
import StickyHeroSection from '@/components/shared/StickyHeroSection'

export async function generateStaticParams() {
  return getStaticParamsServices()
}

export default async function ServiceSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const data = (await loadService(slug)) as any
  if (!data) return notFound()
  const { service } = data

  return (
    <StickyHeroSection
      cover={service.cover}
      alt={service.title}
      overlay
      kicker="PRESTATIONS"
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
          Réserver un coaching !
        </Link>

        <Link href="/services" className="link-black text-cta-l">
          Retour aux prestations
        </Link>
      </div>
    </StickyHeroSection>
  )
}
