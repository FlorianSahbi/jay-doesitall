// @path: src/app/[lang]/services/page.tsx
import { loadPage } from '@/content/loader'
import StickyHeroSection from '@/components/shared/StickyHeroSection'
import ServiceCard from '@/components/shared/ServiceCard'

export default async function ServicesPage({
  params: { lang },
}: {
  params: { lang: 'fr' | 'en' }
}) {
  const DATA = (await loadPage('services', lang)) as any
  const { hero, kicker, title, intro, cards } = DATA

  return (
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
            href={`/${lang}${c.href}`}
            title={c.title}
            cover={c.cover}
            sizes={c.sizes}
            ctaLabel={c.ctaLabel}
          />
        ))}
      </div>
    </StickyHeroSection>
  )
}
