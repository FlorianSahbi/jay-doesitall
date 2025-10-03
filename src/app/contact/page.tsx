// @path: src/app/contact/page.tsx

import StickyHeroSection from '@/components/shared/StickyHeroSection'
import { loadPage } from '@/content/loader'

export default function ContactPage() {
  const data = loadPage('contact') as any

  const { hero, kicker, title, intro, cta } = data

  return (
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
  )
}
