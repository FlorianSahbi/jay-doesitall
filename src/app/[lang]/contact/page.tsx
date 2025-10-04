// @path: src/app/[lang]/contact/page.tsx
import StickyHeroSection from '@/components/shared/StickyHeroSection'
import { PAGES } from '@/content/ids'
import { loadPage } from '@/content/loader'

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang = (rawLang === 'en' ? 'en' : 'fr') as 'fr' | 'en'

  const data = (await loadPage(PAGES.CONTACT, lang)) as any
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
